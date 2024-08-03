import { GetStaticProps } from 'next';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import SportsTemplate from '@/components/Templates/Sports/Sports';
import MainContainer from './sportStyles';
import client from 'src/graphql/client';
import { SportsBanner } from '@/components/Molecules/SportsBanner/SportsBanner';
import { GET_SPORTSBOOK_BANNERS } from 'src/graphql/queries/banners';
import { SportsPageProps } from 'src/graphql/types/bannersTypes';
import { SeoContent } from '@/components/Templates/SeoContent';
import React, { useMemo } from 'react';
import useAltenar from '@/hooks/useAltenar';
import { useLoader } from '@/hooks/useLoader';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';
import { getSportsBookTemplate } from '@/utils/alternarUtils';

const Sports: React.FC<SportsPageProps> = ({ simpleBanners, seo }): JSX.Element => {
  const { isInitialized } = useAltenar();
  const { loadingWrapper } = useLoader('coin');

  const sportsTemplateProps = useMemo(() => getSportsBookTemplate('/sports/overview', []), []);

  return (
    <MainContainer>
      <SportsBanner simpleBanners={simpleBanners} />
      {isInitialized ? <SportsTemplate {...sportsTemplateProps} /> : loadingWrapper}
      {seo?.SeoText && <SeoContent seo={seo} />}
    </MainContainer>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en-nz');
  const { data: bannersData } = await client.query({
    query: GET_SPORTSBOOK_BANNERS,
    variables: { locale: formattedLocale }
  });
  const simpleBanners = bannersData.bannersV2S.data;

  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data.defaultSeo.data;

  const { data: sportsSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: '/sports', locale: formattedLocale }
  });
  const seo = sportsSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      simpleBanners,
      sidebar
    }
  };
};

export default Sports;
