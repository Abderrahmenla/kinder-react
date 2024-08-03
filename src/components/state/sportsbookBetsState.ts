import { atom } from 'recoil';

interface BetRecord {
  betSlipId: number;
  externalBetSlipId: string;
  playerId: number;
  betSlipDescription: string;
  insertDate: string;
  placedTime: string;
  generalStake: number;
  winAmount: number;
  status: string;
  statusId: string;
  settleTime: string;
}
export const sportsbookBetsState = atom<BetRecord[]>({
  key: 'sportsbookBetsState',
  default: []
});
