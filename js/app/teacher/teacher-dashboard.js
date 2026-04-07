window.App = window.App || {};

window.App.teacherDashboard = (function () {
  "use strict";

  function create(deps) {
    const { $, state, save, toast, supa, onOpenTab, onOpenClass, onOpenStudent } = deps;

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
function getClassLabel(classCode) {
  const cls = dashboardClasses.find((item) => item.code === classCode);

  if (!cls && !classCode) return "Без класу";
  if (!cls) return classCode || "—";

  if (cls.name && cls.code) {
    return `${cls.name} (${cls.code})`;
  }

  return cls.name || cls.code || "—";
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
    <div class="teacher-class-list teacher-class-list--dashboard">
      ${dashboardClasses.map((cls) => `
        <article
          class="teacher-class-item teacher-class-item--dashboard"
          data-dashboard-open-class="${escapeHtml(cls.code)}"
          tabindex="0"
          role="button"
        >
          <div class="teacher-class-item__main">
            <div class="teacher-class-item__title">${escapeHtml(cls.name || cls.code)}</div>
<div class="teacher-class-item__meta">
  Код: <b>${escapeHtml(cls.code)}</b>
  · Учнів: <b>${studentCounts[cls.code] || 0}</b>
  ${cls.school_name ? ` · Школа: <b>${escapeHtml(cls.school_name)}</b>` : ""}
</div>

<div class="teacher-class-item__meta">
  Оновлено: <b>${escapeHtml(formatDate(cls.updated_at))}</b>
</div>
          </div>

          <div class="teacher-class-item__actions">
            <button
              class="teacher-btn teacher-btn--ghost teacher-btn--small"
              data-dashboard-copy-class="${escapeHtml(cls.code)}"
              title="Копіювати код"
              type="button"
            >
              <i class="ri-file-copy-line"></i>
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
        <article
          class="teacher-help-item teacher-help-item--clickable"
          data-dashboard-open-student="${escapeHtml(student.id)}"
          data-dashboard-open-student-class="${escapeHtml(student.class_code || "")}"
          tabindex="0"
          role="button"
        >
          <div>
            <div class="teacher-help-item__name">${escapeHtml(student.full_name || "Без імені")}</div>
            <div class="teacher-help-item__meta">
              ${escapeHtml(getClassLabel(student.class_code))}
              · XP: ${getStudentXP(student)}
              · Оновлено: ${formatDate(student.updated_at)}
            </div>
          </div>

          <div class="teacher-class-item__actions">
            <div class="teacher-help-item__badge">
              ${getStudentAttempts(student)} спроб
            </div>
          </div>
        </article>
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
        <article
          class="teacher-help-item teacher-help-item--clickable"
          data-dashboard-open-student="${escapeHtml(student.id)}"
          data-dashboard-open-student-class="${escapeHtml(student.class_code || "")}"
          tabindex="0"
          role="button"
        >
          <div>
            <div class="teacher-help-item__name">
              #${index + 1} ${escapeHtml(student.full_name || "Без імені")}
            </div>
            <div class="teacher-help-item__meta">
              ${escapeHtml(getClassLabel(student.class_code))}
              · Виконано: ${getStudentCompletedCount(student)}
            </div>
          </div>

          <div class="teacher-class-item__actions">
            <div class="teacher-help-item__badge">
              ${getStudentXP(student)} XP
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function render() {
  const teacherName = state?.user?.name || "Вчитель";
  const metrics = getMetrics();

  return `
    <div class="teacher-shell">
      
      <div class="teacher-dashboard-hero" style="margin-bottom: 20px;">
        <div class="teacher-dashboard-hero__main">
          <div class="teacher-shell__eyebrow">ОГЛЯД</div>
          <h2 class="teacher-dashboard-hero__title">Привіт, ${escapeHtml(teacherName)}! 👋</h2>
          
          <p class="teacher-dashboard-hero__text">Ось що відбувається у твоїх <b>${metrics.totalClasses}</b> класах сьогодні. Тримай руку на пульсі.</p>
          
          <div class="teacher-dashboard-hero__actions">
            <button class="teacher-btn teacher-btn--primary" type="button" data-dashboard-open-tab="assignments">
              <i class="ri-add-line"></i> Видати завдання
            </button>
            <button class="teacher-btn teacher-btn--ghost" type="button" data-dashboard-open-tab="classes">
              <i class="ri-user-add-line"></i> Новий клас
            </button>
          </div>
        </div>
        
        <div class="teacher-dashboard-hero__side" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-content: center;">
          
          <div class="teacher-dashboard-mini-stat">
            <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Всіх учнів</div>
            <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${metrics.totalStudents}</div>
          </div>
          
          <div class="teacher-dashboard-mini-stat" style="border-left-color: var(--success);">
            <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Активні (7д)</div>
            <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px; color: var(--success);">${metrics.active7d}</div>
          </div>
          
          <div class="teacher-dashboard-mini-stat">
            <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">Середній XP</div>
            <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${metrics.avgXp}</div>
          </div>
          
          <div class="teacher-dashboard-mini-stat teacher-dashboard-mini-stat--warn">
            <div class="teacher-dashboard-mini-stat__label" style="font-size: 11px;">В ризику</div>
            <div class="teacher-dashboard-mini-stat__value" style="font-size: 20px;">${metrics.needHelp}</div>
          </div>

        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; align-items: start;">
        
        <div class="teacher-card">
          <div class="teacher-card__head">
            <h4>🚨 Потребують допомоги</h4>
          </div>
          <div class="dash-scroll-wrap">
            ${renderNeedHelpBlock()}
          </div>
        </div>

        <div class="teacher-card">
          <div class="teacher-card__head">
            <h4>🏆 Топ учнів</h4>
          </div>
          <div class="dash-scroll-wrap">
            ${renderTopStudentsBlock()}
          </div>
        </div>

<div class="teacher-card">
          <div class="teacher-card__head" style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="margin: 0;">🏫 Мої класи</h4>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--primary); background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.2); padding: 4px 10px; border-radius: 8px; font-weight: 600;">
              <i class="ri-folder-2-line"></i> Усього: ${metrics.totalClasses}
            </div>
          </div>
          <div class="dash-scroll-wrap">
            ${renderClassesBlock()}
          </div>
        </div>

      </div>
    </div>
  `;
}

function bindEvents() {
  Array.from(document.querySelectorAll("[data-dashboard-copy-class]")).forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();

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

  Array.from(document.querySelectorAll("[data-dashboard-open-class]")).forEach((card) => {
    card.addEventListener("click", async () => {
      const classCode = card.getAttribute("data-dashboard-open-class");
      if (!classCode) return;
      await onOpenClass?.(classCode);
    });

    card.addEventListener("keydown", async (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();

      const classCode = card.getAttribute("data-dashboard-open-class");
      if (!classCode) return;
      await onOpenClass?.(classCode);
    });
  });

  Array.from(document.querySelectorAll("[data-dashboard-open-student]")).forEach((item) => {
    item.addEventListener("click", async () => {
      const studentId = item.getAttribute("data-dashboard-open-student");
      const classCode = item.getAttribute("data-dashboard-open-student-class");

      if (!studentId) return;
      await onOpenStudent?.({ studentId, classCode });
    });

    item.addEventListener("keydown", async (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();

      const studentId = item.getAttribute("data-dashboard-open-student");
      const classCode = item.getAttribute("data-dashboard-open-student-class");

      if (!studentId) return;
      await onOpenStudent?.({ studentId, classCode });
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
