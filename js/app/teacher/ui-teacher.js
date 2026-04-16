window.App = window.App || {};

window.App.uiTeacher = (function () {
  "use strict";

  function create(deps) {
    const { $, state, save, toast, supa } = deps;

    const shellApi = window.App.teacherShell.create({
      $,
      state
    });

const classesApi = window.App.teacherClasses.create({
  $,
  state,
  save,
  toast,
  supa,
onOpenAssignmentsForClass: async (classCode) => {
  state.teacherAssignmentsUI = state.teacherAssignmentsUI || {};

  state.teacherAssignmentsUI.mainTab = "issue";
  state.teacherAssignmentsUI.issueClassCode = classCode || "";
  state.teacherAssignmentsUI.issueTargetType = "class";
  state.teacherAssignmentsUI.issueStudentId = "";

  // скидаємо review-фільтри, щоб не прилипав старий стан
  state.teacherAssignmentsUI.issuedClassFilter = classCode || "all";
  state.teacherAssignmentsUI.issuedStudentFilter = "all";
  state.teacherAssignmentsUI.issuedStatusFilter = "all";
  state.teacherAssignmentsUI.issuedSearch = "";

  state.teacherUI = state.teacherUI || {};
  state.teacherUI.tab = "assignments";

  save?.();
  await renderCurrentTab();
},

onOpenAssignmentsForStudent: async ({ classCode, studentId, assignmentTitle = "" }) => {
  state.teacherAssignmentsUI = state.teacherAssignmentsUI || {};

  state.teacherAssignmentsUI.mainTab = "review";
  state.teacherAssignmentsUI.issueClassCode = classCode || "";
  state.teacherAssignmentsUI.issueTargetType = "student";
  state.teacherAssignmentsUI.issueStudentId = studentId || "";

  // головне: review працює через issuedStudentFilter
  state.teacherAssignmentsUI.issuedClassFilter = classCode || "all";
  state.teacherAssignmentsUI.issuedStudentFilter = studentId || "all";
  state.teacherAssignmentsUI.issuedStatusFilter = "all";
  state.teacherAssignmentsUI.issuedSearch = assignmentTitle || "";

  state.teacherUI = state.teacherUI || {};
  state.teacherUI.tab = "assignments";

  save?.();
  await renderCurrentTab();
}
});

const dashboardApi = window.App.teacherDashboard.create({
  $,
  state,
  save,
  toast,
  supa,
  onOpenTab: async (tab) => {
    shellApi.setTeacherTab(tab);
    save?.();
    await renderCurrentTab();
  },
  onOpenClass: async (classCode) => {
    shellApi.setTeacherTab("classes");
    save?.();
    await renderCurrentTab();
    await classesApi.openClassByCode(classCode);
  },
  onOpenStudent: async ({ studentId, classCode }) => {
    shellApi.setTeacherTab("classes");
    save?.();
    await renderCurrentTab();
    await classesApi.openStudentById(studentId, classCode);
  }
});

const assignmentsApi = window.App.teacherAssignments.create({
  $,
  state,
  save,
  toast,
  supa,
  onBackToClasses: async () => {
    shellApi.setTeacherTab("classes");
    save?.();
    await renderCurrentTab();
  }
});

    async function renderCurrentTab() {
      const root = $("teacherContent");
      if (!root) return;

      const currentTab = shellApi.getTeacherTab();

      let innerHtml = "";

      if (currentTab === "dashboard") {
        innerHtml = dashboardApi.renderLoading();
      }

if (currentTab === "classes") {
  innerHtml = "";
}

      if (currentTab === "assignments") {
        innerHtml = assignmentsApi.renderLoading();
      }

      root.innerHTML = shellApi.renderShell(innerHtml);

      shellApi.bindTabEvents(async () => {
        save?.();
        await renderCurrentTab();
      });

      if (currentTab === "dashboard") {
        await dashboardApi.mount();
      }

if (currentTab === "classes") {
  await classesApi.mount();
}

      if (currentTab === "assignments") {
        await assignmentsApi.mount();
      }
    }

    function renderDashboard() {
      if (!state.teacherUI) {
        state.teacherUI = { tab: "dashboard" };
      }
      renderCurrentTab();
    }

    return {
      renderDashboard
    };
  }

  return { create };
})();
