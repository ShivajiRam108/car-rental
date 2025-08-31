import { load, save } from '../../services/localDb';

const KEY = 'users';

export const listUsers = () => load(KEY);

export const addUser = (payload) => {
  const items = load(KEY);
  const item = { id: Date.now(), ...payload, status: 'Active', verified: payload.verified ?? false, createdAt: new Date().toISOString() };
  save(KEY, [...items, item]);
  return item;
};

export const removeUser = (id) => {
  const next = load(KEY).filter(u => u.id !== id);
  save(KEY, next);
};
