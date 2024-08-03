import { atom } from 'recoil';

export interface PromotionState {
  open: boolean;
  promotionId?: number | null;
}

export const openPromotionsState = atom<PromotionState>({
  key: 'openPromotionsState',
  default: { open: false, promotionId: 0 }
});
