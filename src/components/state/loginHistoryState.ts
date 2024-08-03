import { atom } from 'recoil';

interface HistoryRecord {
  logonTime: string;
  logoutTime: string | null;
  clientIp: string;
  realClientIp: string | null;
  countryCode: string;
  status: string;
}

export const loginHistoryState = atom<HistoryRecord[]>({
  key: 'loginHistoryState', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});
