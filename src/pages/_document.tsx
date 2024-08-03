import { Html, Head, Main, NextScript } from 'next/document';
import { PRECONNECT_URLS } from '../constants';
import Script from 'next/script';

export default function Document() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const ORIGIN_URLS = PRECONNECT_URLS;
  return (
    <Html>
      <Head>
        <Script id={'gtm'} strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <link rel="stylesheet" href={`/assets/styles/globals.css`} />
        {ORIGIN_URLS.map((origin) => (
          <link key={origin.url} rel={origin.rel} href={origin.url} />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          type="text/javascript"
          src="/scripts/cashier.js"
          strategy="beforeInteractive"
        ></Script>
        <Script id={'gtm-iframe'} strategy="afterInteractive">
          {`
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.googletagmanager.com/ns.html?id=${GTM_ID}';
            iframe.height = '0';
            iframe.width = '0';
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            document.body.appendChild(iframe);
          `}
        </Script>
      </body>
    </Html>
  );
}
