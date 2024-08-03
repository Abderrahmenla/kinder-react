import { atom } from 'recoil';

export interface PlayerLimit {
  id: number;
  limitType: string;
  limitStatus: string;
  time: string;
  amountValue: number;
  amountLeft: number;
  locked: boolean;
  reason: string;
  dateCreated: string;
  dateActivated: string;
}

export const limitState = atom<PlayerLimit[]>({
  key: 'limitState',
  default: []
});
