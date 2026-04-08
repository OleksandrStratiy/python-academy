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
  removeStudentFromClass,
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
  isStudentTaskDone: (...args) => isStudentTaskDone(...args),
  getStudentModuleProgress: (...args) => getStudentModuleProgress(...args),

  getClassModuleAccessState: (...args) => getClassModuleAccessState(...args),
  getClassTaskAccessState: (...args) => getClassTaskAccessState(...args),
  countClassChangedTasks: (...args) => countClassChangedTasks(...args),
  
 isAccessCourseOpen: (courseId) => isAccessCourseOpen(courseId),
isAccessModuleOpen: (courseId, moduleId) => isAccessModuleOpen(courseId, moduleId),
isClassFullyUnlocked: (classRow) => isClassFullyUnlocked(classRow)
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
let activeStudentSubmissions = [];
let viewMode = "list"; // list | details | student

function resetTransientTeacherClassesUi() {
  const ui = state.teacherClassesUI || {};

  ui.showClassSettingsModal = false;
  ui.showCreateModal = false;
  ui.openAccessCourses = {};
  ui.openAccessModules = {};

  state.teacherClassesUI = ui;

  viewMode = "list";
  activeClassCode = null;
  activeStudentId = null;
  activeStudentAssignments = [];
}





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
    function getStudentLastActiveDays(student) {
  if (!student?.updated_at) return null;

  const d = new Date(student.updated_at);
  if (Number.isNaN(d.getTime())) return null;

  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function getStudentRibbonState(student) {
  const xp = getStudentXP(student);
  const attempts = getStudentAttempts(student);
  const completed = getStudentCompletedCount(student);
  const inactiveDays = getStudentLastActiveDays(student);
  const submissionCount = activeStudentSubmissions.length;

  if (
    attempts >= 10 ||
    (inactiveDays !== null && inactiveDays >= 10) ||
    (xp < 100 && completed === 0)
  ) {
    return {
      tone: "danger",
      label: "Потрібна увага",
      text: "Мало прогресу або давно немає активності. Варто переглянути завдання і підтримати учня."
    };
  }

  if (
    completed >= 8 ||
    xp >= 300 ||
    submissionCount >= 3
  ) {
    return {
      tone: "success",
      label: "Добрий прогрес",
      text: "Учень стабільно рухається вперед і має помітний результат у курсах або завданнях."
    };
  }

  return {
    tone: "info",
    label: "Активний",
    text: "Є активність і поступ. Можна продовжувати в поточному темпі."
  };
}
    function getTaskCompletionKey(courseId, moduleId, taskIndex) {
  return `${courseId}_${moduleId}_${taskIndex}`;
}

function isStudentTaskDone(student, courseId, moduleId, taskIndex) {
  const completed = getStudentProgress(student)?.user?.completed || {};
  return !!completed[getTaskCompletionKey(courseId, moduleId, taskIndex)];
}

function getModuleTaskList(courseId, moduleId) {
  const course = (window.DB || []).find((item) => item.id === courseId);
  const module = course?.modules?.find((item) => item.id === moduleId);
  return Array.isArray(module?.tasks) ? module.tasks : [];
}

function getStudentModuleProgress(student, courseId, moduleId) {
  const tasks = getModuleTaskList(courseId, moduleId);
  const total = tasks.length;

  const done = tasks.reduce((sum, _, index) => {
    return sum + (isStudentTaskDone(student, courseId, moduleId, index) ? 1 : 0);
  }, 0);

  return {
    total,
    done,
    completed: total > 0 && done >= total
  };
}

function getStudentAssignmentStatusLabel(status) {
  if (status === "active") return "Активне";
  if (status === "submitted") return "Здано";
  if (status === "review") return "На перевірці";
  if (status === "reviewed") return "Перевірено";
  if (status === "returned") return "На доопрацюванні";
  if (status === "closed") return "Закрито";
  return "Активне";
}

function renderStudentAssignmentStatusBadge(status) {
  const safeStatus = String(status || "active");

  let extraClass = "";
  if (safeStatus === "submitted") extraClass = " teacher-pill--warn";
  if (safeStatus === "review") extraClass = " teacher-pill--accent";
  if (safeStatus === "reviewed") extraClass = " teacher-pill--success";
  if (safeStatus === "returned") extraClass = " teacher-pill--danger";
  if (safeStatus === "closed") extraClass = " teacher-pill--ghost";

  return `<span class="teacher-pill${extraClass}">${escapeHtml(getStudentAssignmentStatusLabel(safeStatus))}</span>`;
}

function getStudentSubmissionStatusLabel(status) {
  if (status === "submitted") return "Здано";
  if (status === "review") return "На перевірці";
  if (status === "reviewed") return "Перевірено";
  if (status === "returned") return "На доопрацюванні";
  return "Здано";
}

function renderStudentSubmissionStatusBadge(status) {
  const safeStatus = String(status || "submitted");

  let extraClass = "";
  if (safeStatus === "submitted") extraClass = " teacher-pill--warn";
  if (safeStatus === "review") extraClass = " teacher-pill--accent";
  if (safeStatus === "reviewed") extraClass = " teacher-pill--success";
  if (safeStatus === "returned") extraClass = " teacher-pill--danger";

  return `<span class="teacher-pill${extraClass}">${escapeHtml(getStudentSubmissionStatusLabel(safeStatus))}</span>`;
}

function renderStudentMissingSubmissionBadge(assignmentStatus) {
  const safeStatus = String(assignmentStatus || "active");

  if (safeStatus === "closed") {
    return `<span class="teacher-pill teacher-pill--ghost">Закрито без здачі</span>`;
  }

  return `<span class="teacher-pill teacher-pill--ghost">Не здано</span>`;
}

function getStudentSubmissionForAssignment(assignmentId) {
  return activeStudentSubmissions.find(
    (item) => String(item.assignment_id || "") === String(assignmentId || "")
  ) || null;
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
const tasks = (mod.tasks || []).map((task, index) => {
  const rawDifficulty = String(task?.difficulty || task?.taskDifficulty || "Junior").trim().toLowerCase();

  const normalizedDifficulty =
    rawDifficulty === "middle" ? "Middle" :
    rawDifficulty === "senior" ? "Senior" :
    "Junior";

  return {
    courseId: course.id,
    moduleId: mod.id,
    taskIndex: index,
    taskTitle: task?.title || `Завдання ${index + 1}`,
    taskDifficulty: normalizedDifficulty
  };
});

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

function getTaskCompletionKey(courseId, moduleId, taskIndex) {
  return `${courseId}_${moduleId}_${taskIndex}`;
}

function isStudentTaskDone(student, courseId, moduleId, taskIndex) {
  const completed = getStudentProgress(student)?.user?.completed || {};
  return !!completed[getTaskCompletionKey(courseId, moduleId, taskIndex)];
}

function getStudentCourseSummary(student, course) {
  const modules = course?.modules || [];

  let totalModules = modules.length;
  let completedModules = 0;
  let totalTasks = 0;
  let completedTasks = 0;
  let customRules = 0;

  modules.forEach((module) => {
    const moduleState = getModuleAccessState(student, course.courseId, module.moduleId);
    if (moduleState !== "auto") {
      customRules += 1;
    }

    const tasks = module.tasks || [];
    let moduleDoneTasks = 0;

    tasks.forEach((task) => {
      totalTasks += 1;

      const taskState = getTaskAccessState(
        student,
        task.courseId,
        task.moduleId,
        task.taskIndex
      );

      if (taskState !== "auto") {
        customRules += 1;
      }

      if (isStudentTaskDone(student, task.courseId, task.moduleId, task.taskIndex)) {
        completedTasks += 1;
        moduleDoneTasks += 1;
      }
    });

    if (tasks.length > 0 && moduleDoneTasks === tasks.length) {
      completedModules += 1;
    }
  });

  const percent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    totalModules,
    completedModules,
    totalTasks,
    completedTasks,
    customRules,
    percent
  };
}

function renderStudentLearningStateBlock(student) {
  const courses = getCourseAccessTree();
  if (!courses.length) return "";

  return `
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);">
      <h5 style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.05em;">
        Стан навчання (Прогрес за курсами)
      </h5>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        ${courses.map((course) => {
          const summary = getStudentCourseSummary(student, course);
          
          return `
            <div style="flex: 1; min-width: 260px; background: rgba(0,0,0,0.2); padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div style="font-weight: 700; font-size: 13px; color: var(--text);">${escapeHtml(course.courseTitle)}</div>
                <div style="font-size: 11px; color: var(--text-dim);">${summary.completedTasks} / ${summary.totalTasks} завдань</div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                  <div style="height: 100%; width: ${summary.percent}%; background: var(--primary); border-radius: 3px; transition: width 0.5s ease;"></div>
                </div>
                <div style="font-size: 12px; font-weight: 800; color: var(--primary);">${summary.percent}%</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
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

  progress.user.moduleAccess = progress.user.moduleAccess || {};
  progress.user.moduleAccess[courseId] = progress.user.moduleAccess[courseId] || {};

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

  // якщо відкрили конкретне завдання — відкриваємо і модуль
  if (value === "unlocked") {
    progress.user.moduleAccess[courseId][moduleId] = "unlocked";
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
function isClassFullyUnlocked(classRow) {
  if (!classRow) return false;

  const courses = getCourseAccessTree();
  if (!courses.length) return false;

  return courses.every((course) =>
    (course.modules || []).every((module) =>
      getClassModuleAccessState(classRow, course.courseId, module.moduleId) === "unlocked"
    )
  );
}

async function setClassOpenAllAccess(classCode, enabled) {
  const cls = teacherClasses.find((c) => c.code === classCode);
  if (!cls) throw new Error("Class not found");

  const courses = getCourseAccessTree();

  if (!enabled) {
    await updateClassRecord(classCode, {
      module_access: {},
      task_access: {}
    });

    cls.module_access = {};
    cls.task_access = {};
    return;
  }

  const nextModuleAccess = {};
  courses.forEach((course) => {
    nextModuleAccess[course.courseId] = {};
    (course.modules || []).forEach((module) => {
      nextModuleAccess[course.courseId][module.moduleId] = "unlocked";
    });
  });

  await updateClassRecord(classCode, {
    module_access: nextModuleAccess,
    task_access: {}
  });

  cls.module_access = nextModuleAccess;
  cls.task_access = {};
}

function getAccessCourseKey(courseId) {
  return String(courseId || "");
}

function getAccessModuleKey(courseId, moduleId) {
  return `${courseId}::${moduleId}`;
}

function isAccessCourseOpen(courseId) {
  return !!getClassesUi().openAccessCourses[getAccessCourseKey(courseId)];
}

function isAccessModuleOpen(courseId, moduleId) {
  return !!getClassesUi().openAccessModules[getAccessModuleKey(courseId, moduleId)];
}

function setAccessCourseOpen(courseId, isOpen) {
  const ui = getClassesUi();
  ui.openAccessCourses[getAccessCourseKey(courseId)] = !!isOpen;
  save?.();
}

function setAccessModuleOpen(courseId, moduleId, isOpen) {
  const ui = getClassesUi();
  ui.openAccessModules[getAccessModuleKey(courseId, moduleId)] = !!isOpen;
  save?.();
}


function renderStudentAccessBlock(student) {
  const courses = getCourseAccessTree();
  if (!courses.length) return "";

  return `
    <style>
      .access-course-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); margin: 20px 0 10px 0; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
      .module-accordion { background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 10px; overflow: hidden; transition: border-color 0.2s; }
      .module-accordion[open] { border-color: rgba(14, 165, 233, 0.3); background: rgba(30,41,59,0.5); }
      .module-summary { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; cursor: pointer; list-style: none; gap: 16px; }
      .module-summary::-webkit-details-marker { display: none; }
      .module-summary:hover { background: rgba(255,255,255,0.03); }
      .module-summary-left { display: flex; align-items: center; gap: 14px; }
      .module-icon { background: rgba(14, 165, 233, 0.1); color: var(--primary); width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
      .module-summary-right { display: flex; align-items: center; gap: 12px; }
      .module-summary-right i { transition: transform 0.3s ease; }
      .module-accordion[open] .module-summary-right i { transform: rotate(180deg); color: var(--primary); }
      .custom-select { appearance: none; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: var(--text); padding: 8px 32px 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; font-family: var(--font); cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 15l-5-5h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; background-size: 18px; transition: 0.2s; }
      .custom-select:hover { border-color: rgba(255,255,255,0.3); }
      .custom-select:focus { border-color: var(--primary); outline: none; }
      .custom-select--unlocked { color: #4ade80; background-color: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.3); }
      .custom-select--locked { color: #fb7185; background-color: rgba(244, 63, 94, 0.05); border-color: rgba(244, 63, 94, 0.3); }
      .custom-select--small { padding: 4px 28px 4px 10px; font-size: 12px; border-radius: 6px; }
      .module-body { background: rgba(0,0,0,0.15); border-top: 1px solid rgba(255,255,255,0.05); padding: 8px 16px; }
      .task-access-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed rgba(255,255,255,0.05); }
      .task-access-row:last-child { border-bottom: none; }
      .task-name { font-size: 13px; color: var(--text-dim); display: flex; align-items: center; gap: 10px; }
      .task-num { color: var(--text); font-family: var(--mono); font-size: 11px; background: rgba(255,255,255,0.1); width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
    </style>

    <div style="background: rgba(14, 165, 233, 0.03); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 14px; padding: 20px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <i class="ri-user-settings-fill" style="color: var(--primary); font-size: 20px;"></i>
        <h4 style="margin: 0; color: var(--text); font-size: 16px;">Індивідуальні доступи учня</h4>
      </div>
      <p class="teacher-muted" style="margin: 0 0 16px 0; font-size: 13px;">
        Ці налаштування <b>ігнорують правила класу</b>. Використовуй їх, щоб персонально відкрити чи закрити завдання.<br>
        <i class="ri-checkbox-circle-fill" style="color: var(--success); font-size: 14px; vertical-align: text-bottom;"></i> — учень вже виконав це завдання.
      </p>

      <div style="display: flex; flex-direction: column;">
        ${courses.map(course => `
          <div class="access-course-title">${escapeHtml(course.courseTitle)}</div>
          <div>
            ${course.modules.map(module => renderStudentModuleAccessGroup(student, course, module)).join("")}
          </div>
        `).join("")}
      </div>
    </div>
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
    showOnlyRisky: false,
    showClassSettingsModal: false,
    showCreateModal: false,
    openAccessCourses: {},
    openAccessModules: {}
  };

  if (typeof state.teacherClassesUI.showClassSettingsModal !== "boolean") {
    state.teacherClassesUI.showClassSettingsModal = false;
  }

  if (typeof state.teacherClassesUI.showCreateModal !== "boolean") {
    state.teacherClassesUI.showCreateModal = false;
  }

  if (!state.teacherClassesUI.openAccessCourses || typeof state.teacherClassesUI.openAccessCourses !== "object") {
    state.teacherClassesUI.openAccessCourses = {};
  }

  if (!state.teacherClassesUI.openAccessModules || typeof state.teacherClassesUI.openAccessModules !== "object") {
    state.teacherClassesUI.openAccessModules = {};
  }

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
} else {
  list.sort((a, b) => {
    const aTime = new Date(a.updated_at || 0).getTime();
    const bTime = new Date(b.updated_at || 0).getTime();
    return bTime - aTime;
  });
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
function getNextAccessState(value) {
  if (value === "auto") return "unlocked";
  if (value === "unlocked") return "locked";
  return "auto";
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
  const nextModuleAccess = structuredClone(cls.module_access || {});

  nextAccess[courseId] = nextAccess[courseId] || {};
  nextAccess[courseId][moduleId] = nextAccess[courseId][moduleId] || {};

  if (!value || value === "auto") {
    delete nextAccess[courseId][moduleId][taskIndex];
    if (!Object.keys(nextAccess[courseId][moduleId]).length) delete nextAccess[courseId][moduleId];
    if (!Object.keys(nextAccess[courseId]).length) delete nextAccess[courseId];
  } else {
    nextAccess[courseId][moduleId][taskIndex] = value;
  }

  // якщо конкретне завдання відкрили — модуль теж відкриваємо
  if (value === "unlocked") {
    nextModuleAccess[courseId] = nextModuleAccess[courseId] || {};
    nextModuleAccess[courseId][moduleId] = "unlocked";
  }

  await updateClassRecord(classCode, {
    task_access: nextAccess,
    module_access: nextModuleAccess
  });

  cls.task_access = nextAccess;
  cls.module_access = nextModuleAccess;
}


    function getActiveStudent() {
      return activeStudents.find(s => s.id === activeStudentId) || null;
    }
async function loadActiveStudentAssignments() {
  const student = getActiveStudent();
  const classCode = student?.class_code || activeClassCode || "";

  activeStudentAssignments = [];
  activeStudentSubmissions = [];

  if (!student?.id || !classCode) {
    return;
  }

  try {
    const assignments = await assignmentStore.fetchAssignmentsForStudent(student.id, classCode);
    activeStudentAssignments = assignments;

    if (!assignments.length) {
      return;
    }

    const submissions = await assignmentStore.fetchSubmissionsByAssignmentIds(
      assignments.map((item) => item.id)
    );

    activeStudentSubmissions = submissions.filter(
      (item) => String(item.student_id || "") === String(student.id)
    );
  } catch (err) {
    console.error(err);
    activeStudentAssignments = [];
    activeStudentSubmissions = [];
    toast("❌ Не вдалося завантажити завдання та здачі учня");
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
          <div>
            <h4>Видані завдання</h4>
            <p class="teacher-muted">Окремі завдання для цього учня або завдання, видані всьому класу.</p>
          </div>
          <div class="teacher-class-item__actions">
            <button type="button" id="teacherRefreshStudentAssignmentsBtn" class="teacher-btn teacher-btn--ghost teacher-btn--small">Оновити</button>
            <button type="button" class="teacher-btn teacher-btn--ghost teacher-btn--small" data-open-assignments-student="${escapeHtml(student.id)}" data-open-assignments-classcode="${escapeHtml(student.class_code || activeClassCode || "")}">До вкладки завдань</button>
          </div>
        </div>
        <div class="teacher-empty" style="padding: 40px; text-align: center; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
          <i class="ri-cup-line" style="font-size: 48px; color: var(--text-dim); margin-bottom: 16px; display: inline-block;"></i>
          <div style="font-size: 16px; font-weight: 700; color: var(--text);">Для цього учня поки немає виданих завдань</div>
        </div>
      </section>
    `;
  }

  const styles = `
    <style>
      .student-task-accordion > summary::-webkit-details-marker { display: none; } 
      .student-task-accordion[open] > summary { background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); } 
      .student-task-accordion[open] .task-chevron { transform: rotate(180deg); color: var(--primary) !important; } 
      .student-task-summary:hover { background: rgba(255,255,255,0.04); }
    </style>
  `;

  return `
    ${styles}
    <section class="teacher-card">
      <div class="teacher-card__head">
        <div>
          <h4>Видані завдання</h4>
          <p class="teacher-muted">Тут видно, що саме видано, що вже здано і який результат перевірки.</p>
        </div>
        <div class="teacher-class-item__actions">
          <button type="button" id="teacherRefreshStudentAssignmentsBtn" class="teacher-btn teacher-btn--ghost teacher-btn--small">Оновити</button>
          <button type="button" class="teacher-btn teacher-btn--ghost teacher-btn--small" data-open-assignments-student="${escapeHtml(student.id)}" data-open-assignments-classcode="${escapeHtml(student.class_code || activeClassCode || "")}">До вкладки завдань</button>
        </div>
      </div>

      <div class="teacher-student-assignments-wrapper" style="display: flex; flex-direction: column; gap: 4px;">
        ${activeStudentAssignments.map((item) => {
          const submission = getStudentSubmissionForAssignment(item.id);
          const subStatus = submission?.status || null;
          
          const starterStr = String(item.starter_code_snapshot || "").trim();
          const isAutoAssignment = starterStr.startsWith("auto|") || starterStr.startsWith("auto_module|");
          const displayMaxScore = isAutoAssignment ? 12 : (item.max_score_snapshot || 12);

          let statusColor = "var(--text-dim)"; 
          let statusBg = "rgba(255, 255, 255, 0.05)"; 
          let statusLabel = "Видано"; 
          let icon = "ri-send-plane-line";
          let isOpen = false;

          if (isAutoAssignment && !subStatus) { 
              statusColor = "var(--primary)"; statusBg = "rgba(14, 165, 233, 0.1)"; statusLabel = "Авто-задача"; icon = "ri-terminal-box-fill"; 
          } else if (subStatus === "submitted") { 
              statusColor = "var(--warn)"; statusBg = "rgba(251, 191, 36, 0.1)"; statusLabel = "Очікує перевірки"; icon = "ri-time-line"; isOpen = true; 
          } else if (subStatus === "review") { 
              statusColor = "var(--warn)"; statusBg = "rgba(251, 191, 36, 0.1)"; statusLabel = "Перевіряється"; icon = "ri-eye-line"; isOpen = true; 
          } else if (subStatus === "reviewed") { 
              statusColor = "var(--success)"; statusBg = "rgba(34, 197, 94, 0.1)"; statusLabel = "Оцінено"; icon = "ri-check-double-line"; 
          } else if (subStatus === "returned") { 
              statusColor = "var(--danger)"; statusBg = "rgba(244, 63, 94, 0.1)"; statusLabel = "Повернуто"; icon = "ri-error-warning-line"; isOpen = true;
          } else if (item.status === "closed") { 
              statusColor = "var(--text-dim)"; statusBg = "rgba(255, 255, 255, 0.05)"; statusLabel = "Закрито"; icon = "ri-lock-line"; 
          }

          const scoreBadge = (subStatus === "reviewed" && submission?.points != null)
            ? `<div style="background: rgba(34,197,94,0.14); color: var(--success); padding: 4px 10px; border-radius: 8px; font-weight: 800; font-size: 13px; border: 1px solid rgba(34,197,94,0.18); white-space: nowrap;">${submission.points} / ${displayMaxScore} балів</div>`
            : "";

          return `
            <details class="student-task-accordion" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin-bottom: 12px; overflow: hidden; border-left: 4px solid ${statusColor}; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: background 0.2s;" ${isOpen ? "open" : ""}>
              <summary class="student-task-summary" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; list-style: none; gap: 16px; flex-wrap: wrap;">
                
                <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 250px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="background: ${statusBg}; color: ${statusColor}; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;"><i class="${icon}"></i> ${statusLabel}</span>
                    <span style="font-size: 12px; color: var(--text-dim); display: flex; align-items: center; gap: 4px;"><i class="ri-pushpin-line"></i> Видано: ${formatDate(item.created_at)}</span>
                    ${item.target_type === "class" ? `<span style="font-size: 11px; color: var(--primary); background: rgba(14,165,233,0.1); padding: 2px 6px; border-radius: 4px;"><i class="ri-group-line"></i> На весь клас</span>` : ''}
                  </div>
                  <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: var(--text);">${isAutoAssignment ? "🤖 " : ""}${escapeHtml(item.title_snapshot || "Без назви")}</h4>
                </div>
                
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end;">
                  ${scoreBadge}
                  <div style="font-size: 12px; color: var(--text); display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.04);">
                    <i class="ri-calendar-event-line" style="color: ${item.due_at ? 'var(--primary)' : 'var(--text-dim)'};"></i>
                    Дедлайн: ${item.due_at ? formatDate(item.due_at) : "Без дедлайну"}
                  </div>
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
                    <i class="ri-arrow-down-s-line task-chevron" style="font-size: 20px; color: var(--text-dim); transition: transform 0.3s;"></i>
                  </div>
                </div>
              </summary>
              
              <div style="padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
                
                ${item.note_for_student ? `<div style="font-size: 14px; color: var(--text); background: rgba(139, 92, 246, 0.1); border-left: 3px solid var(--accent); padding: 12px; border-radius: 0 8px 8px 0; margin-bottom: 16px;"><b><i class="ri-message-3-line"></i> Примітка для учня:</b> ${escapeHtml(item.note_for_student)}</div>` : ""}
                
                ${submission ? `
                  <div style="margin-top: 10px; padding: 16px; border: 1px solid rgba(14,165,233,0.15); border-radius: 14px; background: rgba(14,165,233,0.05); margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <div style="font-size: 12px; text-transform: uppercase; color: var(--primary); font-weight: 800; letter-spacing: 0.05em;"><i class="ri-user-smile-line"></i> Відповідь учня:</div>
                      <div style="font-size: 12px; color: var(--text-dim);"><i class="ri-time-line"></i> Здано: ${formatDate(submission.submitted_at)}</div>
                    </div>
                    ${submission.submission_text 
                        ? `<div style="font-family: var(--mono); font-size: 14px; color: var(--text); white-space: pre-wrap; background: rgba(2,6,23,0.6); padding: 16px; border-radius: 10px; max-height: 350px; overflow-y: auto; border: 1px solid rgba(14,165,233,0.1);">${escapeHtml(submission.submission_text)}</div>`
                        : `<div style="font-size: 14px; color: var(--text-dim); font-style: italic;">Учень не додав текстову відповідь.</div>`
                    }
                  </div>
                ` : `
                  <div style="margin-top: 20px; margin-bottom: 16px; text-align: center; padding: 16px; font-size: 14px; color: var(--text-dim); background: rgba(255,255,255,0.02); border-radius: 14px; font-weight: 600; border: 1px dashed rgba(255,255,255,0.1);"><i class="ri-hourglass-2-fill" style="font-size: 18px; vertical-align: middle; margin-right: 6px;"></i> Учень ще не надіслав відповідь.</div>
                `}

                ${submission && submission.teacher_comment ? `
                    <div style="background: rgba(34, 197, 94, 0.05); border-left: 3px solid var(--success); padding: 12px; border-radius: 0 8px 8px 0; margin-bottom: 16px;">
                        <div style="font-size: 12px; color: var(--success); font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">Твій коментар:</div>
                        <div style="font-size: 14px; color: var(--text);">${escapeHtml(submission.teacher_comment)}</div>
                    </div>
                ` : ""}

                <div style="display: flex; justify-content: flex-end; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.05);">
                    <button
                      type="button"
                      class="teacher-btn teacher-btn--primary teacher-btn--small"
                      data-open-assignment-edit="${escapeHtml(item.id)}"
                      data-open-assignment-title="${escapeHtml(item.title_snapshot || "")}"
                      data-open-assignment-classcode="${escapeHtml(item.class_code || student.class_code || activeClassCode || "")}"
                      data-open-assignment-studentid="${escapeHtml(student.id)}"
                      style="display: flex; align-items: center; gap: 8px; border-radius: 8px;"
                    >
                      <i class="ri-external-link-line"></i> ${(subStatus === 'submitted' || subStatus === 'review') ? 'Перевірити завдання' : 'Переглянути / Редагувати'}
                    </button>
                </div>
                
              </div>
            </details>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderClassesList() {
  const ui = getClassesUi();
  const classesToRender = getFilteredClasses();

  return `
    <style>
      .premium-class-card {
        background: linear-gradient(145deg, rgba(30,41,59,0.4), rgba(15,23,42,0.8));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 18px;
        padding: 20px;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 16px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .premium-class-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px -10px rgba(14, 165, 233, 0.25);
        border-color: rgba(14, 165, 233, 0.3);
      }
      .premium-class-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; height: 4px;
        background: var(--primary);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .premium-class-card:hover::before {
        opacity: 1;
      }
      .class-icon-bg {
        background: rgba(255,255,255,0.05);
        padding: 10px;
        border-radius: 12px;
        color: var(--primary);
        transition: all 0.3s ease;
      }
      .premium-class-card:hover .class-icon-bg {
        background: var(--primary);
        color: #fff;
        transform: scale(1.1);
      }
      .class-code-badge {
        font-family: var(--mono);
        font-size: 13px;
        background: rgba(0,0,0,0.3);
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.05);
        letter-spacing: 0.05em;
      }
    </style>

    <div class="teacher-toolbar teacher-toolbar--classes">
      <input
        type="text"
        id="teacherClassSearchInput"
        class="teacher-input"
        placeholder="Пошук класу, коду або школи"
        value="${escapeHtml(ui.classSearch || "")}"
      />

      <select id="teacherClassSortSelect" class="teacher-input">
        <option value="updated" ${ui.classSort === "updated" ? "selected" : ""}>Сортувати: за активністю</option>
        <option value="name" ${ui.classSort === "name" ? "selected" : ""}>Сортувати: за назвою (А-Я)</option>
      </select>
    </div>

    ${
      !classesToRender.length
        ? `<div class="teacher-empty">Нічого не знайдено. Спробуй змінити пошук або додати новий клас.</div>`
        : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 10px;">
            ${classesToRender.map(cls => `
              <article
                class="premium-class-card"
                data-class-open="${escapeHtml(cls.code)}"
                tabindex="0"
                role="button"
              >
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <div style="font-size: 11px; font-weight: 800; color: var(--primary); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">Клас</div>
                    <h3 style="margin: 0; font-size: 20px; line-height: 1.2;">${escapeHtml(cls.name)}</h3>
                  </div>
                  <div class="class-icon-bg">
                    <i class="ri-group-line" style="font-size: 20px;"></i>
                  </div>
                </div>

                <div style="font-size: 13px; color: var(--text-dim); display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="ri-user-smile-line" style="font-size: 16px;"></i> 
                    <span>Учнів: <b style="color: var(--text); font-size: 14px;">${getStudentCountForClass(cls.code)}</b></span>
                  </div>
                  ${cls.school_name ? `
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="ri-building-4-line" style="font-size: 16px;"></i> 
                    <span>Школа: <b style="color: var(--text);">${escapeHtml(cls.school_name)}</b></span>
                  </div>` : ""}
                </div>

                <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                  
                  <div class="class-code-badge" title="Унікальний код класу">
                    ${escapeHtml(cls.code)}
                  </div>

                  <div style="display: flex; gap: 6px;" class="teacher-class-card__actions">
                    <button
                      type="button"
                      class="teacher-btn teacher-btn--ghost teacher-btn--small"
                      data-class-copy="${escapeHtml(cls.code)}"
                      title="Копіювати код"
                    >
                      <i class="ri-file-copy-line"></i>
                    </button>

                    <button
                      type="button"
                      class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger"
                      data-class-delete="${escapeHtml(cls.code)}"
                      title="Видалити клас"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>

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
    return `<div class="teacher-empty">У цьому класі ще немає учнів.</div>`;
  }

  return `
    <style>
      .compact-student-row {
        display: grid; 
        grid-template-columns: minmax(150px, 3fr) 70px 120px 100px 130px 40px; 
        gap: 12px; align-items: center; padding: 10px 16px; 
        background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.03); 
        border-radius: 10px; transition: all 0.2s ease; cursor: pointer;
      }
      .compact-student-row:hover {
        background: rgba(30,41,59,0.8); border-color: rgba(14, 165, 233, 0.4); transform: translateX(4px);
      }
    </style>

    <div class="teacher-toolbar" style="margin-bottom: 16px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
      <input
        type="text"
        id="teacherStudentSearchInput"
        class="teacher-input teacher-input--small"
        placeholder="Пошук учня..."
        value="${escapeHtml(ui.studentSearch || "")}"
        style="max-width: 220px; margin: 0;"
      />
      
      <label class="teacher-check" style="margin: 0; white-space: nowrap; font-size: 13px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <input type="checkbox" id="teacherOnlyRiskyInput" ${ui.showOnlyRisky ? "checked" : ""} style="margin: 0;">
        <span style="color: var(--text-dim);">Тільки ті, хто відстає</span>
      </label>
    </div>

    ${!studentsToRender.length
        ? `<div class="teacher-empty" style="padding: 20px;">Нікого не знайдено.</div>`
        : `
          <div style="display: grid; grid-template-columns: minmax(150px, 3fr) 70px 120px 100px 130px 40px; gap: 12px; padding: 0 16px 8px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="student-col-header">Учень</div>
            <div class="student-col-header">Рівень</div>
            <div class="student-col-header">Прогрес</div>
            <div class="student-col-header">Спроби</div>
            <div class="student-col-header">Останній візит</div>
            <div class="student-col-header"></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
            ${studentsToRender.map((student) => {
              const xp = getStudentXP(student);
              const attempts = getStudentAttempts(student);
              const risky = attempts >= 5 || xp < 100;
              const lvl = (window.App?.helpers?.levelFromXp) ? window.App.helpers.levelFromXp(xp).level : Math.floor(xp/200) + 1;

              return `
                <article class="compact-student-row" data-open-student="${escapeHtml(student.id)}" tabindex="0" role="button">
                  <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                    <div style="min-width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; color: #fff;">
                      ${(student.full_name || "Б")[0].toUpperCase()}
                    </div>
                    <div style="font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${escapeHtml(student.full_name || "Без імені")}
                    </div>
                  </div>
                  <div style="font-size: 13px; font-weight: 800; color: var(--accent);">LVL ${lvl}</div>
                  <div style="font-size: 13px;"><b style="color: var(--primary);">${xp}</b> <span style="color: var(--text-dim); font-size: 11px;">XP</span></div>
                  <div><span class="teacher-pill ${attempts >= 5 ? "teacher-pill--danger" : "teacher-pill--ghost"}" style="padding: 2px 6px; font-size: 11px;">${attempts} спроб</span></div>
                  <div style="font-size: 12px; color: var(--text-dim);">${escapeHtml(formatDate(student.updated_at)).replace(" ", "<br>")}</div>
                  <div style="display:flex; justify-content:flex-end; align-items:center; gap:8px;">
  ${risky ? `<i class="ri-alarm-warning-fill" style="color: var(--warn); font-size: 18px;"></i>` : `<i class="ri-arrow-right-s-line" style="color: var(--text-dim); font-size: 20px;"></i>`}

  <button
    type="button"
    class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger"
    data-student-remove="${escapeHtml(student.id)}"
    title="Видалити учня з класу"
    style="padding: 4px 8px;"
  >
    <i class="ri-user-unfollow-line"></i>
  </button>
</div>
                </article>
              `;
            }).join("")}
          </div>
        `
    }
  `;
}
function openCreateClassModal() {
  const ui = getClassesUi();
  ui.showCreateModal = true;
  save?.();
}

function closeCreateClassModal() {
  const ui = getClassesUi();
  ui.showCreateModal = false;
  save?.();
}

function renderCreateClassModal() {
  const ui = getClassesUi();

  if (!ui.showCreateModal) return "";

  return `
    <div
      id="teacherCreateClassOverlay"
      class="overlay active teacher-overlay"
      data-close-create-class-overlay="1"
    >
      <div
        class="modal teacher-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacherCreateClassModalTitle"
      >
        <div class="teacher-create-modal__head">
          <div>
            <div class="teacher-create-modal__eyebrow">НОВИЙ КЛАС</div>
            <h3 id="teacherCreateClassModalTitle" class="teacher-create-modal__title">
              Створити клас
            </h3>
          </div>

          <button
            type="button"
            id="teacherCloseCreateClassBtn"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
          >
            ✕
          </button>
        </div>

        <form id="teacherCreateClassForm" class="teacher-class-create-form">
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
            placeholder="Назва школи"
            value="${escapeHtml(state.user.teacherSchoolName || "")}"
          />

          <details class="teacher-class-advanced">
            <summary>Додаткові налаштування</summary>

            <div class="teacher-class-advanced__body">
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
            </div>
          </details>

          <div class="teacher-create-modal__actions">
            <button
              type="button"
              id="teacherCancelCreateClassBtn"
              class="teacher-btn teacher-btn--ghost"
            >
              Скасувати
            </button>

            <button
              id="teacherCreateClassBtn"
              type="submit"
              class="teacher-btn teacher-btn--primary"
            >
              Створити клас
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderListView() {
  const classesCount = teacherClasses.length;

  return `
    <section class="teacher-panel">
      <section class="teacher-card teacher-classes-hero">
        <div class="teacher-classes-hero__main">
         <div class="teacher-classes-hero__eyebrow">КЛАСИ</div>
<h3 class="teacher-classes-hero__title">Керування класами</h3>
<p class="teacher-classes-hero__sub">
  Створи новий клас або відкрий існуючий, щоб працювати з учнями.
</p>
        </div>

        <div class="teacher-classes-hero__actions">
          <div class="teacher-classes-hero__stat">
            <span>Класів</span>
            <b>${classesCount}</b>
          </div>

          <button
            type="button"
            id="teacherOpenCreateClassBtn"
            class="teacher-btn teacher-btn--primary"
          >
            <i class="ri-add-line"></i>
            Створити новий клас
          </button>
        </div>
      </section>

      <section class="teacher-card">
        <div class="teacher-card__head">
          <div>
            <h4>Список класів</h4>
            <p class="teacher-muted">Натисни на клас, щоб відкрити його сторінку</p>
          </div>
        </div>

        ${renderClassesList()}
      </section>

    </section>
  `;
}

function openClassSettingsModal() {
  getClassesUi().showClassSettingsModal = true;
  save?.();
}

function closeClassSettingsModal() {
  getClassesUi().showClassSettingsModal = false;
  save?.();
}

function scrollToClassAccessBlock() {
  setTimeout(() => {
    document.getElementById("teacherClassAccessBlock")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 30);
}

function renderClassSettingsModal(cls) {
  const ui = getClassesUi();

  if (!ui.showClassSettingsModal || !cls) return "";

  return `
    <div
      id="teacherClassSettingsOverlay"
      class="overlay active teacher-overlay"
      data-close-class-settings-overlay="1"
    >
      <div
        class="modal teacher-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacherClassSettingsTitle"
      >
        <div class="teacher-create-modal__head">
          <div>
            <div class="teacher-create-modal__eyebrow">НАЛАШТУВАННЯ КЛАСУ</div>
            <h3 id="teacherClassSettingsTitle" class="teacher-create-modal__title">
              ${escapeHtml(cls.name || cls.code)}
            </h3>
          </div>

          <button
            type="button"
            id="teacherCloseClassSettingsBtn"
            class="teacher-btn teacher-btn--ghost teacher-btn--small"
          >
            ✕
          </button>
        </div>

        <form id="teacherEditClassForm" class="teacher-class-settings-form">
          <div class="teacher-form-grid teacher-form-grid--2">
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
          </div>

          <details class="teacher-class-advanced" open>
            <summary>Налаштування відображення в рейтингу</summary>

            <div class="teacher-class-advanced__body">
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
            </div>
          </details>

          <div class="teacher-create-modal__actions">
            <button
              type="button"
              id="teacherCancelClassSettingsBtn"
              class="teacher-btn teacher-btn--ghost"
            >
              Скасувати
            </button>

            <button
              id="teacherSaveClassSettingsBtn"
              type="button"
              class="teacher-btn teacher-btn--primary"
            >
              Зберегти налаштування
            </button>
          </div>
        </form>
      </div>
    </div>
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

  // Перевіряємо, чи є учні, яким потрібна допомога
  const hasRiskyStudents = stats.needHelp > 0;

  return `
  <div class="teacher-shell">
    
    <div class="teacher-dashboard-hero" style="margin-bottom: 20px;">
      <div class="teacher-dashboard-hero__main">
        <button class="teacher-btn teacher-btn--ghost teacher-btn--small" id="teacherBackToClassesBtn" style="margin-bottom: 16px; padding-left: 0; color: var(--text-dim);">
          <i class="ri-arrow-left-line"></i> Назад до списку
        </button>
        
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
          <div class="class-icon-bg" style="background: rgba(14, 165, 233, 0.15); color: var(--primary); padding: 14px; border-radius: 14px;">
            <i class="ri-group-fill" style="font-size: 28px;"></i>
          </div>
          <div>
            <div class="teacher-shell__eyebrow">КЕРУВАННЯ КЛАСОМ</div>
            <h2 class="teacher-dashboard-hero__title" style="margin: 0;">${escapeHtml(cls.name)}</h2>
          </div>
        </div>
        
        <div class="teacher-dashboard-hero__actions">
          <button class="teacher-btn teacher-btn--primary" data-open-assignments-class="${escapeHtml(cls.code)}">
            <i class="ri-add-line"></i> Видати завдання
          </button>
          <button type="button" id="teacherOpenClassSettingsBtn" class="teacher-btn teacher-btn--ghost">
            <i class="ri-settings-3-line"></i> Налаштування
          </button>
        </div>
      </div>

      <div class="teacher-dashboard-hero__side" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-content: center;">
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Учнів</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${stats.count}</div>
        </div>
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Середній XP</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${stats.avgXp}</div>
        </div>
        <div class="teacher-dashboard-mini-stat" style="border-left-color: var(--accent);">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Лідер класу</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 14px; color: var(--accent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(stats.topName)}">
            ${escapeHtml(stats.topName) || "—"}
          </div>
        </div>
        <div class="teacher-dashboard-mini-stat ${stats.needHelp > 0 ? 'teacher-dashboard-mini-stat--warn' : ''}">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Відстають</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${stats.needHelp}</div>
        </div>
      </div>
    </div>

    <details class="premium-access-details" style="margin-bottom: 20px; border: 1px solid rgba(139, 92, 246, 0.2); background: rgba(139, 92, 246, 0.05); border-radius: 14px;">
      <summary style="padding: 12px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; font-weight: 600; color: var(--accent);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="ri-lock-unlock-line"></i>
          <span>Швидке керування доступами (для всього класу)</span>
        </div>
        <i class="ri-arrow-down-s-line chevron"></i>
      </summary>
      <div id="teacherClassAccessBlock" style="padding: 0 20px 20px;">
        ${renderClassAccessBlock(cls)}
      </div>
    </details>

    ${hasRiskyStudents ? `
      <section class="teacher-card" style="margin-bottom: 20px; border-color: rgba(245, 158, 11, 0.3);">
        <div class="teacher-card__head" style="margin-bottom: 12px;">
          <h4 style="margin: 0; color: var(--warn); display: flex; align-items: center; gap: 8px;">
            <i class="ri-alarm-warning-line"></i> Потребують уваги
          </h4>
          <p class="teacher-muted" style="margin-top: 4px;">Учні, що відстають або мають багато невдалих спроб</p>
        </div>
        
        <style>
          #horizontalHelpList .teacher-help-compact-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 12px;
          }
        </style>
        
        <div id="horizontalHelpList">
          ${renderNeedHelpBlock({ compact: true, limit: 6 })}
        </div>
      </section>
    ` : ""}

    <section class="teacher-card" style="width: 100%;">
      <div class="teacher-card__head" style="margin-bottom: 10px;">
        <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
          <i class="ri-group-line" style="color: var(--primary);"></i> Всі учні класу
        </h4>
      </div>
      ${renderStudentsTable()}
    </section>

  </div>
  `;
}

function renderStudentView() {
  const student = getActiveStudent();
  const cls = getActiveClass();

  if (!student) {
    return `<section class="teacher-panel"><div class="teacher-empty">Учня не знайдено.</div></section>`;
  }

  const xp = getStudentXP(student);
  const attempts = getStudentAttempts(student);
  const completed = getStudentCompletedCount(student);
  const lvl = (window.App?.helpers?.levelFromXp) ? window.App.helpers.levelFromXp(xp).level : Math.floor(xp/200) + 1;
  const lastActive = student.updated_at ? escapeHtml(formatDate(student.updated_at)) : "Немає даних";
  
  const ribbon = getStudentRibbonState(student);
  let ribbonColor = "var(--primary)";
  let ribbonBg = "rgba(14, 165, 233, 0.1)";
  if (ribbon.tone === "danger") { ribbonColor = "var(--danger)"; ribbonBg = "rgba(244, 63, 94, 0.1)"; }
  if (ribbon.tone === "success") { ribbonColor = "var(--success)"; ribbonBg = "rgba(34, 197, 94, 0.1)"; }
  if (ribbon.tone === "warn") { ribbonColor = "var(--warn)"; ribbonBg = "rgba(251, 191, 36, 0.1)"; }

  return `
  <div class="teacher-shell">
    
    <div class="teacher-dashboard-hero" style="margin-bottom: 20px;">
      <div class="teacher-dashboard-hero__main">
        <button class="teacher-btn teacher-btn--ghost teacher-btn--small" data-back-to-class="${escapeHtml(student.class_code || activeClassCode || "")}" style="margin-bottom: 16px; padding-left: 0; color: var(--text-dim);">
          <i class="ri-arrow-left-line"></i> Назад до класу
        </button>
        
        <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 12px;">
          <div class="class-icon-bg" style="background: var(--primary); color: #fff; padding: 14px; border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; box-shadow: 0 4px 15px rgba(14,165,233,0.3);">
            ${(student.full_name || "Б")[0].toUpperCase()}
          </div>
          <div>
            <div class="teacher-shell__eyebrow">ПРОФІЛЬ УЧНЯ</div>
            <h2 class="teacher-dashboard-hero__title" style="margin: 0;">
              ${escapeHtml(student.full_name || "Без імені")}
            </h2>
            
            <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
              <span class="class-code-badge" style="border-color: transparent; background: rgba(255,255,255,0.05); font-family: var(--font);">
                <i class="ri-group-line"></i> Клас: <b style="color: var(--primary);">${escapeHtml(cls?.name || student.class_code || activeClassCode || "—")}</b>
              </span>
              <span class="class-code-badge" style="border-color: transparent; background: rgba(255,255,255,0.05); font-family: var(--font);">
                <i class="ri-time-line"></i> Був(ла): <b style="color: var(--text);">${lastActive}</b>
              </span>
              <span class="class-code-badge" style="border-color: ${ribbonColor}; background: ${ribbonBg}; color: ${ribbonColor}; font-family: var(--font);">
                ${escapeHtml(ribbon.label)}
              </span>
            </div>
          </div>
        </div>

        <div class="teacher-dashboard-hero__actions" style="margin-top: 20px;">
          <button class="teacher-btn teacher-btn--primary" data-open-assignments-student="${escapeHtml(student.id)}" data-open-assignments-classcode="${escapeHtml(student.class_code || activeClassCode || "")}">
            <i class="ri-add-line"></i> Видати завдання
          </button>
          <button type="button" id="teacherRefreshStudentAssignmentsBtn" class="teacher-btn teacher-btn--ghost">
            <i class="ri-refresh-line"></i> Оновити дані
          </button>
        </div>
      </div>

      <div class="teacher-dashboard-hero__side" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-content: center;">
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Рівень учня</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px; color: var(--accent);">LVL ${lvl}</div>
        </div>
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Поточний XP</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${xp}</div>
        </div>
        <div class="teacher-dashboard-mini-stat">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Виконано завдань</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${completed}</div>
        </div>
        <div class="teacher-dashboard-mini-stat ${attempts >= 5 ? 'teacher-dashboard-mini-stat--warn' : ''}">
          <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Невдалі спроби</div>
          <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${attempts}</div>
        </div>
      </div>

      ${renderStudentLearningStateBlock(student)}

    </div>

    <div style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
      ${renderStudentAccessBlock(student)}
      ${renderStudentAssignmentsBlock()}
    </div>

  </div>
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

    async function openStudentById(studentId, classCode) {
  if (classCode) {
    activeClassCode = classCode;
  }

  if (!activeClassCode) return;

  await loadStudents(activeClassCode);

  activeStudentId = studentId;
  viewMode = "student";

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

const modalHost = document.getElementById("teacherModalHost");
if (modalHost) {
  modalHost.innerHTML = "";

  const cls = getActiveClass();
  const ui = getClassesUi();

  if (viewMode === "details" && cls && ui.showClassSettingsModal) {
    modalHost.innerHTML = renderClassSettingsModal(cls);
  }

  if (viewMode === "list" && ui.showCreateModal) {
    modalHost.innerHTML = renderCreateClassModal();
  }
}

bindEvents();
    }

function bindEvents() {
  const root = $("teacherInnerView");
  if (!root) return;

const createForm = document.getElementById("teacherCreateClassForm");

if (createForm) {
  createForm.onsubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

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
      const created = await store.createClassRecord({
        name,
        schoolName,
        showClassInGlobal: showClassGlobal,
        showSchoolInGlobal: showSchoolGlobal,
        showSchoolInClass: showSchoolClass
      }, teacherClasses);

      teacherClasses = [
        { ...created, student_count: 0 },
        ...teacherClasses.filter((cls) => cls.code !== created.code)
      ];

      state.user = state.user || {};
      state.user.teacherClasses = teacherClasses;
      state.user.teacherSchoolName = schoolName;

      getClassesUi().showCreateModal = false;
      activeClassCode = created.code;
      save?.();

      toast(`✅ Клас ${created.name || name} створено`);
      await refreshAndRender();
    } catch (err) {
      console.error(err);
      toast(`❌ ${err?.message || "Не вдалося створити клас"}`);
    } finally {
      form.dataset.busy = "0";

      if (createBtn) {
        createBtn.disabled = false;
        createBtn.textContent = "Створити клас";
      }
    }
  };
}

document.querySelectorAll("[data-class-open]").forEach((item) => {
  item.addEventListener("click", async () => {
    const classCode = item.getAttribute("data-class-open");
    if (!classCode) return;

    viewMode = "details";
    activeClassCode = classCode;
    activeStudentId = null;
    await loadStudents(classCode);
    await refreshAndRender();
  });

  item.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();

    const classCode = item.getAttribute("data-class-open");
    if (!classCode) return;

    viewMode = "details";
    activeClassCode = classCode;
    activeStudentId = null;
    await loadStudents(classCode);
    await refreshAndRender();
  });
});

      document.querySelectorAll("[data-student-open]").forEach(btn => {
        document.querySelectorAll("[data-student-remove]").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();

    const studentId = btn.getAttribute("data-student-remove");
    const student = activeStudents.find((item) => item.id === studentId);
    if (!student) return;

    if (!confirm(`Видалити учня "${student.full_name || "Без імені"}" з класу?`)) return;

    btn.disabled = true;

    try {
      await removeStudentFromClass(studentId);

      activeStudents = activeStudents.filter((item) => item.id !== studentId);

      if (activeStudentId === studentId) {
        activeStudentId = null;
        viewMode = "details";
      }

      const cls = teacherClasses.find((item) => item.code === activeClassCode);
      if (cls) {
        cls.student_count = Math.max(0, Number(cls.student_count || 0) - 1);
      }

      state.user = state.user || {};
      state.user.teacherClasses = teacherClasses;
      save?.();

      toast("🗑️ Учня прибрано з класу");
      await refreshAndRender();
    } catch (err) {
      console.error(err);
      toast("❌ Не вдалося прибрати учня з класу");
    } finally {
      btn.disabled = false;
    }
  });
});
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

const classOpenAllInput = document.querySelector("[data-class-open-all]");
if (classOpenAllInput) {
  classOpenAllInput.onchange = async () => {
    const cls = getActiveClass();
    if (!cls) return;

    classOpenAllInput.disabled = true;

    try {
      await setClassOpenAllAccess(cls.code, !!classOpenAllInput.checked);
      toast(classOpenAllInput.checked ? "✅ Для класу відкрито все" : "✅ Повернуто звичайний режим доступу");
      await refreshAndRender();
    } catch (err) {
      console.error(err);
      toast("❌ Не вдалося оновити загальний доступ класу");
    } finally {
      classOpenAllInput.disabled = false;
    }
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

const openClassSettingsBtn = $("teacherOpenClassSettingsBtn");
if (openClassSettingsBtn) {
  openClassSettingsBtn.onclick = async () => {
    openClassSettingsModal();
    await refreshAndRender();
  };
}

const closeClassSettingsBtn = $("teacherCloseClassSettingsBtn");
if (closeClassSettingsBtn) {
  closeClassSettingsBtn.onclick = async () => {
    closeClassSettingsModal();
    await refreshAndRender();
  };
}

const cancelClassSettingsBtn = $("teacherCancelClassSettingsBtn");
if (cancelClassSettingsBtn) {
  cancelClassSettingsBtn.onclick = async () => {
    closeClassSettingsModal();
    await refreshAndRender();
  };
}

const classSettingsOverlay = $("teacherClassSettingsOverlay");
if (classSettingsOverlay) {
  classSettingsOverlay.addEventListener("click", async (e) => {
    if (e.target !== classSettingsOverlay) return;
    closeClassSettingsModal();
    await refreshAndRender();
  });
}

const scrollToClassAccessBtn = $("teacherScrollToClassAccessBtn");
if (scrollToClassAccessBtn) {
  scrollToClassAccessBtn.onclick = () => {
    scrollToClassAccessBlock();
  };
}

root.querySelectorAll("[data-open-student]").forEach((item) => {
  item.addEventListener("click", async () => {
    const studentId = item.getAttribute("data-open-student") || "";
    if (!studentId) return;

    activeStudentId = studentId;
    viewMode = "student";
    await refreshAndRender();
  });

  item.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();

    const studentId = item.getAttribute("data-open-student") || "";
    if (!studentId) return;

    activeStudentId = studentId;
    viewMode = "student";
    await refreshAndRender();
  });
});

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

root.querySelectorAll("[data-open-student]").forEach((item) => {
  item.addEventListener("click", async () => {
    const studentId = item.getAttribute("data-open-student") || "";
    if (!studentId) return;

    activeStudentId = studentId;
    viewMode = "student";
    await refreshAndRender();
  });

  item.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();

    const studentId = item.getAttribute("data-open-student") || "";
    if (!studentId) return;

    activeStudentId = studentId;
    viewMode = "student";
    await refreshAndRender();
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

const openCreateBtn = $("teacherOpenCreateClassBtn");
if (openCreateBtn) {
  openCreateBtn.onclick = () => {
    openCreateClassModal();
    refreshAndRender();
  };
}

const closeCreateBtn = $("teacherCloseCreateClassBtn");
if (closeCreateBtn) {
  closeCreateBtn.onclick = () => {
    closeCreateClassModal();
    refreshAndRender();
  };
}

const cancelCreateBtn = $("teacherCancelCreateClassBtn");
if (cancelCreateBtn) {
  cancelCreateBtn.onclick = () => {
    closeCreateClassModal();
    refreshAndRender();
  };
}

const createOverlay = $("teacherCreateClassOverlay");
if (createOverlay) {
  createOverlay.addEventListener("click", (e) => {
    if (e.target !== createOverlay) return;
    closeCreateClassModal();
    refreshAndRender();
  });
}
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

            closeClassSettingsModal();

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

document.querySelectorAll("[data-access-course-details]").forEach((el) => {
  el.addEventListener("toggle", () => {
    const courseId = el.getAttribute("data-course-id");
    if (!courseId) return;
    setAccessCourseOpen(courseId, el.open);
  });
});

document.querySelectorAll("[data-access-module-details]").forEach((el) => {
  el.addEventListener("toggle", () => {
    const courseId = el.getAttribute("data-course-id");
    const moduleId = el.getAttribute("data-module-id");
    if (!courseId || !moduleId) return;
    setAccessModuleOpen(courseId, moduleId, el.open);
  });
});


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
      Array.from(document.querySelectorAll("[data-class-task-chip]")).forEach((chip) => {
  chip.addEventListener("click", async () => {
    const cls = getActiveClass();
    if (!cls) return;

    const courseId = chip.getAttribute("data-course-id");
    const moduleId = chip.getAttribute("data-module-id");
    const taskIndex = chip.getAttribute("data-task-index");
    const currentState = chip.getAttribute("data-current-state") || "auto";
    const nextState = getNextAccessState(currentState);

    chip.disabled = true;

    try {
      await setClassTaskAccess(cls.code, courseId, moduleId, taskIndex, nextState);

      const taskNo = Number(taskIndex) + 1;
      const stateLabel =
        nextState === "unlocked" ? "Відкрито" :
        nextState === "locked" ? "Закрито" :
        "Авто";

      toast(`✅ Завдання ${taskNo}: ${stateLabel}`);
      await refreshAndRender();
    } catch (err) {
      console.error(err);
      toast("❌ Не вдалося оновити доступ завдання");
    } finally {
      chip.disabled = false;
    }
  });
});
Array.from(document.querySelectorAll("[data-student-task-chip]")).forEach((chip) => {
  chip.addEventListener("click", async () => {
    const student = getActiveStudent();
    if (!student) return;

    const courseId = chip.getAttribute("data-course-id");
    const moduleId = chip.getAttribute("data-module-id");
    const taskIndex = chip.getAttribute("data-task-index");
    const currentState = chip.getAttribute("data-current-state") || "auto";
    const nextState = getNextAccessState(currentState);

    chip.disabled = true;

    try {
      await setStudentTaskAccess(student.id, courseId, moduleId, taskIndex, nextState);

      const taskNo = Number(taskIndex) + 1;
      const stateLabel =
        nextState === "unlocked" ? "Відкрито" :
        nextState === "locked" ? "Закрито" :
        "Авто";

      toast(`✅ Завдання ${taskNo}: ${stateLabel}`);
      await refreshAndRender();
    } catch (err) {
      console.error(err);
      toast("❌ Не вдалося оновити доступ завдання");
    } finally {
      chip.disabled = false;
    }
  });
});
    }

    async function mount() {
  resetTransientTeacherClassesUi();
  await refreshAndRender();
}

return {
  render,
  mount,
  refreshAndRender,
  loadStudents,
  updateClassRecord,
  openClassByCode,
  openStudentById
};
  }

  return { create };
})();
