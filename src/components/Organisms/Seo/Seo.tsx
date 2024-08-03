import Head from 'next/head';
import { MetaDataProps } from 'src/graphql/types/seo';
import { useRouter } from 'next/router';
import { assets } from '@/config/assets';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;

export const Seo: React.FC<MetaDataProps> = (seo) => {
  const { metaTitle, metaDescription, metaImage, metaGameTitle } = seo;
  const router = useRouter();
  const cleanPath = router.asPath.split('#')[0].split('?')[0];
  const locale = router.locale || 'default';
  const locales = router.locales;

  const createLocaleUrl = (locale: string) => {
    const pathPrefix = locale === 'en' ? '' : locale === 'default' ? '' : `/${locale}`;
    let fullUrl = `${DOMAIN}${pathPrefix}${cleanPath}`;
    if (fullUrl.endsWith('/') && fullUrl.length > 1) {
      fullUrl = fullUrl.slice(0, -1);
    }
    return fullUrl;
  };

  return (
    <Head>
      <meta charSet="utf-8" />

      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
      />

      <link rel="icon" href={`${assets}/images/favicon.png`} type="image/png" />
      <link rel="shortcut icon" href={`${assets}/images/favico-32x32.png`} type="image/png" />

      <title key="title">{`${metaGameTitle ? metaGameTitle : metaTitle}`}</title>
      <meta name="description" content={metaDescription} />

      <meta name="robots" content="index, follow" />

      <meta name="google-site-verification" content="H7zAubKbLBMs7ppECkqBB-SDbw8VPeX2W8SkBIUUkXI" />

      <meta name="msapplication-TileColor" content="#1e1e1e" />
      <meta name="theme-color" content="#ffffff" />
      <meta key="og_type" property="og:type" content="website" />
      <meta
        key="og_title"
        property="og:title"
        content={metaGameTitle ? metaGameTitle : metaTitle}
      />
      <meta key="og_description" property="og:description" content={metaDescription} />
      <meta key="og_locale" property="og:locale" content="en_NZ" />
      <meta key="og_site_name" property="og:site_name" content="SpinBet" />
      <meta key="og_url" property="og:url" content={DOMAIN} />
      <meta key="og_image" property="og:image" content={metaImage?.data?.attributes?.url ?? ''} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="SpinBet" />
      <meta key="twitter:creator" name="twitter:creator" content="SpinBet" />
      <meta key="twitter:title" property="twitter:title" content={metaTitle} />
      <meta key="twitter:description" property="twitter:description" content={metaDescription} />

      <link rel="canonical" href={createLocaleUrl(locale)} />

      {locales?.map((locale) => {
        const hrefLang = locale === 'en' ? '' : locale;
        return (
          <link key={locale} rel="alternate" hrefLang={hrefLang} href={createLocaleUrl(locale)} />
        );
      })}
    </Head>
  );
};
