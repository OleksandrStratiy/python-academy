window.App = window.App || {};

window.App.teacherDashboard = (function () {
  "use strict";

  function create(deps) {
    const { $, state, save, toast, supa, onOpenTab, onOpenClass } = deps;

    let dashboardClasses = [];
    let dashboardStudents = [];

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
      const {
        data: { user }
      } = await supa.auth.getUser();
      return user?.id || null;
    }

    function getStudentProgress(student) {
      const progress = student?.progress || {};
      progress.user = progress.user || {};
      progress.user.completed = progress.user.completed || {};
      progress.user.attempts = progress.user.attempts || {};
      return progress;
    }

    function getStudentXP(student) {
      return Number(getStudentProgress(student).user?.xp || 0);
    }

    function getStudentAttempts(student) {
      const attempts = getStudentProgress(student).user?.attempts || {};
      return Object.values(attempts).reduce((sum, value) => sum + Number(value || 0), 0);
    }

    function getStudentCompletedCount(student) {
      return Object.keys(getStudentProgress(student).user?.completed || {}).length;
    }

    function formatDate(value) {
      if (!value) return "—";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "—";

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

    function daysSince(value) {
      if (!value) return null;
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return null;
      return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    }

    function getClassStudentCountMap() {
      const map = {};
      dashboardStudents.forEach((student) => {
        const code = student.class_code || "";
        if (!code) return;
        map[code] = (map[code] || 0) + 1;
      });
      return map;
    }

    function getNeedHelpStudents() {
      return [...dashboardStudents]
        .filter((student) => {
          const inactiveDays = daysSince(student.updated_at);
          return (
            getStudentAttempts(student) >= 5 ||
            (inactiveDays !== null && inactiveDays >= 7) ||
            getStudentXP(student) < 100
          );
        })
        .sort((a, b) => {
          const attemptsDiff = getStudentAttempts(b) - getStudentAttempts(a);
          if (attemptsDiff !== 0) return attemptsDiff;
          return getStudentXP(a) - getStudentXP(b);
        })
        .slice(0, 6);
    }

    function getTopStudents() {
      return [...dashboardStudents]
        .sort((a, b) => getStudentXP(b) - getStudentXP(a))
        .slice(0, 5);
    }

    function getMetrics() {
      const totalClasses = dashboardClasses.length;
      const totalStudents = dashboardStudents.length;

      const active7d = dashboardStudents.filter((student) => {
        const d = daysSince(student.updated_at);
        return d !== null && d <= 7;
      }).length;

      const totalXp = dashboardStudents.reduce((sum, student) => sum + getStudentXP(student), 0);
      const avgXp = totalStudents ? Math.round(totalXp / totalStudents) : 0;

      const needHelp = getNeedHelpStudents().length;

      return {
        totalClasses,
        totalStudents,
        active7d,
        avgXp,
        needHelp
      };
    }

    async function fetchDashboardData() {
      if (!supa) {
        dashboardClasses = Array.isArray(state?.user?.teacherClasses) ? state.user.teacherClasses : [];
        dashboardStudents = [];
        return;
      }

      const userId = await getCurrentUserId();
      if (!userId) {
        dashboardClasses = [];
        dashboardStudents = [];
        return;
      }

      const { data: classes, error: classesError } = await supa
        .from("classes")
        .select("code, name, school_name, updated_at")
        .eq("teacher_id", userId)
        .order("updated_at", { ascending: false });

      if (classesError) throw classesError;

      dashboardClasses = classes || [];

      state.user = state.user || {};
      state.user.teacherClasses = dashboardClasses;
      save?.();

      const classCodes = dashboardClasses.map((cls) => cls.code).filter(Boolean);

      if (!classCodes.length) {
        dashboardStudents = [];
        return;
      }

      const { data: students, error: studentsError } = await supa
        .from("profiles")
        .select("id, full_name, progress, updated_at, class_code, role")
        .eq("role", "student")
        .in("class_code", classCodes);

      if (studentsError) throw studentsError;

      dashboardStudents = students || [];
    }

    function renderLoading() {
      return `
        <section class="teacher-panel">
          <section class="teacher-card">
            <div class="teacher-empty">Завантаження дашборду...</div>
          </section>
        </section>
      `;
    }

    function renderClassesBlock() {
      if (!dashboardClasses.length) {
        return `
          <div class="teacher-empty">
            Класів поки немає.<br>
            Спочатку створи клас у вкладці <b>«Класи»</b>.
          </div>
        `;
      }

      const studentCounts = getClassStudentCountMap();

      return `
        <div class="teacher-class-list">
          ${dashboardClasses.map((cls) => `
            <article class="teacher-class-item">
              <div class="teacher-class-item__main">
                <div class="teacher-class-item__title">${escapeHtml(cls.name || cls.code)}</div>
                <div class="teacher-class-item__meta">
                  Код: <b>${escapeHtml(cls.code)}</b>
                  · Учнів: <b>${studentCounts[cls.code] || 0}</b>
                </div>
              </div>

              <div class="teacher-class-item__actions">
                <button
                  class="teacher-btn teacher-btn--ghost"
                  data-dashboard-copy-class="${escapeHtml(cls.code)}"
                  title="Копіювати код"
                >
                  <i class="ri-file-copy-line"></i>
                </button>

                <button
                  class="teacher-btn teacher-btn--ghost"
                  data-dashboard-open-class="${escapeHtml(cls.code)}"
                >
                  Відкрити
                </button>
              </div>
            </article>
          `).join("")}
        </div>
      `;
    }

function renderNeedHelpBlock() {
  const students = getNeedHelpStudents();

  if (!students.length) {
    return `<div class="teacher-empty">Поки немає учнів із явними ризиками.</div>`;
  }

  return `
    <div class="teacher-help-list">
      ${students.map((student) => `
        <div class="teacher-help-item">
          <div>
            <div class="teacher-help-item__name">${escapeHtml(student.full_name || "Без імені")}</div>
            <div class="teacher-help-item__meta">
              ${escapeHtml(student.class_code || "—")} · XP: ${getStudentXP(student)} · Оновлено: ${formatDate(student.updated_at)}
            </div>
          </div>

          <div class="teacher-class-item__actions">
            <div class="teacher-help-item__badge">
              ${getStudentAttempts(student)} спроб
            </div>

            ${
              student.class_code
                ? `
                  <button
                    class="teacher-btn teacher-btn--ghost teacher-btn--small"
                    data-dashboard-open-class="${escapeHtml(student.class_code)}"
                  >
                    До класу
                  </button>
                `
                : ``
            }
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderTopStudentsBlock() {
  const topStudents = getTopStudents();

  if (!topStudents.length) {
    return `<div class="teacher-empty">Ще немає даних про учнів.</div>`;
  }

  return `
    <div class="teacher-help-list">
      ${topStudents.map((student, index) => `
        <div class="teacher-help-item">
          <div>
            <div class="teacher-help-item__name">
              #${index + 1} ${escapeHtml(student.full_name || "Без імені")}
            </div>
            <div class="teacher-help-item__meta">
              ${escapeHtml(student.class_code || "—")} · Виконано: ${getStudentCompletedCount(student)}
            </div>
          </div>

          <div class="teacher-class-item__actions">
            <div class="teacher-help-item__badge">
              ${getStudentXP(student)} XP
            </div>

            ${
              student.class_code
                ? `
                  <button
                    class="teacher-btn teacher-btn--ghost teacher-btn--small"
                    data-dashboard-open-class="${escapeHtml(student.class_code)}"
                  >
                    До класу
                  </button>
                `
                : ``
            }
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

    function render() {
      const teacherName = state?.user?.name || "Вчитель";
      const metrics = getMetrics();

      return `
        <section class="teacher-panel">
          <div class="teacher-hero">
            <div>
              <div class="teacher-kicker">STRATIUM ACADEMY</div>
              <h3 class="teacher-hero__title">Вітаю, ${escapeHtml(teacherName)}</h3>
              <p class="teacher-hero__text">
                Тут уже зібраний живий огляд по твоїх класах, учнях і ризиках.
              </p>
            </div>
          </div>

          <div class="teacher-stats-grid">
            <article class="teacher-stat-card">
              <div class="teacher-stat-card__label">Класи</div>
              <div class="teacher-stat-card__value">${metrics.totalClasses}</div>
            </article>

            <article class="teacher-stat-card">
              <div class="teacher-stat-card__label">Учні</div>
              <div class="teacher-stat-card__value">${metrics.totalStudents}</div>
            </article>

            <article class="teacher-stat-card">
              <div class="teacher-stat-card__label">Активні за 7 днів</div>
              <div class="teacher-stat-card__value">${metrics.active7d}</div>
            </article>

            <article class="teacher-stat-card">
              <div class="teacher-stat-card__label">Середній XP</div>
              <div class="teacher-stat-card__value">${metrics.avgXp}</div>
            </article>
          </div>

          <div class="teacher-grid teacher-grid--2">
            <section class="teacher-card">
              <div class="teacher-card__head">
                <h4>Мої класи</h4>
              </div>
              ${renderClassesBlock()}
            </section>

            <section class="teacher-card">
              <div class="teacher-card__head">
                <h4>Учні, яким потрібна допомога</h4>
              </div>
              ${renderNeedHelpBlock()}
            </section>
          </div>

          <section class="teacher-card">
            <div class="teacher-card__head">
              <h4>Топ учнів</h4>
            </div>
            ${renderTopStudentsBlock()}
          </section>
        </section>
      `;
    }

    function bindEvents() {
      Array.from(document.querySelectorAll("[data-dashboard-copy-class]")).forEach((btn) => {
        btn.addEventListener("click", async () => {
          const code = btn.getAttribute("data-dashboard-copy-class");
          if (!code) return;

          try {
            await navigator.clipboard.writeText(code);
            toast?.("✅ Код класу скопійовано");
          } catch (err) {
            console.error(err);
            toast?.("❌ Не вдалося скопіювати код");
          }
        });
      });

      Array.from(document.querySelectorAll("[data-dashboard-open-class]")).forEach((btn) => {
        btn.addEventListener("click", async () => {
          const classCode = btn.getAttribute("data-dashboard-open-class");
          if (!classCode) return;
          await onOpenClass?.(classCode);
        });
      });

      Array.from(document.querySelectorAll("[data-dashboard-open-tab]")).forEach((btn) => {
        btn.addEventListener("click", async () => {
          const tab = btn.getAttribute("data-dashboard-open-tab");
          if (!tab) return;
          await onOpenTab?.(tab);
        });
      });
    }

    async function mount() {
      const root = $("teacherInnerView");
      if (!root) return;

      root.innerHTML = renderLoading();

      try {
        await fetchDashboardData();
        root.innerHTML = render();
        bindEvents();
      } catch (err) {
        console.error(err);
        root.innerHTML = `
          <section class="teacher-panel">
            <section class="teacher-card">
              <div class="teacher-empty">Не вдалося завантажити дашборд.</div>
            </section>
          </section>
        `;
        toast?.("❌ Не вдалося завантажити дашборд");
      }
    }

    return {
      renderLoading,
      mount
    };
  }

  return { create };
})();