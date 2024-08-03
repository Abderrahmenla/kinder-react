// import FormGroupButton from '@/components/Molecules/Auth/FormButton';
import { ActiveRewardButton } from '@/components/Molecules/Rewards/ActiveRewardButton';
import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { Box } from '@mui/material';
import { useMemo } from 'react';
import BonusImage from './BonusImage';
import { assets } from '@/config/assets';
import { CardTypographyDescription, CardTypographyHeader } from './Card.style';

interface Props {
  promotionData: PlayerBonusesResponse;
  refetch: () => void;
}

export const RewardsCard = ({ promotionData, refetch }: Props) => {
  function bonusImage(promotion: PlayerBonusesResponse): string | null {
    if (!promotion.customContentList) return null;

    const bonusTypeContent = promotion.customContentList
      .find((item) => item.type === 'BonusType')
      ?.content?.trim();

    switch (bonusTypeContent) {
      case 'FreeSpin': {
        const extGameId = promotion.customContentList.find(
          (item) => item.type === 'ExtGameId'
        )?.content;
        return extGameId
          ? `https://images.spinbet.com/storage/games/${extGameId.toLowerCase()}.jpg/format=png?width=75`
          : null;
      }
      case 'Casino':
        return `${assets}/images/casino.png`;
      case 'Sportsbook':
        return `${assets}/images/sportsbook.png`;
      default:
        return null;
    }
  }
  const imageUrl = useMemo(() => bonusImage(promotionData), [promotionData]);
  return (
    <Box bgcolor="var(--dark-dark-1, #180C35)" borderRadius={2} p={1} height="186px">
      <Box>
        <Box display="flex" gap={2}>
          <Box>
            <BonusImage src={imageUrl || `${assets}/images/reward-placeholder.jpg`} />
          </Box>
          <Box
            my={1}
            sx={{
              position: 'relative'
            }}
          >
            <CardTypographyHeader>{promotionData?.promotionFriendlyName}</CardTypographyHeader>
            <CardTypographyDescription>{promotionData?.description}</CardTypographyDescription>
          </Box>
        </Box>
        <Box display="flex" justifyContent="end">
          {promotionData.promotionStatus !== 'OptedIn' &&
            promotionData.promotionStatus !== 'OptedOut' && (
              <ActiveRewardButton position="relative" refetch={refetch} promotion={promotionData} />
            )}
        </Box>
      </Box>
    </Box>
  );
};
