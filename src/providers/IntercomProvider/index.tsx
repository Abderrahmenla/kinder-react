import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
  hideDefaultLauncher
} from './intercom';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { PlayerData } from '@/hooks/types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { playerState } from '@/components/state/playerState';

export const IntercomProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isMobile = UseMediaQuery(768);
  const { isAuthenticated } = useRecoilValue(authState);
  const [userHash, setUserHash] = useState<string>('');
  const player = useRecoilValue<PlayerData | null>(playerState);
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/intercom-auth')
        .then((res) => res.json())
        .then((data) => {
          if (data.userHash) {
            setUserHash(data.userHash);
            setAuth((prev) => ({
              ...prev,
              token: data.token,
              playerId: data.userId
            }));
          }
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadIntercom();
      if (isAuthenticated && player) {
        bootIntercom({
          name: player.userName,
          email: player.eMail,
          user_id: player.id,
          user_hash: userHash,
          custom_attributes: {
            full_name: player.firstName + ' ' + player.lastName
          }
        });
      } else {
        bootIntercom(); // Boot without user information when logged out
      }
    }
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        updateIntercom();
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isAuthenticated, player, router.events, userHash]);

  useEffect(() => {
    if (isMobile) hideDefaultLauncher();
  }, [isMobile]);

  return <>{children}</>;
};
