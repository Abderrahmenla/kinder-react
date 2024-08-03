import React from 'react';
import BonusImage from './BonusImage';
import {
  FirstTimeDepositCardContainer,
  FirstTimeDepositDescription,
  FirstTimeDepositDetailContainer,
  FirstTimeDepositMainTitle,
  FirstTimeDepositSubTitle
} from './Card.style';
import { ActiveRewardButton } from '@/components/Molecules/Rewards/ActiveRewardButton';
import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { Box } from '@mui/material';

interface FirstTimeBonusCardProps {
  mainTitle: string;
  subTitle: string;
  desc: string;
  image: string;
  promotion?: PlayerBonusesResponse;
  refetchPromotions: () => void;
}

const FirstTimeBonusCard: React.FC<FirstTimeBonusCardProps> = ({
  mainTitle,
  subTitle,
  desc,
  image,
  promotion,
  refetchPromotions
}) => {
  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <FirstTimeDepositMainTitle>{mainTitle}</FirstTimeDepositMainTitle>
      <FirstTimeDepositCardContainer>
        <div
          style={{
            width: '90px',
            height: '120px'
          }}
        >
          <BonusImage src={image} />
        </div>
        <FirstTimeDepositDetailContainer>
          <FirstTimeDepositSubTitle>{subTitle}</FirstTimeDepositSubTitle>
          <FirstTimeDepositDescription>{desc}</FirstTimeDepositDescription>
          <Box marginTop={6}>
            <ActiveRewardButton
              width="104px"
              height="28px"
              promotion={promotion}
              title="Activate"
              refetch={refetchPromotions}
              right="8px"
              bottom="8px"
            />
          </Box>
        </FirstTimeDepositDetailContainer>
      </FirstTimeDepositCardContainer>
    </div>
  );
};

export default FirstTimeBonusCard;
