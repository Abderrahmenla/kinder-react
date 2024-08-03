import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { gameBetsState } from '@/components/state/gameBetsState';
import { limitState } from '@/components/state/limitState';
import { openProfileState } from '@/components/state/openProfileState';
import { sportsbookBetsState } from '@/components/state/sportsbookBetsState';
import { handleCleanUpUnibo } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';
import { loginHistoryState } from '@/components/state/loginHistoryState';
import { pepSanctionedState } from '@/components/state/pepSanctionedState';
import { playerState } from '@/components/state/playerState';
import { handleRemoveAltenarToken } from '@/utils/alternarUtils';

const useLogout = () => {
  const router = useRouter();
  const setAuthState = useSetRecoilState(authState);
  const setLimits = useSetRecoilState(limitState);
  const setBets = useSetRecoilState(sportsbookBetsState);
  const setGames = useSetRecoilState(gameBetsState);
  const setLoginHistory = useSetRecoilState(loginHistoryState);
  const setProfileIsExtended = useSetRecoilState(openProfileState);
  const setPepSanctioned = useSetRecoilState(pepSanctionedState);
  const setPlayer = useSetRecoilState(playerState);

  const clearCookies = useCallback(() => {
    [
      'sessionToken',
      'logonTime',
      'playerId',
      'jwt',
      'username',
      'renewalToken',
      'userHash',
      'registrationDate',
      'playerCurrencyCode'
    ].forEach((cookie) => Cookies.remove(cookie));
  }, []);

  const logout = useCallback(() => {
    setPepSanctioned(null);
    setPlayer(null);
    router.push('/');
    clearCookies();
    setAuthState({ isAuthenticated: false, username: null, token: null, playerId: null });
    handleRemoveAltenarToken();
    handleCleanUpUnibo();
    setProfileIsExtended(false);
    setLimits([]);
    setBets([]);
    setGames([]);
    setLoginHistory([]);
  }, [clearCookies, setAuthState, router, setPepSanctioned, setPlayer]);

  return { logout };
};

export default useLogout;
