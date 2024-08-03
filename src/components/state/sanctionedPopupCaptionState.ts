import { atom } from 'recoil';

export const sanctionedPopupCaptionState = atom<string>({
  key: 'sanctionedPopupCaptionState',
  default: ''
});
