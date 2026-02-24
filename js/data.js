// js/data.js
// kind: "practice" | "quiz" | "final"

var DB = [
  {
    id: "python_basics",
    title: "Основи Python",
    icon: "🐍",
    desc: "print(), input(), змінні, if/else, цикли — база.",
    modules: [
      {
        id: "m_print",
        title: "Команда print()",
        desc: "Вивід у консоль: sep, end, кілька значень, escape.",
        
        
        tasks: [
          // ====== РІВЕНЬ 1: Дуже легко (швидкі перемоги) ======

          {
            title: "Старт: Привіт, світ!",
            xp: 35,
            kind: "practice",
            theory: `
              <h2>Що таке Python?</h2>

              <p>
                Python — це мова програмування.
                Мова програмування — це спосіб "пояснити компʼютеру", що він має зробити.
              </p>

              <p>
                Компʼютер сам нічого не вирішує — він просто виконує команди,
                які ми йому пишемо.
              </p>

              <h2>Що таке print()?</h2>

              <p>
                <code>print()</code> — це команда, яка показує текст або число
                внизу екрана (у консолі / терміналі).
              </p>

              <p>
                Все, що знаходиться всередині дужок <code>()</code>,
                Python надрукує на екрані.
              </p>

              <h3>Текст у Python</h3>

              <p>
                Текст потрібно писати в лапках:
              </p>

              <ul>
                <li><code>"подвійні лапки"</code></li>
                <li><code>'одинарні лапки'</code></li>
              </ul>

              <p><b>Приклад:</b></p>

              <div class="code-box">
                print("Привіт, світ!")
              </div>

              <p><b>Що відбудеться?</b></p>

              <div class="code-box">
                Привіт, світ!
              </div>

              <p>
                Важливо:
                <br>✔ лапки обовʼязкові
                <br>✔ великі та малі букви мають значення
                <br>✔ коми, пробіли та знаки оклику мають бути точними
              </p>

              <p class="mutedish tiny">
                Програмування — це точність. Навіть один зайвий символ може змінити результат.
              </p>
            `,
            desc: "Виведи рівно: Привіт, світ!",
            hint: `Напиши print() і всередині в лапках текст: Привіт, світ!
            Тобто твій готовий код має виглядати так: print("Привіт, світ!")`,
            solution: `print("Привіт, світ!")`,
            expected: `Привіт, світ!`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "Привіт, світ!", normalize: "soft" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },


          {
            title: "Моє повідомлення",
            xp: 45,
            kind: "practice",
            theory: `
              <h2>Текст у лапках</h2>
              <p>Щоб вивести текст, його потрібно написати в лапках — це називається <b>рядок (string)</b>.</p>
              
              <p><b>Приклад коду:</b></p>
              <div class="code-box">print("Мені подобається Python")</div>
              
              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">Мені подобається Python</div>

              <p class="mutedish tiny">
                Зверни увагу: усе, що в лапках, друкується точно так само — з пробілами і символами.
              </p>
            `,
            desc: "Виведи рівно: Я — програміст",
            hint: `
          1) Напиши команду print()
          2) У лапках напиши текст: Я — програміст
          3) Перевір, щоб був правильний пробіл і тире
            `,
            solution: `print("Я — програміст")`,
            expected: `Я — програміст`,
            tests: [
              { type: "stdoutEquals", name: "Точний текст", value: "Я — програміст", normalize: "soft" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },


          {
            title: "Два рядки (2 print)",
            xp: 65,
            kind: "practice",
            theory: `
              <h2>Кожен print() — з нового рядка</h2>
              <p>За замовчуванням <code>print()</code> після виводу переходить на новий рядок.</p>
              
              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("Перший")<br>
                print("Другий")
              </div>
              
              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                Перший<br>
                Другий
              </div>

              <p class="mutedish tiny">
                Кожен окремий print() починає новий рядок.
              </p>
            `,
            desc: "Виведи два рядки: Спочатку і Потім (кожне слово з нового рядка).",
            hint: `
          1) Напиши перший print() для слова "Спочатку"
          2) На новому рядку напиши другий print() для слова "Потім"
          3) Не пиши все в одному print()
            `,
            expected: `Спочатку\nПотім`,
            tests: [
              { type: "stdoutEquals", name: "2 рядки виводу", value: "Спочатку\nПотім", normalize: "soft" },
              { type: "codeRegex", name: "Є два print()", pattern: "print\\s*\\(", flags: "g" }
            ]
          },


          // ====== РІВЕНЬ 2: Один print — кілька частин ======

          {
            title: "Кілька слів одним print()",
            xp: 80,
            kind: "practice",
            theory: `
              <h2>Кілька аргументів у print()</h2>
              <p>У <code>print()</code> можна передати кілька значень через кому.</p>
              <p>Між ними автоматично зʼявиться пробіл.</p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("Мені", "подобається", "кодити")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                Мені подобається кодити
              </div>

              <p class="mutedish tiny">
                Зверни увагу: пробіл зʼявляється автоматично, його не потрібно додавати вручну.
              </p>
            `,
            desc: "Виведи: Я люблю Python (але зроби це трьома окремими аргументами в одному print).",
            hint: `
          1) Напиши один print()
          2) Передай у нього три окремі слова через кому
          3) Не пиши весь текст одним рядком у лапках
            `,
            expected: `Я люблю Python`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "Я люблю Python", normalize: "soft" },
              { type: "codeIncludes", name: "Є коми (кілька аргументів)", value: "," }
            ]
          },


          {
            title: "Числа без лапок",
            xp: 70,
            kind: "practice",
            theory: `
              <h2>Числа і print()</h2>
              <p>Числа пишуться без лапок: <code>print(7)</code>.</p>
              <p>Якщо написати <code>"7"</code> — це вже текст, а не число.</p>
            `,
            desc: "Виведи число 2026 (саме число, без лапок).",
            hint: `print( ... ) і всередині просто 2026`,
            expected: `2026`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 2026", value: "2026", normalize: "soft" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },

          // ====== РІВЕНЬ 3: Математика (операції прямо в print) ======

          {
            title: "Математика: додавання",
            xp: 85,
            kind: "practice",
            theory: `
              <h2>Математичні дії в Python</h2>

              <p>
                Python вміє рахувати так само, як калькулятор.
                Якщо всередині <code>print()</code> написати математичний приклад,
                Python спочатку <b>обчислить результат</b>, а вже потім його надрукує.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(3 + 4)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                7
              </div>

              <p>
                У Python є основні математичні оператори:
              </p>
              <ul>
                <li><code>+</code> — додавання</li>
                <li><code>-</code> — віднімання</li>
                <li><code>*</code> — множення</li>
                <li><code>/</code> — ділення</li>
              </ul>

              <p class="mutedish tiny">
                Зараз ми працюємо тільки з додаванням.
                Інші оператори розглянемо у наступних завданнях.
              </p>
            `,
            desc: "Виведи результат обчислення: 7 + 5",
            hint: `
          1) Напиши print()
          2) Усередині напиши приклад з додаванням
          3) Числа пиши без лапок
            `,
            expected: `12`,
            tests: [
              { type: "stdoutEquals", name: "Правильна відповідь", value: "12", normalize: "soft" },
              { type: "codeIncludes", name: "Використано додавання", value: "+" }
            ]
          },


          {
            title: "Математика: віднімання",
            xp: 85,
            kind: "practice",
            theory: `
              <h2>Віднімання в Python</h2>
              <p>
                Так само як і додавання, Python уміє виконувати віднімання.
              </p>

              <p>
                Якщо написати приклад із мінусом всередині <code>print()</code>,
                Python спочатку порахує результат, а потім виведе його.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(15 - 4)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                11
              </div>

              <p>
                Знак <code>-</code> означає “відняти”.
              </p>

              <p class="mutedish tiny">
                Важливо: тут немає лапок, бо ми працюємо з числами, а не з текстом.
              </p>
            `,
            desc: "Виведи результат обчислення: 20 - 8",
            hint: `
          1) Напиши print()
          2) Усередині дужок напиши приклад із відніманням
          3) Не використовуй лапки
            `,
            expected: `12`,
            tests: [
              { type: "stdoutEquals", name: "Правильна відповідь", value: "12", normalize: "soft" },
              { type: "codeIncludes", name: "Використано мінус (-)", value: "-" }
            ]
          },

          {
            title: "Математика: множення",
            xp: 90,
            kind: "practice",
            theory: `
              <h2>Множення в Python</h2>
              <p>
                Python уміє множити числа так само, як калькулятор.
              </p>

              <p>
                Для множення використовується знак <code>*</code>
                (зірочка на клавіатурі).
              </p>

              <p>
                Якщо написати приклад із множенням усередині <code>print()</code>,
                Python спочатку порахує відповідь, а потім надрукує її.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(5 * 2)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                10
              </div>

              <p class="mutedish tiny">
                Важливо: для множення не використовується знак ×,
                а саме зірочка <code>*</code>.
              </p>
            `,
            desc: "Виведи результат обчислення: 6 * 7",
            hint: `
          1) Напиши print()
          2) Усередині дужок напиши приклад із множенням
          3) Використай зірочку *
            `,
            expected: `42`,
            tests: [
              { type: "stdoutEquals", name: "Правильна відповідь", value: "42", normalize: "soft" },
              { type: "codeIncludes", name: "Використано множення (*)", value: "*" }
            ]
          },


          {
            title: "Математика: порядок дій",
            xp: 120,
            kind: "practice",
            theory: `
              <h2>Порядок дій у Python</h2>
              <p>
                Python рахує приклади за тими ж правилами, що й у математиці.
              </p>

              <p>
                Спочатку виконуються:
              </p>
              <ul>
                <li>Множення <code>*</code></li>
                <li>Ділення <code>/</code></li>
              </ul>

              <p>
                А вже потім — додавання <code>+</code> і віднімання <code>-</code>.
              </p>

              <p><b>Приклад без дужок:</b></p>
              <div class="code-box">
                print(3 + 2 * 5)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                13
              </div>

              <p class="mutedish tiny">
                Спочатку 2 * 5 = 10, потім 3 + 10 = 13.
              </p>

              <p><b>Приклад з дужками:</b></p>
              <div class="code-box">
                print((3 + 2) * 5)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                25
              </div>

              <p class="mutedish tiny">
                Дужки змушують Python спочатку виконати 3 + 2, а вже потім множити.
              </p>
            `,
            desc: "Виведи результат обчислення: (2 + 3) * 4",
            hint: `
          1) Напиши print()
          2) Усередині дужок напиши приклад
          3) Обовʼязково використай круглі дужки навколо 2 + 3
            `,
            expected: `20`,
            tests: [
              { type: "stdoutEquals", name: "Правильна відповідь", value: "20", normalize: "soft" },
              { type: "codeIncludes", name: "Є дужки", value: "(" }
            ]
          },


          // ====== РІВЕНЬ 4: sep і end ======

          {
            title: "sep='-' (розділювач)",
            xp: 100,
            kind: "practice",
            theory: `
              <h2>sep — що стоїть між частинами</h2>
              <p>
                Коли ти пишеш <code>print(a, b, c)</code>, Python за замовчуванням ставить <b>пробіл</b> між частинами.
                Але іноді нам потрібен інший розділювач — наприклад дефіс <code>-</code> або рисочка <code>|</code>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("A", "B", "C", sep="-")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                A-B-C
              </div>

              <p class="mutedish tiny">
                <code>sep</code> працює тільки <b>між</b> аргументами print (не на початку і не в кінці).
              </p>
            `,
            desc: "Виведи рівно: 5-4-3-2-1 використовуючи sep='-'. (Кожне число передай окремо.)",
            hint: `
          1) Використай один print()
          2) Передай числа 5, 4, 3, 2, 1 як окремі аргументи
          3) Задай sep так, щоб між ними був дефіс -
            `,
            expected: `5-4-3-2-1`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "5-4-3-2-1", normalize: "soft" },
              { type: "codeIncludes", name: "Є sep", value: "sep=" }
            ]
          },

          {
            title: "Дата через '/'",
            xp: 100,
            kind: "practice",
            theory: `
              <h2>sep для форматів (дати, час, коди)</h2>
              <p>
                <code>sep</code> дуже зручний для “форматів”, коли треба розділяти частини не пробілом, а символом:
                <b>/</b>, <b>:</b>, <b>-</b>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(12, 30, sep=":")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                12:30
              </div>

              <p class="mutedish tiny">
                Числа можна передавати без лапок — Python сам їх надрукує.
              </p>
            `,
            desc: "Виведи рівно: 2030/01/02 використовуючи sep='/'. (Числа передай окремо.)",
            hint: `
          1) Один print()
          2) Три числа: 2030, 01, 02 (можна як 1 і 2 — головне, щоб вийшло як у expected)
          3) sep зроби "/"
            `,
            expected: `2030/1/2`,
            tests: [
              { type: "stdoutEquals", name: "Дата правильна", value: "2030/1/2", normalize: "soft" },
              { type: "codeIncludes", name: "Є sep", value: "sep=" }
            ]
          },

          {
            title: "end='' — додай знак в кінці",
            xp: 120,
            kind: "practice",
            theory: `
              <h2>end — що буде в кінці рядка</h2>
              <p>
                Зазвичай <code>print()</code> після виводу робить <b>новий рядок</b>.
                Але іноді потрібно, щоб наступний print “продовжив” той самий рядок.
              </p>

              <p>
                Для цього використовують параметр <code>end</code>.
                Якщо написати <code>end=""</code>, то <b>переносу рядка не буде</b>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("Hi", end="")<br>
                print("!")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                Hi!
              </div>

              <p class="mutedish tiny">
                Це схоже на “додрукувати кінець слова/фрази”.
              </p>
            `,
            desc: "Зроби так, щоб вивелося в один рядок: GO! (2 print: перший друкує GO без нового рядка, другий додає !)",
            hint: `
          1) Перший print друкує GO
          2) У першому print вимкни новий рядок через end=""
          3) Другий print друкує знак !
            `,
            expected: `GO!`,
            tests: [
              { type: "stdoutEquals", name: "Вивід GO!", value: "GO!", normalize: "soft" },
              { type: "codeIncludes", name: "Є end", value: "end=" }
            ]
          },

          {
            title: "Склей фразу по частинах",
            xp: 130,
            kind: "practice",
            theory: `
              <h2>Склеювання фрази через кілька print()</h2>
              <p>
                Іноді зручно друкувати фразу частинами (наприклад, для ефектів у грі або “прогресу”).
                Для цього перші print не повинні робити новий рядок — допомагає <code>end=""</code>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("Початок", end="")<br>
                print("...", end="")<br>
                print("Кінець")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                Початок...Кінець
              </div>

              <p class="mutedish tiny">
                Поки що ми тренуємо цей прийом на простих фразах.
              </p>
            `,
            desc: "Виведи рівно: Привіт!!!\nЗроби це трьома print() так, щоб все вийшло в ОДНОМУ рядку (без переносу між print).",

            hint: `
          1) Зроби 3 print()
          2) У перших двох постав end=""
          3) Додай три знаки оклику так, щоб вони були в одному рядку
            `,
            expected: `Привіт!!!`,
            tests: [
              { type: "stdoutEquals", name: "Вивід Привіт!!!", value: "Привіт!!!", normalize: "soft" },
              { type: "codeRegex", name: "Є кілька print()", pattern: "print\\s*\\(", flags: "g" },
              { type: "codeIncludes", name: "Є end", value: "end=" }
            ]
          },

          // ====== РІВЕНЬ 5: Escape-символи ======

          {
            title: "Один print — три рядки (\\n)",
            xp: 130,
            kind: "practice",
            theory: `
              <h2>\\n — новий рядок всередині тексту</h2>
              <p>
                Іноді треба надрукувати кілька рядків, але написати тільки один <code>print()</code>.
                Для цього є спеціальний символ <code>\\n</code> — він означає “перейти на новий рядок”.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("один\\nдва")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                один<br>
                два
              </div>

              <p class="mutedish tiny">
                <code>\\n</code> пишеться в тексті, але у виводі перетворюється на перенос рядка.
              </p>
            `,
            desc: "Одним print() виведи 3 рядки: котик, песик, хомʼяк (у такому порядку).",
            hint: `
          1) Один print()
          2) У лапках напиши 3 слова
          3) Між словами встав \\n
            `,
            expected: `котик\nпесик\nхомʼяк`,
            tests: [
              { type: "stdoutEquals", name: "3 рядки правильні", value: "котик\nпесик\nхомʼяк", normalize: "soft" },
              // { type: "codeIncludes", name: "Є \\n", value: "\\n" }
            ]
          },

          {
            title: "Лапки в тексті",
            xp: 140,
            kind: "practice",
            theory: `
              <h2>Як вивести лапки всередині рядка?</h2>
              <p>
                Якщо нам потрібно, щоб у результаті були лапки, є 2 способи:
              </p>
              <ol>
                <li>Екранувати лапки: <code>\\"</code></li>
                <li>Або взяти весь текст в одинарні лапки, а подвійні лишити всередині</li>
              </ol>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("Він сказав: \\"Привіт!\\"")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                Він сказав: "Привіт!"
              </div>

              <p class="mutedish tiny">
                Ми “екрануємо” лапку, щоб Python зрозумів: це символ тексту, а не кінець рядка.
              </p>
            `,
            desc: `Виведи рівно: Вона сказала: "Так!"`,
            hint: `
          1) У результаті мають бути лапки навколо слова Так!
          2) Використай або \\" всередині, або інший тип лапок зовні
            `,
            expected: `Вона сказала: "Так!"`,
            tests: [
              { type: "stdoutEquals", name: "Лапки є у виводі", value: `Вона сказала: "Так!"`, normalize: "soft" }
            ]
          },

          {
            title: "Шлях на Windows (\\\\)",
            xp: 150,
            kind: "practice",
            theory: `
              <h2>\\\\ — щоб надрукувати \\</h2>
              <p>
                У рядках Python символ <code>\\</code> особливий (він починає “службову команду” типу <code>\\n</code>).
                Тому щоб надрукувати один <code>\\</code>, часто потрібно написати <b>два</b>: <code>\\\\</code>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("C:\\\\Temp\\\\file.txt")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                C:\\Temp\\file.txt
              </div>

              <p class="mutedish tiny">
                Запамʼятай правило: “хочу один \\ у виводі — пишу \\\\ у коді”.
              </p>
            `,
            desc: "Виведи рівно: D:\\Games\\Minecraft",
            hint: `
          1) Це текст у лапках
          2) Для кожного \\ у виводі зазвичай треба написати \\\\ у коді
            `,
            expected: `D:\\Games\\Minecraft`,
            tests: [
            { 
              type: "stdoutEquals", 
              name: "Шлях правильний", 
              value: "D:\\Games\\Minecraft", 
              normalize: "soft" 
            }
          ]

          },

          {
            title: "Табуляція (\\t) — як у таблиці",
            xp: 150,
            kind: "practice",
            theory: `
              <h2>\\t — табуляція</h2>
              <p>
                <code>\\t</code> — це табуляція: великий “стрибок” пробілом.
                Це зручно, коли хочеш зробити прості колонки, як у таблиці.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("слово\\tчисло")
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                слово\tчисло
              </div>

              <p class="mutedish tiny">
                У деяких терміналах табуляція виглядає як великий пробіл.
              </p>
            `,
            desc: "Одним print() виведи: імʼя<TAB>бал (де <TAB> — це \\t).",
            hint: `
          1) Один print()
          2) У лапках напиши "імʼя"
          3) Потім встав \\t
          4) Потім напиши "бал"
            `,
            expected: `імʼя\tбал`,
            tests: [
              { type: "stdoutEquals", name: "Є табуляція", value: "імʼя\tбал", normalize: "soft" },

            ]
            
          },

          // ====== РІВЕНЬ 6: Мікс print + математика + формат ======

          {
            title: "Рахунок в одному рядку (слово + число)",
            xp: 130,
            kind: "practice",
            theory: `
              <h2>Текст + результат обчислення</h2>
              <p>
                У <code>print()</code> можна передавати і текст, і числа, і навіть математичні вирази.
                Python спочатку обчислить вираз, а потім надрукує все разом.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print("Результат:", 4 + 6)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                Результат: 10
              </div>

              <p class="mutedish tiny">
                print автоматично ставить пробіл між частинами.
              </p>
            `,
            desc: "Виведи рівно: Відповідь: 15 (число 15 має вийти з обчислення 10 + 5).",
            hint: `
          1) Використай print() з двома частинами: текст і число
          2) Другу частину зроби як приклад 10 + 5 (без лапок)
            `,
            expected: `Відповідь: 15`,
            tests: [
              { type: "stdoutEquals", name: "Правильний рядок", value: "Відповідь: 15", normalize: "soft" },
              { type: "codeIncludes", name: "Є +", value: "+" }
            ]
          },

          {
            title: "Мінус та плюс разом",
            xp: 140,
            kind: "practice",
            theory: `
              <h2>Кілька операцій в одному виразі</h2>
              <p>
                У Python можна писати вирази з кількох дій одразу.
                Python рахує за правилами математики: <b>зліва направо</b>, якщо дії однакового рівня.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(50 - 20 + 1)
              </div>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                31
              </div>

              <p class="mutedish tiny">
                Поки що тренуємось просто рахувати і друкувати результат.
              </p>
            `,
            desc: "Виведи результат обчислення: 30 - 10 + 2",
            hint: `
          1) Один print()
          2) Усередині напиши вираз з - та +
          3) Без лапок (бо це числа)
            `,
            expected: `22`,
            tests: [
              { type: "stdoutEquals", name: "Правильний результат", value: "22", normalize: "soft" },
              { type: "codeIncludes", name: "Є - або +", value: "-" }
            ]
          },

          // ====== ПІДСУМКОВІ (3 задачі) ======

          {
            title: "Підсумкова 1: sep без пробілів",
            xp: 220,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №1</h2>
              <p>
                Твоя задача — зробити вивід без пробілів між числами.
                Для цього потрібен <code>sep</code>.
              </p>

              <p><b>Приклад (не з завдання):</b></p>
              <div class="code-box">
                print("x", "y", "z", sep="|")
              </div>
              <p><b>Результат:</b></p>
              <div class="code-box">
                x|y|z
              </div>

              <p class="mutedish tiny">
                Памʼятай: sep працює між аргументами print().
              </p>
            `,
            desc: "Виведи рівно: 1|2|3|4 (використай sep='|', числа передай окремо).",
            hint: `
          1) Один print()
          2) Чотири числа окремо
          3) sep постав як символ |
            `,
            expected: `1|2|3|4`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "1|2|3|4", normalize: "soft" },
              { type: "codeIncludes", name: "Є sep", value: "sep=" }
            ]
          },

          {
            title: "Підсумкова 2: end + один рядок",
            xp: 240,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №2</h2>
              <p>
                Треба зробити один рядок з двох print().
                Для цього в першому print потрібно прибрати перенос рядка.
              </p>

              <p><b>Приклад (не з завдання):</b></p>
              <div class="code-box">
                print("A", end="")<br>
                print("B")
              </div>
              <p><b>Результат:</b></p>
              <div class="code-box">
                AB
              </div>

              <p class="mutedish tiny">
                Другий print “прилипне” до першого.
              </p>
            `,
            desc: "Виведи рівно: START--FINISH\nУмови: 2 print(); перший друкує START-- без нового рядка; другий додає FINISH.",
            hint: `
          1) Два print()
          2) У першому end="" щоб не було нового рядка
          3) Другий додає FINISH
            `,
            expected: `START--FINISH`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "START--FINISH", normalize: "soft" },
              { type: "codeIncludes", name: "Є end", value: "end=" }
            ]
          },

          {
            title: "Підсумкова 3: комбо sep + end + математика",
            xp: 300,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №3 (комбо)</h2>
              <p>
                Тут одразу три навички:
              </p>
              <ul>
                <li><b>sep</b> — щоб склеїти частини без пробілів</li>
                <li><b>end</b> — щоб перший print не зробив новий рядок</li>
                <li><b>математика</b> — число треба отримати з обчислення</li>
              </ul>


              <p class="mutedish tiny">
                Порада: <code>sep=""</code> допомагає зробити “склейку” без пробілів.
              </p>
            `,
            desc: "Виведи рівно: [1]=8;[3]=4\nУмови:\n1) Має бути 2 print()\n2) Перший друкує [1]=8; без нового рядка\n3) Десь використай sep\n4) Число 8 має вийти з обчислення 5+3 (не пиши 8 просто так)",
            hint: `
          1) Перший print: зроби [1]=...; без нового рядка (end="")
          2) Щоб не було пробілів у дужках і знаках — допоможе sep=""
          3) 8 отримай як 5 + 3 (без лапок)
          4) Другий print додруковує [3]=4
            `,
            expected: `[1]=8;[3]=4`,
            tests: [
              { type: "stdoutEquals", name: "Точний вивід", value: "[1]=8;[3]=4", normalize: "soft" },
              { type: "codeIncludes", name: "Є sep", value: "sep=" },
              { type: "codeIncludes", name: "Є end", value: "end=" },
              { type: "codeIncludes", name: "Є +", value: "+" }
            ]
          }

        ]
      },
      
      {
        id: "m_vars",
        title: "Змінні",
        desc: "Збереження значень: =, числа/текст, оновлення змінних, прості обчислення.",
        tasks: [
          // ====== РІВЕНЬ 1: Що таке змінна ======

          {
            title: "Що таке змінна?",
            xp: 70,
            kind: "practice",
            theory: `
              <h2>Змінна — це “коробка” для значення</h2>
              <p>
                У програмуванні змінна зберігає дані.
                Ми даємо їй імʼя і кладемо в неї значення.
              </p>

              <div class="code-box">
                x = 5<br>
                print(x)
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                5
              </div>

              <p>
                Знак <code>=</code> означає:
                “поклади значення праворуч у змінну ліворуч”.
              </p>
            `,
            desc: "Створи змінну number зі значенням 10 і виведи її.",
            hint: `
          1) Спочатку створи змінну
          2) Потім надрукуй її
          3) Не пиши число прямо в print()
          `,
            expected: `10`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 10", value: "10", normalize: "soft" }
            ]
          },
          {
            title: "Текст у змінній",
            xp: 75,
            kind: "practice",
            theory: `
              <h2>Змінна може зберігати текст</h2>
              <p>Якщо значення — це текст, його пишуть у лапках.</p>

              <div class="code-box">
                name = "Марко"<br>
                print(name)
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                Марко
              </div>
            `,
            desc: "Створи змінну hero зі значенням \"Бетмен\" і виведи її.",
            hint: `
          1) Значення має бути в лапках
          2) Виведи саме змінну
          `,
            expected: `Бетмен`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "Бетмен", normalize: "soft" }
            ]
          },
          {
            title: "Дві змінні",
            xp: 80,
            kind: "practice",
            theory: `
              <h2>Можна створювати кілька змінних</h2>
              <div class="code-box">
                a = 3<br>
                b = 7<br>
                print(a, b)
              </div>
            `,
            desc: "Створи x=4 і y=9. Виведи їх в одному рядку через пробіл.",
            hint: `
          1) Дві змінні
          2) Один print
          `,
            expected: `4 9`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 4 9", value: "4 9", normalize: "soft" }
            ]
          },

          // ====== РІВЕНЬ 2: Кілька змінних + print ======

          {
            title: "Зміни значення",
            xp: 90,
            kind: "practice",
            theory: `
              <h2>Змінну можна змінити</h2>
              <p>Якщо знову використати = — значення оновиться.</p>

              <div class="code-box">
                level = 1<br>
                level = 2<br>
                print(level)
              </div>
            `,
            desc: "Створи score=5, потім зміни його на 8 і виведи.",
            hint: `
          1) Використай score = двічі
          2) Потім print(score)
          `,
            expected: `8`,
            tests: [
              { type: "stdoutEquals", name: "Результат 8", value: "8", normalize: "soft" }
            ]
          },
          {
            title: "Збільш значення",
            xp: 100,
            kind: "practice",
            theory: `
              <h2>Оновлення через саму себе</h2>
              <div class="code-box">
                coins = 3<br>
                coins = coins + 2<br>
                print(coins)
              </div>
            `,
            desc: "Створи coins=6. Потім зроби coins = coins + 4. Виведи результат.",
            hint: `
          1) Не пиши одразу 10
          2) Використай coins у правій частині
          `,
            expected: `10`,
            tests: [
              { type: "stdoutEquals", name: "Результат 10", value: "10", normalize: "soft" }
            ]
          },

          // ====== РІВЕНЬ 3: Математика зі змінними ======

          {
            title: "Сума змінних",
            xp: 110,
            kind: "practice",
            theory: `
              <h2>Змінні можна використовувати у формулах</h2>
              <div class="code-box">
                a = 2<br>
                b = 5<br>
                print(a + b)
              </div>
            `,
            desc: "Створи a=8 і b=7. Виведи a + b.",
            hint: `
          1) Дві змінні
          2) У print використай +
          `,
            expected: `15`,
            tests: [
              { type: "stdoutEquals", name: "Результат 15", value: "15", normalize: "soft" }
            ]
          },
          {
            title: "Множення змінних",
            xp: 115,
            kind: "practice",
            theory: `
              <h2>Можна множити змінні</h2>
              <div class="code-box">
                x = 4<br>
                y = 3<br>
                print(x * y)
              </div>
            `,
            desc: "Створи w=6 і h=5. Виведи w * h.",
            hint: `
          1) Використай *
          2) Не пиши 30 вручну
          `,
            expected: `30`,
            tests: [
              { type: "stdoutEquals", name: "Результат 30", value: "30", normalize: "soft" }
            ]
          },
          {
            title: "Порядок дій",
            xp: 120,
            kind: "practice",
            theory: `
              <h2>Дужки змінюють порядок</h2>
              <div class="code-box">
                a = 2<br>
                b = 3<br>
                c = 4<br>
                print((a + b) * c)
              </div>
            `,
            desc: "Створи a=2, b=4, c=3 і виведи результат (a + b) * c.",
            hint: `
          1) Використай дужки
          2) Не забудь *
          `,
            expected: `18`,
            tests: [
              { type: "stdoutEquals", name: "Результат 18", value: "18", normalize: "soft" }
            ]
          },

          // ====== РІВЕНЬ 4: Оновлення змінної ======

          {
            title: "Текст + змінна",
            xp: 120,
            kind: "practice",
            theory: `
              <h2>Можна друкувати текст і змінну разом</h2>
              <div class="code-box">
                age = 10<br>
                print("Мені", age)
              </div>
            `,
            desc: "Створи age=12 і виведи: Мені 12",
            hint: `
          1) Текст окремо
          2) Змінна окремо
          `,
            expected: `Мені 12`,
            tests: [
              { type: "stdoutEquals", name: "Фраза правильна", value: "Мені 12", normalize: "soft" }
            ]
          },
          {
            title: "Рахунок очок",
            xp: 130,
            kind: "practice",
            theory: `
              <h2>Змінні — це як рахунок у грі</h2>
              <div class="code-box">
                score = 10<br>
                score = score + 5<br>
                print("Очки:", score)
              </div>
            `,
            desc: "Створи score=7. Додай 3. Виведи: Очки: 10",
            hint: `
          1) Онови score
          2) Виведи текст і змінну
          `,
            expected: `Очки: 10`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "Очки: 10", normalize: "soft" }
            ]
          },

          // ====== ПІДСУМКОВІ (3 задачі) ======

          {
            title: "Підсумкова 1: три змінні",
            xp: 220,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №1</h2>
              <p>Створи кілька змінних і правильно їх виведи.</p>
            `,
            desc: "Створи x=2, y=3, z=4 і виведи результат x + y + z",
            hint: `
          1) Три змінні
          2) Один вираз з +
          `,
            expected: `9`,
            tests: [
              { type: "stdoutEquals", name: "Результат 9", value: "9", normalize: "soft" }
            ]
          },
          {
            title: "Підсумкова 2: оновлення",
            xp: 240,
            kind: "quiz",
            theory: `<h2>Перевіримо оновлення змінної</h2>`,
            desc: "Створи coins=5. Потім зроби coins = coins + 10. Виведи coins.",
            hint: `
          1) Використай змінну у правій частині
          2) Потім print
          `,
            expected: `15`,
            tests: [
              { type: "stdoutEquals", name: "Результат 15", value: "15", normalize: "soft" }
            ]
          },
          {
            title: "Підсумкова 3: комбо",
            xp: 260,
            kind: "quiz",
            theory: `<h2>Комбо-завдання</h2><p>Тут потрібно і математика, і змінні.</p>`,
            desc: "Створи a=10, b=5. Виведи: Результат: 50 (через множення).",
            hint: `
          1) Дві змінні
          2) Використай *
          3) Виведи текст і результат разом
          `,
            expected: `Результат: 50`,
            tests: [
              { type: "stdoutEquals", name: "Вивід правильний", value: "Результат: 50", normalize: "soft" }
            ]
          }

        ]
      },

      {
        id: "m_types",
        title: "Типи даних",
        desc: "str, int, float, bool: що це таке і як їх розрізняти.",
        tasks: [
          // ====== РІВЕНЬ 1: Текст vs число (дуже розжовано) ======

          {
            title: "Число — без лапок",
            xp: 80,
            kind: "practice",
            theory: `
              <h2>Тип даних: число (int)</h2>

              <p>
                У Python існують різні <b>типи даних</b>.
                Тип даних — це підказка для Python: з чим він працює —
                з числом, текстом або чимось іншим.
              </p>

              <p>
                Коли ми пишемо число <b>без лапок</b>,
                Python розуміє: це <b>число</b>.
                Цілі числа (1, 2, 3, 10, 25) мають тип <b>int</b>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                age = 12<br>
                print(age)
              </div>

              <p><b>Що відбувається?</b></p>
              <ul>
                <li>Python створює змінну <code>age</code></li>
                <li>Кладе в неї число 12</li>
                <li>Потім друкує це число</li>
              </ul>

              <p><b>Результат у терміналі:</b></p>
              <div class="code-box">
                12
              </div>

              <p class="mutedish tiny">
                Важливо: якщо написати "12" у лапках — це вже буде текст, а не число.
              </p>
            `,
            desc: "Створи змінну number зі значенням 30 (без лапок) і виведи її.",
            hint: `
      1) number = 30  (без лапок)
      2) Потім print(number)
      3) Не пиши 30 прямо всередині print()
      `,
            expected: `30`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 30", value: "30", normalize: "soft" },
              { type: "codeIncludes", name: "Є змінна number", value: "number" }
            ]
          },

          {
            title: "Текст — у лапках",
            xp: 85,
            kind: "practice",
            theory: `
              <h2>Тип даних: текст (str)</h2>

              <p>
                Якщо ми хочемо зберегти слово або речення —
                це буде <b>текст</b>.
              </p>

              <p>
                У Python текст називається <b>рядок</b> або тип <b>str</b>.
                Щоб Python точно зрозумів, що це текст, його пишуть у лапках.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                hero = "Супермен"<br>
                print(hero)
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                Супермен
              </div>

              <p>
                Лапки не друкуються — вони потрібні лише для Python.
              </p>

              <p class="mutedish tiny">
                Якщо забути лапки, Python може подумати, що це назва змінної,
                і зʼявиться помилка.
              </p>
            `,
            desc: "Створи змінну city зі значенням \"Київ\" і виведи її.",
            hint: `
      1) Значення має бути в лапках
      2) Потім print(city)
      `,
            expected: `Київ`,
            tests: [
              { type: "stdoutEquals", name: "Вивід Київ", value: "Київ", normalize: "soft" },
              { type: "codeIncludes", name: "Є змінна city", value: "city" }
            ]
          },

          {
            title: "5 і \"5\" — різні типи",
            xp: 95,
            kind: "practice",
            theory: `
              <h2>Однаково виглядає, але різні типи</h2>

              <p>
                Подивись уважно:
              </p>
              <div class="code-box">
                5<br>
                "5"
              </div>

              <p>
                Вони схожі, але це різні речі:
              </p>
              <ul>
                <li><b>5</b> — число (int)</li>
                <li><b>"5"</b> — текст (str)</li>
              </ul>

              <p>
                Через це вони поводяться по-різному:
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(5 + 5)<br>
                print("5" + "5")
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                10<br>
                55
              </div>

              <p>
                Для чисел <code>+</code> означає “додати”.
                Для тексту <code>+</code> означає “склеїти”.
              </p>
            `,
            desc: "Виведи результат: \"8\" + \"2\" (саме як текст, щоб вийшло 82).",
            hint: `
      1) Обидва значення мають бути в лапках
      2) Використай +
      3) Подумай: це додавання чи склеювання?
      `,
            expected: `82`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 82", value: "82", normalize: "soft" },
              { type: "codeIncludes", name: "Є +", value: "+" }
            ]
          },

          {
            title: "Додавання чисел",
            xp: 95,
            kind: "practice",
            theory: `
              <h2>+ для чисел = додавання</h2>

              <p>
                Якщо значення — числа (без лапок),
                то <code>+</code> означає справжнє додавання.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(8 + 2)
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                10
              </div>

              <p class="mutedish tiny">
                Головне правило: числа — без лапок.
              </p>
            `,
            desc: "Виведи результат виразу: 8 + 2 (без лапок).",
            hint: `
      1) Один print()
      2) Усередині приклад 8 + 2
      3) Без лапок
      `,
            expected: `10`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 10", value: "10", normalize: "soft" },
              { type: "codeIncludes", name: "Є +", value: "+" }
            ]
          },

          // ====== РІВЕНЬ 2: type() — дивимось тип ======

          {
            title: "type() — запитай у Python тип",
            xp: 110,
            kind: "practice",
            theory: `
              <h2>type() — дізнатися тип значення</h2>

              <p>
                Іноді ми не впевнені: це число чи текст?
                Можна прямо запитати у Python за допомогою <code>type()</code>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(type(100))<br>
                print(type("100"))
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                &lt;class 'int'&gt;<br>
                &lt;class 'str'&gt;
              </div>

              <p>
                Пояснення:
              </p>
              <ul>
                <li><b>int</b> — число</li>
                <li><b>str</b> — текст</li>
              </ul>

              <p class="mutedish tiny">
                Не потрібно лякатися напису &lt;class ...&gt; — головне слово всередині: int або str.
              </p>
            `,
            desc: "Виведи тип числа 500 використовуючи type().",
            hint: `
      1) type(...) має бути всередині print(...)
      2) 500 пиши без лапок
      `,
            expected: `<class 'int'>`,
            tests: [
              { type: "stdoutEquals", name: "Тип int", value: "<class 'int'>", normalize: "soft" },
              { type: "codeIncludes", name: "Є type(", value: "type(" }
            ]
          },

          {
            title: "type() для тексту",
            xp: 110,
            kind: "practice",
            theory: `
              <h2>type() для рядка (str)</h2>

              <p>
                Якщо значення у лапках — це рядок (str).
                Перевіримо це через <code>type()</code>.
              </p>

              <p><b>Приклад коду:</b></p>
              <div class="code-box">
                print(type("Кіт"))
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                &lt;class 'str'&gt;
              </div>
            `,
            desc: "Виведи тип рядка \"Hello\" використовуючи type().",
            hint: `
      1) Hello має бути в лапках
      2) Виведи type("Hello")
      `,
            expected: `<class 'str'>`,
            tests: [
              { type: "stdoutEquals", name: "Тип str", value: "<class 'str'>", normalize: "soft" },
              { type: "codeIncludes", name: "Є type(", value: "type(" }
            ]
          },

          // ====== РІВЕНЬ 3: float (число з крапкою) ======

          {
            title: "float — число з крапкою",
            xp: 115,
            kind: "practice",
            theory: `
              <h2>Тип даних: float</h2>

              <p>
                Якщо число має крапку, це називається <b>float</b>.
                Наприклад: <code>3.14</code>, <code>0.5</code>, <code>12.0</code>.
              </p>

              <p>
                Float часто потрібен для грошей, ваги, відсотків, часу.
              </p>

              <p><b>Приклад:</b></p>
              <div class="code-box">
                pi = 3.14<br>
                print(pi)<br>
                print(type(pi))
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                3.14<br>
                &lt;class 'float'&gt;
              </div>
            `,
            desc: "Створи змінну price=12.5 і виведи type(price).",
            hint: `
      1) price має містити число з крапкою
      2) Потім print(type(price))
      `,
            expected: `<class 'float'>`,
            tests: [
              { type: "stdoutEquals", name: "Тип float", value: "<class 'float'>", normalize: "soft" },
              { type: "codeIncludes", name: "Є .", value: "." }
            ]
          },

          {
            title: "Ділення / часто дає float",
            xp: 125,
            kind: "practice",
            theory: `
              <h2>Чому після ділення може бути .0?</h2>

              <p>
                Оператор ділення <code>/</code> часто повертає число типу <b>float</b>.
                Навіть якщо результат виглядає цілим!
              </p>

              <p><b>Приклад:</b></p>
              <div class="code-box">
                print(8 / 2)<br>
                print(type(8 / 2))
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                4.0<br>
                &lt;class 'float'&gt;
              </div>

              <p class="mutedish tiny">
                4.0 — це те саме число, що й 4, просто у форматі float.
              </p>
            `,
            desc: "Виведи тип виразу 9 / 3 використовуючи type().",
            hint: `
      1) type(...) всередині print(...)
      2) Всередині type напиши 9 / 3
      `,
            expected: `<class 'float'>`,
            tests: [
              { type: "stdoutEquals", name: "Тип float", value: "<class 'float'>", normalize: "soft" },
              { type: "codeIncludes", name: "Є /", value: "/" }
            ]
          },

          // ====== РІВЕНЬ 4: bool (True/False) ======

          {
            title: "bool — True і False",
            xp: 120,
            kind: "practice",
            theory: `
              <h2>Тип даних: bool</h2>

              <p>
                Тип <b>bool</b> — це “так/ні”.
                Він має лише два значення:
              </p>
              <ul>
                <li><code>True</code> — так</li>
                <li><code>False</code> — ні</li>
              </ul>

              <p>
                Згодом ми будемо використовувати bool у <code>if</code>,
                але поки що просто познайомимось.
              </p>

              <p><b>Приклад:</b></p>
              <div class="code-box">
                is_ok = True<br>
                print(is_ok)<br>
                print(type(is_ok))
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                True<br>
                &lt;class 'bool'&gt;
              </div>

              <p class="mutedish tiny">
                Важливо: True/False пишуться з великої літери і без лапок.
              </p>
            `,
            desc: "Створи змінну ok зі значенням True і виведи type(ok).",
            hint: `
      1) ok = True (без лапок)
      2) Потім print(type(ok))
      `,
            expected: `<class 'bool'>`,
            tests: [
              { type: "stdoutEquals", name: "Тип bool", value: "<class 'bool'>", normalize: "soft" },
              { type: "codeIncludes", name: "Є True", value: "True" }
            ]
          },

          {
            title: "Порівняння дає bool",
            xp: 140,
            kind: "practice",
            theory: `
              <h2>Порівняння повертає True або False</h2>

              <p>
                Коли ми порівнюємо числа, Python відповідає:
                “так” або “ні”, тобто True або False.
              </p>

              <p><b>Приклад:</b></p>
              <div class="code-box">
                print(5 &gt; 3)
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                True
              </div>

              <p class="mutedish tiny">
                Це дуже важливо для умов (if), які ми вивчимо пізніше.
              </p>
            `,
            desc: "Виведи результат порівняння: 3 > 10",
            hint: `
      1) Використай знак >
      2) Надрукуй результат через print(...)
      `,
            expected: `False`,
            tests: [
              { type: "stdoutEquals", name: "Результат False", value: "False", normalize: "soft" },
              { type: "codeIncludes", name: "Є >", value: ">" }
            ]
          },

          // ====== РІВЕНЬ 5: Типи у дії (без перетворень) ======

          {
            title: "Склей текст + текст",
            xp: 130,
            kind: "practice",
            theory: `
              <h2>+ для тексту = склеювання</h2>

              <p>
                Якщо обидві частини — текст (str),
                то <code>+</code> не додає, а <b>склеює</b>.
              </p>

              <p><b>Приклад:</b></p>
              <div class="code-box">
                print("Py" + "thon")
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                Python
              </div>
            `,
            desc: "Виведи рівно: superman (склей \"super\" і \"man\" через +).",
            hint: `
      1) Два рядки у лапках
      2) Між ними +
      3) Один print
      `,
            expected: `superman`,
            tests: [
              { type: "stdoutEquals", name: "Вивід superman", value: "superman", normalize: "soft" },
              { type: "codeIncludes", name: "Є +", value: "+" }
            ]
          },

          {
            title: "Текст * число",
            xp: 145,
            kind: "practice",
            theory: `
              <h2>Множення тексту</h2>

              <p>
                У Python можна “помножити” текст на число.
                Це означає: повторити текст кілька разів.
              </p>

              <p><b>Приклад:</b></p>
              <div class="code-box">
                print("ha" * 3)
              </div>

              <p><b>Результат:</b></p>
              <div class="code-box">
                hahaha
              </div>

              <p class="mutedish tiny">
                Це корисно, коли треба намалювати “лінію” з символів або зробити повтор.
              </p>
            `,
            desc: "Виведи рівно: !!!! (зроби це як \"!\" * 4).",
            hint: `
      1) В лапках один знак !
      2) Помнож на 4
      3) Надрукуй результат
      `,
            expected: `!!!!`,
            tests: [
              { type: "stdoutEquals", name: "Вивід !!!!", value: "!!!!", normalize: "soft" },
              { type: "codeIncludes", name: "Є *", value: "*" }
            ]
          },

          // ====== ПІДСУМКОВІ (3 задачі) ======

          {
            title: "Підсумкова 1: впізнай тип",
            xp: 220,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №1</h2>
              <p>
                Перевіримо, чи ти розумієш: лапки роблять значення текстом.
                Тут потрібно використати <code>type()</code>.
              </p>

              <p class="mutedish tiny">
                Порада: якщо бачиш лапки — найчастіше це str.
              </p>
            `,
            desc: "Виведи тип значення \"100\" (саме з лапками) через type().",
            hint: `
      1) Значення має бути в лапках
      2) type(...) всередині print(...)
      `,
            expected: `<class 'str'>`,
            tests: [
              { type: "stdoutEquals", name: "Тип str", value: "<class 'str'>", normalize: "soft" },
              { type: "codeIncludes", name: "Є type(", value: "type(" }
            ]
          },

          {
            title: "Підсумкова 2: різні результати",
            xp: 250,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №2</h2>
              <p>
                Два майже однакові приклади можуть давати різний результат.
                Все залежить від того, що це: число чи текст.
              </p>
            `,
            desc: "Виведи результат: \"2\" + \"3\"",
            hint: `
      1) Тут обидва значення — текст
      2) + означає склеїти
      `,
            expected: `23`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 23", value: "23", normalize: "soft" }
            ]
          },

          {
            title: "Підсумкова 3: bool з порівняння",
            xp: 280,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №3</h2>
              <p>
                Порівняння повертає True або False — це тип <b>bool</b>.
              </p>
              <p class="mutedish tiny">
                Тут не потрібно type() — просто надрукуй результат порівняння.
              </p>
            `,
            desc: "Виведи результат порівняння: 10 == 10",
            hint: `
      1) Використай подвійний знак ==
      2) print(...) має вивести True або False
      `,
            expected: `True`,
            tests: [
              { type: "stdoutEquals", name: "Вивід True", value: "True", normalize: "soft" },
              { type: "codeIncludes", name: "Є ==", value: "==" }
            ]
          }
        ]
      },



      {
        id: "m_input",
        title: "Команда input()",
        desc: "Ввід з клавіатури: input(), змінні, перетворення int(), прості обчислення.",
        tasks: [
          // ====== РІВЕНЬ 1: Знайомство з input() ======

          {
            title: "Що таке input()",
            xp: 60,
            kind: "practice",
            theory: `
              <h2>input() — отримує текст від користувача</h2>
              <p><code>input()</code> зупиняє програму і чекає, поки користувач щось введе з клавіатури.</p>
              <p>Дуже важливо: <code>input()</code> <b>завжди повертає текст</b> (рядок).</p>
              <div class="code-box">name = input()<br>print("Привіт,", name)</div>
              <p class="mutedish tiny">Спочатку збережи ввід у змінну, а потім можеш його надрукувати.</p>
            `,
            desc: "Створи змінну name і зчитай у неї введення через input(). (Вивід не обовʼязковий.)",
            hint: `Потрібно: name = input()`,
            expected: `(виводу може не бути)`,
            tests: [
              { type: "codeIncludes", name: "Є input()", value: "input(" },
              { type: "codeIncludes", name: "Є змінна name", value: "name" }
            ]
          },

          {
            title: "input() з підказкою",
            xp: 70,
            kind: "practice",
            theory: `
              <h2>input(підказка)</h2>
              <p>У <code>input()</code> можна передати текст-підказку — він показується перед введенням:</p>
              <div class="code-box">name = input("Введи імʼя: ")</div>
              <p class="mutedish tiny">Підказка — це просто текст у лапках.</p>
            `,
            desc: "Зчитай будь-який текст у змінну nickname, використовуючи input() з підказкою: Введи нік: ",
            hint: `Зроби: nickname = input("Введи нік: ")`,
            expected: `(виводу може не бути)`,
            tests: [
              { type: "codeIncludes", name: "Є input() з текстом", value: 'input("Введи нік:' },
              { type: "codeIncludes", name: "Є змінна nickname", value: "nickname" }
            ]
          },

          {
            title: "Скажи 'Ок!' після вводу",
            xp: 80,
            kind: "practice",
            theory: `
              <h2>Програма чекає ввід — і продовжує</h2>
              <p>Після того як користувач натисне Enter, програма піде далі.</p>
              <div class="code-box">input("Натисни Enter...")<br>print("Ок!")</div>
            `,
            desc: "Зроби так: програма чекає будь-який ввід (можна і порожній), а потім виводить рівно: Ок!",
            hint: `Спочатку input(...), потім print("Ок!")`,
            expected: `Ок!`,
            tests: [
              { type: "codeIncludes", name: "Є input()", value: "input(" },
              { type: "stdoutEquals", name: "Вивід Ок!", value: "Ок!", normalize: "soft" }
            ]
          },

          // ====== РІВЕНЬ 2: Змінні + друк введеного (без жорсткого очікуваного тексту) ======

          {
            title: "Привітання по імені",
            xp: 110,
            kind: "practice",
            theory: `
              <h2>Змінна з введенням</h2>
              <p>Зазвичай роблять так:</p>
              <ol>
                <li>Зчитали імʼя</li>
                <li>Надрукували привітання</li>
              </ol>
              <div class="code-box">name = input("Імʼя: ")<br>print("Привіт,", name)</div>
              <p class="mutedish tiny">Тут вивід залежить від того, що введе користувач, тому приклад — це “шаблон”.</p>
            `,
            desc: "Зчитай імʼя у змінну name і виведи привітання: Привіт, <імʼя>",
            hint: `1) name = input("Імʼя: ")\n2) print("Привіт,", name)`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeIncludes", name: "Є input()", value: "input(" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },

          {
            title: "Два введення",
            xp: 120,
            kind: "practice",
            theory: `
              <h2>Можна зчитувати кілька разів</h2>
              <p>Кожен <code>input()</code> — це одне введення.</p>
              <div class="code-box">a = input("Перше: ")<br>b = input("Друге: ")</div>
            `,
            desc: "Зчитай у змінні city та animal два введення (з підказками: Місто: і Тварина:). Вивід не обовʼязковий.",
            hint: `Потрібно 2 змінні і 2 input()`,
            expected: `(виводу може не бути)`,
            tests: [
              { type: "codeRegex", name: "Є 2 input()", pattern: "input\\s*\\(", flags: "g" },
              { type: "codeIncludes", name: "Є city", value: "city" },
              { type: "codeIncludes", name: "Є animal", value: "animal" }
            ]
          },

          // ====== РІВЕНЬ 3: Чому int() потрібен (input завжди текст) ======

          {
            title: "int() — перетворення в число",
            xp: 130,
            kind: "practice",
            theory: `
              <h2>input() повертає текст, а int() робить число</h2>
              <p>Якщо ти зчитав число через <code>input()</code>, то це буде текст.</p>
              <p>Щоб перетворити на число, використовують <code>int()</code>:</p>
              <div class="code-box">age = int(input("Вік: "))</div>
              <p class="mutedish tiny">Якщо введуть не число — буде помилка. Але поки що ми тренуємось на правильному вводі 🙂</p>
            `,
            desc: "Зчитай число у змінну age так, щоб age було числом (використай int(input(...))). Вивід не обовʼязковий.",
            hint: `Структура така: age = int(input("..."))`,
            expected: `(виводу може не бути)`,
            tests: [
              { type: "codeIncludes", name: "Є int(", value: "int(" },
              { type: "codeIncludes", name: "Є input(", value: "input(" },
              { type: "codeIncludes", name: "Є змінна age", value: "age" }
            ]
          },

          {
            title: "Після вводу: +1 до числа",
            xp: 150,
            kind: "practice",
            theory: `
              <h2>Математика після вводу</h2>
              <p>Коли ми отримали число, можемо рахувати:</p>
              <div class="code-box">n = int(input("Число: "))<br>print(n + 1)</div>
              <p class="mutedish tiny">Вивід залежить від введення, але логіка завжди однакова.</p>
            `,
            desc: "Зчитай число n (як число) і виведи n+1.",
            hint: `Потрібно: int(input(...)) і потім print(n + 1)`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeIncludes", name: "Є int(input", value: "int(input" },
              { type: "codeIncludes", name: "Є + 1", value: "+ 1" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },

          {
            title: "Сума двох чисел",
            xp: 170,
            kind: "practice",
            theory: `
              <h2>Два числа — одна сума</h2>
              <p>Зчитуємо два числа як числа, а потім додаємо:</p>
              <div class="code-box">a = int(input("a: "))<br>b = int(input("b: "))<br>print(a + b)</div>
            `,
            desc: "Зчитай два числа a і b (через int(input(...))) і виведи їх суму.",
            hint: `2 рази int(input(...)) і потім print(a + b)`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeRegex", name: "Є 2 рази int(input", pattern: "int\\s*\\(\\s*input", flags: "g" },
              { type: "codeIncludes", name: "Є a + b", value: "a + b" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },

          {
            title: "Різниця (віднімання)",
            xp: 170,
            kind: "practice",
            theory: `
              <h2>Віднімання після вводу</h2>
              <p>Так само, як з додаванням, але оператор <code>-</code>.</p>
              <div class="code-box">a = int(input())<br>b = int(input())<br>print(a - b)</div>
            `,
            desc: "Зчитай два числа a і b та виведи результат: a - b",
            hint: `Потрібні дві змінні і оператор - у print().`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeIncludes", name: "Є -", value: "-" },
              { type: "codeRegex", name: "Є 2 input()", pattern: "input\\s*\\(", flags: "g" }
            ]
          },

          {
            title: "Монетки: скільки залишиться? (%)",
            xp: 190,
            kind: "practice",
            theory: `
              <h2>% — остача від ділення</h2>
              <p>Оператор <code>%</code> показує, що залишиться після ділення.</p>
              <p>Приклад: <code>7 % 3</code> → <b>1</b> (бо 7 = 3*2 + 1)</p>
              <div class="code-box">n = int(input("Монетки: "))<br>print(n % 2)</div>
              <p class="mutedish tiny">Це корисно для “парне/непарне”, розкладання по командах тощо.</p>
            `,
            desc: "Зчитай число n (монетки) і виведи, скільки залишиться, якщо розкласти по 3 монетки: n % 3",
            hint: `Потрібно використати оператор % 3`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeIncludes", name: "Є % 3", value: "% 3" },
              { type: "codeIncludes", name: "Є int(input", value: "int(input" }
            ]
          },

          // ====== ПІДСУМКОВІ (3 задачі) ======

          {
            title: "Підсумкова 1: привітання з імʼям",
            xp: 240,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №1</h2>
              <p>Перевіримо базу: <code>input()</code> → змінна → <code>print()</code>.</p>
              <p class="mutedish tiny">Тут не треба складних фокусів — просто акуратно.</p>
            `,
            desc: "Зчитай імʼя у змінну name і виведи: Привіт, <імʼя> (кома після 'Привіт' обовʼязкова).",
            hint: `Збережи ввід у name, а потім надрукуй два аргументи: "Привіт," і name`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeIncludes", name: "Є input()", value: "input(" },
              { type: "codeIncludes", name: "Є змінна name", value: "name" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          },

          {
            title: "Підсумкова 2: сума + красивий текст",
            xp: 280,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №2</h2>
              <p>Тепер зробимо “майже калькулятор”:</p>
              <ol>
                <li>Зчитати два числа</li>
                <li>Порахувати суму</li>
                <li>Вивести текст + результат</li>
              </ol>
              <div class="code-box">print("Сума:", a + b)</div>
            `,
            desc: "Зчитай два числа a і b (через int(input(...))) і виведи: Сума: <результат>",
            hint: `Потрібно: a і b як числа (int), потім print("Сума:", a + b)`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeRegex", name: "Є 2 рази int(input", pattern: "int\\s*\\(\\s*input", flags: "g" },
              { type: "codeIncludes", name: "Є текст 'Сума:'", value: "Сума:" },
              { type: "codeIncludes", name: "Є a + b", value: "a + b" }
            ]
          },

          {
            title: "Підсумкова 3: приклад з дужками",
            xp: 320,
            kind: "quiz",
            theory: `
              <h2>Підсумкова №3 (комбо)</h2>
              <p>Перевіримо:</p>
              <ul>
                <li>ввід числа</li>
                <li>обчислення з дужками</li>
                <li>вивід результату</li>
              </ul>
              <p class="mutedish tiny">Дужки потрібні, щоб точно задати порядок дій.</p>
            `,
            desc: "Зчитай число x (як число) і виведи результат виразу: (x + 5) * 2",
            hint: `x має бути числом (int). У виразі використай дужки: (x + 5) * 2`,
            expected: `(залежить від введення)`,
            tests: [
              { type: "codeIncludes", name: "Є int(input", value: "int(input" },
              { type: "codeIncludes", name: "Є (x + 5) * 2", value: "(x + 5) * 2" },
              { type: "codeIncludes", name: "Є print()", value: "print(" }
            ]
          }
        ]
      },


      

      {
        id: "m_flow",
        title: "Умови та цикли",
        desc: "if/else та for range().",
        tasks: [
          {
            title: "if/else",
            xp: 140,
            kind: "practice",
            theory: `
              <h2>if / else</h2>
              <p>Приклад:</p>
              <div class="code-box">x = 7<br>if x &gt; 5:<br>&nbsp;&nbsp;print("big")<br>else:<br>&nbsp;&nbsp;print("small")</div>
            `,
            desc: "Зроби x=7. Якщо x>5 — виведи big, інакше small.",
            hint: `x = 7\nif x > 5:\n    print("big")\nelse:\n    print("small")`,
            expected: `big`,
            tests: [
              { type: "requireIfElse", name: "Є if та else" },
              { type: "stdoutOneOf", name: "Вивід big", values: ["big"], normalize: "soft" }
            ]
          },

          {
            title: "Підсумкова: умови + цикл",
            xp: 260,
            kind: "final",
            theory: `
              <h2>Підсумкова</h2>
              <p>Використай <b>for</b> і <b>if</b>.</p>
              <div class="code-box">for i in range(1, 6):<br>&nbsp;&nbsp;if i % 2 == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</div>
            `,
            desc: "Виведи парні числа 2 і 4 (кожне з нового рядка) використовуючи range(1,6).",
            hint: `for i in range(1, 6):\n    if i % 2 == 0:\n        print(i)`,
            expected: `2\n4`,
            tests: [
              { type: "stdoutEquals", name: "Вивід 2 і 4", value: "2\n4", normalize: "soft" },
              { type: "codeIncludes", name: "Є if", value: "if" },
              { type: "codeIncludes", name: "Є range", value: "range" }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "pygame_intro",
    title: "Pygame",
    icon: "🎮",
    desc: "Перші кроки: import, вікно, цикл подій.",
    modules: [
      {
        id: "m_pg_start",
        title: "Старт",
        desc: "Підключення pygame.",
        tasks: [
          {
            title: "import pygame",
            xp: 80,
            kind: "practice",
            theory: `
              <h2>Імпорт бібліотеки</h2>
              <p>Починаємо з імпорту:</p>
              <div class="code-box">import pygame</div>
            `,
            desc: "Напиши import pygame",
            hint: `import pygame`,
            expected: `(виводу може не бути)`,
            tests: [
              { type: "codeIncludes", name: "Є import pygame", value: "import pygame" }
            ]
          }
        ]
      }
    ]
  }
];

var LEADERBOARD_SEED = [
  { name: "Ada", xp: 980, streak: 6 },
  { name: "Linus", xp: 870, streak: 4 },
  { name: "Guido", xp: 1210, streak: 9 },
  { name: "Grace", xp: 760, streak: 2 }
];
