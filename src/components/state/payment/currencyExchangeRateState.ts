import { atom } from 'recoil';

type ExchangeRate = {
  fromCurrency?: string;
  toCurrency?: string;
  rate?: number;
};
export const currencyExchangeRateState = atom<ExchangeRate>({
  key: 'currencyExchangeRateState',
  default: {}
});
