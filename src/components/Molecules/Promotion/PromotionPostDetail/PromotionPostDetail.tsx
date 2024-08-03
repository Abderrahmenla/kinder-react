import PromotionCaption from '../PromotionCaption/PromotionCaption';
import { PromotionPostDetailContainer } from './PromotionPostDetail.style';

interface PromotionPostDetailProps {
  PromotionName: string;
  expirydate: string;
  slug: string;
}

const PromotionPostDetail: React.FC<PromotionPostDetailProps> = ({ PromotionName, expirydate }) => {
  return (
    <PromotionPostDetailContainer>
      <PromotionCaption expirydate={expirydate} />
      <span>{PromotionName}</span>
    </PromotionPostDetailContainer>
  );
};

export default PromotionPostDetail;
