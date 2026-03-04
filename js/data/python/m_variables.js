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

          // ВАЖЛИВО: тут перевіряємо текст у лапках => треба checkRaw
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

          // Тут теж є строка в лапках => checkRaw
          // І робимо простий надійний шаблон під правильний код:
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
          { type: "codeRegex", name: "Використано дві коми", pattern: "print\\s*\\(.*\\,.*item.*\\,.*\\)" }
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

          // Тут є строкові літерали => checkRaw і flags s (бо між ними може бути перенос)
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

          // Тут є строка в лапках => checkRaw
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
        
          {
            type: "codeRegex",
            name: "print використовує sep",
            pattern: "sep\\s*=\\s*['\"]\\/['\"]",
            checkRaw: true
          }
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
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=\\s*['\"]['\"]" }
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
          { type: "codeRegex", name: "Є змінні", pattern: "hero\\s*=.*LvL\\s*=", flags: "s" },
          { type: "codeRegex", name: "Є коментар # Клас", pattern: "#\\s*Клас", checkRaw: true },
          { type: "codeRegex", name: "Є коментар # Рівень", pattern: "#\\s*Рівень", checkRaw: true },
          { type: "codeRegex", name: "Виведено через змінні (без хаків)", pattern: "print\\s*\\(.*hero.*LvL.*\\)" }
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
          { type: "codeRegex", name: "Змінна result", pattern: "result\\s*=\\s*a\\s*\\+\\s*b" }
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
          { type: "codeRegex", name: "Використано віднімання змінних", pattern: "change\\s*=\\s*gold\\s*-\\s*price" }
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
          { type: "codeIncludes", name: "Є додавання рядків", value: "+" }
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
          { type: "codeIncludes", name: "Використано склеювання (+)", value: "+" },
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
          { type: "codeRegex", name: "Правильне ім'я", pattern: "level_1" },
          { type: "codeRegex", name: "Помилку виправлено", pattern: "1_level", flags: "g", max: 0 }
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
          { type: "codeRegex", name: "Використано snake_case", pattern: "best_score\\s*=\\s*999" }
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
          { type: "codeRegex", name: "Оновлення через саму себе", pattern: "level\\s*=\\s*level\\s*\\+\\s*1" }
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
          { type: "codeRegex", name: "Оновлення зі знаком мінус", pattern: "hp\\s*=\\s*hp\\s*-\\s*20" }
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
          { type: "codeIncludes", name: "Використано оператор +=", value: "+=" },
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
          { type: "codeIncludes", name: "Використано оператор -=", value: "-=" }
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
          { type: "codeIncludes", name: "Використано оператор *=", value: "*=" }
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
          { type: "codeIncludes", name: "Використано += для тексту", value: "+=" }
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
          { type: "codeRegex", name: "Використано snake_case та додавання", pattern: "total_fruits\\s*=\\s*apples\\s*\\+\\s*pears" }
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
          { type: "codeIncludes", name: "Використано +=", value: "+=" }
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
          { type: "codeIncludes", name: "Конкатенація з пробілом", value: '+" "+' }
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
          { type: "codeIncludes", name: "Віднімання -=", value: "-=" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "f['\"]", checkRaw: true },
          { type: "codeIncludes", name: "Вивід змінної {gold}", value: "{gold}", checkRaw: true }
        ]
      }

    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
