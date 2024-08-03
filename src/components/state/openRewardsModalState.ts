import { atom } from 'recoil';

interface RewardsModalState {
  open: boolean;
}

export const openRewardsModalState = atom<RewardsModalState>({
  key: 'openRewardsModalState',
  default: { open: false }
});
