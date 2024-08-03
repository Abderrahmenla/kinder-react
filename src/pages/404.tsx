import { GetStaticProps } from 'next';
import NotFoundPageTemp from '@/components/Templates/404Page/404Page';
import client from 'src/graphql/client';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

const NotFoundPage = () => {
  return <NotFoundPageTemp />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = data.defaultSeo.data;

  const { data: notFoundSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: '404', locale: formattedLocale }
  });
  const seo = notFoundSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      sidebar
    }
  };
};

export default NotFoundPage;
