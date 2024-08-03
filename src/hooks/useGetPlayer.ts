import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { apiClient } from 'src/services/clientAxios';
import { playerState } from '@/components/state/playerState';
import { authState } from '@/components/state/isAuthenticated';

export const useGetPlayer = () => {
  const [player, setPlayer] = useRecoilState(playerState);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useRecoilValue(authState);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPlayerData = async () => {
        try {
          setIsLoading(true);
          const response = await apiClient.get('/api/player/getPlayer');
          setIsLoading(false);
          setPlayer(response.data.player);
          Cookies.set('playerCurrencyCode', response.data.player?.currencyCode);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPlayerData();
    }
  }, [setPlayer, isAuthenticated]);

  return { player, setPlayer, isLoading };
};
