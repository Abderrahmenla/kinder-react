import { PromotionProps } from 'src/graphql/types/promotionTypes';
import PromotionPostInformations from '../../../Organisms/Promotions/PromotionPostInformations/PromotionPostInformations';
import { PromotionInformationWrapper } from './PromotionsInformation.style';
interface PromotionInformationProps {
  selectedPromotion: PromotionProps;
}
const PromotionsInformation: React.FC<PromotionInformationProps> = ({ selectedPromotion }) => {
  const { attributes } = selectedPromotion;
  const {
    Body,
    ExpiryDate,
    Banner,
    CountdownTitle,
    CountdownDate,
    GamesCategoryDesktopID: desktopId,
    GamesCategoryMobileID: mobileId
  } = attributes;
  return (
    <PromotionInformationWrapper>
      <PromotionPostInformations
        banner={Banner}
        body={Body}
        expirydate={ExpiryDate}
        countdownTitle={CountdownTitle}
        countdownDate={CountdownDate}
        promoGameCategoryIds={{ mobileId, desktopId }}
      />
    </PromotionInformationWrapper>
  );
};
export default PromotionsInformation;
