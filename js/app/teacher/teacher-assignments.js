window.App = window.App || {};

window.App.teacherAssignments = (function () {
  "use strict";

  function create(deps) {
    const { $, state, save, toast, supa, onBackToClasses } = deps;

    const store = window.App.teacherAssignmentStore.create({
      state, save, toast, supa
    });

    let teacherClasses = [];
    let classStudents = [];
    let taskBank = [];
    let assignments = [];
    let submissions = [];

    // ==================================================
    // 1. СТАН UI
    // ==================================================
    function ensureUiState() {
      state.teacherAssignmentsUI = state.teacherAssignmentsUI || {
        mainTab: "bank", 
        bankCategory: "mine", 
        isCreatingTask: false,
        selectedTaskId: "",
        selectedAutoModuleId: "",
        issueClassCode: "",
        issueTargetType: "class",
        issueStudentId: "",
        issuedSearch: "",
        issuedClassFilter: "all",
        issuedStatusFilter: "all"
      };

      if (!("mainTab" in state.teacherAssignmentsUI)) state.teacherAssignmentsUI.mainTab = "bank";
      if (!("bankCategory" in state.teacherAssignmentsUI)) state.teacherAssignmentsUI.bankCategory = "mine";
      
      return state.teacherAssignmentsUI;
    }

    function escapeHtml(str) {
      return String(str || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function formatDate(value) {
      if (!value) return "Без дедлайну";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "Без дедлайну";
      return d.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" }) + " " +
             d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
    }

    function shorten(text, limit = 140) {
      const value = String(text || "").trim();
      if (!value) return "";
      return value.length > limit ? value.slice(0, limit).trim() + "…" : value;
    }

    // ==================================================
    // 2. ІНТЕГРАЦІЯ З АВТО-ПРАКТИКУМАМИ
    // ==================================================
    function getAutoModules() {
      const allModules = [];
      (window.PRACTICE_DB || []).forEach(item => {
        if (!item.modules) {
          allModules.push({ courseId: "practice", courseTitle: "Практикум", ...item });
        } else {
          item.modules.forEach(mod => allModules.push({ courseId: item.id, courseTitle: item.title || item.id, ...mod }));
        }
      });
      return allModules;
    }

    function getFilteredTaskBank() {
      // Ховаємо системні "тіньові" авто-завдання з ручного списку
      return taskBank.filter((task) => task.source !== "library" && !(task.starter_code || "").startsWith("auto|")); 
    }

    function getFilteredAssignments() {
      const ui = ensureUiState();
      const q = String(ui.issuedSearch || "").trim().toLowerCase();
      const classFilter = ui.issuedClassFilter || "all";
      const statusFilter = ui.issuedStatusFilter || "all";

      return assignments.filter((item) => {
        const matchesSearch = !q || String(item.title_snapshot || "").toLowerCase().includes(q) || String(item.class_code || "").toLowerCase().includes(q);
        const matchesClass = classFilter === "all" || String(item.class_code || "") === String(classFilter);
        let matchesStatus = true;
        if (statusFilter !== "all") {
          if (statusFilter === "submitted") {
            const subs = getSubmissionsForAssignment(item.id);
            matchesStatus = subs.some(s => s.status === "submitted" || s.status === "review");
          } else {
            matchesStatus = String(item.status || "active") === String(statusFilter);
          }
        }
        return matchesSearch && matchesClass && matchesStatus;
      });
    }

    function getSubmissionsForAssignment(assignmentId) {
      return submissions.filter((item) => item.assignment_id === assignmentId);
    }

    function renderSubmissionStatusBadge(status) {
      const s = String(status || "submitted");
      let cls = ""; let lbl = "Здано";
      if (s === "submitted") { cls = "teacher-pill--warn"; lbl = "Здано"; }
      if (s === "review") { cls = "teacher-pill--accent"; lbl = "На перевірці"; }
      if (s === "reviewed") { cls = "teacher-pill--success"; lbl = "Оцінено"; }
      if (s === "returned") { cls = "teacher-pill--danger"; lbl = "Доопрацювати"; }
      return `<span class="teacher-pill ${cls}">${escapeHtml(lbl)}</span>`;
    }

    function renderAssignmentStatusBadge(status) {
      const s = String(status || "active");
      let cls = ""; let lbl = "Активне";
      if (s === "closed") { cls = "teacher-pill--ghost"; lbl = "Закрито"; }
      return `<span class="teacher-pill ${cls}">${escapeHtml(lbl)}</span>`;
    }

    function renderBadges(task) {
      return `
        <div class="teacher-pills">
          <span class="teacher-pill">${task.solution_format === "code" ? "Код" : task.solution_format === "text" ? "Текст" : "Файл"}</span>
          <span class="teacher-pill">${task.max_score} б.</span>
          ${task.is_public ? `<span class="teacher-pill teacher-pill--accent">Публічне</span>` : ``}
        </div>
      `;
    }

    // ==================================================
    // 4. Вкладка 1: БАЗА ЗАВДАНЬ (Task Bank)
    // ==================================================
    function renderCreateTaskForm() {
      return `
        <section class="teacher-card" style="border-color: rgba(14, 165, 233, 0.3); background: rgba(14, 165, 233, 0.02);">
          <div class="teacher-card__head" style="margin-bottom: 16px;">
            <div>
              <h4 style="margin: 0; color: var(--primary);"><i class="ri-add-box-line"></i> Створити нове завдання</h4>
              <p class="teacher-muted" style="margin-top: 4px;">Додай завдання для ручної перевірки у свою базу</p>
            </div>
          </div>
          <form id="teacherTaskBankForm" style="display: flex; flex-direction: column; gap: 12px;">
            <input class="teacher-input" name="title" placeholder="Назва завдання" required style="margin: 0;">
            <textarea class="teacher-input" name="description" rows="5" placeholder="Умова завдання" required style="margin: 0;"></textarea>
            <div style="display: flex; gap: 12px;">
              <select class="teacher-input" name="solutionFormat" style="margin: 0; flex: 1;">
                <option value="code">Формат здачі: Код</option>
                <option value="text">Формат здачі: Текст</option>
              </select>
              <input class="teacher-input" name="maxScore" type="number" min="1" max="100" value="12" placeholder="Макс. бал" style="margin: 0; width: 120px;">
            </div>
            <textarea class="teacher-input" name="starterCode" rows="4" placeholder="Стартовий код (необов'язково)" style="margin: 0; font-family: var(--mono); font-size: 12px;"></textarea>
            
            <label class="teacher-check" style="margin: 4px 0;">
              <input type="checkbox" name="isPublic">
              <span>Зробити доступним для інших вчителів</span>
            </label>
            
            <button class="teacher-btn teacher-btn--primary" type="submit" style="margin: 0; width: 100%;">
              <i class="ri-save-line"></i> Зберегти в базу
            </button>
          </form>
        </section>
      `;
    }

    function renderManualTaskPreview() {
      const ui = ensureUiState();
      const task = getFilteredTaskBank().find((item) => item.id === ui.selectedTaskId);

      if (!task) return `<div class="teacher-empty">Вибери завдання зі списку зліва.</div>`;

      return `
        <section class="teacher-card">
          <div class="teacher-card__head" style="margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--primary); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 4px;">Ручне завдання</div>
                <h3 style="margin: 0; font-size: 20px; color: var(--text);">${escapeHtml(task.title)}</h3>
              </div>
              <button class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger" data-delete-task="${escapeHtml(task.id)}">
                <i class="ri-delete-bin-line"></i> Видалити
              </button>
            </div>
          </div>
          
          <div style="margin-bottom: 16px;">${renderBadges(task)}</div>
          
          <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 20px;">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; font-weight: 700;">Умова завдання:</div>
            <div style="color: var(--text); line-height: 1.5; font-size: 14px;">${escapeHtml(task.description)}</div>
          </div>

          ${task.starter_code ? `
            <div>
              <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; font-weight: 700;">Стартовий код:</div>
              <pre style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); font-family: var(--mono); font-size: 13px; color: var(--text); overflow-x: auto;">${escapeHtml(task.starter_code)}</pre>
            </div>
          ` : ""}
          
          <div style="margin-top: 20px; padding: 12px; background: rgba(14, 165, 233, 0.05); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 8px; font-size: 13px; color: var(--primary); display: flex; gap: 10px; align-items: center;">
            <i class="ri-information-line" style="font-size: 18px;"></i>
            <span>Щоб призначити це завдання учням, перейди у вкладку <b>Видача та Перевірка</b>.</span>
          </div>
        </section>
      `;
    }

    function renderAutoModulePreview() {
      const ui = ensureUiState();
      const modules = getAutoModules();
      const mod = modules.find(m => m.id === ui.selectedAutoModuleId) || modules[0];

      if (!mod) return `<div class="teacher-empty" style="text-align: center; padding: 20px;"><i class="ri-folder-forbid-line" style="font-size: 32px; color: var(--text-dim); margin-bottom: 10px; display: block;"></i>Авто-модулів не знайдено.<br>Переконайся, що файли практикуму підключені в index.html</div>`;

      const groups = {};
      (mod.tasks || []).forEach((t, i) => {
        const diff = t.difficulty || t.taskDifficulty || "Junior";
        if (!groups[diff]) groups[diff] = [];
        groups[diff].push({ task: t, originalIndex: i });
      });

      const order = ["Junior", "Middle", "Senior"];
      const sortedKeys = Object.keys(groups).sort((a, b) => (order.indexOf(a) || 99) - (order.indexOf(b) || 99));

      return `
        <section class="teacher-card" style="border-color: rgba(16, 185, 129, 0.3);">
          <div class="teacher-card__head" style="margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="background: rgba(16, 185, 129, 0.1); color: var(--success); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                <i class="${escapeHtml(mod.icon || 'ri-terminal-box-fill')}"></i>
              </div>
              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--success); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 4px;">Практикум: ${escapeHtml(mod.courseTitle)}</div>
                <h3 style="margin: 0; font-size: 20px; color: var(--text);">${escapeHtml(mod.title)}</h3>
              </div>
            </div>
          </div>
          <p style="color: var(--text-dim); line-height: 1.5; margin-bottom: 20px;">${mod.desc || "Автоматичний модуль з практичними завданнями."}</p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${sortedKeys.map(diff => {
              const groupTasks = groups[diff];
              let badgeColor = "var(--primary)"; let bgLight = "rgba(14, 165, 233, 0.1)";
              if (diff === "Middle") { badgeColor = "var(--warn)"; bgLight = "rgba(251, 191, 36, 0.1)"; }
              if (diff === "Senior") { badgeColor = "var(--danger)"; bgLight = "rgba(244, 63, 94, 0.1)"; }

              return `
                <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: ${bgLight}; border-bottom: 1px solid rgba(255,255,255,0.03);">
                    <span style="color: ${badgeColor}; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">${escapeHtml(diff)}</span>
                    <span style="font-size: 11px; color: var(--text-dim); background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 6px;">${groupTasks.length} задач</span>
                  </div>
                  <div style="padding: 8px 16px;">
                    ${groupTasks.map(({task, originalIndex}) => {
                      if (!task) return "";
                      const taskTitle = task.title || "Без назви";
                      const taskXp = task.xp || 0;
                      return `
                        <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px dashed rgba(255,255,255,0.05);">
                          <div style="width: 24px; height: 24px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: var(--mono); color: var(--text-dim);">${originalIndex + 1}</div>
                          <div style="flex: 1; font-size: 14px; font-weight: 600; color: var(--text);">${escapeHtml(taskTitle)}</div>
                          <div style="font-size: 12px; font-weight: 800; color: ${badgeColor};">${taskXp} XP</div>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          
          <div style="margin-top: 20px; padding: 12px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; font-size: 13px; color: var(--success); display: flex; gap: 10px; align-items: center;">
            <i class="ri-settings-4-line" style="font-size: 18px;"></i>
            <span>Щоб видати окремі задачі з цього практикуму, перейди у вкладку <b>Видача та Перевірка</b>.</span>
          </div>
        </section>
      `;
    }

    function renderTaskBankTab() {
      const ui = ensureUiState();
      const manualTasks = getFilteredTaskBank();
      const autoModules = getAutoModules();

      return `
        <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
          
          <div style="flex: 1 1 350px; display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; background: rgba(0,0,0,0.3); padding: 4px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <button class="teacher-btn ${ui.bankCategory === 'mine' ? 'teacher-btn--primary' : 'teacher-btn--ghost'}" data-bank-category="mine" style="flex: 1; margin: 0;">Мої ручні (${manualTasks.length})</button>
              <button class="teacher-btn ${ui.bankCategory === 'auto' ? 'teacher-btn--primary' : 'teacher-btn--ghost'}" data-bank-category="auto" style="flex: 1; margin: 0; background: ${ui.bankCategory === 'auto' ? 'var(--success)' : 'transparent'}; border-color: transparent;">Авто-Практикуми</button>
            </div>

            ${ui.bankCategory === 'mine' ? `
              <button class="teacher-btn teacher-btn--ghost" data-open-create-task="1" style="width: 100%; border: 1px dashed rgba(14, 165, 233, 0.4); color: var(--primary);">
                <i class="ri-add-line"></i> Створити нове завдання
              </button>
              <div class="dash-scroll-wrap" style="max-height: 500px; padding-right: 8px;">
                ${manualTasks.length ? manualTasks.map(t => `
                  <article class="teacher-class-item ${ui.selectedTaskId === t.id && !ui.isCreatingTask ? 'active' : ''}" data-select-task="${escapeHtml(t.id)}" style="cursor: pointer; padding: 12px; margin-bottom: 8px;">
                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${escapeHtml(t.title)}</div>
                    <div style="font-size: 12px; color: var(--text-dim);">${escapeHtml(shorten(t.description, 60))}</div>
                  </article>
                `).join("") : `<div class="teacher-empty">База порожня.</div>`}
              </div>
            ` : `
              <div class="dash-scroll-wrap" style="max-height: 500px; padding-right: 8px;">
                ${autoModules.length ? autoModules.map(m => `
                  <article class="teacher-class-item ${ui.selectedAutoModuleId === m.id ? 'active' : ''}" data-select-auto-module="${escapeHtml(m.id)}" style="cursor: pointer; padding: 12px; margin-bottom: 8px; border-left: 3px solid var(--success);">
                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${escapeHtml(m.title)}</div>
                    <div style="font-size: 11px; color: var(--success); text-transform: uppercase; letter-spacing: 0.05em;">Завдань: ${m.tasks?.length || 0}</div>
                  </article>
                `).join("") : `<div class="teacher-empty" style="text-align: center; padding: 20px;">
                  <i class="ri-terminal-window-line" style="font-size: 32px; color: var(--text-dim); margin-bottom: 10px; display: block;"></i>
                  Не знайдено підключених модулів.<br>Будь ласка, переконайся, що файли практикуму підключені в index.html
                </div>`}
              </div>
            `}
          </div>

          <div style="flex: 2 1 600px;">
            ${ui.bankCategory === 'mine' 
                ? (ui.isCreatingTask ? renderCreateTaskForm() : renderManualTaskPreview()) 
                : renderAutoModulePreview()
            }
          </div>

        </div>
      `;
    }

    // ==================================================
    // 5. Вкладка 2: ВИДАЧА ТА ПЕРЕВІРКА (Grading)
    // ==================================================
    function renderGradingTab() {
      const ui = ensureUiState();
      
      return `
        <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
          
          <div style="flex: 1 1 350px; display: flex; flex-direction: column; gap: 16px;">
            <section class="teacher-card" style="border-color: rgba(139, 92, 246, 0.3); background: rgba(139, 92, 246, 0.02);">
              <div class="teacher-card__head" style="margin-bottom: 16px;">
                <div>
                  <h4 style="margin: 0; color: var(--accent);"><i class="ri-send-plane-fill"></i> Видати завдання</h4>
                  <p class="teacher-muted" style="margin-top: 4px; font-size: 12px;">Вибери ручне завдання або окрему задачу з Практикуму</p>
                </div>
              </div>
              <form id="teacherIssueForm" style="display: flex; flex-direction: column; gap: 14px;">
                
                <div>
                  <label class="teacher-muted" style="font-size: 11px; text-transform: uppercase; margin-bottom: 4px; display: block;">Завдання для видачі</label>
                  <select id="assignmentTaskId" class="teacher-input" name="taskId" style="margin: 0;">
                    <optgroup label="📝 Мої ручні завдання">
                      ${getFilteredTaskBank().length ? getFilteredTaskBank().map(t => `<option value="${escapeHtml(t.id)}" ${ui.selectedTaskId === t.id ? "selected" : ""}>${escapeHtml(t.title)}</option>`).join("") : `<option disabled>Немає ручних завдань</option>`}
                    </optgroup>
                    ${getAutoModules().length ? getAutoModules().map(m => `
                      <optgroup label="🤖 Практикум: ${escapeHtml(m.title)}">
                        ${(m.tasks || []).map((t, i) => `
                          <option value="auto|${escapeHtml(m.courseId)}|${escapeHtml(m.id)}|${i}" ${ui.selectedTaskId === `auto|${m.courseId}|${m.id}|${i}` ? "selected" : ""}>
                            ${i + 1}. ${escapeHtml(t.title)} (${t.xp || 0} XP)
                          </option>
                        `).join("")}
                      </optgroup>
                    `).join("") : `<optgroup label="🤖 Авто-Практикуми"><option disabled>Немає практикумів</option></optgroup>`}
                  </select>
                </div>

                <div>
                  <label class="teacher-muted" style="font-size: 11px; text-transform: uppercase; margin-bottom: 4px; display: block;">Кому видаємо</label>
                  <select id="assignmentTargetType" class="teacher-input" name="targetType" style="margin: 0;">
                    <option value="class">Усьому класу</option>
                    <option value="student">Окремому учню</option>
                  </select>
                </div>

                <div>
                  <label class="teacher-muted" style="font-size: 11px; text-transform: uppercase; margin-bottom: 4px; display: block;">Клас</label>
                  <select id="assignmentClassCode" class="teacher-input" name="classCode" style="margin: 0;">
                    ${teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}">${escapeHtml(cls.name || cls.code)} (${escapeHtml(cls.code)})</option>`).join("")}
                  </select>
                </div>

                ${ui.issueTargetType === "student" ? `
                  <div>
                    <label class="teacher-muted" style="font-size: 11px; text-transform: uppercase; margin-bottom: 4px; display: block;">Учень</label>
                    <select id="assignmentStudentId" class="teacher-input" name="studentId" style="margin: 0;">
                      ${classStudents.length ? classStudents.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.full_name || "Без імені")}</option>`).join("") : `<option value="">Немає учнів</option>`}
                    </select>
                  </div>
                ` : ""}

                <div>
                  <label class="teacher-muted" style="font-size: 11px; text-transform: uppercase; margin-bottom: 4px; display: block;">Дедлайн</label>
                  <input class="teacher-input" name="dueAt" type="datetime-local" style="margin: 0;">
                </div>

                <div>
                  <label class="teacher-muted" style="font-size: 11px; text-transform: uppercase; margin-bottom: 4px; display: block;">Примітка (необов'язково)</label>
                  <input class="teacher-input" name="noteForStudent" placeholder="Наприклад: Пройдіть усі рівні Junior" style="margin: 0;">
                </div>

                <button class="teacher-btn teacher-btn--primary" type="submit" style="margin-top: 8px; background: var(--accent); border-color: var(--accent);">
                  <i class="ri-send-plane-fill"></i> Призначити
                </button>
              </form>
            </section>
          </div>

          <div style="flex: 2 1 600px;">
            <section class="teacher-card" style="width: 100%;">
              <div class="teacher-card__head" style="margin-bottom: 16px;">
                <div>
                  <h4 style="margin: 0;"><i class="ri-check-double-line"></i> Журнал перевірки</h4>
                  <p class="teacher-muted" style="margin-top: 4px;">Усі видані завдання та здані роботи</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; background: rgba(30,41,59,0.4); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="flex: 1; min-width: 200px; position: relative;">
                  <i class="ri-search-line" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                  <input id="teacherIssuedSearch" class="teacher-input" type="search" placeholder="Пошук завдань..." value="${escapeHtml(ui.issuedSearch || "")}" style="margin: 0; padding-left: 36px; width: 100%;">
                </div>
                <select id="teacherIssuedClassFilter" class="teacher-input" style="margin: 0; width: 160px; font-size: 13px;">
                  <option value="all">Усі класи</option>
                  ${teacherClasses.map((cls) => `<option value="${escapeHtml(cls.code)}" ${String(ui.issuedClassFilter || "all") === String(cls.code) ? "selected" : ""}>${escapeHtml(cls.name || cls.code)}</option>`).join("")}
                </select>
                <select id="teacherIssuedStatusFilter" class="teacher-input" style="margin: 0; width: 160px; font-size: 13px;">
                  <option value="all" ${String(ui.issuedStatusFilter || "all") === "all" ? "selected" : ""}>Усі статуси</option>
                  <option value="submitted" ${String(ui.issuedStatusFilter || "all") === "submitted" ? "selected" : ""}>Є нові здачі</option>
                  <option value="active" ${String(ui.issuedStatusFilter || "all") === "active" ? "selected" : ""}>Активне</option>
                  <option value="closed" ${String(ui.issuedStatusFilter || "all") === "closed" ? "selected" : ""}>Закрито</option>
                </select>
              </div>

              ${getFilteredAssignments().length === 0 ? `<div class="teacher-empty" style="padding: 40px 20px;">За вашими фільтрами нічого не знайдено.</div>` : `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${getFilteredAssignments().map((item) => {
                    const subs = getSubmissionsForAssignment(item.id);
                    const unreviewedCount = subs.filter(s => s.status === 'submitted' || s.status === 'review').length;
                    const hasUnreviewed = unreviewedCount > 0;
                    const isAutoModule = (item.starter_code_snapshot || "").startsWith("auto|"); // ЗМІНЕНО

                    return `
                    <details class="premium-access-details" style="background: rgba(30,41,59,0.3); border: 1px solid ${hasUnreviewed ? 'rgba(14, 165, 233, 0.4)' : 'rgba(255,255,255,0.05)'}; border-radius: 12px; overflow: hidden; transition: all 0.2s;" ${hasUnreviewed ? 'open' : ''}>
                      <summary style="padding: 16px; display: flex; justify-content: space-between; align-items: flex-start; cursor: pointer; list-style: none; gap: 16px; background: ${hasUnreviewed ? 'rgba(14, 165, 233, 0.05)' : 'transparent'};">
                        <div style="flex: 1;">
                          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                            <h4 style="margin: 0; font-size: 16px; color: var(--text);">${isAutoModule ? "🤖 " : ""}${escapeHtml(item.title_snapshot || "Без назви")}</h4>
                            ${renderAssignmentStatusBadge(item.status)}
                          </div>
                          <div style="font-size: 12px; color: var(--text-dim); display: flex; gap: 16px; flex-wrap: wrap;">
                            <span><i class="ri-group-line"></i> Клас: <b style="color: var(--text);">${escapeHtml(item.class_code || "—")}</b></span>
                            <span><i class="ri-user-line"></i> ${item.target_type === "student" ? "Індивідуально" : "Усьому класу"}</span>
                            <span><i class="ri-calendar-event-line"></i> Дедлайн: <b style="color: var(--text);">${escapeHtml(formatDate(item.due_at))}</b></span>
                          </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 16px;">
                          ${hasUnreviewed ? `<div style="background: var(--primary); color: #fff; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px;"><i class="ri-mail-unread-line"></i> ${unreviewedCount} нових</div>` : ``}
                          <div style="font-size: 12px; color: var(--text-dim); background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 8px;">Всього здач: ${subs.length}</div>
                          <i class="ri-arrow-down-s-line chevron" style="font-size: 20px; color: var(--text-dim);"></i>
                        </div>
                      </summary>

                      <div style="padding: 0 16px 16px 16px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.15);">
                        <div style="display: flex; justify-content: flex-end; padding-top: 12px; gap: 10px;">
                           <button type="button" class="teacher-btn teacher-btn--ghost teacher-btn--small teacher-btn--danger" data-delete-assignment="${escapeHtml(item.id)}">
                            <i class="ri-delete-bin-line"></i> Видалити
                          </button>
                        </div>
                        <div style="margin-top: 8px;">
                          <h5 style="font-size: 12px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0;">Роботи учнів</h5>
                          ${renderAssignmentSubmissions(item.id)}
                        </div>
                      </div>
                    </details>
                  `}).join("")}
                </div>
              `}
            </section>
          </div>

        </div>
      `;
    }

    function renderAssignmentSubmissions(assignmentId) {
      const rows = getSubmissionsForAssignment(assignmentId);
      if (!rows.length) return `<div class="teacher-empty" style="padding: 16px; background: rgba(255,255,255,0.02); border-radius: 8px;">Ще ніхто не здав це завдання.</div>`;

      return `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
          ${rows.map((submission) => `
            <article style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; transition: border-color 0.2s;">
              <div style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; color: #fff;">
                    ${(submission.student_name || "У")[0].toUpperCase()}
                  </div>
                  <div>
                    <div style="font-weight: 700; font-size: 14px; color: var(--text);">${escapeHtml(submission.student_name || "Учень")}</div>
                    <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;"><i class="ri-time-line"></i> Здано: ${escapeHtml(formatDate(submission.submitted_at))}</div>
                  </div>
                </div>
                <div>${renderSubmissionStatusBadge(submission.status)}</div>
              </div>

              <div style="padding: 16px;">
                <div style="margin-bottom: 16px;">
                  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); margin-bottom: 6px; font-weight: 700;">Відповідь учня</div>
                  <div style="padding: 12px; border: 1px solid rgba(14, 165, 233, 0.1); border-radius: 8px; background: rgba(14, 165, 233, 0.02); font-family: var(--mono); font-size: 13px; color: var(--text); white-space: pre-wrap; max-height: 300px; overflow-y: auto;">${escapeHtml(submission.submission_text || "Учень нічого не написав в текстове поле.")}</div>
                </div>

                <form data-review-submission-form="${escapeHtml(submission.id)}" style="display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap; background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px;">
                  <div style="flex: 1; min-width: 250px;">
                    <textarea name="teacherComment" rows="2" class="teacher-input" placeholder="Напиши коментар або фідбек учню..." style="margin: 0; height: 100%; min-height: 42px;">${escapeHtml(submission.teacher_comment || "")}</textarea>
                  </div>
                  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    <input type="number" name="points" min="0" max="100" step="1" class="teacher-input" placeholder="Бал" value="${submission.points ?? ""}" style="width: 70px; margin: 0; text-align: center; font-weight: bold;"/>
                    <select name="status" class="teacher-input" style="width: 140px; margin: 0; padding: 8px 12px; font-size: 13px;">
                      <option value="submitted" ${submission.status === "submitted" ? "selected" : ""}>Здано</option>
                      <option value="review" ${submission.status === "review" ? "selected" : ""}>На перевірці</option>
                      <option value="returned" ${submission.status === "returned" ? "selected" : ""}>Доопрацювати</option>
                      <option value="reviewed" ${submission.status === "reviewed" ? "selected" : ""}>✅ Оцінено</option>
                    </select>
                    <button type="submit" class="teacher-btn teacher-btn--primary" style="margin: 0; padding: 8px 16px;">Зберегти</button>
                  </div>
                </form>
              </div>
            </article>
          `).join("")}
        </div>
      `;
    }

    function renderView() {
      const root = $("teacherInnerView");
      if (!root) return;

      const ui = ensureUiState();

      root.innerHTML = `
        <div class="teacher-shell">
          <div style="display: flex; gap: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 24px; padding-bottom: 16px;">
            <button class="teacher-btn ${ui.mainTab === 'bank' ? 'teacher-btn--primary' : 'teacher-btn--ghost'}" data-main-tab="bank" style="font-size: 15px; padding: 10px 20px;">
              <i class="ri-database-2-line"></i> База завдань
            </button>
            <button class="teacher-btn ${ui.mainTab === 'grading' ? 'teacher-btn--primary' : 'teacher-btn--ghost'}" data-main-tab="grading" style="font-size: 15px; padding: 10px 20px; background: ${ui.mainTab === 'grading' ? 'var(--accent)' : 'transparent'}; border-color: ${ui.mainTab === 'grading' ? 'var(--accent)' : 'var(--border)'};">
              <i class="ri-check-double-line"></i> Видача та Перевірка
            </button>
          </div>

          ${ui.mainTab === 'bank' ? renderTaskBankTab() : renderGradingTab()}
        </div>
      `;

      if (ui.mainTab === 'grading') {
        const taskSelect = $("assignmentTaskId");
        if (taskSelect) taskSelect.value = ui.selectedTaskId || "";
        const classSelect = $("assignmentClassCode");
        if (classSelect) classSelect.value = ui.issueClassCode || "";
        const targetTypeSelect = $("assignmentTargetType");
        if (targetTypeSelect) targetTypeSelect.value = ui.issueTargetType || "class";
        const studentSelect = $("assignmentStudentId");
        if (studentSelect) studentSelect.value = ui.issueStudentId || "";
      }
    }

    async function reloadStudents() {
      const ui = ensureUiState();
      if (!ui.issueClassCode) {
        classStudents = []; ui.issueStudentId = ""; save?.(); return;
      }
      classStudents = await store.fetchStudentsByClass(ui.issueClassCode);
      if (!classStudents.some((student) => student.id === ui.issueStudentId)) {
        ui.issueStudentId = classStudents[0]?.id || "";
      }
      save?.();
    }

    async function loadData() {
      if (loadData._busy) return;
      loadData._busy = true;
      try {
        const ui = ensureUiState();
        const [classes, tasks, issued] = await Promise.all([
          store.fetchTeacherClasses(), store.fetchTaskBank(), store.fetchAssignments()
        ]);
        teacherClasses = classes; taskBank = tasks; assignments = issued;
        submissions = await store.fetchSubmissionsByAssignmentIds(assignments.map((item) => item.id));

        if (!teacherClasses.some((cls) => cls.code === ui.issueClassCode)) {
          ui.issueClassCode = teacherClasses[0]?.code || "";
        }
        
        const manualTasks = getFilteredTaskBank();
        if (manualTasks.length && !manualTasks.some((task) => task.id === ui.selectedTaskId) && !ui.selectedTaskId.startsWith("auto|")) {
          ui.selectedTaskId = manualTasks[0].id;
        }

        const autoModules = getAutoModules();
        if (autoModules.length && !autoModules.some(m => m.id === ui.selectedAutoModuleId)) {
          ui.selectedAutoModuleId = autoModules[0].id;
        }

        await reloadStudents();
        save?.();
      } finally {
        loadData._busy = false;
      }
    }

    async function handleTaskBankSubmit(form) {
      const formData = new FormData(form);
      await store.createTaskBankItem({
        title: formData.get("title"), description: formData.get("description"), source: "teacher",
        solutionFormat: formData.get("solutionFormat"), starterCode: formData.get("starterCode"),
        maxScore: formData.get("maxScore"), isPublic: formData.get("isPublic") === "on"
      });
      toast("✅ Завдання збережено в базу");
      form.reset();
      const ui = ensureUiState();
      ui.isCreatingTask = false;
      save?.();
      await loadData(); renderView(); bindEvents();
    }

    // --- МАГІЯ ВИДАЧІ (Без помилки 400) ---
    async function handleIssueSubmit(form) {
      const ui = ensureUiState();
      const formData = new FormData(form);
      const selectedValue = String(formData.get("taskId") || "").trim();

      ui.selectedTaskId = selectedValue;
      ui.issueTargetType = String(formData.get("targetType") || "class");
      ui.issueClassCode = String(formData.get("classCode") || "");
      ui.issueStudentId = String(formData.get("studentId") || "");
      save?.();

      let taskToAssign = null;

      // Якщо вчитель обрав Конкретну задачу з Авто-Практикуму
      if (selectedValue.startsWith("auto|")) {
        const [, cId, mId, tIdx] = selectedValue.split("|");
        const autoMod = getAutoModules().find(m => m.id === mId);
        if (!autoMod) throw new Error("Практикум не знайдено в базі");

        const taskObj = autoMod.tasks[Number(tIdx)];
        if (!taskObj) throw new Error("Завдання не знайдено");

        // Зберігаємо маршрут у starter_code (БД це дозволяє)
        const safeStarterCode = `auto|${cId}|${mId}|${tIdx}`;
        
        let existing = taskBank.find(t => t.starter_code === safeStarterCode);
        
        if (!existing) {
          // Чистимо HTML-теги для опису, щоб гарно виглядало у картках
          const rawDesc = taskObj.desc ? taskObj.desc.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim() : "Практична задача з автоматичною перевіркою.";

          existing = await store.createTaskBankItem({
            title: `[Авто] ${taskObj.title}`,
            description: rawDesc,
            source: "teacher",
            solutionFormat: "code", // SAFE для бази даних!
            starterCode: safeStarterCode, 
            maxScore: 12,
            isPublic: false
          });
          taskBank.push(existing); 
        }
        taskToAssign = existing; 
      } else {
        // Звичайне ручне завдання
        taskToAssign = taskBank.find((item) => item.id === selectedValue) || null;
      }

      if (!taskToAssign) throw new Error("Спочатку вибери завдання з бази");

      const createdAssignment = await store.createAssignment({
        task: taskToAssign, 
        targetType: ui.issueTargetType, 
        classCode: ui.issueClassCode, 
        studentId: ui.issueStudentId,
        noteForStudent: formData.get("noteForStudent"), 
        dueAt: formData.get("dueAt") || null, 
        allowLateSubmission: true
      });

      toast("✅ Завдання успішно видано");
      assignments = [createdAssignment, ...assignments.filter((item) => item.id !== createdAssignment.id)];

      form.reset();
      await reloadStudents();
      renderView(); bindEvents();
    }

    function bindEvents() {
      const root = $("teacherInnerView");
      if (!root) return;

      root.querySelectorAll("[data-main-tab]").forEach(btn => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.mainTab = btn.getAttribute("data-main-tab");
          save?.(); renderView(); bindEvents();
        };
      });

      root.querySelectorAll("[data-bank-category]").forEach(btn => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.bankCategory = btn.getAttribute("data-bank-category");
          ui.isCreatingTask = false;
          save?.(); renderView(); bindEvents();
        };
      });

      root.querySelectorAll("[data-open-create-task]").forEach(btn => {
        btn.onclick = () => {
          const ui = ensureUiState();
          ui.isCreatingTask = true;
          save?.(); renderView(); bindEvents();
        };
      });

      root.querySelectorAll("[data-select-task]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const ui = ensureUiState();
          ui.selectedTaskId = btn.getAttribute("data-select-task") || "";
          ui.isCreatingTask = false;
          save?.(); renderView(); bindEvents();
        });
      });

      root.querySelectorAll("[data-select-auto-module]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const ui = ensureUiState();
          ui.selectedAutoModuleId = btn.getAttribute("data-select-auto-module") || "";
          save?.(); renderView(); bindEvents();
        });
      });

      const bankForm = $("teacherTaskBankForm");
      if (bankForm) {
        bankForm.onsubmit = async (e) => {
          e.preventDefault();
          if (bankForm.dataset.busy === "1") return;
          bankForm.dataset.busy = "1";
          try { await handleTaskBankSubmit(bankForm); } 
          catch (err) { toast(`❌ ${err.message || "Помилка"}`); } 
          finally { bankForm.dataset.busy = "0"; }
        };
      }

      const issueForm = $("teacherIssueForm");
      if (issueForm) {
        issueForm.onsubmit = async (e) => {
          e.preventDefault();
          if (issueForm.dataset.busy === "1") return;
          issueForm.dataset.busy = "1";
          try { await handleIssueSubmit(issueForm); } 
          catch (err) { toast(`❌ ${err.message || "Помилка"}`); } 
          finally { issueForm.dataset.busy = "0"; }
        };
      }

      root.querySelectorAll("[data-delete-task]").forEach((btn) => {
        btn.onclick = async () => {
          const taskId = btn.getAttribute("data-delete-task") || "";
          if (!taskId) return;
          if (!confirm("Видалити завдання з бази?")) return;
          btn.disabled = true;
          try {
            await store.archiveTaskBankItem(taskId);
            toast("🗑️ Завдання видалено");
            await loadData(); renderView(); bindEvents();
          } catch (err) { toast(`❌ ${err.message}`); } 
          finally { btn.disabled = false; }
        };
      });

      root.querySelectorAll("[data-delete-assignment]").forEach((btn) => {
        btn.onclick = async () => {
          const assignmentId = btn.getAttribute("data-delete-assignment") || "";
          if (!assignmentId) return;
          if (!confirm("Видалити це призначене завдання? Усі здачі учнів теж зникнуть.")) return;
          btn.disabled = true;
          try {
            await store.deleteAssignment(assignmentId);
            assignments = assignments.filter((item) => item.id !== assignmentId);
            toast("🗑️ Призначене завдання видалено");
            renderView(); bindEvents();
          } catch (err) { toast(`❌ ${err.message}`); } 
          finally { btn.disabled = false; }
        };
      });

      root.querySelectorAll("[data-review-submission-form]").forEach((form) => {
        form.onsubmit = async (e) => {
          e.preventDefault();
          const submissionId = form.getAttribute("data-review-submission-form") || "";
          const formData = new FormData(form);
          const rawPoints = String(formData.get("points") || "").trim();
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) submitBtn.disabled = true;
          try {
            const updatedSubmission = await store.reviewSubmission(submissionId, {
              points: rawPoints === "" ? null : Number(rawPoints),
              teacher_comment: String(formData.get("teacherComment") || "").trim(),
              status: String(formData.get("status") || "reviewed")
            });
            submissions = submissions.map((item) => item.id === updatedSubmission.id ? updatedSubmission : item);
            toast("✅ Оцінку збережено");
            renderView(); bindEvents();
          } catch (err) { toast(`❌ ${err.message}`); } 
          finally { if (submitBtn) submitBtn.disabled = false; }
        };
      });

      const targetTypeSelect = $("assignmentTargetType");
      if (targetTypeSelect) {
        targetTypeSelect.addEventListener("change", () => { ensureUiState().issueTargetType = targetTypeSelect.value; save?.(); renderView(); bindEvents(); });
      }

      const classSelect = $("assignmentClassCode");
      if (classSelect) {
        classSelect.addEventListener("change", async () => {
          ensureUiState().issueClassCode = classSelect.value;
          await reloadStudents(); renderView(); bindEvents();
        });
      }

      const studentSelect = $("assignmentStudentId");
      if (studentSelect) {
        studentSelect.addEventListener("change", () => { ensureUiState().issueStudentId = studentSelect.value; save?.(); });
      }

      const issuedSearchInput = $("teacherIssuedSearch");
      if (issuedSearchInput) {
        issuedSearchInput.oninput = () => { ensureUiState().issuedSearch = issuedSearchInput.value; save?.(); renderView(); bindEvents(); };
      }

      const issuedClassFilter = $("teacherIssuedClassFilter");
      if (issuedClassFilter) {
        issuedClassFilter.onchange = () => { ensureUiState().issuedClassFilter = issuedClassFilter.value || "all"; save?.(); renderView(); bindEvents(); };
      }

      const issuedStatusFilter = $("teacherIssuedStatusFilter");
      if (issuedStatusFilter) {
        issuedStatusFilter.onchange = () => { ensureUiState().issuedStatusFilter = issuedStatusFilter.value || "all"; save?.(); renderView(); bindEvents(); };
      }
    }

    function renderLoading() {
      return `<section class="teacher-panel"><section class="teacher-card"><div class="teacher-empty">Завантаження вкладки завдань...</div></section></section>`;
    }

    async function mount() {
      const root = $("teacherInnerView");
      if (!root) return;
      root.innerHTML = renderLoading();
      try {
        await loadData();
        renderView();
        bindEvents();
      } catch (err) {
        console.error(err);
        root.innerHTML = `<section class="teacher-panel"><section class="teacher-card"><div class="teacher-empty">❌ Не вдалося завантажити завдання</div></section></section>`;
      }
    }

    return { renderLoading, mount };
  }

  return { create };
})();
