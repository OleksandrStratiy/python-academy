// js/data/python/m_bonus_input.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_bonus_input",
    title: "Додаткові випробування: Input",
    icon: "ri-keyboard-box-line",
    color: "#f43f5e", // Яскраво-рожевий для бонусів
    desc: "24 додаткові задачі на ввід даних, парсинг тексту, очищення та множинне присвоєння.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базовий ввід та кастинг)
      // ==========================================

      {
        title: "🌟 Живий діалог",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Основи вводу</h2>
          <p>Найпростіше використання <code>input()</code> — запитати рядок і підставити його в <code>print()</code> через кому.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Бот-офіціант запитує твоє ім'я і відразу пропонує меню.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">name = input("Ім'я: ")</code>.<br>
            Виведи через кому: <code>"Ось ваше меню,"</code> та змінну <code>name</code>.
          </div>
        `,
        hint: `print("Ось ваше меню,", name)`,
        expected: `Ім'я: Макс\nОсь ваше меню, Макс`,
        tests: [
          { type: "codeRegex", name: "Запит імені", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Вивід через кому", pattern: "print\\s*\\(\\s*['\"]Ось ваше меню,['\"]\\s*,\\s*name\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Рік народження",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Цілі числа</h2>
          <p>Щоб робити математику з роками чи кількістю, обов'язково використовуй <code>int()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма дізнається вік користувача, запитуючи його рік народження, і віднімає його від поточного 2026 року.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">year = int(input("Рік: "))</code>.<br>
            Виведи результат обчислення: <code>2026 - year</code>.
          </div>
        `,
        hint: `print(2026 - year)`,
        expected: `Рік: 2000\n26`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "year\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Математика в print", pattern: "print\\s*\\(\\s*2026\\s*-\\s*year\\s*\\)" }
        ]
      },

      {
        title: "🌟 Площа кімнати",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дробові числа</h2>
          <p>Для розмірів, ваги та грошей завжди використовується <code>float()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Калькулятор будівельника множить довжину на ширину, враховуючи, що стіни можуть бути нерівними (з дробами).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>w = float(input("Ширина: "))</code> та <code>h = float(input("Довжина: "))</code>.<br>
            Виведи їхній добуток: <code>w * h</code>.
          </div>
        `,
        hint: `print(w * h)`,
        expected: `Ширина: 5.5\nДовжина: 4.0\n22.0`,
        tests: [
          { type: "codeRegex", name: "Ввід float", pattern: "float\\s*\\(\\s*input", flags: "g", min: 2 },
          { type: "codeRegex", name: "Множення", pattern: "print\\s*\\(\\s*w\\s*\\*\\s*h\\s*\\)" }
        ]
      },

      {
        title: "🌟 Ехо-множення",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Текст * Число</h2>
          <p>Текст з <code>input()</code> можна множити на цілі числа, щоб продублювати його.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить символ і кількість разів, щоб намалювати лінію з цього символу.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай текст: <code>char = input("Символ: ")</code>.<br>
            Запитай число: <code>count = int(input("Скільки: "))</code>.<br>
            Виведи результат множення: <code>char * count</code>.
          </div>
        `,
        hint: `print(char * count)`,
        expected: `Символ: #\nСкільки: 5\n#####`,
        tests: [
          { type: "codeRegex", name: "Ввід символу", pattern: "char\\s*=\\s*input" },
          { type: "codeRegex", name: "Ввід числа", pattern: "count\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Множення", pattern: "print\\s*\\(\\s*char\\s*\\*\\s*count\\s*\\)" }
        ]
      },

      {
        title: "🌟 Злипання слів",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Конкатенація</h2>
          <p>Знак плюса <code>+</code> між двома рядками просто зліплює їх без пробілу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма збирає префікс і корінь слова, щоб створити нове слово.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>p1 = input("Частина 1: ")</code> та <code>p2 = input("Частина 2: ")</code>.<br>
            Виведи їх зліпленими за допомогою плюса: <code>p1 + p2</code>.
          </div>
        `,
        hint: `print(p1 + p2)`,
        expected: `Частина 1: Супер\nЧастина 2: мен\nСупермен`,
        tests: [
          { type: "codeRegex", name: "Два інпути", pattern: "input", flags: "g", min: 2 },
          { type: "codeRegex", name: "Склеювання", pattern: "print\\s*\\(\\s*p1\\s*\\+\\s*p2\\s*\\)" }
        ]
      },

      {
        title: "🌟 Доказ типу",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що там лежить?</h2>
          <p>Щоб довести, що <code>input()</code> повертає рядок (навіть якщо ти ввів цифри), можна скористатися функцією <code>type()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи, що введені дані є текстом.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>data = input("Введи 123: ")</code>.<br>
            Виведи ТИП цієї змінної: <code>print(type(data))</code>.
          </div>
        `,
        hint: `print(type(data))`,
        expected: `Введи 123: 123\n<class 'str'>`,
        tests: [
          { type: "codeRegex", name: "Ввід без int", pattern: "data\\s*=\\s*input" },
          { type: "codeRegex", name: "Друк типу", pattern: "print\\s*\\(\\s*type\\s*\\(\\s*data\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Ввід із f-рядком",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Красивий звіт</h2>
          <p>Зібрані через <code>input</code> дані найкраще підставляти у фігурні дужки f-рядків.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Збери улюблену страву гравця і виведи її у гарному реченні.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>food = input("Страва: ")</code>.<br>
            Виведи f-рядок: <code>"Сьогодні на обід {food}!"</code>.
          </div>
        `,
        hint: `print(f"Сьогодні на обід {food}!")`,
        expected: `Страва: Піца\nСьогодні на обід Піца!`,
        tests: [
          { type: "codeRegex", name: "f-рядок", pattern: "print\\s*\\(\\s*f['\"]Сьогодні на обід \\{\\s*food\\s*\\}!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🐉 БОС (Junior): Створення персонажа",
        xp: 300,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Junior</h2>
          <p>Поєднай текстовий ввід, ввід чисел та красиве форматування!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Реєстрація у новій RPG грі.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b><br>
            1. <code>name = input("Ім'я: ")</code><br>
            2. <code>age = int(input("Вік: "))</code><br>
            3. <code>role = input("Клас: ")</code><br>
            4. Виведи єдиним f-рядком: <code>"Герой {name}, {age} років, обрав шлях: {role}"</code>.
          </div>
        `,
        hint: `print(f"Герой {name}, {age} років, обрав шлях: {role}")`,
        expected: `Ім'я: Артур\nВік: 25\nКлас: Воїн\nГерой Артур, 25 років, обрав шлях: Воїн`,
        tests: [
          { type: "codeRegex", name: "Три інпути", pattern: "input", flags: "g", min: 3 },
          { type: "codeRegex", name: "Вік як int", pattern: "age\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Фінальний f-рядок", pattern: "print\\s*\\(\\s*f['\"]Герой \\{\\s*name\\s*\\}, \\{\\s*age\\s*\\} років, обрав шлях: \\{\\s*role\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Очищення та Методи рядків)
      // ==========================================

      {
        title: "🌟 Чистий ввід (strip)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Без зайвих пробілів</h2>
          <p>Користувачі часто ставлять пробіл в кінці слова. <code>strip()</code> рятує ситуацію.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система запитує місто і відрізає пробіли по краях.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>city = input("Місто: ").strip()</code>.<br>
            Виведи f-рядок: <code>"[{city}]"</code> (з квадратними дужками, щоб побачити чистоту).
          </div>
        `,
        hint: `print(f"[{city}]")`,
        expected: `Місто:    Київ   \n[Київ]`,
        tests: [
          { type: "codeRegex", name: "Використано strip", pattern: "\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід у дужках", pattern: "f['\"]\\[\\{\\s*city\\s*\\}\\]['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Гучний ввід (upper)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Капслок</h2>
          <p>Автоматично робимо всі літери великими для промокодів.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Промокоди в базі даних зберігаються ВЕЛИКИМИ літерами.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>code = input("Код: ").upper()</code> і виведи його.
          </div>
        `,
        hint: `print(code)`,
        expected: `Код: sale50\nSALE50`,
        tests: [
          { type: "codeRegex", name: "Використано upper", pattern: "\\.upper\\s*\\(\\)" }
        ]
      },

      {
        title: "🌟 Ідеальні імена (title)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Форматування ПІБ</h2>
          <p><code>title()</code> робить першу літеру КОЖНОГО слова великою.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виправ ім'я та прізвище, які користувач написав з маленьких літер.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>name = input("ПІБ: ").title()</code> і виведи його.
          </div>
        `,
        hint: `print(name)`,
        expected: `ПІБ: тарас шевченко\nТарас Шевченко`,
        tests: [
          { type: "codeRegex", name: "Використано title", pattern: "\\.title\\s*\\(\\)" }
        ]
      },

      {
        title: "🌟 Перевірка на цифри (isdigit)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Захист від крашу</h2>
          <p>Перед тим як робити <code>int()</code>, переконайся, що там справді цифри.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи ввів користувач тільки цифри.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>txt = input("Цифри: ")</code>.<br>
            Виведи результат роботи методу: <code>print(txt.isdigit())</code>.
          </div>
        `,
        hint: `print(txt.isdigit())`,
        expected: `Цифри: 123a\nFalse`,
        tests: [
          { type: "codeRegex", name: "Використано isdigit", pattern: "txt\\.isdigit\\s*\\(\\)" }
        ]
      },

      {
        title: "🌟 Ланцюг очищення",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Комбо методів</h2>
          <p>Методи можна викликати один за одним: <code>.strip().lower()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Очисти відповідь користувача від пробілів і зроби її маленькою.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>ans = input("Так/Ні: ").strip().lower()</code> і виведи результат.
          </div>
        `,
        hint: `print(ans)`,
        expected: `Так/Ні:   ТАК  \nтак`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок методів", pattern: "\\.strip\\s*\\(\\)\\.lower\\s*\\(\\)" }
        ]
      },

      {
        title: "🌟 Ремонт вводу (replace)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Заміна на льоту</h2>
          <p>Якщо користувач ввів кому замість крапки, ми можемо це виправити.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Заміни кому на крапку в дробовому числі.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>val = input("Дріб: ").replace(",", ".")</code>.<br>
            Виведи <code>val</code>.
          </div>
        `,
        hint: `print(val)`,
        expected: `Дріб: 12,5\n12.5`,
        tests: [
          { type: "codeRegex", name: "Використано replace", pattern: "\\.replace\\s*\\(\\s*['\"],['\"]\\s*,\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Довжина вводу (len)",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рахуємо символи</h2>
          <p>Функція <code>len()</code> рахує кількість літер у введеному тексті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Дізнайся довжину повідомлення.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>msg = input("Текст: ")</code>.<br>
            Виведи <code>len(msg)</code>.
          </div>
        `,
        hint: `print(len(msg))`,
        expected: `Текст: Привіт\n6`,
        tests: [
          { type: "codeRegex", name: "Використано len", pattern: "print\\s*\\(\\s*len\\s*\\(\\s*msg\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🐉 БОС (Middle): Адмін Парсер",
        xp: 400,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Middle</h2>
          <p>Збери ідеально чистий ввід і підготуй його до бази даних.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Очисти краї, заміни дефіси на нижнє підкреслення і зроби всі букви маленькими.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>uid = input("ID: ")</code>.<br>
            В один ланцюжок застосуй до <code>input()</code>: <code>.strip()</code>, потім <code>.replace("-", "_")</code>, потім <code>.lower()</code>.<br>
            Виведи <code>uid</code>.
          </div>
        `,
        hint: `input("ID: ").strip().replace("-", "_").lower()`,
        expected: `ID:  Super-User-1 \nsuper_user_1`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок 3 методів", pattern: "\\.strip\\s*\\(\\)\\.replace\\s*\\(\\s*['\"]-['\"]\\s*,\\s*['\"]_['\"]\\s*\\)\\.lower\\s*\\(\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Спліт та Множинне присвоєння)
      // ==========================================

      {
        title: "🌟 Розрізання (split)",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Один ввід, багато слів</h2>
          <p>Метод <code>.split()</code> розрізає рядок по пробілах і створює список.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Розріж речення на окремі слова.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>words = input("Фраза: ").split()</code>.<br>
            Виведи <code>words</code>.
          </div>
        `,
        hint: `print(words)`,
        expected: `Фраза: Один Два Три\n['Один', 'Два', 'Три']`,
        tests: [
          { type: "codeRegex", name: "Використано split", pattern: "\\.split\\s*\\(\\)" }
        ]
      },

      {
        title: "🌟 Спеціальний розділювач",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ріжемо по символу</h2>
          <p>Вкажи символ у дужках <code>split(",")</code>, щоб розрізати по ньому.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач вводить кольори через кому.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>colors = input("Кольори: ").split(",")</code>.<br>
            Виведи <code>colors</code>.
          </div>
        `,
        hint: `print(colors)`,
        expected: `Кольори: червоний,синій\n['червоний', 'синій']`,
        tests: [
          { type: "codeRegex", name: "Split по комі", pattern: "\\.split\\s*\\(\\s*['\"],['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Розпакування (Unpacking)",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Одразу у змінні</h2>
          <p>Якщо ти знаєш, скільки слів буде, ти можеш зберегти їх відразу в різні змінні: <code>a, b = input().split()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Отримай координати X та Y через пробіл в одному інпуті.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай: <code>x, y = input("X Y: ").split()</code>.<br>
            Виведи f-рядок: <code>"Координати: X={x}, Y={y}"</code>.
          </div>
        `,
        hint: `print(f"Координати: X={x}, Y={y}")`,
        expected: `X Y: 10 50\nКоординати: X=10, Y=50`,
        tests: [
          { type: "codeRegex", name: "Розпакування", pattern: "x\\s*,\\s*y\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\)" }
        ]
      },

      {
        title: "🌟 Ліміт розрізів (maxsplit)",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Відрізаємо тільки команду</h2>
          <p><code>split(" ", 1)</code> розріже текст тільки 1 раз по першому пробілу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Відділи команду (перше слово) від самого повідомлення (усі інші слова).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>cmd, msg = input("Ввід: ").split(" ", 1)</code>.<br>
            Виведи <code>msg</code>.
          </div>
        `,
        hint: `print(msg)`,
        expected: `Ввід: say Привіт всім!\nПривіт всім!`,
        tests: [
          { type: "codeRegex", name: "Maxsplit 1", pattern: "\\.split\\s*\\(\\s*['\"]\\s['\"]\\s*,\\s*1\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Множинний кастинг",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перетворення на льоту</h2>
          <p>Отримавши <code>x</code> та <code>y</code> як текст зі спліта, ми можемо одразу перетворити їх на <code>int</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Отримай два числа через пробіл і додай їх.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>a, b = input("Числа: ").split()</code>.<br>
            Перетвори їх: <code>a, b = int(a), int(b)</code>.<br>
            Виведи <code>a + b</code>.
          </div>
        `,
        hint: `print(a + b)`,
        expected: `Числа: 10 20\n30`,
        tests: [
          { type: "codeRegex", name: "Кастинг двох змінних", pattern: "a\\s*,\\s*b\\s*=\\s*int\\s*\\(\\s*a\\s*\\)\\s*,\\s*int\\s*\\(\\s*b\\s*\\)" }
        ]
      },

      {
        title: "🌟 Трюк з OR",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Значення за замовчуванням</h2>
          <p><code>input() or "Дефолт"</code> підставить слово "Дефолт", якщо користувач натисне Enter нічого не ввівши.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Якщо користувач не введе ім'я, він стане Анонімом.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>user = input("Ім'я: ") or "Анонім"</code>.<br>
            Виведи <code>user</code>.
          </div>
        `,
        hint: `print(user)`,
        expected: `Ім'я: \nАнонім`,
        tests: [
          { type: "codeRegex", name: "Використано or", pattern: "input\\s*\\(.*\\)\\s+or\\s+['\"]Анонім['\"]", checkRaw: true }
        ]
      },

      {
        title: "🌟 Тернарний з Input",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Все в один рядок</h2>
          <p>Вбудовуємо логіку прямо під час вводу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Якщо ввели "1", збережи "Так", інакше "Ні".</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Напиши: <code>ans = "Так" if input("1 чи 0? ") == "1" else "Ні"</code>.<br>
            Виведи <code>ans</code>.
          </div>
        `,
        hint: `print(ans)`,
        expected: `1 чи 0? 1\nТак`,
        tests: [
          { type: "codeRegex", name: "Тернарний інпут", pattern: "ans\\s*=\\s*['\"]Так['\"]\\s+if\\s+input\\s*\\(.*\\)\\s*==\\s*['\"]1['\"]\\s+else\\s+['\"]Ні['\"]", checkRaw: true }
        ]
      },

      {
        title: "👑 БОС (Senior): Розбір Серверного Логу",
        xp: 500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Senior</h2>
          <p>Поєднай спліт, очистку, множинний кастинг та OR.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Сервер передає дані у форматі "IP:PORT". Якщо PORT не вказано, має бути 80.</p>
          </div>
          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай: <code>ip, port = (input("Дані: ") + ":80").split(":", 1)</code> (хитрий трюк: ми доклеюємо :80 в кінець на випадок, якщо порта немає, і ріжемо 1 раз!).<br>
            2. Очисти IP: <code>ip = ip.strip()</code>.<br>
            3. Перетвори порт: <code>port = int(port)</code>.<br>
            4. Виведи: <code>print(f"IP={ip}, PORT={port}")</code>.
          </div>
        `,
        hint: `Просто повтори кроки з умови.`,
        expected: `Дані: 192.168.0.1\nIP=192.168.0.1, PORT=80`,
        tests: [
          { type: "codeRegex", name: "Трюк +:80 та split", pattern: "\\(\\s*input\\s*\\(.*\\)\\s*\\+\\s*['\"]\\:80['\"]\\s*\\)\\.split\\s*\\(\\s*['\"]\\:['\"]\\s*,\\s*1\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Очищення IP", pattern: "ip\\s*=\\s*ip\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Кастинг порту", pattern: "port\\s*=\\s*int\\s*\\(\\s*port\\s*\\)" }
        ]
      }

    ]
  };

  window.addPracticeModule(moduleObj);
})();