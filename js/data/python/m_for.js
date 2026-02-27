// js/data/python/m_for.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_for",
    icon: "ri-repeat-2-line",
    color: "#ec4899", // Рожевий колір для циклів
    title: "Цикл for",
    desc: "Автоматизація рутини: range, лічильники, акумулятори сум та малювання фігур.",
    tasks: [
      
      // ====== ЧАСТИНА 1: Базовий цикл ======

      {
        title: "Робот-повторювач",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Лінь — рушій прогресу!</h2>
          <p>Що робити, якщо нам треба надрукувати слово "Привіт" 5 разів? Писати 5 разів <code>print()</code>? А якщо треба 1000 разів?</p>
          <p>Для цього придумали <b>цикли</b>. Цикл <code>for</code> дозволяє повторювати дію стільки разів, скільки нам потрібно.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">for i in range(3):<br>    print("Привіт")</div>
          <p><b>Результат:</b></p>
          <div class="output-box">Привіт<br>Привіт<br>Привіт</div>
          <p class="mutedish tiny">Не забувай про двокрапку <code>:</code> в кінці та відступ (4 пробіли) перед <code>print()</code>!</p>
        `,
        desc: `Напиши цикл, який повторюється <b>4 рази</b>. Усередині циклу надрукуй слово <code>Python</code>.`,
        hint: `
          1) for i in range(4):
          2) Зроби відступ і напиши print("Python")
        `,
        expected: `Python\nPython\nPython\nPython`,
        tests: [
          { type: "stdoutEquals", name: "Виведено 4 рази", value: "Python\nPython\nPython\nPython", normalize: "soft" },
          { type: "codeRegex", name: "Використано for", pattern: "for\\s+i\\s+in\\s+range" }
        ]
      },

      {
        title: "Що таке 'i'?",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Змінна-лічильник (i)</h2>
          <p>Що це за загадкова літера <code>i</code> у нашому циклі? Це змінна-лічильник (від слова index)!</p>
          <p>Кожного разу, коли цикл робить оберт, <code>i</code> змінює своє значення. За замовчуванням <code>range(3)</code> рахує від 0: <b>0, 1, 2</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">for i in range(3):<br>    print(i)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">0<br>1<br>2</div>
        `,
        desc: `Напиши цикл на <b>5 повторень</b> (використай <code>range(5)</code>). Усередині циклу просто роздрукуй саму змінну <code>i</code>.`,
        hint: `
          1) for i in range(5):
          2) print(i) (змінна пишеться без лапок!)
        `,
        expected: `0\n1\n2\n3\n4`,
        tests: [
          { type: "stdoutEquals", name: "Правильний лічильник", value: "0\n1\n2\n3\n4", normalize: "soft" },
          { type: "codeIncludes", name: "Роздруковано i", value: "print(i)" }
        ]
      },

      {
        title: "Від і До (Два числа в range)",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Рахуємо не з нуля</h2>
          <p>Якщо передати в <code>range()</code> два числа, цикл почне рахувати з першого числа і закінчить <b>ПЕРЕД</b> другим.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">for i in range(1, 4):<br>    print(i)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">1<br>2<br>3</div>
          <p class="mutedish tiny">Зверни увагу: останнє число (4) не включається!</p>
        `,
        desc: `Надрукуй числа <b>від 5 до 9</b> (включно). Для цього використай цикл з двома параметрами в <code>range</code>.`,
        hint: `
          Щоб зупинитися на 9, друге число в range має бути 10!
          for i in range(5, 10):
              print(i)
        `,
        expected: `5\n6\n7\n8\n9`,
        tests: [
          { type: "stdoutEquals", name: "Числа від 5 до 9", value: "5\n6\n7\n8\n9", normalize: "soft" },
          { type: "codeRegex", name: "Два параметри в range", pattern: "range\\s*\\(\\s*5\\s*,\\s*10\\s*\\)" }
        ]
      },

      // ====== ЧАСТИНА 2: Крок циклу та Зворотний відлік ======

      {
        title: "Крок циклу (Три числа в range)",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Стрибаємо через сходинку</h2>
          <p>У <code>range()</code> можна додати третє число — <b>крок</b>. Він вказує, на скільки збільшуватиметься <code>i</code> з кожним кроком.</p>
          <p><b>Приклад (рахуємо двійками):</b></p>
          <div class="code-box">for i in range(2, 9, 2):<br>    print(i)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">2<br>4<br>6<br>8</div>
        `,
        desc: `Виведи числа: <b>10, 20, 30, 40, 50</b>. Використай цикл <code>for</code> з кроком 10.`,
        hint: `
          1) Початок: 10
          2) Кінець: 51 (або 60, головне щоб 50 помістилося)
          3) Крок: 10
          for i in range(10, 51, 10): ...
        `,
        expected: `10\n20\n30\n40\n50`,
        tests: [
          { type: "stdoutEquals", name: "Вивід десятками", value: "10\n20\n30\n40\n50", normalize: "soft" },
          { type: "codeRegex", name: "Крок 10 у range", pattern: "range\\s*\\(.*,\\s*.*,\\s*10\\s*\\)" }
        ]
      },

      {
        title: "Зворотний відлік",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Рахуємо назад!</h2>
          <p>Якщо зробити крок від'ємним (<code>-1</code>), цикл буде рахувати у зворотному напрямку!</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">for i in range(3, 0, -1):<br>    print(i)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">3<br>2<br>1</div>
          <p class="mutedish tiny">Зверни увагу: стартове число має бути більшим за кінцеве!</p>
        `,
        desc: `Напиши зворотний відлік для ракети: <b>5, 4, 3, 2, 1</b>, а потім (після циклу) надрукуй слово <b>Пуск!</b>.`,
        hint: `
          1) for i in range(5, 0, -1):
          2)     print(i)
          3) Прибери відступ і напиши print("Пуск!")
        `,
        expected: `5\n4\n3\n2\n1\nПуск!`,
        tests: [
          { type: "stdoutEquals", name: "Правильний зворотний відлік", value: "5\n4\n3\n2\n1\nПуск!", normalize: "soft" },
          { type: "codeRegex", name: "Від'ємний крок", pattern: "range\\s*\\(.*,\\s*.*,\\s*-1\\s*\\)" }
        ]
      },

      // ====== ЧАСТИНА 3: Патерни в циклах ======

      {
        title: "Текст + Лічильник",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Красивий вивід</h2>
          <p>Ми можемо використовувати змінну <code>i</code> разом зі звичайним текстом у <code>print()</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">for i in range(1, 4):<br>    print("Гравець", i)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">Гравець 1<br>Гравець 2<br>Гравець 3</div>
        `,
        desc: `Виведи 3 рядки: <code>Рівень 1</code>, <code>Рівень 2</code>, <code>Рівень 3</code> за допомогою циклу.`,
        hint: `
          1) for i in range(1, 4):
          2) Усередині: print("Рівень", i)
        `,
        expected: `Рівень 1\nРівень 2\nРівень 3`,
        tests: [
          { type: "stdoutEquals", name: "Рівні виведено правильно", value: "Рівень 1\nРівень 2\nРівень 3", normalize: "soft" },
          { type: "codeIncludes", name: "Є print із комою", value: "," }
        ]
      },

      {
        title: "Малювання фігур (множення рядків)",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Сходинки</h2>
          <p>Згадай, що текст можна множити на число! Якщо ми помножимо зірочку <code>"*"</code> на нашу змінну <code>i</code>, ми зможемо малювати фігури.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">for i in range(1, 4):<br>    print("*" * i)</div>
          <p><b>Результат:</b></p>
          <div class="output-box">*<br>**<br>***</div>
        `,
        desc: `Намалюй сходинки із символу решітки <code>#</code>. Має бути 5 сходинок (від 1 до 5 решіток).`,
        hint: `
          1) for i in range(1, 6):
          2) print("#" * i)
        `,
        expected: `#\n##\n###\n####\n#####`,
        tests: [
          { type: "stdoutEquals", name: "Сходинки побудовано", value: "#\n##\n###\n####\n#####", normalize: "soft" },
          { type: "codeIncludes", name: "Множення тексту", value: "*" }
        ]
      },

      {
        title: "Сума всіх чисел (Акумулятор)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Скарбничка (Акумулятор)</h2>
          <p>Щоб знайти суму чисел від 1 до 5, ми створюємо змінну "скарбничку" (до початку циклу). Потім у циклі ми постійно додаємо до неї значення <code>i</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">total = 0<br>for i in range(1, 4):<br>    total = total + i<br>print("Сума:", total)</div>
          <p class="mutedish tiny">Зверни увагу: print(total) пишеться БЕЗ відступу, щоб він надрукував фінальний результат після завершення циклу!</p>
        `,
        desc: `Знайди суму чисел <b>від 1 до 10 (включно)</b>. Створи змінну <code>suma = 0</code>, у циклі додавай до неї <code>i</code>. У кінці надрукуй тільки фінальну суму.`,
        hint: `
          1) suma = 0
          2) for i in range(1, 11):
          3)     suma = suma + i
          4) print(suma) (без відступу!)
        `,
        expected: `55`,
        tests: [
          { type: "stdoutEquals", name: "Правильна сума", value: "55", normalize: "soft" },
          { type: "codeRegex", name: "Створено скарбничку", pattern: "suma\\s*=\\s*0" },
          { type: "codeIncludes", name: "Додавання до змінної", value: "+" }
        ]
      },

      {
        title: "Цикл + Умова (if всередині for)",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Фільтрація даних</h2>
          <p>Ми можемо перевіряти умови <code>if</code> прямо всередині циклу! Для цього <code>if</code> треба написати з відступом (щоб він був у циклі), а те, що виконується в <code>if</code> — з подвійним відступом!</p>
          <p><b>Приклад (виводимо тільки парні):</b></p>
          <div class="code-box">for i in range(1, 6):<br>    if i % 2 == 0:<br>        print(i, "- парне")</div>
        `,
        desc: `Пройдися циклом по числах від <b>1 до 10</b> (включно). Якщо число ділиться на 3 без залишку (<code>i % 3 == 0</code>), роздрукуй його. Інші пропускай.`,
        hint: `
          1) for i in range(1, 11):
          2)     if i % 3 == 0:
          3)         print(i)
        `,
        expected: `3\n6\n9`,
        tests: [
          { type: "stdoutEquals", name: "Тільки числа кратні 3", value: "3\n6\n9", normalize: "soft" },
          { type: "codeRegex", name: "Використано if", pattern: "if\\s+.*:" },
          { type: "codeIncludes", name: "Ділення з остачею (%)", value: "%" }
        ]
      },

      // ====== ЧАСТИНА 4: Підсумкові завдання ======

      {
        title: "Підсумкова 1: Таблиця множення",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Практика: Таблиця на 5</h2>
          <p>Поєднаємо цикл, математику і красивий вивід тексту!</p>
        `,
        desc: `Надрукуй таблицю множення на 5 (від 1 до 5). Вивід має бути точнісінько таким:
        <pre>5 x 1 = 5
5 x 2 = 10
... і так до 5</pre>`,
        hint: `
          1) for i in range(1, 6):
          2) У print() використовуй кому: print("5 x", i, "=", 5 * i)
        `,
        expected: `5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25`,
        tests: [
          { type: "stdoutEquals", name: "Таблиця правильна", value: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25", normalize: "soft" },
          { type: "codeRegex", name: "Використано цикл", pattern: "for\\s+i\\s+in\\s+range" }
        ]
      },

      {
        title: "Підсумкова 2: Кількість парних",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Практика: Рахуємо кількість</h2>
          <p>Скарбничка може не тільки додавати значення, а й просто рахувати кількість знайдених предметів (додавати +1).</p>
        `,
        desc: `Пройдися по числах від <b>1 до 20</b>. Порахуй, <b>скільки</b> серед них парних чисел (<code>i % 2 == 0</code>).<br>
        Створи <code>count = 0</code>, і якщо знаходиш парне — роби <code>count = count + 1</code>. У кінці виведи <code>count</code>.`,
        hint: `
          1) count = 0
          2) for i in range(1, 21):
          3)     if i % 2 == 0:
          4)         count = count + 1
          5) Після циклу (без відступу): print(count)
        `,
        expected: `10`,
        tests: [
          { type: "stdoutEquals", name: "Кількість парних правильна", value: "10", normalize: "soft" },
          { type: "codeRegex", name: "Є лічильник count", pattern: "count\\s*=" },
          { type: "codeRegex", name: "Є if", pattern: "if\\s+.*:" }
        ]
      },

      {
        title: "Підсумкова 3: Квадрати чисел",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит</h2>
          <p>Щоб піднести число до квадрату (помножити само на себе), можна написати <code>i * i</code> або <code>i ** 2</code>.</p>
        `,
        desc: `Для чисел <b>від 1 до 5</b> (включно), надрукуй їх квадрати у форматі: <code>Квадрат числа [i] дорівнює [результат]</code>.`,
        hint: `
          1) for i in range(1, 6):
          2) У print() передай 4 частини через кому: "Квадрат числа", i, "дорівнює", i * i
        `,
        expected: `Квадрат числа 1 дорівнює 1\nКвадрат числа 2 дорівнює 4\nКвадрат числа 3 дорівнює 9\nКвадрат числа 4 дорівнює 16\nКвадрат числа 5 дорівнює 25`,
        tests: [
          { type: "stdoutEquals", name: "Всі квадрати виведено", value: "Квадрат числа 1 дорівнює 1\nКвадрат числа 2 дорівнює 4\nКвадрат числа 3 дорівнює 9\nКвадрат числа 4 дорівнює 16\nКвадрат числа 5 дорівнює 25", normalize: "soft" },
          { type: "codeRegex", name: "Використано цикл", pattern: "for\\s+.*:" }
        ]
      }

    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
