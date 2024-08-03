import client from 'src/graphql/client';
import { GET_CASINO_CATEGORIES } from 'src/graphql/queries/casinoLobby';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { GetServerSideProps } from 'next';
import { MainContainer } from '@/components/Molecules/Casino/Casino.styles';
import EasterCalendar from '@/components/Molecules/Easter/EasterCalendar/EasterCalendar';
import GameCategorySwiper from '@/components/Organisms/GameCategorySwiper/GameCategorySwiper';
import EasterBanner from '@/components/Molecules/Easter/EasterBanner/EasterBanner';
import cookie from 'cookie';
import { GET_EASTER_PRIZES } from '@/graphql/queries/easterPrizes';
import { GET_ALL_EASTER_CAMPAIGN } from '@/graphql/queries/easterCampaign';
import { EasterCampaignProps } from '@/components/Molecules/Easter/Easter.types';
import dayjs from 'dayjs';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { easterIsFirstTimeDeposit } from '@/components/state/easterIsFirstTimeDeposit';
import { getSidebarNav } from '@/utils/navigationUtils';

import { formatLocale } from '@/utils/formatLocale';

const EasterCampaign: React.FC<EasterCampaignProps> = ({
  easterPrizeData,
  easterCampaignData,
  formattedDate
}) => {
  const firstTimeDeposit = useRecoilValue(easterIsFirstTimeDeposit);

  return (
    <MainContainer>
      <EasterBanner depositQualified={firstTimeDeposit} easterCampaignData={easterCampaignData} />
      <EasterCalendar
        formattedDate={formattedDate}
        easterPrizeData={easterPrizeData}
        easterCampaignData={easterCampaignData}
      />

      <GameCategorySwiper
        gameCategoryIds={{
          mobileId: easterPrizeData.GameCategoryDesktop,
          desktopId: easterPrizeData.GameCategoryMobile
        }}
      />
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const formattedLocale = formatLocale(context.locale || 'en');

  if (!cookies.sessionToken || !cookies.playerId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  let formattedDate;
  try {
    const API_KEY = 'IMD8T8BOWVAB';

    const timeResponse = await axios.get(
      `https://vip.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=Europe/Berlin`
    );

    const data = await timeResponse?.data?.formatted;
    formattedDate = dayjs(data).format('DD/MM/YYYY');
  } catch (error) {
    console.error('Error:', error);
  }

  const { data: easterCampaignsRes } = await client.query({
    query: GET_ALL_EASTER_CAMPAIGN
  });

  const easterCampaignData = easterCampaignsRes?.easterGiveaways.data;
  const { data: easterPrizes } = await client.query({
    query: GET_EASTER_PRIZES
  });

  const easterPrizeData = easterPrizes?.easter?.data?.attributes || {};

  const { data: seoData } = await client.query({ query: GET_DEFAULT_SEO });
  const defaultSeo = seoData.defaultSeo.data;

  const { data: easterSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'easter-hunt' }
  });

  const seo = easterSeo.pages.data;
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
      easterPrizeData,
      easterCampaignData,
      formattedDate,
      sidebar,
      casinoCategories
    }
  };
};

export default EasterCampaign;
