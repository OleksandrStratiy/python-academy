// js/data/python/m_types.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_types",
    title: "Типи даних",
    icon: "ri-shapes-line",
    color: "#ec4899", // Яскравий рожевий колір
    desc: "Текст, числа, дроби та правда. Вчимося визначати та змінювати типи даних.",

    tasks: [
      
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базові типи та перетворення)
      // ==========================================

      {
        title: "Рядок тексту (str)",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Що таке Типи Даних?</h2>
          <p>Для нас "100" — це просто сто. Але для комп'ютера слово "Сто" і число 100 — це абсолютно різні речі. Вони мають різні <b style="color: #3b82f6;">типи даних</b>.</p>
          <p>Перший тип, який ти вже добре знаєш — це текст. У Python він називається <b style="color: #10b981;">str</b> (від англ. <i>string</i> — рядок).</p>
          <p>Все, що знаходиться <b style="color: #ef4444;">в лапках</b> — це рядок (str), навіть якщо там написані цифри!</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">name = "Alex"<br>phone = "555-0000" <span style="color:gray;"># Це теж текст, бо в лапках!</span></div>
        `,
        desc: "Створи змінну <code>player_class</code> типу <b>str</b> (тобто текст) зі значенням <code>\"Маг\"</code>. Виведи її на екран.",
        hint: `Не забудь взяти слово Маг у лапки, щоб Python зрозумів, що це текст (str).`,
        expected: `Маг`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Маг", normalize: "soft" },
          { type: "codeRegex", name: "Змінну створено як рядок", pattern: "player_class\\s*=\\s*['\"]Маг['\"]" }
        ]
      },

      {
        title: "Ціле число (int)",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Математичні цілі числа</h2>
          <p>Другий тип даних — це звичайні числа (без коми). У Python вони називаються <b style="color: #10b981;">int</b> (від англ. <i>integer</i> — ціле число).</p>
          <p>З числами типу <code>int</code> можна робити математичні дії. Головне правило: <b style="color: #ef4444;">ЖОДНИХ ЛАПОК!</b></p>
          <p><b>Приклад:</b></p>
          <div class="code-box">level = 5  <span style="color:gray;"># Це int</span><br>level = "5" <span style="color:gray;"># А це вже str (текст)!</span></div>
        `,
        desc: "Створи змінну <code>armor</code> типу <b>int</b> зі значенням <code>50</code>. На наступному рядку роздрукуй її.",
        hint: `Просто напиши armor = 50 (без лапок!), а потім виведи її через print.`,
        expected: `50`,
        tests: [
          { type: "stdoutEquals", name: "Виведено число", value: "50", normalize: "soft" },
          { type: "codeRegex", name: "Створено число без лапок", pattern: "armor\\s*=\\s*50" }
        ]
      },

      {
        title: "Дробове число (float)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Числа з крапкою</h2>
          <p>Що робити, якщо число не ціле? Наприклад, ціна 9.99 або вага 2.5 кг. Для цього існує тип <b style="color: #10b981;">float</b> (число з плаваючою крапкою).</p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">СУПЕР ВАЖЛИВО:</b><br>
            У програмуванні для дробів використовується <b style="color: #ef4444;">КРАПКА (.)</b>, а не кома!<br>
            ❌ Неправильно: <code>weight = 2,5</code> (Python подумає, що це два окремих числа)<br>
            ✅ Правильно: <code>weight = 2.5</code>
          </div>
        `,
        desc: "Створи змінну <code>speed</code> типу <b>float</b> зі значенням <code>4.5</code>. Виведи її на екран.",
        hint: `Використай крапку для десяткового дробу: speed = 4.5`,
        expected: `4.5`,
        tests: [
          { type: "stdoutEquals", name: "Дріб виведено", value: "4.5", normalize: "soft" },
          { type: "codeRegex", name: "Використано крапку", pattern: "speed\\s*=\\s*4\\.5" }
        ]
      },

      {
        title: "Логічний тип (bool)",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Правда чи Брехня?</h2>
          <p>В іграх нам часто треба знати лише дві речі: так чи ні? (Чи живий гравець? Чи є у нього ключ?).</p>
          <p>Для цього є тип <b style="color: #10b981;">bool</b> (від англ. <i>boolean</i>). Він має лише ДВА можливих значення:</p>
          <ul>
            <li><b style="color: #3b82f6;">True</b> (Правда / Так)</li>
            <li><b style="color: #ef4444;">False</b> (Брехня / Ні)</li>
          </ul>
          <p>Вони пишуться БЕЗ лапок і <b style="color: #ef4444;">ОБОВ'ЯЗКОВО з великої літери</b>!</p>
          <div class="code-box">has_key = True<br>is_poisoned = False</div>
        `,
        desc: "Створи змінну <code>game_over</code> і дай їй значення <code>False</code>. Роздрукуй її.",
        hint: `Значення False пишеться з великої літери 'F' і без лапок.`,
        expected: `False`,
        tests: [
          { type: "stdoutEquals", name: "Виведено булеве значення", value: "False", normalize: "soft" },
          { type: "codeRegex", name: "Створено bool (без лапок)", pattern: "game_over\\s*=\\s*False" }
        ]
      },

      {
        title: "Математика: int + float",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Еволюція типів</h2>
          <p>Що буде, якщо додати ціле число (<code>int</code>) і дробове (<code>float</code>)?</p>
          <p>Python дуже розумний. Він розуміє, що якщо відкинути дріб, результат буде неточним. Тому він автоматично <b style="color: #3b82f6;">перетворює результат на float</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(10 + 2.5)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">12.5</div>
        `,
        desc: "Створи <code>base = 20</code> (int) та <code>bonus = 1.5</code> (float). Створи змінну <code>total = base + bonus</code>. Виведи <code>total</code>.",
        hint: `Просто створи дві змінні і додай їх в третю. Python сам зробить результат дробовим.`,
        expected: `21.5`,
        tests: [
          { type: "stdoutEquals", name: "Додавання правильне", value: "21.5", normalize: "soft" },
          { type: "codeRegex", name: "Змінні додано", pattern: "total\\s*=\\s*base\\s*\\+\\s*bonus" }
        ]
      },

      {
        title: "Функція-шпигун: type()",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Як дізнатися тип?</h2>
          <p>Іноді ми отримуємо змінну, і не знаємо, що в ній лежить (наприклад, дані з інтернету). Щоб "запитати" у Python тип даних, існує спеціальна команда <b style="color: #3b82f6;">type()</b>.</p>
          <p>Вона працює так само, як print, але замість вмісту коробки показує її ТИП.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">age = 15<br>print(type(age))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">&lt;class 'int'&gt;</div>
          <p class="mutedish tiny">Слово class означає "клас/тип". Ми бачимо, що це 'int' (ціле число).</p>
        `,
        desc: "Створи змінну <code>text = \"Код\"</code>. Виведи її тип за допомогою команди <code>print(type(text))</code>.",
        hint: `Твій другий рядок має виглядати точно так: print(type(text))`,
        expected: `<class 'str'>`,
        tests: [
          { type: "stdoutEquals", name: "Тип визначено як рядок", value: "<class 'str'>", normalize: "soft" },
          { type: "codeRegex", name: "Використано type()", pattern: "print\\s*\\(\\s*type\\s*\\(" }
        ]
      },

      {
        title: "Дослідження float",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Перевіряємо дроби</h2>
          <p>Давай перевіримо, як <code>type()</code> реагує на числа з крапкою.</p>
        `,
        desc: "Створи змінну <code>pi = 3.14</code>. Використай <code>print(type(pi))</code>, щоб дізнатися, до якого типу належить це значення.",
        hint: `Створи змінну з крапкою. Потім обгорни її у type(), а той type() обгорни у print().`,
        expected: `<class 'float'>`,
        tests: [
          { type: "stdoutEquals", name: "Тип визначено як float", value: "<class 'float'>", normalize: "soft" },
          { type: "codeRegex", name: "Перевірка типу pi", pattern: "type\\s*\\(\\s*pi\\s*\\)" }
        ]
      },

      {
        title: "Дослідження bool",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Перевіряємо логіку</h2>
          <p>Чи зможе Python розпізнати слово <code>True</code> без лапок?</p>
        `,
        desc: "Створи змінну <code>is_active = True</code> (без лапок, з великої літери!). Виведи її тип.",
        hint: `Твій код має бути таким: print(type(is_active))`,
        expected: `<class 'bool'>`,
        tests: [
          { type: "stdoutEquals", name: "Тип визначено як bool", value: "<class 'bool'>", normalize: "soft" },
          { type: "codeRegex", name: "Перевірка типу is_active", pattern: "type\\s*\\(\\s*is_active\\s*\\)" }
        ]
      },

      {
        title: "Пастка додавання",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Чому типи важливі?</h2>
          <p>Подивись на цю математику:</p>
          <ul>
            <li>Якщо ми додамо два <code>int</code>: <code>5 + 5 = 10</code>.</li>
            <li>Якщо ми додамо два <code>str</code> (текст): <code>"5" + "5" = "55"</code>. Python просто <b style="color: #ef4444;">склеює текст</b>, як вагони поїзда!</li>
          </ul>
        `,
        desc: "Задай <code>a = \"7\"</code> та <code>b = \"3\"</code> (обидва в лапках!). Створи <code>result = a + b</code> і виведи <code>result</code>. Подивись, що вийде замість 10!",
        hint: `Не забудь лапки при створенні a та b. Вони мають бути рядками (str).`,
        expected: `73`,
        tests: [
          { type: "stdoutEquals", name: "Рядки склеїлись (73)", value: "73", normalize: "soft" },
          { type: "codeRegex", name: "Рядки в лапках", pattern: "a\\s*=\\s*['\"]7['\"].*b\\s*=\\s*['\"]3['\"]", flags: "s" }
        ]
      },

      {
        title: "Перетворення: Рядок у Число",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Магія кастингу: int()</h2>
          <p>Якщо нам прийшло число у вигляді тексту (<code>"100"</code>), ми не можемо з ним рахувати. Його треба <b style="color: #10b981;">перетворити</b> на справжнє число!</p>
          <p>Для цього використовується команда <b style="color: #3b82f6;">int()</b>. Вона бере текст і робить з нього математичне ціле число.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">text_num = "50"<br>real_num = int(text_num)<br>print(real_num + 5)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">55</div>
        `,
        desc: "Є рядок <code>score_str = \"100\"</code>. Створи нову змінну <code>score_int = int(score_str)</code>. Виведи результат додавання: <code>score_int + 50</code>.",
        hint: `Тобі треба пропустити текстову змінну через команду int(). Після цього вона стане числом і зможе додаватися до 50.`,
        expected: `150`,
        tests: [
          { type: "stdoutEquals", name: "Числа додались (150)", value: "150", normalize: "soft" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(" }
        ]
      },

      {
        title: "Множення тексту",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Цікавий побічний ефект</h2>
          <p>Ми знаємо, що текст можна додавати (<code>"A" + "B" = "AB"</code>). А що буде, якщо помножити текст (<code>str</code>) на число (<code>int</code>)?</p>
          <p>Python просто повторить цей текст багато разів!</p>
          <div class="code-box">print("Ha" * 3)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">HaHaHa</div>
        `,
        desc: "Створи <code>letter = \"Z\"</code>. Виведи цю змінну, помножену на <b>5</b>.",
        hint: `У функції print() напиши змінну letter, знак множення (*) та число 5.`,
        expected: `ZZZZZ`,
        tests: [
          { type: "stdoutEquals", name: "Букву розмножено", value: "ZZZZZ", normalize: "soft" },
          { type: "codeIncludes", name: "Використано множення", value: "*" }
        ]
      },

      {
        title: "Пастка множення",
        xp: 115,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Рядок на Рядок = Помилка</h2>
          <p>Ти не можеш помножити текст на текст. Код <code>"A" * "5"</code> видасть помилку <i>TypeError</i>.</p>
          <p>Якщо кількість повторень збережена як рядок, її обов'язково треба перетворити на <code>int</code>!</p>
        `,
        desc: "Є <code>word = \"Go!\"</code> та <code>times = \"3\"</code>. Напиши <code>print()</code>, який множить <code>word</code> на <code>times</code>, але перед цим обгорни <code>times</code> у <code>int()</code>.",
        hint: `Твій вивід має виглядати так: print(word * int(times))`,
        expected: `Go!Go!Go!`,
        tests: [
          { type: "stdoutEquals", name: "Множення пройшло успішно", value: "Go!Go!Go!", normalize: "soft" },
          { type: "codeRegex", name: "Використано перетворення", pattern: "int\\s*\\(\\s*times\\s*\\)" }
        ]
      },

      {
        title: "Перетворення: З дробу в ціле",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Відкидання хвоста</h2>
          <p>Команду <code>int()</code> можна використовувати не тільки для тексту, а й для дробів (<code>float</code>). Якщо передати дріб у <code>int()</code>, він просто <b style="color: #ef4444;">відкине</b> все, що після крапки.</p>
          <p><b>Увага:</b> Це не округлення (як в математиці). Він просто відрубує хвіст!</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(int(9.99))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">9</div>
        `,
        desc: "Є дріб <code>x = 5.8</code>. Виведи її на екран, обгорнувши в команду <code>int()</code>.",
        hint: `Напиши: print(int(x))`,
        expected: `5`,
        tests: [
          { type: "stdoutEquals", name: "Хвіст відкинуто", value: "5", normalize: "soft" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(\\s*x\\s*\\)" }
        ]
      },

      {
        title: "Перетворення: У дріб",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Магія кастингу: float()</h2>
          <p>Якщо нам треба зробити звичайне число (або текст) дробовим, ми використовуємо команду <b style="color: #3b82f6;">float()</b>.</p>
          <p>Вона додасть до цілого числа <code>.0</code> або зробить з тексту-дробу справжній дріб.</p>
          <div class="code-box">print(float(7))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">7.0</div>
        `,
        desc: "Задай <code>text = \"3.14\"</code> (як рядок у лапках). Перетвори його на справжній дріб за допомогою <code>float()</code> і виведи на екран.",
        hint: `print(float(text))`,
        expected: `3.14`,
        tests: [
          { type: "stdoutEquals", name: "Дріб відновлено", value: "3.14", normalize: "soft" },
          { type: "codeRegex", name: "Використано float()", pattern: "float\\s*\\(" }
        ]
      },

      {
        title: "Перетворення: У рядок",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Магія кастингу: str()</h2>
          <p>Іноді старий код вимагає, щоб ми додавали текст до тексту тільки плюсом (без f-рядків і ком). Якщо ми спробуємо додати <code>"Текст" + 5</code>, Python видасть помилку (не можна клеїти слова до математики).</p>
          <p>Для цього ми перетворюємо число на текст командою <b style="color: #3b82f6;">str()</b>.</p>
          <div class="code-box">print("Level " + str(5))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">Level 5</div>
        `,
        desc: "Задай <code>hp = 100</code>. Використовуючи плюс (<code>+</code>), виведи рядок: <code>HP: 100</code>. Для цього обгорни змінну <code>hp</code> у команду <code>str()</code>.",
        hint: `print("HP: " + str(hp)). Не забудь пробіл усередині лапок перед закриттям!`,
        expected: `HP: 100`,
        tests: [
          { type: "stdoutEquals", name: "Склеєно успішно", value: "HP: 100", normalize: "soft" },
          { type: "codeRegex", name: "Використано str()", pattern: "str\\s*\\(\\s*hp\\s*\\)" },
          { type: "codeIncludes", name: "Додавання рядків (+)", value: "+" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "Підсумкова 1: Типи даних",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Функція type()</h2>
        `,
        desc: `Створи змінну <code>x = "False"</code> (зверни увагу, воно в лапках!).<br>
        За допомогою <code>print(type(x))</code> виведи її тип. Що скаже Python: bool чи str?`,
        hint: `Все, що знаходиться в лапках — це рядок (str). Виведи тип змінної.`,
        expected: `<class 'str'>`,
        tests: [
          { type: "stdoutEquals", name: "Тип розпізнано", value: "<class 'str'>", normalize: "soft" },
          { type: "codeRegex", name: "Використано type()", pattern: "type\\s*\\(\\s*x\\s*\\)" }
        ]
      },

      {
        title: "Підсумкова 2: Математика чи текст?",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Кастинг int()</h2>
        `,
        desc: `Є змінна <code>money = "150"</code>.<br>
        Тобі треба додати до неї 50, щоб вийшло 200. Перетвори змінну на число за допомогою <code>int()</code> і виведи результат (<code>int(money) + 50</code>).`,
        hint: `Обгорни змінну money у функцію int() перед тим, як додавати до неї 50.`,
        expected: `200`,
        tests: [
          { type: "stdoutEquals", name: "Відбулося додавання чисел", value: "200", normalize: "soft" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(\\s*money\\s*\\)" }
        ]
      },

      {
        title: "Підсумкова 3: Лагодження коду",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Крапка чи кома?</h2>
        `,
        desc: `Цей код видає помилку, бо дроби написані з комою замість крапки:<br>
<code>weight = 5,5</code><br>
<code>height = 1,2</code><br>
Виправ змінні так, щоб вони стали типом <code>float</code>. Потім виведи результат їхнього додавання (має вийти 6.7).`,
        hint: `Заміни коми (,) на крапки (.) в обох числах, а потім напиши print(weight + height).`,
        expected: `6.7`,
        tests: [
          { type: "stdoutEquals", name: "Дроби додалися правильно", value: "6.7", normalize: "soft" },
          { type: "codeIncludes", name: "Крапка замість коми", value: "." },
          { type: "codeRegex", name: "Немає ком", pattern: "5,5|1,2", flags: "g", max: 0 }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🟢 БОС: Картка Монстра",
        xp: 500,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит: Всі типи разом</h2>
          <p>Створи змінні різних типів і збери їх в один акуратний звіт. Пам'ятай про лапки для тексту та крапки для дробів!</p>
        `,
        desc: `Створи 4 змінні з правильними типами даних:<br>
        1. <code>name</code> = <code>"Орк"</code> (str)<br>
        2. <code>level</code> = <code>5</code> (int)<br>
        3. <code>dmg</code> = <code>12.5</code> (float)<br>
        4. <code>is_boss</code> = <code>False</code> (bool)<br><br>
        Використай <b>f-рядок</b>, щоб вивести точнісінько такий звіт одним принтом:<br>
        <code>Ворог Орк (Рівень 5). Урон: 12.5. Бос: False</code>`,
        hint: `Створи 4 змінні. Потім використай print(f"Ворог {name} (Рівень {level}). Урон: {dmg}. Бос: {is_boss}").`,
        expected: `Ворог Орк (Рівень 5). Урон: 12.5. Бос: False`,
        tests: [
          { type: "stdoutEquals", name: "Звіт ідеальний", value: "Ворог Орк (Рівень 5). Урон: 12.5. Бос: False", normalize: "strict" },
          { type: "codeRegex", name: "Рядок (str) створено", pattern: "name\\s*=\\s*['\"]Орк['\"]" },
          { type: "codeRegex", name: "Дріб (float) створено", pattern: "dmg\\s*=\\s*12\\.5" },
          { type: "codeRegex", name: "Логічний тип (bool) створено", pattern: "is_boss\\s*=\\s*False" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true }
        ]
      },

      // ==========================================
// 🟡 РІВЕНЬ: MIDDLE (Складна математика типів та Округлення) — ГОТОВЕ (ПЕРЕПИСАНО ПІД ТВОЮ ПЕРЕВІРКУ)
// ==========================================

{
  title: "Ділення завжди дає float",
  xp: 130,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Особливість ділення</h2>
    <p>У Python є цікаве правило: коли ти додаєш чи множиш цілі числа (<code>int</code>), результат теж буде цілим. Але <b style="color: #ef4444;">звичайне ділення (знак /) ЗАВЖДИ створює дріб (float)</b>.</p>
    <p>Навіть якщо число ділиться ідеально рівно!</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">print(10 / 2)</div>
    <p><b>Результат:</b></p>
    <div class="output-box">5.0 <span style="color:gray;"># Зверни увагу на .0 у кінці</span></div>
  `,
  desc: "Поділи <code>20</code> на <code>4</code> за допомогою звичайного слеша <code>/</code> і виведи результат. Зверни увагу на те, який тип даних ти отримаєш на екрані.",
  hint: `У функції виводу напиши математичний приклад ділення 20 на 4. Використовуй один слеш.`,
  expected: `5.0`,
  tests: [
    { type: "stdoutEquals", name: "Отримано float", value: "5.0", normalize: "soft" },

    // Забороняємо // щоб не обійшли завдання
    { type: "codeRegex", name: "Немає //", pattern: "\\/\\/", flags: "g", max: 0 },

    // Є саме ділення /
    { type: "codeRegex", name: "Використано /", pattern: "\\/" }
  ]
},

{
  title: "Ділення націло (//)",
  xp: 140,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Як позбутися дробів?</h2>
    <p>Що робити, якщо нам потрібен результат ділення як ціле число (<code>int</code>), без хвоста <code>.0</code>?</p>
    <p>Для цього використовують <b style="color: #3b82f6;">подвійний слеш <code>//</code></b>. Він виконує "ділення націло", просто відкидаючи всі дроби (не округлюючи, а саме відкидаючи!).</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">print(10 // 3)</div>
    <p><b>Результат:</b></p>
    <div class="output-box">3 <span style="color:gray;"># Хвіст відкинуто, залишилось ціле число</span></div>
  `,
  desc: "У тебе є <code>17</code> яблук, і ти хочеш порівну поділити їх між <code>5</code> друзями. Скільки цілих яблук отримає кожен? Використай ділення націло <code>//</code>.",
  hint: `Напиши команду виводу, всередині якої поділи 17 на 5 за допомогою подвійного слеша. Це відкине дробову частину.`,
  expected: `3`,
  tests: [
    { type: "stdoutEquals", name: "Ділення націло спрацювало", value: "3", normalize: "soft" },
    { type: "codeIncludes", name: "Використано //", value: "//" }
  ]
},

{
  title: "Остача від ділення (%)",
  xp: 150,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Куди ділась решта?</h2>
    <p>Коли ми поділили 17 яблук на 5 друзів, кожен отримав по 3 яблука (всього роздали 15). А скільки яблук залишилось у кошику? Це називається <b style="color: #f59e0b;">остачею</b>.</p>
    <p>Щоб знайти остачу, програмісти використовують знак відсотка <b style="color: #ef4444;"><code>%</code></b> (його називають оператором "модуло").</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">print(10 % 3)</div>
    <p><b>Результат:</b></p>
    <div class="output-box">1 <span style="color:gray;"># 10 ділиться на 3 тричі (буде 9). 10 - 9 = 1 (остача)</span></div>
  `,
  desc: "Ти маєш <code>25</code> золотих монет і купуєш мечі по <code>7</code> монет кожен. Скільки монет у тебе залишиться після покупки максимальної кількості мечів? Виведи остачу за допомогою <code>%</code>.",
  hint: `Напиши приклад: 25 модуло 7. Знак модуля — це відсоток.`,
  expected: `4`,
  tests: [
    { type: "stdoutEquals", name: "Остачу обчислено", value: "4", normalize: "soft" },
    { type: "codeIncludes", name: "Використано %", value: "%" }
  ]
},

{
  title: "Округлення чисел (round)",
  xp: 160,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Функція round()</h2>
    <p>Ми вже знаємо команду <code>int()</code>, яка просто "відрубує" хвіст у дробу (навіть <code>int(9.9)</code> буде <code>9</code>). Але це не математично!</p>
    <p>Щоб округлити число за справжніми правилами математики (до найближчого цілого), існує функція <b style="color: #10b981;">round()</b>.</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">print(round(9.8))<br>print(round(9.2))</div>
    <p><b>Результат:</b></p>
    <div class="output-box">10<br>9</div>
  `,
  desc: "Задай змінну <code>damage = 15.6</code>. Округли її до найближчого цілого числа за допомогою функції <code>round()</code> та виведи на екран.",
  hint: `Обгорни свою змінну у функцію округлення, а ту, в свою чергу, передай у функцію виводу.`,
  expected: `16`,
  tests: [
    { type: "stdoutEquals", name: "Округлення правильне", value: "16", normalize: "soft" },
    { type: "codeRegex", name: "damage = 15.6", pattern: "damage\\s*=\\s*15\\.6(?!\\d)" },
    { type: "codeRegex", name: "Використано round(damage)", pattern: "round\\s*\\(\\s*damage\\s*\\)" }
  ]
},

{
  title: "Округлення копійок",
  xp: 170,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Скільки знаків залишити?</h2>
    <p>Функція <code>round()</code> має суперсилу: ти можеш сказати їй, скільки цифр після крапки треба залишити. Для цього після числа через кому вказується <b style="color: #3b82f6;">точність</b>.</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">pi = 3.141592<br>print(round(pi, 2))</div>
    <p><b>Результат:</b></p>
    <div class="output-box">3.14</div>
  `,
  desc: "У нас є ціна <code>price = 19.998</code>. Виведи її, округливши рівно до <b>2 знаків</b> після крапки.",
  hint: `Передай у round() два аргументи через кому: саму змінну, і число 2 (яке означає кількість знаків).`,
  expected: `20.0`,
  tests: [
    { type: "stdoutEquals", name: "Округлено до двох знаків", value: "20.0", normalize: "soft" },
    { type: "codeRegex", name: "price = 19.998", pattern: "price\\s*=\\s*19\\.998(?!\\d)" },
    { type: "codeRegex", name: "Правильний синтаксис round(price, 2)", pattern: "round\\s*\\(\\s*price\\s*,\\s*2\\s*\\)" }
  ]
},

{
  title: "Таємниця нуля (bool)",
  xp: 180,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Що є Правда, а що Брехня?</h2>
    <p>Команду <b style="color: #10b981;">bool()</b> можна використовувати для перетворення інших типів даних на логічні (True/False).</p>
    <p>У світі чисел правило дуже просте:<br>
    <b style="color: #ef4444;">Нуль (0)</b> — це завжди <code>False</code> (порожнеча, брехня).<br>
    <b style="color: #3b82f6;">Будь-яке інше число</b> (навіть від'ємне) — це <code>True</code> (правда).</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">print(bool(0))<br>print(bool(50))</div>
    <p><b>Результат:</b></p>
    <div class="output-box">False<br>True</div>
  `,
  desc: "Перевір число <code>-99</code>. Перетвори його на булевий тип за допомогою <code>bool()</code> та виведи. Що це буде: True чи False?",
  hint: `Просто передай від'ємне число всередину функції bool(), а результат виведи на екран.`,
  expected: `True`,
  tests: [
    { type: "stdoutEquals", name: "Від'ємне число є True", value: "True", normalize: "soft" },
    { type: "codeRegex", name: "Використано bool(-99)", pattern: "bool\\s*\\(\\s*-99\\s*\\)" }
  ]
},

{
  title: "Порожнеча в текстах",
  xp: 190,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Правда у словах</h2>
    <p>З текстами (str) логіка така сама. Комп'ютер вважає рядок <code>True</code>, якщо в ньому є хоч щось.</p>
    <ul>
      <li><b style="color: #ef4444;">Порожній рядок <code>""</code></b> — це <code>False</code> (бо він пустий).</li>
      <li>Рядок із текстом (навіть <code>" "</code> з одним пробілом) — це <code>True</code>.</li>
    </ul>
  `,
  desc: "Задай <code>text = \"\"</code> (дві лапки без нічого всередині). Перетвори змінну на логічний тип через <code>bool()</code> і виведи результат.",
  hint: `Створи змінну з порожніми лапками, потім обгорни її у bool() під час виводу.`,
  expected: `False`,
  tests: [
    { type: "stdoutEquals", name: "Порожній рядок це False", value: "False", normalize: "soft" },
    // лапки => raw
    { type: "codeRegex", name: "text = \"\"", pattern: "text\\s*=\\s*['\\\"][\\s]*['\\\"]", checkRaw: true },
    { type: "codeRegex", name: "Використано bool(text)", pattern: "bool\\s*\\(\\s*text\\s*\\)" }
  ]
},

{
  title: "Складний кастинг (float -> str)",
  xp: 200,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Багатошаровий пиріг</h2>
    <p>Що робити, якщо нам прийшов текст з дробом <code>"3.99"</code>, і нам треба витягнути з нього ціле число <code>3</code>?</p>
    <p>Якщо ти напишеш <code>int("3.99")</code> — Python видасть помилку (ValueError). Він скаже: "Я бачу крапку, це не схоже на ціле число!".</p>
    <p><b style="color: #10b981;">Рішення: Кастинг крок за кроком</b></p>
    <p>Спочатку перетворюємо текст на дріб: <code>float("3.99")</code>. А вже потім цей дріб перетворюємо на ціле число: <code>int(float("3.99"))</code>.</p>
  `,
  desc: "Задай змінну <code>data = \"7.85\"</code>. За допомогою подвійного перетворення (спочатку в float, потім в int), витягни і виведи ціле число.",
  hint: `Напиши вкладені функції: int(float(data)). Внутрішня функція перетворить текст на дріб, а зовнішня відкине хвіст.`,
  expected: `7`,
  tests: [
    { type: "stdoutEquals", name: "Подвійний кастинг успішний", value: "7", normalize: "soft" },
    // лапки => raw
    { type: "codeRegex", name: "data = \"7.85\"", pattern: "data\\s*=\\s*['\\\"]7\\.85['\\\"]", checkRaw: true },
    { type: "codeRegex", name: "Використано int(float(data))", pattern: "int\\s*\\(\\s*float\\s*\\(\\s*data\\s*\\)\\s*\\)" }
  ]
},

{
  title: "Математика з True і False",
  xp: 210,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Правда дорівнює Одиниці</h2>
    <p>Під капотом Python вважає, що <b style="color: #3b82f6;">True</b> — це число <b>1</b>, а <b style="color: #ef4444;">False</b> — це число <b>0</b>.</p>
    <p>Тому ти можеш додавати логічні змінні до звичайних чисел!</p>
    <div class="code-box">print(True + 10)</div>
    <p><b>Результат:</b></p>
    <div class="output-box">11</div>
  `,
  desc: "Задай <code>bonus_active = True</code>. Створи змінну <code>score = 50 + bonus_active</code>. Виведи <code>score</code>.",
  hint: `Додай логічну змінну до числа так, ніби це звичайне число. Python сам перетворить True на 1.`,
  expected: `51`,
  tests: [
    { type: "stdoutEquals", name: "Додавання логіки працює", value: "51", normalize: "soft" },
    { type: "codeRegex", name: "bonus_active = True", pattern: "bonus_active\\s*=\\s*True" },
    { type: "codeRegex", name: "score = 50 + bonus_active", pattern: "score\\s*=\\s*50\\s*\\+\\s*bonus_active" }
  ]
},

{
  title: "Типи та f-рядки",
  xp: 220,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Автоматичне склеювання</h2>
    <p>Раніше, щоб зліпити текст і число, нам треба було використовувати <code>str(number)</code>, інакше програма ламалася.</p>
    <p>Але <b style="color: #10b981;">f-рядки</b> мають магічну властивість: усе, що ти кладеш у фігурні дужки <code>{}</code>, автоматично перетворюється на текст!</p>
    <div class="code-box">hp = 100<br>print(f"Здоров'я: {hp}") <span style="color:gray;"># str() писати не треба!</span></div>
  `,
  desc: `У тебе є три змінні різних типів:<br>
  <code>name = "Бот"</code> (str)<br>
  <code>v = 1.5</code> (float)<br>
  <code>status = True</code> (bool)<br>
  За допомогою одного <b>f-рядка</b> виведи текст: <code>Гравець Бот (Версія 1.5). Активний: True</code>.`,
  hint: `Просто підстав усі три змінні у відповідні фігурні дужки всередині f-рядка. Ніяких ручних перетворень не потрібно.`,
  expected: `Гравець Бот (Версія 1.5). Активний: True`,
  tests: [
    { type: "stdoutEquals", name: "Авто-кастинг у f-рядку", value: "Гравець Бот (Версія 1.5). Активний: True", normalize: "strict" },

    // Вимагаємо f-рядок (raw)
    { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\\\"]", checkRaw: true },

    // Забороняємо str(
    { type: "codeRegex", name: "str() не використовувалась", pattern: "str\\s*\\(", flags: "g", max: 0 },

    // Перевіряємо змінні (лапки => raw)
    { type: "codeRegex", name: "name = \"Бот\"", pattern: "name\\s*=\\s*['\\\"]Бот['\\\"]", checkRaw: true },
    { type: "codeRegex", name: "v = 1.5", pattern: "v\\s*=\\s*1\\.5(?!\\d)" },
    { type: "codeRegex", name: "status = True", pattern: "status\\s*=\\s*True" },

    // Один print
    { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 }
  ]
},

{
  title: "Перезапис типу назавжди",
  xp: 230,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Зміна себе</h2>
    <p>Якщо ти напишеш <code>print(int(x))</code>, змінна <code>x</code> перетвориться на число тільки на одну секунду (для виводу). У пам'яті вона залишиться текстом.</p>
    <p>Щоб змінити тип змінної <b style="color: #3b82f6;">назавжди</b>, треба перезаписати її в саму себе.</p>
    <p><b>Приклад:</b></p>
    <div class="code-box">age = "18"<br><b style="color: #ef4444;">age = int(age)</b> <span style="color:gray;"># Тепер це назавжди число</span></div>
  `,
  desc: "Задай <code>coins = \"99\"</code>. На наступному рядку <b>перезапиши</b> змінну <code>coins</code> так, щоб вона назавжди стала числом (через <code>int()</code>). На третьому рядку виведи її тип (<code>type(coins)</code>).",
  hint: `Другий рядок: coins = int(coins). Третій рядок: друк типу змінної.`,
  expected: `<class 'int'>`,
  tests: [
    { type: "stdoutEquals", name: "Тип змінено успішно", value: "<class 'int'>", normalize: "soft" },
    // coins="99" => raw
    { type: "codeRegex", name: "coins = \"99\"", pattern: "coins\\s*=\\s*['\\\"]99['\\\"]", checkRaw: true },
    { type: "codeRegex", name: "Перезапис у себе", pattern: "coins\\s*=\\s*int\\s*\\(\\s*coins\\s*\\)" },
    { type: "codeRegex", name: "Виведено type(coins)", pattern: "type\\s*\\(\\s*coins\\s*\\)" }
  ]
},

{
  title: "Визначення парності (%)",
  xp: 240,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2>Хакинг з остачею</h2>
    <p>Найчастіше оператор остачі <code>%</code> використовують для того, щоб дізнатися, чи є число <b style="color: #10b981;">парним</b> (ділиться на 2).</p>
    <p>Якщо <code>число % 2</code> дорівнює <code>0</code> — воно парне. Якщо дорівнює <code>1</code> — непарне!</p>
  `,
  desc: "Задай число <code>level = 14</code>. Виведи остачу від ділення цього числа на <code>2</code>. Якщо виведеться нуль, значить рівень парний!",
  hint: `Виведи результат математичного виразу: level % 2`,
  expected: `0`,
  tests: [
    { type: "stdoutEquals", name: "Остача дорівнює 0", value: "0", normalize: "soft" },
    { type: "codeRegex", name: "level = 14", pattern: "level\\s*=\\s*14(?!\\d)" },
    { type: "codeRegex", name: "Ділення по модулю на 2", pattern: "level\\s*%\\s*2" }
  ]
},

// ==========================================
// 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
// ==========================================

{
  title: "Підсумкова 1: Дроби і Цілі",
  xp: 300,
  kind: "quiz",
  difficulty: "Middle",
  theory: `
    <h2>Перевірка: Ділення і тип</h2>
  `,
  desc: `Поділи <code>100</code> на <code>3</code> використовуючи ділення націло (подвійний слеш).<br>
  Результат збережи у змінну <code>parts</code>.<br>
  Роздрукуй <code>parts</code>.`,
  hint: `Використай оператор // між числами та збережи у змінну.`,
  expected: `33`,
  tests: [
    { type: "stdoutEquals", name: "Ділення націло правильне", value: "33", normalize: "soft" },
    { type: "codeRegex", name: "parts = 100 // 3", pattern: "parts\\s*=\\s*100\\s*\\/\\/\\s*3" },
    { type: "codeIncludes", name: "Використано //", value: "//" }
  ]
},

{
  title: "Підсумкова 2: Симулятор кастингів",
  xp: 350,
  kind: "quiz",
  difficulty: "Middle",
  theory: `
    <h2>Перевірка: Ланцюг перетворень</h2>
  `,
  desc: `Ти отримав брудні дані: <code>raw_data = "45.9"</code>.<br>
  Твоя мета: дістати з них ціле число 45.<br>
  1. Зроби з тексту дріб.<br>
  2. З дробу зроби ціле число.<br>
  3. Виведи результат.`,
  hint: `Використай вкладені функції: int(float(...))`,
  expected: `45`,
  tests: [
    { type: "stdoutEquals", name: "Дані очищено", value: "45", normalize: "soft" },
    // raw_data="45.9" => raw
    { type: "codeRegex", name: "raw_data задано", pattern: "raw_data\\s*=\\s*['\\\"]45\\.9['\\\"]", checkRaw: true },
    { type: "codeRegex", name: "Використано int(float(raw_data))", pattern: "int\\s*\\(\\s*float\\s*\\(\\s*raw_data\\s*\\)\\s*\\)" }
  ]
},

{
  title: "Підсумкова 3: Математика округлень",
  xp: 400,
  kind: "quiz",
  difficulty: "Middle",
  theory: `
    <h2>Перевірка: Функція round()</h2>
  `,
  desc: `Змінна <code>x = 7.8888</code>.<br>
  Округли її до <b>двох</b> знаків після коми за допомогою <code>round()</code> і виведи.`,
  hint: `Не забудь про другий аргумент у функції round.`,
  expected: `7.89`,
  tests: [
    { type: "stdoutEquals", name: "Округлення до 2 знаків", value: "7.89", normalize: "soft" },
    { type: "codeRegex", name: "x = 7.8888", pattern: "x\\s*=\\s*7\\.8888(?!\\d)" },
    { type: "codeRegex", name: "Використано round(x, 2)", pattern: "round\\s*\\(\\s*x\\s*,\\s*2\\s*\\)" }
  ]
},

// ==========================================
// 🟡 MIDDLE BOSS
// ==========================================

{
  title: "🟡 БОС (Middle): RPG Економіка",
  xp: 600,
  kind: "boss",
  difficulty: "Middle",
  theory: `
    <h2>Фінальний іспит рівня Middle</h2>
    <p>Напиши програму для торговця. Об'єднай ділення націло, остачу та перетворення типів!</p>
  `,
  desc: `1. У гравця є монети (тип текст!): <code>wallet_str = "100"</code>.<br>
  2. Зілля коштує <code>15</code> монет за штуку.<br>
  3. Перетвори гаманець на <b>число</b>.<br>
  4. Дізнайся, <b>скільки цілих зілль</b> (штук) може купити гравець (використай ділення націло <code>//</code>). Збережи в змінну <code>amount</code>.<br>
  5. Дізнайся, <b>скільки монет залишиться</b> (використай модуло <code>%</code>). Збережи в змінну <code>change</code>.<br>
  6. Виведи f-рядком: <code>Куплено: 6 шт. Решта: 10</code> (цифри мають підставитися зі змінних).`,
  hint: `Крок 1: int(wallet_str). Крок 2: amount = гаманець // 15. Крок 3: change = гаманець % 15. Крок 4: f-рядок зі змінними {amount} та {change}.`,
  expected: `Куплено: 6 шт. Решта: 10`,
  tests: [
    { type: "stdoutEquals", name: "Розрахунок ідеальний", value: "Куплено: 6 шт. Решта: 10", normalize: "strict" },

    // wallet_str="100" => raw
    { type: "codeRegex", name: "wallet_str задано", pattern: "wallet_str\\s*=\\s*['\\\"]100['\\\"]", checkRaw: true },

    // Створили amount і change
    { type: "codeRegex", name: "amount обчислено через //", pattern: "amount\\s*=\\s*\\w+\\s*\\/\\/\\s*15" },
    { type: "codeRegex", name: "change обчислено через %", pattern: "change\\s*=\\s*\\w+\\s*%\\s*15" },

    // Є перетворення в int
    { type: "codeRegex", name: "Перетворення str -> int", pattern: "int\\s*\\(\\s*wallet_str\\s*\\)" },

    // Вимагаємо f-рядок і один print
    { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\\\"]", checkRaw: true },
    { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },

    // Підстраховка: реально використані {amount} і {change} (raw)
    { type: "codeRegex", name: "Є {amount}", pattern: "\\{\\s*amount\\s*\\}", checkRaw: true },
    { type: "codeRegex", name: "Є {change}", pattern: "\\{\\s*change\\s*\\}", checkRaw: true }
  ]
},

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Трюки ніндзя та Глибоке розуміння)
      // ==========================================

      {
        title: "Математика з True і False",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Правда дорівнює Одиниці</h2>
          <p>Під капотом Python вважає, що <b style="color: #3b82f6;">True</b> — це звичайне число <b style="color: #10b981;">1</b>, а <b style="color: #ef4444;">False</b> — це число <b style="color: #10b981;">0</b> (булевий тип є підкласом цілих чисел).</p>
          <p>Це означає, що ти можеш додавати і множити логічні змінні!</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(True + 10)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">11</div>
        `,
        desc: "Обчисли математичний вираз: <code>True + True + False</code>. Виведи результат на екран.",
        hint: `Просто напиши ці слова (з великої літери!) і постав між ними знаки плюса всередині функції виводу.`,
        expected: `2`,
        tests: [
          { type: "stdoutEquals", name: "Логіка додана як числа", value: "2", normalize: "soft" },
          { type: "codeIncludes", name: "Використано True", value: "True" },
          { type: "codeIncludes", name: "Використано False", value: "False" }
        ]
      },

      {
        title: "Ілюзія порожнечі",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Чи текст завжди True?</h2>
          <p>Ми вчили, що функція <code>bool()</code> перетворює порожній рядок <code>""</code> на <code>False</code>. Але є одна дуже популярна помилка новачків.</p>
          <p>Якщо ти напишеш рядок <code>"False"</code> або навіть рядок з одним пробілом <code>" "</code>, то <code>bool()</code> скаже, що це <b style="color: #3b82f6;">True</b>! Бо всередині лапок щось є, і неважливо, що саме.</p>
        `,
        desc: "Перевір це! Створи змінну <code>val = \"0\"</code> (нуль у лапках). Обгорни її в <code>bool()</code> і виведи на екран. Що вийде?",
        hint: `Передай змінну з текстовим нулем у функцію bool(), а її виведи через print().`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Текстовий нуль це True", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано bool()", pattern: "bool\\s*\\(" }
        ]
      },

      {
        title: "Професійна перевірка (isinstance)",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Забудь про type() == ...</h2>
          <p>Щоб перевірити, чи є змінна певним типом, новачки пишуть <code>type(x) == int</code>. Але справжні розробники використовують функцію <b style="color: #10b981;">isinstance()</b>.</p>
          <p>Вона працює швидше і вміє перевіряти складніші зв'язки об'єктів. Вона повертає <code>True</code>, якщо тип збігається.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">num = 5<br>print(isinstance(num, int))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">True</div>
        `,
        desc: "Задай <code>x = 5.5</code>. За допомогою функції <code>isinstance(x, float)</code> перевір, чи є змінна дробом, і виведи результат (True або False).",
        hint: `У print() передай функцію isinstance, яка приймає два аргументи через кому: саму змінну, і назву типу (float).`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Перевірку пройдено", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано isinstance", pattern: "isinstance\\s*\\(\\s*x\\s*,\\s*float\\s*\\)" }
        ]
      },

      {
        title: "Під капотом пам'яті (id)",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Унікальний паспорт змінної</h2>
          <p>Коли ти створюєш змінну, Python виділяє для неї комірку в оперативній пам'яті комп'ютера. Ти можеш дізнатися унікальний номер (адресу) цієї комірки за допомогою функції <b style="color: #f59e0b;">id()</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">x = 10<br>print(id(x))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">140723456... <span style="color:gray;"># В кожного цей номер буде свій</span></div>
        `,
        desc: "Створи змінну <code>secret = 777</code>. Виведи її адресу в пам'яті за допомогою функції <code>id()</code>.",
        hint: `Обгорни змінну secret у функцію id(), а результат обгорни у print().`,
        expected: `.*`, // Значення буде унікальним, тому тут просто перевіряємо код
        tests: [
          { type: "codeRegex", name: "Використано id()", pattern: "print\\s*\\(\\s*id\\s*\\(\\s*secret\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "Зведення в ступінь (**)",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Математика високого рівня</h2>
          <p>Для зведення числа в ступінь у Python не потрібні жодні спеціальні модулі. Достатньо використати <b style="color: #ef4444;">дві зірочки <code>**</code></b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(5 ** 2) <span style="color:gray;"># 5 у квадраті</span></div>
          <p><b>Результат:</b></p>
          <div class="output-box">25</div>
        `,
        desc: "Обчисли, скільки буде <b>2 в 10-му ступені</b> (це класичне програмістське число: розмір кілобайта). Виведи результат.",
        hint: `Використай дві зірочки між 2 та 10.`,
        expected: `1024`,
        tests: [
          { type: "stdoutEquals", name: "Ступінь обчислено", value: "1024", normalize: "soft" },
          { type: "codeIncludes", name: "Використано **", value: "**" }
        ]
      },

      {
        title: "Абсолютне значення (abs)",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Видаляємо мінус</h2>
          <p>В іграх координати часто бувають від'ємними (наприклад, гравець пішов назад на -5 метрів). Але відстань не може бути від'ємною!</p>
          <p>Щоб відкинути знак мінуса, використовується функція абсолютного значення (модуля) <b style="color: #3b82f6;">abs()</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(abs(-150))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">150</div>
        `,
        desc: "Ти маєш координату <code>x = -99</code>. Використовуючи функцію <code>abs()</code>, виведи її абсолютне (позитивне) значення.",
        hint: `Обгорни змінну x або саме число у функцію abs() всередині print.`,
        expected: `99`,
        tests: [
          { type: "stdoutEquals", name: "Мінус видалено", value: "99", normalize: "soft" },
          { type: "codeRegex", name: "Використано abs()", pattern: "abs\\s*\\(" }
        ]
      },

      {
        title: "Два зайці одним пострілом (divmod)",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Ділення + Остача</h2>
          <p>Ми вчили ділення націло <code>//</code> та пошук остачі <code>%</code>. Але Python дозволяє обчислити їх ОБИДВА одночасно за одну мілісекунду!</p>
          <p>Для цього є крута функція <b style="color: #10b981;">divmod(число, дільник)</b>. Вона повертає результат у круглих дужках: <code>(ціле, остача)</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(divmod(10, 3))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">(3, 1)</div>
        `,
        desc: "Поділи <code>25</code> на <code>7</code> за допомогою функції <code>divmod()</code> і виведи результат. Скільки разів вміститься по 7, і яка буде остача?",
        hint: `Передай числа 25 і 7 через кому всередину функції divmod, а її виведи на екран.`,
        expected: `(3, 4)`,
        tests: [
          { type: "stdoutEquals", name: "Правильний кортеж", value: "(3, 4)", normalize: "strict" },
          { type: "codeRegex", name: "Використано divmod()", pattern: "divmod\\s*\\(" }
        ]
      },

      {
        title: "Банківське округлення",
        xp: 270,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Дивина функції round()</h2>
          <p>Подумай: куди округлити число <code>2.5</code>? У школі вчать, що завжди вгору (до 3). Але в Python <code>round(2.5)</code> дасть <b style="color: #ef4444;">2</b>!</p>
          <p>Це називається <b>"Банківське округлення"</b>: якщо число закінчується рівно на <code>.5</code>, воно округлюється до найближчого <b style="color: #3b82f6;">ПАРНОГО</b> числа.</p>
          <ul>
            <li><code>round(2.5)</code> -> 2 (парне)</li>
            <li><code>round(3.5)</code> -> 4 (парне)</li>
          </ul>
          <p class="mutedish tiny">Це робиться спеціально, щоб у великих фінансових звітах похибка вирівнювалась (половина йде вниз, половина вгору).</p>
        `,
        desc: "Перевір це! Виведи результати округлення <code>round(4.5)</code> та <code>round(5.5)</code> через пробіл (в одному <code>print</code> через кому).",
        hint: `print(round(4.5), round(5.5)). Зверни увагу, до яких чисел вони притягнуться!`,
        expected: `4 6`,
        tests: [
          { type: "stdoutEquals", name: "Банківське округлення підтверджено", value: "4 6", normalize: "soft" },
          { type: "codeRegex", name: "Округлено два числа", pattern: "round\\s*\\(.*round\\s*\\(" }
        ]
      },

      {
        title: "Бінарний код (bin)",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Мова Матриці</h2>
          <p>Ти можеш подивитися, як число виглядає в "мізках" комп'ютера (в двійковій системі, де є лише 0 і 1).</p>
          <p>Використай функцію <b style="color: #10b981;">bin()</b>. Вона поверне рядок тексту, який починається з <code>0b</code> (означає "binary").</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(bin(2))</div>
          <p><b>Результат:</b></p>
          <div class="output-box">0b10</div>
        `,
        desc: "Переведи число <code>10</code> у двійковий формат за допомогою функції <code>bin()</code> і виведи на екран.",
        hint: `Обгорни десятку у функцію bin().`,
        expected: `0b1010`,
        tests: [
          { type: "stdoutEquals", name: "Бінарний код правильний", value: "0b1010", normalize: "soft" },
          { type: "codeRegex", name: "Використано bin()", pattern: "bin\\s*\\(\\s*10\\s*\\)" }
        ]
      },

      {
        title: "Шістнадцятковий код (hex)",
        xp: 290,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Кольори в вебі</h2>
          <p>У веб-дизайні для кольорів використовується шістнадцяткова система (HEX), де після цифри 9 йдуть букви a, b, c, d, e, f.</p>
          <p>Щоб перетворити звичайне число на HEX-формат, існує функція <b style="color: #f59e0b;">hex()</b>. Рядок почнеться з <code>0x</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(hex(10)) <span style="color:gray;"># Десятка це літера 'a'</span></div>
          <p><b>Результат:</b></p>
          <div class="output-box">0xa</div>
        `,
        desc: "Число 255 — це максимум для кольору в RGB (наприклад, чисто білий колір). Переведи <code>255</code> у HEX-формат за допомогою <code>hex()</code> і виведи.",
        hint: `Обгорни 255 у функцію hex().`,
        expected: `0xff`,
        tests: [
          { type: "stdoutEquals", name: "Отримано ff", value: "0xff", normalize: "soft" },
          { type: "codeRegex", name: "Використано hex()", pattern: "hex\\s*\\(\\s*255\\s*\\)" }
        ]
      },

      {
        title: "Наукова нотація (e)",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Числа з мільйонами нулів</h2>
          <p>Програмісти ліниві, вони не хочуть писати <code>15000000.0</code>. У Python можна використовувати "наукову нотацію" за допомогою літери <b style="color: #ef4444;"><code>e</code></b>.</p>
          <p><code>1.5e3</code> означає "1.5 помножити на 10 у третьому ступені" (тобто 1500.0). <b style="color: #3b82f6;">Такі числа ЗАВЖДИ стають типом float!</b></p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print(1e6) <span style="color:gray;"># Один мільйон</span></div>
          <p><b>Результат:</b></p>
          <div class="output-box">1000000.0</div>
        `,
        desc: "Створи змінну <code>num = 2.5e2</code>. Оскільки вона автоматично стала дробовою (float), перетвори її на ціле число за допомогою <code>int()</code> і виведи.",
        hint: `Спочатку створи змінну через 'e', а потім виведи: print(int(num)).`,
        expected: `250`,
        tests: [
          { type: "stdoutEquals", name: "Конвертовано успішно", value: "250", normalize: "soft" },
          { type: "codeRegex", name: "Використано наукову нотацію", pattern: "2\\.5e2" },
          { type: "codeRegex", name: "Конвертація в int", pattern: "int\\s*\\(" }
        ]
      },

      {
        title: "Число з пробілами (Розумний int)",
        xp: 310,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Очищення від бруду</h2>
          <p>Якщо гравець ввів число і випадково поставив пробіли по краях (<code>"   50   "</code>), функція <code>int()</code> не зламається!</p>
          <p>Вона достатньо розумна, щоб автоматично відкинути зайві пробіли перед тим, як перетворити текст на число.</p>
        `,
        desc: "Задай <code>text = \"   99   \"</code>. Перетвори його на число, відразу додай до нього <code>1</code> і виведи результат. Якщо помилки не буде, ти побачиш 100.",
        hint: `print(int(text) + 1)`,
        expected: `100`,
        tests: [
          { type: "stdoutEquals", name: "Пробіли зігноровано", value: "100", normalize: "soft" },
          { type: "codeRegex", name: "Текст із пробілами", pattern: "['\"]\\s+99\\s+['\"]" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "Підсумкова 1: Логічна пастка",
        xp: 400,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2>Перевірка: bool від тексту</h2>
        `,
        desc: `Перевір два значення за допомогою <code>bool()</code>: порожній рядок <code>""</code> та рядок з пробілом <code>" "</code>.<br>
        Виведи їх через кому в одному принту.`,
        hint: `print(bool(""), bool(" "))`,
        expected: `False True`,
        tests: [
          { type: "stdoutEquals", name: "Відповідь правильна", value: "False True", normalize: "soft" },
          { type: "codeRegex", name: "Перевірка обох рядків", pattern: "bool\\s*\\(\\s*['\"]['\"]\\s*\\).*bool\\s*\\(\\s*['\"]\\s['\"]\\s*\\)", flags: "s" }
        ]
      },

      {
        title: "Підсумкова 2: Конвертер часу",
        xp: 500,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2>Перевірка: divmod</h2>
        `,
        desc: `У тебе є <code>100</code> хвилин. Скільки це годин і хвилин?<br>
        Використай функцію <code>divmod(100, 60)</code> і збережи результат відразу у дві змінні: <code>h, m = divmod(...)</code>.<br>
        Потім виведи f-рядок: <code>Час: 1h 40m</code>.`,
        hint: `h, m = divmod(100, 60). А потім f-рядок з цими двома змінними.`,
        expected: `Час: 1h 40m`,
        tests: [
          { type: "stdoutEquals", name: "Формат ідеальний", value: "Час: 1h 40m", normalize: "soft" },
          { type: "codeRegex", name: "Розпакування divmod", pattern: "h\\s*,\\s*m\\s*=\\s*divmod\\s*\\(\\s*100\\s*,\\s*60\\s*\\)" }
        ]
      },

      {
        title: "Підсумкова 3: Математика хакера",
        xp: 600,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2>Перевірка: abs + ступінь</h2>
        `,
        desc: `Візьми число <code>-5</code>. Знайди його абсолютне значення (щоб воно стало позитивним). А потім зведи це значення у ступінь <code>3</code>.<br>
        Виведи результат (має вийти 125). Ти можеш зробити це в один рядок!`,
        hint: `print(abs(-5) ** 3)`,
        expected: `125`,
        tests: [
          { type: "stdoutEquals", name: "Обчислення правильне", value: "125", normalize: "soft" },
          { type: "codeRegex", name: "Комбінація abs і **", pattern: "abs\\s*\\(\\s*-5\\s*\\)\\s*\\*\\*\\s*3" }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🔴 БОС (Senior): Системний Дешифратор",
        xp: 800,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2>Фінальний бос модуля Типів</h2>
          <p>До нас прийшли брудні дані з сервера. Твоя місія: очистити їх, знайти модуль та перетворити на код Матриці!</p>
        `,
        desc: `Тобі дано "брудний" рядок: <code>raw_data = "  -255  "</code>.<br>
        Напиши алгоритм:<br>
        1. Зроби з тексту справжнє ціле число (використай <code>int</code>).<br>
        2. Знайди його абсолютне значення без мінуса (через <code>abs</code>).<br>
        3. Перетвори це позитивне число на шістнадцятковий код (через <code>hex</code>).<br>
        4. За допомогою f-рядка виведи фінальний звіт: <code>Valid: True | Num: 255 | Hex: 0xff</code>.`,
        hint: `Кроки: num = int(raw_data). Далі: positive = abs(num). Далі: code = hex(positive). І фінальний print(f"Valid: {isinstance(num, int)} | Num: {positive} | Hex: {code}"). Або просто вручну напиши True у f-рядку.`,
        expected: `Valid: True | Num: 255 | Hex: 0xff`,
        tests: [
          { type: "stdoutEquals", name: "Звіт ідеальний", value: "Valid: True | Num: 255 | Hex: 0xff", normalize: "strict" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(" },
          { type: "codeRegex", name: "Використано abs()", pattern: "abs\\s*\\(" },
          { type: "codeRegex", name: "Використано hex()", pattern: "hex\\s*\\(" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true }
        ]
      }

    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
