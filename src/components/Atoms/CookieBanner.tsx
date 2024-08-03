import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Button from '../Molecules/Button';
import { CookieBannerMain } from './CookieBannerStyle';
import { useTranslations } from '@/hooks/useTranslations';

const CookieBanner = () => {
  const [hideBanner, setHideBanner] = useState<boolean>(true);
  const { t } = useTranslations();

  useEffect(() => {
    const opt_in_capturing = Cookies.get('opt_in_capturing');
    if (opt_in_capturing && !!JSON.parse(opt_in_capturing)) setHideBanner(true);
    else setHideBanner(false);
  }, []);

  const acceptCookies = () => {
    Cookies.set('opt_in_capturing', 'true');
    setHideBanner(true);
  };

  if (hideBanner) return null;

  return (
    <CookieBannerMain data-testid="cookie_policy">
      <p>
        {t('cookiePolicy')} <Link href="/policies/privacy">{t('cookiePolicyLink')}</Link>.
      </p>
      <Button
        dataTestId="cookies_button_accept"
        text="OK"
        onClick={acceptCookies}
        collapsible={false}
        color="linear-gradient(90deg, #ffde09 0%, #ffbd14 99.48%)"
      />
    </CookieBannerMain>
  );
};

export default CookieBanner;
