const PREFIX = "roadsos_";

export const storage = {
  set: (key, value) => {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
    catch { return false; }
  },
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)); }
    catch { return null; }
  },
  remove: (key) => localStorage.removeItem(PREFIX + key),
  clear: () => Object.keys(localStorage).filter(k => k.startsWith(PREFIX)).forEach(k => localStorage.removeItem(k)),
};
