window.App = window.App || {};

window.App.teacherClassesRender = (function () {
  "use strict";

  function create(deps) {
const {
  state,
  modules = [],
  tasksByModule = {},
  getActiveClass = () => null,
  getActiveStudent = () => null,
  getStudentProgress = () => ({}),
  getStudentXP = () => 0,
  getStudentAttempts = () => 0,
  getStudentCompletedCount = () => 0,
  getStudentAssignmentsMarkup = () => "",
  getStudentAssignmentCount = () => 0,
  getActiveStudents = () => [],
  getActiveClassCode = () => "",
  getActiveStudentId = () => "",
  getCurrentView = () => "list",

  getCourseAccessTree = () => [],
  getModuleAccessState = () => "inherit",
  getTaskAccessState = () => "inherit",
  countStudentChangedTasks = () => 0,

  getClassModuleAccessState = () => "inherit",
  getClassTaskAccessState = () => "inherit",
  countClassChangedTasks = () => 0
} = deps;
    function escapeHtml(str) {
      return String(str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function formatDate(dateValue) {
      if (!dateValue) return "Немає даних";
      const d = new Date(dateValue);
      return d.toLocaleDateString("uk-UA") + " о " + d.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function renderAccessSelect(attrs, currentValue) {
      return `
        <select class="teacher-select" ${attrs}>
          <option value="inherit" ${currentValue === "inherit" ? "selected" : ""}>Успадкувати</option>
          <option value="open" ${currentValue === "open" ? "selected" : ""}>Відкрито</option>
          <option value="closed" ${currentValue === "closed" ? "selected" : ""}>Закрито</option>
        </select>
      `;
    }

    function getAccessStateLabel(value) {
      if (value === "open") return "Відкрито";
      if (value === "closed") return "Закрито";
      return "Успадкувати";
    }

    function calcClassStats(students) {
      const list = Array.isArray(students) ? students : [];
      const totalStudents = list.length;
      const totalXP = list.reduce((sum, student) => sum + getStudentXP(student), 0);
      const totalAttempts = list.reduce((sum, student) => sum + getStudentAttempts(student), 0);
      const totalCompleted = list.reduce((sum, student) => sum + getStudentCompletedCount(student), 0);

      return {
        totalStudents,
        totalXP,
        totalAttempts,
        totalCompleted
      };
    }
    function renderAccessSelect(attrs, currentValue) {
  const attrString = Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}="${escapeHtml(String(value))}"`)
    .join(" ");

  return `
    <select class="teacher-access-select" ${attrString}>
      <option value="auto" ${currentValue === "auto" ? "selected" : ""}>Авто</option>
      <option value="unlocked" ${currentValue === "unlocked" ? "selected" : ""}>Відкрито</option>
      <option value="locked" ${currentValue === "locked" ? "selected" : ""}>Закрито</option>
    </select>
  `;
}

function getAccessStateLabel(value) {
  if (value === "unlocked") return "Відкрито";
  if (value === "locked") return "Закрито";
  return "Авто";
}

    function calcClassStats(students) {
      const count = students.length;
      const totalXp = students.reduce((sum, s) => sum + getStudentXP(s), 0);
      const avgXp = count ? Math.round(totalXp / count) : 0;

      let topStudent = null;
      students.forEach(s => {
        if (!topStudent || getStudentXP(s) > getStudentXP(topStudent)) {
          topStudent = s;
        }
      });

      const needHelp = students.filter(s => getStudentAttempts(s) >= 5).length;

      return {
        count,
        avgXp,
        topName: topStudent?.full_name || "—",
        needHelp
      };
    }
    function renderStudentModuleAccessGroup(student, course, module, isOpen = false) {
  const moduleState = getModuleAccessState(student, module.courseId, module.moduleId);
  const changedTasks = countStudentChangedTasks(student, module);

  return `
    <details class="teacher-access-group" ${isOpen ? "open" : ""}>
      <summary class="teacher-access-group__summary">
        <div class="teacher-access-group__summary-main">
          <div class="teacher-access-group__title">${escapeHtml(module.moduleTitle)}</div>
          <div class="teacher-access-group__meta">
            ${module.tasks.length} завдань · Режим модуля: ${getAccessStateLabel(moduleState)}
          </div>
        </div>
        <span class="teacher-access-group__badge">
          ${changedTasks ? `${changedTasks} змінено` : "Без змін"}
        </span>
      </summary>

      <div class="teacher-access-group__body">
        <div class="teacher-access-item teacher-access-item--module">
          <div>
            <div class="teacher-access-item__title">Доступ до модуля</div>
            <div class="teacher-access-item__meta">
              Індивідуальне правило для учня в модулі «${escapeHtml(module.moduleTitle)}»
            </div>
          </div>
          ${renderAccessSelect(
            {
              "data-access-type": "module",
              "data-course-id": module.courseId,
              "data-module-id": module.moduleId
            },
            moduleState
          )}
        </div>

        <div class="teacher-access-sublist">
          ${(module.tasks || []).map(task => `
            <div class="teacher-access-item teacher-access-item--task">
              <div>
                <div class="teacher-access-item__title">${escapeHtml(task.taskTitle)}</div>
                <div class="teacher-access-item__meta">
                  ${escapeHtml(course.courseTitle)} · ${escapeHtml(module.moduleTitle)}
                </div>
              </div>
              ${renderAccessSelect(
                {
                  "data-access-type": "task",
                  "data-course-id": task.courseId,
                  "data-module-id": task.moduleId,
                  "data-task-index": task.taskIndex
                },
                getTaskAccessState(student, task.courseId, task.moduleId, task.taskIndex)
              )}
            </div>
          `).join("")}
        </div>
      </div>
    </details>
  `;
}

function renderClassModuleAccessGroup(classRow, course, module, isOpen = false) {
  const moduleState = getClassModuleAccessState(classRow, module.courseId, module.moduleId);
  const changedTasks = countClassChangedTasks(classRow, module);

  return `
    <details class="teacher-access-group" ${isOpen ? "open" : ""}>
      <summary class="teacher-access-group__summary">
        <div class="teacher-access-group__summary-main">
          <div class="teacher-access-group__title">${escapeHtml(module.moduleTitle)}</div>
          <div class="teacher-access-group__meta">
            ${module.tasks.length} завдань · Режим модуля: ${getAccessStateLabel(moduleState)}
          </div>
        </div>
        <span class="teacher-access-group__badge">
          ${changedTasks ? `${changedTasks} змінено` : "Без змін"}
        </span>
      </summary>

      <div class="teacher-access-group__body">
        <div class="teacher-access-item teacher-access-item--module">
          <div>
            <div class="teacher-access-item__title">Доступ до модуля</div>
            <div class="teacher-access-item__meta">
              Правило для всього класу в модулі «${escapeHtml(module.moduleTitle)}»
            </div>
          </div>
          ${renderAccessSelect(
            {
              "data-class-access-type": "module",
              "data-course-id": module.courseId,
              "data-module-id": module.moduleId
            },
            moduleState
          )}
        </div>

        <div class="teacher-access-sublist">
          ${(module.tasks || []).map(task => `
            <div class="teacher-access-item teacher-access-item--task">
              <div>
                <div class="teacher-access-item__title">${escapeHtml(task.taskTitle)}</div>
                <div class="teacher-access-item__meta">
                  ${escapeHtml(course.courseTitle)} · ${escapeHtml(module.moduleTitle)}
                </div>
              </div>
              ${renderAccessSelect(
                {
                  "data-class-access-type": "task",
                  "data-course-id": task.courseId,
                  "data-module-id": task.moduleId,
                  "data-task-index": task.taskIndex
                },
                getClassTaskAccessState(classRow, task.courseId, task.moduleId, task.taskIndex)
              )}
            </div>
          `).join("")}
        </div>
      </div>
    </details>
  `;
}

function renderClassAccessBlock(classRow) {
  const courses = getCourseAccessTree();

  return `
    <section class="teacher-card">
      <div class="teacher-card__head">
        <h4>Доступи для всього класу</h4>
      </div>

      <div class="teacher-access-stack">
        ${courses.map(course => `
          <section class="teacher-access-course">
            <div class="teacher-access-course__head">
              <div>
                <h5>${escapeHtml(course.courseTitle)}</h5>
                <p>${course.modules.length} модулів</p>
              </div>
            </div>

            <div class="teacher-access-list">
              ${course.modules.map((module, index) =>
               renderClassModuleAccessGroup(classRow, course, module, false)
              ).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}
function renderNeedHelpBlock() {
  const students = getActiveStudents();
  if (!Array.isArray(students) || !students.length) return "";

  const struggling = students
    .map(student => {
      const attempts = getStudentAttempts(student);
      const completed = getStudentCompletedCount(student);
      const xp = getStudentXP(student);

      return {
        student,
        attempts,
        completed,
        xp
      };
    })
    .filter(item => item.attempts >= 10 || item.completed === 0)
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 5);

  if (!struggling.length) return "";

  return `
    <section class="teacher-card">
      <div class="teacher-card__head">
        <h4>Кому може знадобитися допомога</h4>
      </div>
      <div class="teacher-list">
        ${struggling.map(item => `
          <article class="teacher-list-item">
            <div>
              <strong>${escapeHtml(item.student.full_name || "Без імені")}</strong>
              <div class="teacher-muted">
                XP: ${item.xp} · Виконано: ${item.completed} · Спроб: ${item.attempts}
              </div>
            </div>
            <button
              class="teacher-btn teacher-btn--ghost"
              data-open-student="${item.student.id}">
              Відкрити
            </button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

    // СЮДИ МИ ПОСТУПОВО ДОДАМО ІНШІ render-функції

    return {
      escapeHtml,
      formatDate,
      renderAccessSelect,
      getAccessStateLabel,
      calcClassStats,
      renderStudentModuleAccessGroup,
renderClassModuleAccessGroup,
renderClassAccessBlock,
renderNeedHelpBlock
    };
  }

  return { create };
})();