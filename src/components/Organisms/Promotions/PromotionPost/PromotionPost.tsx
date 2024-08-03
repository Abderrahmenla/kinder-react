import PromotionPostImage from '@/components/Molecules/Promotion/PromotionPostImage/PromotionPostImage';
import PromotionPostDetail from '@/components/Molecules/Promotion/PromotionPostDetail/PromotionPostDetail';
import { PromotionPostContainer, PromotionPostWrapper } from './PromotionPost.style';
import Link from 'next/link';

interface PromotionPostProps {
  banner: string;
  PromotionName: string;
  expirydate: string;
  slug: string;
}

const PromotionPost: React.FC<PromotionPostProps> = ({
  banner,
  PromotionName,
  expirydate,
  slug
}) => {
  return (
    <PromotionPostWrapper>
      <Link href={`/promotions/${slug}`}>
        <PromotionPostContainer data-testid="promotion-post-container">
          <PromotionPostImage src={banner} alt="alt" />
          <PromotionPostDetail
            slug={slug}
            PromotionName={PromotionName}
            expirydate={expirydate}
            data-testid="text-test"
          />
        </PromotionPostContainer>
      </Link>
    </PromotionPostWrapper>
  );
};

export default PromotionPost;
