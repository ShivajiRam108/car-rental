import { load, save } from '../../services/localDb';
const KEY = 'announcements';
export const listAnnouncements = () => load(KEY);
export const addAnnouncement = (payload) => {
  const items = load(KEY);
  const item = { id: Date.now(), ...payload, status: payload.status || 'Active', createdAt: new Date().toISOString() };
  save(KEY, [...items, item]);
  return item;
};
export const removeAnnouncement = (id) => save(KEY, load(KEY).filter(i => i.id !== id));
