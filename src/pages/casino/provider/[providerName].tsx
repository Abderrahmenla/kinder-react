import { useRouter } from 'next/router';
import React, { lazy, useCallback, useEffect, useState } from 'react';
import {
  FilterWrapperContainer,
  GameTile,
  GameTileDemo,
  GameTileInfo,
  GameTileName,
  GameTilePlay,
  GameTileProvider,
  MainContainer,
  SearchContainerWrapper
} from '@/components/Molecules/Casino/Casino.styles';
import Select from '@/components/Molecules/Casino/Select';
import {
  Categories,
  Category,
  Providers,
  SelectedGame,
  SingleProvider
} from '@/pages/api/casino/casinoTypes';
import ImageWithFallback from '@/utils/handleImageFallback';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCategoryState } from '@/components/state/categoryState';
import { apiClient } from '@/services/clientAxios';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/pages/api/types';
import {
  GameResultText,
  SingleGame,
  SingleGameWrapper
} from '@/components/Molecules/Casino/SingleGameWrapper/SingleGame.style';
import { GameCount } from '@/components/Atoms/GameCount.style';
import { ShowMore } from '@/components/Atoms/ShowMore';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '../../../graphql/client';
import { GET_DEFAULT_SEO } from '@/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from '@/graphql/queries/pagesSeo';
import { useLoader } from '@/hooks/useLoader';
import { UnifiedBannersDataType } from 'src/graphql/types/bannersTypes';
import { lobbyDataState } from '@/components/state/gameState';
import { categoriesSelector, categoriesState } from '@/components/state/gameCategoryState';
import { carouselOptions, formatLocale, SliderContent } from '@/utils/gameUtils';
import { assets } from '@/config/assets';
import GameSearch from '@/components/Organisms/GameSearch/GameSearch';
import { authState } from '@/components/state/isAuthenticated';
import { useTranslations } from '@/hooks/useTranslations';
import CarouselBanner from '@/components/Atoms/CarouselBanner/CarouselBanner';
import { CarouselBannerContainer } from '@/components/Atoms/CarouselBanner/CarouselBanner.styles';
import { GET_CASINO_BANNERS } from '@/graphql/queries/banners';
import { GET_CASINO_CATEGORIES } from '@/graphql/queries/casinoLobby';
import { useFavoriteGames } from '@/hooks/useFavoriteGames';
import useGameSearch from '@/hooks/useGameSearch';
import SearchGamesComponent from '@/components/Atoms/InputIcon';
import { GET_HORIZONTAL_CASINO_CATEGORIES } from '@/graphql/queries/casinoCategories';
import { logFetchError } from '@/utils/logFetchError';
import useSwitchGame from '@/hooks/useSwitchGame';
import { getSidebarNav } from '@/utils/navigationUtils';
import dynamic from 'next/dynamic';

const GamePopup = lazy(() => import('../../../components/Molecules/Casino/GamePopup/GamePopup'));
const Filter = lazy(() => import('../../../components/Organisms/Filter/Filter'));
const FavoriteButton = dynamic(
  () => import('@/components/Molecules/Casino/FavoriteButton/FavoriteButton')
);
const SeoContent = dynamic(() =>
  import('@/components/Templates/SeoContent').then((mod) => mod.SeoContent)
);

const ProviderPage: React.FC<UnifiedBannersDataType> = ({
  simpleBanners,
  seo,
  casinoCategories,
  casinoHorizontalCategories
}) => {
  const router = useRouter();
  const { providerName } = router.query;
  const [categoryGames, setCategoryGames] = useRecoilState(lobbyDataState);
  const [categories, setCategories] = useRecoilState<Categories | any>(categoriesState);
  const [providers, setProviders] = useState<Providers[] | any>([]);
  const isMobile = UseMediaQuery(576);
  const [, setSelectedCategory] = useRecoilState<any>(selectedCategoryState);
  const [gameLimit, setGameLimit] = useState<number>(28); // Number of games to display initially
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const categoriesData = useRecoilValue(categoriesSelector);
  const { isAuthenticated } = useRecoilValue(authState);
  const [modalState, setModalState] = useState(false);
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null);
  const { favoriteGames, isFavorite, toggleFavorite } = useFavoriteGames();
  const { onClickPlayNow, onClickDemo } = useSwitchGame(isAuthenticated);
  const [error, setError] = useState<string | undefined>();
  const { t } = useTranslations();

  const { searchQuery, setSearchQuery, filteredGames, onSearchInputChange } = useGameSearch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoader(true);
        const res = isMobile
          ? await apiClient.get('/api/player-lobby', { params: { portalId: 2, t: Date.now() } })
          : await apiClient.get('/api/lobby', { params: { portalId: 1, t: Date.now() } });
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

          toggleLoader(false);
        }
      } catch (error) {
        toggleLoader(false);
        logFetchError(error as AxiosError<ErrorResponse>);
      }
    };
    fetchData();
  }, [isMobile, isAuthenticated]);

  useEffect(() => {
    if (!categoriesData) {
      setCategories(casinoHorizontalCategories.HorizontalMenu);
    }
  }, [categoriesData, setCategories]);

  useEffect(() => {
    if (!!providerName && selectedProvider.length === 0) {
      const formattedProvider = providerName.toString().replace(/-/g, ' ');
      const matchingProvider = providers.find(
        (provider: string) => provider.toLowerCase() === formattedProvider.toLowerCase()
      );

      if (matchingProvider) {
        setError(undefined);
        setSelectedProvider(matchingProvider);
      } else {
        setError(`${formattedProvider} ${t('isNotValidProvider')}`);
      }
    }
  }, [providerName, providers, selectedProvider]);

  const handleProviderChange = useCallback(
    (provider: string) => {
      setError(undefined);
      setSelectedProvider(provider);

      const formattedProvider =
        provider === 'All Providers' ? router.push('/casino') : provider.replace(/ /g, '-');
      router.push(`/casino/provider/${formattedProvider}`);
    },
    [setError, setSelectedProvider, router]
  );

  const handleShowMore = () => {
    setGameLimit((prevLimit) => prevLimit + 28);
  };

  const handleCategoryChange = (category: Category | string) => {
    setSelectedCategory(category);
  };

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
            providerName={providerName}
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
        {isLoading && loadingWrapper}
        {searchQuery.length > 0 && (
          <GameSearch
            filteredGames={filteredGames}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            setModalState={setModalState}
          />
        )}
        {!isLoading && error && (
          <SingleGameWrapper isErrorWrapper>
            <GameResultText>{error}</GameResultText>
          </SingleGameWrapper>
        )}
        {!error && searchQuery.length < 1 && (
          <SingleGameWrapper>
            {categoryGames.map((category) => {
              if (category.name === 'All Games') {
                const filteredGames = category.gameMains.filter((gameMain) =>
                  gameMain.productName.includes(selectedProvider)
                );

                return (
                  <React.Fragment key={category.id}>
                    {filteredGames.slice(0, gameLimit).map((gameMain, index) => (
                      <SingleGame key={`${gameMain.id}-${index}`}>
                        <GameTile className="game-tile">
                          <GameTileName>{gameMain.name}</GameTileName>
                          <GameTileInfo>
                            <GameTilePlay onClick={() => onClickPlayNow(gameMain)}>
                              {t('playNow')}
                            </GameTilePlay>
                            <GameTileDemo onClick={() => onClickDemo(gameMain)}>
                              {t('demo')}
                            </GameTileDemo>
                          </GameTileInfo>
                          <FavoriteButton
                            toggleFavorite={() => toggleFavorite(gameMain)}
                            isAuthenticated={isAuthenticated}
                            isFavorite={isFavorite(gameMain.externalId)}
                          />
                          <GameTileProvider>{gameMain.productName}</GameTileProvider>
                        </GameTile>
                        <ImageWithFallback
                          onClick={() => {
                            setSelectedGame({
                              gameId: gameMain.externalId,
                              gameName: gameMain.name,
                              productName: gameMain.productName,
                              imageUrl: `https://images.spinbet.com/storage/games/${gameMain?.externalId.toLowerCase()}.jpg/format=webp`
                            });
                            setModalState(true);
                          }}
                          src={`https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=webp`}
                          fallbackSrc={`https://images.spinbet.com/storage/games/${gameMain.externalId.toLowerCase()}.jpg/format=png`}
                          placeholderSrc={`${assets}/images/game-placeholder.jpg`}
                          alt="casino-game"
                          loading="lazy"
                          width={150}
                          height={210}
                        />
                      </SingleGame>
                    ))}
                    {filteredGames.length > gameLimit && (
                      <GameCount>
                        <ShowMore onClick={handleShowMore}>
                          {t('loadMoreGames')}
                          <span>+</span>
                        </ShowMore>
                      </GameCount>
                    )}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </SingleGameWrapper>
        )}
        {seo?.SeoText && <SeoContent seo={seo} />}
      </MainContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await apiClient.get('/api/lobby', { params: { portalId: 1, t: Date.now() } });

    const categoryGame = res.data[0].gameMains.map((provider: Providers) => provider);
    const providerArr = categoryGame
      .filter(
        (provider: SingleProvider, index: number, self: Array<SingleProvider>) =>
          index === self.findIndex((p) => p.productName === provider.productName)
      )
      .map((provider: SingleProvider) => provider.productName);

    const paths = providerArr.map((provider: any) => ({
      params: { providerName: `/casino/provider/${provider?.toLowerCase().replace(/ /g, '-')}` }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const providerName = context.params?.providerName as string | undefined;
  const formattedLocale = formatLocale(context.locale || 'en-nz');

  if (!providerName) {
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
    variables: { slug: `/casino/provider/${providerName}`, locale: formattedLocale }
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

export default ProviderPage;
