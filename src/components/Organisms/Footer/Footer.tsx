import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import SocialMediaLinks from '@/components/Molecules/Footer/SocialMediaLinks/SocialMediaLinks';
import { ContactButton } from '@/components/Organisms/Footer/Footer.styles';
import { FooterMenuItem } from './FooterMenuItem';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { footerMenuData } from './data';

export const Footer = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const { t } = useTranslations();

  return (
    <>
      {footerMenuData.order.footer.map((menuKey) => {
        const menu = footerMenuData.items[menuKey];
        return (
          <FooterMenuItem
            key={menuKey}
            title={t(menu.title)}
            links={menu.links?.map((link) => ({
              ...link,
              text: t(link.text),
              disabled: link.disabled && !isAuthenticated
            }))}
          />
        );
      })}
      <SocialMediaLinks />
      <Link href="/contact-us" passHref>
        <ContactButton size="p1" type="Paragraph">
          {t('contactUs')}
        </ContactButton>
      </Link>
    </>
  );
};
