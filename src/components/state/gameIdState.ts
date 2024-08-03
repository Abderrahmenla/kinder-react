import { atom } from 'recoil';

const localStorageKey = 'gameData';

const getInitialValue = () => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(localStorageKey);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

export const gameDataState = atom({
  key: 'gameDataState',
  default: getInitialValue(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(localStorageKey, JSON.stringify(newValue));
        }
      });
    }
  ]
});
