import Image from 'next/image';
import {
  IconRakebackOpenHeaderContainer,
  RakeClaimButton,
  RakebackContainer
} from '../../NavBarStyles';
import { CircularProgress } from '@mui/material';
import { loyaltyData } from '@/hooks/types/loyaltyData';
import { assets } from '@/config/assets';
import { RakeBackDisplayText } from './RackBackDisplayText';

type RakebackNavType = {
  isAuthenticated: boolean;
  isLoadingLoyaltyDetails: boolean;
  loyaltyDetails?: loyaltyData;
  handleSetRakeback: () => void;
  claimRewards: () => void;
  claimButtonLoading: boolean;
};

export const RakebackDesktop = ({
  isAuthenticated,
  isLoadingLoyaltyDetails,
  loyaltyDetails,
  claimRewards,
  handleSetRakeback,
  claimButtonLoading
}: RakebackNavType) => {
  const isGreaterThanZero = loyaltyDetails && loyaltyDetails?.pointsBalance > 0;

  return (
    <RakebackContainer isVisible={isAuthenticated}>
      <RakeBackDisplayText
        isLoadingLoyaltyDetails={isLoadingLoyaltyDetails}
        loyaltyDetails={loyaltyDetails}
      />
      <RakeClaimButton
        height={36}
        width={62}
        disabled={!isGreaterThanZero}
        showIcon={false}
        handleClick={() => claimRewards()}
      >
        {claimButtonLoading ? <CircularProgress size={11} /> : 'Claim'}
      </RakeClaimButton>
      <IconRakebackOpenHeaderContainer
        isAuthenticated={isAuthenticated}
        onClick={handleSetRakeback}
      >
        <Image src={`${assets}/images/rake.png`} width={24} height={24} alt="Coins" />
      </IconRakebackOpenHeaderContainer>
    </RakebackContainer>
  );
};
