import { useState, useEffect } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { useLoader } from '@/hooks/useLoader';

interface EggData {
  eggId: string;
  isBonus: boolean;
  isClicked: boolean;
}
export const useGetEasterGiveaway = ({ playerId }: { playerId: string }) => {
  const [giveawayData, setGiveawayData] = useState<EggData[]>([]);
  const { toggleLoader, isLoading, loadingWrapper } = useLoader('coin');

  const fetchGiveawayData = async () => {
    toggleLoader(true);
    try {
      if (playerId) {
        const res = await apiClient.get(`/api/easter-giveaway/${playerId}`);
        setGiveawayData(res.data);
        toggleLoader(false);
      }
    } catch (error) {
      console.error(error);
      toggleLoader(false);
    }
  };

  useEffect(() => {
    if (playerId) {
      fetchGiveawayData();
    }
  }, [playerId]);

  return { giveawayData, fetchGiveawayData, toggleLoader, isLoading, loadingWrapper };
};
