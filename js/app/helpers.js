window.App = window.App || {};

window.App.helpers = (function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  function on(el, evt, fn) {
    if (!el) return;
    el.addEventListener(evt, fn);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  function todayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function levelFromXp(xp) {
    let level = 1;
    let threshold = 200;
    let remaining = xp;

    while (remaining >= threshold) {
      remaining -= threshold;
      level += 1;
      threshold = Math.floor(threshold * 1.25);
    }

    return { level, inLevelXp: remaining, nextLevelXp: threshold };
  }

  return {
    $,
    on,
    escapeHtml,
    todayISO,
    levelFromXp
  };
})();