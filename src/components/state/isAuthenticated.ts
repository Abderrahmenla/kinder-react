import { AuthState } from '@/hooks/types';
import { atom } from 'recoil';

export const authState = atom<AuthState>({
  key: 'authState',
  default: { isAuthenticated: false, token: null, username: null, playerId: null }
});
