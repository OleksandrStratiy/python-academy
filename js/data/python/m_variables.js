// js/data/python/m_variables.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_variables",
    title: "Змінні та Коментарі",
    icon: "ri-box-3-line",
    color: "#8b5cf6", // Фіолетовий колір для змінних
    desc: "Створюємо коробки для даних, вчимося їх змінювати та керувати кодом за допомогою коментарів.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (База змінних та коментарі)
      // ==========================================

      {
        title: "📦 Перша змінна (Текст)",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Що таке змінна?</h2>
          <p>Уяви, що <b style="color: #3b82f6;">змінна</b> — це звичайна картонна коробка. Ми можемо наклеїти на неї маркер з ім'ям і покласти всередину якісь дані (текст або число).</p>
          <p>Щоб створити коробку, ми пишемо її ім'я, ставимо знак дорівнює <b style="color: #ef4444;"><code>=</code></b>, і пишемо те, що хочемо туди покласти.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">player = "Alex"<br>print(player)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Alex</div>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b>Зверни увагу:</b> Коли ми друкуємо змінну через <code style="color: #0ea5e9;">print()</code>, ми <b style="color: #ef4444;">НЕ ставимо лапки</b> навколо її імені! Інакше надрукується слово "player", а не ім'я гравця.
          </div>
        `,
        desc: `
          <div class="task-main">
            <p>У новій грі створюється персонаж. Система має зберегти його ім'я в пам'яті комп'ютера і вивести на екран.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну з іменем <code style="color: #0ea5e9;">hero</code> і поклади в неї текст <code style="color: #0ea5e9;">"Бетмен"</code>. На наступному рядку видрукуй цю змінну за допомогою команди виводу.
          </div>
        `,
        hint: `Спочатку ім'я змінної, потім знак дорівнює, потім текст у лапках. На другому рядку напиши print і передай туди ім'я змінної (без лапок!).`,
        expected: `Бетмен`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Бетмен", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну hero", pattern: "hero\\s*=\\s*['\"]Бетмен['\"]", checkRaw: true },
          { type: "codeRegex", name: "Змінну виведено без лапок", pattern: "print\\s*\\(\\s*hero\\s*\\)" }
        ]
      },

      {
        title: "🔢 Змінна для чисел",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Скриня для золота</h2>
          <p>У змінні можна класти не тільки текст, а й <b style="color: #10b981;">числа</b>. Правила абсолютно ті самі, але числа ми завжди пишемо без лапок.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">hp = 100<br>print(hp)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець завершив рівень. Програма має зберегти його бали (500) у спеціальну комірку пам'яті та показати гравцеві.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">score</code> і поклади в неї число <code style="color: #0ea5e9;">500</code>. Виведи її значення за допомогою <code style="color: #0ea5e9;">print()</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Числа в Python записуються без лапок.
          </div>
        `,
        hint: `Змінна score створюється через знак =. На другому рядку роздрукуй її.`,
        expected: `500`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "500", normalize: "soft" },
          { type: "codeRegex", name: "Змінна score створена", pattern: "score\\s*=\\s*500" },
          { type: "codeRegex", name: "Друк змінної score", pattern: "print\\s*\\(\\s*score\\s*\\)" }
        ]
      },

      {
        title: "🪤 Пастка новачків: Лапки",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ім'я чи вміст?</h2>
          <p>Це найголовніше правило, яке треба запам'ятати назавжди!</p>
          <ul style="padding-left: 20px;">
            <li>Якщо ти пишеш слово <b style="color: #ef4444;">в лапках</b> — Python думає, що це просто малюнок слова (текст) і друкує його як є.</li>
            <li>Якщо ти пишеш слово <b style="color: #10b981;">без лапок</b> — Python шукає коробку (змінну) з таким ім'ям і дістає те, що лежить всередині.</li>
          </ul>
          
          <p><b>Приклад пастки:</b></p>
          <div class="code-box">gold = 99<br>print("gold")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">gold  <span style="color:gray;"># Вивело слово "gold", а не число 99!</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>У сейфі лежить секретний код. Програма має дістати з сейфа число, а не просто надрукувати слово "secret".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У тебе є змінна <code style="color: #0ea5e9;">secret = 777</code>. Напиши <code style="color: #0ea5e9;">print()</code> правильно, щоб вивести вміст цієї змінної.
          </div>
        `,
        hint: `Не використовуй лапки всередині print, інакше виведеться слово secret замість числа!`,
        expected: `777`,
        tests: [
          { type: "stdoutEquals", name: "Вміст дістали правильно", value: "777", normalize: "soft" },
          { type: "codeRegex", name: "Змінна secret створена", pattern: "secret\\s*=\\s*777" },
          { type: "codeRegex", name: "Друк без лапок", pattern: "print\\s*\\(\\s*secret\\s*\\)" }
        ]
      },

      {
        title: "🤝 Текст + Змінна",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Поєднуємо коробку і текст</h2>
          <p>У модулі про <code>print()</code> ми вчили, що аргументи можна передавати через <b style="color: #3b82f6;">кому</b>. Цей трюк ідеально працює зі змінними!</p>
          <p>Ти можеш надрукувати трохи тексту (в лапках), поставити кому, і дописати ім'я змінної (без лапок).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">name = "Anna"<br>print("Привіт,", name)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Привіт, Anna</div>
        `,
        desc: `
          <div class="task-main">
            <p>Інтерфейс гри має повідомити гравцю, скільки він зібрав монет: <code>Зібрано монет: 50</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">coins = 50</code>. Виведи текст <code style="color: #0ea5e9;">"Зібрано монет:"</code> і змінну <code style="color: #0ea5e9;">coins</code> через кому в одному <code style="color: #0ea5e9;">print()</code>.
          </div>
        `,
        hint: `Тобі потрібен один print. Спочатку текст "Зібрано монет:" (у лапках), потім кома, потім змінна coins (без лапок).`,
        expected: `Зібрано монет: 50`,
        tests: [
          { type: "stdoutEquals", name: "Рядок правильний", value: "Зібрано монет: 50", normalize: "soft" },
          { type: "codeRegex", name: "Текст і змінна через кому", pattern: "print\\s*\\(\\s*['\"]Зібрано\\s+монет:\\s*['\"]\\s*,\\s*coins\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📏 Правило пробілів (Коми)",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Кома робить відступ</h2>
          <p>Пам'ятай: коли ми поєднуємо текст і змінну через кому в функції <code>print()</code>, Python <b style="color: #10b981;">автоматично додає пробіл</b> на місце коми.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">age = 15<br>print("Мені", age, "років")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Мені 15 років</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система логування генерує повідомлення: <code>Гравець знайшов Меч у скрині</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">item = "Меч"</code>. За допомогою одного <code style="color: #0ea5e9;">print()</code> і <b>двох ком</b> зліпи текст зліва, змінну по центру, і текст справа.
          </div>
        `,
        hint: `У print() має бути три частини: текст "Гравець знайшов", змінна item, і текст "у скрині". Розділи їх комами.`,
        expected: `Гравець знайшов Меч у скрині`,
        tests: [
          { type: "stdoutEquals", name: "Речення склеєно правильно", value: "Гравець знайшов Меч у скрині", normalize: "soft" },
          { type: "codeRegex", name: "Створено змінну item", pattern: "item\\s*=\\s*['\"]Меч['\"]", checkRaw: true },
          { type: "codeRegex", name: "print має 3 частини", pattern: "print\\s*\\(\\s*['\"]Гравець\\s+знайшов['\"]\\s*,\\s*item\\s*,\\s*['\"]у\\s+скрині['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "♻️ Перезапис коробки (Update)",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Викидаємо старе, кладемо нове</h2>
          <p>Чому змінні називаються "змінними"? Бо вони можуть <b style="color: #ef4444;">змінюватися</b>! Якщо ти покладеш у коробку нове значення, старе просто назавжди зникне.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">hp = 100<br>hp = 50<br>print(hp)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">50</div>
        `,
        desc: `
          <div class="task-main">
            <p>Машина змінила свій колір під час заїзду в гараж. Спочатку вона була червоною, а потім стала синьою. Програма має вивести фінальний колір.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">color</code> і поклади в неї <code style="color: #0ea5e9;">"Червоний"</code>. На наступному рядку <b>перезапиши</b> цю ж змінну значенням <code style="color: #0ea5e9;">"Синій"</code>. Виведи змінну на екран.
          </div>
        `,
        hint: `У тебе має бути три рядки коду: створення, перезапис (так само через знак =), і функція виводу.`,
        expected: `Синій`,
        tests: [
          { type: "stdoutEquals", name: "Старе значення стерто", value: "Синій", normalize: "soft" },
          { type: "codeRegex", name: "Перезапис змінної", pattern: "color\\s*=\\s*['\"]Червоний['\"].*color\\s*=\\s*['\"]Синій['\"]", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "⏳ Плин часу (Print -> Update -> Print)",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Програма читає код згори донизу</h2>
          <p>Щоб побачити, як значення змінюється під час гри, нам треба роздрукувати його <b style="color: #10b981;">ДО</b> зміни і <b style="color: #ef4444;">ПІСЛЯ</b> зміни.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">level = 1<br>print(level)<br>level = 2<br>print(level)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">1<br>2</div>
        `,
        desc: `
          <div class="task-main">
            <p>Бали гравця змінилися з 0 до 10. Глядачі мають побачити обидва стани (на різних рядках).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">score = 0</code>. Виведи <code style="color: #0ea5e9;">score</code>. Перезапиши <code style="color: #0ea5e9;">score = 10</code>. Знову виведи <code style="color: #0ea5e9;">score</code>.
          </div>
        `,
        hint: `Чотири рядки коду. Спочатку = 0, потім print(score), потім = 10, і знову print(score).`,
        expected: `0\n10`,
        tests: [
          { type: "stdoutEquals", name: "Обидва стани виведено", value: "0\n10", normalize: "soft" },
          { type: "codeRegex", name: "Два принти змінної", pattern: "print\\s*\\(\\s*score\\s*\\).*print\\s*\\(\\s*score\\s*\\)", flags: "s" }
        ]
      },

      {
        title: "🪞 З коробки в коробку",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Клонування даних</h2>
          <p>Значення однієї змінної можна передати іншій змінній. Для цього ми просто пишемо ім'я другої коробки після знаку <code>=</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">a = "Яблуко"<br>b = a  <span style="color:gray;"># b бере копію того, що лежить в a</span><br>print(b)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Яблуко</div>
        `,
        desc: `
          <div class="task-main">
            <p>Другий гравець підключається до гри і автоматично копіює показники першого гравця.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">player1 = 100</code>. Створи змінну <code style="color: #0ea5e9;">player2</code> і скопіюй у неї значення з першого гравця (написавши <code style="color: #0ea5e9;">player2 = player1</code>). Виведи <code style="color: #0ea5e9;">player2</code>.
          </div>
        `,
        hint: `Не пиши player2 = 100. Напиши player2 = player1. Таким чином, друга змінна підгляне, що лежить у першій.`,
        expected: `100`,
        tests: [
          { type: "stdoutEquals", name: "Значення скопійовано", value: "100", normalize: "soft" },
          { type: "codeRegex", name: "Змінна дорівнює іншій змінній", pattern: "player2\\s*=\\s*player1" }
        ]
      },

      {
        title: "🅰️ Чутливість до регістру",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Великі букви мають значення!</h2>
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ВАЖЛИВО:</b> Для Python коробка з назвою <code style="color: #0ea5e9;">score</code> і коробка з назвою <code style="color: #0ea5e9;">Score</code> (з великої літери) — це <b style="color: #ef4444;">ДВІ АБСОЛЮТНО РІЗНІ КОРОБКИ</b>.
          </div>
          <p>Це називається чутливістю до регістру (case sensitivity). Будь дуже уважним, щоб не загубити свої дані через випадковий Caps Lock!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Доведи системі, що велика і маленька букви створюють різні об'єкти в пам'яті. У маленькому "apple" лежить 5, а у великому "Apple" — 10.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">apple = 5</code> (з малої). Створи <code style="color: #0ea5e9;">Apple = 10</code> (з великої). Виведи їх обох (спочатку малу, потім велику) через кому в одному <code style="color: #0ea5e9;">print()</code>.
          </div>
        `,
        hint: `Це дві різні змінні. У print напиши їх через кому: print(apple, Apple).`,
        expected: `5 10`,
        tests: [
          { type: "stdoutEquals", name: "Обидва значення виведено", value: "5 10", normalize: "soft" },
          { type: "codeRegex", name: "Використано обидві змінні", pattern: "print\\s*\\(.*apple.*,.*Apple.*\\)" }
        ]
      },

      {
        title: "🪄 Магія зміни типів",
        xp: 95,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Коробка-хамелеон</h2>
          <p>У деяких мовах програмування коробка для чисел ніколи не може приймати текст. Але Python <b style="color: #3b82f6;">динамічний</b>!</p>
          <p>Ти можеш покласти в змінну число, а через хвилину викинути його і покласти туди текст.</p>
          
          <p><b>Приклад:</b></p>
          <div class="code-box">data = 5<br>data = "Тепер я текст!"</div>
        `,
        desc: `
          <div class="task-main">
            <p>Змінна містила числовий код 404. Але потім система оновилася, і тепер там має лежати текстове повідомлення "Помилка".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">info = 404</code>. На наступному рядку перезапиши: <code style="color: #0ea5e9;">info = "Помилка"</code>. Виведи <code style="color: #0ea5e9;">info</code>.
          </div>
        `,
        hint: `Створюєш змінну з числом, потім береш ту ж саму змінну і кладеш в неї рядок тексту (через =), потім друкуєш.`,
        expected: `Помилка`,
        tests: [
          { type: "stdoutEquals", name: "Тип змінено успішно", value: "Помилка", normalize: "soft" },
          { type: "codeRegex", name: "Зміна типу", pattern: "info\\s*=\\s*404.*info\\s*=\\s*['\"]Помилка['\"]", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "📝 Вступ до коментарів (#)",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Нотатки для себе</h2>
          <p>Іноді в коді треба залишити підказку для себе або інших програмістів. Для цього існують <b style="color: #10b981;">коментарі</b>.</p>
          <p>Якщо рядок починається з символу <b style="color: #ef4444;"><code>#</code> (решітка/хеш)</b>, Python повністю його <b style="color: #3b82f6;">ігнорує</b>. Комп'ютер цього тексту не бачить, він тільки для людей.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><span style="color:gray;"># Це змінна для здоров'я героя</span><br>hp = 100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програміст залишив коментар перед створенням змінної, щоб усі розуміли, що означає число 1000.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> На першому рядку напиши коментар <code style="color: #0ea5e9;"># Стартовий капітал</code>. На наступному рядку створи <code style="color: #0ea5e9;">gold = 1000</code> і виведи <code style="color: #0ea5e9;">gold</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Коментарі ніяк не впливають на вивід програми в термінал.
          </div>
        `,
        hint: `Рядок з коментарем має починатися з символу #. Він не вплине на роботу програми.`,
        expected: `1000`,
        tests: [
          { type: "stdoutEquals", name: "Програма працює", value: "1000", normalize: "soft" },
          { type: "codeRegex", name: "Є коментар", pattern: "#\\s*Стартовий\\s+капітал", checkRaw: true }
        ]
      },

      {
        title: "🏷️ Коментарі в кінці рядка",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пояснення поруч із кодом</h2>
          <p>Коментар не обов'язково писати з нового рядка. Його можна поставити одразу після коду! Все, що написано <b style="color: #ef4444;">ПІСЛЯ</b> решітки до кінця рядка, буде проігноровано комп'ютером.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">speed = 5  <span style="color:gray;"># Швидкість бігу персонажа</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Розробник зекономив місце і написав пояснення прямо на тому ж рядку, де створюється енергія мага.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">mana = 50</code>, і в цьому ж рядку (через пробіл після числа) допиши коментар: <code style="color: #0ea5e9;"># Енергія мага</code>. Потім роздрукуй змінну.
          </div>
        `,
        hint: `Твій перший рядок має виглядати так: mana = 50 # Енергія мага`,
        expected: `50`,
        tests: [
          { type: "stdoutEquals", name: "Програма не зламалась", value: "50", normalize: "soft" },
          { type: "codeRegex", name: "Коментар у кінці рядка", pattern: "mana\\s*=\\s*50\\s*#\\s*Енергія\\s+мага", checkRaw: true }
        ]
      },

      {
        title: "🚫 Хакинг: Вимкнення коду",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Магія дебагінгу</h2>
          <p>Це улюблений трюк програмістів! Що робити, якщо частина коду видає помилку, але ти не хочеш її видаляти назавжди?</p>
          <p>Ти можеш просто її <b style="color: #3b82f6;">"закоментувати"</b>. Постав <code>#</code> на самому початку рядка з кодом, і Python перестане його виконувати (ніби він став просто текстом).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("1")<br><span style="color:gray;"># print("2")</span><br>print("3")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">1<br>3</div>
        `,
        desc: `
          <div class="task-main">
            <p>У коді є зайве повідомлення про помилку, яке лякає користувачів. Вимкни його за допомогою коментаря.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши три команди <code style="color: #0ea5e9;">print</code>: перша виводить <code style="color: #0ea5e9;">"Старт"</code>, друга <code style="color: #0ea5e9;">"Помилка!"</code>, третя <code style="color: #0ea5e9;">"Фініш"</code>.<br>
            Закоментуй другий рядок (постав перед ним <code style="color: #0ea5e9;">#</code>), щоб слово "Помилка!" комп'ютер проігнорував.
          </div>
        `,
        hint: `У тебе має бути 3 рядки з print(), але перед другим print() має стояти символ решітки #.`,
        expected: `Старт\nФініш`,
        tests: [
          { type: "stdoutEquals", name: "Помилку вимкнено", value: "Старт\nФініш", normalize: "soft" },
          { type: "codeRegex", name: "Код закоментовано", pattern: "#\\s*print\\s*\\(\\s*['\"]Помилка!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🕵️‍♂️ Знайти фальшивку",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вимикаємо зламані дані</h2>
          <p>Коментарі часто використовують, щоб швидко перемикати значення змінних під час тестування гри. Якщо код перезаписує правильну змінну неправильними даними, ми можемо тимчасово "вимкнути" цей перезапис.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Хакер додав у код рядок, який перезаписує правильний сейф-код (123) на хибний (999). Знайди його і знешкодь.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши код:<br>
            <code style="color: #0ea5e9;">code = 123</code><br>
            <code style="color: #0ea5e9;">code = 999</code><br>
            <code style="color: #0ea5e9;">print(code)</code><br>
            Закоментуй той рядок, який робить код <b>неправильним</b>, щоб вивелося число 123.
          </div>
        `,
        hint: `Другий рядок перезаписує code на неправильний (999). Постав решітку # перед code = 999.`,
        expected: `123`,
        tests: [
          { type: "stdoutEquals", name: "Правильний пароль", value: "123", normalize: "soft" },
          { type: "codeRegex", name: "Зламану змінну вимкнено", pattern: "#\\s*code\\s*=\\s*999", checkRaw: true }
        ]
      },

      {
        title: "🔗 Змінні та sep",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Налаштування друку</h2>
          <p>Змінні чудово працюють з параметром <code>sep</code>, який ми вчили раніше. Він просто вставляє свій символ між коробками.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">x = 5<br>y = 10<br>print(x, y, sep=":")</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">5:10</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система формує календарну дату (день і місяць), розділяючи їх косою рискою.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи дві змінні: <code style="color: #0ea5e9;">day = 15</code> та <code style="color: #0ea5e9;">month = 8</code>. Роздрукуй їх через кому, а в кінці <code style="color: #0ea5e9;">print()</code> додай параметр <code style="color: #0ea5e9;">sep="/"</code>.
          </div>
        `,
        hint: `print(day, month, sep="/")`,
        expected: `15/8`,
        tests: [
          { type: "stdoutEquals", name: "Формат дати правильний", value: "15/8", normalize: "soft" },
          { type: "codeRegex", name: "print використовує sep", pattern: "print\\s*\\([^)]*sep\\s*=\\s*['\"]\\/['\"][^)]*\\)", checkRaw: true }
        ]
      },

      {
        title: "🛑 Змінні та end",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Скасування переносу</h2>
          <p>Так само зі змінними працює і параметр <code>end</code>, який "приклеює" наступний <code>print()</code> до поточного.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Екран завантаження склеює текст із попередньої змінної з новими крапками в один рядок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">loading = "Завантаження"</code>. У першому <code style="color: #0ea5e9;">print(loading, end="")</code> виведи її без переносу рядка. На наступному рядку другим принтом виведи текст <code style="color: #0ea5e9;">"..."</code>.
          </div>
        `,
        hint: `Не забудь передати параметр end="" в першу команду виводу після змінної.`,
        expected: `Завантаження...`,
        tests: [
          { type: "stdoutEquals", name: "Текст склеєно", value: "Завантаження...", normalize: "soft" },
          { type: "codeRegex", name: "Використано end", pattern: "end\\s*=\\s*['\"]\\s*['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Картка здоров'я",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Змінна + Текст</h2>
          <p>Згадай, як комбінувати текст у лапках і змінні за допомогою коми.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи статус героя: <code>Здоров'я: 100 HP</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">hp = 100</code>. ОДНИМ <code style="color: #0ea5e9;">print()</code> виведи фінальний рядок (де 100 — це твоя змінна, а не просто текст).
          </div>
        `,
        hint: `Тобі треба передати 3 аргументи в print: текст "Здоров'я:", змінну hp, текст "HP"`,
        expected: `Здоров'я: 100 HP`,
        tests: [
          { type: "stdoutEquals", name: "Формат правильний", value: "Здоров'я: 100 HP", normalize: "soft" },
          { type: "codeRegex", name: "Використано змінні і коми", pattern: "print\\s*\\(.*hp.*,.*['\"]HP['\"]\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Зміна зброї",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Перезапис та потік</h2>
          <p>Згадай, що змінні можуть змінюватись у часі. Що було останнім — те й правда!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Продемонструй зміну зброї у гравця з Лука на Меч.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Створи <code style="color: #0ea5e9;">weapon = "Лук"</code>.<br>
            2. Виведи <code style="color: #0ea5e9;">weapon</code>.<br>
            3. Перезапиши: <code style="color: #0ea5e9;">weapon = "Меч"</code>.<br>
            4. Виведи <code style="color: #0ea5e9;">weapon</code> ще раз.
          </div>
        `,
        hint: `Тут має бути 4 окремих рядки коду. Створення -> Друк -> Перезапис -> Друк.`,
        expected: `Лук\nМеч`,
        tests: [
          { type: "stdoutEquals", name: "Зміна зброї відстежена", value: "Лук\nМеч", normalize: "soft" },
          { type: "codeRegex", name: "Перезапис", pattern: "weapon\\s*=\\s*['\"]Лук['\"].*weapon\\s*=\\s*['\"]Меч['\"]", flags: "s", checkRaw: true },
          { type: "codeRegex", name: "Два принти", pattern: "print\\s*\\(.*print\\s*\\(", flags: "s" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Сховати баг",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Коментарі</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Колега написав баг, через який бали перезаписуються помилкою. Вимкни поганий рядок!</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Скопіюй цей код:<br>
            <code style="color: #0ea5e9;">score = 50</code><br>
            <code style="color: #0ea5e9;">score = "Помилка сервера!"</code><br>
            <code style="color: #0ea5e9;">print("Бали:", score)</code><br><br>
            Використай <b>решітку (#)</b>, щоб "вимкнути" середній рядок у коді, який псує результат.
          </div>
        `,
        hint: `Постав # перед рядком, де score перезаписується текстом.`,
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
        title: "🐉 БОС (Junior): Профіль Героя",
        xp: 500,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Архітектор даних</h2>
          <p>Створи змінні для гри, додай до них професійні коментарі та виведи фінальний звіт про персонажа!</p>
        `,
        desc: `
          <div class="task-main">
            <p>База даних генерує профіль гравця на основі збережених змінних: <code>Гравець: Лицар [ 10 ]</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Створи змінну <code style="color: #0ea5e9;">hero</code> зі значенням <code style="color: #0ea5e9;">"Лицар"</code>. В кінці цього ж рядка додай коментар <code style="color: #0ea5e9;"># Клас</code>.<br>
            2. Створи змінну <code style="color: #0ea5e9;">LvL</code> зі значенням <code style="color: #0ea5e9;">10</code>. В кінці цього ж рядка додай коментар <code style="color: #0ea5e9;"># Рівень</code>.<br>
            3. <b>ОДНИМ принтом</b> виведи фінальний текст <code>Гравець: Лицар [ 10 ]</code>, де слова "Лицар" і "10" будуть братися з твоїх змінних.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Для фінального виводу скористайся комами, щоб поєднати текст і змінні.
          </div>
        `,
        hint: `Для виводу передай 5 аргументів через кому: текст "Гравець:", змінна hero, текст "[", змінна LvL, і текст "]". Наприклад: print("Гравець:", hero, "[", LvL, "]") — Python сам поставить пробіли.`,
        expected: `Гравець: Лицар [ 10 ]`,
        tests: [
          { type: "stdoutEquals", name: "Профіль зібрано", value: "Гравець: Лицар [ 10 ]", normalize: "soft" },
          { type: "codeRegex", name: "hero створено з коментарем", pattern: "hero\\s*=\\s*['\"]Лицар['\"]\\s*#\\s*Клас", checkRaw: true },
          { type: "codeRegex", name: "LvL створено з коментарем", pattern: "LvL\\s*=\\s*10\\s*#\\s*Рівень", checkRaw: true },
          { type: "codeRegex", name: "print використовує hero і LvL", pattern: "print\\s*\\([^)]*hero[^)]*LvL[^)]*\\)" }
        ]
      },
   
// ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Математика та Правила імен)
      // ==========================================

      {
        title: "🧮 Математика змінних",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Додавання коробок</h2>
          <p>Ми можемо використовувати змінні в математичних прикладах так само, як звичайні числа. Python сам дістане їхні значення і все порахує.</p>
          <p>Більше того, результат ми можемо покласти в <b>нову змінну</b>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">apples = 5<br>pears = 3<br>total = apples + pears<br>print(total)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">8</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система інвентарю має розрахувати загальну місткість двох скринь, з'єднавши їхні показники в один новий.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">a = 10</code> та <code style="color: #0ea5e9;">b = 20</code>. Створи третю змінну <code style="color: #0ea5e9;">result</code>, яка буде дорівнювати сумі <code style="color: #0ea5e9;">a + b</code>. Виведи змінну <code style="color: #0ea5e9;">result</code> на екран.
          </div>
        `,
        hint: `Тобі потрібен рядок result = a + b. Після цього просто роздрукуй змінну result.`,
        expected: `30`,
        tests: [
          { type: "stdoutEquals", name: "Сума правильна", value: "30", normalize: "soft" },
          { type: "codeRegex", name: "Змінна result", pattern: "result\\s*=\\s*a\\s*\\+\\s*b" },
          { type: "codeRegex", name: "Вивід result", pattern: "print\\s*\\(\\s*result\\s*\\)" }
        ]
      },

      {
        title: "⚔️ Складні формули",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ігрова математика</h2>
          <p>За допомогою змінних пишуться формули для розрахунку урону, броні та досвіду. Python виконає всі дії за правилами математики.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">base_dmg = 50<br>armor = 15<br>real_dmg = base_dmg - armor<br>print(real_dmg)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">35</div>
        `,
        desc: `
          <div class="task-main">
            <p>Торговець продає тобі зілля. Програма має автоматично розрахувати і вивести твою решту після покупки.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінні <code style="color: #0ea5e9;">gold = 100</code> та <code style="color: #0ea5e9;">price = 35</code>. Створи нову змінну <code style="color: #0ea5e9;">change</code> (решта), яка дорівнює результату віднімання: <code style="color: #0ea5e9;">gold - price</code>. Виведи її на екран.
          </div>
        `,
        hint: `Спочатку створи змінні gold і price. Потім створи change і присвой їй результат віднімання двох попередніх змінних.`,
        expected: `65`,
        tests: [
          { type: "stdoutEquals", name: "Решту пораховано", value: "65", normalize: "soft" },
          { type: "codeRegex", name: "Використано віднімання змінних", pattern: "change\\s*=\\s*gold\\s*-\\s*price" },
          { type: "codeRegex", name: "Вивід change", pattern: "print\\s*\\(\\s*change\\s*\\)" }
        ]
      },

      {
        title: "🔗 Склеювання тексту (+)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Конкатенація (Склеювання)</h2>
          <p>Що буде, якщо використати знак <b style="color: #ef4444;"><code>+</code></b> не з числами, а з текстом? Python просто <b>склеїть</b> ці рядки в один!</p>
          <p>Цей процес має складну наукову назву — <b style="color: #3b82f6;">конкатенація</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">part1 = "Spider"<br>part2 = "-Man"<br>hero = part1 + part2<br>print(hero)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Spider-Man</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гра генерує клас персонажа, комбінуючи два різних слова в одне суцільне найменування.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">word1 = "Супер"</code> та <code style="color: #0ea5e9;">word2 = "герой"</code>. Створи третю змінну <code style="color: #0ea5e9;">result</code>, яка буде сумою <code style="color: #0ea5e9;">word1 + word2</code>. Виведи <code style="color: #0ea5e9;">result</code>.
          </div>
        `,
        hint: `Використай плюс (+), щоб зліпити word1 та word2 докупи і зберегти в result.`,
        expected: `Супергерой`,
        tests: [
          { type: "stdoutEquals", name: "Слова склеєні", value: "Супергерой", normalize: "soft" },
          { type: "codeRegex", name: "Є склеювання word1 + word2", pattern: "result\\s*=\\s*word1\\s*\\+\\s*word2" },
          { type: "codeRegex", name: "Вивід result", pattern: "print\\s*\\(\\s*result\\s*\\)" }
        ]
      },

      {
        title: "🚧 Проблема пробілів",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Плюс — це не кома!</h2>
          <p>Коли ми передавали аргументи в <code>print()</code> через <b>кому</b>, Python сам ставив між ними пробіли. Але коли ми склеюємо текст <b>плюсом</b>, Python робить це <b style="color: #ef4444;">впритул</b>!</p>
          
          <div class="theory-alert theory-alert-warn">
            💡 <b>Помилка новачків:</b><br>
            <code style="color: #0ea5e9;">name = "Anna"</code><br>
            <code style="color: #0ea5e9;">print("Привіт" + name)</code> <span style="color:gray;"># Виведе ПривітAnna</span>
          </div>
          
          <p><b style="color: #10b981;">Рішення:</b> Додай пробіл вручну прямо всередині лапок з текстом!</p>
          <div class="code-box">print("Привіт, " + name)  <span style="color:gray;"># Виведе Привіт, Anna</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Серверний лог формує запис про вхід гравця. Рядок збирається через конкатенацію (+), тому слова можуть "злипнутися", якщо не додати пробіли.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">player = "Max"</code>. Використовуючи виключно <b>плюс</b> (а не кому!), склей текст зі змінною, щоб вийшло <code>Гравець Max увійшов</code>. Не забудь додати пробіли всередині лапок!
          </div>

          <div class="task-note">
            <b>Важливо:</b> За використання коми в цьому завданні тест не буде зарахований. Тільки конкатенація!
          </div>
        `,
        hint: `Твій принт має виглядати так: print("Гравець " + player + " увійшов"). Зверни увагу на пробіли всередині лапок!`,
        expected: `Гравець Max увійшов`,
        tests: [
          { type: "stdoutEquals", name: "Текст із пробілами", value: "Гравець Max увійшов", normalize: "strict" },
          { type: "codeRegex", name: "Є конкатенація з player", pattern: "print\\s*\\(.*\\+\\s*player\\s*\\+.*\\)" },
          { type: "codeRegex", name: "Кома не використовувалась", pattern: "print\\s*\\(.*,.*\\)", flags: "g", max: 0 }
        ]
      },

      {
        title: "🚨 Правила імен (Помилки)",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Як не можна називати коробки</h2>
          <p>У Python є суворі правила щодо імен змінних. Якщо їх порушити, програма видасть <code>SyntaxError</code> (Синтаксичну помилку) і взагалі не запуститься.</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ЗАБОРОНЕНО:</b><br>
            ❌ Починати з цифри: <code style="color: #0ea5e9;">1player = "Max"</code><br>
            ❌ Робити пробіли: <code style="color: #0ea5e9;">my score = 100</code><br>
            ❌ Використовувати спецсимволи (!, @, -): <code style="color: #0ea5e9;">hero-name = "Бетмен"</code>
          </div>
          
          <p>Цифри використовувати можна, але тільки <b>НЕ на початку</b> імені (наприклад: <code>player1</code> — це ОК).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Новачок написав код, але програма крашнулася через неправильне ім'я змінної (він почав його з цифри). Допоможи йому виправити помилку.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Ось зламаний код:<br>
            <code style="color: #0ea5e9;">1_level = 5</code><br>
            <code style="color: #0ea5e9;">print(1_level)</code><br>
            Виправ ім'я змінної так, щоб цифра перемістилася в самий кінець (зроби <code style="color: #0ea5e9;">level_1</code>).
          </div>
        `,
        hint: `Просто перейменуй змінну в обох рядках (і там де створюєш, і там де друкуєш), поставивши одиницю в кінець.`,
        expected: `5`,
        tests: [
          { type: "stdoutEquals", name: "Код працює", value: "5", normalize: "soft" },
          { type: "codeRegex", name: "Правильне ім'я", pattern: "\\blevel_1\\b" },
          { type: "codeRegex", name: "Помилку виправлено", pattern: "\\b1_level\\b", flags: "g", max: 0 }
        ]
      },

      {
        title: "🐍 Зміїний регістр (snake_case)",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Стиль справжніх програмістів</h2>
          <p>Ми з'ясували, що пробіли в іменах заборонені. Але як назвати змінну "максимальне здоров'я гравця", щоб це було легко читати?</p>
          <p>У Python прийнято використовувати <b style="color: #10b981;">snake_case (зміїний регістр)</b>. Замість пробілів ми ставимо <b>нижнє підкреслення <code>_</code></b>. Усі букви при цьому пишуться маленькими.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">max_health = 100<br>player_first_name = "Alex"</div>
        `,
        desc: `
          <div class="task-main">
            <p>Запиши свій рекорд у змінну, дотримуючись професійних стандартів найменування (зміїного регістру).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну для свого найкращого результату. Назви її <code style="color: #0ea5e9;">best_score</code>. Дай їй значення <code style="color: #0ea5e9;">999</code> і виведи на екран.
          </div>
        `,
        hint: `Не забудь про нижнє підкреслення між словами best та score.`,
        expected: `999`,
        tests: [
          { type: "stdoutEquals", name: "Виведено результат", value: "999", normalize: "soft" },
          { type: "codeRegex", name: "Використано snake_case", pattern: "best_score\\s*=\\s*999" },
          { type: "codeRegex", name: "Вивід best_score", pattern: "print\\s*\\(\\s*best_score\\s*\\)" }
        ]
      },

      {
        title: "📈 Еволюція змінної (x = x + 1)",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Зміна на основі минулого</h2>
          <p>Як в іграх монети збільшуються на одну, коли ти її підбираєш? Це робиться за допомогою магічної конструкції, яка ламає мозок математикам!</p>
          
          <div class="code-box">coins = 10<br><b style="color: #ef4444;">coins = coins + 1</b></div>
          <p>Як це розуміє Python?</p>
          <ul style="padding-left: 20px;">
            <li>Спочатку він дивиться на <b>ПРАВУ</b> частину від знака дорівнює: "Ага, беру поточні монети (10) і додаю 1. Буде 11".</li>
            <li>Потім дивиться на <b>ЛІВУ</b> частину: "Тепер кладу ці 11 назад у ту ж саму коробку <code>coins</code>. Старе значення стирається".</li>
          </ul>
        `,
        desc: `
          <div class="task-main">
            <p>Герой перейшов на новий рівень. Система має підвищити його поточний рівень рівно на 1.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">level = 1</code>. На наступному рядку збільш його на один, використавши конструкцію <code style="color: #0ea5e9;">level = level + 1</code>. Виведи <code style="color: #0ea5e9;">level</code> на екран.
          </div>
        `,
        hint: `Рядок оновлення має виглядати точно так: level = level + 1`,
        expected: `2`,
        tests: [
          { type: "stdoutEquals", name: "Рівень підвищено", value: "2", normalize: "soft" },
          { type: "codeRegex", name: "Оновлення через саму себе", pattern: "level\\s*=\\s*level\\s*\\+\\s*1" },
          { type: "codeRegex", name: "Вивід level", pattern: "print\\s*\\(\\s*level\\s*\\)" }
        ]
      },

      {
        title: "💔 Втрата здоров'я",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Віднімання від себе</h2>
          <p>Точно так само можна і зменшувати змінні, базуючись на їхньому ж минулому значенні. Наприклад, якщо герой отримав урон у бою.</p>
          <div class="code-box">hp = 100<br>hp = hp - 15  <span style="color:gray;"># Втратив 15 здоров'я</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Герой отримав 20 одиниць урону від пастки. Система має оновити і вивести його залишок здоров'я.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">hp = 100</code>. Зроби перезапис змінної: <code style="color: #0ea5e9;">hp = hp - 20</code>. Виведи поточне здоров'я.
          </div>
        `,
        hint: `Не створюй нову змінну для результату. Онови стару: hp = hp - 20.`,
        expected: `80`,
        tests: [
          { type: "stdoutEquals", name: "Здоров'я зменшилось", value: "80", normalize: "soft" },
          { type: "codeRegex", name: "Оновлення зі знаком мінус", pattern: "hp\\s*=\\s*hp\\s*-\\s*20" },
          { type: "codeRegex", name: "Вивід hp", pattern: "print\\s*\\(\\s*hp\\s*\\)" }
        ]
      },

      {
        title: "✨ Магічне скорочення (+=)",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Код професіоналів</h2>
          <p>Писати <code>score = score + 5</code> занадто довго. Програмісти дуже цінують свій час, тому вони придумали короткий запис: <b style="color: #3b82f6;"><code>+=</code></b>.</p>
          <p>Оператор <code>+=</code> означає "Додай це число до того, що ВЖЕ лежить у коробці".</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">xp = 50<br><b style="color: #10b981;">xp += 10</b>  <span style="color:gray;"># Це абсолютно те саме, що xp = xp + 10</span><br>print(xp)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">60</div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець знайшов 5 бонусних монет. Система має додати їх до його рахунку найкоротшим способом.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">score = 10</code>. Збільш його на 5, використовуючи крутий оператор <code style="color: #0ea5e9;">+=</code>. Виведи <code style="color: #0ea5e9;">score</code>.
          </div>
        `,
        hint: `Напиши score += 5`,
        expected: `15`,
        tests: [
          { type: "stdoutEquals", name: "Бали додано", value: "15", normalize: "soft" },
          { type: "codeRegex", name: "Використано +=", pattern: "score\\s*\\+=\\s*5" },
          { type: "codeRegex", name: "Немає довгого запису", pattern: "score\\s*=\\s*score", flags: "g", max: 0 }
        ]
      },

      {
        title: "🩸 Скорочений урон (-=)",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Так само для мінуса</h2>
          <p>Логічно, що якщо є <code>+=</code>, то існує і <b style="color: #ef4444;"><code>-=</code></b>. Він віднімає праве значення від поточної змінної і перезаписує її.</p>
          <div class="code-box">hp = 100<br>hp -= 25  <span style="color:gray;"># Швидка втрата 25 життів</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Монстр пробив щит героя на 15 одиниць міцності.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Задай <code style="color: #0ea5e9;">shield = 50</code>. Відніми 15 за допомогою оператора <code style="color: #0ea5e9;">-=</code>. Виведи <code style="color: #0ea5e9;">shield</code>.
          </div>
        `,
        hint: `Використай shield -= 15`,
        expected: `35`,
        tests: [
          { type: "stdoutEquals", name: "Щит пробито", value: "35", normalize: "soft" },
          { type: "codeRegex", name: "Використано -=", pattern: "shield\\s*-=?=\\s*15" }
        ]
      },

      {
        title: "✖️ Множник очок (*=)",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Подвійні бали</h2>
          <p>Цей трюк працює для всіх математичних знаків! Щоб помножити значення само на себе, використовуй <b style="color: #f59e0b;"><code>*=</code></b>.</p>
          <div class="code-box">score = 10<br>score *= 2  <span style="color:gray;"># Бали подвоюються!</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Гравець підняв магічний бустер x3! Усі його поточні гроші потроюються.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> У гравця є <code style="color: #0ea5e9;">money = 20</code>. Збільш гроші в 3 рази за допомогою <code style="color: #0ea5e9;">*=</code> і виведи результат.
          </div>
        `,
        hint: `Напиши money *= 3`,
        expected: `60`,
        tests: [
          { type: "stdoutEquals", name: "Гроші помножено", value: "60", normalize: "soft" },
          { type: "codeRegex", name: "Використано *=", pattern: "money\\s*\\*=\\s*3" }
        ]
      },

      {
        title: "📝 += для тексту",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Дописування тексту</h2>
          <p>Оператор <code>+=</code> працює не тільки з числами, а й з текстом! Він просто "доклеює" нові слова в кінець старого рядка.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">message = "Hello"<br>message += " World!"<br>print(message)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Hello World!</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система дописує друге слово до вже збереженого в пам'яті тексту.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">text = "Python"</code>. На наступному рядку допиши до нього слово (обов'язково з пробілом на початку!): <code style="color: #0ea5e9;">text += " супер"</code>. Виведи <code style="color: #0ea5e9;">text</code>.
          </div>
        `,
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
        title: "🎯 Підсумкова 1: Інвентар",
        xp: 300,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Змінні та Математика</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має скласти всі зібрані фрукти і вивести загальну суму.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            1. Створи змінну <code style="color: #0ea5e9;">apples = 5</code>.<br>
            2. Створи <code style="color: #0ea5e9;">pears = 3</code>.<br>
            3. Створи третю змінну <code style="color: #0ea5e9;">total_fruits</code>, яка буде сумою перших двох.<br>
            4. Роздрукуй <code style="color: #0ea5e9;">total_fruits</code>.
          </div>
        `,
        hint: `Створи третю змінну через додавання: total_fruits = apples + pears`,
        expected: `8`,
        tests: [
          { type: "stdoutEquals", name: "Підрахунок правильний", value: "8", normalize: "soft" },
          { type: "codeRegex", name: "Використано snake_case та додавання", pattern: "total_fruits\\s*=\\s*apples\\s*\\+\\s*pears" },
          { type: "codeRegex", name: "Вивід total_fruits", pattern: "print\\s*\\(\\s*total_fruits\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Лікування",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Оновлення змінної</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Зімітуй відновлення здоров'я після того, як персонаж випив лікувальне зілля.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Герой мав <code style="color: #0ea5e9;">health = 40</code>. Онови змінну здоров'я за допомогою короткого оператора <code style="color: #0ea5e9;">+=</code>, додавши 50. Виведи нове здоров'я на екран.
          </div>
        `,
        hint: `Створи health = 40, потім health += 50, потім print(health).`,
        expected: `90`,
        tests: [
          { type: "stdoutEquals", name: "Вилікувано успішно", value: "90", normalize: "soft" },
          { type: "codeRegex", name: "Використано +=", pattern: "health\\s*\\+=\\s*50" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Склеювання імені",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Конкатенація рядків</h2>
        `,
        desc: `
          <div class="task-main">
            <p>База даних має об'єднати ім'я та прізвище користувача в єдиний профіль.</p>
          </div>

          <div class="task-condition">
            <b>Умови:</b><br>
            Створи: <code style="color: #0ea5e9;">first = "Harry"</code> та <code style="color: #0ea5e9;">last = "Potter"</code>.<br>
            Створи змінну <code style="color: #0ea5e9;">full_name</code>. Зліпи ім'я та прізвище за допомогою плюса (<code style="color: #0ea5e9;">+</code>), але <b>обов'язково встав пробіл</b> (<code>" "</code>) між ними! Виведи <code style="color: #0ea5e9;">full_name</code>.
          </div>
        `,
        hint: `Тобі треба додати ТРИ частини: first + " " + last.`,
        expected: `Harry Potter`,
        tests: [
          { type: "stdoutEquals", name: "Ім'я з пробілом", value: "Harry Potter", normalize: "strict" },
          { type: "codeRegex", name: "Конкатенація з пробілом", pattern: "full_name\\s*=\\s*first\\s*\\+\\s*['\"]\\s+['\"]\\s*\\+\\s*last", checkRaw: true },
          { type: "codeRegex", name: "Вивід full_name", pattern: "print\\s*\\(\\s*full_name\\s*\\)" }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🐉 БОС (Middle): RPG Магазин",
        xp: 600,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит рівня Middle</h2>
          <p>Об'єднай усі свої знання про змінні, віднімання грошей та f-рядки, щоб зробити логіку магазину!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Після покупки нового меча система магазину має зняти золото з балансу гравця і вивести фінальний звіт: <code>Покупка успішна! Залишок: 50 золота</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Задай золото гравця: <code style="color: #0ea5e9;">gold = 200</code>.<br>
            2. Задай ціну меча: <code style="color: #0ea5e9;">sword_price = 150</code>.<br>
            3. Зніми гроші з гравця! Використай оператор <code style="color: #0ea5e9;">-=</code>, щоб відняти <code style="color: #0ea5e9;">sword_price</code> від <code style="color: #0ea5e9;">gold</code>.<br>
            4. За допомогою <b>f-рядка</b> виведи фінальний звіт, передавши туди оновлене значення твоєї змінної <code style="color: #0ea5e9;">gold</code>.
          </div>
        `,
        hint: `Спочатку створи дві змінні. Потім зроби віднімання: gold -= sword_price. Останній рядок - це print(f"Покупка успішна! Залишок: {gold} золота").`,
        expected: `Покупка успішна! Залишок: 50 золота`,
        tests: [
          { type: "stdoutEquals", name: "Логіка магазину працює", value: "Покупка успішна! Залишок: 50 золота", normalize: "soft" },
          { type: "codeRegex", name: "Віднімання через -=", pattern: "gold\\s*-=?=\\s*sword_price" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Вивід змінної {gold}", pattern: "\\{\\s*gold\\s*\\}", checkRaw: true }
        ]
      },

// ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Архітектура та Пам'ять)
      // ==========================================

      {
        title: "📦 Множинне присвоєння",
        xp: 250,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Все в один рядок</h2>
          <p>Професіонали не люблять розтягувати код на багато рядків, якщо змінні пов'язані між собою логічно (наприклад, координати X та Y).</p>
          <p>У Python можна створити кілька змінних одночасно, просто перерахувавши їхні імена та значення через <b style="color: #3b82f6;">кому</b>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">name, age = "Alex", 20<br>print(name, age)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Alex 20</div>
        `,
        desc: `
          <div class="task-main">
            <p>Движок гри має встановити стартові координати гравця на карті (X та Y). Зроби це максимально компактно.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> В <b>ОДНОМУ</b> рядку створи змінні <code style="color: #0ea5e9;">x</code> та <code style="color: #0ea5e9;">y</code>, і надай їм значення <code style="color: #0ea5e9;">10</code> та <code style="color: #0ea5e9;">50</code> відповідно. На другому рядку роздрукуй їх через кому.
          </div>
        `,
        hint: `Твій перший рядок має виглядати так: x, y = 10, 50`,
        expected: `10 50`,
        tests: [
          { type: "stdoutEquals", name: "Координати виведено", value: "10 50", normalize: "soft" },
          { type: "codeRegex", name: "Множинне присвоєння", pattern: "x\\s*,\\s*y\\s*=\\s*10\\s*,\\s*50" },
          { type: "codeRegex", name: "Вивід x та y", pattern: "print\\s*\\(\\s*x\\s*,\\s*y\\s*\\)" }
        ]
      },

      {
        title: "⛓️ Ланцюгове присвоєння",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Масове скидання</h2>
          <p>Що, якщо нам треба створити одразу 5 змінних, і всі вони мають дорівнювати нулю? Замість того, щоб писати їх через кому, ми можемо створити <b style="color: #10b981;">ланцюжок із дорівнює</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">a = b = c = 100<br>print(a, b, c)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">100 100 100</div>
        `,
        desc: `
          <div class="task-main">
            <p>Почався новий турнір. Бали трьох гравців потрібно одночасно скинути до нуля.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використовуючи ланцюгове присвоєння, задай змінним <code style="color: #0ea5e9;">p1</code>, <code style="color: #0ea5e9;">p2</code> та <code style="color: #0ea5e9;">p3</code> значення <code style="color: #0ea5e9;">0</code> в одному рядку. На наступному рядку виведи їх усі через кому.
          </div>
        `,
        hint: `p1 = p2 = p3 = 0`,
        expected: `0 0 0`,
        tests: [
          { type: "stdoutEquals", name: "Усі нулі", value: "0 0 0", normalize: "soft" },
          { type: "codeRegex", name: "Ланцюгове присвоєння", pattern: "p1\\s*=\\s*p2\\s*=\\s*p3\\s*=\\s*0" }
        ]
      },

      {
        title: "🔀 Магічний обмін (Swapping)",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Трюк без третьої коробки</h2>
          <p>В інших мовах програмування, щоб поміняти вміст двох змінних місцями, треба створювати третю "тимчасову" змінну (як запасну склянку, щоб перелити воду). Але Python робить це магічно в один рядок!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">a = 1<br>b = 2<br><b style="color: #3b82f6;">a, b = b, a</b>  <span style="color:gray;"># Магія обміну!</span><br>print(a, b)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">2 1</div>
        `,
        desc: `
          <div class="task-main">
            <p>Герой тримає в лівій руці Щит, а в правій Меч. Він хоче миттєво поміняти їх місцями.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінні <code style="color: #0ea5e9;">left = "Щит"</code> та <code style="color: #0ea5e9;">right = "Меч"</code> (на окремих рядках).<br>
            На третьому рядку здійсни магічний обмін їхніми значеннями. Виведи <code style="color: #0ea5e9;">left</code> та <code style="color: #0ea5e9;">right</code>.
          </div>
        `,
        hint: `Для обміну напиши: left, right = right, left`,
        expected: `Меч Щит`,
        tests: [
          { type: "stdoutEquals", name: "Зброю змінено", value: "Меч Щит", normalize: "soft" },
          { type: "codeRegex", name: "Магічний обмін", pattern: "left\\s*,\\s*right\\s*=\\s*right\\s*,\\s*left" }
        ]
      },

      {
        title: "🗿 Константи",
        xp: 290,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Коробки, які не можна чіпати</h2>
          <p>Іноді в програмі є дані, які ніколи не повинні змінюватися (наприклад, максимальна кількість гравців на сервері або число Пі). Такі змінні називають <b style="color: #f59e0b;">константами</b>.</p>
          <p>У Python немає технічної заборони на їх зміну, але є <b>залізне правило програмістів</b>: імена констант завжди пишуться <b style="color: #ef4444;">ВЕЛИКИМИ ЛІТЕРАМИ</b>. Якщо ти бачиш таку змінну, перезаписувати її не можна!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><span style="color:gray;"># Це константа, не змінюй її!</span><br>MAX_SPEED = 300</div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти розробляєш конфігурацію сервера. Тобі потрібно задати ліміт підключень, який інші розробники не повинні випадково змінити.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи константу для максимальної кількості гравців. Назви її <code style="color: #0ea5e9;">MAX_PLAYERS</code> і задай їй значення <code style="color: #0ea5e9;">64</code>. Виведи її на екран.
          </div>
        `,
        hint: `Ім'я має бути ВЕЛИКИМИ літерами. MAX_PLAYERS = 64`,
        expected: `64`,
        tests: [
          { type: "stdoutEquals", name: "Вивід константи", value: "64", normalize: "soft" },
          { type: "codeRegex", name: "Створено константу (ALL CAPS)", pattern: "MAX_PLAYERS\\s*=\\s*64" }
        ]
      },

      {
        title: "🏷️ Анотації типів (Type Hints)",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Пояснення для розумних</h2>
          <p>Оскільки в змінну Python можна покласти що завгодно, у великому коді іноді важко згадати, що саме лежить у коробці <code>data</code> (число чи текст?).</p>
          <p>Senior-розробники використовують <b style="color: #10b981;">анотації типів</b>. Вони ставлять двокрапку після імені змінної і пишуть очікуваний тип (<code>int</code>, <code>str</code>, <code>float</code>). Це не впливає на роботу коду, але допомагає програмісту!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">health: int = 100<br>name: str = "Max"</div>
        `,
        desc: `
          <div class="task-main">
            <p>Професійний код вимагає чіткості. Створи змінну з явною вказівкою, що вона має зберігати лише текст (string).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи змінну <code style="color: #0ea5e9;">role</code>, вкажи для неї тип <code style="color: #0ea5e9;">str</code> і надай їй значення <code style="color: #0ea5e9;">"Адмін"</code>. Виведи її.
          </div>
        `,
        hint: `role: str = "Адмін"`,
        expected: `Адмін`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Адмін", normalize: "soft" },
          { type: "codeRegex", name: "Використано анотацію типу", pattern: "role\\s*:\\s*str\\s*=\\s*['\"]Адмін['\"]" }
        ]
      },

      {
        title: "🧲 Адреса в пам'яті (id)",
        xp: 310,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">За лаштунками матриці</h2>
          <p>Насправді змінні не зберігають самі дані. Змінна — це просто "бірка" (посилання), яка вказує на комірку в оперативній пам'яті комп'ютера, де лежить число.</p>
          <p>Щоб дізнатися унікальний номер цієї комірки пам'яті, існує функція <b style="color: #3b82f6;"><code>id()</code></b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">x = 5<br>print(id(x))  <span style="color:gray;"># Виведе щось типу 140734260388776</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Досліди, як працює пам'ять. Якщо дві змінні вказують на одне й те саме число, чи будуть у них однакові адреси пам'яті?</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">a = 10</code>. Створи <code style="color: #0ea5e9;">b = a</code>.<br>
            Виведи результат порівняння їхніх адрес у пам'яті: <code style="color: #0ea5e9;">id(a) == id(b)</code>. Ти побачиш True, бо вони дивляться на один і той самий об'єкт!
          </div>

          <div class="task-note">
            <b>Важливо:</b> Ми друкуємо саме порівняння адрес, а не самі адреси (бо вони завжди різні на різних комп'ютерах).
          </div>
        `,
        hint: `print(id(a) == id(b))`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Адреси збігаються", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано функцію id()", pattern: "print\\s*\\(\\s*id\\s*\\(\\s*a\\s*\\)\\s*==\\s*id\\s*\\(\\s*b\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "🗑️ Видалення з пам'яті (del)",
        xp: 320,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Замітаємо сліди</h2>
          <p>Іноді змінна більше не потрібна (наприклад, вона займає багато оперативної пам'яті, або це тимчасовий пароль, який треба негайно знищити з міркувань безпеки).</p>
          <p>Для повного видалення змінної існує жорстка команда <b style="color: #ef4444;"><code>del</code></b> (від <i>delete</i>).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">secret = "1234"<br><b style="color: #ef4444;">del</b> secret<br>print(secret)  <span style="color:gray;"># Викличе помилку NameError: name 'secret' is not defined</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Ти згенерував тимчасовий токен доступу. Після його використання змінну потрібно знищити, щоб хакери не знайшли її в пам'яті.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">token = "x9z8"</code>. На наступному рядку знищ цю змінну за допомогою команди <code style="color: #0ea5e9;">del</code>. Потім виведи текст <code style="color: #0ea5e9;">"Знищено"</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> НЕ намагайся друкувати змінну <code>token</code> після видалення, інакше програма крашнеться! Друкуй просто текст "Знищено".
          </div>
        `,
        hint: `del token`,
        expected: `Знищено`,
        tests: [
          { type: "stdoutEquals", name: "Програма працює", value: "Знищено", normalize: "soft" },
          { type: "codeRegex", name: "Команда del", pattern: "del\\s+token" },
          { type: "codeRegex", name: "Не друкуємо віддалену змінну", pattern: "print\\s*\\(\\s*token\\s*\\)", flags: "g", max: 0 }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Ротація змінних",
        xp: 350,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Вищий пілотаж обміну</h2>
          <p>Магічний обмін працює не лише для двох змінних, а й для трьох і більше одночасно!</p>
        `,
        desc: `
          <div class="task-main">
            <p>У тебе є три слоти інвентарю. Тобі треба зсунути їхні предмети по колу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. В один рядок створи: <code style="color: #0ea5e9;">a, b, c = 1, 2, 3</code>.<br>
            2. В один рядок зроби ротацію: <code style="color: #0ea5e9;">a</code> має отримати значення <code style="color: #0ea5e9;">c</code>, <code style="color: #0ea5e9;">b</code> має отримати значення <code style="color: #0ea5e9;">a</code>, а <code style="color: #0ea5e9;">c</code> має отримати значення <code style="color: #0ea5e9;">b</code>.<br>
            3. Роздрукуй їх через кому.
          </div>
        `,
        hint: `Для ротації напиши: a, b, c = c, a, b`,
        expected: `3 1 2`,
        tests: [
          { type: "stdoutEquals", name: "Ротація успішна", value: "3 1 2", normalize: "strict" },
          { type: "codeRegex", name: "Множинний обмін", pattern: "a\\s*,\\s*b\\s*,\\s*c\\s*=\\s*c\\s*,\\s*a\\s*,\\s*b" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Оператор IS",
        xp: 400,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Чи це один і той самий об'єкт?</h2>
          <p>Замість того, щоб порівнювати <code>id(x) == id(y)</code>, у Python є елегантний оператор <b style="color: #10b981;"><code>is</code></b>. Він повертає True, якщо змінні дивляться на одну й ту саму комірку пам'яті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Перевір, чи оператор <code>is</code> працює так само, як порівняння <code>id</code>.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">x = 100</code> та <code style="color: #0ea5e9;">y = x</code>. Виведи результат порівняння: <code style="color: #0ea5e9;">x is y</code>.
          </div>
        `,
        hint: `print(x is y)`,
        expected: `True`,
        tests: [
          { type: "stdoutEquals", name: "Об'єкт ідентичний", value: "True", normalize: "soft" },
          { type: "codeRegex", name: "Використано оператор is", pattern: "print\\s*\\(\\s*x\\s+is\\s+y\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Складне створення",
        xp: 450,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Все разом</h2>
          <p>Ти можеш комбінувати анотації типів та множинне присвоєння в одному рядку.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи профіль гравця за найвищими стандартами написання коду.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> В одному рядку створи змінні <code style="color: #0ea5e9;">nick</code> та <code style="color: #0ea5e9;">level</code>. Використай анотації типів (<code style="color: #0ea5e9;">str</code> та <code style="color: #0ea5e9;">int</code>). Надай їм значення <code style="color: #0ea5e9;">"Neo"</code> та <code style="color: #0ea5e9;">99</code>. Виведи їх.
          </div>
        `,
        hint: `Твій перший рядок: nick: str, level: int = "Neo", 99`,
        expected: `Neo 99`,
        tests: [
          { type: "stdoutEquals", name: "Профіль створено", value: "Neo 99", normalize: "soft" },
          { type: "codeRegex", name: "Множинне присвоєння з типами", pattern: "nick\\s*:\\s*str\\s*,\\s*level\\s*:\\s*int\\s*=\\s*['\"]Neo['\"]\\s*,\\s*99" }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🧙‍♂️ БОС (Senior): Алхімік",
        xp: 1000,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит: Магія Python</h2>
          <p>Поєднай множинне присвоєння, анотації типів, магічний обмін та f-рядки в одному елегантному алгоритмі!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Алхімік переплутав етикетки на колбах (Flask). У першій колбі лежить отрута, а в другій — ліки. Тобі треба поміняти їхній вміст місцями і вивести фінальний звіт.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1) В ОДНОМУ рядку створи змінні <code style="color: #0ea5e9;">f1</code> та <code style="color: #0ea5e9;">f2</code> зі значеннями <code style="color: #0ea5e9;">"Poison"</code> та <code style="color: #0ea5e9;">"Heal"</code>. Використай анотацію типів: <code style="color: #0ea5e9;">str</code> для обох.<br>
            2) Зроби магічний обмін їхніх значень.<br>
            3) ОДНИМ <b>f-рядком</b> виведи фінальний текст із результатами: <code>Flask 1: Heal, Flask 2: Poison</code>.
          </div>

          <div class="task-note">
            <b>Важливо:</b> Якщо ти зробиш усе правильно, код складатиметься всього з трьох рядків!
          </div>
        `,
        hint: `Крок 1: f1: str, f2: str = "Poison", "Heal". Крок 2: f1, f2 = f2, f1. Крок 3: print(f"Flask 1: {f1}, Flask 2: {f2}").`,
        expected: `Flask 1: Heal, Flask 2: Poison`,
        tests: [
          {
            type: "stdoutEquals",
            name: "Обмін та друк успішні",
            value: "Flask 1: Heal, Flask 2: Poison",
            normalize: "strict"
          },
          { type: "codeRegex", name: "Множинне присвоєння з типами", pattern: "f1\\s*:\\s*str\\s*,\\s*f2\\s*:\\s*str\\s*=\\s*['\"]Poison['\"]\\s*,\\s*['\"]Heal['\"]" },
          { type: "codeRegex", name: "Магічний обмін", pattern: "f1\\s*,\\s*f2\\s*=\\s*f2\\s*,\\s*f1" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]Flask 1:\\s*\\{\\s*f1\\s*\\},\\s*Flask 2:\\s*\\{\\s*f2\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      }
    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
