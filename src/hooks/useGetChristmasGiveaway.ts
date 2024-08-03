import { useState, useEffect } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { useLoader } from '@/hooks/useLoader';

interface PrizeData {
  day: string;
  isRevealed: boolean;
  prizeType: string;
}
export const useGetChristmasGiveaway = ({ playerId }: { playerId: string }) => {
  const [giveawayData, setGiveawayData] = useState<PrizeData[]>([]);
  const { toggleLoader, isLoading, loadingWrapper } = useLoader('coin');

  const fetchGiveawayData = async () => {
    toggleLoader(true);
    try {
      if (playerId) {
        const res = await apiClient.get(`/api/christmas-giveaway/${playerId}`);
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
