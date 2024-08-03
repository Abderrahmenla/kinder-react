import axios, { AxiosResponse } from 'axios';
import { Pagination } from 'swiper/modules';
import { UnifiedBannerProps } from '@/graphql/types/bannersTypes';
import { BannerLink } from '@/components/Atoms/CarouselBanner/CarouselBanner.styles';
import { CasinoLobbyType, GameCategory } from '@/graphql/types/casinoLobbyTypes';
import getCategoryId from '../utils/getCategoryId';
import { CategoryGames, Game } from '@/pages/api/casino/casinoTypes';
import { transformUploadUrls } from './transformAssetsUtil';

export const formatLocale = (locale: string): string => {
  if (!locale) return 'en-NZ'; // default value

  const parts = locale.split('-');

  if (parts.length !== 2) {
    // console.warn(`Unexpected locale format received: ${locale}`);
    return 'en'; // default value or you can throw an error
  }

  const [language, region] = parts;
  return `${language}-${region.toUpperCase()}`;
};

export const navigateToGamePage = async (provider: string, gameName: string, router: any) => {
  // Replace spaces, colons, and "?" with dashes and a placeholder
  const formattedProvider = provider.toLowerCase().replace(/[\s:]/g, '-').replace(/-{2,}/g, '-');

  const formattedGameName = gameName
    .toLowerCase()
    .replace(/[\s:]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/\?/g, '¿');

  const url = `/casino/game/${formattedProvider}/${formattedGameName}`;

  await router.push(url);
};

export const fetchAllGamesCategory = async (
  isMobile: boolean
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(isMobile ? '/api/player-lobby' : '/api/lobby', {
    params: {
      portalId: isMobile ? 2 : 1,
      levelId: getCategoryId('All Games', isMobile)
    }
  });
};

export const getGameCategoryByName = (
  casinoCategories: CasinoLobbyType,
  categoryName: string
): GameCategory | undefined => {
  if (!casinoCategories) return;

  return casinoCategories?.GameCategories?.find(
    (category: GameCategory) => category.Name.toLowerCase() === categoryName.toLowerCase()
  );
};

export const searchGames = (allGames: CategoryGames | null, searchQuery: string): Game[] => {
  if (searchQuery.length < 3) return [];

  return (
    allGames?.gameMains?.filter((game: Game) =>
      game.name.toLowerCase().includes(searchQuery?.toLowerCase())
    ) ?? []
  );
};

export const carouselOptions = {
  spaceBetween: 15,
  slidesPerView: 3,
  draggable: true,
  modules: [Pagination],
  pagination: {
    clickable: true
  },
  zoom: false,
  breakpoints: {
    200: { slidesPerView: 1 },
    576: { slidesPerView: 3, spaceBetween: 15 }
  }
};

export const SliderContent = (asset: UnifiedBannerProps) => {
  return (
    <BannerLink
      href={`${asset?.attributes?.CTAValue}`}
      imageUrl={transformUploadUrls(asset?.attributes?.BackgroundImage?.data?.attributes?.url)}
    />
  );
};

export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let inDebounce: ReturnType<typeof setTimeout> | null;
  return function (...args: T) {
    if (inDebounce !== null) {
      clearTimeout(inDebounce);
    }
    inDebounce = setTimeout(() => func(...args), delay);
  };
};

export const isMobileViewport = () => {
  const mediaQuery = '(max-width: 768px)';

  return global?.window?.matchMedia(mediaQuery).matches;
};

export const getCategoryNameFromSlug = (slug: string) => {
  return slug.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, (char: string) => char.toUpperCase());
};

export const getCategoryIconUrl = (categoryId: string, casinoCategories: GameCategory[]) => {
  const matchedCategory = casinoCategories.find(
    (category: GameCategory) =>
      category.CategoryIdDesktop === categoryId || category.CategoryIdMobile === categoryId
  );

  return matchedCategory?.Icon?.data?.attributes?.url ?? null;
};

export const getCategoryNameFromCms = (categoryId: string, casinoCategories: GameCategory[]) => {
  const matchedCategory = casinoCategories.find(
    (category: GameCategory) =>
      category.CategoryIdDesktop === categoryId || category.CategoryIdMobile === categoryId
  );

  return matchedCategory?.Name ?? null;
};
