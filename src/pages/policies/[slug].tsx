import { styled } from '@mui/material/styles';
import Policies from '@/components/Templates/Policies/Policies';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from 'src/graphql/client';
import { GET_ALL_POLICIES } from 'src/graphql/queries/policies';
import { PolicyProps } from 'src/graphql/types/policiesTypes';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import PoliciesContextProvider from 'src/providers/PolicyProvider';
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

const PoliciesPage = ({ policies }: { policies: PolicyProps[] }): JSX.Element => {
  return (
    <PoliciesContextProvider policies={policies}>
      <MainContainer>
        <Policies />
      </MainContainer>
    </PoliciesContextProvider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GET_ALL_POLICIES });
  const policies = data?.policies?.data;
  const paths =
    policies &&
    policies?.map((policy: PolicyProps) => ({
      params: { slug: policy.attributes.Slug }
    }));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_ALL_POLICIES,
    variables: { locale: formattedLocale }
  });
  const policies = data.policies.data;

  const { data: seoData } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = seoData.defaultSeo.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      policies,
      sidebar
    }
  };
};

export default PoliciesPage;
