import { useRouter } from 'next/router';
import React, { lazy, useEffect, useState } from 'react';
import {
  FilterWrapperContainer,
  MainContainer,
  SearchContainerWrapper
} from '@/components/Molecules/Casino/Casino.styles';
import Select from '@/components/Molecules/Casino/Select';
import {
  Categories,
  Category,
  FavoriteGame,
  Providers,
  SelectedGame,
  SingleProvider
} from '@/pages/api/casino/casinoTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCategoryState } from '@/components/state/categoryState';
import { apiClient } from '@/services/clientAxios';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/pages/api/types';
import { SingleGameWrapper } from '@/components/Molecules/Casino/SingleGameWrapper/SingleGame.style';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '../../graphql/client';
import { GET_DEFAULT_SEO } from '@/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from '@/graphql/queries/pagesSeo';
import { useLoader } from '@/hooks/useLoader';
import { UnifiedBannersDataType } from 'src/graphql/types/bannersTypes';
import { GET_CASINO_BANNERS } from 'src/graphql/queries/banners';
import { lobbyDataState } from '@/components/state/gameState';
import { categoriesSelector, categoriesState } from '@/components/state/gameCategoryState';
import { carouselOptions, formatLocale, isMobileViewport, SliderContent } from '@/utils/gameUtils';
import { logFetchError } from '@/utils/logFetchError';
import { assets } from '@/config/assets';
import GameSearch from '@/components/Organisms/GameSearch/GameSearch';
import CategoryGamesList from '@/components/Organisms/CategoryGamesList/CategoryGamesList';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import { CarouselBannerContainer } from '@/components/Atoms/CarouselBanner/CarouselBanner.styles';
import { GET_CASINO_CATEGORIES } from '@/graphql/queries/casinoLobby';
import { useFavoriteGames } from '@/hooks/useFavoriteGames';
import useGameSearch from '@/hooks/useGameSearch';
import SearchGamesComponent from '@/components/Atoms/InputIcon';
import { authState } from '@/components/state/isAuthenticated';
import { GET_HORIZONTAL_CASINO_CATEGORIES } from '@/graphql/queries/casinoCategories';
import { getDefaultCasinoCategoryIds, getSidebarNav } from '@/utils/navigationUtils';
import dynamic from 'next/dynamic';

const GamePopup = lazy(() => import('../../components/Molecules/Casino/GamePopup/GamePopup'));
const Filter = lazy(() => import('../../components/Organisms/Filter/Filter'));
const FavoriteGamesList = dynamic(
  () => import('@/components/Organisms/FavoritesGamesList/FavoriteGamesList')
);
const SeoContent = dynamic(() =>
  import('@/components/Templates/SeoContent').then((mod) => mod.SeoContent)
);

const GamePage: React.FC<UnifiedBannersDataType> = ({
  simpleBanners,
  seo,
  casinoCategories,
  casinoHorizontalCategories,
  defaultCasinoCategoryData
}) => {
  const router = useRouter();
  const { categoryName } = router.query;
  const [categoryGames, setCategoryGames] = useRecoilState(lobbyDataState);
  const [categories, setCategories] = useRecoilState<Categories | any>(categoriesState);
  const [providers, setProviders] = useState<Providers[] | any>([]);
  const [selectedCategory, setSelectedCategory] = useRecoilState<any>(selectedCategoryState);
  const [gameLimit, setGameLimit] = useState<number>(28); // Number of games to display initially
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const { isAuthenticated } = useRecoilValue(authState);
  const categoriesData = useRecoilValue(categoriesSelector);
  const [modalState, setModalState] = useState(false);
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null);
  const { favoriteGames, isFavorite, toggleFavorite } = useFavoriteGames();
  const isMobile = isMobileViewport();

  const { searchQuery, setSearchQuery, filteredGames, onSearchInputChange } = useGameSearch();

  const findCategoryByDesktopId = (categoryName: string) => {
    const category = casinoCategories.GameCategories.find(
      (cat: any) => cat.Name.toLowerCase() === categoryName.toLowerCase()
    );

    if (category) {
      if (isMobile) {
        return category.CategoryIdMobile;
      } else {
        return category.CategoryIdDesktop;
      }
    }

    return null;
  };

  useEffect(() => {
    if (categoryName && casinoCategories) {
      const selectedCategoryId = defaultCasinoCategoryData
        ? isMobile
          ? defaultCasinoCategoryData.mobileCategoryID
          : defaultCasinoCategoryData.desktopCategoryID
        : findCategoryByDesktopId(
            categoryName
              .toString()
              .replace(/-/g, ' ')
              .replace(/(?:^|\s)\S/g, (char: string) => char.toUpperCase())
          );

      const fetchData = async () => {
        try {
          toggleLoader(true);
          let res;
          if (isMobile) {
            res = await apiClient.get('/api/player-lobby', {
              params: { portalId: 2, t: Date.now(), levelId: selectedCategoryId }
            });
          } else {
            res = await apiClient.get('/api/lobby', {
              params: { portalId: 1, t: Date.now(), levelId: selectedCategoryId }
            });
          }
          setCategoryGames(res.data);
          if (res.data && res.data[0]?.gameMains) {
            const categoryGame = casinoCategories.Providers.map((provider: Providers) => provider);
            const providerArr = categoryGame
              .filter(
                (provider: SingleProvider, index: number, self: Array<SingleProvider>) =>
                  index === self.findIndex((p) => p.Name === provider.Name)
              )
              .map((provider: SingleProvider) => provider.Name);

            providerArr.unshift('All Providers');
            setProviders(providerArr);
          }
        } catch (error) {
          logFetchError(error as AxiosError<ErrorResponse>);
        } finally {
          toggleLoader(false);
        }
      };
      fetchData();
    } else {
      setCategoryGames(categoryGames);
      const categoryGame = casinoCategories.Providers.map((provider: Providers) => provider);
      const providerArr = categoryGame
        .filter(
          (provider: SingleProvider, index: number, self: Array<SingleProvider>) =>
            index === self.findIndex((p) => p.Name === provider.Name)
        )
        .map((provider: SingleProvider) => provider.Name);

      setProviders(providerArr);
      toggleLoader(false);

      providerArr.unshift('All Providers');
    }
  }, [isAuthenticated, casinoCategories]);

  useEffect(() => {
    if (!categoriesData) {
      setCategories(casinoHorizontalCategories.HorizontalMenu);
    }
  }, [categoriesData, setCategories]);

  useEffect(() => {
    setSelectedProvider('All Providers');
  }, []);

  const handleProviderChange = (provider: string) => {
    if (provider !== 'All Providers') {
      setSelectedProvider(provider);
      router.push(`/casino/provider/${provider.replace(/ /g, '-')}`);
    }
  };

  const handleShowMore = () => {
    setGameLimit((prevLimit) => prevLimit + 28);
  };

  const handleCategoryChange = (category: Category | string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (categoryName) {
      const formattedCategory = categoryName
        .toString()
        .replace(/-/g, ' ')
        .replace(/(?:^|\s)\S/g, (char: string) => char.toUpperCase());
      setSelectedCategory(formattedCategory);
    }
  }, [categoryName, setSelectedCategory]);

  const handleCloseModal = () => {
    setModalState(false);
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
            categoryName={categoryName}
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
        {isLoading && loadingWrapper}
        <>
          {searchQuery.length > 0 && (
            <GameSearch
              filteredGames={filteredGames}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              setModalState={setModalState}
            />
          )}
        </>

        {searchQuery.length < 1 && (
          <>
            {selectedCategory === 'Favorites' ? (
              <SingleGameWrapper>
                {favoriteGames.map((favoriteGame: FavoriteGame, index: number) => (
                  <FavoriteGamesList
                    index={index}
                    key={index}
                    favoriteGame={favoriteGame}
                    isAuthenticated={isAuthenticated}
                    isFavorite={isFavorite}
                    setModalState={setModalState}
                    toggleFavorite={toggleFavorite}
                    setSelectedGame={setSelectedGame}
                  />
                ))}
              </SingleGameWrapper>
            ) : (
              <SingleGameWrapper>
                {categoryGames &&
                  categoryGames.length > 0 &&
                  categoryGames
                    .filter((item) => item.name === selectedCategory)
                    .map((item) => (
                      <CategoryGamesList
                        key={item.name}
                        handleShowMore={handleShowMore}
                        gameLimit={gameLimit}
                        isFavorite={isFavorite}
                        setModalState={setModalState}
                        setSelectedGame={setSelectedGame}
                        toggleFavorite={toggleFavorite}
                        item={item}
                        isAuthenticated={isAuthenticated}
                      />
                    ))}
              </SingleGameWrapper>
            )}
          </>
        )}
        {seo?.SeoText && <SeoContent seo={seo} />}
      </MainContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];
  try {
    const res = await apiClient.get('/api/casino/game-categories');
    const categories = res?.data?.gameCategoryList;

    paths = categories.map((category: Category) => ({
      params: { categoryName: `/casino/${category?.name?.toLowerCase().replace(/ /g, '-')}` }
    }));
  } catch (error) {
    console.error(error);
  }

  return {
    paths,
    fallback: 'blocking'
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const formattedLocale = formatLocale(context.locale || 'en');
  const categoryName = context.params?.categoryName as string | undefined;

  if (!categoryName) {
    return {
      props: {}
    };
  }
  const { data: bannersData } = await client.query({
    query: GET_CASINO_BANNERS,
    variables: { locale: formattedLocale }
  });
  const simpleBanners = bannersData.banners.data;

  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data?.defaultSeo?.data;

  const { data: casinoSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: `/casino/${categoryName}`, locale: formattedLocale }
  });
  const seo = casinoSeo.pages.data;

  const { data: lobbyCategories } = await client.query({
    query: GET_CASINO_CATEGORIES
  });

  const { data: horizontalCategories } = await client.query({
    query: GET_HORIZONTAL_CASINO_CATEGORIES
  });

  const casinoCategories = lobbyCategories.casinoLobby.data.attributes;
  const casinoHorizontalCategories = horizontalCategories.casinoLobby.data.attributes;
  const sidebar = await getSidebarNav(formattedLocale);
  const defaultCasinoCategoryData = getDefaultCasinoCategoryIds(
    sidebar.casinoCategories,
    categoryName
  );

  return {
    props: {
      defaultSeo,
      seo,
      simpleBanners,
      casinoCategories,
      casinoHorizontalCategories,
      sidebar,
      defaultCasinoCategoryData
    }
  };
};

export default GamePage;
