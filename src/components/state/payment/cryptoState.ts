import { atom } from 'recoil';

export type Crypto = {
  code?: string;
  depositFee?: number;
  fiat?: boolean;
  icon?: string;
  id?: number;
  name?: string;
  options?: {
    transaction?: null | string;
    confirmations?: number;
    explorer?: null | string;
    address?: null | string;
  };
  pricePrecision?: number;
  protocols?: any[];
  quantityPrecision?: number;
  supportsDeposits?: boolean;
  supportsWithdrawals?: boolean;
  withdrawalFee?: number;
  withdrawalParameters?: any[];
};

export type Channel = {
  channelUUID?: string;
  payCurrency?: string;
  address?: string;
  tag?: null | string;
  protocol?: string;
  redirectUrl?: string;
  uri?: string;
};

export type CryptoState = {
  cryptoListState: Crypto[];
  selectedCrypto: Crypto;
  channels: Channel[];
  selectedChannel: Channel | null;
};

export const cryptoState = atom<CryptoState>({
  key: 'cryptoState',
  default: {
    cryptoListState: [],
    selectedCrypto: {},
    channels: [],
    selectedChannel: null
  }
});
