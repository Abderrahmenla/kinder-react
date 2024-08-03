import { Analytics } from '@vercel/analytics/react';
import { Seo } from '@/components/Organisms/Seo/Seo';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import Cookie from 'js-cookie';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import 'react-phone-input-2/lib/style.css';
import { MainProvider } from 'src/providers/MainProvider';
import DynamicScript from '@/components/Molecules/DynamicScript';
import {
  CacheBusterProvider,
  useCacheBuster
} from '@/components/Organisms/CacheBuster/CacheBusterContext';
import axios from 'axios';
import { isOrganicSearch } from '@/utils/isOrganicSearch';
import { ORGANIC_AFFILIATE_ID, ORGANIC_CAMPAIGN_ID, ORGANIC_TOKEN } from '@/constants/index';
import { Layout } from '@/components/Organisms/Layout';
import RouteChangeListener from '@/components/Organisms/RouterChangeListener/RouterChangeListener';

const restrictedPaths = ['/settings', '/transactions', '/referral'];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // extra-small devices (portrait phones, less than 600px)
      sm: 600, // small devices (landscape phones, 600px and up)
      md: 768, // medium devices (tablets, 768px and up)
      lg: 992, // large devices (desktops, 992px and up)
      xl: 1200 // extra-large devices (large desktops, 1200px and up)
    }
  },
  typography: {
    fontFamily: 'Inter'
  }
});

const initialSidebar = {
  navigation: [],
  locales: [],
  sportsID: [],
  casinoCategories: []
};

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const defaultSeo = pageProps?.defaultSeo?.attributes || {};
  const seo = pageProps?.seo?.length ? pageProps?.seo[0]?.attributes : defaultSeo;
  const router = useRouter();
  const ref = router.query?.ref as string;
  const promoCode = router.query?.token as string;
  const { isLatestVersion, refreshCacheAndReload } = useCacheBuster();
  useEffect(() => {
    try {
      const cacheValue = Cookies.get('spinbet-cache');
      if (caches && !cacheValue) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });

        Cookies.set('spinbet-cache', 'true', { expires: 5 });

        router.reload();
      }
    } catch (ex: any) {
      console.error('Error', ex.message);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://whois.spinbet.com');
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://whois.spinbet.com');
        const clientIp = response.data?.ipAddress;
        Cookies.set('clientIp', clientIp, { expires: 1 });
      } catch (error) {
        console.error('Error fetching client IP:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Handle restricted paths
    const sessionToken = Cookie.get('sessionToken');
    if (!sessionToken && restrictedPaths.some((path) => router.pathname.includes(path))) {
      router.push('/');
    }
  }, [router.pathname, router.push]);

  const handleRefCookie = useMemo(() => {
    return () => {
      const oldRef = Cookies.get('ref');
      if (oldRef !== ref && !['undefined', undefined, null, 'null', ''].includes(ref)) {
        Cookies.set('ref', ref, { expires: 30 });
      }
    };
  }, [ref]);

  const handlePromoCodeCookie = useMemo(() => {
    return () => {
      const oldPromoCode = Cookies.get('ref');
      if (
        oldPromoCode !== promoCode &&
        !['undefined', undefined, null, 'null', ''].includes(promoCode)
      ) {
        Cookies.set('promoCodeToken', promoCode, { expires: 30 });
      }
    };
  }, [promoCode]);

  const handleRouterQueryCookies = useMemo(() => {
    return () => {
      const { AffCampaign, affiliateId, token } = router.query;
      const isOrganic = isOrganicSearch();

      if (isOrganic) {
        Cookies.set('AffCampaign', ORGANIC_CAMPAIGN_ID, { expires: 30 });
        Cookies.set('affiliateId', ORGANIC_AFFILIATE_ID, { expires: 30 });
        Cookies.set('token', ORGANIC_TOKEN, { expires: 30 });
      } else {
        if (AffCampaign) Cookies.set('AffCampaign', AffCampaign.toString(), { expires: 30 });
        if (affiliateId) Cookies.set('affiliateId', affiliateId.toString(), { expires: 30 });
        if (token) Cookies.set('token', token.toString(), { expires: 30 });
      }
    };
  }, [router.query]);

  useEffect(() => {
    handleRefCookie();
  }, [handleRefCookie]);

  useEffect(() => {
    handlePromoCodeCookie();
  }, [handlePromoCodeCookie]);

  useEffect(() => {
    handleRouterQueryCookies();
  }, [handleRouterQueryCookies]);

  useEffect(() => {
    if (!isLatestVersion) {
      refreshCacheAndReload();
    }
  }, [isLatestVersion, refreshCacheAndReload]);

  return (
    <ThemeProvider theme={theme}>
      <DynamicScript pathname={router.pathname} />
      <CssBaseline />
      <CacheBusterProvider>
        <MainProvider pageProps={pageProps}>
          <Seo {...seo?.Seo} />
          <main>
            <DynamicScript pathname={router.pathname} />
            <RouteChangeListener />
            <Layout
              sidebar={pageProps.sidebar ? pageProps.sidebar : initialSidebar}
              seo={pageProps?.seo}
            >
              <Component {...pageProps} seo={seo} />
            </Layout>
            <Analytics />
          </main>
        </MainProvider>
      </CacheBusterProvider>
    </ThemeProvider>
  );
};

export default MyApp;
