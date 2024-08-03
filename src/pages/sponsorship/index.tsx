import { styled } from '@mui/material/styles';
import SponsorshipTemplate from '@/components/Templates/Sponsorship';
import { GetStaticProps } from 'next';
import client from 'src/graphql/client';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { SeoContent } from '@/components/Templates/SeoContent';
import React from 'react';
import { SeoLayoutProps } from '../../graphql/types/seo';
import { GET_SPONSORSHIP_CONTENT } from 'src/graphql/queries/sponsorship';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

const MainContainer = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 80px'
});

export interface SponsorRowProps {
  Title: string;
  Text: string;
  VideoURL: string;
  Image: {
    data: {
      attributes: {
        alternativeText: string;
        url: string;
      };
    };
  };
}

export interface SponsorshipBannerProps {
  Title: string;
  SubTitle: string;
  BackgroundImage: {
    data: {
      id: string;
      attributes: {
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface SponsorShipPageProps {
  seo: SeoLayoutProps;
  banner: SponsorshipBannerProps;
  sponsorShipAssets: SponsorRowProps[];
}

const Sponsorship: React.FC<SponsorShipPageProps> = (props): JSX.Element => {
  return (
    <MainContainer>
      <SponsorshipTemplate banner={props.banner} contentAssets={props.sponsorShipAssets} />
      {props.seo?.SeoText && <SeoContent seo={props.seo} />}
    </MainContainer>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const {
    data: {
      sponsorshipPage: {
        data: { attributes: sponsorshipData }
      }
    }
  } = await client.query({
    query: GET_SPONSORSHIP_CONTENT,
    variables: { locale: formattedLocale }
  });

  const { Row: sponsorShipAssets } = sponsorshipData;
  const {
    banners: {
      data: { attributes: banner }
    }
  } = sponsorshipData;

  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data.defaultSeo.data;

  const { data: sportsSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: '/sponsorship', locale: formattedLocale }
  });
  const seo = sportsSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      banner,
      sponsorShipAssets,
      sidebar
    }
  };
};

export default Sponsorship;
