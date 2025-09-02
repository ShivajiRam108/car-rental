// src/services/locationService.js
const KEY = 'savedLocations';

const load = (k, f = []) => {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : f; } catch { return f; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export const listLocations = () => load(KEY, []);

export const addLocation = (payload) => {
  const items = listLocations();
  const item = { id: Date.now(), ...payload, savedAt: new Date().toISOString() };
  save(KEY, [item, ...items]);
  return item;
};

export const removeLocation = (id) => {
  const items = listLocations().filter(i => i.id !== id);
  save(KEY, items);
};
