// js/data/python/m_bonus_variables.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_bonus_variables",
    title: "Додаткові випробування: Змінні",
    icon: "ri-box-1-fill",
    color: "#f43f5e", // Яскраво-рожевий для бонусів
    desc: "24 задачі на керування пам'яттю, правила іменування, математику змінних та магічний обмін.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Створення та перезапис)
      // ==========================================

      {
        title: "🌟 Сейф із даними",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Базове збереження</h2>
          <p>Змінна — це коробка, куди ми кладемо дані через знак дорівнює <code>=</code>.</p>
          <div class="code-box">item = "Ключ"<br>print(item)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має запам'ятати секретний код відступу і вивести його.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">secret</code>. Поклади в неї число <code style="color: #0ea5e9;">1024</code>.<br>
            Виведи її за допомогою <code>print()</code>.
          </div>
        `,
        hint: `secret = 1024\nprint(secret)`,
        expected: `1024`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "1024", normalize: "soft" },
          { type: "codeRegex", name: "Змінну створено", pattern: "secret\\s*=\\s*1024" },
          { type: "codeRegex", name: "Змінну виведено", pattern: "print\\s*\\(\\s*secret\\s*\\)" }
        ]
      },

      {
        title: "🌟 Еволюція героя",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зміна в часі</h2>
          <p>Щоб змінити значення, достатньо просто перезаписати змінну тим самим знаком <code>=</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Герой спочатку був "Новачком", а потім став "Майстром". Покажи цю зміну.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b><br>
            1. Створи <code style="color: #0ea5e9;">hero = "Новачок"</code> і виведи змінну.<br>
            2. Перезапиши: <code style="color: #0ea5e9;">hero = "Майстер"</code> і знову виведи змінну.
          </div>
        `,
        hint: `hero = "Новачок"\nprint(hero)\nhero = "Майстер"\nprint(hero)`,
        expected: `Новачок\nМайстер`,
        tests: [
          { type: "stdoutEquals", name: "Виведено 2 стани", value: "Новачок\nМайстер", normalize: "soft" },
          { type: "codeRegex", name: "Перезапис", pattern: "hero\\s*=\\s*['\"]Новачок['\"].*hero\\s*=\\s*['\"]Майстер['\"]", flags: "s" }
        ]
      },

      {
        title: "🌟 Тінь змінної",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Копіювання</h2>
          <p>Можна покласти значення однієї змінної в іншу: <code>b = a</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Другий гравець копіює статистику першого гравця.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">p1_score = 500</code>.<br>
            Створи <code style="color: #0ea5e9;">p2_score</code> і прирівняй її до <code>p1_score</code>.<br>
            Виведи <code>p2_score</code>.
          </div>
        `,
        hint: `p2_score = p1_score`,
        expected: `500`,
        tests: [
          { type: "codeRegex", name: "Копіювання", pattern: "p2_score\\s*=\\s*p1_score" },
          { type: "codeRegex", name: "Друк копії", pattern: "print\\s*\\(\\s*p2_score\\s*\\)" }
        ]
      },

      {
        title: "🌟 Пастка регістра",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Великі букви</h2>
          <p>Змінні <code>gold</code> та <code>Gold</code> — це дві абсолютно різні коробки!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи системі, що велика і мала літери створюють різні об'єкти пам'яті.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">hp = 10</code> та <code style="color: #0ea5e9;">HP = 100</code>.<br>
            Виведи їх через кому в одному принті: спочатку маленьку, потім велику.
          </div>
        `,
        hint: `print(hp, HP)`,
        expected: `10 100`,
        tests: [
          { type: "codeRegex", name: "Створено дві різні", pattern: "hp\\s*=\\s*10.*HP\\s*=\\s*100", flags: "s" },
          { type: "codeRegex", name: "Друк обох", pattern: "print\\s*\\(\\s*hp\\s*,\\s*HP\\s*\\)" }
        ]
      },

      {
        title: "🌟 Хамелеон",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Динамічна типізація</h2>
          <p>В Python змінна може змінити свій тип даних прямо під час роботи (число може стати текстом).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Код статусу (число) перетворюється на текстове повідомлення.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">status = 404</code>.<br>
            Перезапиши: <code style="color: #0ea5e9;">status = "Not Found"</code>.<br>
            Виведи <code>status</code>.
          </div>
        `,
        hint: `status = 404\nstatus = "Not Found"\nprint(status)`,
        expected: `Not Found`,
        tests: [
          { type: "codeRegex", name: "Зміна типу", pattern: "status\\s*=\\s*404.*status\\s*=\\s*['\"]Not Found['\"]", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "🌟 Коментар-шпигун",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пояснення коду</h2>
          <p>Символ <code>#</code> робить усе до кінця рядка невидимим для комп'ютера.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Залиш підказку для інших програмістів прямо біля змінної.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>speed = 5</code>, і в цьому ж рядку (через пробіл) допиши коментар: <code style="color: #0ea5e9;"># Швидкість гравця</code>.<br>
            Виведи <code>speed</code>.
          </div>
        `,
        hint: `speed = 5 # Швидкість гравця`,
        expected: `5`,
        tests: [
          { type: "codeRegex", name: "Інлайн коментар", pattern: "speed\\s*=\\s*5\\s*#\\s*Швидкість гравця", checkRaw: true }
        ]
      },

      {
        title: "🌟 Вимкнення багу",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дебагінг</h2>
          <p>Коментарі часто використовують, щоб тимчасово "вимкнути" зламаний код.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Хтось написав код, який крашиться через неправильний принт. Вимкни його.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши:<br>
            <code style="color: #0ea5e9;">a = 10</code><br>
            <code style="color: #0ea5e9;"># print("Баг")</code> (обов'язково закоментуй цей рядок!)<br>
            <code style="color: #0ea5e9;">print(a)</code>
          </div>
        `,
        hint: `Просто скопіюй умову, не забудь решітку.`,
        expected: `10`,
        tests: [
          { type: "codeRegex", name: "Закоментований принт", pattern: "#\\s*print\\s*\\(\\s*['\"]Баг['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🐉 БОС (Junior): Ігровий Паспорт",
        xp: 300,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Junior</h2>
          <p>Поєднай створення змінних різних типів, коментарі та багатоаргументний вивід.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи паспорт персонажа і виведи його одним рядком.</p>
          </div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>hero = "Ельф"</code> (додай коментар <code style="color: #0ea5e9;"># Раса</code>).<br>
            2. <code>lvl = 15</code> (додай коментар <code style="color: #0ea5e9;"># Рівень</code>).<br>
            3. В ОДНОМУ <code>print()</code> виведи через кому: <code>"Паспорт:"</code>, змінну <code>hero</code>, текст <code>"рівня"</code>, змінну <code>lvl</code>.
          </div>
        `,
        hint: `print("Паспорт:", hero, "рівня", lvl)`,
        expected: `Паспорт: Ельф рівня 15`,
        tests: [
          { type: "codeRegex", name: "hero з коментарем", pattern: "hero\\s*=\\s*['\"]Ельф['\"]\\s*#\\s*Раса", checkRaw: true },
          { type: "codeRegex", name: "lvl з коментарем", pattern: "lvl\\s*=\\s*15\\s*#\\s*Рівень", checkRaw: true },
          { type: "codeRegex", name: "Форматований принт", pattern: "print\\s*\\(\\s*['\"]Паспорт:['\"]\\s*,\\s*hero\\s*,\\s*['\"]рівня['\"]\\s*,\\s*lvl\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Математика та Конкатенація)
      // ==========================================

      {
        title: "🌟 Алхімія рядків",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Конкатенація</h2>
          <p>Склеюємо тексти знаком ПЛЮС.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Збери назву зілля з двох частин.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>p1 = "Мега"</code> та <code>p2 = "Хіл"</code>.<br>
            Створи змінну <code>potion = p1 + p2</code>.<br>
            Виведи <code>potion</code>.
          </div>
        `,
        hint: `potion = p1 + p2`,
        expected: `МегаХіл`,
        tests: [
          { type: "codeRegex", name: "Склеювання змінних", pattern: "potion\\s*=\\s*p1\\s*\\+\\s*p2" }
        ]
      },

      {
        title: "🌟 Проблема пробілу",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Впритул</h2>
          <p>Конкатенація не ставить пробілів. Їх треба додавати вручну.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Склей ім'я та прізвище так, щоб вони не злиплися.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>first = "Джон"</code> та <code>last = "Сноу"</code>.<br>
            Створи <code>full = first + " " + last</code>.<br>
            Виведи <code>full</code>.
          </div>
        `,
        hint: `full = first + " " + last`,
        expected: `Джон Сноу`,
        tests: [
          { type: "codeRegex", name: "Склеювання з пробілом", pattern: "full\\s*=\\s*first\\s*\\+\\s*['\"]\\s['\"]\\s*\\+\\s*last", checkRaw: true }
        ]
      },

      {
        title: "🌟 Математика в коробці",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рахуємо змінні</h2>
          <p>Ми можемо додати дві числові змінні і покласти результат у третю.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Обчисли суму двох скринь.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>box1 = 15</code> та <code>box2 = 25</code>.<br>
            Створи <code>total = box1 + box2</code>.<br>
            Виведи <code>total</code>.
          </div>
        `,
        hint: `total = box1 + box2`,
        expected: `40`,
        tests: [
          { type: "codeRegex", name: "Додавання змінних", pattern: "total\\s*=\\s*box1\\s*\\+\\s*box2" }
        ]
      },

      {
        title: "🌟 Економія часу (+=)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;"> += </h2>
          <p>Замість <code>x = x + 5</code> пишемо просто <code>x += 5</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Гравцеві нарахували бонусний досвід.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>xp = 100</code>.<br>
            Збільш його на 50: <code style="color: #0ea5e9;">xp += 50</code>.<br>
            Виведи <code>xp</code>.
          </div>
        `,
        hint: `xp += 50`,
        expected: `150`,
        tests: [
          { type: "codeRegex", name: "Використано +=", pattern: "xp\\s*\\+\\s*=\\s*50" }
        ]
      },

      {
        title: "🌟 Втрата броні (-=)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;"> -= </h2>
          <p>Так само для віднімання.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Щит пошкоджено атакою.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>shield = 80</code>.<br>
            Відніми 15: <code style="color: #0ea5e9;">shield -= 15</code>.<br>
            Виведи <code>shield</code>.
          </div>
        `,
        hint: `shield -= 15`,
        expected: `65`,
        tests: [
          { type: "codeRegex", name: "Використано -=", pattern: "shield\\s*-\\s*=\\s*15" }
        ]
      },

      {
        title: "🌟 Довгий лог (+= для str)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дописуємо текст</h2>
          <p>Оператор <code>+=</code> працює і з рядками! Він приклеює новий текст в кінець.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Збери лог подій у єдиний рядок.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>log = "Старт."</code>.<br>
            Додай до нього новий запис: <code style="color: #0ea5e9;">log += " Біг."</code>.<br>
            Виведи <code>log</code>.
          </div>
        `,
        hint: `log += " Біг."`,
        expected: `Старт. Біг.`,
        tests: [
          { type: "codeRegex", name: "Використано += для тексту", pattern: "log\\s*\\+\\s*=\\s*['\"] Біг\\\.['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Правила імен",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Snake Case</h2>
          <p>Змінна не може починатися з цифри і містити пробіли. Програмісти використовують <code>_</code> (нижнє підкреслення).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виправ помилки в коді новачка.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> У коді була змінна <code>1player score = 100</code> (це викличе помилку!).<br>
            Створи цю змінну з правильним ім'ям: <code style="color: #0ea5e9;">player_1_score = 100</code>.<br>
            Виведи її.
          </div>
        `,
        hint: `player_1_score = 100\nprint(player_1_score)`,
        expected: `100`,
        tests: [
          { type: "codeRegex", name: "Правильне ім'я", pattern: "player_1_score\\s*=\\s*100" },
          { type: "codeRegex", name: "Друк", pattern: "print\\s*\\(\\s*player_1_score\\s*\\)" }
        ]
      },

      {
        title: "🐉 БОС (Middle): Торгівля",
        xp: 400,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Middle</h2>
          <p>Поєднай віднімання, конкатенацію та вивід.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Логіка покупки в RPG.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>gold = 200</code> та <code>inventory = "Меч"</code>.<br>
            Ти купуєш Зілля за 50 монет. Зроби: <code style="color: #0ea5e9;">gold -= 50</code>.<br>
            Додай предмет в інвентар: <code style="color: #0ea5e9;">inventory += " Зілля"</code>.<br>
            Виведи f-рядок: <code>"Залишок: {gold}, Сумка: {inventory}"</code>.
          </div>
        `,
        hint: `gold -= 50\ninventory += " Зілля"\nprint(f"Залишок: {gold}, Сумка: {inventory}")`,
        expected: `Залишок: 150, Сумка: Меч Зілля`,
        tests: [
          { type: "codeRegex", name: "Віднімання грошей", pattern: "gold\\s*-\\s*=\\s*50" },
          { type: "codeRegex", name: "Додавання предмета", pattern: "inventory\\s*\\+\\s*=\\s*['\"] Зілля['\"]", checkRaw: true },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Залишок:\\s*\\{\\s*gold\\s*\\},\\s*Сумка:\\s*\\{\\s*inventory\\s*\\}['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Пам'ять та Архітектура)
      // ==========================================

      {
        title: "🌟 Координати в рядок",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Множинне присвоєння</h2>
          <p>Створюємо кілька змінних в один рядок через кому.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Задай координати спавну гравця.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши: <code style="color: #0ea5e9;">x, y = 10, 20</code>.<br>
            Виведи їх через кому в <code>print()</code>.
          </div>
        `,
        hint: `x, y = 10, 20`,
        expected: `10 20`,
        tests: [
          { type: "codeRegex", name: "Множинне присвоєння", pattern: "x\\s*,\\s*y\\s*=\\s*10\\s*,\\s*20" }
        ]
      },

      {
        title: "🌟 Масове скидання",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ланцюгове присвоєння</h2>
          <p>Призначаємо одне значення всім одразу: <code>a = b = 0</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Скинь бали трьох гравців до нуля.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши: <code style="color: #0ea5e9;">p1 = p2 = p3 = 0</code>.<br>
            Виведи <code>p1</code>.
          </div>
        `,
        hint: `p1 = p2 = p3 = 0`,
        expected: `0`,
        tests: [
          { type: "codeRegex", name: "Ланцюгове присвоєння", pattern: "p1\\s*=\\s*p2\\s*=\\s*p3\\s*=\\s*0" }
        ]
      },

      {
        title: "🌟 Магія обміну",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Swapping</h2>
          <p>Міняємо значення змінних місцями без третьої коробки: <code>a, b = b, a</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Поміняй зброю в руках героя.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи: <code style="color: #0ea5e9;">left = "Щит"</code> та <code style="color: #0ea5e9;">right = "Меч"</code>.<br>
            Зроби обмін: <code style="color: #0ea5e9;">left, right = right, left</code>.<br>
            Виведи <code>left, right</code>.
          </div>
        `,
        hint: `left, right = right, left`,
        expected: `Меч Щит`,
        tests: [
          { type: "codeRegex", name: "Обмін змінних", pattern: "left\\s*,\\s*right\\s*=\\s*right\\s*,\\s*left" }
        ]
      },

      {
        title: "🌟 Непорушні дані",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Константи</h2>
          <p>Змінні, які не можна змінювати, пишуться ВЕЛИКИМИ літерами.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Задай системний ліміт.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи константу <code style="color: #0ea5e9;">MAX_SPEED = 300</code> і виведи її.
          </div>
        `,
        hint: `MAX_SPEED = 300`,
        expected: `300`,
        tests: [
          { type: "codeRegex", name: "Створено константу", pattern: "MAX_SPEED\\s*=\\s*300" }
        ]
      },

      {
        title: "🌟 Строга типізація",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Type Hints</h2>
          <p>Зазначаємо тип змінної для чистоти коду: <code>var: int = 5</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи профіль із жорстко вказаними типами.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши: <code style="color: #0ea5e9;">user: str = "Admin"</code>.<br>
            Виведи <code>user</code>.
          </div>
        `,
        hint: `user: str = "Admin"`,
        expected: `Admin`,
        tests: [
          { type: "codeRegex", name: "Використано Type Hint", pattern: "user\\s*:\\s*str\\s*=\\s*['\"]Admin['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Секретна адреса",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">id()</h2>
          <p>Функція <code>id()</code> повертає номер комірки пам'яті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи, що дві змінні з однаковим числом можуть дивитися на одну комірку пам'яті.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>a = 100</code> та <code>b = 100</code>.<br>
            Виведи результат їх порівняння: <code>print(id(a) == id(b))</code>.
          </div>
        `,
        hint: `print(id(a) == id(b))`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Адреси збігаються", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Порівняння id", pattern: "id\\s*\\(\\s*a\\s*\\)\\s*==\\s*id\\s*\\(\\s*b\\s*\\)" }
        ]
      },

      {
        title: "🌟 Зачистка пам'яті",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">del</h2>
          <p>Команда <code>del</code> повністю видаляє змінну з комп'ютера.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Знищ тимчасовий пароль.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>pwd = "123"</code>.<br>
            Напиши: <code style="color: #0ea5e9;">del pwd</code>.<br>
            Виведи текст <code>"Знищено"</code>. (Сам пароль не виводь, інакше програма впаде!).
          </div>
        `,
        hint: `del pwd\nprint("Знищено")`,
        expected: `Знищено`,
        tests: [
          { type: "codeRegex", name: "Використано del", pattern: "del\\s+pwd" },
          { type: "codeRegex", name: "Немає друку pwd", pattern: "print\\s*\\(\\s*pwd\\s*\\)", flags: "g", max: 0 }
        ]
      },

      {
        title: "👑 БОС (Senior): Архітектура",
        xp: 600,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Senior</h2>
          <p>Поєднай множинне присвоєння з анотаціями, константами та магічним обміном!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система плутає гравців. Виправ це у стилі профі.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b><br>
            1. Створи константу <code style="color: #0ea5e9;">MAX: int = 100</code>.<br>
            2. В один рядок створи дві змінні з типами: <code style="color: #0ea5e9;">p1: str, p2: str = "Бот", "Гравець"</code>.<br>
            3. Зроби магічний обмін: <code style="color: #0ea5e9;">p1, p2 = p2, p1</code>.<br>
            4. Виведи f-рядок: <code>"Ліміт: {MAX} | P1: {p1} | P2: {p2}"</code>.
          </div>
        `,
        hint: `p1: str, p2: str = "Бот", "Гравець"\np1, p2 = p2, p1`,
        expected: `Ліміт: 100 | P1: Гравець | P2: Бот`,
        tests: [
          { type: "codeRegex", name: "Константа з типом", pattern: "MAX\\s*:\\s*int\\s*=\\s*100" },
          { type: "codeRegex", name: "Множинне присвоєння з типами", pattern: "p1\\s*:\\s*str\\s*,\\s*p2\\s*:\\s*str\\s*=\\s*['\"]Бот['\"]\\s*,\\s*['\"]Гравець['\"]", checkRaw: true },
          { type: "codeRegex", name: "Обмін", pattern: "p1\\s*,\\s*p2\\s*=\\s*p2\\s*,\\s*p1" },
          { type: "codeRegex", name: "f-рядок", pattern: "f['\"]Ліміт:\\s*\\{\\s*MAX\\s*\\}\\s*\\|\\s*P1:\\s*\\{\\s*p1\\s*\\}\\s*\\|\\s*P2:\\s*\\{\\s*p2\\s*\\}['\"]", checkRaw: true }
        ]
      }

    ]
  };

  window.addPracticeModule(moduleObj);
})();