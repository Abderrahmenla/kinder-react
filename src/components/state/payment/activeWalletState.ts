import { atom } from 'recoil';

export enum ActiveWallet {
  deposit = 'deposit',
  fiat = 'fiat',
  crypto = 'crypto',
  withdraw = 'withdraw',
  pending = 'pending'
}

type ActiveWalletStateDefault = {
  current: ActiveWallet;
  previous: ActiveWallet;
};

export const activeWalletState = atom<ActiveWalletStateDefault>({
  key: 'activeWalletState',
  default: {
    current: ActiveWallet.deposit,
    previous: ActiveWallet.deposit
  }
});
