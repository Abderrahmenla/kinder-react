import { styled } from '@mui/material/styles';
import { GetStaticProps } from 'next';
import client from 'src/graphql/client';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { GET_ALL_VIP_PROGRAMS } from '@/graphql/queries/vipPrograms';
import { SeoLayoutProps } from 'src/graphql/types/seo';
import { VIPProgramAttributes } from '@/graphql/types/vipProgramsTypes';
import VIPContainer from '@/components/Organisms/VIP/VIPContainer';
import { SeoContent } from '@/components/Templates/SeoContent';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

const MainContainer = styled('main')`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding-bottom: 80px;
  padding-left: 0;
  padding-right: 0;

  @media screen and (max-width: 1024px) {
    padding-left: 70px;
    padding-right: 70px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 600px) {
    padding: 16px;
  }
`;

export interface VipProgramProps extends SeoLayoutProps {
  vipPrograms: VIPProgramAttributes;
}

const VipProgram = ({ seo, vipPrograms }: VipProgramProps): JSX.Element => {
  const { username, isAuthenticated } = useRecoilValue(authState);

  return (
    <MainContainer>
      <VIPContainer
        username={username}
        isAuthenticated={isAuthenticated}
        vipProgram={vipPrograms}
      />
      {seo?.SeoText && <SeoContent seo={seo} />}
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

  const { data: sportsSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'vip-program', locale: formattedLocale }
  });
  const seo = sportsSeo.pages.data;

  const { data: vipProgramsData } = await client.query({
    query: GET_ALL_VIP_PROGRAMS
  });
  const vipPrograms = vipProgramsData.vipProgram.data.attributes;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      vipPrograms,
      sidebar
    }
  };
};

export default VipProgram;
