import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useLoader } from '@/hooks/useLoader';
import { SimpleBannersDataType } from '@/graphql/types/bannersTypes';
import {
  GameContainer,
  GameControls,
  GameControlsWrapper,
  GameDetail,
  GameFrameWrapper,
  GamePageWrapper,
  RealGameInfo,
  SingleMainContainer,
  FlexWrapper
} from '@/components/Molecules/Casino/Casino.styles';
import { GameControlDetails } from '@/components/Molecules/Casino/GameControlDetails/GameControlDetails';
import FullScreenButton from '@/components/Atoms/FullScreenButton/FullScreenButton';
import { GameSwitcher } from '@/components/Molecules/Casino/GameSwitcher/GameSwitcher';
import { SeoContent } from '@/components/Templates/SeoContent';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { FullScreen, FullScreenHandle, useFullScreenHandle } from 'react-full-screen';
import { apiClient } from '@/services/clientAxios';
import { CategoryGames, Game, GameType, SingleProvider } from '@/pages/api/casino/casinoTypes';
import { lobbyDataState } from '@/components/state/gameState';
import { assets } from '@/config/assets';
import { authState } from '@/components/state/isAuthenticated';
import { ErrorResponse } from '@/pages/api/types';
import { getGameCategoryByName } from '@/utils/gameUtils';
import useLaunchGame from '@/hooks/useLaunchGame';
import { useTranslations } from '@/hooks/useTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '@/graphql/client';
import { GET_DEFAULT_SEO } from '@/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from '@/graphql/queries/pagesSeo';
import { logFetchError } from '@/utils/logFetchError';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';
import { GET_CASINO_CATEGORIES } from '@/graphql/queries/casinoLobby';
import { CasinoLobbyType } from '@/graphql/types/casinoLobbyTypes';
import { BackButton } from '@/components/Molecules/Casino/BackButton';

const GameView = dynamic(() => import('@/components/Molecules/Casino/GameView'));
const GameCategorySwiper = dynamic(
  () => import('@/components/Organisms/GameCategorySwiper/GameCategorySwiper')
);
const CasinoProvider = dynamic(() =>
  import('@/components/Molecules/Casino/CasinoProvider/CasinoProvider').then(
    (mod) => mod.CasinoProvider
  )
);

export interface GamePageProps extends SimpleBannersDataType {
  casinoCategories: CasinoLobbyType;
}

const GamePage: React.FC<GamePageProps> = ({ seo, casinoCategories }) => {
  const featuredGames = getGameCategoryByName(casinoCategories, 'Featured');

  const router = useRouter();
  const { gameId, productName } = router.query;
  const slugToGameName = gameId?.toString().replaceAll('-', ' ');
  const slugToProviderName = productName?.toString().replaceAll('-', ' ');
  const slugClearedParam = slugToGameName?.replace('¿', '?');

  const isMobile = UseMediaQuery(576);
  const { isAuthenticated } = useRecoilValue(authState);
  const categoryGamesState = useRecoilValue(lobbyDataState);

  const [game, setGame] = useState<GameType>();
  const [gameError, setGameError] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game>();

  const [providers, setProviders] = useState<string[]>([]);

  const [categoryGames, setCategoryGames] = useState<CategoryGames[]>([]);

  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const handle = useFullScreenHandle();
  const { t } = useTranslations();

  const { isRealGame, defaultGameToggleState, handleGameTypeToggle } = useLaunchGame({
    selectedGame,
    setGame,
    setGameError,
    toggleLoader
  });

  const fetchGameData = async () => {
    const endpoint = isMobile ? '/api/player-lobby' : '/api/lobby';
    const portalId = isMobile ? 2 : 1;

    const res = await axios.get(endpoint, { params: { portalId } });
    return res.data;
  };

  const handleProviders = (data: CategoryGames[] = []) => {
    const uniqueProviderNames = Array.from(
      new Set(data?.[0]?.gameMains?.map((provider: SingleProvider) => provider.productName) || [])
    );
    setProviders(uniqueProviderNames);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        toggleLoader(true);

        const data = categoryGamesState.length === 0 ? await fetchGameData() : categoryGamesState;

        setCategoryGames(data);
        handleProviders(data);
      } catch (error) {
        logFetchError(error as AxiosError<ErrorResponse>);
        throw error;
      } finally {
        toggleLoader(false);
        setGameError(false);
      }
    };

    fetchData();
  }, [gameId]);

  useEffect(() => {
    for (let i = 0; i < categoryGames[0]?.gameMains.length; i++) {
      if (
        categoryGames[0]?.gameMains[i].name.replace(/[:\s-]+/g, ' ').toLowerCase() ===
          slugClearedParam &&
        categoryGames[0]?.gameMains[i].productName.replace(/[:\s-]+/g, ' ').toLowerCase() ===
          slugToProviderName
      ) {
        setSelectedGame(categoryGames[0].gameMains[i]);
        break;
      }
    }
  }, [categoryGames]);

  const handleFullScreen = useCallback((state: boolean, handle: FullScreenHandle) => {
    if (handle.active === true) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }, []);

  const handleScreenChange = () => {
    if (isFullScreen) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  const handleHeightResponsiveness = () => {
    const element: any = document.querySelector('.fullscreen main');
    if (element) {
      element.style.height = window.innerHeight - 135 + 'px';
    }
  };

  if (typeof window !== 'undefined') {
    if (window.matchMedia('(max-width: 991px)').matches) {
      window.addEventListener('resize', handleHeightResponsiveness);
      handleHeightResponsiveness();
    }
  }
  return (
    <FullScreen handle={handle} onChange={handleFullScreen}>
      <SingleMainContainer>
        {isLoading ? (
          loadingWrapper
        ) : (
          <GamePageWrapper id="game-wrapper-container">
            {gameError && (
              <GameFrameWrapper>
                <GameContainer>
                  <RealGameInfo>
                    <GameDetail>
                      <Image
                        src={`${assets}/images/error-icon.svg`}
                        alt="error"
                        width={50}
                        height={50}
                      />
                      <h3>{t('thisThingWentWrong')}</h3>
                      <p>{t('pleaseContactCustomer')}</p>
                    </GameDetail>
                  </RealGameInfo>
                </GameContainer>
              </GameFrameWrapper>
            )}
            {selectedGame?.maintenanceModeEnabled && (
              <GameFrameWrapper>
                <GameContainer>
                  <RealGameInfo>
                    <GameDetail>
                      <Image
                        src={`${assets}/images/warning-icon.svg`}
                        alt="error"
                        width={50}
                        height={50}
                      />
                      <h3>{t('theGameisCurrently')}</h3>
                    </GameDetail>
                  </RealGameInfo>
                </GameContainer>
              </GameFrameWrapper>
            )}
            {game && !gameError && !selectedGame?.maintenanceModeEnabled && (
              <GameFrameWrapper isFullScreen={isFullScreen} className="frame-wrapper">
                <GameControlsWrapper isFullScreen={isFullScreen} id="game-controls-wrapper">
                  <GameControls isMobile={isMobile}>
                    <FlexWrapper>
                      <BackButton href="/casino" />
                      <GameControlDetails isFullScreen={isFullScreen} game={selectedGame} />
                    </FlexWrapper>
                    <FlexWrapper>
                      <GameSwitcher
                        handleGameSwitch={handleGameTypeToggle}
                        defaultChecked={defaultGameToggleState}
                        isRealGame={isRealGame}
                        isFullScreen={isFullScreen}
                      />
                      <FullScreenButton
                        isFullScreen={isFullScreen}
                        openFullScreen={handleScreenChange}
                      />
                    </FlexWrapper>
                  </GameControls>
                </GameControlsWrapper>
                <GameView
                  isFullScreen={isFullScreen}
                  isRealGame={isRealGame}
                  selectedGame={selectedGame}
                  gameType={game}
                />
              </GameFrameWrapper>
            )}
            {!isMobile && !!featuredGames && !isFullScreen && (
              <GameCategorySwiper customCategoryName="Featured" category={featuredGames} />
            )}
            {!isMobile && game && <CasinoProvider providers={providers} />}
          </GamePageWrapper>
        )}
        {!isAuthenticated && seo?.SeoText && game && !isMobile && <SeoContent seo={seo} />}
      </SingleMainContainer>
      {!isAuthenticated && seo?.SeoText && game && isMobile && <SeoContent gamePage seo={seo} />}
    </FullScreen>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await apiClient.get('/api/lobby', { params: { portalId: 1 } });

    const gamePaths = res?.data[0]?.gameMains.map((game: Game) => ({
      name: game.name,
      productName: game.productName
    }));

    const paths = gamePaths.map(({ name, productName }: { name: string; productName: string }) => ({
      params: {
        gameId: `/casino/game/${name?.toLowerCase().replace(/ /g, '-')}`,
        productName: productName?.toLowerCase().replace(/ /g, '-')
      }
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
  const gameName = context.params?.gameId as string | undefined;
  const productName = context.params?.productName as string | undefined;
  const formattedLocale = formatLocale(context.locale || 'en');
  if (!gameName) {
    return {
      props: {}
    };
  }

  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data?.defaultSeo?.data;

  const { data: casinoSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: `/casino/game/${productName}/${gameName}`, locale: formattedLocale }
  });
  const seo = casinoSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  const { data: lobbyCategories } = await client.query({
    query: GET_CASINO_CATEGORIES,
    variables: { locale: formattedLocale }
  });
  const casinoCategories = lobbyCategories.casinoLobby.data.attributes;

  return {
    props: {
      defaultSeo,
      seo,
      sidebar,
      casinoCategories
    }
  };
};

export default GamePage;
