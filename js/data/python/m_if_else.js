// js/data/python/m_logic.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_logic",
    title: "Логіка: if, elif, else",
    icon: "ri-git-branch-line",
    color: "#ef4444", // Червоний колір для логіки та розгалужень
    desc: "Вчимо програму приймати рішення! Умови, оператори порівняння та магія відступів.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Основи if/else та відступи)
      // ==========================================

      {
        title: "🚦 Перше рішення (if)",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Як програми думають?</h2>
          <p>Досі наші програми виконували всі команди підряд. Але справжня магія починається, коли програма може <b>обирати</b>, що їй робити залежно від вводу користувача!</p>
          <p>Для цього використовується команда <b style="color: #ef4444;"><code>if</code></b> (з англ. <i>якщо</i>).</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">score = int(input("Бали: "))<br><b style="color: #ef4444;">if</b> score &gt; 50<b style="color: #ef4444;">:</b><br>    print("Ти переміг!")</div>
          
          <p>Комп'ютер дивиться на умову. Якщо вона правдива (True), він виконує код всередині. Якщо ні — просто ігнорує його і йде далі.</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b> В кінці умови ЗАВЖДИ ставиться двокрапка <code>:</code>. Це сигнал для Python, що далі піде блок коду.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Симуляція: програма запитує у гравця кількість монет. Якщо їх більше за 500, вона має його привітати з багатством.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">money = int(input("Монети: "))</code>.<br>Напиши перевірку: <code style="color: #0ea5e9;">if money &gt; 500:</code>. Якщо це так, виведи текст <code style="color: #0ea5e9;">"Ти багатий!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не забудь двокрапку <code>:</code> після умови, а перед <code>print()</code> обов'язково зроби відступ (клавіша Tab або 4 пробіли).
          </div>
        `,
        hint: `Твій код:\nmoney = int(input("Монети: "))\nif money > 500:\n    print("Ти багатий!")`,
        expected: `Монети: 1000\nТи багатий!`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "money\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Правильна умова if", pattern: "if\\s+money\\s*>\\s*500\\s*:" },
          { type: "codeRegex", name: "Є відступ і print", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Ти багатий!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📏 Магія відступів (Indentation)",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Найголовніше правило Python</h2>
          <p>В інших мовах програмування для виділення блоків коду використовують дужки <code>{}</code>. Але в Python використовують <b style="color: #3b82f6;">ВІДСТУПИ</b>.</p>
          <p>Усе, що має відступ ПІСЛЯ <code>if</code>, належить до цієї умови. Як тільки відступ зникає — умова закінчилась, і цей код виконається в будь-якому разі!</p>
          
          <div class="code-box">lvl = int(input("Лвл: "))<br>if lvl &gt; 5:<br>    print("Цей код залежить від if")<br>print("А цей виконається ЗАВЖДИ")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє рівень гравця. Вона видає спеціальний доступ тільки тим, у кого рівень більший за 2. Але в будь-якому разі система має повідомити, що перевірка завершена.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">level = int(input("Рівень: "))</code>.<br>Напиши перевірку <code style="color: #0ea5e9;">if level &gt; 2:</code>. <br>Всередині (з відступом) виведи <code style="color: #0ea5e9;">"Доступ дозволено"</code>. <br>Зовні (БЕЗ відступу, на новому рядку) виведи <code style="color: #0ea5e9;">"Перевірка завершена"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Другий <code>print</code> має починатися з самого краю екрана (без жодного пробілу).
          </div>
        `,
        hint: `if level > 2:\n    print("Доступ дозволено")\nprint("Перевірка завершена")`,
        expected: `Рівень: 5\nДоступ дозволено\nПеревірка завершена`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "level\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Правильна умова", pattern: "if\\s+level\\s*>\\s*2\\s*:" },
          { type: "codeRegex", name: "Відступ для першого print", pattern: "if\\s+level\\s*>\\s*2\\s*:\\s*\\n\\s+print\\s*\\(\\s*['\"]Доступ" },
          { type: "codeRegex", name: "Немає відступу для другого", pattern: "\\nprint\\s*\\(\\s*['\"]Перевірка" }
        ]
      },

      {
        title: "⚖️ Точна рівність (==)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пастка для новачків</h2>
          <p>Що буде, якщо написати <code>if password = 1234:</code>? Програма видасть помилку!</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ЗАПАМ'ЯТАЙ НАЗАВЖДИ:</b><br>
            <code>=</code> (одне дорівнює) — це <b>присвоєння</b>. Воно КЛАДЕ значення в коробку.<br>
            <code>==</code> (два дорівнює) — це <b>порівняння</b>. Воно ПИТАЄ: "чи дорівнює?".
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Симуляція цифрового замка. Програма запитує ПІН-код, і якщо він збігається з секретною комбінацією (777), відчиняє сейф.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">pin = int(input("Пін: "))</code>. Використай умову <code style="color: #0ea5e9;">if pin == 777:</code>, щоб перевірити пароль і вивести текст <code style="color: #0ea5e9;">"Сейф відкрито"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Використай саме подвійне <code>==</code> в умові!
          </div>
        `,
        hint: `Твоя умова має виглядати так: if pin == 777:`,
        expected: `Пін: 777\nСейф відкрито`,
        tests: [
          { type: "codeRegex", name: "Ввід ПІН як int", pattern: "pin\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано подвійне ==", pattern: "if\\s+pin\\s*==\\s*777\\s*:" },
          { type: "codeRegex", name: "Наявність print", pattern: "print\\s*\\(\\s*['\"]Сейф відкрито['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🚫 Нерівність (!=)",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Коли щось іде не так</h2>
          <p>Іноді нам треба виконати код, якщо значення <b style="color: #ef4444;">НЕ ДОРІВНЮЄ</b> чомусь.</p>
          <p>Для цього використовується оператор <b style="color: #3b82f6;"><code>!=</code></b> (знак оклику і дорівнює). Знак оклику в програмуванні часто означає заперечення.</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">status = input("Статус: ")<br>if status != "online":<br>    print("Підключення втрачено!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>У грі гравець обирає клас. Але взяти важкий меч може тільки Воїн. Програма має попередити гравця, якщо його клас не підходить.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">hero = input("Клас: ")</code>. Напиши перевірку: якщо <code style="color: #0ea5e9;">hero != "Воїн"</code>, виведи попередження <code style="color: #0ea5e9;">"Ти не Воїн!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Перевіряй на нерівність саме зі словом "Воїн" (з великої літери).
          </div>
        `,
        hint: `if hero != "Воїн":`,
        expected: `Клас: Маг\nТи не Воїн!`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "hero\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано оператор !=", pattern: "if\\s+hero\\s*!=\\s*['\"]Воїн['\"]\\s*:" },
          { type: "codeRegex", name: "Наявність print", pattern: "print\\s*\\(\\s*['\"]Ти не Воїн!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📉 Менше та Більше (<, >)",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Класична математика</h2>
          <p>Для порівняння чисел ми використовуємо класичні математичні знаки:</p>
          <ul>
            <li><code>&lt;</code> — менше</li>
            <li><code>&gt;</code> — більше</li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>Датчик машини аналізує рівень пального. Якщо залишок критично малий (менше 10 літрів), водій отримує термінове попередження.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">fuel = int(input("Пальне: "))</code>. Якщо кількість пального <b>менша</b> за 10, виведи повідомлення <code style="color: #0ea5e9;">"Бак майже порожній!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Знак <code>&lt;</code> відкривається в бік більшого числа.
          </div>
        `,
        hint: `if fuel < 10:`,
        expected: `Пальне: 5\nБак майже порожній!`,
        tests: [
          { type: "codeRegex", name: "Ввід як число", pattern: "fuel\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Оператор <", pattern: "if\\s+fuel\\s*<\\s*10\\s*:" },
          { type: "codeRegex", name: "Наявність print", pattern: "print\\s*\\(\\s*['\"]Бак майже порожній!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌡️ Більше чи дорівнює (>=)",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Включно з числом</h2>
          <p>Що, якщо нам треба перевірити "Більше АБО дорівнює"? Наприклад, вода кипить рівно при 100 градусах і вище.</p>
          <p>Для цього ми пишемо два знаки підряд: <b style="color: #3b82f6;"><code>&gt;=</code></b> або <b style="color: #3b82f6;"><code>&lt;=</code></b>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Температурний сенсор стежить за водою. Як тільки температура досягає 100 градусів або піднімається вище, він має зафіксувати це.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">temp = int(input("Температура: "))</code>. Якщо температура <b>більше або дорівнює</b> 100, виведи повідомлення <code style="color: #0ea5e9;">"Вода кипить"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Знак <code>=</code> завжди ставиться ПІСЛЯ знака <code>&gt;</code>. Запис <code>=&gt;</code> викличе помилку!
          </div>
        `,
        hint: `if temp >= 100:`,
        expected: `Температура: 100\nВода кипить`,
        tests: [
          { type: "codeRegex", name: "Ввід температури", pattern: "temp\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Оператор >=", pattern: "if\\s+temp\\s*>=\\s*100\\s*:" },
          { type: "codeRegex", name: "Наявність print", pattern: "print\\s*\\(\\s*['\"]Вода кипить['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🛣️ План Б (else)",
        xp: 75,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Інакше...</h2>
          <p>Що робити, якщо умова виявилася хибною (False)? За замовчуванням програма просто пропустить <code>if</code> і піде далі.</p>
          <p>Але якщо ми хочемо виконати іншу дію в разі провалу, ми додаємо блок <b style="color: #10b981;"><code>else:</code></b> (з англ. <i>інакше</i>).</p>
          
          <div class="theory-alert theory-alert-info">
            💡 <b style="color: #0ea5e9;">Правило:</b> Після <code>else</code> НІКОЛИ не пишеться умова! Цей блок просто ловить абсолютно всі інші випадки, яким не підійшов <code>if</code>.
          </div>
          
          <div class="code-box">if hp &gt; 0:<br>    print("Живий")<br><b style="color: #10b981;">else:</b><br>    print("Гру закінчено")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Кінотеатр перевіряє вік для сеансу "18+". Якщо віку не вистачає, має спрацювати запасний план (відмова).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">age = int(input("Вік: "))</code>.<br>Якщо <code style="color: #0ea5e9;">age &gt;= 18</code>, виведи <code style="color: #0ea5e9;">"Ласкаво просимо"</code>.<br>Інакше (<code style="color: #0ea5e9;">else:</code>), виведи <code style="color: #0ea5e9;">"Вхід заборонено"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Блок <code>else:</code> має писатися на одному рівні з <code>if</code> (без відступу), а його внутрішній код — знову з відступом!
          </div>
        `,
        hint: `if age >= 18:\n    print(...)\nelse:\n    print(...)`,
        expected: `Вік: 15\nВхід заборонено`,
        tests: [
          { type: "codeRegex", name: "Запит віку", pattern: "age\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s+age\\s*>=\\s*18\\s*:" },
          { type: "codeRegex", name: "Використано else:", pattern: "\\nelse\\s*:" },
          { type: "codeRegex", name: "Принти в обох блоках", pattern: "print\\s*\\(\\s*['\"]Ласкаво просимо['\"]\\s*\\).*print\\s*\\(\\s*['\"]Вхід заборонено['\"]\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "🧮 Математика в умові",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рахуємо на льоту</h2>
          <p>Ми можемо робити математичні дії прямо всередині <code>if</code>, до знака порівняння. Python спочатку порахує формулу, а потім порівняє результат.</p>
          <div class="code-box">if wallet - price &gt;= 0:<br>    print("Грошей вистачає!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець хоче купити меч за 150 монет. Програма має скласти всі його гроші (готівку та банк) і перевірити, чи вистачає на покупку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай дві змінні: <code style="color: #0ea5e9;">cash</code> та <code style="color: #0ea5e9;">bank</code> (обидві через <code>int(input)</code>).<br>Напиши умову: якщо їхня сума (<code style="color: #0ea5e9;">cash + bank</code>) більша або дорівнює <code style="color: #0ea5e9;">150</code>, виведи <code style="color: #0ea5e9;">"Куплено!"</code>. Інакше — <code style="color: #0ea5e9;">"Мало грошей"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зроби додавання прямо в рядку з <code>if</code>.
          </div>
        `,
        hint: `if cash + bank >= 150:`,
        expected: `Готівка: 50\nБанк: 100\nКуплено!`,
        tests: [
          { type: "codeRegex", name: "Два інпути", pattern: "int\\s*\\(\\s*input", flags: "g", min: 2 },
          { type: "codeRegex", name: "Математика в if", pattern: "if\\s+cash\\s*\\+\\s*bank\\s*>=\\s*150\\s*:" },
          { type: "codeRegex", name: "Наявність else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "💬 Порівняння рядків",
        xp: 95,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Живий діалог</h2>
          <p>Умови стають по-справжньому цікавими, коли ми поєднуємо їх з текстом! Програма реагує на те, що ми їй пишемо.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Охоронець біля дверей запитує пароль. Він пускає лише тих, хто знає секретне слово "qwerty".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">pwd = input("Пароль: ")</code>.<br>Якщо <code style="color: #0ea5e9;">pwd == "qwerty"</code>, виведи <code style="color: #0ea5e9;">"Проходь!"</code>. Інакше виведи <code style="color: #0ea5e9;">"Тривога!"</code>.<br>
          </div>

          <div class="task-note">
            <b>Важливо:</b> Пароль — це текст, тому в умові порівнюй його з текстом у лапках.
          </div>
        `,
        hint: `if pwd == "qwerty":`,
        expected: `Пароль: qwerty\nПроходь!`,
        tests: [
          { type: "codeRegex", name: "Ввід пароля", pattern: "pwd\\s*=\\s*input\\s*\\(\\s*['\"]Пароль:\\s*['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Перевірка if", pattern: "if\\s+pwd\\s*==\\s*['\"]qwerty['\"]\\s*:" },
          { type: "codeRegex", name: "Наявність else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🔀 Багато варіантів (elif)",
        xp: 105,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">А що як варіантів більше двох?</h2>
          <p><code>if</code> перевіряє першу умову. <code>else</code> спрацьовує, якщо нічого не підійшло. А що робити посередині?</p>
          <p>Для цього є <b style="color: #3b82f6;"><code>elif</code></b> (скорочено від <i>else if</i> — інакше якщо). Ми можемо ставити їх скільки завгодно між <code>if</code> та <code>else</code>!</p>
          
          <div class="code-box">color = input("Колір: ")<br>if color == "Червоний":<br>    print("Стій!")<br><b style="color: #3b82f6;">elif</b> color == "Жовтий":<br>    print("Готуйся!")<br>else:<br>    print("Йди!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма оцінює результат тесту на 3 рівні: ідеально, добре, або погано.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">score = int(input("Бал: "))</code>.<br>
            - Якщо <code style="color: #0ea5e9;">score == 100</code>, виведи <code style="color: #0ea5e9;">"Ідеально"</code>.<br>
            - <b>elif</b> <code style="color: #0ea5e9;">score == 80</code>, виведи <code style="color: #0ea5e9;">"Супер!"</code>.<br>
            - <b>else</b>, виведи <code style="color: #0ea5e9;">"Треба ще потренуватись"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> <code>elif</code> пишеться на тому ж рівні відступу, що й <code>if</code>. І після нього ТЕЖ треба писати умову та двокрапку!
          </div>
        `,
        hint: `if score == 100:\n    ...\nelif score == 80:\n    ...\nelse:\n    ...`,
        expected: `Бал: 80\nСупер!`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "score\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова if", pattern: "if\\s+score\\s*==\\s*100\\s*:" },
          { type: "codeRegex", name: "Використано elif", pattern: "elif\\s+score\\s*==\\s*80\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🪜 Ланцюг рішень (Декілька elif)",
        xp: 115,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Як працює ліфт?</h2>
          <p>В одній структурі може бути багато блоків <code>elif</code>. Але пам'ятай: Python перевіряє їх згори донизу. Як тільки він знайде ПЕРШУ умову, яка є <code>True</code>, він виконає її код і <b>пропустить усі інші перевірки</b> нижче!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Шкільна система оцінювання. Залежно від введеного балу програма ставить оцінку від 5 до 2.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">mark = int(input("Бал: "))</code>.<br>
            - Якщо <code>mark &gt;= 90</code>: виведи <code style="color: #0ea5e9;">"Оцінка: 5"</code>.<br>
            - Якщо <code>mark &gt;= 70</code>: виведи <code style="color: #0ea5e9;">"Оцінка: 4"</code> (це наш elif).<br>
            - Якщо <code>mark &gt;= 50</code>: виведи <code style="color: #0ea5e9;">"Оцінка: 3"</code> (ще один elif).<br>
            - Інакше (else): виведи <code style="color: #0ea5e9;">"Оцінка: 2"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Завдяки послідовності перевірок "згори донизу" ми можемо не переживати, що оцінка 4 перекриє оцінку 5.
          </div>
        `,
        hint: `if mark >= 90:\n...\nelif mark >= 70:\n...\nelif mark >= 50:\n...\nelse:\n...`,
        expected: `Бал: 75\nОцінка: 4`,
        tests: [
          { type: "codeRegex", name: "Є if та два elif", pattern: "if\\s+.*elif.*elif", flags: "s" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "💡 Булеві змінні (if True)",
        xp: 125,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Елегантний код</h2>
          <p>Якщо ми хочемо перевірити, чи ввів користувач слово "Так", ми можемо створити булеву (логічну) змінну, яка збереже результат порівняння!</p>
          
          <div class="theory-alert theory-alert-info">
            💡 <b>Дивись фокус:</b><br>
            <code style="color: #0ea5e9;">is_ready = input("Готовий? ") == "Так"</code><br>
            Якщо користувач введе "Так", змінна <code style="color: #0ea5e9;">is_ready</code> стане <code style="color: #10b981;">True</code>. Якщо щось інше — <code style="color: #ef4444;">False</code>.<br>
            Далі ми просто пишемо: <code style="color: #0ea5e9;">if is_ready:</code> (БЕЗ ==).
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Клуб пускає VIP-клієнтів. Статус визначається одним питанням, відповідь на яке зберігається як логічна змінна (True/False).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">is_vip = input("Ти VIP? ") == "Так"</code>. Напиши елегантну умову <code style="color: #0ea5e9;">if is_vip:</code> і виведи <code style="color: #0ea5e9;">"Вхід до VIP-зони"</code>. Додай <code style="color: #0ea5e9;">else</code>, який виведе <code style="color: #0ea5e9;">"Відмовлено"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не використовуй <code>==</code> в самому if! Звикай до чистого коду.
          </div>
        `,
        hint: `Твій код: if is_vip:\n    print("Вхід до VIP-зони")`,
        expected: `Ти VIP? Так\nВхід до VIP-зони`,
        tests: [
          { type: "codeRegex", name: "Створення булевої змінної", pattern: "is_vip\\s*=\\s*input\\s*\\(.*\\)\\s*==\\s*['\"]Так['\"]", checkRaw: true },
          { type: "codeRegex", name: "Елегантний if", pattern: "if\\s+is_vip\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "📏 Умова з len()",
        xp: 135,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Короткий чи довгий?</h2>
          <p>Ми можемо перевіряти не лише самі змінні, а й результати функцій! Наприклад, перевірити довжину введеного тексту за допомогою <code>len()</code>.</p>
          <div class="code-box">name = input("Ім'я: ")<br>if len(name) &lt; 3:<br>    print("Занадто коротке ім'я!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Валідатор пароля під час реєстрації перевіряє його довжину. Короткі паролі відхиляються.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай текст: <code style="color: #0ea5e9;">pwd = input("Пароль: ")</code>.<br>Якщо <code style="color: #0ea5e9;">len(pwd) &gt;= 5</code>, виведи <code style="color: #0ea5e9;">"Надійний пароль"</code>.<br>Інакше виведи <code style="color: #0ea5e9;">"Слабкий пароль"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Для перевірки довжини пароль не треба перетворювати на <code>int</code>! Функція <code>len()</code> працює саме з текстом.
          </div>
        `,
        hint: `if len(pwd) >= 5:`,
        expected: `Пароль: 12345\nНадійний пароль`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "pwd\\s*=\\s*input" },
          { type: "codeRegex", name: "Перевірка довжини", pattern: "if\\s+len\\s*\\(\\s*pwd\\s*\\)\\s*>=\\s*5\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "חל Парні та непарні (%)",
        xp: 145,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Класичний трюк</h2>
          <p>Як комп'ютер розуміє, чи число парне (2, 4, 100)? Дуже просто: він ділить його на 2 і дивиться на <b style="color: #3b82f6;">остачу (<code>%</code>)</b>.</p>
          <p>Якщо остача від ділення на 2 дорівнює нулю (<code>num % 2 == 0</code>), значить число ділиться націло — воно парне!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма сортує числа на парні та непарні, аналізуючи залишок від ділення на 2.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">num = int(input("Число: "))</code>.<br>Напиши умову: якщо <code style="color: #0ea5e9;">num % 2 == 0</code>, виведи <code style="color: #0ea5e9;">"Парне"</code>.<br>Інакше виведи <code style="color: #0ea5e9;">"Непарне"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Ми використовуємо подвійне <code>==</code> для перевірки остачі.
          </div>
        `,
        hint: `if num % 2 == 0:`,
        expected: `Число: 8\nПарне`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "num\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова парності", pattern: "if\\s+num\\s*%\\s*2\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🪆 Вкладені умови (Nested if)",
        xp: 155,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Умова всередині умови</h2>
          <p>Що, якщо після однієї успішної перевірки нам треба зробити ще одну уточнюючу? Ми можемо написати <code>if</code> всередині іншого <code>if</code>! Для цього треба зробити <b style="color: #f59e0b;">подвійний відступ</b>.</p>
          <div class="code-box">if door == "Відкрито":<br>    print("Входимо")<br>    if box == "Золото":<br>        print("Ура!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець спочатку перевіряє двері, а потім, якщо вони відкриті, заглядає у скриню.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Запитай <code style="color: #0ea5e9;">door = input("Двері: ")</code>.<br>
            2. Напиши: <code style="color: #0ea5e9;">if door == "Відкрито":</code> і виведи <code style="color: #0ea5e9;">"Входимо"</code>.<br>
            3. ПРЯМО ВСЕРЕДИНІ (з відступом) запитай: <code style="color: #0ea5e9;">box = input("Скриня: ")</code>.<br>
            4. Додай другий <code style="color: #0ea5e9;">if box == "Золото":</code> (з відступом), який виведе <code style="color: #0ea5e9;">"Ура!"</code> (з подвійним відступом).
          </div>

          <div class="task-note">
            <b>Важливо:</b> Другий запит <code>input</code> відбувається ТІЛЬКИ якщо двері відкрито. Тому він теж має відступ!
          </div>
        `,
        hint: `if door == "Відкрито":\n    print("Входимо")\n    box = input("Скриня: ")\n    if box == "Золото":\n        print("Ура!")`,
        expected: `Двері: Відкрито\nВходимо\nСкриня: Золото\nУра!`,
        tests: [
          { type: "codeRegex", name: "Зовнішній if", pattern: "if\\s+door\\s*==\\s*['\"]Відкрито['\"]\\s*:" },
          { type: "codeRegex", name: "Вкладений запит скрині", pattern: "\\n\\s+box\\s*=\\s*input" },
          { type: "codeRegex", name: "Вкладений if (подвійний відступ)", pattern: "\\n\\s+if\\s+box\\s*==\\s*['\"]Золото['\"]\\s*:\\s*\\n\\s{4,}print", flags: "s" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Світлофор",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: if, elif, else</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Класичний світлофор. Водій повинен знати, що робити залежно від кольору.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">color = input("Колір: ")</code>.<br>
            - Якщо <code style="color: #0ea5e9;">color == "Червоний"</code>, виведи <code>"Стій"</code>.<br>
            - <b>elif</b> <code style="color: #0ea5e9;">color == "Жовтий"</code>, виведи <code>"Чекай"</code>.<br>
            - <b>else</b>, виведи <code>"Йди!"</code>.
          </div>
        `,
        hint: `Не забудь двокрапки після кожного if, elif та else.`,
        expected: `Колір: Зелений\nЙди!`,
        tests: [
          { type: "codeRegex", name: "Ввід кольору", pattern: "color\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Умова Червоний", pattern: "if\\s+color\\s*==\\s*['\"]Червоний['\"]\\s*:" },
          { type: "codeRegex", name: "Умова Жовтий (elif)", pattern: "elif\\s+color\\s*==\\s*['\"]Жовтий['\"]\\s*:" },
          { type: "codeRegex", name: "Умова else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Паркомат",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Парність (%) та Input</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Автоматичний паркомат пропускає лише автомобілі з парними номерами.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">car_id = int(input("Номер авто: "))</code>.<br>Якщо номер <b>парний</b> (<code style="color: #0ea5e9;">% 2 == 0</code>), виведи <code>"Проїзд дозволено"</code>. Інакше виведи <code>"В'їзд заборонено"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Обов'язково перетвори ввід на <code>int</code>, інакше математика з <code>%</code> видасть помилку TypeError.
          </div>
        `,
        hint: `if car_id % 2 == 0:`,
        expected: `Номер авто: 44\nПроїзд дозволено`,
        tests: [
          { type: "codeRegex", name: "Ввід як число", pattern: "int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Перевірка парності", pattern: "if\\s+car_id\\s*%\\s*2\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Знак числа",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: <, >, ==</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Математичний аналізатор визначає знак числа (чи воно додатне, від'ємне, чи нуль).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">num = int(input("Число: "))</code>.<br>
            - Якщо <code style="color: #0ea5e9;">num &gt; 0</code>, виведи <code>"Додатне"</code>.<br>
            - <b>elif</b> <code style="color: #0ea5e9;">num &lt; 0</code>, виведи <code>"Від'ємне"</code>.<br>
            - <b>else</b>, виведи <code>"Нуль"</code>.
          </div>
        `,
        hint: `if num > 0:\n...\nelif num < 0:\n...`,
        expected: `Число: -5\nВід'ємне`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Умова > 0", pattern: "if\\s+num\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Умова < 0", pattern: "elif\\s+num\\s*<\\s*0\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🐉 БОС (Junior): Кімната рішень",
        xp: 800,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Логіка гри</h2>
          <p>Напиши класичний текстовий квест. Перевір своє вміння будувати вкладені умови (if всередині if)!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Текстова RPG. Гравець обирає шлях у підземеллі і б'ється з монстрами, маючи певну кількість сили. Усі події залежать від його рішень.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Запитай напрямок: <code style="color: #0ea5e9;">way = input("Куди йдемо? ")</code>.<br>
            2. Якщо він пішов <code>"Ліво"</code>, виведи <code>"Безпечна кімната"</code>.<br>
            3. Якщо (elif) він пішов <code>"Право"</code>, виведи <code>"Тут дракон!"</code> і <b>відразу запитай</b> його силу (змінна <code style="color: #0ea5e9;">power</code>, не забудь про int!).<br>
            4. Всередині "Право": якщо сила більша за 10, виведи <code>"Ти переміг!"</code>. Інакше (else) — <code>"Ти програв"</code>.<br>
            5. Якщо гравець ввів інший напрямок (зовнішній else), виведи <code>"Невідомо"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Вкладені <code>if / else</code> (пункт 4) повинні мати <b>подвійний відступ</b>!
          </div>
        `,
        hint: `Структура боса:
if way == "Ліво":
    print(...)
elif way == "Право":
    print(...)
    power = int(...)
    if power > 10:
        print(...)
    else:
        print(...)
else:
    print(...)`,
        expected: `Куди йдемо? Право\nТут дракон!\nСили: 15\nТи переміг!`,
        tests: [
          { type: "codeRegex", name: "Перевірка Ліво/Право", pattern: "if\\s+way\\s*==\\s*['\"]Ліво['\"]\\s*:.*elif\\s+way\\s*==\\s*['\"]Право['\"]\\s*:", flags: "s" },
          { type: "codeRegex", name: "Вкладений ввід сили (int)", pattern: "elif\\s+way\\s*==\\s*['\"]Право['\"]\\s*:\\s*\\n\\s+print.*power\\s*=\\s*int\\s*\\(\\s*input", flags: "s" },
          { type: "codeRegex", name: "Вкладена перевірка сили", pattern: "\\n\\s{4,}if\\s+power\\s*>\\s*10\\s*:\\s*\\n\\s{8,}print.*\\n\\s{4,}else\\s*:\\s*\\n\\s{8,}print", flags: "s" },
          { type: "codeRegex", name: "Глобальний else", pattern: "\\nelse\\s*:\\s*\\n\\s{4,}print\\s*\\(\\s*['\"]Невідомо['\"]\\s*\\)" }
        ]
      },

    

// ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Логічні оператори та Перевірки)
      // ==========================================

      {
        title: "🤝 Подвійна умова (and)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">І те, і інше</h2>
          <p>Іноді однієї перевірки замало. Наприклад, щоб отримати кредит, ти маєш бути повнолітнім <b>І</b> мати гарну зарплату.</p>
          <p>Щоб об'єднати дві умови, ми використовуємо логічний оператор <b style="color: #10b981;"><code>and</code></b> (та). Програма виконає код лише тоді, коли <b>ОБИДВІ</b> умови будуть <code>True</code>.</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">if age &gt;= 18 <b style="color: #10b981;">and</b> money &gt; 1000:<br>    print("Кредит схвалено")</div>
        `,
        desc: `
          <div class="task-main">
            <p>У грі магічні двері відчиняються тільки для тих, хто має спеціальний ключ і достатній рівень магії одночасно.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Запитай наявність ключа: <code style="color: #0ea5e9;">has_key = input("Ключ є? ")</code>.<br>
            2. Запитай рівень магії: <code style="color: #0ea5e9;">magic = int(input("Магія: "))</code>.<br>
            3. Напиши перевірку: якщо <code style="color: #0ea5e9;">has_key</code> дорівнює <code style="color: #0ea5e9;">"Так"</code> <b>І</b> (<code style="color: #0ea5e9;">and</code>) магія більша за <code style="color: #0ea5e9;">50</code>, виведи <code>"Двері відчинено"</code>. Інакше виведи <code>"Не вистачає сил або ключа"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Використовуй оператор <code>and</code>, щоб поєднати перевірку тексту та перевірку числа в одному рядку <code>if</code>.
          </div>
        `,
        hint: `if has_key == "Так" and magic > 50:`,
        expected: `Ключ є? Так\nМагія: 60\nДвері відчинено`,
        tests: [
          { type: "codeRegex", name: "Запит ключа", pattern: "has_key\\s*=\\s*input" },
          { type: "codeRegex", name: "Запит магії як числа", pattern: "magic\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Оператор and", pattern: "if\\s+has_key\\s*==\\s*['\"]Так['\"]\\s+and\\s+magic\\s*>\\s*50\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🔀 Або те, або інше (or)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Будь-який варіант підходить</h2>
          <p>Якщо оператор <code>and</code> дуже строгий, то оператор <b style="color: #3b82f6;"><code>or</code></b> (або) — добрий.</p>
          <p>Він виконає код, якщо <b>ХОЧА Б ОДНА</b> з умов дорівнює <code>True</code>. Інша може бути хибною, це не страшно.</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">if day == "Субота" <b style="color: #3b82f6;">or</b> day == "Неділя":<br>    print("Вихідний!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>У нічний клуб пускають безкоштовно дівчат, а також усіх VIP-клієнтів (навіть якщо це хлопець). Система має перевіряти ці два критерії.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Запитай стать: <code style="color: #0ea5e9;">gender = input("Стать: ")</code>.<br>
            2. Запитай статус VIP: <code style="color: #0ea5e9;">is_vip = input("Ти VIP? ")</code>.<br>
            3. Якщо стать дорівнює <code style="color: #0ea5e9;">"Жінка"</code> <b>АБО</b> статус дорівнює <code style="color: #0ea5e9;">"Так"</code>, виведи <code>"Проходь безкоштовно"</code>. Інакше виведи <code>"Купуй квиток"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Обидві змінні є текстовими, тому перетворювати їх на числа (int) не потрібно.
          </div>
        `,
        hint: `if gender == "Жінка" or is_vip == "Так":`,
        expected: `Стать: Чоловік\nТи VIP? Так\nПроходь безкоштовно`,
        tests: [
          { type: "codeRegex", name: "Два текстові запити", pattern: "gender\\s*=\\s*input.*is_vip\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Оператор or", pattern: "if\\s+gender\\s*==\\s*['\"]Жінка['\"]\\s+or\\s+is_vip\\s*==\\s*['\"]Так['\"]\\s*:" },
          { type: "codeRegex", name: "Наявність else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🛡️ Заперечення (not)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Світ навиворіт</h2>
          <p>Оператор <b style="color: #ef4444;"><code>not</code></b> (не) просто перевертає логічне значення догори дриґом. <code>True</code> стає <code>False</code>, і навпаки.</p>
          <p>Це дуже зручно, коли ми хочемо перевірити, чи чогось <b>НЕ</b> сталося, або змінна <b>НЕ</b> має певного статусу.</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">is_banned = False<br>if <b style="color: #ef4444;">not</b> is_banned:<br>    print("Ласкаво просимо на сервер!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравця не можна пускати на сервер, якщо його акаунт тимчасово заморожено. Система повинна перевірити, чи немає на ньому заморозки.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи логічну змінну <code style="color: #0ea5e9;">is_frozen = False</code>.<br>
            Використовуючи оператор <code style="color: #0ea5e9;">not</code>, напиши елегантну умову: якщо акаунт <b>НЕ</b> заморожений, виведи <code>"Граємо!"</code>. Інакше виведи <code>"Акаунт заблоковано"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не використовуй <code>== False</code> або <code>!= True</code>. Використай саме слово <code>not</code> перед змінною!
          </div>
        `,
        hint: `if not is_frozen:\n    print("Граємо!")`,
        expected: `Граємо!`,
        tests: [
          { type: "stdoutEquals", name: "Спрацювало логічне заперечення", value: "Граємо!", normalize: "soft" },
          { type: "codeRegex", name: "Використано not", pattern: "if\\s+not\\s+is_frozen\\s*:" },
          { type: "codeRegex", name: "Без зайвих дорівнює", pattern: "==|!=", flags: "g", max: 0 }
        ]
      },

      {
        title: "🧮 Комбінування (and + or)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пріоритети операторів</h2>
          <p>Що, якщо нам треба складна умова? Наприклад: "Щоб купити гру, тобі має бути 18 років АБО в тебе є дозвіл батьків... АЛЕ в будь-якому разі в тебе мають бути гроші!".</p>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b>Правило дужок:</b> Оператор <code>and</code> завжди виконується ПЕРШИМ, як множення в математиці. Щоб <code>or</code> виконавсь раніше, треба брати його в <b>круглі дужки</b>.
          </div>
          
          <div class="code-box">if (age &gt;= 18 or has_permission) <b style="color: #3b82f6;">and</b> money &gt;= 50:<br>    print("Гру куплено")</div>
        `,
        desc: `
          <div class="task-main">
            <p>В університеті учні можуть не складати фінальний іспит, якщо вони виграли олімпіаду АБО мають середній бал більше 9... І ПРИ ЦЬОМУ їхня поведінка має статус "Добре".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є три змінні:<br>
            <code style="color: #0ea5e9;">is_winner = False</code><br>
            <code style="color: #0ea5e9;">score = 10</code><br>
            <code style="color: #0ea5e9;">behavior = "Добре"</code><br><br>
            Напиши одну велику перевірку <code>if</code>. Якщо учень відповідає цим складним критеріям, виведи <code>"Іспит скасовано"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Обов'язково візьми умови про олімпіаду та бал у круглі дужки!
          </div>
        `,
        hint: `if (is_winner or score > 9) and behavior == "Добре":`,
        expected: `Іспит скасовано`,
        tests: [
          { type: "stdoutEquals", name: "Складна логіка спрацювала", value: "Іспит скасовано", normalize: "soft" },
          { type: "codeRegex", name: "Використано дужки та or", pattern: "\\(\\s*is_winner\\s+or\\s+score\\s*>\\s*9\\s*\\)" },
          { type: "codeRegex", name: "Використано and", pattern: "and\\s+behavior\\s*==\\s*['\"]Добре['\"]\\s*:" }
        ]
      },

      {
        title: "🔍 Перевірка входження (in)",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чи є це тут?</h2>
          <p>Щоб перевірити, чи є якась літера або слово всередині іншого, більшого тексту, не треба писати складних формул. Python має крутий оператор <b style="color: #10b981;"><code>in</code></b> (в/у).</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">if "кот" <b style="color: #10b981;">in</b> "Теракотовий":<br>    print("Знайдено!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє, чи залишив користувач свою електронну пошту в коментарі. Для цього вона просто шукає символ собачки (@) в тексті.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай текст: <code style="color: #0ea5e9;">text = input("Контакти: ")</code>. <br>Напиши перевірку: якщо символ <code style="color: #0ea5e9;">"@"</code> є <b>в</b> (<code>in</code>) цьому тексті, виведи <code>"Пошта знайдена"</code>. Інакше виведи <code>"Пошти немає"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зліва від <code>in</code> пишеться те, що ми шукаємо (у лапках), а справа — змінна, де ми шукаємо.
          </div>
        `,
        hint: `if "@" in text:`,
        expected: `Контакти: max@mail.com\nПошта знайдена`,
        tests: [
          { type: "codeRegex", name: "Отримання тексту", pattern: "text\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано оператор in", pattern: "if\\s+['\"]@['\"]\\s+in\\s+text\\s*:" },
          { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
        ]
      },

      {
        title: "🚫 Перевірка відсутності (not in)",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чистота даних</h2>
          <p>Логічно, що ми можемо перевірити і зворотне: чи <b>ВІДСУТНІЙ</b> шматок тексту у змінній. Для цього ми комбінуємо два знайомі нам оператори: <b style="color: #ef4444;"><code>not in</code></b>.</p>
          <div class="code-box">if " " <b style="color: #ef4444;">not in</b> password:<br>    print("Пароль не має пробілів. Супер!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Фільтр безпеки перевіряє коментарі. Система не повинна дозволяти шкідливі HTML-теги, наприклад слово "script".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай текст: <code style="color: #0ea5e9;">comment = input("Коментар: ")</code>.<br>
            Якщо слова <code style="color: #0ea5e9;">"script"</code> <b>немає в</b> цьому коментарі, виведи <code>"Коментар додано"</code>. Інакше виведи <code>"Блокування!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Шукай саме слово "script" повністю, маленькими літерами.
          </div>
        `,
        hint: `if "script" not in comment:`,
        expected: `Коментар: Привіт всім!\nКоментар додано`,
        tests: [
          { type: "codeRegex", name: "Отримання коментаря", pattern: "comment\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано not in", pattern: "if\\s+['\"]script['\"]\\s+not\\s+in\\s+comment\\s*:" }
        ]
      },

      {
        title: "📦 Пошук у списку (in list)",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Крутий лайфхак</h2>
          <p>Що, якщо нам треба перевірити, чи дорівнює статус <i>одному з багатьох</i> варіантів?</p>
          <p>Замість того, щоб писати довжелезний код <code>if role == "Admin" or role == "Модер" or role == "Власник":</code>, ми можемо створити <b>список</b> у квадратних дужках і перевірити через <code>in</code>!</p>
          
          <div class="code-box">if role <b style="color: #3b82f6;">in</b> ["Admin", "Модер", "Власник"]:<br>    print("Доступ до налаштувань відкрито")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система пропускає до адмін-панелі тільки працівників зі спеціальними ролями. Якщо введена роль збігається з однією зі списку дозволених — вхід відкривається.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">role = input("Роль: ")</code>. <br>Напиши перевірку: якщо введена роль знаходиться <b>в списку</b> <code style="color: #0ea5e9;">["Директор", "Менеджер"]</code>, виведи <code>"Вхід дозволено"</code>. Інакше виведи <code>"Відмова"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Створи список прямо в умові <code>if</code>, обгорнувши слова у квадратні дужки та розділивши комами.
          </div>
        `,
        hint: `if role in ["Директор", "Менеджер"]:`,
        expected: `Роль: Менеджер\nВхід дозволено`,
        tests: [
          { type: "codeRegex", name: "Запит ролі", pattern: "role\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Перевірка через список", pattern: "if\\s+role\\s+in\\s*\\[\\s*['\"]Директор['\"]\\s*,\\s*['\"]Менеджер['\"]\\s*\\]\\s*:" }
        ]
      },

      {
        title: "🎭 Неявна істина (Truthy / Falsy)",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Таємниця порожнечі</h2>
          <p>У модулі про типи ми вчили, що число <code>0</code> і порожній текст <code>""</code> — це <code>False</code> (Брехня). А будь-яке число чи текст з символами — це <code>True</code>.</p>
          <p>Завдяки цьому ми можемо писати супер-короткі умови! Якщо ми просто напишемо <code>if name:</code>, Python зрозуміє це як "Якщо ім'я <b>НЕ ПОРОЖНЄ</b>".</p>
          
          <div class="code-box">money = 0<br>if money:<br>    print("Гроші є!")<br>else:<br>    print("Ти банкрут") <span style="color:gray;"># Спрацює це, бо 0 - це False</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє, чи ввів користувач своє ім'я, чи просто натиснув Enter (залишив поле порожнім). Порожнє поле вважається Брехнею (False).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">name = input("Ім'я: ")</code>. <br>Напиши коротку перевірку: <code style="color: #0ea5e9;">if name:</code>. Якщо поле не порожнє, виведи <code>"Привіт"</code>. Інакше виведи <code>"Ім'я не може бути порожнім"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Використай саме неявну перевірку. Тобі не потрібно писати <code>!= ""</code>.
          </div>
        `,
        hint: `if name:\n    print("Привіт")`,
        expected: `Ім'я: Макс\nПривіт`,
        tests: [
          { type: "codeRegex", name: "Отримання імені", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Неявна перевірка (Truthy)", pattern: "if\\s+name\\s*:" },
          { type: "codeRegex", name: "Без порівнянь", pattern: "!=|==", flags: "g", max: 0 }
        ]
      },

      {
        title: "🔗 Умова + Методи рядків",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Методи дають відповіді</h2>
          <p>Такі методи як <code>.endswith()</code> або <code>.isdigit()</code> завжди повертають <code>True</code> або <code>False</code>. Тому вони ідеально підходять для того, щоб ставити їх прямо в умову <code>if</code> замість змінних!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Валідатор перевіряє, чи правильно користувач ввів пошту (вона обов'язково має закінчуватися на @gmail.com).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">email = input("Email: ")</code>. <br>В умові <code>if</code> застосуй метод <code style="color: #0ea5e9;">.endswith("@gmail.com")</code> до змінної <code>email</code>. Якщо він поверне True, виведи <code>"Збережено"</code>. Інакше виведи <code>"Тільки gmail!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Викликай метод прямо в рядку з <code>if</code>, не створюючи додаткових змінних.
          </div>
        `,
        hint: `if email.endswith("@gmail.com"):`,
        expected: `Email: test@gmail.com\nЗбережено`,
        tests: [
          { type: "codeRegex", name: "Отримання пошти", pattern: "email\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Метод endswith в умові", pattern: "if\\s+email\\.endswith\\s*\\(\\s*['\"]@gmail\\.com['\"]\\s*\\)\\s*:" }
        ]
      },

      {
        title: "🧮 Діапазон чисел (10 <= x <= 20)",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Стиль Python</h2>
          <p>В інших мовах, щоб перевірити чи число знаходиться між 10 і 20, треба писати так: <code>if x &gt;= 10 and x &lt;= 20:</code>.</p>
          <p>Але Python розумний! Він дозволяє писати математичні діапазоні так само, як у школі на уроці алгебри.</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">if 10 &lt;= x &lt;= 20:<br>    print("Число в межах норми")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Датчик перевіряє температуру реактора. Вона має бути строго від 50 до 80 градусів включно.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">temp = int(input("Температура: "))</code>. <br>Використай подвійне порівняння: <code style="color: #0ea5e9;">50 &lt;= temp &lt;= 80</code>. Якщо все ок, виведи <code>"Норма"</code>. Інакше <code>"Тривога"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зроби це "в стилі Python", без використання слова <code>and</code>!
          </div>
        `,
        hint: `if 50 <= temp <= 80:`,
        expected: `Температура: 65\nНорма`,
        tests: [
          { type: "codeRegex", name: "Ввід як число", pattern: "temp\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Подвійне порівняння", pattern: "if\\s+50\\s*<=\\s*temp\\s*<=\\s*80\\s*:" },
          { type: "codeRegex", name: "Без and", pattern: "\\band\\b", flags: "g", max: 0 }
        ]
      },

      {
        title: "🚿 Очищення перед перевіркою",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Захист від дурня</h2>
          <p>Люди постійно пишуть з помилками: великими літерами, ставлять випадкові пробіли. Якщо ти напишеш <code>if ans == "так":</code>, а людина введе <code>" ТАК "</code> — програма скаже False!</p>
          <p>Щоб цього уникнути, ми маємо <b>нормалізувати</b> ввід: відрізати пробіли (<code>strip</code>) і зробити все маленьким (<code>lower</code>).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма запитує згоду. Навіть якщо користувач напише слово криво (з пробілами чи великими літерами), логіка має спрацювати бездоганно.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">ans = input("Згоден? ")</code>. <br>Відразу до <code>input()</code> застосуй методи <code style="color: #0ea5e9;">.strip().lower()</code>.<br>Потім перевір: якщо результат дорівнює <code style="color: #0ea5e9;">"так"</code>, виведи <code>"Чудово"</code>. Інакше <code>"Шкода"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Оскільки ти застосуєш <code>.lower()</code>, твоя перевірка в <code>if</code> має бути строго з маленьких літер: <code>"так"</code>.
          </div>
        `,
        hint: `ans = input("Згоден? ").strip().lower()\nif ans == "так":`,
        expected: `Згоден?   тАк \nЧудово`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок нормалізації", pattern: "ans\\s*=\\s*input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Порівняння з нижнім регістром", pattern: "if\\s+ans\\s*==\\s*['\"]так['\"]\\s*:" }
        ]
      },

      {
        title: "🔧 Рефакторинг: if всередині if",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Сплющуємо код</h2>
          <p>У рівні Junior ми вчили "вкладені" умови (if всередині if). Вони корисні, але іноді роблять код занадто "глибоким" і незрозумілим (це називають "пеклом відступів").</p>
          <p>Якщо внутрішній <code>if</code> не має свого власного <code>else</code>, ми можемо об'єднати їх в ОДИН рядок за допомогою <b style="color: #10b981;"><code>and</code></b>!</p>
          
          <div class="theory-alert theory-alert-info">
            💡 <b>Було:</b><br>
            <code>if a &gt; 5:</code><br>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;if b == 10:</code><br>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Бінго")</code><br>
            <br>
            😎 <b>Стало:</b><br>
            <code>if a &gt; 5 <b style="color: #10b981;">and</b> b == 10:</code><br>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;print("Бінго")</code>
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>У тебе є два параметри гравця. Тобі треба перевірити обидва, але без зайвих відступів і вкладених умов.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">hp = 100</code> та <code style="color: #0ea5e9;">shield = 50</code>. <br>Напиши ОДНУ умову в одному рядку: якщо здоров'я дорівнює 100 <b>І</b> щит більший за 0, виведи <code>"Гравець захищений"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Використай оператор <code>and</code>. Завдання перевіряє, щоб у тебе був тільки ОДИН <code>if</code>.
          </div>
        `,
        hint: `if hp == 100 and shield > 0:`,
        expected: `Гравець захищений`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Гравець захищений", normalize: "soft" },
          { type: "codeRegex", name: "Сплющена умова (and)", pattern: "if\\s+hp\\s*==\\s*100\\s+and\\s+shield\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Тільки один if", pattern: "if\\s+", flags: "g", max: 1 }
        ]
      },

      {
        title: "🧠 Лінива логіка (Short-circuit)",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Розумний Python</h2>
          <p>Оператор <code>and</code> має суперсилу — він <b style="color: #3b82f6;">"лінивий"</b>. Python читає умови зліва направо. Якщо перша умова перед <code>and</code> є <code>False</code> (Брехня), Python відразу розуміє, що все речення провалилось, і <b style="color: #ef4444;">НАВІТЬ НЕ ЧИТАЄ</b> другу частину!</p>
          
          <div class="code-box">x = 0<br>if x != 0 <b style="color: #10b981;">and</b> (100 / x) &gt; 5:<br>    print("Ок")</div>
          <p>Оскільки на нуль ділити не можна, друга частина викликала б помилку. Але Python побачив, що <code>x != 0</code> це False, і просто проігнорував небезпечне ділення!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Захисти код від помилки ділення на нуль за допомогою лінивої перевірки!</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">divisor = 0</code>. <br>Напиши безпечну умову: якщо <code>divisor</code> <b>не дорівнює</b> 0 <b>І</b> результат ділення <code>50 / divisor</code> дорівнює 10, виведи <code>"Знайдено"</code>. Інакше виведи <code>"Безпечний вихід"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Перевірка на нерівність нулю МАЄ СТОЯТИ ПЕРШОЮ (зліва від <code>and</code>).
          </div>
        `,
        hint: `if divisor != 0 and (50 / divisor) == 10:\n    ...\nelse:\n    ...`,
        expected: `Безпечний вихід`,
        tests: [
          { type: "stdoutEquals", name: "Програма не впала", value: "Безпечний вихід", normalize: "soft" },
          { type: "codeRegex", name: "Лінива перевірка", pattern: "if\\s+divisor\\s*!=\\s*0\\s+and\\s+" }
        ]
      },

      {
  title: "🔎 Множинні перевірки методів",
  xp: 260,
  kind: "practice",
  difficulty: "Middle",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Подвійний фільтр</h2>
    <p>Ми можемо комбінувати перевірки методів рядків та перевірку довжини через оператор <code>and</code>, щоб створити ідеальний фільтр для введених даних.</p>
  `,
  desc: `
    <div class="task-main">
      <p>Система банку перевіряє ПІН-код. Він має складатися ТІЛЬКИ з цифр і мати довжину РІВНО 4 символи.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">pin = input("Пін: ")</code>.<br>
      Напиши умову: якщо <code style="color: #0ea5e9;">pin.isdigit()</code> <b>І</b> довжина <code>pin</code> дорівнює 4, виведи <code>"Доступ дозволено"</code>. Інакше — <code>"Помилка формату"</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> Оскільки ми використовуємо <code>len(pin)</code> та <code>.isdigit()</code>, перетворювати пін-код на <code>int</code> не треба.
    </div>
  `,
  hint: `if pin.isdigit() and len(pin) == 4:`,
  expected: `Пін: 1234\nДоступ дозволено`,
  tests: [
    { type: "codeRegex", name: "Запит тексту", pattern: "pin\\s*=\\s*input\\s*\\(" },
    { type: "codeRegex", name: "Комбінована перевірка", pattern: "if\\s+pin\\.isdigit\\s*\\(\\)\\s+and\\s+len\\s*\\(\\s*pin\\s*\\)\\s*==\\s*4\\s*:" },
    { type: "codeRegex", name: "Є else", pattern: "else\\s*:" }
  ]
},

      {
        title: "🛡️ Складна валідація",
        xp: 270,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Професійний захист</h2>
          <p>Перед тим як зареєструвати користувача, сайти перевіряють його пароль за кількома критеріями одночасно (довжина, наявність спецсимволів тощо). Це робиться за допомогою ланцюжка операторів.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Надійний пароль має бути не коротшим за 8 символів і обов'язково містити зірочку (*).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">pwd = input("Пароль: ")</code>.<br>
            Напиши умову: якщо довжина пароля (<code>len</code>) більше або дорівнює 8 <b>І</b> символ <code>"*"</code> є <b>в</b> (<code>in</code>) паролі, виведи <code>"Прийнято"</code>. Інакше виведи <code>"Слабкий пароль"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Поєднай <code>len()</code>, оператор <code>and</code> та оператор <code>in</code> в одному рядку.
          </div>
        `,
        hint: `if len(pwd) >= 8 and "*" in pwd:`,
        expected: `Пароль: Secret*Pass\nПрийнято`,
        tests: [
          { type: "codeRegex", name: "Отримання пароля", pattern: "pwd\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Довжина та входження (and)", pattern: "if\\s+len\\s*\\(\\s*pwd\\s*\\)\\s*>=\\s*8\\s+and\\s+['\"]\\*['\"]\\s+in\\s+pwd\\s*:" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Бойова система",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: and / or</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець може атакувати, якщо має зброю або високий рівень... АЛЕ у нього обов'язково має бути витривалість (стаміна).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи три змінні:<br>
            <code style="color: #0ea5e9;">weapon = True</code><br>
            <code style="color: #0ea5e9;">level = 5</code><br>
            <code style="color: #0ea5e9;">stamina = 10</code><br>
            Напиши умову: якщо (є зброя АБО рівень &gt; 10) І стаміна &gt; 0, виведи <code>"Атака!"</code>. Інакше <code>"Немає сил"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Для змінної <code>weapon</code> не пиши <code>== True</code>. Обов'язково використай круглі дужки, щоб згрупувати "зброю або рівень".
          </div>
        `,
        hint: `if (weapon or level > 10) and stamina > 0:`,
        expected: `Атака!`,
        tests: [
          { type: "stdoutEquals", name: "Логіка працює", value: "Атака!", normalize: "soft" },
          { type: "codeRegex", name: "Дужки та оператори", pattern: "if\\s+\\(\\s*weapon\\s+or\\s+level\\s*>\\s*10\\s*\\)\\s+and\\s+stamina\\s*>\\s*0\\s*:" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Інвентар",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Оператор in зі списками</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє, чи є потрібний ресурс у швидкому слоті гравця.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">item = input("Що шукаєш? ")</code>.<br>
            Перевір: якщо <code>item</code> є <b>у списку</b> <code>["Карта", "Зілля", "Ключ"]</code>, виведи <code>"Предмет знайдено"</code>. Інакше виведи <code>"Цього немає"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Створи список прямо в рядку з <code>if</code> за допомогою квадратних дужок і ком.
          </div>
        `,
        hint: `if item in ["Карта", "Зілля", "Ключ"]:`,
        expected: `Що шукаєш? Зілля\nПредмет знайдено`,
        tests: [
          { type: "codeRegex", name: "Запит предмета", pattern: "item\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Пошук у списку", pattern: "if\\s+item\\s+in\\s*\\[.*['\"]Ключ['\"].*\\]\\s*:" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Бот-модератор",
        xp: 450,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Нормалізація + not in</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Бот блокує повідомлення, в яких є заборонене слово "спам", незалежно від того, як користувач його написав (великими чи маленькими літерами).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code style="color: #0ea5e9;">msg = input("Чат: ").lower()</code>.<br>
            Якщо слова <code>"спам"</code> <b>НЕМАЄ В</b> (<code>not in</code>) повідомленні, виведи <code>"Відправлено"</code>. Інакше виведи <code>"Повідомлення видалено"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Метод <code>.lower()</code> зробить усі літери маленькими, тому ми можемо легко шукати слово "спам".
          </div>
        `,
        hint: `if "спам" not in msg:`,
        expected: `Чат: Це СпАм!!!\nПовідомлення видалено`,
        tests: [
          { type: "codeRegex", name: "Нормалізація вводу", pattern: "input\\s*\\(.*\\)\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка not in", pattern: "if\\s+['\"]спам['\"]\\s+not\\s+in\\s+msg\\s*:" }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🐉 БОС (Middle): Валідатор Реєстрації",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Секьюріті</h2>
          <p>Створи систему, яка перевіряє ім'я користувача відразу за багатьма параметрами, використовуючи всі вивчені інструменти: перевірку на порожнечу, довжину, входження символів.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система має перевірити логін. Він повинен бути не порожнім, не надто коротким, і не містити заборонених символів.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Запитай логін: <code style="color: #0ea5e9;">login = input("Логін: ").strip()</code>.<br>
            2. Перевір (через ланцюг <code>if/elif/else</code>):<br>
               - Якщо логін <b>порожній</b> (використай <code>not login</code> або порівняй з <code>""</code>), виведи: <code>"Порожній логін"</code>.<br>
               - Якщо довжина логіна <b>менша за 4</b>, виведи: <code>"Короткий логін"</code>.<br>
               - Якщо символ <code>"@"</code> <b>є в</b> логіні, виведи: <code>"Символ @ заборонено"</code>.<br>
               - Інакше (якщо всі перевірки пройдено), виведи: <code>"Реєстрація успішна"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу на послідовність блоків <code>if</code>, <code>elif</code>, <code>elif</code>, <code>else</code>.
          </div>
        `,
        hint: `if not login:\n...\nelif len(login) < 4:\n...\nelif "@" in login:\n...\nelse:\n...`,
        expected: `Логін: Admin\nРеєстрація успішна`,
        tests: [
          { type: "codeRegex", name: "Очищення країв", pattern: "input\\s*\\(.*\\)\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка на порожнечу", pattern: "if\\s+not\\s+login\\s*:|if\\s+login\\s*==\\s*['\"]['\"]\\s*:" },
          { type: "codeRegex", name: "Перевірка довжини (elif)", pattern: "elif\\s+len\\s*\\(\\s*login\\s*\\)\\s*<\\s*4\\s*:" },
          { type: "codeRegex", name: "Перевірка спецсимволу (elif)", pattern: "elif\\s+['\"]@['\"]\\s+in\\s+login\\s*:" },
          { type: "codeRegex", name: "Успішний фінал", pattern: "else\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]Реєстрація успішна['\"]\\s*\\)" }
        ]
      },
      
      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Сучасні інструменти та Трюки)
      // ==========================================

      {
        title: "⚡ Тернарний оператор (Один рядок)",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Код для лінивих профі</h2>
          <p>Писати 4 рядки коду для простого <code>if/else</code> — це занадто довго. У Python є <b>тернарний оператор</b>, який дозволяє записати умову в один рядок!</p>
          
          <div class="theory-alert theory-alert-info">
            💡 <b style="color: #0ea5e9;">Синтаксис:</b><br>
            <code>змінна = (Значення ЯКЩО ПРАВДА) if (УМОВА) else (Значення ЯКЩО БРЕХНЯ)</code>
          </div>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">age = 20<br>status = "Дорослий" if age &gt;= 18 else "Дитина"<br>print(status)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма швидко визначає стан води залежно від її температури (менше нуля — Лід, інакше — Вода).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">temp = int(input("Температура: "))</code>.<br>
            Створи змінну <code style="color: #0ea5e9;">state</code> і використай тернарний оператор: вона дорівнює <code style="color: #0ea5e9;">"Лід"</code>, якщо <code style="color: #0ea5e9;">temp &lt; 0</code>, інакше (else) <code style="color: #0ea5e9;">"Вода"</code>.<br>
            Виведи змінну <code style="color: #0ea5e9;">state</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Увесь логічний блок має вміститися в один рядок: <code>state = ... if ... else ...</code>.
          </div>
        `,
        hint: `state = "Лід" if temp < 0 else "Вода"`,
        expected: `Температура: -5\nЛід`,
        tests: [
          { type: "codeRegex", name: "Ввід як число", pattern: "temp\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Тернарний оператор", pattern: "state\\s*=\\s*['\"]Лід['\"]\\s+if\\s+temp\\s*<\\s*0\\s+else\\s+['\"]Вода['\"]", checkRaw: true },
          { type: "codeRegex", name: "Класичного if немає", pattern: "^if\\s+", flags: "gm", max: 0 }
        ]
      },

      {
        title: "🖨️ Тернарний в print()",
        xp: 290,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Миттєве рішення</h2>
          <p>Оскільки тернарний оператор просто повертає значення, ми можемо засунути його ПРЯМО всередину функції <code>print()</code> або f-рядка!</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">money = 50<br>print("Куплено" if money &gt;= 100 else "Відмова")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє кількість здоров'я героя і відразу друкує його статус одним рядком коду.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">hp = int(input("Здоров'я: "))</code>.<br>
            Прямо всередині <code style="color: #0ea5e9;">print()</code> напиши тернарний оператор: виводь <code>"Живий"</code>, якщо <code>hp &gt; 0</code>, інакше виводь <code>"Мертвий"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Не створюй зайвих змінних. Твій другий рядок коду — це відразу <code style="color: #0ea5e9;">print( "..." if ... else "..." )</code> .
          </div>
        `,
        hint: `print("Живий" if hp > 0 else "Мертвий")`,
        expected: `Здоров'я: 0\nМертвий`,
        tests: [
          { type: "codeRegex", name: "Тернарний оператор в print", pattern: "print\\s*\\(\\s*['\"]Живий['\"]\\s+if\\s+hp\\s*>\\s*0\\s+else\\s+['\"]Мертвий['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎭 Трюк з OR (Дефолтне значення)",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Захист від порожнечі</h2>
          <p>Пам'ятаєш ліниву логіку? Оператор <code>or</code> шукає перше значення <code>True</code>. Якщо зліва від нього стоїть порожній рядок <code>""</code> (який є <code>False</code>), він автоматично візьме значення справа!</p>
          <p>Це улюблений трюк програмістів для встановлення <b>дефолтних значень</b>, якщо користувач нічого не ввів (натиснув Enter).</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">name = input("Ім'я: ") <b style="color: #3b82f6;">or</b> "Анонім"<br>print("Привіт,", name)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить ввести роль гравця. Якщо гравець нічого не введе (просто натисне Enter), програма має автоматично дати йому роль "Гість".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">role = input("Роль: ")</code>, але відразу допиши <b>оператор <code>or</code></b> та дефолтне слово <code>"Гість"</code>.<br>
            Виведи змінну <code>role</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Тобі потрібен всього один рядок для запиту і перевірки! При тестуванні просто натисни Enter, не вводячи нічого.
          </div>
        `,
        hint: `role = input("Роль: ") or "Гість"`,
        expected: `Роль: \nГість`,
        tests: [
          { type: "codeRegex", name: "Трюк з or", pattern: "role\\s*=\\s*input\\s*\\(.*\\)\\s+or\\s+['\"]Гість['\"]", checkRaw: true },
          { type: "codeRegex", name: "Друк", pattern: "print\\s*\\(\\s*role\\s*\\)" }
        ]
      },

      {
        title: "🧲 Функція any() (Хоча б один)",
        xp: 310,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Масова перевірка</h2>
          <p>Що робити, якщо нам треба перевірити багато умов одночасно? Писати <code>if a == 1 or b == 1 or c == 1:</code> дуже незручно.</p>
          <p>Вбудована функція <b style="color: #10b981;"><code>any()</code></b> приймає список логічних значень і повертає <code>True</code>, якщо <b>ХОЧА Б ОДИН</b> елемент у списку є <code>True</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Детектор диму, вогню або газу. Якщо хоча б один сенсор покаже небезпеку (True), має увімкнутися тривога.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінні <code>smoke = False</code>, <code>fire = True</code>, <code>gas = False</code>.<br>
            Напиши умову: <code style="color: #0ea5e9;">if any([smoke, fire, gas]):</code> (передаємо змінні як список у квадратних дужках).<br>
            Якщо так, виведи <code>"ТРИВОГА"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу на синтаксис: <code>any([список])</code> — круглі дужки для функції, а всередині квадратні дужки для списку.
          </div>
        `,
        hint: `if any([smoke, fire, gas]):\n    print("ТРИВОГА")`,
        expected: `ТРИВОГА`,
        tests: [
          { type: "stdoutEquals", name: "Тривога спрацювала", value: "ТРИВОГА", normalize: "soft" },
          { type: "codeRegex", name: "Використано any", pattern: "if\\s+any\\s*\\(\\s*\\[\\s*smoke\\s*,\\s*fire\\s*,\\s*gas\\s*\\]\\s*\\)\\s*:" }
        ]
      },

      {
        title: "🛡️ Функція all() (Тільки якщо всі)",
        xp: 320,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ідеальні умови</h2>
          <p>Функція <b style="color: #3b82f6;"><code>all()</code></b> — це брат функції <code>any()</code>. Вона повертає <code>True</code> ТІЛЬКИ тоді, коли <b>АБСОЛЮТНО ВСІ</b> елементи у списку є <code>True</code> (заміняє купу операторів <code>and</code>).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевірка запуску ракети. Усі три системи мають дати сигнал готовності (True), щоб ракета полетіла.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінні: <code>engine = True</code>, <code>fuel = True</code>, <code>weather = True</code>.<br>
            Використовуючи функцію <code>all()</code> та список, перевір усі три змінні. Якщо всі готові, виведи <code>"Запуск!"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Синтаксис такий самий: <code>all([елемент1, елемент2, елемент3])</code>.
          </div>
        `,
        hint: `if all([engine, fuel, weather]):`,
        expected: `Запуск!`,
        tests: [
          { type: "stdoutEquals", name: "Запуск успішний", value: "Запуск!", normalize: "soft" },
          { type: "codeRegex", name: "Використано all", pattern: "if\\s+all\\s*\\(\\s*\\[\\s*engine\\s*,\\s*fuel\\s*,\\s*weather\\s*\\]\\s*\\)\\s*:" }
        ]
      },

      {
        title: "🦭 Моржевий оператор (:=)",
        xp: 330,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Нова магія Python</h2>
          <p>Починаючи з Python 3.8 з'явився оператор <b>"Морж"</b> (Walrus operator) — <b style="color: #ef4444;"><code>:=</code></b>. Він виглядає як очі та ікла моржа.</p>
          <p>Він дозволяє <b>СТВОРИТИ змінну</b> і відразу ж її <b>ПЕРЕВІРИТИ</b> прямо всередині <code>if</code>! Це економить купу рядків коду.</p>
          
          <div class="theory-alert theory-alert-info">
            💡 <b>Замість двох рядків:</b><br>
            <code>length = len(pwd)</code><br>
            <code>if length &gt; 8: print(length)</code><br><br>
            😎 <b>Один рядок з моржем:</b><br>
            <code>if (length := len(pwd)) &gt; 8: print(length)</code>
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє довжину введеного імені. Якщо вона більша за 3, програма має зберегти цю довжину і відразу вивести її в тексті.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code>name = input("Ім'я: ")</code>.<br>
            Використай моржевий оператор всередині круглого дужках умову: <code style="color: #0ea5e9;">if (n := len(name)) &gt; 3:</code><br>
            Виведи: <code>print(f"Довжина імені: {n}")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Моржевий оператор обов'язково треба брати в круглі дужки <code>(n := ...)</code> під час перевірки, щоб Python правильно зрозумів пріоритет.
          </div>
        `,
        hint: `if (n := len(name)) > 3:`,
        expected: `Ім'я: Олександр\nДовжина імені: 9`,
        tests: [
          { type: "codeRegex", name: "Ввід імені", pattern: "name\\s*=\\s*input" },
          { type: "codeRegex", name: "Використано моржевий оператор", pattern: "if\\s+\\(\\s*n\\s*:=\\s*len\\s*\\(\\s*name\\s*\\)\\s*\\)\\s*>\\s*3\\s*:" },
          { type: "codeRegex", name: "Використано створену змінну n", pattern: "f['\"]Довжина імені:\\s*\\{\\s*n\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "🔄 Морж та Input разом",
        xp: 340,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Максимальне скорочення</h2>
          <p>Моржевий оператор ідеально підходить для запиту <code>input()</code>. Ми можемо відразу запитати команду користувача, зберегти її у змінну і перевірити!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система просить ввести команду. Якщо це команда "exit", вона спрацьовує і друкує саму себе.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>if</code>, в якому ти відразу створиш змінну <code>cmd</code> через моржа: <code style="color: #0ea5e9;">if (cmd := input("Команда: ")) == "exit":</code>.<br>
            Всередині (з відступом) виведи: <code>print(f"Виконано: {cmd}")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> У нас немає попереднього рядка зі створенням змінної. Усе відбувається прямо в умові!
          </div>
        `,
        hint: `if (cmd := input("Команда: ")) == "exit":\n    print(f"Виконано: {cmd}")`,
        expected: `Команда: exit\nВиконано: exit`,
        tests: [
          { type: "codeRegex", name: "Відсутність окремого input", pattern: "^cmd\\s*=\\s*input", flags: "gm", max: 0 },
          { type: "codeRegex", name: "Морж з input", pattern: "if\\s+\\(\\s*cmd\\s*:=\\s*input\\s*\\(.*\\)\\s*\\)\\s*==\\s*['\"]exit['\"]\\s*:" }
        ]
      },

      {
        title: "🛤️ Зіставлення: match-case",
        xp: 350,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вбивця нескінченних elif</h2>
          <p>У Python 3.10 з'явився новий спосіб робити вибір — <b style="color: #10b981;"><code>match / case</code></b>. Він схожий на <code>switch/case</code> в інших мовах. Він робить код набагато чистішим, якщо нам треба перевіряти одну й ту саму змінну на багато різних значень.</p>
          
          <div class="code-box"><b style="color: #10b981;">match</b> color:<br>    <b style="color: #10b981;">case</b> "Червоний":<br>        print("Стій")<br>    <b style="color: #10b981;">case</b> "Зелений":<br>        print("Йди")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Меню вибору зброї. Користувач вводить номер, а система через сучасний match-case видає йому відповідний предмет.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code>item_id = int(input("Зброя (1-2): "))</code>.<br>
            Напиши структуру <code>match item_id:</code><br>
            - <code>case 1:</code> виведи <code>"Меч"</code><br>
            - <code>case 2:</code> виведи <code>"Лук"</code>
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу на відступи! Блоки <code>case</code> мають відступ від <code>match</code>, а код всередині <code>case</code> — ще один відступ.
          </div>
        `,
        hint: `match item_id:\n    case 1:\n        print("Меч")\n    case 2:\n        print("Лук")`,
        expected: `Зброя (1-2): 1\nМеч`,
        tests: [
          { type: "codeRegex", name: "Ввід id як int", pattern: "item_id\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Структура match-case", pattern: "match\\s+item_id\\s*:\\s*\\n\\s+case\\s+1\\s*:\\s*\\n\\s+print.*\\n\\s+case\\s+2\\s*:", flags: "s" }
        ]
      },

      {
        title: "🛡️ Дефолтний case (_)",
        xp: 360,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Замінюємо else</h2>
          <p>У <code>match-case</code> немає слова <code>else</code>. Щоб відловити "всі інші варіанти" (якщо жоден <code>case</code> не підійшов), використовується спеціальний символ підкреслення <b style="color: #ef4444;"><code>case _:</code></b> (він називається wildcard).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Додаємо до нашого меню вибору зброї захист від дурня. Якщо гравець введе число 3 або більше, він отримає попередження.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Скопіюй код з минулого завдання.<br>
            Після <code>case 2:</code> додай дефолтний варіант: <code style="color: #0ea5e9;">case _:</code><br>
            Всередині нього виведи: <code>"Невідомий предмет"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Дефолтний <code>case _:</code> завжди має писатися в самому кінці структури.
          </div>
        `,
        hint: `case _:\n    print("Невідомий предмет")`,
        expected: `Зброя (1-2): 5\nНевідомий предмет`,
        tests: [
          { type: "codeRegex", name: "Наявність match", pattern: "match\\s+item_id\\s*:" },
          { type: "codeRegex", name: "Дефолтний case _", pattern: "case\\s+_\\s*:\\s*\\n\\s+print\\s*\\(\\s*['\"]Невідомий предмет['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🧲 Об'єднання в case (|)",
        xp: 370,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Замінюємо OR</h2>
          <p>Ще одна фішка <code>match-case</code>: ми можемо об'єднувати кілька значень в один блок за допомогою вертикальної риски <b style="color: #3b82f6;"><code>|</code></b> (це означає <i>АБО</i>).</p>
          <div class="code-box">case "субота" | "неділя":<br>    print("Вихідний")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє роль гравця. І Адмін, і Модератор мають доступ до одного й того ж пульта керування.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code>role = input("Роль: ")</code>.<br>
            Через <code>match role:</code> створи блок: <code style="color: #0ea5e9;">case "admin" | "moder":</code><br>
            Виведи <code>"Доступ відкрито"</code>.<br>
            Для дефолтного варіанту (<code>case _:</code>) виведи <code>"Відмова"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу на пряму лінію <code>|</code> між словами у лапках!
          </div>
        `,
        hint: `match role:\n    case "admin" | "moder":\n        print("Доступ відкрито")\n    case _:\n        print("Відмова")`,
        expected: `Роль: admin\nДоступ відкрито`,
        tests: [
          { type: "codeRegex", name: "Використано match", pattern: "match\\s+role\\s*:" },
          { type: "codeRegex", name: "Об'єднання через |", pattern: "case\\s+['\"]admin['\"]\\s*\\|\\s*['\"]moder['\"]\\s*:" }
        ]
      },

      {
        title: "💂‍♂️ Охоронець Case (If guard)",
        xp: 380,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Умова всередині патерну</h2>
          <p>Найпотужніша фішка <code>match</code>: ми можемо ставити додатковий <code>if</code> прямо в рядок з <code>case</code>! Це називається Guard (охоронець).</p>
          <div class="code-box">case "атака" <b style="color: #10b981;">if</b> hp &gt; 10:<br>    print("Б'ємо ворога")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач намагається купити зілля. Система через <code>match</code> перевіряє команду "купити", і відразу в <code>case</code> перевіряє, чи вистачає йому грошей (потрібно більше 50).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. <code>money = 100</code><br>
            2. <code>cmd = input("Дія: ")</code><br>
            3. Напиши: <code>match cmd:</code><br>
            4. Створи захищений блок: <code style="color: #0ea5e9;">case "купити" if money &gt;= 50:</code><br>
            5. Виведи: <code>"Успіх"</code>.<br>
            6. Додай дефолтний <code>case _:</code> і виведи <code>"Помилка"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> <code>if</code> пишеться прямо в тому ж рядку, що й <code>case</code>, до двокрапки.
          </div>
        `,
        hint: `case "купити" if money >= 50:`,
        expected: `Дія: купити\nУспіх`,
        tests: [
          { type: "codeRegex", name: "Використано match", pattern: "match\\s+cmd\\s*:" },
          { type: "codeRegex", name: "Захищений case (If Guard)", pattern: "case\\s+['\"]купити['\"]\\s+if\\s+money\\s*>=\\s*50\\s*:" }
        ]
      },

      {
        title: "⛓️ Ланцюг порівнянь (a < b < c)",
        xp: 390,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математична грація</h2>
          <p>У рівні Middle ми писали <code>10 <= x <= 20</code>. Але в Python можна об'єднувати ВЗАГАЛІ будь-які перевірки в один довгий ланцюг!</p>
          <div class="code-box">if a == b == c == 100:<br>    print("Всі дорівнюють 100!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система перевіряє цілісність даних: три датчики мають показувати ідеальний 0, щоб дозволити запуск.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи три змінні: <code>s1 = 0</code>, <code>s2 = 0</code>, <code>s3 = 0</code>.<br>
            Напиши умову: якщо <code style="color: #0ea5e9;">s1 == s2 == s3 == 0</code>, виведи <code>"Система стабільна"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Жодних <code>and</code>! Тільки магічний потрійний ланцюжок <code>==</code>.
          </div>
        `,
        hint: `if s1 == s2 == s3 == 0:`,
        expected: `Система стабільна`,
        tests: [
          { type: "stdoutEquals", name: "Система спрацювала", value: "Система стабільна", normalize: "soft" },
          { type: "codeRegex", name: "Ланцюжок порівнянь", pattern: "if\\s+s1\\s*==\\s*s2\\s*==\\s*s3\\s*==\\s*0\\s*:" }
        ]
      },

      {
        title: "🛡️ Жорстка логіка: assert",
        xp: 400,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Захисне програмування</h2>
          <p>Іноді нам не потрібен <code>if/else</code>. Нам треба сказати комп'ютеру: "Ось ця умова МАЄ бути правдою. Якщо це не так — миттєво зупини всю програму і видай помилку!".</p>
          <p>Для цього використовується команда <b style="color: #ef4444;"><code>assert</code></b> (стверджувати). Якщо умова після <code>assert</code> є False, програма "падає" (AssertionError) з повідомленням, яке ми написали через кому.</p>
          
          <div class="code-box"><b style="color: #ef4444;">assert</b> hp &gt; 0, "Персонаж мертвий!"</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє, чи є в користувача гроші перед початком операції. Якщо грошей 0, програма жорстко "впаде", щоб не допустити багів далі в коді.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>money = 50</code>.<br>
            Напиши: <code style="color: #0ea5e9;">assert money &gt; 0, "Баланс порожній!"</code>.<br>
            На наступному рядку виведи: <code>"Транзакція почалась"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Оскільки грошей 50 (більше нуля), <code>assert</code> промовчить і пропустить код далі.
          </div>
        `,
        hint: `assert money > 0, "Баланс порожній!"\nprint("Транзакція почалась")`,
        expected: `Транзакція почалась`,
        tests: [
          { type: "stdoutEquals", name: "Пропущено далі", value: "Транзакція почалась", normalize: "soft" },
          { type: "codeRegex", name: "Використано assert", pattern: "assert\\s+money\\s*>\\s*0\\s*,\\s*['\"]Баланс порожній!['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Тернарний Інпут",
        xp: 450,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Тернарний в один рядок</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Програма питає баланс гравця. Якщо він більший або дорівнює 100, вона зберігає статус "VIP", інакше — "Базовий".</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>bal = int(input("Баланс: "))</code>.<br>
            В ОДИН рядок застосуй тернарний оператор: <code style="color: #0ea5e9;">status = "VIP" if bal &gt;= 100 else "Базовий"</code>.<br>
            Виведи <code>status</code>.
          </div>
        `,
        hint: `status = "VIP" if bal >= 100 else "Базовий"`,
        expected: `Баланс: 150\nVIP`,
        tests: [
          { type: "codeRegex", name: "Тернарний", pattern: "status\\s*=\\s*['\"]VIP['\"]\\s+if\\s+bal\\s*>=\\s*100\\s+else\\s+['\"]Базовий['\"]", checkRaw: true },
          { type: "codeRegex", name: "Друк", pattern: "print\\s*\\(\\s*status\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Морж Валідатор",
        xp: 500,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Оператор :=</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Система перевіряє довжину пароля під час реєстрації. Використай моржа, щоб заощадити рядки!</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>pwd = input("Пароль: ")</code>.<br>
            Використай моржа: <code style="color: #0ea5e9;">if (L := len(pwd)) &lt; 6:</code> виведи f-рядком <code>"Слабко, символів: {L}"</code>.<br>
            Інакше виведи <code>"Ок"</code>.
          </div>
        `,
        hint: `if (L := len(pwd)) < 6:`,
        expected: `Пароль: 12345\nСлабко, символів: 5`,
        tests: [
          { type: "codeRegex", name: "Моржевий оператор", pattern: "if\\s+\\(\\s*L\\s*:=\\s*len\\s*\\(\\s*pwd\\s*\\)\\s*\\)\\s*<\\s*6\\s*:" },
          { type: "codeRegex", name: "f-рядок з L", pattern: "f['\"]Слабко, символів:\\s*\\{\\s*L\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Меню в Match",
        xp: 550,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: match / case</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Меню гри на базі match-case.</p>
          </div>
          <div class="task-condition">
            <b>Умова:</b> Запитай <code>action = input("Команда: ")</code>.<br>
            Напиши структуру <code>match action:</code><br>
            - <code>case "play" | "start":</code> виведи <code>"Запуск гри"</code><br>
            - <code>case "exit":</code> виведи <code>"Вихід"</code><br>
            - <code>case _:</code> виведи <code>"Не зрозумів"</code>
          </div>
        `,
        hint: `case "play" | "start":`,
        expected: `Команда: play\nЗапуск гри`,
        tests: [
          { type: "codeRegex", name: "Використано match", pattern: "match\\s+action\\s*:" },
          { type: "codeRegex", name: "Використано | (або)", pattern: "case\\s+['\"]play['\"]\\s*\\|\\s*['\"]start['\"]\\s*:" },
          { type: "codeRegex", name: "Дефолтний case", pattern: "case\\s+_\\s*:" }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🔴 БОС (Senior): Архітектор систем",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Сучасна логіка</h2>
          <p>Об'єднай усе найкрутіше з Python 3.10+: морж, match-case та guard умови!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Ти розробляєш інтерфейс адмін-панелі. Система має прочитати команду користувача, розібрати її і виконати лише тоді, коли користувач є адміном.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Запитай логін із дефолтним значенням: <code>user = input("Логін: ") or "Гість"</code>.<br>
            2. Відразу запитай і перевір команду через моржа: <code>match (cmd := input("Команда: ")):</code>.<br>
            3. <code>case "del" if user == "Admin":</code> (це Guard! Видаляти може тільки адмін). Виведи: <code>"Файл видалено"</code>.<br>
            4. <code>case "del":</code> (спрацює, якщо попередня умова відмовила, бо юзер не адмін). Виведи: <code>"Доступ заборонено"</code>.<br>
            5. <code>case _:</code> виведи f-рядком: <code>"Невідома команда {cmd}"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Для тестування введи Логін: "Admin", а Команду: "del". 
          </div>
        `,
        hint: `Крок 2: match (cmd := input("Команда: ")): \nКрок 3: case "del" if user == "Admin":\n...`,
        expected: `Логін: Admin\nКоманда: del\nФайл видалено`,
        tests: [
          { type: "codeRegex", name: "Запит з or", pattern: "user\\s*=\\s*input\\(.*\\)\\s+or\\s+['\"]Гість['\"]", checkRaw: true },
          { type: "codeRegex", name: "Морж всередині match", pattern: "match\\s+\\(\\s*cmd\\s*:=\\s*input\\s*\\(.*\\)\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Guard if в case", pattern: "case\\s+['\"]del['\"]\\s+if\\s+user\\s*==\\s*['\"]Admin['\"]\\s*:" },
          { type: "codeRegex", name: "Простий case del", pattern: "\\n\\s+case\\s+['\"]del['\"]\\s*:\\s*\\n\\s+print" },
          { type: "codeRegex", name: "Дефолт з форматуванням", pattern: "case\\s+_\\s*:\\s*\\n\\s*print\\s*\\(\\s*f['\"]Невідома команда\\s*\\{\\s*cmd\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
