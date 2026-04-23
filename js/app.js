/* ===========================
   Python Academy LMS (Vanilla SPA) — Refactor 2026
   Fixes / Upgrades:
   - Robust stdout normalization (dash/apostrophe/quotes/NBSP/newlines)
   - Honest code checks (strip strings/comments)
   - Terminal report: Output + Tests + hints + whitespace visualization
   - Spoiled (no XP) only when user clicks "Show solution"
   - Attempts logic: after 10 fails -> solution becomes available (not auto-spoiled)
   - MiniPy: safer expression parsing + consistent stdout
=========================== */

(function () {
  "use strict";

    // ===========================
  // Supabase (Auth + Cloud Save)
  // ===========================
  // ВАЖЛИВО: тут має бути твій SUPABASE_URL і твій sb_publishable ключ
  const SUPABASE_URL = "https://jxupcqlidaozazbwxpxp.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_joFcOKBLVWXy3SVSkTHuXg_ZpezeivF";

  const supa = (window.supabase && SUPABASE_URL.includes("supabase.co"))
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
    : null;

  async function signInWithGoogle() {
    if (!supa) throw new Error("Supabase client not configured");
    const redirectTo = window.location.origin + window.location.pathname;

    const { error } = await supa.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) throw error;
  }

  async function getSessionUser() {
    if (!supa) return null;
    const { data: { session } } = await supa.auth.getSession();
    return session?.user || null;
  }

  async function cloudLoadState(userId) {
    // Спочатку пробуємо завантажити з profiles
    let res = await supa
      .from("profiles")
      .select("progress")
      .eq("id", userId)
      .maybeSingle();
    if (res.data?.progress) return res.data.progress;

    // Якщо немає в profiles, пробуємо зі старої таблиці progress
    res = await supa
      .from("progress")
      .select("state")
      .eq("user_id", userId)
      .maybeSingle();
    if (res.data?.state) {
      // Міграція: зберігаємо в profiles
      await supa.from("profiles").upsert({ id: userId, progress: res.data.state, updated_at: new Date().toISOString() });
      return res.data.state;
    }

    return null;
  }
  async function loadClassAccessForStudent(userId) {
  if (!supa || !userId) return;

  const { data: profile, error: profileError } = await supa
    .from("profiles")
    .select("class_code")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    console.error(profileError);
    return;
  }

  const classCode = profile?.class_code || null;
  state.user.class_code = classCode;

  if (!classCode) {
    state.user.classModuleAccess = {};
    state.user.classTaskAccess = {};
    save();
    return;
  }

  const { data: classRow, error: classError } = await supa
    .from("classes")
    .select("module_access, task_access")
    .eq("code", classCode)
    .maybeSingle();

  if (classError) {
    console.error(classError);
    return;
  }

  state.user.classModuleAccess = classRow?.module_access || {};
  state.user.classTaskAccess = classRow?.task_access || {};
  save();
}

  async function cloudSaveState(userId, fullState) {
    const { error } = await supa
      .from("profiles")
      .upsert({ id: userId, progress: fullState, updated_at: new Date().toISOString() });
    if (error) throw error;
  }

function calculateAssignedAutoPoints({ attemptsFailed = 0, dueAt = null }) {
  const start = 12;
  const failed = Math.max(0, Number(attemptsFailed || 0));
  const attemptPenalty = Math.floor(failed / 2);

  let latePenalty = 0;
  if (dueAt) {
    const dueTs = new Date(dueAt).getTime();
    if (!Number.isNaN(dueTs) && Date.now() > dueTs) {
      latePenalty = 2;
    }
  }

  const total = Math.max(1, start - attemptPenalty - latePenalty);

  return {
    start,
    failed,
    attemptPenalty,
    latePenalty,
    total,
    isLate: latePenalty > 0
  };
}

async function upsertAutoAssignmentCompletion(
  assignmentId,
  courseId,
  moduleId,
  taskIndex,
  taskTitle = "",
  points = null,
  submissionText = ""
) {
  if (!supa || !assignmentId || state?.user?.role !== "student") return false;

  const { data: { user }, error: authError } = await supa.auth.getUser();
  if (authError || !user?.id) return false;

  const taskId = uid(courseId, moduleId, taskIndex);
  const isDoneNow = !!completionState(taskId);
  if (!isDoneNow) return false;

  const payload = {
    assignment_id: assignmentId,
    student_id: user.id,
    submission_text: submissionText || `Авто-завдання виконано: ${taskTitle || `Завдання ${Number(taskIndex) + 1}`}.`,
    status: "reviewed",
    points,
    submitted_at: new Date().toISOString(),
    reviewed_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { error } = await supa
    .from("assignment_submissions")
    .upsert(payload, { onConflict: "assignment_id,student_id" });

  if (error) throw error;
  return true;
}

async function finalizeActiveAutoAssignment(courseId, moduleId, taskIndex, taskTitle = "") {
  const active = state.activeAutoAssignment || null;
  if (!active) return null;

  if (
    String(active.courseId) !== String(courseId) ||
    String(active.moduleId) !== String(moduleId) ||
    Number(active.taskIndex) !== Number(taskIndex)
  ) {
    return null;
  }

  const taskId = uid(courseId, moduleId, taskIndex);
  const score = calculateAssignedAutoPoints({
    attemptsFailed: getAttempts(taskId),
    dueAt: active.dueAt || null
  });

  const summary =
    `Авто-завдання виконано: ${taskTitle || `Завдання ${Number(taskIndex) + 1}`}. ` +
    `Бал: ${score.total}/12. ` +
    `Невдалих спроб: ${score.failed}. ` +
    `${score.isLate ? "Прострочено." : "Вчасно."}`;

  const saved = await upsertAutoAssignmentCompletion(
    active.assignmentId,
    courseId,
    moduleId,
    taskIndex,
    taskTitle,
    score.total,
    summary
  );

if (saved) {
  state.activeAutoAssignment = {
    ...active,
    completedAt: new Date().toISOString(),
    isCompleted: true
  };
  save();
  toast("✅ Авто-завдання зараховано у вкладці «Мої завдання»");
}

  return null;
}

function restoreSuccessOverlayXpMode() {
  const baseLabel = $("xpBase")?.parentElement?.querySelector("span");
  const sniperLabel = $("xpSniper")?.parentElement?.querySelector("span");
  const speedLabel = $("xpSpeed")?.parentElement?.querySelector("span");
  const streakLabel = $("xpStreak")?.parentElement?.querySelector("span");
  const totalLabel = $("xpTotal")?.parentElement?.querySelector("span");

  if (baseLabel) baseLabel.textContent = "⭐ Базові XP:";
  if (sniperLabel) sniperLabel.textContent = "🎯 Снайпер:";
  if (speedLabel) speedLabel.textContent = "⚡ Швидкість:";
  if (streakLabel) streakLabel.textContent = "🔥 Бонус за стрік:";
  if (totalLabel) totalLabel.textContent = "Усього:";

  const btnNext = $("btnSuccessNext");
  if (btnNext) {
    btnNext.style.display = "";
    btnNext.textContent = "Далі ➔";
  }

  const btnStay = $("btnSuccessStay");
  if (btnStay) {
    btnStay.textContent = "👀 Переглянути мій код";
  }
}

function showAssignedAutoSuccessOverlay(taskTitle, score) {
  const overlay = $("successOverlay");
  if (!overlay) {
    toast(`✅ Зараховано: ${score.total}/12 балів`);
    return;
  }

  const baseLabel = $("xpBase")?.parentElement?.querySelector("span");
  const sniperLabel = $("xpSniper")?.parentElement?.querySelector("span");
  const speedLabel = $("xpSpeed")?.parentElement?.querySelector("span");
  const streakLabel = $("xpStreak")?.parentElement?.querySelector("span");
  const totalLabel = $("xpTotal")?.parentElement?.querySelector("span");

  if (baseLabel) baseLabel.textContent = "Старт:";
  if (sniperLabel) sniperLabel.textContent = "Штраф за спроби:";
  if (speedLabel) speedLabel.textContent = "Штраф за прострочку:";
  if (streakLabel) streakLabel.textContent = "Невдалі спроби:";
  if (totalLabel) totalLabel.textContent = "Підсумок:";

  $("successTaskName").textContent = taskTitle || "Авто-завдання виконано";
  $("xpBase").textContent = `${score.start}`;
  $("xpSniper").textContent = `-${score.attemptPenalty}`;
  $("xpSpeed").textContent = `-${score.latePenalty}`;
  $("xpStreak").textContent = `${score.failed}`;
  $("xpTotal").textContent = `${score.total} / 12 балів`;

  overlay.classList.add("active");

  const btnNext = $("btnSuccessNext");
  if (btnNext) {
    btnNext.style.display = "none";
  }

  const btnStay = $("btnSuccessStay");
  if (btnStay) {
    btnStay.textContent = "📚 До моїх завдань";
    btnStay.onclick = () => {
      overlay.classList.remove("active");
      goto("/home");
    };
  }
}

  let cloudTimer = null;
  function scheduleCloudSync(getStateFn) {
    if (!supa) return;
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(async () => {
      try {
        const user = await getSessionUser();
        if (!user) return;
        await cloudSaveState(user.id, getStateFn());
      } catch (e) {
        const user = await getSessionUser();
        console.error("Supabase load/save error:", e);

        if (!state.user) {
          const fallbackName =
            user?.user_metadata?.full_name ||
            user?.email?.split("@")?.[0] ||
            "User";

          state.user = {
            name: fallbackName,
            role: "local",
            xp: 0,
            streak: 1,
            lastDay: null,
            completed: {},
            attempts: {},
            spoiled: {},
            drafts: {},
            errorLogs: {},
            moduleAccess: {},
            taskAccess: {},
            solutions: {}
          };
          save();
        }
      }
    }, 900);
  }


  // ===========================
  // DOM helpers
  // ===========================
  const { $, on, escapeHtml, todayISO, levelFromXp } = window.App.helpers;

  // ===========================
  // Toast
  // ===========================
  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // ===========================
  // Sound + confetti
  // ===========================
  let audioCtx = null;
  function playSuccessSound(enabled) {
    if (!enabled) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const ac = audioCtx;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(520, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(980, ac.currentTime + 0.12);
      g.gain.setValueAtTime(0.001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.20, ac.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.22);
      o.connect(g);
      g.connect(ac.destination);
      o.start();
      o.stop(ac.currentTime + 0.24);
    } catch {}
  }

  function fireConfetti() {
    if (typeof confetti === "function") {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.65 } });
    }
  }

  // ===========================
  // Dates / streak
  // ===========================
 
  function updateStreak(user) {
    const t = todayISO();
    const last = user.lastDay || null;
    if (!last) {
      user.streak = 1;
      user.lastDay = t;
      return;
    }
    if (last === t) return;

    const lastDate = new Date(last + "T00:00:00");
    const nowDate = new Date(t + "T00:00:00");
    const diffDays = Math.round((nowDate - lastDate) / (1000 * 60 * 60 * 24));

    user.streak = diffDays === 1 ? (user.streak || 1) + 1 : 1;
    user.lastDay = t;
  }




    // ===========================
    // Storage
    // ===========================
    const {
      KEY,
      defaultState,
      load,
      resetAll,
      safeB64Encode,
      safeB64Decode
    } = window.App.storage;

let state = load() || structuredClone(defaultState);
function replaceState(nextState) {
  const safeState = structuredClone(nextState || defaultState);

  Object.keys(state).forEach((key) => {
    delete state[key];
  });

  Object.assign(state, safeState);
}

    function save() {
      window.App.storage.save(state);
      scheduleCloudSync(() => state);
    }

    // ===========================
    // Routing
    // ===========================
    function routeParse() {
      const raw = (location.hash || "#/home").slice(1);
      return raw.split("/").filter(Boolean);
    }
    function goto(hash) {
      location.hash = hash.startsWith("#") ? hash : ("#" + hash);
    }

    // ===========================
    // Theme
    // ===========================
  function applyTheme(theme) {
    return window.App.theme.applyTheme(theme, state, myCodeMirror);
  }

  function toggleTheme() {
    return window.App.theme.toggleTheme(state, myCodeMirror, save, toast);
  }

    // ===========================
    // Views refs
    // ===========================
    const authOverlay = $("authOverlay");
    const settingsOverlay = $("settingsOverlay");

    const viewHome = $("view-home");
    const viewModules = $("view-modules");
    const viewLesson = $("view-lesson");
    const viewLeaderboard = $("view-leaderboard");
    const viewTeacher = $("viewTeacher"); // <-- Додали змінну

    function setActiveView(which) {
      // <-- Додали viewTeacher у масив для очищення
      [viewHome, viewModules, viewLesson, viewLeaderboard, viewTeacher].forEach(v => v && v.classList.remove("active"));
      if (which) which.classList.add("active");
    }

    // ===========================
    // Misc helpers
    // ===========================


    // ===========================
  // Course difficulty (Junior / Middle / Senior)
  // ===========================
  const LEVELS = [
    { id: "Junior",  title: "🟢 Junior",  desc: "Легкий старт, базові задачі" },
    { id: "Middle",   title: "🟡 Middle",  desc: "Середній рівень, більше логіки" },
    { id: "Senior",  title: "🔴 Senior",  desc: "Складні задачі та підводні камені" },
  ];

  function getCourseLevel(courseId) {
    return state.courseLevels?.[courseId] || null;
  }

  function setCourseLevel(courseId, levelId) {
    state.courseLevels = state.courseLevels || {};
    state.courseLevels[courseId] = levelId;
    save();
  }

function canOpenModule(courseId, moduleId) {
  const course = DB.find(c => c.id === courseId);
  if (!course) return false;

  const modules = [...(course.modules || [])].sort((a, b) => (a.order || 999) - (b.order || 999));
  const index = modules.findIndex(m => m.id === moduleId);
  if (index === -1) return false;

  if ((state?.user?.role || "student") === "teacher") return true;

  const studentForced = state?.user?.moduleAccess?.[courseId]?.[moduleId] || null;
  if (studentForced === "unlocked") return true;
  if (studentForced === "locked") return false;

  const classForced = state?.user?.classModuleAccess?.[courseId]?.[moduleId] || null;
  if (classForced === "unlocked") return true;
  if (classForced === "locked") return false;

  // якщо хоч одне завдання в модулі примусово відкрите — сам модуль теж відкритий
  const studentTaskMap = state?.user?.taskAccess?.[courseId]?.[moduleId] || {};
  if (Object.values(studentTaskMap).some(v => v === "unlocked")) return true;

  const classTaskMap = state?.user?.classTaskAccess?.[courseId]?.[moduleId] || {};
  if (Object.values(classTaskMap).some(v => v === "unlocked")) return true;

  if (index === 0) return true;

  const prev = modules[index - 1];
  return isModuleCompleted(courseId, prev.id);
}

function canOpenTask(courseId, moduleId, origIdx) {
  if ((state?.user?.role || "student") === "teacher") return true;

  const studentTaskForced = state?.user?.taskAccess?.[courseId]?.[moduleId]?.[origIdx] || null;
  if (studentTaskForced === "unlocked") return true;
  if (studentTaskForced === "locked") return false;

  const classTaskForced = state?.user?.classTaskAccess?.[courseId]?.[moduleId]?.[origIdx] || null;
  if (classTaskForced === "unlocked") return true;
  if (classTaskForced === "locked") return false;

  const studentModuleForced = state?.user?.moduleAccess?.[courseId]?.[moduleId] || null;
  if (studentModuleForced === "unlocked") return true;
  if (studentModuleForced === "locked") return false;

  const classModuleForced = state?.user?.classModuleAccess?.[courseId]?.[moduleId] || null;
  if (classModuleForced === "unlocked") return true;
  if (classModuleForced === "locked") return false;

  return true;
}

  // ===========================
  // Current pointers
  // ===========================
  let currentCourse = null;
  let currentModule = null;
  let currentTaskIndex = 0;

  // ===========================
  // User UI
  // ===========================
  function showAuth() { authOverlay && authOverlay.classList.add("active"); }
  function hideAuth() { authOverlay && authOverlay.classList.remove("active"); }

function updateUserUI() {
  if (!state.user) return;

  // перевіримо, чи streak змінився
  const beforeLastDay = state.user.lastDay;
  const beforeStreak = state.user.streak;

  updateStreak(state.user);

  const streakChanged =
    beforeLastDay !== state.user.lastDay ||
    beforeStreak !== state.user.streak;

  $("uiName").innerText = state.user.name;
  $("uiAvatar").innerText = (state.user.name[0] || "U").toUpperCase();
  $("uiXP").innerText = `${state.user.xp} XP`;
  $("uiStreak").innerText = String(state.user.streak || 1);

  const lvl = levelFromXp(state.user.xp || 0);
  $("uiLevel").innerText = `Level ${lvl.level}`;
  $("uiLevelXP").innerText = `${lvl.inLevelXp}/${lvl.nextLevelXp} XP`;
  $("uiLevelFill").style.width = `${Math.round((lvl.inLevelXp / lvl.nextLevelXp) * 100)}%`;

  const hx = $("homeTotalXP"); if (hx) hx.textContent = String(state.user.xp || 0);
  const hs = $("homeStreak"); if (hs) hs.textContent = String(state.user.streak || 1);

  // зберігаємо тільки якщо streak реально змінився
  if (streakChanged) save();
}
function setTeacherModeChrome(enabled) {
  document.body.classList.toggle("teacher-mode", !!enabled);
}
  // ===========================
  // Progress helpers
  // ===========================
  
// Перевіряємо, чи завантажився файл з курсами (core.js)
if (typeof DB === "undefined") {
  console.error("Критична помилка: Базу даних курсів (DB) не знайдено!");
  alert("Помилка завантаження даних курсу. Спробуйте оновити сторінку.");
  window.DB = []; // Створюємо порожній масив, щоб уникнути подальшого падіння скрипта
}

const progressApi = window.App.progress.create({
  state,
  save,
  DB,
  TASKS: (typeof TASKS !== "undefined" ? TASKS : undefined),
  getCourseLevel
});

const uid = progressApi.uid;
const completionState = progressApi.completionState;
const setCompleted = progressApi.setCompleted;
const isDone = progressApi.isDone;
const getAttempts = progressApi.getAttempts;
const incAttempts = progressApi.incAttempts;
const isSpoiled = progressApi.isSpoiled;
const setSpoiled = progressApi.setSpoiled;
const getDraft = progressApi.getDraft;
const setDraft = progressApi.setDraft;
const getErrorLogs = progressApi.getErrorLogs;
const addErrorLog = progressApi.addErrorLog;
const getModuleTasks = progressApi.getModuleTasks;
const visibleTaskRefs = progressApi.visibleTaskRefs;
const courseProgress = progressApi.courseProgress;
const moduleProgress = progressApi.moduleProgress;
const isModuleCompleted = progressApi.isModuleCompleted;
const calculateBonuses = progressApi.calculateBonuses;
 



  // ===========================
  // Sidebar rendering
  // ===========================

 


  function kindLabel(kind) {
    if (kind === "quiz") return "Контрольна";
    if (kind === "final") return "Підсумкова";
    return "Завдання";
  }
  
  const sidebarApi = window.App.sidebar.create({
  $,
  DB,
  goto,
  routeParse,
  openSettings,
  visibleTaskRefs,
  uid,
  completionState,
  moduleProgress,
  escapeHtml,
  state,
  canOpenModule,
  canOpenTask,
  toast
});

const isRoute = sidebarApi.isRoute;
const renderSidebarHome = sidebarApi.renderSidebarHome;
const renderSidebarModulesOnly = sidebarApi.renderSidebarModulesOnly;

function renderSidebarModuleTasks(courseId, moduleId, taskIdx) {
  return sidebarApi.renderSidebarModuleTasks(courseId, moduleId, taskIdx, kindLabel);
}
 
  
  function openCourseWithLevel(cid) {
    goto(`/course/${cid}`);
  
    // якщо рівень ще не обраний — просто підкажемо (без попапа)
    if (!getCourseLevel(cid)) {
      toast("🎚️ Обери складність курсу (Junior / Middle / Senior) — це впливає на задачі.");
    }
  }



  
  // ===========================
  // Home / modules / leaderboard views
  // ===========================
const uiHomeApi = window.App.uiHome.create({
  $,
  DB,
  escapeHtml,
  courseProgress,
  openCourseWithLevel,
  setActiveView,
  viewHome,
  renderSidebarHome,
  state,
  supa
});

const renderCoursesGrid = uiHomeApi.renderCoursesGrid;
const renderHome = uiHomeApi.renderHome;

 
const uiCourseApi = window.App.uiCourse.create({
  $,
  DB,
  LEVELS,
  escapeHtml,
  state,
  moduleProgress,
  isModuleCompleted,
  getCourseLevel,
  setCourseLevel,
  setActiveView,
  viewModules,
  renderSidebarModulesOnly,
  goto,
  toast,
  canOpenModule
});

const renderCourseModules = uiCourseApi.renderCourseModules;

const uiLeaderboardApi = window.App.uiLeaderboard.create({
  $,
  state,
  supa,
  toast,
  setActiveView,
  viewLeaderboard,
  renderSidebarHome
});

const renderLeaderboard = uiLeaderboardApi.renderLeaderboard;


// ===========================
// Terminal INPUT (for Python input())
// ===========================
let _pendingInputResolve = null;

function termAppend(text) {
  const terminal = document.getElementById("terminal");
  if (!terminal) return;
  terminal.textContent += String(text ?? "");
}
function setTerminalPromptLabel(text = "", active = false) {
  const el = document.getElementById("terminalPromptLabel");
  if (!el) return;
  el.textContent = text || "";
  el.classList.toggle("active", !!active);
}

function setTermStatus(text) {
  const status = document.getElementById("termStatus");
  if (status) status.textContent = text;
}

function enableTermInput(enable) {
  const inp = document.getElementById("terminalInput");
  if (!inp) return;
  inp.disabled = !enable;
  if (enable) {
    inp.value = "";
    inp.focus();
  }
}

// підключаємо listener 1 раз
(function bindTerminalInputOnce(){
  let bound = false;
  function bind(){
    if (bound) return;
    const inp = document.getElementById("terminalInput");
    if (!inp) return;
    bound = true;

    inp.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (!_pendingInputResolve) return;

  const val = inp.value;
  const resolve = _pendingInputResolve;
  _pendingInputResolve = null;

  resolve(val);
});
  }

  // пробуємо привʼязатися одразу і ще раз після рендеру lesson view
  bind();
  window.addEventListener("DOMContentLoaded", bind);
  // якщо DOM перерендерюється — нічого страшного, bind() просто не знайде інпут до появи
  setTimeout(bind, 0);
})();
  

// ===========================
  // SKULPT PYTHON ENGINE
  // ===========================
  function runPythonSkulpt(code) {
    
    return new Promise((resolve) => {
      let output = "";
      
      // Функція для збору виводу print()
      function outf(text) { 
        output += text; 
      }
      
      // Функція для читання вбудованих файлів Skulpt
      function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
          throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
      }

Sk.configure({
  output: outf,
  read: builtinRead,
  execLimit: 50000,
  __future__: Sk.python3,
  inputfunTakesPrompt: true,
  inputfun: function (promptMsg) {
    return new Promise((resolveInput) => {
      const msg = (promptMsg || "").toString();

      if (msg) {
        termAppend(msg);
        output += msg;
      }

      setTerminalPromptLabel(msg, true);
      setTermStatus("Waiting input...");
      enableTermInput(true);

      _pendingInputResolve = (val) => {
        const s = val !== null ? String(val) : "";

        termAppend(s + "\n");
        output += s + "\n";

        setTerminalPromptLabel("", false);
        enableTermInput(false);
        setTermStatus("Running...");

        resolveInput(s);
      };
    });
  }
});

      // Асинхронний запуск коду
      let myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
      });

      myPromise.then(
        function() {
          resolve({ ok: true, stdout: output.replace(/\s+$/g, "") });
        },
        function(err) {
          resolve({ ok: false, error: err.toString(), stdout: output.replace(/\s+$/g, "") });
        }
      );
    });
  }

  // ===========================
  // Smart checker — normalization
  // ===========================
  function normalizeText(text, preset = "friendly") {
    let s = String(text ?? "");
    s = s.replace(/\r\n?/g, "\n");       // newlines
    s = s.replace(/\u00A0/g, " ");       // NBSP

    if (preset !== "strict") {
      // quotes
      s = s.replace(/[“”«»„]/g, '"').replace(/[‚]/g, "'");
      // apostrophes
      s = s.replace(/[ʼ’‘`´]/g, "'");
      // dashes/minus
      s = s.replace(/[–—−]/g, "-");
    }

    if (preset === "strict") return s;

    // trim line endings
    s = s.split("\n").map(line => line.replace(/[ \t]+$/g, "")).join("\n");

    if (preset === "soft") return s.trim();

    if (preset === "friendly") {
      s = s.split("\n").map(line => line.replace(/[ \t]{2,}/g, " ").trim()).join("\n");
      return s.trim();
    }

    if (preset === "loose") return s.replace(/\s+/g, " ").trim();
    return s.trim();
  }

  function regexTest(text, pattern, flags = "") {
    try { return new RegExp(pattern, flags).test(text); }
    catch { return false; }
  }

  function approxEqual(a, b, eps = 1e-6) {
    const na = Number(a), nb = Number(b);
    if (!Number.isFinite(na) || !Number.isFinite(nb)) return false;
    return Math.abs(na - nb) <= eps;
  }

  function countRegexMatches(text, pattern) {
    try {
      const re = new RegExp(pattern, "g");
      const m = text.match(re);
      return m ? m.length : 0;
    } catch {
      return 0;
    }
  }

  // strip strings/comments so codeIncludes/codeRegex cannot be faked
  function stripStringsAndComments(code) {
    let s = String(code ?? "");
    s = s.replace(/#.*$/gm, "");
    s = s.replace(/("""|''')[\s\S]*?\1/g, "");
    s = s.replace(/("([^"\\]|\\.)*")|('([^'\\]|\\.)*')/g, "''");
    return s;
  }

  function detectOutputIssues(gotRaw, expRaw) {
    const hints = [];
    gotRaw = String(gotRaw ?? "");
    expRaw = String(expRaw ?? "");

    const dashVariant = /[–—−]/.test(expRaw) || /[–—−]/.test(gotRaw);
    const aposVariant = /[ʼ’]/.test(expRaw) || /[ʼ’]/.test(gotRaw);
    const nbsp = expRaw.includes("\u00A0") || gotRaw.includes("\u00A0");

    // if friendly matches but raw differs -> typography issue
    if (dashVariant && normalizeText(gotRaw, "friendly") === normalizeText(expRaw, "friendly") && gotRaw !== expRaw) {
      hints.push("⚠️ Різниця лише в тире/мінусі: '-' vs '—/–'. Скопіюй символ з умови або використовуй '-' якщо дозволено.");
    }
    if (aposVariant && normalizeText(gotRaw, "friendly") === normalizeText(expRaw, "friendly") && gotRaw !== expRaw) {
      hints.push("⚠️ Різниця лише в апострофі: \"'\" vs \"ʼ/’\". Скопіюй апостроф з умови або набери інший.");
    }
    if (nbsp) {
      hints.push("⚠️ Є невидимий пробіл (NBSP). Видали пробіли й набери заново.");
    }
    return hints;
  }

  function visualizeWhitespace(s) {
    return String(s ?? "")
      .replace(/\r\n?/g, "\n")
      .replace(/ /g, "·")
      .replace(/\t/g, "⇥")
      .replace(/\n/g, "↵\n");
  }

  function compactWS(s) {
    return String(s ?? "").replace(/\s+/g, "");
  }

async function runTaskTestsSmart(task, code) {
  const exec = await runPythonSkulpt(code);
  const results = [];
  const tests = task.tests || [];
  const rawStdout = String(exec.stdout ?? "");
  const safeCode = stripStringsAndComments(code);

  // ✅ Автовибір: коли треба дивитись raw (лапки / f-string / {var} / escape)
  function shouldUseRaw(t) {
    if (t.checkRaw === true) return true;
    if (t.checkRaw === false) return false;

    const pattern = String(t.pattern ?? "");
    const val = String(t.value ?? "");
    const vals = Array.isArray(t.values) ? t.values.join(" ") : "";

    // якщо перевірка явно про лапки/форматовані рядки — краще raw
    const s = pattern + " " + val + " " + vals;
    return /['"]|\{|\}|\\n|\\t|f['"]/.test(s);
  }

  function targetCodeForTest(t) {
    const raw = String(code ?? "");
    const useRaw = shouldUseRaw(t);
    return useRaw ? raw : safeCode;
  }

  function compactWS(s) {
    return String(s ?? "").replace(/\s+/g, "");
  }

  function countIncludes(haystack, needle) {
    if (!needle) return 0;
    let i = 0, c = 0;
    while (true) {
      const p = haystack.indexOf(needle, i);
      if (p === -1) break;
      c++;
      i = p + needle.length;
    }
    return c;
  }

  for (const t of tests) {
    const type = t.type || "stdoutEquals";
    const name = t.name || type;

    const targetCode = targetCodeForTest(t);
    const targetCodeCompact = compactWS(targetCode);

    // ---------- група stdout ----------
    const stdoutTypes = new Set([
      "stdoutEquals","stdoutOneOf","stdoutRegex","stdoutContainsLines","stdoutUnorderedLines","stdoutNumber"
    ]);

    if (!exec.ok && stdoutTypes.has(type)) {
      results.push({
        name,
        pass: false,
        reason: `Помилка виконання: ${exec.error}`,
        want: t.value ?? "",
        got: rawStdout
      });
      continue;
    }

    if (type === "stdoutEquals") {
      const normalize = t.normalize || "friendly";
      const got = normalizeText(rawStdout, normalize);
      const want = normalizeText(t.value, normalize);
      const pass = got === want;
      const hints = pass ? [] : detectOutputIssues(rawStdout, String(t.value ?? ""));
      results.push({
        name, pass,
        reason: pass ? "OK" : "Вивід не збігається",
        want, got,
        meta: { normalize, hints, gotRaw: rawStdout, wantRaw: String(t.value ?? "") }
      });
      continue;
    }

    // ---------- codeIncludes ----------
    if (type === "codeIncludes") {
      const needle = String(t.value ?? "");
      const pass = targetCodeCompact.includes(compactWS(needle));
      results.push({
        name, pass,
        reason: pass ? "OK" : "Код не містить потрібний фрагмент",
        want: needle,
        got: ""
      });
      continue;
    }

    // ✅ NEW: codeNotIncludes
    if (type === "codeNotIncludes") {
      const needle = String(t.value ?? "");
      const pass = !targetCodeCompact.includes(compactWS(needle));
      results.push({
        name, pass,
        reason: pass ? "OK" : "Знайдено заборонений фрагмент",
        want: `NOT ${needle}`,
        got: ""
      });
      continue;
    }

    // ✅ NEW: codeIncludesAll (масив)
    if (type === "codeIncludesAll") {
      const values = Array.isArray(t.values) ? t.values : [];
      const missing = values.filter(v => !targetCodeCompact.includes(compactWS(v)));
      const pass = missing.length === 0;
      results.push({
        name, pass,
        reason: pass ? "OK" : "Не всі фрагменти знайдено",
        want: values.join(" + "),
        got: missing.length ? `missing: ${missing.join(", ")}` : ""
      });
      continue;
    }

    // ✅ NEW: codeOneOfIncludes (хоч один)
    if (type === "codeOneOfIncludes") {
      const values = Array.isArray(t.values) ? t.values : [];
      const pass = values.some(v => targetCodeCompact.includes(compactWS(v)));
      results.push({
        name, pass,
        reason: pass ? "OK" : "Не знайдено жодного з дозволених варіантів",
        want: `oneOf: ${values.join(" | ")}`,
        got: ""
      });
      continue;
    }

    // ✅ NEW: codeCountIncludes (рахує кількість входжень)
    if (type === "codeCountIncludes") {
      const needle = compactWS(String(t.value ?? ""));
      const cnt = countIncludes(targetCodeCompact, needle);
      const min = t.min ?? 1;
      const max = t.max ?? Infinity;
      const pass = cnt >= min && cnt <= max;
      results.push({
        name, pass,
        reason: pass ? "OK" : "Кількість входжень не підходить",
        want: (max === Infinity ? `>= ${min}` : `between ${min}..${max}`),
        got: String(cnt)
      });
      continue;
    }

    // ---------- codeRegex ----------
    if (type === "codeRegex" && t.flags === "g") {
      const cnt = countRegexMatches(targetCode, t.pattern);
      const min = t.min !== undefined ? t.min : (t.max !== undefined ? 0 : 2);
      const max = t.max !== undefined ? t.max : Infinity;
      const pass = cnt >= min && cnt <= max;

      let reason = "OK";
      if (!pass) {
        if (cnt < min) reason = `Потрібно мінімум ${min} співпадінь`;
        else reason = `Забагато співпадінь (максимум ${max})`;
      }

      results.push({
        name, pass, reason,
        want: min === max ? `${min} matches` : (max === Infinity ? `${min}+ matches` : `від ${min} до ${max} matches`),
        got: String(cnt)
      });
      continue;
    }

    if (type === "codeRegex") {
      const pass = regexTest(targetCode, t.pattern, t.flags || "m");
      results.push({
        name, pass,
        reason: pass ? "OK" : "Код не відповідає шаблону",
        want: `/${t.pattern}/${t.flags || "m"}`,
        got: ""
      });
      continue;
    }

    // default
    results.push({ name, pass: true, reason: "OK", want: "", got: "" });
  }

  const allPass = results.length ? results.every(r => r.pass) : true;
  return { allPass, results, exec };
}


function explainPythonError(rawError = "") {
  const error = String(rawError || "");

  if (/IndentationError:\s*unexpected indent/i.test(error)) {
    return {
      short: "Зайвий відступ на початку рядка.",
      help: "Схоже, перед командою стоїть зайвий пробіл або Tab.",
      tip: "Для простих команд на кшталт print(), input() або x = 5 рядок має починатися від самого лівого краю."
    };
  }

  if (/IndentationError:\s*expected an indented block/i.test(error)) {
    return {
      short: "Після двокрапки потрібен відступ.",
      help: "Після if, for, while, def та інших конструкцій із двокрапкою наступний рядок має бути з відступом.",
      tip: "Перевір рядок після двокрапки (:)."
    };
  }

  if (/IndentationError:\s*unindent does not match any outer indentation level/i.test(error)) {
    return {
      short: "Неправильні відступи в блоці коду.",
      help: "У різних рядках, схоже, змішані різні відступи або їхня кількість не збігається.",
      tip: "Спробуй вирівняти всі відступи однаково."
    };
  }

  if (/SyntaxError/i.test(error) && /EOF/i.test(error)) {
    return {
      short: "Рядок не завершено.",
      help: "Швидше за все, десь не вистачає лапки, дужки або іншого закриваючого символу.",
      tip: "Перевір лапки, круглі дужки та коми."
    };
  }

  if (/SyntaxError/i.test(error)) {
    return {
      short: "Синтаксична помилка в коді.",
      help: "Python не зміг прочитати один із рядків.",
      tip: "Перевір лапки, дужки, двокрапки та правильність написання команди."
    };
  }

  if (/NameError/i.test(error)) {
    return {
      short: "Використано невідоме ім'я.",
      help: "Швидше за все, є помилка в назві змінної або команди.",
      tip: "Перевір, чи правильно написано print, input або назву змінної."
    };
  }

  return {
    short: "Програма зупинилась через помилку Python.",
    help: "Подивись на технічне повідомлення нижче.",
    tip: "Виправ помилку і спробуй ще раз."
  };
}


function buildTerminalReport(runResult) {
    const { exec, results } = runResult;
    
    // Починаємо формувати HTML-рядок
    let html = `<div style="font-weight:900; color:var(--text-dim); margin-bottom:14px; text-transform:uppercase; font-size:11px; letter-spacing:1px;">Python Academy • Terminal</div>`;

    // ==========================================
    // БЛОК 1: ЩО НАДРУКУВАЛА ПРОГРАМА (ВИВІД)
    // ==========================================
    html += `<div style="margin-bottom: 20px;">`;
    html += `<div style="font-size:12px; color:var(--primary); font-weight:900; margin-bottom:6px;">📺 Твій вивід:</div>`;
    
if (!exec.ok) {
  const friendly = explainPythonError(exec.error);
  html += `<div style="background:rgba(239,68,68,0.10);border-left:3px solid #ef4444;padding:8px 10px;border-radius:6px;white-space:normal;line-height:1.25;"><div style="color:#fecaca;font-weight:800;font-size:13px;margin:0 0 4px 0;">❌ ${escapeHtml(friendly.short)}</div><div style="color:#fee2e2;font-size:12px;margin:0 0 4px 0;">${escapeHtml(friendly.help)}</div><div style="color:#fca5a5;font-size:12px;margin:0 0 6px 0;">💡 ${escapeHtml(friendly.tip)}</div><details style="margin:0;white-space:normal;"><summary style="cursor:pointer;color:#fda4af;font-weight:700;font-size:12px;">▶ Показати технічну помилку</summary><div style="margin-top:5px;color:#fca5a5;font-family:var(--mono);font-size:11px;line-height:1.3;white-space:pre-wrap;">${escapeHtml(exec.error)}</div></details></div>`;
} else {
      // Якщо програма відпрацювала нормально - нейтральний фон
      const outText = exec.stdout ? escapeHtml(exec.stdout) : "<i style='color: rgba(255,255,255,0.3);'>(нічого не виведено)</i>";
      html += `<div style="color: var(--text); background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--text-dim); padding: 10px 14px; border-radius: 6px; font-family: var(--mono); font-size: 14px; white-space: pre-wrap; min-height: 42px;">${outText}</div>`;
    }
    html += `</div>`;

    // ==========================================
    // БЛОК 2: ПЕРЕВІРКА ТЕСТІВ (ЗВІТ)
    // ==========================================
    html += `<div>`;
    html += `<div style="font-size:12px; color:var(--primary); font-weight:900; margin-bottom:6px;">🎯 Результат перевірки:</div>`;

    // Визначаємо загальний колір блоку перевірки
    const allPass = results.length ? results.every(r => r.pass) : true;
    const testBg = allPass ? "rgba(34, 197, 94, 0.1)" : "rgba(251, 191, 36, 0.1)"; // Зелений або Жовтий
    const testBorder = allPass ? "var(--success)" : "var(--warn)";

    html += `<div style="background: ${testBg}; border-left: 3px solid ${testBorder}; padding: 12px 14px; border-radius: 6px;">`;

    for (const r of results) {
      const icon = r.pass ? "✅" : "❌";
      const color = r.pass ? "var(--success)" : "var(--warn)";
      
      html += `<div style="margin-bottom: 8px;">`;
      html += `<strong style="color:${color}; font-size:14px;">${icon} ${escapeHtml(r.name)}</strong>`;

      if (!r.pass) {
        // Якщо тест впав, показуємо деталі з відступом
        html += `<div style="margin-left: 24px; margin-top: 6px; font-size: 13px; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 8px;">`;
        if (r.reason) html += `<div style="margin-bottom:4px;"><span style="color:var(--danger); font-weight:700;">Помилка:</span> ${escapeHtml(r.reason)}</div>`;
        if (r.want !== undefined && String(r.want) !== "") html += `<div style="margin-bottom:2px;"><span style="color:var(--text-dim);">Очікувалось:</span> <code style="color:var(--success); font-weight:900;">${escapeHtml(String(r.want))}</code></div>`;
        if (r.got !== undefined && String(r.got) !== "") html += `<div><span style="color:var(--text-dim);">Отримано:</span> <code style="color:var(--danger); font-weight:900;">${escapeHtml(String(r.got))}</code></div>`;

        // Розумні підказки (якщо є проблеми з пробілами чи апострофами)
        const hints = r.meta?.hints || [];
        for (const h of hints) {
           html += `<div style="margin-top:6px; color: #fbbf24; font-weight:700;">💡 ${escapeHtml(h)}</div>`;
        }
        html += `</div>`;
      }
      html += `</div>`;
    }

    // Блок для візуалізації невидимих пробілів (якщо потрібно)
    const firstStdFail = results.find(r => !r.pass && r.meta && r.meta.gotRaw !== undefined);
    if (firstStdFail) {
      html += `<hr style="border:none; border-top:1px dashed rgba(255,255,255,0.2); margin: 12px 0;">`;
      html += `<div style="font-size: 12px; color: var(--text-dim); margin-bottom: 6px;">🔎 Аналіз невидимих символів (пробіли, переноси):</div>`;
      html += `<div style="font-size: 13px; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; font-family: var(--mono);">`;
      html += `<div style="color: var(--success); margin-bottom:4px;">[Твоя мета]➔ ${escapeHtml(visualizeWhitespace(firstStdFail.meta.wantRaw))}</div>`;
      html += `<div style="color: #fca5a5;">[Твій код] ➔ ${escapeHtml(visualizeWhitespace(firstStdFail.meta.gotRaw))}</div>`;
      html += `</div>`;
    }

    html += `</div></div>`; // Закриваємо тест-блок
    return html;
  }

  // ===========================
  // Settings modal
  // ===========================
  function openSettings() {
    showSettings();
  }

  function closeSettings() {
    const overlay = $("settingsOverlay");
    overlay && overlay.classList.remove("active");
  }

  function openLevelPicker(courseId, onDone) {
    // Попап більше не показуємо — у тебе вже є вбудовані картки на цій сторінці
    toast("🎚️ Рівень обирається у блоці «Обери складність курсу».");
  
    // якщо ми вже на сторінці курсу — просто скролимо до блоку
    setTimeout(() => {
      const el = document.querySelector(".level-selector-inline");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  
    // щоб не ламати стару логіку викликів
    if (typeof onDone === "function") onDone();
  }
  
  // ===========================
  // Typing effect (home)
  // ===========================
  const typingWords = [
    'print("Hello, Python Academy!")',
    'for i in range(1, 4): print(i)',
    'if x > 5: print("big")',
    'name="Оля"; print(f"Привіт, {name}!")'
  ];
  let tIndex = 0, tDir = 1, tSub = "";
  function typingTick() {
    const el = $("typedText");
    if (!el) return;
    const w = typingWords[tIndex % typingWords.length];

    if (tDir === 1) {
      tSub = w.slice(0, tSub.length + 1);
      el.textContent = tSub;
      if (tSub.length === w.length) {
        tDir = -1;
        setTimeout(typingTick, 900);
        return;
      }
      setTimeout(typingTick, 34);
    } else {
      tSub = w.slice(0, tSub.length - 1);
      el.textContent = tSub;
      if (tSub.length === 0) { tDir = 1; tIndex++; }
      setTimeout(typingTick, 20);
    }
  }




let myCodeMirror = null;
  // ===========================
  // Lesson render
  // ===========================
  function renderLesson(courseId, moduleId, taskIdx) {
let course = DB.find(c => c.id === courseId);
let mod = course?.modules.find(m => m.id === moduleId);
const idx = Number(taskIdx);

// ПІДТРИМКА PRACTICE_DB
if ((!course || !mod) && String(courseId) === "practice") {
  const practiceModule = (window.PRACTICE_DB || []).find(
    (item) => String(item.id) === String(moduleId)
  );

  if (practiceModule) {
    course = {
      id: "practice",
      title: "Практикум",
      modules: [practiceModule]
    };
    mod = practiceModule;
  }
}

// запасний варіант на майбутнє:
// якщо practice колись стане курсом з modules
if (!course || !mod) {
  const practiceCourse = (window.PRACTICE_DB || []).find(
    (item) => String(item.id) === String(courseId)
  );
  const nestedPracticeModule = practiceCourse?.modules?.find(
    (item) => String(item.id) === String(moduleId)
  );

  if (practiceCourse && nestedPracticeModule) {
    course = {
      id: practiceCourse.id,
      title: practiceCourse.title || "Практикум",
      modules: practiceCourse.modules || []
    };
    mod = nestedPracticeModule;
  }
}


  const refs = visibleTaskRefs(courseId, moduleId);
  const ref = refs[idx];

  // Для practice не відправляємо на /course/practice,
  // бо такого "курсу" в звичайній DB немає
  if (course && mod && String(courseId) !== "practice" && !canOpenModule(courseId, moduleId)) {
    toast("🔒 Цей модуль поки заблокований");
    goto(`/course/${courseId}`);
    return;
  }

  if (!course || !mod || !ref) {
    toast("Урок не знайдено");
    goto("/home");
    return;
  }

  const task = ref.t;
  const origIdx = ref.origIdx;

const activeAuto = state.activeAutoAssignment || null;
const isAssignedAutoTask =
  !!activeAuto &&
  String(activeAuto.assignmentId || "").trim() !== "" &&
  String(activeAuto.courseId) === String(courseId) &&
  String(activeAuto.moduleId) === String(moduleId) &&
  Number(activeAuto.taskIndex) === Number(origIdx);
 
  let isTeacherPreview = false;

try {
  const rawPreview = sessionStorage.getItem("teacher_auto_preview");
  if (rawPreview) {
    const preview = JSON.parse(rawPreview);

    isTeacherPreview =
      String(preview?.courseId || "") === String(courseId) &&
      String(preview?.moduleId || "") === String(moduleId) &&
      Number(preview?.taskIndex) === Number(origIdx);
  }
} catch {}

    if (!canOpenTask(courseId, moduleId, origIdx)) {
      const firstOpenIdx = refs.findIndex(r => canOpenTask(courseId, moduleId, r.origIdx));
      toast("🔒 Це завдання тимчасово заблоковане вчителем");
      if (firstOpenIdx >= 0 && firstOpenIdx !== idx) {
        goto(`/lesson/${courseId}/${moduleId}/${firstOpenIdx}`);
     } else {
  if (String(courseId) === "practice") {
    goto("/home");
  } else {
    goto(`/course/${courseId}`);
  }
}
      return;
    }

    currentCourse = course;
    currentModule = mod;
    currentTaskIndex = idx;

    setActiveView(viewLesson);
    // Запускаємо таймер для бонусу "Швидкість"
    window.currentTaskStartTime = Date.now();

    $("breadcrumbs").innerHTML =
      `<span class="crumb" data-crumb-home style="cursor:pointer">Головна</span> / ` +
      `<span class="crumb" data-crumb-course style="cursor:pointer">${escapeHtml(course.title)}</span> / ` +
      `${escapeHtml(mod.title)}`;

    $("lessonTitle").innerText = task.title;
    $("lessonContent").innerHTML = task.theory || "";
 // === ПІДСВІТКА КОДУ В ТЕОРІЇ ===
    const currentTheme = state.settings.theme === "light" ? "default" : "dracula";
    
    $("lessonContent").querySelectorAll('.code-box').forEach(box => {
      // 1. Правильно дістаємо текст (зберігаємо твої <br> як нові рядки)
      let codeText = box.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      let temp = document.createElement("div");
      temp.innerHTML = codeText;
      codeText = (temp.textContent || temp.innerText || "").trim();

      // 2. Очищаємо блок і вішаємо клас теми
      box.innerHTML = "";
      box.classList.add(`cm-s-${currentTheme}`); // Додаємо тему для синтаксису

      // 3. Фарбуємо код
      if (window.CodeMirror && typeof CodeMirror.runMode === "function") {
        CodeMirror.runMode(codeText, "python", box);
      } else {
        box.textContent = codeText;
      }
    });
    $("lessonTask").innerHTML = task.desc || "";
    $("lessonExpected").textContent = task.expected || "(немає)";

    const kind = task.kind || "practice";
    $("badgeKind").textContent = kindLabel(kind);

    const id = uid(course.id, mod.id, origIdx);
    const tries = getAttempts(id);
    $("badgeAttempts").textContent = `Спроби: ${Math.min(tries, 10)}/10`;

    $("badgeNoXP").style.display = isSpoiled(id) ? "inline-flex" : "none";

    // Запуск сесії задачі (таймер)
    state.user.taskSession = {
      id,
      startedAt: Date.now()
    };
    save();
    // hint
    $("hintBox").innerHTML = task.hint || "";
    $("hintBox").style.display = "none";
    $("btnHint").style.opacity = task.hint ? "1" : "0.5";
    $("btnHint").style.pointerEvents = task.hint ? "auto" : "none";

    // solution availability + button behavior
    const solBox = $("solutionBox");
    const solPre = $("solutionPre");
    const btnShowSol = $("btnShowSolution");

    const available = tries >= 10;
    const spoiled = isSpoiled(id);

    if (spoiled) {
      solBox.style.display = "block";
      solPre.textContent = task.solution || task.hint || "# (немає рішення)";
      if (btnShowSol) btnShowSol.style.display = "none";
    } else if (available) {
      solBox.style.display = "block";
      solPre.textContent = "Рішення доступне після 10 спроб. Натисни кнопку нижче, щоб відкрити (буде без XP).";
      if (btnShowSol) btnShowSol.style.display = "inline-flex";
    } else {
      solBox.style.display = "none";
      if (btnShowSol) btnShowSol.style.display = "none";
    }

    if (btnShowSol) {
      btnShowSol.onclick = () => {
        setSpoiled(id);
        $("badgeNoXP").style.display = "inline-flex";
        solPre.textContent = task.solution || task.hint || "# (немає рішення)";
        btnShowSol.style.display = "none";
        toast("🧩 Рішення відкрито — ця задача буде без XP");
      };
    }

    // exam warning (no locks)
    const warn = $("examWarnBox");
    const isExam = (kind === "quiz" || kind === "final");
    const moduleDone = isModuleCompleted(courseId, moduleId);
    if (isExam && !moduleDone) {
      const mp = moduleProgress(courseId, moduleId);
      warn.style.display = "block";
      warn.innerHTML = `⚠️ <b>${escapeHtml(kindLabel(kind))}</b>: у модулі ще не виконані всі завдання (${mp.done}/${mp.total}). 
      Ти можеш проходити зараз, але рекомендовано спочатку завершити модуль.`;
    } else {
      warn.style.display = "none";
    }

    // editor / terminal init
    // ===========================
    // EDITOR INIT (CodeMirror)
    // ===========================
    const terminal = $("terminal");
    const status = $("termStatus");
    if (status) status.textContent = "Ready";
    if (terminal) terminal.textContent = ">>> Ready...";

    // Якщо редактор ще не створено - створюємо
    if (!myCodeMirror) {
      myCodeMirror = CodeMirror.fromTextArea($("codeEditor"), {
        mode: "python",
        theme: state.settings.theme === "light" ? "default" : "dracula",
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        extraKeys: {
          "Ctrl-Enter": () => $("btnRun").click(),
          "Cmd-Enter": () => $("btnRun").click()
        }
      });
    }

// Завантажуємо фінальне рішення (якщо є), або чернетку
// 1. Формуємо код, який треба показати
    const pastSolution = state.user?.solutions?.[id];
    const draft = getDraft(id);
    const codeToShow = pastSolution !== undefined ? pastSolution : (draft || "");

    // 2. Якщо вже був обробник автозбереження — правильно його видаляємо!
    if (myCodeMirror._currentChangeHandler) {
      myCodeMirror.off("change", myCodeMirror._currentChangeHandler);
    }

    // 3. Вставляємо код завдання у редактор
    myCodeMirror.setValue(codeToShow);

    const savedBadge = $("badgeSaved");
    if (savedBadge) {
      savedBadge.textContent = draft ? "Saved" : "Not saved";
      savedBadge.style.opacity = draft ? "1" : ".75";
    }

    // 4. Створюємо іменований обробник (щоб потім його можна було видалити)
    myCodeMirror._currentChangeHandler = (cm, changeObj) => {
      // Ігноруємо штучну зміну (коли код просто підвантажується через setValue)
      if (changeObj.origin === "setValue") return; 

      if (savedBadge) { savedBadge.textContent = "Saving..."; savedBadge.style.opacity = "1"; }
      clearTimeout(myCodeMirror._autosaveTimer);
      myCodeMirror._autosaveTimer = setTimeout(() => {
        setDraft(id, myCodeMirror.getValue());
        if (savedBadge) { savedBadge.textContent = "Saved"; savedBadge.style.opacity = "1"; }
      }, 350);
    };

    // 5. Вішаємо новий правильний обробник
    myCodeMirror.on("change", myCodeMirror._currentChangeHandler);

    // buttons
    $("btnClear").onclick = () => {
      if (!confirm("Очистити редактор?")) return;
      myCodeMirror.setValue(""); // Замість editor.value = ""
      setDraft(id, "");
      if (savedBadge) savedBadge.textContent = "Not saved";
      if (terminal) terminal.textContent = ">>> Cleared.";
      toast("🧼 Очищено");
    };

    $("btnHint").onclick = () => {
      const hb = $("hintBox");
      hb.style.display = hb.style.display === "block" ? "none" : "block";
    };

if (isAssignedAutoTask) {
  $("btnPrev").style.display = "none";
  $("btnNext").style.display = "none";
  $("btnNext").classList.remove("unlocked");
} else {
  $("btnPrev").style.display = "";
  $("btnNext").style.display = "";

  $("btnPrev").onclick = () => {
    if (idx > 0) goto(`/lesson/${course.id}/${mod.id}/${idx - 1}`);
    else {
      if (String(course.id) === "practice") {
        goto("/home");
      } else {
        goto(`/course/${course.id}`);
      }
    }
  };

  $("btnNext").onclick = () => {
    if (!$("btnNext").classList.contains("unlocked")) return;
    if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
    else goto(`/course/${course.id}`);
  };

  $("btnNext").classList.remove("unlocked");
  if (completionState(id)) $("btnNext").classList.add("unlocked");
}

  enableTermInput(false);
  _pendingInputResolve = null;
  setTermStatus("Running...");
// RUN
    $("btnRun").onclick = async () => {
      const btn = $("btnRun");
      if (btn.disabled) return; // Блокуємо повторні натискання
      
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Running...`; // Змінюємо текст кнопки

      const code = myCodeMirror.getValue();
      setTerminalPromptLabel("", false);
      // Показуємо користувачу, що код виконується
      if (terminal) terminal.textContent = ">>> Running...\n";
      
// Чекаємо результатів від Skulpt
      const run = await runTaskTestsSmart(task, code);

      if (terminal) terminal.innerHTML = buildTerminalReport(run);
      // setTerminalPromptLabel("", false);
enableTermInput(false);
_pendingInputResolve = null;

      // ✅ ВСТАВЛЯЄМО РОЗБЛОКУВАННЯ ТУТ (одразу як код відпрацював)
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.innerHTML = `<i class="ri-play-fill"></i> Run`;

      // ==============================
      // FAIL (Помилка виконання або не пройдені тести)
      // ==============================
      if (!run.allPass) {
                const failedTests = (run.results || [])
          .filter(r => !r.pass)
          .map(r => ({
            name: r.name || "Тест",
            reason: r.reason || "Провалено",
            want: r.want || "",
            got: r.got || ""
          }));

        addErrorLog(id, {
          courseId: course.id,
          moduleId: mod.id,
          moduleTitle: mod.title,
          taskIndex: origIdx,
          taskTitle: task.title || `Task ${origIdx + 1}`,
          kind: !run.exec?.ok ? "runtime" : "tests",
          runtimeError: run.exec?.ok ? "" : String(run.exec?.error || ""),
          failedTests,
          code: myCodeMirror.getValue()
        });
        const alreadyDone = !!completionState(id);
        if (!alreadyDone) {
          const n = incAttempts(id);
          $("badgeAttempts").textContent = `Спроби: ${Math.min(n, 10)}/10`;

const runtimeFriendly = !run.exec?.ok ? explainPythonError(run.exec?.error || "") : null;

if (n >= 10 && !isSpoiled(id)) {
  if (solBox) {
    solBox.style.display = "block";
    solPre.textContent = "Рішення доступне після 10 спроб. Натисни кнопку, щоб відкрити (буде без XP).";
    if (btnShowSol) btnShowSol.style.display = "inline-flex";
  }
  toast("🧩 Рішення стало доступним після 10 спроб");
} else {
  toast(!run.exec?.ok ? `❌ ${runtimeFriendly.short}` : "❌ Не всі тести пройдені");
}
} else {
  toast(!run.exec?.ok ? `❌ ${runtimeFriendly.short}` : "❌ Не всі тести пройдені");
}
        
        // Тут ми ПЕРЕРИВАЄМО виконання функції, якщо є помилка, щоб не йти в SUCCESS
        return; 
      }

     // ==============================
      // SUCCESS (Всі тести пройдені)
      // ==============================
const already = !!completionState(id);
if (isTeacherPreview) {
  playSuccessSound(!!state.settings.sound);
  fireConfetti();

  toast("👀 Режим перегляду вчителя: перевірка виконана без збереження прогресу");
  $("btnNext").classList.add("unlocked");

  btn.disabled = false;
  btn.style.opacity = "1";
  btn.innerHTML = `<i class="ri-play-fill"></i> Run`;
  return;
}

if (!already) {
  const spoiledNow = isSpoiled(id);

  // === ВЧИТЕЛЬСЬКЕ АВТО-ЗАВДАННЯ ===
  if (isAssignedAutoTask) {
    setCompleted(id, "no_xp");

    state.user.solutions = state.user.solutions || {};
    state.user.solutions[id] = myCodeMirror.getValue();

    updateStreak(state.user);
    save();
    updateUserUI();

    let score = null;
    try {
      score = await finalizeActiveAutoAssignment(
        course.id,
        mod.id,
        origIdx,
        task.title || `Завдання ${origIdx + 1}`
      );
    } catch (e) {
      console.error("Auto assignment sync error:", e);
    }

    playSuccessSound(!!state.settings.sound);
    fireConfetti();

    if (!score) {
      const fallbackTaskId = uid(course.id, mod.id, origIdx);
      score = calculateAssignedAutoPoints({
        attemptsFailed: getAttempts(fallbackTaskId),
        dueAt: activeAuto?.dueAt || null
      });
    }

    showAssignedAutoSuccessOverlay(task.title, score);
  }

  // === ЗВИЧАЙНЕ КУРСОВЕ ЗАВДАННЯ З XP ===
  else if (!spoiledNow) {
    setCompleted(id, "xp");

    state.user.solutions = state.user.solutions || {};
    state.user.solutions[id] = myCodeMirror.getValue();

    const baseXp = task.xp || 0;
    const attemptsBefore = getAttempts(id);
    const bonuses = calculateBonuses({
      baseXp,
      attemptsBefore,
      taskId: id,
      courseId: course.id
    });

    const totalXP = baseXp + bonuses.sniper + bonuses.speed + bonuses.streakBonus;

    state.user.xp += totalXP;

    updateStreak(state.user);
    save();
    updateUserUI();

    playSuccessSound(!!state.settings.sound);
    fireConfetti();

    restoreSuccessOverlayXpMode();

    $("successTaskName").textContent = task.title;
    $("xpBase").textContent = `+${baseXp}`;
    $("xpSniper").textContent = bonuses.sniper ? `+${bonuses.sniper}` : "0";
    $("xpSpeed").textContent = bonuses.speed ? `+${bonuses.speed}` : "0";
    $("xpStreak").textContent = bonuses.streakBonus ? `+${bonuses.streakBonus}` : "0";
    $("xpTotal").textContent = `+${totalXP} XP`;

    const successOverlay = $("successOverlay");
    if (successOverlay) {
      successOverlay.classList.add("active");

      $("btnSuccessNext").onclick = () => {
        successOverlay.classList.remove("active");
        if (idx < refs.length - 1) goto(`/lesson/${course.id}/${mod.id}/${idx + 1}`);
        else goto(`/course/${course.id}`);
      };

      const btnStay = $("btnSuccessStay");
      if (btnStay) {
        btnStay.onclick = () => {
          successOverlay.classList.remove("active");
          $("btnNext").classList.add("unlocked");
        };
      }
    } else {
      toast(`✅ SUCCESS! +${totalXP} XP`);
      $("btnNext").classList.add("unlocked");
    }
  }

  // === ЗВИЧАЙНЕ КУРСОВЕ ЗАВДАННЯ БЕЗ XP (відкривали рішення) ===
  else {
    setCompleted(id, "no_xp");

    state.user.solutions = state.user.solutions || {};
    state.user.solutions[id] = myCodeMirror.getValue();

    updateStreak(state.user);
    save();
    updateUserUI();

    toast("✅ Зараховано, але без XP (було відкрито рішення)");
    $("btnNext").classList.add("unlocked");
  }
} else {
  state.user.solutions = state.user.solutions || {};
  state.user.solutions[id] = myCodeMirror.getValue();
  save();

  if (isAssignedAutoTask) {
    let score = null;
    try {
      score = await finalizeActiveAutoAssignment(
        course.id,
        mod.id,
        origIdx,
        task.title || `Завдання ${origIdx + 1}`
      );
    } catch (e) {
      console.error("Auto assignment sync error:", e);
    }

    if (score) {
      showAssignedAutoSuccessOverlay(task.title, score);
    } else {
      toast("✅ Уже зараховано");
    }
  } else {
    toast("✅ Уже зараховано");
    $("btnNext").classList.add("unlocked");
  }
}
      // Перевірка, чи це була остання задача в модулі
      const mp = moduleProgress(course.id, mod.id);
      if (mp.done === mp.total) {
        setTimeout(() => fireConfetti(), 160);
        toast("🎉 Модуль завершено!");
      }

      if (String(course.id) === "practice") {
  renderSidebarHome();
} else {
  renderSidebarModuleTasks(course.id, mod.id, idx);
}

      // Розблоковуємо кнопку після завершення
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.innerHTML = `<i class="ri-play-fill"></i> Run`;
    };

    // breadcrumbs
    document.querySelectorAll("[data-crumb-home]").forEach(el => {
  el.onclick = () => goto("/home");
});

document.querySelectorAll("[data-crumb-course]").forEach(el => {
  el.onclick = () => {
    if (String(course.id) === "practice") {
      goto("/home");
    } else {
      goto(`/course/${course.id}`);
    }
  };
});

    if (String(course.id) === "practice") {
  renderSidebarHome();
} else {
  renderSidebarModuleTasks(course.id, mod.id, idx);
}
    setTerminalPromptLabel("Тест: prompt видно", true);
  }

  // ===========================
  // Routes
  // ===========================
  function renderTeacher() {
    // 1. Перевіряємо, чи це дійсно вчитель
    if (state?.user?.role !== "teacher") {
      toast("⛔ Доступ заборонено. Ця сторінка лише для вчителів.");
      return goto("/home");
    }

    // 2. Показуємо потрібний HTML-блок
    setActiveView($("viewTeacher"));
    
    // 3. Оновлюємо ліве меню
    sidebarApi.renderSidebarHome();

    // 4. Запускаємо логіку модуля вчителя (його ми створимо наступним кроком)
    if (window.App.uiTeacher) {
      window.App.uiTeacher.create({ 
  $, 
  supa, 
  state, 
  toast,
  save,
  refreshSidebar: () => sidebarApi.renderSidebarHome()
}).renderDashboard();
    } else {
      $("teacherContent").innerHTML = `<div style="color:var(--danger); padding: 20px;">Модуль ui-teacher.js не підключено!</div>`;
    }
  }
function closeMobileMenu() {
  document.querySelector(".sidebar")?.classList.remove("open");
  document.querySelector(".sidebar-overlay")?.classList.remove("active");
}
function renderByRoute() {

    closeMobileMenu();

    if (!location.hash) goto("/home");

    if (!state.user) {
      setTeacherModeChrome(false);
      showAuth();
      renderHome();
      return;
    } else {
      hideAuth();
    }

    applyTheme(state.settings.theme || "dark");
    updateUserUI();

    const parts = routeParse();
    const root = parts[0] || "home";

    setTeacherModeChrome(root === "teacher");
    if (root === "home") return renderHome();
    if ((root === "course" || root === "modules") && parts[1]) return renderCourseModules(parts[1]);
    if (root === "lesson" && parts.length === 4) return renderLesson(parts[1], parts[2], parts[3]);
    if (root === "leaderboard") return renderLeaderboard();
    if (root === "teacher") return renderTeacher(); // <--- ДОДАЛИ ЦЕЙ РЯДОК

    goto("/home");
  }

    // ===========================
  // Events bind
  // ===========================
  function bindEvents() {
    on($("btnGoHome"), "click", () => goto("/home"));
    on($("btnOpenSettings"), "click", showSettings);





    // on($("btnOpenSettings"), "click", openSettings);
    on($("btnCloseSettings"), "click", closeSettings);

    on(settingsOverlay, "click", (e) => {
      if (e.target === settingsOverlay) closeSettings();
    });

    on($("soundToggle"), "change", (e) => {
      state.settings.sound = !!e.target.checked;
      save();
      toast("✅ Збережено");
    });

    on($("btnTheme"), "click", toggleTheme);


    on($("btnResetAll"), "click", () => {
      if (!confirm("Точно очистити прогрес?")) return;
      resetAll();
      replaceState(defaultState);
      toast("🧼 Reset done");
      closeSettings();
      showAuth();
      goto("/home");
      renderByRoute();
    });

   // Створення затемнення для мобільного меню
    const sbOverlay = document.createElement("div");
    sbOverlay.className = "sidebar-overlay";
    document.body.appendChild(sbOverlay);

    const btnMobileMenu = $("btnMobileMenu");
    const sidebar = document.querySelector(".sidebar");

    if (btnMobileMenu) {
      btnMobileMenu.onclick = () => {
        sidebar.classList.add("open");
        sbOverlay.classList.add("active");
      };
    }

    // Закриття по кліку на темний фон
    sbOverlay.onclick = () => {
      sidebar.classList.remove("open");
      sbOverlay.classList.remove("active");
    };
    window.addEventListener("hashchange", renderByRoute);
  }

  // ===========================
  // Settings
  // ===========================
// --- ЛОГІКА НАЛАШТУВАНЬ ---
  function showSettings() {
    const overlay = $("settingsOverlay");
    if (!overlay) return;

    // 1. Заповнюємо картку профілю
    const userName = state?.user?.name || "Гість";
    $("setUserName").textContent = userName;
    $("setAvatar").textContent = userName.charAt(0).toUpperCase();

    // 2. Визначаємо роль і налаштовуємо видимість блоків
    const roleText = $("setUserRole");
    const classBox = $("settingsCurrentClassBox");
    const classBadge = $("settingsClassBadge");
    
    const studentControls = $("settingsStudentControls");
    const teacherControls = $("settingsTeacherControls");

    if (state?.user?.role === "teacher") {
      roleText.textContent = "👨‍🏫 Вчитель";
      if (classBox) classBox.style.display = "none";
      if (studentControls) studentControls.style.display = "none";
      if (teacherControls) teacherControls.style.display = "block";
    } else if (state?.user?.role === "student") {
      const code = state?.user?.class_code;
      if (code) {
        roleText.textContent = `🎒 Учень`;
        classBadge.textContent = code;
        classBox.style.display = "block";
      } else {
        roleText.textContent = "🎒 Учень (Без класу)";
        classBox.style.display = "none";
      }
      if (studentControls) studentControls.style.display = "block";
      if (teacherControls) teacherControls.style.display = "none";
    } else {
      roleText.textContent = "💻 Локальний гравець";
      if (classBox) classBox.style.display = "none";
      if (studentControls) studentControls.style.display = "none";
      if (teacherControls) teacherControls.style.display = "none";
    }

    overlay.classList.add("active");

    // --- ОБРОБНИКИ ПОДІЙ ---
    $("btnCloseSettings").onclick = () => overlay.classList.remove("active");
    
$("btnSettingsTheme").onclick = () => {
  if (window.App.theme) window.App.theme.toggleTheme(state, myCodeMirror, save, toast);
};

    // Приєднатися до класу (Учень)
    const btnJoinClass = $("btnSettingsJoinClass");
if (btnJoinClass) {
  btnJoinClass.onclick = async () => {
    const newCode = $("settingsClassInput").value.trim().toUpperCase();
    if (!newCode) return toast("⚠️ Введи код класу!");

    btnJoinClass.textContent = "⏳...";
    try {
      const { data: classRow, error: classErr } = await supa
        .from("classes")
        .select("code, name")
        .eq("code", newCode)
        .maybeSingle();

      if (classErr) throw classErr;
      if (!classRow) {
        toast("⚠️ Клас з таким кодом не знайдено");
        return;
      }

      const { data: { user } } = await supa.auth.getUser();
      if (user) {
        const { error } = await supa
          .from("profiles")
          .update({ class_code: classRow.code })
          .eq("id", user.id);

        if (error) throw error;
      }

      state.user.class_code = classRow.code;
      save();

      toast(`✅ Ти приєднався до класу ${classRow.name}`);
      if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
      showSettings();
      $("settingsClassInput").value = "";
    } catch (e) {
      console.error(e);
      toast("❌ Помилка оновлення");
    } finally {
      btnJoinClass.textContent = "Ок";
    }
  };
}

    // Покинути клас (Учень)
    const btnLeaveClass = $("btnSettingsLeaveClass");
    if (btnLeaveClass) {
      btnLeaveClass.onclick = async () => {
        if (!confirm("Дійсно хочеш покинути поточний клас?")) return;
        try {
          const { data: { user } } = await supa.auth.getUser();
          if (user) await supa.from("profiles").update({ class_code: null }).eq("id", user.id);
          state.user.class_code = null;
          save();
          toast("✅ Ти покинув клас");
          if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
          showSettings();
        } catch (e) {
          toast("❌ Помилка");
        }
      };
    }

    // Зміна ролі: З Учня на Вчителя
    const btnBecomeTeacher = $("btnSettingsBecomeTeacher");
    if (btnBecomeTeacher) {
      btnBecomeTeacher.onclick = async () => {
        if (!confirm("Дійсно хочеш стати Вчителем? Ти автоматично вийдеш зі свого поточного класу учнів.")) return;
        btnBecomeTeacher.textContent = "⏳...";
        try {
          const { data: { user } } = await supa.auth.getUser();
          if (user) await supa.from("profiles").update({ role: "teacher", class_code: null }).eq("id", user.id);
          
          state.user.role = "teacher";
          state.user.class_code = null; // Виходимо з класу
          state.user.teacherClasses = state.user.teacherClasses || [];
          save();
          toast("✅ Тепер ти Вчитель!");
          if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
          showSettings();
          // автоматично відкриваємо кабінет вчителя
          goto("/teacher");
        } catch (e) {
          toast("❌ Помилка");
          btnBecomeTeacher.innerHTML = `<i class="ri-user-star-line"></i> Стати Вчителем`;
        }
      };
    }

    // Зміна ролі: З Вчителя на Учня
    const btnBecomeStudent = $("btnSettingsBecomeStudent");
    if (btnBecomeStudent) {
      btnBecomeStudent.onclick = async () => {
        if (!confirm("Дійсно хочеш стати Учнем?")) return;
        btnBecomeStudent.textContent = "⏳...";
        try {
          const { data: { user } } = await supa.auth.getUser();
          if (user) await supa.from("profiles").update({ role: "student", class_code: null }).eq("id", user.id);
          
          state.user.role = "student";
          state.user.class_code = null;
          save();
          toast("✅ Тепер ти Учень!");
          if (typeof sidebarApi !== "undefined") sidebarApi.renderSidebarHome();
          
          // Якщо він був у кабінеті вчителя, перекидаємо на головну сторінку
          if (location.hash === "#/teacher") window.location.hash = "#/home";
          
          showSettings();
        } catch (e) {
          toast("❌ Помилка");
          btnBecomeStudent.innerHTML = `<i class="ri-user-smile-line"></i> Стати Учнем`;
        }
      };
    }

    // Вийти з акаунта
    const btnLogout = $("btnLogout");
    if (btnLogout) {
      btnLogout.onclick = async () => {
        if (!confirm("Дійсно хочеш вийти з акаунта? Твій прогрес збережено у хмарі.")) return;
        try {
          if (supa) await supa.auth.signOut();
          window.App.storage.resetAll();
          window.location.hash = "";
          window.location.reload();
        } catch (e) {
          toast("❌ Помилка при виході");
        }
      };
    }
  }

// ===========================
  // Start
  // ===========================
  bindEvents();
  typingTick();
  applyTheme(state.settings.theme || "dark");

  // --- 1. Ініціалізація нового модуля авторизації ---
const authUI = window.App.authUI.create({
  $,
  on,
  supa,
  state,
  save,
  toast,
  updateStreak,
onAuthSuccess: async () => {
  try {
    const user = await getSessionUser();

    if (user) {
      const cloud = await cloudLoadState(user.id);
      if (cloud) {
        replaceState(cloud);
        save();
      }

      await loadClassAccessForStudent(user.id);
    }

    goto("/home");
    renderByRoute();
  } catch (e) {
    console.error("Post-login sync error:", e);
    goto("/home");
    renderByRoute();
  }
}
});


  // --- 2. Стартовий запуск (з перевіркою ролей) ---
  (async () => {
    // якщо користувач уже увійшов через Google — підтягуємо прогрес

    if (supa) {
      const user = await getSessionUser();
      if (user) {
        try {
          const cloud = await cloudLoadState(user.id);
          if (cloud) {
            replaceState(cloud);
            save();
          } else {
            // перший вхід: якщо локально вже є user — заливаємо, якщо ні — створимо
            if (!state.user) {
              const name =
                user.user_metadata?.full_name ||
                user.email?.split("@")?.[0] ||
                "User";

              state.user = {
              name,
              role: "student",
              xp: 0,
              streak: 1,
              lastDay: null,
              completed: {},
              attempts: {},
              spoiled: {},
              drafts: {},
              errorLogs: {},
              moduleAccess: {},
taskAccess: {},
classModuleAccess: {},
classTaskAccess: {},
solutions: {},
teacherClasses: [],
teacherSchoolName: ""
};
            }
            save();
            await cloudSaveState(user.id, state);
          }

          // === НОВЕ: ПЕРЕВІРЯЄМО ПРОФІЛЬ (Роль) ===
          const isProfileComplete = await authUI.checkCloudProfile(user);
          
          // Якщо профілю немає, authUI покаже вікно вибору ролі і зупинить подальше завантаження
          if (!isProfileComplete) {

  return;
  await loadClassAccessForStudent(user.id);
}
          await loadClassAccessForStudent(user.id);
        } catch {
          // якщо щось з хмарою не так — просто працюємо локально
        }
      }
    }

  
renderByRoute();
  })();
})(); // Це закриває найпершу функцію (function () { ... з початку файлу


