window.App = window.App || {};

window.App.uiTeacher = (function () {
  "use strict";

  function create(deps) {
    const { $, supa, state, toast } = deps;

    async function renderDashboard() {
      const content = $("teacherContent");
      if (!content) return;

      // 1. Перевіряємо, чи вчитель задав свій код класу
      const teacherClassCode = state.user?.class_code;
      
      if (!teacherClassCode) {
        content.innerHTML = `
          <div style="text-align:center; padding: 40px; background: rgba(251,191,36,0.05); border: 1px solid var(--warn); border-radius: 16px;">
            <div style="font-size: 40px; margin-bottom: 10px;">⚠️</div>
            <h3 style="color: var(--warn); margin-bottom: 10px;">Код класу не задано</h3>
            <p style="color: var(--text-dim); margin-bottom: 20px;">Щоб бачити своїх учнів, тобі потрібно придумати унікальний код класу (наприклад, <b>PY-2026</b>) і передати його їм.</p>
            
            <div style="display:flex; justify-content:center; gap: 10px; max-width: 400px; margin: 0 auto;">
              <input type="text" id="newClassInput" placeholder="Введи код класу..." style="margin-bottom:0; text-transform:uppercase;">
              <button id="btnCreateClass" class="btn-primary" style="width: auto; padding: 0 20px;">Створити</button>
            </div>
          </div>
        `;

        // Обробник створення класу
        setTimeout(() => {
          const btn = document.getElementById("btnCreateClass");
          if (btn) {
            btn.onclick = async () => {
              const code = document.getElementById("newClassInput").value.trim().toUpperCase();
              if (!code) return toast("⚠️ Введи код!");
              
              btn.textContent = "⏳...";
              try {
                const { data: { user } } = await supa.auth.getUser();
                await supa.from("profiles").update({ class_code: code }).eq("id", user.id);
                
                state.user.class_code = code;
                window.App.storage.save(state);
                
                toast(`✅ Клас ${code} створено!`);
                // Оновлюємо сайдбар і сам кабінет
                if (window.App.sidebar) {
                   const sbApi = window.App.sidebar.create({ $, DB: window.DB, goto: window.goto, routeParse: window.routeParse, escapeHtml: window.App.helpers.escapeHtml, state });
                   sbApi.renderSidebarHome();
                }
                renderDashboard();
              } catch (e) {
                console.error(e);
                toast("❌ Помилка створення класу");
                btn.textContent = "Створити";
              }
            };
          }
        }, 50);
        return;
      }

      // 2. Якщо код є — завантажуємо учнів
      content.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-dim);">Шукаємо учнів класу <b style="color:var(--text);">${teacherClassCode}</b>... ⏳</div>`;

      try {
        const { data: students, error } = await supa
          .from("profiles")
          .select("full_name, progress, updated_at")
          .eq("role", "student")
          .eq("class_code", teacherClassCode)
          .order("updated_at", { ascending: false });

        if (error) throw error;

        // 3. Якщо учнів поки немає
        if (!students || students.length === 0) {
          content.innerHTML = `
            <div style="text-align:center; padding: 40px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 16px;">
              <div style="font-size: 40px; margin-bottom: 10px;">🎒</div>
              <h3 style="margin-bottom: 10px;">Твій клас поки порожній</h3>
              <p style="color: var(--text-dim);">Попроси учнів зареєструватися та ввести код: <b style="color:var(--primary); font-size:16px;">${teacherClassCode}</b></p>
            </div>
          `;
          return;
        }

        // 4. Малюємо красиву таблицю
        let html = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <h3 style="margin:0;">Клас: <span style="color: var(--primary);">${teacherClassCode}</span></h3>
            <div class="badge badge-muted">Учнів: ${students.length}</div>
          </div>
          
          <div class="cardx" style="overflow-x: auto; margin-bottom:0;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <thead>
                <tr style="background: rgba(0,0,0,0.2); border-bottom: 1px solid var(--border); color: var(--text-dim);">
                  <th style="padding: 14px 16px; font-weight:900;">Учень</th>
                  <th style="padding: 14px 16px; font-weight:900;">Досвід (XP)</th>
                  <th style="padding: 14px 16px; font-weight:900;">Стрік</th>
                  <th style="padding: 14px 16px; font-weight:900;">Остання активність</th>
                </tr>
              </thead>
              <tbody>
        `;

        students.forEach(s => {
          // Дістаємо дані прогресу (вони лежать у полі progress, яке ми зберігаємо через cloudSaveState)
          const prog = s.progress?.user || {};
          const xp = prog.xp || 0;
          const streak = prog.streak || 1;
          
          // Форматуємо дату
          const dateStr = s.updated_at 
            ? new Date(s.updated_at).toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', hour: '2-digit', minute:'2-digit' }) 
            : "Невідомо";

          html += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'">
              <td style="padding: 16px; font-weight: 700; color: var(--text);">${window.App.helpers.escapeHtml(s.full_name || prog.name || "Без імені")}</td>
              <td style="padding: 16px; color: var(--success); font-weight: 900;">${xp} XP</td>
              <td style="padding: 16px; color: var(--warn); font-weight: 900;">🔥 ${streak} дн.</td>
              <td style="padding: 16px; color: var(--text-dim); font-size: 12px;">${dateStr}</td>
            </tr>
          `;
        });

        html += `</tbody></table></div>`;
        content.innerHTML = html;

      } catch (e) {
        console.error("Помилка завантаження учнів:", e);
        content.innerHTML = `<div style="color:var(--danger); padding: 20px; text-align:center;">❌ Помилка зв'язку з базою даних.</div>`;
      }
    }

    return { renderDashboard };
  }

  return { create };
})();