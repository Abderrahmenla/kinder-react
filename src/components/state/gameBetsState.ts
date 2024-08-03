import { atom } from 'recoil';

interface GameRecord {
  id: string;
  name: string;
  start: string;
  stop: string;
  stake: number;
  won: number;
  summary: string | null;
  status: string;
  productType: string;
  externalGameId: string;
  productId: number;
  productName: string;
  productSupplier: string;
}
export const gameBetsState = atom<GameRecord[]>({
  key: 'gameBetsState',
  default: []
});
