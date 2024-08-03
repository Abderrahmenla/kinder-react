import { PromotionImageProps } from '@/graphql/types/promotionTypes';
import { GameCategoryIds } from '@/components/Organisms/GameCategorySwiper/GameCategorySwiper.types';

export interface PromotionPostDetailProps {
  banner: PromotionImageProps;
  body: string;
  expirydate: string;
  countdownDate: string;
  promoGameCategoryIds: GameCategoryIds;
  countdownTitle: string;
}
