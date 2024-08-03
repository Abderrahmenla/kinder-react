import { atom } from 'recoil';
import { VerificationImages } from '../Molecules/Payment/FirstTimeDeposit/FirstTimeDeposit.type';

export const verificationImage = atom({
  key: 'verificationImage',
  default: { isFetched: false, images: [] as VerificationImages[] }
});
