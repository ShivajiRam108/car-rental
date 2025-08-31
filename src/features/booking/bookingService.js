import { load, save } from '../../services/localDb';

const KEY = 'bookings';

export const listBookings = () => load(KEY);

export const addBooking = (payload) => {
  const items = load(KEY);
  const item = {
    id: Date.now(),
    status: payload.status || 'Active',
    createdAt: new Date().toISOString(),
    ...payload
  };
  save(KEY, [...items, item]);
  return item;
};

export const removeBooking = (id) => {
  const next = load(KEY).filter(b => b.id !== id);
  save(KEY, next);
};
