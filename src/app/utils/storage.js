// utils/storage.js  ← Create this file
export const persistentStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("localStorage blocked, falling back to sessionStorage");
    }
    // Always duplicate to sessionStorage (survives redirects better)
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
    // Also add to URL as backup (optional but bulletproof)
    try {
      const url = new URL(window.location);
      url.searchParams.set("state", btoa(JSON.stringify({ [key]: value })));
      window.history.replaceState({}, "", url);
    } catch (e) {}
  },

  getItem: (key) => {
    // 1. Try localStorage
    try {
      const item = localStorage.getItem(key);
      if (item) return JSON.parse(item);
    } catch (e) {}

    // 2. Try sessionStorage
    try {
      const item = sessionStorage.getItem(key);
      if (item) return JSON.parse(item);
    } catch (e) {}

    // 3. Try URL params (last resort)
    try {
      const params = new URLSearchParams(window.location.search);
      const state = params.get("state");
      if (state) {
        const decoded = JSON.parse(atob(state));
        return decoded[key] || null;
      }
    } catch (e) {}

    return null;
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
    try {
      sessionStorage.removeItem(key);
    } catch (e) {}
  },
};
