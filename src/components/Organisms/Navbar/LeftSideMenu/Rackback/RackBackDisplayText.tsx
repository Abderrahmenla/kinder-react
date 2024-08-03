import { CircularProgress } from '@mui/material';
import { RakeSpanText, RakeSpanValue, RakeSpanValueContainer } from '../../NavBarStyles';
import { loyaltyData } from '@/hooks/types/loyaltyData';
import formatCurrency from '@/utils/formatUtils/formatCurrency';

type RakeBackDisplayTextType = {
  isLoadingLoyaltyDetails: boolean;
  loyaltyDetails?: loyaltyData;
};

export const RakeBackDisplayText = ({
  isLoadingLoyaltyDetails,
  loyaltyDetails
}: RakeBackDisplayTextType) => {
  return (
    <RakeSpanValueContainer>
      {isLoadingLoyaltyDetails ? (
        <CircularProgress size={11} />
      ) : (
        <>
          <RakeSpanText>Rakeback</RakeSpanText>
          <RakeSpanValue>{formatCurrency(loyaltyDetails?.pointsBalance)}</RakeSpanValue>
        </>
      )}
    </RakeSpanValueContainer>
  );
};
