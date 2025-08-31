import { load, save } from '../../services/localDb';
const KEY = 'areas';
export const listAreas = () => load(KEY);
export const addArea = (payload) => {
  const items = load(KEY);
  const item = { id: Date.now(), ...payload, createdAt: new Date().toISOString() };
  save(KEY, [...items, item]);
  return item;
};
export const removeArea = (id) => save(KEY, load(KEY).filter(i => i.id !== id));
