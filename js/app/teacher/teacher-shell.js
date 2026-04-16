window.App = window.App || {};

window.App.teacherShell = (function () {
  "use strict";

  function create(deps) {
    const { $, state } = deps;

    function getTeacherTab() {
      return state.teacherUI?.tab || "dashboard";
    }

    function setTeacherTab(tab) {
      state.teacherUI = state.teacherUI || {};
      state.teacherUI.tab = tab;
    }

    function getTeacherAssignmentsTab() {
      const raw = state.teacherAssignmentsUI?.mainTab || "issue";
      if (raw === "bank") return "issue";
      if (raw === "grading") return "review";
      return ["issue", "review"].includes(raw) ? raw : "issue";
    }

    function setTeacherAssignmentsTab(tab) {
      state.teacherAssignmentsUI = state.teacherAssignmentsUI || {};
      state.teacherAssignmentsUI.mainTab = tab === "review" ? "review" : "issue";
    }

function renderShell(contentHtml = "") {
  const currentTab = getTeacherTab();
  const currentAssignmentsTab = getTeacherAssignmentsTab();
  const assignmentsActive = currentTab === "assignments";

  return `
    <section class="teacher-shell teacher-shell--v2">
      <div class="teacher-shell__head teacher-shell__head--simple">
        <div class="teacher-shell__title-wrap">
          <h2 class="teacher-shell__title">Кабінет вчителя</h2>
          <p class="teacher-shell__sub">Класи, учні та завдання</p>
        </div>
      </div>

      <div class="teacher-shell__navline">
        <div class="teacher-tabs teacher-tabs--unified">
          <button
            type="button"
            class="teacher-tab ${currentTab === "dashboard" ? "active" : ""}"
            data-teacher-tab="dashboard"
          >
            <i class="ri-dashboard-3-line"></i>
            <span>Дашборд</span>
          </button>

          <button
            type="button"
            class="teacher-tab ${currentTab === "classes" ? "active" : ""}"
            data-teacher-tab="classes"
          >
            <i class="ri-group-line"></i>
            <span>Класи</span>
          </button>

          <span class="teacher-tabs__divider" aria-hidden="true"></span>

          <button
            type="button"
            class="teacher-tab teacher-tab--task ${assignmentsActive && currentAssignmentsTab === "issue" ? "active" : ""}"
            data-teacher-assignments-tab="issue"
          >
            <i class="ri-book-open-line"></i>
            <span>Завдання</span>
          </button>

          <button
            type="button"
            class="teacher-tab teacher-tab--task ${assignmentsActive && currentAssignmentsTab === "review" ? "active" : ""}"
            data-teacher-assignments-tab="review"
          >
            <i class="ri-check-double-line"></i>
            <span>Перевірити</span>
          </button>
        </div>
      </div>

      <div id="teacherInnerView" class="teacher-inner-view">
        ${contentHtml}
      </div>
    </section>
  `;
}

    function bindTabEvents(onChange) {
      const root = $("teacherContent");
      if (!root) return;

      root.querySelectorAll("[data-teacher-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-teacher-tab");
          setTeacherTab(tab);
          if (typeof onChange === "function") onChange(tab);
        });
      });

      root.querySelectorAll("[data-teacher-assignments-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-teacher-assignments-tab");
          setTeacherTab("assignments");
          setTeacherAssignmentsTab(tab);
          if (typeof onChange === "function") onChange("assignments");
        });
      });
    }

    return {
      getTeacherTab,
      setTeacherTab,
      getTeacherAssignmentsTab,
      setTeacherAssignmentsTab,
      renderShell,
      bindTabEvents
    };
  }

  return { create };
})();
