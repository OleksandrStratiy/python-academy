window.App = window.App || {};

window.App.uiHome = (function () {
  "use strict";

  function create(deps) {
    const { $, DB, escapeHtml, courseProgress, openCourseWithLevel, setActiveView, viewHome, renderSidebarHome, state, supa, goto } = deps;

    let currentHomeTab = "courses"; 
    let pendingAssignmentsCount = 0; 

    async function fetchStudentAssignments() {
      if (!supa || !state?.user || state.user.role !== "student") return [];
      const { data: { user }, error: authError } = await supa.auth.getUser();
      if (authError || !user?.id) return [];
      const classCode = String(state.user.class_code || "").trim();
      if (!classCode) return [];

      const safeClassCode = classCode.replaceAll('"', '\\"');

      const { data, error } = await supa
        .from("assignments")
        .select("*")
        .or(`and(target_type.eq.class,class_code.eq."${safeClassCode}"),and(target_type.eq.student,student_id.eq."${user.id}")`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    }

    async function fetchStudentSubmissions() {
      if (!supa || !state?.user || state.user.role !== "student") return [];
      const { data: { user }, error: authError } = await supa.auth.getUser();
      if (authError || !user?.id) return [];

      const { data, error } = await supa
        .from("assignment_submissions")
        .select("*")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      return data || [];
    }

    async function submitStudentAssignment({ assignmentId, submissionText }) {
      if (!supa || !state?.user || state.user.role !== "student") throw new Error("Здавати завдання може лише учень");
      const { data: { user }, error: authError } = await supa.auth.getUser();
      if (authError || !user?.id) throw new Error("Користувача не знайдено");
      const text = String(submissionText || "").trim();
      if (!text) throw new Error("Спочатку введи відповідь");

      const payload = {
        assignment_id: assignmentId,
        student_id: user.id,
        submission_text: text,
        status: "submitted",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supa
        .from("assignment_submissions")
        .upsert(payload, { onConflict: "assignment_id,student_id" })
        .select("*")
        .single();

      if (error) throw error;
      return data;
    }

    function formatAssignmentDate(value) {
      if (!value) return "Без дедлайну";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "Без дедлайну";
      const options = { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" };
      return d.toLocaleDateString("uk-UA", options).replace(",", "");
    }

    function updateHeaderStats() {
      if (!state?.user || state.user.role !== "student") return;
      const xp = state.user.xp || 0;
      const streak = state.user.streak || 0;
      let rank = "Beginner";
      if (xp >= 1000) rank = "Middle";
      if (xp >= 5000) rank = "Senior";
      if (xp >= 10000) rank = "Expert";

      const elStreak = document.getElementById("uiStreak");
      const elTotalXP = document.getElementById("uiTotalXP");
      const elRank = document.getElementById("uiRank");

      if (elStreak) elStreak.innerText = streak;
      if (elTotalXP) elTotalXP.innerText = xp;
      if (elRank) elRank.innerText = rank;

      const elNotifBadge = document.getElementById("uiNotificationBadge");
      const elNotifBell = document.getElementById("uiNotificationBell");
      
      if (elNotifBadge && elNotifBell) {
        if (pendingAssignmentsCount > 0) {
          elNotifBadge.style.display = "block";
          elNotifBadge.style.animation = "pulseDanger 2s infinite";
          elNotifBell.querySelector('i').className = "ri-notification-3-fill";
          elNotifBell.querySelector('i').style.color = "var(--danger)";
          elNotifBell.style.borderColor = "rgba(244, 63, 94, 0.4)";
          elNotifBell.style.background = "rgba(244, 63, 94, 0.1)";
        } else {
          elNotifBadge.style.display = "none";
          elNotifBadge.style.animation = "none";
          elNotifBell.querySelector('i').className = "ri-notification-3-line";
          elNotifBell.querySelector('i').style.color = "var(--text)";
          elNotifBell.style.borderColor = "rgba(255,255,255,0.1)";
          elNotifBell.style.background = "rgba(255,255,255,0.05)";
        }
      }
    }

    function populateNotificationsMenu(todoList) {
      const listContainer = document.getElementById("uiNotificationList");
      const countBadge = document.getElementById("uiNotifCount");
      if (!listContainer || !countBadge) return;
      countBadge.innerText = `${todoList.length} нових`;

      if (todoList.length === 0) {
        listContainer.innerHTML = `<div style="padding: 30px 20px; text-align: center; color: var(--text-dim);"><i class="ri-checkbox-circle-fill" style="font-size: 32px; color: var(--success); opacity: 0.5; margin-bottom: 8px; display: block;"></i><div style="font-size: 13px; font-weight: 600;">Усе виконано!</div><div style="font-size: 11px; margin-top: 4px;">Немає нових завдань.</div></div>`;
        return;
      }

      listContainer.innerHTML = todoList.map(({item, sub}) => {
        const isReturned = sub && sub.status === "returned";
        const isAuto = (item.starter_code_snapshot || "").startsWith("auto|");
        const title = isReturned ? "⚠️ Доопрацювати" : (isAuto ? "🤖 Інтерактивна задача" : "🆕 Нове завдання");
        const color = isReturned ? "var(--danger)" : (isAuto ? "var(--success)" : "var(--primary)");

        return `
          <div class="notif-item" onclick="document.querySelector('[data-home-tab=assignments]').click(); document.getElementById('uiNotificationDropdown').style.display = 'none';" style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: background 0.2s; position: relative;">
            <div style="font-size: 10px; text-transform: uppercase; color: ${color}; font-weight: 800; margin-bottom: 6px; letter-spacing: 0.05em;">${title}</div>
            <div style="font-size: 14px; color: var(--text); font-weight: 700; margin-bottom: 6px; line-height: 1.3;">${escapeHtml(item.title_snapshot || "Без назви")}</div>
            <div style="font-size: 11px; color: var(--text-dim); display: flex; align-items: center; gap: 4px;"><i class="ri-calendar-event-line"></i> Дедлайн: ${escapeHtml(formatAssignmentDate(item.due_at))}</div>
            <style>.notif-item:hover { background: rgba(255,255,255,0.03); }</style>
          </div>
        `;
      }).join("");
    }

    function bindNotificationBell() {
      const bell = document.getElementById("uiNotificationBell");
      const drop = document.getElementById("uiNotificationDropdown");
      if (bell && drop && !bell.dataset.bound) {
        bell.dataset.bound = "true";
        bell.addEventListener("click", (e) => { e.stopPropagation(); drop.style.display = drop.style.display === "none" ? "block" : "none"; });
        document.addEventListener("click", (e) => { if (!bell.contains(e.target) && !drop.contains(e.target)) drop.style.display = "none"; });
      }
    }

    function renderTabsUI() {
      const mount = $("studentTabsMount");
      if (!mount) return;
      mount.innerHTML = `
        <style>@keyframes pulseDanger { 0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); } 70% { box-shadow: 0 0 0 6px rgba(244, 63, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); } }</style>
        <div style="display: flex; justify-content: center; margin-bottom: 40px; margin-top: 10px;">
          <div style="display: flex; gap: 8px; background: rgba(0,0,0,0.3); padding: 6px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
            <button class="teacher-btn ${currentHomeTab === 'courses' ? 'teacher-btn--primary' : 'teacher-btn--ghost'}" data-home-tab="courses" style="margin: 0; border-radius: 12px; padding: 10px 24px; font-size: 15px; border: none; background: ${currentHomeTab === 'courses' ? 'var(--primary)' : 'transparent'};"><i class="ri-book-open-fill"></i> Навчальні курси</button>
            <button class="teacher-btn ${currentHomeTab === 'assignments' ? 'teacher-btn--primary' : 'teacher-btn--ghost'}" data-home-tab="assignments" style="margin: 0; border-radius: 12px; padding: 10px 24px; font-size: 15px; position: relative; border: none; background: ${currentHomeTab === 'assignments' ? 'var(--accent)' : 'transparent'}; color: ${currentHomeTab === 'assignments' ? '#fff' : 'var(--text-dim)'};">
              <i class="ri-file-edit-fill"></i> Мої завдання
              ${pendingAssignmentsCount > 0 ? `<span style="position: absolute; top: -6px; right: -6px; background: var(--danger); color: #fff; font-size: 11px; font-weight: 800; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 50%; animation: pulseDanger 2s infinite; border: 2px solid var(--bg);">${pendingAssignmentsCount}</span>` : ''}
            </button>
          </div>
        </div>
      `;
      mount.querySelectorAll("[data-home-tab]").forEach(btn => { btn.onclick = () => { currentHomeTab = btn.getAttribute("data-home-tab"); renderTabsUI(); updateContentVisibility(); }});
    }

    function updateContentVisibility() {
      const courses = $("coursesList");
      const assignments = $("studentAssignmentsHome");
      if (courses) courses.style.display = currentHomeTab === 'courses' ? 'grid' : 'none';
      if (assignments) assignments.style.display = currentHomeTab === 'assignments' ? 'block' : 'none';
    }

    function renderCoursesGrid() {
      const grid = $("coursesList");
      if (!grid) return;
      grid.innerHTML = `
        <style>
          .course-premium-card { background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
          .course-premium-card:hover { transform: translateY(-6px); background: rgba(30,41,59,0.7); border-color: rgba(14, 165, 233, 0.4); box-shadow: 0 15px 35px rgba(0,0,0,0.25), 0 0 20px rgba(14,165,233,0.1); }
          .course-premium-card:hover .course-action-icon { transform: translateX(6px); color: var(--primary); }
          .course-icon-wrapper { width: 56px; height: 56px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: inset 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s; }
          .course-premium-card:hover .course-icon-wrapper { background: rgba(14, 165, 233, 0.1); border-color: rgba(14, 165, 233, 0.2); }
          .course-desc-text { margin: 0 0 24px 0; font-size: 13px; color: var(--text-dim); line-height: 1.5; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        </style>
        ${DB.map(c => {
          const p = courseProgress(c);
          const isStarted = p.done > 0;
          const isCompleted = p.total > 0 && p.done === p.total;
          let statusHtml = '';
          if (isCompleted) { statusHtml = `<span style="color: var(--success); background: rgba(34,197,94,0.1); padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;"><i class="ri-check-double-line"></i> Пройдено</span>`; }
          else if (isStarted) { statusHtml = `<span style="color: var(--warn); background: rgba(251,191,36,0.1); padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;"><i class="ri-play-circle-line"></i> В процесі</span>`; }
          else { statusHtml = `<span style="color: var(--text-dim); background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;"><i class="ri-star-line"></i> Новий</span>`; }
          const btnText = isCompleted ? "Повторити матеріал" : (isStarted ? "Продовжити навчання" : "Почати курс");
          return `
            <div class="course-premium-card" data-open-course="${escapeHtml(c.id)}">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);"></div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;"><div class="course-icon-wrapper">${c.icon}</div><div>${statusHtml}</div></div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--text); font-weight: 800; line-height: 1.3;">${escapeHtml(c.title)}</h3>
              <p class="course-desc-text">${escapeHtml(c.desc)}</p>
              <div style="margin-top: auto;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; margin-bottom: 8px;"><span style="color: var(--text-dim);">${p.done} / ${p.total} завдань</span><span style="color: var(--primary);">${p.pct}%</span></div>
                <div style="height: 6px; background: rgba(0,0,0,0.4); border-radius: 3px; overflow: hidden; margin-bottom: 16px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);"><div style="height: 100%; width: ${p.pct}%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 3px; box-shadow: 0 0 10px var(--primary);"></div></div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;"><span style="font-size: 13px; font-weight: 700; color: var(--text);">${btnText}</span><i class="ri-arrow-right-line course-action-icon" style="font-size: 18px; color: var(--text-dim); transition: all 0.3s;"></i></div>
              </div>
            </div>`;
        }).join("")}
      `;
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
      grid.style.gap = "24px";
      grid.style.maxWidth = "1000px";
      grid.style.width = "100%";
      grid.style.margin = "0 auto";
      grid.querySelectorAll("[data-open-course]").forEach(card => { card.addEventListener("click", () => { openCourseWithLevel(card.getAttribute("data-open-course")); }); });
    }

    async function renderStudentAssignmentsHome() {
      const mount = $("studentAssignmentsHome");
      if (!mount) return;
      if (!state?.user || state.user.role !== "student") { mount.innerHTML = ""; return; }
      mount.style.maxWidth = "800px"; mount.style.margin = "0 auto"; mount.style.width = "100%";
      mount.innerHTML = `<div class="teacher-empty" style="padding: 40px; background: rgba(0,0,0,0.2); border-radius: 16px;"><i class="ri-loader-4-line ri-spin"></i> Завантаження завдань...</div>`;

      try {
        const [assignments, letSubmissions] = await Promise.all([fetchStudentAssignments(), fetchStudentSubmissions()]);
        const submissions = [...letSubmissions];
        let needsRefetch = false;

        // МАКІЯ АВТОСИНХРОНІЗАЦІЇ: Якщо учень вже пройшов термінал, автоматом відправляємо оцінку!
        for (const item of assignments) {
          if (item.status === "closed") continue;
          const starterStr = item.starter_code_snapshot || "";
          
          if (starterStr.startsWith("auto|")) {
            const parts = starterStr.split("|");
            const cId = parts[1] || "practice";
            const mId = parts[2] || "";
            const tIdx = parts[3] || "0";
            const taskUid = `${cId}_${mId}_${tIdx}`;
            
            // Перевіряємо локальний прогрес
            const isLocallyDone = state?.user?.completed && state.user.completed[taskUid];
            const sub = submissions.find(s => s.assignment_id === item.id);
            
            // Якщо локально зроблено, а в базі немає здачі — СИНХРОНІЗУЄМО
            if (isLocallyDone && (!sub || sub.status !== "reviewed")) {
              try {
                await supa.from("assignment_submissions").upsert({
                  assignment_id: item.id,
                  student_id: state.user.id,
                  submission_text: "💻 Код успішно пройшов усі автоматичні тести системи.",
                  status: "reviewed", // Автоматом ОЦІНЕНО
                  points: item.max_score_snapshot || 100,
                  teacher_comment: "🤖 Автоматично перевірено та зараховано системою.",
                  submitted_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }, { onConflict: "assignment_id,student_id" });
                needsRefetch = true;
              } catch (e) { console.error("Auto-submit error:", e); }
            }
          }
        }

        // Оновлюємо дані, якщо відбулася авто-синхронізація
        if (needsRefetch) {
          const freshSubs = await fetchStudentSubmissions();
          submissions.length = 0;
          submissions.push(...freshSubs);
        }
        
        const todoList = []; const reviewList = []; const doneList = [];
        assignments.forEach(item => {
          const sub = submissions.find(s => s.assignment_id === item.id) || null;
          if (item.status === "closed") doneList.push({ item, sub });
          else if (!sub || sub.status === "returned") todoList.push({ item, sub }); 
          else if (sub.status === "submitted" || sub.status === "review") reviewList.push({ item, sub }); 
          else if (sub.status === "reviewed") doneList.push({ item, sub }); 
        });

        todoList.sort((a, b) => new Date(a.item.due_at || '9999') - new Date(b.item.due_at || '9999'));
        pendingAssignmentsCount = todoList.length;

        populateNotificationsMenu(todoList);
        bindNotificationBell();
        renderTabsUI();
        updateHeaderStats();

        if (!assignments.length) {
          mount.innerHTML = `<div style="padding: 60px 20px; background: rgba(30,41,59,0.3); border: 1px dashed rgba(255,255,255,0.1); border-radius: 20px; text-align: center;"><i class="ri-cup-line" style="font-size: 56px; color: var(--text-dim); margin-bottom: 16px; display: inline-block;"></i><div style="color: var(--text); font-size: 18px; font-weight: 600;">Немає завдань</div><div style="color: var(--text-dim); font-size: 15px; margin-top: 8px;">Вчитель поки що нічого не задав. Можеш відпочивати! 🎉</div></div>`;
          return;
        }

        const renderCompactCard = ({ item, sub }, isOpen = false) => {
          const canSubmit = item.status !== "closed";
          const subStatus = sub?.status || null;
          
          const starterStr = item.starter_code_snapshot || "";
          const isAutoModule = starterStr.startsWith("auto|");
          
          let cId = "practice", mId = "", tIdx = "0";
          if (isAutoModule) {
             const parts = starterStr.split("|");
             cId = parts[1] || "practice";
             mId = parts[2] || "";
             tIdx = parts[3] || "0";
          }

          let statusColor = "var(--primary)"; let statusBg = "rgba(14, 165, 233, 0.1)"; let statusLabel = "Нове"; let icon = "ri-asterisk";

          if (isAutoModule && !subStatus) { statusColor = "var(--primary)"; statusBg = "rgba(14, 165, 233, 0.1)"; statusLabel = "Авто-задача"; icon = "ri-terminal-box-fill"; }
          if (subStatus === "submitted") { statusColor = "var(--warn)"; statusBg = "rgba(251, 191, 36, 0.1)"; statusLabel = "Очікує"; icon = "ri-time-line"; }
          if (subStatus === "review") { statusColor = "var(--warn)"; statusBg = "rgba(251, 191, 36, 0.1)"; statusLabel = "Перевіряється"; icon = "ri-eye-line"; }
          if (subStatus === "reviewed") { statusColor = "var(--success)"; statusBg = "rgba(34, 197, 94, 0.1)"; statusLabel = "Оцінено"; icon = "ri-check-double-line"; }
          if (subStatus === "returned") { statusColor = "var(--danger)"; statusBg = "rgba(244, 63, 94, 0.1)"; statusLabel = "Доопрацювати"; icon = "ri-error-warning-line"; }
          if (item.status === "closed") { statusColor = "var(--text-dim)"; statusBg = "rgba(255, 255, 255, 0.05)"; statusLabel = "Закрито"; icon = "ri-lock-line"; }

          return `
            <details class="student-task-accordion" style="background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin-bottom: 12px; overflow: hidden; border-left: 4px solid ${statusColor}; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: background 0.2s;" ${isOpen ? "open" : ""}>
              <summary class="student-task-summary" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; list-style: none;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="background: ${statusBg}; color: ${statusColor}; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;"><i class="${icon}"></i> ${statusLabel}</span>
                    <span style="font-size: 11px; color: var(--text-dim); display: flex; align-items: center; gap: 4px;"><i class="ri-pushpin-line"></i> Видано: ${escapeHtml(formatAssignmentDate(item.created_at))}</span>
                  </div>
                  <h4 style="margin: 0; font-size: 16px; color: var(--text);">${isAutoModule ? "🤖 " : ""}${escapeHtml(item.title_snapshot || "Без назви")}</h4>
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="font-size: 11px; color: var(--text); display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.3); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.02);"><i class="ri-calendar-event-line" style="color: ${item.due_at ? 'var(--primary)' : 'var(--text-dim)'};"></i> Дедлайн: ${escapeHtml(formatAssignmentDate(item.due_at))}</div>
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;"><i class="ri-arrow-down-s-line task-chevron" style="font-size: 20px; color: var(--text-dim); transition: transform 0.3s;"></i></div>
                </div>
              </summary>
              
              <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
                <div style="font-size: 14px; color: var(--text-dim); line-height: 1.6; margin-bottom: 20px; white-space: pre-wrap;">${item.description_snapshot ? escapeHtml(item.description_snapshot) : "Опис відсутній."}</div>

                ${item.note_for_student ? `<div style="background: rgba(0,0,0,0.2); padding: 14px; border-left: 2px solid var(--accent); border-radius: 0 10px 10px 0; font-size: 13px; color: var(--text); margin-bottom: 20px;"><b style="color: var(--accent); font-size: 11px; text-transform: uppercase; display: block; margin-bottom: 6px;">Від вчителя:</b> ${escapeHtml(item.note_for_student)}</div>` : ``}

                ${isAutoModule ? `
                  <div style="margin-top: 20px;">
                    ${subStatus === 'reviewed' ? `
                      <div style="text-align: center; padding: 16px; font-size: 14px; color: var(--success); background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; font-weight: 600;">
                        <i class="ri-shield-check-fill" style="font-size: 18px; vertical-align: text-bottom; margin-right: 4px;"></i> Автоперевірку успішно пройдено! Оцінка виставлена автоматично.
                      </div>
                    ` : `
                      <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border-left: 2px solid var(--primary); margin-bottom: 16px;">
                        <p style="margin: 0; font-size: 13px; color: var(--text-dim);">Це завдання виконується в інтерактивному терміналі. Натисни кнопку нижче, щоб перейти до виконання. Як тільки ти пройдеш перевірку, воно автоматично зарахується вчителю.</p>
                      </div>
                      <button type="button" class="teacher-btn" data-open-terminal="${cId}|${mId}|${tIdx}" style="width: 100%; background: var(--primary); border-color: var(--primary); padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 700; justify-content: center; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); color: #fff;">
                        <i class="ri-play-circle-fill" style="font-size: 18px;"></i> Виконати завдання
                      </button>
                    `}
                  </div>
                ` : `
                  ${sub ? `
                    <div style="margin-top: 10px; padding: 16px; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; background: rgba(0,0,0,0.2);">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Твоя відповідь:</div>
                        ${sub.points != null ? `<div style="background: rgba(34,197,94,0.15); color: var(--success); padding: 4px 12px; border-radius: 8px; font-weight: 800; font-size: 13px;">Оцінка: ${sub.points} / ${item.max_score_snapshot || 12}</div>` : ""}
                      </div>
                      <div style="font-family: var(--mono); font-size: 13px; color: var(--text); white-space: pre-wrap; background: rgba(0,0,0,0.4); padding: 16px; border-radius: 10px; max-height: 200px; overflow-y: auto;">${escapeHtml(sub.submission_text || "—")}</div>
                      ${sub.teacher_comment ? `<div style="margin-top: 16px; font-size: 13px; color: var(--warn); background: rgba(251, 191, 36, 0.05); padding: 14px; border-radius: 10px; border: 1px solid rgba(251, 191, 36, 0.15);"><b style="display: block; margin-bottom: 6px; font-size: 11px; text-transform: uppercase;">Фідбек вчителя:</b> ${escapeHtml(sub.teacher_comment)}</div>` : ``}
                    </div>
                  ` : ``}

                  ${canSubmit ? `
                    <form data-student-submit-form="${item.id}" style="margin-top: ${sub ? '20px' : '0'}; display: flex; flex-direction: column; gap: 12px;">
                      <textarea name="submissionText" rows="${sub ? 2 : 4}" class="teacher-input" style="margin: 0; font-size: 14px; padding: 16px; font-family: ${item.solution_format_snapshot === 'code' ? 'var(--mono)' : 'var(--font)'}; background: rgba(0,0,0,0.3); border-radius: 12px;" placeholder="${item.solution_format_snapshot === "code" ? "Напиши свій код сюди..." : "Напиши свою відповідь сюди..."}">${escapeHtml(sub?.submission_text || "")}</textarea>
                      <button type="submit" class="teacher-btn teacher-btn--primary" style="margin: 0; padding: 12px; font-size: 14px; border-radius: 12px; justify-content: center; background: ${sub ? 'rgba(255,255,255,0.05)' : 'var(--primary)'}; border-color: ${sub ? 'rgba(255,255,255,0.1)' : 'var(--primary)'}; color: ${sub ? 'var(--text)' : '#fff'};"><i class="${sub ? 'ri-edit-2-line' : 'ri-send-plane-fill'}"></i> ${sub ? "Редагувати та надіслати знову" : "Відправити на перевірку"}</button>
                    </form>
                  ` : `
                    <div style="margin-top: 20px; text-align: center; padding: 14px; font-size: 13px; color: var(--danger); background: rgba(244,63,94,0.05); border-radius: 12px; font-weight: 600;"><i class="ri-lock-line"></i> Завдання закрито. Здача більше не приймається.</div>
                  `}
                `}
              </div>
            </details>
          `;
        };

        let finalHTML = `<style>.student-task-accordion > summary::-webkit-details-marker { display: none; } .student-task-accordion[open] > summary { background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); } .student-task-accordion[open] .task-chevron { transform: rotate(180deg); color: var(--primary) !important; } .student-task-summary:hover { background: rgba(255,255,255,0.03); } details.history-accordion > summary::-webkit-details-marker { display: none; } details.history-accordion[open] > summary i.ri-arrow-down-s-line { transform: rotate(180deg); }</style>`;

        if (todoList.length > 0) finalHTML += `<div style="margin-bottom: 30px;"><h3 style="margin: 0 0 16px 0; font-size: 16px; color: var(--text); display: flex; align-items: center; gap: 8px;"><i class="ri-fire-fill" style="color: var(--danger);"></i> Потребують виконання</h3><div style="display: flex; flex-direction: column;">${todoList.map(obj => renderCompactCard(obj, true)).join("")}</div></div>`;
        if (reviewList.length > 0) finalHTML += `<div style="margin-bottom: 30px;"><h3 style="margin: 0 0 16px 0; font-size: 16px; color: var(--text); display: flex; align-items: center; gap: 8px;"><i class="ri-time-fill" style="color: var(--warn);"></i> Знаходяться на перевірці</h3><div style="display: flex; flex-direction: column; opacity: 0.85;">${reviewList.map(obj => renderCompactCard(obj, false)).join("")}</div></div>`;
        if (doneList.length > 0) finalHTML += `<details class="history-accordion" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden; margin-bottom: 30px;"><summary style="padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: var(--text-dim); background: rgba(255,255,255,0.02);"><div style="display: flex; align-items: center; gap: 10px;"><i class="ri-archive-fill"></i> Історія виконаних завдань (${doneList.length})</div><i class="ri-arrow-down-s-line" style="font-size: 20px; transition: transform 0.3s;"></i></summary><div style="padding: 20px; display: flex; flex-direction: column; border-top: 1px solid rgba(255,255,255,0.05);">${doneList.map(obj => renderCompactCard(obj, false)).join("")}</div></details>`;

        mount.innerHTML = finalHTML;

        // ПРИВ'ЯЗКА КНОПОК "ВІДКРИТИ ТЕРМІНАЛ"
        mount.querySelectorAll("[data-open-terminal]").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const [cId, mId, tIdx] = btn.getAttribute("data-open-terminal").split("|");
            if (typeof goto === "function") {
              goto(`/lesson/${cId}/${mId}/${tIdx}`);
            } else {
              window.location.hash = `#/lesson/${cId}/${mId}/${tIdx}`;
            }
          });
        });

        // ПРИВ'ЯЗКА ФОРМ ВІДПРАВЛЕННЯ (ДЛЯ РУЧНИХ ЗАВДАНЬ)
        mount.querySelectorAll("[data-student-submit-form]").forEach((form) => {
          form.onsubmit = async (e) => {
            e.preventDefault();
            const assignmentId = form.getAttribute("data-student-submit-form") || "";
            const formData = new FormData(form);
            const submissionText = String(formData.get("submissionText") || "").trim();
            const submitBtn = form.querySelector('button[type="submit"]');

            if (!submissionText) { alert("❌ Спочатку введи відповідь у поле!"); return; }
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Відправка...`; }

            try {
              await submitStudentAssignment({ assignmentId, submissionText });
              await renderStudentAssignmentsHome();
            } catch (err) {
              console.error(err); alert(err.message || "Не вдалося здати завдання");
            } finally {
              if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = `<i class="ri-send-plane-fill"></i> Готово`; }
            }
          };
        });

      } catch (err) {
        console.error(err); mount.innerHTML = `<div class="teacher-empty" style="color: var(--danger); background: rgba(244,63,94,0.1); border-color: rgba(244,63,94,0.2);">Не вдалося завантажити завдання.</div>`;
      }
    }

    function renderHome() {
      setActiveView(viewHome);
      const breadcrumbs = document.getElementById("breadcrumbs");
      if (breadcrumbs) breadcrumbs.innerHTML = `<span style="color: var(--text-dim);"><i class="ri-home-5-line"></i> Головна</span>`;
      renderSidebarHome();
      
      renderStudentAssignmentsHome().then(() => {
        renderTabsUI();
        renderCoursesGrid();
        updateHeaderStats();
        updateContentVisibility();
      });

      const coursesList = $("coursesList");
      const assignmentsHome = $("studentAssignmentsHome");

      if (coursesList && !coursesList.closest('.student-dashboard-layout')) {
        const layoutWrapper = document.createElement("div");
        layoutWrapper.className = "student-dashboard-layout";
        layoutWrapper.style.display = "flex";
        layoutWrapper.style.flexDirection = "column";
        layoutWrapper.style.width = "100%";
        
        const tabsMount = document.createElement("div");
        tabsMount.id = "studentTabsMount";

        coursesList.parentNode.insertBefore(layoutWrapper, coursesList);
        layoutWrapper.appendChild(tabsMount);
        layoutWrapper.appendChild(coursesList);
        if(assignmentsHome) layoutWrapper.appendChild(assignmentsHome);
      }
    }

    return { renderCoursesGrid, renderHome };
  }

  return { create };
})();
