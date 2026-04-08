// js/data/python/m_bonus_types.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_bonus_types",
    title: "Додаткові випробування: Типи даних",
    icon: "ri-shapes-fill",
    color: "#10b981", // Смарагдовий для типів
    desc: "24 задачі на кастинг, математичні функції, Truthy/Falsy, системи числення та магію пам'яті.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базовий кастинг та операції)
      // ==========================================

      {
        title: "🌟 Текст у Число",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математика з текстом</h2>
          <p>Щоб зробити математичну дію з числом, яке знаходиться в лапках, його треба пропустити через <code>int()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>База даних повернула кількість золота як текст. Додай до нього 50 монет.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>gold_str = input("Золото: ")</code>.<br>
            Перетвори його на число: <code>gold = int(gold_str)</code>.<br>
            Виведи результат: <code>print(gold + 50)</code>.
          </div>
        `,
        hint: `gold = int(gold_str)\nprint(gold + 50)`,
        expected: `Золото: 100\n150`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "gold_str\\s*=\\s*input" },
          { type: "codeRegex", name: "Кастинг int", pattern: "gold\\s*=\\s*int\\s*\\(\\s*gold_str\\s*\\)" },
          { type: "codeRegex", name: "Додавання", pattern: "print\\s*\\(\\s*gold\\s*\\+\\s*50\\s*\\)" }
        ]
      },

      {
        title: "🌟 Число у Текст",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Склеювання без ком</h2>
          <p>Щоб зліпити текст і число через <code>+</code>, число треба перетворити на рядок через <code>str()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма формує серійний номер, склеюючи літери та число.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>num = 404</code>.<br>
            Виведи через ПЛЮС текст <code>"ID-"</code> та змінну <code>num</code>, попередньо обгорнувши її у <code>str()</code>.
          </div>
        `,
        hint: `print("ID-" + str(num))`,
        expected: `ID-404`,
        tests: [
          { type: "codeRegex", name: "Склеювання з str", pattern: "print\\s*\\(\\s*['\"]ID-['\"]\\s*\\+\\s*str\\s*\\(\\s*num\\s*\\)\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌟 Сокира для Дробу",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Відрубаємо зайве</h2>
          <p>Функція <code>int()</code>, застосована до дробового числа <code>float</code>, не округлює його, а просто відкидає все після крапки.</p>
        `,
        desc: `
          <div class="task-main">
            <p>У грі не можна мати "половину" життя. Система відкидає дробову частину.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>hp = float(input("HP: "))</code>.<br>
            Виведи це здоров'я, обгорнувши змінну у функцію <code>int()</code>.
          </div>
        `,
        hint: `print(int(hp))`,
        expected: `HP: 99.9\n99`,
        tests: [
          { type: "codeRegex", name: "Кастинг float", pattern: "float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано int()", pattern: "print\\s*\\(\\s*int\\s*\\(\\s*hp\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Створення Дробу",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Додаємо точність</h2>
          <p>Функція <code>float()</code> робить з цілого числа дробове, додаючи <code>.0</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Банківська система вимагає, щоб баланс завжди відображався з копійками.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>bal = 150</code>.<br>
            Перезапиши змінну: <code>bal = float(bal)</code>.<br>
            Виведи <code>bal</code>.
          </div>
        `,
        hint: `bal = float(bal)`,
        expected: `150.0`,
        tests: [
          { type: "codeRegex", name: "Перетворення float", pattern: "bal\\s*=\\s*float\\s*\\(\\s*bal\\s*\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*bal\\s*\\)" }
        ]
      },

      {
        title: "🌟 Перевірка сканером",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">type()</h2>
          <p>Щоб дізнатися "породу" даних, використовуємо <code>type()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи, що логічне значення True — це тип bool.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>is_active = True</code>.<br>
            Виведи ТИП цієї змінної за допомогою <code>print(type(is_active))</code>.
          </div>
        `,
        hint: `print(type(is_active))`,
        expected: `<class 'bool'>`,
        tests: [
          { type: "stdoutEquals", name: "Вивід типу", value: "<class 'bool'>", normalize: "soft" },
          { type: "codeRegex", name: "Використано type", pattern: "print\\s*\\(\\s*type\\s*\\(\\s*is_active\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Ехо-множення",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Текст * Число</h2>
          <p>Рядок можна помножити на ціле число (int), щоб продублювати його.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Бот заїкається і повторює слово 5 разів.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>word = input("Слово: ")</code>.<br>
            Виведи <code>word * 5</code>.
          </div>
        `,
        hint: `print(word * 5)`,
        expected: `Слово: О\nООООО`,
        tests: [
          { type: "codeRegex", name: "Множення рядка", pattern: "print\\s*\\(\\s*word\\s*\\*\\s*5\\s*\\)" }
        ]
      },

      {
        title: "🌟 Прихована математика",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">True = 1</h2>
          <p>Логічні значення є просто числами 1 та 0 під капотом.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Додай логічне значення до числа, щоб отримати бонус.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>base = 10</code> та <code>bonus = True</code>.<br>
            Виведи їхню суму: <code>base + bonus</code>.
          </div>
        `,
        hint: `print(base + bonus)`,
        expected: `11`,
        tests: [
          { type: "stdoutEquals", name: "Математика з True", value: "11", normalize: "soft" },
          { type: "codeRegex", name: "Сума", pattern: "print\\s*\\(\\s*base\\s*\\+\\s*bonus\\s*\\)" }
        ]
      },

      {
        title: "🐉 БОС (Junior): Подвійний Кастинг",
        xp: 300,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Ланцюжок функцій</h2>
          <p>Щоб перетворити рядок "9.9" на ціле число 9, треба пропустити його спочатку через <code>float()</code>, а потім через <code>int()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>База даних повернула брудний текст із дробом. Зроби з нього чисте ціле число і роздрукуй його ТИП, щоб довести успіх.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>raw = input("Дані: ")</code>.<br>
            Перетвори: <code>clean = int(float(raw))</code>.<br>
            Виведи <code>clean</code>, а на наступному рядку <code>type(clean)</code>.
          </div>
        `,
        hint: `clean = int(float(raw))\nprint(clean)\nprint(type(clean))`,
        expected: `Дані: 5.8\n5\n<class 'int'>`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок int(float())", pattern: "clean\\s*=\\s*int\\s*\\(\\s*float\\s*\\(\\s*raw\\s*\\)\\s*\\)" },
          { type: "codeRegex", name: "Вивід type", pattern: "print\\s*\\(\\s*type\\s*\\(\\s*clean\\s*\\)\\s*\\)" }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Truthy/Falsy та Математика)
      // ==========================================

      {
        title: "🌟 Правда в числах",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">bool() для int</h2>
          <p>Функція <code>bool()</code> перетворює будь-які дані на True або False. Для чисел правило просте: Нуль — це False. Усі інші числа (навіть від'ємні) — це True.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи сприймає Python число -50 як True.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>num = int(input("Число: "))</code>.<br>
            Виведи результат: <code>print(bool(num))</code>.
          </div>
        `,
        hint: `print(bool(num))`,
        expected: `Число: -50\nTrue`,
        tests: [
          { type: "codeRegex", name: "Кастинг bool()", pattern: "print\\s*\\(\\s*bool\\s*\\(\\s*num\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Правда в тексті",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">bool() для str</h2>
          <p>Для тексту правило таке: порожній рядок <code>""</code> — це False. Рядок з будь-якими символами (навіть пробілом) — це True.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір логічний стан порожнього рядка.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>empty = ""</code>.<br>
            Виведи <code>print(bool(empty))</code>.
          </div>
        `,
        hint: `print(bool(empty))`,
        expected: `False`,
        tests: [
          { type: "stdoutEquals", name: "Вивід False", value: "False", normalize: "soft" },
          { type: "codeRegex", name: "Використано bool()", pattern: "print\\s*\\(\\s*bool\\s*\\(\\s*empty\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Народження Дробу (/)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Звичайне ділення</h2>
          <p>Оператор ділення <code>/</code> ЗАВЖДИ повертає тип <code>float</code>, навіть якщо числа діляться націло.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи, що 10 поділити на 2 дасть число з крапкою.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>res = 10 / 2</code>.<br>
            Виведи <code>res</code> і <code>type(res)</code> на окремих рядках.
          </div>
        `,
        hint: `print(res)\nprint(type(res))`,
        expected: `5.0\n<class 'float'>`,
        tests: [
          { type: "stdoutEquals", name: "Виведено 5.0 і тип", value: "5.0\n<class 'float'>", normalize: "soft" },
          { type: "codeRegex", name: "Ділення /", pattern: "10\\s*/\\s*2" }
        ]
      },

      {
        title: "🌟 Відсікання (//)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Цілочисельне ділення</h2>
          <p>Оператор <code>//</code> ділить числа і відразу відкидає дробову частину, повертаючи <code>int</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Дізнайся, скільки повних тижнів у 100 днях.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Виведи результат цілочисельного ділення 100 на 7: <code>100 // 7</code>.
          </div>
        `,
        hint: `print(100 // 7)`,
        expected: `14`,
        tests: [
          { type: "stdoutEquals", name: "Виведено 14", value: "14", normalize: "soft" },
          { type: "codeRegex", name: "Використано //", pattern: "100\\s*//\\s*7" }
        ]
      },

      {
        title: "🌟 Округлення: round()",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математична точність</h2>
          <p>Функція <code>round()</code> округлює число до найближчого цілого (3.6 стане 4).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Округли урон від отрути.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>dmg = float(input("Урон: "))</code>.<br>
            Виведи результат <code>round(dmg)</code>.
          </div>
        `,
        hint: `print(round(dmg))`,
        expected: `Урон: 8.7\n9`,
        tests: [
          { type: "codeRegex", name: "Ввід як float", pattern: "dmg\\s*=\\s*float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано round", pattern: "print\\s*\\(\\s*round\\s*\\(\\s*dmg\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Модуль: abs()",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Знищення мінуса</h2>
          <p>Функція <code>abs()</code> (абсолютне значення) прибирає знак мінус у числа.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Отримай дистанцію між об'єктами без від'ємних значень.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>pos = int(input("Позиція: "))</code>.<br>
            Виведи <code>abs(pos)</code>.
          </div>
        `,
        hint: `print(abs(pos))`,
        expected: `Позиція: -42\n42`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "pos\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано abs", pattern: "print\\s*\\(\\s*abs\\s*\\(\\s*pos\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🌟 Профі-сканер: isinstance()",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чи є це типом...</h2>
          <p><code>isinstance(змінна, тип)</code> повертає True, якщо змінна належить до цього типу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи є введена змінна текстом (str).</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>data = "Secret"</code>.<br>
            Виведи <code>isinstance(data, str)</code>.
          </div>
        `,
        hint: `print(isinstance(data, str))`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Перевірка isinstance", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Синтаксис isinstance", pattern: "print\\s*\\(\\s*isinstance\\s*\\(\\s*data\\s*,\\s*str\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🐉 БОС (Middle): Банкомат",
        xp: 400,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Middle</h2>
          <p>Поєднай парсинг, математику та округлення!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система вираховує залишок після комісії.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай баланс: <code>bal_str = input("Баланс: ")</code> та комісію: <code>fee_str = input("Комісія: ")</code>.<br>
            Створи <code>total = float(bal_str) - int(fee_str)</code>.<br>
            Округли <code>total</code> до цілого числа (через <code>round</code>).<br>
            Виведи f-рядок: <code>"Залишок: {total}, Статус: {bool(total)}"</code>.
          </div>
        `,
        hint: `total = round(float(bal_str) - int(fee_str))\nprint(f"Залишок: {total}, Статус: {bool(total)}")`,
        expected: `Баланс: 100.5\nКомісія: 10\nЗалишок: 90, Статус: True`,
        tests: [
          { type: "codeRegex", name: "Кастинг і математика", pattern: "float\\s*\\(\\s*bal_str\\s*\\)\\s*-\\s*int\\s*\\(\\s*fee_str\\s*\\)" },
          { type: "codeRegex", name: "Округлення", pattern: "round\\s*\\(" },
          { type: "codeRegex", name: "bool(total) у f-рядку", pattern: "\\{\\s*bool\\s*\\(\\s*total\\s*\\)\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Низькорівневі типи та Пам'ять)
      // ==========================================

      {
        title: "🌟 Hex -> Int",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Base 16</h2>
          <p>Перетворюємо шістнадцятковий рядок на число: <code>int("FF", 16)</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Декодуй колір з Hex у десяткове число.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>hex_code = input("Hex: ")</code>.<br>
            Виведи: <code>int(hex_code, 16)</code>.
          </div>
        `,
        hint: `print(int(hex_code, 16))`,
        expected: `Hex: A5\n165`,
        tests: [
          { type: "codeRegex", name: "int з базою 16", pattern: "int\\s*\\(\\s*hex_code\\s*,\\s*16\\s*\\)" }
        ]
      },

      {
        title: "🌟 Binary -> Int",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Base 2</h2>
          <p>Перетворюємо двійковий рядок: <code>int("1010", 2)</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Декодуй машинний код.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>bin_code = input("Bin: ")</code>.<br>
            Виведи: <code>int(bin_code, 2)</code>.
          </div>
        `,
        hint: `print(int(bin_code, 2))`,
        expected: `Bin: 1101\n13`,
        tests: [
          { type: "codeRegex", name: "int з базою 2", pattern: "int\\s*\\(\\s*bin_code\\s*,\\s*2\\s*\\)" }
        ]
      },

      {
        title: "🌟 Код символу: ord()",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Таблиця Unicode</h2>
          <p>Функція <code>ord()</code> повертає числовий код символу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Дізнайся ідентифікатор літери.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>char = input("Символ: ")</code>.<br>
            Виведи: <code>ord(char)</code>.
          </div>
        `,
        hint: `print(ord(char))`,
        expected: `Символ: A\n65`,
        tests: [
          { type: "codeRegex", name: "Використано ord()", pattern: "ord\\s*\\(\\s*char\\s*\\)" }
        ]
      },

      {
        title: "🌟 Число у символ: chr()",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зворотна магія</h2>
          <p>Функція <code>chr()</code> перетворює числовий код назад на літеру.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Декодуй секретне число.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>num = int(input("Код: "))</code>.<br>
            Виведи: <code>chr(num)</code>.
          </div>
        `,
        hint: `print(chr(num))`,
        expected: `Код: 66\nB`,
        tests: [
          { type: "codeRegex", name: "Використано chr()", pattern: "chr\\s*\\(\\s*num\\s*\\)" }
        ]
      },

      {
        title: "🌟 Нескінченність",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">float("inf")</h2>
          <p>Створюємо число, більше за будь-яке інше.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Задай босу нескінченне здоров'я і перевір, чи воно більше за мільярд.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>hp = float("inf")</code>.<br>
            Виведи результат порівняння: <code>print(hp &gt; 1000000000)</code>.
          </div>
        `,
        hint: `print(hp > 1000000000)`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Нескінченність працює", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Створено inf", pattern: "float\\s*\\(\\s*['\"]inf['\"]\\s*\\)" }
        ]
      },

      {
        title: "🌟 Парадокс (NaN)",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Not a Number</h2>
          <p>Віднімання нескінченності від нескінченності дає <code>NaN</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Зламай математику.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>inf = float("inf")</code>.<br>
            Виведи <code>inf - inf</code>.
          </div>
        `,
        hint: `print(inf - inf)`,
        expected: `nan`,
        tests: [
          { type: "stdoutEquals", name: "Результат nan", value: "nan", normalize: "soft" },
          { type: "codeRegex", name: "Віднімання", pattern: "inf\\s*-\\s*inf" }
        ]
      },

      {
        title: "🌟 Анотації типів",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Type Hints</h2>
          <p>Код профі містить підказки: <code>змінна: тип = значення</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи змінні з явною вказівкою типів.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Створи <code>age: int = 25</code> та <code>name: str = "Max"</code>.<br>
            Виведи їх через кому.
          </div>
        `,
        hint: `print(age, name)`,
        expected: `25 Max`,
        tests: [
          { type: "stdoutEquals", name: "Вивід успішний", value: "25 Max", normalize: "soft" },
          { type: "codeRegex", name: "Анотація int", pattern: "age\\s*:\\s*int\\s*=\\s*25" },
          { type: "codeRegex", name: "Анотація str", pattern: "name\\s*:\\s*str\\s*=\\s*['\"]Max['\"]" }
        ]
      },

      {
        title: "👑 БОС (Senior): Шифратор Цезаря",
        xp: 600,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Senior</h2>
          <p>Поєднуємо ord() та chr() для маніпуляції символами.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Зсунь введений символ на задану кількість кроків по таблиці Unicode.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>char = input("Символ: ")</code>.<br>
            Запитай <code>shift = int(input("Зсув: "))</code>.<br>
            Виведи зашифрований символ: <code>print(chr(ord(char) + shift))</code>.
          </div>
        `,
        hint: `print(chr(ord(char) + shift))`,
        expected: `Символ: A\nЗсув: 2\nC`,
        tests: [
          { type: "codeRegex", name: "Ввід символу", pattern: "char\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Ввід зсуву", pattern: "shift\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Формула шифру", pattern: "print\\s*\\(\\s*chr\\s*\\(\\s*ord\\s*\\(\\s*char\\s*\\)\\s*\\+\\s*shift\\s*\\)\\s*\\)" }
        ]
      }

    ]
  };

  window.addPracticeModule(moduleObj);
})();