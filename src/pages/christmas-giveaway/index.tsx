import client from 'src/graphql/client';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { GET_ALL_CHRISMAS_GIVEAWAY } from 'src/graphql/queries/christmasGiveaway';
import React from 'react';
import MainContainer from '@/pages/sports/sportStyles';
import { SimpleBannersDataType } from '../../graphql/types/bannersTypes';
import { ChristmasCalendar } from '@/components/Molecules/ChristmasGiveaway/ChristmasGiveaway.styles';
import { CalendarSwiper } from '@/components/Molecules/ChristmasGiveaway/CalendarSwiper';
import ChristmasBanner from '@/components/Molecules/ChristmasGiveaway/ChristmasBanner';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Title } from '@/components/Molecules/ChristmasGiveaway/ChristmasGiveaway.styles';
import { ChristmasGiveawayType } from 'src/graphql/types/christmasGiveawayTypes';
import cookie from 'cookie';
import { GetServerSideProps } from 'next';
import { FEATURE_FLAG } from '@/constants/index';

type ChristmasDataResponseType = {
  christmasGiveaway2023S: {
    data: ChristmasGiveawayType[];
  };
};

const ChristmasGiveaway = ({
  christmasGiveaway
}: {
  simpleBanners: SimpleBannersDataType;
  christmasGiveaway: ChristmasGiveawayType[];
}) => {
  const theme = useTheme();
  const isMobileSwiper = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <MainContainer>
        {!isMobileSwiper && <ChristmasBanner />}
        {isMobileSwiper && (
          <Title>
            Christmas <span>Giveaway</span>
          </Title>
        )}
        <ChristmasCalendar>
          <CalendarSwiper christmasGiveaway={christmasGiveaway} />
        </ChristmasCalendar>
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');

  if (!cookies.sessionToken || !cookies.playerId || !FEATURE_FLAG.christmasGiveaway.value) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  const { data: christmasData } = await client.query<ChristmasDataResponseType>({
    query: GET_ALL_CHRISMAS_GIVEAWAY
  });
  const christmasGiveaway = christmasData.christmasGiveaway2023S.data;
  const { data: seoData } = await client.query({ query: GET_DEFAULT_SEO });
  const defaultSeo = seoData.defaultSeo.data;

  const { data: christmasSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'christmas-giveaway' }
  });
  const seo = christmasSeo.pages.data;

  return {
    props: {
      defaultSeo,
      seo,
      christmasGiveaway
    }
  };
};

export default ChristmasGiveaway;
