// js/data/python/m_types.js
// js/data/python/m_types.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_types",
    title: "Типи даних та Перетворення",
    icon: "ri-shapes-line",
    color: "#10b981", // Смарагдовий колір для типів даних
    desc: "Вивчаємо int, str, float, bool та вчимося перетворювати один тип на інший.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базові типи та Кастинг)
      // ==========================================

      {
        title: "📦 Цілі числа (int)",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Світ цілих чисел</h2>
          <p>У Python кожен шматочок даних має свою "породу" (тип). Від типу залежить, що ми можемо робити з цими даними.</p>
          <p>Перший і найпростіший тип — це <b style="color: #3b82f6;">int</b> (від англ. <i>integer</i> — ціле число). Це звичайні числа без крапки: 1, 100, -5, 0.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">level = 15<br>gold = -50<br>print(level)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">15</div>
        `,
        desc: `
          <div class="task-main">
            <p>У грі гравець зібрав максимальну кількість балів на рівні. Система має зберегти їх і показати на екрані.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">score</code>. Поклади в неї ціле число <code style="color: #0ea5e9;">99</code> (тип int, без лапок!). На наступному рядку виведи її значення за допомогою команди друку.
          </div>
        `,
        hint: `Просто напиши score = 99 і на наступному рядку print(score).`,
        expected: `99`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "99", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну score", pattern: "score\\s*=\\s*99" }
        ]
      },

      {
        title: "📝 Текстові рядки (str)",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Світ тексту</h2>
          <p>Другий тип — це <b style="color: #10b981;">str</b> (від англ. <i>string</i> — рядок). Це будь-який текст, який обов'язково має бути обгорнутий у лапки (одинарні чи подвійні).</p>
          
          <div class="theory-alert theory-alert-warn">
            💡 Навіть якщо ти напишеш число в лапках, наприклад <code style="color: #0ea5e9;">"100"</code> — для Python це більше <b>не число</b>! Це просто малюнок із трьох символів, тип <b>str</b>.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Новий гравець обирає спеціалізацію свого персонажа. Ти маєш зберегти його вибір як текстовий рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">hero_class</code>. Поклади в неї текст <code style="color: #0ea5e9;">"Маг"</code> (тип str, з лапками). На наступному рядку виведи її.
          </div>
        `,
        hint: `Твій код має бути: hero_class = "Маг", а потім print(hero_class).`,
        expected: `Маг`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Маг", normalize: "soft" },
          { type: "codeRegex", name: "Створено текстову змінну", pattern: "hero_class\\s*=\\s*['\"]Маг['\"]", checkRaw: true }
        ]
      },

      {
        title: "💧 Дробові числа (float)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Світ точності</h2>
          <p>Третій тип — це <b style="color: #f59e0b;">float</b> (числа з плаваючою крапкою / дробові числа). Вони використовуються для точних вимірювань: вага, швидкість, гроші.</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b> У програмуванні для відокремлення дробової частини завжди використовується <b style="color: #ef4444;">КРАПКА</b>, а не кома!
          </div>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">speed = 4.5 <span style="color:gray;"># Правильно (тип float)</span><br>speed = 4,5 <span style="color:gray;"># ПОМИЛКА (Python подумає, що це два різні числа)</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Математичний модуль комп'ютера потребує константу Пі для обчислення орбіти.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">pi_value</code>. Дай їй значення <code style="color: #0ea5e9;">3.14</code> (тип float, обов'язково через крапку). Виведи її на екран.
          </div>
        `,
        hint: `Напиши pi_value = 3.14 (обов'язково з крапкою) і роздрукуй.`,
        expected: `3.14`,
        tests: [
          { type: "stdoutEquals", name: "Дріб виведено", value: "3.14", normalize: "soft" },
          { type: "codeRegex", name: "Використано крапку", pattern: "3\\.14", checkRaw: true }
        ]
      },

      {
        title: "✅ Логічний тип (bool)",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Світ Правди та Брехні</h2>
          <p>Четвертий тип — це <b style="color: #8b5cf6;">bool</b> (від англ. <i>boolean</i>). Це найменший тип даних, бо він може містити лише одне з двох значень:</p>
          <ul>
            <li><b style="color: #10b981;">True</b> (Правда / Так / Увімкнено)</li>
            <li><b style="color: #ef4444;">False</b> (Брехня / Ні / Вимкнено)</li>
          </ul>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b> Слова True та False завжди пишуться з <b style="color: #ef4444;">ВЕЛИКОЇ</b> літери і <b style="color: #ef4444;">БЕЗ ЛАПОК</b>! Якщо поставити лапки, це перетвориться на звичайний текст.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Сервер зберігає статус гравця. Якщо гравець онлайн, статус має бути позитивним логічним значенням.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">is_alive</code> і поклади в неї логічне значення <code style="color: #0ea5e9;">True</code>. Виведи цю змінну.
          </div>
        `,
        hint: `Не став лапки навколо True, інакше воно стане звичайним текстом (str), а не логічним значенням (bool).`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Логічне значення виведено", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Написано з великої літери без лапок", pattern: "is_alive\\s*=\\s*True", checkRaw: true }
        ]
      },

      {
        title: "🔍 Детектор типів (type)",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Як дізнатися тип?</h2>
          <p>Якщо ти сумніваєшся, що лежить у коробці, Python має вбудований сканер — функцію <b style="color: #3b82f6;">type()</b>. Вона підкаже клас (тип) даних.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">speed = 5.5<br>print(type(speed))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">&lt;class 'float'&gt;</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система знайшла невідомий об'єкт в інвентарі. Твоя задача — просканувати його, щоб комп'ютер видав його технічний тип.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">item = "Зілля"</code>. Виведи на екран ТИП цієї змінної за допомогою комбінації команд <code style="color: #0ea5e9;">print(type(item))</code>.
          </div>
        `,
        hint: `Напиши print(type(item)). Функція type розпізнає, що це рядок, і виведе <class 'str'>.`,
        expected: `<class 'str'>`,
        tests: [
          { type: "stdoutEquals", name: "Тип визначено", value: "<class 'str'>", normalize: "soft" },
          { type: "codeRegex", name: "Використано type()", pattern: "print\\s*\\(\\s*type\\s*\\(\\s*item\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "💥 Зіткнення типів",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чому типи такі важливі?</h2>
          <p>Ми знаємо, що числа можна додавати (5 + 5 = 10), а рядки склеювати ("A" + "B" = "AB"). Але що буде, якщо спробувати <b>додати число до тексту</b> за допомогою плюса?</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">Помилка (TypeError):</b> Якщо ти напишеш <code style="color: #0ea5e9;">"Мені " + 15</code>, Python видасть помилку і програма впаде. Комп'ютер не розуміє, як математично додати число до літер!
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Новачок спробував зліпити текст і число за допомогою плюса, але гра крашнулася. Тобі треба виправити його код.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Ось зламаний код:<br>
            <code style="color: #0ea5e9;">print("Рівень: " + 5)</code><br>
            Виправ його. Найпростіший спосіб поєднати різні типи в <code style="color: #0ea5e9;">print()</code> — передати їх як окремі аргументи через <b style="color: #10b981;">кому</b> (замість плюса).
          </div>
          
          <div class="task-note">
            <b>Важливо:</b> Згадай, що кома в <code>print()</code> автоматично додає пробіл, тому пробіл після слова "Рівень:" у лапках більше не потрібен!
          </div>
        `,
        hint: `Заміни плюс на кому, і не забудь прибрати пробіл після двокрапки всередині лапок (бо кома сама додасть пробіл). Твій код: print("Рівень:", 5)`,
        expected: `Рівень: 5`,
        tests: [
          { type: "stdoutEquals", name: "Помилку виправлено", value: "Рівень: 5", normalize: "soft" },
          { type: "codeRegex", name: "Використано кому замість +", pattern: "print\\s*\\(\\s*['\"]Рівень:['\"]\\s*,\\s*5\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🪄 Кастинг: Текст у Число (int)",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Магія перетворення</h2>
          <p>Що робити, якщо ми отримали число з бази даних, і воно виглядає як текст <code>"100"</code> (тип str)? Математику з ним не зробиш.</p>
          <p>Для цього існує <b style="color: #3b82f6;">Кастинг (Перетворення типів)</b>. Ми можемо використати команду <b style="color: #10b981;">int()</b>, щоб силоміць "зняти лапки" і перетворити текст на справжнє число.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">fake_num = "50"<br>real_num = <b style="color: #10b981;">int(</b>fake_num<b style="color: #10b981;">)</b><br>print(real_num + 10)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">60</div>
        `,
        desc: `
          <div class="task-main">
            <p>Текстовий файл передав системі число у вигляді рядка з лапками. Тобі потрібно зробити з ним справжню математику.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">text_num = "10"</code>. Створи нову змінну <code style="color: #0ea5e9;">math_num</code> і присвой їй результат перетворення першої змінної через <code style="color: #0ea5e9;">int()</code>. Виведи результат додавання: <code style="color: #0ea5e9;">math_num + 5</code>.
          </div>
        `,
        hint: `Ти не можеш додати 5 до "10" (буде помилка). Спочатку пропусти text_num через int(), щоб зняти лапки програмно. math_num = int(text_num).`,
        expected: `15`,
        tests: [
          { type: "stdoutEquals", name: "Математика спрацювала", value: "15", normalize: "soft" },
          { type: "codeRegex", name: "Використано функцію int()", pattern: "math_num\\s*=\\s*int\\s*\\(\\s*text_num\\s*\\)" },
          { type: "codeRegex", name: "Відбулося додавання", pattern: "math_num\\s*\\+\\s*5" }
        ]
      },

      {
        title: "🪄 Кастинг: Число в Текст (str)",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вдягаємо лапки</h2>
          <p>Так само ми можемо зробити зворотну дію. Якщо нам треба склеїти текст і число саме через знак <b style="color: #ef4444;"><code>+</code></b> (без використання ком і зайвих пробілів), ми маємо перетворити число на рядок за допомогою команди <b style="color: #f59e0b;">str()</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">age = 15<br>print("Вік: " + <b style="color: #f59e0b;">str(</b>age<b style="color: #f59e0b;">)</b>)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Вік: 15</div>
        `,
        desc: `
          <div class="task-main">
            <p>Дизайнер інтерфейсу попросив склеїти текст і число здоров'я в єдиний монолітний рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">hp = 100</code>. Виведи фінальний текст, використовуючи ПЛЮС <code style="color: #0ea5e9;">+</code> для конкатенації: <code>"HP: " + str(hp)</code>.
          </div>
        `,
        hint: `Функція str(hp) перетворить число 100 на текст "100", і тоді плюс зможе спокійно склеїти два текстових блоки.`,
        expected: `HP: 100`,
        tests: [
          { type: "stdoutEquals", name: "Склеювання успішне", value: "HP: 100", normalize: "strict" },
          { type: "codeRegex", name: "Використано функцію str()", pattern: "str\\s*\\(\\s*hp\\s*\\)" },
          { type: "codeRegex", name: "Склеєно плюсом", pattern: "\\+\\s*str" }
        ]
      },

      {
        title: "✂️ Кастинг: Дріб у Ціле (int)",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Безжальне відсікання</h2>
          <p>Що буде, якщо пропустити дробове число (<code>float</code>) через команду <code>int()</code>?</p>
          <p>Він не буде його округлювати за правилами математики! <code>int()</code> працює як сокира — він просто <b style="color: #ef4444;">відрубує</b> всю дробову частину після крапки.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(int(9.99))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">9</div>
        `,
        desc: `
          <div class="task-main">
            <p>У грі не буває "половини монети". Навіть якщо ти знайшов 4.85 грама золота, торговець зарахує тобі тільки 4 цілі монети.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">money = 4.85</code>. Пропусти її через <code style="color: #0ea5e9;">int()</code> і роздрукуй результат.
          </div>
        `,
        hint: `Код має бути таким: print(int(money)). Python відкине .85 і залишить тільки 4.`,
        expected: `4`,
        tests: [
          { type: "stdoutEquals", name: "Дріб відсічено", value: "4", normalize: "soft" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(\\s*money\\s*\\)" }
        ]
      },

      {
        title: "🪄 Кастинг: Ціле в Дріб (float)",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Додаємо точність</h2>
          <p>Так само ми можемо перетворити ціле число (<code>int</code>) на дробове (<code>float</code>). Python просто додасть до нього крапку і нуль в кінці (<code>.0</code>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(float(5))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">5.0</div>
        `,
        desc: `
          <div class="task-main">
            <p>Банківська система вимагає, щоб усі транзакції мали копійки (дробову частину), навіть якщо сума ідеально кругла.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">level = 10</code>. Роздрукуй його, попередньо обгорнувши у функцію <code style="color: #0ea5e9;">float()</code>.
          </div>
        `,
        hint: `Напиши print(float(level)).`,
        expected: `10.0`,
        tests: [
          { type: "stdoutEquals", name: "Число стало дробовим", value: "10.0", normalize: "soft" },
          { type: "codeRegex", name: "Використано float()", pattern: "float\\s*\\(\\s*level\\s*\\)" }
        ]
      },

      {
        title: "⚖️ Математика різних типів",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Хто сильніший?</h2>
          <p>Що станеться, якщо математично додати <code>int</code> (ціле число) та <code>float</code> (дріб)?</p>
          <p>Оскільки <code>float</code> є більш точним, Python автоматично перетворить результат усієї операції у <b style="color: #f59e0b;">float</b>, щоб не втратити жодної краплини даних.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(5 + 2.0)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">7.0</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець несе 10 кг базової ваги і додає ще 5.5 кг інвентарю. Програма має скласти ці два різні типи в одну правильну суму.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">a = 10</code> та <code style="color: #0ea5e9;">b = 5.5</code>. Виведи результат їхнього додавання (він автоматично стане дробовим).
          </div>
        `,
        hint: `Просто напиши print(a + b). Python сам розбереться з перетворенням типів.`,
        expected: `15.5`,
        tests: [
          { type: "stdoutEquals", name: "Додавання успішне", value: "15.5", normalize: "soft" },
          { type: "codeRegex", name: "Додавання a + b", pattern: "a\\s*\\+\\s*b" }
        ]
      },

      {
        title: "🎭 Текст чи Число?",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ілюзія знаку плюс</h2>
          <p>Це завдання на уважність! Знак <code>+</code> працює зовсім по-різному залежно від типу даних, які стоять навколо нього.</p>
          <ul>
            <li>Для <b>чисел</b> він виконує математику: <code>5 + 5 = 10</code>.</li>
            <li>Для <b>рядків</b> (тексту) він працює як клей: <code>"5" + "5" = "55"</code>.</li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>Хакер намагається обдурити систему і видати себе за гравця високого рівня, склеївши дві сімки замість того, щоб їх додати.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">fake_num = "7"</code> (зверни увагу, це ТЕКСТ у лапках). Виведи результат "додавання": <code style="color: #0ea5e9;">fake_num + fake_num</code>. Ти побачиш, що вийшло 77, а не 14.
          </div>
        `,
        hint: `Оскільки "7" — це текст, плюс просто зліпить дві сімки поруч.`,
        expected: `77`,
        tests: [
          { type: "stdoutEquals", name: "Текст склеєно", value: "77", normalize: "soft" },
          { type: "codeRegex", name: "Змінна - рядок", pattern: "fake_num\\s*=\\s*['\"]7['\"]", checkRaw: true },
          { type: "codeRegex", name: "Додавання змінної", pattern: "fake_num\\s*\\+\\s*fake_num" }
        ]
      },

      {
        title: "🔁 Множення тексту (str * int)",
        xp: 115,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Клонування слів</h2>
          <p>Ти вже знаєш, що текст можна "додавати" за допомогою <code>+</code>. А чи можна його множити?</p>
          <p>Так! Якщо помножити рядок (<code>str</code>) на ціле число (<code>int</code>), Python просто <b style="color: #3b82f6;">продублює цей текст задану кількість разів</b>!</p>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b style="color: #f59e0b;">Увага:</b> Текст можна помножити <b>ТІЛЬКИ</b> на ціле число (int). Множити текст на текст (<code style="color: #0ea5e9;">"A" * "B"</code>) або на дріб (<code style="color: #0ea5e9;">"A" * 2.5</code>) неможливо — буде помилка TypeError.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Луна в печері має повторити звук "Ha" рівно три рази поспіль.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай <code style="color: #0ea5e9;">print()</code>, щоб помножити текстовий рядок <code style="color: #0ea5e9;">"Ha"</code> на ціле число <code style="color: #0ea5e9;">3</code>.
          </div>
        `,
        hint: `Усередині функції print напиши: "Ha" * 3.`,
        expected: `HaHaHa`,
        tests: [
          { type: "stdoutEquals", name: "Текст помножено", value: "HaHaHa", normalize: "strict" },
          { type: "codeRegex", name: "Є множення тексту", pattern: "['\"]Ha['\"]\\s*\\*\\s*3", checkRaw: true }
        ]
      },

      {
        title: "🎭 Прихована сутність (bool як число)",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Секрет Python</h2>
          <p>Мало хто знає, але під капотом Python логічні значення <code>True</code> і <code>False</code> є просто <b style="color: #3b82f6;">звичайними числами</b>!</p>
          <ul>
            <li><b style="color: #10b981;">True</b> — це завжди <b style="color: #10b981;">1</b></li>
            <li><b style="color: #ef4444;">False</b> — це завжди <b style="color: #ef4444;">0</b></li>
          </ul>
          <p>А це означає, що їх можна додавати і віднімати як звичайні цифри! Це дуже часто використовується досвідченими програмістами для складних алгоритмів.</p>
        `,
        desc: `
          <div class="task-main">
            <p>У тебе є 4 базових бали. Активація магічного щита (True) автоматично додає ще 1 бал до захисту.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Роздрукуй результат математичного додавання: <code style="color: #0ea5e9;">True + 4</code>.
          </div>
        `,
        hint: `Просто напиши print(True + 4). Оскільки True дорівнює 1, програма обчислить і виведе 5.`,
        expected: `5`,
        tests: [
          { type: "stdoutEquals", name: "Математика з True", value: "5", normalize: "soft" },
          { type: "codeRegex", name: "Додавання True", pattern: "True\\s*\\+\\s*4" }
        ]
      },

      {
        title: "⛓️ Ланцюжок кастингу",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Подвійне перетворення</h2>
          <p>Що буде, якщо у нас є текст із дробовим числом, наприклад <code>"9.9"</code>, і ми хочемо перетворити його на ціле число <code>int</code>?</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 Якщо ти напишеш <code style="color: #0ea5e9;">int("9.9")</code>, Python видасть помилку (ValueError). Функція <code>int()</code> вміє читати тільки цифри, вона не розуміє крапки всередині тексту!
          </div>
          
          <p>Щоб це обійти, потрібно зробити <b>ланцюжок</b>: спочатку текст перетворити на <code>float()</code> (щоб зняти лапки), а вже його пропустити через <code>int()</code> (щоб відсікти дріб)!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(int(float("9.9")))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">9</div>
        `,
        desc: `
          <div class="task-main">
            <p>База даних повернула "брудне" число у вигляді тексту з крапкою. Програма має очистити його і видати ідеально ціле число.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є <code style="color: #0ea5e9;">str_num = "9.9"</code>. Виведи це число як ціле, зробивши ланцюжок кастингу: <code style="color: #0ea5e9;">int(float(str_num))</code>.
          </div>
        `,
        hint: `Напиши print(int(float(str_num))). Спершу текст "9.9" стане дробом 9.9, а потім сокира int() відрубає йому .9.`,
        expected: `9`,
        tests: [
          { type: "stdoutEquals", name: "Дріб відсічено", value: "9", normalize: "soft" },
          { type: "codeRegex", name: "Використано подвійний кастинг", pattern: "int\\s*\\(\\s*float\\s*\\(\\s*str_num\\s*\\)\\s*\\)" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Збір профілю",
        xp: 150,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Злиття типів</h2>
          <p>Час поєднати всі три основні типи (str, int, float) в одному реченні, використовуючи кому.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Збери профіль гравця з різних розрізнених типів даних в один акуратний рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Створи <code style="color: #0ea5e9;">name = "Alex"</code> (str)<br>
            2. Створи <code style="color: #0ea5e9;">lvl = 5</code> (int)<br>
            3. Створи <code style="color: #0ea5e9;">spd = 1.5</code> (float)<br>
            Передай ці змінні та роздільний текст у <code style="color: #0ea5e9;">print()</code> через <b>кому</b>, щоб отримати: <code>Герой: Alex Рівень: 5 Швидкість: 1.5</code>.
          </div>
        `,
        hint: `Твій print матиме 6 аргументів: "Герой:", name, "Рівень:", lvl, "Швидкість:", spd.`,
        expected: `Герой: Alex Рівень: 5 Швидкість: 1.5`,
        tests: [
          { type: "stdoutEquals", name: "Профіль зібрано", value: "Герой: Alex Рівень: 5 Швидкість: 1.5", normalize: "soft" },
          { type: "codeRegex", name: "Всі типи присутні", pattern: "name\\s*=\\s*['\"]Alex['\"].*lvl\\s*=\\s*5.*spd\\s*=\\s*1\\.5", flags: "s", checkRaw: true },
          { type: "codeRegex", name: "Використано коми в print", pattern: "print\\s*\\(.*,.*,.*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Калькулятор текстів",
        xp: 170,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Кастинг у int</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Твій друг написав код, але він зламаний: замість того, щоб додати числа, він зліпив їх як текст. Допоможи програмі зрозуміти, що це числа!</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Є змінні <code style="color: #0ea5e9;">a = "100"</code> та <code style="color: #0ea5e9;">b = "50"</code> (це текст!). Усередині <code style="color: #0ea5e9;">print()</code> застосуй функцію <code style="color: #0ea5e9;">int()</code> <b>до кожної змінної окремо</b> під час додавання, щоб комп'ютер порахував математично і вивів <code>150</code>.
          </div>
        `,
        hint: `Не пиши просто print(a + b). Напиши print(int(a) + int(b)).`,
        expected: `150`,
        tests: [
          { type: "stdoutEquals", name: "Математика спрацювала", value: "150", normalize: "soft" },
          { type: "codeRegex", name: "Текстові змінні", pattern: "a\\s*=\\s*['\"]100['\"].*b\\s*=\\s*['\"]50['\"]", flags: "s", checkRaw: true },
          { type: "codeRegex", name: "Кастинг обох змінних", pattern: "int\\s*\\(\\s*a\\s*\\)\\s*\\+\\s*int\\s*\\(\\s*b\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Зміна на льоту",
        xp: 180,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Динамічна типізація</h2>
          <p>В Python коробка-змінна може міняти свій тип залежно від того, що ти в неї покладеш новим!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Покажи, як змінна статусу перетворюється з числа на справжнє логічне значення під час виконання програми.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Створи <code style="color: #0ea5e9;">status = 1</code>.<br>
            2. Виведи <code style="color: #0ea5e9;">status</code>.<br>
            3. Перезапиши: <code style="color: #0ea5e9;">status = True</code> (без лапок!).<br>
            4. Знову виведи <code style="color: #0ea5e9;">status</code>.
          </div>
        `,
        hint: `Ти маєш створити статус 1, видрукувати, перезаписати на True (велика літера), і знову видрукувати.`,
        expected: `1\nTrue`,
        tests: [
          { type: "stdoutEquals", name: "Обидва стани виведено", value: "1\nTrue", normalize: "soft" },
          { type: "codeRegex", name: "Тип змінено з int на bool", pattern: "status\\s*=\\s*1.*status\\s*=\\s*True", flags: "s", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🐉 БОС (Junior): Алхімія типів",
        xp: 400,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Алхімік даних</h2>
          <p>Покажи своє володіння всіма функціями перетворення: <code>int()</code>, <code>str()</code> та <code>float()</code> в одному складному завданні!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система отримала "брудні" дані. Вага зілля прийшла як ціле число (2), але системі потрібен обов'язково дріб (2.0), щоб об'єднати все в один текстовий звіт.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            Створи змінні: <code style="color: #0ea5e9;">potions = "5"</code> (це текст) та <code style="color: #0ea5e9;">weight = 2</code> (це ціле число).<br><br>
            В одному <code style="color: #0ea5e9;">print()</code> за допомогою ПЛЮСІВ <code style="color: #0ea5e9;">+</code> (конкатенації) склей рядок: <code>Зілля: 5, Вага: 2.0</code>.<br><br>
            <b>АЛЕ!</b> Оскільки ти склеюєш плюсами, тобі доведеться застосувати <code style="color: #0ea5e9;">float()</code> до ваги, щоб вона стала <code style="color: #0ea5e9;">2.0</code>, а потім <b>одразу обгорнути її</b> в <code style="color: #0ea5e9;">str()</code>, щоб плюс не зламався. Змінна <code style="color: #0ea5e9;">potions</code> вже є текстом, її чіпати не треба.
          </div>
        `,
        hint: `Твій вивід має виглядати так: print("Зілля: " + potions + ", Вага: " + str(float(weight)))`,
        expected: `Зілля: 5, Вага: 2.0`,
        tests: [
          { type: "stdoutEquals", name: "Алхімія успішна", value: "Зілля: 5, Вага: 2.0", normalize: "strict" },
          { type: "codeRegex", name: "Конкатенація плюсами", pattern: "\\+\\s*potions\\s*\\+" },
          { type: "codeRegex", name: "Подвійний кастинг", pattern: "str\\s*\\(\\s*float\\s*\\(\\s*weight\\s*\\)\\s*\\)" }
        ]
      },

      
     // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Поведінка типів та Методи)
      // ==========================================

      {
        title: "🎭 Істина в числах",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що таке Правда (Truthy)?</h2>
          <p>Ми знаємо, що <code>True</code> — це 1, а <code>False</code> — це 0. Але що буде, якщо пропустити звичайні числа через функцію <b style="color: #8b5cf6;">bool()</b>?</p>
          <p>У Python є золоте правило: <b style="color: #ef4444;">Нуль (0) — це ЗАВЖДИ False</b>. Будь-яке інше число (навіть від'ємне, наприклад -5 або 100) — це <b style="color: #10b981;">True</b>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(bool(0))<br>print(bool(42))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">False<br>True</div>
        `,
        desc: `
          <div class="task-main">
            <p>У грі будь-яка позитивна кількість монет означає, що гаманець не порожній (True). Доведи це за допомогою функції.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">coins = 15</code>. Застосуй до неї кастинг <code style="color: #0ea5e9;">bool()</code> і виведи результат на екран.
          </div>
        `,
        hint: `Просто напиши print(bool(coins)). Оскільки 15 — це не нуль, Python поверне True.`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Виведено логічне значення", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано bool()", pattern: "bool\\s*\\(\\s*coins\\s*\\)" }
        ]
      },

      {
        title: "🕳️ Істина в тексті",
        xp: 135,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Порожнеча — це Брехня</h2>
          <p>Так само функція <code>bool()</code> працює і з текстом (<code>str</code>). Правило просте:</p>
          <ul>
            <li><b style="color: #ef4444;">Порожній рядок <code>""</code></b> (без жодної літери і пробілу) — це <b style="color: #ef4444;">False</b>.</li>
            <li>Рядок, у якому є <b style="color: #10b981;">хоча б один символ</b> (навіть просто пробіл <code>" "</code>) — це <b style="color: #10b981;">True</b>.</li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>Система перевіряє, чи ввів користувач своє ім'я. Якщо він просто натиснув Enter і залишив поле порожнім, система вважає це Брехнею (False).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">empty_text = ""</code> (дві лапки без нічого всередині). Виведи результат роботи <code style="color: #0ea5e9;">bool(empty_text)</code>.
          </div>
        `,
        hint: `print(bool(empty_text)). Оскільки тексту немає, це сприймається як False.`,
        expected: `False`,
        tests: [
          { type: "stdoutEquals", name: "Порожнеча це False", value: "False", normalize: "soft" },
          { type: "codeRegex", name: "Порожні лапки", pattern: "empty_text\\s*=\\s*['\"]['\"]" },
          { type: "codeRegex", name: "Використано bool()", pattern: "bool\\s*\\(" }
        ]
      },

      {
        title: "🏷️ Bool стає Текстом",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Склеювання несклеюваного</h2>
          <p>Ти знаєш, що не можна склеїти текст і число через <code>+</code>. Те саме стосується логічного типу! <code>"Статус: " + True</code> видасть помилку (TypeError).</p>
          <p>Щоб цього уникнути, треба використати команду <b style="color: #f59e0b;">str()</b>, яка перетворить <code>True</code> на звичайне слово <code>"True"</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Статус: " + str(True))</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець натиснув кнопку "Готовий". Система має склеїти текст зі статусом готовності в один суцільний рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є змінна <code style="color: #0ea5e9;">is_ready = True</code>. За допомогою конкатенації (знака <code style="color: #0ea5e9;">+</code>) склей рядок <code style="color: #0ea5e9;">"Готовий: "</code> та змінну, попередньо пропустивши її через <code style="color: #0ea5e9;">str()</code>.
          </div>
        `,
        hint: `Твій код: print("Готовий: " + str(is_ready))`,
        expected: `Готовий: True`,
        tests: [
          { type: "stdoutEquals", name: "Склеєно успішно", value: "Готовий: True", normalize: "strict" },
          { type: "codeRegex", name: "Використано str()", pattern: "str\\s*\\(\\s*is_ready\\s*\\)" },
          { type: "codeRegex", name: "Використано плюс (+)", pattern: "\\+\\s*str" }
        ]
      },

      {
        title: "🪄 Магія f-рядків",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Автоматичний кастинг</h2>
          <p>Функція <code>str()</code> корисна, але в сучасному Python є дещо краще — <b style="color: #10b981;">f-рядки</b>!</p>
          <p>Коли ти ставиш змінну у фігурні дужки <code>{}</code> всередині f-рядка, Python <b style="color: #3b82f6;">АВТОМАТИЧНО</b> застосовує до неї <code>str()</code>. Тобі більше не треба думати про типи при виводі тексту!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">hp = 100<br>is_alive = True<br>print(f"HP: {hp}, Alive: {is_alive}")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система профілю має вивести звіт про рівень і статус підписки, автоматично перетворивши число та bool на текст.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">lvl = 5</code> та <code style="color: #0ea5e9;">vip = False</code>. Використай один <b>f-рядок</b>, щоб вивести цей текст: <code>Рівень: 5, VIP: False</code>. Забооронено використовувати <code style="color: #0ea5e9;">str()</code> або коми для розділення аргументів.
          </div>
        `,
        hint: `Не забувай літеру f перед лапками: print(f"Рівень: {lvl}, VIP: {vip}")`,
        expected: `Рівень: 5, VIP: False`,
        tests: [
          { type: "stdoutEquals", name: "F-рядок працює", value: "Рівень: 5, VIP: False", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Не використано str()", pattern: "str\\s*\\(", flags: "g", max: 0 }
        ]
      },

      {
        title: "🔪 Ділення: Народження Дробу",
        xp: 155,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чому 10 / 2 не дорівнює 5?</h2>
          <p>У Python є супер-важливе правило: звичайне ділення (один слеш <b style="color: #ef4444;"><code>/</code></b>) <b style="color: #f59e0b;">ЗАВЖДИ повертає тип float</b> (дріб).</p>
          <p>Навіть якщо число ділиться націло (наприклад 10 / 2), результатом буде <code>5.0</code>, а не ціле <code>5</code>. Це зроблено, щоб ніколи не втрачати залишок при розрахунках.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(10 / 2)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">5.0</div>
        `,
        desc: `
          <div class="task-main">
            <p>Двоє піратів ділять 10 монет порівну. Програма має показати, що результатом ділення завжди буде дріб.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">result = 10 / 2</code>. Виведи її на екран (ти побачиш, що там з'явилася крапка з нулем!).
          </div>
        `,
        hint: `print(10 / 2) автоматично створить float.`,
        expected: `5.0`,
        tests: [
          { type: "stdoutEquals", name: "Ділення дало float", value: "5.0", normalize: "soft" },
          { type: "codeRegex", name: "Є ділення (/)", pattern: "10\\s*/\\s*2" }
        ]
      },

      {
        title: "🪓 Цілочисельне ділення (//)",
        xp: 165,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Відрубаємо зайве</h2>
          <p>Що, якщо нам потрібен саме тип <code>int</code> при діленні? (Наприклад, скільки <b>цілих</b> аптечок можна купити на 10 монет, якщо одна коштує 3 монети).</p>
          <p>Для цього використовують подвійний слеш <b style="color: #3b82f6;"><code>//</code></b>. Він ділить числа і <b>миттєво відкидає</b> всю дробову частину, повертаючи ціле число.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(10 // 3)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">3 <span style="color:gray;"># Бо 3 повні аптечки влізуть у 10 монет</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>У тебе є 25 днів до виходу гри. Програма має порахувати, скільки це ПОВНИХ тижнів.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай цілочисельне ділення <code style="color: #0ea5e9;">//</code>, щоб поділити <code style="color: #0ea5e9;">25</code> на <code style="color: #0ea5e9;">7</code>. Виведи результат.
          </div>
        `,
        hint: `Напиши print(25 // 7). Результатом буде ціле число 3.`,
        expected: `3`,
        tests: [
          { type: "stdoutEquals", name: "Відсікання успішне", value: "3", normalize: "soft" },
          { type: "codeRegex", name: "Використано //", pattern: "25\\s*//\\s*7" }
        ]
      },

      {
        title: "🎯 Округлення: round()",
        xp: 175,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математична справедливість</h2>
          <p>Ми вчили, що <code>int(3.9)</code> працює як сокира і повертає <code>3</code>. Але за правилами математики 3.9 має округлюватися до 4!</p>
          <p>Для правильного округлення використовується функція <b style="color: #10b981;">round()</b>. Вона повертає найближче ціле число.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(round(3.9))<br>print(round(3.2))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">4<br>3</div>
        `,
        desc: `
          <div class="task-main">
            <p>Монстр отримав 7.6 урону від отрути. Система має округлити цей урон за правилами математики, щоб відняти ціле здоров'я.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є урон <code style="color: #0ea5e9;">dmg = 7.6</code>. Застосуй до нього функцію <code style="color: #0ea5e9;">round()</code> і виведи результат на екран.
          </div>
        `,
        hint: `Твій код: print(round(dmg)). Відповідь буде 8.`,
        expected: `8`,
        tests: [
          { type: "stdoutEquals", name: "Округлено до 8", value: "8", normalize: "soft" },
          { type: "codeRegex", name: "Використано round()", pattern: "round\\s*\\(\\s*dmg\\s*\\)" }
        ]
      },

      {
        title: "⚖️ Модуль числа: abs()",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Завжди на позитиві</h2>
          <p>Іноді в грі координати можуть бути від'ємними (наприклад, ти пройшов назад <code>-50</code> метрів). Якщо нам потрібна просто відстань (без мінуса), ми використовуємо функцію <b style="color: #3b82f6;">abs()</b> (абсолютне значення або модуль).</p>
          <p>Вона перетворює будь-яке від'ємне число на додатне. Додатні залишає як є.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(abs(-100))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Датчик цілі показує позицію "-45" відносно центру. Програмі потрібна точна абсолютна відстань без знака мінус.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Змінна позиції <code style="color: #0ea5e9;">pos = -45</code>. Виведи її абсолютне значення за допомогою <code style="color: #0ea5e9;">abs()</code>.
          </div>
        `,
        hint: `Напиши print(abs(pos)). Мінус зникне.`,
        expected: `45`,
        tests: [
          { type: "stdoutEquals", name: "Мінус прибрано", value: "45", normalize: "soft" },
          { type: "codeRegex", name: "Використано abs()", pattern: "abs\\s*\\(\\s*pos\\s*\\)" }
        ]
      },

      {
        title: "📏 Довжина рядка: len()",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вимірюємо текст</h2>
          <p>Як дізнатися, скільки літер у слові? Для цього є супер-функція <b style="color: #f59e0b;">len()</b> (від англ. <i>length</i> — довжина).</p>
          <p>Вона приймає рядок (<code>str</code>) і повертає ціле число (<code>int</code>) — кількість символів, включаючи пробіли!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(len("Python"))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">6</div>
        `,
        desc: `
          <div class="task-main">
            <p>Валідатор паролів має дізнатися, чи достатньо довгий пароль ввів користувач. Для цього він рахує кожен символ.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">password = "SuperAdmin"</code>. Виведи результат роботи функції <code style="color: #0ea5e9;">len()</code> для цієї змінної.
          </div>
        `,
        hint: `Код має бути: print(len(password)). Програма порахує всі літери і видасть 10.`,
        expected: `10`,
        tests: [
          { type: "stdoutEquals", name: "Довжина правильна", value: "10", normalize: "soft" },
          { type: "codeRegex", name: "Використано len()", pattern: "len\\s*\\(\\s*password\\s*\\)" }
        ]
      },

      {
        title: "🔎 Чи це число? (.isdigit)",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Методи типів даних</h2>
          <p>У типів даних є власні вбудовані функції, які називаються <b style="color: #10b981;">методами</b>. Вони викликаються через крапку <code>.</code> після змінної.</p>
          <p>Наприклад, у текста (<code>str</code>) є метод <b style="color: #3b82f6;">.isdigit()</b>. Він перевіряє, чи складається текст <i>виключно з цифр</i>, і повертає <code>True</code> або <code>False</code> (тип <code>bool</code>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("123".isdigit())<br>print("A123".isdigit())</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">True<br>False</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система отримала дані з поля вводу. Перед тим як перетворити їх на число (кастинг), вона має переконатися, що там дійсно тільки цифри і немає літер.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">user_input = "404"</code>. Виклич метод <code style="color: #0ea5e9;">.isdigit()</code> через крапку і роздрукуй результат.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу, що в кінці методу <code>.isdigit()</code> обов'язково мають бути порожні круглі дужки!
          </div>
        `,
        hint: `Напиши print(user_input.isdigit()). Дужки в кінці методу обов'язкові!`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Перевірка пройдена", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано метод .isdigit()", pattern: "user_input\\.isdigit\\s*\\(\\s*\\)" }
        ]
      },

      {
        title: "🧩 Складний кастинг",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Спочатку клей, потім перетворюй</h2>
          <p>Іноді числа приходять по шматочках у вигляді тексту. Наприклад, перша цифра окремо, друга окремо.</p>
          <p>Ми можемо їх <b style="color: #3b82f6;">склеїти</b> як текст плюсом, а вже фінальний рядок <b style="color: #10b981;">перетворити</b> на математичне число!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">res = int("1" + "0") <span style="color:gray;"># Склеїть у "10", потім зробить числом 10</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Дві частини секретного коду прийшли окремо. Їх потрібно з'єднати в єдине число і додати бонус 5.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є дві половинки тексту: <code style="color: #0ea5e9;">part1 = "5"</code> та <code style="color: #0ea5e9;">part2 = "0"</code>. Склей їх, пропусти через <code style="color: #0ea5e9;">int()</code> і додай число <code style="color: #0ea5e9;">5</code>. Виведи результат.
          </div>
        `,
        hint: `Твій print має виглядати так: print(int(part1 + part2) + 5).`,
        expected: `55`,
        tests: [
          { type: "stdoutEquals", name: "Склеєно і додано", value: "55", normalize: "soft" },
          { type: "codeRegex", name: "Склеювання всередині int", pattern: "int\\s*\\(\\s*part1\\s*\\+\\s*part2\\s*\\)" },
          { type: "codeRegex", name: "Математичне додавання", pattern: "int\\s*\\(.*\\)\\s*\\+\\s*5" }
        ]
      },

      {
        title: "🤯 Множення на логіку",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Хакерський трюк</h2>
          <p>Ми вже знаємо: текст можна множити на ціле число (<code>str * int</code>), а <code>True / False</code> дорівнюють <code>1 / 0</code>.</p>
          <p>Отже, ми можемо <b style="color: #ef4444;">помножити текст на логічне значення!</b></p>
          <ul>
            <li><code>"Текст" * True</code> (це множення на 1) — виведе <code>"Текст"</code>.</li>
            <li><code>"Текст" * False</code> (це множення на 0) — виведе порожнечу <code>""</code>.</li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>Система безпеки повинна приховати пароль, якщо статус дозволу дорівнює False.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">secret = "Пароль"</code>. Роздрукуй її, помноживши на <code style="color: #0ea5e9;">False</code>. У терміналі не має бути нічого!
          </div>
        `,
        hint: `print(secret * False). Оскільки множення на 0 знищує текст, виведеться порожній рядок.`,
        expected: ``,
        tests: [
          { type: "stdoutEquals", name: "Текст знищено", value: "", normalize: "soft" },
          { type: "codeRegex", name: "Множення на False", pattern: "secret\\s*\\*\\s*False" }
        ]
      },

      {
        title: "🛡️ Професійна перевірка (isinstance)",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Краще ніж type()</h2>
          <p>Функція <code>type()</code> корисна, але в реальних програмах її використовують рідко. Програмісти віддають перевагу функції <b style="color: #10b981;">isinstance()</b> (перекладається як "чи є екземпляром").</p>
          <p>Вона ставить пряме запитання: <i>"Чи є ця змінна ось таким типом?"</i> і повертає <code>True</code> або <code>False</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(isinstance(50, int)) <span style="color:gray;"># Чи є число 50 типом int?</span><br>print(isinstance("50", int)) <span style="color:gray;"># Чи є текст типом int?</span></div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">True<br>False</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має перевірити, чи є передане їй значення дробом (типом float).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">value = 9.99</code>. Використай функцію <code style="color: #0ea5e9;">isinstance(value, float)</code> всередині принта, щоб перевірити тип.
          </div>
        `,
        hint: `Напиши print(isinstance(value, float)).`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Перевірка пройдена", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано isinstance()", pattern: "isinstance\\s*\\(\\s*value\\s*,\\s*float\\s*\\)" }
        ]
      },

      {
        title: "🪄 Кастинг Дробу з тексту",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рятуємо дроби</h2>
          <p>Ми пам'ятаємо, що <code>int("9.9")</code> видасть помилку, бо <code>int</code> не розуміє крапки в тексті. Але для цього є функція <b style="color: #3b82f6;">float()</b>!</p>
          <p>Вона ідеально "знімає" лапки з текстових дробів, дозволяючи робити з ними математику.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">weight = float("50.5")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Ціна прийшла з бази даних як текст. Тобі потрібно зробити з неї справжнє дробове число і додати податок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є <code style="color: #0ea5e9;">price_str = "10.5"</code>. Перетвори її на справжній дріб за допомогою <code style="color: #0ea5e9;">float()</code> і додай до неї число <code style="color: #0ea5e9;">2.0</code>. Виведи результат.
          </div>
        `,
        hint: `print(float(price_str) + 2.0)`,
        expected: `12.5`,
        tests: [
          { type: "stdoutEquals", name: "Податок додано", value: "12.5", normalize: "soft" },
          { type: "codeRegex", name: "Використано float()", pattern: "float\\s*\\(\\s*price_str\\s*\\)" },
          { type: "codeRegex", name: "Додано 2.0", pattern: "\\+\\s*2\\.0" }
        ]
      },

      {
        title: "🛠️ Практика: type() та f-рядки",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вбудований сканер у звіті</h2>
          <p>F-рядки можуть виконувати функції прямо всередині фігурних дужок. Давай виведемо значення і його тип одночасно!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Адміністратор хоче бачити і саме значення, і його тип на одному екрані для дебагінгу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">code = 77</code>. Використай один f-рядок. У перші дужки передай саму змінну, а в другі — результат функції <code style="color: #0ea5e9;">type(code)</code>. Текст має бути <code>Дані: 77, Тип: &lt;class 'int'&gt;</code>.
          </div>
        `,
        hint: `Твій код: print(f"Дані: {code}, Тип: {type(code)}")`,
        expected: `Дані: 77, Тип: <class 'int'>`,
        tests: [
          { type: "stdoutEquals", name: "Звіт ідеальний", value: "Дані: 77, Тип: <class 'int'>", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Функція в дужках", pattern: "\\{\\s*type\\s*\\(\\s*code\\s*\\)\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Валідатор чисел",
        xp: 300,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: isdigit + bool</h2>
          <p>Час поєднати перевірку тексту на цифри і вивід за допомогою f-рядків.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи дійсно рядок містить лише цифри, і виведи результат.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">pin = "999"</code>. За допомогою f-рядка виведи текст <code>Число: </code> і результат роботи методу <code style="color: #0ea5e9;">.isdigit()</code> для цієї змінної.
          </div>
        `,
        hint: `Усередині f-рядка в фігурних дужках напиши pin.isdigit().`,
        expected: `Число: True`,
        tests: [
          { type: "stdoutEquals", name: "Перевірка правильна", value: "Число: True", normalize: "strict" },
          { type: "codeRegex", name: "Метод isdigit у f-рядку", pattern: "\\{\\s*pin\\.isdigit\\(\\)\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Математика округлення",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Ділення та round()</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Тобі потрібно розділити 10 на 3 і округлити результат до найближчого цілого числа.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Виведи результат <code style="color: #0ea5e9;">10 / 3</code>, але обгорни цю дію у функцію <code style="color: #0ea5e9;">round()</code>, щоб отримати красиве ціле число.
          </div>
        `,
        hint: `print(round(10 / 3))`,
        expected: `3`,
        tests: [
          { type: "stdoutEquals", name: "Округлено правильно", value: "3", normalize: "soft" },
          { type: "codeRegex", name: "Використано round", pattern: "round\\s*\\(\\s*10\\s*/\\s*3\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Складний ланцюжок",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Кастинг та len()</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Тобі потрібно порахувати кількість цифр у числі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Є ціле число <code style="color: #0ea5e9;">num = 5050</code>. Ти НЕ можеш застосувати <code style="color: #0ea5e9;">len()</code> до числа (буде помилка). Спочатку перетвори його на текст за допомогою <code style="color: #0ea5e9;">str()</code>, а вже потім застосуй <code style="color: #0ea5e9;">len()</code> до отриманого тексту. Виведи результат.
          </div>
        `,
        hint: `Подвійна функція: print(len(str(num)))`,
        expected: `4`,
        tests: [
          { type: "stdoutEquals", name: "Довжину пораховано", value: "4", normalize: "soft" },
          { type: "codeRegex", name: "Ланцюжок len(str())", pattern: "len\\s*\\(\\s*str\\s*\\(\\s*num\\s*\\)\\s*\\)" }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🐉 БОС (Middle): Банкомат",
        xp: 800,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Аналітик даних</h2>
          <p>Покажи, як ти вмієш розбирати брудні текстові дані, робити математику та округлення!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши алгоритм банкомату, який виводить фінансовий звіт: <code>Залишок: 651, Статус: True</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1) У тебе є баланс текстом: <code style="color: #0ea5e9;">money_text = "700.75"</code>.<br>
            2) У тебе є комісія текстом: <code style="color: #0ea5e9;">fee_text = "50"</code>.<br>
            3) Створи змінну <code style="color: #0ea5e9;">total</code>. Вона має дорівнювати <code style="color: #0ea5e9;">money_text</code> (перетвореному на <code style="color: #0ea5e9;">float</code>) <b>мінус</b> <code style="color: #0ea5e9;">fee_text</code> (перетвореному на <code style="color: #0ea5e9;">int</code>).<br>
            4) Округли отриманий <code style="color: #0ea5e9;">total</code> до цілого числа за допомогою <code style="color: #0ea5e9;">round()</code>.<br>
            5) За допомогою <b>f-рядка</b> виведи фінальний звіт. Статус <code style="color: #0ea5e9;">True</code> — це результат перевірки <code style="color: #0ea5e9;">bool(total)</code> (бо гроші ще залишились!).
          </div>
        `,
        hint: `Крок 1: total = float(money_text) - int(fee_text). Крок 2: total = round(total). Крок 3: print(f"Залишок: {total}, Статус: {bool(total)}").`,
        expected: `Залишок: 651, Статус: True`,
        tests: [
          { type: "stdoutEquals", name: "Звіт ідеальний", value: "Залишок: 651, Статус: True", normalize: "strict" },
          { type: "codeRegex", name: "Змішаний кастинг", pattern: "float\\s*\\(\\s*money_text\\s*\\)\\s*-\\s*int\\s*\\(\\s*fee_text\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Округлення round()", pattern: "round\\s*\\(" },
          { type: "codeRegex", name: "bool(total) у f-рядку", pattern: "\\{\\s*bool\\s*\\(\\s*total\\s*\\)\\s*\\}", checkRaw: true }
        ]
      },

     // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Низькорівневі типи та Пам'ять)
      // ==========================================

      {
        title: "🕵️‍♂️ Декодування Hex (Base 16)",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Читаємо коди кольорів</h2>
          <p>Функція <code>int()</code> вміє набагато більше, ніж просто перетворювати текст <code>"10"</code> на число <code>10</code>. Вона може перекладати числа з <b>інших систем числення</b>!</p>
          <p>Щоб перетворити шістнадцятковий код (Hex, база 16) на звичайне десяткове число, треба передати в <code>int()</code> другий аргумент — базу (число 16).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(int("FF", 16))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">255</div>
        `,
        desc: `
          <div class="task-main">
            <p>Дизайнер передав колір у форматі Hex: "A5". Програмі потрібно перетворити цей текст на звичайне ціле число для розрахунку яскравості.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">hex_str = "A5"</code>. Виведи результат роботи функції <code style="color: #0ea5e9;">int()</code> для цього рядка, обов'язково вказавши другим аргументом базу <code style="color: #0ea5e9;">16</code>.
          </div>
        `,
        hint: `Твій код: print(int(hex_str, 16)). Це перетворить "A5" на звичайне число 165.`,
        expected: `165`,
        tests: [
          { type: "stdoutEquals", name: "Hex декодовано", value: "165", normalize: "soft" },
          { type: "codeRegex", name: "Використано базу 16", pattern: "int\\s*\\(\\s*hex_str\\s*,\\s*16\\s*\\)" }
        ]
      },

      {
        title: "💻 Декодування Binary (Base 2)",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Мова машин</h2>
          <p>Точно так само ми можемо перетворити двійковий код (нулики та одинички) на нормальне число. Для цього як другий аргумент передаємо базу <b style="color: #10b981;">2</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(int("1010", 2))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">10</div>
        `,
        desc: `
          <div class="task-main">
            <p>Сенсор прислав сигнал у вигляді двійкового коду "11011". Розшифруй його для системи.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є <code style="color: #0ea5e9;">bin_str = "11011"</code>. Пропусти його через функцію <code style="color: #0ea5e9;">int()</code> з базою <code style="color: #0ea5e9;">2</code> і виведи результат.
          </div>
        `,
        hint: `Твій код: print(int(bin_str, 2))`,
        expected: `27`,
        tests: [
          { type: "stdoutEquals", name: "Двійковий код декодовано", value: "27", normalize: "soft" },
          { type: "codeRegex", name: "Використано базу 2", pattern: "int\\s*\\(\\s*bin_str\\s*,\\s*2\\s*\\)" }
        ]
      },

      {
        title: "🔤 Код символу: ord()",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Як комп'ютер бачить літери?</h2>
          <p>Комп'ютер не розуміє літер. Для нього кожна літера (або символ) — це просто певне ціле число з таблиці Unicode.</p>
          <p>Щоб дізнатися секретний числовий код будь-якої літери, використовується функція <b style="color: #3b82f6;">ord()</b> (від англ. <i>ordinal</i>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(ord("A"))<br>print(ord("B"))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">65<br>66</div>
        `,
        desc: `
          <div class="task-main">
            <p>Хакерська програма має дізнатися числовий ідентифікатор символу '@' у системі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">char = "@"</code>. Виведи її числовий код за допомогою функції <code style="color: #0ea5e9;">ord()</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Функція <code>ord()</code> приймає строго один символ. Якщо передати туди довгий текст, буде помилка.
          </div>
        `,
        hint: `Напиши print(ord(char))`,
        expected: `64`,
        tests: [
          { type: "stdoutEquals", name: "Код літери знайдено", value: "64", normalize: "soft" },
          { type: "codeRegex", name: "Використано ord()", pattern: "ord\\s*\\(\\s*char\\s*\\)" }
        ]
      },

      {
        title: "🎹 Число в символ: chr()",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зворотна магія</h2>
          <p>Функція <b style="color: #10b981;">chr()</b> (від англ. <i>character</i>) робить абсолютно протилежне до <code>ord()</code>. Вона приймає число і повертає символ, який відповідає цьому числу в таблиці.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(chr(65))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">A</div>
        `,
        desc: `
          <div class="task-main">
            <p>Сервер надіслав зашифроване повідомлення у вигляді числа 88. Тобі потрібно розшифрувати його і побачити, яка це літера.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є <code style="color: #0ea5e9;">secret_num = 88</code>. Застосуй до нього функцію <code style="color: #0ea5e9;">chr()</code> і виведи результат.
          </div>
        `,
        hint: `Напиши print(chr(secret_num))`,
        expected: `X`,
        tests: [
          { type: "stdoutEquals", name: "Число перетворено на літеру", value: "X", normalize: "soft" },
          { type: "codeRegex", name: "Використано chr()", pattern: "chr\\s*\\(\\s*secret_num\\s*\\)" }
        ]
      },

      {
        title: "🔠 Математика літер",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Шифр Цезаря</h2>
          <p>Знаючи <code>ord()</code> та <code>chr()</code>, ми можемо робити <b style="color: #3b82f6;">математику з літерами</b>! Наприклад, як отримати наступну літеру алфавіту після 'A'?</p>
          <ol>
            <li>Перетворюємо 'A' на число (65) через <code>ord()</code>.</li>
            <li>Додаємо одиницю (+ 1 = 66).</li>
            <li>Перетворюємо число 66 назад на літеру через <code>chr()</code> і отримуємо 'B'!</li>
          </ol>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(chr(ord("A") + 1))</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система шифрування має зсунути символ 'K' рівно на 2 позиції вперед по алфавіту.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">letter = "K"</code>. Напиши ланцюжок: спочатку застосуй <code style="color: #0ea5e9;">ord()</code>, потім додай <code style="color: #0ea5e9;">2</code>, а потім обгорни весь цей вираз у <code style="color: #0ea5e9;">chr()</code>. Виведи результат.
          </div>
        `,
        hint: `Твій код має бути: print(chr(ord(letter) + 2))`,
        expected: `M`,
        tests: [
          { type: "stdoutEquals", name: "Літеру зсунуто", value: "M", normalize: "soft" },
          { type: "codeRegex", name: "Ланцюжок chr(ord() + 2)", pattern: "chr\\s*\\(\\s*ord\\s*\\(\\s*letter\\s*\\)\\s*\\+\\s*2\\s*\\)" }
        ]
      },

      {
        title: "🌌 Нескінченність (inf)",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Безмежні числа</h2>
          <p>Іноді в іграх потрібно задати босу стільки здоров'я, щоб його математично неможливо було вбити. Будь-яке число (навіть мільярд) можна відняти. Але не Нескінченність!</p>
          <p>У Python можна створити справжню нескінченність, пропустивши текст <b style="color: #10b981;">"inf"</b> (від англ. <i>infinity</i>) через кастинг <b style="color: #f59e0b;">float()</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">god_hp = float("inf")<br>print(god_hp &gt; 9999999999) <span style="color:gray;"># Виведе True</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти розробляєш режим "Безсмертя". Тобі треба зробити так, щоб здоров'я героя не мало математичної межі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">health</code> і присвой їй нескінченність через команду <code style="color: #0ea5e9;">float("inf")</code>. Виведи змінну на екран (вона надрукується як inf).
          </div>
        `,
        hint: `Напиши health = float("inf")`,
        expected: `inf`,
        tests: [
          { type: "stdoutEquals", name: "Нескінченність створена", value: "inf", normalize: "soft" },
          { type: "codeRegex", name: "Використано float('inf')", pattern: "float\\s*\\(\\s*['\"]inf['\"]\\s*\\)" }
        ]
      },

      {
        title: "🛡️ Неможлива математика (NaN)",
        xp: 270,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Not a Number</h2>
          <p>Що буде, якщо від Нескінченності відняти Нескінченність? Математика ламається. Python поверне спеціальне значення <b style="color: #ef4444;">NaN</b> (Not a Number — Не число).</p>
          <p>Ти також можеш створити його штучно через <code>float("nan")</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">infinity = float("inf")<br>print(infinity - infinity)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">nan</div>
        `,
        desc: `
          <div class="task-main">
            <p>Ігровий движок зіткнувся з парадоксом: гравець із нескінченною силою вдарив стіну з нескінченною міцністю. Доведи, що результат обчислень — це NaN.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи дві змінні <code style="color: #0ea5e9;">a = float("inf")</code> та <code style="color: #0ea5e9;">b = float("inf")</code>. Виведи результат їхнього віднімання: <code style="color: #0ea5e9;">a - b</code>.
          </div>
        `,
        hint: `Просто відніми одну нескінченність від іншої.`,
        expected: `nan`,
        tests: [
          { type: "stdoutEquals", name: "Математика зламалась (nan)", value: "nan", normalize: "soft" },
          { type: "codeRegex", name: "Створено дві нескінченності", pattern: "float\\s*\\(\\s*['\"]inf['\"]\\s*\\)", flags: "g", min: 2 },
          { type: "codeRegex", name: "Віднімання", pattern: "a\\s*-\\s*b" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Hex Валідатор",
        xp: 320,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: База 16</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Програма отримує текстовий код "1A". Тобі треба розшифрувати його в ціле число і додати 5.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Є <code style="color: #0ea5e9;">code = "1A"</code>. Використай <code style="color: #0ea5e9;">int()</code> з базою <code style="color: #0ea5e9;">16</code>, щоб розшифрувати його. До результату розшифровки додай число <code style="color: #0ea5e9;">5</code>. Виведи фінальну суму.
          </div>
        `,
        hint: `print(int(code, 16) + 5)`,
        expected: `31`,
        tests: [
          { type: "stdoutEquals", name: "Додавання правильне", value: "31", normalize: "soft" },
          { type: "codeRegex", name: "Декодування і математика", pattern: "int\\s*\\(\\s*code\\s*,\\s*16\\s*\\)\\s*\\+\\s*5" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Зсув шифру",
        xp: 350,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: chr() та ord()</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Декодер має зсунути літеру "Y" на дві позиції вперед.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Візьми літеру <code style="color: #0ea5e9;">"Y"</code>, знайди її код через <code style="color: #0ea5e9;">ord()</code>, додай <code style="color: #0ea5e9;">2</code>, і пропусти результат назад через <code style="color: #0ea5e9;">chr()</code>. Виведи отриманий символ (має бути '[', оскільки він йде після Z в таблиці ASCII).
          </div>
        `,
        hint: `print(chr(ord("Y") + 2))`,
        expected: `[`,
        tests: [
          { type: "stdoutEquals", name: "Символ зсунуто", value: "[", normalize: "soft" },
          { type: "codeRegex", name: "Правильний ланцюг", pattern: "chr\\s*\\(\\s*ord\\s*\\(\\s*['\"]Y['\"]\\s*\\)\\s*\\+\\s*2\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Математика без меж",
        xp: 380,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Операції з inf</h2>
          <p>Якщо додати до нескінченності 1000, вона залишиться нескінченністю.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи, що нескінченність поглинає звичайні числа при додаванні.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">x = float("inf")</code>. Виведи результат додавання: <code style="color: #0ea5e9;">x + 99999</code>. Він має залишитися <code style="color: #0ea5e9;">inf</code>.
          </div>
        `,
        hint: `print(x + 99999)`,
        expected: `inf`,
        tests: [
          { type: "stdoutEquals", name: "Нескінченність залишилась", value: "inf", normalize: "soft" },
          { type: "codeRegex", name: "Додавання до inf", pattern: "x\\s*\\+\\s*99999" }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🧙‍♂️ БОС (Senior): Низькорівневий хакер",
        xp: 1000,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Аналітик ядра</h2>
          <p>Поєднай декодування Hex, зсув символів та роботу з пам'яттю в одному системному звіті!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Ти пишеш скрипт діагностики ядра. Він має вивести звіт із трьох показників: декодовану пам'ять, наступний символ у черзі та ліміт операцій.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1) Змінна <code style="color: #0ea5e9;">a</code>: Декодуй Hex-рядок <code style="color: #0ea5e9;">"FF"</code> у звичайне число (через базу 16).<br>
            2) Змінна <code style="color: #0ea5e9;">b</code>: Знайди наступну літеру після <code style="color: #0ea5e9;">'A'</code> (використай <code style="color: #0ea5e9;">chr(ord('A') + 1)</code>).<br>
            3) Змінна <code style="color: #0ea5e9;">c</code>: Створи позитивну нескінченність <code style="color: #0ea5e9;">float("inf")</code>.<br>
            4) За допомогою <b>ОДНОГО f-рядка</b> з перенесеннями <code style="color: #0ea5e9;">\\n</code> склей фінальний текст і виведи його.
          </div>
          
          <div class="task-note">
            <b>Формат виводу:</b><br>
            Mem: 255<br>
            Char: B<br>
            Limit: inf
          </div>
        `,
        hint: `Крок 1: a = int("FF", 16). Крок 2: b = chr(ord('A') + 1). Крок 3: c = float("inf"). Крок 4: print(f"Mem: {a}\\nChar: {b}\\nLimit: {c}").`,
        expected: `Mem: 255\nChar: B\nLimit: inf`,
        tests: [
          {
            type: "stdoutEquals",
            name: "Звіт ідеальний",
            value: "Mem: 255\nChar: B\nLimit: inf",
            normalize: "strict"
          },
          { type: "codeRegex", name: "Hex декодування", pattern: "int\\s*\\(\\s*['\"]FF['\"]\\s*,\\s*16\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Зсув літери", pattern: "chr\\s*\\(\\s*ord\\s*\\(\\s*['\"]A['\"]\\s*\\)\\s*\\+\\s*1\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Нескінченність", pattern: "float\\s*\\(\\s*['\"]inf['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Один f-рядок", pattern: "print\\s*\\(\\s*f['\"]Mem:\\s*\\{\\s*a\\s*\\}\\\\nChar:\\s*\\{\\s*b\\s*\\}\\\\nLimit:\\s*\\{\\s*c\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      }
    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
