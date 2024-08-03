/* eslint-disable no-console */
import { RewardsEmptyState } from '@/components/Molecules/Rewards/EmptyState';
import { Box } from '@mui/material';
import { RewardsCard } from './RewardCard';
import { PlayerBonusHistory, PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { useTranslations } from '@/hooks/useTranslations';

interface Props {
  data?: Array<PlayerBonusHistory>;
  promotions?: Array<PlayerBonusesResponse>;
  refetch: () => void;
}

const RewardsComponent = ({ promotions, refetch }: Props) => {
  const { t } = useTranslations();
  const filterPromotions = (promotions: PlayerBonusesResponse[]) => {
    if (!promotions) return [];

    const optedInPromotions = new Set<string>();
    let filteredPromotions = promotions.filter((promo) => {
      const hasExcludedPromoTypes = promo.customContentList?.some(
        (item) =>
          item.type === 'PromotionGroup' &&
          ['PromoCode', 'Christmas', 'Easter'].includes(item.content)
      );
      if (hasExcludedPromoTypes) return false;

      if (promo.promotionStatus === 'OptedIn') {
        const level = promo.customContentList?.find((item) => item.type === 'Level')?.content;
        if (level) optedInPromotions.add(level);
        return false;
      }

      return true;
    });

    const levelsWithActivePromotion = new Set<string>();

    filteredPromotions.forEach((promo) => {
      const level = promo.customContentList?.find((item) => item.type === 'Level')?.content;
      if (promo.promotionStatus === 'OptedIn' && level) {
        levelsWithActivePromotion.add(level);
      }
    });

    filteredPromotions = filteredPromotions.filter((promo) => {
      const level = promo.customContentList?.find((item) => item.type === 'Level')?.content;
      return !level || !optedInPromotions.has(level) || promo.promotionStatus === 'OptedIn';
    });

    return filteredPromotions;
  };

  const eligiblePromotions = filterPromotions(promotions || []);
  return (
    <>
      {eligiblePromotions && eligiblePromotions.length ? (
        eligiblePromotions.map((promotion) => (
          <Box mt={1} key={promotion.bonusName}>
            <RewardsCard refetch={refetch} promotionData={promotion} />
          </Box>
        ))
      ) : (
        <RewardsEmptyState
          description={promotions ? t('noBonusesCurrentlyAvailable') : t('anErrorOccured')}
        />
      )}
    </>
  );
};

export default RewardsComponent;
