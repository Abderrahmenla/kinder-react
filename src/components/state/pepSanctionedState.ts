import { atom } from 'recoil';
import { PepSanctionedProps } from '../Molecules/PepSanctionConfirmationPopup/PepSanctionConfirmationPopup.type';

export const pepSanctionedState = atom<PepSanctionedProps | null>({
  key: 'pepSanctionedState',
  default: null
});
