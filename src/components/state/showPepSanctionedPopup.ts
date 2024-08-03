import { atom } from 'recoil';

export const showPepSanctionedPopupState = atom<boolean>({
  key: 'showPepSanctionedPopupState',
  default: false
});
