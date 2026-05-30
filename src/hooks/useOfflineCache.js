// Phase 4: LocalStorage-based offline cache
export default function useOfflineCache() {
  const save = (key, data) => {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
  };
  const load = (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  };
  return { save, load };
}
