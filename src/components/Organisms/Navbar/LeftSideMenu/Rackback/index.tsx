import { loyaltyData } from '@/hooks/types/loyaltyData';
import { RakebackMobile } from './RackbackMobile';
import { RakebackDesktop } from './RakebackDesktop';

type RakebackType = {
  isAuthenticated: boolean;
  isLoadingLoyaltyDetails: boolean;
  loyaltyDetails?: loyaltyData;
  isRakeBack: boolean;
  isMobile: boolean;
  handleSetRakeback: () => void;
  claimRewards: () => void;
  claimButtonLoading: boolean;
};

export const Rakeback = ({
  isAuthenticated,
  isLoadingLoyaltyDetails,
  loyaltyDetails,
  isRakeBack,
  isMobile,
  claimRewards,
  handleSetRakeback,
  claimButtonLoading
}: RakebackType) => (
  <>
    {isMobile && isAuthenticated ? (
      <RakebackMobile
        isRakeback={isRakeBack}
        loyaltyDetails={loyaltyDetails}
        isLoadingLoyaltyDetails={isLoadingLoyaltyDetails}
        claimButtonLoading={claimButtonLoading}
        claimRewards={claimRewards}
        handleSetRakeback={handleSetRakeback}
      />
    ) : (
      <RakebackDesktop
        loyaltyDetails={loyaltyDetails}
        isLoadingLoyaltyDetails={isLoadingLoyaltyDetails}
        isAuthenticated={isAuthenticated}
        claimButtonLoading={claimButtonLoading}
        claimRewards={claimRewards}
        handleSetRakeback={handleSetRakeback}
      />
    )}
  </>
);
