import PromotionsPage from '@/components/Templates/Promotions/PromotionsPage/PromotionsPage';
import { styled } from '@mui/material/styles';
import { GetServerSideProps } from 'next';
import client from 'src/graphql/client';
import { GET_ALL_PROMOTIONS } from 'src/graphql/queries/promotions';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { PromotionProps } from 'src/graphql/types/promotionTypes';
import { SeoContent } from '@/components/Templates/SeoContent';
import React from 'react';
import { SeoPagesProps } from 'src/graphql/types/seo';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

export const MainContainerPromotions = styled('main')({
  width: '100%',
  maxWidth: '1260px',
  margin: '0 auto',
  height: '100%',
  paddingBottom: '40px'
});

export const SeoWrapper = styled('div')({
  position: 'relative',
  top: '-40px',

  '@media screen and (max-width:650px)': {
    top: '-20px'
  }
});

const Promotions = ({
  promotions,
  seo
}: {
  promotions: PromotionProps[];
  seo: SeoPagesProps;
}): JSX.Element => {
  return (
    <MainContainerPromotions>
      <PromotionsPage promotions={promotions} />
      {seo?.SeoText && (
        <SeoWrapper>
          <SeoContent seo={seo} />
        </SeoWrapper>
      )}
    </MainContainerPromotions>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_ALL_PROMOTIONS,
    variables: { locale: formattedLocale }
  });
  const promotions = data.promotions.data;

  const { data: seoData } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = seoData.defaultSeo.data;

  const { data: promotionsSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: '/promotions', locale: formattedLocale }
  });
  const seo = promotionsSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      promotions,
      sidebar
    }
  };
};

export default Promotions;
