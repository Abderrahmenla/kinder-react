import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { useState, useEffect } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { firstTimeBonusCountState } from '@/components/state/firstTimeBonusCountState';
import { authState } from '@/components/state/isAuthenticated';

export const useGetFirstTimeBonuses = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [promotions, setPromotions] = useState<PlayerBonusesResponse[]>([]);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const setFirstTimeBonusCount = useSetRecoilState(firstTimeBonusCountState);

  const refetchPromotions = () => {
    setPromotions([]);
    setFetchCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/api/rewards/player/promotions');

        const hasOptedInPromotionInLevel = (
          level: string,
          promotionsList: PlayerBonusesResponse[]
        ) => {
          return promotionsList.some((promo) => {
            return (
              promo.customContentList?.some(
                (content) => content.type === 'Level' && content.content === level
              ) && promo.promotionStatus === 'OptedIn'
            );
          });
        };

        const promotions = res.data
          .map((promotion: PlayerBonusesResponse) => {
            if (!promotion.customContentList) return null;

            const bonusPromotions = promotion.customContentList.filter(
              (item) => item.content === 'DepositBonus'
            );

            const levelContent = promotion.customContentList.find((item) => item.type === 'Level');
            const level = levelContent ? levelContent.content : null;

            if (bonusPromotions.length === 0) return null;
            if (level && hasOptedInPromotionInLevel(level, res.data)) return null;

            return promotion;
          })
          .filter(
            (promotion: PlayerBonusesResponse) =>
              promotion !== null && promotion.promotionStatus !== 'OptedIn'
          );

        setFirstTimeBonusCount(promotions.length);
        setPromotions(promotions);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [isAuthenticated, fetchCounter, setFirstTimeBonusCount]);

  return { promotions, refetchPromotions, loading };
};
