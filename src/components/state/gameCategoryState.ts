import { atom, selector } from 'recoil';

export const categoriesState = atom({
  key: 'categoriesState',
  default: null
});

export const categoriesSelector = selector({
  key: 'categoriesSelector',
  get: ({ get }) => {
    const categories = get(categoriesState);
    return categories;
  }
});
