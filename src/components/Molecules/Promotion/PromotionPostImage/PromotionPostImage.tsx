import { PromotionPostImageStyle } from './PromotionPostImage.style';

interface PromotionPostImageProps {
  src: string;
  alt: string;
}

const PromotionPostImage: React.FC<PromotionPostImageProps> = ({ src, alt }) => (
  <span style={{ overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
    <PromotionPostImageStyle
      src={src}
      alt={alt}
      data-testid="promotion-caption-img"
      width={176}
      height={176}
    />
  </span>
);

export default PromotionPostImage;
