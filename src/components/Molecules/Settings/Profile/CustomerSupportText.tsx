import { CustomerSupportStyledText } from '@/components/Organisms/Settings/Profile/Profile.style';
import Link from 'next/link';

const CustomerSupportText: React.FC<{ t: (key: string) => string; isMobile: boolean }> = ({
  t,
  isMobile
}) => {
  return (
    <CustomerSupportStyledText size="b2" isMobile={isMobile}>
      {t('changeNumberToolTip')} <Link href="/contact-us">{t('customerSupport')}</Link>
    </CustomerSupportStyledText>
  );
};

export default CustomerSupportText;
