import { load, save } from '../../services/localDb'; 

const KEY = 'types';

export const listTypes = () => load(KEY);
export const addType = (payload) => {
  const items = load(KEY);
  const item = { id: Date.now(), ...payload, createdAt: new Date().toISOString() };
  save(KEY, [...items, item]);
  return item;
};
export const removeType = (id) => {
  const items = load(KEY).filter(i => i.id !== id);
  save(KEY, items);
};
