import React from 'react';
import { GetStaticProps } from 'next';
import { GET_DEFAULT_SEO } from '@/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from '@/graphql/queries/pagesSeo';
import client from '@/graphql/client';
import F1Table from '@/components/Molecules/F1-Leaderboard/F1Table';
import MainContainer from '@/pages/sports/sportStyles';
import { assets } from '@/config/assets';
import Image from 'next/image';
import GameCategorySwiper from '@/components/Organisms/GameCategorySwiper/GameCategorySwiper';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';
import { GET_CASINO_CATEGORIES } from '@/graphql/queries/casinoLobby';
import { SimpleBannersDataType } from '@/graphql/types/bannersTypes';
import { CasinoLobbyType } from '@/graphql/types/casinoLobbyTypes';
import { getGameCategoryByName } from '@/utils/gameUtils';

export interface LeaderBoardProps extends SimpleBannersDataType {
  casinoCategories: CasinoLobbyType;
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ casinoCategories }) => {
  const tournament = getGameCategoryByName(casinoCategories, 'Tournament');

  return (
    <MainContainer>
      <Image
        width={1200}
        height={146}
        alt="Banner"
        layout="responsive"
        objectFit="contain"
        src={`${assets}/images/f1-leaderboard/magic-round.jpg`}
        style={{
          width: '100%',
          marginBottom: '16px',
          paddingLeft: '12px',
          paddingRight: '12px'
        }}
      />
      <F1Table />
      <div
        style={{
          marginRight: '16px',
          marginLeft: '16px',
          height: tournament ? '294px' : '16px',
          marginBottom: '100px',
          marginTop: '10px'
        }}
      >
        {tournament && <GameCategorySwiper category={tournament} />}
      </div>
    </MainContainer>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data.defaultSeo.data;

  const { data: f1Page } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'leaderboard', locale: formattedLocale }
  });
  const seo = f1Page.pages.data;
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

export default LeaderBoard;
