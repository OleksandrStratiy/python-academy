// js/data/core.js
(function () {
  "use strict";

  // Єдина база, яку читає app.js
  window.DB = window.DB || [];

  // Допоміжна: знайти курс
  function getCourse(courseId) {
    return window.DB.find(c => c.id === courseId);
  }

  // Реєстрація курсу (скелет)
  window.registerCourse = function registerCourse(course) {
    if (!course || !course.id) throw new Error("registerCourse: course.id required");
    const exists = getCourse(course.id);
    if (exists) return;
    window.DB.push({ ...course, modules: course.modules || [] });
  };

  // Додати модуль у курс (це і є “розбиття по файлах”)
  window.addModule = function addModule(courseId, moduleObj) {
    const c = getCourse(courseId);
    if (!c) throw new Error(`addModule: course not found: ${courseId}`);
    c.modules = c.modules || [];
    // якщо модуль з таким id вже є — не дублюємо
    if (c.modules.some(m => m.id === moduleObj.id)) return;
    c.modules.push(moduleObj);
  };

  // === ТУТ оголошуємо курси-скелети ===
  registerCourse({
    id: "python_basics",
    title: "Основи Python",
    icon: "🐍",
    desc: "print(), input(), змінні, if/else, цикли — база.",
    modules: []
  });
  registerCourse({
    id: "pygame_intro",
    title: "Pygame",
    icon: "🎮",
    desc: "Перші кроки: import, вікно, цикл подій.",
    modules: []
  });
  

})();