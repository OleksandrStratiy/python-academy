// js/data/python/m_input.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_input",
    title: "Ввід даних: input()",
    icon: "ri-keyboard-line",
    color: "#f59e0b", // Помаранчевий колір для інтерактиву
    desc: "Вчимо програму слухати! Зупинка коду, запит інформації від користувача та діалоги.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Ввід та базові типи)
      // ==========================================

      {
        title: "⏳ Програма вміє чекати",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Оживлення коду</h2>
          <p>До цього моменту наші програми були "глухими". Вони просто виконували команди і закінчували роботу. Але справжні ігри та додатки <b style="color: #3b82f6;">чекають на дії користувача</b>.</p>
          <p>Для цього в Python є функція — <b style="color: #10b981;"><code>input()</code></b> (з англ. <i>ввід</i>).</p>
          <p>Коли Python бачить <code>input()</code>, він <b style="color: #ef4444;">повністю зупиняє програму</b> і чекає, поки користувач щось напише в терміналі і натисне Enter.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Програма почалась")<br>input()  <span style="color:gray;"># Тут програма завмре і буде чекати</span><br>print("Програма закінчилась")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Програма почалась<br><i>(термінал зупинився і чекає на ваш ввід...)</i><br>Програма закінчилась</div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти розробляєш екран "Натисни будь-яку клавішу, щоб продовжити". Програма має привітати гравця, почекати на його дію, а потім попрощатися.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши три команди по черзі на різних рядках:<br>
            1. Виведи текст <code style="color: #0ea5e9;">"Старт"</code>.<br>
            2. Виклич функцію <code style="color: #0ea5e9;">input()</code>, щоб програма зробила паузу.<br>
            3. Виведи текст <code style="color: #0ea5e9;">"Фініш"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> При запуску коду клікни в термінал і натисни Enter, щоб код пішов далі!
          </div>
        `,
        hint: `Тобі потрібен один print, потім функція вводу з порожніми дужками на новому рядку, і ще один print.`,
        expected: `Старт\n(твій ввід)\nФініш`,
        tests: [
          { type: "codeRegex", name: "Є print('Старт')", pattern: "print\\s*\\(\\s*['\"]Старт['\"]\\s*\\)", checkRaw: true },
          { type: "codeIncludes", name: "Використано input()", value: "input(" },
          { type: "codeRegex", name: "Є print('Фініш')", pattern: "print\\s*\\(\\s*['\"]Фініш['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Правильний порядок", pattern: "print.*input.*print", flags: "s" }
        ]
      },

      {
        title: "📥 Ловимо дані в коробку",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Куди зникає текст?</h2>
          <p>Якщо ти просто напишеш <code>input()</code>, користувач щось введе, але ці дані відразу зникнуть!</p>
          <p>Щоб зберегти те, що ввів користувач, ми маємо покласти виклик <code>input()</code> у <b style="color: #ef4444;">змінну</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">word = input()<br>print(word)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box"><i>(Ввід: Привіт)</i><br>Привіт</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має запам'ятати повідомлення, яке вводить користувач, і відразу роздрукувати його на екрані як доказ того, що дані збережено.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">message</code> і прирівняй її до функції <code style="color: #0ea5e9;">input()</code>. На наступному рядку роздрукуй цю змінну.
          </div>
        `,
        hint: `Використай знак дорівнює (=), щоб зберегти результат input(). Потім передай змінну у функцію виводу.`,
        expected: `(ввід)`,
        tests: [
          { type: "codeRegex", name: "Змінна message зберігає ввід", pattern: "message\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Вивід змінної", pattern: "print\\s*\\(\\s*message\\s*\\)" }
        ]
      },

      {
        title: "💬 Вбудована підказка",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що від мене хочуть?</h2>
          <p>Порожній <code>input()</code> — це незручно. Користувач просто бачить блимаючий курсор і не розуміє, чого від нього хочуть (пароль? ім'я? вік?).</p>
          <p>На щастя, всередину дужок можна передати <b style="color: #3b82f6;">текст-підказку</b> (у лапках). Він надрукується прямо перед тим місцем, де користувач буде вводити дані.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">hero = input("Як тебе звати? ")<br>print(hero)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Як тебе звати? <i>(ввід: Макс)</i><br>Макс</div>
          
          <div class="theory-alert theory-alert-info">
            💡 <b style="color: #0ea5e9;">Порада:</b> Завжди став <b>пробіл</b> у кінці підказки перед закриваючою лапкою, щоб ввід користувача не злипався з твоїм текстом.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти розробляєш тест для визначення магічної тварини гравця. Комп'ютер має запитати про це з підказкою.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Збережи ввід у змінну <code style="color: #0ea5e9;">animal</code>. Підказка всередині <code style="color: #0ea5e9;">input()</code> має бути точно такою: <code style="color: #0ea5e9;">"Твоя тварина: "</code>. На наступному рядку виведи змінну <code style="color: #0ea5e9;">animal</code>.
          </div>
        `,
        hint: `Напиши текст підказки в лапках прямо всередині дужок input(). Не забудь пробіл після двокрапки!`,
        expected: `Твоя тварина: (ввід)\n(ввід)`,
        tests: [
          { type: "codeRegex", name: "Підказка всередині input", pattern: "animal\\s*=\\s*input\\s*\\(\\s*['\"]Твоя тварина:\\s+['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід змінної", pattern: "print\\s*\\(\\s*animal\\s*\\)" }
        ]
      },

      {
        title: "🗣️ Діалог (через кому)",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Відповідь реченням</h2>
          <p>Тепер ми можемо об'єднати наші знання про <code>print()</code> із комами та ввід даних!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">color = input("Улюблений колір: ")<br>print("Клас, мені теж подобається", color)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Улюблений колір: Синій<br>Клас, мені теж подобається Синій</div>
        `,
        desc: `
          <div class="task-main">
            <p>Охоронець воріт запитує ім'я подорожнього, а потім ввічливо його вітає.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай ім'я гравця, використовуючи підказку <code style="color: #0ea5e9;">"Ім'я: "</code> (збережи у змінну <code style="color: #0ea5e9;">name</code>). У функції <code style="color: #0ea5e9;">print()</code> передай два аргументи <b>через кому</b>: текст <code style="color: #0ea5e9;">"Вітаю в грі,"</code> та змінну <code style="color: #0ea5e9;">name</code>.
          </div>
        `,
        hint: `Твій другий рядок: print("Вітаю в грі,", name)`,
        expected: `Ім'я: (ввід)\nВітаю в грі, (ввід)`,
        tests: [
          { type: "codeRegex", name: "Змінна name з підказкою", pattern: "name\\s*=\\s*input\\s*\\(\\s*['\"]Ім'я:\\s+['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Друк через кому", pattern: "print\\s*\\(\\s*['\"]Вітаю в грі,['\"]\\s*,\\s*name\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "✨ Конкатенація вводу (+)",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Злипання слів</h2>
          <p>Коли ми використовуємо <b>кому</b> в <code>print()</code>, Python автоматично ставить пробіл. Але що, якщо нам потрібно додати знак оклику без пробілу? Для цього ми використовуємо склеювання (знак <b style="color: #f59e0b;"><code>+</code></b>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">food = input("Що ти їв? ")<br>print("Ого, " + food + "!")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Що ти їв? Піцу<br>Ого, Піцу!</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить користувача назвати свою професію і виводить її на екран зі знаком оклику в кінці, без жодного зайвого пробілу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай професію (змінна <code style="color: #0ea5e9;">job</code> з підказкою <code style="color: #0ea5e9;">"Професія: "</code>). За допомогою <b>плюсів</b> склей рядок <code style="color: #0ea5e9;">"Твоя професія: "</code>, змінну <code style="color: #0ea5e9;">job</code> та рядок <code style="color: #0ea5e9;">"!"</code>.
          </div>
        `,
        hint: `Твій код: print("Твоя професія: " + job + "!")`,
        expected: `Професія: (ввід)\nТвоя професія: (ввід)!`,
        tests: [
          { type: "codeRegex", name: "Ввід професії", pattern: "job\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано конкатенацію (+)", pattern: "print\\s*\\(\\s*['\"]Твоя професія:\\s*['\"]\\s*\\+\\s*job\\s*\\+\\s*['\"]!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📝 Декілька питань підряд",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Анкетування</h2>
          <p>Програма може мати скільки завгодно викликів <code>input()</code>. Вона буде зупинятися на кожному з них по черзі, чекаючи на відповідь, і лише потім піде далі.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">n1 = input("Перше слово: ")<br>n2 = input("Друге слово: ")<br>print(n1, n2)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши програму, яка збирає дані для служби доставки і виводить їх через кому.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Змінна <code style="color: #0ea5e9;">city</code> = запит <code style="color: #0ea5e9;">"Місто: "</code><br>
            2. Змінна <code style="color: #0ea5e9;">street</code> = запит <code style="color: #0ea5e9;">"Вулиця: "</code><br>
            3. Передай у <code style="color: #0ea5e9;">print()</code> через кому три аргументи: <code style="color: #0ea5e9;">"Доставка:"</code>, змінну <code style="color: #0ea5e9;">city</code>, змінну <code style="color: #0ea5e9;">street</code>.
          </div>
        `,
        hint: `Тобі потрібно три рядки коду. Останній рядок: print("Доставка:", city, street)`,
        expected: `Місто: (ввід)\nВулиця: (ввід)\nДоставка: (ввід) (ввід)`,
        tests: [
          { type: "codeRegex", name: "Змінна city", pattern: "city\\s*=\\s*input" },
          { type: "codeRegex", name: "Змінна street", pattern: "street\\s*=\\s*input" },
          { type: "codeRegex", name: "Друк через кому", pattern: "print\\s*\\(\\s*['\"]Доставка:['\"]\\s*,\\s*city\\s*,\\s*street\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "♻️ Перезапис вводу",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Одна змінна — багато відповідей</h2>
          <p>Ми можемо використовувати одну й ту саму коробку (змінну) для різних питань, якщо попередні дані нам більше не потрібні.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">ans = input("Питання 1: ")<br>ans = input("Питання 2: ")  <span style="color:gray;"># Стара відповідь назавжди зникне!</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить користувача ввести дані. Вона друкує їх, а потім перезаписує ту саму змінну новим запитом.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">text</code> і запитай <code style="color: #0ea5e9;">"Введи щось: "</code>. Виведи <code style="color: #0ea5e9;">text</code>. На наступному рядку <b>ПЕРЕЗАПИШИ</b> цю саму змінну <code style="color: #0ea5e9;">text</code> новим запитом <code style="color: #0ea5e9;">"Ще раз: "</code>. І знову виведи її.
          </div>
        `,
        hint: `У тебе має бути 4 рядки: запит у змінну text, вивід, знову запит у ту САМУ змінну text, і знову вивід.`,
        expected: `Введи щось: (ввід)\n(ввід)\nЩе раз: (ввід)\n(ввід)`,
        tests: [
          { type: "codeRegex", name: "Два інпути в text", pattern: "text\\s*=\\s*input.*text\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Два принти", pattern: "print\\s*\\(\\s*text\\s*\\).*print\\s*\\(\\s*text\\s*\\)", flags: "s" }
        ]
      },

      {
        title: "🪤 Пастка: Input = текст",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Головна ілюзія Python</h2>
          <p>Подивись на цей код. Як думаєш, що він виведе, якщо користувач введе числа 2 і 3?</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">a = input("Число: ")<br>b = input("Число: ")<br>print(a + b)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Число: 2<br>Число: 3<br>23</div>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b> <code style="color: #0ea5e9;">input()</code> <b>ЗАВЖДИ повертає текст (рядок)</b>. Python бачить їх як символи <code>"2"</code> та <code>"3"</code> і просто <b>склеює</b> їх.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Давай відтворимо цей баг, щоб запам'ятати його назавжди. Хакер написав зламаний калькулятор, який просто зліплює цифри.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">x</code> (підказка <code style="color: #0ea5e9;">"X: "</code>) та <code style="color: #0ea5e9;">y</code> (підказка <code style="color: #0ea5e9;">"Y: "</code>). Виведи їхню "суму": <code style="color: #0ea5e9;">print(x + y)</code>. 
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не використовуй тут жодних перетворень на кшталт <code>int()</code>. Наша мета — побачити помилку склеювання. Запусти код і введи два числа.
          </div>
        `,
        hint: `Просто створи x та y через input(), а потім зроби print(x + y). Python їх склеїть.`,
        expected: `X: (ввід)\nY: (ввід)\n(ввід)(ввід)`,
        tests: [
          { type: "codeRegex", name: "Змінні x та y існують", pattern: "x\\s*=\\s*input.*y\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Склеювання (баг)", pattern: "print\\s*\\(\\s*x\\s*\\+\\s*y\\s*\\)" }
        ]
      },

      {
        title: "🖨️ Множення тексту",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ехо-машина</h2>
          <p>Оскільки все, що повертає <code>input()</code> — це текст, ми можемо множити його на число! Це просто продублює текст багато разів.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">sound = input("Звук: ")<br>print(sound * 3)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Звук: Гав<br>ГавГавГав</div>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй лінію із символу, який введе користувач. Якщо він введе дефіс, програма має видати довгу смугу з дефісів.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай символ (підказка <code style="color: #0ea5e9;">"Символ: "</code>, змінна <code style="color: #0ea5e9;">char</code>). Виведи цей символ, помножений на <b>20</b>.
          </div>
        `,
        hint: `Всередині print() помнож змінну char на число 20 за допомогою зірочки (*).`,
        expected: `Символ: (ввід)\n(ввід помножений на 20)`,
        tests: [
          { type: "codeRegex", name: "Ввід у char", pattern: "char\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Множення на 20", pattern: "print\\s*\\(\\s*char\\s*\\*\\s*20\\s*\\)" }
        ]
      },

      {
        title: "↩️ Новий рядок у підказці (\\n)",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Красивий дизайн терміналу</h2>
          <p>Замість того, щоб користувач вводив відповідь в кінці довгого тексту, ми можемо перенести поле вводу на новий рядок за допомогою спецсимволу <b style="color: #3b82f6;"><code>\\n</code></b> прямо всередині підказки.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">choice = input("Обери рівень:\\n> ")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Обери рівень:<br>> <i>(тут блимає курсор)</i></div>
        `,
        desc: `
          <div class="task-main">
            <p>Запитай у гравця зброю, перенісши місце для вводу на новий рядок для красивого оформлення.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Текст підказки: <code style="color: #0ea5e9;">"Що ти береш у бій?\\n=> "</code>. Збережи ввід у змінну <code style="color: #0ea5e9;">weapon</code> і роздрукуй її.
          </div>
        `,
        hint: `Встав спецсимвол \\n всередину лапок перед стрілочкою '=> ' у підказці input().`,
        expected: `Що ти береш у бій?\n=> (ввід)\n(ввід)`,
        tests: [
          { type: "codeIncludes", name: "Символ \\n у підказці", value: "\\n=>", checkRaw: true },
          { type: "codeRegex", name: "Вивід weapon", pattern: "print\\s*\\(\\s*weapon\\s*\\)" }
        ]
      },

      {
        title: "⏸️ Пауза: Press Enter",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зупинка без збереження</h2>
          <p>Іноді нам взагалі не потрібно те, що введе користувач. Нам потрібен сам факт <b>ПАУЗИ</b>.</p>
          <p>У такому разі ми можемо викликати <code>input()</code> і <b style="color: #ef4444;">не зберігати його в змінну</b>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Ворог наближається!")<br>input("Натисни Enter...")<br>print("Бій почався!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Створи симуляцію завантаження гри. Програма зупиняється і просить натиснути Enter, щоб продовжити.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши 3 рядки коду:<br>
            1. Виведи <code style="color: #0ea5e9;">"Завантаження 100%"</code>.<br>
            2. Зроби паузу за допомогою <code style="color: #0ea5e9;">input("Натисни Enter...")</code> без використання знака дорівнює.<br>
            3. Виведи <code style="color: #0ea5e9;">"Гра почалась!"</code>.
          </div>
        `,
        hint: `Не використовуй змінну для input(). Просто виклич його як самостійну команду на другому рядку.`,
        expected: `Завантаження 100%\nНатисни Enter...(ввід)\nГра почалась!`,
        tests: [
          { type: "codeRegex", name: "Вивід Завантаження", pattern: "print\\s*\\(\\s*['\"]Завантаження 100%['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Пауза без змінної", pattern: "^\\s*input\\s*\\(\\s*['\"]Натисни Enter\\.\\.\\.['\"]\\s*\\)", flags: "m", checkRaw: true },
          { type: "codeRegex", name: "Вивід фіналу", pattern: "print\\s*\\(\\s*['\"]Гра почалась!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "⚡ Матрьошка: Input у Print",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Швидкий код</h2>
          <p>Якщо дані потрібні нам лише на секунду (щоб відразу їх вивести), ми можемо вставити <code>input()</code> <b style="color: #10b981;">прямо всередину <code>print()</code></b>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Твій статус:", input("Введи статус: "))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Введи статус: Супер<br>Твій статус: Супер</div>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши програму ОДНИМ рядком коду без створення жодних змінних.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай <code style="color: #0ea5e9;">print()</code>, щоб вивести текст <code style="color: #0ea5e9;">"Ти написав:"</code>, а другим аргументом відразу виклич <code style="color: #0ea5e9;">input("Введи слово: ")</code>.
          </div>
        `,
        hint: `Твій код має бути буквально одним рядком, де виклик input() є другим аргументом для print().`,
        expected: `Введи слово: (ввід)\nТи написав: (ввід)`,
        tests: [
          { type: "codeRegex", name: "Жодних змінних", pattern: "=", flags: "g", max: 0 },
          { type: "codeRegex", name: "Матрьошка функцій", pattern: "print\\s*\\(\\s*['\"]Ти написав:?\\s*['\"]\\s*,\\s*input\\s*\\(", checkRaw: true }
        ]
      },

      {
        title: "🔢 Магія перетворення: int()",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Знімаємо лапки</h2>
          <p>Щоб перетворити текст, який ми отримали з <code>input()</code>, на справжнє ціле число (для математики), існує функція <b style="color: #3b82f6;"><code>int()</code></b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">x_text = input("Число: ")<br>x_num = <b style="color: #10b981;">int(</b>x_text<b style="color: #10b981;">)</b>  <span style="color:gray;"># Перетворили текст на число</span><br>print(x_num + 5)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система має отримати кількість балів від гравця, перетворити їх на число і додати бонус 50 балів.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є <code style="color: #0ea5e9;">str_score = input("Очки: ")</code>. На наступному рядку створи змінну <code style="color: #0ea5e9;">num_score</code> і застосуй до <code style="color: #0ea5e9;">str_score</code> функцію <code style="color: #0ea5e9;">int()</code>. Виведи суму <code style="color: #0ea5e9;">num_score + 50</code>.
          </div>
        `,
        hint: `Спочатку отримай рядок через input. Потім перетвори його через int(). Потім роздрукуй з математикою.`,
        expected: `Очки: 100\n150`,
        tests: [
          { type: "codeRegex", name: "Ввід у str_score", pattern: "str_score\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано int()", pattern: "num_score\\s*=\\s*int\\s*\\(\\s*str_score\\s*\\)" },
          { type: "codeRegex", name: "Додано 50", pattern: "print\\s*\\(.*num_score\\s*\\+\\s*50.*\\)" }
        ]
      },

      {
        title: "🎯 Одразу число: int(input())",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Матрьошка для чисел</h2>
          <p>Замість того, щоб писати два рядки (отримувати текст, а потім його перетворювати), ми можемо огорнути <code>input()</code> усередину <code>int()</code>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">age = <b style="color: #10b981;">int(</b>input("Вік: ")<b style="color: #10b981;">)</b><br>print("Через рік:", age + 1)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Отримай рівень гравця відразу як число в одному рядку і покажи його наступний рівень.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай рівень (підказка <code style="color: #0ea5e9;">"Рівень: "</code>, змінна <code style="color: #0ea5e9;">level</code>). Обов'язково огорни <code>input</code> у функцію <code style="color: #0ea5e9;">int()</code>. На наступному рядку виведи <code style="color: #0ea5e9;">level + 1</code>.
          </div>
        `,
        hint: `Твій перший рядок має виглядати так: level = int(input("Рівень: ")). Не забудь закрити ДВІ дужки в кінці!`,
        expected: `Рівень: (ввід)\n(ввід + 1)`,
        tests: [
          { type: "codeRegex", name: "Ввід обгорнуто в int()", pattern: "level\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Вивід level + 1", pattern: "print\\s*\\(\\s*level\\s*\\+\\s*1\\s*\\)" }
        ]
      },

      {
        title: "🧮 Калькулятор (Додавання)",
        xp: 170,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Справжня математика</h2>
          <p>Тепер ми можемо створити свій перший справжній калькулятор. Оскільки ми перетворюємо вводи на <code>int</code>, знак <code>+</code> буде додавати числа математично, а не склеювати їх!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи калькулятор, який запитує два числа і складає їх.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай два числа з перетворенням у <code>int()</code>: <code style="color: #0ea5e9;">a = int(input("A: "))</code> та <code style="color: #0ea5e9;">b = int(input("B: "))</code>. Виведи їхню суму за допомогою плюса.
          </div>
        `,
        hint: `Просто створи дві змінні з цілочисельним вводом, а в print() напиши a + b.`,
        expected: `A: (ввід)\nB: (ввід)\n(сума)`,
        tests: [
          { type: "codeRegex", name: "Змінні a та b (int)", pattern: "a\\s*=\\s*int.*b\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Додавання a + b", pattern: "print\\s*\\(\\s*a\\s*\\+\\s*b\\s*\\)" }
        ]
      },

      {
        title: "🛑 Пастка TypeError",
        xp: 180,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Несумісні типи</h2>
          <p>Що буде, якщо спробувати додати текст (який ми отримали з <code>input</code> без кастингу) до цілого числа?</p>
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">Помилка (TypeError):</b> Якщо ти напишеш <code style="color: #0ea5e9;">"10" + 5</code>, Python запанікує і зламається. Він не може склеїти текст із математикою!
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Хтось написав код для отримання монет, але забув перетворити ввід на число. Програма видає помилку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Ось зламаний код:<br>
            <code style="color: #0ea5e9;">coins = input("Монети: ")</code><br>
            <code style="color: #0ea5e9;">print(coins + 50)</code><br>
            Додай функцію <code style="color: #0ea5e9;">int()</code> туди, де це необхідно, щоб код запрацював і порахував математику.
          </div>
        `,
        hint: `Огорни input(...) у функцію int(), щоб змінна coins стала числом.`,
        expected: `Монети: (ввід)\n(ввід + 50)`,
        tests: [
          { type: "codeRegex", name: "Код виправлено (додано int)", pattern: "coins\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Додавання працює", pattern: "print\\s*\\(\\s*coins\\s*\\+\\s*50\\s*\\)" }
        ]
      },

      {
        title: "💧 Дробові числа: float()",
        xp: 190,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Копійки та вага</h2>
          <p>Функція <code>int()</code> ламається, якщо користувач вводить число з крапкою (наприклад <code>3.5</code>). Для цілих чисел вона працює, а для дробів — ні.</p>
          <p>Якщо нам потрібні дробові числа (вага, ціна, температура), ми використовуємо функцію <b style="color: #3b82f6;"><code>float()</code></b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">weight = <b style="color: #3b82f6;">float(</b>input("Вага: ")<b style="color: #3b82f6;">)</b></div>
        `,
        desc: `
          <div class="task-main">
            <p>Датчик отримує температуру як дробове число і автоматично додає до неї 1.5 градуса похибки.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">temp = float(input("Температура: "))</code>. Виведи <code style="color: #0ea5e9;">temp + 1.5</code>.
          </div>
        `,
        hint: `Використай float(input(...)). Тоді ти зможеш додавати дробове число 1.5 без помилок.`,
        expected: `Температура: 36.6\n38.1`,
        tests: [
          { type: "codeRegex", name: "Ввід через float()", pattern: "temp\\s*=\\s*float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Додано 1.5", pattern: "print\\s*\\(\\s*temp\\s*\\+\\s*1\\.5\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🚀 Математика в print()",
        xp: 200,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рахуємо на льоту</h2>
          <p>Якщо ти використовуєш <b>кому</b> в <code>print()</code>, ти можеш робити обчислення прямо серед аргументів! Це економить код.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">lvl = int(input("Рівень: "))<br>print("Наступний рівень:", lvl + 1)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма питає поточний рік і відразу друкує, який рік буде через 10 років, обчислюючи це прямо у виводі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">year = int(input("Рік: "))</code>. За допомогою ком у <code style="color: #0ea5e9;">print()</code> виведи 3 аргументи: текст <code style="color: #0ea5e9;">"Через 10 років буде"</code>, обчислення <code style="color: #0ea5e9;">year + 10</code>, і текст <code style="color: #0ea5e9;">"рік"</code>.
          </div>
        `,
        hint: `Твій код: print("Через 10 років буде", year + 10, "рік")`,
        expected: `Рік: (ввід)\nЧерез 10 років буде (ввід + 10) рік`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "year\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Коми та математика", pattern: "print\\s*\\(.*,\\s*year\\s*\\+\\s*10\\s*,.*\\)" },
          { type: "codeRegex", name: "Без f-рядків", pattern: "f['\"]", flags: "g", max: 0, checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Генератор бейджів",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Збір даних та коми</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши скрипт для генерації бейджів учасників конференції.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай ім'я: <code style="color: #0ea5e9;">"Ім'я: "</code> (змінна <code style="color: #0ea5e9;">user</code>).<br>
            2. Запитай посада: <code style="color: #0ea5e9;">"Посада: "</code> (змінна <code style="color: #0ea5e9;">role</code>).<br>
            3. За допомогою ком виведи бейдж у форматі: <code style="color: #0ea5e9;">print("Бейдж: [" + role + "]", user)</code>.
          </div>
        `,
        hint: `Оскільки коми ставлять пробіли, твій принт має виглядати так: print("Бейдж: [" + role + "]", user). Тобто склеюй квадратні дужки плюсом, а ім'я додай через кому.`,
        expected: `Ім'я: Макс\nПосада: Бос\nБейдж: [Бос] Макс`,
        tests: [
          { type: "codeRegex", name: "Опитування", pattern: "user\\s*=\\s*input.*role\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Форматування бейджа", pattern: "print\\s*\\(.*role.*,.*user\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Обмінник",
        xp: 270,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: int та float разом</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши конвертер валют для обмінного пункту.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай кількість доларів: <code style="color: #0ea5e9;">dollars</code> (обов'язково <code style="color: #0ea5e9;">int()</code>).<br>
            2. Задай курс вручну в коді: <code style="color: #0ea5e9;">rate = 41.5</code>.<br>
            3. Через кому виведи суму (множення доларів на курс): <code style="color: #0ea5e9;">print("До сплати:", dollars * rate, "грн")</code>.
          </div>
        `,
        hint: `print("До сплати:", dollars * rate, "грн")`,
        expected: `Долари: 10\nДо сплати: 415.0 грн`,
        tests: [
          { type: "codeRegex", name: "dollars як int()", pattern: "dollars\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Змінна rate = 41.5", pattern: "rate\\s*=\\s*41.5" },
          { type: "codeRegex", name: "Множення через кому", pattern: "print\\s*\\(.*,\\s*dollars\\s*\\*\\s*rate\\s*,.*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Трекер Досвіду",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Змінні та математика</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Онови статистику гравця після завершення квесту.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай: <code style="color: #0ea5e9;">xp = int(input("Поточний XP: "))</code><br>
            2. Запитай: <code style="color: #0ea5e9;">gained = int(input("Отримано XP: "))</code><br>
            3. Збільш <code style="color: #0ea5e9;">xp</code> на <code style="color: #0ea5e9;">gained</code> за допомогою оператора <code style="color: #0ea5e9;">+=</code>.<br>
            4. Виведи через кому: <code style="color: #0ea5e9;">print("Новий XP:", xp)</code>.
          </div>
        `,
        hint: `Тобі знадобиться рядок xp += gained між інпутами та принтом.`,
        expected: `Поточний XP: 100\nОтримано XP: 50\nНовий XP: 150`,
        tests: [
          { type: "codeRegex", name: "Обидва інпути цілі", pattern: "xp\\s*=\\s*int.*gained\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Використано +=", pattern: "xp\\s*\\+=\\s*gained", checkRaw: true },
          { type: "codeRegex", name: "Друк через кому", pattern: "print\\s*\\(\\s*['\"]Новий XP:['\"]\\s*,\\s*xp\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🐉 БОС (Junior): Торговець Зброєю",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Інтерактив</h2>
          <p>Час поєднати введення тексту, цілих чисел, дробових цін та форматування виводу через коми та плюси.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши скрипт для віртуального торговця. Він запитує товар, ціну, кількість і видає фінальний чек із підрахованою сумою.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Запитай назву предмета (текст): <code style="color: #0ea5e9;">item = input("Що купуєш? ")</code><br>
            2. Запитай ціну (дріб!): <code style="color: #0ea5e9;">price = float(input("Ціна за штуку: "))</code><br>
            3. Запитай кількість (ціле!): <code style="color: #0ea5e9;">amount = int(input("Кількість: "))</code><br>
            4. Виведи чек у такому форматі, обчисливши суму (<code style="color: #0ea5e9;">price * amount</code>) прямо всередині print():<br>
            <code style="color: #0ea5e9;">print("Ви купили", amount, "шт.", item, "| Сума:", price * amount)</code>
          </div>
        `,
        hint: `Формат фінального рядка: print("Ви купили", amount, "шт.", item, "| Сума:", price * amount)`,
        expected: `Що купуєш? Зілля\nЦіна за штуку: 12.5\nКількість: 3\nВи купили 3 шт. Зілля | Сума: 37.5`,
        tests: [
          { type: "codeRegex", name: "Ввід item (str)", pattern: "item\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Ввід price (float)", pattern: "price\\s*=\\s*float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Ввід amount (int)", pattern: "amount\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Математика всередині", pattern: "price\\s*\\*\\s*amount", checkRaw: true },
          { type: "codeRegex", name: "Вивід чеку", pattern: "print\\s*\\(\\s*['\"]Ви купили['\"]\\s*,\\s*amount\\s*,\\s*['\"]шт\\.['\"]\\s*,\\s*item\\s*,\\s*['\"]\\| Сума:['\"]\\s*,\\s*price\\s*\\*\\s*amount\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Очищення та Валідація вводу)
      // ==========================================

      {
        title: "🧹 Очищення країв: .strip()",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Проблема невидимих символів</h2>
          <p>Користувачі часто випадково ставлять пробіли перед або після тексту. Якщо програма чекає пароль <code>"qwerty"</code>, а користувач ввів <code>" qwerty "</code> (з пробілами), програма видасть помилку (паролі не збігаються).</p>
          <p>Щоб автоматично відрізати ці зайві пробіли по краях, існує метод рядка <b style="color: #3b82f6;"><code>.strip()</code></b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">ans = input("Пароль: ")<b style="color: #10b981;">.strip()</b><br>print(f"[{ans}]")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Пароль: &nbsp;&nbsp;&nbsp;12345&nbsp;&nbsp;&nbsp;<br>[12345]</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма отримує секретний код від користувача. Твоя задача — захистити систему від випадкових пробілів, відрізавши їх відразу під час вводу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">code = input("Код: ")</code>, але відразу допиши до нього метод <code style="color: #0ea5e9;">.strip()</code>. На наступному рядку виведи f-рядок: <code style="color: #0ea5e9;">print(f"Очищено: {code}")</code>.
          </div>
        `,
        hint: `Допиши .strip() відразу після закриваючої дужки input(). Тобто: input("...").strip()`,
        expected: `Код:    (ввід)   \nОчищено: (ввід без пробілів)`,
        tests: [
          { type: "codeRegex", name: "Використано .strip()", pattern: "input\\s*\\(.*\\)\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "print\\s*\\(\\s*f['\"]Очищено:\\s*\\{\\s*code\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🪒 Хірургічне очищення: .strip('chars')",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ріжемо не тільки пробіли</h2>
          <p>Метод <code>.strip()</code> може видаляти не лише пробіли! Якщо передати йому в дужках текст (рядок із символами), він відріже саме ці символи по краях тексту.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">nick = input("Нік: ").strip("-_*")<br>print(nick)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Нік: -_-Ninja_*-<br>Ninja</div>
        `,
        desc: `
          <div class="task-main">
            <p>Користувачі часто прикрашають свої юзернейми зайвими символами "@" та "!". Очисти їхнє ім'я для бази даних.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">username = input("Юзернейм: ")</code>. Очисти його від символів <code style="color: #0ea5e9;">"@"</code> та <code style="color: #0ea5e9;">"!"</code> по краях (передай їх як один суцільний рядок у <code style="color: #0ea5e9;">.strip()</code>). Виведи <code style="color: #0ea5e9;">username</code>.
          </div>
        `,
        hint: `Твій код має бути таким: username = input("...").strip("@!")`,
        expected: `Юзернейм: @@(ввід)!!\n(чистий ввід)`,
        tests: [
          { type: "codeRegex", name: "Використано .strip('@!')", pattern: "strip\\s*\\(\\s*['\"]@!['\"]\\s*\\)|strip\\s*\\(\\s*['\"]!@['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід username", pattern: "print\\s*\\(\\s*username\\s*\\)" }
        ]
      },

      {
        title: "⬅️ Очищення з одного боку (lstrip)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Одностороннє різання</h2>
          <p>Якщо нам треба видалити символи <b>тільки зліва</b> (на початку), ми використовуємо <b style="color: #3b82f6;"><code>.lstrip()</code></b> (від <i>left strip</i>).</p>
          <p>Для видалення <b>тільки справа</b> (в кінці) використовується <b style="color: #3b82f6;"><code>.rstrip()</code></b> (від <i>right strip</i>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">code = input("Код: ").lstrip("0")<br>print(code)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Код: 000100<br>100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Фінансові документи іноді приходять із зайвими нулями на початку. Тобі треба відрізати нулі зліва, але залишити ті, що справа (щоб не зламати суму).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">code = input("Код: ")</code>. Відріж усі нулі <code style="color: #0ea5e9;">"0"</code> тільки зліва за допомогою методу <code style="color: #0ea5e9;">.lstrip()</code>. Виведи результат.
          </div>
        `,
        hint: `Твій код: input("...").lstrip("0")`,
        expected: `Код: 000(ввід)00\n(ввід)00`,
        tests: [
          { type: "codeRegex", name: "Використано lstrip", pattern: "lstrip\\s*\\(\\s*['\"]0['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*code\\s*\\)" }
        ]
      },

      {
        title: "⬇️ Контроль регістру: .lower()",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Нормалізація даних</h2>
          <p>Користувачі пишуть email-и як хочуть: <code>MaX@gmail.com</code>. Бази даних цього не люблять (бо <code>Max</code> і <code>max</code> для комп'ютера — це різні слова).</p>
          <p>Щоб усе було одноманітно, використовують метод <b style="color: #3b82f6;"><code>.lower()</code></b>, який робить абсолютно всі літери маленькими.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">email = input("Email: ").lower()<br>print(email)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Приведи введений користувачем email до правильного формату (усі літери мають бути маленькими).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">email = input("Email: ")</code> і відразу застосуй до нього метод <code style="color: #0ea5e9;">.lower()</code>. На наступному рядку виведи його через f-рядок: <code style="color: #0ea5e9;">print(f"Збережено: {email}")</code>.
          </div>
        `,
        hint: `Відразу застосовуй метод до input(). Потім використай f-рядок для виводу.`,
        expected: `Email: mAx@MaIl.com\nЗбережено: max@mail.com`,
        tests: [
          { type: "codeRegex", name: "Використано .lower()", pattern: "email\\s*=\\s*input.*\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "print\\s*\\(\\s*f['\"]Збережено:\\s*\\{\\s*email\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "⬆️ Крик у терміналі: .upper()",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Тільки великі</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.upper()</code></b> робить протилежне — він перетворює всі літери тексту на ВЕЛИКІ.</p>
          <p>Це найчастіше використовують для збереження промокодів, автомобільних номерів або паспортних даних.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач вводить промокод на знижку. Система має автоматично перетворити його на великі літери, щоб він успішно активувався.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">promo = input("Промокод: ")</code> і застосуй до нього <code style="color: #0ea5e9;">.upper()</code>. Виведи f-рядок: <code style="color: #0ea5e9;">print(f"Активовано: {promo}")</code>.
          </div>
        `,
        hint: `Допиши .upper() до input().`,
        expected: `Промокод: (ввід)\nАктивовано: (ВЕЛИКИЙ ВВІД)`,
        tests: [
          { type: "codeRegex", name: "Використано .upper()", pattern: "promo\\s*=\\s*input.*\\.upper\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "print\\s*\\(\\s*f['\"]Активовано:\\s*\\{\\s*promo\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📝 Ідеальні імена: .title()",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Форматування ПІБ</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.title()</code></b> робить першу літеру КОЖНОГО слова великою, а всі інші літери в слові — маленькими.</p>
          <p>Це просто ідеально для імен, прізвищ та назв міст!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">city = input("Місто: ").title()<br>print(city)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Місто: нЬЮ-йОРК<br>Нью-Йорк</div>
        `,
        desc: `
          <div class="task-main">
            <p>Люди часто пишуть свої імена з маленької літери або випадково натискають Caps Lock посеред слова. Виправ це!</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">fullname = input("ПІБ: ")</code>. Відразу застосуй до нього <code style="color: #0ea5e9;">.title()</code>. На наступному рядку виведи змінну <code style="color: #0ea5e9;">fullname</code>.
          </div>
        `,
        hint: `Допиши .title() до функції input().`,
        expected: `ПІБ: (ввід)\n(Ввід з великих літер)`,
        tests: [
          { type: "codeRegex", name: "Використано .title()", pattern: "input\\s*\\(.*\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*fullname\\s*\\)" }
        ]
      },

      {
        title: "🔗 Ланцюжок методів (Chaining)",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Комбо майстра</h2>
          <p>Методи можна викликати <b style="color: #10b981;">один за одним</b> у вигляді ланцюжка! Вони будуть виконуватися послідовно зліва направо.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">cmd = input("Команда: ").strip().lower()<br>print(cmd)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Команда: &nbsp;&nbsp;&nbsp;EXIT&nbsp;&nbsp;&nbsp;<br>exit</div>
          <p>Як це працює: Python бере ввід <code>"  EXIT  "</code>, відрізає пробіли (стає <code>"EXIT"</code>), а потім робить усе маленьким (стає <code>"exit"</code>).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Очисти краї та виправ регістр введеного слова в одному рядку коду.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">country = input("Країна: ")</code>. Застосуй до неї ОДРАЗУ ДВА методи: очищення від пробілів (<code style="color: #0ea5e9;">.strip()</code>) та перетворення на формат з великої літери (<code style="color: #0ea5e9;">.title()</code>). Виведи результат.
          </div>
        `,
        hint: `Твій перший рядок: country = input("Країна: ").strip().title()`,
        expected: `Країна: (ввід)\n(чистий ввід)`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок .strip().title()", pattern: "input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*country\\s*\\)" }
        ]
      },

      {
        title: "🔢 Чи це цифри? .isdigit()",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перевірка вводу (Валідація)</h2>
          <p>Користувачі часто помиляються і вводять букви там, де треба цифри. Якщо ми спробуємо застосувати <code>int()</code> до літер, програма впаде з помилкою.</p>
          <p>Метод рядка <b style="color: #3b82f6;"><code>.isdigit()</code></b> повертає логічне значення <code>True</code>, якщо весь текст складається ТІЛЬКИ з цифр, і <code>False</code> в іншому випадку.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">ans = input("Пін: ").isdigit()<br>print(ans)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система безпеки повинна перевірити, чи ввів користувач правильний пін-код (чи немає там випадкових літер).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">pin = input("Пін-код: ")</code>. Одразу допиши до нього метод <code style="color: #0ea5e9;">.isdigit()</code>, щоб змінна <code style="color: #0ea5e9;">pin</code> зберегла в собі <code>True</code> або <code>False</code>. Роздрукуй змінну <code style="color: #0ea5e9;">pin</code>.
          </div>
        `,
        hint: `Твій перший рядок: pin = input("Пін-код: ").isdigit()`,
        expected: `Пін-код: (ввід)\nTrue/False`,
        tests: [
          { type: "codeRegex", name: "Використано .isdigit()", pattern: "input\\s*\\(.*\\)\\.isdigit\\s*\\(\\)" },
          { type: "codeRegex", name: "Друк змінної", pattern: "print\\s*\\(\\s*pin\\s*\\)" }
        ]
      },

      {
        title: "🅰️ Чи це букви? .isalpha()",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Тільки літери!</h2>
          <p>Протилежний метод — <b style="color: #3b82f6;"><code>.isalpha()</code></b> (чи є алфавітом). Він повертає <code>True</code> тільки тоді, коли текст складається <b style="color: #ef4444;">виключно з літер</b> (без пробілів і цифр).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи ім'я користувача не містить цифр або спецсимволів.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай ім'я: <code style="color: #0ea5e9;">name = input("Ім'я: ")</code>. Допиши до <code>input()</code> метод <code style="color: #0ea5e9;">.isalpha()</code> та виведи результат перевірки.
          </div>
        `,
        hint: `Роби за аналогією з попереднім завданням, але використай isalpha().`,
        expected: `Ім'я: (ввід)\nTrue/False`,
        tests: [
          { type: "codeRegex", name: "Використано .isalpha()", pattern: "input\\s*\\(.*\\)\\.isalpha\\s*\\(\\)" },
          { type: "codeRegex", name: "Друк змінної", pattern: "print\\s*\\(\\s*name\\s*\\)" }
        ]
      },

      {
        title: "🛠️ Ремонт вводу: .replace()",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Заміна на льоту</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.replace("що", "на_що")</code></b> дозволяє знайти в тексті певний шматок і замінити його на щось інше.</p>
          <p>Це ідеально для виправлення помилок користувача! Наприклад, якщо користувач ввів дробове число через кому (<code>"3,5"</code>), функція <code>float()</code> видасть помилку. Ми можемо автоматично замінити кому на крапку!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">txt = input("Вага: ").replace(",", ".")<br>num = float(txt)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши безпечний конвертер ціни, який зможе зрозуміти користувача, навіть якщо він введе ціну через кому (наприклад 15,99).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Запитай: <code style="color: #0ea5e9;">raw = input("Ціна: ").replace(",", ".")</code><br>
            2. Перетвори на число: <code style="color: #0ea5e9;">price = float(raw)</code><br>
            3. Виведи змінну <code style="color: #0ea5e9;">price</code>.
          </div>
        `,
        hint: `У першому рядку додай .replace(",", ".") після input(). У другому обгорни raw у float().`,
        expected: `Ціна: (ввід)\n(число з крапкою)`,
        tests: [
          { type: "codeRegex", name: "Використано replace", pattern: "\\.replace\\s*\\(\\s*['\"],['\"]\\s*,\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Перетворення у float", pattern: "price\\s*=\\s*float\\s*\\(\\s*raw\\s*\\)" },
          { type: "codeRegex", name: "Вивід price", pattern: "print\\s*\\(\\s*price\\s*\\)" }
        ]
      },

      {
        title: "🎛️ Меню по центру: .center()",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дизайн терміналу</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.center(ширина, "символ")</code></b> ідеально вирівнює текст по центру заданої ширини, заповнюючи порожнечу вказаним символом з обох боків.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">title = "МЕНЮ"<br>print(title.center(20, "="))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">========МЕНЮ========</div>
        `,
        desc: `
          <div class="task-main">
            <p>Створи красивий заголовок для програми з того тексту, який введе користувач.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">title = input("Заголовок: ")</code>. Виведи цей заголовок по центру шириною <b>30</b> символів, заповнивши краї тире <code style="color: #0ea5e9;">"-"</code>.
          </div>
        `,
        hint: `print(title.center(30, "-"))`,
        expected: `Заголовок: (ввід)\n-----(ввід)-----`,
        tests: [
          { type: "codeRegex", name: "Ввід title", pattern: "title\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано center", pattern: "print\\s*\\(\\s*title\\.center\\s*\\(\\s*30\\s*,\\s*['\"]-['\"]\\s*\\)\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📊 Таблиці: .ljust() та .rjust()",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вирівнювання країв</h2>
          <p>Аналогічно до центрування існують <b style="color: #3b82f6;"><code>.ljust()</code></b> (по лівому краю) та <b style="color: #3b82f6;"><code>.rjust()</code></b> (по правому краю). Вони дозволяють робити ідеально рівні стовпчики, якщо застосовувати їх до різних частин тексту.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">item = "Меч".ljust(15, ".")<br>price = "150G".rjust(6)<br>print(item + price)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Меч............  150G</div>
        `,
        desc: `
          <div class="task-main">
            <p>Створи один рядок рейтингу з двох вводів користувача: зліва ім'я (притиснуте ліворуч з крапками), справа — бали (притиснуті праворуч з пробілами).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">name = input("Гравець: ")</code> та <code style="color: #0ea5e9;">score = input("Очки: ")</code>.<br>
            Застосуй до <code style="color: #0ea5e9;">name</code> метод <code style="color: #0ea5e9;">.ljust(20, ".")</code>.<br>
            Застосуй до <code style="color: #0ea5e9;">score</code> метод <code style="color: #0ea5e9;">.rjust(5)</code> (без другого аргумента, за замовчуванням це будуть пробіли).<br>
            Виведи їх, склеївши знаком плюса.
          </div>
        `,
        hint: `print(name.ljust(20, ".") + score.rjust(5))`,
        expected: `Гравець: (ввід)\nОчки: (ввід)\n(ввід)...........(ввід)`,
        tests: [
          { type: "codeRegex", name: "Запит name", pattern: "name\\s*=\\s*input" },
          { type: "codeRegex", name: "Запит score", pattern: "score\\s*=\\s*input" },
          { type: "codeRegex", name: "name.ljust(20, '.')", pattern: "name.*\\.ljust\\s*\\(\\s*20\\s*,\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "score.rjust(5)", pattern: "score.*\\.rjust\\s*\\(\\s*5\\s*\\)" },
          { type: "codeRegex", name: "Друк з плюсом", pattern: "print\\s*\\(\\s*name.*\\+\\s*score.*\\)" }
        ]
      },

      {
        title: "🏁 Як починається? .startswith()",
        xp: 260,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перевірка країв</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.startswith()</code></b> (чи починається з...) повертає <code>True</code> або <code>False</code>, перевіряючи, чи починається текст із певного слова чи символу.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">url = input("Сайт: ")<br>is_secure = url.startswith("https://")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи безпечний сайт ввів користувач (він має починатися з "https").</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">url = input("Сайт: ")</code>. За допомогою методу <code style="color: #0ea5e9;">.startswith("https")</code> перевір посилання і виведи результат (True або False).
          </div>
        `,
        hint: `print(url.startswith("https"))`,
        expected: `Сайт: (ввід)\nTrue/False`,
        tests: [
          { type: "codeRegex", name: "Використано startswith", pattern: "url\\.startswith\\s*\\(\\s*['\"]https['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід результату", pattern: "print\\s*\\(" }
        ]
      },

      {
        title: "🏁 Чим закінчується? .endswith()",
        xp: 270,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перевірка формату</h2>
          <p>Аналогічно працює <b style="color: #3b82f6;"><code>.endswith()</code></b> (чи закінчується на...). Його дуже часто використовують, щоб перевірити формат файлу (наприклад, чи закінчується він на <code>.jpg</code> або <code>.py</code>).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система приймає тільки скрипти Python. Перевір, чи ввів користувач правильний файл.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">filename = input("Файл: ")</code>. Перевір, чи закінчується він на <code style="color: #0ea5e9;">".py"</code> і виведи результат (True/False).
          </div>
        `,
        hint: `Використай метод .endswith(".py") на змінній filename.`,
        expected: `Файл: (ввід)\nTrue/False`,
        tests: [
          { type: "codeRegex", name: "Використано endswith", pattern: "filename\\.endswith\\s*\\(\\s*['\"]\\.py['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід результату", pattern: "print\\s*\\(" }
        ]
      },

      {
        title: "🔍 Де сховався символ? .find()",
        xp: 280,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пошук індексу</h2>
          <p>Щоб дізнатися, на якій позиції (індексі) знаходиться конкретний символ або слово у тексті, використовують метод <b style="color: #3b82f6;"><code>.find()</code></b>.</p>
          <p>Він повертає цифру (починаючи з 0). Якщо шуканий текст не знайдено, він повертає <code>-1</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">email = input("Email: ")<br>pos = email.find("@")<br>print("Собачка на позиції:", pos)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Знайди позицію літери у введеному слові.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">word = input("Слово: ")</code>. Знайди позицію літери <code style="color: #0ea5e9;">"а"</code> (української): <code style="color: #0ea5e9;">pos = word.find("а")</code>. Виведи <code style="color: #0ea5e9;">pos</code> на екран.
          </div>
        `,
        hint: `Використай word.find("а") і роздрукуй результат. Пам'ятай, програмісти рахують з нуля!`,
        expected: `Слово: (ввід)\n(позиція)`,
        tests: [
          { type: "codeRegex", name: "Використано find", pattern: "pos\\s*=\\s*word\\.find\\s*\\(\\s*['\"]а['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід позиції", pattern: "print\\s*\\(\\s*pos\\s*\\)" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Валідатор Пін-коду",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: len() та isdigit()</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши скрипт, який перевіряє пін-код на два критерії: він має містити рівно 4 символи і складатися тільки з цифр.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай <code style="color: #0ea5e9;">pin = input("Пін: ").strip()</code>.<br>
            2. Створи змінну <code style="color: #0ea5e9;">is_length_ok = (len(pin) == 4)</code>.<br>
            3. Створи змінну <code style="color: #0ea5e9;">is_numbers = pin.isdigit()</code>.<br>
            4. Виведи f-рядком: <code style="color: #0ea5e9;">print(f"Довжина 4: {is_length_ok} | Тільки цифри: {is_numbers}")</code>.
          </div>
        `,
        hint: `Просто перенеси формули з опису в код! (len(pin) == 4) перевіряє рівність і записує True або False.`,
        expected: `Пін: (ввід)\nДовжина 4: True/False | Тільки цифри: True/False`,
        tests: [
          { type: "codeRegex", name: "Перевірка довжини (== 4)", pattern: "is_length_ok\\s*=\\s*\\(?\\s*len\\s*\\(\\s*pin\\s*\\)\\s*==\\s*4\\s*\\)?" },
          { type: "codeRegex", name: "Перевірка на цифри", pattern: "is_numbers\\s*=\\s*pin\\.isdigit\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "print\\s*\\(\\s*f['\"]Довжина 4:\\s*\\{\\s*is_length_ok\\s*\\}\\s*\\|\\s*Тільки цифри:\\s*\\{\\s*is_numbers\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: UI-Майстер",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: replace та ljust</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Оброби слово: заміни в ньому всі літери "а" на "собачку" і вирівняй по лівому краю.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай <code style="color: #0ea5e9;">word = input("Слово: ").strip()</code>.<br>
            2. Заміни в ньому всі букви <code style="color: #0ea5e9;">"а"</code> на <code style="color: #0ea5e9;">"@"</code> і збережи в ту ж змінну <code style="color: #0ea5e9;">word</code>.<br>
            3. Виведи це слово, вирівняне по лівому краю на 10 символів, заповнивши пустоту зірочками <code style="color: #0ea5e9;">"*"</code>.
          </div>
        `,
        hint: `Ланцюжок такий: спочатку word = word.replace("а", "@"). А в принті: print(word.ljust(10, "*"))`,
        expected: `Слово: (ввід)\n(результат)`,
        tests: [
          { type: "codeRegex", name: "Використано replace", pattern: "replace\\s*\\(\\s*['\"]а['\"]\\s*,\\s*['\"]@['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Використано ljust(10, '*')", pattern: "print\\s*\\(\\s*word\\.ljust\\s*\\(\\s*10\\s*,\\s*['\"]\\*['\"]\\s*\\)\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Чистий Код",
        xp: 450,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Ланцюжки методів</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач часто вводить свої ПІБ як завгодно (з пробілами і різним регістром). Зроби їх ідеальними в один рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">name = input("ПІБ: ")</code>.<br>
            В <b>одному рядку</b> застосуй до <code style="color: #0ea5e9;">input()</code> два методи: спочатку видали пробіли по краях, а потім зроби всі слова з великої літери.<br>
            Роздрукуй <code style="color: #0ea5e9;">name</code>.
          </div>
        `,
        hint: `Ланцюжок: input(...).strip().title()`,
        expected: `ПІБ: (ввід)\n(чистий вивід)`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок strip().title()", pattern: "name\\s*=\\s*input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*name\\s*\\)" }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🐉 БОС (Middle): Квиток на потяг",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Логіка і Дизайн</h2>
          <p>Ти маєш прийняти неідеальні дані, обробити їх (замінити коми, прибрати пробіли, зробити математику) і роздрукувати гарний чек.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши систему друку квитків, яка робить знижку і форматує квиток.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Виведи по центру шириною 30 символів заголовок <code style="color: #0ea5e9;">"UKRZALIZNYTSIA"</code> (заповнювач <code style="color: #0ea5e9;">"="</code>).<br>
            2. Запитай ім'я, відразу відрізавши краї і зробивши його з великої літери: <code style="color: #0ea5e9;">name = input("Пасажир: ").strip().title()</code>.<br>
            3. Запитай ціну: <code style="color: #0ea5e9;">price_str = input("Ціна: ")</code>.<br>
            4. Заміни в <code style="color: #0ea5e9;">price_str</code> кому на крапку і перетвори на <code style="color: #0ea5e9;">float</code> у змінну <code style="color: #0ea5e9;">price</code>.<br>
            5. Знайди ціну зі знижкою 10% (помнож на 0.9) і збережи в <code style="color: #0ea5e9;">discounted</code>.<br>
            6. Виведи рядок: зліва ім'я (ширина 20, крапки), справа знижка (ширина 10, пробіли): <code style="color: #0ea5e9;">print(name.ljust(20, ".") + str(discounted).rjust(10))</code>.
          </div>
        `,
        hint: `Покроково: 1) print("UKRZALIZNYTSIA".center(30, "=")). 2,3) input. 4) price = float(price_str.replace(",", ".")). 5) discounted = price * 0.9. 6) print(name.ljust... + str(discounted).rjust...).`,
        expected: `========UKRZALIZNYTSIA========\nПасажир: (ввід)\nЦіна: (ввід)\n(результат)`,
        tests: [
          { type: "codeRegex", name: "Заголовок по центру", pattern: "print\\s*\\(\\s*['\"]UKRZALIZNYTSIA['\"]\\.center\\s*\\(\\s*30\\s*,\\s*['\"]=['\"]\\s*\\)\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Ланцюжок strip і title", pattern: "name\\s*=\\s*input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "replace та float", pattern: "price\\s*=\\s*float\\s*\\(\\s*price_str\\.replace\\s*\\(\\s*['\"],['\"]\\s*,\\s*['\"]\\.['\"]\\s*\\)\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Знижка 10%", pattern: "discounted\\s*=\\s*price\\s*\\*\\s*0.9" },
          { type: "codeRegex", name: "Вирівнювання (ljust + rjust)", pattern: "print\\s*\\(\\s*name\\.ljust\\s*\\(\\s*20\\s*,\\s*['\"]\\.['\"]\\s*\\)\\s*\\+\\s*str\\s*\\(\\s*discounted\\s*\\)\\.rjust\\s*\\(\\s*10\\s*\\)\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

// ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Парсинг та Очищення Даних)
      // ==========================================

      {
        title: "🪓 Розрізаємо текст: .split()",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Один ввід — багато слів</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.split()</code></b> (розділяти) дозволяє розрізати рядок на кілька частин. За замовчуванням він ріже текст <b>по пробілах</b> і створює <b>список</b> (list).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">words = "Один Два Три".split()<br>print(words)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">['Один', 'Два', 'Три']</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має розрізати введену фразу на окремі слова, щоб потім проаналізувати кожне з них.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай фразу: <code style="color: #0ea5e9;">phrase = input("Фраза: ")</code> і відразу застосуй до неї метод <code style="color: #0ea5e9;">.split()</code>. Виведи змінну <code style="color: #0ea5e9;">phrase</code>.
          </div>
        `,
        hint: `Просто допиши .split() до функції input().`,
        expected: `Фраза: Я люблю код\n['Я', 'люблю', 'код']`,
        tests: [
          { type: "codeRegex", name: "Використано .split()", pattern: "input\\s*\\(.*\\)\\.split\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*phrase\\s*\\)" }
        ]
      },

      {
        title: "📦 Розпакування списку",
        xp: 290,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Магія множинного вводу</h2>
          <p>Оскільки <code>.split()</code> розрізає текст на кілька шматочків, ми можемо одразу "розкласти" ці шматочки по різних змінних (через кому)! Це ідеально для отримання координат або складених команд.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">cmd, target = input("Дія і Ціль: ").split()<br>print(f"Робимо {cmd} на {target}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Дія і Ціль: Attack Boss<br>Робимо Attack на Boss</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система просить ввести два улюблені кольори через пробіл і відразу записує їх у дві різні змінні.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай два кольори через пробіл: <code style="color: #0ea5e9;">c1, c2 = input("Два кольори: ").split()</code>. Виведи їх через f-рядок: <code style="color: #0ea5e9;">print(f"Перший: {c1}, Другий: {c2}")</code>.
          </div>
        `,
        hint: `Напиши c1, c2 = input(...).split(). Потім зроби print з f-рядком.`,
        expected: `Два кольори: Синій Жовтий\nПерший: Синій, Другий: Жовтий`,
        tests: [
          { type: "codeRegex", name: "Розпакування c1 та c2", pattern: "c1\\s*,\\s*c2\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\)" },
          { type: "codeRegex", name: "Правильний f-рядок", pattern: "f['\"]Перший:\\s*\\{\\s*c1\\s*\\},\\s*Другий:\\s*\\{\\s*c2\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "✂️ Специфічний розділювач: .split(',')",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Свої правила</h2>
          <p>Якщо дані розділені не пробілом, а комою чи тире, ми можемо вказати цей символ всередині <code>.split()</code>. Python розріже текст саме по цьому символу.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">login, domain = input("Email: ").split("@")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить перелічити фрукти через кому, а потім виводить кожен з них на окремому рядку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">fruit1, fruit2 = input("Фрукти (через кому): ").split(",")</code>.<br>
            Виведи: <code style="color: #0ea5e9;">print(fruit1)</code>, а на наступному рядку <code style="color: #0ea5e9;">print(fruit2)</code>.
          </div>
        `,
        hint: `Передай рядок "," (кома в лапках) всередину дужок split().`,
        expected: `Фрукти (через кому): Ківі,Манго\nКіві\nМанго`,
        tests: [
          { type: "codeRegex", name: "split по комі", pattern: "\\.split\\s*\\(\\s*['\"],['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Два принти", pattern: "print\\s*\\(\\s*fruit1\\s*\\).*print\\s*\\(\\s*fruit2\\s*\\)", flags: "s" }
        ]
      },

      {
        title: "🛑 Обмежений розпил: maxsplit",
        xp: 310,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ріжемо лише один раз</h2>
          <p>Іноді текст містить багато пробілів або тире, але нам треба відрізати лише перше слово (наприклад, команду від самого повідомлення).</p>
          <p>Для цього в <code>.split()</code> є другий аргумент — <b style="color: #f59e0b;"><code>maxsplit</code></b> (максимальна кількість розрізів).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">user, msg = input("Чат: ").split(":", 1)<br>print(msg)</div>
          <p>Навіть якщо в повідомленні є ще двокрапки, <code>split</code> зупиниться після першої!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Відділи статус від детального повідомлення у серверному лозі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">status, details = input("Лог: ").split(" - ", 1)</code> (зверни увагу на пробіли біля тире).<br>
            Виведи f-рядком: <code style="color: #0ea5e9;">Статус: {status} | Деталі: {details}</code>.
          </div>
        `,
        hint: `Використовуй split(" - ", 1) щоб розрізати лише по першому тире з пробілами.`,
        expected: `Лог: ПОМИЛКА - Сервер впав - Біда\nСтатус: ПОМИЛКА | Деталі: Сервер впав - Біда`,
        tests: [
          { type: "codeRegex", name: "Використано maxsplit", pattern: "\\.split\\s*\\(\\s*['\"]\\s*-\\s*['\"]\\s*,\\s*1\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розпакування та вивід", pattern: "f['\"]Статус:\\s*\\{\\s*status\\s*\\}\\s*\\|\\s*Деталі:\\s*\\{\\s*details\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "🧩 Збираємо назад: .join()",
        xp: 320,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Супер-клей для тексту</h2>
          <p>Якщо <code>.split()</code> розрізає рядок на список слів, то <b style="color: #3b82f6;"><code>.join()</code></b> склеює цей список назад у єдиний рядок, вставляючи між словами заданий розділювач.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">words = ["Я", "люблю", "Python"]<br>result = "-".join(words)<br>print(result)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Я-люблю-Python</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 Зверни увагу на синтаксис: спочатку пишемо рядок-клей (наприклад <code style="color: #0ea5e9;">"-"</code>), потім ставимо крапку, пишемо <code style="color: #0ea5e9;">.join()</code>, а вже всередині дужок передаємо список слів.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має замінити всі пробіли у введеному тексті на плюсики, розрізавши його і відразу склеївши назад.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай список слів: <code style="color: #0ea5e9;">words = input("Слова: ").split()</code>.<br>
            Склей їх за допомогою плюсиків <code style="color: #0ea5e9;">"+"</code> у нову змінну <code style="color: #0ea5e9;">joined = "+".join(words)</code>.<br>
            Виведи <code style="color: #0ea5e9;">joined</code>.
          </div>
        `,
        hint: `Твоя формула: joined = "+".join(words)`,
        expected: `Слова: Один Два Три\nОдин+Два+Три`,
        tests: [
          { type: "codeRegex", name: "Слова через split", pattern: "words\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\)" },
          { type: "codeRegex", name: "Використано join", pattern: "joined\\s*=\\s*['\"]\\+['\"]\\.join\\s*\\(\\s*words\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*joined\\s*\\)" }
        ]
      },

      {
        title: "⏪ Пошук з кінця: .rfind()",
        xp: 330,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Справа наліво</h2>
          <p>У Middle-рівні ми вчили <code>.find()</code>. Але іноді символ зустрічається в тексті кілька разів, а нам потрібен <b>найбільш останній</b> (наприклад, щоб знайти ім'я файлу в довгому шляху <code>C:/folder/file.txt</code>).</p>
          <p>Для цього є <b style="color: #3b82f6;"><code>.rfind()</code></b> (від <i>right find</i>) — він шукає символ, починаючи з кінця рядка.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">path = "C:/games/doom/run.exe"<br>pos = path.rfind("/")  <span style="color:gray;"># Знайде останній слеш</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Знайди індекс останнього пробілу в реченні, щоб визначити, де починається останнє слово.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">text = input("Текст: ")</code>. Знайди індекс останнього пробілу <code style="color: #0ea5e9;">" "</code> за допомогою методу <code style="color: #0ea5e9;">.rfind()</code> і виведи цей індекс.
          </div>
        `,
        hint: `Твій код: print(text.rfind(" "))`,
        expected: `Текст: Один Два Три\n8`,
        tests: [
          { type: "codeRegex", name: "Використано rfind", pattern: "\\.rfind\\s*\\(\\s*['\"]\\s['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(" }
        ]
      },

      {
        title: "🔄 Заміна з лімітом: replace()",
        xp: 340,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Тільки один раз</h2>
          <p>Метод <code>.replace()</code> за замовчуванням замінює <b>всі</b> знайдені збіги. Але йому можна передати третій аргумент — <b style="color: #f59e0b;">ліміт замін</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">text = "ha ha ha"<br>print(text.replace("ha", "ho", 1))</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">ho ha ha</div>
        `,
        desc: `
          <div class="task-main">
            <p>Заміни тільки першу помилку в лозі (інші чіпати не можна).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">log = input("Лог: ")</code>. Заміни слово <code style="color: #0ea5e9;">"err"</code> на <code style="color: #0ea5e9;">"warn"</code> лише <b>1 раз</b>. Виведи результат.
          </div>
        `,
        hint: `log.replace("err", "warn", 1)`,
        expected: `Лог: err - err - ok\nwarn - err - ok`,
        tests: [
          { type: "codeRegex", name: "Використано replace з лімітом", pattern: "replace\\s*\\(\\s*['\"]err['\"]\\s*,\\s*['\"]warn['\"]\\s*,\\s*1\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🔠 Перевірка регістру: .isupper()",
        xp: 350,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чи всі кричать?</h2>
          <p>Щоб перевірити, чи весь текст написаний ВЕЛИКИМИ літерами, є метод <b style="color: #3b82f6;"><code>.isupper()</code></b>. А щоб перевірити, чи всі літери маленькі — <b style="color: #3b82f6;"><code>.islower()</code></b>. Вони повертають <code>True</code> або <code>False</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи не кричить користувач у чаті (чи не ввімкнений Caps Lock).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">msg = input("Повідомлення: ")</code>. Виведи f-рядком: <code style="color: #0ea5e9;">Кричить: {msg.isupper()}</code>.
          </div>
        `,
        hint: `Всередині f-рядка: {msg.isupper()}`,
        expected: `Повідомлення: ПРИВІТ\nКричить: True`,
        tests: [
          { type: "codeRegex", name: "Використано .isupper()", pattern: "\\{\\s*msg\\.isupper\\s*\\(\\)\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "🔤 Капіталізація речення: .capitalize()",
        xp: 360,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перша літера речення</h2>
          <p>Метод <code>.title()</code> робив великою першу літеру <b>кожного слова</b>. А що, якщо нам потрібна велика літера тільки на самому початку всього речення?</p>
          <p>Для цього існує <b style="color: #3b82f6;"><code>.capitalize()</code></b>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виправ форматування введеного речення, щоб лише найперша літера була великою, а інші — маленькими.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">text = input("Текст: ")</code>. Відразу застосуй до інпуту <code style="color: #0ea5e9;">.capitalize()</code> і роздрукуй результат.
          </div>
        `,
        hint: `Допиши .capitalize() до input().`,
        expected: `Текст: пРиВіТ сВіТ\nПривіт світ`,
        tests: [
          { type: "codeRegex", name: "Використано .capitalize()", pattern: "\\.capitalize\\s*\\(\\)" }
        ]
      },

      {
        title: "🔀 Інверсія регістру: .swapcase()",
        xp: 370,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Міняємо місцями</h2>
          <p>Рідкісний, але дуже веселий метод <b style="color: #3b82f6;"><code>.swapcase()</code></b> перетворює всі великі літери на маленькі, а маленькі — на великі!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи мемний текст (імітація випадкового Caps Lock), інвертувавши регістр введеного слова.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">meme = input("Мем: ")</code>. Виведи його з інвертованим регістром за допомогою <code style="color: #0ea5e9;">.swapcase()</code>.
          </div>
        `,
        hint: `print(meme.swapcase())`,
        expected: `Мем: пРиВіТ\nПрИвІт`,
        tests: [
          { type: "codeRegex", name: "Використано .swapcase()", pattern: "\\.swapcase\\s*\\(\\)" }
        ]
      },

      {
        title: "🧮 Лічильник слів (len + split)",
        xp: 380,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дві функції разом</h2>
          <p>Щоб порахувати не кількість символів, а саме <b>кількість слів</b> у реченні, ми можемо об'єднати два інструменти: спочатку <code>.split()</code> розріже текст на список слів, а потім <code>len()</code> порахує кількість елементів у цьому списку!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Порахуй, скільки слів у введеному тексті.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">text = input("Текст: ")</code>. Виведи f-рядком: <code style="color: #0ea5e9;">Слів: {len(text.split())}</code>.
          </div>
        `,
        hint: `У фігурних дужках напиши len(text.split()).`,
        expected: `Текст: Раз два три\nСлів: 3`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок len(split)", pattern: "\\{\\s*len\\s*\\(\\s*text\\.split\\s*\\(\\)\\s*\\)\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Аналізатор URL",
        xp: 400,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: startswith та split</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Створи парсер, який перевіряє безпеку сайту і розбиває його на домени.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай <code style="color: #0ea5e9;">url = input("Посилання: ")</code>.<br>
            2. Збережи в змінну <code style="color: #0ea5e9;">is_secure</code> результат перевірки, чи починається url з <code style="color: #0ea5e9;">"https"</code>.<br>
            3. Розріж url по символу <code style="color: #0ea5e9;">"."</code> (крапка) і збережи в змінну <code style="color: #0ea5e9;">parts</code> (використай <code style="color: #0ea5e9;">.split(".")</code>).<br>
            4. Виведи: <code style="color: #0ea5e9;">print(f"Безпечно: {is_secure} | Частини: {parts}")</code>.
          </div>
        `,
        hint: `is_secure = url.startswith("https"), parts = url.split(".")`,
        expected: `Посилання: https://google.com\nБезпечно: True | Частини: ['https://google', 'com']`,
        tests: [
          { type: "codeRegex", name: "Перевірка startswith", pattern: "is_secure\\s*=\\s*url\\.startswith\\s*\\(\\s*['\"]https['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розріз split", pattern: "parts\\s*=\\s*url\\.split\\s*\\(\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Безпечно:\\s*\\{\\s*is_secure\\s*\\}\\s*\\|\\s*Частини:\\s*\\{\\s*parts\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: База даних",
        xp: 450,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Парсинг і розпакування</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Оброби рядок з бази даних у форматі "id:name:role".</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай: <code style="color: #0ea5e9;">uid, user, role = input("Дані: ").split(":")</code>.<br>
            2. Виведи f-рядком: <code style="color: #0ea5e9;">ID: {uid} | Гравець: {user.title()} | Ранг: {role.upper()}</code>.<br>
            <i>Увага: методи .title() та .upper() застосовуються прямо у фігурних дужках f-рядка!</i>
          </div>
        `,
        hint: `У f-рядку допиши .title() до user і .upper() до role.`,
        expected: `Дані: 42:макс:admin\nID: 42 | Гравець: Макс | Ранг: ADMIN`,
        tests: [
          { type: "codeRegex", name: "Розпакування по двокрапці", pattern: "uid\\s*,\\s*user\\s*,\\s*role\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\s*['\"]\\:['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Методи у f-рядку", pattern: "f['\"]ID:\\s*\\{\\s*uid\\s*\\}\\s*\\|\\s*Гравець:\\s*\\{\\s*user\\.title\\(\\)\\s*\\}\\s*\\|\\s*Ранг:\\s*\\{\\s*role\\.upper\\(\\)\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Парсинг логів",
        xp: 500,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: strip, rfind та зрізи</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Оброби шлях до файлу, розділивши його на папку та ім'я файлу за допомогою індексу.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Запитай <code style="color: #0ea5e9;">path = input("Шлях: ").strip()</code><br>
            2. Знайди останній слеш: <code style="color: #0ea5e9;">pos = path.rfind("/")</code><br>
            3. Збережи в <code style="color: #0ea5e9;">folder</code> частину до слеша (це називається "зріз"): <code style="color: #0ea5e9;">path[:pos]</code><br>
            4. Збережи в <code style="color: #0ea5e9;">file</code> частину після слеша: <code style="color: #0ea5e9;">path[pos+1:]</code><br>
            5. Виведи f-рядком: <code style="color: #0ea5e9;">Папка: {folder}, Файл: {file}</code>
          </div>
        `,
        hint: `Просто виконуй кроки. Зрізи (квадратні дужки) ми даємо як підказку, скопіюй їх.`,
        expected: `Шлях: /games/doom/run.exe\nПапка: /games/doom, Файл: run.exe`,
        tests: [
          { type: "codeRegex", name: "Очищення та rfind", pattern: "path\\s*=\\s*input\\(.*\\)\\.strip\\(\\).*pos\\s*=\\s*path\\.rfind\\(['\"]/['\"]\\)", flags: "s", checkRaw: true },
          { type: "codeRegex", name: "Зрізи та вивід", pattern: "f['\"]Папка:\\s*\\{\\s*folder\\s*\\},\\s*Файл:\\s*\\{\\s*file\\s*\\}['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🔴 БОС (Senior): Термінал Хакера",
        xp: 1200,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Data Engineer</h2>
          <p>Об'єднай усе, що знаєш: очищення специфічних символів, розпакування з лімітом, перетворення типів та форматування рядків.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши парсер для розбору сирих системних команд.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Запитай: <code style="color: #0ea5e9;">raw_cmd = input("Команда: ")</code><br>
            2. Очисти <code style="color: #0ea5e9;">raw_cmd</code> від пробілів ТА символів <code style="color: #0ea5e9;">">"</code> по краях (через <code style="color: #0ea5e9;">.strip("> ")</code>) і збережи в <code style="color: #0ea5e9;">clean_cmd</code>.<br>
            3. Розріж <code style="color: #0ea5e9;">clean_cmd</code> по пробілах лише ОДИН раз (<code style="color: #0ea5e9;">maxsplit=1</code>). Розпакуй у змінні: <code style="color: #0ea5e9;">action, target = clean_cmd.split(" ", 1)</code>.<br>
            4. Розріж <code style="color: #0ea5e9;">target</code> по двокрапці (<code style="color: #0ea5e9;">":"</code>) на <code style="color: #0ea5e9;">ip</code> та <code style="color: #0ea5e9;">port</code>.<br>
            5. Виведи звіт f-рядком: <code style="color: #0ea5e9;">ДІЯ: {action.upper()} | IP: {ip} | ПОРТ: {int(port)}</code>.
          </div>
        `,
        hint: `Приклад вводу для тесту: "  >>  connect 192.168.1.1:8080  ".\nКроки: 1) input. 2) raw_cmd.strip("> "). 3) split(" ", 1). 4) target.split(":"). 5) f-рядок з upper() та int().`,
        expected: `Команда:   >>  connect 192.168.0.1:443  \nДІЯ: CONNECT | IP: 192.168.0.1 | ПОРТ: 443`,
        tests: [
          { type: "codeRegex", name: "Очищення > і пробілів", pattern: "clean_cmd\\s*=\\s*raw_cmd\\.strip\\s*\\(\\s*['\"]> ['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розпакування команди з maxsplit", pattern: "action\\s*,\\s*target\\s*=\\s*clean_cmd\\.split\\s*\\(\\s*['\"] ['\"]\\s*,\\s*1\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розпакування IP:Port", pattern: "ip\\s*,\\s*port\\s*=\\s*target\\.split\\s*\\(\\s*['\"]\\:['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Форматування звіту", pattern: "f['\"]ДІЯ:\\s*\\{\\s*action\\.upper\\(\\)\\s*\\}\\s*\\|\\s*IP:\\s*\\{\\s*ip\\s*\\}\\s*\\|\\s*ПОРТ:\\s*\\{\\s*int\\(\\s*port\\s*\\)\\s*\\}['\"]", checkRaw: true }
        ]
      }
    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
