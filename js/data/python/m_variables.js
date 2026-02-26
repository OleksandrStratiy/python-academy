// js/data/python/m_print.js
(function () {
    "use strict";
  
    const moduleObj = {
      id: "m_variables",
      icon: "ri-code-s-slash-line",
      color: "#8b5cf6",
        title: "Змінні",
        desc: "Збереження значень: =, числа/текст, оновлення змінних, прості обчислення.",
        tasks: [      
              // ====== РІВЕНЬ 1: Що таке змінна ======
    
              {
                title: "Що таке змінна?",
                xp: 70,
                kind: "practice",
                difficulty: "rookie",
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
  
// ... сюди вставляєш решту задач модуля print() ...

            ]
        };
      
        // Додаємо модуль у курс
        window.addModule("python_basics", moduleObj);
      })();