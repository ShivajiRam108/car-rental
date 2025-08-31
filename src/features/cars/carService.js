import { load, save } from '../../services/localDb';

const KEY = 'cars';

export const listCars = () => load(KEY);

export const addCar = (payload) => {
  const items = load(KEY);
  const item = { id: Date.now(), ...payload, createdAt: new Date().toISOString() };
  save(KEY, [...items, item]);
  return item;
};

export const removeCar = (id) => {
  const next = load(KEY).filter(c => c.id !== id);
  save(KEY, next);
};
