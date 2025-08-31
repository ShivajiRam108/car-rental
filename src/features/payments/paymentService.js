import { load, save } from '../../services/localDb';
const KEY = 'paymentMethods';
export const listPaymentMethods = () => load(KEY);
export const addPaymentMethod = (payload) => {
  const items = load(KEY);
  const item = { id: Date.now(), ...payload, createdAt: new Date().toISOString(), enabled: payload.enabled ?? true };
  save(KEY, [...items, item]);
  return item;
};
export const removePaymentMethod = (id) => save(KEY, load(KEY).filter(i => i.id !== id));
