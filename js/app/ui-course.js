window.App = window.App || {};

window.App.uiCourse = (function () {
  "use strict";

  function create(deps) {
    const {
      $,
      DB,
      LEVELS,
      escapeHtml,
      moduleProgress,
      getCourseLevel,
      setCourseLevel,
      setActiveView,
      viewModules,
      renderSidebarModulesOnly,
      goto,
      toast
    } = deps;

    function renderCourseModules(courseId) {
      const course = DB.find(c => c.id === courseId);
      if (!course) {
        toast("Курс не знайдено");
        goto("/home");
        return;
      }

      setActiveView(viewModules);
      $("breadcrumbs").innerHTML = `<span class="crumb" data-crumb-home style="cursor:pointer">Головна</span> / ${escapeHtml(course.title)}`;
      $("modulesTitle").textContent = course.title;

      const currentLvl = (typeof getCourseLevel === "function" ? getCourseLevel(course.id) : null) || "Junior";
      if (!getCourseLevel(course.id)) {
        toast("👋 Спочатку обери складність зверху — потім відкривай модулі 🙂");
      }

      const levelsHtml = LEVELS.map(l => {
        const isActive = l.id === currentLvl;
        const icon = l.title.split(" ")[0];
        const name = l.title.split(" ")[1];

        return `
          <button class="lvl-btn ${isActive ? "active" : ""}" data-set-lvl="${l.id}">
            <div class="lvl-icon">${icon}</div>
            <div class="lvl-info">
              <div class="lvl-name">${name}</div>
              <div class="lvl-desc">${escapeHtml(l.desc)}</div>
            </div>
          </button>
        `;
      }).join("");

      $("modulesDesc").innerHTML = `
        <p style="color: var(--text-dim); margin-bottom: 20px; font-size: 16px;">${escapeHtml(course.desc || "Обери модуль")}</p>

        <div class="level-selector-inline" id="levelCards">
          <div class="level-selector-header">
            <span>🎚️ Обери складність курсу</span>
            <div class="info-tooltip">
              <i class="ri-question-line"></i>
              <div class="tooltip-text">Від рівня залежить складність завдань у модулях. Ти можеш змінити його будь-коли без втрати прогресу!</div>
            </div>
          </div>
          <div class="level-options">
            ${levelsHtml}
          </div>
        </div>
      `;

      document.querySelectorAll("[data-set-lvl]").forEach(btn => {
        btn.onclick = () => {
          const newLvl = btn.getAttribute("data-set-lvl");
          if (newLvl !== currentLvl) {
            setCourseLevel(course.id, newLvl);
            renderCourseModules(course.id);
            toast(`Рівень змінено на ${LEVELS.find(x => x.id === newLvl).title}`);
          }
        };
      });

      const list = $("modulesList");
      list.innerHTML = course.modules.map(m => {
        const mp = moduleProgress(course.id, m.id);
        const pct = mp.total ? Math.round((mp.done / mp.total) * 100) : 0;

        return `
          <div class="card" data-open-module="${course.id}|${m.id}">
            <div style="font-size:34px; margin-bottom:10px; color:${m.color || "inherit"}">${m.icon ? `<i class="${m.icon}"></i>` : "📘"}</div>            <h3>${escapeHtml(m.title)}</h3>
            <p>${escapeHtml(m.desc || "Практика + мініконтроль")}</p>
            <div class="progress-line"><div class="progress-fill" style="width:${pct}%"></div></div>
            <div style="font-size:12px; margin-top:6px; color:var(--text-dim); text-align:right">${mp.done}/${mp.total} • ${pct}%</div>
          </div>
        `;
      }).join("");

      list.querySelectorAll("[data-open-module]").forEach(card => {
        card.addEventListener("click", () => {
          const [cid, mid] = card.getAttribute("data-open-module").split("|");
          goto(`/lesson/${cid}/${mid}/0`);
        });
      });

      document.querySelectorAll("[data-crumb-home]").forEach(el => {
        el.onclick = () => goto("/home");
      });

      renderSidebarModulesOnly(courseId);
    }

    return {
      renderCourseModules
    };
  }

  return { create };
})();