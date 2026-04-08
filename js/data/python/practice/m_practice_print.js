// js/data/python/m_bonus_print.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_bonus_print",
    title: "Додаткові випробування: print()",
    icon: "ri-terminal-window-fill",
    color: "#f43f5e", // Яскраво-рожевий для бонусів
    desc: "24 задачі на ідеальний вивід: sep, end, спецсимволи, f-рядки та складне форматування.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базовий вивід, sep, end)
      // ==========================================

      {
        title: "🌟 Точність до літери",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Просто текст</h2>
          <p>Все, що написано в лапках, виводиться абсолютно точно: з усіма пробілами та знаками.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір свою увагу до деталей. Надрукуй точну копію повідомлення системи безпеки.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи рядок: <code style="color: #0ea5e9;">"УВАГА: Збій системи!"</code> (з подвійними лапками зовні).
          </div>
        `,
        hint: `print("УВАГА: Збій системи!")`,
        expected: `УВАГА: Збій системи!`,
        tests: [
          { type: "stdoutEquals", name: "Точний вивід", value: "УВАГА: Збій системи!", normalize: "strict" }
        ]
      },

      {
        title: "🌟 Математика чи Текст?",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Лапки міняють все</h2>
          <p>Без лапок Python рахує. В лапках — просто малює.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Покажи різницю між прикладом і результатом.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Використай два <code>print()</code>.<br>
            У першому виведи приклад як текст (у лапках): <code style="color: #0ea5e9;">"10 + 15"</code>.<br>
            У другому виведи результат (без лапок): <code style="color: #0ea5e9;">10 + 15</code>.
          </div>
        `,
        hint: `print("10 + 15")\nprint(10 + 15)`,
        expected: `10 + 15\n25`,
        tests: [
          { type: "stdoutEquals", name: "Вивід", value: "10 + 15\n25", normalize: "strict" },
          { type: "codeRegex", name: "Без лапок для математики", pattern: "print\\s*\\(\\s*10\\s*\\+\\s*15\\s*\\)" }
        ]
      },

      {
        title: "🌟 Багато аргументів",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Коми ставлять пробіли</h2>
          <p>Кома між аргументами в <code>print()</code> автоматично додає один пробіл під час виводу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Збери звіт про гравця, передавши кілька частин через кому.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> В одному <code>print()</code> через кому передай: слово <code>"Рівень"</code>, число <code>5</code>, слово <code>"Досвід"</code>, математику <code>100 + 50</code>.
          </div>
        `,
        hint: `print("Рівень", 5, "Досвід", 100 + 50)`,
        expected: `Рівень 5 Досвід 150`,
        tests: [
          { type: "stdoutEquals", name: "Вивід", value: "Рівень 5 Досвід 150", normalize: "strict" },
          { type: "codeIncludes", name: "Використано коми", value: "," }
        ]
      },

      {
        title: "🌟 Розділювач sep",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Заміна пробілу</h2>
          <p>Параметр <code>sep</code> дозволяє вказати, що саме ставити замість пробілів між аргументами.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Сформуй MAC-адресу пристрою, розділивши числа двокрапками.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Передай у <code>print()</code> шість аргументів: <code>12</code>, <code>34</code>, <code>56</code>, <code>78</code>, <code>90</code>, <code>"AB"</code>.<br>
            В кінці додай: <code style="color: #0ea5e9;">sep=":"</code>.
          </div>
        `,
        hint: `print(12, 34, 56, 78, 90, "AB", sep=":")`,
        expected: `12:34:56:78:90:AB`,
        tests: [
          { type: "stdoutEquals", name: "Точний вивід", value: "12:34:56:78:90:AB", normalize: "strict" },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=\\s*['\"]\\:['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Суцільне злиття",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Порожній sep</h2>
          <p>Якщо зробити <code>sep=""</code>, аргументи злипнуться в одне слово без жодних пробілів.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Сформуй тег гравця, зліпивши його нік і номер разом.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Передай у <code>print()</code> рядок <code>"Ninja"</code> та число <code>99</code>.<br>
            В кінці додай порожній розділювач: <code style="color: #0ea5e9;">sep=""</code>.
          </div>
        `,
        hint: `print("Ninja", 99, sep="")`,
        expected: `Ninja99`,
        tests: [
          { type: "stdoutEquals", name: "Вивід", value: "Ninja99", normalize: "strict" },
          { type: "codeRegex", name: "Порожній sep", pattern: "sep\\s*=\\s*['\"]['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Скасування Enter",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Кінець рядка</h2>
          <p>Параметр <code>end=""</code> забороняє функції <code>print</code> переходити на новий рядок після виводу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Надрукуй два слова так, щоб вони опинилися на одному рядку, хоча ти використовуєш два <code>print()</code>.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> У першому <code>print()</code> виведи <code>"Супер"</code> і додай <code style="color: #0ea5e9;">end=""</code>.<br>
            На наступному рядку коду у другому <code>print()</code> виведи <code>"мен"</code>.
          </div>
        `,
        hint: `print("Супер", end="")\nprint("мен")`,
        expected: `Супермен`,
        tests: [
          { type: "stdoutEquals", name: "Слова злиплися", value: "Супермен", normalize: "strict" },
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=\\s*['\"]['\"]", checkRaw: true },
          { type: "codeRegex", name: "Два принти", pattern: "print.*print", flags: "s" }
        ]
      },

      {
        title: "🌟 Власний кінець",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Замість переносу</h2>
          <p>В <code>end="..."</code> можна вписати будь-який символ. Він з'явиться в самому кінці виводу замість звичного нового рядка.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи ефект завантаження з крапками.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши три команди <code>print()</code> підряд.<br>
            У першому виведи <code>"Завантаження"</code> з параметром <code style="color: #0ea5e9;">end="."</code>.<br>
            У другому виведи <code>"пошук"</code> з параметром <code style="color: #0ea5e9;">end="."</code>.<br>
            У третьому виведи <code>"готово"</code>.
          </div>
        `,
        hint: `print("Завантаження", end=".")\nprint("пошук", end=".")\nprint("готово")`,
        expected: `Завантаження.пошук.готово`,
        tests: [
          { type: "stdoutEquals", name: "Правильний ланцюг", value: "Завантаження.пошук.готово", normalize: "strict" },
          { type: "codeRegex", name: "end з крапкою", pattern: "end\\s*=\\s*['\"]\\.['\"]", checkRaw: true }
        ]
      },

      {
        title: "🐉 БОС (Junior): Комбо форматування",
        xp: 300,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Junior</h2>
          <p>Поєднай <code>sep</code> та <code>end</code> в одному завданні!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Сформуй рядок <code>1-2-3 -> СТАРТ</code>, використовуючи математику і параметри виводу.</p>
          </div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            Використай ДВА <code>print()</code>.<br>
            1. У першому передай числа <code>1, 2, 3</code>. Зроби розділювачем дефіс (<code style="color: #0ea5e9;">sep="-"</code>) і заміни кінець рядка на стрілочку з пробілами (<code style="color: #0ea5e9;">end=" -> "</code>).<br>
            2. У другому просто виведи слово <code>"СТАРТ"</code>.
          </div>
        `,
        hint: `print(1, 2, 3, sep="-", end=" -> ")\nprint("СТАРТ")`,
        expected: `1-2-3 -> СТАРТ`,
        tests: [
          { type: "stdoutEquals", name: "Ідеальний вивід", value: "1-2-3 -> СТАРТ", normalize: "strict" },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=\\s*['\"]-['\"]", checkRaw: true },
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=\\s*['\"] -> ['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Спецсимволи та f-рядки)
      // ==========================================

      {
        title: "🌟 Перенос рядка (\\n)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Невидимий Enter</h2>
          <p>Спецсимвол <code>\\n</code> працює як натискання клавіші Enter прямо всередині тексту.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи два слова на різних рядках, використовуючи лише один <code>print</code>.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши один <code>print()</code>. Всередині лапок напиши <code>"Світло"</code>, потім <code style="color: #0ea5e9;">\\n</code> без пробілів, і потім <code>"Тінь"</code>.
          </div>
        `,
        hint: `print("Світло\\nТінь")`,
        expected: `Світло\nТінь`,
        tests: [
          { type: "stdoutEquals", name: "Вивід у два рядки", value: "Світло\nТінь", normalize: "strict" },
          { type: "codeIncludes", name: "Є \\n", value: "\\n", checkRaw: true }
        ]
      },

      {
        title: "🌟 Табуляція (\\t)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Великий стрибок</h2>
          <p>Спецсимвол <code>\\t</code> робить великий відступ, дозволяючи створювати рівні колонки.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи заголовок таблиці.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> В одному принті виведи рядок: <code>"Ім'я\\tВік\\tКлас"</code>.
          </div>
        `,
        hint: `print("Ім'я\\tВік\\tКлас")`,
        expected: `Ім'я\tВік\tКлас`,
        tests: [
          { type: "stdoutEquals", name: "Стовпчики з \\t", value: "Ім'я\tВік\tКлас", normalize: "strict" },
          { type: "codeIncludes", name: "Є \\t", value: "\\t", checkRaw: true }
        ]
      },

      {
        title: "🌟 Захист лапок (\\)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Екранування</h2>
          <p>Щоб надрукувати лапки всередині таких самих лапок, перед ними треба поставити бекслеш <code>\\</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Надрукуй фразу з подвійними лапками всередині тексту, який теж обгорнутий у подвійні лапки.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи: <code style="color: #0ea5e9;">"Слово \\"Python\\" круте"</code>.
          </div>
        `,
        hint: `print("Слово \\"Python\\" круте")`,
        expected: `Слово "Python" круте`,
        tests: [
          { type: "stdoutEquals", name: "Лапки на місці", value: `Слово "Python" круте`, normalize: "strict" },
          { type: "codeIncludes", name: "Використано екранування", value: '\\"', checkRaw: true }
        ]
      },

      {
        title: "🌟 Множення тексту",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Лінії та рамки</h2>
          <p>У <code>print()</code> дуже зручно множити рядок на число, щоб малювати розділювачі.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй лінію з 30 зірочок.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи <code style="color: #0ea5e9;">"*" * 30</code>.
          </div>
        `,
        hint: `print("*" * 30)`,
        expected: `******************************`,
        tests: [
          { type: "stdoutEquals", name: "Виведено 30 зірочок", value: "******************************", normalize: "strict" },
          { type: "codeRegex", name: "Використано множення", pattern: "['\"]\\*['\"]\\s*\\*\\s*30", checkRaw: true }
        ]
      },

      {
        title: "🌟 Базовий f-рядок",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Форматування тексту</h2>
          <p>Літера <code>f</code> перед лапками дозволяє вставляти код прямо всередину тексту через <code>{}</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Встав число в речення без використання ком.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Використай f-рядок. Напиши <code>f"Мені {18} років"</code>.
          </div>
        `,
        hint: `print(f"Мені {18} років")`,
        expected: `Мені 18 років`,
        tests: [
          { type: "stdoutEquals", name: "Вивід f-рядка", value: "Мені 18 років", normalize: "strict" },
          { type: "codeRegex", name: "Використано f та {}", pattern: "f['\"]Мені \\{\\s*18\\s*\\} років['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Математика в f-рядку",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вбудований калькулятор</h2>
          <p>У фігурних дужках f-рядка можна писати цілі математичні вирази.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Обчисли площу прямокутника прямо всередині тексту.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи f-рядок: <code style="color: #0ea5e9;">f"Площа: {5 * 4} кв.м"</code>.
          </div>
        `,
        hint: `print(f"Площа: {5 * 4} кв.м")`,
        expected: `Площа: 20 кв.м`,
        tests: [
          { type: "stdoutEquals", name: "Виведено з результатом", value: "Площа: 20 кв.м", normalize: "strict" },
          { type: "codeRegex", name: "Обчислення у {}", pattern: "\\{\\s*5\\s*\\*\\s*4\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "🌟 Багаторядковий текст",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Потрійні лапки</h2>
          <p>Щоб не писати купу <code>\\n</code>, використовуй <code>"""</code>. Вони зберігають усі переноси рядків так, як ти натиснеш Enter у коді.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Надрукуй стовпчик з трьох цифр.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Відкрий потрійні лапки: <code>print("""</code>.<br>
            Натисни Enter і напиши <code>1</code>. Знову Enter — <code>2</code>. Знову Enter — <code>3</code>.<br>
            Закрий лапки <code>""")</code>.
          </div>
        `,
        hint: `print("""1\n2\n3""")`,
        expected: `1\n2\n3`,
        tests: [
          { type: "stdoutEquals", name: "Вивід у стовпчик", value: "1\n2\n3", normalize: "strict" },
          { type: "codeIncludes", name: "Використано потрійні лапки", value: '"""', checkRaw: true }
        ]
      },

      {
        title: "🐉 БОС (Middle): Таблиця лідерів",
        xp: 400,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Middle</h2>
          <p>Поєднай f-рядки, табуляцію та математику в одному ідеальному звіті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй красиву таблицю для двох гравців.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> В ОДНОМУ <code>print()</code> з використанням ОДНОГО <b>f-рядка</b> (з <code>\\n</code> всередині) виведи:<br>
            Перший рядок: <code>Player\\tScore</code><br>
            Другий рядок: <code>Max\\t{50 * 2}</code><br>
            Третій рядок: <code>Leo\\t{30 + 10}</code>
          </div>
        `,
        hint: `print(f"Player\\tScore\\nMax\\t{50 * 2}\\nLeo\\t{30 + 10}")`,
        expected: `Player\tScore\nMax\t100\nLeo\t40`,
        tests: [
          { type: "stdoutEquals", name: "Ідеальна таблиця", value: "Player\tScore\nMax\t100\nLeo\t40", normalize: "strict" },
          { type: "codeRegex", name: "Один print", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeIncludes", name: "Використано \\n", value: "\\n", checkRaw: true },
          { type: "codeIncludes", name: "Використано \\t", value: "\\t", checkRaw: true },
          { type: "codeRegex", name: "Математика в f-рядку", pattern: "\\{\\s*50\\s*\\*\\s*2\\s*\\}.*\\{\\s*30\\s*\\+\\s*10\\s*\\}", flags: "s", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Форматування та Вирівнювання)
      // ==========================================

      {
        title: "🌟 Центрування тексту",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Магія :^</h2>
          <p>В f-рядках можна центрувати текст, задавши йому загальну ширину. Синтаксис: <code>{значення:^ширина}</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Відцентруй заголовок на ширину 10 символів.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи f-рядок: <code style="color: #0ea5e9;">f"|{'Menu':^10}|"</code>.
          </div>
        `,
        hint: `print(f"|{'Menu':^10}|")`,
        expected: `|   Menu   |`,
        tests: [
          { type: "stdoutEquals", name: "Відцентровано", value: "|   Menu   |", normalize: "strict" },
          { type: "codeRegex", name: "Використано :^10", pattern: ":\\^10", checkRaw: true }
        ]
      },

      {
        title: "🌟 Заповнювач простору",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Замість пробілів</h2>
          <p>Перед стрілочкою вирівнювання можна вказати символ, яким заповнити порожнечу (наприклад <code>:=^10</code>).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Зроби рамку для заголовка за допомогою знака рівності.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи f-рядок: <code style="color: #0ea5e9;">f"{'START':=^11}"</code>.
          </div>
        `,
        hint: `print(f"{'START':=^11}")`,
        expected: `===START===`,
        tests: [
          { type: "stdoutEquals", name: "Рамка намальована", value: "===START===", normalize: "strict" },
          { type: "codeRegex", name: "Використано :=^11", pattern: ":=\\^11", checkRaw: true }
        ]
      },

      {
        title: "🌟 Вирівнювання (Ліво / Право)",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Стовпчики</h2>
          <p><code>:&lt;</code> притискає текст ліворуч, а <code>:&gt;</code> притискає праворуч.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи рядок з двох колонок: ім'я ліворуч (ширина 10), бал праворуч (ширина 5).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи f-рядок: <code style="color: #0ea5e9;">f"{'Neo':&lt;10}|{99:&gt;5}"</code>.
          </div>
        `,
        hint: `print(f"{'Neo':<10}|{99:>5}")`,
        expected: `Neo       |   99`,
        tests: [
          { type: "stdoutEquals", name: "Колонки вирівняні", value: "Neo       |   99", normalize: "strict" },
          { type: "codeRegex", name: "Ліве вирівнювання", pattern: ":<10", checkRaw: true },
          { type: "codeRegex", name: "Праве вирівнювання", pattern: ":>5", checkRaw: true }
        ]
      },

      {
        title: "🌟 Фінансовий формат (.2f)",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Копійки</h2>
          <p>Формат <code>:.2f</code> змушує число завжди показувати 2 знаки після крапки (округлюючи за потреби).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи суму як гроші (навіть якщо це кругле число 15, воно має стати 15.00).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи f-рядок: <code style="color: #0ea5e9;">f"Ціна: {15:.2f} $"</code>.
          </div>
        `,
        hint: `print(f"Ціна: {15:.2f} $")`,
        expected: `Ціна: 15.00 $`,
        tests: [
          { type: "stdoutEquals", name: "Копійки виведено", value: "Ціна: 15.00 $", normalize: "strict" },
          { type: "codeRegex", name: "Використано .2f", pattern: ":\\.2f", checkRaw: true }
        ]
      },

      {
        title: "🌟 Тисячі (Кома)",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Великі числа</h2>
          <p>Формат <code>:,</code> автоматично розставляє коми між тисячами (1,000,000).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Зроби так, щоб мільйон було легко читати.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи f-рядок: <code style="color: #0ea5e9;">f"Бюджет: {1500000:,}"</code>.
          </div>
        `,
        hint: `print(f"Бюджет: {1500000:,}")`,
        expected: `Бюджет: 1,500,000`,
        tests: [
          { type: "stdoutEquals", name: "Коми розставлено", value: "Бюджет: 1,500,000", normalize: "strict" },
          { type: "codeRegex", name: "Використано :,", pattern: ":,", checkRaw: true }
        ]
      },

      {
        title: "🌟 Сирі рядки (r-strings)",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вимкнення магії</h2>
          <p>Літера <code>r</code> перед лапками (Raw string) змушує Python ігнорувати всі спецсимволи (такі як <code>\\n</code>) і друкувати текст "як є".</p>
        `,
        desc: `
          <div class="task-main">
            <p>Надрукуй шлях до файлу на Windows, не зламавши його слешами.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи сирий рядок (з префіксом r): <code style="color: #0ea5e9;">r"C:\\new\\folder"</code>.
          </div>
        `,
        hint: `print(r"C:\\new\\folder")`,
        expected: `C:\\new\\folder`,
        tests: [
          { type: "stdoutEquals", name: "Текст без змін", value: "C:\\new\\folder", normalize: "strict" },
          { type: "codeRegex", name: "Використано r-рядок", pattern: "r['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Повернення каретки (\\r)",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перезапис рядка</h2>
          <p>Символ <code>\\r</code> повертає курсор на початок поточного рядка. Те, що ти надрукуєш після нього, перезапише старий текст на екрані!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Імітація таймера завантаження: слово "Wait" перекривається словом "Done".</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> У першому <code>print</code> виведи <code>"Wait..."</code> з параметром <code>end=""</code>.<br>
            У другому <code>print</code> виведи: <code style="color: #0ea5e9;">"\\rDone!   "</code>.
          </div>
          <div class="task-note">
            <b>Важливо:</b> Зверни увагу на пробіли в кінці "Done!   " — вони потрібні, щоб затерти залишки довгого слова "Wait...".
          </div>
        `,
        hint: `print("Wait...", end="")\nprint("\\rDone!   ")`,
        expected: `Wait...\rDone!   `,
        tests: [
          { type: "stdoutEquals", name: "Перезапис", value: "Wait...\rDone!   ", normalize: "strict" },
          { type: "codeIncludes", name: "Є \\r", value: "\\r", checkRaw: true }
        ]
      },

      {
        title: "👑 БОС (Senior): Банківський Чек",
        xp: 600,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Senior</h2>
          <p>Поєднай усі найскладніші формати в одному виводі.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй чек із центруванням, розділювачами тисяч і копійками.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> В ОДНОМУ <code>print()</code> з використанням ОДНОГО багаторядкового f-рядка (через потрійні лапки <code>f"""..."""</code>) виведи:<br>
            1. Слово <code>"ЧЕК"</code> по центру на 15 символів із заповнювачем <code>-</code> (результат: <code>------ЧЕК------</code>).<br>
            2. З нового рядка текст: <code>"Сума: "</code> і число <code>25000</code>, відформатоване з комами (тисячі) та двома знаками після крапки.
          </div>
        `,
        hint: `print(f"""{'{'}"ЧЕК":-^15{'}'}\\nСума: {'{'}{25000}:,.2f{'}'}""")`,
        expected: `------ЧЕК------\nСума: 25,000.00`,
        tests: [
          { type: "stdoutEquals", name: "Ідеальний чек", value: "------ЧЕК------\nСума: 25,000.00", normalize: "strict" },
          { type: "codeRegex", name: "Один print", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Формат :=^15", pattern: ":-\\^15", checkRaw: true },
          { type: "codeRegex", name: "Формат :,.2f", pattern: ":,\\.2f", checkRaw: true }
        ]
      }

    ]
  };

  window.addPracticeModule(moduleObj);
})();