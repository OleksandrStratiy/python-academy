window.App = window.App || {};

window.App.teacherClasses = (function () {
  "use strict";

function create(deps) {
  const {
    $,
    state,
    save,
    toast = () => {},
    supa = null,
    modules = [],
    tasksByModule = {},
    onOpenAssignmentsForClass,
    onOpenAssignmentsForStudent
  } = deps;

  const assignmentStore = window.App.teacherAssignmentStore.create({
    state,
    save,
    toast,
    supa
  });
  const store = window.App.teacherClassesStore.create({
  supa
});
const {
  fetchTeacherClasses,
  createClassRecord,
  updateClassRecord,
  deleteClassRecord,
  fetchStudents,
  saveStudentProgress
} = store;
const renderLib = window.App.teacherClassesRender.create({
  state,
  modules,
  tasksByModule,

  getActiveClass: () => getActiveClass(),
  getActiveStudent: () => getActiveStudent(),
  getStudentProgress: (student) => getStudentProgress(student),
  getStudentXP: (student) => getStudentXP(student),
  getStudentAttempts: (student) => getStudentAttempts(student),
  getStudentCompletedCount: (student) => getStudentCompletedCount(student),
  getStudentAssignmentsMarkup: () => renderStudentAssignmentsBlock(),
  getStudentAssignmentCount: () => getStudentAssignmentCount(),
  getActiveStudents: () => activeStudents,
  getActiveClassCode: () => activeClassCode,
  getActiveStudentId: () => activeStudentId,
  getCurrentView: () => viewMode,

  getCourseAccessTree: () => getCourseAccessTree(),
  getModuleAccessState: (...args) => getModuleAccessState(...args),
  getTaskAccessState: (...args) => getTaskAccessState(...args),
  countStudentChangedTasks: (...args) => countStudentChangedTasks(...args),

  getClassModuleAccessState: (...args) => getClassModuleAccessState(...args),
  getClassTaskAccessState: (...args) => getClassTaskAccessState(...args),
  countClassChangedTasks: (...args) => countClassChangedTasks(...args)
});

const {
  escapeHtml,
  formatDate,
  renderAccessSelect,
  getAccessStateLabel,
  calcClassStats,
  renderStudentModuleAccessGroup,
  renderClassModuleAccessGroup,
  renderClassAccessBlock,
  renderNeedHelpBlock
} = renderLib;

let teacherClasses = [];
let activeClassCode = null;
let activeStudents = [];
let activeStudentId = null;
let activeStudentAssignments = [];
let viewMode = "list"; // list | details | student

state.teacherClassesUI = state.teacherClassesUI || {
  classSearch: "",
  studentSearch: "",
  classSort: "updated",
  showOnlyRisky: false
};





    function getStudentXP(student) {
      return Number(student?.progress?.user?.xp || 0);
    }

    function getStudentAttempts(student) {
      const attempts = student?.progress?.user?.attempts || {};
      return Object.values(attempts).reduce((sum, val) => sum + Number(val || 0), 0);
    }

    function getStudentCompletedCount(student) {
      const completed = student?.progress?.user?.completed || {};
      return Object.keys(completed).length;
    }
function getStudentProgress(student) {
  return student?.progress || { user: {} };
}

function getModuleAccessState(student, courseId, moduleId) {
  const progress = getStudentProgress(student);

  const nestedValue = progress?.user?.moduleAccess?.[courseId]?.[moduleId];
  if (nestedValue) return nestedValue;

  const legacyKey = `${courseId}::${moduleId}`;
  return progress?.user?.moduleAccess?.[legacyKey] || "auto";
}

function getTaskAccessState(student, courseId, moduleId, taskIndex) {
  const progress = getStudentProgress(student);

  const nestedValue = progress?.user?.taskAccess?.[courseId]?.[moduleId]?.[taskIndex];
  if (nestedValue) return nestedValue;

  const legacyKey = `${courseId}::${moduleId}::${taskIndex}`;
  return progress?.user?.taskAccess?.[legacyKey] || "auto";
}

function getCourseAccessTree() {
  return (window.DB || [])
    .map(course => {
      const modules = (course.modules || []).map(mod => {
        const tasks = (mod.tasks || []).map((task, index) => ({
          courseId: course.id,
          moduleId: mod.id,
          taskIndex: index,
          taskTitle: task?.title || `Завдання ${index + 1}`
        }));

        return {
          courseId: course.id,
          courseTitle: course.title || course.id,
          moduleId: mod.id,
          moduleTitle: mod.title || mod.id,
          tasks
        };
      });

      return {
        courseId: course.id,
        courseTitle: course.title || course.id,
        modules
      };
    })
    .filter(course => course.modules.length);
}



async function setStudentModuleAccess(studentId, courseId, moduleId, value) {
  const student = activeStudents.find(s => s.id === studentId);
  if (!student) throw new Error("Student not found");

  const progress = structuredClone(getStudentProgress(student));
  progress.user = progress.user || {};
  progress.user.moduleAccess = progress.user.moduleAccess || {};
  progress.user.moduleAccess[courseId] = progress.user.moduleAccess[courseId] || {};

  if (!value || value === "auto") {
    delete progress.user.moduleAccess[courseId][moduleId];
    if (!Object.keys(progress.user.moduleAccess[courseId]).length) {
      delete progress.user.moduleAccess[courseId];
    }
  } else {
    progress.user.moduleAccess[courseId][moduleId] = value;
  }

  await store.saveStudentProgress(studentId, progress);
  student.progress = progress;
}

async function setStudentTaskAccess(studentId, courseId, moduleId, taskIndex, value) {
  const student = activeStudents.find(s => s.id === studentId);
  if (!student) throw new Error("Student not found");

  const progress = structuredClone(getStudentProgress(student));
  progress.user = progress.user || {};
  progress.user.taskAccess = progress.user.taskAccess || {};
  progress.user.taskAccess[courseId] = progress.user.taskAccess[courseId] || {};
  progress.user.taskAccess[courseId][moduleId] = progress.user.taskAccess[courseId][moduleId] || {};

  if (!value || value === "auto") {
    delete progress.user.taskAccess[courseId][moduleId][taskIndex];
    if (!Object.keys(progress.user.taskAccess[courseId][moduleId]).length) {
      delete progress.user.taskAccess[courseId][moduleId];
    }
    if (!Object.keys(progress.user.taskAccess[courseId]).length) {
      delete progress.user.taskAccess[courseId];
    }
  } else {
    progress.user.taskAccess[courseId][moduleId][taskIndex] = value;
  }

  await store.saveStudentProgress(studentId, progress);
  student.progress = progress;
}



function countStudentChangedTasks(student, module) {
  return (module.tasks || []).filter(task =>
    getTaskAccessState(student, module.courseId, module.moduleId, task.taskIndex) !== "auto"
  ).length;
}

function countClassChangedTasks(classRow, module) {
  return (module.tasks || []).filter(task =>
    getClassTaskAccessState(classRow, module.courseId, module.moduleId, task.taskIndex) !== "auto"
  ).length;
}





function renderStudentAccessBlock(student) {
  const courses = getCourseAccessTree();

  return `
    <section class="teacher-card">
      <div class="teacher-card__head">
        <h4>Індивідуальні доступи</h4>
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
                renderStudentModuleAccessGroup(student, course, module, false)
              ).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}





    function getActiveClass() {
      return teacherClasses.find(c => c.code === activeClassCode) || null;
    }
    function getClassesUi() {
  state.teacherClassesUI = state.teacherClassesUI || {
    classSearch: "",
    studentSearch: "",
    classSort: "updated",
    showOnlyRisky: false
  };
  return state.teacherClassesUI;
}
function getStudentCountForClass(classCode) {
  if (!classCode) return 0;
  if (classCode === activeClassCode) return activeStudents.length;

  const cls = teacherClasses.find(item => item.code === classCode);
  if (!cls || !Array.isArray(state.user?.teacherClasses)) return 0;

  return Number(cls.student_count || 0);
}
function getFilteredClasses() {
  const ui = getClassesUi();
  const q = String(ui.classSearch || "").trim().toLowerCase();

  let list = [...teacherClasses];

  if (q) {
    list = list.filter(cls =>
      String(cls.name || "").toLowerCase().includes(q) ||
      String(cls.code || "").toLowerCase().includes(q) ||
      String(cls.school_name || "").toLowerCase().includes(q)
    );
  }

  if (ui.classSort === "name") {
    list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "uk"));
} else if (ui.classSort === "students") {
  list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "uk"));
} else {
    list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "uk"));
  }

  return list;
}

function getFilteredStudents() {
  const ui = getClassesUi();
  const q = String(ui.studentSearch || "").trim().toLowerCase();

  let list = [...activeStudents];

  if (q) {
    list = list.filter(student =>
      String(student.full_name || "").toLowerCase().includes(q)
    );
  }

  if (ui.showOnlyRisky) {
    list = list.filter(student => getStudentAttempts(student) >= 5 || getStudentXP(student) < 100);
  }

  return list;
}
    function getClassModuleAccessState(classRow, courseId, moduleId) {
  return classRow?.module_access?.[courseId]?.[moduleId] || "auto";
}

function getClassTaskAccessState(classRow, courseId, moduleId, taskIndex) {
  return classRow?.task_access?.[courseId]?.[moduleId]?.[taskIndex] || "auto";
}

async function setClassModuleAccess(classCode, courseId, moduleId, value) {
  const cls = teacherClasses.find(c => c.code === classCode);
  if (!cls) throw new Error("Class not found");

  const nextAccess = structuredClone(cls.module_access || {});
  nextAccess[courseId] = nextAccess[courseId] || {};

  if (!value || value === "auto") {
    delete nextAccess[courseId][moduleId];
    if (!Object.keys(nextAccess[courseId]).length) delete nextAccess[courseId];
  } else {
    nextAccess[courseId][moduleId] = value;
  }

  await updateClassRecord(classCode, { module_access: nextAccess });
  cls.module_access = nextAccess;
}

async function setClassTaskAccess(classCode, courseId, moduleId, taskIndex, value) {
  const cls = teacherClasses.find(c => c.code === classCode);
  if (!cls) throw new Error("Class not found");

  const nextAccess = structuredClone(cls.task_access || {});
  nextAccess[courseId] = nextAccess[courseId] || {};
  nextAccess[courseId][moduleId] = nextAccess[courseId][moduleId] || {};

  if (!value || value === "auto") {
    delete nextAccess[courseId][moduleId][taskIndex];
    if (!Object.keys(nextAccess[courseId][moduleId]).length) delete nextAccess[courseId][moduleId];
    if (!Object.keys(nextAccess[courseId]).length) delete nextAccess[courseId];
  } else {
    nextAccess[courseId][moduleId][taskIndex] = value;
  }

  await updateClassRecord(classCode, { task_access: nextAccess });
  cls.task_access = nextAccess;
}



    function getActiveStudent() {
      return activeStudents.find(s => s.id === activeStudentId) || null;
    }
    async function loadActiveStudentAssignments() {
  const student = getActiveStudent();
  const classCode = student?.class_code || activeClassCode || "";

  if (!student?.id || !classCode) {
    activeStudentAssignments = [];
    return;
  }

  try {
    activeStudentAssignments = await assignmentStore.fetchAssignmentsForStudent(student.id, classCode);
  } catch (err) {
    console.error(err);
    activeStudentAssignments = [];
    toast("❌ Не вдалося завантажити призначені завдання учня");
  }
}

function renderStudentAssignmentsBlock() {
  const student = getActiveStudent();

  if (!student) {
    return `
      <section class="teacher-card">
        <div class="teacher-empty">Учня не знайдено.</div>
      </section>
    `;
  }

  if (!activeStudentAssignments.length) {
    return `
      <section class="teacher-card">
        <div class="teacher-card__head">
          <h4>Призначені завдання учню</h4>
          <button
            type="button"
            id="teacherRefreshStudentAssignmentsBtn"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
          >
            Оновити
          </button>
        </div>

        <div class="teacher-empty">
          Для цього учня поки немає призначених завдань.
        </div>
      </section>
    `;
  }

  return `
    <section class="teacher-card">
      <div class="teacher-card__head">
        <h4>Призначені завдання учню</h4>

        <div class="teacher-class-item__actions">
          <button
            type="button"
            id="teacherRefreshStudentAssignmentsBtn"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
          >
            Оновити
          </button>

          <button
            type="button"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
            data-open-assignments-student="${escapeHtml(student.id)}"
            data-open-assignments-classcode="${escapeHtml(student.class_code || activeClassCode || "")}"
          >
            До завдань
          </button>
        </div>
      </div>

      <div class="teacher-class-list">
        ${activeStudentAssignments.map((item) => `
<article class="teacher-class-item">
  <div class="teacher-class-item__main">
    <div class="teacher-class-item__title">${escapeHtml(item.title_snapshot || "Без назви")}</div>

    <div class="teacher-class-item__meta">
      ${item.target_type === "student" ? "Індивідуально" : "Через увесь клас"}
      · Клас: <b>${escapeHtml(item.class_code || "—")}</b>
    </div>

    <div class="teacher-class-item__meta">
      Дедлайн: <b>${escapeHtml(formatDate(item.due_at))}</b>
    </div>

    ${
      item.note_for_student
        ? `<div class="teacher-class-item__meta">Примітка: ${escapeHtml(item.note_for_student)}</div>`
        : ``
    }
  </div>

  <div class="teacher-class-item__actions">
    <button
      type="button"
      class="teacher-btn teacher-btn--ghost teacher-btn--small"
      data-open-assignment-edit="${escapeHtml(item.id)}"
      data-open-assignment-title="${escapeHtml(item.title_snapshot || "")}"
      data-open-assignment-classcode="${escapeHtml(item.class_code || student.class_code || activeClassCode || "")}"
      data-open-assignment-studentid="${escapeHtml(student.id)}"
    >
      Редагувати це завдання
    </button>
  </div>
</article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderClassesList() {
  const ui = getClassesUi();
  const classesToRender = getFilteredClasses();

  return `
    <div class="teacher-toolbar">
      <input
        type="text"
        id="teacherClassSearchInput"
        class="teacher-input"
        placeholder="Пошук класу, коду або школи"
        value="${escapeHtml(ui.classSearch || "")}"
      />

      <select id="teacherClassSortSelect" class="teacher-input">
        <option value="updated" ${ui.classSort === "updated" ? "selected" : ""}>Сортувати: стандартно</option>
        <option value="name" ${ui.classSort === "name" ? "selected" : ""}>Сортувати: за назвою</option>
        <option value="students" ${ui.classSort === "students" ? "selected" : ""}>Сортувати: за учнями</option>
      </select>
    </div>

    ${
      !classesToRender.length
        ? `<div class="teacher-empty">Нічого не знайдено. Спробуй змінити пошук.</div>`
        : `
          <div class="teacher-class-list">
            ${classesToRender.map(cls => `
              <article class="teacher-class-item">
                <div class="teacher-class-item__main">
                  <div class="teacher-class-item__title">${escapeHtml(cls.name)}</div>
                  <div class="teacher-class-item__meta">
                    Код: <b>${escapeHtml(cls.code)}</b>
                    ${cls.school_name ? ` · Школа: <b>${escapeHtml(cls.school_name)}</b>` : ""}
                  </div>
                </div>

                <div class="teacher-class-item__actions">
                  <button class="teacher-btn teacher-btn--ghost" data-class-copy="${cls.code}" title="Копіювати код">
                    <i class="ri-file-copy-line"></i>
                  </button>

                  <button class="teacher-btn teacher-btn--ghost" data-class-open="${cls.code}">
                    Відкрити
                  </button>

                  <button class="teacher-btn teacher-btn--ghost teacher-btn--danger" data-class-delete="${cls.code}" title="Видалити клас">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </article>
            `).join("")}
          </div>
        `
    }
  `;
}

function renderStudentsTable() {
  const ui = getClassesUi();
  const studentsToRender = getFilteredStudents();

  if (!activeStudents.length) {
    return `
      <div class="teacher-empty">
        У цьому класі ще немає учнів.<br>
        Дай учням код <b>${escapeHtml(activeClassCode)}</b>, щоб вони приєднались.
      </div>
    `;
  }

  return `
    <div class="teacher-toolbar">
      <input
        type="text"
        id="teacherStudentSearchInput"
        class="teacher-input"
        placeholder="Пошук учня"
        value="${escapeHtml(ui.studentSearch || "")}"
      />

      <label class="teacher-check teacher-check--inline">
        <input type="checkbox" id="teacherOnlyRiskyInput" ${ui.showOnlyRisky ? "checked" : ""}>
        <span>Лише ті, кому потрібна допомога</span>
      </label>
    </div>

    ${
      !studentsToRender.length
        ? `<div class="teacher-empty">За цими фільтрами учнів не знайдено.</div>`
        : `
          <div class="teacher-students-table-wrap">
            <table class="teacher-students-table">
              <thead>
                <tr>
                  <th>Учень</th>
                  <th>XP</th>
                  <th>Спроби</th>
                  <th>Остання активність</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${studentsToRender.map(student => `
                  <tr>
                    <td>${escapeHtml(student.full_name || "Без імені")}</td>
                    <td>${getStudentXP(student)}</td>
                    <td>${getStudentAttempts(student)}</td>
                    <td>${formatDate(student.updated_at)}</td>
                    <td>
                      <button class="teacher-btn teacher-btn--ghost teacher-btn--small" data-student-open="${student.id}">
                        Переглянути
                      </button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `
    }
  `;
}



function renderListView() {
  return `
    <section class="teacher-panel">
      <section class="teacher-card">
        <div class="teacher-card__head">
          <h4>Створення класу</h4>
        </div>

        <form id="teacherCreateClassForm" class="teacher-form-grid teacher-form-grid--stack">
          <input
            type="text"
            id="teacherClassNameInput"
            class="teacher-input"
            placeholder="Назва класу, наприклад 10-А"
          />

          <input
            type="text"
            id="teacherSchoolNameInput"
            class="teacher-input"
            placeholder="Назва школи, наприклад Ліцей №2"
            value="${escapeHtml(state.user.teacherSchoolName || "")}"
          />

          <label class="teacher-check">
            <input type="checkbox" id="teacherShowClassGlobalInput" checked />
            <span>Показувати клас у глобальному рейтингу</span>
          </label>

          <label class="teacher-check">
            <input type="checkbox" id="teacherShowSchoolGlobalInput" checked />
            <span>Показувати школу в глобальному рейтингу</span>
          </label>

          <label class="teacher-check">
            <input type="checkbox" id="teacherShowSchoolClassInput" checked />
            <span>Показувати школу в рейтингу класу</span>
          </label>

          <button id="teacherCreateClassBtn" type="submit" class="teacher-btn teacher-btn--primary">
  Створити клас
</button>
        </form>
      </section>

      <section class="teacher-card">
        <div class="teacher-card__head">
          <h4>Список класів</h4>
        </div>
        ${renderClassesList()}
      </section>
    </section>
  `;
}

    function renderDetailsView() {
      const cls = getActiveClass();
      const stats = calcClassStats(activeStudents);

      if (!cls) {
        return `
          <section class="teacher-panel">
            <section class="teacher-card">
              <div class="teacher-empty">Клас не знайдено.</div>
            </section>
          </section>
        `;
      }

      return `
        <section class="teacher-panel">
          <section class="teacher-class-hero">
            <div class="teacher-class-hero__left">
              <button class="teacher-btn teacher-btn--ghost" id="teacherBackToClassesBtn">
                ← Назад до класів
              </button>

              <div>
                <div class="teacher-class-hero__kicker">СТОРІНКА КЛАСУ</div>
                <h3 class="teacher-class-hero__title">${escapeHtml(cls.name)}</h3>
                <p class="teacher-class-hero__sub">
  Код класу: <b>${escapeHtml(cls.code)}</b>
  ${cls.school_name ? ` · Школа: <b>${escapeHtml(cls.school_name)}</b>` : ""}
</p>
              </div>
            </div>

            <div class="teacher-class-hero__actions">
              <button class="teacher-btn teacher-btn--ghost" data-class-copy="${cls.code}">
                <i class="ri-file-copy-line"></i> Скопіювати код
              </button>
            </div>
          </section>

 

          <div class="teacher-class-summary">
            <div class="teacher-class-summary__item">
              <span>Учнів</span>
              <b>${stats.count}</b>
            </div>
            <div class="teacher-class-summary__item">
              <span>Середній XP</span>
              <b>${stats.avgXp}</b>
            </div>
            <div class="teacher-class-summary__item">
              <span>Лідер класу</span>
              <b>${escapeHtml(stats.topName)}</b>
            </div>
            <div class="teacher-class-summary__item">
              <span>Потрібна допомога</span>
              <b>${stats.needHelp}</b>
            </div>
          </div>
          <section class="teacher-card">
  <div class="teacher-card__head">
    <h4>Налаштування класу</h4>
  </div>

<form id="teacherCreateClassForm" class="teacher-form-grid teacher-form-grid--stack">
    <input
      type="text"
      id="teacherEditClassNameInput"
      class="teacher-input"
      placeholder="Назва класу"
      value="${escapeHtml(cls.name || "")}"
    />

    <input
      type="text"
      id="teacherEditSchoolNameInput"
      class="teacher-input"
      placeholder="Назва школи"
      value="${escapeHtml(cls.school_name || "")}"
    />

    <label class="teacher-check">
      <input
        type="checkbox"
        id="teacherEditShowClassGlobalInput"
        ${cls.show_class_in_global ? "checked" : ""}
      />
      <span>Показувати клас у глобальному рейтингу</span>
    </label>

    <label class="teacher-check">
      <input
        type="checkbox"
        id="teacherEditShowSchoolGlobalInput"
        ${cls.show_school_in_global ? "checked" : ""}
      />
      <span>Показувати школу в глобальному рейтингу</span>
    </label>

    <label class="teacher-check">
      <input
        type="checkbox"
        id="teacherEditShowSchoolClassInput"
        ${cls.show_school_in_class ? "checked" : ""}
      />
      <span>Показувати школу в рейтингу класу</span>
    </label>

    <button id="teacherSaveClassSettingsBtn" class="teacher-btn teacher-btn--primary">
      Зберегти налаштування
    </button>
  </form>
</section>

          <div class="teacher-grid teacher-grid--2">
            <section class="teacher-card">
              <div class="teacher-card__head">
                <h4>Учні, яким потрібна допомога</h4>
              </div>
              ${renderNeedHelpBlock()}
            </section>

            <section class="teacher-card">
  <div class="teacher-card__head">
    <h4>Пояснення логіки</h4>
  </div>
  <div class="teacher-empty">
    Спочатку працює правило класу. Якщо для конкретного учня задано індивідуальний доступ —
    він має вищий пріоритет за правило класу.
  </div>
</section>
          </div>
          ${renderClassAccessBlock(cls)}

          <section class="teacher-card">
            <div class="teacher-card__head">
              <h4>Список учнів</h4>
            </div>
            ${renderStudentsTable()}
          </section>
        </section>
      `;
    }

function renderStudentView() {
  const student = getActiveStudent();
  const cls = getActiveClass();

  if (!student) {
    return `
      <section class="teacher-card">
        <div class="teacher-empty">Учня не знайдено.</div>
      </section>
    `;
  }

  return `
    <section class="teacher-panel">
      <section class="teacher-card">
        <div class="teacher-card__head">
          <h4>Профіль учня</h4>
          <button id="teacherBackToClassBtn" class="teacher-btn teacher-btn--ghost">
            <i class="ri-arrow-left-line"></i>
            Назад до класу
          </button>
        </div>

        <div class="teacher-student-hero">
          <div>
            <div class="teacher-student-hero__name">${escapeHtml(student.full_name || "Без імені")}</div>
            <div class="teacher-student-hero__meta">
              Клас: <b>${escapeHtml(cls?.name || student.class_code || activeClassCode || "—")}</b>
            </div>
          </div>
        </div>

        <div class="teacher-stats-grid teacher-stats-grid--compact">
          <article class="teacher-stat-card">
            <div class="teacher-stat-card__label">XP</div>
            <div class="teacher-stat-card__value">${getStudentXP(student)}</div>
          </article>

          <article class="teacher-stat-card">
            <div class="teacher-stat-card__label">Спроби</div>
            <div class="teacher-stat-card__value">${getStudentAttempts(student)}</div>
          </article>

          <article class="teacher-stat-card">
            <div class="teacher-stat-card__label">Остання активність</div>
            <div class="teacher-stat-card__value">${formatDate(student.updated_at)}</div>
          </article>
        </div>
      </section>

      <section class="teacher-card">
        <div class="teacher-card__head">
          <h4>Подальші дії</h4>
        </div>

        <div class="teacher-quick-actions">
          <button
            class="teacher-btn"
            data-open-assignments-student="${escapeHtml(student.id)}"
            data-open-assignments-classcode="${escapeHtml(student.class_code || activeClassCode || "")}"
          >
            <i class="ri-user-add-line"></i>
            Видати завдання учню
          </button>

          <button
            class="teacher-btn teacher-btn--ghost"
            data-back-to-class="${escapeHtml(student.class_code || activeClassCode || "")}"
          >
            <i class="ri-arrow-left-line"></i>
            Назад до класу
          </button>
        </div>
      </section>

      ${renderStudentAssignmentsBlock()}
      ${renderStudentAccessBlock(student)}
    </section>
  `;
}

    function render() {
      if (viewMode === "student") return renderStudentView();
      if (viewMode === "details") return renderDetailsView();
      return renderListView();
    }

    async function loadStudents(classCode) {
      activeClassCode = classCode;
      try {
  activeStudents = await store.fetchStudents(classCode);
} catch (err) {
  console.error("Помилка завантаження учнів:", err);
  activeStudents = [];
  toast("❌ Не вдалося завантажити учнів");
}
      activeStudents.sort((a, b) => getStudentXP(b) - getStudentXP(a));
    }

    async function openClassByCode(classCode) {
      activeClassCode = classCode;
      activeStudentId = null;
      viewMode = "details";
      await loadStudents(classCode);
      await refreshAndRender();
    }

    async function refreshAndRender() {
      const root = $("teacherInnerView");
      if (!root) return;

      try {
  teacherClasses = await store.fetchTeacherClasses(teacherClasses);
  state.user.teacherClasses = teacherClasses;
  save?.();

  if (!activeClassCode && teacherClasses.length) {
    activeClassCode = teacherClasses[0].code;
  }
} catch (err) {
  console.error("CREATE CLASS ERROR:", err);
  toast(`❌ ${err?.message || "Не вдалося створити клас"}`);
}

      if ((viewMode === "details" || viewMode === "student") && activeClassCode) {
        await loadStudents(activeClassCode);
      }
if (viewMode === "student" && activeStudentId) {
  await loadActiveStudentAssignments();
} else {
  activeStudentAssignments = [];
}
      root.innerHTML = render();
      bindEvents();
    }

function bindEvents() {
  const root = $("teacherInnerView");
  if (!root) return;

if (!root.dataset.createFormBound) {
  root.addEventListener("submit", async (e) => {
    const form = e.target;

    if (!(form instanceof HTMLFormElement)) return;
    if (form.id !== "teacherCreateClassForm") return;

    e.preventDefault();
    console.log("SUBMIT create class fired");

    const nameInput = form.querySelector("#teacherClassNameInput");
    const schoolInput = form.querySelector("#teacherSchoolNameInput");
    const showClassGlobalInput = form.querySelector("#teacherShowClassGlobalInput");
    const showSchoolGlobalInput = form.querySelector("#teacherShowSchoolGlobalInput");
    const showSchoolClassInput = form.querySelector("#teacherShowSchoolClassInput");
    const createBtn = form.querySelector("#teacherCreateClassBtn");

    const name = nameInput?.value?.trim();
    const schoolName = schoolInput?.value?.trim() || "";
    const showClassGlobal = !!showClassGlobalInput?.checked;
    const showSchoolGlobal = !!showSchoolGlobalInput?.checked;
    const showSchoolClass = !!showSchoolClassInput?.checked;

    console.log("Form values:", {
      name,
      schoolName,
      showClassGlobal,
      showSchoolGlobal,
      showSchoolClass
    });

    if (!name) {
      toast("⚠️ Введи назву класу");
      return;
    }

    if (form.dataset.busy === "1") return;
    form.dataset.busy = "1";

    if (createBtn) {
      createBtn.disabled = true;
      createBtn.textContent = "Створення...";
    }

    try {
      console.log("Before createClassRecord");

      const created = await store.createClassRecord({
        name,
        schoolName,
        showClassInGlobal: showClassGlobal,
        showSchoolInGlobal: showSchoolGlobal,
        showSchoolInClass: showSchoolClass
      }, teacherClasses);

      console.log("Created class:", created);

      teacherClasses.unshift(created);
      state.user.teacherClasses = teacherClasses;
      state.user.teacherSchoolName = schoolName || state.user.teacherSchoolName || "";
      save?.();

      toast("✅ Клас створено");
      form.reset();
      await refreshAndRender();
    } catch (err) {
      console.error("CREATE CLASS ERROR:", err);
      toast(`❌ ${err?.message || "Не вдалося створити клас"}`);
    } finally {
      form.dataset.busy = "0";

      if (createBtn) {
        createBtn.disabled = false;
        createBtn.textContent = "Створити клас";
      }
    }
  });

  root.dataset.createFormBound = "1";
}

      document.querySelectorAll("[data-class-open]").forEach(btn => {
        btn.addEventListener("click", async () => {
          const classCode = btn.getAttribute("data-class-open");
          viewMode = "details";
          activeClassCode = classCode;
          activeStudentId = null;
          await loadStudents(classCode);
          await refreshAndRender();
        });
      });

      document.querySelectorAll("[data-student-open]").forEach(btn => {
        btn.addEventListener("click", async () => {
          activeStudentId = btn.getAttribute("data-student-open");
          viewMode = "student";
          await refreshAndRender();
        });
      });

      document.querySelectorAll("[data-class-copy]").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const code = btn.getAttribute("data-class-copy");
          try {
            await navigator.clipboard.writeText(code);
            toast("📋 Код класу скопійовано");
          } catch {
            toast("❌ Не вдалося скопіювати код");
          }
        });
      });

      document.querySelectorAll("[data-class-delete]").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          e.stopPropagation();
          const code = btn.getAttribute("data-class-delete");
          const cls = teacherClasses.find(c => c.code === code);

          if (!confirm(`Видалити клас ${cls?.name || code}?`)) return;

          try {
            await store.deleteClassRecord(code);
            teacherClasses = teacherClasses.filter(c => c.code !== code);
            state.user.teacherClasses = teacherClasses;
            save();

            if (activeClassCode === code) {
              activeClassCode = teacherClasses[0]?.code || null;
              activeStudents = [];
              activeStudentId = null;
              viewMode = "list";
            }

            toast("🗑️ Клас видалено");
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося видалити клас");
          }
        });
      });
      root.querySelectorAll("[data-open-assignment-edit]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const studentId = btn.getAttribute("data-open-assignment-studentid") || "";
    const classCode = btn.getAttribute("data-open-assignment-classcode") || "";
    const assignmentTitle = btn.getAttribute("data-open-assignment-title") || "";

    if (!studentId || !classCode) return;

    await onOpenAssignmentsForStudent?.({
      classCode,
      studentId,
      assignmentTitle
    });
  });
});

      const classSearchInput = $("teacherClassSearchInput");
if (classSearchInput) {
  classSearchInput.oninput = async () => {
    getClassesUi().classSearch = classSearchInput.value;
    save?.();
    await refreshAndRender();
  };
}

const classSortSelect = $("teacherClassSortSelect");
if (classSortSelect) {
  classSortSelect.onchange = async () => {
    getClassesUi().classSort = classSortSelect.value;
    save?.();
    await refreshAndRender();
  };
}

const studentSearchInput = $("teacherStudentSearchInput");
if (studentSearchInput) {
  studentSearchInput.oninput = async () => {
    getClassesUi().studentSearch = studentSearchInput.value;
    save?.();
    await refreshAndRender();
  };
}

const onlyRiskyInput = $("teacherOnlyRiskyInput");
if (onlyRiskyInput) {
  onlyRiskyInput.onchange = async () => {
    getClassesUi().showOnlyRisky = !!onlyRiskyInput.checked;
    save?.();
    await refreshAndRender();
  };
}

const refreshStudentAssignmentsBtn = $("teacherRefreshStudentAssignmentsBtn");
if (refreshStudentAssignmentsBtn) {
  refreshStudentAssignmentsBtn.onclick = async () => {
    refreshStudentAssignmentsBtn.disabled = true;

    try {
      await loadActiveStudentAssignments();
      await refreshAndRender();
      toast("✅ Список завдань учня оновлено");
    } catch (err) {
      console.error(err);
      toast("❌ Не вдалося оновити список завдань учня");
    } finally {
      refreshStudentAssignmentsBtn.disabled = false;
    }
  };
}

      const backToClassesBtn = $("teacherBackToClassesBtn");
      if (backToClassesBtn) {
        backToClassesBtn.onclick = async () => {
          viewMode = "list";
          activeStudentId = null;
          await refreshAndRender();
        };
      }

      const backToClassBtn = $("teacherBackToClassBtn");
      if (backToClassBtn) {
        backToClassBtn.onclick = async () => {
          viewMode = "details";
          await refreshAndRender();
        };
      }
      root.querySelectorAll("[data-open-assignments-student]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const studentId = btn.getAttribute("data-open-assignments-student") || "";
    const classCode = btn.getAttribute("data-open-assignments-classcode") || "";
    if (!studentId || !classCode) return;

    await onOpenAssignmentsForStudent?.({
      classCode,
      studentId
    });
  });
});

root.querySelectorAll("[data-back-to-class]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const classCode = btn.getAttribute("data-back-to-class") || "";
    if (!classCode) return;

    activeStudentId = null;
    viewMode = "details";
    activeClassCode = classCode;
    await refreshAndRender();
  });
});

      const saveClassSettingsBtn = $("teacherSaveClassSettingsBtn");
      const editClassNameInput = $("teacherEditClassNameInput");
      const editSchoolNameInput = $("teacherEditSchoolNameInput");
      const editShowClassGlobalInput = $("teacherEditShowClassGlobalInput");
      const editShowSchoolGlobalInput = $("teacherEditShowSchoolGlobalInput");
      const editShowSchoolClassInput = $("teacherEditShowSchoolClassInput");

      if (
        saveClassSettingsBtn &&
        editClassNameInput &&
        editSchoolNameInput &&
        editShowClassGlobalInput &&
        editShowSchoolGlobalInput &&
        editShowSchoolClassInput
      ) {
        saveClassSettingsBtn.onclick = async () => {
          const cls = getActiveClass();
          if (!cls) return;

          const nextName = editClassNameInput.value.trim();
          const nextSchoolName = editSchoolNameInput.value.trim();

          if (!nextName) {
            toast("⚠️ Введи назву класу");
            return;
          }

          const patch = {
            name: nextName,
            school_name: nextSchoolName || null,
            show_class_in_global: editShowClassGlobalInput.checked,
            show_school_in_global: editShowSchoolGlobalInput.checked,
            show_school_in_class: editShowSchoolClassInput.checked
          };

          saveClassSettingsBtn.disabled = true;
          saveClassSettingsBtn.textContent = "Збереження...";

          try {
            await store.updateClassRecord(cls.code, patch);

            cls.name = patch.name;
            cls.school_name = patch.school_name || "";
            cls.show_class_in_global = patch.show_class_in_global;
            cls.show_school_in_global = patch.show_school_in_global;
            cls.show_school_in_class = patch.show_school_in_class;

            state.user.teacherSchoolName = nextSchoolName || state.user.teacherSchoolName || "";
            save();

            toast("✅ Налаштування класу збережено");
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося зберегти налаштування класу");
          } finally {
            saveClassSettingsBtn.disabled = false;
            saveClassSettingsBtn.textContent = "Зберегти налаштування";
          }
        };
      }




      root.querySelectorAll("[data-open-assignments-class]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const classCode = btn.getAttribute("data-open-assignments-class") || "";
    if (!classCode) return;
    await onOpenAssignmentsForClass?.(classCode);
  });
});

      Array.from(document.querySelectorAll(".teacher-access-select:not([data-class-access-type])")).forEach(select => {
        select.addEventListener("change", async () => {
          const student = getActiveStudent();
          if (!student) return;

          const type = select.getAttribute("data-access-type");
          const courseId = select.getAttribute("data-course-id");
          const moduleId = select.getAttribute("data-module-id");
          const taskIndex = select.getAttribute("data-task-index");
          const value = select.value;

          select.disabled = true;

          try {
            if (type === "module") {
              await setStudentModuleAccess(student.id, courseId, moduleId, value);
              toast("✅ Доступ до модуля оновлено");
            }

            if (type === "task") {
              await setStudentTaskAccess(student.id, courseId, moduleId, taskIndex, value);
              toast("✅ Доступ до завдання оновлено");
            }

            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося оновити доступ");
          } finally {
            select.disabled = false;
          }
        });
      });

      Array.from(document.querySelectorAll(".teacher-access-select[data-class-access-type]")).forEach(select => {
        select.addEventListener("change", async () => {
          const cls = getActiveClass();
          if (!cls) return;

          const type = select.getAttribute("data-class-access-type");
          const courseId = select.getAttribute("data-course-id");
          const moduleId = select.getAttribute("data-module-id");
          const taskIndex = select.getAttribute("data-task-index");
          const value = select.value;

          select.disabled = true;

          try {
            if (type === "module") {
              await setClassModuleAccess(cls.code, courseId, moduleId, value);
              toast("✅ Доступ до модуля для класу оновлено");
            }

            if (type === "task") {
              await setClassTaskAccess(cls.code, courseId, moduleId, taskIndex, value);
              toast("✅ Доступ до завдання для класу оновлено");
            }

            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося оновити доступ класу");
          } finally {
            select.disabled = false;
          }
        });
      });
    }

    async function mount() {
      await refreshAndRender();
    }

    return {
      render,
      mount,
      refreshAndRender,
      loadStudents,

      openClassByCode
    };
  }

  return { create };
})();