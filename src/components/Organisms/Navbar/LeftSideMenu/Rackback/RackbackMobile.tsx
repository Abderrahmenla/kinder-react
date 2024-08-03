import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import Image from 'next/image';
import {
  RackbackDialogBodyContainer,
  RackbackDialogBodyDisplayText,
  RackbackDialogHeader,
  RakeClaimButton,
  dialogBodyStyle
} from '../../NavBarStyles';
import { loyaltyData } from '@/hooks/types/loyaltyData';
import { RakeBackDisplayText } from './RackBackDisplayText';
import { assets } from '@/config/assets';
import { CircularProgress } from '@mui/material';

type RakebackDialogBodyType = {
  isLoadingLoyaltyDetails: boolean;
  loyaltyDetails?: loyaltyData;
  claimRewards: () => void;
  claimButtonLoading: boolean;
};
type RakebackMobileType = {
  isLoadingLoyaltyDetails: boolean;
  loyaltyDetails?: loyaltyData;
  handleSetRakeback: () => void;
  claimRewards: () => void;
  isRakeback: boolean;
  claimButtonLoading: boolean;
};
const RakebackDialogBody = ({
  isLoadingLoyaltyDetails,
  loyaltyDetails,
  claimRewards,
  claimButtonLoading
}: RakebackDialogBodyType) => {
  const isGreaterThanZero = loyaltyDetails && loyaltyDetails?.pointsBalance > 0;
  return (
    <RackbackDialogBodyContainer>
      <RackbackDialogBodyDisplayText>
        <RakeBackDisplayText
          isLoadingLoyaltyDetails={isLoadingLoyaltyDetails}
          loyaltyDetails={loyaltyDetails}
        />
        <Image src={`${assets}/images/rake.png`} width={32} height={32} alt="Coins" />
      </RackbackDialogBodyDisplayText>
      <RakeClaimButton
        disabled={!isGreaterThanZero}
        showIcon={false}
        handleClick={() => claimRewards()}
      >
        {claimButtonLoading ? <CircularProgress size={11} /> : 'Claim'}
      </RakeClaimButton>
    </RackbackDialogBodyContainer>
  );
};
const RakebackDialogHeader = () => {
  return <div>Rakeback</div>;
};

export const RakebackMobile = ({
  isLoadingLoyaltyDetails,
  loyaltyDetails,
  claimRewards,
  claimButtonLoading,
  handleSetRakeback,
  isRakeback
}: RakebackMobileType) => (
  <Dialog
    bodyContent={() =>
      RakebackDialogBody({
        isLoadingLoyaltyDetails,
        loyaltyDetails,
        claimRewards,
        claimButtonLoading
      })
    }
    headerContent={RakebackDialogHeader}
    headerDivider
    dialogHeaderStyle={RackbackDialogHeader}
    dialogBodyStyle={dialogBodyStyle}
    onClose={handleSetRakeback}
    open={isRakeback}
  />
);
