// js/data/python/m_print.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_print",
    title: "Команда print()",
    icon: "ri-terminal-box-line",
    color: "#0ea5e9", // Синій колір для базового виводу
    desc: "Вивід у консоль: sep, end, математика, escape-символи та форматування.",

    tasks: [
      
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Основи функції print)
      // ==========================================

      {
        title: "🚀 Старт: Привіт, світ!",
        xp: 35,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що таке Python?</h2>
          <p>Python — це потужна мова програмування. Мова програмування — це спосіб "пояснити компʼютеру", що він має зробити. Компʼютер сам нічого не вирішує — він просто виконує команди, які ми йому пишемо.</p>
          
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px; margin-top: 15px;">Що таке print()?</h2>
          <p><b style="color: #3b82f6;">print()</b> — це головна команда (функція), яка показує текст або число внизу екрана (у консолі / терміналі). Це голос твоєї програми!</p>
          <p>Все, що ти покладеш всередину круглих дужок <code>()</code>, Python надрукує на екрані.</p>
          
          <h3 style="margin-top: 15px;">Текст у Python</h3>
          <p>Будь-який текст у програмуванні називається <b style="color: #10b981;">рядком (string)</b>. Щоб комп'ютер зрозумів, що це просто текст, а не якась секретна команда, його потрібно писати в лапках (одинарні <code>' '</code> або подвійні <code>" "</code>).</p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Привіт, світ!")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Привіт, світ!</div>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b><br>
            ✔ Лапки навколо тексту — <b style="color: #ef4444;">обовʼязкові</b>!<br>
            ✔ Великі та малі букви мають значення (<code>print</code> завжди пишеться тільки з маленької літери).
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти налаштовуєш новий комп'ютер. Твоя мета — відправити перше тестове повідомлення на екран, щоб перевірити зв'язок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай команду <code style="color: #0ea5e9;">print()</code>, щоб вивести текст <code style="color: #0ea5e9;">"Привіт, світ!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не забудь обгорнути текст у лапки всередині дужок. Текст має збігатися до літери (включно з комою та знаком оклику)!
          </div>
        `,
        hint: `Спочатку напиши print(, а всередині дужок помісти текст у лапках: "Привіт, світ!"`,
        expected: `Привіт, світ!`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Привіт, світ!", normalize: "soft" },
          { type: "codeIncludes", name: "Є print()", value: "print(" }
        ]
      },

      {
        title: "📝 Моє повідомлення",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Текст у лапках — це святе</h2>
          <p>Ще раз закріпимо: усе, що знаходиться всередині лапок, друкується <b style="color: #10b981;">точно так само</b>, як ти це написав. Усі пробіли, коми та тире будуть збережені з ідеальною точністю.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Мені подобається Python")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Мені подобається Python</div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти створюєш свій профіль розробника. Розкажи системі, хто ти такий.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> За допомогою команди виводу надрукуй текст <code style="color: #0ea5e9;">"Я — програміст"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни особливу увагу на тире та пробіли навколо нього. Система перевіряє кожен символ, тому пиши уважно.
          </div>
        `,
        hint: `Використай функцію print() і передай їй текст у лапках: "Я — програміст"`,
        expected: `Я — програміст`,
        tests: [
          { type: "stdoutEquals", name: "Точний текст", value: "Я — програміст", normalize: "soft" },
          { type: "codeIncludes", name: "Є print()", value: "print(" }
        ]
      },

      {
        title: "🥞 Два рядки (2 print)",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Кожен print() — з нового рядка</h2>
          <p>Програма виконує команди по черзі, згори донизу. За замовчуванням функція <code>print()</code> після того, як виведе свій текст, <b style="color: #3b82f6;">автоматично переводить курсор на новий рядок</b> (ніби ти натиснув клавішу Enter).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Перший")<br>print("Другий")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Перший<br>Другий</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести інструкцію з двох кроків. Кожен крок повинен бути на новому рядку, щоб користувачу було зручно читати.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Виведи слово <code style="color: #0ea5e9;">"Спочатку"</code>, а під ним слово <code style="color: #0ea5e9;">"Потім"</code>. Зроби це за допомогою <b>ДВОХ</b> окремих команд <code style="color: #0ea5e9;">print()</code> на різних рядках.
          </div>
        `,
        hint: `Тобі знадобляться дві команди виводу. Перша надрукує "Спочатку", а друга (на наступному рядку) — "Потім".`,
        expected: `Спочатку\nПотім`,
        tests: [
          { type: "stdoutEquals", name: "2 рядки виводу", value: "Спочатку\nПотім", normalize: "soft" },
          { type: "codeRegex", name: "Є два print()", pattern: "print\\s*\\(", flags: "g", min: 2 }
        ]
      },

      {
        title: "🔢 Числа без лапок",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Числа — це не текст!</h2>
          <p>У програмуванні числа та текст — це абсолютно різні речі. Комп'ютер чудово розуміє математику, тому числа <b style="color: #10b981;">пишуться БЕЗ лапок</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(2026)<br>print(100)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">2026<br>100</div>

          <div class="theory-alert theory-alert-warn">
            💡 <b>Чому це важливо?</b> Якщо ти напишеш <code>"7"</code> у лапках, Python сприйматиме це просто як <b>текст</b> (малюнок цифри 7). Виконувати математичні дії з таким "текстовим" числом не вийде!
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Система реєстрації має вивести на екран поточний рік, щоб підтвердити, що її внутрішній годинник працює правильно.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Виведи число <code style="color: #0ea5e9;">2026</code> за допомогою команди <code style="color: #0ea5e9;">print()</code>. Передай його саме як математичне число, тобто <b>без лапок</b>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Якщо ти використаєш лапки (наприклад, <code>"2026"</code>), візуально на екрані нічого не зміниться, але тест не зарахується, адже комп'ютер сприйме це як звичайний текст.
          </div>
        `,
        hint: `Просто напиши: print(2026). Головне — жодних лапок!`,
        expected: `2026`,
        tests: [
          { type: "stdoutEquals", name: "Вивід 2026", value: "2026", normalize: "soft" },
          { type: "codeRegex", name: "Число записане без лапок", pattern: "print\\s*\\(\\s*2026\\s*\\)" },
          { type: "codeRegex", name: "Лапок немає", pattern: "['\"]2026['\"]", flags: "g", max: 0 }
        ]
      },

      {
        title: "➕ Математика: додавання",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математичні дії в Python</h2>
          <p>Python — це дуже потужний калькулятор. Якщо всередині команди <code>print()</code> написати математичний приклад (головне — без лапок!), Python спочатку <b style="color: #3b82f6;">самостійно обчислить результат</b>, а вже потім виведе готову відповідь на екран.</p>
          <p>Для додавання використовується класичний знак <b style="color: #ef4444; font-size: 1.2em;">+</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(3 + 4)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">7</div>

          <div class="theory-alert theory-alert-warn">
            💡 <b>Зверни увагу:</b> Комп'ютер чудово розуміє пробіли навколо плюса (<code>3 + 4</code>). Програмісти ставлять їх спеціально, щоб код легше читався!
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Корабельний комп'ютер має обчислити нові координати польоту. Для цього йому потрібно скласти два числа: 7 та 5. Доручи системі виконати цю математичну дію і вивести готову відповідь.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши математичний приклад <code style="color: #0ea5e9;">7 + 5</code> прямо всередині круглих дужок команди виводу. Змусь Python порахувати суму.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Якщо ти напишеш приклад у лапках (наприклад, <code>"7 + 5"</code>), на екран виведеться просто текст, а не обчислений результат! Лапки використовувати заборонено.
          </div>
        `,
        hint: `Напиши приклад прямо всередині print(), без лапок.`,
        expected: `12`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "12", normalize: "soft" },
          { type: "codeRegex", name: "Є вираз 7 + 5", pattern: "7\\s*\\+\\s*5" }
        ]
      },

      {
        title: "➖ Математика: віднімання",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Віднімання в Python</h2>
          <p>Так само як і додавання, Python уміє виконувати віднімання. Для цього використовується класичний знак дефісу <b style="color: #ef4444; font-size: 1.2em;">-</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(15 - 4)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">11</div>
        `,
        desc: `
          <div class="task-main">
            <p>У тебе було 20 стріл, і ти вистрілив 8 разів. Тобі потрібно терміново дізнатися, скільки стріл залишилося. Доручи програмі порахувати залишок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Застав Python обчислити математичний приклад <code style="color: #0ea5e9;">20 - 8</code> прямо всередині функції <code style="color: #0ea5e9;">print()</code>.
          </div>
        `,
        hint: `Передай вираз 20 - 8 всередину круглих дужок команди виводу. Без лапок!`,
        expected: `12`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "12", normalize: "soft" },
          { type: "codeRegex", name: "Є вираз 20 - 8", pattern: "20\\s*-\\s*8" }
        ]
      },

      {
        title: "✖️ Математика: множення",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Множення в Python</h2>
          <p>На клавіатурі комп'ютера немає класичного знака множення (хрестика чи крапки). Тому в усіх мовах програмування для множення використовується <b style="color: #ef4444;">зірочка <code>*</code></b> (Shift + 8 на клавіатурі).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(5 * 2)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">10</div>
        `,
        desc: `
          <div class="task-main">
            <p>Тобі потрібно швидко розрахувати площу кімнати розміром 6 на 7 метрів. Доручи цю математику комп'ютеру.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай команду <code style="color: #0ea5e9;">print()</code> для множення чисел <code style="color: #0ea5e9;">6</code> та <code style="color: #0ea5e9;">7</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Згадай, який саме спецсимвол використовується для множення в програмуванні. Не пиши відповідь вручну!
          </div>
        `,
        hint: `Використай зірочку для множення двох чисел прямо в print().`,
        expected: `42`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "42", normalize: "soft" },
          { type: "codeRegex", name: "Є вираз 6 * 7", pattern: "6\\s*\\*\\s*7" }
        ]
      },

      {
        title: "⚖️ Математика: порядок дій",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Порядок дій у Python</h2>
          <p>Python чудово знає шкільну математику! Спочатку виконуються множення <code>*</code> і ділення <code>/</code>, а вже потім додавання <code>+</code> і віднімання <code>-</code>.</p>
          
          <div class="theory-alert theory-alert-info">
            💡 Якщо ти хочеш змінити цей порядок (наприклад, спочатку додати, а потім помножити), використовуй <b>круглі дужки</b>!<br>
            <code>(3 + 2) * 5</code> 👉 Спочатку обчислиться 3+2, а потім результат помножиться на 5.
          </div>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print((3 + 2) * 5)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">25</div>
        `,
        desc: `
          <div class="task-main">
            <p>Алгоритм гри вимагає спочатку скласти числа 2 і 3, а потім помножити їхню суму на 4. Якщо написати це без дужок, результат буде неправильним (14 замість 20)!</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши вираз <code style="color: #0ea5e9;">(2 + 3) * 4</code> всередині <code style="color: #0ea5e9;">print()</code>, щоб змінити порядок дій.
          </div>
        `,
        hint: `Спочатку склади 2 і 3 в круглих дужках, а потім помнож їх на 4.`,
        expected: `20`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "20", normalize: "soft" },
          { type: "codeRegex", name: "Є вираз (2 + 3) * 4", pattern: "\\(\\s*2\\s*\\+\\s*3\\s*\\)\\s*\\*\\s*4" }
        ]
      },

      {
        title: "🎒 Кілька аргументів у print()",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Друкуємо кілька частин разом</h2>
          <p>У команду <code>print()</code> можна передати не одне, а кілька значень (їх ще називають <b style="color: #3b82f6;">аргументами</b>) одразу. Для цього їх треба просто розділити <b style="color: #ef4444;">комою</b>.</p>
          <p>Коли Python бачить коми, він друкує всі ці частини, автоматично ставлячи між ними <b style="color: #10b981;">пробіли</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Один", "Два", "Три")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Один Два Три</div>
       
          <div class="theory-alert theory-alert-info">
            💡 <b>Запам’ятай:</b> ми не пишемо весь текст в одних довгих лапках. Ми передаємо кожне слово у своїх власних лапках як окрему сутність, а Python сам їх склеює пробілами.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести речення з трьох слів: "Я", "люблю" та "Python". Ти маєш зібрати його з окремих частин.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Передай ці три слова як <b>окремі аргументи</b> в одному <code style="color: #0ea5e9;">print()</code>. Кожне слово має бути у власних лапках, а між ними треба поставити коми.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не пиши весь текст в одних лапках (наприклад, <code>"Я люблю Python"</code>)! Програма має сама розставити пробіли замість ком.
          </div>
        `,
        hint: `Передай три слова окремо в один print(), розділивши їх комами: print("Я", "люблю", "Python")`,
        expected: `Я люблю Python`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Я люблю Python", normalize: "soft" },
          { type: "codeIncludes", name: "Є коми (кілька аргументів)", value: "," }
        ]
      },

      {
        title: "🤝 Текст та числа разом",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Навіщо нам ті коми?</h2>
          <p>Може виникнути питання: навіщо ділити слова комами, якщо можна просто написати весь текст в одних лапках: <code>print("Один Два Три")</code>?</p>
          <p>Справжня суперсила ком розкривається, коли нам треба поєднати <b style="color: #10b981;">текст</b> і <b style="color: #ef4444;">математику</b>. Пам'ятай: усередині лапок математика не рахується, бо це просто текст!</p>
          
          <p><b style="color: #ef4444;">Неправильно (всередині лапок текст не рахується):</b></p>
          <div class="code-box">print("Мені 10 + 5 років")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Мені 10 + 5 років</div>
          
          <p><b style="color: #10b981;">Правильно (виносимо математику за лапки через кому):</b></p>
          <div class="code-box">print("Мені", 10 + 5, "років")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Мені 15 років</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b>Як це працює:</b> Python спочатку рахує математику (10 + 5), а потім склеює все разом, автоматично додаючи пробіли на місці ком.
          </div>          
        `,
        desc: `
          <div class="task-main">
            <p>Ти зібрав 8 червоних і 4 зелених яблука. Програма має скласти їх і вивести гарний звіт: "У мене 12 яблук".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Передай у <code style="color: #0ea5e9;">print()</code> ТРИ аргументи через кому: текст <code style="color: #0ea5e9;">"У мене"</code>, математичний вираз <code style="color: #0ea5e9;">8 + 4</code> (без лапок!) і текст <code style="color: #0ea5e9;">"яблук"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Число 12 має бути результатом роботи Python, не пиши його вручну!
          </div>
        `,
        hint: `Тобі потрібен один print(), у якому йдуть: "У мене", потім кома, потім 8 + 4, потім кома, потім "яблук".`,
        expected: `У мене 12 яблук`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "У мене 12 яблук", normalize: "soft" },
          { type: "codeIncludes", name: "Використано коми", value: "," },
          { type: "codeIncludes", name: "Є додавання (+)", value: "+" },
          { type: "codeRegex", name: "Не схитрував (немає числа 12 в тексті)", pattern: "12", flags: "g", max: 0 }
        ]
      },

      {
        title: "🔗 Розділювач (sep)",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">sep — що стоїть між частинами</h2>
          <p>Ми вже знаємо, що Python за замовчуванням ставить пробіл між частинами (аргументами) в print. Але що, якщо ми хочемо поставити між ними дефіс, крапку або щось інше?</p>
          <p>Для цього в самому кінці дужок <code>print()</code> можна додати спеціальний параметр <b style="color: #3b82f6;">sep</b> (від англ. <i>separator</i> — розділювач).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("A", "B", "C", sep="-")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">A-B-C</div>
        `,
        desc: `
          <div class="task-main">
            <p>Зворотний відлік до старту має бути надрукований в один рядок, але числа повинні розділятися дефісами: 5-4-3-2-1.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Передай числа від 5 до 1 як окремі аргументи (через кому). Щоб змінити стандартний пробіл на дефіс, додай в кінці параметр <code style="color: #0ea5e9;">sep="-"</code>.
          </div>
        `,
        hint: `Код має бути таким: print(5, 4, 3, 2, 1, sep="-")`,
        expected: `5-4-3-2-1`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "5-4-3-2-1", normalize: "soft" },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=" }
        ]
      },

      {
        title: "📅 Практика: sep для дати",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Для чого ще потрібен sep?</h2>
          <p>Параметр <code>sep</code> дуже зручний для “форматування”, коли треба об'єднати шматочки тексту певним символом. Це ідеально підходить для виводу дат (через слеш) або часу (через двокрапку).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(12, 30, sep=":")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">12:30</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система має сформувати дату майбутнього релізу: 2030/1/2.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Передай числа 2030, 1 та 2 як окремі аргументи (без лапок!). В якості розділювача застосуй <code style="color: #0ea5e9;">sep='/'</code>.
          </div>
        `,
        hint: `print(2030, 1, 2, sep="/")`,
        expected: `2030/1/2`,
        tests: [
          { type: "stdoutEquals", name: "Дата правильна", value: "2030/1/2", normalize: "soft" },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=" }
        ]
      },
      {
        title: "🛑 Кінець рядка (end)",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">end — що буде в кінці рядка</h2>
          <p>Ти пам'ятаєш, що <code>print()</code> після виводу автоматично робить <b style="color: #10b981;">новий рядок</b>? Але ми можемо скасувати це правило за допомогою параметра <b style="color: #3b82f6;">end</b>!</p>
          <p>Якщо в кінці написати <code>end=""</code> (дві порожні лапки), то переносу не буде, і наступний <code>print()</code> надрукує текст впритул до попереднього.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Hi", end="")<br>print("!")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Hi!</div>
        `,
        desc: `
          <div class="task-main">
            <p>Світлофор подає команду "GO!". Сигнал складається з двох частин (саме слово та знак оклику), але має вивестися в один суцільний рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай <b>ДВІ окремі команди</b> <code style="color: #0ea5e9;">print()</code>. Перша друкує <code style="color: #0ea5e9;">"GO"</code> і містить параметр <code style="color: #0ea5e9;">end=""</code> (щоб скасувати перенос). Друга (на новому рядку) просто друкує знак оклику <code style="color: #0ea5e9;">"!"</code>.
          </div>
        `,
        hint: `У першій команді виводу після тексту "GO" додай кому і параметр end з порожніми лапками.`,
        expected: `GO!`,
        tests: [
          { type: "stdoutEquals", name: "Вивід GO!", value: "GO!", normalize: "soft" },
          { type: "codeRegex", name: "Два print", pattern: "print\\s*\\(.*print\\s*\\(", flags: "s" },
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=" }
        ]
      },

      {
        title: "⏳ Збираємо по шматочках",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Склеювання фрази через кілька print()</h2>
          <p>Використовуючи <code>end=""</code>, можна збирати довгу фразу по шматочках з різних команд друку. Це дуже часто використовується для створення ефектів завантаження!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Початок", end="")<br>print("...", end="")<br>print("Кінець")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Початок...Кінець</div>
          
          <div class="theory-alert theory-alert-info">
            💡 <b>Увага:</b> Остання команда <code>print("Кінець")</code> написана без <code>end=""</code>. Це означає, що після слова "Кінець" комп'ютер вже натисне Enter і завершить рядок.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма імітує процес завантаження, збираючи рядок "Loading...Done" з трьох різних команд виводу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Зроби це використовуючи <b>ТРИ</b> окремі команди <code style="color: #0ea5e9;">print()</code>. Перша має надрукувати <code style="color: #0ea5e9;">"Loading"</code>, друга — <code style="color: #0ea5e9;">"..."</code>, а третя — <code style="color: #0ea5e9;">"Done"</code>.<br>
            Щоб текст не стрибав униз, у перших двох командах використати параметр <code style="color: #0ea5e9;">end=""</code>.
          </div>
        `,
        hint: `У перших двох командах виводу (для 'Loading' та '...') обов'язково додай параметр end з порожніми лапками: end="", щоб текст не стрибав униз.`,
        expected: `Loading...Done`,
        tests: [
          { type: "stdoutEquals", name: "Вивід Loading...Done", value: "Loading...Done", normalize: "soft" },
          { type: "codeRegex", name: "Є кілька print()", pattern: "print\\s*\\(.*print\\s*\\(.*print\\s*\\(", flags: "s" },
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=" }
        ]
      },

      {
        title: "🪄 Невидимий Enter (\\n)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">\\n — новий рядок всередині тексту</h2>
          <p>Що робити, якщо ми хочемо надрукувати кілька рядків, але маємо право використати лише ОДИН <code>print()</code>?</p>
          <p>Для цього існують <b style="color: #ef4444;">спецсимволи (escape-послідовності)</b>. Символ <b style="color: #3b82f6;">\\n</b> (від англійського <i>new line</i>) означає “перейти на новий рядок” прямо всередині тексту. Коли Python бачить <code>\\n</code>, він робить так, ніби ти натиснув клавішу <b>Enter</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("один\\nдва")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">один<br>два</div>
        
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b><br>
            <code>\\n</code> треба писати <b>всередині лапок</b>, бо це частина тексту. Без лапок Python видасть помилку.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Тобі треба вивести список з трьох тварин (котик, песик, хом'як). Кожна тварина має бути на новому рядку, але ти маєш право використати лише одну команду друку!</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай лише <b>ОДИН</b> <code style="color: #0ea5e9;">print()</code> та спецсимвол <code style="color: #0ea5e9;">\\n</code> замість пробілів між словами.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не став пробіли біля <code>\\n</code>, інакше наступні слова з'їдуть праворуч!
          </div>
        `,
        hint: `Напиши весь текст в одному рядку коду, а між словами встав \\n там, де має бути перехід на новий рядок.`,
        expected: `котик\nпесик\nхомʼяк`,
        tests: [
          { type: "stdoutEquals", name: "3 рядки правильні", value: "котик\nпесик\nхомʼяк", normalize: "soft" },
          { type: "codeRegex", name: "Рівно один print()", pattern: "print\\s*\\(", flags: "g", min: 1, max: 1 },
          { type: "codeIncludes", name: "Є \\n", value: "\\n", checkRaw: true },
          { type: "codeRegex", name: "Два переноси рядка", pattern: "\\\\n", flags: "g", min: 2, checkRaw: true }
        ]
      },
      {
        title: "📏 Великий стрибок (\\t)",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Створення колонок</h2>
          <p>Ще один корисний спецсимвол — це <b style="color: #3b82f6;">\\t</b> (від англ. <i>tab</i>). Він робить великий відступ-стрибок, ніби ти натиснув клавішу Tab на клавіатурі.</p>
          <p>Це швидкий спосіб розсунути слова на широку відстань і зробити рівні колонки.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Ім'я\\tВік")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Ім'я    Вік</div>
        `,
        desc: `
          <div class="task-main">
            <p>Тобі потрібно створити заголовок для таблиці лідерів з двох слів: "Гравець" та "Бал".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши їх в одній команді виводу. Замість пробілу між словами використай спецсимвол табуляції <code style="color: #0ea5e9;">\\t</code>.
          </div>
        `,
        hint: `У тебе має бути один рядок тексту, а великий відступ між словами зробить спецсимвол табуляції: "Гравець\\tБал"`,
        expected: `Гравець\t Бал`,
        tests: [
          { type: "stdoutEquals", name: "Табуляція працює", value: "Гравець\tБал", normalize: "strict" },
          { type: "codeIncludes", name: "Використано \\t", value: "\\t", checkRaw: true }
        ]
      },
      {
        title: "📋 Міні-таблиця (\\t та \\n)",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Суперкомбо спецсимволів</h2>
          <p>Що буде, якщо використати і перенос, і табуляцію в одному тексті? Ми отримаємо справжню табличку!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("А\\t1\\nБ\\t2")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">А    1<br>Б    2</div>
        `,
        desc: `
          <div class="task-main">
            <p>Створи меню магазину з двох товарів. Перший рядок — Меч (ціна 100). Другий рядок — Лук (ціна 50).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай <b>ОДИН</b> <code style="color: #0ea5e9;">print()</code>. Між назвою та ціною в одному рядку має бути табуляція <code style="color: #0ea5e9;">\\t</code>, а між самими товарами — перенос <code style="color: #0ea5e9;">\\n</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не використовуй пробіли. Тільки слова і спецсимволи!
          </div>
        `,
        hint: `Твій текст має виглядати приблизно так: "Меч\\t100\\nЛук\\t50"`,
        expected: `Меч\t100\nЛук\t50`,
        tests: [
          { type: "stdoutEquals", name: "Таблиця намальована", value: "Меч\t100\nЛук\t50", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeIncludes", name: "Є \\t", value: "\\t", checkRaw: true },
          { type: "codeIncludes", name: "Є \\n", value: "\\n", checkRaw: true }
        ]
      },
      {
        title: "🗣️ Лапки в тексті",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Як вивести лапки всередині рядка?</h2>
          <p>Якщо ти хочеш надрукувати текст у лапках, Python може заплутатися, де початок тексту, а де його кінець.</p>
          
          <p>Є два зручних способи це обійти:</p>
          
          <p><b>1. Екранування (захист)</b><br>
          Постав зворотний слеш <b style="color: #ef4444;"><code>\\</code></b> прямо перед внутрішньою лапкою. Це скаже комп'ютеру: "Це просто символ тексту, не закривай рядок!"</p>
          <div class="code-box">print("Він сказав: \\"Привіт!\\"")</div>
          
          <p style="margin-top: 15px;"><b>2. Різні лапки (найпростіше)</b><br>
          Візьми весь текст зовні в <b style="color: #3b82f6;">одинарні</b> лапки <code>' '</code>, тоді всередині можна спокійно писати <b style="color: #10b981;">подвійні</b> <code>" "</code> (або навпаки).</p>
          <div class="code-box">print('Він сказав: "Привіт!"')</div>
        `,
        desc: `
          <div class="task-main">
            <p>Письменник хоче процитувати персонажа на екрані. Текст має містити подвійні лапки: <code>Вона сказала: "Так!"</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Виведи цей рядок. Використай будь-який із двох способів (екранування <code style="color: #0ea5e9;">\\</code> або одинарні лапки <code style="color: #0ea5e9;">''</code> зовні), щоб комп'ютер не видав помилку, а успішно надрукував подвійні лапки.
          </div>
        `,
        hint: `Тобі треба надрукувати подвійні лапки всередині тексту. Найпростіше - обгорни весь текст в одинарні лапки '...'.`,
        expected: `Вона сказала: "Так!"`,
        tests: [
          { type: "stdoutEquals", name: "Лапки є у виводі", value: `Вона сказала: "Так!"`, normalize: "soft" },
          { type: "codeRegex", name: "Використано правильний спосіб запису лапок", pattern: "print\\s*\\(\\s*'(?:[^'\\\\]|\\\\.)*\"(?:[^'\\\\]|\\\\.)*\"(?:[^'\\\\]|\\\\.)*'\\s*\\)|print\\s*\\(\\s*\"(?:[^\"\\\\]|\\\\.)*\\\\\"(?:[^\"\\\\]|\\\\.)*\\\\\"(?:[^\"\\\\]|\\\\.)*\"\\s*\\)", checkRaw: true }
        ]
      },
      {
        title: "📁 Шлях на Windows (\\\\)",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">\\\\ — щоб надрукувати \\</h2>
          <p>Ти вже знаєш, що символ <code>\\</code> (бекслеш) у Python запускає магію (наприклад, <code>\\n</code> або <code>\\t</code>).</p>
          <p>Тому, якщо ти просто хочеш надрукувати звичайний бекслеш на екрані (наприклад, для шляху до файлу), тобі потрібно написати його <b style="color: #ef4444;">двічі</b>: <code>\\\\</code>. Перший скіпок захищає другий!</p>
          <div class="code-box">print("C:\\\\Temp\\\\file.txt")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">C:\\Temp\\file.txt</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести системний шлях до гри на Windows: <code>D:\\Games\\Minecraft</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Пам'ятай, що кожен одинарний зворотний слеш у фінальному результаті вимагає написати подвійний зворотний слеш <code style="color: #0ea5e9;">\\\\</code> у твоєму коді.
          </div>
        `,
        hint: `Твій текст у лапках має виглядати так: "D:\\\\Games\\\\Minecraft"`,
        expected: `D:\\Games\\Minecraft`,
        tests: [
          { type: "stdoutEquals", name: "Шлях виведено", value: "D:\\Games\\Minecraft", normalize: "strict" },
          { type: "codeRegex", name: "Використано \\\\ у коді", pattern: "\\\\\\\\", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: sep без пробілів",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Підсумкова №1</h2>
          <p>Твоя задача — зробити вивід із специфічним розділювачем. Для цього потрібен параметр <b style="color: #3b82f6;">sep</b>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система безпеки генерує ключ з 4 цифр: 1, 2, 3, 4. Вони мають бути склеєні через вертикальну риску (pipe).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Передай ці 4 числа як окремі аргументи (через кому), а для об'єднання використай параметр <code style="color: #0ea5e9;">sep="|"</code>.
          </div>
        `,
        hint: `Не забудь вказати символ вертикальної риски (pipe) як розділювач в кінці: print(1, 2, 3, 4, sep="|")`,
        expected: `1|2|3|4`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "1|2|3|4", normalize: "strict" },
          { type: "codeRegex", name: "Використано sep='|'", pattern: "sep\\s*=\\s*['\\\"]\\|['\\\"]", checkRaw: true },
          { type: "codeRegex", name: "Чотири числа як аргументи", pattern: "print\\s*\\(\\s*1\\s*,\\s*2\\s*,\\s*3\\s*,\\s*4", flags: "s" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: end + один рядок",
        xp: 240,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Підсумкова №2</h2>
          <p>Треба зробити один рядок з двох <code>print()</code>. Для цього в першому потрібно <b style="color: #10b981;">скасувати перенос рядка</b> за допомогою <b style="color: #3b82f6;">end</b>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Два сенсори надсилають дані по черзі, але вони мають скластися в одне суцільне повідомлення: START--FINISH.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай ДВА <code style="color: #0ea5e9;">print()</code>. Перший друкує <code style="color: #0ea5e9;">"START--"</code> без нового рядка (завдяки <code style="color: #0ea5e9;">end</code>); другий додає <code style="color: #0ea5e9;">"FINISH"</code>.
          </div>
        `,
        hint: `Зміни поведінку першої команди виводу, додавши спеціальний параметр порожнього кінця (end="") після коми.`,
        expected: `START--FINISH`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "START--FINISH", normalize: "strict" },
          { type: "codeRegex", name: "Два print()", pattern: "print\\s*\\(", flags: "g", min: 2, max: 2 },
          { type: "codeRegex", name: "Використано end=\"\"", pattern: "end\\s*=\\s*['\\\"][\\s]*['\\\"]", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Статистика героя",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Підсумкова №3: Абсолютне комбо</h2>
          <p>Тут ти поєднаєш одразу кілька важливих речей:</p>
          <ul style="padding-left: 20px;">
            <li>математику без лапок</li>
            <li><code>sep=""</code>, щоб прибрати пробіли між частинами</li>
            <li><code>end=""</code>, щоб другий print не починався з нового рядка</li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>Система має вивести життєві показники героя в один суцільний рядок: <code>Герой:100HP</code> (без жодного пробілу!).</p>
          </div>
        
          <div class="task-condition">
            <b>Умова:</b><br>
            1) Використай ДВА <code style="color: #0ea5e9;">print()</code>.<br>
            2) Перший print друкує текст <code style="color: #0ea5e9;">"Герой:"</code> та число 100, отримане обчисленням <code style="color: #0ea5e9;">50 + 50</code>.<br>
            3) У першому print обов'язково використай <code style="color: #0ea5e9;">sep=""</code> (щоб прибрати пробіл) та <code style="color: #0ea5e9;">end=""</code> (щоб не було переносу).<br>
            4) Другий print просто додруковує текст <code style="color: #0ea5e9;">"HP"</code>.
          </div>
        `,
        hint: `Подумай, як у першому print прибрати і пробіл, і перенос рядка, а в другому просто дописати кінець слова.`,
        expected: `Герой:100HP`,
        tests: [
          { type: "stdoutEquals", name: "Точний вивід без пробілів", value: "Герой:100HP", normalize: "strict" },
          { type: "codeRegex", name: "Використано порожній sep", pattern: "sep\\s*=\\s*['\\\"]['\\\"]" },
          { type: "codeRegex", name: "Використано порожній end", pattern: "end\\s*=\\s*['\\\"]['\\\"]" },
          { type: "codeRegex", name: "Є саме вираз 50 + 50", pattern: "50\\s*\\+\\s*50" },
          { type: "codeRegex", name: "Використано два print()", pattern: "print\\s*\\(", flags: "g", min: 2, max: 2 }
        ]
      },

      // ===============================
      // 🟢 JUNIOR BOSS
      // ===============================
      {
        title: "🐉 БОС (Junior): Профіль гравця",
        xp: 500,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит рівня Junior</h2>
          <p>Ти вже знаєш усі базові інструменти для виводу тексту. Час поєднати їх в одному складному завданні <b style="color: #ef4444;">без жодних готових підказок</b>!</p>
          <p>Тут тобі знадобляться:</p>
          <ul style="padding-left: 20px;">
            <li>Перенос рядка <code style="color: #0ea5e9;">\\n</code></li>
            <li>Табуляція <code style="color: #0ea5e9;">\\t</code> (для рівних стовпчиків)</li>
            <li>Лапки всередині тексту (екранування <code style="color: #0ea5e9;">\\"</code> або різні лапки)</li>
            <li>Математика (числа без лапок)</li>
            <li>Злиття без зайвих пробілів <code style="color: #0ea5e9;">sep=""</code></li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>База даних має вивести профіль адміністратора. Слово Admin має бути в лапках, а між словом Rank: і числом 99 стоїть величезний пробіл (табуляція).</p>
          </div>
        
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1) Використай рівно <b>ОДИН</b> <code style="color: #0ea5e9;">print()</code>.<br>
            2) Слово <code style="color: #0ea5e9;">Admin</code> обов'язково має бути в подвійних лапках.<br>
            3) Зроби перехід на другий рядок за допомогою <code style="color: #0ea5e9;">\\n</code>.<br>
            4) Зроби відступ після Rank: за допомогою <code style="color: #0ea5e9;">\\t</code>.<br>
            5) Число 99 ти маєш отримати як результат додавання <code style="color: #0ea5e9;">90 + 9</code>.<br>
            6) Використай параметр <code style="color: #0ea5e9;">sep=""</code>, щоб числа і текст склеїлися ідеально рівно.
          </div>
        `,
        hint: `Згадай усе, що ти вже вивчив: лапки всередині тексту, \\n, \\t, математику без лапок і sep="". Тут важливо не вгадати, а акуратно зібрати все разом в одному print().`,
        expected: `User: "Admin"\nRank:\t99`,
        tests: [
          {
            type: "stdoutEquals",
            name: "Профіль ідеальний",
            value: "User: \"Admin\"\nRank:\t99",
            normalize: "strict"
          },
          { type: "codeRegex", name: "Рівно один print()", pattern: "print\\s*\\(", flags: "g", min: 1, max: 1 },
          { type: "codeIncludes", name: "Є \\n", value: "\\n", checkRaw: true },
          { type: "codeIncludes", name: "Є \\t", value: "\\t", checkRaw: true },
          { type: "codeIncludes", name: "Математика (90 + 9)", value: "+" },
          { type: "codeRegex", name: "Використано sep=\"\"", pattern: "sep\\s*=\\s*['\"]['\"]", checkRaw: true }
        ]
      },


// ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Спецсимволи, лапки та f-рядки)
      // ==========================================

      {
        title: "🛡️ Екранування лапок (\\)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Битва лапок</h2>
          <p>Що робити, якщо нам потрібно вивести текст, у якому вже є подвійні лапки? Наприклад: <code>Він сказав: "Привіт!"</code>.</p>
          <p>Якщо ми напишемо <code>print("Він сказав: "Привіт!"")</code>, Python заплутається, бо подумає, що рядок закінчився перед словом <i>Привіт</i>, і видасть помилку.</p>
          
          <p><b style="color: #10b981;">Рішення: Екранування</b></p>
          <p>Ми можемо поставити <b style="color: #ef4444;">бекслеш <code>\\</code></b> перед лапками всередині тексту. Це каже комп'ютеру: "Це просто малюнок лапок, а не кінець рядка".</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Він сказав: \\"Привіт!\\"")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Він сказав: "Привіт!"</div>
          
          <div class="theory-alert theory-alert-info">
            💡 <b style="color: #0ea5e9;">Пам'ятай:</b> Зворотний слеш <code>\\</code> не друкується на екрані! Він лише "захищає" символ, який стоїть одразу після нього.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Бібліотечна система має вивести назву книги так, щоб сама назва обов'язково була в подвійних лапках на екрані: <code>Книга "Гаррі Поттер"</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши весь текст у подвійних лапках функції <code style="color: #0ea5e9;">print()</code>. Перед внутрішніми лапками (навколо назви книги) обов'язково постав символ зворотного слеша <code style="color: #0ea5e9;">\\</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Тобі потрібно екранувати ДВІ внутрішні лапки (ту, що відкриває назву, і ту, що закриває).
          </div>
        `,
        hint: `Увесь рядок має бути в подвійних лапках, а лапки навколо назви книги — захищені символом \\.`,
        expected: `Книга "Гаррі Поттер"`,
        tests: [
          { type: "stdoutEquals", name: "Лапки збережено", value: `Книга "Гаррі Поттер"`, normalize: "strict" },
          { type: "codeIncludes", name: "Використано екранування", value: '\\"', checkRaw: true }
        ]
      },

      {
        title: "⚔️ Одинарні vs Подвійні лапки",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Різні лапки рятують життя</h2>
          <p>Є ще один, простіший спосіб обійти конфлікт лапок. Python дозволяє створювати рядки як подвійними <code>"</code>, так і одинарними <code>'</code> лапками.</p>
          <p>Можна взяти весь текст в <b style="color: #3b82f6;">одинарні</b>, а всередині спокійно писати <b style="color: #10b981;">подвійні</b> (або навпаки)! Тоді екранування <code>\\</code> взагалі не потрібне.</p>
          
          <p><b>Приклад коду (одинарні зовні, подвійні всередині):</b></p>
          <div class="code-box">print('Він сказав: "Привіт!"')</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Він сказав: "Привіт!"</div>
          
          <p style="margin-top: 15px;">Або якщо в тексті є апостроф (який є одинарною лапкою), робимо навпаки:</p>
          <div class="code-box">print("I'm playing Minecraft")</div>
          <div class="output-box">I'm playing Minecraft</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести складне англійське речення, де є і апостроф, і подвійні лапки: <code>It's a "magic" trick</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай правильні зовнішні лапки (або екранування), щоб комп'ютер не заплутався і зміг вивести текст без синтаксичної помилки.
          </div>
        `,
        hint: `Тут є і апостроф, і подвійні лапки. Обери одинарні лапки зовні й заекрануй апостроф, АБО подвійні зовні й заекрануй внутрішні подвійні.`,
        expected: `It's a "magic" trick`,
        tests: [
          { type: "stdoutEquals", name: "Всі знаки на місці", value: `It's a "magic" trick`, normalize: "strict" }
        ]
      },

      {
        title: "↩️ Перенос рядка (\\n)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">\\n — невидимий Enter</h2>
          <p>Щоб вивести кілька рядків тексту, не обов'язково писати кілька команд <code>print()</code>. Можна використати спеціальний спецсимвол <b style="color: #ef4444;">\\n</b> (від англ. <i>new line</i>).</p>
          <p>Коли Python бачить <code>\\n</code> всередині тексту, він не друкує ці дві літери, а просто <b style="color: #3b82f6;">переводить курсор на новий рядок</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Рядок 1\\nРядок 2")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Рядок 1<br>Рядок 2</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система має вивести стовпчик із трьох слів: "Один", "Два", "Три". Кожне слово має бути на новому рядку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використовуючи лише ОДНУ команду <code style="color: #0ea5e9;">print()</code>, напиши ці слова одним суцільним текстом. Замість пробілів між словами встав спецсимвол <code style="color: #0ea5e9;">\\n</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не став пробіл після <code>\\n</code>, інакше друге і третє слово надрукуються зі зсувом праворуч!
          </div>
        `,
        hint: `Усе має бути в одному рядку коду: print("Один\\nДва\\nТри")`,
        expected: `Один\nДва\nТри`,
        tests: [
          { type: "stdoutEquals", name: "Вивід у три рядки", value: "Один\nДва\nТри", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeIncludes", name: "Використано \\n", value: "\\n", checkRaw: true }
        ]
      },

      {
        title: "📏 Табуляція (\\t)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Створення колонок</h2>
          <p>Символ <b style="color: #3b82f6;">\\t</b> (від англ. <i>tab</i>) робить великий відступ-стрибок. Це швидкий спосіб розсунути слова на широку відстань і зробити рівні колонки.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Ім'я\\tВік\\tКлас")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Ім'я    Вік    Клас</div>
        `,
        desc: `
          <div class="task-main">
            <p>Тобі потрібно створити рівний заголовок для таблиці лідерів з трьох слів: "Гравець", "Рівень" та "Бал".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши їх в одній команді виводу. Замість пробілів між словами використай спецсимвол табуляції <code style="color: #0ea5e9;">\\t</code>.
          </div>
        `,
        hint: `У тебе має бути один рядок тексту, а великі відступи між словами зробить спецсимвол табуляції: "Гравець\\tРівень\\tБал"`,
        expected: `Гравець\tРівень\tБал`,
        tests: [
          { type: "stdoutEquals", name: "Табуляція працює", value: "Гравець\tРівень\tБал", normalize: "strict" },
          { type: "codeIncludes", name: "Використано \\t", value: "\\t", checkRaw: true }
        ]
      },

      {
        title: "🎮 Практика: Хрестики-нулики",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Комбінуємо \\n та \\t</h2>
          <p>Що буде, якщо використати і перенос, і табуляцію в одному тексті? Ми отримаємо справжню 2D-сітку.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй ігрове поле для хрестиків-нуликів розміром 2х2. У першому рядку стоять X та O. У другому рядку стоять O та X.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай <b>ОДИН</b> <code style="color: #0ea5e9;">print()</code>. Між літерами в одному рядку має бути табуляція <code style="color: #0ea5e9;">\\t</code>, а між рядками — перенос <code style="color: #0ea5e9;">\\n</code>. Жодних пробілів!
          </div>

          <div class="task-note">
            <b>Важливо:</b> Регістр літер має значення (використовуй великі X та O).
          </div>
        `,
        hint: `Збери поле в одному print(), використовуючи тільки символи, \\t і \\n. Наприклад: "X\\tO\\n..."`,
        expected: `X\tO\nO\tX`,
        tests: [
          { type: "stdoutEquals", name: "Сітка 2х2 намальована", value: "X\tO\nO\tX", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeIncludes", name: "Є \\t", value: "\\t", checkRaw: true },
          { type: "codeIncludes", name: "Є \\n", value: "\\n", checkRaw: true }
        ]
      },

      {
        title: "📝 Потрійні лапки (Блоки тексту)",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пишемо як у блокноті</h2>
          <p>Писати купу <code>\\n</code> для довгих текстів дуже незручно. На щастя, у Python є магія — <b style="color: #10b981;">потрійні лапки <code>"""</code></b> (або <code>'''</code>).</p>
          <p>Усе, що знаходиться між потрійними лапками, зберігає свої переноси рядків і пробіли автоматично. Ти можеш просто натискати клавішу Enter прямо в коді.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("""Це перший рядок.
А це другий.
      А це третій з відступом!""")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Це перший рядок.<br>А це другий.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;А це третій з відступом!</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b style="color: #f59e0b;">Увага:</b> У потрійних лапках зберігаються і переноси, і пробіли. Якщо випадково поставиш пробіл на початку рядка, він теж надрукується.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Твоя задача — намалювати ASCII-квадрат із зірочок 3х3, але всередині він має бути порожнім (там пробіл).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай потрійні лапки <code style="color: #0ea5e9;">"""</code>. Перший рядок: три зірочки. Другий рядок: зірочка, пробіл, зірочка. Третій рядок: три зірочки. Натискай клавішу Enter прямо в коді для переносу рядків.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не використовуй спецсимвол <code style="color: #0ea5e9;">\\n</code>. Стеж, щоб на початку рядків у коді не було випадкових "відступів".
          </div>
        `,
        hint: `Відкрий print("""), намалюй квадрат на трьох рядках, і закрий """)`,
        expected: `***\n* *\n***`,
        tests: [
          { type: "stdoutEquals", name: "Квадрат намальовано", value: "***\n* *\n***", normalize: "strict" },
          { type: "codeIncludes", name: "Є потрійні лапки", value: '"""', checkRaw: true }
        ]
      },

      {
        title: "🎨 Множення тексту для дизайну",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Малюємо розділювачі</h2>
          <p>У Python текст можна <b style="color: #3b82f6;">множити на число</b>. Якщо написати <code>"-" * 10</code>, Python надрукує 10 дефісів підряд.</p>
          <p>Це супер-корисно для створення красивих ліній у звітах або візуальних рамках.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("=" * 15)<br>print("ГОЛОВНЕ МЕНЮ")<br>print("=" * 15)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">===============<br>ГОЛОВНЕ МЕНЮ<br>===============</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести суцільну лінію-розділювач, яка складається з рівно 20 символів решітки (#).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай математичне множення тексту на число <code style="color: #0ea5e9;">*</code> всередині функції виводу.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не пиши 20 решіток вручну у лапках! Навчи комп'ютер малювати їх за тебе.
          </div>
        `,
        hint: `Створи лінію через множення одного символу на число: print("#" * 20)`,
        expected: `####################`,
        tests: [
          { type: "stdoutEquals", name: "Лінію намальовано", value: "####################", normalize: "strict" },
          { type: "codeRegex", name: "Лінію створено множенням # на 20", pattern: "[\'\"]#?[\'\"]\\s*\\*\\s*20", checkRaw: true }
        ]
      },

      {
        title: "🔮 Вступ до f-рядків",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Магія фігурних дужок (f-strings)</h2>
          <p>Досі, щоб з'єднати текст і математику, ми ставили коми: <code>print("Результат:", 5 + 5)</code>. Це працює, але додає зайві пробіли і виглядає розірвано.</p>
          <p>Сучасний Python має <b style="color: #10b981;">f-рядки (форматовані рядки)</b>. Якщо ПЕРЕД лапками поставити літеру <b style="color: #ef4444;"><code>f</code></b>, то всередині тексту можна використовувати фігурні дужки <code>{}</code>. Все, що в дужках — Python сприймає як код і обчислює.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Якщо до 5 додати 2, буде {5 + 2}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Якщо до 5 додати 2, буде 7</div>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b><br>
            ✔ Літера <code>f</code> має стояти впритул до лапок, без пробілу: <code style="color: #0ea5e9;">f"текст"</code>.<br>
            ✔ Усередині фігурних дужок <code>{}</code> пишеться код.<br>
            ✔ Якщо забути літеру <code>f</code>, Python надрукує дужки як звичайний текст.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести фінальний рахунок гравця: <code>Рахунок: 200 балів</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай <b>f-рядок</b>. Число 200 не пиши вручну! Python сам має помножити <code style="color: #0ea5e9;">100 * 2</code> всередині фігурних дужок і вивести готовий результат.
          </div>
        `,
        hint: `Тут має бути саме f-рядок: текст зовні, а обчислення 100 * 2 — всередині фігурних дужок.`,
        expected: `Рахунок: 200 балів`,
        tests: [
          { type: "stdoutEquals", name: "Правильний результат", value: "Рахунок: 200 балів", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeIncludes", name: "Є фігурні дужки", value: "{", checkRaw: true }
        ]
      },

      {
        title: "🧮 Практика: f-рядки та формули",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вбудований калькулятор</h2>
          <p>Ти можеш писати будь-які складні математичні формули прямо всередині фігурних дужок f-рядка. Це робить код набагато чистішим і зрозумілішим.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система проектувальника обчислює площу: <code>Площа кімнати 5х4 дорівнює 20 кв.м.</code></p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Число 20 має бути обчислене всередині f-рядка як математична дія <code style="color: #0ea5e9;">5 * 4</code>. Не пиши число 20 вручну!
          </div>
        `,
        hint: `Нехай Python сам порахує 5 * 4 всередині фігурних дужок f-рядка.`,
        expected: `Площа кімнати 5х4 дорівнює 20 кв.м.`,
        tests: [
          { type: "stdoutEquals", name: "Виведено з обчисленням", value: "Площа кімнати 5х4 дорівнює 20 кв.м.", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Є обчислення {5 * 4}", pattern: "\\{\\s*5\\s*\\*\\s*4\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "⚙️ Кілька обчислень в f-рядку",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Безліч дужок</h2>
          <p>В одному f-рядку можна використовувати скільки завгодно фігурних дужок з різними обчисленнями. Це робить код дуже компактним.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"HP: {100-20}, MP: {50+10}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">HP: 80, MP: 60</div>
        `,
        desc: `
          <div class="task-main">
            <p>Магазин виводить щоденну статистику: <code>Всього: 100, Продано: 20, Залишок: 80</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цей текст як єдиний f-рядок. Число 80 має обчислюватись як <code style="color: #0ea5e9;">100 - 20</code> прямо в дужках <code style="color: #0ea5e9;">{}</code>.
          </div>
        `,
        hint: `Число 80 тут повинно з’явитися з обчислення {100 - 20}, а не бути надрукованим готовим.`,
        expected: `Всього: 100, Продано: 20, Залишок: 80`,
        tests: [
          { type: "stdoutEquals", name: "Математика в рядку працює", value: "Всього: 100, Продано: 20, Залишок: 80", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Є обчислення {100 - 20}", pattern: "\\{\\s*100\\s*-\\s*20\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "🌪️ F-рядок + Спецсимволи",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Суперкомбо</h2>
          <p>F-рядки чудово дружать зі спецсимволами типу <code>\\n</code> або <code>\\t</code>. Ти можеш робити багаторядкові звіти з обчисленнями в одному <code>print()</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Level:\\t{5+1}\\nScore:\\t{10*10}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Level:  6<br>Score:  100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи звіт гравця у два рядки. На першому: <code>Base: 50</code>, на другому: <code>Buff: 60</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай ОДИН <b>f-рядок</b> та спецсимвол переносу <code style="color: #0ea5e9;">\\n</code>. Число 60 обчисли в фігурних дужках як <code style="color: #0ea5e9;">50 + 10</code>.
          </div>
        `,
        hint: `Поєднай f-рядок і \\n: перший рядок — готовий текст, другий — текст з обчисленням.`,
        expected: `Base: 50\nBuff: 60`,
        tests: [
          { type: "stdoutEquals", name: "Звіт сформовано", value: "Base: 50\nBuff: 60", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeIncludes", name: "Є перенос \\n", value: "\\n", checkRaw: true },
          { type: "codeRegex", name: "Є обчислення {50 + 10}", pattern: "\\{\\s*50\\s*\\+\\s*10\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "🔁 Множення всередині f-рядка",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Множення тексту... в дужках!</h2>
          <p>Ми знаємо, що <code>"*" * 5</code> дає п'ять зірочок. І ми знаємо, що в <code>{}</code> можна писати будь-який код. А отже, ми можемо малювати символи прямо всередині f-рядка.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Рейтинг: {'*' * 3}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Рейтинг: ***</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b style="color: #f59e0b;">Увага:</b> Якщо f-рядок зовні має подвійні лапки, всередині фігурних дужок зручно використовувати одинарні (або навпаки), щоб не виникало конфлікту лапок.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Створи анімацію процесу завантаження: <code>Loading: ........</code> (8 крапок).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи ці 8 крапок шляхом математичного множення тексту <code style="color: #0ea5e9;">'.' * 8</code> прямо всередині фігурних дужок f-рядка.
          </div>
        `,
        hint: `Крапки мають з’явитися з множення тексту всередині f-рядка.`,
        expected: `Loading: ........`,
        tests: [
          { type: "stdoutEquals", name: "Крапки згенеровано", value: "Loading: ........", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Є множення {'.' * 8}", pattern: "\\{\\s*['\"]\\.['\"]\\s*\\*\\s*8\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Серверний лог",
        xp: 280,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: \\n, \\t та множення</h2>
          <p>Час перевірити, чи вмієш ти комбінувати різні інструменти форматування без використання f-рядків.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Згенеруй серверний лог із трьох рядків: повідомлення про помилку, лінія-розділювач та статус системи.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1) Використай ОДИН <code style="color: #0ea5e9;">print()</code>.<br>
            2) Між словами <code>ERROR</code> і <code>404</code> (а також <code>System</code> і <code>Down</code>) постав табуляцію <code style="color: #0ea5e9;">\\t</code>.<br>
            3) Рядок посередині отримай множенням зірочки: <code style="color: #0ea5e9;">"*" * 20</code>.<br>
            4) Використай параметр <code style="color: #0ea5e9;">sep="\\n"</code> для розбиття цих трьох аргументів на рядки.
          </div>
        `,
        hint: `Збери три частини логу (верхній рядок, лінію і нижній рядок) через кому в одному print(), а в кінці додай sep="\\n".`,
        expected: `ERROR\t404\n********************\nSystem\tDown`,
        tests: [
          { type: "stdoutEquals", name: "Лог ідеальний", value: "ERROR\t404\n********************\nSystem\tDown", normalize: "strict" },
          { type: "codeRegex", name: "Один print", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Є sep=\\n", pattern: "sep\\s*=\\s*['\\\"]\\\\n['\\\"]", checkRaw: true },
          { type: "codeRegex", name: "Є множення '*' * 20", pattern: "['\\\"]\\*['\\\"]\\s*\\*\\s*20", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: F-рядок у бою",
        xp: 300,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Обчислення в f-рядку</h2>
          <p>У справжніх іграх урон часто обчислюється динамічно. Перевіримо, як ти справишся з математикою всередині тексту.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма виводить бойовий звіт: <code>Удар! База: 15, Критичний: 30, Залишок HP: 70</code>.</p>
          </div>
        
          <div class="task-condition">
            <b>Умови:</b><br>
            1) Використай ОДИН <b>f-рядок</b>.<br>
            2) Число 30 обчисли як <code style="color: #0ea5e9;">15 * 2</code>.<br>
            3) Число 70 обчисли як <code style="color: #0ea5e9;">100 - 30</code>.
          </div>
        `,
        hint: `У цьому рядку важливо не просто вивести числа, а обчислити їх прямо всередині фігурних дужок f-рядка.`,
        expected: `Удар! База: 15, Критичний: 30, Залишок HP: 70`,
        tests: [
          { type: "stdoutEquals", name: "Обчислено правильно", value: "Удар! База: 15, Критичний: 30, Залишок HP: 70", normalize: "strict" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Є обчислення {15 * 2}", pattern: "\\{\\s*15\\s*\\*\\s*2\\s*\\}", checkRaw: true },
          { type: "codeRegex", name: "Є обчислення {100 - 30}", pattern: "\\{\\s*100\\s*-\\s*30\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Рамка для титулу",
        xp: 320,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Дизайн та екранування</h2>
          <p>Створимо красиву рамку для титулу, використовуючи різні інструменти форматування разом.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Оформи титул гравця "Python Master" у красиву рамку з двох ліній (по 20 знаків дорівнює).</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1) Використай ОДИН <code style="color: #0ea5e9;">print()</code>.<br>
            2) Передай 3 аргументи через кому: множення <code style="color: #0ea5e9;">"=" * 20</code>, текст <code>"Python Master"</code> (з подвійними лапками всередині) та знову множення.<br>
            3) Використай <code style="color: #0ea5e9;">sep="\\n"</code> для переносу рядків.
          </div>
        `,
        hint: `Середній рядок має містити подвійні лапки як частину тексту. Скористайся одинарними лапками зовні, щоб обійти конфлікт.`,
        expected: `====================\n"Python Master"\n====================`,
        tests: [
          { type: "stdoutEquals", name: "Рамка ідеальна", value: "====================\n\"Python Master\"\n====================", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=\\s*['\"]\\\\n['\"]", checkRaw: true },
          { type: "codeRegex", name: "Є множення '=' * 20", pattern: "['\\\"]=['\\\"]", checkRaw: false }
        ]
      },

      // ===============================
      // 🟡 MIDDLE BOSS
      // ===============================
      {
        title: "🐉 БОС (Middle): Картка персонажа",
        xp: 500,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Бос: Майстер форматування</h2>
          <p>Ти вже вмієш малювати рамки, використовувати табуляцію та вбудовувати математику у текст за допомогою f-рядків.</p>
          <p>Тепер покажи свій максимум.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Згенеруй картку персонажа. У ній є рамка з 12 зірочок, ім'я в лапках і підрахований досвід.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1) Використай <b>ОДИН</b> <code style="color: #0ea5e9;">print()</code> та <b>ОДИН f-рядок</b> (без використання <code>sep</code>).<br>
            2) Рамка зверху і знизу — це множення <code style="color: #0ea5e9;">'*' * 12</code>, записане всередині фігурних дужок.<br>
            3) Слово <code>Neo</code> має бути в подвійних лапках.<br>
            4) Рядки розділяються спецсимволом <code style="color: #0ea5e9;">\\n</code> прямо в тексті.<br>
            5) Між словами у колонках стоїть табуляція <code style="color: #0ea5e9;">\\t</code>.<br>
            6) Число <code>150</code> має бути обчислене в дужках як <code style="color: #0ea5e9;">100 + 50</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Уважно слідкуй за кожним символом і лапками. Цей бос не пробачає зайвих пробілів!
          </div>
        `,
        hint: `Збери все разом: один f-рядок, рамка з множення в { }, \\n, \\t, лапки в тексті й одне обчислення.`,
        expected: `************\nName\t"Neo"\nXP\t150\n************`,
        tests: [
          { type: "stdoutEquals", name: "Таблиця ідеальна", value: "************\nName\t\"Neo\"\nXP\t150\n************", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Це один f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeIncludes", name: "Є \\n", value: "\\n", checkRaw: true },
          { type: "codeIncludes", name: "Є \\t", value: "\\t", checkRaw: true },
          { type: "codeRegex", name: "Є обчислення {100 + 50}", pattern: "\\{\\s*100\\s*\\+\\s*50\\s*\\}", checkRaw: true },
          { type: "codeRegex", name: "Є множення '*' * 12", pattern: "['\\\"]\\*['\\\"]\\s*\\*\\s*12", checkRaw: true }
        ]
      },
// ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Просунуте форматування та f-рядки)
      // ==========================================

      {
        title: "📐 Вирівнювання по центру",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Керування простором</h2>
          <p>Усередині f-рядків можна не лише обчислювати математику, а й <b style="color: #3b82f6;">вирівнювати текст</b>, ніби в невидимій таблиці. Для цього після значення ставиться двокрапка <code>:</code> і спеціальний символ.</p>
          
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li><code>:^10</code> — вирівняти по <b>центру</b> на загальну ширину 10 символів.</li>
          </ul>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"|{'Python':^10}|")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">|  Python  |</div>
          
          <div class="theory-alert theory-alert-info">
            💡 <b style="color: #0ea5e9;">Підказка:</b> Можна навіть вказати символ, яким заповнити порожнечу! Наприклад, <code style="color: #0ea5e9;">{'_Neo_':-^10}</code> виведе <code>--_Neo_---</code>.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Система генерує меню для терміналу. Заголовок " MENU " має бути відцентрований, а простір навколо нього заповнений знаками дорівнює (=).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай f-рядок. Слово <code style="color: #0ea5e9;">' MENU '</code> (з пробілами по краях) має бути вирівняне по центру на загальну ширину 14 символів, а порожнеча заповнена символом <code style="color: #0ea5e9;">=</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Усе форматування пишеться всередині фігурних дужок після двокрапки.
          </div>
        `,
        hint: `У фігурних дужках напиши: {' MENU ':=^14}`,
        expected: `==== MENU ====`,
        tests: [
          { type: "stdoutEquals", name: "Заголовок рівний", value: "==== MENU ====", normalize: "strict" },
          { type: "codeRegex", name: "Використано центрування (^)", pattern: "\\^14", checkRaw: true },
          { type: "codeRegex", name: "Заповнювач (=)", pattern: "=\\^", checkRaw: true }
        ]
      },

      {
        title: "➡️ Колонки: вліво і вправо",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рівні стовпчики без табуляції</h2>
          <p>Табуляція <code>\\t</code> не завжди ідеально вирівнює текст, якщо слова різної довжини. Тут на допомогу приходять "стрілки" у f-рядках:</p>
          
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li><code>:&lt;10</code> — притиснути <b>ліворуч</b> (залишити пробіли справа).</li>
            <li><code>:&gt;10</code> — притиснути <b>праворуч</b> (залишити пробіли зліва).</li>
          </ul>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"{'HP':&lt;5}|{100:&gt;4}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">HP   | 100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Таблиця лідерів потребує ідеальних стовпчиків. Ім'я гравця має бути притиснуте ліворуч, а його бали — праворуч.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай f-рядок. Ім'я <code style="color: #0ea5e9;">'Neo'</code> має бути притиснуте ліворуч на ширину 10 символів, потім іде символ розділювача <code style="color: #0ea5e9;">|</code>, а число <code style="color: #0ea5e9;">999</code> притиснуте праворуч на ширину 5 символів.
          </div>
        `,
        hint: `Твій код має бути таким: print(f"{'Neo':<10}|{999:>5}")`,
        expected: `Neo       |  999`,
        tests: [
          { type: "stdoutEquals", name: "Колонки вирівняні", value: "Neo       |  999", normalize: "strict" },
          { type: "codeRegex", name: "Ліве вирівнювання (<10)", pattern: "<10", checkRaw: true },
          { type: "codeRegex", name: "Праве вирівнювання (>5)", pattern: ">5", checkRaw: true }
        ]
      },

      {
        title: "💰 Фінансовий формат",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Красиві гроші та дроби</h2>
          <p>Коли ми працюємо з великими числами або цінами, вивід <code>1000000.333333</code> виглядає жахливо. F-рядки вміють робити це красиво:</p>
          
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li><code>:,</code> — додає <b>коми</b> між тисячами (1,000,000).</li>
            <li><code>:.2f</code> — округлює дріб до <b>2 знаків</b> після крапки (float).</li>
            <li>Можна комбінувати: <code>:,.2f</code></li>
          </ul>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Ціна: {1500.777:,.2f} $")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Ціна: 1,500.78 $</div>
        `,
        desc: `
          <div class="task-main">
            <p>Банківський додаток має виводити великі суми так, щоб їх було зручно читати: з розділювачами тисяч і копійками.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Відформатуй число <code style="color: #0ea5e9;">2500.5</code> усередині f-рядка. Застосуй до нього формат <code style="color: #0ea5e9;">:,.2f</code>, щоб Python сам додав кому для тисяч і нуль у кінці. Додай текст "Баланс: " перед числом і " ₴" після нього.
          </div>
        `,
        hint: `Твій код має бути таким: print(f"Баланс: {2500.5:,.2f} ₴")`,
        expected: `Баланс: 2,500.50 ₴`,
        tests: [
          { type: "stdoutEquals", name: "Формат ідеальний", value: "Баланс: 2,500.50 ₴", normalize: "strict" },
          { type: "codeRegex", name: "Використано форматування", pattern: ":,\\.2f", checkRaw: true },
          { type: "codeIncludes", name: "Число 2500.5", value: "2500.5", checkRaw: true }
        ]
      },

      {
        title: "📈 Форматування відсотків",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дроби стають відсотками</h2>
          <p>Щоб перетворити математичний дріб (наприклад, 0.75) на красиві відсотки (75%), у f-рядках є спеціальний формат <b style="color: #3b82f6;">%</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Завантажено: {1/2:.1%}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Завантажено: 50.0%</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b style="color: #f59e0b;">Увага:</b> <code style="color: #0ea5e9;">.1%</code> означає "один знак після крапки". Якщо написати просто <code style="color: #0ea5e9;">.0%</code>, дробової частини не буде взагалі.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Індикатор прогресу рахує співвідношення виконаних завдань (7 з 8). Треба вивести цей прогрес у відсотках.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Всередині f-рядка поділи <code style="color: #0ea5e9;">7 / 8</code> та відформатуй результат як відсоток з одним знаком після крапки (<code style="color: #0ea5e9;">:.1%</code>). Перед відсотками має бути слово "Прогрес: ".
          </div>
        `,
        hint: `У фігурних дужках напиши обчислення 7/8, а після нього двокрапку і формат .1%`,
        expected: `Прогрес: 87.5%`,
        tests: [
          { type: "stdoutEquals", name: "Відсотки виведено", value: "Прогрес: 87.5%", normalize: "strict" },
          { type: "codeRegex", name: "Математика (7/8)", pattern: "7\\s*/\\s*8", checkRaw: true },
          { type: "codeRegex", name: "Формат %", pattern: ":\\.1%", checkRaw: true }
        ]
      },

      {
        title: "🎛️ Динамічна ширина",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вкладені фігурні дужки</h2>
          <p>Найсильніша магія f-рядків полягає в тому, що ти можеш використовувати математику <b>навіть для налаштування форматування</b>! Для цього фігурні дужки вкладаються одна в одну.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"|{'Data':^{5+5}}|")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">|   Data   |</div>
        `,
        desc: `
          <div class="task-main">
            <p>Ширина рамки навколо слова BOSS залежить від математичної формули (5 помножити на 2). Рамка має бути створена автоматично.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай вирівнювання по центру <code style="color: #0ea5e9;">^</code> із заповнювачем <code style="color: #0ea5e9;">*</code> для слова <code style="color: #0ea5e9;">'BOSS'</code>. Але ширину (кількість символів) задай через математичне обчислення <code style="color: #0ea5e9;">{5 * 2}</code> прямо в налаштуваннях формату.
          </div>
        `,
        hint: `Твій код: print(f"{'BOSS':*^{5 * 2}}")`,
        expected: `***BOSS***`,
        tests: [
          { type: "stdoutEquals", name: "Рамка рівна", value: "***BOSS***", normalize: "strict" },
          { type: "codeIncludes", name: "Вкладені дужки для ширини", value: "{5 * 2}", checkRaw: true }
        ]
      },

      {
        title: "💻 Двійковий та Hex формат",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Мова машин</h2>
          <p>Програмістам часто треба перетворювати звичайні числа у шістнадцятковий код (наприклад, для кольорів) або у двійковий.</p>
          
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li><code>:x</code> — конвертує число у шістнадцяткове (hex).</li>
            <li><code>:b</code> — конвертує число у двійкове (binary).</li>
            <li><code>:04x</code> — додає нулі на початку, щоб довжина була рівно 4 символи.</li>
          </ul>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Color: #{255:x}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Color: #ff</div>
        `,
        desc: `
          <div class="task-main">
            <p>Системний адміністратор читає логи пам'яті. Звичайні числа потрібно конвертувати у машинний код прямо під час друку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> В одному f-рядку виведи число <code style="color: #0ea5e9;">255</code> у форматі hex з нулями на початку (<code style="color: #0ea5e9;">:04x</code>), а число <code style="color: #0ea5e9;">10</code> — у двійковому форматі (<code style="color: #0ea5e9;">:b</code>). Не пиши ці відповіді вручну!
          </div>

          <div class="task-note">
            <b>Важливо:</b> Формат виводу має бути: <code>Mem: 0x00ff, Mask: 1010</code>.
          </div>
        `,
        hint: `Твій код: print(f"Mem: 0x{255:04x}, Mask: {10:b}")`,
        expected: `Mem: 0x00ff, Mask: 1010`,
        tests: [
          { type: "stdoutEquals", name: "Системний лог згенеровано", value: "Mem: 0x00ff, Mask: 1010", normalize: "strict" },
          { type: "codeRegex", name: "Формат hex", pattern: ":04x", checkRaw: true },
          { type: "codeRegex", name: "Формат binary", pattern: ":b", checkRaw: true },
          { type: "codeIncludes", name: "Число 255", value: "255", checkRaw: true }
        ]
      },

      {
        title: "🛡️ Сирі рядки (r-рядки)",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вимкнення магії</h2>
          <p>Ти вже знаєш, що <code>\\n</code> і <code>\\t</code> роблять магію (перенос і відступ). Але що, якщо нам треба надрукувати шлях до файлу на Windows: <code>C:\\new\\test.txt</code>?</p>
          <p>Python побачить <code>\\n</code> і <code>\\t</code> та зламає рядок! Щоб цього уникнути, можна ставити подвійні слеші <code>\\\\</code>, АБО використати <b style="color: #10b981;">сирий рядок (Raw string)</b>.</p>
          <p>Просто постав літеру <b style="color: #ef4444;"><code>r</code></b> перед лапками, і Python ігноруватиме всі спецсимволи!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(r"C:\\new\\test.txt")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">C:\\new\\test.txt</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма виводить шлях до системної папки на операційній системі Windows. Слеші не повинні сприйматися як спецсимволи.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Надрукуй текст <code style="color: #0ea5e9;">C:\\ninja\\tricks\\new_file.py</code> використовуючи r-рядок.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Використовувати екранування (подвійні слеші <code>\\\\</code>) заборонено! Тільки сирий рядок (префікс <code>r</code>).
          </div>
        `,
        hint: `Твій код: print(r"C:\\ninja\\tricks\\new_file.py")`,
        expected: `C:\\ninja\\tricks\\new_file.py`,
        tests: [
          { type: "stdoutEquals", name: "Шлях виведено", value: "C:\\ninja\\tricks\\new_file.py", normalize: "strict" },
          { type: "codeRegex", name: "Використано r-рядок", pattern: "r['\"]", checkRaw: true },
          { type: "codeRegex", name: "Слеші не екрановано", pattern: "\\\\\\\\", flags: "g", max: 0, checkRaw: true }
        ]
      },

      {
        title: "🔄 Перезапис рядка (\\r)",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Анімація завантаження</h2>
          <p>Крім <code>\\n</code> та <code>\\t</code> є ще один крутий спецсимвол: <b style="color: #3b82f6;">\\r</b> (повернення каретки). Він повертає курсор на <b>самий початок поточного рядка</b>, не переходячи на новий.</p>
          <p>Це дозволяє "перезаписувати" текст на екрані, створюючи таймери або індикатори завантаження!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Loading...", end="")<br>print("\\rDone!     ")</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b style="color: #f59e0b;">Увага:</b> Оскільки комп'ютер дуже швидкий, слово "Loading..." миттєво заміниться на "Done!". Пробіли в кінці слова "Done!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" потрібні, щоб затерти зайві літери від "Loading...".
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Імітація завантаження! Спочатку на екрані з'являється "Wait...", а потім на тому ж самому місці його перекриває "Success!".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Перший <code style="color: #0ea5e9;">print()</code> виводить <code style="color: #0ea5e9;">Wait...</code> з відключеним переносом рядка (<code style="color: #0ea5e9;">end=""</code>). Другий містить символ повернення каретки <code style="color: #0ea5e9;">\\r</code> і текст <code style="color: #0ea5e9;">Success!</code>.
          </div>
        `,
        hint: `У першому print напиши "Wait...", end="". У другому: "\\rSuccess!". Хоч у терміналі залишиться тільки Success!, наша система перевірить твій код.`,
        expected: `Wait...\rSuccess!`,
        tests: [
          { type: "stdoutEquals", name: "Перезапис відпрацював", value: "Wait...\rSuccess!", normalize: "strict" },
          { type: "codeRegex", name: "Два print()", pattern: "print\\s*\\(", flags: "g", min: 2 },
          { type: "codeIncludes", name: "Використано \\r", value: "\\r", checkRaw: true }
        ]
      },

      {
        title: "🧩 Багаторядковий f-рядок",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Масивні блоки з логікою</h2>
          <p>Ти вже знаєш про потрійні лапки <code>"""</code>. Якщо додати до них літеру <b style="color: #ef4444;"><code>f</code></b>, ти отримаєш найпотужніший інструмент для створення HTML-сторінок, SQL-запитів або великих звітів!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"""
&lt;h1&gt;{10*10}&lt;/h1&gt;
&lt;p&gt;Результат&lt;/p&gt;
""")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Генератор віршів складає рядки з математикою. Все має бути написано в одному блоці.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай ОДИН f-рядок з потрійними лапками. На першому рядку має бути текст <code style="color: #0ea5e9;">2 плюс 2</code>, на другому — слово <code style="color: #0ea5e9;">дорівнює </code> і результат обчислення <code style="color: #0ea5e9;">{2+2}</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Ти не маєш використовувати <code>\\n</code>. Перенос рядка зроби просто клавішею Enter всередині потрійних лапок.
          </div>
        `,
        hint: `Відкрий f""" і натисни Enter. Напиши "2 плюс 2", знову Enter, "дорівнює {2+2}", і закрий потрійні лапки.`,
        expected: `2 плюс 2\nдорівнює 4`,
        tests: [
          { type: "stdoutEquals", name: "Багаторядковий текст", value: "2 плюс 2\nдорівнює 4", normalize: "strict" },
          { type: "codeRegex", name: "Багаторядковий f-рядок", pattern: "f['\"]{3}", checkRaw: true },
          { type: "codeIncludes", name: "Обчислення {2+2}", value: "2+2", checkRaw: true },
          { type: "codeRegex", name: "Без \\n", pattern: "\\\\n", flags: "g", max: 0, checkRaw: true }
        ]
      },

      {
        title: "🔢 Доповнення нулями",
        xp: 220,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Стандартизація довжини</h2>
          <p>Іноді нам треба виводити номери квитків, ID користувачів або рахунки так, щоб вони мали однакову довжину. Наприклад, не <code>7</code>, а <code>00007</code>.</p>
          <p>У f-рядках для цього достатньо написати <b style="color: #10b981;">0</b> і загальну ширину після двокрапки.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Квиток: {42:05}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Квиток: 00042</div>
        `,
        desc: `
          <div class="task-main">
            <p>База даних зберігає ID користувачів у п'ятизначному форматі. Навіть якщо ID дорівнює 7, він має виглядати як 00007.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Застосуй до числа <code style="color: #0ea5e9;">7</code> формат доповнення нулями до 5 символів (<code style="color: #0ea5e9;">:05</code>) усередині f-рядка. Текст перед числом: <code>Твій ID: </code>.
          </div>
        `,
        hint: `Твій код має бути таким: print(f"Твій ID: {7:05}")`,
        expected: `Твій ID: 00007`,
        tests: [
          { type: "stdoutEquals", name: "ID виведено правильно", value: "Твій ID: 00007", normalize: "strict" },
          { type: "codeRegex", name: "Використано форматування :05", pattern: ":05", checkRaw: true },
          { type: "codeIncludes", name: "Число 7 передано як число", value: "7", checkRaw: true }
        ]
      },

      {
        title: "➕ Обов'язковий знак числа",
        xp: 230,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Показуємо плюси</h2>
          <p>За замовчуванням Python ставить мінус <code>-</code> для від'ємних чисел, але нічого не ставить для додатних. Щоб змусити його завжди показувати знак (навіть плюс), використовуй формат <b style="color: #3b82f6;">:+</b>.</p>
          <p>Це дуже корисно для відображення зміни рейтингу, балів чи фінансів.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(f"Зміна: {50:+}")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Зміна: +50</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець отримав досвід. Система завжди показує знак плюса перед додатними числами для наочності.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Число <code style="color: #0ea5e9;">500</code> має бути відформатоване з обов'язковим показом знака <code style="color: #0ea5e9;">:+</code> всередині f-рядка. Додай текст <code>Отримано: </code> перед числом, і <code> XP</code> після.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не пиши плюс вручну як текст! Змусь Python поставити його автоматично.
          </div>
        `,
        hint: `Твій код має бути таким: print(f"Отримано: {500:+} XP")`,
        expected: `Отримано: +500 XP`,
        tests: [
          { type: "stdoutEquals", name: "Плюс виведено", value: "Отримано: +500 XP", normalize: "strict" },
          { type: "codeRegex", name: "Використано формат :+", pattern: ":\\+", checkRaw: true },
          { type: "codeIncludes", name: "Число 500 без плюса у коді", value: "500", checkRaw: true }
        ]
      },

      {
        title: "🪄 Розпакування зірочкою (*)",
        xp: 240,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Колекції як окремі аргументи</h2>
          <p>Якщо в тебе є список <code>[1, 2, 3]</code>, і ти хочеш вивести його елементи через пробіл або дефіс, не треба писати кожен елемент вручну. Можна поставити зірочку <b style="color: #ef4444;">*</b> перед списком — вона "розпакує" його, ніби ти передав кожен елемент окремо.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print(*[1, 2, 3], sep='-')</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">1-2-3</div>
        `,
        desc: `
          <div class="task-main">
            <p>Масив з трьох чисел (10, 20, 30) треба вивести як окремі елементи, розділені вертикальною рискою.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи список <code style="color: #0ea5e9;">[10, 20, 30]</code> прямо всередині команди виводу. Розпакуй його за допомогою зірочки <code style="color: #0ea5e9;">*</code> і додай параметр <code style="color: #0ea5e9;">sep="|"</code>.
          </div>
        `,
        hint: `Твій код має виглядати так: print(*[10, 20, 30], sep="|")`,
        expected: `10|20|30`,
        tests: [
          { type: "stdoutEquals", name: "Елементи розпаковані", value: "10|20|30", normalize: "strict" },
          { type: "codeRegex", name: "Використано розпакування зірочкою (*)", pattern: "\\*\\s*\\[", checkRaw: true },
          { type: "codeRegex", name: "Використано sep='|'", pattern: "sep\\s*=\\s*['\\\"]\\|['\\\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Фінансовий звіт",
        xp: 350,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Майстерність f-рядків</h2>
          <p>Поєднаємо вирівнювання, розділювачі тисяч та математику, щоб створити професійний звіт.</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">Увага:</b> Коли передаєш кілька f-рядків через кому в один <code>print()</code>, не забувай про параметр <code style="color: #0ea5e9;">sep="\\n"</code>, щоб кожен шматочок звіту був на новому рядку!
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Система формує фінансовий звіт компанії з відцентрованим заголовком, податками та розділювачами.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1) Використай ОДИН <code style="color: #0ea5e9;">print()</code>, передавши 4 аргументи через кому з розділювачем <code style="color: #0ea5e9;">sep="\\n"</code>.<br>
            2) Перший рядок: Заголовок <code style="color: #0ea5e9;">' YEARLY REPORT '</code>, вирівняний по центру на 23 символи із заповнювачем <code style="color: #0ea5e9;">=</code>.<br>
            3) Другий рядок: Текст "Revenue: " та число <code style="color: #0ea5e9;">2500000</code>, відформатоване з комами. Після числа додай <code> $</code>.<br>
            4) Третій рядок: Текст "Tax: " та результат ділення <code style="color: #0ea5e9;">2500000 / 3</code>, відформатований з комами та 2 знаками після крапки. Після числа додай <code> $</code>.<br>
            5) Четвертий рядок: Множення символу <code style="color: #0ea5e9;">"=" * 23</code>.
          </div>
        `,
        hint: `Структура твого print: 1. f-рядок із { ' YEARLY REPORT ':=^23 }. 2. f-рядок з Revenue і {2500000:,}. 3. f-рядок з Tax і діленням {2500000/3:,.2f}. 4. Рядок з '='*23. 5. sep="\\n"`,
        expected: `==== YEARLY REPORT ====\nRevenue: 2,500,000 $\nTax: 833,333.33 $\n=======================`,
        tests: [
          {
            type: "stdoutEquals",
            name: "Звіт ідеальний",
            value: "==== YEARLY REPORT ====\nRevenue: 2,500,000 $\nTax: 833,333.33 $\n=======================",
            normalize: "strict"
          },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Формат :=^23", pattern: ":=\\^23", checkRaw: true },
          { type: "codeRegex", name: "Ділення на 3", pattern: "/\\s*3", checkRaw: true },
          { type: "codeRegex", name: "Параметр sep=\\n", pattern: "sep\\s*=\\s*['\"]\\\\n['\"]", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Дамп пам'яті",
        xp: 380,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Хакерські логи</h2>
          <p>Покажи, як ти вмієш працювати з системними форматами чисел і сирими рядками водночас!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма виводить фейковий лог помилки з системними шляхами (без екранування) та машинним кодом.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1) Використай ОДИН <code style="color: #0ea5e9;">print()</code> з двома аргументами і <code style="color: #0ea5e9;">sep="\\n"</code>.<br>
            2) Перший аргумент — це <b>сирий рядок</b> (<code style="color: #0ea5e9;">r"..."</code>), текст: <code>Error in C:\\Windows\\System32</code>.<br>
            3) Другий аргумент — <b>f-рядок</b>.<br>
            4) В ньому текст <code>Mem[0x</code>, далі число <code style="color: #0ea5e9;">255</code> у форматі hex з 4 цифрами (<code style="color: #0ea5e9;">00ff</code>), далі <code>]: </code> і число <code style="color: #0ea5e9;">170</code> у двійковому форматі.
          </div>
        `,
        hint: `Перший аргумент: r"Error in C:\\Windows\\System32". Другий: f"Mem[0x{255:04x}]: {170:b}". Третій параметр: sep="\\n".`,
        expected: `Error in C:\\Windows\\System32\nMem[0x00ff]: 10101010`,
        tests: [
          { type: "stdoutEquals", name: "Лог ідеальний", value: "Error in C:\\Windows\\System32\nMem[0x00ff]: 10101010", normalize: "strict" },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeRegex", name: "Сирий рядок (r-рядок)", pattern: "r['\"]", checkRaw: true },
          { type: "codeRegex", name: "Формат hex (:04x)", pattern: ":04x", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Звіт адміністратора",
        xp: 400,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Комбінування форматів</h2>
          <p>Час перевірити, як добре ти засвоїв доповнення нулями та форматування знаків.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Згенеруй рядок бази даних з відформатованим ID та обов'язковим знаком для рахунку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай ОДИН f-рядок. Число <code style="color: #0ea5e9;">99</code> має бути доповнене нулями до 5 символів (після тексту <code>ID: </code>). Число <code style="color: #0ea5e9;">500</code> має виводитись із обов'язковим знаком плюса (після тексту <code> | Score: </code>).
          </div>
        `,
        hint: `У перших дужках використай :05, а в других :+`,
        expected: `ID: 00099 | Score: +500`,
        tests: [
          { type: "stdoutEquals", name: "Звіт сформовано ідеально", value: "ID: 00099 | Score: +500", normalize: "strict" },
          { type: "codeRegex", name: "Формат нулів (:05)", pattern: ":05", checkRaw: true },
          { type: "codeRegex", name: "Формат знака (:+)", pattern: ":\\+", checkRaw: true }
        ]
      },

      // ===============================
      // 🔴 SENIOR BOSS
      // ===============================
      {
        title: "🐈 БОС (Senior): Котик-програміст",
        xp: 800,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Абсолютний контроль</h2>
          <p>ASCII-арт — це малювання символами. У таких завданнях кожен пробіл, кожна лапка і кожен бекслеш мають критичне значення.</p>
          <p>Тут неможливо схитрувати. Твоя зброя: потрійні лапки <code style="color: #0ea5e9;">"""</code> або чітке використання <code style="color: #0ea5e9;">\\n</code> та екранування зворотного слеша <code style="color: #0ea5e9;">\\\\</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй котика точно так, як показано нижче (зверни увагу на пробіли перед вушками та лапками!):</p>
<pre style="color: #f59e0b; font-size: 16px;"> /\\_/\\
( o.o )
 &gt; ^ &lt;</pre>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1) Зроби це за допомогою ОДНОГО <code style="color: #0ea5e9;">print()</code>.<br>
            2) У першому рядку (вушка) є пробіл на початку.<br>
            3) Щоб намалювати праве вушко, тобі доведеться заекранувати бекслеш (написати <code style="color: #0ea5e9;">\\\\</code>).<br>
            4) У третьому рядку (лапки) теж є пробіл на початку.<br>
            5) Система працює в режимі <b>STRICT</b> — жодного зайвого чи пропущеного пробілу!
          </div>
        `,
        hint: `Найпростіше використати потрійні лапки """ і намалювати котика на кількох рядках. Але пам'ятай: щоб вивести один \\ у вушку, у коді треба написати \\\\.`,
        expected: ` /\\_/\\\n( o.o )\n > ^ <`,
        tests: [
          {
            type: "stdoutEquals",
            name: "Котик ідеальний",
            value: " /\\_/\\\n( o.o )\n > ^ <",
            normalize: "strict"
          },
          { type: "codeRegex", name: "Один print()", pattern: "print\\s*\\(", flags: "g", max: 1 },
          { type: "codeIncludes", name: "Є подвійний бекслеш (\\\\)", value: "\\\\", checkRaw: true }
        ]
      }
    ]
  };



  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
