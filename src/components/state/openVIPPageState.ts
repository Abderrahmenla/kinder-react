import { atom } from 'recoil';

interface VIPPageState {
  open: boolean;
}

export const openVIPPageState = atom<VIPPageState>({
  key: 'openVIPPPageState',
  default: { open: false }
});
