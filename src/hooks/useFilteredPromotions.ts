import { GET_ALL_PROMOTIONS } from '@/graphql/queries/promotions';
import client from '@/graphql/client';

interface PromotionAttributes {
  Banner: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  ShortDescription: string;
  PromotionName: string;
  ExpiryDate: string;
  Slug: string;
  Icon: string;
}

export interface Promotion {
  id: number;
  attributes: PromotionAttributes;
}

const findPromotionById = (
  promotions: Promotion[] | undefined,
  id: number
): Promotion | undefined => {
  return promotions?.find((promotion) => promotion.id === id);
};

export const useFilteredPromotions = async (id: number): Promise<Promotion | null> => {
  try {
    const { data } = await client.query({ query: GET_ALL_PROMOTIONS });
    const promotion = findPromotionById(data.promotions?.data, id);
    return promotion || null;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return null;
  }
};
