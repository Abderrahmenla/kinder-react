export interface PendingWithdrawalProps {
  t: (key: string) => string;
  onClickBack: () => void;
}

export interface PendingWithdrawalState {
  showDialog: boolean;
  transactionId: string | null;
}

export interface PendingWithdrawalsCardDataProps {
  label: string;
  value: string | undefined;
  alignRight?: boolean;
  fullWidth?: boolean;
  lastItem?: boolean;
  color?: string;
}

export type GetToastMessageResponse = {
  message: string;
  type: 'success' | 'error' | undefined;
};
