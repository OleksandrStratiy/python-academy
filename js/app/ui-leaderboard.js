window.App = window.App || {};

window.App.uiLeaderboard = (function () {
  "use strict";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function create(deps) {
    const {
      $,
      state,
      supa,
      toast,
      setActiveView,
      viewLeaderboard
    } = deps;

    function sortBoard(rows) {
      return rows
        .slice()
        .sort((a, b) => {
          if ((b.xp || 0) !== (a.xp || 0)) return (b.xp || 0) - (a.xp || 0);
          if ((b.streak || 0) !== (a.streak || 0)) return (b.streak || 0) - (a.streak || 0);
          return String(a.name || "").localeCompare(String(b.name || ""), "uk");
        })
        .slice(0, 100);
    }

    function dedupeRows(rows) {
      const merged = new Map();

      rows.forEach((u) => {
        const key = u.id || `${String(u.name || "").trim().toLowerCase()}|${String(u.class_code || "")}`;

        const prev = merged.get(key);
        if (
          !prev ||
          (u.xp || 0) > (prev.xp || 0) ||
          ((u.xp || 0) === (prev.xp || 0) && (u.streak || 0) > (prev.streak || 0))
        ) {
          merged.set(key, u);
        }
      });

      return [...merged.values()];
    }

    async function loadClassesMap() {
      if (!supa) return {};

      const { data, error } = await supa
        .from("classes")
        .select("code, name, school_name, show_class_in_global, show_school_in_global, show_school_in_class");

      if (error) throw error;

      const map = {};
      (data || []).forEach((c) => {
        map[c.code] = {
          name: c.name || null,
          school_name: c.school_name || null,
          show_class_in_global: !!c.show_class_in_global,
          show_school_in_global: !!c.show_school_in_global,
          show_school_in_class: !!c.show_school_in_class
        };
      });

      return map;
    }

    function normalizeProfileRows(data, classesMap) {
      return (data || [])
        .map((row) => {
          const user = row?.progress?.user || {};
          const classCode = row.class_code || user.class_code || null;
          const classMeta = classCode ? classesMap[classCode] || {} : {};

          return {
            id: row.id || null,
            name: row.full_name || user.name || "Анонім",
            xp: Number(user.xp || 0),
            streak: Number(user.streak || 1),
            class_code: classCode,
            class_name: classMeta.name || null,
            school_name: classMeta.school_name || null,
            show_class_in_global: !!classMeta.show_class_in_global,
            show_school_in_global: !!classMeta.show_school_in_global,
            show_school_in_class: !!classMeta.show_school_in_class,
            role: row.role || user.role || "student"
          };
        })
        .filter((u) => u.role === "student");
    }

    function normalizeLocalRows() {
      if (!state.user) return [];

      return [{
        id: "local-me",
        name: state.user.name || "Я",
        xp: Number(state.user.xp || 0),
        streak: Number(state.user.streak || 1),
        class_code: state.user.class_code || null,
        class_name: null,
        school_name: null,
        show_class_in_global: false,
        show_school_in_global: false,
        show_school_in_class: false
      }];
    }

    function renderTags(user, mode) {
      const tags = [];

      if (mode === "global") {
        if (user.class_name && user.show_class_in_global) {
          tags.push(`<div class="tag">🏫 ${escapeHtml(user.class_name)}</div>`);
        }
        if (user.school_name && user.show_school_in_global) {
          tags.push(`<div class="tag">🎓 ${escapeHtml(user.school_name)}</div>`);
        }
      }

      if (mode === "class") {
        if (user.school_name && user.show_school_in_class) {
          tags.push(`<div class="tag">🎓 ${escapeHtml(user.school_name)}</div>`);
        }
      }

      return tags.join("");
    }

    function renderBoardList(rows, meId, mode) {
      if (!rows.length) {
        return `
          <div style="text-align:center; padding:40px 20px; color:var(--text-dim); font-weight:700;">
            Рейтинг поки порожній.
          </div>
        `;
      }

      return rows.map((u, i) => {
        const medal =
          i === 0 ? "🥇" :
          i === 1 ? "🥈" :
          i === 2 ? "🥉" : `#${i + 1}`;

        const isMe = !!(meId && u.id && meId === u.id);

        return `
          <div class="rowBoard ${isMe ? "me" : ""}">
            <div style="display:flex; align-items:center; gap:12px; min-width:0;">
              <div style="min-width:52px; font-weight:900; color:var(--primary);">${medal}</div>
              <div style="min-width:0;">
                <div style="font-weight:900; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${escapeHtml(u.name)}
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:4px;">
                  <div class="tag">🔥 ${u.streak || 1} дн. стріку</div>
                  ${renderTags(u, mode)}
                </div>
              </div>
            </div>

            <div style="font-weight:900; color:var(--text); white-space:nowrap;">
              ${u.xp || 0} XP
            </div>
          </div>
        `;
      }).join("");
    }

    async function renderLeaderboard() {
      setActiveView(viewLeaderboard);
      $("breadcrumbs").innerText = "🏆 Рейтинг Академії";

      const listEl = $("leaderboardList");
      if (!listEl) return;

      listEl.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:var(--text-dim); font-weight:700; font-size:16px;">
          Завантаження рейтингу... ⏳
        </div>
      `;

      try {
        let meId = null;
        let rows = [];
        let classesMap = {};

        if (supa) {
          const [{ data: authData }, classes, profiles] = await Promise.all([
            supa.auth.getUser(),
            loadClassesMap(),
            supa
              .from("profiles")
              .select("id, full_name, class_code, role, progress, updated_at")
              .eq("role", "student")
          ]);

          meId = authData?.user?.id || null;
          classesMap = classes || {};

          if (profiles.error) throw profiles.error;

          rows = normalizeProfileRows(profiles.data, classesMap);

          if (state.user?.role === "local") {
            meId = "local-me";
            rows = rows.concat(normalizeLocalRows());
          }
        } else {
          meId = "local-me";
          rows = normalizeLocalRows();
        }

        const merged = dedupeRows(rows);
        const globalBoard = sortBoard(merged);

        const myClassCode = state.user?.class_code || null;
        const myClassMeta = myClassCode ? classesMap[myClassCode] || {} : {};
        const myClassTitle = myClassMeta.name || (myClassCode ? `Клас ${myClassCode}` : "Мій клас");

        const classBoard = myClassCode
          ? sortBoard(merged.filter((u) => (u.class_code || null) === myClassCode))
          : [];

        const hasClassBoard = !!myClassCode;

        listEl.innerHTML = `
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px;">
            <button id="lbTabGlobal" class="menu-btn active" style="width:auto; padding:10px 16px;">
              🌍 Загальний рейтинг
            </button>
            ${
              hasClassBoard
                ? `
                  <button id="lbTabClass" class="menu-btn" style="width:auto; padding:10px 16px;">
                    🏫 ${escapeHtml(myClassTitle)}
                  </button>
                `
                : ""
            }
          </div>

          <div id="leaderboardMeta" class="mutedish tiny" style="margin-bottom:12px;"></div>
          <div id="leaderboardInner"></div>
        `;

        const inner = $("leaderboardInner");
        const meta = $("leaderboardMeta");
        const btnGlobal = $("lbTabGlobal");
        const btnClass = $("lbTabClass");

        function activate(which) {
          if (btnGlobal) btnGlobal.classList.toggle("active", which === "global");
          if (btnClass) btnClass.classList.toggle("active", which === "class");

          if (which === "class" && hasClassBoard) {
            meta.textContent = `Учнів у рейтингу класу: ${classBoard.length}`;
            inner.innerHTML = renderBoardList(classBoard, meId, "class");
          } else {
            meta.textContent = `Усього учнів у рейтингу: ${globalBoard.length}`;
            inner.innerHTML = renderBoardList(globalBoard, meId, "global");
          }
        }

        if (btnGlobal) btnGlobal.onclick = () => activate("global");
        if (btnClass) btnClass.onclick = () => activate("class");

        activate("global");
      } catch (e) {
        console.error(e);
        listEl.innerHTML = `
          <div style="text-align:center; padding:40px 20px; color:var(--danger); font-weight:700;">
            Не вдалося завантажити рейтинг.
          </div>
        `;
        toast("Не вдалося завантажити рейтинг");
      }
    }

    return { renderLeaderboard };
  }

  return { create };
})();
