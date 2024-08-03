import { PlayerLimit } from '@/components/state/limitState';

export enum LimitStatus {
  active = 'Active',
  pending = 'Pending',
  canceled = 'Canceled',
  expired = 'Expired'
}

export interface LimitType {
  limitType: 'Deposit' | 'TotalWager' | 'TotalLost';
}

export interface SelectedLimit {
  data: PlayerLimit;
  formattedAmount?: string;
  confirmation?: string | null;
  formattedTime?: string;
}

export interface GetFormattedDataProps {
  header: string;
  playerLimit: PlayerLimit;
  isMobile: boolean;
  handleOnClickDelete: (limit: SelectedLimit) => void;
}
