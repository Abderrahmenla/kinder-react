import { loyaltyData } from '@/hooks/types/loyaltyData';
import { atom } from 'recoil';

export const loyaltyState = atom<loyaltyData | undefined>({
  key: 'loyaltyState',
  default: undefined
});
