import { ActiveWallet } from '@/state/payment/activeWalletState';

export type DepositMethodsProps = {
  onClick: (activeWallet: ActiveWallet) => void;
};
