// js/data/python/m_bonus.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_bonus",
    title: "Додаткові випробування (Bonus)",
    icon: "ri-star-smile-line",
    color: "#f43f5e", // Яскраво-рожевий колір для бонусного розділу
    desc: "Комбінуємо if/else, цикли та типи даних. Більше практики, складніші сценарії, менше підказок!",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Базові комбінації)
      // ==========================================

      {
        title: "🌟 Ліміт аптечки",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Контроль лімітів</h2>
          <p>В іграх здоров'я не може перевищувати максимум (наприклад, 100). Якщо у героя 90 HP і він вип'є зілля на +20, у нього має стати 100, а не 110.</p>
          <p>Для цього ми ставимо <b style="color: #ef4444;"><code>if</code></b> прямо всередині циклу лікування!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">hp = 90<br>hp += 20<br>if hp &gt; 100:<br>    hp = 100 <span style="color:gray;"># Відрізаємо зайве!</span></div>
        `,
        desc: `
          <div class="task-main">
            <p>Герой лежить у лікувальній капсулі. Вона відновлює здоров'я порціями по 15 HP, але не може дати більше ніж 100 HP.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">hp = 70</code>.<br>
            Напиши цикл: <code style="color: #0ea5e9;">while hp &lt; 100:</code><br>
            Всередині додай до здоров'я 15: <code style="color: #0ea5e9;">hp += 15</code>.<br>
            Одразу перевір: <code style="color: #0ea5e9;">if hp &gt; 100:</code>, то встанови <code style="color: #0ea5e9;">hp = 100</code>.<br>
            В кінці циклу виведи <code style="color: #0ea5e9;">print(hp)</code>.
          </div>
        `,
        hint: `while hp < 100:\n    hp += 15\n    if hp > 100:\n        hp = 100\n    print(hp)`,
        expected: `85\n100`,
        tests: [
          { type: "codeRegex", name: "Додавання HP", pattern: "hp\\s*\\+\\s*=\\s*15" },
          { type: "codeRegex", name: "Обрізання до 100", pattern: "if\\s+hp\\s*>\\s*100\\s*:\\s*\\n\\s*hp\\s*=\\s*100", flags: "s" }
        ]
      },

      {
        title: "🌟 Митний контроль",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Нескінченна черга</h2>
          <p>Поєднаємо <code>while True</code>, <code>input()</code> та структуру <code>if / elif / else</code> для створення програми, яка обробляє людей у черзі нескінченно.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє вік відвідувачів на вході. Щоб завершити зміну (вимкнути програму), охоронець вводить вік "0".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code style="color: #0ea5e9;">while True:</code>.<br>
            Запитай: <code style="color: #0ea5e9;">age = int(input("Вік: "))</code>.<br>
            - Якщо <code style="color: #0ea5e9;">age == 0:</code> виведи <code>"Закрито"</code> і <code style="color: #0ea5e9;">break</code>.<br>
            - Якщо <code style="color: #0ea5e9;">age &gt;= 18:</code> виведи <code>"Проходь"</code>.<br>
            - Інакше виведи <code>"Відмова"</code>.
          </div>
        `,
        hint: `if age == 0: break\nelif age >= 18: print("Проходь")\nelse: print("Відмова")`,
        expected: `Вік: 15\nВідмова\nВік: 20\nПроходь\nВік: 0\nЗакрито`,
        tests: [
          { type: "codeRegex", name: "Перевірка виходу", pattern: "if\\s+age\\s*==\\s*0\\s*:\\s*\\n\\s*print.*\\n\\s*break", flags: "s" },
          { type: "codeRegex", name: "Перевірка віку", pattern: "age\\s*>=\\s*18\\s*:" }
        ]
      },

      {
        title: "🌟 Лічильник парних чисел",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Умовний акумулятор</h2>
          <p>Ми можемо рахувати не кожен крок циклу, а ТІЛЬКИ ті кроки, які відповідають певній умові (наприклад, тільки парні числа).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач вводить числа. Програма рахує, скільки з них були парними. Введення зупиняється числом 0.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">evens = 0</code>. Зроби <code>while True:</code>.<br>
            Запитай <code>num = int(input("Число: "))</code>.<br>
            - Якщо <code>num == 0</code>, то <code>break</code>.<br>
            - Якщо <code>num % 2 == 0</code>, збільш <code>evens += 1</code>.<br>
            Зовні циклу виведи: <code>print("Парних:", evens)</code>.
          </div>
        `,
        hint: `if num % 2 == 0:\n    evens += 1`,
        expected: `Число: 2\nЧисло: 3\nЧисло: 0\nПарних: 1`,
        tests: [
          { type: "codeRegex", name: "Перевірка парності", pattern: "if\\s+num\\s*%\\s*2\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Збільшення лічильника", pattern: "evens\\s*\\+\\s*=\\s*1" }
        ]
      },

      {
        title: "🌟 Скарбничка із захистом",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Захист від мінусів</h2>
          <p>Що, якщо користувач введе від'ємне число в скарбничку, щоб вкрасти гроші? Треба поставити захист за допомогою <code>continue</code>!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Ти збираєш 500 монет. Якщо хтось спробує покласти від'ємну суму, програма має лаятися і не додавати її.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>total = 0</code>. Зроби <code>while total &lt; 500:</code>.<br>
            Запитай <code>coin = int(input("Монети: "))</code>.<br>
            Якщо <code>coin &lt; 0</code>: виведи <code>"Не кради!"</code> і зроби <code>continue</code>.<br>
            Додай: <code>total += coin</code>. Зовні циклу виведи <code>print("Зібрано!")</code>.
          </div>
        `,
        hint: `if coin < 0:\n    print("Не кради!")\n    continue`,
        expected: `Монети: 300\nМонети: -50\nНе кради!\nМонети: 200\nЗібрано!`,
        tests: [
          { type: "codeRegex", name: "Захист від мінуса", pattern: "if\\s+coin\\s*<\\s*0\\s*:\\s*\\n.*print.*\\n\\s*continue", flags: "s" },
          { type: "codeRegex", name: "Додавання до суми", pattern: "total\\s*\\+\\s*=\\s*coin" }
        ]
      },

      {
        title: "🌟 Двокроковий логін",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вкладені перевірки</h2>
          <p>Іноді, щоб отримати доступ, треба пройти два етапи: спочатку правильний логін, а вже потім — правильний пароль.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система запитує логін. Якщо він правильний, вона запитує пароль. Якщо пароль теж правильний — цикл ламається і пускає всередину.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>while True:</code>.<br>
            Запитай <code>user = input("Логін: ")</code>.<br>
            Якщо <code>user == "admin"</code>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Запитай <code>pwd = input("Пароль: ")</code>.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Якщо <code>pwd == "123"</code>: виведи <code>"Вхід"</code> і <code>break</code>.
          </div>
        `,
        hint: `if user == "admin":\n    pwd = input("Пароль: ")\n    if pwd == "123":\n        print("Вхід")\n        break`,
        expected: `Логін: guest\nЛогін: admin\nПароль: 123\nВхід`,
        tests: [
          { type: "codeRegex", name: "Вкладений запит пароля", pattern: "if\\s+user\\s*==\\s*['\"]admin['\"]\\s*:\\s*\\n\\s+pwd\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Вкладена перевірка пароля", pattern: "\\n\\s{4,}if\\s+pwd\\s*==\\s*['\"]123['\"]\\s*:\\s*\\n\\s{8,}print.*\\n\\s{8,}break", flags: "s" }
        ]
      },

      {
        title: "🌟 Калькулятор знижок",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математика у if</h2>
          <p>Ми можемо перераховувати ціну товару (робити знижку), використовуючи математичні оператори всередині умови.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Каса магазину працює беззупинно. Якщо ціна товару більша за 1000, на нього діє знижка 10% (тобто ціна множиться на 0.9). Введення 0 зупиняє касу.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>while True:</code>.<br>
            Запитай <code>price = float(input("Ціна: "))</code>.<br>
            Якщо <code>price == 0: break</code>.<br>
            Якщо <code>price &gt; 1000</code>: <code style="color: #0ea5e9;">price *= 0.9</code>.<br>
            В кінці циклу виведи: <code>print("До сплати:", price)</code>.
          </div>
        `,
        hint: `if price > 1000:\n    price *= 0.9`,
        expected: `Ціна: 500\nДо сплати: 500.0\nЦіна: 2000\nДо сплати: 1800.0\nЦіна: 0`,
        tests: [
          { type: "codeRegex", name: "Ввід як float", pattern: "price\\s*=\\s*float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Розрахунок знижки", pattern: "if\\s+price\\s*>\\s*1000\\s*:\\s*\\n\\s*price\\s*\\*\\s*=\\s*0\\.9" }
        ]
      },

      {
        title: "🌟 Міні-калькулятор",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Консольна утиліта</h2>
          <p>Поєднаємо цикл та кілька <code>elif</code>, щоб зробити програму, яка вміє і додавати, і віднімати!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи простий калькулятор. Він питає дію (+, - або стоп), а потім просить два числа і видає результат.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>while True:</code>.<br>
            Запитай <code>op = input("Дія: ")</code>. Якщо <code>op == "стоп": break</code>.<br>
            Запитай <code>a = int(input("A: "))</code> та <code>b = int(input("B: "))</code>.<br>
            Якщо <code>op == "+"</code>, виведи <code>a + b</code>.<br>
            <code>elif op == "-"</code>, виведи <code>a - b</code>.
          </div>
        `,
        hint: `if op == "+":\n    print(a + b)\nelif op == "-":\n    print(a - b)`,
        expected: `Дія: +\nA: 10\nB: 5\n15\nДія: стоп`,
        tests: [
          { type: "codeRegex", name: "Перевірка додавання", pattern: "if\\s+op\\s*==\\s*['\"]\\+['\"]\\s*:\\s*\\n\\s*print\\s*\\(\\s*a\\s*\\+\\s*b\\s*\\)" },
          { type: "codeRegex", name: "Перевірка віднімання", pattern: "elif\\s+op\\s*==\\s*['\"]\\-['\"]\\s*:\\s*\\n\\s*print\\s*\\(\\s*a\\s*-\\s*b\\s*\\)" }
        ]
      },

      {
        title: "🌟 Вгадай слово",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Три спроби на успіх</h2>
          <p>Поєднаємо лічильник та умову перемоги.</p>
        `,
        desc: `
          <div class="task-main">
            <p>У гравця є 3 спроби, щоб вгадати секретне слово "код". Якщо вгадав — перемога. Якщо спроби закінчилися — програш.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>tries = 3</code>. Зроби <code>while tries &gt; 0:</code>.<br>
            Запитай <code>guess = input("Слово: ")</code>.<br>
            Якщо <code>guess == "код"</code>, виведи <code>"Перемога!"</code> і <code>break</code>.<br>
            Інакше (<code>else</code>) зменш <code>tries -= 1</code>.<br>
            Поза циклом перевір: <code>if tries == 0: print("Програш")</code>.
          </div>
        `,
        hint: `while tries > 0:\n    ...\nif tries == 0:\n    print("Програш")`,
        expected: `Слово: ні\nСлово: ні\nСлово: ні\nПрограш`,
        tests: [
          { type: "codeRegex", name: "Цикл спроб", pattern: "while\\s+tries\\s*>\\s*0\\s*:" },
          { type: "codeRegex", name: "Перемога і break", pattern: "if\\s+guess\\s*==\\s*['\"]код['\"]\\s*:\\s*\\n.*print.*\\n.*break", flags: "s" },
          { type: "codeRegex", name: "Перевірка поразки", pattern: "\\nif\\s+tries\\s*==\\s*0\\s*:\\s*\\n\\s*print" }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Рядки та Логіка)
      // ==========================================

      {
        title: "🔥 Бонус (Middle): Збір унікального луту",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Розумний інвентар</h2>
          <p>Що, якщо ми хочемо зібрати слова в один довгий рядок, але <b>ТІЛЬКИ</b> якщо їх там ще немає? Тут нам знадобиться оператор <code>in</code> та <code>continue</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">bag = "Меч "<br>item = input("Предмет: ") + " "<br>if item in bag:<br>    print("Вже є!")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Герой збирає трави. Якщо він знаходить траву, яка вже є в інвентарі, він її ігнорує. Цикл зупиняється командою "стоп".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи порожній рядок: <code style="color: #0ea5e9;">bag = ""</code>. Зроби <code>while True:</code>.<br>
            Запитай: <code style="color: #0ea5e9;">item = input("Трава: ").strip()</code>.<br>
            1. Якщо <code style="color: #0ea5e9;">item == "стоп": break</code>.<br>
            2. Якщо <code style="color: #0ea5e9;">item</code> <b>є в</b> (<code style="color: #0ea5e9;">in</code>) <code style="color: #0ea5e9;">bag</code>, виведи <code>"Вже маю"</code> і зроби <code style="color: #0ea5e9;">continue</code>.<br>
            3. Приклей предмет до сумки з пробілом: <code style="color: #0ea5e9;">bag += item + " "</code>.<br>
            Зовні циклу виведи: <code>print(f"Інвентар: {bag}")</code>.
          </div>
        `,
        hint: `if item in bag:\n    print("Вже маю")\n    continue\nbag += item + " "`,
        expected: `Трава: М'ята\nТрава: М'ята\nВже маю\nТрава: стоп\nІнвентар: М'ята `,
        tests: [
          { type: "codeRegex", name: "Очищення країв", pattern: "item\\s*=\\s*input\\s*\\(.*\\)\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка дублікату (in)", pattern: "if\\s+item\\s+in\\s+bag\\s*:\\s*\\n\\s*print.*\\n\\s*continue", flags: "s" },
          { type: "codeRegex", name: "Склеювання з пробілом", pattern: "bag\\s*\\+\\s*=\\s*item\\s*\\+\\s*['\"]\\s['\"]" }
        ]
      },

      {
        title: "🔥 Бонус (Middle): Фільтр чату",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Модератор на варті</h2>
          <p>Поєднаємо <code>while True</code>, <code>.lower()</code> та подвійну перевірку через <code>or</code>, щоб створити ідеальний фільтр для ігрового чату.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Бот читає повідомлення. Якщо в повідомленні є слова "спам" або "реклама", він його ігнорує. Якщо "вихід" — вимикається.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>while True:</code>.<br>
            Запитай: <code style="color: #0ea5e9;">msg = input("Чат: ")</code>.<br>
            Створи очищену копію для перевірки: <code style="color: #0ea5e9;">check = msg.lower()</code>.<br>
            - Якщо <code style="color: #0ea5e9;">check == "вихід": break</code>.<br>
            - Якщо <code style="color: #0ea5e9;">"спам" in check</code> <b>АБО</b> <code style="color: #0ea5e9;">"реклама" in check</code>: виведи <code>"Блок!"</code> і <code style="color: #0ea5e9;">continue</code>.<br>
            В кінці циклу виведи ОРИГІНАЛЬНЕ повідомлення: <code>print(f"Надіслано: {msg}")</code>.
          </div>
        `,
        hint: `if "спам" in check or "реклама" in check:\n    print("Блок!")\n    continue`,
        expected: `Чат: Купуй РеКлАмА\nБлок!\nЧат: Привіт\nНадіслано: Привіт\nЧат: вихід`,
        tests: [
          { type: "codeRegex", name: "Копія для перевірки", pattern: "check\\s*=\\s*msg\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка OR", pattern: "if\\s+['\"]спам['\"]\\s+in\\s+check\\s+or\\s+['\"]реклама['\"]\\s+in\\s+check\\s*:" },
          { type: "codeRegex", name: "Пропуск через continue", pattern: "print\\s*\\(\\s*['\"]Блок!['\"]\\s*\\)\\s*\\n\\s*continue", flags: "s" }
        ]
      },

      {
        title: "🔥 Бонус (Middle): ПІН Валідатор",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Подвійний фільтр</h2>
          <p>Щоб перевірити, чи рядок складається тільки з цифр І має правильну довжину, ми використовуємо <code>isdigit()</code> та <code>len()</code> разом.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить створити ПІН-код. Він має складатися виключно з цифр і мати довжину рівно 4 символи.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Зроби <code>while True:</code>.<br>
            Запитай <code>pin = input("Новий ПІН: ")</code>.<br>
            Якщо <code>pin.isdigit()</code> <b>І</b> <code>len(pin) == 4</code>: виведи <code>"Збережено"</code> і зроби <code>break</code>.<br>
            Інакше: виведи <code>"Помилка формату"</code>.
          </div>
        `,
        hint: `if pin.isdigit() and len(pin) == 4:`,
        expected: `Новий ПІН: 12a4\nПомилка формату\nНовий ПІН: 1234\nЗбережено`,
        tests: [
          { type: "codeRegex", name: "Валідація ПІНу", pattern: "if\\s+pin\\.isdigit\\s*\\(\\)\\s+and\\s+len\\s*\\(\\s*pin\\s*\\)\\s*==\\s*4\\s*:" },
          { type: "codeRegex", name: "Break", pattern: "break" }
        ]
      },

      {
        title: "🔥 Бонус (Middle): Email Fixer",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ремонт даних</h2>
          <p>Якщо користувач ввів дані криво (наприклад, поставив пробіли), ми можемо використати <code>replace(" ", "")</code>, щоб прибрати їх усі!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система вимагає пошту. Вона має обов'язково містити "@". Також система автоматично видаляє всі пробіли, які випадково ввів користувач.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code>while True:</code>.<br>
            Запитай: <code>email = input("Email: ")</code>.<br>
            Якщо <code>"@" not in email</code>: виведи <code>"Немає @"</code> і <code>continue</code>.<br>
            Якщо пошта пройшла перевірку: перезапиши її, замінивши всі пробіли <code>" "</code> на порожнечу <code>""</code>: <code style="color: #0ea5e9;">email = email.replace(" ", "")</code>.<br>
            Виведи <code>print(email)</code> і зроби <code>break</code>.
          </div>
        `,
        hint: `if "@" not in email:\n    print("Немає @")\n    continue\nemail = email.replace(" ", "")`,
        expected: `Email: nomail.com\nНемає @\nEmail: my @ mail . com\nmy@mail.com`,
        tests: [
          { type: "codeRegex", name: "Перевірка @", pattern: "if\\s+['\"]@['\"]\\s+not\\s+in\\s+email\\s*:" },
          { type: "codeRegex", name: "Очищення пробілів", pattern: "email\\s*=\\s*email\\.replace\\s*\\(\\s*['\"]\\s['\"]\\s*,\\s*['\"]['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🔥 Бонус (Middle): Лічильник голосних",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Збір літер</h2>
          <p>Ми можемо просити користувача вводити по одній літері і перевіряти, чи є вона голосною.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма рахує, скільки голосних літер ввів користувач. Введення крапки "." зупиняє програму.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>vowels = 0</code>. Зроби <code>while True:</code>.<br>
            Запитай <code>char = input("Літера: ").lower()</code>.<br>
            Якщо <code>char == ".": break</code>.<br>
            Якщо <code>char in "аеєиіїоуюя"</code>: збільш <code>vowels += 1</code>.<br>
            Зовні циклу виведи: <code>print("Голосних:", vowels)</code>.
          </div>
        `,
        hint: `if char in "аеєиіїоуюя":\n    vowels += 1`,
        expected: `Літера: а\nЛітера: б\nЛітера: о\nЛітера: .\nГолосних: 2`,
        tests: [
          { type: "codeRegex", name: "Перевірка голосних (in)", pattern: "if\\s+char\\s+in\\s+['\"]аеєиіїоуюя['\"]\\s*:" },
          { type: "codeRegex", name: "Лічильник", pattern: "vowels\\s*\\+\\s*=\\s*1" }
        ]
      },

      {
        title: "🔥 Бонус (Middle): Камінь, Ножиці, Папір",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Класика ігор</h2>
          <p>Поєднаємо цикл для повторення гри і купу перевірок <code>elif</code> для визначення переможця.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Два гравці вводять свій вибір ("камінь", "ножиці" або "папір"). Гра визначає, хто виграв. Введення "стоп" зупиняє гру.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Зроби <code>while True:</code>.<br>
            Запитай <code>p1 = input("Гр1: ")</code> і <code>p2 = input("Гр2: ")</code>.<br>
            Якщо <code>p1 == "стоп"</code> або <code>p2 == "стоп"</code>: <code>break</code>.<br>
            Якщо <code>p1 == p2</code>: виведи <code>"Нічия"</code>.<br>
            <b>elif</b> <code>p1 == "камінь" and p2 == "ножиці"</code>: виведи <code>"Гр1 виграв"</code>.<br>
            <b>else</b>: виведи <code>"Гр2 виграв"</code> (спрощена логіка для цього завдання).
          </div>
        `,
        hint: `if p1 == p2:\n    print("Нічия")\nelif p1 == "камінь" and p2 == "ножиці":\n    print("Гр1 виграв")\nelse:\n    print("Гр2 виграв")`,
        expected: `Гр1: камінь\nГр2: ножиці\nГр1 виграв\nГр1: стоп\nГр2: стоп`,
        tests: [
          { type: "codeRegex", name: "Умова нічиї", pattern: "if\\s+p1\\s*==\\s*p2\\s*:" },
          { type: "codeRegex", name: "Перемога Гр1 (and)", pattern: "elif\\s+p1\\s*==\\s*['\"]камінь['\"]\\s+and\\s+p2\\s*==\\s*['\"]ножиці['\"]\\s*:" }
        ]
      },

      {
        title: "🔥 Бонус (Middle): Банківське Меню",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вкладена логіка</h2>
          <p>В іграх і банкоматах завжди є перевірка "чи достатньо грошей", яка знаходиться <b>всередині</b> перевірки "дія зняття".</p>
        `,
        desc: `
          <div class="task-main">
            <p>Банкомат дозволяє класти і знімати гроші. Якщо грошей для зняття не вистачає — він відмовляє.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>bal = 0</code>. Зроби <code>while True:</code>.<br>
            Запитай: <code>cmd = input("1-Покласти, 2-Зняти, 0-Вийти: ")</code>.<br>
            - Якщо <code>cmd == "0": break</code>.<br>
            - Якщо <code>cmd == "1"</code>: запитай <code>val = int(input("Сума: "))</code> і додай <code>bal += val</code>.<br>
            - Якщо <code>cmd == "2"</code>: запитай <code>val = int(input("Сума: "))</code>. <b>Вкладений if</b>: якщо <code>bal &gt;= val</code>, відніми <code>bal -= val</code>. Інакше виведи <code>"Мало грошей"</code>.<br>
            В кінці циклу виведи: <code>print("Баланс:", bal)</code>.
          </div>
        `,
        hint: `if cmd == "2":\n    val = int(input("Сума: "))\n    if bal >= val:\n        bal -= val\n    else:\n        print("Мало грошей")`,
        expected: `1-Покласти, 2-Зняти, 0-Вийти: 1\nСума: 100\nБаланс: 100\n1-Покласти, 2-Зняти, 0-Вийти: 2\nСума: 150\nМало грошей\nБаланс: 100\n1-Покласти, 2-Зняти, 0-Вийти: 0`,
        tests: [
          { type: "codeRegex", name: "Додавання грошей", pattern: "if\\s+cmd\\s*==\\s*['\"]1['\"]\\s*:\\s*\\n\\s*val\\s*=\\s*int\\s*\\(\\s*input.*\\n\\s*bal\\s*\\+\\s*=\\s*val", flags: "s" },
          { type: "codeRegex", name: "Вкладений if для зняття", pattern: "if\\s+cmd\\s*==\\s*['\"]2['\"]\\s*:\\s*\\n.*if\\s+bal\\s*>=\\s*val\\s*:\\s*\\n\\s*bal\\s*-\\s*=\\s*val", flags: "s" }
        ]
      },

      {
        title: "🔥 Бонус (Middle): Text Formatter",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Авто-виправлення</h2>
          <p>Поєднаємо методи рядків <code>capitalize()</code> та <code>endswith()</code>, щоб зробити речення ідеальним.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма отримує речення. Вона має зробити першу літеру великою і перевірити, чи стоїть крапка в кінці (якщо ні — додати її).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>text = input("Текст: ").strip().capitalize()</code>.<br>
            Якщо <code>not text.endswith(".")</code>: додай крапку (<code>text += "."</code>).<br>
            Виведи <code>print(text)</code>.
          </div>
        `,
        hint: `if not text.endswith("."): text += "."`,
        expected: `Текст: привіт світ\nПривіт світ.`,
        tests: [
          { type: "codeRegex", name: "Ланцюг методів", pattern: "input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.capitalize\\s*\\(\\)" },
          { type: "codeRegex", name: "Перевірка крапки", pattern: "if\\s+not\\s+text\\.endswith\\s*\\(\\s*['\"]\\.['\"]\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Додавання крапки", pattern: "text\\s*\\+\\s*=\\s*['\"]\\.['\"]" }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Парсинг та Алгоритми)
      // ==========================================

      {
        title: "👑 Бонус (Senior): Шифратор (Морж + Match)",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Швейцарський ніж Python</h2>
          <p>Комбінуємо <code>while :=</code> для читання символів і <code>match / case</code> з функціями <code>ord/chr</code> для їх обробки.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма зчитує по одному символу. Літера "A" залишається як є. Цифри замінюються на нуль. Усі інші символи зсуваються на 1 крок вперед по таблиці Unicode.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши: <code style="color: #0ea5e9;">while (char := input("Символ: ")) != ".":</code><br>
            Відкрий <code>match char:</code><br>
            - <code>case "A" | "a":</code> виведи <code>char</code>.<br>
            - <code>case _ if char.isdigit():</code> виведи <code>"0"</code>.<br>
            - <code>case _:</code> виведи: <code>print(chr(ord(char) + 1))</code>.
          </div>
        `,
        hint: `match char:\n    case "A" | "a": ...\n    case _ if char.isdigit(): ...\n    case _: ...`,
        expected: `Символ: A\nA\nСимвол: 5\n0\nСимвол: K\nL\nСимвол: .`,
        tests: [
          { type: "codeRegex", name: "Морж у циклі", pattern: "while\\s+\\(\\s*char\\s*:=\\s*input\\s*\\(.*\\)\\s*\\)\\s*!=\\s*['\"]\\.['\"]\\s*:" },
          { type: "codeRegex", name: "Match і Guard", pattern: "match\\s+char\\s*:\\s*\\n\\s+case\\s+['\"]A['\"]\\s*\\|\\s*['\"]a['\"]\\s*:\\s*\\n.*case\\s+_\\s+if\\s+char\\.isdigit\\s*\\(\\)\\s*:", flags: "s" }
        ]
      },

      {
        title: "👑 Бонус (Senior): Надійний сейф",
        xp: 320,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">while-else</h2>
          <p>Блок <code>else</code> після <code>while</code> спрацює лише тоді, коли лічильник спроб дойде до нуля (цикл завершиться без <code>break</code>).</p>
        `,
        desc: `
          <div class="task-main">
            <p>У хакера є 3 спроби, щоб підібрати пін-код "777". Якщо він вгадає — система вимкнеться (break). Якщо спроби закінчаться — увімкнеться сирена.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>tries = 3</code>. <br>
            Напиши <code>while tries &gt; 0:</code><br>
            Запитай <code>pwd = input("Код: ")</code>.<br>
            Якщо <code>pwd == "777"</code>: виведи <code>"Зламано"</code> і <code>break</code>.<br>
            Інакше: зменш <code>tries -= 1</code>.<br>
            На рівні з <code>while</code> додай блок <code>else:</code> і виведи в ньому <code>"СИРЕНА!"</code>.
          </div>
        `,
        hint: `while tries > 0:\n    ...\nelse:\n    print("СИРЕНА!")`,
        expected: `Код: 111\nКод: 222\nКод: 333\nСИРЕНА!`,
        tests: [
          { type: "codeRegex", name: "Успіх і break", pattern: "if\\s+pwd\\s*==\\s*['\"]777['\"]\\s*:\\s*\\n.*break", flags: "s" },
          { type: "codeRegex", name: "Блок while-else", pattern: "while\\s+tries\\s*>\\s*0\\s*:.*\\nelse\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]СИРЕНА!['\"]\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "👑 Бонус (Senior): Парсер команд",
        xp: 340,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Аналіз рядків</h2>
          <p>Поєднаємо Моржа для циклу та <code>split(maxsplit)</code> для розбору складних команд з терміналу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Бот отримує команди формату "say Привіт світ!". Тобі треба відокремити слово "say" від усього іншого тексту.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши: <code>while (raw := input("CMD: ")) != "exit":</code><br>
            Розріж ввід ОДИН раз і розпакуй: <code>cmd, text = raw.split(" ", 1)</code>.<br>
            Якщо <code>cmd == "say"</code>, виведи f-рядком: <code>Бот каже: {text}</code>.
          </div>
        `,
        hint: `cmd, text = raw.split(" ", 1)`,
        expected: `CMD: say Я люблю Python\nБот каже: Я люблю Python\nCMD: exit`,
        tests: [
          { type: "codeRegex", name: "Морж", pattern: "while\\s+\\(\\s*raw\\s*:=\\s*input\\s*\\(.*\\)\\s*\\)\\s*!=\\s*['\"]exit['\"]\\s*:" },
          { type: "codeRegex", name: "maxsplit=1", pattern: "cmd\\s*,\\s*text\\s*=\\s*raw\\.split\\s*\\(\\s*['\"]\\s['\"]\\s*,\\s*1\\s*\\)" }
        ]
      },

      {
        title: "👑 Бонус (Senior): Двійковий конвертер",
        xp: 360,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Хитра перевірка</h2>
          <p>Як перевірити, що текст складається ТІЛЬКИ з нулів та одиниць? Можна замінити всі "0" і "1" на порожнечу (<code>""</code>). Якщо після цього рядок стане порожнім — отже, там більше нічого не було!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма конвертує двійковий код (base 2) у звичайне число. Але спочатку вона перевіряє, чи немає там помилкових цифр (наприклад, 2 або 3).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Зроби <code>while True:</code>.<br>
            Запитай <code>bin_str = input("Код: ")</code>.<br>
            Створи <code>check = bin_str.replace("0", "").replace("1", "")</code>.<br>
            Якщо <code>check == ""</code> (порожньо): виведи <code>int(bin_str, 2)</code> і зроби <code>break</code>.<br>
            Інакше виведи <code>"Помилка формату"</code>.
          </div>
        `,
        hint: `if check == "":\n    print(int(bin_str, 2))\n    break`,
        expected: `Код: 1012\nПомилка формату\nКод: 101\n5`,
        tests: [
          { type: "codeRegex", name: "Подвійний replace", pattern: "bin_str\\.replace\\s*\\(\\s*['\"]0['\"]\\s*,\\s*['\"]['\"]\\s*\\)\\.replace\\s*\\(\\s*['\"]1['\"]\\s*,\\s*['\"]['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Конвертація з бази 2", pattern: "int\\s*\\(\\s*bin_str\\s*,\\s*2\\s*\\)" }
        ]
      },

      {
        title: "👑 Бонус (Senior): Координатний парсер",
        xp: 380,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Складний розбір</h2>
          <p>Отримавши координати "10,20", нам треба їх розділити, очистити від пробілів, перевірити на цифри і лише потім перетворити на <code>int</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Система отримує координати радара через кому. Якщо щось не так — вона просить знову.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> <code>while True:</code><br>
            Запитай <code>raw = input("X,Y: ")</code>.<br>
            Розпакуй: <code>x_str, y_str = raw.split(",")</code>.<br>
            Очисти: <code>x_str = x_str.strip()</code> (і так само для Y).<br>
            Перевір: <code>if not x_str.isdigit() or not y_str.isdigit(): continue</code>.<br>
            Якщо все ок: <code>x, y = int(x_str), int(y_str)</code>.<br>
            Виведи f-рядком <code>[{x}:{y}]</code> і <code>break</code>.
          </div>
        `,
        hint: `x_str, y_str = raw.split(",")\nx_str = x_str.strip()\ny_str = y_str.strip()`,
        expected: `X,Y: 10, a\nX,Y: 10, 20\n[10:20]`,
        tests: [
          { type: "codeRegex", name: "Розпакування по комі", pattern: "x_str\\s*,\\s*y_str\\s*=\\s*raw\\.split\\s*\\(\\s*['\"],['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Перевірка isdigit", pattern: "if\\s+not\\s+x_str\\.isdigit\\s*\\(\\)\\s+or\\s+not\\s+y_str\\.isdigit\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Множинний кастинг", pattern: "x\\s*,\\s*y\\s*=\\s*int\\s*\\(\\s*x_str\\s*\\)\\s*,\\s*int\\s*\\(\\s*y_str\\s*\\)" }
        ]
      },

      {
        title: "👑 Бонус (Senior): Алгоритм Банкомату",
        xp: 400,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математика видачі</h2>
          <p>Банкомат видає купюри по 50, 20 та 10. Щоб дізнатися кількість купюр по 50, ми ділимо націло: <code>amount // 50</code>. Щоб дізнатися залишок, беремо остачу: <code>amount %= 50</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Алгоритм має видати мінімальну кількість купюр для введеної суми. Сума має бути кратною 10.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>amt = int(input("Сума: "))</code>.<br>
            Якщо <code>amt % 10 != 0</code>: <code>print("Помилка")</code>.<br>
            Інакше (<code>else</code>):<br>
            - Знайди полтинники: <code>f50 = amt // 50</code>, потім <code>amt %= 50</code>.<br>
            - Знайди двадцятки: <code>f20 = amt // 20</code>, потім <code>amt %= 20</code>.<br>
            - Знайди десятки: <code>f10 = amt // 10</code>.<br>
            Виведи f-рядок: <code>50:{f50}, 20:{f20}, 10:{f10}</code>.
          </div>
        `,
        hint: `f50 = amt // 50\namt %= 50`,
        expected: `Сума: 180\n50:3, 20:1, 10:1`,
        tests: [
          { type: "codeRegex", name: "Перевірка кратності", pattern: "if\\s+amt\\s*%\\s*10\\s*!=\\s*0\\s*:" },
          { type: "codeRegex", name: "Ділення націло (//)", pattern: "amt\\s*//\\s*50" },
          { type: "codeRegex", name: "Оновлення залишку (%=)", pattern: "amt\\s*%=\\s*50|amt\\s*=\\s*amt\\s*%\\s*50" }
        ]
      },

      {
        title: "👑 Бонус (Senior): Статус Систем",
        xp: 450,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">all() та any() на практиці</h2>
          <p>Комбінуємо потужні перевірки списків для системного діагностування.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Сервер має три модулі (1 - працює, 0 - лежить). Якщо всі працюють — ОК. Якщо всі лежать — КРИТИЧНО. Якщо хоча б один лежить — ПОПЕРЕДЖЕННЯ.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>s1 = int(input("M1: ")) == 1</code> (це створить bool). Так само для <code>s2</code> та <code>s3</code>.<br>
            Створи список: <code>systems = [s1, s2, s3]</code>.<br>
            Якщо <code>all(systems)</code>: <code>print("OK")</code>.<br>
            <b>elif</b> <code>not any(systems)</code>: <code>print("CRITICAL")</code> (not any означає "жоден не працює").<br>
            <b>else</b>: <code>print("WARNING")</code>.
          </div>
        `,
        hint: `if all(systems):\n    print("OK")\nelif not any(systems):\n    print("CRITICAL")\nelse:\n    print("WARNING")`,
        expected: `M1: 1\nM2: 0\nM3: 1\nWARNING`,
        tests: [
          { type: "codeRegex", name: "Створення bool", pattern: "s1\\s*=\\s*int\\s*\\(\\s*input.*==\\s*1", flags: "s" },
          { type: "codeRegex", name: "Умова all", pattern: "if\\s+all\\s*\\(\\s*systems\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Умова not any", pattern: "elif\\s+not\\s+any\\s*\\(\\s*systems\\s*\\)\\s*:" }
        ]
      },

      {
        title: "👑 БОС (Senior Bonus): RPG Бої",
        xp: 2000,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Абсолютний фінал</h2>
          <p>Створимо повноцінну бойову систему! Два цикли, атаки, лікування, перевірка смерті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Герой (100 HP) б'ється з Босом (150 HP). Кожен хід герой обирає дію. Після його ходу Бос автоматично б'є у відповідь.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>hero = 100</code>, <code>boss = 150</code>. Цикл: <code>while True:</code>.<br>
            2. Хід героя: <code>act = input("1-Атака, 2-Хіл: ")</code>.<br>
            3. Якщо "1": <code>boss -= 30</code>. Якщо "2": <code>hero += 20</code>. Якщо "0": <code>break</code>.<br>
            4. Одразу перевір: <code>if boss &lt;= 0: print("Перемога"); break</code>.<br>
            5. Хід Боса: <code>hero -= 25</code>.<br>
            6. Перевір: <code>if hero &lt;= 0: print("Поразка"); break</code>.<br>
            7. В кінці циклу виведи f-рядок: <code>print(f"Герой:{hero} Бос:{boss}")</code>.
          </div>
        `,
        hint: `while True:\n    act = input(...)\n    if act == "1": boss -= 30\n    elif act == "2": hero += 20\n    elif act == "0": break\n    \n    if boss <= 0: \n        print("Перемога")\n        break\n        \n    hero -= 25\n    \n    if hero <= 0:\n        print("Поразка")\n        break\n        \n    print(...)`,
        expected: `1-Атака, 2-Хіл: 1\nГерой:75 Бос:120\n1-Атака, 2-Хіл: 2\nГерой:70 Бос:120`,
        tests: [
          { type: "codeRegex", name: "Дії героя", pattern: "if\\s+act\\s*==\\s*['\"]1['\"]\\s*:\\s*boss\\s*-\\s*=\\s*30", flags: "s" },
          { type: "codeRegex", name: "Перевірка смерті боса", pattern: "if\\s+boss\\s*<=\\s*0\\s*:\\s*\\n.*print.*\\n.*break", flags: "s" },
          { type: "codeRegex", name: "Атака боса", pattern: "hero\\s*-\\s*=\\s*25" },
          { type: "codeRegex", name: "Перевірка смерті героя", pattern: "if\\s+hero\\s*<=\\s*0\\s*:\\s*\\n.*print.*\\n.*break", flags: "s" }
        ]
      }
    ]
  };

 window.addPracticeModule(moduleObj);
})();