import { GetServerSideProps } from 'next';
import { ReferralLayout } from '@/components/Organisms/Referral/ReferralLayout';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from 'src/services/clientAxios';
import client from 'src/graphql/client';
import { format } from 'date-fns';
import { GET_REFERRAL_PROGRAM } from '@/graphql/queries/referralProgram';
import { formatLocale } from '@/utils/gameUtils';
import { getSidebarNav } from '@/utils/navigationUtils';

const currentDate = new Date();
const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSSxxx");

const Referral = ({
  slug,
  referralInfo
}: {
  domain: string;
  slug: string;
  referralInfo: string;
}): JSX.Element => {
  const [referralData, setReferralData] = useState({
    code: undefined,
    referredUsers: [],
    claimAmount: undefined,
    refUrl: undefined,
    successMessage: ''
  });

  const [userClipBoard, setUserClipBoard] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/referral') {
      router.replace('/referral/overview');
    }
  }, []);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const [affiliateCode, players, commision] = await Promise.all([
          apiClient.get('/api/affiliate/code'),
          apiClient.get('/api/affiliate/players'),
          apiClient.get('/api/affiliate/commision')
        ]);
        setReferralData({
          ...referralData,
          code: affiliateCode?.data?.affiliateCode,
          referredUsers: players?.data?.playersDataList,
          claimAmount: commision?.data?.commissionAmount,
          refUrl:
            `${window.location.protocol}//${window.location.host}?ref=${affiliateCode?.data?.affiliateCode}` as any
        });
      } catch (error) {
        console.error('Error fetching referral data:', error);
      }
    };
    fetchReferralData();
  }, [router]);

  const claimReferralRewards = async () => {
    setLoading(true);
    try {
      await apiClient.post('/api/affiliate/convertClaim', {
        numberOfPoints: referralData.claimAmount,
        clientdatetime: formattedDate
      });
      setReferralData((prev) => ({
        ...prev,
        successMessage: 'The referral amount was claimed successfully '
      }));
    } catch (error) {
      console.error('Error claiming referral rewards:', error);
    }
    setLoading(false);
  };

  return (
    <ReferralLayout
      {...referralData}
      slug={slug}
      isLoading={isLoading}
      claimRewards={claimReferralRewards}
      setUserClipBoard={setUserClipBoard}
      userClipBoard={userClipBoard}
      referralInfo={referralInfo}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const slug = params?.slug;
  const formattedLocale = formatLocale(locale || 'en-nz');
  const { data: referralData } = await client.query({
    query: GET_REFERRAL_PROGRAM,
    variables: { locale: formattedLocale }
  });
  const referralInfo = referralData.referralProgram.data.attributes.Text;

  const { data } = await client.query({ query: GET_DEFAULT_SEO });
  const defaultSeo = data.defaultSeo.data;

  const { data: sportsSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'sports' }
  });
  const seo = sportsSeo.pages.data;
  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      slug,
      referralInfo,
      sidebar
    }
  };
};

export default Referral;
