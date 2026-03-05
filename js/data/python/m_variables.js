// js/data/python/m_variables.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_variables",
    title: "Змінні та Коментарі",
    icon: "ri-box-3-line",
    color: "#8b5cf6",
    desc: "Створюємо коробки для даних, вчимося їх змінювати та керувати кодом за допомогою коментарів.",

    tasks: [
      // ==========================================
// 🟢 РІВЕНЬ: JUNIOR (База змінних та коментарі)
// ==========================================


  {
    title: "Перша змінна (Текст)",
    xp: 40,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Що таке змінна?</h2>
      <p>Уяви, що <b style="color: #3b82f6;">змінна</b> — це звичайна картонна коробка. Ми можемо наклеїти на неї маркер з ім'ям і покласти всередину якісь дані (текст або число).</p>
      <p>Щоб створити коробку, ми пишемо її ім'я, ставимо знак дорівнює <b style="color: #ef4444;"><code>=</code></b>, і пишемо те, що хочемо туди покласти.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">player = "Alex"<br>print(player)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Alex</div>
      <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 10px; margin-top: 10px;">
        <b style="color: #10b981;">Зверни увагу:</b> Коли ми друкуємо змінну через <code>print()</code>, ми <b style="color: #ef4444;">НЕ ставимо лапки</b> навколо її імені!
      </div>
    `,
    desc: "Створи змінну з ім'ям <code>hero</code>. Поклади в неї текст <code>\"Бетмен\"</code>. На наступному рядку видрукуй цю змінну на екран.",
    hint: `Спочатку ім'я змінної, потім знак дорівнює, потім текст у лапках. На другому рядку напиши print і передай туди ім'я змінної (без лапок!).`,
    expected: `Бетмен`,
    tests: [
      { type: "stdoutEquals", name: "Вивід правильний", value: "Бетмен", normalize: "soft" },

      // текст у лапках => checkRaw
      { type: "codeRegex", name: "Створено змінну hero", pattern: "hero\\s*=\\s*['\"]Бетмен['\"]", checkRaw: true },

      { type: "codeRegex", name: "Змінну виведено без лапок", pattern: "print\\s*\\(\\s*hero\\s*\\)" }
    ]
  },

  {
    title: "Змінна для чисел",
    xp: 45,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Скриня для золота</h2>
      <p>У змінні можна класти не тільки текст, а й <b style="color: #10b981;">числа</b>. Правила ті самі, але числа ми пишемо без лапок.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">hp = 100<br>print(hp)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">100</div>
    `,
    desc: "Створи змінну <code>score</code> і поклади в неї число <code>500</code>. Виведи її значення за допомогою <code>print()</code>.",
    hint: `Пам'ятай: числа в Python пишуться без лапок. Змінна score створюється через знак =.`,
    expected: `500`,
    tests: [
      { type: "stdoutEquals", name: "Вивід правильний", value: "500", normalize: "soft" },
      { type: "codeRegex", name: "Змінна score створена", pattern: "score\\s*=\\s*500" },
      { type: "codeRegex", name: "Друк змінної score", pattern: "print\\s*\\(\\s*score\\s*\\)" }
    ]
  },

  {
    title: "Пастка новачків: Лапки",
    xp: 50,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Ім'я чи вміст?</h2>
      <p>Це найголовніше правило, яке треба запам'ятати назавжди!</p>
      <ul>
        <li>Якщо ти пишеш слово <b style="color: #ef4444;">в лапках</b> — Python думає, що це просто малюнок слова (текст) і друкує його як є.</li>
        <li>Якщо ти пишеш слово <b style="color: #10b981;">без лапок</b> — Python шукає коробку (змінну) з таким ім'ям і дістає те, що лежить всередині.</li>
      </ul>
      <p><b>Приклад пастки:</b></p>
      <div class="code-box">gold = 99<br>print("gold")</div>
      <p><b>Результат:</b></p>
      <div class="output-box">gold  <span style="color:gray;"># Вивело слово, а не число 99!</span></div>
    `,
    desc: "Програма має вивести число <b>777</b>. У тебе є змінна <code>secret = 777</code>. Напиши <code>print</code> правильно, щоб дістати вміст коробки, а не її назву.",
    hint: `Не використовуй лапки всередині print, інакше виведеться слово secret замість числа!`,
    expected: `777`,
    tests: [
      { type: "stdoutEquals", name: "Вміст дістали правильно", value: "777", normalize: "soft" },
      { type: "codeRegex", name: "Змінна secret створена", pattern: "secret\\s*=\\s*777" },
      { type: "codeRegex", name: "Друк без лапок", pattern: "print\\s*\\(\\s*secret\\s*\\)" }
    ]
  },

  {
    title: "Текст + Змінна",
    xp: 60,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Поєднуємо коробку і текст</h2>
      <p>У модулі про <code>print()</code> ми вчили, що аргументи можна передавати через <b style="color: #3b82f6;">кому</b>. Цей трюк ідеально працює зі змінними!</p>
      <p>Ти можеш надрукувати трохи тексту (в лапках), поставити кому, і дописати ім'я змінної (без лапок).</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">name = "Anna"<br>print("Привіт,", name)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Привіт, Anna</div>
    `,
    desc: "Створи змінну <code>coins = 50</code>. Виведи текст і змінну через кому, щоб на екрані з'явилося: <code>Зібрано монет: 50</code>",
    hint: `Тобі потрібен один print. Спочатку текст "Зібрано монет:" (у лапках), потім кома, потім змінна coins (без лапок).`,
    expected: `Зібрано монет: 50`,
    tests: [
      { type: "stdoutEquals", name: "Рядок правильний", value: "Зібрано монет: 50", normalize: "soft" },

      // є строка в лапках => checkRaw
      { type: "codeRegex", name: "Текст і змінна через кому", pattern: "print\\s*\\(\\s*['\"]Зібрано\\s+монет:\\s*['\"]\\s*,\\s*coins\\s*\\)", checkRaw: true }
    ]
  },

  {
    title: "Правило пробілів (Коми)",
    xp: 65,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Кома робить відступ</h2>
      <p>Пам'ятай: коли ми поєднуємо текст і змінну через кому, Python <b style="color: #10b981;">автоматично додає пробіл</b> між ними.</p>
      <div class="code-box">age = 15<br>print("Мені", age, "років")</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Мені 15 років</div>
    `,
    desc: "Створи змінну <code>item = \"Меч\"</code>. За допомогою одного <code>print()</code> і двох ком виведи: <code>Гравець знайшов Меч у скрині</code>.",
    hint: `У print() має бути три частини: текст "Гравець знайшов", змінна item, і текст "у скрині".`,
    expected: `Гравець знайшов Меч у скрині`,
    tests: [
      { type: "stdoutEquals", name: "Речення склеєно правильно", value: "Гравець знайшов Меч у скрині", normalize: "soft" },

      // стабільніше, ніж “просто дві коми”
      { type: "codeRegex", name: "Створено змінну item", pattern: "item\\s*=\\s*['\"]Меч['\"]", checkRaw: true },
      { type: "codeRegex", name: "print має 3 частини", pattern: "print\\s*\\(\\s*['\"]Гравець\\s+знайшов['\"]\\s*,\\s*item\\s*,\\s*['\"]у\\s+скрині['\"]\\s*\\)", checkRaw: true }
    ]
  },

  {
    title: "Перезапис коробки (Update)",
    xp: 70,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Викидаємо старе, кладемо нове</h2>
      <p>Чому змінні називаються "змінними"? Бо вони можуть <b style="color: #ef4444;">змінюватися</b>! Якщо ти покладеш у коробку нове значення, старе просто зникне.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">hp = 100<br>hp = 50<br>print(hp)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">50</div>
    `,
    desc: "Створи змінну <code>color</code> і поклади в неї <code>\"Червоний\"</code>. На наступному рядку перезапиши цю ж змінну значенням <code>\"Синій\"</code>. Виведи змінну <code>color</code>.",
    hint: `У тебе має бути три рядки коду: створення, перезапис (так само через знак =), і функція виводу.`,
    expected: `Синій`,
    tests: [
      { type: "stdoutEquals", name: "Старе значення стерто", value: "Синій", normalize: "soft" },

      // строкові літерали + перенос => checkRaw + flags s
      { type: "codeRegex", name: "Перезапис змінної", pattern: "color\\s*=\\s*['\"]Червоний['\"].*color\\s*=\\s*['\"]Синій['\"]", flags: "s", checkRaw: true }
    ]
  },

  {
    title: "Плин часу (Print -> Update -> Print)",
    xp: 80,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Програма читає код згори донизу</h2>
      <p>Щоб побачити, як значення змінюється під час гри, нам треба роздрукувати його <b style="color: #10b981;">ДО</b> зміни і <b style="color: #ef4444;">ПІСЛЯ</b> зміни.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">level = 1<br>print(level)<br>level = 2<br>print(level)</div>
    `,
    desc: "Задай <code>score = 0</code>. Виведи <code>score</code>. Перезапиши <code>score = 10</code>. Знову виведи <code>score</code>. Має вийти два числа на різних рядках.",
    hint: `Чотири рядки коду. Спочатку = 0, потім print(score), потім = 10, і знову print(score).`,
    expected: `0\n10`,
    tests: [
      { type: "stdoutEquals", name: "Обидва стани виведено", value: "0\n10", normalize: "soft" },
      { type: "codeRegex", name: "Два принти змінної", pattern: "print\\s*\\(\\s*score\\s*\\).*print\\s*\\(\\s*score\\s*\\)", flags: "s" }
    ]
  },

  {
    title: "З коробки в коробку",
    xp: 85,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Клонування даних</h2>
      <p>Значення змінної можна передати іншій змінній. Для цього ми просто пишемо ім'я другої коробки після знаку <code>=</code>.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">a = "Яблуко"<br>b = a  <span style="color:gray;"># b бере копію того, що лежить в a</span><br>print(b)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Яблуко</div>
    `,
    desc: "Створи змінну <code>player1 = 100</code>. Створи змінну <code>player2</code> і зроби так, щоб вона скопіювала значення з <code>player1</code> (<code>player2 = player1</code>). Виведи <code>player2</code>.",
    hint: `Не пиши player2 = 100. Напиши player2 = player1. Таким чином, друга змінна підгляне, що лежить у першій.`,
    expected: `100`,
    tests: [
      { type: "stdoutEquals", name: "Значення скопійовано", value: "100", normalize: "soft" },
      { type: "codeRegex", name: "Змінна дорівнює змінній", pattern: "player2\\s*=\\s*player1" }
    ]
  },

  {
    title: "Чутливість до регістру",
    xp: 90,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Великі букви мають значення!</h2>
      <p>Для Python коробка з назвою <code>score</code> і коробка з назвою <code>Score</code> (з великої літери) — це <b style="color: #ef4444;">ДВІ АБСОЛЮТНО РІЗНІ КОРОБКИ</b>.</p>
      <p>Це називається чутливістю до регістру (case sensitivity). Будь дуже уважним, щоб не загубити свої дані!</p>
    `,
    desc: "Створи <code>apple = 5</code> (з малої). Створи <code>Apple = 10</code> (з великої). Виведи їх обох (спочатку малу, потім велику) через один <code>print()</code>.",
    hint: `Дві різні змінні. У print напиши їх через кому: print(apple, Apple).`,
    expected: `5 10`,
    tests: [
      { type: "stdoutEquals", name: "Обидва значення виведено", value: "5 10", normalize: "soft" },
      { type: "codeRegex", name: "Використано обидві змінні", pattern: "print\\s*\\(.*apple.*,.*Apple.*\\)" }
    ]
  },

  {
    title: "Магія зміни типів",
    xp: 95,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Коробка-хамелеон</h2>
      <p>У деяких мовах програмування коробка для чисел ніколи не може приймати текст. Але Python <b style="color: #3b82f6;">динамічний</b>!</p>
      <p>Ти можеш покласти в змінну число, а через хвилину викинути його і покласти туди текст.</p>
      <div class="code-box">data = 5<br>data = "Тепер я текст!"</div>
    `,
    desc: "Створи <code>info = 404</code>. На наступному рядку перезапиши: <code>info = \"Помилка\"</code>. Виведи <code>info</code>.",
    hint: `Створюєш змінну з числом, потім береш ту ж саму змінну і кладеш в неї рядок тексту, потім друкуєш.`,
    expected: `Помилка`,
    tests: [
      { type: "stdoutEquals", name: "Тип змінено успішно", value: "Помилка", normalize: "soft" },
      { type: "codeRegex", name: "Зміна типу", pattern: "info\\s*=\\s*404.*info\\s*=\\s*['\"]Помилка['\"]", flags: "s", checkRaw: true }
    ]
  },

  {
    title: "Вступ до коментарів (#)",
    xp: 100,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Нотатки для себе</h2>
      <p>Іноді в коді треба залишити підказку для себе або інших програмістів. Для цього існують <b style="color: #10b981;">коментарі</b>.</p>
      <p>Якщо рядок починається з символу <b style="color: #ef4444;"><code>#</code> (решітка/хеш)</b>, Python повністю його <b style="color: #3b82f6;">ігнорує</b>. Комп'ютер цього тексту не бачить, він тільки для людей.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box"><span style="color:gray;"># Це змінна для здоров'я героя</span><br>hp = 100</div>
    `,
    desc: "Напиши коментар <code># Стартовий капітал</code>. На наступному рядку створи <code>gold = 1000</code> і виведи <code>gold</code>.",
    hint: `Рядок з коментарем має починатися з символу #. Він не вплине на роботу програми.`,
    expected: `1000`,
    tests: [
      { type: "stdoutEquals", name: "Програма працює", value: "1000", normalize: "soft" },
      { type: "codeRegex", name: "Є коментар", pattern: "#\\s*Стартовий\\s+капітал", checkRaw: true }
    ]
  },

  {
    title: "Коментарі в кінці рядка",
    xp: 110,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Пояснення поруч із кодом</h2>
      <p>Коментар не обов'язково писати з нового рядка. Його можна поставити одразу після коду! Все, що написано <b style="color: #ef4444;">ПІСЛЯ</b> решітки до кінця рядка, буде проігноровано.</p>
      <div class="code-box">speed = 5  <span style="color:gray;"># Швидкість бігу персонажа</span></div>
    `,
    desc: "Створи змінну <code>mana = 50</code>, і в цьому ж рядку (після числа) допиши коментар: <code># Енергія мага</code>. Потім роздрукуй змінну.",
    hint: `Твій перший рядок має виглядати так: mana = 50 # Енергія мага`,
    expected: `50`,
    tests: [
      { type: "stdoutEquals", name: "Програма не зламалась", value: "50", normalize: "soft" },
      { type: "codeRegex", name: "Коментар у кінці рядка", pattern: "mana\\s*=\\s*50\\s*#\\s*Енергія\\s+мага", checkRaw: true }
    ]
  },

  {
    title: "Хакинг: Вимкнення коду",
    xp: 120,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Магія дебагінгу</h2>
      <p>Це улюблений трюк програмістів! Що робити, якщо частина коду видає помилку, але ти не хочеш її видаляти? Ти можеш просто її <b style="color: #3b82f6;">"закоментувати"</b>.</p>
      <p>Постав <code>#</code> на самому початку рядка з кодом, і Python перестане його виконувати (ніби він став просто текстом).</p>
      <div class="code-box">print("1")<br><span style="color:gray;"># print("2")</span><br>print("3")</div>
      <p><b>Результат:</b></p>
      <div class="output-box">1<br>3</div>
    `,
    desc: "Напиши три команди <code>print</code>: перша виводить <code>\"Старт\"</code>, друга <code>\"Помилка!\"</code>, третя <code>\"Фініш\"</code>. Закоментуй другий рядок (постав перед ним <code>#</code>), щоб слово Помилка не вивелось.",
    hint: `У тебе має бути 3 рядки з print(), але перед другим print() має стояти символ решітки #.`,
    expected: `Старт\nФініш`,
    tests: [
      { type: "stdoutEquals", name: "Помилку вимкнено", value: "Старт\nФініш", normalize: "soft" },
      { type: "codeRegex", name: "Код закоментовано", pattern: "#\\s*print\\s*\\(\\s*['\"]Помилка!['\"]\\s*\\)", checkRaw: true }
    ]
  },

  {
    title: "Дебагінг: Знайти фальшивку",
    xp: 130,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Вимикаємо зламані дані</h2>
      <p>Коментарі часто використовують, щоб швидко перемикати значення змінних під час тестування гри.</p>
    `,
    desc: `Напиши код:<br>
<code>code = 123</code><br>
<code>code = 999</code><br>
<code>print(code)</code><br>
Закоментуй той рядок, який робить код <b>неправильним</b>, щоб програма вивела оригінальний пароль <code>123</code>.`,
    hint: `Другий рядок перезаписує code на неправильний (999). Постав решітку # перед code = 999.`,
    expected: `123`,
    tests: [
      { type: "stdoutEquals", name: "Правильний пароль", value: "123", normalize: "soft" },
      { type: "codeRegex", name: "Зламану змінну вимкнено", pattern: "#\\s*code\\s*=\\s*999", checkRaw: true }
    ]
  },

  {
    title: "Змінні та sep",
    xp: 140,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Налаштування друку</h2>
      <p>Змінні чудово працюють з параметром <code>sep</code>, який ми вчили раніше. Він просто вставляє свій символ між коробками.</p>
      <div class="code-box">x = 5<br>y = 10<br>print(x, y, sep=":")</div>
      <p><b>Результат:</b></p>
      <div class="output-box">5:10</div>
    `,
    desc: "Створи дві змінні: <code>day = 15</code> та <code>month = 8</code>. Роздрукуй їх через кому, а в кінці додай <code>sep=\"/\"</code>.",
    hint: `print(day, month, sep="/")`,
    expected: `15/8`,
    tests: [
      { type: "stdoutEquals", name: "Формат дати правильний", value: "15/8", normalize: "soft" },

      // перевіряємо саме print(... sep="/")
      { type: "codeRegex", name: "print використовує sep", pattern: "print\\s*\\([^)]*sep\\s*=\\s*['\"]\\/['\"][^)]*\\)", checkRaw: true }
    ]
  },

  {
    title: "Змінні та end",
    xp: 150,
    kind: "practice",
    difficulty: "Junior",
    theory: `
      <h2>Скасування переносу</h2>
      <p>Так само зі змінними працює і параметр <code>end</code>, який "приклеює" наступний print() до поточного.</p>
    `,
    desc: "Створи змінну <code>loading = \"Завантаження\"</code>. У першому <code>print(loading, end=\"\")</code> виведи її без переносу. На наступному рядку другим принтом виведи <code>\"...\"</code>.",
    hint: `Не забудь передати параметр end="" в першу команду виводу.`,
    expected: `Завантаження...`,
    tests: [
      { type: "stdoutEquals", name: "Текст склеєно", value: "Завантаження...", normalize: "soft" },

      // end="" містить лапки => checkRaw
      { type: "codeRegex", name: "Використано end", pattern: "end\\s*=\\s*['\"]\\s*['\"]", checkRaw: true }
    ]
  },

  // ==========================================
  // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
  // ==========================================

  {
    title: "Підсумкова 1: Картка здоров'я",
    xp: 200,
    kind: "quiz",
    difficulty: "Junior",
    theory: `
      <h2>Перевірка: Змінна + Текст</h2>
      <p>Згадай, як комбінувати текст у лапках і змінні за допомогою коми.</p>
    `,
    desc: `Створи змінну <code>hp = 100</code>.<br>
    ОДНИМ <code>print()</code> виведи: <code>Здоров'я: 100 HP</code> (де 100 — це твоя змінна).`,
    hint: `Тобі треба передати 3 аргументи: текст "Здоров'я:", змінну hp, текст "HP"`,
    expected: `Здоров'я: 100 HP`,
    tests: [
      { type: "stdoutEquals", name: "Формат правильний", value: "Здоров'я: 100 HP", normalize: "soft" },
      { type: "codeRegex", name: "Використано змінні і коми", pattern: "print\\s*\\(.*hp.*,.*['\"]HP['\"]\\)", checkRaw: true }
    ]
  },

  {
    title: "Підсумкова 2: Зміна зброї",
    xp: 250,
    kind: "quiz",
    difficulty: "Junior",
    theory: `
      <h2>Перевірка: Перезапис та потік</h2>
      <p>Згадай, що змінні можуть змінюватись у часі. Що було останнім — те й правда!</p>
    `,
    desc: `1. Створи <code>weapon = "Лук"</code>.<br>
    2. Виведи <code>weapon</code>.<br>
    3. Перезапиши: <code>weapon = "Меч"</code>.<br>
    4. Виведи <code>weapon</code> ще раз.`,
    hint: `Тут має бути 4 окремих рядки коду. Створення -> Друк -> Перезапис -> Друк.`,
    expected: `Лук\nМеч`,
    tests: [
      { type: "stdoutEquals", name: "Зміна зброї відстежена", value: "Лук\nМеч", normalize: "soft" },
      { type: "codeRegex", name: "Перезапис", pattern: "weapon\\s*=\\s*['\"]Лук['\"].*weapon\\s*=\\s*['\"]Меч['\"]", flags: "s", checkRaw: true },
      { type: "codeRegex", name: "Два принти", pattern: "print\\s*\\(.*print\\s*\\(", flags: "s" }
    ]
  },

  {
    title: "Підсумкова 3: Сховати баг",
    xp: 300,
    kind: "quiz",
    difficulty: "Junior",
    theory: `
      <h2>Перевірка: Коментарі</h2>
    `,
    desc: `Твій колега написав поганий код:<br>
<code>score = 50</code><br>
<code>score = "Помилка сервера!"</code><br>
<code>print("Бали:", score)</code><br>
Зроби так, щоб програма вивела <code>Бали: 50</code>. Використай <b>решітку (#)</b>, щоб "вимкнути" зайве у коді.`,
    hint: `Просто скопіюй код і постав # перед рядком, де score перезаписується текстом.`,
    expected: `Бали: 50`,
    tests: [
      { type: "stdoutEquals", name: "Баг виправлено", value: "Бали: 50", normalize: "soft" },
      { type: "codeRegex", name: "Рядок закоментовано", pattern: "#\\s*score\\s*=\\s*['\"]Помилка сервера!['\"]", checkRaw: true }
    ]
  },

  // ==========================================
  // 🟢 JUNIOR BOSS
  // ==========================================

  {
    title: "🟢 БОС (Junior): Профіль Героя",
    xp: 500,
    kind: "boss",
    difficulty: "Junior",
    theory: `
      <h2>Фінальний іспит: Архітектор даних</h2>
      <p>Створи змінні для гри, додай до них професійні коментарі та виведи фінальний звіт про персонажа!</p>
    `,
    desc: `1. Створи змінну <code>hero</code> зі значенням <code>"Лицар"</code>. В кінці цього ж рядка додай коментар <code># Клас</code>.<br>
    2. Створи змінну <code>LvL</code> зі значенням <code>10</code>. Додай коментар <code># Рівень</code>.<br>
    3. Одним принтом виведи текст: <code>Гравець: Лицар [ 10 ]</code> (де Лицар і 10 — це твої змінні).`,
    hint: `Для фінального виводу передай 5 аргументів через кому: текст "Гравець:", змінна hero, текст "[", змінна LvL, і текст "]". Наприклад: print("Гравець:", hero, "[", LvL, "]") — Python сам поставить пробіли, і це ок для цього боса.`,
    expected: `Гравець: Лицар [ 10 ]`,
    tests: [
      { type: "stdoutEquals", name: "Профіль зібрано", value: "Гравець: Лицар [ 10 ]", normalize: "soft" },

      // перевіряємо, що коментар прямо в цьому ж рядку
      { type: "codeRegex", name: "hero створено з коментарем", pattern: "hero\\s*=\\s*['\"]Лицар['\"]\\s*#\\s*Клас", checkRaw: true },
      { type: "codeRegex", name: "LvL створено з коментарем", pattern: "LvL\\s*=\\s*10\\s*#\\s*Рівень", checkRaw: true },

      { type: "codeRegex", name: "print використовує hero і LvL", pattern: "print\\s*\\([^)]*hero[^)]*LvL[^)]*\\)" }
    ]
  },
 

      // ==========================================
// 🟡 РІВЕНЬ: MIDDLE (Математика та Правила імен)
// ==========================================

  {
    title: "Математика змінних",
    xp: 130,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Додавання коробок</h2>
      <p>Ми можемо використовувати змінні в математичних прикладах так само, як звичайні числа. Python сам дістане їхні значення і все порахує.</p>
      <p>Більше того, результат ми можемо покласти в <b>нову змінну</b>!</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">apples = 5<br>pears = 3<br>total = apples + pears<br>print(total)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">8</div>
    `,
    desc: "Задай <code>a = 10</code> та <code>b = 20</code>. Створи третю змінну <code>result</code>, яка буде дорівнювати сумі <code>a + b</code>. Виведи <code>result</code>.",
    hint: `Тобі потрібен рядок result = a + b. Після цього просто роздрукуй змінну result.`,
    expected: `30`,
    tests: [
      { type: "stdoutEquals", name: "Сума правильна", value: "30", normalize: "soft" },
      { type: "codeRegex", name: "Змінна result", pattern: "result\\s*=\\s*a\\s*\\+\\s*b" },
      { type: "codeRegex", name: "Вивід result", pattern: "print\\s*\\(\\s*result\\s*\\)" }
    ]
  },

  {
    title: "Складні формули",
    xp: 140,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Ігрова математика</h2>
      <p>За допомогою змінних пишуться формули для розрахунку урону, броні та досвіду. Python виконає всі дії за правилами математики.</p>
      <div class="code-box">base_dmg = 50<br>armor = 15<br>real_dmg = base_dmg - armor</div>
    `,
    desc: "Є змінні <code>gold = 100</code> та <code>price = 35</code>. Створи змінну <code>change</code> (решта), яка дорівнює <code>gold - price</code>. Виведи її на екран.",
    hint: `Спочатку створи змінні gold і price. Потім створи change і присвой їй результат віднімання двох попередніх змінних.`,
    expected: `65`,
    tests: [
      { type: "stdoutEquals", name: "Решту пораховано", value: "65", normalize: "soft" },
      { type: "codeRegex", name: "Використано віднімання змінних", pattern: "change\\s*=\\s*gold\\s*-\\s*price" },
      { type: "codeRegex", name: "Вивід change", pattern: "print\\s*\\(\\s*change\\s*\\)" }
    ]
  },

  {
    title: "Склеювання тексту (+)",
    xp: 150,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Конкатенація (Склеювання)</h2>
      <p>Що буде, якщо використати знак <b style="color: #ef4444;"><code>+</code></b> не з числами, а з текстом? Python просто <b>склеїть</b> ці рядки в один!</p>
      <p>Цей процес має складну наукову назву — <b style="color: #3b82f6;">конкатенація</b>.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">part1 = "Spider"<br>part2 = "-Man"<br>hero = part1 + part2<br>print(hero)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Spider-Man</div>
    `,
    desc: "Створи <code>word1 = \"Супер\"</code> та <code>word2 = \"герой\"</code>. Створи змінну <code>result = word1 + word2</code>. Виведи <code>result</code>.",
    hint: `Використай плюс (+), щоб зліпити word1 та word2 докупи і зберегти в result.`,
    expected: `Супергерой`,
    tests: [
      { type: "stdoutEquals", name: "Слова склеєні", value: "Супергерой", normalize: "soft" },
      { type: "codeRegex", name: "Є склеювання word1 + word2", pattern: "result\\s*=\\s*word1\\s*\\+\\s*word2" },
      { type: "codeRegex", name: "Вивід result", pattern: "print\\s*\\(\\s*result\\s*\\)" }
    ]
  },

  {
    title: "Проблема пробілів при склеюванні",
    xp: 160,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Плюс — це не кома!</h2>
      <p>Коли ми передавали аргументи в <code>print()</code> через <b>кому</b>, Python сам ставив між ними пробіли. Але коли ми склеюємо текст <b>плюсом</b>, Python робить це <b style="color: #ef4444;">впритул</b>!</p>
      <p><b>Помилка:</b></p>
      <div class="code-box">name = "Anna"<br>print("Привіт" + name)  <span style="color:gray;"># Виведе ПривітAnna</span></div>
      <p><b style="color: #10b981;">Рішення:</b> Додай пробіл вручну всередині лапок!</p>
      <div class="code-box">print("Привіт, " + name)  <span style="color:gray;"># Виведе Привіт, Anna</span></div>
    `,
    desc: "Задай <code>player = \"Max\"</code>. Використовуючи <b>плюс</b> (а не кому!), виведи: <code>Гравець Max увійшов</code>. Не забудь додати пробіли в лапках, щоб слова не позлипались!",
    hint: `Твій принт має виглядати так: print("Гравець " + player + " увійшов"). Зверни увагу на пробіли всередині лапок!`,
    expected: `Гравець Max увійшов`,
    tests: [
      { type: "stdoutEquals", name: "Текст із пробілами", value: "Гравець Max увійшов", normalize: "strict" },

      // перевіряємо, що саме використано +
      { type: "codeRegex", name: "Є конкатенація з player", pattern: "print\\s*\\(.*\\+\\s*player\\s*\\+.*\\)" },

      // забороняємо print("...", player) з комою
      { type: "codeRegex", name: "Кома не використовувалась", pattern: "print\\s*\\(.*,.*\\)", flags: "g", max: 0 }
    ]
  },

  {
    title: "Правила імен (Помилки)",
    xp: 170,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Як не можна називати коробки</h2>
      <p>У Python є суворі правила щодо імен змінних. Якщо їх порушити, програма видасть <code>SyntaxError</code> (Синтаксичну помилку).</p>
      <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
        <b>ЗАБОРОНЕНО:</b><br>
        ❌ Починати з цифри: <code>1player = "Max"</code><br>
        ❌ Робити пробіли: <code>my score = 100</code><br>
        ❌ Використовувати спецсимволи (!, @, -): <code>hero-name = "Бетмен"</code>
      </div>
      <p>Цифри використовувати можна, але тільки <b>НЕ на початку</b> (наприклад: <code>player1</code> — це ОК).</p>
    `,
    desc: `Цей код зламаний:<br>
<code>1_level = 5</code><br>
<code>print(1_level)</code><br>
Виправ ім'я змінної так, щоб цифра була в кінці (<code>level_1</code>).`,
    hint: `Просто перейменуй змінну в обох рядках (і там де створюєш, і там де друкуєш), поставивши одиницю в кінець.`,
    expected: `5`,
    tests: [
      { type: "stdoutEquals", name: "Код працює", value: "5", normalize: "soft" },
      { type: "codeRegex", name: "Правильне ім'я", pattern: "\\blevel_1\\b" },
      { type: "codeRegex", name: "Помилку виправлено", pattern: "\\b1_level\\b", flags: "g", max: 0 }
    ]
  },

  {
    title: "Зміїний регістр (snake_case)",
    xp: 180,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Стиль справжніх програмістів</h2>
      <p>Ми з'ясували, що пробіли в іменах заборонені. Але як назвати змінну "максимальне здоров'я гравця", щоб це було легко читати?</p>
      <p>У Python прийнято використовувати <b style="color: #10b981;">snake_case (зміїний регістр)</b>. Замість пробілів ми ставимо <b>нижнє підкреслення <code>_</code></b>.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">max_health = 100<br>player_first_name = "Alex"</div>
    `,
    desc: "Створи змінну для свого найкращого результату. Назви її правильно: <code>best_score</code>. Дай їй значення <code>999</code> і виведи на екран.",
    hint: `Не забудь про нижнє підкреслення між словами best та score.`,
    expected: `999`,
    tests: [
      { type: "stdoutEquals", name: "Виведено результат", value: "999", normalize: "soft" },
      { type: "codeRegex", name: "Використано snake_case", pattern: "best_score\\s*=\\s*999" },
      { type: "codeRegex", name: "Вивід best_score", pattern: "print\\s*\\(\\s*best_score\\s*\\)" }
    ]
  },

  {
    title: "Еволюція змінної (x = x + 1)",
    xp: 190,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Зміна на основі минулого</h2>
      <p>Як в іграх монети збільшуються на одну, коли ти її підбираєш? Це робиться за допомогою магічної конструкції, яка ламає мозок математикам!</p>
      <div class="code-box">coins = 10<br><b style="color: #ef4444;">coins = coins + 1</b></div>
      <p>Як це розуміє Python?</p>
      <ol>
        <li>Спочатку він дивиться на <b>ПРАВУ</b> частину: "Ага, беру поточні монети (10) і додаю 1. Буде 11".</li>
        <li>Потім дивиться на <b>ЛІВУ</b> частину: "Тепер кладу ці 11 назад у коробку coins. Старе значення (10) стирається".</li>
      </ol>
    `,
    desc: "Задай <code>level = 1</code>. На наступному рядку збільш його на один (<code>level = level + 1</code>). Виведи <code>level</code>.",
    hint: `Рядок оновлення має виглядати точно так: level = level + 1`,
    expected: `2`,
    tests: [
      { type: "stdoutEquals", name: "Рівень підвищено", value: "2", normalize: "soft" },
      { type: "codeRegex", name: "Оновлення через саму себе", pattern: "level\\s*=\\s*level\\s*\\+\\s*1" },
      { type: "codeRegex", name: "Вивід level", pattern: "print\\s*\\(\\s*level\\s*\\)" }
    ]
  },

  {
    title: "Втрата здоров'я",
    xp: 200,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Віднімання від себе</h2>
      <p>Точно так само можна і зменшувати змінні. Наприклад, якщо герой отримав урон.</p>
    `,
    desc: "Задай <code>hp = 100</code>. Герой отримав 20 урону. Зроби перезапис: <code>hp = hp - 20</code>. Виведи поточне здоров'я.",
    hint: `Не створюй нову змінну. Онови стару: hp = hp - 20.`,
    expected: `80`,
    tests: [
      { type: "stdoutEquals", name: "Здоров'я зменшилось", value: "80", normalize: "soft" },
      { type: "codeRegex", name: "Оновлення зі знаком мінус", pattern: "hp\\s*=\\s*hp\\s*-\\s*20" },
      { type: "codeRegex", name: "Вивід hp", pattern: "print\\s*\\(\\s*hp\\s*\\)" }
    ]
  },

  {
    title: "Магічне скорочення (+=)",
    xp: 220,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Код професіоналів</h2>
      <p>Писати <code>score = score + 5</code> занадто довго. Програмісти дуже ліниві, тому вони придумали короткий запис: <b style="color: #3b82f6;"><code>+=</code></b>.</p>
      <p>Оператор <code>+=</code> означає "Додай це до того, що вже лежить у коробці".</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">xp = 50<br><b style="color: #10b981;">xp += 10</b>  <span style="color:gray;"># Це те саме, що xp = xp + 10</span><br>print(xp)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">60</div>
    `,
    desc: "Задай <code>score = 10</code>. Збільш його на 5, використовуючи крутий оператор <code>+=</code>. Виведи <code>score</code>.",
    hint: `Напиши score += 5`,
    expected: `15`,
    tests: [
      { type: "stdoutEquals", name: "Бали додано", value: "15", normalize: "soft" },
      { type: "codeRegex", name: "Використано +=", pattern: "score\\s*\\+=\\s*5" },
      { type: "codeRegex", name: "Немає довгого запису", pattern: "score\\s*=\\s*score", flags: "g", max: 0 }
    ]
  },

  {
    title: "Скорочений урон (-=)",
    xp: 230,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Так само для мінуса</h2>
      <p>Логічно, що якщо є <code>+=</code>, то є і <b style="color: #ef4444;"><code>-=</code></b>. Він віднімає значення від поточної змінної.</p>
      <div class="code-box">hp = 100<br>hp -= 25  <span style="color:gray;"># Втрата 25 життів</span></div>
    `,
    desc: "Задай <code>shield = 50</code>. Відніми 15 за допомогою оператора <code>-=</code>. Виведи залишок щита.",
    hint: `Використай shield -= 15`,
    expected: `35`,
    tests: [
      { type: "stdoutEquals", name: "Щит пробито", value: "35", normalize: "soft" },
      { type: "codeRegex", name: "Використано -=", pattern: "shield\\s*-=?=\\s*15" } // допускає shield -= 15 (основне)
    ]
  },

  {
    title: "Множник очок (*=)",
    xp: 240,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Подвійні бали</h2>
      <p>Цей трюк працює для всіх математичних знаків! Щоб помножити значення само на себе, використовуй <b style="color: #f59e0b;"><code>*=</code></b>.</p>
    `,
    desc: "У гравця є <code>money = 20</code>. Він знайшов бустер x3! Збільш гроші в 3 рази за допомогою <code>*=</code> і виведи результат.",
    hint: `Напиши money *= 3`,
    expected: `60`,
    tests: [
      { type: "stdoutEquals", name: "Гроші помножено", value: "60", normalize: "soft" },
      { type: "codeRegex", name: "Використано *=", pattern: "money\\s*\\*=\\s*3" }
    ]
  },

  {
    title: "+= для тексту",
    xp: 250,
    kind: "practice",
    difficulty: "Middle",
    theory: `
      <h2>Дописування тексту</h2>
      <p>Оператор <code>+=</code> працює не тільки з числами, а й з текстом! Він просто "доклеює" нові слова в кінець старого рядка.</p>
      <div class="code-box">message = "Hello"<br>message += " World!"<br>print(message)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Hello World!</div>
    `,
    desc: "Створи <code>text = \"Python\"</code>. На наступному рядку допиши до нього слово (з пробілом на початку!): <code>text += \" супер\"</code>. Виведи <code>text</code>.",
    hint: `Не забудь пробіл перед словом 'супер' всередині лапок, інакше слова злипнуться.`,
    expected: `Python супер`,
    tests: [
      { type: "stdoutEquals", name: "Текст доповнено", value: "Python супер", normalize: "soft" },
      { type: "codeRegex", name: "Використано += для тексту", pattern: "text\\s*\\+=\\s*['\"]\\s*супер['\"]", checkRaw: true },
      { type: "codeRegex", name: "Вивід text", pattern: "print\\s*\\(\\s*text\\s*\\)" }
    ]
  },

  // ==========================================
  // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
  // ==========================================

  {
    title: "Підсумкова 1: Інвентар",
    xp: 300,
    kind: "quiz",
    difficulty: "Middle",
    theory: `
      <h2>Перевірка: Змінні та Математика</h2>
    `,
    desc: `У тебе було 5 яблук і 3 груші.<br>
    1. Створи змінну <code>apples = 5</code>.<br>
    2. Створи <code>pears = 3</code>.<br>
    3. Створи третю змінну <code>total_fruits</code>, яка буде сумою перших двох.<br>
    4. Роздрукуй <code>total_fruits</code>.`,
    hint: `Створи третю змінну через додавання: total_fruits = apples + pears`,
    expected: `8`,
    tests: [
      { type: "stdoutEquals", name: "Підрахунок правильний", value: "8", normalize: "soft" },
      { type: "codeRegex", name: "Використано snake_case та додавання", pattern: "total_fruits\\s*=\\s*apples\\s*\\+\\s*pears" },
      { type: "codeRegex", name: "Вивід total_fruits", pattern: "print\\s*\\(\\s*total_fruits\\s*\\)" }
    ]
  },

  {
    title: "Підсумкова 2: Лікування",
    xp: 350,
    kind: "quiz",
    difficulty: "Middle",
    theory: `
      <h2>Перевірка: Оновлення змінної</h2>
    `,
    desc: `Гравець був поранений. <code>health = 40</code>.<br>
    Він випив зілля, яке лікує на 50 одиниць.<br>
    Онови змінну здоров'я за допомогою короткого оператора <code>+=</code> і виведи нове здоров'я на екран.`,
    hint: `Створи health = 40, потім health += 50, потім print.`,
    expected: `90`,
    tests: [
      { type: "stdoutEquals", name: "Вилікувано успішно", value: "90", normalize: "soft" },
      { type: "codeRegex", name: "Використано +=", pattern: "health\\s*\\+=\\s*50" }
    ]
  },

  {
    title: "Підсумкова 3: Склеювання імені",
    xp: 400,
    kind: "quiz",
    difficulty: "Middle",
    theory: `
      <h2>Перевірка: Конкатенація рядків</h2>
    `,
    desc: `Створи: <code>first = "Harry"</code> та <code>last = "Potter"</code>.<br>
    Створи змінну <code>full_name</code>. Зліпи ім'я та прізвище за допомогою плюса (<code>+</code>), але <b>обов'язково встав пробіл</b> між ними! Виведи <code>full_name</code>.`,
    hint: `Тобі треба додати ТРИ частини: first + " " + last.`,
    expected: `Harry Potter`,
    tests: [
      { type: "stdoutEquals", name: "Ім'я з пробілом", value: "Harry Potter", normalize: "strict" },

      // тут точно будуть лапки => checkRaw
      { type: "codeRegex", name: "Конкатенація з пробілом", pattern: "full_name\\s*=\\s*first\\s*\\+\\s*['\"]\\s+['\"]\\s*\\+\\s*last", checkRaw: true },

      { type: "codeRegex", name: "Вивід full_name", pattern: "print\\s*\\(\\s*full_name\\s*\\)" }
    ]
  },

  // ==========================================
  // 🟡 MIDDLE BOSS
  // ==========================================

  {
    title: "🟡 БОС (Middle): RPG Магазин",
    xp: 600,
    kind: "boss",
    difficulty: "Middle",
    theory: `
      <h2>Фінальний іспит рівня Middle</h2>
      <p>Об'єднай усі свої знання про змінні, віднімання грошей та f-рядки, щоб зробити логіку магазину!</p>
    `,
    desc: `1. Задай золото гравця: <code>gold = 200</code>.<br>
    2. Задай ціну меча: <code>sword_price = 150</code>.<br>
    3. Зніми гроші з гравця! Використай оператор <code>-=</code>, щоб відняти <code>sword_price</code> від <code>gold</code>.<br>
    4. За допомогою <b>f-рядка</b> (який ми вчили в модулі print) виведи звіт: <code>Покупка успішна! Залишок: 50 золота</code> (де 50 — це змінна gold).`,
    hint: `Спочатку створи дві змінні. Потім зроби віднімання: gold -= sword_price. Останній рядок - це print(f"Покупка успішна! Залишок: {gold} золота").`,
    expected: `Покупка успішна! Залишок: 50 золота`,
    tests: [
      { type: "stdoutEquals", name: "Логіка магазину працює", value: "Покупка успішна! Залишок: 50 золота", normalize: "soft" },

      { type: "codeRegex", name: "Віднімання через -=", pattern: "gold\\s*-=?=\\s*sword_price" },

      // f-string та {gold} => checkRaw
      { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
      { type: "codeRegex", name: "Вивід змінної {gold}", pattern: "\\{\\s*gold\\s*\\}", checkRaw: true }
    ]
  },

// ==========================================
// 🔴 РІВЕНЬ: SENIOR (Трюки ніндзя та Оптимізація)
// ==========================================
  {
    title: "Множинне присвоєння",
    xp: 200,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Створення пачками</h2>
      <p>У більшості мов програмування, щоб створити три змінні, потрібно писати три рядки коду. Але Python дозволяє зробити це <b style="color: #10b981;">в один рядок</b>!</p>
      <p>Просто перелічи імена коробок через кому зліва, а їхні значення через кому справа.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">x, y, z = 10, 20, 30<br>print(y)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">20</div>
      <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
        <b style="color: #ef4444;">Головне правило:</b> Кількість коробок зліва має ТОЧНО дорівнювати кількості значень справа!
      </div>
    `,
    desc: "В один рядок створи дві змінні <code>width</code> та <code>height</code>, і надай їм значення <code>1920</code> та <code>1080</code>. На наступному рядку виведи їх через кому.",
    hint: `Напиши: width, height = 1920, 1080. А на наступному рядку просто використай print.`,
    expected: `1920 1080`,
    tests: [
      { type: "stdoutEquals", name: "Змінні створено та виведено", value: "1920 1080", normalize: "soft" },
      { type: "codeRegex", name: "Присвоєння в один рядок", pattern: "width\\s*,\\s*height\\s*=\\s*1920\\s*,\\s*1080" },
      { type: "codeRegex", name: "Вивід двох змінних", pattern: "print\\s*\\(\\s*width\\s*,\\s*height\\s*\\)" }
    ]
  },

  {
    title: "Математика при створенні",
    xp: 210,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Одночасні обчислення</h2>
      <p>Множинне присвоєння дозволяє відразу робити математику. Python спочатку обчислює <b style="color: #3b82f6;">ВСІ значення справа</b>, і лише потім розкладає їх по коробках зліва!</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">a = 5<br>x, y = a, a * 2<br>print(x, y)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">5 10</div>
    `,
    desc: "Створи <code>base = 10</code>. На наступному рядку створи змінні <code>dmg</code> та <code>crit</code>. <code>dmg</code> має дорівнювати <code>base</code>, а <code>crit</code> має дорівнювати <code>base * 2</code>. Зроби це <b>в один рядок</b>! Виведи обидві.",
    hint: `Другий рядок має виглядати так: dmg, crit = base, base * 2. Третій рядок — вивід цих двох змінних.`,
    expected: `10 20`,
    tests: [
      { type: "stdoutEquals", name: "Обчислено правильно", value: "10 20", normalize: "soft" },
      { type: "codeRegex", name: "Одночасне створення", pattern: "dmg\\s*,\\s*crit\\s*=\\s*base\\s*,\\s*base\\s*\\*\\s*2" },
      { type: "codeRegex", name: "Вивід dmg і crit", pattern: "print\\s*\\(\\s*dmg\\s*,\\s*crit\\s*\\)" }
    ]
  },

  {
    title: "Розпакування тексту",
    xp: 220,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Магія розрізання рядків</h2>
      <p>Множинне присвоєння має ще один секрет! Якщо ти спробуєш покласти рядок тексту в кілька змінних, Python <b style="color: #3b82f6;">автоматично розріже цей текст по буквах</b> і розкладе їх у коробки.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">char1, char2, char3 = "Кіт"<br>print(char1)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">К</div>
    `,
    desc: "Створи дві змінні <code>a, b</code> в один рядок і розпакуй у них текст <code>\"GO\"</code>. Виведи ці змінні через пробіл (за допомогою коми у <code>print</code>).",
    hint: `Напиши: a, b = "GO". Python покладе "G" в a, а "O" в b.`,
    expected: `G O`,
    tests: [
      { type: "stdoutEquals", name: "Букви розпаковано", value: "G O", normalize: "soft" },

      // лапки в коді => checkRaw
      { type: "codeRegex", name: "Розпакування рядка", pattern: "a\\s*,\\s*b\\s*=\\s*['\"]GO['\"]", checkRaw: true },

      { type: "codeRegex", name: "Вивід a і b", pattern: "print\\s*\\(\\s*a\\s*,\\s*b\\s*\\)" }
    ]
  },

  {
    title: "Ланцюжкове присвоєння",
    xp: 230,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Усім порівну!</h2>
      <p>Що, якщо у грі є 3 гравці, і на старті всім треба дати рівно по 100 монет? Щоб не писати три рядки, використовуй <b style="color: #10b981;">ланцюжок дорівнює</b>.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">p1 = p2 = p3 = 100<br>print(p2)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">100</div>
    `,
    desc: "Створи три змінні: <code>bot1</code>, <code>bot2</code>, <code>bot3</code>. В один рядок (через ланцюжок <code>=</code>) надай їм усім значення <code>\"Очікування\"</code>. Виведи <code>bot2</code>.",
    hint: `Твій код: bot1 = bot2 = bot3 = "Очікування". Потім просто print(bot2).`,
    expected: `Очікування`,
    tests: [
      { type: "stdoutEquals", name: "Значення правильне", value: "Очікування", normalize: "soft" },

      // лапки => checkRaw
      { type: "codeRegex", name: "Використано ланцюжок", pattern: "bot1\\s*=\\s*bot2\\s*=\\s*bot3\\s*=\\s*['\"]Очікування['\"]", checkRaw: true },

      { type: "codeRegex", name: "Вивід bot2", pattern: "print\\s*\\(\\s*bot2\\s*\\)" }
    ]
  },

  {
    title: "Розрив ланцюжка",
    xp: 240,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Чи склеєні вони назавжди?</h2>
      <p>Якщо ти створиш змінні через ланцюжок (<code>x = y = 50</code>), вони отримають однакове значення. Але чи пов'язані вони назавжди?</p>
      <p><b style="color: #ef4444;">НІ!</b> Якщо ти потім перезапишеш <code>x = 100</code>, змінна <code>y</code> залишиться недоторканою (у ній далі лежатиме 50).</p>
    `,
    desc: "Створи ланцюжок <code>a = b = 10</code>. На наступному рядку перезапиши <code>a = 99</code>. Виведи змінну <code>b</code>. Вона має залишитись десяткою!",
    hint: `Зроби ланцюжок, потім зміни тільки a, а роздрукуй тільки b.`,
    expected: `10`,
    tests: [
      { type: "stdoutEquals", name: "Ланцюжок розірвано правильно", value: "10", normalize: "soft" },
      { type: "codeRegex", name: "Є ланцюжок", pattern: "a\\s*=\\s*b\\s*=\\s*10" },
      { type: "codeRegex", name: "Зміна змінної a", pattern: "a\\s*=\\s*99" },
      { type: "codeRegex", name: "Вивід b", pattern: "print\\s*\\(\\s*b\\s*\\)" }
    ]
  },

  {
    title: "Обмін значеннями (Swap)",
    xp: 250,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Легендарний трюк Python</h2>
      <p>Уяви, що в лівій руці в тебе Меч (<code>left</code>), а в правій — Щит (<code>right</code>). Тобі треба поміняти їх місцями.</p>
      <p>У звичайних мовах тобі довелося б покласти Меч на стіл (створити третю змінну <code>temp</code>). Але Python робить магію в один рядок!</p>
      <p><b>Приклад (Swap):</b></p>
      <div class="code-box">a = 1<br>b = 2<br><b style="color: #ef4444;">a, b = b, a</b><br>print(a, b)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">2 1</div>
    `,
    desc: "Задай <code>x = \"Вогонь\"</code> та <code>y = \"Вода\"</code>. Зроби обмін (Swap) в один рядок: <code>x, y = y, x</code>. Виведи спочатку <code>x</code>, потім <code>y</code>.",
    hint: `Після створення змінних напиши магічний рядок: x, y = y, x. А потім роздрукуй їх через кому.`,
    expected: `Вода Вогонь`,
    tests: [
      { type: "stdoutEquals", name: "Значення обмінялися", value: "Вода Вогонь", normalize: "soft" },

      // лапки => checkRaw
      { type: "codeRegex", name: "Створено x і y", pattern: "x\\s*=\\s*['\"]Вогонь['\"].*y\\s*=\\s*['\"]Вода['\"]", flags: "s", checkRaw: true },

      { type: "codeRegex", name: "Використано Swap", pattern: "x\\s*,\\s*y\\s*=\\s*y\\s*,\\s*x" },
      { type: "codeRegex", name: "Вивід x і y", pattern: "print\\s*\\(\\s*x\\s*,\\s*y\\s*\\)" }
    ]
  },

  {
    title: "Круговий обмін",
    xp: 260,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Жонглювання даними</h2>
      <p>Трюк зі Swap працює не лише для двох змінних. Ти можеш обмінювати їх по колу хоч десятками!</p>
      <div class="code-box">a, b, c = 1, 2, 3<br>a, b, c = c, a, b</div>
      <p class="mutedish tiny">c йде в a, a йде в b, b йде в c. Усі значення зсуваються!</p>
    `,
    desc: "Є <code>a=10</code>, <code>b=20</code>, <code>c=30</code>. Зроби зсув так, щоб <code>a</code> отримало <code>b</code>, <code>b</code> отримало <code>c</code>, а <code>c</code> отримало <code>a</code> (<code>a, b, c = b, c, a</code>). Виведи їх.",
    hint: `Спочатку створи їх в один рядок: a, b, c = 10, 20, 30. Потім зсув: a, b, c = b, c, a. Потім принт.`,
    expected: `20 30 10`,
    tests: [
      { type: "stdoutEquals", name: "Зсув виконано", value: "20 30 10", normalize: "soft" },
      { type: "codeRegex", name: "Створено a,b,c разом", pattern: "a\\s*,\\s*b\\s*,\\s*c\\s*=\\s*10\\s*,\\s*20\\s*,\\s*30" },
      { type: "codeRegex", name: "Потрійний Swap", pattern: "a\\s*,\\s*b\\s*,\\s*c\\s*=\\s*b\\s*,\\s*c\\s*,\\s*a" },
      { type: "codeRegex", name: "Вивід a,b,c", pattern: "print\\s*\\(\\s*a\\s*,\\s*b\\s*,\\s*c\\s*\\)" }
    ]
  },

  {
    title: "Swap із математикою",
    xp: 270,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Обмін із модифікацією</h2>
      <p>Під час обміну ми можемо одразу змінювати значення! Python все порахує зі старими даними, а потім розкладе по коробках.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">hp, mana = 100, 50<br><b style="color: #3b82f6;">hp, mana = mana + 10, hp - 10</b><br>print(hp, mana)</div>
      <p><b>Результат:</b></p>
      <div class="output-box">60 90</div>
    `,
    desc: "Створи <code>x, y = 5, 10</code>. Зроби Swap, але при цьому збільш обидва значення на 1 (<code>x, y = y + 1, x + 1</code>). Виведи їх.",
    hint: `x має отримати старе y + 1. А y має отримати старе x + 1.`,
    expected: `11 6`,
    tests: [
      { type: "stdoutEquals", name: "Обмін та математика", value: "11 6", normalize: "soft" },
      { type: "codeRegex", name: "Стартові значення", pattern: "x\\s*,\\s*y\\s*=\\s*5\\s*,\\s*10" },
      { type: "codeRegex", name: "Swap з додаванням", pattern: "x\\s*,\\s*y\\s*=\\s*y\\s*\\+\\s*1\\s*,\\s*x\\s*\\+\\s*1" },
      { type: "codeRegex", name: "Вивід x,y", pattern: "print\\s*\\(\\s*x\\s*,\\s*y\\s*\\)" }
    ]
  },

  {
    title: "Порожня коробка (None)",
    xp: 280,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Коли немає нічого</h2>
      <p>Що покласти в змінну <code>weapon</code>, якщо герой починає гру з порожніми руками? Нуль не підійде (це число). Порожній рядок <code>""</code> — теж милиця.</p>
      <p>У Python є спеціальне слово <b style="color: #f59e0b;"><code>None</code></b> (з великої літери!). Воно означає "абсолютно нічого, порожнеча".</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">active_quest = None<br>print(active_quest)</div>
    `,
    desc: "Створи змінну <code>current_target</code> і поклади в неї значення <code>None</code>. Роздрукуй змінну.",
    hint: `Слово None пишеться без лапок і обов'язково з великої літери 'N'. Це вбудований тип даних.`,
    expected: `None`,
    tests: [
      { type: "stdoutEquals", name: "Виведено порожнечу", value: "None", normalize: "soft" },
      { type: "codeRegex", name: "Присвоєно None", pattern: "current_target\\s*=\\s*None" },
      { type: "codeRegex", name: "Вивід current_target", pattern: "print\\s*\\(\\s*current_target\\s*\\)" }
    ]
  },

  {
    title: "Знищення змінної (del)",
    xp: 290,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Спалити дотла</h2>
      <p>Іноді змінна більше не потрібна, і ми хочемо звільнити пам'ять комп'ютера. Для цього використовується команда <b style="color: #ef4444;"><code>del</code></b> (від слова <i>delete</i>).</p>
      <p>Якщо ти видалиш змінну, а потім спробуєш її надрукувати — програма видасть помилку <code>NameError</code>, бо такої коробки більше не існує!</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">secret = "Код 123"<br><b style="color: #ef4444;">del</b> secret</div>
    `,
    desc: "Створи <code>temp_data = 100</code>. На наступному рядку видали її командою <code>del temp_data</code>. А на третьому рядку виведи слово <code>\"Очищено\"</code>.",
    hint: `Не намагайся друкувати temp_data після видалення! Просто виведи текст "Очищено", щоб підтвердити, що код відпрацював без помилок.`,
    expected: `Очищено`,
    tests: [
      { type: "stdoutEquals", name: "Код працює", value: "Очищено", normalize: "soft" },
      { type: "codeRegex", name: "Використано del", pattern: "del\\s+temp_data" },

      // лапки в print => checkRaw
      { type: "codeRegex", name: "Є print('Очищено')", pattern: "print\\s*\\(\\s*['\"]Очищено['\"]\\s*\\)", checkRaw: true }
    ]
  },

  {
    title: "Константи (ВЕЛИКІ БУКВИ)",
    xp: 300,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Змінні, які не змінюються</h2>
      <p>Іноді в грі є речі, які ніколи не повинні змінюватися (наприклад, ліміт здоров'я або гравітація). Їх називають <b style="color: #3b82f6;">Константами</b>.</p>
      <p>У Python немає спеціального захисту для констант. Замість цього програмісти домовилися: <b style="color: #10b981;">якщо ім'я написано ВЕЛИКИМИ ЛІТЕРАМИ, то його заборонено перезаписувати</b>.</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">MAX_PLAYERS = 4<br>FPS_LIMIT = 60</div>
    `,
    desc: "Створи константу <code>MAX_HEALTH</code> і дай їй значення <code>100</code>. Виведи її на екран.",
    hint: `Просто створи змінну, але напиши її назву повністю великими буквами (з нижнім підкресленням).`,
    expected: `100`,
    tests: [
      { type: "stdoutEquals", name: "Константу виведено", value: "100", normalize: "soft" },
      { type: "codeRegex", name: "Ім'я з великих літер", pattern: "MAX_HEALTH\\s*=\\s*100" },
      { type: "codeRegex", name: "Вивід MAX_HEALTH", pattern: "print\\s*\\(\\s*MAX_HEALTH\\s*\\)" }
    ]
  },

  {
    title: "Комбо: f-рядок + Змінні",
    xp: 320,
    kind: "practice",
    difficulty: "Senior",
    theory: `
      <h2>Ідеальне форматування</h2>
      <p>Коли ми вивчили f-рядки, ми робили в них математику: <code>f"Рахунок: {5+5}"</code>. Але найчастіше у фігурні дужки передають саме <b style="color: #f59e0b;">Змінні</b>!</p>
      <p><b>Приклад:</b></p>
      <div class="code-box">hero = "Маг"<br>hp = 50<br>print(f"Гравець {hero} має {hp} життів")</div>
      <p><b>Результат:</b></p>
      <div class="output-box">Гравець Маг має 50 життів</div>
    `,
    desc: `Створи змінні <code>name = "Alex"</code> та <code>score = 999</code>.<br>
    Використай один f-рядок, щоб вивести: <code>Player: Alex | Score: 999</code>.`,
    hint: `Постав літеру 'f' перед лапками, а змінні name і score помісти у фігурні дужки: {name} та {score}.`,
    expected: `Player: Alex | Score: 999`,
    tests: [
      { type: "stdoutEquals", name: "Форматування правильне", value: "Player: Alex | Score: 999", normalize: "strict" },
      { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
      { type: "codeRegex", name: "Змінні в дужках", pattern: "\\{\\s*name\\s*\\}.*\\{\\s*score\\s*\\}", flags: "s", checkRaw: true }
    ]
  },

  // ==========================================
  // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
  // ==========================================

  {
    title: "Підсумкова 1: Швидкий старт",
    xp: 350,
    kind: "quiz",
    difficulty: "Senior",
    theory: `
      <h2>Перевірка: Ланцюжки</h2>
    `,
    desc: `Уяви, що гра починається. Створи змінні <code>player_hp</code>, <code>enemy_hp</code> та <code>boss_hp</code>, і дай їм усім значення <code>1000</code> за допомогою <b>ланцюжкового присвоєння (одним рядком)</b>.<br>
    Роздрукуй <code>boss_hp</code>.`,
    hint: `Використай кілька знаків дорівнює: player_hp = enemy_hp = boss_hp = 1000.`,
    expected: `1000`,
    tests: [
      { type: "stdoutEquals", name: "Вивід правильний", value: "1000", normalize: "soft" },
      { type: "codeRegex", name: "Три змінні в ланцюжку", pattern: "player_hp\\s*=\\s*enemy_hp\\s*=\\s*boss_hp\\s*=\\s*1000" },
      { type: "codeRegex", name: "Вивід boss_hp", pattern: "print\\s*\\(\\s*boss_hp\\s*\\)" }
    ]
  },

  {
    title: "Підсумкова 2: Спритність рук",
    xp: 400,
    kind: "quiz",
    difficulty: "Senior",
    theory: `
      <h2>Перевірка: Обмін значень (Swap)</h2>
    `,
    desc: `Гравець хоче поміняти місцями зброю. Задай <code>slot1 = "Пістолет"</code> та <code>slot2 = "Дробовик"</code>.<br>
    В один рядок поміняй їх місцями (Swap).<br>
    Виведи <code>slot1</code>. (Він має стати Дробовиком!).`,
    hint: `Використай магічну конструкцію: slot1, slot2 = slot2, slot1`,
    expected: `Дробовик`,
    tests: [
      { type: "stdoutEquals", name: "Зброю замінено", value: "Дробовик", normalize: "soft" },
      { type: "codeRegex", name: "Класичний Swap", pattern: "slot1\\s*,\\s*slot2\\s*=\\s*slot2\\s*,\\s*slot1" },
      { type: "codeRegex", name: "Вивід slot1", pattern: "print\\s*\\(\\s*slot1\\s*\\)" }
    ]
  },

  {
    title: "Підсумкова 3: Словник констант",
    xp: 450,
    kind: "quiz",
    difficulty: "Senior",
    theory: `
      <h2>Перевірка: Множинне + Константи + f-рядки</h2>
    `,
    desc: `Створи дві константи <code>MIN_AGE</code> та <code>MAX_AGE</code> в один рядок. Дай їм значення <code>10</code> та <code>99</code> відповідно.<br>
    За допомогою <b>f-рядка</b> виведи: <code>Від 10 до 99 років</code>.`,
    hint: `Напиши: MIN_AGE, MAX_AGE = 10, 99. Потім print(f"Від {MIN_AGE} до {MAX_AGE} років").`,
    expected: `Від 10 до 99 років`,
    tests: [
      { type: "stdoutEquals", name: "Вивід правильний", value: "Від 10 до 99 років", normalize: "soft" },
      { type: "codeRegex", name: "Створено константи разом", pattern: "MIN_AGE\\s*,\\s*MAX_AGE\\s*=\\s*10\\s*,\\s*99" },
      { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true }
    ]
  },

  // ==========================================
  // 🔴 SENIOR BOSS
  // ==========================================

  {
    title: "🔴 БОС (Senior): Архітектура Інвентарю",
    xp: 800,
    kind: "boss",
    difficulty: "Senior",
    theory: `
      <h2>Фінальний бос: Архітектор гри</h2>
      <p>Поєднай усе, що ти вивчив! Змійний регістр, множинне створення, скорочення <code>+=</code>, обмін Swap та f-рядки.</p>
    `,
    desc: `Напиши код крок за кроком:<br>
    1. Створи в один рядок змінні: <code>item_left</code> (значення <code>"Зілля"</code>) та <code>item_right</code> (значення <code>"Ключ"</code>).<br>
    2. Створи константу <code>START_GOLD</code> і дай їй значення <code>50</code>.<br>
    3. Збільш золото на 20 одиниць за допомогою оператора <code>+=</code>.<br>
    4. Зроби Swap (обміняй місцями <code>item_left</code> та <code>item_right</code>).<br>
    5. Одним <b>f-рядком</b> виведи: <code>Gold: 70 | L: Ключ | R: Зілля</code>.`,
    hint: `1) item_left, item_right = "Зілля", "Ключ"
2) START_GOLD = 50
3) START_GOLD += 20
4) item_left, item_right = item_right, item_left
5) print(f"Gold: {START_GOLD} | L: {item_left} | R: {item_right}")`,
    expected: `Gold: 70 | L: Ключ | R: Зілля`,
    tests: [
      { type: "stdoutEquals", name: "Ідеальний звіт інвентарю", value: "Gold: 70 | L: Ключ | R: Зілля", normalize: "strict" },

      // множинне створення з лапками => checkRaw
      {
        type: "codeRegex",
        name: "Множинне створення",
        pattern: "item_left\\s*,\\s*item_right\\s*=\\s*['\"]Зілля['\"]\\s*,\\s*['\"]Ключ['\"]",
        checkRaw: true
      },

      { type: "codeRegex", name: "Константа створена", pattern: "START_GOLD\\s*=\\s*50" },
      { type: "codeRegex", name: "Використано +=", pattern: "START_GOLD\\s*\\+=\\s*20" },
      { type: "codeRegex", name: "Зроблено Swap", pattern: "item_left\\s*,\\s*item_right\\s*=\\s*item_right\\s*,\\s*item_left" },

      // f-string => checkRaw
      { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },

      // щоб не «хакали» просто print("Gold: 70 ...") без змінних
      { type: "codeRegex", name: "Є {START_GOLD}", pattern: "\\{\\s*START_GOLD\\s*\\}", checkRaw: true },
      { type: "codeRegex", name: "Є {item_left}", pattern: "\\{\\s*item_left\\s*\\}", checkRaw: true },
      { type: "codeRegex", name: "Є {item_right}", pattern: "\\{\\s*item_right\\s*\\}", checkRaw: true }
    ]
  }
    ]
  };



  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
