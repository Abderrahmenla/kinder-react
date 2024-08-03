import { ENV_SCREEN_CATEGORY_IDS } from '../constants';

const getCategoryId = (categoryName: string, isMobile: boolean) => {
  const categoryIds = ENV_SCREEN_CATEGORY_IDS.get(categoryName);
  const { mobileId, desktopId } = categoryIds || {};
  return isMobile ? mobileId : desktopId;
};

export default getCategoryId;
