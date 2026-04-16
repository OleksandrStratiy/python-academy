window.App = window.App || {};

window.App.teacherAssignments = (function () {
  "use strict";

  function create(deps) {
    const { $, state, save, toast, supa, onBackToClasses } = deps;

    const store = window.App.teacherAssignmentStore.create({
      state, save, toast, supa
    });

    let teacherClasses = [];
    let classStudents = [];
    let taskBank = [];
    let assignments = [];
    let submissions = [];

    // ==================================================
    // 1. СТАН UI
    // ==================================================
function ensureUiState() {
  state.teacherAssignmentsUI = state.teacherAssignmentsUI || {
    mainTab: "issue",
    bankCategory: "mine",
isCreatingTask: false,
isEditingTask: false,
editingTaskId: "",
previewTaskId: "",
    selectedTaskIds: [],
    selectedAutoTaskIds: [],
    selectedAutoModuleId: "",
    issueClassCode: "",
    issueTargetType: "class",
    issueStudentId: "",
    issueSource: "bank",
issuedSearch: "",
issuedClassFilter: "all",
issuedStudentFilter: "all",
issuedStatusFilter: "all",
    bankThemeFilter: "all",
    issueThemeFilter: "all",
    issueAutoLevelFilter: "all",
    issueAutoModuleFilter: "all",
    issueTaskSearch: "",
    bankTaskSearch: ""
  };

if (!("issuedStudentFilter" in state.teacherAssignmentsUI)) {
  state.teacherAssignmentsUI.issuedStudentFilter = "all";
}
  // міграція зі старого стану
if (typeof state.teacherAssignmentsUI.selectedTaskId === "string") {
  const sid = String(state.teacherAssignmentsUI.selectedTaskId || "").trim();

  if (sid.startsWith("auto|")) {
    if (sid && !state.teacherAssignmentsUI.selectedAutoTaskIds.includes(sid)) {
      state.teacherAssignmentsUI.selectedAutoTaskIds = [sid];
    }
    state.teacherAssignmentsUI.previewTaskId = sid;
  } else {
    state.teacherAssignmentsUI.selectedTaskIds = sid ? [sid] : [];
    state.teacherAssignmentsUI.previewTaskId = sid;
  }

  delete state.teacherAssignmentsUI.selectedTaskId;
}

  if (!Array.isArray(state.teacherAssignmentsUI.selectedTaskIds)) {
    state.teacherAssignmentsUI.selectedTaskIds = [];
  }

  if (!Array.isArray(state.teacherAssignmentsUI.selectedAutoTaskIds)) {
    state.teacherAssignmentsUI.selectedAutoTaskIds = [];
  }

  if (!("issueAutoLevelFilter" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.issueAutoLevelFilter = "all";
  }

  if (!("issueTaskSearch" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.issueTaskSearch = "";
  }

  if (!("bankTaskSearch" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.bankTaskSearch = "";
  }

  if (state.teacherAssignmentsUI.mainTab === "bank") {
    state.teacherAssignmentsUI.mainTab = "issue";
  }

  if (state.teacherAssignmentsUI.mainTab === "grading") {
    state.teacherAssignmentsUI.mainTab = "review";
  }

  if (!["issue", "review"].includes(state.teacherAssignmentsUI.mainTab)) {
    state.teacherAssignmentsUI.mainTab = "issue";
  }

  if (!("bankCategory" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.bankCategory = "mine";
  }

  if (!("bankThemeFilter" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.bankThemeFilter = "all";
  }

  if (!("issueThemeFilter" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.issueThemeFilter = "all";
  }

  if (!("issuedStudentFilter" in state.teacherAssignmentsUI)) {
  state.teacherAssignmentsUI.issuedStudentFilter = "all";
}

  return state.teacherAssignmentsUI;
}

    function escapeHtml(str) {
      return String(str || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function formatDate(value) {
      if (!value) return "Без дедлайну";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "Без дедлайну";
      return d.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" }) + " " +
             d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
    }

    function shorten(text, limit = 140) {
      const value = String(text || "").trim();
      if (!value) return "";
      return value.length > limit ? value.slice(0, limit).trim() + "…" : value;
    }

    // ==================================================
    // 2. ІНТЕГРАЦІЯ З АВТО-ПРАКТИКУМАМИ
    // ==================================================
    function getAutoModules() {
      const allModules = [];
      (window.PRACTICE_DB || []).forEach(item => {
        if (!item.modules) {
          allModules.push({ courseId: "practice", courseTitle: "Практикум", ...item });
        } else {
          item.modules.forEach(mod => allModules.push({ courseId: item.id, courseTitle: item.title || item.id, ...mod }));
        }
      });
      return allModules;
    }

    function getFilteredTaskBank() {
      return taskBank.filter((task) => {
        const starter = String(task.starter_code || "").trim();
        const format = String(task.solution_format || "").trim();
        const source = String(task.source || "").trim();

        const isLibrary = source === "library";
        const isQuickShadow = starter.startsWith("__QUICK__|");
        const isAutoShadow = starter.startsWith("auto|") || starter.startsWith("auto_module|") || format.startsWith("auto_module|");

        return !isLibrary && !isQuickShadow && !isAutoShadow;
      });
    }

    function getTaskThemeLabel(task) {
      const category = String(task?.category || "").trim();
      return category || "Без теми";
    }

    function getManualThemes() {
      const themes = Array.from(new Set(getFilteredTaskBank().map((task) => getTaskThemeLabel(task)).filter(Boolean)));
      return themes.sort((a, b) => a.localeCompare(b, "uk"));
    }

    function getManualTasksByTheme(themeValue = "all") {
      const allTasks = getFilteredTaskBank();
      if (!themeValue || themeValue === "all") return allTasks;
      return allTasks.filter((task) => getTaskThemeLabel(task) === themeValue);
    }

function ensureSelectedTaskInsideTheme(themeValue = "all") {
  const ui = ensureUiState();
  const filtered = getManualTasksByTheme(themeValue);
  const filteredIds = new Set(filtered.map((task) => String(task.id)));

  ui.selectedTaskIds = (ui.selectedTaskIds || [])
    .map(String)
    .filter((id) => filteredIds.has(id));

  if (!filtered.length) {
    ui.previewTaskId = "";
    return;
  }

  if (!ui.previewTaskId || !filteredIds.has(String(ui.previewTaskId))) {
    ui.previewTaskId = ui.selectedTaskIds[0] || String(filtered[0].id);
  }
}


function ensureSelectedIssueAutoTask() {
  const ui = ensureUiState();
  const autoModules = getAutoModules();
  const availableIds = new Set();

  autoModules.forEach((mod) => {
    (mod.tasks || []).forEach((_, index) => {
      availableIds.add(`auto|${mod.courseId}|${mod.id}|${index}`);
    });
  });

  ui.selectedAutoTaskIds = (ui.selectedAutoTaskIds || [])
    .map(String)
    .filter((id) => availableIds.has(id));

  if (autoModules.length && !autoModules.some((m) => String(m.id) === String(ui.selectedAutoModuleId))) {
    ui.selectedAutoModuleId = autoModules[0].id;
  }

  if (!autoModules.length) {
    ui.selectedAutoModuleId = "";
  }
}


function openTeacherAutoPreview(courseId, moduleId, taskIndex) {
  const safeCourseId = String(courseId || "practice");
  const safeModuleId = String(moduleId || "");
  const safeTaskIndex = Number(taskIndex || 0);

  if (!safeModuleId) return;

  try {
    sessionStorage.setItem("teacher_auto_preview", JSON.stringify({
      courseId: safeCourseId,
      moduleId: safeModuleId,
      taskIndex: safeTaskIndex,
      at: Date.now()
    }));
  } catch {}

  window.location.hash = `#/lesson/${safeCourseId}/${safeModuleId}/${safeTaskIndex}`;
}
function openTeacherAutoLesson(courseId, moduleId, taskIndex) {
  const safeCourseId = String(courseId || "practice");
  const safeModuleId = String(moduleId || "");
  const safeTaskIndex = Number(taskIndex || 0);

  if (!safeModuleId) return;

  window.location.hash = `#/lesson/${safeCourseId}/${safeModuleId}/${safeTaskIndex}`;
}

function getFilteredAssignments() {
  const ui = ensureUiState();
  const q = String(ui.issuedSearch || "").trim().toLowerCase();
  const classFilter = ui.issuedClassFilter || "all";
  const studentFilter = ui.issuedStudentFilter || "all";
  const statusFilter = ui.issuedStatusFilter || "all";

  return assignments.filter((item) => {
    const matchesSearch =
      !q ||
      String(item.title_snapshot || "").toLowerCase().includes(q) ||
      String(item.class_code || "").toLowerCase().includes(q) ||
      String(item.note_for_student || "").toLowerCase().includes(q);

    const matchesClass =
      classFilter === "all" ||
      String(item.class_code || "") === String(classFilter);

    const subs = getSubmissionsForAssignment(item.id);

    const isDirectStudentAssignment =
      studentFilter !== "all" &&
      String(item.target_type || "") === "student" &&
      String(item.student_id || "") === String(studentFilter);

    const isClassAssignmentForChosenStudent =
      studentFilter !== "all" &&
      String(item.target_type || "") === "class" &&
      classFilter !== "all" &&
      String(item.class_code || "") === String(classFilter);

    const relevantSubs =
      studentFilter === "all"
        ? subs
        : subs.filter((s) => String(s.student_id || "") === String(studentFilter));

    const matchesStudent =
      studentFilter === "all" ||
      isDirectStudentAssignment ||
      isClassAssignmentForChosenStudent ||
      relevantSubs.length > 0;

    let matchesStatus = true;

    if (statusFilter !== "all") {
      if (["submitted", "review", "reviewed", "returned"].includes(statusFilter)) {
        matchesStatus = relevantSubs.some(
          (s) => String(s.status || "submitted") === String(statusFilter)
        );
      } else if (statusFilter === "missing") {
        if (studentFilter !== "all") {
          matchesStatus = relevantSubs.length === 0;
        } else if (String(item.target_type || "") === "student") {
          matchesStatus = relevantSubs.length === 0;
        } else if (
          String(item.target_type || "") === "class" &&
          classFilter !== "all"
        ) {
          const hidden = Array.isArray(item.hidden_for_students)
            ? item.hidden_for_students.map((id) => String(id))
            : [];

          const expectedStudentIds = (classStudents || [])
            .map((student) => String(student.id || ""))
            .filter((id) => id && !hidden.includes(id));

          const submittedIds = new Set(
            subs.map((s) => String(s.student_id || "")).filter(Boolean)
          );

          matchesStatus =
            expectedStudentIds.length > 0 &&
            expectedStudentIds.some((id) => !submittedIds.has(id));
        } else {
          matchesStatus = relevantSubs.length === 0;
        }
      } else if (["active", "closed"].includes(statusFilter)) {
        matchesStatus = String(item.status || "active") === String(statusFilter);
      }
    }

    return matchesSearch && matchesClass && matchesStudent && matchesStatus;
  });
}

    function getSubmissionsForAssignment(assignmentId) {
      return submissions.filter((item) => item.assignment_id === assignmentId);
    }

    function renderBadges(task) {
      return `
        <div class="teacher-pills">
          <span class="teacher-pill">${task.solution_format === "code" ? "Код" : task.solution_format === "text" ? "Текст" : "Файл"}</span>
          <span class="teacher-pill">${task.max_score} б.</span>
          ${task.is_public ? `<span class="teacher-pill teacher-pill--accent">Публічне</span>` : ``}
        </div>
      `;
    }

function renderQuickIssueForm({ taskId, taskTitle }) {
  const ui = ensureUiState();

  return `
    <div style="margin-top: 24px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 24px;">
      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0; font-size: 16px; color: var(--text);">Швидко видати це завдання</h4>
        <p style="margin: 4px 0 0; font-size: 12px; color: var(--text-dim);">
          Обране завдання: <b>${escapeHtml(taskTitle || "Без назви")}</b>
        </p>
      </div>

      <form id="teacherIssueForm" style="display: flex; flex-direction: column; gap: 16px;">
        <input type="hidden" name="taskSource" value="bank">
        <input type="hidden" name="taskIdBank" value="${escapeHtml(taskId || "")}">

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div>
            <label style="display: block; font-size: 11px; margin-bottom: 6px; text-transform: uppercase; color: var(--text-dim);">Кому видаємо</label>
            <select id="assignmentTargetType" class="teacher-input" name="targetType" style="margin: 0; width: 100%;">
              <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>Усьому класу</option>
              <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>Окремому учню</option>
            </select>
          </div>

          <div>
            <label style="display: block; font-size: 11px; margin-bottom: 6px; text-transform: uppercase; color: var(--text-dim);">Клас</label>
            <select id="assignmentClassCode" class="teacher-input" name="classCode" style="margin: 0; width: 100%;">
              ${teacherClasses.map((cls) => `
                <option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>
                  ${escapeHtml(cls.name || cls.code)} (${escapeHtml(cls.code)})
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        ${ui.issueTargetType === "student" ? `
          <div>
            <label style="display: block; font-size: 11px; margin-bottom: 6px; text-transform: uppercase; color: var(--text-dim);">Учень</label>
            <select id="assignmentStudentId" class="teacher-input" name="studentId" style="margin: 0; width: 100%;">
              ${classStudents.length
                ? classStudents.map((s) => `
                    <option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>
                      ${escapeHtml(s.full_name || "Без імені")}
                    </option>
                  `).join("")
                : `<option value="">Немає учнів</option>`
              }
            </select>
          </div>
        ` : ""}

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div>
            <label style="display: block; font-size: 11px; margin-bottom: 6px; text-transform: uppercase; color: var(--text-dim);">Дедлайн</label>
            <input class="teacher-input" name="dueAt" type="datetime-local" style="margin: 0; width: 100%;">
          </div>

          <div>
            <label style="display: block; font-size: 11px; margin-bottom: 6px; text-transform: uppercase; color: var(--text-dim);">Примітка</label>
            <input class="teacher-input" name="noteForStudent" placeholder="Наприклад: виконати до п'ятниці" style="margin: 0; width: 100%;">
          </div>
        </div>

        <button class="teacher-btn teacher-btn--primary" type="submit" style="margin-top: 8px;">
          <i class="ri-send-plane-fill"></i> Видати це завдання
        </button>
      </form>
    </div>
  `;
}

    function renderAutoIssueSidebar(selectedAutoItems = []) {
  const ui = ensureUiState();
  const selectedCount = selectedAutoItems.length;

  return `
    <aside
      style="
        background: rgba(15,23,42,0.82);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 14px;
        padding: 18px;
        position: sticky;
        top: 16px;
      "
    >
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px;">
        <div>
          <div style="font-size:11px; text-transform:uppercase; color:var(--accent); font-weight:800; letter-spacing:.08em; margin-bottom:4px;">
            Авто-практикум
          </div>
          <div style="font-size:18px; font-weight:800; color:var(--text);">
            Видати завдання
          </div>
        </div>

        <div style="font-size:11px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:5px 8px; border-radius:8px; white-space:nowrap;">
          12-бальна шкала
        </div>
      </div>

      <div style="margin-bottom:14px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
        <div style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">
          Обрано завдань
        </div>
        <div style="font-size:26px; line-height:1; font-weight:900; color:var(--text); margin-bottom:8px;">
          ${selectedCount}
        </div>
        <div style="font-size:12px; color:var(--text-dim); line-height:1.45;">
          XP не додається до загального рейтингу. Учень отримує оцінку в балах.
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <div style="font-size:12px; font-weight:700; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase;">
          Вибрані завдання
        </div>

        <div id="teacherSelectedAutoList" class="teacher-selected-auto-list" style="display:flex; flex-direction:column; gap:8px; max-height:190px; overflow-y:auto; padding-right:6px;">
          ${selectedAutoItems.length
            ? selectedAutoItems.map((item, idx) => `
              <div style="padding:10px 12px; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; gap:8px; align-items:flex-start;">
                  <div style="min-width:0; flex:1;">
                    <div style="font-size:13px; font-weight:700; color:var(--text); line-height:1.3; margin-bottom:3px;">
                      ${idx + 1}. ${escapeHtml(item.title)}
                    </div>
                    <div style="font-size:11px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${escapeHtml(item.moduleTitle)}
                    </div>
                  </div>
                  <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                    12 б.
                  </div>
                </div>
              </div>
            `).join("")
            : `
              <div style="padding:14px; border-radius:10px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.08); color:var(--text-dim); font-size:12px; text-align:center;">
                Ще не обрано жодного авто-завдання
              </div>
            `
          }
        </div>
      </div>

      <div style="display:grid; gap:14px;">
        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Клас
          </label>
          <select id="assignmentClassCode" class="teacher-input" name="classCode" style="width:100%; margin:0;">
            ${teacherClasses.map((cls) => `
              <option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>
                ${escapeHtml(cls.name || cls.code)}
              </option>
            `).join("")}
          </select>
        </div>

        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Кому призначити
          </label>
          <select id="assignmentTargetType" class="teacher-input" name="targetType" style="width:100%; margin:0;">
            <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>👨‍👩‍👧‍👦 Усьому класу</option>
            <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>👤 Окремому учню</option>
          </select>
        </div>

        ${ui.issueTargetType === "student" ? `
          <div style="padding:12px; background:rgba(139,92,246,0.08); border:1px solid rgba(139,92,246,0.18); border-radius:12px;">
            <label style="display:block; font-size:11px; font-weight:800; color:var(--accent); margin-bottom:6px; text-transform:uppercase;">
              Учень
            </label>
            <select id="assignmentStudentId" class="teacher-input" name="studentId" style="width:100%; margin:0;">
              ${classStudents.length
                ? classStudents.map((s) => `
                    <option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>
                      ${escapeHtml(s.full_name || "Без імені")}
                    </option>
                  `).join("")
                : `<option value="">У класі ще немає учнів</option>`
              }
            </select>
          </div>
        ` : ""}

        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Дедлайн
          </label>
          <input class="teacher-input" name="dueAt" type="datetime-local" style="width:100%; margin:0;">
        </div>

        <div>
          <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
            Примітка / підказка
          </label>
          <input class="teacher-input" name="noteForStudent" placeholder="Напишіть щось учням." style="width:100%; margin:0;">
        </div>

        <button
          class="teacher-btn teacher-btn--primary"
          type="submit"
          style="width:100%; justify-content:center; min-height:46px; margin-top:4px;"
        >
          <i class="ri-send-plane-fill"></i>
          Видати ${selectedCount ? `${selectedCount} завд.` : "завдання"}
        </button>
      </div>
    </aside>
  `;
}

    // ==================================================
    // 4. Вкладка 1: БАЗА ЗАВДАНЬ (Task Bank)
    // ==================================================
function renderCreateTaskForm() {
  const ui = ensureUiState();

  const editingTask = ui.isEditingTask
    ? taskBank.find((item) => String(item.id) === String(ui.editingTaskId || ""))
    : null;

  const isEdit = !!editingTask;

  return `
    <section class="teacher-card" style="border-color: rgba(14, 165, 233, 0.28); background: rgba(14, 165, 233, 0.03);">
      <div class="teacher-card__head" style="margin-bottom: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin: 0; color: var(--primary);">
            <i class="ri-${isEdit ? "edit-2-line" : "add-box-line"}"></i>
            ${isEdit ? "Редагувати завдання" : "Створити нове завдання"}
          </h4>
          <p class="teacher-muted" style="margin-top: 4px;">
            ${isEdit ? "Зміни поля й збережи оновлену версію завдання" : "Додай ручне завдання у свою базу вчителя"}
          </p>
        </div>

        <button
          type="button"
          class="teacher-btn teacher-btn--ghost teacher-btn--small"
          data-close-create-task="1"
          style="margin: 0;"
        >
          <i class="ri-close-line"></i> Закрити
        </button>
      </div>

      <form id="teacherTaskBankForm" style="display: flex; flex-direction: column; gap: 12px;">
        <input
          class="teacher-input"
          name="title"
          placeholder="Назва завдання"
          required
          style="margin: 0;"
          value="${escapeHtml(editingTask?.title || "")}"
        >

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <input
            class="teacher-input"
            name="subject"
            placeholder="Розділ / курс (необов'язково)"
            style="margin: 0;"
            value="${escapeHtml(editingTask?.subject || "")}"
          >
          <input
            class="teacher-input"
            name="category"
            placeholder="Тема, наприклад: Цикли"
            style="margin: 0;"
            value="${escapeHtml(editingTask?.category || "")}"
          >
        </div>

        <textarea
          class="teacher-input"
          name="description"
          rows="5"
          placeholder="Умова завдання"
          required
          style="margin: 0;"
        >${escapeHtml(editingTask?.description || "")}</textarea>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <select class="teacher-input" name="solutionFormat" style="margin: 0; flex: 1 1 220px;">
            <option value="code" ${String(editingTask?.solution_format || "code") === "code" ? "selected" : ""}>Формат здачі: Код</option>
            <option value="text" ${String(editingTask?.solution_format || "") === "text" ? "selected" : ""}>Формат здачі: Текст</option>
          </select>

          <input
            class="teacher-input"
            name="maxScore"
            type="number"
            min="1"
            max="100"
            value="${escapeHtml(String(editingTask?.max_score ?? 12))}"
            placeholder="Макс. бал"
            style="margin: 0; width: 140px;"
          >
        </div>

        <textarea
          class="teacher-input"
          name="starterCode"
          rows="4"
          placeholder="Стартовий код (необов'язково)"
          style="margin: 0; font-family: var(--mono); font-size: 12px;"
        >${escapeHtml(editingTask?.starter_code || "")}</textarea>

        <label class="teacher-check" style="margin: 4px 0;">
          <input type="checkbox" name="isPublic" ${editingTask?.is_public ? "checked" : ""}>
          <span>Зробити доступним для інших вчителів</span>
        </label>

        <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;">
          <button type="button" class="teacher-btn teacher-btn--ghost" data-close-create-task="1" style="margin: 0;">
            Скасувати
          </button>

          <button class="teacher-btn teacher-btn--primary" type="submit" style="margin: 0;">
            <i class="ri-save-line"></i>
            ${isEdit ? "Зберегти зміни" : "Зберегти в базу"}
          </button>
        </div>
      </form>
    </section>
  `;
}
function renderManualTaskPreview() {
  const ui = ensureUiState();
  const previewId = String(ui.previewTaskId || ui.selectedTaskIds?.[0] || "");
  const task = getFilteredTaskBank().find((item) => String(item.id) === previewId);
      if (!task) return `<div class="teacher-empty" style="background: rgba(30,41,59,0.5); border: 1px dashed var(--border); border-radius: 16px; padding: 40px; text-align: center;">Оберіть завдання зі списку ліворуч для перегляду.</div>`;

      return `
        <section class="teacher-card" style="padding: 0; overflow: hidden; background: rgba(30,41,59,0.5); border: 1px solid var(--border); border-radius: 16px;">
          
          <div style="background: rgba(15,23,42,0.8); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 11px; text-transform: uppercase; color: var(--primary); font-weight: 800; letter-spacing: 0.1em; background: rgba(14,165,233,0.1); padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(14,165,233,0.2);">Ручне завдання</span>
                  <span style="font-size: 11px; color: var(--text-dim);"><i class="ri-price-tag-3-line"></i> ${escapeHtml(getTaskThemeLabel(task))}</span>
                </div>
                <h3 style="margin: 0; font-size: 22px; color: var(--text); font-weight: 700;">${escapeHtml(task.title)}</h3>
              </div>
              
<div style="display:flex; gap:10px; flex-wrap:wrap;">
  <button
    class="teacher-btn teacher-btn--ghost teacher-btn--small"
    data-edit-task="${escapeHtml(task.id)}"
    style="border: 1px solid rgba(14,165,233,0.25); background: rgba(14,165,233,0.05); color: var(--primary);"
  >
    <i class="ri-edit-2-line"></i> Редагувати
  </button>

  <button
    class="teacher-btn teacher-btn--ghost teacher-btn--small"
    data-delete-task="${escapeHtml(task.id)}"
    style="color: var(--danger); border: 1px solid rgba(244,63,94,0.3); background: rgba(244,63,94,0.05);"
  >
    <i class="ri-delete-bin-line"></i> Видалити завдання
  </button>
</div>
            </div>
            
            <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
               <span style="display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.05); color: var(--text-dim); padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;"><i class="ri-file-code-line"></i> Формат: ${task.solution_format === "code" ? "Код" : task.solution_format === "text" ? "Текст" : "Файл"}</span>
               <span style="display: inline-flex; align-items: center; gap: 4px; background: rgba(34,197,94,0.1); color: var(--success); padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 800; border: 1px solid rgba(34,197,94,0.2);">${task.max_score} балів</span>
               ${task.is_public ? `<span style="display: inline-flex; align-items: center; gap: 4px; background: rgba(139,92,246,0.1); color: var(--accent); padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 800; border: 1px solid rgba(139,92,246,0.2);"><i class="ri-global-line"></i> Публічне</span>` : ``}
            </div>
          </div>
          
          <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
            
            <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03);">
              <div style="font-size: 13px; text-transform: uppercase; color: var(--primary); margin-bottom: 12px; font-weight: 800; letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;">
                <div style="width: 28px; height: 28px; border-radius: 8px; background: rgba(14,165,233,0.15); display: flex; align-items: center; justify-content: center;"><i class="ri-file-text-line"></i></div>
                Умова завдання
              </div>
              <div style="color: var(--text); line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${escapeHtml(task.description)}</div>
            </div>

            ${task.starter_code ? `
              <div style="background: #020617; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden;">
                <div style="padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; align-items: center; gap: 8px;">
                  <div style="width: 28px; height: 28px; border-radius: 8px; background: rgba(139,92,246,0.15); color: var(--accent); display: flex; align-items: center; justify-content: center;"><i class="ri-code-box-line"></i></div>
                  <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: var(--accent); letter-spacing: 0.05em;">Початковий код</span>
                </div>
                <pre style="margin: 0; padding: 16px; font-family: var(--mono); font-size: 13px; color: var(--text); overflow-x: auto; line-height: 1.5;">${escapeHtml(task.starter_code)}</pre>
              </div>
            ` : ""}
          </div>

          <div style="background: rgba(14,165,233,0.03); border-top: 1px dashed rgba(14,165,233,0.2); padding: 24px;">
            ${renderQuickIssueForm({ taskId: task.id, taskTitle: task.title })}
          </div>

        </section>
      `;
    }

    function renderTaskBankTab() {
      const ui = ensureUiState();

      if (ui.isCreatingTask) {
        return `
          <div style="width: 100%; max-width: 800px; margin: 0 auto; animation: fadeIn 0.3s;">
            ${renderCreateTaskForm()}
          </div>
        `;
      }

      const allManualTasks = getFilteredTaskBank();
      const manualThemes = getManualThemes();
      const manualTasks = getManualTasksByTheme(ui.bankThemeFilter);   
      const autoModules = getAutoModules();

      return `
<div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; max-width: 1280px; margin: 0 auto;">          
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 16px; min-width: 380px;">            
            <div style="display: flex; gap: 8px; background: rgba(30,41,59,0.5); padding: 8px; border-radius: 14px; border: 1px solid var(--border);">
              <button class="source-tab-btn" data-bank-category="mine" style="flex: 1; border: none; background: ${ui.bankCategory === 'mine' ? 'var(--primary)' : 'transparent'}; color: ${ui.bankCategory === 'mine' ? '#fff' : 'var(--text-dim)'}; padding: 10px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 13px; transition: all 0.3s; ${ui.bankCategory === 'mine' ? 'box-shadow: 0 4px 15px rgba(14,165,233,0.3);' : ''}">
                <i class="ri-book-read-line"></i> Мої ручні (${allManualTasks.length})
              </button>
              <button class="source-tab-btn" data-bank-category="auto" style="flex: 1; border: none; background: ${ui.bankCategory === 'auto' ? 'var(--success)' : 'transparent'}; color: ${ui.bankCategory === 'auto' ? '#fff' : 'var(--text-dim)'}; padding: 10px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 13px; transition: all 0.3s; ${ui.bankCategory === 'auto' ? 'box-shadow: 0 4px 15px rgba(34,197,94,0.3);' : ''}">
                <i class="ri-robot-2-line"></i> Авто-модулі
              </button>
            </div>

            ${ui.bankCategory === 'mine' ? `
              <div style="display: flex; flex-direction: column; gap: 12px; background: rgba(30,41,59,0.5); padding: 16px; border-radius: 16px; border: 1px solid var(--border);">
                <button class="teacher-btn teacher-btn--ghost" data-open-create-task="1" style="width: 100%; border: 1px dashed rgba(14, 165, 233, 0.4); color: var(--primary); justify-content: center; margin: 0; background: rgba(14, 165, 233, 0.05);">
                  <i class="ri-add-line"></i> Створити нове завдання
                </button>

                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                  <i class="ri-filter-3-line" style="color: var(--text-dim);"></i>
                  <select id="teacherBankThemeFilter" class="teacher-input" style="margin: 0; width: 100%; font-size: 13px; background: #0f172a; color: #f8fafc; border-color: rgba(255,255,255,0.1); border-radius: 8px;">
                    <option value="all" ${ui.bankThemeFilter === "all" ? "selected" : ""}>Усі теми (${allManualTasks.length})</option>
                    ${manualThemes.map((theme) => `<option value="${escapeHtml(theme)}" ${ui.bankThemeFilter === theme ? "selected" : ""}>${escapeHtml(theme)}</option>`).join("")}
                  </select>
                </div>
              </div>

<div class="dash-scroll-wrap teacher-assignments-list" style="max-height: 760px; padding-right: 8px; display: flex; flex-direction: column; gap: 8px;">
  ${manualTasks.length ? manualTasks.map(t => {
    const isActive = (ui.selectedTaskIds || []).includes(String(t.id)) && !ui.isCreatingTask;
    return `
                  <article class="bank-task-item ${isActive ? 'active' : ''}" data-select-task="${escapeHtml(t.id)}" style="cursor: pointer; padding: 16px; border-radius: 12px; border: 1px solid ${isActive ? 'rgba(14,165,233,0.4)' : 'rgba(255,255,255,0.05)'}; background: ${isActive ? 'rgba(14,165,233,0.1)' : 'rgba(0,0,0,0.2)'}; transition: all 0.2s;">
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                      
                      <div style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${isActive ? 'var(--primary)' : 'var(--text-dim)'}; display: flex; align-items: center; justify-content: center; margin-top: 2px; transition: all 0.2s; background: ${isActive ? 'rgba(14,165,233,0.1)' : 'transparent'}; flex-shrink: 0;">
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--primary); opacity: ${isActive ? '1' : '0'}; transition: all 0.2s;"></div>
                      </div>

                      <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                          <div style="font-weight: 700; font-size: 14px; color: var(--text); margin-bottom: 4px; line-height: 1.3;">${escapeHtml(t.title)}</div>
                          
                          <button type="button" data-delete-task="${escapeHtml(t.id)}" onclick="event.stopPropagation();" style="background: transparent; border: none; color: var(--text-dim); cursor: pointer; padding: 4px; border-radius: 6px; transition: all 0.2s; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.color='var(--danger)'; this.style.background='rgba(244,63,94,0.1)';" onmouseout="this.style.color='var(--text-dim)'; this.style.background='transparent';">
                            <i class="ri-delete-bin-line" style="font-size: 16px;"></i>
                          </button>
                        </div>
                        
                        <div style="font-size: 11px; color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                          ${escapeHtml(getTaskThemeLabel(t))}
                        </div>
                        <div style="font-size: 12px; color: var(--text-dim); line-height: 1.4;">${escapeHtml(shorten(t.description, 70))}</div>
                      </div>
                    </div>
                  </article>
                `}).join("") : `<div class="teacher-empty" style="text-align: center; padding: 30px; background: rgba(0,0,0,0.2); border-radius: 12px;">У цій темі порожньо.</div>`}
              </div>
            ` : `
             <div class="dash-scroll-wrap teacher-assignments-list" style="max-height: 760px; padding-right: 8px; display: flex; flex-direction: column; gap: 8px;">
                ${autoModules.length ? autoModules.map(m => {
                  const isActive = ui.selectedAutoModuleId === m.id;
                  return `
                  <article class="bank-task-item ${isActive ? 'active' : ''}" data-select-auto-module="${escapeHtml(m.id)}" style="cursor: pointer; padding: 16px; border-radius: 12px; border: 1px solid ${isActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.05)'}; background: ${isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.2)'}; transition: all 0.2s; border-left: 4px solid ${isActive ? 'var(--success)' : 'rgba(255,255,255,0.1)'};">
                    <div style="font-weight: 700; font-size: 14px; color: var(--text); margin-bottom: 4px;">${escapeHtml(m.title)}</div>
                    <div style="font-size: 11px; color: var(--success); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Завдань: ${m.tasks?.length || 0}</div>
                  </article>
                `}).join("") : `<div class="teacher-empty" style="text-align: center; padding: 20px;">Не знайдено авто-модулів.</div>`}
              </div>
            `}
          </div>

<div style="flex: 1 1 680px; min-width: 420px;">
  ${ui.bankCategory === "mine"
      ? renderManualTaskPreview()
      : renderAutoModulePreview()
  }
</div>

        </div>

        <style>
          .bank-task-item:hover {
            border-color: rgba(255,255,255,0.15) !important;
            background: rgba(255,255,255,0.04) !important;
            transform: translateY(-1px);
          }
          .bank-task-item.active {
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
        </style>
      `;
    }

    function renderAutoModulePreview() {
      const ui = ensureUiState();
      const modules = getAutoModules();
      const mod = modules.find(m => m.id === ui.selectedAutoModuleId) || modules[0];

      if (!mod) return `<div class="teacher-empty" style="text-align: center; padding: 20px;"><i class="ri-folder-forbid-line" style="font-size: 32px; color: var(--text-dim); margin-bottom: 10px; display: block;"></i>Авто-модулів не знайдено.<br>Переконайся, що файли практикуму підключені в index.html</div>`;

      const groups = {};
      (mod.tasks || []).forEach((t, i) => {
        const diff = t.difficulty || t.taskDifficulty || "Junior";
        if (!groups[diff]) groups[diff] = [];
        groups[diff].push({ task: t, originalIndex: i });
      });

      const order = ["Junior", "Middle", "Senior"];
      const sortedKeys = Object.keys(groups).sort((a, b) => (order.indexOf(a) || 99) - (order.indexOf(b) || 99));

      return `
        <section class="teacher-card" style="border-color: rgba(16, 185, 129, 0.3);">
          <div class="teacher-card__head" style="margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="background: rgba(16, 185, 129, 0.1); color: var(--success); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                <i class="${escapeHtml(mod.icon || 'ri-terminal-box-fill')}"></i>
              </div>
              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--success); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 4px;">Практикум: ${escapeHtml(mod.courseTitle)}</div>
                <h3 style="margin: 0; font-size: 20px; color: var(--text);">${escapeHtml(mod.title)}</h3>
              </div>
            </div>
          </div>
          <p style="color: var(--text-dim); line-height: 1.5; margin-bottom: 20px;">${mod.desc || "Автоматичний модуль з практичними завданнями."}</p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${sortedKeys.map(diff => {
              const groupTasks = groups[diff];
              let badgeColor = "var(--primary)"; let bgLight = "rgba(14, 165, 233, 0.1)";
              if (diff === "Middle") { badgeColor = "var(--warn)"; bgLight = "rgba(251, 191, 36, 0.1)"; }
              if (diff === "Senior") { badgeColor = "var(--danger)"; bgLight = "rgba(244, 63, 94, 0.1)"; }

              return `
                <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: ${bgLight}; border-bottom: 1px solid rgba(255,255,255,0.03);">
                    <span style="color: ${badgeColor}; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${escapeHtml(diff)}</span>
                    <span style="font-size: 11px; color: var(--text-dim); background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 6px;">${groupTasks.length} задач</span>
                  </div>
                  <div style="padding: 8px 16px;">
                    ${groupTasks.map(({task, originalIndex}) => {
                      if (!task) return "";
                      const taskTitle = task.title || "Без назви";
                      const taskXp = task.xp || 0;
                      return `
                        <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px dashed rgba(255,255,255,0.05);">
                          <div style="width: 24px; height: 24px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: var(--mono); color: var(--text-dim);">${originalIndex + 1}</div>
                          <div style="flex: 1; font-size: 14px; font-weight: 600; color: var(--text);">${escapeHtml(taskTitle)}</div>
                          <div style="font-size: 12px; font-weight: 800; color: ${badgeColor};">${taskXp} XP</div>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          
          <div style="margin-top: 20px; padding: 12px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; font-size: 13px; color: var(--success); display: flex; gap: 10px; align-items: center;">
            <i class="ri-settings-4-line" style="font-size: 18px;"></i>
            <span>Щоб видати окремі задачі з цього практикуму, перейди у вкладку <b>Видача та Перевірка</b>.</span>
          </div>
        </section>
      `;
    }


    // ==================================================
    // 5. Вкладка 2: ВИДАЧА ТА ПЕРЕВІРКА (Grading)
    // ==================================================
function renderIssueTab() {
      const ui = ensureUiState();

      if (ui.isCreatingTask) {
        return `
          <div style="width: 100%; max-width: 800px; margin: 0 auto; animation: fadeIn 0.3s;">
            ${renderCreateTaskForm()}
          </div>
        `;
      }

      ui.issueSource = ui.issueSource || "bank";

      // --- ДАНІ ДЛЯ РУЧНИХ ЗАВДАНЬ ---
      const allManualTasks = getFilteredTaskBank();
      const manualThemes = getManualThemes();
      const filteredManualTasks = getManualTasksByTheme(ui.issueThemeFilter || "all");

      // --- ДАНІ ДЛЯ АВТО-ПРАКТИКУМІВ ---
      const autoModules = getAutoModules();

      // 1. Фільтр по Рівню (Junior, Middle, Senior)
      const currentAutoLevel = String(ui.issueAutoLevelFilter || "all").toLowerCase();

      let levelFilteredModules = autoModules.map(mod => ({
        ...mod,
        tasks: Array.isArray(mod.tasks) ? [...mod.tasks] : []
      }));

      if (currentAutoLevel !== "all") {
        levelFilteredModules = levelFilteredModules
          .map(mod => ({
            ...mod,
            tasks: (mod.tasks || []).filter(task =>
              String(task.difficulty || "").toLowerCase() === currentAutoLevel
            )
          }))
          .filter(mod => Array.isArray(mod.tasks) && mod.tasks.length > 0);
      }

      // 2. Фільтр по конкретному модулю (з випадаючого списку)
      const currentAutoFilter = ui.issueAutoModuleFilter || "all";
      const filteredAutoModules = currentAutoFilter === "all"
        ? levelFilteredModules
        : levelFilteredModules.filter(m => String(m.id) === String(currentAutoFilter));

      // 3. Знаходимо вибрані авто-завдання для сайдбару
      const selectedAutoItems = (ui.selectedAutoTaskIds || [])
        .map((raw) => {
          const [, courseId, moduleId, taskIndex] = String(raw || "").split("|");
          const mod = autoModules.find((m) => String(m.id) === String(moduleId));
          const taskObj = mod?.tasks?.[Number(taskIndex)];
          if (!mod || !taskObj) return null;

          return {
            courseId,
            moduleId,
            taskIndex: Number(taskIndex),
            title: taskObj.title || `Завдання ${Number(taskIndex) + 1}`,
            moduleTitle: mod.title || "Авто-практикум"
          };
        })
        .filter(Boolean);

      // 4. Підготовка сайдбару для Ручних завдань (Генерується за тим же принципом)
      const selectedManualItems = (ui.selectedTaskIds || [])
        .map(id => allManualTasks.find(t => String(t.id) === String(id)))
        .filter(Boolean);

      const renderManualIssueSidebar = `
        <aside style="background: rgba(15,23,42,0.82); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px; position: sticky; top: 16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px;">
            <div>
              <div style="font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:800; letter-spacing:.08em; margin-bottom:4px;">
                База вчителя
              </div>
              <div style="font-size:18px; font-weight:800; color:var(--text);">
                Ручні завдання
              </div>
            </div>
            <div style="font-size:11px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:5px 8px; border-radius:8px; white-space:nowrap;">
              Власні оцінки
            </div>
          </div>

          <div style="margin-bottom:14px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:12px; color:var(--text-dim); margin-bottom:6px;">
              Обрано завдань
            </div>
            <div style="font-size:26px; line-height:1; font-weight:900; color:var(--text); margin-bottom:8px;">
              ${selectedManualItems.length}
            </div>
            <div style="font-size:12px; color:var(--text-dim); line-height:1.45;">
              Оцінюються вчителем вручну (код, текст або файл). Бали підуть у загальний рейтинг.
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase;">
              Вибрані завдання
            </div>

            <div class="dash-scroll-wrap" style="display:flex; flex-direction:column; gap:8px; max-height:190px; overflow-y:auto; padding-right:6px;">
              ${selectedManualItems.length
                ? selectedManualItems.map((item, idx) => `
                  <div style="padding:10px 12px; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05);">
                    <div style="display:flex; justify-content:space-between; gap:8px; align-items:flex-start;">
                      <div style="min-width:0; flex:1;">
                        <div style="font-size:13px; font-weight:700; color:var(--text); line-height:1.3; margin-bottom:3px;">
                          ${idx + 1}. ${escapeHtml(item.title)}
                        </div>
                        <div style="font-size:11px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                          ${escapeHtml(getTaskThemeLabel(item))}
                        </div>
                      </div>
                      <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                        ${item.max_score} б.
                      </div>
                    </div>
                  </div>
                `).join("")
                : `
                  <div style="padding:14px; border-radius:10px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.08); color:var(--text-dim); font-size:12px; text-align:center;">
                    Ще не обрано жодного завдання
                  </div>
                `
              }
            </div>
          </div>

          <div style="display:grid; gap:14px;">
            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Клас
              </label>
              <select id="assignmentClassCode" class="teacher-input" name="classCode" style="width:100%; margin:0;">
                ${teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
              </select>
            </div>

            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Кому призначити
              </label>
              <select id="assignmentTargetType" class="teacher-input" name="targetType" style="width:100%; margin:0;">
                <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>👨‍👩‍👧‍👦 Усьому класу</option>
                <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>👤 Окремому учню</option>
              </select>
            </div>

            ${ui.issueTargetType === "student" ? `
              <div style="padding:12px; background:rgba(14,165,233,0.08); border:1px solid rgba(14,165,233,0.18); border-radius:12px;">
                <label style="display:block; font-size:11px; font-weight:800; color:var(--primary); margin-bottom:6px; text-transform:uppercase;">
                  Учень
                </label>
                <select id="assignmentStudentId" class="teacher-input" name="studentId" style="width:100%; margin:0;">
                  ${classStudents.length
                    ? classStudents.map((s) => `<option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>${escapeHtml(s.full_name || "Без імені")}</option>`).join("")
                    : `<option value="">У класі ще немає учнів</option>`
                  }
                </select>
              </div>
            ` : ""}

            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Дедлайн
              </label>
              <input class="teacher-input" name="dueAt" type="datetime-local" style="width:100%; margin:0;">
            </div>

            <div>
              <label style="display:block; font-size:11px; font-weight:800; color:var(--text-dim); margin-bottom:6px; text-transform:uppercase;">
                Примітка / підказка
              </label>
              <input class="teacher-input" name="noteForStudent" placeholder="Напишіть щось учням." style="width:100%; margin:0;">
            </div>

            <button
              class="teacher-btn teacher-btn--primary"
              type="submit"
              style="width:100%; justify-content:center; min-height:46px; margin-top:4px;"
            >
              <i class="ri-send-plane-fill"></i>
              Видати ${selectedManualItems.length ? `${selectedManualItems.length} завд.` : "завдання"}
            </button>
          </div>
        </aside>
      `;

      return `
      <div class="teacher-issue-container" style="width: 100%; display: flex; flex-direction: column; max-width: 1100px; margin: 0 auto;">
        <section class="teacher-card" style="padding: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 16px; background: rgba(30,41,59,0.5);">

          <div style="background: rgba(15,23,42,0.8); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 24px 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
               <h3 style="margin: 0; font-size: 24px; color: var(--text); display: flex; align-items: center; gap: 12px;">
                 <div style="width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 15px rgba(14,165,233,0.3);">
                   <i class="ri-send-plane-fill"></i>
                 </div>
                 Видача завдання
               </h3>
            </div>

            <div style="display: flex; gap: 8px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); overflow-x: auto;">
              <button type="button" class="source-tab-btn" data-source="bank" style="flex: 1; min-width: 150px; border: none; background: ${ui.issueSource === 'bank' ? 'var(--primary)' : 'transparent'}; color: ${ui.issueSource === 'bank' ? '#fff' : 'var(--text-dim)'}; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; ${ui.issueSource === 'bank' ? 'box-shadow: 0 4px 15px rgba(14,165,233,0.3);' : ''}">
                <i class="ri-book-read-line"></i> Мої ручні
              </button>
              <button type="button" class="source-tab-btn" data-source="auto" style="flex: 1; min-width: 150px; border: none; background: ${ui.issueSource === 'auto' ? 'var(--accent)' : 'transparent'}; color: ${ui.issueSource === 'auto' ? '#fff' : 'var(--text-dim)'}; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; ${ui.issueSource === 'auto' ? 'box-shadow: 0 4px 15px rgba(139,92,246,0.3);' : ''}">
                <i class="ri-robot-2-line"></i> Авто-практикуми
              </button>
              <button type="button" class="source-tab-btn" data-source="quick" style="flex: 1; min-width: 150px; border: none; background: ${ui.issueSource === 'quick' ? 'var(--success)' : 'transparent'}; color: ${ui.issueSource === 'quick' ? '#fff' : 'var(--text-dim)'}; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 14px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; ${ui.issueSource === 'quick' ? 'box-shadow: 0 4px 15px rgba(34,197,94,0.3);' : ''}">
                <i class="ri-flashlight-fill"></i> Швидке завдання
              </button>
            </div>
          </div>

          <form id="teacherIssueForm" style="padding: 32px;">
            <input type="hidden" name="taskSource" id="hiddenTaskSource" value="${ui.issueSource}">

            <div style="margin-bottom: 40px; min-height: ${ui.issueSource === 'quick' ? '250px' : '0'};">

              <div style="display: ${ui.issueSource === 'bank' ? 'grid' : 'none'}; grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr); gap: 20px; align-items: start;">
                
                <div style="min-width:0; display:flex; flex-direction:column; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                  
                  <div style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(15,23,42,0.6);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                      <label style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text);">Оберіть завдання з вашої бази</label>

                      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                        <button type="button" class="teacher-btn teacher-btn--ghost" data-open-create-task="1" style="margin: 0; border: 1px dashed rgba(14,165,233,0.38); color: var(--primary);">
                          <i class="ri-add-line"></i> Створити в базу
                        </button>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 12px; color: var(--text-dim); white-space: nowrap;"><i class="ri-filter-3-line"></i> Тема:</span>
                      <select id="teacherIssueThemeFilter" class="teacher-input" style="flex: 1; margin: 0; padding: 8px 12px; font-size: 13px; background: #0f172a; color: #f8fafc; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        <option value="all" ${ui.issueThemeFilter === 'all' ? 'selected' : ''}>Усі теми (${allManualTasks.length})</option>
                        ${manualThemes.map(t => `<option value="${escapeHtml(t)}" ${ui.issueThemeFilter === t ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div id="teacherManualTasksScroll" class="dash-scroll-wrap teacher-assignments-list" style="max-height: 690px; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" onload="if(window._tsBank) this.parentNode.scrollTop = window._tsBank; this.parentNode.addEventListener('scroll', e => window._tsBank = e.target.scrollTop); this.remove();" style="display:none;">
                    
                    ${filteredManualTasks.length ? filteredManualTasks.map((t, index) => {
                      const isSelected = ui.selectedTaskIds.includes(String(t.id));
                      const isExpanded = window._expandedTasks && window._expandedTasks[t.id];
                      
                      return `
                        <label class="auto-task-card ${isSelected ? 'is-selected' : ''}" style="display:block; cursor:pointer; margin:0;">
                          <input type="checkbox" class="bank-task-radio-input" name="taskIdBank" value="${escapeHtml(t.id)}" ${isSelected ? "checked" : ""} style="display:none;">

                          <div class="radio-card-body" style="padding:10px 12px; background: rgba(255,255,255,0.02); border: 1px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; border-radius: 10px; transition: all 0.2s;">
                            <div style="display:flex; align-items:flex-start; gap:10px;">

                              <div class="radio-check-icon" style="width:18px; height:18px; border-radius:50%; border:2px solid ${isSelected ? 'var(--primary)' : 'var(--text-dim)'}; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:${isSelected ? 'rgba(14,165,233,0.2)' : 'transparent'}; margin-top:2px;">
                                <div class="radio-check-dot" style="width:8px; height:8px; border-radius:50%; background:var(--primary); opacity:${isSelected ? '1' : '0'}; transform:scale(${isSelected ? '1' : '0.6'}); transition:all 0.2s;"></div>
                              </div>

                              <div style="min-width:0; flex:1;">
                                <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">
                                  <div style="min-width:0; flex:1;">
                                    <div style="font-weight:700; font-size:14px; color:${isSelected ? '#fff' : 'var(--text)'}; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:3px;">
                                      ${escapeHtml(t.title)}
                                    </div>
                                    <div style="font-size:10px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                      ${escapeHtml(getTaskThemeLabel(t))}
                                    </div>
                                  </div>

                                  <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                    <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                                      ${t.max_score} б.
                                    </div>

                                    <button
                                      type="button"
                                      onclick="event.preventDefault(); event.stopPropagation(); const content = this.closest('.auto-task-card').querySelector('.task-preview-content'); const isVisible = content.style.display === 'block'; content.style.display = isVisible ? 'none' : 'block'; this.style.background = isVisible ? 'rgba(14,165,233,0.1)' : 'rgba(255,255,255,0.05)'; this.style.color = isVisible ? 'var(--primary)' : 'var(--text-dim)'; window._expandedTasks = window._expandedTasks || {}; window._expandedTasks['${escapeHtml(t.id)}'] = !isVisible;"
                                      style="height:26px; padding:0 8px; border-radius:7px; border:1px solid rgba(14,165,233,0.28); background:${isExpanded ? 'rgba(14,165,233,0.1)' : 'rgba(255,255,255,0.05)'}; color:${isExpanded ? 'var(--primary)' : 'var(--text-dim)'}; font-size:11px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; white-space:nowrap;"
                                    >
                                      <i class="ri-eye-line"></i> Перегляд
                                    </button>

                                    <button
                                      type="button"
                                      data-edit-task="${escapeHtml(t.id)}"
                                      onclick="event.preventDefault(); event.stopPropagation();"
                                      style="height:26px; width:26px; display:flex; justify-content:center; align-items:center; border-radius:7px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); color:var(--text-dim); cursor:pointer; transition:0.2s;"
                                      onmouseover="this.style.color='var(--warn)'; this.style.borderColor='rgba(251,191,36,0.3)'; this.style.background='rgba(251,191,36,0.1)';" 
                                      onmouseout="this.style.color='var(--text-dim)'; this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.05)';"
                                    >
                                      <i class="ri-pencil-line"></i>
                                    </button>

                                    <button
                                      type="button"
                                      data-delete-task="${escapeHtml(t.id)}"
                                      onclick="event.preventDefault(); event.stopPropagation();"
                                      style="height:26px; width:26px; display:flex; justify-content:center; align-items:center; border-radius:7px; border:1px solid rgba(244,63,94,0.2); background:rgba(244,63,94,0.05); color:var(--danger); cursor:pointer; transition:0.2s;"
                                    >
                                      <i class="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="task-preview-content" style="display: ${isExpanded ? 'block' : 'none'}; margin-top: 14px; padding-top: 14px; border-top: 1px dashed rgba(255,255,255,0.10);">
                              <div style="display:flex; flex-direction:column; gap:14px;">
                                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; padding: 14px;">
                                  <div style="display:flex; align-items:center; gap:6px; font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:800; letter-spacing:0.05em; margin-bottom:8px;">
                                    <i class="ri-file-text-line"></i> Умова завдання
                                  </div>
                                  <div style="font-size:13px; color: var(--text); line-height:1.5; white-space: pre-wrap;">${escapeHtml(t.description || "Умова не вказана")}</div>
                                </div>
                                ${t.starter_code ? `
                                  <div style="background:#020617; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; overflow:hidden;">
                                    <div style="padding: 8px 14px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); display:flex; align-items:center; gap:6px; font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:800; letter-spacing:0.05em;">
                                      <i class="ri-code-box-line"></i> Початковий код
                                    </div>
                                    <pre style="margin:0; padding:14px; font-family: var(--mono); font-size: 12px; color: var(--text); white-space: pre-wrap; overflow-x:auto; line-height:1.5;">${escapeHtml(t.starter_code)}</pre>
                                  </div>
                                ` : ``}
                              </div>
                            </div>

                          </div>
                        </label>
                      `;
                    }).join("") : `<div style="text-align:center; padding: 30px; color: var(--text-dim);">У цій темі немає завдань.</div>`}
                  </div>
                </div>

                ${ui.issueSource === 'bank' ? renderManualIssueSidebar : ''}

              </div>

              <div style="display: ${ui.issueSource === 'auto' ? 'grid' : 'none'}; grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr); gap: 20px; align-items: start;">
                <div style="min-width:0; display:flex; flex-direction:column; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden;">
                  
                  <div style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(15,23,42,0.6);">
                    <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.4); padding: 4px; border-radius: 10px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.05);">
                      ${['all', 'junior', 'middle', 'senior'].map(lvl => {
                        const isActive = currentAutoLevel === lvl;
                        const labels = { all: 'Усі', junior: 'Junior', middle: 'Middle', senior: 'Senior' };
                        return `
                          <button type="button" class="auto-level-btn" data-level="${lvl}" style="flex: 1; border: none; padding: 6px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; background: ${isActive ? 'var(--accent)' : 'transparent'}; color: ${isActive ? '#fff' : 'var(--text-dim)'}; box-shadow: ${isActive ? '0 2px 8px rgba(139,92,246,0.3)' : 'none'};">
                            ${labels[lvl]}
                          </button>
                        `;
                      }).join('')}
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 12px; color: var(--text-dim); white-space: nowrap;"><i class="ri-folder-2-line"></i> Тема:</span>
                      <select id="teacherIssueAutoFilter" class="teacher-input" style="flex: 1; margin: 0; padding: 8px 12px; font-size: 13px; background: #0f172a; color: #f8fafc; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        <option value="all">Усі вибрані практикуми</option>
                        ${levelFilteredModules.map(m => `<option value="${escapeHtml(m.id)}" ${currentAutoFilter === String(m.id) ? 'selected' : ''}>${escapeHtml(m.title)}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div id="teacherAutoTasksScroll" class="dash-scroll-wrap teacher-assignments-list" style="max-height: 690px; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                    ${filteredAutoModules.map(mod => {
                      if (!mod.tasks || !mod.tasks.length) return "";

                      const sourceModule = autoModules.find((m) => String(m.id) === String(mod.id)) || mod;

                      return mod.tasks.map((t, i) => {
                        const originalIndex = Array.isArray(sourceModule.tasks)
                          ? sourceModule.tasks.findIndex((task) => task === t)
                          : i;

                        const safeIndex = originalIndex >= 0 ? originalIndex : i;
                        const val = `auto|${mod.courseId}|${mod.id}|${safeIndex}`;
                        const isSelected = (ui.selectedAutoTaskIds || []).includes(val);

                        return `
                          <label class="auto-task-card ${isSelected ? 'is-selected' : ''}" style="display:block; cursor:pointer; margin:0;">
                            <input type="checkbox" class="auto-task-radio-input" name="taskIdAuto" value="${val}" ${isSelected ? "checked" : ""} style="display:none;">

                            <div class="radio-card-body" style="padding:10px 12px; background: rgba(255,255,255,0.02); border: 1px solid ${isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.05)'}; border-radius: 10px; transition: all 0.2s;">
                              <div style="display:flex; align-items:flex-start; gap:10px;">

                                <div class="radio-check-icon" style="width:18px; height:18px; border-radius:50%; border:2px solid ${isSelected ? 'var(--accent)' : 'var(--text-dim)'}; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:${isSelected ? 'rgba(139,92,246,0.2)' : 'transparent'}; margin-top:2px;">
                                  <div class="radio-check-dot" style="width:8px; height:8px; border-radius:50%; background:var(--accent); opacity:${isSelected ? '1' : '0'}; transform:scale(${isSelected ? '1' : '0.6'}); transition:all 0.2s;"></div>
                                </div>

                                <div style="min-width:0; flex:1;">
                                  <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">

                                    <div style="min-width:0; flex:1;">
                                      <div style="font-weight:700; font-size:14px; color:${isSelected ? '#fff' : 'var(--text)'}; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:3px;">
                                        ${escapeHtml(t.title || 'Завдання ' + (safeIndex + 1))}
                                      </div>

                                      <div style="font-size:10px; color:var(--text-dim); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                        ${escapeHtml(mod.title)}
                                      </div>
                                    </div>

                                    <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                      <div style="font-size:10px; font-weight:800; color:var(--success); background:rgba(34,197,94,0.1); padding:3px 7px; border-radius:6px; white-space:nowrap;">
                                        12 б.
                                      </div>

                                      <button
                                        type="button"
                                        data-preview-auto-task="${escapeHtml(`${mod.courseId}|${mod.id}|${safeIndex}`)}"
                                        onclick="event.preventDefault(); event.stopPropagation();"
                                        style="height:26px; padding:0 8px; border-radius:7px; border:1px solid rgba(139,92,246,0.28); background:rgba(139,92,246,0.10); color:var(--accent); font-size:11px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px; white-space:nowrap;"
                                      >
                                        <i class="ri-eye-line"></i> Перегляд
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </label>
                        `;
                      }).join('');
                    }).join('') || `<div style="text-align:center; padding:40px; color:var(--text-dim); font-size:14px;">Немає завдань.</div>`}
                  </div>
                </div>

                ${ui.issueSource === 'auto' ? renderAutoIssueSidebar(selectedAutoItems) : ''}
              </div>

              <div style="display: ${ui.issueSource === 'quick' ? 'block' : 'none'};">
                <div style="background: rgba(0,0,0,0.2); padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                  <div style="margin-bottom: 20px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Назва завдання (Тема)</label>
                    <input type="text" class="teacher-input" name="quickTitle" placeholder="Наприклад: Робота зі списками Python" style="width: 100%; margin: 0; font-size: 15px; background: rgba(255,255,255,0.03);">
                  </div>
                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Коротка умова (Що зробити)</label>
                    <textarea class="teacher-input" name="quickDesc" rows="4" placeholder="Опишіть, що саме повинен зробити учень..." style="width: 100%; margin: 0; font-size: 15px; resize: vertical; background: rgba(255,255,255,0.03);"></textarea>
                  </div>
                </div>
              </div>

            </div> 

            ${(ui.issueSource === 'auto' || ui.issueSource === 'bank') ? '' : `
              <div style="height: 1px; background: var(--border); margin-bottom: 32px;"></div>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 24px;">
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">1. Оберіть клас</label>
                  <select id="assignmentClassCode" class="teacher-input" name="classCode" style="width: 100%; margin: 0;">
                    ${teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issueClassCode || "") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">2. Кому призначити?</label>
                  <select id="assignmentTargetType" class="teacher-input" name="targetType" style="width: 100%; margin: 0;">
                    <option value="class" ${ui.issueTargetType === "class" ? "selected" : ""}>👨‍👩‍👧‍👦 Усьому класу</option>
                    <option value="student" ${ui.issueTargetType === "student" ? "selected" : ""}>👤 Окремому учню</option>
                  </select>
                </div>
              </div>

              ${ui.issueTargetType === "student" ? `
                <div style="margin-bottom: 24px; padding: 16px 20px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; animation: fadeIn 0.3s;">
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--accent); margin-bottom: 8px; text-transform: uppercase;">Оберіть учня</label>
                  <select id="assignmentStudentId" class="teacher-input" name="studentId" style="width: 100%; margin: 0;">
                    ${classStudents.length ? classStudents.map(s => `<option value="${escapeHtml(s.id)}" ${String(ui.issueStudentId || "") === String(s.id) ? "selected" : ""}>${escapeHtml(s.full_name || "Без імені")}</option>`).join("") : `<option value="">У класі ще немає учнів</option>`}
                  </select>
                </div>
              ` : ""}

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 40px;">
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">Дедлайн (необов'язково)</label>
                  <input class="teacher-input" name="dueAt" type="datetime-local" style="width: 100%; margin: 0;">
                </div>
                <div>
                  <label style="display: block; font-size: 12px; font-weight: 700; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">Примітка / Підказка</label>
                  <input class="teacher-input" name="noteForStudent" placeholder="Напишіть щось учням..." style="width: 100%; margin: 0;">
                </div>
              </div>

              <div style="display: flex; justify-content: center;">
                <button class="teacher-btn teacher-btn--primary" type="submit" style="min-width: 300px; padding: 16px; margin: 0 auto; display: flex; justify-content: center;">
                  <i class="ri-send-plane-fill"></i> Видати завдання
                </button>
              </div>
            `}

          </form>
        </section>

        <style>
          .teacher-radio-card.is-selected .radio-card-body{ border-color: var(--primary) !important; background: rgba(14,165,233,0.1) !important; }
          .teacher-radio-card.is-selected .radio-check-dot{ opacity: 1 !important; transform: scale(1) !important; }
          .auto-task-card.is-selected .radio-card-body{ border-color: var(--primary) !important; background: rgba(14,165,233,0.1) !important; }
          .auto-task-card.is-selected .radio-check-dot{ background: var(--primary) !important; opacity: 1 !important; transform: scale(1) !important; }
          .teacher-radio-card.auto-task.is-selected .radio-card-body{ border-color: var(--accent) !important; background: rgba(139,92,246,0.1) !important; }
          .teacher-radio-card.auto-task.is-selected .radio-check-dot{ background: var(--accent) !important; opacity: 1 !important; transform: scale(1) !important; }
          @keyframes fadeIn{ from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        </style>
      </div>
      `;
    }
    function renderSubmissionStatusBadge(status) {
      const s = String(status || "submitted");
      let bg = "", color = "", icon = "", lbl = "";
      
      if (s === "submitted") { 
        bg = "rgba(251, 191, 36, 0.15)"; color = "var(--warn)"; icon = "ri-time-line"; lbl = "Очікує перевірки"; 
      } else if (s === "review") { 
        bg = "rgba(139, 92, 246, 0.15)"; color = "var(--accent)"; icon = "ri-eye-line"; lbl = "Перевіряється"; 
      } else if (s === "reviewed") { 
        bg = "rgba(34, 197, 94, 0.15)"; color = "var(--success)"; icon = "ri-check-double-line"; lbl = "Оцінено"; 
      } else if (s === "returned") { 
        bg = "rgba(244, 63, 94, 0.15)"; color = "var(--danger)"; icon = "ri-reply-line"; lbl = "На доопрацюванні"; 
      }

      return `<span style="display: inline-flex; align-items: center; gap: 4px; background: ${bg}; color: ${color}; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid ${color.replace('var(', 'rgba(').replace(')', ', 0.3)')}">
        <i class="${icon}"></i> ${escapeHtml(lbl)}
      </span>`;
    }

    function renderAssignmentStatusBadge(status) {
      const s = String(status || "active");
      if (s === "closed") { 
        return `<span style="background: rgba(255,255,255,0.05); color: var(--text-dim); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.1);"><i class="ri-lock-line"></i> Закрито</span>`; 
      }
      return `<span style="background: rgba(14, 165, 233, 0.15); color: var(--primary); padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid rgba(14, 165, 233, 0.3);"><i class="ri-radio-button-line" style="animation: pulse 2s infinite;"></i> Активне</span>`;
    }

    function renderReviewTab() {
      const ui = ensureUiState();
      const assignmentsList = getFilteredAssignments();

      return `
        <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 1100px; margin: 0 auto;">
          
          <section class="teacher-card" style="padding: 16px 20px; background: rgba(30,41,59,0.6); border: 1px solid var(--border); border-radius: 16px; backdrop-filter: blur(10px);">
            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              
              <div style="flex: 2; min-width: 200px; position: relative;">
                <i class="ri-search-line" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                <input
                  id="teacherIssuedSearch"
                  class="teacher-input"
                  type="search"
                  placeholder="Пошук завдання..."
                  value="${escapeHtml(ui.issuedSearch || "")}"
                  style="margin: 0; padding: 10px 14px 10px 40px; width: 100%; border-radius: 10px; background: rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.05);"
                >
              </div>

              <select id="teacherIssuedClassFilter" class="teacher-input" style="flex: 1; min-width: 140px; margin: 0; padding: 10px 14px; border-radius: 10px; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
                <option value="all">🎓 Усі класи</option>
                ${teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issuedClassFilter || "all") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
              </select>

              <select id="teacherIssuedStudentFilter" class="teacher-input" style="flex: 1; min-width: 160px; margin: 0; padding: 10px 14px; border-radius: 10px; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);" ${ui.issuedClassFilter === 'all' ? 'disabled' : ''}>
                <option value="all">👤 Усі учні</option>
                ${classStudents.map(s => `<option value="${escapeHtml(s.id)}" ${String(ui.issuedStudentFilter || "all") === String(s.id) ? "selected" : ""}>${escapeHtml(s.full_name)}</option>`).join("")}
              </select>

<select id="teacherIssuedStatusFilter" class="teacher-input" style="flex: 1; min-width: 140px; margin: 0; padding: 10px 14px; border-radius: 10px; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
  <option value="all" ${String(ui.issuedStatusFilter || "all") === "all" ? "selected" : ""}>🗂 Усі стани</option>
  <option value="submitted" ${String(ui.issuedStatusFilter) === "submitted" ? "selected" : ""}>⚠️ Очікують перевірки</option>
  <option value="review" ${String(ui.issuedStatusFilter) === "review" ? "selected" : ""}>🟣 На перевірці</option>
  <option value="reviewed" ${String(ui.issuedStatusFilter) === "reviewed" ? "selected" : ""}>✅ Оцінено</option>
  <option value="returned" ${String(ui.issuedStatusFilter) === "returned" ? "selected" : ""}>↩️ Доопрацювати</option>
  <option value="missing" ${String(ui.issuedStatusFilter) === "missing" ? "selected" : ""}>🟢 Не здано</option>
  <option value="active" ${String(ui.issuedStatusFilter) === "active" ? "selected" : ""}>📌 Активні</option>
  <option value="closed" ${String(ui.issuedStatusFilter) === "closed" ? "selected" : ""}>🔒 Закриті</option>
</select>
            </div>
          </section>

          ${assignmentsList.length === 0 ? `
            <div style="text-align: center; padding: 60px 20px; background: rgba(0,0,0,0.1); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
              <i class="ri-inbox-2-line" style="font-size: 40px; color: var(--text-dim); margin-bottom: 12px; display: block;"></i>
              <p style="color: var(--text-dim); font-size: 14px; margin: 0;">За вашими фільтрами нічого не знайдено.</p>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 16px;">
${assignmentsList.map((item) => {
  let subs = getSubmissionsForAssignment(item.id);

  if (ui.issuedStudentFilter && ui.issuedStudentFilter !== "all") {
    subs = subs.filter(
      s => String(s.student_id || "") === String(ui.issuedStudentFilter)
    );
  }

                const unreviewedCount = subs.filter(s => s.status === "submitted" || s.status === "review").length;
                const hasNew = unreviewedCount > 0;

                const targetClass = teacherClasses.find(c => String(c.code) === String(item.class_code));
                const className = targetClass ? (targetClass.name || targetClass.code) : (item.class_code || "—");

                return `
                  <details class="teacher-task-accordion" style="background: var(--surface2); border: 1px solid ${hasNew ? 'rgba(251, 191, 36, 0.4)' : 'var(--border)'}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    
                    <summary style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; list-style: none; user-select: none; transition: background 0.2s;">
                      
                      <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                          <h4 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--text);">${escapeHtml(item.title_snapshot || "Без назви")}</h4>
                          ${renderAssignmentStatusBadge(item.status)}
                          ${hasNew ? `<span style="background: rgba(251,191,36,0.15); color: var(--warn); border: 1px solid rgba(251,191,36,0.3); font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 12px; letter-spacing: 0.05em;">+${unreviewedCount} НОВИХ</span>` : ''}
                        </div>
                        
                        <div style="font-size: 12px; color: var(--text-dim); display: flex; gap: 16px; flex-wrap: wrap;">
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-user-settings-line" style="color: var(--accent);"></i> <b style="color: var(--text);">${item.target_type === "student" ? "Індивідуально" : "Усьому класу"}</b></span>
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-group-line" style="color: var(--primary);"></i> Клас: <b style="color: var(--text);">${escapeHtml(className)}</b></span>
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-calendar-line"></i> Видано: <span style="color: var(--text);">${escapeHtml(formatDate(item.created_at))}</span></span>
                          <span style="display: flex; align-items: center; gap: 4px;"><i class="ri-calendar-todo-line" style="color: var(--warn);"></i> Дедлайн: <b style="color: var(--text);">${escapeHtml(formatDate(item.due_at))}</b></span>
                        </div>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 12px; font-weight: 600; color: var(--text-dim); background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); padding: 6px 12px; border-radius: 10px; display: flex; align-items: center; gap: 6px;">
                          <i class="ri-stack-line"></i> Здач: ${subs.length}
                        </div>
                        <i class="ri-arrow-down-s-line chevron" style="font-size: 24px; color: var(--text-dim); transition: transform 0.3s;"></i>
                      </div>
                    </summary>

                    <div style="background: rgba(0,0,0,0.25); border-top: 1px solid rgba(255,255,255,0.03); padding: 16px;">
                      <div style="display: flex; justify-content: flex-end; margin-bottom: 12px;">
                         <button class="teacher-btn teacher-btn--ghost teacher-btn--small" data-delete-assignment="${escapeHtml(item.id)}" style="color: var(--danger); opacity: 0.7;">
                           <i class="ri-delete-bin-line"></i> Видалити завдання
                         </button>
                      </div>
                      
                      ${renderAssignmentSubmissions(item, subs)}
                    </div>
                  </details>
                `;
              }).join("")}
            </div>
          `}
        </div>

        <style>
          .teacher-task-accordion > summary::-webkit-details-marker { display: none; }
          .teacher-task-accordion[open] .chevron { transform: rotate(180deg); color: var(--primary); }
          .teacher-task-accordion > summary:hover { background: rgba(255,255,255,0.02); }
          
          .student-sub-accordion > summary::-webkit-details-marker { display: none; }
          .student-sub-accordion[open] .sub-chevron { transform: rotate(180deg); }
          .student-sub-accordion[open] > summary { background: rgba(14,165,233,0.05); border-bottom: 1px solid rgba(255,255,255,0.03); }
          select.teacher-input option { background: #0f172a; color: #f8fafc; }
        </style>
      `;
    }

    function renderAssignmentSubmissions(item, rows) {
if (!rows || !rows.length) {
  const safeStatus = String(item?.status || "active");
  const label = safeStatus === "closed"
    ? "Завдання закрите без здачі."
    : "Завдання видано, але учень ще нічого не відправив.";

  return `
    <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.01); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.05);">
      <span style="color: var(--text-dim); font-size: 13px; font-style: italic;">${label}</span>
    </div>`;
}

      return `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${rows.map((submission) => {
            const isNew = submission.status === "submitted";
            const borderGlow = isNew ? "border-left: 3px solid var(--warn);" : "border-left: 3px solid transparent;";

            return `
            <details class="student-sub-accordion" style="background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.04); border-radius: 10px; overflow: hidden; ${borderGlow}">
              
              <summary style="padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; transition: background 0.2s;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 28px; height: 28px; border-radius: 8px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff;">
                    ${(submission.student_name || "У")[0].toUpperCase()}
                  </div>
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 14px; font-weight: 600; color: var(--text);">${escapeHtml(submission.student_name || "Учень")}</span>
                    <span style="font-size: 11px; color: var(--text-dim);">${escapeHtml(formatDate(submission.submitted_at))}</span>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 12px;">
                  ${renderSubmissionStatusBadge(submission.status)}
                  ${submission.points != null ? `<span style="background: rgba(34,197,94,0.1); color: var(--success); font-weight: 800; font-size: 13px; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(34,197,94,0.2);">${submission.points} б.</span>` : ""}
                  <i class="ri-arrow-down-s-line sub-chevron" style="color: var(--text-dim); transition: transform 0.2s; font-size: 18px;"></i>
                </div>
              </summary>

              <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
                
                <div style="background: #020617; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden;">
                  <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; align-items: center; gap: 8px;">
                    <i class="ri-code-s-slash-line" style="color: var(--text-dim);"></i>
                    <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em;">Відповідь учня</span>
                  </div>
                  <div style="padding: 16px; font-family: var(--mono); font-size: 13px; color: var(--text); white-space: pre-wrap; max-height: 350px; overflow-y: auto; line-height: 1.5;">${submission.submission_text ? escapeHtml(submission.submission_text) : `<span style="color: var(--text-dim); font-style: italic; font-family: var(--font);">Учень нічого не написав.</span>`}</div>
                </div>

                <form data-review-submission-form="${escapeHtml(submission.id)}" style="display: flex; flex-direction: column; gap: 12px; background: rgba(255,255,255,0.02); padding: 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05);">
                  
                  <div>
                    <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-dim); margin-bottom: 6px;">Коментар (бачить учень)</label>
                    <textarea name="teacherComment" rows="2" class="teacher-input" placeholder="Напиши фідбек або зауваження..." style="margin: 0; width: 100%; font-size: 13px; resize: vertical; background: rgba(0,0,0,0.2);"></textarea>
                  </div>

                  <div style="display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap;">
                    
                    <div style="flex: 0 0 100px;">
                      <label style="display: block; font-size: 11px; color: var(--text-dim); margin-bottom: 6px;">Бал (0-100)</label>
                      <input type="number" name="points" min="0" max="100" class="teacher-input" placeholder="0" value="${submission.points ?? ""}" style="width: 100%; margin: 0; text-align: center; font-weight: 700; font-size: 14px; color: var(--success); background: rgba(0,0,0,0.2);">
                    </div>
                    
                    <div style="flex: 1; min-width: 160px;">
                      <label style="display: block; font-size: 11px; color: var(--text-dim); margin-bottom: 6px;">Статус перевірки</label>
                      <select name="status" class="teacher-input" style="width: 100%; margin: 0; font-size: 13px; cursor: pointer; background: #0f172a; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
                         <option value="submitted" ${submission.status === "submitted" ? "selected" : ""}>⏳ На розгляді</option>
                         <option value="review" ${submission.status === "review" ? "selected" : ""}>👁 В процесі перевірки</option>
                         <option value="returned" ${submission.status === "returned" ? "selected" : ""}>↩️ Доопрацювати</option>
                         <option value="reviewed" ${submission.status === "reviewed" ? "selected" : ""}>✅ Оцінено</option>
                      </select>
                    </div>

                    <div style="display: flex; align-items: flex-end;">
                      <button type="submit" class="teacher-btn teacher-btn--primary" style="height: 42px; margin: 0; padding: 0 20px;">
                        <i class="ri-save-line"></i> Зберегти оцінку
                      </button>
                    </div>
                    
                  </div>
                </form>

              </div>
            </details>
            `;
          }).join("")}
        </div>
      `;
    }

    function renderView() {
      const root = $("teacherInnerView");
      if (!root) return;

      const ui = ensureUiState();

root.innerHTML = `
  <section class="teacher-panel">
    ${ui.mainTab === "review" ? renderReviewTab() : renderIssueTab()}
  </section>
`;

      const targetTypeSelect = $("assignmentTargetType");
      if (targetTypeSelect) {
        targetTypeSelect.value = ui.issueTargetType || "class";
      }

      const classSelect = $("assignmentClassCode");
      if (classSelect) {
        classSelect.value = ui.issueClassCode || "";
      }

      const studentSelect = $("assignmentStudentId");
      if (studentSelect) {
        studentSelect.value = ui.issueStudentId || "";
      }
    }

    async function reloadStudents() {
      const ui = ensureUiState();
      if (!ui.issueClassCode) {
        classStudents = []; ui.issueStudentId = ""; save?.(); return;
      }
      classStudents = await store.fetchStudentsByClass(ui.issueClassCode);
      if (!classStudents.some((student) => student.id === ui.issueStudentId)) {
        ui.issueStudentId = classStudents[0]?.id || "";
      }
      save?.();
    }

async function loadData() {
  if (loadData._busy) return;
  loadData._busy = true;

  try {
    const ui = ensureUiState();

    const [classes, tasks, issued] = await Promise.all([
      store.fetchTeacherClasses(),
      store.fetchTaskBank(),
      store.fetchAssignments()
    ]);

    teacherClasses = classes || [];
    taskBank = tasks || [];
    assignments = issued || [];
    submissions = await store.fetchSubmissionsByAssignmentIds(
      assignments.map((item) => item.id)
    );

    if (!teacherClasses.some((cls) => cls.code === ui.issueClassCode)) {
      ui.issueClassCode = teacherClasses[0]?.code || "";
    }

    const visibleManualTasks = getManualTasksByTheme(ui.issueThemeFilter || "all");
    const visibleManualIds = new Set(visibleManualTasks.map((task) => String(task.id)));

    ui.selectedTaskIds = (ui.selectedTaskIds || [])
      .map(String)
      .filter((id) => visibleManualIds.has(id));

    if (ui.previewTaskId && !visibleManualIds.has(String(ui.previewTaskId))) {
      ui.previewTaskId = ui.selectedTaskIds[0] || visibleManualTasks[0]?.id || "";
    }

    if (!ui.previewTaskId) {
      ui.previewTaskId = ui.selectedTaskIds[0] || visibleManualTasks[0]?.id || "";
    }

    const autoModules = getAutoModules();

    if (autoModules.length && !autoModules.some((m) => String(m.id) === String(ui.selectedAutoModuleId))) {
      ui.selectedAutoModuleId = autoModules[0].id;
    }

    const availableAutoIds = new Set();
    autoModules.forEach((mod) => {
      (mod.tasks || []).forEach((_, index) => {
        availableAutoIds.add(`auto|${mod.courseId}|${mod.id}|${index}`);
      });
    });

    ui.selectedAutoTaskIds = (ui.selectedAutoTaskIds || [])
      .map(String)
      .filter((id) => availableAutoIds.has(id));

await reloadStudents();

if (ui.issuedClassFilter && ui.issuedClassFilter !== "all") {
  classStudents = await store.fetchStudentsByClass(ui.issuedClassFilter);
} else if (ui.mainTab === "review") {
  classStudents = [];
}

save?.();
  } finally {
    loadData._busy = false;
  }
}

async function handleTaskBankSubmit(form) {
  const ui = ensureUiState();
  const formData = new FormData(form);

  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    source: "teacher",
    subject: formData.get("subject"),
    category: formData.get("category"),
    solutionFormat: formData.get("solutionFormat"),
    starterCode: formData.get("starterCode"),
    maxScore: formData.get("maxScore"),
    isPublic: formData.get("isPublic") === "on"
  };

  let savedTask = null;

  if (ui.isEditingTask && ui.editingTaskId) {
    savedTask = await store.updateTaskBankItem(ui.editingTaskId, payload);
    toast("✅ Завдання оновлено");
  } else {
    savedTask = await store.createTaskBankItem(payload);
    toast("✅ Завдання збережено в базу");
  }

  form.reset();

  ui.isCreatingTask = false;
  ui.isEditingTask = false;
  ui.editingTaskId = "";
  ui.previewTaskId = savedTask?.id ? String(savedTask.id) : ui.previewTaskId;

  save?.();
  await loadData();
  renderView();
  bindEvents();
}

async function handleIssueSubmit(form) {
  const ui = ensureUiState();
  const formData = new FormData(form);
  const taskSource = String(formData.get("taskSource") || "bank");

  ui.issueTargetType = String(formData.get("targetType") || "class");
  ui.issueClassCode = String(formData.get("classCode") || "");
  ui.issueStudentId = String(formData.get("studentId") || "");
  save?.();

  let tasksToAssign = [];

if (taskSource === "bank") {
  const formTaskIds = formData
    .getAll("taskIdBank")
    .map((value) => String(value || "").trim())
    .filter(Boolean);

  const selectedIds = formTaskIds.length
    ? formTaskIds
    : (ui.selectedTaskIds || []).map(String).filter(Boolean);

  if (!selectedIds.length) {
    throw new Error("Оберіть хоча б одне ручне завдання");
  }

  tasksToAssign = taskBank.filter((item) =>
    selectedIds.includes(String(item.id))
  );
} else if (taskSource === "auto") {
    if (!ui.selectedAutoTaskIds.length) {
      throw new Error("Оберіть хоча б одне авто-завдання");
    }

    for (const selectedValue of ui.selectedAutoTaskIds) {
      const [, cId, mId, tIdx] = String(selectedValue).split("|");
      const autoMod = getAutoModules().find((m) => String(m.id) === String(mId));
      if (!autoMod) continue;

      const taskObj = autoMod.tasks?.[Number(tIdx)];
      if (!taskObj) continue;

      const safeStarterCode = `auto|${cId}|${mId}|${tIdx}`;

      let taskToAssign =
        taskBank.find((t) => String(t.starter_code || "").trim() === safeStarterCode) || null;

      if (!taskToAssign) {
        const rawDesc = taskObj.desc
          ? String(taskObj.desc).replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim()
          : "Практична задача з автоматичною перевіркою.";

taskToAssign = await store.createTaskBankItem({
  title: `[Авто] ${taskObj.title || "Завдання"}`,
  description: rawDesc,
  source: "teacher",
  subject: "Практикум",
  category: autoMod.title || "Авто-практикум",
  solutionFormat: "code",
  starterCode: safeStarterCode,
  maxScore: 12,
  isPublic: false
});

        taskBank = [taskToAssign, ...taskBank.filter((t) => t.id !== taskToAssign.id)];
      }

      tasksToAssign.push(taskToAssign);
    }
  } else if (taskSource === "quick") {
    const quickTitle = String(formData.get("quickTitle") || "").trim();
    const quickDesc = String(formData.get("quickDesc") || "").trim();

    if (!quickTitle) {
      throw new Error("Введіть назву для швидкого завдання");
    }

    const quickShadowCode = `__QUICK__|${Date.now()}|${Math.random().toString(36).slice(2, 8)}`;

    const quickTask = await store.createTaskBankItem({
      title: quickTitle,
      description: quickDesc || "Виконайте завдання згідно з інструкціями на уроці.",
      source: "teacher",
      subject: "Швидке завдання",
      category: "Швидкі",
      solutionFormat: "text",
      starterCode: quickShadowCode,
      maxScore: 12,
      isPublic: false
    });

    taskBank = [quickTask, ...taskBank.filter((t) => t.id !== quickTask.id)];
    tasksToAssign = [quickTask];
  }

  if (!tasksToAssign.length) {
    throw new Error("Не вдалося підготувати завдання для видачі");
  }

  const createdAssignments = [];

  for (const task of tasksToAssign) {
    const createdAssignment = await store.createAssignment({
      task,
      targetType: ui.issueTargetType,
      classCode: ui.issueClassCode,
      studentId: ui.issueStudentId,
      noteForStudent: formData.get("noteForStudent"),
      dueAt: formData.get("dueAt") || null,
      allowLateSubmission: true
    });

    createdAssignments.push(createdAssignment);
  }

  assignments = [
    ...createdAssignments.reverse(),
    ...assignments.filter(
      (item) => !createdAssignments.some((created) => created.id === item.id)
    )
  ];

  try {
    const freshAssignments = await store.fetchAssignments();
    if (Array.isArray(freshAssignments)) {
      assignments = freshAssignments;
    }
  } catch (err) {
    console.warn("Не вдалося оновити список призначених завдань із бази:", err);
  }

  const total = createdAssignments.length;
  toast(total === 1 ? "✅ Завдання успішно видано" : `✅ Успішно видано ${total} завдань`);

  form.reset();

  if (taskSource === "bank") {
    ui.selectedTaskIds = [];
    ui.previewTaskId = "";
  } else if (taskSource === "auto") {
    ui.selectedAutoTaskIds = [];
    ui.previewTaskId = "";
  } else if (taskSource === "quick") {
    ui.previewTaskId = "";
  }

  await reloadStudents();
  save?.();
  renderView();
  bindEvents();
}
    function syncIssueSelectionVisuals() {
      const root = $("teacherInnerView");
      if (!root) return;

      root.querySelectorAll(".teacher-radio-card").forEach((card) => {
        const radio = card.querySelector('input[name="taskIdBank"]');
        const selected = !!radio?.checked;
        card.classList.toggle("is-selected", selected);
      });

      root.querySelectorAll(".auto-task-card").forEach((card) => {
        const radio = card.querySelector('input[name="taskIdAuto"]');
        const selected = !!radio?.checked;
        card.classList.toggle("is-selected", selected);

        if (selected) {
          const accordion = card.closest(".teacher-auto-module-accordion");
          if (accordion) accordion.open = true;
        }
      });
    }

    function bindEvents() {
      const root = $("teacherInnerView");
      if (!root) return;

root.querySelectorAll("[data-main-tab]").forEach(btn => {
  btn.onclick = () => {
    const ui = ensureUiState();
    const nextTab = btn.getAttribute("data-main-tab");
    ui.mainTab = nextTab === "review" ? "review" : "issue";
    save?.();
    renderView();
    bindEvents();
  };
});

      
      root.querySelectorAll("[data-bank-category]").forEach(btn => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.bankCategory = btn.getAttribute("data-bank-category");
          ui.isCreatingTask = false;
          save?.(); renderView(); bindEvents();
        };
      });

root.querySelectorAll("[data-open-create-task]").forEach(btn => {
  btn.onclick = () => {
    const ui = ensureUiState();
    ui.isCreatingTask = true;
    ui.isEditingTask = false;
    ui.editingTaskId = "";
    save?.();
    renderView();
    bindEvents();
  };
});

root.querySelectorAll("[data-close-create-task]").forEach(btn => {
  btn.onclick = () => {
    const ui = ensureUiState();
    ui.isCreatingTask = false;
    ui.isEditingTask = false;
    ui.editingTaskId = "";
    save?.();
    renderView();
    bindEvents();
  };
});

root.querySelectorAll("[data-edit-task]").forEach((btn) => {
  btn.onclick = () => {
    const taskId = btn.getAttribute("data-edit-task") || "";
    if (!taskId) return;

    const ui = ensureUiState();
    ui.isCreatingTask = true;
    ui.isEditingTask = true;
    ui.editingTaskId = taskId;
    ui.previewTaskId = taskId;

    save?.();
    renderView();
    bindEvents();
  };
});

      const bankThemeFilter = $("teacherBankThemeFilter");
      if (bankThemeFilter) {
        bankThemeFilter.onchange = () => { 
          ensureUiState().bankThemeFilter = bankThemeFilter.value || "all"; 
          save?.(); renderView(); bindEvents(); 
        };
      }

      root.querySelectorAll("[data-select-task]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const ui = ensureUiState();
          ui.selectedTaskId = btn.getAttribute("data-select-task") || "";
          ui.isCreatingTask = false;
          save?.(); renderView(); bindEvents();
        });
      });

      root.querySelectorAll("[data-select-auto-module]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const ui = ensureUiState();
          ui.selectedAutoModuleId = btn.getAttribute("data-select-auto-module") || "";
          save?.(); renderView(); bindEvents();
        });
      });

      const bankForm = $("teacherTaskBankForm");
      if (bankForm) {
        bankForm.onsubmit = async (e) => {
          e.preventDefault();
          if (bankForm.dataset.busy === "1") return;
          bankForm.dataset.busy = "1";
          try { await handleTaskBankSubmit(bankForm); } 
          catch (err) { toast(`❌ ${err.message || "Помилка"}`); } 
          finally { bankForm.dataset.busy = "0"; }
        };
      }

root.querySelectorAll("[data-source]").forEach((btn) => {
  btn.onclick = () => {
    const ui = ensureUiState();
    ui.issueSource = btn.dataset.source || "bank";

    if (ui.issueSource === "bank") {
      ensureSelectedTaskInsideTheme(ui.issueThemeFilter || "all");
    }

    if (ui.issueSource === "auto") {
      ensureSelectedIssueAutoTask();
    }

    save?.();
    renderView();
    bindEvents();
  };
});

      const issueThemeFilter = $("teacherIssueThemeFilter");
      if (issueThemeFilter) {
        issueThemeFilter.onchange = () => {
          const ui = ensureUiState();
          ui.issueThemeFilter = issueThemeFilter.value || "all";
          ensureSelectedTaskInsideTheme(ui.issueThemeFilter);
          save?.(); renderView(); bindEvents();
        };
      }

root.querySelectorAll('input[name="taskIdBank"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const ui = ensureUiState();
    const value = String(checkbox.value || "");
    const selected = new Set((ui.selectedTaskIds || []).map(String));

    if (checkbox.checked) {
      selected.add(value);
      ui.previewTaskId = value;
    } else {
      selected.delete(value);

      if (String(ui.previewTaskId) === value) {
        ui.previewTaskId = [...selected][0] || "";
      }
    }

    ui.selectedTaskIds = [...selected];
    ui.isCreatingTask = false;
    save?.();

    // ВАЖЛИВО: не просто підсвітити чекбокс,
    // а повністю перемалювати правий блок,
    // щоб одразу оновились:
    // - кількість вибраних
    // - список вибраних
    // - текст кнопки "Видати X завд."
    renderView();
    bindEvents();
  });
});


      const issueForm = $("teacherIssueForm");
      if (issueForm) {
        issueForm.onsubmit = async (e) => {
          e.preventDefault();
          if (issueForm.dataset.busy === "1") return;
          issueForm.dataset.busy = "1";
          try { await handleIssueSubmit(issueForm); } 
          catch (err) { toast(`❌ ${err.message || "Помилка"}`); } 
          finally { issueForm.dataset.busy = "0"; }
        };
      }

      root.querySelectorAll("[data-delete-task]").forEach((btn) => {
        btn.onclick = async () => {
          const taskId = btn.getAttribute("data-delete-task") || "";
          if (!taskId) return;
          if (!confirm("Видалити завдання з бази?")) return;
          btn.disabled = true;

          try {

            await store.archiveTaskBankItem(taskId);
            toast("🗑️ Завдання видалено");
            const ui = ensureUiState();
if (String(ui.editingTaskId || "") === String(taskId)) {
  ui.isCreatingTask = false;
  ui.isEditingTask = false;
  ui.editingTaskId = "";
}
            await loadData(); renderView(); bindEvents();
          } catch (err) { toast(`❌ ${err.message}`); } 
          finally { btn.disabled = false; }
        };
      });

      root.querySelectorAll("[data-delete-assignment]").forEach((btn) => {
        btn.onclick = async () => {
          const assignmentId = btn.getAttribute("data-delete-assignment") || "";
          if (!assignmentId) return;
          if (!confirm("Видалити це призначене завдання? Усі здачі учнів теж зникнуть.")) return;
          btn.disabled = true;
          try {
            await store.deleteAssignment(assignmentId);
            assignments = assignments.filter((item) => item.id !== assignmentId);
            toast("🗑️ Призначене завдання видалено");
            renderView(); bindEvents();
          } catch (err) { toast(`❌ ${err.message}`); } 
          finally { btn.disabled = false; }
        };
      });

      root.querySelectorAll("[data-remove-assignment-student]").forEach((btn) => {
        btn.onclick = async () => {
          const assignmentId = btn.getAttribute("data-remove-assignment-student") || "";
          const studentId = btn.getAttribute("data-remove-student-id") || "";
          const studentName = btn.getAttribute("data-remove-student-name") || "учня";
          const assignmentTitle = btn.getAttribute("data-remove-assignment-title") || "завдання";

          if (!assignmentId || !studentId) return;
          if (!confirm(`Прибрати завдання "${assignmentTitle}" лише для ${studentName}?`)) return;

          btn.disabled = true;
          try {
            const result = await store.removeAssignmentForStudent(assignmentId, studentId);

            if (result?.mode === "deleted") {
              assignments = assignments.filter((item) => String(item.id) !== String(assignmentId));
              submissions = submissions.filter((item) => !(String(item.assignment_id) === String(assignmentId) && String(item.student_id) === String(studentId)));
            } else if (result?.assignment) {
              assignments = assignments.map((item) => String(item.id) === String(result.assignment.id) ? result.assignment : item);
              submissions = submissions.filter((item) => !(String(item.assignment_id) === String(assignmentId) && String(item.student_id) === String(studentId)));
            }

            toast("✅ Завдання прибрано лише для одного учня");
            renderView(); bindEvents();
          } catch (err) {
            toast(`❌ ${err.message}`);
          } finally {
            btn.disabled = false;
          }
        };
      });

      root.querySelectorAll("[data-review-submission-form]").forEach((form) => {
        form.onsubmit = async (e) => {
          e.preventDefault();
          const submissionId = form.getAttribute("data-review-submission-form") || "";
          const formData = new FormData(form);
          const rawPoints = String(formData.get("points") || "").trim();
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) submitBtn.disabled = true;
          try {
            const updatedSubmission = await store.reviewSubmission(submissionId, {
              points: rawPoints === "" ? null : Number(rawPoints),
              teacher_comment: String(formData.get("teacherComment") || "").trim(),
              status: String(formData.get("status") || "reviewed")
            });
            submissions = submissions.map((item) => item.id === updatedSubmission.id ? updatedSubmission : item);
            toast("✅ Оцінку збережено");
            renderView(); bindEvents();
          } catch (err) { toast(`❌ ${err.message}`); } 
          finally { if (submitBtn) submitBtn.disabled = false; }
        };
      });

      const targetTypeSelect = $("assignmentTargetType");
      if (targetTypeSelect) {
        targetTypeSelect.addEventListener("change", () => { ensureUiState().issueTargetType = targetTypeSelect.value; save?.(); renderView(); bindEvents(); });
      }

      const classSelect = $("assignmentClassCode");
      if (classSelect) {
        classSelect.addEventListener("change", async () => {
          ensureUiState().issueClassCode = classSelect.value;
          await reloadStudents(); renderView(); bindEvents();
        });
      }

      const studentSelect = $("assignmentStudentId");
      if (studentSelect) {
        studentSelect.addEventListener("change", () => { ensureUiState().issueStudentId = studentSelect.value; save?.(); });
      }

      syncIssueSelectionVisuals();

      const issuedSearchInput = $("teacherIssuedSearch");
      if (issuedSearchInput) {
        issuedSearchInput.oninput = () => { ensureUiState().issuedSearch = issuedSearchInput.value; save?.(); renderView(); bindEvents(); };
      }

const issuedClassFilter = $("teacherIssuedClassFilter");
if (issuedClassFilter) {
  issuedClassFilter.onchange = async () => {
    const ui = ensureUiState();
    ui.issuedClassFilter = issuedClassFilter.value || "all";
    ui.issuedStudentFilter = "all";

    if (ui.issuedClassFilter && ui.issuedClassFilter !== "all") {
      classStudents = await store.fetchStudentsByClass(ui.issuedClassFilter);
    } else {
      classStudents = [];
    }

    save?.();
    renderView();
    bindEvents();
  };
}

    // --- ОБРОБНИКИ ДЛЯ АВТО-ПРАКТИКУМІВ (РІВНІ ТА СЕЛЕКТ) ---

    // 1. Кліки по рівнях (Усі / Junior / Middle / Senior)
    root.querySelectorAll('.auto-level-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const ui = ensureUiState();
        ui.issueAutoLevelFilter = btn.getAttribute('data-level'); // зберігаємо рівень
        ui.issueAutoModuleFilter = 'all'; // скидаємо модуль, бо рівень змінився
        save?.();
        renderView();
        bindEvents();
      };
    });

    // 2. Вибір теми з випадаючого списку
    const issueAutoFilter = $("teacherIssueAutoFilter");
    if (issueAutoFilter) {
      issueAutoFilter.onchange = () => {
        ensureUiState().issueAutoModuleFilter = issueAutoFilter.value || "all";
        save?.();
        renderView();
        bindEvents();
      };
    }



    
    // 3. Миттєве оновлення правої панелі при виборі завдання зі списку
root.querySelectorAll('.auto-task-radio-input').forEach(input => {
  input.onchange = () => {
    const ui = ensureUiState();
    const val = String(input.value || "");

    const leftScrollTop =
      document.getElementById("teacherAutoTasksScroll")?.scrollTop || 0;

    const rightScrollTop =
      document.getElementById("teacherSelectedAutoList")?.scrollTop || 0;

    ui.selectedAutoTaskIds = Array.isArray(ui.selectedAutoTaskIds)
      ? ui.selectedAutoTaskIds
      : [];

    if (input.checked) {
      if (!ui.selectedAutoTaskIds.includes(val)) {
        ui.selectedAutoTaskIds.push(val);
      }

      ui.previewTaskId = val;

      const parts = val.split("|");
      if (parts.length >= 4) {
        ui.selectedAutoModuleId = parts[2] || ui.selectedAutoModuleId || "";
      }
    } else {
      ui.selectedAutoTaskIds = ui.selectedAutoTaskIds.filter(id => id !== val);

      if (String(ui.previewTaskId || "") === val) {
        ui.previewTaskId = ui.selectedAutoTaskIds.length
          ? ui.selectedAutoTaskIds[ui.selectedAutoTaskIds.length - 1]
          : "";
      }
    }

    save?.();
    renderView();
    bindEvents();

    requestAnimationFrame(() => {
      const left = document.getElementById("teacherAutoTasksScroll");
      if (left) left.scrollTop = leftScrollTop;

      const right = document.getElementById("teacherSelectedAutoList");
      if (right) right.scrollTop = rightScrollTop;
    });
  };
});


const issuedStudentFilter = $("teacherIssuedStudentFilter");
if (issuedStudentFilter) {
  issuedStudentFilter.onchange = () => {
    ensureUiState().issuedStudentFilter = issuedStudentFilter.value || "all";
    save?.();
    renderView();
    bindEvents();
  };
}
    // --- Оновлення для вкладки Авто-практикумів ---
    

      const issuedStatusFilter = $("teacherIssuedStatusFilter");
      if (issuedStatusFilter) {
        issuedStatusFilter.onchange = () => { ensureUiState().issuedStatusFilter = issuedStatusFilter.value || "all"; save?.(); renderView(); bindEvents(); };
      }
      

      document.querySelectorAll('.btn-toggle-desc').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation(); // щоб не спрацьовував клік по всій картці
      const card = btn.closest('.bank-card');
      const details = card.querySelector('.bank-card-details');
      const icon = btn.querySelector('i');
      
      const isVisible = details.style.display === 'block';
      details.style.display = isVisible ? 'none' : 'block';
      icon.className = isVisible ? 'ri-information-line' : 'ri-arrow-up-s-line';
    };
  });


root.querySelectorAll("[data-preview-auto-task]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const raw = btn.getAttribute("data-preview-auto-task") || "";
    const [courseId, moduleId, taskIndex] = raw.split("|");

    openTeacherAutoLesson(courseId, moduleId, Number(taskIndex || 0));
  });
});


    }



    function renderLoading() {
      return `<section class="teacher-panel"><section class="teacher-card"><div class="teacher-empty">Завантаження вкладки завдань...</div></section></section>`;
    }

    async function mount() {
      const root = $("teacherInnerView");
      if (!root) return;
      root.innerHTML = renderLoading();
      try {
        await loadData();
        renderView();
        bindEvents();
      } catch (err) {
        console.error(err);
        root.innerHTML = `<section class="teacher-panel"><section class="teacher-card"><div class="teacher-empty">❌ Не вдалося завантажити завдання</div></section></section>`;
      }
    }

    return { renderLoading, mount };
  }

  return { create };
})();
