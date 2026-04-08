// js/data/python/m_bonus_logic.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_bonus_logic",
    title: "Додаткові випробування: Логіка",
    icon: "ri-git-branch-fill",
    color: "#f43f5e", // Яскраво-рожевий для бонусів
    desc: "24 додаткові задачі виключно на if/else, and/or, match-case та тернарні оператори. Прокачай свою логіку!",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базові розгалуження)
      // ==========================================

      {
        title: "🌟 Секретне слово",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Базова перевірка</h2>
          <p>Згадаймо основи: <code>if</code> перевіряє умову, а <code>else</code> спрацьовує, якщо умова хибна.</p>
          <div class="code-box">if word == "ключ":<br>    print("Відкрито")<br>else:<br>    print("Закрито")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Охоронець просить назвати пароль. Тільки слово "відкрий" дозволить пройти далі.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">pwd = input("Пароль: ")</code>.<br>
            Якщо <code style="color: #0ea5e9;">pwd == "відкрий"</code>, виведи <code>"Проходь"</code>.<br>
            Інакше (<code>else</code>) виведи <code>"Стій"</code>.
          </div>
        `,
        hint: `if pwd == "відкрий":\n    print("Проходь")\nelse:\n    print("Стій")`,
        expected: `Пароль: відкрий\nПроходь`,
        tests: [
          { type: "codeRegex", name: "Перевірка пароля", pattern: "if\\s+pwd\\s*==\\s*['\"]відкрий['\"]\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]Стій['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Кратність числу (%)",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ділення без остачі</h2>
          <p>Оператор <code>%</code> (остача) ідеально підходить для перевірки кратності. Якщо <code>x % 5 == 0</code>, значить число ділиться на 5 без остачі!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Магазин видає бонусний купон кожному 5-му покупцю. Програма має перевірити номер чека.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">num = int(input("Номер: "))</code>.<br>
            Якщо остача від ділення <code>num</code> на 5 дорівнює нулю (<code style="color: #0ea5e9;">num % 5 == 0</code>), виведи <code>"Бонус!"</code>.<br>
            Інакше виведи <code>"Звичайний чек"</code>.
          </div>
        `,
        hint: `if num % 5 == 0:`,
        expected: `Номер: 15\nБонус!`,
        tests: [
          { type: "codeRegex", name: "Перевірка кратності 5", pattern: "if\\s+num\\s*%\\s*5\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🌟 Ліміт швидкості",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Більше чи менше?</h2>
          <p>Використовуємо оператори <code>&gt;</code> та <code>&lt;=</code> для перевірки числових лімітів.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Радар вимірює швидкість авто. Якщо швидкість більша за 50, виписується штраф. Якщо 50 або менше — все добре.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">speed = int(input("Швидкість: "))</code>.<br>
            Якщо <code>speed &gt; 50</code>, виведи <code>"Штраф"</code>.<br>
            Інакше виведи <code>"Ок"</code>.
          </div>
        `,
        hint: `if speed > 50:`,
        expected: `Швидкість: 60\nШтраф`,
        tests: [
          { type: "codeRegex", name: "Перевірка швидкості", pattern: "if\\s+speed\\s*>\\s*50\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🌟 Три стани (elif)",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Якщо не перше і не друге</h2>
          <p>Для перевірки трьох різних станів ми використовуємо ланцюг <code>if -> elif -> else</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Вода може бути у трьох станах: лід (менше 0), пара (100 і більше), та звичайна вода (усе, що між ними).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>t = int(input("Градуси: "))</code>.<br>
            - Якщо <code>t &gt;= 100</code>, виведи <code>"Пара"</code>.<br>
            - <b>elif</b> <code>t &lt; 0</code>, виведи <code>"Лід"</code>.<br>
            - <b>else</b>, виведи <code>"Вода"</code>.
          </div>
        `,
        hint: `if t >= 100:\n...\nelif t < 0:\n...\nelse:`,
        expected: `Градуси: 45\nВода`,
        tests: [
          { type: "codeRegex", name: "Умова Пара", pattern: "if\\s+t\\s*>=\\s*100\\s*:" },
          { type: "codeRegex", name: "Умова Лід (elif)", pattern: "elif\\s+t\\s*<\\s*0\\s*:" },
          { type: "codeRegex", name: "Умова Вода (else)", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🌟 Авто-знижка",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математика після перевірки</h2>
          <p>Ми можемо змінити значення змінної всередині <code>if</code>, а потім вивести її вже оновленою.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Якщо сума покупки перевищує 500 грн, магазин автоматично віднімає 50 грн знижки.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>price = int(input("Ціна: "))</code>.<br>
            Якщо <code>price &gt; 500</code>: відніми 50 (<code>price -= 50</code>).<br>
            Зовні <code>if</code> (без відступу) виведи: <code>print("До сплати:", price)</code>.
          </div>
          <div class="task-note">
            <b>Важливо:</b> Тобі не потрібен блок <code>else</code>. Якщо ціна менша за 500, код просто проігнорує знижку і надрукує оригінальну ціну.
          </div>
        `,
        hint: `if price > 500:\n    price -= 50\nprint("До сплати:", price)`,
        expected: `Ціна: 600\nДо сплати: 550`,
        tests: [
          { type: "codeRegex", name: "Перевірка ціни", pattern: "if\\s+price\\s*>\\s*500\\s*:" },
          { type: "codeRegex", name: "Віднімання знижки", pattern: "price\\s*-\\s*=\\s*50" },
          { type: "codeRegex", name: "Друк зовні", pattern: "\\nprint\\s*\\(\\s*['\"]До сплати:['\"]\\s*,\\s*price\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Незалежні перевірки",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Два різних IF</h2>
          <p>Якщо написати кілька <code>if</code> підряд (без <code>elif</code>), Python перевірить <b>КОЖЕН</b> із них незалежно від результату попередніх.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Герой знайшов скриню. Якщо його рівень &gt;= 5, він отримує Щит. А якщо в нього є ще й золотий ключ, він отримує Меч (він може отримати і те, і інше!).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>lvl = int(input("Рівень: "))</code> та <code>key = input("Ключ: ")</code>.<br>
            Напиши <b>перший if</b>: якщо <code>lvl &gt;= 5</code>, виведи <code>"Отримано Щит"</code>.<br>
            Напиши <b>другий if</b> (без відступу від краю): якщо <code>key == "золото"</code>, виведи <code>"Отримано Меч"</code>.
          </div>
        `,
        hint: `Тут має бути два блоки if, один під одним. Жодних elif!`,
        expected: `Рівень: 10\nКлюч: золото\nОтримано Щит\nОтримано Меч`,
        tests: [
          { type: "codeRegex", name: "Перший if", pattern: "if\\s+lvl\\s*>=\\s*5\\s*:" },
          { type: "codeRegex", name: "Другий if", pattern: "\\nif\\s+key\\s*==\\s*['\"]золото['\"]\\s*:" },
          { type: "codeRegex", name: "Без elif", pattern: "elif", flags: "g", max: 0 }
        ]
      },

      {
        title: "🌟 Ціна квитка",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Каскад умов</h2>
          <p>Ланцюг <code>elif</code> перевіряється згори донизу. Перша правдива умова зупиняє перевірку.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Каса зоопарку розраховує ціну квитка: до 7 років — 0 грн, до 18 років — 50 грн, усім іншим — 100 грн.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>age = int(input("Вік: "))</code>.<br>
            - Якщо <code>age &lt; 7</code>: виведи <code>"0 грн"</code>.<br>
            - <b>elif</b> <code>age &lt; 18</code>: виведи <code>"50 грн"</code>.<br>
            - <b>else</b>: виведи <code>"100 грн"</code>.
          </div>
        `,
        hint: `if age < 7:\n...\nelif age < 18:\n...\nelse:\n...`,
        expected: `Вік: 10\n50 грн`,
        tests: [
          { type: "codeRegex", name: "Умова < 7", pattern: "if\\s+age\\s*<\\s*7\\s*:" },
          { type: "codeRegex", name: "Умова < 18", pattern: "elif\\s+age\\s*<\\s*18\\s*:" },
          { type: "codeRegex", name: "Умова else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🐉 БОС (Junior): Розподіл класів",
        xp: 300,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Junior</h2>
          <p>Поєднай перевірки тексту та чисел для визначення долі гравця.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Капелюх розподіляє учнів. Якщо ти обрав шлях "Магія", ти стаєш Магом. Якщо обрав "Меч" і твоя сила &gt;= 50, ти стаєш Лицарем. В усіх інших випадках ти стаєш Селянином.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>path = input("Шлях: ")</code> та <code>power = int(input("Сила: "))</code>.<br>
            - Якщо <code>path == "Магія"</code>: виведи <code>"Клас: Маг"</code>.<br>
            - <b>elif</b> <code>path == "Меч"</code>: <b>всередині</b> цього блоку напиши ще один <code>if power &gt;= 50:</code> (виведи <code>"Клас: Лицар"</code>), а до нього <code>else:</code> (виведи <code>"Клас: Селянин"</code>).<br>
            - <b>else</b> (для зовнішнього <code>path</code>): виведи <code>"Клас: Селянин"</code>.
          </div>
        `,
        hint: `if path == "Магія":\n...\nelif path == "Меч":\n    if power >= 50:\n        ...\n    else:\n        ...\nelse:\n...`,
        expected: `Шлях: Меч\nСила: 60\nКлас: Лицар`,
        tests: [
          { type: "codeRegex", name: "Зовнішній if/elif", pattern: "if\\s+path\\s*==\\s*['\"]Магія['\"]\\s*:.*elif\\s+path\\s*==\\s*['\"]Меч['\"]\\s*:", flags: "s" },
          { type: "codeRegex", name: "Вкладений if", pattern: "\\n\\s{4,}if\\s+power\\s*>=\\s*50\\s*:\\s*\\n\\s{8,}print" },
          { type: "codeRegex", name: "Вкладений else", pattern: "\\n\\s{4,}else\\s*:\\s*\\n\\s{8,}print" },
          { type: "codeRegex", name: "Зовнішній else", pattern: "\\nelse\\s*:\\s*\\n\\s{4,}print" }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Логічні оператори)
      // ==========================================

      {
        title: "🌟 Суворі вимоги (and)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Тільки разом</h2>
          <p>Оператор <code>and</code> вимагає, щоб ОБИДВІ умови були <code>True</code>.</p>
          <div class="code-box">if a == 1 <b style="color: #10b981;">and</b> b == 1:<br>    print("Обидва дорівнюють 1")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Двері сховища відчиняться тільки тоді, коли обидва ключі вставлено і повернуто (статус "ok").</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>key1 = input("Ключ 1: ")</code> та <code>key2 = input("Ключ 2: ")</code>.<br>
            Якщо <code>key1 == "ok"</code> <b>І</b> <code>key2 == "ok"</code>, виведи <code>"Сховище відкрито"</code>.<br>
            Інакше виведи <code>"Тривога"</code>.
          </div>
        `,
        hint: `if key1 == "ok" and key2 == "ok":`,
        expected: `Ключ 1: ok\nКлюч 2: ok\nСховище відкрито`,
        tests: [
          { type: "codeRegex", name: "Перевірка and", pattern: "if\\s+key1\\s*==\\s*['\"]ok['\"]\\s+and\\s+key2\\s*==\\s*['\"]ok['\"]\\s*:" },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🌟 Достатньо одного (or)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Добра логіка</h2>
          <p>Оператор <code>or</code> пропускає далі, якщо ХОЧА Б ОДНА умова <code>True</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Університет приймає абітурієнта, якщо він склав математику на 200 балів АБО фізику на 200 балів.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>math = int(input("Математика: "))</code> та <code>phys = int(input("Фізика: "))</code>.<br>
            Якщо <code>math == 200</code> <b>АБО</b> <code>phys == 200</code>, виведи <code>"Прийнято"</code>.<br>
            Інакше виведи <code>"Відмова"</code>.
          </div>
        `,
        hint: `if math == 200 or phys == 200:`,
        expected: `Математика: 150\nФізика: 200\nПрийнято`,
        tests: [
          { type: "codeRegex", name: "Перевірка or", pattern: "if\\s+math\\s*==\\s*200\\s+or\\s+phys\\s*==\\s*200\\s*:" }
        ]
      },

      {
        title: "🌟 Дозволений список (in)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Масове OR</h2>
          <p>Замість <code>if a == 1 or a == 2 or a == 3:</code> програмісти пишуть <code>if a in [1, 2, 3]:</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система перевіряє, чи є введений колір у списку кольорів світлофора.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>color = input("Колір: ")</code>.<br>
            Якщо <code>color</code> знаходиться <b>В</b> (<code>in</code>) списку <code>["червоний", "жовтий", "зелений"]</code>, виведи <code>"Це світлофор"</code>.<br>
            Інакше виведи <code>"Невідомо"</code>.
          </div>
        `,
        hint: `if color in ["червоний", "жовтий", "зелений"]:`,
        expected: `Колір: зелений\nЦе світлофор`,
        tests: [
          { type: "codeRegex", name: "Перевірка in list", pattern: "if\\s+color\\s+in\\s*\\[\\s*['\"]червоний['\"]\\s*,\\s*['\"]жовтий['\"]\\s*,\\s*['\"]зелений['\"]\\s*\\]\\s*:" }
        ]
      },

      {
        title: "🌟 Перевірка тексту (not in)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Безпека перш за все</h2>
          <p>Оператор <code>not in</code> ідеальний для перевірки відсутності заборонених слів у тексті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач створює ім'я. Система забороняє використовувати слово "admin" як частину імені.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>name = input("Ім'я: ").lower()</code>.<br>
            Якщо <code>"admin"</code> <b>ВІДСУТНЄ</b> (<code>not in</code>) у змінній <code>name</code>, виведи <code>"Збережено"</code>.<br>
            Інакше виведи <code>"Заборонене ім'я"</code>.
          </div>
        `,
        hint: `if "admin" not in name:`,
        expected: `Ім'я: super_admin123\nЗаборонене ім'я`,
        tests: [
          { type: "codeRegex", name: "Перевірка not in", pattern: "if\\s+['\"]admin['\"]\\s+not\\s+in\\s+name\\s*:" }
        ]
      },

      {
        title: "🌟 Методи в умові",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Прямий виклик</h2>
          <p>Методи, які повертають True/False, можна ставити прямо в <code>if</code>.</p>
          <div class="code-box">if text.startswith("A"):<br>    print("Починається на А")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи введений номер телефону починається з українського коду "+380".</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>phone = input("Телефон: ")</code>.<br>
            Якщо <code>phone.startswith("+380")</code>, виведи <code>"Україна"</code>.<br>
            Інакше виведи <code>"Інша країна"</code>.
          </div>
        `,
        hint: `if phone.startswith("+380"):`,
        expected: `Телефон: +380991234567\nУкраїна`,
        tests: [
          { type: "codeRegex", name: "Використано startswith", pattern: "if\\s+phone\\.startswith\\s*\\(\\s*['\"]\\+380['\"]\\s*\\)\\s*:" }
        ]
      },

      {
        title: "🌟 Неявна істина (Truthy)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Короткий запис</h2>
          <p>Щоб перевірити, чи не порожній рядок, достатньо написати <code>if text:</code>. Порожній рядок (як і нуль) — це False.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Якщо користувач просто натисне Enter, поле залишиться порожнім і система має видати помилку.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>cmd = input("Команда: ")</code>.<br>
            Використай коротку умову: <code>if cmd:</code>. Якщо змінна не порожня, виведи <code>"Виконую"</code>.<br>
            Інакше виведи <code>"Порожній ввід"</code>.
          </div>
          <div class="task-note">
            <b>Важливо:</b> Не пиши <code>cmd != ""</code>. Використай саме <code>if cmd:</code>.
          </div>
        `,
        hint: `if cmd:\n    print("Виконую")`,
        expected: `Команда: \nПорожній ввід`,
        tests: [
          { type: "codeRegex", name: "Коротка перевірка (Truthy)", pattern: "if\\s+cmd\\s*:" },
          { type: "codeRegex", name: "Без зайвих знаків", pattern: "!=|==", flags: "g", max: 0 }
        ]
      },

      {
        title: "🌟 Комбо-фільтр (and + not)",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Складна логіка</h2>
          <p>Ми можемо поєднувати перевірку методів та заперечення в одному рядку.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Фільтр нікнеймів: нік має складатися ТІЛЬКИ з літер, і при цьому він НЕ має бути словом "admin".</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>nick = input("Нік: ")</code>.<br>
            Напиши умову: якщо <code>nick.isalpha()</code> <b>І</b> <code>nick != "admin"</code>, виведи <code>"Ок"</code>.<br>
            Інакше виведи <code>"Помилка"</code>.
          </div>
        `,
        hint: `if nick.isalpha() and nick != "admin":`,
        expected: `Нік: admin\nПомилка`,
        tests: [
          { type: "codeRegex", name: "Подвійна перевірка", pattern: "if\\s+nick\\.isalpha\\s*\\(\\)\\s+and\\s+nick\\s*!=\\s*['\"]admin['\"]\\s*:" }
        ]
      },

      {
        title: "🐉 БОС (Middle): Валідатор Реєстрації",
        xp: 400,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Middle</h2>
          <p>Збери великий ланцюг перевірок для валідації пароля.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Пароль перевіряється по черзі: спочатку на порожнечу, потім на довжину, потім на наявність спецсимволу.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>pwd = input("Пароль: ")</code>.<br>
            - Якщо <code>not pwd</code> (порожній): <code>"Помилка 1"</code>.<br>
            - <b>elif</b> <code>len(pwd) &lt; 6</code>: <code>"Помилка 2"</code>.<br>
            - <b>elif</b> <code>"_" not in pwd</code> (немає підкреслення): <code>"Помилка 3"</code>.<br>
            - <b>else</b> (все пройшло): <code>"Успіх"</code>.
          </div>
        `,
        hint: `Ланцюг: if not pwd: ... elif len(pwd) < 6: ... elif "_" not in pwd: ... else: ...`,
        expected: `Пароль: 12345_6\nУспіх`,
        tests: [
          { type: "codeRegex", name: "if not", pattern: "if\\s+not\\s+pwd\\s*:" },
          { type: "codeRegex", name: "elif len", pattern: "elif\\s+len\\s*\\(\\s*pwd\\s*\\)\\s*<\\s*6\\s*:" },
          { type: "codeRegex", name: "elif not in", pattern: "elif\\s+['\"]_['\"]\\s+not\\s+in\\s+pwd\\s*:" },
          { type: "codeRegex", name: "else", pattern: "else\\s*:" }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Продвинуті оператори)
      // ==========================================

      {
        title: "🌟 Тернарний оператор",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">If-else в один рядок</h2>
          <p>Синтаксис: <code>результат = A if умова else B</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Швидко визнач статус числа.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>num = int(input("N: "))</code>.<br>
            В ОДИН рядок створи змінну <code>res</code>: вона дорівнює <code>"Додатне"</code>, якщо <code>num &gt; 0</code>, інакше <code>"Від'ємне/Нуль"</code>.<br>
            Виведи <code>res</code>.
          </div>
        `,
        hint: `res = "Додатне" if num > 0 else "Від'ємне/Нуль"`,
        expected: `N: 5\nДодатне`,
        tests: [
          { type: "codeRegex", name: "Тернарний оператор", pattern: "res\\s*=\\s*['\"]Додатне['\"]\\s+if\\s+num\\s*>\\s*0\\s+else\\s+['\"]Від'ємне/Нуль['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Тернарний всередині print",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Миттєвий вивід</h2>
          <p>Ми можемо ставити тернарний оператор прямо у функцію виводу!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма друкує результат перевірки здоров'я.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>hp = int(input("HP: "))</code>.<br>
            В одному рядку напиши: <code>print("Живий" if hp &gt; 0 else "Мертвий")</code>.
          </div>
        `,
        hint: `print("Живий" if hp > 0 else "Мертвий")`,
        expected: `HP: 0\nМертвий`,
        tests: [
          { type: "codeRegex", name: "Тернарний в print", pattern: "print\\s*\\(\\s*['\"]Живий['\"]\\s+if\\s+hp\\s*>\\s*0\\s+else\\s+['\"]Мертвий['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Трюк: or для дефолту",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ледачий OR</h2>
          <p>Якщо зліва від <code>or</code> порожнеча (False), він бере значення справа.</p>
          <div class="code-box">x = input() or "Дефолт"</div>
        `,
        desc: `
          <div class="task-main">
            <p>Якщо користувач не ввів порт (натиснув Enter), сервер використовує порт 8080.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>port = input("Порт: ")</code> і відразу додай <code>or "8080"</code>.<br>
            Виведи <code>port</code>.
          </div>
        `,
        hint: `port = input("Порт: ") or "8080"`,
        expected: `Порт: \n8080`,
        tests: [
          { type: "codeRegex", name: "Трюк or", pattern: "port\\s*=\\s*input\\s*\\(.*\\)\\s+or\\s+['\"]8080['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Ланцюг порівнянь",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Стиль математики</h2>
          <p>Python дозволяє писати <code>0 &lt; x &lt; 100</code> без використання <code>and</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи відсоток зарядки знаходиться в межах від 1 до 99.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>batt = int(input("Заряд: "))</code>.<br>
            Якщо <code>0 &lt; batt &lt; 100</code>, виведи <code>"В процесі"</code>. Інакше виведи <code>"Крайність"</code>.
          </div>
        `,
        hint: `if 0 < batt < 100:`,
        expected: `Заряд: 50\nВ процесі`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок", pattern: "if\\s+0\\s*<\\s*batt\\s*<\\s*100\\s*:" }
        ]
      },

      {
        title: "🌟 Функція any()",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Хоча б одне True</h2>
          <p><code>any([False, True, False])</code> поверне <code>True</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Якщо хоча б один з 3 модулів подає сигнал помилки (1), спрацьовує тривога.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>m1 = 0</code>, <code>m2 = 1</code>, <code>m3 = 0</code>.<br>
            Використай <code>if any([m1 == 1, m2 == 1, m3 == 1]):</code>.<br>
            Виведи <code>"Помилка в модулі"</code>.
          </div>
        `,
        hint: `if any([m1 == 1, m2 == 1, m3 == 1]):`,
        expected: `Помилка в модулі`,
        tests: [
          { type: "stdoutEquals", name: "Знайдено помилку", value: "Помилка в модулі", normalize: "soft" },
          { type: "codeRegex", name: "Використано any", pattern: "any\\s*\\(\\s*\\[" }
        ]
      },

      {
        title: "🌟 Функція all()",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Тільки коли всі True</h2>
          <p><code>all([True, True, False])</code> поверне <code>False</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Усі три перевірки мають бути True, щоб сервер запустився.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>db = True</code>, <code>web = True</code>, <code>api = True</code>.<br>
            Якщо <code>all([db, web, api]):</code> виведи <code>"Всі системи готові"</code>.
          </div>
        `,
        hint: `if all([db, web, api]):`,
        expected: `Всі системи готові`,
        tests: [
          { type: "stdoutEquals", name: "Всі готові", value: "Всі системи готові", normalize: "soft" },
          { type: "codeRegex", name: "Використано all", pattern: "all\\s*\\(\\s*\\[\\s*db\\s*,\\s*web\\s*,\\s*api\\s*\\]\\s*\\)" }
        ]
      },

      {
        title: "🌟 Match-Case: Ор ( | )",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Альтернативи в case</h2>
          <p>Використовуємо <code>match</code> та вертикальну риску <code>|</code> для об'єднання умов.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Маршрутизатор напрямків.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>dir = input("Куди: ")</code>.<br>
            Напиши <code>match dir:</code><br>
            - <code>case "w" | "n":</code> виведи <code>"Вгору"</code>.<br>
            - <code>case "s":</code> виведи <code>"Вниз"</code>.<br>
            - <code>case _:</code> виведи <code>"Стоїмо"</code>.
          </div>
        `,
        hint: `case "w" | "n":`,
        expected: `Куди: w\nВгору`,
        tests: [
          { type: "codeRegex", name: "match-case", pattern: "match\\s+dir\\s*:" },
          { type: "codeRegex", name: "Використано |", pattern: "case\\s+['\"]w['\"]\\s*\\|\\s*['\"]n['\"]\\s*:" }
        ]
      },

      {
        title: "👑 БОС (Senior): Маршрутизатор (Guards)",
        xp: 500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Абсолютний контроль</h2>
          <p>Поєднуємо <code>match</code>, об'єднання значень <code>|</code> та охоронців <code>if</code> в одному місці.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Обробка системного коду. Якщо код 200 або 201 — це успіх. Якщо код 404, але сервер увімкнений (is_on) — це помилка сторінки. Якщо сервер вимкнений — це критичний збій.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>is_on = True</code>.<br>
            Запитай <code>code = int(input("Код: "))</code>.<br>
            Використай <code>match code:</code><br>
            - <code>case 200 | 201:</code> виведи <code>"Успіх"</code>.<br>
            - <code>case 404 if is_on:</code> виведи <code>"Не знайдено"</code>.<br>
            - <code>case _:</code> виведи <code>"Критикал"</code>.
          </div>
        `,
        hint: `case 404 if is_on:\n    print("Не знайдено")`,
        expected: `Код: 404\nНе знайдено`,
        tests: [
          { type: "codeRegex", name: "Match і OR", pattern: "case\\s+200\\s*\\|\\s*201\\s*:" },
          { type: "codeRegex", name: "Guard if", pattern: "case\\s+404\\s+if\\s+is_on\\s*:" },
          { type: "codeRegex", name: "Default", pattern: "case\\s+_\\s*:" }
        ]
      }

    ]
  };

  window.addPracticeModule(moduleObj);
})();