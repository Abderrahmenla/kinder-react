import axios, { AxiosError } from 'axios';
import { assets } from '@/config/assets';
import { ErrorResponse } from '@/hooks/useAuthenticationForm';
import { logFetchError } from '@/utils/logFetchError';
import {
  FetchCategoryProps,
  GetCategoryDataFromRecoilProps,
  GetCategoryIconSrcProps,
  GetCategoryNameProps,
  GetGameCategoryIdProps
} from './GameCategorySwiper.types';

export const fetchCategoryData = async ({ levelId, isMobile }: FetchCategoryProps) => {
  try {
    const res = await axios.get('/api/lobby', {
      params: {
        levelId,
        portalId: isMobile ? 2 : 1,
        t: Date.now()
      }
    });

    return res.data[0];
  } catch (error) {
    logFetchError(error as AxiosError<ErrorResponse>);
    throw error;
  }
};

export const getCategoryDataFromRecoil = ({
  categoryId,
  categories
}: GetCategoryDataFromRecoilProps) =>
  categories.find((category) => Number(category.id) === Number(categoryId));

export const getCategoryId = ({ category, gameCategoryIds, isMobile }: GetGameCategoryIdProps) => {
  const desktopId = category?.CategoryIdDesktop ?? gameCategoryIds?.desktopId;
  const mobileId = category?.CategoryIdMobile ?? gameCategoryIds?.mobileId;
  return isMobile ? mobileId : desktopId;
};

export const getCategoryName = ({
  customCategoryName,
  category,
  selectedCategory
}: GetCategoryNameProps) => customCategoryName || category?.Name || selectedCategory?.name;

export const getCategoryIconSrc = ({ categoryName, category }: GetCategoryIconSrcProps) =>
  category?.Icon.data.attributes.url ||
  `${assets}/images/casino-categories/${categoryName?.replace(' ', '-').toLocaleLowerCase()}.svg`;
