// js/data/python/m_while.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_while",
    title: "Цикли: while",
    icon: "ri-repeat-2-line",
    color: "#8b5cf6", // Фіолетовий колір для циклів
    desc: "Змушуємо код повторюватися! Створення лічильників, ігрових циклів (Game Loop) та акумуляторів.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Основи циклу while)
      // ==========================================

     {
  title: "🔄 Повторюваний IF (while)",
  xp: 40,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що таке цикл?</h2>
    <p>Ти вже знаєш команду <code>if</code>. Вона перевіряє умову і виконує код <b style="color: #10b981;">один раз</b>.</p>
    <p>Але іноді програмі треба повторювати дію знову і знову, поки умова залишається правильною. Для цього існує цикл <b style="color: #8b5cf6;"><code>while</code></b>.</p>

    <div class="theory-alert theory-alert-info">
      💡 <b>Ідея:</b> <code>while</code> можна уявити як <code>if</code>, який повертається назад і перевіряє умову ще раз.
    </div>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">timer = 3<br><b style="color: #8b5cf6;">while</b> timer &gt; 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(timer)<br>&nbsp;&nbsp;&nbsp;&nbsp;timer = timer - 1<br>print("Старт!")</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">3<br>2<br>1<br>Старт!</div>

    <div class="theory-alert theory-alert-danger">
      🚨 <b style="color: #ef4444;">Обережно:</b> всередині циклу має бути команда, яка змінює змінну з умови. Інакше цикл може не зупинитися.
    </div>
  `,
  desc: `
    <div class="task-main">
      <p>Програма веде зворотний відлік для запуску ракети. Вона має надрукувати 3, потім 2, потім 1, після чого цикл має зупинитися.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи змінну <code style="color: #0ea5e9;">sec = 3</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while sec &gt; 0:</code>.<br>
      3. Всередині циклу виведи <code style="color: #0ea5e9;">sec</code>.<br>
      4. Після виводу зменш <code style="color: #0ea5e9;">sec</code> на 1.
    </div>

    <div class="task-note">
      <b>Важливо:</b> Не забудь двокрапку після умови та відступи всередині циклу.
    </div>
  `,
  hint: `Побудуй цикл за зразком із теорії: спочатку умова, потім друк змінної, потім її зменшення.`,
  expected: `3\n2\n1`,
  tests: [
    { type: "stdoutEquals", name: "Відлік правильний", value: "3\n2\n1", normalize: "soft" },
    { type: "codeRegex", name: "Стартове значення sec = 3", pattern: "sec\\s*=\\s*3" },
    { type: "codeRegex", name: "Використано while sec > 0", pattern: "while\\s+sec\\s*>\\s*0\\s*:" },
    { type: "codeRegex", name: "Зменшення sec", pattern: "sec\\s*=\\s*sec\\s*-\\s*1|sec\\s*-\\s*=\\s*1" }
  ]
},

{
  title: "📈 Лічильник вгору",
  xp: 45,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рахуємо вгору</h2>
    <p>Цикл <code>while</code> може не тільки зменшувати число, а й збільшувати його. Так працює звичайний <b style="color: #10b981;">лічильник</b>.</p>
    <p>Ми задаємо початкове число, повторюємо дію і після кожного кола збільшуємо змінну.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">count = 1<br><b style="color: #8b5cf6;">while</b> count &lt;= 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Крок", count)<br>&nbsp;&nbsp;&nbsp;&nbsp;count = count + 1</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">Крок 1<br>Крок 2<br>Крок 3</div>
  `,
  desc: `
    <div class="task-main">
      <p>Персонаж робить кроки. Програма має порахувати їх від 1 до 5 включно.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи змінну <code style="color: #0ea5e9;">step = 1</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while step &lt;= 5:</code>.<br>
      3. Всередині циклу виведи <code style="color: #0ea5e9;">step</code>.<br>
      4. Після цього збільш <code style="color: #0ea5e9;">step</code> на 1.
    </div>

    <div class="task-note">
      <b>Важливо:</b> знак <code>&lt;=</code> означає “менше або дорівнює”, тому число 5 теж буде надруковане.
    </div>
  `,
  hint: `Почни з 1, повторюй цикл, поки число не стало більшим за 5, і кожного разу збільшуй лічильник.`,
  expected: `1\n2\n3\n4\n5`,
  tests: [
    { type: "stdoutEquals", name: "Лічильник працює", value: "1\n2\n3\n4\n5", normalize: "soft" },
    { type: "codeRegex", name: "Стартове значення step = 1", pattern: "step\\s*=\\s*1" },
    { type: "codeRegex", name: "Умова step <= 5", pattern: "while\\s+step\\s*<=\\s*5\\s*:" },
    { type: "codeRegex", name: "Збільшення step", pattern: "step\\s*=\\s*step\\s*\\+\\s*1|step\\s*\\+\\s*=\\s*1" }
  ]
},

{
  title: "💥 Пастка: нескінченний цикл",
  xp: 50,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що може піти не так?</h2>
    <p>Якщо в циклі не змінювати змінну з умови, цикл може повторюватися дуже довго.</p>
    <p>Наприклад, якщо <code>x</code> завжди залишається 1, умова <code>x &lt; 3</code> ніколи не стане хибною.</p>

    <p><b style="color: #ef4444;">Приклад помилки:</b></p>
    <div class="code-box">x = 1<br><b style="color: #8b5cf6;">while</b> x &lt; 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Зависло!")</div>

    <div class="theory-alert theory-alert-danger">
      🚨 <b>Правило безпеки:</b> у циклі має бути дія, яка наближає програму до завершення циклу.
    </div>
  `,
  desc: `
    <div class="task-main">
      <p>Хтось написав код для отримання рівнів від 1 до 3, але забув збільшити лічильник. Твоє завдання — виправити цей баг.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи змінну <code style="color: #0ea5e9;">lvl = 1</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while lvl &lt;= 3:</code>.<br>
      3. Всередині циклу виведи <code style="color: #0ea5e9;">lvl</code>.<br>
      4. Після виводу збільш <code style="color: #0ea5e9;">lvl</code> на 1.
    </div>

    <div class="task-note">
      <b>Важливо:</b> рядок зі збільшенням має бути всередині циклу, з таким самим відступом, як і <code>print(lvl)</code>.
    </div>
  `,
  hint: `Після друку рівня треба змінити лічильник, щоб цикл поступово дійшов до завершення.`,
  expected: `1\n2\n3`,
  tests: [
    { type: "stdoutEquals", name: "Цикл завершився успішно", value: "1\n2\n3", normalize: "soft" },
    { type: "codeRegex", name: "Цикл lvl <= 3", pattern: "while\\s+lvl\\s*<=\\s*3\\s*:" },
    { type: "codeRegex", name: "Лічильник збільшується", pattern: "lvl\\s*\\+\\s*=\\s*1|lvl\\s*=\\s*lvl\\s*\\+\\s*1" }
  ]
},

{
  title: "💬 Текстова умова",
  xp: 55,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Цикл із текстом</h2>
    <p>Умова циклу може перевіряти не тільки числа, а й текст.</p>
    <p>Наприклад, <code>while word != "стоп":</code> означає: “повторюй код, поки слово не дорівнює <b style="color: #10b981;">стоп</b>”.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">ans = ""<br><b style="color: #8b5cf6;">while</b> ans != "так":<br>&nbsp;&nbsp;&nbsp;&nbsp;ans = input("Ти згоден? ")</div>

    <div class="theory-alert theory-alert-info">
      💡 Перед циклом ми створюємо порожню змінну, щоб Python мав що перевіряти в умові.
    </div>
  `,
  desc: `
    <div class="task-main">
      <p>Гравець має ввести правильне слово "секрет", щоб пройти далі. Система просить пароль знову і знову, поки слово не буде правильним.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи порожню змінну <code style="color: #0ea5e9;">pwd = ""</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while pwd != "секрет":</code>.<br>
      3. Всередині циклу перезаписуй змінну через <code style="color: #0ea5e9;">input("Пароль: ")</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> під час тестування система сама введе потрібні дані. Твоє завдання — правильно побудувати цикл.
    </div>
  `,
  hint: `Порожня змінна має бути перед циклом, а введення нового пароля — всередині циклу.`,
  expected: `Пароль: секрет`,
  tests: [
    { type: "codeRegex", name: "Створено pwd", pattern: "pwd\\s*=\\s*['\"]['\"]" },
    { type: "codeRegex", name: "Правильний while", pattern: "while\\s+pwd\\s*!=\\s*['\"]секрет['\"]\\s*:" },
    { type: "codeRegex", name: "Input всередині циклу", pattern: "\\n\\s+pwd\\s*=\\s*input\\s*\\(\\s*['\"]Пароль:\\s*['\"]\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🔋 Акумулятор: збираємо дані",
  xp: 60,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Змінна-скарбничка</h2>
    <p>У циклах часто використовують змінну, яка поступово накопичує значення. Таку змінну можна уявити як <b style="color: #10b981;">скарбничку</b>.</p>
    <p>Перед циклом ми створюємо її зі стартовим значенням, а всередині циклу додаємо нові значення.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">score = 0<br><b style="color: #8b5cf6;">while</b> score &lt; 20:<br>&nbsp;&nbsp;&nbsp;&nbsp;score = score + 10<br>&nbsp;&nbsp;&nbsp;&nbsp;print(score)</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">10<br>20</div>
  `,
  desc: `
    <div class="task-main">
      <p>Гравець заробляє по 5 золотих монет за кожен крок. Цикл має працювати, поки гравець не збере 20 золотих.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи змінну <code style="color: #0ea5e9;">gold = 0</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while gold &lt; 20:</code>.<br>
      3. Всередині циклу збільшуй <code style="color: #0ea5e9;">gold</code> на 5.<br>
      4. Після збільшення виводь <code style="color: #0ea5e9;">gold</code> на екран.
    </div>

    <div class="task-note">
      <b>Важливо:</b> спочатку додай монети, а вже потім друкуй результат.
    </div>
  `,
  hint: `Створи скарбничку з нулем, повторюй цикл до 20 і кожного разу додавай 5 монет.`,
  expected: `5\n10\n15\n20`,
  tests: [
    { type: "stdoutEquals", name: "Золото зібрано", value: "5\n10\n15\n20", normalize: "soft" },
    { type: "codeRegex", name: "Стартове gold = 0", pattern: "gold\\s*=\\s*0" },
    { type: "codeRegex", name: "Цикл gold < 20", pattern: "while\\s+gold\\s*<\\s*20\\s*:" },
    { type: "codeRegex", name: "Збільшення gold", pattern: "gold\\s*\\+\\s*=\\s*5|gold\\s*=\\s*gold\\s*\\+\\s*5" }
  ]
},

{
  title: "🩸 Битва з босом",
  xp: 65,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зменшуємо значення в циклі</h2>
    <p>Цикл можна використовувати не тільки для збільшення, а й для зменшення значення. Це зручно для задач із запасом здоров’я, енергією або таймером.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">hp = 20<br><b style="color: #8b5cf6;">while</b> hp &gt; 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;hp -= 10<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Залишок:", hp)</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">Залишок: 10<br>Залишок: 0</div>
  `,
  desc: `
    <div class="task-main">
      <p>Гравець атакує боса. Кожен удар знімає 15 HP. Бій триває, поки здоров’я боса більше нуля.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи змінну <code style="color: #0ea5e9;">boss_hp = 50</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while boss_hp &gt; 0:</code>.<br>
      3. Всередині циклу віднімай 15 HP.<br>
      4. Після удару виводь поточне значення <code style="color: #0ea5e9;">boss_hp</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> після останнього удару здоров’я може стати від’ємним. Для цієї задачі це нормально.
    </div>
  `,
  hint: `Потрібно повторювати удари, поки HP більше нуля: у циклі спочатку зменшуй HP, а потім друкуй його.`,
  expected: `35\n20\n5\n-10`,
  tests: [
    { type: "stdoutEquals", name: "Боса подолано", value: "35\n20\n5\n-10", normalize: "soft" },
    { type: "codeRegex", name: "Стартове boss_hp = 50", pattern: "boss_hp\\s*=\\s*50" },
    { type: "codeRegex", name: "Цикл boss_hp > 0", pattern: "while\\s+boss_hp\\s*>\\s*0\\s*:" },
    { type: "codeRegex", name: "Віднімання урону", pattern: "boss_hp\\s*-\\s*=\\s*15|boss_hp\\s*=\\s*boss_hp\\s*-\\s*15" }
  ]
},

{
  title: "🏁 Зона видимості: зовні циклу",
  xp: 70,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Де закінчується цикл?</h2>
    <p>У Python відступи дуже важливі. Усе, що має відступ після <code>while</code>, належить до циклу.</p>
    <p>Код без відступу виконається вже <b style="color: #10b981;">після завершення циклу</b>.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">n = 1<br><b style="color: #8b5cf6;">while</b> n &lt;= 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(n)<br>&nbsp;&nbsp;&nbsp;&nbsp;n += 1<br>print("Фініш")</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">1<br>2<br>3<br>Фініш</div>
  `,
  desc: `
    <div class="task-main">
      <p>Машина завантажує дані: 1, 2, 3. Коли завантаження завершено, вона має один раз вивести "Готово!".</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">x = 1</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while x &lt;= 3:</code>.<br>
      3. Всередині циклу виводь <code style="color: #0ea5e9;">x</code> і збільшуй <code style="color: #0ea5e9;">x</code> на 1.<br>
      4. Після циклу, без відступу, виведи <code style="color: #0ea5e9;">"Готово!"</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> якщо поставити відступ перед фінальним <code>print("Готово!")</code>, він стане частиною циклу.
    </div>
  `,
  hint: `Фінальне повідомлення має стояти без відступу, бо воно повинно виконатися тільки після завершення циклу.`,
  expected: `1\n2\n3\nГотово!`,
  tests: [
    { type: "stdoutEquals", name: "Вивід правильний", value: "1\n2\n3\nГотово!", normalize: "soft" },
    { type: "codeRegex", name: "Цикл x <= 3", pattern: "while\\s+x\\s*<=\\s*3\\s*:" },
    { type: "codeRegex", name: "Є збільшення x", pattern: "x\\s*\\+\\s*=\\s*1|x\\s*=\\s*x\\s*\\+\\s*1" },
    { type: "codeRegex", name: "Фінальний print без відступу", pattern: "\\nprint\\s*\\(\\s*['\"]Готово!['\"]\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🔢 Рахуємо спроби",
  xp: 80,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Лічильник спроб</h2>
    <p>Цикл можна поєднати з <code>input()</code> і лічильником. Так програма може рахувати, скільки разів користувач щось вводив.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">ans = ""<br>count = 0<br><b style="color: #8b5cf6;">while</b> ans != "ок":<br>&nbsp;&nbsp;&nbsp;&nbsp;ans = input("Введи ок: ")<br>&nbsp;&nbsp;&nbsp;&nbsp;count += 1<br>print("Кількість спроб:", count)</div>
  `,
  desc: `
    <div class="task-main">
      <p>Програма просить пін-код і рахує, скільки спроб витратив користувач. Після правильного коду вона виводить кількість спроб.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">pin = ""</code> і <code style="color: #0ea5e9;">tries = 0</code>.<br>
      2. Повторюй цикл, поки <code style="color: #0ea5e9;">pin != "123"</code>.<br>
      3. Всередині циклу запитуй <code style="color: #0ea5e9;">input("Пін: ")</code> і збільшуй <code style="color: #0ea5e9;">tries</code> на 1.<br>
      4. Після циклу виведи <code style="color: #0ea5e9;">"Спроб:"</code> і значення <code style="color: #0ea5e9;">tries</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> лічильник спроб має збільшуватися всередині циклу після кожного введення.
    </div>
  `,
  hint: `Тобі потрібні дві змінні: одна для пін-коду, друга для кількості спроб. Фінальний друк має бути поза циклом.`,
  expected: `Пін: 123\nСпроб: 1`,
  tests: [
    { type: "codeRegex", name: "Створено pin", pattern: "pin\\s*=\\s*['\"]['\"]" },
    { type: "codeRegex", name: "Створено tries = 0", pattern: "tries\\s*=\\s*0" },
    { type: "codeRegex", name: "Правильний цикл", pattern: "while\\s+pin\\s*!=\\s*['\"]123['\"]\\s*:" },
    { type: "codeRegex", name: "Лічильник росте", pattern: "tries\\s*\\+\\s*=\\s*1|tries\\s*=\\s*tries\\s*\\+\\s*1" },
    { type: "codeRegex", name: "Друк спроб зовні", pattern: "\\nprint\\s*\\(\\s*['\"]Спроб:['\"]\\s*,\\s*tries\\s*\\)", checkRaw: true }
  ]
},

{
  title: "✨ Цикл + f-рядок",
  xp: 85,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Красивий вивід у циклі</h2>
    <p>У циклі можна використовувати f-рядки, щоб виводити текст разом зі змінною.</p>
    <p>Значення змінної змінюється, а f-рядок кожного разу підставляє нове число.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">day = 1<br><b style="color: #8b5cf6;">while</b> day &lt;= 3:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(f"День {day}")<br>&nbsp;&nbsp;&nbsp;&nbsp;day += 1</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">День 1<br>День 2<br>День 3</div>
  `,
  desc: `
    <div class="task-main">
      <p>Генеруємо звіт про хвилі ворогів. Програма має вивести три хвилі.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">wave = 1</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while wave &lt;= 3:</code>.<br>
      3. Всередині циклу виводь f-рядок <code style="color: #0ea5e9;">Хвиля ... почалась!</code>, підставляючи значення <code style="color: #0ea5e9;">wave</code>.<br>
      4. Не забудь збільшувати <code style="color: #0ea5e9;">wave</code> на 1.
    </div>

    <div class="task-note">
      <b>Важливо:</b> f-рядок має бути всередині циклу, щоб кожна хвиля отримала свій номер.
    </div>
  `,
  hint: `Змінна wave має змінюватися в циклі, а f-рядок має підставляти її поточне значення.`,
  expected: `Хвиля 1 почалась!\nХвиля 2 почалась!\nХвиля 3 почалась!`,
  tests: [
    { type: "stdoutEquals", name: "Хвилі виведено", value: "Хвиля 1 почалась!\nХвиля 2 почалась!\nХвиля 3 почалась!", normalize: "soft" },
    { type: "codeRegex", name: "Цикл wave <= 3", pattern: "while\\s+wave\\s*<=\\s*3\\s*:" },
    { type: "codeRegex", name: "f-рядок у циклі", pattern: "print\\s*\\(\\s*f['\"]Хвиля \\{\\s*wave\\s*\\} почалась!['\"]\\s*\\)", checkRaw: true },
    { type: "codeRegex", name: "Збільшення wave", pattern: "wave\\s*\\+\\s*=\\s*1|wave\\s*=\\s*wave\\s*\\+\\s*1" }
  ]
},

{
  title: "🧮 Математика в умові циклу",
  xp: 90,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Формула в умові</h2>
    <p>Умова циклу може містити не тільки одну змінну, а й математичний вираз.</p>
    <p>Python буде перераховувати цей вираз перед кожним новим колом циклу.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">wallet = 10<br>price = 50<br><b style="color: #8b5cf6;">while</b> wallet - price &lt; 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Заробляю...")<br>&nbsp;&nbsp;&nbsp;&nbsp;wallet += 20</div>
  `,
  desc: `
    <div class="task-main">
      <p>У тебе є 10 яблук і 20 груш. Кожного кроку ти додаєш 5 яблук. Цикл працює, поки загальна кількість фруктів менша за 50.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">a = 10</code> та <code style="color: #0ea5e9;">b = 20</code>.<br>
      2. Напиши цикл з умовою <code style="color: #0ea5e9;">while a + b &lt; 50:</code>.<br>
      3. Всередині циклу збільшуй тільки <code style="color: #0ea5e9;">a</code> на 5.<br>
      4. Після завершення циклу виведи суму <code style="color: #0ea5e9;">a + b</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> змінна <code>b</code> не змінюється, але сума росте завдяки змінній <code>a</code>.
    </div>
  `,
  hint: `Умова має перевіряти суму двох змінних, а всередині циклу змінюється лише одна з них.`,
  expected: `50`,
  tests: [
    { type: "stdoutEquals", name: "Сума вірна", value: "50", normalize: "soft" },
    { type: "codeRegex", name: "Створено a = 10", pattern: "a\\s*=\\s*10" },
    { type: "codeRegex", name: "Створено b = 20", pattern: "b\\s*=\\s*20" },
    { type: "codeRegex", name: "Математика в умові", pattern: "while\\s+a\\s*\\+\\s*b\\s*<\\s*50\\s*:" },
    { type: "codeRegex", name: "Збільшення a", pattern: "a\\s*\\+\\s*=\\s*5|a\\s*=\\s*a\\s*\\+\\s*5" }
  ]
},

{
  title: "📥 Інтерактивний акумулятор",
  xp: 100,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Акумулятор з input()</h2>
    <p>Ми можемо додавати до акумулятора числа, які вводить користувач.</p>
    <p>Оскільки <code>input()</code> повертає текст, число треба перетворити через <code style="color: #0ea5e9;">int()</code>.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">score = 0<br><b style="color: #8b5cf6;">while</b> score &lt; 100:<br>&nbsp;&nbsp;&nbsp;&nbsp;score += int(input("Додай бали: "))</div>

    <div class="theory-alert theory-alert-warn">
      💡 <b>Запам’ятай:</b> якщо треба додавати введене число, використовуй <code>int(input(...))</code>.
    </div>
  `,
  desc: `
    <div class="task-main">
      <p>Програма збирає пожертви. Цикл зупиниться тільки тоді, коли загальна сума досягне 100 або більше.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">total = 0</code>.<br>
      2. Повторюй цикл, поки <code style="color: #0ea5e9;">total &lt; 100</code>.<br>
      3. Всередині циклу додавай до <code style="color: #0ea5e9;">total</code> число, яке ввів користувач.<br>
      4. Після циклу виведи <code style="color: #0ea5e9;">"Мети досягнуто!"</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> введене значення треба перетворити на число за допомогою <code>int()</code>.
    </div>
  `,
  hint: `Усередині циклу треба поєднати акумулятор, input() та int(), щоб додавати не текст, а число.`,
  expected: `Дай гроші: 100\nМети досягнуто!`,
  tests: [
    { type: "codeRegex", name: "Стартове total = 0", pattern: "total\\s*=\\s*0" },
    { type: "codeRegex", name: "Умова total < 100", pattern: "while\\s+total\\s*<\\s*100\\s*:" },
    { type: "codeRegex", name: "Інтерактивний акумулятор", pattern: "total\\s*\\+\\s*=\\s*int\\s*\\(\\s*input\\s*\\(\\s*['\"]Дай гроші:\\s*['\"]\\s*\\)\\s*\\)" },
    { type: "codeRegex", name: "Фінальний друк зовні", pattern: "\\nprint\\s*\\(\\s*['\"]Мети досягнуто!['\"]\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🕹️ Ігровий цикл (Game Loop)",
  xp: 110,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Серце гри</h2>
    <p>У багатьох іграх є головний цикл, який працює, поки гра активна. Такий цикл часто називають <b style="color: #10b981;">Game Loop</b>.</p>
    <p>Для цього зручно використовувати змінну-прапорець: <code style="color: #0ea5e9;">game = True</code>.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">is_running = True<br><b style="color: #8b5cf6;">while</b> is_running:<br>&nbsp;&nbsp;&nbsp;&nbsp;cmd = input("Дія: ")<br>&nbsp;&nbsp;&nbsp;&nbsp;if cmd == "стоп":<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_running = False</div>
  `,
  desc: `
    <div class="task-main">
      <p>Створи простий чат-бот. Він працює, доки гравець не введе команду "стоп".</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи прапорець <code style="color: #0ea5e9;">game = True</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while game:</code>.<br>
      3. Всередині циклу запитуй команду через <code style="color: #0ea5e9;">input("Команда: ")</code>.<br>
      4. Якщо команда дорівнює <code style="color: #0ea5e9;">"стоп"</code>, зміни прапорець на <code style="color: #0ea5e9;">False</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> тут є вкладений <code>if</code>. Рядок <code>game = False</code> має бути всередині цього <code>if</code>.
    </div>
  `,
  hint: `Подумай про прапорець: цикл працює, поки він True, а команда "стоп" має перемкнути його на False.`,
  expected: `Команда: стоп`,
  tests: [
    { type: "codeRegex", name: "Створено game = True", pattern: "game\\s*=\\s*True" },
    { type: "codeRegex", name: "Цикл з прапорцем", pattern: "while\\s+game\\s*:" },
    { type: "codeRegex", name: "Вкладений if", pattern: "if\\s+cmd\\s*==\\s*['\"]стоп['\"]\\s*:" },
    { type: "codeRegex", name: "Зміна прапорця", pattern: "\\n\\s{4,}game\\s*=\\s*False", checkRaw: true }
  ]
},

{
  title: "🦜 Ехо-бот",
  xp: 120,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Цикл, який відповідає</h2>
    <p>Цикл може не тільки запитувати дані, а й реагувати на них. Наприклад, бот може повторювати все, що вводить користувач.</p>
    <p>Але якщо користувач вводить стоп-слово, бот має завершити роботу.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">txt = ""<br><b style="color: #8b5cf6;">while</b> txt != "вихід":<br>&nbsp;&nbsp;&nbsp;&nbsp;txt = input("Скажи: ")<br>&nbsp;&nbsp;&nbsp;&nbsp;if txt != "вихід":<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Ти сказав:", txt)</div>
  `,
  desc: `
    <div class="task-main">
      <p>Бот повторює все, що ти пишеш. Але якщо ти напишеш "тиша", він не повторює це слово і завершує роботу.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи змінну <code style="color: #0ea5e9;">word = ""</code>.<br>
      2. Повторюй цикл, поки <code style="color: #0ea5e9;">word != "тиша"</code>.<br>
      3. Всередині циклу запитуй слово через <code style="color: #0ea5e9;">input("Ти: ")</code>.<br>
      4. Якщо слово не дорівнює <code style="color: #0ea5e9;">"тиша"</code>, надрукуй його.
    </div>

    <div class="task-note">
      <b>Важливо:</b> внутрішній <code>if</code> потрібен, щоб бот не друкував стоп-слово перед завершенням.
    </div>
  `,
  hint: `Після input() треба перевірити слово ще раз: друкувати його можна лише тоді, коли це не стоп-слово.`,
  expected: `Ти: тиша`,
  tests: [
    { type: "codeRegex", name: "Створено word", pattern: "word\\s*=\\s*['\"]['\"]" },
    { type: "codeRegex", name: "Умова while", pattern: "while\\s+word\\s*!=\\s*['\"]тиша['\"]\\s*:" },
    { type: "codeRegex", name: "Внутрішній if", pattern: "if\\s+word\\s*!=\\s*['\"]тиша['\"]\\s*:" },
    { type: "codeRegex", name: "Друк слова", pattern: "\\n\\s{4,}print\\s*\\(\\s*word\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🩸 Регенерація здоров'я",
  xp: 130,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Відновлення значення</h2>
    <p>Цикл можна використати для поступового відновлення здоров’я, енергії або мани.</p>
    <p>Ми повторюємо дію, поки значення не дійде до потрібної межі.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">mana = 0<br><b style="color: #8b5cf6;">while</b> mana &lt; 50:<br>&nbsp;&nbsp;&nbsp;&nbsp;mana += 10<br>&nbsp;&nbsp;&nbsp;&nbsp;print("Мана:", mana)</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">Мана: 10<br>Мана: 20<br>Мана: 30<br>Мана: 40<br>Мана: 50</div>
  `,
  desc: `
    <div class="task-main">
      <p>Герой має 60 HP. Максимум — 100 HP. Зілля відновлює по 20 HP за крок.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">hp = 60</code>.<br>
      2. Повторюй цикл, поки <code style="color: #0ea5e9;">hp &lt; 100</code>.<br>
      3. Всередині циклу збільшуй <code style="color: #0ea5e9;">hp</code> на 20 і друкуй його.<br>
      4. Після циклу виведи <code style="color: #0ea5e9;">"Фулл HP!"</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> спочатку збільшуй HP, а вже потім друкуй нове значення.
    </div>
  `,
  hint: `Цикл має працювати, поки HP менше максимуму. Фінальне повідомлення має бути поза циклом.`,
  expected: `80\n100\nФулл HP!`,
  tests: [
    { type: "stdoutEquals", name: "Здоров'я відновлено", value: "80\n100\nФулл HP!", normalize: "soft" },
    { type: "codeRegex", name: "Стартове hp = 60", pattern: "hp\\s*=\\s*60" },
    { type: "codeRegex", name: "Умова hp < 100", pattern: "while\\s+hp\\s*<\\s*100\\s*:" },
    { type: "codeRegex", name: "Лікування", pattern: "hp\\s*\\+\\s*=\\s*20|hp\\s*=\\s*hp\\s*\\+\\s*20" },
    { type: "codeRegex", name: "Фінальний print зовні", pattern: "\\nprint\\s*\\(\\s*['\"]Фулл HP!['\"]\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🛑 Помилка на одиницю (Off-by-one)",
  xp: 140,
  kind: "practice",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Класичний баг</h2>
    <p>Одна з найчастіших помилок у циклах — переплутати <code>&lt;</code> і <code>&lt;=</code>.</p>
    <p>Таку помилку називають <b style="color: #ef4444;">off-by-one</b>, тобто “помилка на одиницю”.</p>

    <p><b>Приклад коду:</b></p>
    <div class="code-box">x = 8<br><b style="color: #8b5cf6;">while</b> x &lt; 10:<br>&nbsp;&nbsp;&nbsp;&nbsp;x += 1<br>&nbsp;&nbsp;&nbsp;&nbsp;print(x)</div>
    <p><b>Результат у терміналі:</b></p>
    <div class="output-box">9<br>10</div>

    <div class="theory-alert theory-alert-warn">
      💡 Якщо змінна збільшується перед друком, треба уважно подумати, яке число має стояти в умові.
    </div>
  `,
  desc: `
    <div class="task-main">
      <p>Програма має надрукувати 9 і 10. Треба уважно налаштувати умову циклу, щоб фінальне число не загубилося.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">x = 8</code>.<br>
      2. Напиши цикл, який дозволить отримати числа <code style="color: #0ea5e9;">9</code> і <code style="color: #0ea5e9;">10</code>.<br>
      3. Всередині циклу спочатку збільшуй <code style="color: #0ea5e9;">x</code> на 1, а потім друкуй <code style="color: #0ea5e9;">x</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> зверни увагу, що друк відбувається після збільшення змінної.
    </div>
  `,
  hint: `Подумай, коли саме x стає 10: до друку чи після друку. Від цього залежить правильна умова.`,
  expected: `9\n10`,
  tests: [
    { type: "stdoutEquals", name: "Дорахувало до 10", value: "9\n10", normalize: "soft" },
    { type: "codeRegex", name: "Стартове x = 8", pattern: "x\\s*=\\s*8" },
    { type: "codeRegex", name: "Допустима умова", pattern: "while\\s+x\\s*<\\s*10\\s*:|while\\s+x\\s*<=\\s*9\\s*:" },
    { type: "codeRegex", name: "x збільшується", pattern: "x\\s*\\+\\s*=\\s*1|x\\s*=\\s*x\\s*\\+\\s*1" }
  ]
},

// ==========================================
// 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
// ==========================================

{
  title: "🎯 Підсумкова 1: Валідатор пароля",
  xp: 250,
  kind: "quiz",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Підсумкова №1: while + len()</h2>
    <p>Тут треба поєднати цикл <code>while</code>, введення даних і функцію <code>len()</code>, яка рахує довжину тексту.</p>
  `,
  desc: `
    <div class="task-main">
      <p>Сайт просить придумати пароль довжиною мінімум 5 символів. Поки пароль закороткий, сайт буде просити його знову.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">pwd = ""</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while len(pwd) &lt; 5:</code>.<br>
      3. Всередині циклу перезаписуй <code style="color: #0ea5e9;">pwd</code> через <code style="color: #0ea5e9;">input("Пароль: ")</code>.<br>
      4. Після циклу виведи <code style="color: #0ea5e9;">"Успіх!"</code>.
    </div>
  `,
  hint: `Перевіряти треба не сам пароль, а його довжину. Для цього використовується функція len().`,
  expected: `Пароль: 12345\nУспіх!`,
  tests: [
    { type: "codeRegex", name: "Створено pwd", pattern: "pwd\\s*=\\s*['\"]['\"]" },
    { type: "codeRegex", name: "Цикл з len()", pattern: "while\\s+len\\s*\\(\\s*pwd\\s*\\)\\s*<\\s*5\\s*:" },
    { type: "codeRegex", name: "Ввід всередині", pattern: "\\n\\s+pwd\\s*=\\s*input\\s*\\(\\s*['\"]Пароль:\\s*['\"]\\s*\\)", checkRaw: true },
    { type: "codeRegex", name: "Друк зовні", pattern: "\\nprint\\s*\\(\\s*['\"]Успіх!['\"]\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🎯 Підсумкова 2: Скарбничка",
  xp: 300,
  kind: "quiz",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Підсумкова №2: акумулятор + input()</h2>
    <p>Тут треба використати змінну-акумулятор, цикл <code>while</code>, <code>input()</code> і перетворення тексту в число через <code>int()</code>.</p>
  `,
  desc: `
    <div class="task-main">
      <p>Ти збираєш 1000 гривень на нову гру. Програма додає введені суми до скарбнички, поки потрібна сума не буде зібрана.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи <code style="color: #0ea5e9;">money = 0</code>.<br>
      2. Повторюй цикл, поки <code style="color: #0ea5e9;">money &lt; 1000</code>.<br>
      3. Всередині циклу додавай до <code style="color: #0ea5e9;">money</code> число, яке ввів користувач.<br>
      4. Після циклу виведи <code style="color: #0ea5e9;">"Зібрано!"</code>.
    </div>
  `,
  hint: `У цій задачі треба згадати три речі: акумулятор, int(input(...)) і фінальний print поза циклом.`,
  expected: `Кинь гроші: 1000\nЗібрано!`,
  tests: [
    { type: "codeRegex", name: "Створено money = 0", pattern: "money\\s*=\\s*0" },
    { type: "codeRegex", name: "Цикл money < 1000", pattern: "while\\s+money\\s*<\\s*1000\\s*:" },
    { type: "codeRegex", name: "Додавання вводу", pattern: "money\\s*\\+\\s*=\\s*int\\s*\\(\\s*input\\s*\\(\\s*['\"]Кинь гроші:\\s*['\"]\\s*\\)\\s*\\)" },
    { type: "codeRegex", name: "Друк зовні", pattern: "\\nprint\\s*\\(\\s*['\"]Зібрано!['\"]\\s*\\)", checkRaw: true }
  ]
},

{
  title: "🎯 Підсумкова 3: Меню гри",
  xp: 350,
  kind: "quiz",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Підсумкова №3: Game Loop</h2>
    <p>Тут треба створити цикл, який працює за прапорцем, і зупинити його через вкладений <code>if</code>.</p>
  `,
  desc: `
    <div class="task-main">
      <p>Головне меню гри чекає на команди. Якщо користувач вводить "вихід", програма змінює прапорець і зупиняє цикл.</p>
    </div>

    <div class="task-condition">
      <b>Умова:</b><br>
      1. Створи прапорець <code style="color: #0ea5e9;">is_playing = True</code>.<br>
      2. Напиши цикл <code style="color: #0ea5e9;">while is_playing:</code>.<br>
      3. Всередині циклу запитуй команду через <code style="color: #0ea5e9;">input("Дія: ")</code>.<br>
      4. Якщо команда дорівнює <code style="color: #0ea5e9;">"вихід"</code>, зміни прапорець на <code style="color: #0ea5e9;">False</code>.
    </div>
  `,
  hint: `Згадай логіку прапорця: цикл працює, поки прапорець True, а команда виходу перемикає його на False.`,
  expected: `Дія: вихід`,
  tests: [
    { type: "codeRegex", name: "Створено is_playing", pattern: "is_playing\\s*=\\s*True" },
    { type: "codeRegex", name: "Цикл по прапорцю", pattern: "while\\s+is_playing\\s*:" },
    { type: "codeRegex", name: "Умова виходу", pattern: "if\\s+cmd\\s*==\\s*['\"]вихід['\"]\\s*:" },
    { type: "codeRegex", name: "Зміна прапорця", pattern: "\\n\\s{4,}is_playing\\s*=\\s*False", checkRaw: true }
  ]
},

// ==========================================
// 🟢 JUNIOR BOSS
// ==========================================

{
  title: "🐉 БОС (Junior): Заправка ракети",
  xp: 800,
  kind: "boss",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: симуляція процесу</h2>
    <p>Тут треба об'єднати цикл <code>while</code>, акумулятор, <code>input()</code>, лічильник і f-рядок.</p>
    <p>Це фінальна перевірка того, чи розумієш ти, як цикл керує процесом.</p>
  `,
  desc: `
    <div class="task-main">
      <p>Ракета потребує 100 одиниць пального для зльоту. Користувач заливає пальне частинами. Програма має порахувати, скільки разів він доливав пальне.</p>
    </div>

    <div class="task-condition">
      <b>Умови місії:</b><br>
      1. Створи <code style="color: #0ea5e9;">fuel = 0</code> та <code style="color: #0ea5e9;">steps = 0</code>.<br>
      2. Зроби цикл, який працює, поки <code style="color: #0ea5e9;">fuel &lt; 100</code>.<br>
      3. Всередині циклу додавай до <code style="color: #0ea5e9;">fuel</code> число, яке введе користувач через <code style="color: #0ea5e9;">input("Залито: ")</code>.<br>
      4. Там само збільшуй <code style="color: #0ea5e9;">steps</code> на 1.<br>
      5. Після завершення циклу виведи f-рядок <code style="color: #0ea5e9;">Повний бак! Кроків: ...</code>, підставивши значення <code style="color: #0ea5e9;">steps</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> <code>steps</code> має збільшуватися на 1 кожного кола циклу, незалежно від того, скільки пального залили.
    </div>
  `,
  hint: `Збери задачу з частин: акумулятор пального, лічильник кроків, input() з int() і фінальний f-рядок після циклу.`,
  expected: `Залито: 100\nПовний бак! Кроків: 1`,
  tests: [
    { type: "codeRegex", name: "Дві змінні", pattern: "fuel\\s*=\\s*0.*steps\\s*=\\s*0", flags: "s" },
    { type: "codeRegex", name: "Цикл fuel < 100", pattern: "while\\s+fuel\\s*<\\s*100\\s*:" },
    { type: "codeRegex", name: "Акумулятор пального", pattern: "fuel\\s*\\+\\s*=\\s*int\\s*\\(\\s*input\\s*\\(\\s*['\"]Залито:\\s*['\"]\\s*\\)\\s*\\)" },
    { type: "codeRegex", name: "Лічильник кроків", pattern: "steps\\s*\\+\\s*=\\s*1|steps\\s*=\\s*steps\\s*\\+\\s*1" },
    { type: "codeRegex", name: "Друк f-рядком зовні", pattern: "\\nprint\\s*\\(\\s*f['\"]Повний бак! Кроків:\\s*\\{\\s*steps\\s*\\}['\"]\\s*\\)", checkRaw: true }
  ]
},

// ==========================================
// 🟢 JUNIOR BOSS
// ==========================================

{
  title: "🐉 БОС (Junior): Заправка ракети",
  xp: 800,
  kind: "boss",
  difficulty: "Junior",
  theory: `
    <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: симуляція процесу</h2>
    <p>Тут треба об'єднати цикл <code>while</code>, акумулятор, <code>input()</code>, лічильник і f-рядок.</p>
    <p>Це фінальна перевірка того, чи розумієш ти, як цикл керує процесом.</p>
  `,
  desc: `
    <div class="task-main">
      <p>Ракета потребує 100 одиниць пального для зльоту. Користувач заливає пальне частинами. Програма має порахувати, скільки разів він доливав пальне.</p>
    </div>

    <div class="task-condition">
      <b>Умови місії:</b><br>
      1. Створи <code style="color: #0ea5e9;">fuel = 0</code> та <code style="color: #0ea5e9;">steps = 0</code>.<br>
      2. Зроби цикл, який працює, поки <code style="color: #0ea5e9;">fuel &lt; 100</code>.<br>
      3. Всередині циклу додавай до <code style="color: #0ea5e9;">fuel</code> число, яке введе користувач через <code style="color: #0ea5e9;">input("Залито: ")</code>.<br>
      4. Там само збільшуй <code style="color: #0ea5e9;">steps</code> на 1.<br>
      5. Після завершення циклу виведи f-рядок <code style="color: #0ea5e9;">Повний бак! Кроків: ...</code>, підставивши значення <code style="color: #0ea5e9;">steps</code>.
    </div>

    <div class="task-note">
      <b>Важливо:</b> <code>steps</code> має збільшуватися на 1 кожного кола циклу, незалежно від того, скільки пального залили.
    </div>
  `,
  hint: `Збери задачу з частин: акумулятор пального, лічильник кроків, input() з int() і фінальний f-рядок після циклу.`,
  expected: `Залито: 100\nПовний бак! Кроків: 1`,
  tests: [
    { type: "codeRegex", name: "Дві змінні", pattern: "fuel\\s*=\\s*0.*steps\\s*=\\s*0", flags: "s" },
    { type: "codeRegex", name: "Цикл fuel < 100", pattern: "while\\s+fuel\\s*<\\s*100\\s*:" },
    { type: "codeRegex", name: "Акумулятор пального", pattern: "fuel\\s*\\+\\s*=\\s*int\\s*\\(\\s*input\\s*\\(\\s*['\"]Залито:\\s*['\"]\\s*\\)\\s*\\)" },
    { type: "codeRegex", name: "Лічильник кроків", pattern: "steps\\s*\\+\\s*=\\s*1|steps\\s*=\\s*steps\\s*\\+\\s*1" },
    { type: "codeRegex", name: "Друк f-рядком зовні", pattern: "\\nprint\\s*\\(\\s*f['\"]Повний бак! Кроків:\\s*\\{\\s*steps\\s*\\}['\"]\\s*\\)", checkRaw: true }
  ]
},
      
      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Нескінченні цикли та Управління)
      // ==========================================

      {
        title: "♾️ Нескінченність (while True)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Двигун програми</h2>
          <p>Більшість сучасних програм (сайти, ігри, сервери) працюють нескінченно, поки ти їх не вимкнеш. Для цього використовується цикл, умова якого <b>ЗАВЖДИ правдива</b>.</p>
          <p>Замість того, щоб писати математику або створювати змінну-прапорець, програмісти пишуть просто <b style="color: #3b82f6;"><code>while True:</code></b>.</p>
          <p>Але як його зупинити? За допомогою команди <b style="color: #ef4444;"><code>break</code></b> (зламати/розірвати)! Вона миттєво знищує цикл, і програма йде далі.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><b style="color: #3b82f6;">while True:</b><br>    cmd = input("Команда: ")<br>    if cmd == "вихід":<br>        <b style="color: #ef4444;">break</b>  <span style="color:gray;"># Виходимо з циклу!</span><br>    print("Працюю...")<br>print("Вимкнено")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Команда: тест<br>Працюю...<br>Команда: вихід<br>Вимкнено</div>
        `,
        desc: `
          <div class="task-main">
            <p>Бот-помічник нескінченно приймає команди користувача. Він зупиниться і вимкнеться тільки тоді, коли користувач введе секретне слово "стоп".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши нескінченний цикл: <code style="color: #0ea5e9;">while True:</code>.<br>
            Всередині запитай: <code style="color: #0ea5e9;">cmd = input("Команда: ")</code>.<br>
            Додай умову: <code style="color: #0ea5e9;">if cmd == "стоп":</code>, і всередині неї напиши команду <code style="color: #0ea5e9;">break</code>.<br>
            Зовні циклу (без відступів, у самому кінці) виведи: <code>"Бот вимкнений"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Слово <code>True</code> обов'язково пишеться з ВЕЛИКОЇ літери! Команда <code>break</code> має бути з подвійним відступом (бо вона всередині <code>if</code>, який всередині <code>while</code>).
          </div>
        `,
        hint: `while True:\n    cmd = input("Команда: ")\n    if cmd == "стоп":\n        break\nprint("Бот вимкнений")`,
        expected: `Команда: стоп\nБот вимкнений`,
        tests: [
          { type: "codeRegex", name: "Нескінченний цикл", pattern: "while\\s+True\\s*:" },
          { type: "codeRegex", name: "Умова зупинки", pattern: "if\\s+cmd\\s*==\\s*['\"]стоп['\"]\\s*:" },
          { type: "codeRegex", name: "Використано break", pattern: "\\n\\s{4,}break" },
          { type: "codeRegex", name: "Зовнішній print", pattern: "\\nprint\\s*\\(\\s*['\"]Бот вимкнений['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🛡️ Броньований ввід (Валідація)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Захист від дурня</h2>
          <p>Що, якщо програма просить ввести ПІН-код, а користувач вводить літери "qwerty"? Якщо застосувати <code>int()</code> до літер, програма впаде з помилкою <code>ValueError</code>.</p>
          <p>Щоб цього уникнути, ми використовуємо нескінченний цикл, який <b>не випустить користувача</b>, поки він не введе правильні дані (наприклад, перевіряючи їх через <code>.isdigit()</code>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">while True:<br>    age = input("Вік: ")<br>    if age.isdigit():<br>        <b style="color: #10b981;">break</b><br>    print("Помилка!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить ввести ПІН-код. Якщо користувач вводить букви, вона свариться і просить знову. Якщо він вводить цифри — цикл переривається, і код йде далі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши: <code style="color: #0ea5e9;">while True:</code>.<br>
            Всередині запитай текст: <code style="color: #0ea5e9;">pin = input("Пін-код: ")</code>.<br>
            Якщо ввід складається тільки з цифр (<code style="color: #0ea5e9;">if pin.isdigit():</code>), зроби <code style="color: #0ea5e9;">break</code>.<br>
            Інакше (<code style="color: #0ea5e9;">else:</code>) виведи <code style="color: #0ea5e9;">"Тільки цифри!"</code>.<br>
            Зовні циклу виведи: <code style="color: #0ea5e9;">"Збережено"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Цикл "крутитиметься", поки <code>pin.isdigit()</code> не стане True і не викличе <code>break</code>.
          </div>
        `,
        hint: `while True:\n    pin = input("Пін-код: ")\n    if pin.isdigit():\n        break\n    else:\n        print("Тільки цифри!")\nprint("Збережено")`,
        expected: `Пін-код: abc\nТільки цифри!\nПін-код: 1234\nЗбережено`,
        tests: [
          { type: "codeRegex", name: "Нескінченний цикл", pattern: "while\\s+True\\s*:" },
          { type: "codeRegex", name: "Перевірка isdigit", pattern: "if\\s+pin\\.isdigit\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Вихід (break)", pattern: "\\n\\s{4,}break" },
          { type: "codeRegex", name: "Попередження (else)", pattern: "else\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]Тільки цифри!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "⏭️ Пропуск кроку (continue)",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ігноруємо зайве</h2>
          <p>Команда <code>break</code> знищує цикл назавжди. А що, якщо ми хочемо просто <b>проігнорувати один хід</b> і одразу почати наступне коло?</p>
          <p>Для цього існує команда <b style="color: #f59e0b;"><code>continue</code></b> (продовжити). Коли Python бачить <code>continue</code>, він ігнорує весь код нижче і миттєво стрибає на початок циклу (до слова <code>while</code>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">while True:<br>    cmd = input("Дія: ")<br>    if cmd == "спам":<br>        <b style="color: #f59e0b;">continue</b> <span style="color:gray;"># Ігноруємо і йдемо на нове коло</span><br>    print("Виконано:", cmd)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Бот-рахівник просить вводити числа і додає їх у суму. Але якщо користувач вводить від'ємне число, бот просто ігнорує його і йде на нове коло. Зупинка відбувається при введенні "0".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>total = 0</code>. Зроби <code>while True:</code>.<br>
            Всередині запитай <code style="color: #0ea5e9;">num = int(input("Число: "))</code>.<br>
            1. Якщо <code style="color: #0ea5e9;">num == 0:</code>, то <code style="color: #0ea5e9;">break</code>.<br>
            2. Якщо <code style="color: #0ea5e9;">num &lt; 0:</code>, то <code style="color: #0ea5e9;">continue</code> (пропускаємо мінусові).<br>
            3. Прямо в циклі (на рівні з if) додай до суми: <code style="color: #0ea5e9;">total += num</code>.<br>
            Зовні циклу виведи <code>total</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Рядок <code>total += num</code> НЕ виконається для від'ємних чисел, бо <code>continue</code> відкине програму на початок до того, як вона до нього дійде!
          </div>
        `,
        hint: `while True:\n    num = int(input("Число: "))\n    if num == 0:\n        break\n    if num < 0:\n        continue\n    total += num`,
        expected: `Число: -5\nЧисло: 10\nЧисло: 0\n10`,
        tests: [
          { type: "codeRegex", name: "Ввід як число", pattern: "num\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано break", pattern: "if\\s+num\\s*==\\s*0\\s*:\\s*\\n\\s*break" },
          { type: "codeRegex", name: "Використано continue", pattern: "if\\s+num\\s*<\\s*0\\s*:\\s*\\n\\s*continue" },
          { type: "codeRegex", name: "Додавання до суми", pattern: "total\\s*\\+\\s*=\\s*num" }
        ]
      },

      {
        title: "⚠️ Обережно з continue!",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пастка нескінченності</h2>
          <div class="theory-alert theory-alert-danger">
            🚨 <b>Часта помилка:</b> Якщо ти використовуєш лічильник (наприклад, <code>x += 1</code>) і ставиш <code>continue</code> <b>ПЕРЕД</b> його збільшенням, цикл зависне назавжди! Комп'ютер буде вічно повертатися на початок, так і не збільшивши лічильник.
          </div>
          <p><b>Правило:</b> У циклах з математичною умовою (не <code>while True</code>) збільшуй лічильник ДО команди <code>continue</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перебирає поверхи від 1 до 5. Але ліфт не зупиняється на 3 поверсі (пропускає його).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">floor = 0</code>. Зроби цикл <code style="color: #0ea5e9;">while floor &lt; 5:</code>.<br>
            1. ВІДРАЗУ всередині збільш поверх: <code style="color: #0ea5e9;">floor += 1</code>.<br>
            2. Напиши: якщо <code style="color: #0ea5e9;">floor == 3:</code>, то <code style="color: #0ea5e9;">continue</code>.<br>
            3. В кінці циклу виведи: <code>print(f"Поверх {floor}")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Оскільки <code>floor += 1</code> стоїть на самому початку, <code>continue</code> не зламає цикл. Третій поверх просто не надрукується.
          </div>
        `,
        hint: `while floor < 5:\n    floor += 1\n    if floor == 3:\n        continue\n    print(f"Поверх {floor}")`,
        expected: `Поверх 1\nПоверх 2\nПоверх 4\nПоверх 5`,
        tests: [
          { type: "codeRegex", name: "Лічильник росте ДО continue", pattern: "floor\\s*\\+\\s*=\\s*1.*continue", flags: "s" },
          { type: "codeRegex", name: "Умова пропуску", pattern: "if\\s+floor\\s*==\\s*3\\s*:\\s*\\n\\s*continue" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "print\\s*\\(\\s*f['\"]Поверх \\{\\s*floor\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "💬 Ігноруємо Enter",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чистота чату</h2>
          <p>Коли користувачі просто тиснуть Enter, <code>input()</code> повертає порожній рядок <code>""</code>. Ми можемо використовувати <code>continue</code>, щоб ігнорувати такі вводи і просити знову!</p>
          <p>Згадай: порожній рядок — це <code>False</code>. Тому <b style="color: #3b82f6;"><code>if not text:</code></b> означає "якщо тексту немає".</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">while True:<br>    msg = input("Ввід: ")<br>    if not msg:<br>        continue <span style="color:gray;"># Ігноруємо порожній Enter</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Чат-бот луна. Він повторює фрази. Якщо відправити йому порожнечу — він промовчить і чекатиме далі. Щоб вимкнути його, треба написати "вихід".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code style="color: #0ea5e9;">while True:</code>.<br>
            Запитай <code style="color: #0ea5e9;">msg = input("Ти: ").strip()</code>.<br>
            - Якщо <code style="color: #0ea5e9;">not msg:</code>, то <code style="color: #0ea5e9;">continue</code>.<br>
            - Якщо <code style="color: #0ea5e9;">msg == "вихід":</code>, то <code style="color: #0ea5e9;">break</code>.<br>
            В кінці циклу: <code style="color: #0ea5e9;">print(f"Бот: {msg}")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Завдяки <code>.strip()</code>, навіть якщо користувач введе купу пробілів і натисне Enter, вони зріжуться, рядок стане порожнім і <code>continue</code> спрацює ідеально!
          </div>
        `,
        hint: `if not msg:\n    continue\nif msg == "вихід":\n    break`,
        expected: `Ти: привіт\nБот: привіт\nТи: вихід`,
        tests: [
          { type: "codeRegex", name: "Перевірка на порожнечу", pattern: "if\\s+not\\s+msg\\s*:\\s*\\n\\s*continue" },
          { type: "codeRegex", name: "Вихід", pattern: "if\\s+msg\\s*==\\s*['\"]вихід['\"]\\s*:\\s*\\n\\s*break" },
          { type: "codeRegex", name: "Вивід бота", pattern: "print\\s*\\(\\s*f['\"]Бот:\\s*\\{\\s*msg\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🔢 Ліміт спроб",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Три спроби і бан</h2>
          <p>Поєднаємо лічильник (який зменшується) і <code>break</code>. Це класична система входу: даємо користувачеві 3 спроби. Якщо вгадав — <code>break</code> (перемога). Якщо спроби закінчилися — цикл зупиниться сам (провал).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Банківський термінал просить ПІН-код "0000". У користувача є рівно 3 спроби. Якщо він вгадує, термінал відчиняється. Якщо помиляється 3 рази — блокується.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">tries = 3</code>.<br>
            Зроби цикл <code style="color: #0ea5e9;">while tries &gt; 0:</code><br>
            - Запитай <code style="color: #0ea5e9;">pin = input("Пін: ")</code>.<br>
            - Якщо <code style="color: #0ea5e9;">pin == "0000":</code>, виведи <code>"Доступ відкрито"</code> і <b>ОБОВ'ЯЗКОВО</b> зроби <code style="color: #0ea5e9;">break</code>.<br>
            - Інакше (<code>else:</code>) зменш спроби: <code style="color: #0ea5e9;">tries -= 1</code>.<br>
            <b>Поза циклом</b> (в самому кінці): якщо <code>tries == 0:</code>, виведи <code>"Картку заблоковано"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Перевірка поза циклом потрібна, щоб дізнатися, ЧОМУ ми вийшли з циклу: бо вгадали (break), чи бо закінчилися спроби (tries стало 0).
          </div>
        `,
        hint: `while tries > 0:\n    pin = input(...)\n    if pin == "0000":\n        print("Доступ відкрито")\n        break\n    else:\n        tries -= 1\nif tries == 0:\n    print("Картку заблоковано")`,
        expected: `Пін: 1111\nПін: 0000\nДоступ відкрито`,
        tests: [
          { type: "codeRegex", name: "Цикл по спробах", pattern: "while\\s+tries\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Вихід при успіху (break)", pattern: "if\\s+pin\\s*==\\s*['\"]0000['\"]\\s*:\\s*\\n.*print.*\\n.*break", flags: "s" },
          { type: "codeRegex", name: "Зменшення спроб", pattern: "else\\s*:\\s*\\n\\s*tries\\s*-\\s*=\\s*1" },
          { type: "codeRegex", name: "Перевірка блокування зовні", pattern: "\\nif\\s+tries\\s*==\\s*0\\s*:\\s*\\n\\s*print" }
        ]
      },

      {
        title: "🏆 Рекордсмен (Max Value)",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зберігаємо найкраще</h2>
          <p>Ще один класичний алгоритм — <b>пошук максимуму</b>. Ми створюємо змінну <code>best = 0</code> і постійно порівнюємо з нею нові числа. Якщо нове число більше за <code>best</code>, ми перезаписуємо <code>best</code>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">best = 0<br>while True:<br>    score = int(input("Бал: "))<br>    if score == 0: break<br>    if score &gt; best:<br>        best = score  <span style="color:gray;"># Оновлюємо рекорд!</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Суддя записує стрибки спортсменів. Ввід закінчується, коли суддя вводить "0". Після цього програма виводить найкращий результат.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">best = 0</code>.<br>
            В <code style="color: #0ea5e9;">while True:</code> запитуй <code style="color: #0ea5e9;">jump = int(input("Стрибок: "))</code>.<br>
            - Якщо <code>jump == 0: break</code>.<br>
            - Якщо <code>jump &gt; best: best = jump</code> (перезаписуємо рекорд!).<br>
            Зовні циклу виведи: <code>print("Рекорд:", best)</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Ніколи не додавай тут <code>else: break</code>, інакше програма зупиниться, як тільки хтось стрибне гірше за рекорд!
          </div>
        `,
        hint: `if jump > best:\n    best = jump`,
        expected: `Стрибок: 10\nСтрибок: 15\nСтрибок: 0\nРекорд: 15`,
        tests: [
          { type: "codeRegex", name: "Умова виходу", pattern: "if\\s+jump\\s*==\\s*0\\s*:\\s*\\n\\s*break" },
          { type: "codeRegex", name: "Оновлення рекорду", pattern: "if\\s+jump\\s*>\\s*best\\s*:\\s*\\n\\s*best\\s*=\\s*jump" },
          { type: "codeRegex", name: "Друк рекорду", pattern: "\\nprint\\s*\\(\\s*['\"]Рекорд:['\"]\\s*,\\s*best\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🛒 Касовий апарат (Ліміт акумулятора)",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зупинка по ліміту</h2>
          <p>Іноді нам треба зупинити <code>while True</code> не за командою "стоп", а коли сума акумулятора перевищить певний ліміт.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Ліфт має обмеження ваги 300 кг. Люди заходять по одному (їхню вагу вводять з клавіатури). Якщо загальна вага перевищує норму, ліфт зупиняє посадку і видає тривогу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">weight = 0</code>. Зроби <code style="color: #0ea5e9;">while True:</code>.<br>
            Всередині: <code style="color: #0ea5e9;">weight += int(input("Вага: "))</code>.<br>
            Перевір: <code>if weight &gt; 300:</code><br>
            Виведи <code>"Перевантаження!"</code> і зроби <code>break</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу, що <code>break</code> спрацює ТІЛЬКИ якщо сума перевищить 300. Доти цикл буде просити нову вагу.
          </div>
        `,
        hint: `weight += int(input("Вага: "))\nif weight > 300:\n    print("Перевантаження!")\n    break`,
        expected: `Вага: 200\nВага: 150\nПеревантаження!`,
        tests: [
          { type: "codeRegex", name: "Накопичення ваги", pattern: "weight\\s*\\+\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Перевірка ліміту", pattern: "if\\s+weight\\s*>\\s*300\\s*:" },
          { type: "codeRegex", name: "Перевантаження і break", pattern: "print\\s*\\(\\s*['\"]Перевантаження!['\"]\\s*\\)\\s*\\n\\s*break", checkRaw: true }
        ]
      },

      {
        title: "🕹️ Вкладена логіка (Shop)",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Справжній застосунок</h2>
          <p>В іграх і ботах всередині <code>while True</code> завжди є розгалуження (<code>if / elif</code>). Це дозволяє програмі реагувати на різні команди по-різному, не вимикаючись.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">while True:<br>    cmd = input("Дія: ")<br>    if cmd == "1":<br>        print("Атака")<br>    elif cmd == "2":<br>        print("Захист")<br>    elif cmd == "0":<br>        break</div>
        `,
        desc: `
          <div class="task-main">
            <p>Простий магазин. У тебе є 100 монет. Ти можеш купувати зілля за 30 монет. Якщо грошей не вистачає — магазин відмовляє. Команда "вихід" закриває магазин.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>money = 100</code> та <code>while True:</code>.<br>
            Запитай <code>cmd = input("Дія: ")</code>.<br>
            - Якщо <code>cmd == "купити":</code> перевір <code>if money &gt;= 30:</code>. Якщо так, відніми 30 (<code>money -= 30</code>) і виведи <code>"Куплено"</code>. Якщо ні (<code>else:</code>), виведи <code>"Мало грошей"</code>.<br>
            - <b>elif</b> <code>cmd == "вихід":</code> зроби <code>break</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Умова з перевіркою грошей має бути <b>вкладеною</b> (мати подвійний відступ) всередині гілки "купити".
          </div>
        `,
        hint: `if cmd == "купити":\n    if money >= 30:\n        money -= 30\n        print("Куплено")\n    else:\n        print("Мало грошей")\nelif cmd == "вихід":\n    break`,
        expected: `Дія: купити\nКуплено\nДія: вихід`,
        tests: [
          { type: "codeRegex", name: "Зовнішні гілки дій", pattern: "if\\s+cmd\\s*==\\s*['\"]купити['\"]\\s*:.*elif\\s+cmd\\s*==\\s*['\"]вихід['\"]\\s*:\\s*\\n\\s*break", flags: "s" },
          { type: "codeRegex", name: "Вкладена перевірка грошей", pattern: "\\n\\s{4,}if\\s+money\\s*>=\\s*30\\s*:\\s*\\n\\s{8,}money\\s*-\\s*=\\s*30", flags: "s" },
          { type: "codeRegex", name: "Вкладена відмова (else)", pattern: "\\n\\s{4,}else\\s*:\\s*\\n\\s{8,}print\\s*\\(\\s*['\"]Мало грошей['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🧲 Фільтр голосних (in)",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Перевірка входження</h2>
          <p>Оператор <code>in</code> ідеально працює в циклах! Наприклад, ми можемо перевірити, чи є введена літера голосною, шукаючи її у рядку <code>"аеєиіїоуюя"</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Бот просить вводити літери. Він реагує тільки на голосні (аеєиіїоуюя). Якщо ввести приголосну — він її ігнорує (continue). Якщо ввести "0" — зупиняється.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>while True:</code>.<br>
            Запитай <code>char = input("Літера: ").lower()</code>.<br>
            - Якщо <code>char == "0": break</code>.<br>
            - Якщо <code>char not in "аеєиіїоуюя": continue</code>.<br>
            В кінці (в самому циклі) виведи <code>print("Це голосна!")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Завдяки <code>continue</code>, приголосні літери просто перекинуть цикл на початок, і фінальний принт не спрацює.
          </div>
        `,
        hint: `if char not in "аеєиіїоуюя":\n    continue\nprint("Це голосна!")`,
        expected: `Літера: к\nЛітера: а\nЦе голосна!\nЛітера: 0`,
        tests: [
          { type: "codeRegex", name: "Умова виходу", pattern: "if\\s+char\\s*==\\s*['\"]0['\"]\\s*:\\s*\\n\\s*break" },
          { type: "codeRegex", name: "Фільтр голосних", pattern: "if\\s+char\\s+not\\s+in\\s+['\"]аеєиіїоуюя['\"]\\s*:\\s*\\n\\s*continue" },
          { type: "codeRegex", name: "Друк в кінці циклу", pattern: "\\n\\s{4,}print\\s*\\(\\s*['\"]Це голосна!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🧩 Складання слів",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Текстовий акумулятор</h2>
          <p>Оператор <code>+=</code> працює не тільки з числами, а й з текстом (конкатенація). Ми можемо створити порожній рядок <code>""</code> і поступово "доклеювати" до нього літери в циклі!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">word = ""<br>while True:<br>    char = input("Символ: ")<br>    if char == "0": break<br>    word += char</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить користувача вводити по одній літері і склеює їх у єдине слово. Коли користувач вводить крапку ".", збір закінчується.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>word = ""</code>. Зроби <code>while True:</code>.<br>
            Запитай <code>char = input("Символ: ")</code>.<br>
            Якщо <code>char == ".": break</code>.<br>
            Інакше додай символ до слова: <code>word += char</code>.<br>
            Зовні циклу виведи f-рядком: <code>print(f"Зібрано: {word}")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Знак <code>+=</code> для тексту просто приклеїть нову літеру в кінець змінної <code>word</code>.
          </div>
        `,
        hint: `if char == ".":\n    break\nword += char`,
        expected: `Символ: К\nСимвол: о\nСимвол: т\nСимвол: .\nЗібрано: Кот`,
        tests: [
          { type: "codeRegex", name: "Текстовий акумулятор", pattern: "word\\s*=\\s*['\"]['\"]" },
          { type: "codeRegex", name: "Конкатенація", pattern: "word\\s*\\+\\s*=\\s*char|word\\s*=\\s*word\\s*\\+\\s*char" },
          { type: "codeRegex", name: "Зупинка по крапці", pattern: "if\\s+char\\s*==\\s*['\"]\\.['\"]\\s*:\\s*\\n\\s*break" }
        ]
      },

      {
        title: "🔄 Складна логіка (and / or)",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Мульти-умови</h2>
          <p>Ти можеш використовувати <code>and</code> та <code>or</code> прямо в умові циклу <code>while</code>. Цикл працюватиме, поки вся велика логічна конструкція є правдою.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Герой біжить уперед. Він може бігти, ТІЛЬКИ якщо в нього є здоров'я (hp > 0) І водночас є витривалість (stamina > 0).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>hp = 100</code> та <code>stamina = 20</code>.<br>
            Напиши цикл: <code style="color: #0ea5e9;">while hp &gt; 0 and stamina &gt; 0:</code><br>
            Всередині віднімай: <code>hp -= 10</code> та <code>stamina -= 10</code>.<br>
            Там само виведи: <code>print("Біжу!")</code>.<br>
            Зовні виведи: <code>print("Зупинка")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Цикл зупиниться вже на 2 кроці, бо витривалість впаде до 0 (навіть незважаючи на те, що здоров'я ще багато).
          </div>
        `,
        hint: `while hp > 0 and stamina > 0:\n    hp -= 10\n    stamina -= 10\n    print("Біжу!")`,
        expected: `Біжу!\nБіжу!\nЗупинка`,
        tests: [
          { type: "codeRegex", name: "Умова and в циклі", pattern: "while\\s+hp\\s*>\\s*0\\s+and\\s+stamina\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Віднімання обох статів", pattern: "hp\\s*-\\s*=\\s*10.*stamina\\s*-\\s*=\\s*10", flags: "s" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Ідеальний пароль",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Валідація + len</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Реєстрація. Користувач не зможе пройти далі, поки не введе пароль довжиною більше 5 символів.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>while True:</code>.<br>
            Запитай <code>pwd = input("Пароль: ")</code>.<br>
            Якщо <code>len(pwd) &gt; 5:</code>, виведи <code>"Прийнято"</code> і зроби <code>break</code>.<br>
            Інакше виведи <code>"Занадто короткий"</code>.
          </div>
        `,
        hint: `if len(pwd) > 5:\n    print("Прийнято")\n    break`,
        expected: `Пароль: 123\nЗанадто короткий\nПароль: 123456\nПрийнято`,
        tests: [
          { type: "codeRegex", name: "Цикл while True", pattern: "while\\s+True\\s*:" },
          { type: "codeRegex", name: "Перевірка довжини та break", pattern: "if\\s+len\\s*\\(\\s*pwd\\s*\\)\\s*>\\s*5\\s*:\\s*\\n\\s*print.*\\n\\s*break", flags: "s" },
          { type: "codeRegex", name: "Відмова (else)", pattern: "else\\s*:\\s*\\n\\s*print" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Вгадай число",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Багато умов (elif) у циклі</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Класична міні-гра "Вгадай число". Секретне число — 7. Гравець вводить здогадки, а гра підказує "Більше" або "Менше".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>while True:</code>.<br>
            Запитай <code>guess = int(input("Твій варіант: "))</code>.<br>
            - Якщо <code>guess == 7:</code> виведи <code>"Вгадав!"</code> і <code>break</code>.<br>
            - <b>elif</b> <code>guess &lt; 7:</code> виведи <code>"Більше"</code>.<br>
            - <b>else:</b> виведи <code>"Менше"</code>.
          </div>
        `,
        hint: `if guess == 7: ... elif guess < 7: ... else: ...`,
        expected: `Твій варіант: 5\nБільше\nТвій варіант: 9\nМенше\nТвій варіант: 7\nВгадав!`,
        tests: [
          { type: "codeRegex", name: "Запит як int", pattern: "guess\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Перемога і вихід", pattern: "if\\s+guess\\s*==\\s*7\\s*:\\s*\\n\\s*print.*\\n\\s*break", flags: "s" },
          { type: "codeRegex", name: "Підказки (elif, else)", pattern: "elif\\s+guess\\s*<\\s*7\\s*:.*else\\s*:", flags: "s" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Меню Банку",
        xp: 450,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Інтерактивний додаток</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Проста система банкомату з балансом та меню. Дозволяє знімати гроші та виходити.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>bal = 100</code> та <code>while True:</code>.<br>
            Запитай: <code>cmd = input("1-Зняти, 2-Вихід: ")</code>.<br>
            - Якщо <code>cmd == "1":</code> відніми 50 (<code>bal -= 50</code>) і виведи <code>bal</code>.<br>
            - Якщо <code>cmd == "2":</code> виведи <code>"До побачення"</code> і зроби <code>break</code>.
          </div>
        `,
        hint: `if cmd == "1":\n    bal -= 50\n    print(bal)\nelif cmd == "2":\n    print("До побачення")\n    break`,
        expected: `1-Зняти, 2-Вихід: 1\n50\n1-Зняти, 2-Вихід: 2\nДо побачення`,
        tests: [
          { type: "codeRegex", name: "Зовнішній баланс", pattern: "bal\\s*=\\s*100" },
          { type: "codeRegex", name: "Логіка 1", pattern: "if\\s+cmd\\s*==\\s*['\"]1['\"]\\s*:\\s*\\n\\s*bal\\s*-\\s*=\\s*50\\s*\\n\\s*print\\s*\\(\\s*bal\\s*\\)", flags: "s" },
          { type: "codeRegex", name: "Логіка 2 (Вихід)", pattern: "elif\\s+cmd\\s*==\\s*['\"]2['\"]\\s*:\\s*\\n\\s*print.*\\n\\s*break", flags: "s" }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🐉 БОС (Middle): Тамагочі",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Симуляція життя</h2>
          <p>Створи віртуального улюбленця (Game Loop), в якого постійно падає енергія та зростає голод. Гравцю треба встигати реагувати на ці зміни!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Улюбленець має енергію та голод. Кожну дію він витрачає енергію і стає голоднішим. Якщо показники вийдуть за межі — гра закінчиться (програш).</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Створи: <code>energy = 50</code>, <code>hunger = 50</code>, <code>is_alive = True</code>.<br>
            2. Напиши цикл: <code>while is_alive:</code><br>
            3. Всередині виведи: <code>print(f"Енергія: {energy}, Голод: {hunger}")</code>.<br>
            4. Запитай дію: <code>act = input("1-Їсти, 2-Спати, 3-Вийти: ")</code>.<br>
            5. <b>Логіка дій:</b><br>
               - Якщо <code>act == "1"</code>: <code>hunger -= 20</code><br>
               - Якщо <code>act == "2"</code>: <code>energy += 20</code><br>
               - Якщо <code>act == "3"</code>: <code>is_alive = False</code><br>
            6. <b>Пасивні витрати</b> (поза <code>if</code>, виконуються щокроку): <code>energy -= 10</code> та <code>hunger += 10</code>.<br>
            7. <b>Перевірка смерті:</b> Якщо <code>energy &lt;= 0</code> <b>АБО</b> (<code>or</code>) <code>hunger &gt;= 100</code>:<br>
               Виведи <code>"Гра закінчена"</code> і <code>break</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Зверни увагу на порядок коду в циклі! Спочатку друк статів, потім інпут, потім обробка дій (if/elif), потім пасивні витрати, і В КІНЦІ — перевірка на смерть.
          </div>
        `,
        hint: `while is_alive:\n    print(...)\n    act = input(...)\n    if act == "1": hunger -= 20\n    elif act == "2": energy += 20\n    elif act == "3": is_alive = False\n    energy -= 10\n    hunger += 10\n    if energy <= 0 or hunger >= 100:\n        print("Гра закінчена")\n        break`,
        expected: `Енергія: 50, Голод: 50\n1-Їсти, 2-Спати, 3-Вийти: 1\nЕнергія: 40, Голод: 40\n1-Їсти, 2-Спати, 3-Вийти: 3`,
        tests: [
          { type: "codeRegex", name: "Game Loop по прапорцю", pattern: "while\\s+is_alive\\s*:" },
          { type: "codeRegex", name: "Обробка дій", pattern: "if\\s+act\\s*==\\s*['\"]1['\"]\\s*:\\s*\\n\\s*hunger\\s*-\\s*=\\s*20", flags: "s" },
          { type: "codeRegex", name: "Пасивні витрати", pattern: "energy\\s*-\\s*=\\s*10.*hunger\\s*\\+\\s*=\\s*10", flags: "s" },
          { type: "codeRegex", name: "Умова смерті (or)", pattern: "if\\s+energy\\s*<=\\s*0\\s+or\\s+hunger\\s*>=\\s*100\\s*:\\s*\\n\\s*print.*\\n\\s*break", flags: "s" }
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">age = 20<br>status = "Дорослий" if age &gt;= 18 else "Дитина"<br>print(status)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Дорослий</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма швидко визначає агрегатний стан води залежно від її температури (менше нуля — Лід, інакше — Вода).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">temp = int(input("Температура: "))</code>.<br>
            Створи змінну <code style="color: #0ea5e9;">state</code> і використай тернарний оператор: вона має дорівнювати <code style="color: #0ea5e9;">"Лід"</code>, якщо <code style="color: #0ea5e9;">temp &lt; 0</code>, інакше (else) <code style="color: #0ea5e9;">"Вода"</code>.<br>
            Виведи змінну <code style="color: #0ea5e9;">state</code> на екран.
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
          { type: "codeRegex", name: "Друк змінної", pattern: "print\\s*\\(\\s*state\\s*\\)" },
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">money = 50<br>print("Куплено" if money &gt;= 100 else "Відмова")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Відмова</div>
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
            <b>Важливо:</b> Не створюй зайвих змінних. Твій другий рядок коду — це відразу <code style="color: #0ea5e9;">print( "..." if ... else "..." )</code>.
          </div>
        `,
        hint: `print("Живий" if hp > 0 else "Мертвий")`,
        expected: `Здоров'я: 0\nМертвий`,
        tests: [
          { type: "codeRegex", name: "Запит hp", pattern: "hp\\s*=\\s*int\\s*\\(\\s*input" },
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">name = input("Ім'я: ") <b style="color: #3b82f6;">or</b> "Анонім"<br>print("Привіт,", name)</div>
          <p><b>Результат у терміналі (якщо користувач просто натиснув Enter):</b></p>
          <div class="output-box">Ім'я: <br>Привіт, Анонім</div>
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
          { type: "codeRegex", name: "Друк змінної", pattern: "print\\s*\\(\\s*role\\s*\\)" }
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">has_key = False<br>has_bomb = True<br>if any([has_key, has_bomb]):<br>    print("Відкриваємо двері!")</div>
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">s1 = True<br>s2 = True<br>if all([s1, s2]):<br>    print("Всі системи готові")</div>
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
            Використай моржевий оператор всередині круглих дужок в умові: <code style="color: #0ea5e9;">if (n := len(name)) &gt; 3:</code><br>
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
          { type: "codeRegex", name: "Використано створену змінну n", pattern: "print\\s*\\(\\s*f['\"]Довжина імені:\\s*\\{\\s*n\\s*\\}['\"]\\s*\\)", checkRaw: true }
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">if (ans := input("Згоден? ")) == "Так":<br>    print("Відповідь:", ans)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система просить ввести команду. Якщо це команда "exit", вона спрацьовує і друкує саму себе.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>if</code>, в якому ти відразу створиш змінну <code>cmd</code> через моржа: <code style="color: #0ea5e9;">if (cmd := input("Команда: ")) == "exit":</code>.<br>
            Всередині (з відступом) виведи f-рядком: <code>print(f"Виконано: {cmd}")</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> У нас немає попереднього рядка зі створенням змінної. Усе відбувається прямо в умові!
          </div>
        `,
        hint: `if (cmd := input("Команда: ")) == "exit":\n    print(f"Виконано: {cmd}")`,
        expected: `Команда: exit\nВиконано: exit`,
        tests: [
          { type: "codeRegex", name: "Відсутність окремого input", pattern: "^cmd\\s*=\\s*input", flags: "gm", max: 0 },
          { type: "codeRegex", name: "Морж з input", pattern: "if\\s+\\(\\s*cmd\\s*:=\\s*input\\s*\\(.*\\)\\s*\\)\\s*==\\s*['\"]exit['\"]\\s*:" },
          { type: "codeRegex", name: "Друк f-рядком", pattern: "print\\s*\\(\\s*f['\"]Виконано:\\s*\\{\\s*cmd\\s*\\}['\"]\\s*\\)", checkRaw: true }
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
          
          <p><b>Приклад коду:</b></p>
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">match color:<br>    case "Червоний": print("Стій")<br>    <b style="color: #ef4444;">case _:</b> print("Йди")</div>
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">match day:<br>    case "субота" | "неділя":<br>        print("Вихідний")</div>
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
          { type: "codeRegex", name: "Об'єднання через |", pattern: "case\\s+['\"]admin['\"]\\s*\\|\\s*['\"]moder['\"]\\s*:" },
          { type: "codeRegex", name: "Дефолтний case", pattern: "case\\s+_\\s*:" }
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
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">match cmd:<br>    case "атака" <b style="color: #10b981;">if</b> hp &gt; 10:<br>        print("Б'ємо ворога")</div>
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
          
          <p><b>Приклад коду:</b></p>
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
          
          <p><b>Приклад коду:</b></p>
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
          { type: "codeRegex", name: "Ввід як число", pattern: "bal\\s*=\\s*int\\s*\\(\\s*input" },
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
          { type: "codeRegex", name: "Ввід пароля", pattern: "pwd\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Моржевий оператор", pattern: "if\\s+\\(\\s*L\\s*:=\\s*len\\s*\\(\\s*pwd\\s*\\)\\s*\\)\\s*<\\s*6\\s*:" },
          { type: "codeRegex", name: "f-рядок з L", pattern: "print\\s*\\(\\s*f['\"]Слабко, символів:\\s*\\{\\s*L\\s*\\}['\"]\\s*\\)", checkRaw: true }
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
          { type: "codeRegex", name: "Ввід команди", pattern: "action\\s*=\\s*input\\s*\\(" },
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
