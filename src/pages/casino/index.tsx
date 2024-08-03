import { GetStaticProps } from 'next';
import client from '../../graphql/client';
import { GET_DEFAULT_SEO } from '@/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from '@/graphql/queries/pagesSeo';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  MainContainer,
  SearchContainerWrapper,
  GameListWrapper,
  LazyLoadWrapper
} from '@/components/Molecules/Casino/Casino.styles';
import Select from '@/components/Molecules/Casino/Select';
import axios, { AxiosError, AxiosResponse } from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  CategoryGames,
  Categories,
  Category,
  Providers,
  SingleProvider,
  SelectedGame
} from '@/pages/api/casino/casinoTypes';
import { FilterWrapperContainer } from '@/components/Molecules/Casino/Casino.styles';
import { ErrorResponse } from '@/pages/api/types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCategoryState } from '@/components/state/categoryState';
import { useLoader } from '@/hooks/useLoader';
import { GET_CASINO_BANNERS } from 'src/graphql/queries/banners';
import { UnifiedBannersDataType } from 'src/graphql/types/bannersTypes';
import { SeoContent } from '@/components/Templates/SeoContent';
import { categoriesState, categoriesSelector } from '@/components/state/gameCategoryState';
import {
  carouselOptions,
  debounce,
  formatLocale,
  isMobileViewport,
  SliderContent
} from '@/utils/gameUtils';
import { logFetchError } from '@/utils/logFetchError';
import { assets } from '@/config/assets';
import GameSearch from '@/components/Organisms/GameSearch/GameSearch';
import FavoriteGamesSection from '@/components/Organisms/FavoriteGamesSection/FavoriteGamesSwiper';
import RecentGamesSection from '@/components/Organisms/RecentGamesSection/FavoriteGamesSwiper';
import GameCategoriesSwiper from '@/components/Organisms/GameCategoriesList/GameCategoriesSwiper';
import useLazyLoad from '@/hooks/useLazyLoad';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import { CarouselBannerContainer } from '@/components/Atoms/CarouselBanner/CarouselBanner.styles';
import dynamic from 'next/dynamic';
import { GET_CASINO_CATEGORIES } from '@/graphql/queries/casinoLobby';
import { GameCategory } from '@/graphql/types/casinoLobbyTypes';
import useGameSearch from '@/hooks/useGameSearch';
import { authState } from '@/components/state/isAuthenticated';
import { GET_HORIZONTAL_CASINO_CATEGORIES } from '@/graphql/queries/casinoCategories';
import { getSidebarNav } from '@/utils/navigationUtils';
import { useFavoriteGames } from '@/hooks/useFavoriteGames';
import { useRecentGames } from '@/hooks/useRecentGames';
const GamePopup = dynamic(() => import('../../components/Molecules/Casino/GamePopup/GamePopup'));
const Filter = dynamic(() => import('../../components/Organisms/Filter/Filter'));
const SearchGamesComponent = dynamic(
  () => import('@/components/Atoms/InputIcon/SearchGamesComponent')
);

const Casino: React.FC<UnifiedBannersDataType> = ({
  simpleBanners,
  seo,
  casinoCategories,
  casinoHorizontalCategories
}) => {
  const router = useRouter();
  const [categoryGames, setCategoryGames] = useState<CategoryGames[]>([]);
  const [categories, setCategories] = useRecoilState<Categories[] | any>(categoriesState);
  const [providers, setProviders] = useState<Providers[] | any>([]);
  const [selectedCategory, setSelectedCategory] = useRecoilState<any>(selectedCategoryState);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const { isAuthenticated } = useRecoilValue(authState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const categoriesData = useRecoilValue(categoriesSelector);
  const [modalState, setModalState] = useState(false);
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null);
  const { favoriteGames, isFavorite, toggleFavorite } = useFavoriteGames();
  const isMobile = isMobileViewport();
  const { recentGames } = useRecentGames(isMobile);
  const seoRef = useRef<HTMLDivElement>(null);
  const [seoLoaded] = useLazyLoad(seoRef, 0);

  const { searchQuery, setSearchQuery, filteredGames, onSearchInputChange } = useGameSearch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoader(true);
        let res: AxiosResponse;

        const categoryIds =
          isMobile && casinoCategories
            ? casinoCategories.GameCategories.map(
                (category: GameCategory) => category.CategoryIdMobile
              )
            : casinoCategories.GameCategories.map(
                (category: GameCategory) => category.CategoryIdDesktop
              );

        const firstGroup = categoryIds.slice(0, 2);
        const secondGroup = categoryIds.slice(2);

        const fetchDataByCategory = async (categoryIds: []) => {
          for (const categoryId of categoryIds) {
            res = await axios.get('/api/lobby', {
              params: {
                portalId: isMobile ? 2 : 1,
                t: Date.now(),
                levelId: categoryId
              }
            });
            setCategoryGames((prevState) => [...prevState, ...res.data]);
          }
        };

        await fetchDataByCategory(firstGroup);

        const addProviderArray = () => {
          const providerCategory = {
            id: 'provider-category',
            name: 'Provider Category'
          };

          setCategoryGames((prevCategoryGames) => {
            const updatedCategoryGames = [...prevCategoryGames];
            updatedCategoryGames.splice(2, 0, providerCategory as CategoryGames);
            return updatedCategoryGames;
          });
        };

        addProviderArray();
        // @ts-ignore
        if (res.data && res?.data[0]?.gameMains) {
          const categoryGame = casinoCategories.Providers.map((provider: Providers) => provider);

          const providerArr = categoryGame
            .filter(
              (provider: SingleProvider, index: number, self: Array<SingleProvider>) =>
                index === self.findIndex((p) => p.Name === provider.Name)
            )
            .map((provider: SingleProvider) => provider.Name);

          providerArr.unshift('All Providers');

          setProviders(providerArr);
          toggleLoader(false);
        }
        const handleScroll = debounce(() => {
          if (window.scrollY > 100) {
            fetchDataByCategory(secondGroup);

            window.removeEventListener('scroll', handleScroll);
          }
        }, 0);

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
      } catch (error) {
        toggleLoader(false);
        logFetchError(error as AxiosError<ErrorResponse>);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!categoriesData) {
      setCategories(casinoHorizontalCategories.HorizontalMenu);
    }
  }, [categoriesData, setCategories]);

  useEffect(() => {
    setSelectedProvider('All Providers');
  }, []);

  useEffect(() => {
    setSelectedCategory('');
  }, []);

  const handleCategoryChange = (category: Category | string) => {
    setSelectedCategory(category);
    if (!category) {
      setSelectedProvider('All Providers');
    }
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  const handleProviderChange = (provider: string) => {
    if (provider !== 'All Providers') {
      setSelectedProvider(provider);
      router.push(`casino/provider/${provider.replace(/ /g, '-')}`);
    }
  };

  return (
    <>
      <GamePopup
        selectedGame={selectedGame}
        isFavorite={isFavorite}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
        isGameModal
        open={modalState}
        handleCloseModal={handleCloseModal}
        toggleFavorite={toggleFavorite}
      />
      <MainContainer>
        <CarouselBannerContainer>
          <CarouselBanner
            carouselOptions={carouselOptions}
            assets={simpleBanners}
            sliderContent={SliderContent}
          />
        </CarouselBannerContainer>
        <FilterWrapperContainer>
          <Filter
            categories={categories}
            onCategoryChange={handleCategoryChange}
            favoriteGames={favoriteGames && favoriteGames.length}
          />
          <SearchContainerWrapper>
            <Select
              providers={providers}
              onProviderChange={handleProviderChange}
              selectedProvider={selectedProvider}
            />
            <SearchGamesComponent
              value={searchQuery}
              onChange={onSearchInputChange}
              size={'md'}
              icon={`${assets}/images/icon-search.svg`}
              setSearchQuery={setSearchQuery}
              placeholder={'Search'}
            />
          </SearchContainerWrapper>
        </FilterWrapperContainer>
        {isLoading ? (
          loadingWrapper
        ) : (
          <>
            {searchQuery.length > 0 && (
              <GameSearch
                filteredGames={filteredGames}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                setModalState={setModalState}
              />
            )}
            {favoriteGames && favoriteGames.length > 0 && searchQuery.length < 1 && (
              <GameListWrapper>
                <FavoriteGamesSection
                  selectedCategory={selectedCategory}
                  favoriteGames={favoriteGames}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                  setModalState={setModalState}
                  setSelectedGame={setSelectedGame}
                />
              </GameListWrapper>
            )}
            {recentGames && recentGames.length > 0 && searchQuery.length < 1 && (
              <GameListWrapper>
                <RecentGamesSection
                  selectedCategory={selectedCategory}
                  recentGames={recentGames}
                  setModalState={setModalState}
                  setSelectedGame={setSelectedGame}
                />
              </GameListWrapper>
            )}
            {searchQuery.length < 1 && (
              <GameCategoriesSwiper
                categoryGames={categoryGames}
                selectedCategory={selectedCategory}
                isAuthenticated={isAuthenticated}
                isFavorite={isFavorite}
                setModalState={setModalState}
                setSelectedGame={setSelectedGame}
                providers={providers}
                toggleFavorite={toggleFavorite}
                casinoCategoriesData={casinoCategories.GameCategories}
              />
            )}
            {seo?.SeoText && !isAuthenticated && (
              <LazyLoadWrapper ref={seoRef} isVisible={seoLoaded}>
                {seoLoaded && <SeoContent seo={seo} />}
              </LazyLoadWrapper>
            )}
          </>
        )}
      </MainContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en-nz');
  const { data: bannersData } = await client.query({
    query: GET_CASINO_BANNERS,
    variables: { locale: formattedLocale }
  });
  const simpleBanners = bannersData.banners.data;

  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data.defaultSeo.data;

  const { data: casinoSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: '/casino', locale: formattedLocale }
  });
  const seo = casinoSeo.pages.data;

  const { data: lobbyCategories } = await client.query({
    query: GET_CASINO_CATEGORIES,
    variables: { locale: formattedLocale }
  });

  const { data: horizontalCategories } = await client.query({
    query: GET_HORIZONTAL_CASINO_CATEGORIES,
    variables: { locale: formattedLocale }
  });
  const casinoCategories = lobbyCategories.casinoLobby.data.attributes;
  const casinoHorizontalCategories = horizontalCategories.casinoLobby.data.attributes;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      simpleBanners,
      casinoCategories,
      casinoHorizontalCategories,
      sidebar
    }
  };
};

export default Casino;
