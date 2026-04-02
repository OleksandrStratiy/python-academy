window.App = window.App || {};

window.App.teacherAssignments = (function () {
  "use strict";

function create(deps) {
  const { $, state, save, toast, supa, onBackToClasses } = deps;

    const store = window.App.teacherAssignmentStore.create({
      state,
      save,
      toast,
      supa
    });

let teacherClasses = [];
let classStudents = [];
let taskBank = [];
let assignments = [];
let submissions = [];

function ensureUiState() {
  state.teacherAssignmentsUI = state.teacherAssignmentsUI || {
    selectedTaskId: "",
    issueClassCode: "",
    issueTargetType: "class",
    issueStudentId: "",
    bankFilter: "mine",
    issuedSearch: "",
    issuedClassFilter: "all",
    issuedStatusFilter: "all"
  };

  if (!("issuedSearch" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.issuedSearch = "";
  }

  if (!("issuedClassFilter" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.issuedClassFilter = "all";
  }

  if (!("issuedStatusFilter" in state.teacherAssignmentsUI)) {
    state.teacherAssignmentsUI.issuedStatusFilter = "all";
  }

  return state.teacherAssignmentsUI;
}
    function escapeHtml(str) {
      return String(str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function formatDate(value) {
      if (!value) return "Без дедлайну";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "Без дедлайну";

      return (
        d.toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }) +
        " " +
        d.toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    }

    function shorten(text, limit = 140) {
      const value = String(text || "").trim();
      if (!value) return "";
      return value.length > limit ? value.slice(0, limit).trim() + "…" : value;
    }

function getSelectedTask() {
  const ui = ensureUiState();

  return (
    taskBank.find((task) => task.id === ui.selectedTaskId) ||
    getFilteredTaskBank().find((task) => task.id === ui.selectedTaskId) ||
    null
  );
}
function getFilteredTaskBank() {
  const ui = ensureUiState();

  if (ui.bankFilter === "mine") {
    return taskBank.filter((task) => task.source !== "library");
  }

  if (ui.bankFilter === "library") {
    return taskBank.filter((task) => task.source === "library");
  }

  return taskBank;
}
function getFilteredAssignments() {
  const ui = ensureUiState();
  const q = String(ui.issuedSearch || "").trim().toLowerCase();
  const classFilter = ui.issuedClassFilter || "all";
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

    const matchesStatus =
      statusFilter === "all" ||
      String(item.status || "active") === String(statusFilter);

    return matchesSearch && matchesClass && matchesStatus;
  });
}
function getSubmissionsForAssignment(assignmentId) {
  return submissions.filter((item) => item.assignment_id === assignmentId);
}

function getSubmissionStatusLabel(status) {
  if (status === "submitted") return "Здано";
  if (status === "review") return "На перевірці";
  if (status === "reviewed") return "Перевірено";
  if (status === "returned") return "На доопрацюванні";
  return "Здано";
}

function renderSubmissionStatusBadge(status) {
  const safeStatus = String(status || "submitted");

  let extraClass = "";
  if (safeStatus === "submitted") extraClass = " teacher-pill--warn";
  if (safeStatus === "review") extraClass = " teacher-pill--accent";
  if (safeStatus === "reviewed") extraClass = " teacher-pill--success";
  if (safeStatus === "returned") extraClass = " teacher-pill--danger";

  return `<span class="teacher-pill${extraClass}">${escapeHtml(getSubmissionStatusLabel(safeStatus))}</span>`;
}

function renderAssignmentSubmissions(assignmentId) {
  const rows = getSubmissionsForAssignment(assignmentId);

  if (!rows.length) {
    return `
      <div class="teacher-empty" style="margin-top:10px;">
        Ще ніхто не здав це завдання.
      </div>
    `;
  }

  return `
    <div style="display:grid; gap:12px; margin-top:12px;">
      ${rows.map((submission) => `
        <article class="teacher-card" style="padding:14px;">
          <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap;">
            <div>
              <div style="font-weight:800;">
                ${escapeHtml(submission.student_name || "Учень")}
              </div>
              <div class="mutedish tiny">
  Здано: ${escapeHtml(formatDate(submission.submitted_at))}
</div>
            </div>

            <div>
              ${renderSubmissionStatusBadge(submission.status)}
            </div>
          </div>

          <div style="margin-bottom:10px;">
            <div class="mutedish tiny" style="margin-bottom:4px;">Відповідь учня</div>
            <div style="padding:10px; border:1px solid var(--border); border-radius:12px; background:rgba(255,255,255,0.03); white-space:pre-wrap;">
              ${escapeHtml(submission.submission_text || "Учень нічого не надіслав")}
            </div>
          </div>

          <form data-review-submission-form="${escapeHtml(submission.id)}" style="display:grid; gap:10px;">
            <div style="display:grid; gap:10px; grid-template-columns: minmax(120px, 160px) minmax(160px, 220px);">
              <input
                type="number"
                name="points"
                min="0"
                max="12"
                step="1"
                class="teacher-input"
                placeholder="Бал"
                value="${submission.points ?? ""}"
              />

              <select name="status" class="teacher-select">
                <option value="reviewed" ${submission.status === "reviewed" ? "selected" : ""}>Перевірено</option>
                <option value="returned" ${submission.status === "returned" ? "selected" : ""}>На доопрацюванні</option>
                <option value="review" ${submission.status === "review" ? "selected" : ""}>На перевірці</option>
                <option value="submitted" ${submission.status === "submitted" ? "selected" : ""}>Здано</option>
              </select>
            </div>

            <textarea
              name="teacherComment"
              rows="4"
              class="teacher-input"
              placeholder="Коментар учителя..."
            >${escapeHtml(submission.teacher_comment || "")}</textarea>

            <div>
              <button type="submit" class="teacher-btn teacher-btn--primary teacher-btn--small">
                Зберегти перевірку
              </button>
            </div>
          </form>
        </article>
      `).join("")}
    </div>
  `;
}

    async function reloadStudents() {
      const ui = ensureUiState();

      if (!ui.issueClassCode) {
        classStudents = [];
        ui.issueStudentId = "";
        save?.();
        return;
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

teacherClasses = classes;
taskBank = tasks;
assignments = issued;

submissions = await store.fetchSubmissionsByAssignmentIds(
  assignments.map((item) => item.id)
);
    

    if (!teacherClasses.some((cls) => cls.code === ui.issueClassCode)) {
      ui.issueClassCode = teacherClasses[0]?.code || "";
    }

    const filteredTaskBank = getFilteredTaskBank();

    if (!taskBank.some((task) => task.id === ui.selectedTaskId)) {
      ui.selectedTaskId = filteredTaskBank[0]?.id || taskBank[0]?.id || "";
    }

    if (
      ui.selectedTaskId &&
      !filteredTaskBank.some((task) => task.id === ui.selectedTaskId) &&
      filteredTaskBank.length
    ) {
      ui.selectedTaskId = filteredTaskBank[0].id;
    }

    await reloadStudents();
    if (ui.issueTargetType === "student") {
  const hasStudent = classStudents.some((student) => student.id === ui.issueStudentId);
  if (!hasStudent) {
    ui.issueStudentId = classStudents[0]?.id || "";
  }
}
    save?.();
  } finally {
    loadData._busy = false;
  }
}

function getAssignmentStatusLabel(status) {
  if (status === "active") return "Активне";
  if (status === "submitted") return "Здано";
  if (status === "review") return "На перевірці";
  if (status === "reviewed") return "Перевірено";
  if (status === "returned") return "На доопрацюванні";
  if (status === "closed") return "Закрито";
  return "Активне";
}

function renderAssignmentStatusBadge(status) {
  const safeStatus = String(status || "assigned");

  let extraClass = "";
  if (safeStatus === "submitted") extraClass = " teacher-pill--warn";
  if (safeStatus === "review") extraClass = " teacher-pill--accent";
  if (safeStatus === "reviewed") extraClass = " teacher-pill--success";
  if (safeStatus === "returned") extraClass = " teacher-pill--danger";
  if (safeStatus === "closed") extraClass = " teacher-pill--ghost";

  return `<span class="teacher-pill${extraClass}">${escapeHtml(getAssignmentStatusLabel(safeStatus))}</span>`;
}

function renderBadges(task) {
  return `
    <div class="teacher-pills">
      <span class="teacher-pill">${
        task.solution_format === "code"
          ? "Код"
          : task.solution_format === "text"
          ? "Текст"
          : task.solution_format === "file"
          ? "Файл"
          : "Змішано"
      }</span>

      <span class="teacher-pill">${task.max_score} б.</span>

      <span class="teacher-pill">${
        task.source === "library" ? "Бібліотека" : "Моє"
      }</span>

      ${
        task.is_public
          ? `<span class="teacher-pill">Публічне</span>`
          : ``
      }
    </div>
  `;
}

function getAssignmentStatusLabel(status) {
  if (status === "assigned") return "Видано";
  if (status === "submitted") return "Здано";
  if (status === "review") return "На перевірці";
  if (status === "reviewed") return "Перевірено";
  if (status === "returned") return "На доопрацюванні";
  if (status === "closed") return "Закрито";
  return "Видано";
}

function renderTaskBankList() {
  const ui = ensureUiState();
  const filteredTaskBank = getFilteredTaskBank();

  return `
    <div class="teacher-bank-filter">
      <button
        type="button"
        class="teacher-filter-btn ${ui.bankFilter === "mine" ? "active" : ""}"
        data-bank-filter="mine"
      >
        Мої
      </button>

      <button
        type="button"
        class="teacher-filter-btn ${ui.bankFilter === "library" ? "active" : ""}"
        data-bank-filter="library"
      >
        Бібліотека
      </button>

      <button
        type="button"
        class="teacher-filter-btn ${ui.bankFilter === "all" ? "active" : ""}"
        data-bank-filter="all"
      >
        Усі
      </button>
    </div>

    ${
      !filteredTaskBank.length
        ? `<div class="teacher-empty">У цьому розділі поки немає завдань.</div>`
        : `
          <div class="teacher-class-list">
            ${filteredTaskBank
              .map(
                (task) => `
              <article class="teacher-class-item ${ui.selectedTaskId === task.id ? "active" : ""}">
                <div class="teacher-class-item__main">
                  <div class="teacher-class-item__title">${escapeHtml(task.title)}</div>
                  <div class="teacher-class-item__meta">${escapeHtml(shorten(task.description, 120))}</div>
                  ${renderBadges(task)}
                </div>
<div class="teacher-class-item__actions">
  <button
    class="teacher-btn teacher-btn--ghost teacher-btn--small"
    type="button"
    data-select-task="${task.id}"
  >
    Вибрати
  </button>

  ${
    task.source !== "library"
      ? `
        <button
          class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger"
          type="button"
          data-delete-task="${task.id}"
        >
          Видалити
        </button>
      `
      : ``
  }
</div>
              </article>
            `
              )
              .join("")}
          </div>
        `
    }
  `;
}

    function renderSelectedTaskPreview() {
      const ui = ensureUiState();
const currentTaskId = ui.selectedTaskId || $("assignmentTaskId")?.value || "";

const task =
  taskBank.find((item) => item.id === currentTaskId) ||
  getFilteredTaskBank().find((item) => item.id === currentTaskId) ||
  null;

      if (!task) {
        return `<div class="teacher-empty">Спочатку вибери завдання з бази.</div>`;
      }

      return `
        <div class="teacher-task-preview">
          <div class="teacher-task-preview__title">${escapeHtml(task.title)}</div>
          <div class="teacher-task-preview__desc">${escapeHtml(task.description)}</div>
          ${renderBadges(task)}
          ${
            task.starter_code
              ? `
            <div class="teacher-task-preview__label">Стартовий код</div>
            <pre class="teacher-pre">${escapeHtml(task.starter_code)}</pre>
          `
              : ``
          }
        </div>
      `;
    }
function toDatetimeLocalValue(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
function renderAssignmentsList() {
  const filteredAssignments = getFilteredAssignments();

  return `
    <div class="teacher-assignment-filters" style="display:grid; gap:12px; margin-bottom:14px;">
      <div style="display:grid; gap:10px; grid-template-columns: minmax(180px, 1fr) minmax(160px, 220px) minmax(160px, 220px);">
        <input
          id="teacherIssuedSearch"
          class="teacher-input"
          type="search"
          placeholder="Пошук за назвою, класом або приміткою"
          value="${escapeHtml(ensureUiState().issuedSearch || "")}"
        >

        <select id="teacherIssuedClassFilter" class="teacher-input">
          <option value="all">Усі класи</option>
          ${teacherClasses.map((cls) => `
            <option
              value="${escapeHtml(cls.code)}"
              ${String(ensureUiState().issuedClassFilter || "all") === String(cls.code) ? "selected" : ""}
            >
              ${escapeHtml(cls.name || cls.code)}
            </option>
          `).join("")}
        </select>

        <select id="teacherIssuedStatusFilter" class="teacher-input">
          <option value="all" ${String(ensureUiState().issuedStatusFilter || "all") === "all" ? "selected" : ""}>Усі статуси</option>
          <option value="active" ${String(ensureUiState().issuedStatusFilter || "all") === "active" ? "selected" : ""}>Активне</option>
          <option value="submitted" ${String(ensureUiState().issuedStatusFilter || "all") === "submitted" ? "selected" : ""}>Здано</option>
          <option value="review" ${String(ensureUiState().issuedStatusFilter || "all") === "review" ? "selected" : ""}>На перевірці</option>
          <option value="reviewed" ${String(ensureUiState().issuedStatusFilter || "all") === "reviewed" ? "selected" : ""}>Перевірено</option>
          <option value="returned" ${String(ensureUiState().issuedStatusFilter || "all") === "returned" ? "selected" : ""}>На доопрацюванні</option>
          <option value="closed" ${String(ensureUiState().issuedStatusFilter || "all") === "closed" ? "selected" : ""}>Закрито</option>
        </select>
      </div>
    </div>

    ${
      !filteredAssignments.length
        ? `<div class="teacher-empty">Поки немає призначених завдань.</div>`
        : `
          <div class="teacher-class-list">
            ${filteredAssignments.map((item) => `
              <article class="teacher-class-item">
                <div class="teacher-class-item__head">
                  <div>
                    <div class="teacher-class-item__title">
                      ${escapeHtml(item.title_snapshot || "Без назви")}
                    </div>

                    <div class="teacher-class-item__meta">
                      Клас: <b>${escapeHtml(item.class_code || "—")}</b>
                      ${item.target_type === "student" ? ` · Формат: <b>Окремому учню</b>` : ` · Формат: <b>Усьому класу</b>`}
                    </div>

                    <div class="teacher-class-item__meta">
                      Дедлайн: <b>${escapeHtml(formatDate(item.due_at))}</b>
                      · Статус: ${renderAssignmentStatusBadge(item.status)}
                    </div>

                    ${
                      item.description_snapshot
                        ? `<div class="teacher-class-item__meta">Опис: ${escapeHtml(shorten(item.description_snapshot, 160))}</div>`
                        : ``
                    }

                    ${
                      item.note_for_student
                        ? `<div class="teacher-class-item__meta">Примітка: ${escapeHtml(shorten(item.note_for_student, 110))}</div>`
                        : ``
                    }
                  </div>

                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button
                      type="button"
                      class="teacher-btn teacher-btn--ghost teacher-btn--small"
                      data-delete-assignment="${escapeHtml(item.id)}"
                    >
                      Видалити
                    </button>
                  </div>
                </div>

                <div style="margin-top:12px;">
                  <div class="mutedish tiny" style="margin-bottom:6px;">Здачі учнів</div>
                  ${renderAssignmentSubmissions(item.id)}
                </div>

                <details class="teacher-assignment-edit" style="margin-top:12px;">
                  <summary class="teacher-assignment-edit__summary">Редагувати</summary>

                  <form data-edit-assignment-form="${escapeHtml(item.id)}" style="display:grid; gap:12px; margin-top:12px;">
                    <div style="display:grid; gap:12px; grid-template-columns: minmax(180px, 220px) minmax(180px, 1fr);">
                      <label class="teacher-label">
                        <span>Дедлайн</span>
                        <input
                          type="datetime-local"
                          name="dueAt"
                          class="teacher-input"
                          value="${item.due_at ? escapeHtml(String(item.due_at).slice(0, 16)) : ""}"
                        >
                      </label>

                      <label class="teacher-label">
                        <span>Статус завдання</span>
                        <select name="status" class="teacher-input">
                          <option value="active" ${item.status === "active" ? "selected" : ""}>Активне</option>
                          <option value="review" ${item.status === "review" ? "selected" : ""}>На перевірці</option>
                          <option value="reviewed" ${item.status === "reviewed" ? "selected" : ""}>Перевірено</option>
                          <option value="returned" ${item.status === "returned" ? "selected" : ""}>На доопрацюванні</option>
                          <option value="closed" ${item.status === "closed" ? "selected" : ""}>Закрито</option>
                        </select>
                      </label>
                    </div>

                    <label class="teacher-label">
                      <span>Примітка для учня</span>
                      <textarea
                        name="noteForStudent"
                        class="teacher-input"
                        rows="3"
                        placeholder="Коментар або уточнення до завдання"
                      >${escapeHtml(item.note_for_student || "")}</textarea>
                    </label>

                    <div>
                      <button type="submit" class="teacher-btn teacher-btn--primary teacher-btn--small">
                        Зберегти зміни
                      </button>
                    </div>
                  </form>
                </details>
              </article>
            `).join("")}
          </div>
        `
    }
  `;
}

    function renderClassesOptions() {
      return teacherClasses
        .map(
          (cls) => `
        <option value="${escapeHtml(cls.code)}">${escapeHtml(cls.name || cls.code)} (${escapeHtml(cls.code)})</option>
      `
        )
        .join("");
    }

    function renderStudentsOptions() {
      if (!classStudents.length) {
        return `<option value="">У цьому класі поки немає учнів</option>`;
      }

      return classStudents
        .map(
          (student) => `
        <option value="${escapeHtml(student.id)}">${escapeHtml(student.full_name || "Без імені")}</option>
      `
        )
        .join("");
    }

function renderTaskSelectOptions() {
  const ui = ensureUiState();

  let filteredTaskBank = getFilteredTaskBank();

  if (!filteredTaskBank.length && taskBank.length) {
    ui.bankFilter = "mine";
    filteredTaskBank = getFilteredTaskBank();

    if (!filteredTaskBank.length) {
      ui.bankFilter = "all";
      filteredTaskBank = getFilteredTaskBank();
    }

    save?.();
  }

  if (!filteredTaskBank.length) {
    return `<option value="">У цьому розділі поки немає завдань</option>`;
  }

  if (!filteredTaskBank.some((task) => task.id === ui.selectedTaskId)) {
    ui.selectedTaskId = filteredTaskBank[0]?.id || "";
    save?.();
  }

  return filteredTaskBank
    .map(
      (task) => `
    <option value="${escapeHtml(task.id)}" ${ui.selectedTaskId === task.id ? "selected" : ""}>
      ${escapeHtml(task.title)}
    </option>
  `
    )
    .join("");
}
function renderIssueContextNotice() {
  const ui = ensureUiState();

  if (!ui.issueClassCode) return "";

  const classRow = teacherClasses.find((cls) => cls.code === ui.issueClassCode);
  const studentRow = classStudents.find((student) => student.id === ui.issueStudentId);

  if (ui.issueTargetType === "student" && studentRow) {
    return `
      <div class="teacher-context-banner">
        Зараз ти видаєш завдання <b>учню</b>:
        <b>${escapeHtml(studentRow.full_name || "Без імені")}</b>
        · клас <b>${escapeHtml(ui.issueClassCode)}</b>
      </div>
    `;
  }

  return `
    <div class="teacher-context-banner">
      Зараз ти видаєш завдання для <b>класу ${escapeHtml(classRow?.name || ui.issueClassCode)}</b>
    </div>
  `;
}
    function renderView() {
      const root = $("teacherInnerView");
      if (!root) return;

      const ui = ensureUiState();

      root.innerHTML = `
        <section class="teacher-panel">
          <div class="teacher-grid teacher-grid--2">
            <section class="teacher-card">
              <div class="teacher-card__head">
                <h4>Нове завдання в базу</h4>
              </div>

              <form id="teacherTaskBankForm" class="teacher-form-grid teacher-form-grid--stack">
                <input class="teacher-input" name="title" placeholder="Назва завдання" required>

                <textarea class="teacher-input" name="description" rows="6" placeholder="Умова завдання" required></textarea>

                <div class="teacher-form-grid">
  <select class="teacher-input" name="solutionFormat">
    <option value="code">Код</option>
    <option value="text">Текст</option>
    <option value="file">Файл</option>
    <option value="mixed">Змішано</option>
  </select>

  <input class="teacher-input" name="maxScore" type="number" min="1" max="100" value="12" placeholder="Бали">
</div>

                <textarea class="teacher-input" name="starterCode" rows="6" placeholder="Стартовий код (необов'язково)"></textarea>



                <label class="teacher-check">
                  <input type="checkbox" name="isPublic">
                  <span>Зробити публічним для інших учителів</span>
                </label>

                <button class="teacher-btn teacher-btn--primary" type="submit">
                  Зберегти в базу
                </button>
              </form>
            </section>

            <section class="teacher-card">
              <div class="teacher-card__head">
                <h4>База завдань</h4>
              </div>
              ${renderTaskBankList()}
            </section>

            <section class="teacher-card">
              <div class="teacher-card__head">
  <h4>Видати завдання</h4>

  <button
    type="button"
    id="teacherAssignmentsBackToClasses"
    class="teacher-btn teacher-btn--ghost teacher-btn--small"
  >
    <i class="ri-arrow-left-line"></i>
    До класів
  </button>
</div>

              ${renderIssueContextNotice()}
  ${renderSelectedTaskPreview()}

              <form id="teacherIssueForm" class="teacher-form-grid teacher-form-grid--stack">
                <select id="assignmentTaskId" class="teacher-input" name="taskId">
                  ${renderTaskSelectOptions()}
                </select>

                <div class="teacher-form-grid">
                  <select id="assignmentTargetType" class="teacher-input" name="targetType">
                    <option value="class">Усьому класу</option>
                    <option value="student">Окремому учню</option>
                  </select>

                  <select id="assignmentClassCode" class="teacher-input" name="classCode">
                    ${renderClassesOptions()}
                  </select>
                </div>

                <select
                  id="assignmentStudentId"
                  class="teacher-input"
                  name="studentId"
                  ${ui.issueTargetType === "student" ? "" : "disabled"}
                >
                  ${renderStudentsOptions()}
                </select>

                <input class="teacher-input" name="dueAt" type="datetime-local">

                <textarea class="teacher-input" name="noteForStudent" rows="4" placeholder="Примітка для учня (необов'язково)"></textarea>

                <label class="teacher-check">
                  <input type="checkbox" name="allowLateSubmission" checked>
                  <span>Дозволити пізню здачу</span>
                </label>

                <button class="teacher-btn teacher-btn--primary" type="submit">
                  Видати завдання
                </button>
              </form>
            </section>

            <section class="teacher-card">
              <div class="teacher-card__head">
                <h4>Призначені завдання</h4>
              </div>
              ${renderAssignmentsList()}
            </section>
          </div>
        </section>
      `;

      const taskSelect = $("assignmentTaskId");
      if (taskSelect) taskSelect.value = ui.selectedTaskId || "";

      const classSelect = $("assignmentClassCode");
      if (classSelect) classSelect.value = ui.issueClassCode || "";

      const targetTypeSelect = $("assignmentTargetType");
      if (targetTypeSelect) targetTypeSelect.value = ui.issueTargetType || "class";

      const studentSelect = $("assignmentStudentId");
      if (studentSelect) studentSelect.value = ui.issueStudentId || "";
    }



const issuedClassFilter = $("teacherIssuedClassFilter");
if (issuedClassFilter) {
  issuedClassFilter.onchange = () => {
    const ui = ensureUiState();
    ui.issuedClassFilter = issuedClassFilter.value;
    save?.();
    renderView();
    bindEvents();
  };
}

const issuedStatusFilter = $("teacherIssuedStatusFilter");
if (issuedStatusFilter) {
  issuedStatusFilter.onchange = () => {
    const ui = ensureUiState();
    ui.issuedStatusFilter = issuedStatusFilter.value;
    save?.();
    renderView();
    bindEvents();
  };
}

    function renderLoading() {
      return `
        <section class="teacher-panel">
          <section class="teacher-card">
            <div class="teacher-empty">Завантаження вкладки завдань...</div>
          </section>
        </section>
      `;
    }

async function handleTaskBankSubmit(form) {
  const formData = new FormData(form);

  await store.createTaskBankItem({
    title: formData.get("title"),
    description: formData.get("description"),
    source: "teacher",
    solutionFormat: formData.get("solutionFormat"),
    starterCode: formData.get("starterCode"),
    maxScore: formData.get("maxScore"),
    isPublic: formData.get("isPublic") === "on"
  });

  toast("✅ Завдання збережено в базу");
  form.reset();

  await loadData();
  renderView();
  bindEvents();
}

    async function handleIssueSubmit(form) {
      const ui = ensureUiState();
      const formData = new FormData(form);

      ui.selectedTaskId = String(formData.get("taskId") || "");
      ui.issueTargetType = String(formData.get("targetType") || "class");
      ui.issueClassCode = String(formData.get("classCode") || "");
      ui.issueStudentId = String(formData.get("studentId") || "");
      save?.();

const selectedTaskIdFromForm = String(formData.get("taskId") || "").trim();

ui.selectedTaskId = selectedTaskIdFromForm;
save?.();

const task =
  taskBank.find((item) => item.id === selectedTaskIdFromForm) ||
  getFilteredTaskBank().find((item) => item.id === selectedTaskIdFromForm) ||
  null;

if (!task) {
  throw new Error("Спочатку вибери завдання з бази");
}

const createdAssignment = await store.createAssignment({
  task,
  targetType: ui.issueTargetType,
  classCode: ui.issueClassCode,
  studentId: ui.issueStudentId,
  noteForStudent: formData.get("noteForStudent"),
  dueAt: formData.get("dueAt") || null,
  allowLateSubmission: formData.get("allowLateSubmission") === "on"
});

toast("✅ Завдання видано");

assignments = [
  createdAssignment,
  ...assignments.filter((item) => item.id !== createdAssignment.id)
];

// пробуємо підтягнути повний список із бази, але якщо не вийде — UI все одно вже оновлений
try {
  const freshAssignments = await store.fetchAssignments();
  if (Array.isArray(freshAssignments) && freshAssignments.length) {
    assignments = freshAssignments;
  }
} catch (err) {
  console.warn("Не вдалося оновити список призначених завдань із бази:", err);
}

form.reset();

ui.selectedTaskId = "";
ui.issueTargetType = "class";
ui.issueStudentId = "";

await reloadStudents();
save?.();

renderView();
bindEvents();
    }

    function bindEvents() {
      const root = $("teacherInnerView");
      if (!root) return;

      const backToClassesBtn = $("teacherAssignmentsBackToClasses");
if (backToClassesBtn) {
  backToClassesBtn.onclick = async () => {
    await onBackToClasses?.();
  };
}

const bankForm = $("teacherTaskBankForm");
if (bankForm) {
  bankForm.onsubmit = async (e) => {
    e.preventDefault();

    if (bankForm.dataset.busy === "1") return;
    bankForm.dataset.busy = "1";

    try {
      await handleTaskBankSubmit(bankForm);
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося зберегти завдання"}`);
    } finally {
      bankForm.dataset.busy = "0";
    }
  };
}

      root.querySelectorAll("[data-select-task]").forEach((btn) => {
root.querySelectorAll("[data-delete-task]").forEach((btn) => {
  btn.onclick = async () => {
    const taskId = btn.getAttribute("data-delete-task") || "";
    if (!taskId) return;

    btn.disabled = true;

    try {
      const task = taskBank.find((item) => item.id === taskId);
      if (!task) {
        toast("❌ Завдання не знайдено");
        return;
      }

      const ok = confirm(`Видалити завдання "${task.title}"?`);
      if (!ok) return;

      await store.archiveTaskBankItem(taskId);

      const ui = ensureUiState();
      if (ui.selectedTaskId === taskId) {
        ui.selectedTaskId = "";
      }

      toast("🗑️ Завдання видалено");
      await loadData();
      renderView();
      bindEvents();
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося видалити завдання"}`);
    } finally {
      btn.disabled = false;
    }
  };
});
root.querySelectorAll("[data-delete-assignment]").forEach((btn) => {
  btn.onclick = async () => {
    const assignmentId = btn.getAttribute("data-delete-assignment") || "";
    if (!assignmentId) return;

    const ok = confirm("Видалити це призначене завдання?");
    if (!ok) return;

    btn.disabled = true;

    try {
      await store.deleteAssignment(assignmentId);

      assignments = assignments.filter((item) => item.id !== assignmentId);

      toast("🗑️ Призначене завдання видалено");
      renderView();
      bindEvents();
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося видалити призначене завдання"}`);
    } finally {
      btn.disabled = false;
    }
  };
});


        btn.addEventListener("click", () => {
          const ui = ensureUiState();
          ui.selectedTaskId = btn.getAttribute("data-select-task") || "";
          save?.();
          renderView();
          bindEvents();
        });
      });
      root.querySelectorAll("[data-bank-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const ui = ensureUiState();
    ui.bankFilter = btn.getAttribute("data-bank-filter") || "mine";

    const filteredTaskBank = getFilteredTaskBank();
    if (!filteredTaskBank.some((task) => task.id === ui.selectedTaskId)) {
      ui.selectedTaskId = filteredTaskBank[0]?.id || "";
    }

    save?.();
    renderView();
    bindEvents();
  });
});
root.querySelectorAll("[data-edit-assignment-form]").forEach((form) => {
  
  root.querySelectorAll("[data-set-assignment-status]").forEach((btn) => {
  btn.onclick = async () => {
    const assignmentId = btn.getAttribute("data-set-assignment-status") || "";
    const nextStatus = btn.getAttribute("data-next-status") || "";

    if (!assignmentId || !nextStatus) return;

    btn.disabled = true;

    try {
      const updatedAssignment = await store.updateAssignment(assignmentId, {
        status: nextStatus
      });

      assignments = assignments.map((item) =>
        item.id === assignmentId ? updatedAssignment : item
      );

      toast(`✅ Статус змінено: ${getAssignmentStatusLabel(nextStatus)}`);
      renderView();
      bindEvents();
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося змінити статус"}`);
    } finally {
      btn.disabled = false;
    }
  };
});
  
  form.onsubmit = async (e) => {
    e.preventDefault();

    const assignmentId = form.getAttribute("data-edit-assignment-form") || "";
    if (!assignmentId) return;

    const formData = new FormData(form);

const rawTeacherScore = String(formData.get("teacherScore") || "").trim();
const teacherComment = String(formData.get("teacherComment") || "").trim();

if (rawTeacherScore !== "") {
  const numericScore = Number(rawTeacherScore);

  if (!Number.isFinite(numericScore) || numericScore < 0 || numericScore > 12) {
    toast("❌ Оцінка має бути від 0 до 12");
    return;
  }
}

const patch = {
  due_at: formData.get("dueAt") || null,
  note_for_student: formData.get("noteForStudent") || "",
  status: formData.get("status") || "active"
};
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const updatedAssignment = await store.updateAssignment(assignmentId, patch);

      assignments = assignments.map((item) =>
        item.id === assignmentId ? updatedAssignment : item
      );

      toast("✅ Призначене завдання оновлено");
      renderView();
      bindEvents();
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося оновити призначене завдання"}`);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  };
});
const taskSelect = $("assignmentTaskId");
if (taskSelect) {
  taskSelect.addEventListener("change", () => {
    const ui = ensureUiState();
    ui.selectedTaskId = String(taskSelect.value || "").trim();
    save?.();
    renderView();
    bindEvents();
  });
}

      const targetTypeSelect = $("assignmentTargetType");
      if (targetTypeSelect) {
        targetTypeSelect.addEventListener("change", () => {
          const ui = ensureUiState();
          ui.issueTargetType = targetTypeSelect.value;
          save?.();
          renderView();
          bindEvents();
        });
      }

      const classSelect = $("assignmentClassCode");
      if (classSelect) {
        classSelect.addEventListener("change", async () => {
          const ui = ensureUiState();
          ui.issueClassCode = classSelect.value;
          await reloadStudents();
          renderView();
          bindEvents();
        });
      }

      const studentSelect = $("assignmentStudentId");
      if (studentSelect) {
        studentSelect.addEventListener("change", () => {
          const ui = ensureUiState();
          ui.issueStudentId = studentSelect.value;
          save?.();
        });
      }




const issuedSearchInput = $("teacherIssuedSearchInput");
if (issuedSearchInput) {
  issuedSearchInput.oninput = () => {
    const ui = ensureUiState();
    ui.issuedSearch = issuedSearchInput.value;
    save?.();
    renderView();
    bindEvents();
  };
}

const issuedClassFilter = $("teacherIssuedClassFilter");
if (issuedClassFilter) {
  issuedClassFilter.onchange = () => {
    const ui = ensureUiState();
    ui.issuedClassFilter = issuedClassFilter.value || "all";
    save?.();
    renderView();
    bindEvents();
  };
}

const issuedStatusFilter = $("teacherIssuedStatusFilter");
if (issuedStatusFilter) {
  issuedStatusFilter.onchange = () => {
    const ui = ensureUiState();
    ui.issuedStatusFilter = issuedStatusFilter.value || "all";
    save?.();
    renderView();
    bindEvents();
  };
}
document.querySelectorAll("[data-review-submission-form]").forEach((form) => {
  form.onsubmit = async (e) => {
    e.preventDefault();

    const submissionId = form.getAttribute("data-review-submission-form") || "";
    const formData = new FormData(form);

    const rawPoints = String(formData.get("points") || "").trim();
    const teacherComment = String(formData.get("teacherComment") || "").trim();
    const status = String(formData.get("status") || "reviewed");

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const updatedSubmission = await store.reviewSubmission(submissionId, {
        points: rawPoints === "" ? null : Number(rawPoints),
        teacher_comment: teacherComment,
        status
      });

      submissions = submissions.map((item) =>
        item.id === updatedSubmission.id ? updatedSubmission : item
      );

      toast("✅ Перевірку збережено");
      renderView();
      bindEvents();
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося зберегти перевірку"}`);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  };
});
const issueForm = $("teacherIssueForm");
if (issueForm) {
  issueForm.onsubmit = async (e) => {
    e.preventDefault();

    if (issueForm.dataset.busy === "1") return;
    issueForm.dataset.busy = "1";

    try {
      await handleIssueSubmit(issueForm);
    } catch (err) {
      console.error(err);
      toast(`❌ ${err.message || "Не вдалося видати завдання"}`);
    } finally {
      issueForm.dataset.busy = "0";
    }
  };
}
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
        root.innerHTML = `
          <section class="teacher-panel">
            <section class="teacher-card">
              <div class="teacher-empty">❌ Не вдалося завантажити вкладку завдань</div>
            </section>
          </section>
        `;
      }
    }

    return {
      renderLoading,
      mount
    };
  }

  return { create };
})();