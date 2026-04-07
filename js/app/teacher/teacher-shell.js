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

    function renderShell(contentHtml = "") {
      const currentTab = getTeacherTab();

      return `
        <section class="teacher-shell">
<div class="teacher-shell__head">
  <div class="teacher-shell__hero">
    <div class="teacher-shell__hero-badge">
      <i class="ri-dashboard-3-line"></i>
    </div>

    <div class="teacher-shell__hero-copy">
  <div class="teacher-shell__eyebrow">Робочий простір</div>
  <h2 class="teacher-shell__title">Кабінет вчителя</h2>
  <p class="teacher-shell__sub">Класи, учні та завдання — спокійно і без зайвого шуму.</p>
</div>
  </div>
</div>

          <div class="teacher-tabs">
            <button class="teacher-tab ${currentTab === "dashboard" ? "active" : ""}" data-teacher-tab="dashboard">
              <i class="ri-dashboard-3-line"></i>
              <span>Дашборд</span>
            </button>

            <button class="teacher-tab ${currentTab === "classes" ? "active" : ""}" data-teacher-tab="classes">
              <i class="ri-group-line"></i>
              <span>Класи</span>
            </button>

            <button class="teacher-tab ${currentTab === "assignments" ? "active" : ""}" data-teacher-tab="assignments">
              <i class="ri-book-open-line"></i>
              <span>Завдання</span>
            </button>
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
    }

    return {
      getTeacherTab,
      setTeacherTab,
      renderShell,
      bindTabEvents
    };
  }

  return { create };
})();
