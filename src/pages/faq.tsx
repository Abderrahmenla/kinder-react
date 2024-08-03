import { styled } from '@mui/material/styles';
import FaqTem from '@/components/Templates/FAQ/FAQ';
import { GetStaticProps } from 'next';
import client from 'src/graphql/client';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { GET_ALL_FAQS } from 'src/graphql/queries/faq';
import { FaqProps } from 'src/graphql/types/faqTypes';
import { SeoPagesProps } from '../graphql/types/seo';
import { SeoContent } from '@/components/Templates/SeoContent';
import React from 'react';
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

const Faq = ({ faqs, seo }: { faqs: FaqProps[]; seo: SeoPagesProps }): JSX.Element => {
  return (
    <MainContainer>
      <FaqTem faqs={faqs} />
      {seo?.SeoText && <SeoContent seo={seo} />}
    </MainContainer>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_ALL_FAQS,
    variables: { locale: formattedLocale }
  });
  const faqs = data.faqs.data;

  const { data: seoData } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = seoData.defaultSeo.data;

  const { data: faqSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'faq', locale: formattedLocale }
  });
  const seo = faqSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      faqs,
      sidebar
    }
  };
};

export default Faq;
