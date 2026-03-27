window.App = window.App || {};

window.App.teacherClasses = (function () {
  "use strict";

function create(deps) {
  const {
    $,
    state,
    save,
    toast,
    supa,
    onOpenAssignmentsForClass,
    onOpenAssignmentsForStudent
  } = deps;

  const assignmentStore = window.App.teacherAssignmentStore.create({
    state,
    save,
    toast,
    supa
  });

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

    function escapeHtml(str) {
      return String(str || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    async function getCurrentUserId() {
      if (!supa) return null;
      const { data: { user } } = await supa.auth.getUser();
      return user?.id || null;
    }

    function normalizeClassRow(row) {
  return {
    code: row.code,
    name: row.name || row.code,
    school_name: row.school_name || "",
    show_class_in_global: !!row.show_class_in_global,
    show_school_in_global: !!row.show_school_in_global,
    show_school_in_class: !!row.show_school_in_class,
    module_access: row.module_access || {},
    task_access: row.task_access || {}
  };
}

    function generateClassCode() {
      const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
      const prefix =
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)];
      const numbers = Math.floor(100 + Math.random() * 900);
      return `${prefix}-${numbers}`;
    }

    async function fetchTeacherClasses() {
      if (!supa) return [];
      try {
        const userId = await getCurrentUserId();
        if (!userId) return [];

        const { data, error } = await supa
          .from("classes")
          .select("code, name, school_name, show_class_in_global, show_school_in_global, show_school_in_class, module_access, task_access")
          .eq("teacher_id", userId)
          .order("updated_at", { ascending: false });

        if (error) throw error;

        teacherClasses = (data || []).map(normalizeClassRow);
        state.user.teacherClasses = teacherClasses;
        save();

        if (!activeClassCode && teacherClasses.length) {
          activeClassCode = teacherClasses[0].code;
        }

        return teacherClasses;
      } catch (err) {
        console.error(err);
        toast("❌ Не вдалося завантажити класи");
        return [];
      }
    }

    async function createClassRecord({ name, schoolName, showClassInGlobal, showSchoolInGlobal, showSchoolInClass }) {
      const userId = await getCurrentUserId();
      if (!userId || !supa) throw new Error("Teacher not found");

      let code = generateClassCode();
      while (teacherClasses.some(c => c.code === code)) {
        code = generateClassCode();
      }

      const { data, error } = await supa
        .from("classes")
        .insert({
          code,
          name,
          school_name: schoolName || null,
          teacher_id: userId,
          show_class_in_global: !!showClassInGlobal,
          show_school_in_global: !!showSchoolInGlobal,
          show_school_in_class: !!showSchoolInClass,
          updated_at: new Date().toISOString(),
          module_access: {},
task_access: {}
        })
       .select("code, name, school_name, show_class_in_global, show_school_in_global, show_school_in_class, module_access, task_access")
        .single();

      if (error) throw error;
      return normalizeClassRow(data);
    }

    async function updateClassRecord(code, patch) {
      const userId = await getCurrentUserId();
      if (!userId || !supa) throw new Error("Teacher not found");

      const { error } = await supa
        .from("classes")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("code", code)
        .eq("teacher_id", userId);

      if (error) throw error;
    }

    async function deleteClassRecord(code) {
      const userId = await getCurrentUserId();
      if (!userId || !supa) throw new Error("Teacher not found");

      const { error } = await supa
        .from("classes")
        .delete()
        .eq("code", code)
        .eq("teacher_id", userId);

      if (error) throw error;
    }

    async function fetchStudents(classCode) {
      if (!supa) return [];
      try {
        const { data, error } = await supa
          .from("profiles")
          .select("id, full_name, progress, updated_at, class_code, role")
          .eq("role", "student")
          .eq("class_code", classCode);

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error("Помилка завантаження учнів:", err);
        toast("❌ Не вдалося завантажити учнів");
        return [];
      }
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

async function saveStudentProgress(studentId, progress) {
  if (!supa) throw new Error("Supabase unavailable");

  const { error } = await supa
    .from("profiles")
    .update({
      progress,
      updated_at: new Date().toISOString()
    })
    .eq("id", studentId);

  if (error) throw error;
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

  await saveStudentProgress(studentId, progress);
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

  await saveStudentProgress(studentId, progress);
  student.progress = progress;
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

    function formatDate(dateValue) {
      if (!dateValue) return "Немає даних";
      const d = new Date(dateValue);
      return d.toLocaleDateString("uk-UA") + " о " + d.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
      });
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
    list.sort((a, b) => {
      const aCount = a.code === activeClassCode ? activeStudents.length : 0;
      const bCount = b.code === activeClassCode ? activeStudents.length : 0;
      return bCount - aCount;
    });
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

    function renderNeedHelpBlock() {
      const riskyStudents = activeStudents
        .filter(s => getStudentAttempts(s) >= 5)
        .sort((a, b) => getStudentAttempts(b) - getStudentAttempts(a))
        .slice(0, 5);

      if (!riskyStudents.length) {
        return `<div class="teacher-empty">Поки немає учнів, яким явно потрібна допомога.</div>`;
      }

      return `
        <div class="teacher-help-list">
          ${riskyStudents.map(student => `
            <div class="teacher-help-item">
              <div>
                <div class="teacher-help-item__name">${escapeHtml(student.full_name || "Без імені")}</div>
                <div class="teacher-help-item__meta">XP: ${getStudentXP(student)}</div>
              </div>
              <div class="teacher-help-item__badge">
                ${getStudentAttempts(student)} спроб
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

function renderListView() {
  return `
    <section class="teacher-panel">
      <section class="teacher-card">
        <div class="teacher-card__head">
          <h4>Створення класу</h4>
        </div>

        <div class="teacher-form-grid teacher-form-grid--stack">
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

          <button id="teacherCreateClassBtn" class="teacher-btn teacher-btn--primary">
            Створити клас
          </button>
        </div>
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

          <section class="teacher-card">
  <div class="teacher-card__head">
    <h4>Налаштування класу</h4>
  </div>

  <div class="teacher-form-grid">
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

    <button id="teacherSaveClassSettingsBtn" class="teacher-btn teacher-btn--primary">
      Зберегти
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

  <div class="teacher-form-grid teacher-form-grid--stack">
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
  </div>
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
      activeStudents = await fetchStudents(classCode);
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

      await fetchTeacherClasses();

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

  const createForm = $("teacherCreateClassForm");
      if (createForm) {
        createForm.onsubmit = async (e) => {
          e.preventDefault();

          const name = $("teacherClassNameInput")?.value?.trim();
          const schoolName = $("teacherSchoolNameInput")?.value?.trim() || "";
          const showClassGlobal = !!$("teacherShowClassGlobalInput")?.checked;
          const showSchoolGlobal = !!$("teacherShowSchoolGlobalInput")?.checked;
          const showSchoolClass = !!$("teacherShowSchoolClassInput")?.checked;

          if (!name) {
            toast("⚠️ Введи назву класу");
            return;
          }

          try {
            const created = await createClassRecord({
              name,
              schoolName,
              showClassGlobal,
              showSchoolGlobal,
              showSchoolClass
            });

            teacherClasses.unshift(created);
            state.user.teacherClasses = teacherClasses;
            state.user.teacherSchoolName = schoolName || state.user.teacherSchoolName || "";
            save();

            toast("✅ Клас створено");
            createForm.reset();
            await refreshAndRender();
          } catch (err) {
            console.error(err);
            toast("❌ Не вдалося створити клас");
          }
        };
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
            await deleteClassRecord(code);
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
      render();
      bindEvents();
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
            await updateClassRecord(cls.code, patch);

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
      updateClassRecord,
      openClassByCode
    };
  }

  return { create };
})();