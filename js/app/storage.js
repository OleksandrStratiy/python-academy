window.App = window.App || {};

window.App.storage = (function () {
  "use strict";

  const KEY = "py_lms_smart_v3_refactor";

  const defaultState = {
    user: null,
    settings: { sound: true, theme: "dark" },
    leaderboard: (typeof LEADERBOARD_SEED !== "undefined" ? LEADERBOARD_SEED.slice(0) : []),
    courseLevels: {}
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function resetAll() {
    localStorage.removeItem(KEY);
  }

  function safeB64Encode(obj) {
    return btoa(encodeURIComponent(JSON.stringify(obj)));
  }

  function safeB64Decode(b64) {
    return JSON.parse(decodeURIComponent(atob((b64 || "").trim())));
  }

  return {
    KEY,
    defaultState,
    load,
    save,
    resetAll,
    safeB64Encode,
    safeB64Decode
  };
})();