import PromotionsInformation from '@/components/Templates/Promotions/PromotionsInformation/PromotionsInformation';
import { styled } from '@mui/material/styles';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import client from 'src/graphql/client';
import { GET_ALL_PROMOTIONS } from 'src/graphql/queries/promotions';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { PromotionProps } from 'src/graphql/types/promotionTypes';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

export const MainContainerSlug = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 80px',
  ' @media screen and (max-width:1200px)': {
    paddingLeft: '25px',
    paddingRight: '25px',
    margin: '0 auto',
    width: '100%'
  },
  ' @media screen and (max-width:1100px)': {
    paddingBottom: '50px'
  },
  '@media screen and (max-width:900px)': {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  '@media screen and (max-width:768px)': {
    paddingLeft: '0',
    paddingRight: '0'
  }
});

const Promotions = ({ promotions }: { promotions: PromotionProps[] }): JSX.Element | null => {
  const router = useRouter();
  const currentURL = router.asPath;

  const selectedPromotion =
    promotions && promotions.find(({ attributes }) => currentURL.includes(attributes.Slug));

  if (!selectedPromotion) {
    return null;
  }
  return (
    <>
      <MainContainerSlug>
        <PromotionsInformation selectedPromotion={selectedPromotion} />
      </MainContainerSlug>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_ALL_PROMOTIONS,
    variables: { locale: formattedLocale }
  });
  const promotions = data?.promotions?.data;

  const { data: seoData } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = seoData.defaultSeo.data;

  const { data: promotionSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'promotions', locale: formattedLocale }
  });
  const seo = promotionSeo.pages.data;
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
