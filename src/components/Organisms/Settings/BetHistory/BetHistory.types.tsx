import { SerializedStyles } from '@emotion/react';
import { CopiedValue } from '@/hooks/useCopyToClipboard';

export interface CasinoBet {
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

export interface SportsBet {
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

export interface BetHistoryTable {
  isMobile?: boolean;
  headers: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  copiedText: CopiedValue;
  getCopyToClipboardButton: (
    textToCopy: string,
    { isCopied }: { isCopied: boolean }
  ) => JSX.Element;
  getTranslation: (key: string) => string;
}

export interface StatusStyles {
  border?: SerializedStyles;
  color?: SerializedStyles;
}
