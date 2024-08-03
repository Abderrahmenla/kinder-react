import { GetStaticProps } from 'next';

import { styled } from '@mui/material/styles';
import ContactUsTem from '@/components/Templates/ContactUs';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import client from 'src/graphql/client';
import { SeoContent } from '@/components/Templates/SeoContent';
import React from 'react';
import { SeoLayoutProps } from '../graphql/types/seo';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

const MainContainer = styled('main')({
  display: 'flex',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 16px',
  flexDirection: 'column',
  '@media screen and (min-width:1024px)': {
    padding: '0 0 80px'
  }
});

const ContactUs: React.FC<SeoLayoutProps> = ({ seo }): JSX.Element => {
  return (
    <MainContainer>
      <ContactUsTem />
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

  const { data: contactSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'contact-us', locale: formattedLocale }
  });
  const seo = contactSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      sidebar
    }
  };
};

export default ContactUs;
