import { GetStaticProps } from 'next';
import Home from '@/components/Templates/Home/Home';
import client from 'src/graphql/client';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { SeoLayoutProps } from 'src/graphql/types/seo';
import { GET_HOMEPAGE_CONTENT } from '@/graphql/queries/homepage';
import { HomepageContentProps } from '@/components/Templates/Home/Homepage.type';
import { useEffect, useState } from 'react';
import { SeoContent } from '@/components/Templates/SeoContent';
import { GET_ALL_VIP_PROGRAMS } from '@/graphql/queries/vipPrograms';
import { VIPProgramAttributes } from '@/graphql/types/vipProgramsTypes';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';
import { LoadingWrapper } from '@/components/Molecules/PageLoader/PageLoader.style';
import GameCategorySwiper from '@/components/Organisms/GameCategorySwiper/GameCategorySwiper';
import Lottie from 'lottie-react';
import * as animationData from '../utils/logo.json';
import styled from '@emotion/styled';

const MainContainer = styled('main')({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 24px'
});

const LoaderContianer = styled('div')`
  position: fixed;
  display: block;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: var(--very-dark-violet);
  opacity: 0.9;
  z-index: 99999;
`;

const SeoContatiner = styled('div')`
  .seo-content > div {
    margin-top: 24px;
  }
`;

interface HomepageProps {
  seo: SeoLayoutProps;
  homepageContent: HomepageContentProps;
  vipPrograms: VIPProgramAttributes;
}

const Homepage: React.FC<HomepageProps> = ({ seo, homepageContent, vipPrograms }): JSX.Element => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {isAppLoading && (
        <LoaderContianer>
          <LoadingWrapper>
            <Lottie className={'logo-loader'} animationData={animationData} />
          </LoadingWrapper>
        </LoaderContianer>
      )}

      <MainContainer>
        <Home homepageContent={homepageContent} vipProgramsLevel={vipPrograms.Level} />
        <GameCategorySwiper
          gameCategoryIds={{
            mobileId: homepageContent?.GamesCategoryMobileID,
            desktopId: homepageContent?.GamesCategoryDesktopID
          }}
        />
        {seo?.SeoText && (
          <SeoContatiner>
            <SeoContent seo={seo} />
          </SeoContatiner>
        )}
      </MainContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data: homepageContentData } = await client.query({
    query: GET_HOMEPAGE_CONTENT,
    variables: { locale: formattedLocale }
  });

  const homepageContent =
    homepageContentData.homepage.data && homepageContentData.homepage.data.attributes;

  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data.defaultSeo.data;

  const { data: homepageSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: '/', locale: formattedLocale }
  });
  const seo = homepageSeo.pages.data;

  const { data: vipProgramsData } = await client.query({
    query: GET_ALL_VIP_PROGRAMS
  });
  const vipPrograms = vipProgramsData.vipProgram.data.attributes;

  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      homepageContent,
      vipPrograms,
      sidebar
    }
  };
};

export default Homepage;
