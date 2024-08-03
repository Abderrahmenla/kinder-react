import { formatLocale } from '@/utils/formatLocale';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useMemo } from 'react';
import MainContainer from './sportStyles';
import useAltenar from '@/hooks/useAltenar';
import { useLoader } from '@/hooks/useLoader';
import { SeoContent } from '@/components/Templates/SeoContent';
import client from '@/graphql/client';
import { GET_DEFAULT_SEO } from '@/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from '@/graphql/queries/pagesSeo';
import { getSidebarNav, getSportsPath } from '@/utils/navigationUtils';
import { SportsBanner } from '@/components/Molecules/SportsBanner/SportsBanner';
import { GET_SPORTSBOOK_BANNERS } from '@/graphql/queries/banners';
import { SportsPageProps } from '@/graphql/types/bannersTypes';
import SportsTemplate from '@/components/Templates/Sports/Sports';
import { getSportsBookTemplate } from '@/utils/alternarUtils';
import { sportsIdState } from '@/components/state/sportsIdState';
import { useRecoilValue } from 'recoil';

interface SportsBookPageProps extends SportsPageProps {
  slug: string;
}

const SportsBookPage: React.FC<SportsBookPageProps> = ({ seo, slug, simpleBanners }) => {
  const { isInitialized } = useAltenar();
  const { loadingWrapper } = useLoader('coin');
  const sports = useRecoilValue(sportsIdState);

  const sportsTemplateProps = useMemo(
    () => getSportsBookTemplate(`/sports/${slug}`, sports),
    [slug, sports]
  );

  return (
    <MainContainer>
      <SportsBanner simpleBanners={simpleBanners} />
      {isInitialized ? <SportsTemplate {...sportsTemplateProps} /> : loadingWrapper}

      {seo?.SeoText && <SeoContent seo={seo} />}
    </MainContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const formattedLocale = formatLocale(context.locale || 'en');
  const slug = context.params?.sportsContent as string;
  const { sportsPath: paths } = await getSportsPath(formattedLocale);
  const slugIndex = paths.find((path) => path.params.sportsContent === `/sports/${slug}`);

  if (!slugIndex) {
    return {
      notFound: true
    };
  }

  try {
    const { data: bannersData } = await client.query({
      query: GET_SPORTSBOOK_BANNERS,
      variables: { locale: formattedLocale }
    });
    const simpleBanners = bannersData.bannersV2S.data;

    const { data } = await client.query({
      query: GET_DEFAULT_SEO,
      variables: { locale: formattedLocale }
    });
    const defaultSeo = data?.defaultSeo?.data;

    const { data: sportsSeo } = await client.query({
      query: GET_PAGES_SEO,
      variables: { slug: slug }
    });
    const seo = sportsSeo.pages.data;
    const sidebar = await getSidebarNav(formattedLocale);

    return {
      props: {
        defaultSeo,
        seo,
        simpleBanners,
        slug,
        sidebar
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { notFound: true };
  }
};

export default SportsBookPage;
