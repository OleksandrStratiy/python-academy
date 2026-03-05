// js/data/python/m_if_else.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_if_else",
    title: "Умови: if / else",
    icon: "ri-split-cells-horizontal",
    color: "#ec4899",
    desc: "Вчимо програму приймати рішення! Оператори порівняння, розгалуження та блоки коду.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базові умови та Відступи)
      // ==========================================

      {
        title: "Правда чи Брехня?",
        xp: 30,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Комп'ютер вміє відповідати</h2>
          <p>Перш ніж програма почне приймати рішення, вона має навчитися порівнювати речі. Для цього в Python є знаки <b>більше</b> <code>&gt;</code> та <b>менше</b> <code>&lt;</code>.</p>
          <p>Якщо ти запитаєш Python <code>5 &gt; 3</code>, він відповість <b style="color: #10b981;">True</b> (Правда). Якщо запитаєш <code>1 &gt; 10</code>, він відповість <b style="color: #ef4444;">False</b> (Брехня).</p>
          <div class="code-box">print(10 > 5)<br>print(2 < 1)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">True<br>False</span>
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Порада:</b> <code>True</code> та <code>False</code> — це спеціальні слова (булевий тип даних). Вони завжди пишуться з великої літери і БЕЗ лапок!
          </div>
        `,
        desc: "Давай перевіримо твій вік. Запитай: <code>age = int(input(\"Твій вік: \"))</code>. <br>На наступному рядку виведи результат порівняння: чи твій вік <b>більший за 18</b>? Використай <code>print(age > 18)</code>.",
        hint: `Тобі потрібно два рядки: один для вводу числа, інший для print з умовою > 18. Спробуй ввести 20, а потім 15, щоб побачити різні відповіді!`,
        expected: `Твій вік: 20\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Порівняння > 18", pattern: "print\\s*\\(\\s*age\\s*>\\s*18\\s*\\)" }
        ]
      },

      {
        title: "Головна пастка: == чи =",
        xp: 35,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Як запитати \"Чи дорівнює?\"</h2>
          <p>В математиці ми використовуємо знак <b style="color: #3b82f6;"><code>=</code></b>. Але в Python цей знак вже зайнятий — він присвоює дані змінній (кладе їх у коробку)!</p>
          <p>Тому, щоб ПОРІВНЯТИ дві речі, ми використовуємо <b style="color: #f59e0b;">ПОДВІЙНЕ ДОРІВНЮЄ</b> <b style="color: #3b82f6;"><code>==</code></b>.</p>
          <div class="code-box">a = 5  <span style="color:gray;"># Поклали 5 у змінну 'a'</span><br>print(a == 5)  <span style="color:gray;"># ЗАПИТАЛИ: чи дорівнює 'a' п'яти? (True)</span></div>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">⚠️ Обережно:</b> Найчастіша помилка новачків — писати <code>if x = 5:</code> замість <code>if x == 5:</code>. Запам'ятай: одне дорівнює — кладе, два — порівнює!
          </div>
        `,
        desc: "Запитай у користувача: <code>ans = int(input(\"Скільки буде 2 + 2? \"))</code>. <br>Виведи на екран результат порівняння: чи дорівнює <code>ans</code> числу <code>4</code>? (Використай <code>==</code> всередині <code>print</code>).",
        hint: `Просто напиши print(ans == 4). Обов'язково два знаки дорівнює!`,
        expected: `Скільки буде 2 + 2? 4\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "ans\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано ==", pattern: "print\\s*\\(\\s*ans\\s*==\\s*4\\s*\\)" }
        ]
      },

      {
        title: "Вороги: Не дорівнює (!=)",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Протилежність</h2>
          <p>Іноді нам треба перевірити, чи дві речі РІЗНІ. Для цього є знак <b style="color: #3b82f6;"><code>!=</code></b> (читається як \"не дорівнює\"). Знак оклику означає заперечення.</p>
          <div class="code-box">print(10 != 5)  <span style="color:gray;"># Чи 10 НЕ дорівнює 5? (True)</span><br>print(3 != 3)   <span style="color:gray;"># Чи 3 НЕ дорівнює 3? (False, бо вони однакові)</span></div>
        `,
        desc: "Запитай: <code>pwd = input(\"Введи пароль: \")</code>. <br>Перевір, чи цей пароль <b>НЕ дорівнює</b> <code>\"1234\"</code>. Виведи результат за допомогою <code>print()</code>.",
        hint: `Твій другий рядок має бути: print(pwd != "1234"). (Пам'ятай про лапки для тексту!)`,
        expected: `Введи пароль: qwerty\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "pwd\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано !=", pattern: "print\\s*\\(\\s*pwd\\s*!=\\s*['\"]1234['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Більше або дорівнює (>=)",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Включні межі</h2>
          <p>Якщо для проходження тесту треба набрати мінімум 50 балів, то учень з рівно 50 балами також здає! Умова <code>score > 50</code> тут не спрацює (бо 50 не більше за 50).</p>
          <p>Ми використовуємо комбінацію <b style="color: #3b82f6;"><code>&gt;=</code></b> (більше або дорівнює) та <b style="color: #3b82f6;"><code>&lt;=</code></b> (менше або дорівнює).</p>
          <div class="code-box">score = 50<br>print(score >= 50)  <span style="color:gray;"># True!</span></div>
        `,
        desc: "Запитай <code>score = int(input(\"Твої бали: \"))</code>. <br>Виведи порівняння: чи <code>score</code> більше АБО дорівнює <code>50</code>?",
        hint: `print(score >= 50)`,
        expected: `Твої бали: 50\nTrue`,
        tests: [
          { type: "codeRegex", name: "Ввід score", pattern: "score\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано >=", pattern: "print\\s*\\(\\s*score\\s*>=\\s*50\\s*\\)" }
        ]
      },

      {
        title: "Перший if (Умова)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Нарешті логіка!</h2>
          <p>Тепер ми навчимо програму діяти залежно від ситуації. Для цього є слово <b style="color: #f59e0b;"><code>if</code></b> (з англ. <i>якщо</i>).</p>
          <div class="code-box"><b style="color: #f59e0b;">if</b> 10 > 5<b style="color: #10b981;">:</b><br>    print("Десять більше!")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Десять більше!</span>
          </div>
          <p>Зверни увагу на два суперважливих правила:</p>
          <ol>
            <li>В кінці умови ЗАВЖДИ ставиться <b style="color: #10b981;">двокрапка <code>:</code></b>. Це означає "тоді зроби наступне".</li>
            <li>Наступний рядок має бути зміщений вправо (натисни <kbd>Tab</kbd> або 4 пробіли). Це називається <b>відступ (indentation)</b>.</li>
          </ol>
        `,
        desc: "Запитай <code>money = int(input(\"Гроші: \"))</code>. <br>Напиши умову: <code>if money > 1000:</code><br>На наступному рядку (зробивши відступ!) виведи текст <code>\"Ти багач!\"</code>.",
        hint: `Рядок з print має бути посунутий вправо. Якщо працюєш з телефона, постав 4 пробіли перед словом print.`,
        expected: `Гроші: 2000\nТи багач!`,
        tests: [
          { type: "codeRegex", name: "Ввід money", pattern: "money\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Є if з двокрапкою", pattern: "if\\s*money\\s*>\\s*1000\\s*:" },
          { type: "codeRegex", name: "Є відступ (пробіли перед print)", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Ти багач!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Забута двокрапка",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Синтаксична помилка</h2>
          <p>Найчастіша помилка першого дня — забути двокрапку в кінці <code>if</code>. Без неї Python не розуміє, де закінчилася умова і почалася дія.</p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Помилка:</b> <code>SyntaxError: expected ':'</code>
          </div>
        `,
        desc: `Твій друг написав код, але він не працює:<br>
<code>if 5 == 5</code><br>
<code>    print(\"П'ять дорівнює п'яти!\")</code><br>
Виправ цей код, просто додавши двокрапку в потрібне місце.`,
        hint: `Двокрапка ставиться в самому кінці першого рядка, одразу після п'ятірки.`,
        expected: `П'ять дорівнює п'яти!`,
        tests: [
          { type: "codeRegex", name: "Додано двокрапку", pattern: "if\\s*5\\s*==\\s*5\\s*:" },
          { type: "codeRegex", name: "Print залишився", pattern: "print" }
        ]
      },

      {
        title: "Пастка відступів (Indentation)",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Блоки коду та відступи</h2>
          <p>Як Python розуміє, які команди належать до <code>if</code>, а які потрібно виконувати незалежно від умови?</p>
          <p>Для цього він використовує <b>відступи</b> (пробіли зліва від тексту). Усе, що візуально зсунуте вправо під <code>if</code> (зазвичай на 4 пробіли), вважається його внутрішньою частиною (блоком коду). Щойно ти напишеш команду з початку рядка (без відступу) — блок <code>if</code> закінчиться.</p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Помилка:</b> <code>IndentationError: expected an indented block</code> — означає, що ти написав if, але забув зробити відступ на наступному рядку!
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Цікавий факт:</b> У деяких інших мовах програмування (наприклад, C++ або JavaScript) для об'єднання команд у блок використовують спеціальні фігурні дужки <code>{}</code>. Але творці Python вирішили, що код має виглядати чисто і читатися як звичайний текст!
          </div>
        `,
        desc: `Ще один зламаний код:<br>
<code>if 10 > 2:</code><br>
<code>print(\"Відступів немає!\")</code><br>
Виправ його, додавши відступ (4 пробіли) перед <code>print</code>.`,
        hint: `Просто постав курсор перед словом print і натисни пробіл 4 рази.`,
        expected: `Відступів немає!`,
        tests: [
          { type: "codeRegex", name: "Додано відступ", pattern: "\\n\\s+print" }
        ]
      },

      {
        title: "Поєднання input та if",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Динамічні умови</h2>
          <p>Справжня магія починається, коли ми перевіряємо не просто <code>5 > 3</code>, а дані, які щойно ввів користувач!</p>
          <div class="code-box">lvl = int(input("Твій рівень: "))<br>if lvl >= 10:<br>    print("Доступ до турніру відкрито!")</div>
        `,
        desc: "Запитай <code>age = int(input(\"Вік: \"))</code>. <br>Напиши умову: якщо <code>age >= 18</code>, виведи <code>\"Ти дорослий!\"</code>.",
        hint: `Не забудь int() для інпуту, бо ми будемо порівнювати з числом 18. Після if не забудь двокрапку і відступ.`,
        expected: `Вік: 20\nТи дорослий!`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s*age\\s*>=\\s*18\\s*:" },
          { type: "codeRegex", name: "Вивід з відступом", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Ти дорослий!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Пароль (Порівняння тексту)",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Текст також можна порівнювати</h2>
          <p>Оператор <code>==</code> чудово працює з текстом. Але пам'ятай: текст завжди має бути в лапках!</p>
          <div class="code-box">ans = input("2 + 2 = ? ")<br>if ans == "4":<br>    print("Правильно!")</div>
        `,
        desc: "Створи систему безпеки. Запитай <code>pwd = input(\"Пароль: \")</code>. (Тут <code>int()</code> НЕ треба!).<br>Напиши умову: якщо пароль дорівнює <code>\"qwerty\"</code>, виведи <code>\"Доступ відкрито\"</code>.",
        hint: `if pwd == "qwerty": (обов'язково слово в лапках!)`,
        expected: `Пароль: qwerty\nДоступ відкрито`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "pwd\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова if з ==", pattern: "if\\s*pwd\\s*==\\s*['\"]qwerty['\"]\\s*:" },
          { type: "codeRegex", name: "Вивід з відступом", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Доступ відкрито['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Кілька if підряд",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Окремі перевірки</h2>
          <p>Ти можеш написати стільки умов <code>if</code>, скільки захочеш. Вони будуть перевірятися одна за одною, абсолютно незалежно.</p>
          <div class="code-box">hp = 20<br>if hp < 50:<br>    print("Мало здоров'я!")<br>if hp < 30:<br>    print("Терміново шукай аптечку!")</div>
          <p>Оскільки 20 менше і за 50, і за 30, спрацюють <b>обидва</b> принти.</p>
        `,
        desc: "Запитай <code>money = int(input(\"Гроші: \"))</code>. <br>Напиши дві ОКРЕМІ умови:<br>1. Якщо <code>money > 100</code>, виведи <code>\"Ти багатий!\"</code><br>2. Якщо <code>money == 1000000</code>, виведи <code>\"Ти мільйонер!\"</code>",
        hint: `У тебе має бути два блоки if, кожен починається з початку рядка (без відступів), а от принти під ними — з відступами.`,
        expected: `Гроші: 1000000\nТи багатий!\nТи мільйонер!`,
        tests: [
          { type: "codeRegex", name: "Перший if", pattern: "if\\s*money\\s*>\\s*100\\s*:" },
          { type: "codeRegex", name: "Другий if", pattern: "if\\s*money\\s*==\\s*1000000\\s*:" },
          { type: "codeRegex", name: "Два принти", pattern: "print.*print", flags: "s" }
        ]
      },

      {
        title: "А інакше що? (else)",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Альтернативний шлях</h2>
          <p>Що робити, якщо умова в <code>if</code> виявилася Брехнею (False)? Якщо ми хочемо дати запасний план, ми використовуємо слово <b style="color: #ef4444;"><code>else:</code></b> (з англ. <i>інакше</i>).</p>
          <div class="code-box">if 10 > 50:<br>    print("Більше")<br><b style="color: #ef4444;">else:</b><br>    print("Менше")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Менше</span>
          </div>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">Правила else:</b><br>
            1. <code>else</code> пишеться на тому ж рівні, що й <code>if</code> (без відступу).<br>
            2. Після <code>else</code> <b>завжди ставиться двокрапка <code>:</code></b>.<br>
            3. Біля <code>else</code> НІКОЛИ не пишеться умова (воно просто ловить все, що не підійшло під if).
          </div>
        `,
        desc: "Запитай здоров'я гравця: <code>hp = int(input(\"Здоров'я: \"))</code>. <br>Напиши: якщо <code>hp > 0</code>, виведи <code>\"Ти живий!\"</code>.<br>Інакше (<code>else:</code>) виведи <code>\"Game Over\"</code>.",
        hint: `if hp > 0:\n    print(...)\nelse:\n    print(...)`,
        expected: `Здоров'я: 0\nGame Over`,
        tests: [
          { type: "codeRegex", name: "Ввід hp", pattern: "hp\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s*hp\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Блок else з двокрапкою", pattern: "^else\\s*:", flags: "m" },
          { type: "codeRegex", name: "Відступи є", pattern: "\\n\\s+print.*\\nelse\\s*:.*\\n\\s+print", flags: "s" }
        ]
      },

      {
        title: "Магазин: Вистачить грошей?",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Реальний сценарій</h2>
          <p>У більшості ігор купівля предметів працює саме через <code>if / else</code>.</p>
        `,
        desc: "Запитай <code>money = int(input(\"Твої гроші: \"))</code>. <br>Меч коштує 150 монет. <br>Напиши умову: якщо <code>money >= 150</code>, виведи <code>\"Меч куплено!\"</code>. <br>Інакше (<code>else:</code>) виведи <code>\"Не вистачає золота\"</code>.",
        hint: `if money >= 150: ... else: ...`,
        expected: `Твої гроші: 100\nНе вистачає золота`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "money\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова >=", pattern: "if\\s*money\\s*>=\\s*150\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Таємне слово (if-else з текстом)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Фейс-контроль</h2>
          <p>Комбінуємо <code>==</code>, текст і <code>else</code>.</p>
        `,
        desc: "Запитай <code>word = input(\"Секретне слово: \")</code>. <br>Якщо слово дорівнює <code>\"магія\"</code>, виведи <code>\"Проходь!\"</code>.<br>Інакше — виведи <code>\"Ти шпигун!\"</code>.",
        hint: `if word == "магія": ... else: ...`,
        expected: `Секретне слово: (ввід)\n(результат)`,
        tests: [
          { type: "codeRegex", name: "if слово", pattern: "if\\s*word\\s*==\\s*['\"]магія['\"]\\s*:" },
          { type: "codeRegex", name: "else є", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Життя після if (Рівні відступів)",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Де закінчується блок?</h2>
          <p>Блок коду всередині <code>if</code> триває доти, доки тривають відступи. Як тільки ти пишеш код <b>без відступу</b> (на тому ж рівні, що й слово <code>if</code>), програма вважає, що умова закінчилася, і цей код виконається ЗАВЖДИ, незалежно від умови.</p>
          <div class="code-box">if 10 > 5:<br>    print("В середині IF")<br>print("ЦЕЙ РЯДОК ВИВЕДЕТЬСЯ ЗАВЖДИ!")</div>
        `,
        desc: "Запитай <code>lvl = int(input(\"Рівень: \"))</code>.<br>Напиши умову: <code>if lvl < 5:</code> і всередині неї виведи <code>\"Новачок\"</code>.<br>Потім ПІСЛЯ блоку <code>if</code> (без відступу, з початку рядка!) напиши: <code>print(\"Програма завершена\")</code>.",
        hint: `Перший print має відступ. Другий print не має відступу. Якщо ти введеш рівень 10, виведеться ТІЛЬКИ другий рядок.`,
        expected: `Рівень: 10\nПрограма завершена`,
        tests: [
          { type: "codeRegex", name: "Ввід lvl", pattern: "lvl\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова lvl < 5", pattern: "if\\s*lvl\\s*<\\s*5\\s*:" },
          { type: "codeRegex", name: "Print всередині", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Новачок['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Print зовні (без відступу)", pattern: "\\nprint\\s*\\(\\s*['\"]Програма завершена['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Комп'ютер — буквоїд",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Суворий регістр</h2>
          <p>Для Python <code>\"Так\"</code> і <code>\"так\"</code> — це два АБСОЛЮТНО різні слова. Одне з великої літери, інше з малої. Якщо ти просиш ввести \"так\", а користувач ввів \"Так\" або \"ТАК\", умова <code>== \"так\"</code> не спрацює і видасть False!</p>
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
            <b style="color: #10b981;">💡 Що таке методи?</b><br>
            В майбутньому (на рівні Middle) ми вивчимо так звані <b>методи</b>. Це спеціальні команди, які вміють редагувати текст на льоту. Наприклад, метод зможе автоматично перетворити "ТАК" на "так", щоб програма не ламалася. Але поки що ми будемо вводити текст точно буква в букву!
          </div>
        `,
        desc: "Запитай <code>ans = input(\"Граємо? (пиши 'так'): \")</code>. <br>Якщо <code>ans == \"так\"</code>, виведи <code>\"Старт\"</code>. <br>Інакше виведи <code>\"Стоп\"</code>. <br><i>Спробуй ввести 'Так' з великої літери, щоб на власні очі побачити, як суворо Python перевіряє текст!</i>",
        hint: `Просто перевір if ans == "так": і додай else.`,
        expected: `Граємо? (пиши 'так'): Так\nСтоп`,
        tests: [
          { type: "codeRegex", name: "Ввід тексту", pattern: "ans\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова з так", pattern: "if\\s*ans\\s*==\\s*['\"]так['\"]\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Парне чи Непарне?",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Магія остачі (%)</h2>
          <p>Пам'ятаєш оператор <code>%</code> (остача від ділення)? Це найпопулярніший спосіб перевірити, чи число парне.</p>
          <p>Якщо поділити число на 2 і остача дорівнює нулю (<code>num % 2 == 0</code>) — воно <b>парне</b>. Якщо остача 1 — <b>непарне</b>.</p>
        `,
        desc: "Запитай <code>num = int(input(\"Число: \"))</code>. <br>Напиши умову: якщо <code>num % 2 == 0</code>, виведи <code>\"Парне\"</code>. <br>Інакше виведи <code>\"Непарне\"</code>.",
        hint: `Формула в if має виглядати так: if num % 2 == 0:`,
        expected: `Число: 8\nПарне`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Перевірка на парність", pattern: "if\\s*num\\s*%\\s*2\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Зворотна логіка (!=)",
        xp: 170,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка на НЕ</h2>
          <p>Іноді зручніше перевірити, чи чогось НЕ сталося.</p>
        `,
        desc: "Ти бос. Запитай <code>name = input(\"Хто ти? \")</code>. <br>Якщо ім'я <b>НЕ дорівнює</b> <code>\"бос\"</code> (використай <code>!=</code>), виведи <code>\"Геть звідси!\"</code>. <br>Інакше виведи <code>\"Вітаю, сер!\"</code>.",
        hint: `if name != "бос": ... else: ...`,
        expected: `Хто ти? (ввід)\n(результат)`,
        tests: [
          { type: "codeRegex", name: "Ввід name", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова !=", pattern: "if\\s*name\\s*!=\\s*['\"]бос['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "F-рядки всередині if",
        xp: 180,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Персоналізація</h2>
          <p>Ми можемо використовувати будь-який код всередині блоків <code>if</code>, включаючи f-рядки та математику.</p>
        `,
        desc: "Запитай <code>name = input(\"Ім'я: \")</code> та <code>score = int(input(\"Очки: \"))</code>. <br>Якщо очки >= 100, виведи f-рядком: <code>\"{name}, ти чемпіон!\"</code>.<br>Інакше виведи f-рядком: <code>\"{name}, треба ще тренуватися.\"</code>",
        hint: `Не забудь літеру 'f' перед лапками у принтах!`,
        expected: `Ім'я: Макс\nОчки: 120\nМакс, ти чемпіон!`,
        tests: [
          { type: "codeRegex", name: "Опитування", pattern: "name\\s*=\\s*input.*score\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s*score\\s*>=\\s*100\\s*:" },
          { type: "codeRegex", name: "F-рядки у виводі", pattern: "print\\s*\\(\\s*f['\"].*\\{\\s*name\\s*\\}", flags: "s" }
        ]
      },

      {
        title: "Зміна змінних в умові",
        xp: 190,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Лікування та Урон</h2>
          <p>Всередині <code>if</code> ми можемо не лише виводити текст, але й змінювати інші змінні (наприклад, віднімати здоров'я).</p>
          <div class="code-box">hp = 100<br>trap = input("Ти наступив на пастку? ")<br>if trap == "так":<br>    <b style="color: #ef4444;">hp -= 50</b><br>print(f"Здоров'я: {hp}")</div>
        `,
        desc: "Створи змінну <code>hp = 100</code>. <br>Запитай <code>action = input(\"Випити зілля? \")</code>.<br>Якщо <code>action == \"так\"</code>, збільш hp на 50 (<code>hp += 50</code>).<br>В самому кінці, ПІСЛЯ блоку if (без відступу), виведи: <code>print(f\"Твоє ХП: {hp}\")</code>.",
        hint: `У тебе немає else. Просто if, всередині якого += 50. А потім звичайний принт зліва.`,
        expected: `Випити зілля? так\nТвоє ХП: 150`,
        tests: [
          { type: "codeRegex", name: "Створено hp = 100", pattern: "hp\\s*=\\s*100" },
          { type: "codeRegex", name: "Ввід action", pattern: "action\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Збільшення hp", pattern: "hp\\s*\\+=\\s*50" },
          { type: "codeRegex", name: "Фінальний принт зовні", pattern: "\\nprint\\s*\\(\\s*f['\"]Твоє ХП:\\s*\\{\\s*hp\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Порівняння двох змінних",
        xp: 200,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Бійка</h2>
          <p>Ми можемо порівнювати не тільки змінну з конкретним числом (<code>hp > 0</code>), але й дві змінні між собою!</p>
          <div class="code-box">if player_atk > boss_def:<br>    print("Пробиття!")</div>
        `,
        desc: "Запитай <code>my_atk = int(input(\"Моя атака: \"))</code> та <code>boss_def = int(input(\"Захист боса: \"))</code>.<br>Якщо <code>my_atk > boss_def</code>, виведи <code>\"Боса переможено!\"</code>.<br>Інакше виведи <code>\"Твоя атака заслабка...\"</code>",
        hint: `Умова буде виглядати так: if my_atk > boss_def:`,
        expected: `Моя атака: 20\nЗахист боса: 15\nБоса переможено!`,
        tests: [
          { type: "codeRegex", name: "Опитування як int", pattern: "my_atk\\s*=\\s*int.*boss_def\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Порівняння змінних", pattern: "if\\s*my_atk\\s*>\\s*boss_def\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Подвійна перевірка",
        xp: 210,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Співпадіння паролів</h2>
          <p>Щоб уникнути друкарських помилок при реєстрації, сайти часто просять ввести пароль двічі, а потім порівнюють ці дві змінні між собою.</p>
        `,
        desc: "Запитай <code>pass1 = input(\"Придумай пароль: \")</code>. <br>Потім запитай <code>pass2 = input(\"Повтори пароль: \")</code>. <br>Якщо <code>pass1 == pass2</code>, виведи <code>\"Збережено\"</code>. Інакше — <code>\"Помилка, паролі різні\"</code>.",
        hint: `if pass1 == pass2: print("Збережено") else: print("Помилка, паролі різні")`,
        expected: `Придумай пароль: 1234\nПовтори пароль: 1234\nЗбережено`,
        tests: [
          { type: "codeRegex", name: "Ввід двох паролів", pattern: "pass1\\s*=\\s*input.*pass2\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Порівняння паролів", pattern: "if\\s*pass1\\s*==\\s*pass2\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Порожній рядок (False)",
        xp: 220,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Мовчання — знак згоди?</h2>
          <p>Як перевірити, чи користувач ВЗАГАЛІ щось ввів, а не просто натиснув Enter? Дуже просто!</p>
          <div class="code-box">text = input("Слово: ")<br>if text == "":<br>    print("Ти нічого не ввів!")</div>
          <p><code>\"\"</code> — це порожній рядок (лапки без нічого всередині).</p>
        `,
        desc: "Запитай <code>msg = input(\"Повідомлення: \")</code>. <br>Якщо <code>msg == \"\"</code>, виведи <code>\"Порожньо\"</code>.<br>Інакше виведи <code>\"Відправлено\"</code>.",
        hint: `Умова: if msg == "":`,
        expected: `Повідомлення: \nПорожньо`,
        tests: [
          { type: "codeRegex", name: "Перевірка на порожнечу", pattern: "if\\s*msg\\s*==\\s*['\"]['\"]\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "Підсумкова 1: Вибори",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: if-else та int()</h2>`,
        desc: `Створи систему допуску до виборів.<br>
        1. Запитай: <code>age = int(input(\"Твій вік: \"))</code>.<br>
        2. Якщо вік більше або дорівнює 18, виведи: <code>\"Можеш голосувати\"</code>.<br>
        3. Інакше виведи: <code>\"Ще зарано\"</code>.`,
        hint: `Використовуй >= 18.`,
        expected: `Твій вік: 18\nМожеш голосувати`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Перевірка >=", pattern: "if\\s*age\\s*>=\\s*18\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "Підсумкова 2: Система знижок",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: Математика в умові</h2>`,
        desc: `Магазин дає знижку 100 грн, якщо сума покупки 1000 грн або більше.<br>
        1. Запитай: <code>price = int(input(\"Ціна: \"))</code>.<br>
        2. Напиши умову: якщо <code>price >= 1000</code>, зменш ціну на 100 (<code>price -= 100</code>).<br>
        3. <b>Після умови (без відступу)</b> виведи f-рядком: <code>\"До сплати: {price}\"</code>.`,
        hint: `Тобі знадобиться лише if (без else). Відніми 100 всередині if, а виводь результат назовні.`,
        expected: `Ціна: 1200\nДо сплати: 1100`,
        tests: [
          { type: "codeRegex", name: "Ввід price", pattern: "price\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова >= 1000", pattern: "if\\s*price\\s*>=\\s*1000\\s*:" },
          { type: "codeRegex", name: "Віднімання 100", pattern: "price\\s*\\-=\\s*100" },
          { type: "codeRegex", name: "Фінальний вивід", pattern: "\\nprint\\s*\\(\\s*f['\"]До сплати:\\s*\\{\\s*price\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 3: Сейф",
        xp: 400,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: Множинні зміни</h2>`,
        desc: `У тебе є <code>money = 100</code>.<br>
        1. Запитай <code>pin = input(\"Пін: \")</code>.<br>
        2. Якщо <code>pin == \"1234\"</code>, виведи <code>\"Сейф відкрито\"</code> <b>І НА НАСТУПНОМУ РЯДКУ (з відступом!)</b> додай до грошей 500 (<code>money += 500</code>).<br>
        3. Інакше виведи <code>\"Помилка\"</code>.<br>
        4. ПІСЛЯ всього блоку if/else (без відступу!) виведи f-рядком: <code>\"Баланс: {money}\"</code>.`,
        hint: `Всередині if у тебе має бути ДВА рядки з відступом: print та money += 500.`,
        expected: `Пін: 1234\nСейф відкрито\nБаланс: 600`,
        tests: [
          { type: "codeRegex", name: "Умова на 1234", pattern: "if\\s*pin\\s*==\\s*['\"]1234['\"]\\s*:" },
          { type: "codeRegex", name: "Гроші += 500 всередині if", pattern: "money\\s*\\+=\\s*500" },
          { type: "codeRegex", name: "Фінальний принт", pattern: "\\nprint\\s*\\(\\s*f['\"]Баланс:\\s*\\{\\s*money\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🟢 БОС (Junior): Охоронець мосту",
        xp: 1000,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит: Текстовий квест</h2>
          <p>Об'єднай усе: математику, ввід, f-рядки та умови, щоб створити повноцінну ігрову сцену.</p>
        `,
        desc: `Напиши скрипт NPC:<br>
        1. Запитай ім'я: <code>name = input(\"Ім'я: \")</code><br>
        2. Запитай золото: <code>gold = int(input(\"Скільки в тебе золота? \"))</code><br>
        3. Умова: якщо золота <b>більше або дорівнює 50</b>:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Відніми 50 від золота (<code>gold -= 50</code>).<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Виведи f-рядком: <code>\"Проходь, {name}! Залишок: {gold}G\"</code>.<br>
        4. Інакше (<code>else</code>):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Виведи f-рядком: <code>\"{name}, тобі не вистачає золота!\"</code>.`,
        hint: `Уважно слідкуй за відступами. gold -= 50 має бути всередині if (разом із принтом).`,
        expected: `Ім'я: Макс\nСкільки в тебе золота? 100\nПроходь, Макс! Залишок: 50G`,
        tests: [
          { type: "codeRegex", name: "Ввід імені", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Ввід золота (int)", pattern: "gold\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова >= 50", pattern: "if\\s*gold\\s*>=\\s*50\\s*:" },
          { type: "codeRegex", name: "Віднімання золота", pattern: "\\n\\s+gold\\s*\\-=\\s*50" },
          { type: "codeRegex", name: "Блок else", pattern: "\\nelse\\s*:" },
          { type: "codeRegex", name: "Форматування пропуску", pattern: "f['\"]Проходь,\\s*\\{\\s*name\\s*\\}!\\s*Залишок:\\s*\\{\\s*gold\\s*\\}G['\"]", checkRaw: true },
          { type: "codeRegex", name: "Форматування відмови", pattern: "f['\"]\\{\\s*name\\s*\\},\\s*тобі не вистачає золота!['\"]", checkRaw: true }
        ]
      }

          ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
