import { atom } from 'recoil';

export const authenticationImages = atom({
  key: 'authenticationImages',
  default: { isFetched: false, images: [] }
});
