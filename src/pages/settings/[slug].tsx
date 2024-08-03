import { styled } from '@mui/material/styles';
import Head from 'next/head';
import Settings from '@/components/Templates/Settings/Settings';
import { GetStaticPaths, GetStaticProps } from 'next';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';
import { useTranslations } from '@/hooks/useTranslations';

const MainContainer = styled('main')`
  width: 100%;
  margin: 0 auto;
  background: var(--very-dark-violet-300);

  @media screen and (min-width: 768px) {
    max-width: 1200px;
    background: none;
  }

  @media (min-width: 821px) {
    padding-bottom: 80px;
  }
`;

interface SettingsPageProps {
  slug: string;
  key: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ slug }): JSX.Element => {
  const { t } = useTranslations();

  return (
    <>
      <Head>
        <title>{t('settings')}</title>
      </Head>
      <MainContainer>{slug && <Settings activeSlug={slug} />}</MainContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { slug: 'profile' } },
    { params: { slug: 'transactions' } },
    { params: { slug: 'bet-history' } },
    { params: { slug: 'login-history' } },
    { params: { slug: 'verification' } },
    { params: { slug: 'responsible-gambling' } }
  ];

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const formattedLocale = formatLocale(locale || 'en');

  let slug = params?.slug as string;

  if (!slug) {
    slug = 'profile';
  }

  const sidebar = await getSidebarNav(formattedLocale);

  return { props: { slug, sidebar } };
};

export default SettingsPage;
