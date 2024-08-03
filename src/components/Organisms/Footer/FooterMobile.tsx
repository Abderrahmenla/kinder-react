import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { FooterMenuItem } from './FooterMenuItem';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';
import { footerMenuData } from '@/components/Organisms/Footer/data';
import { generateMenuItems } from './util';
import SocialMediaLinks from '@/components/Molecules/Footer/SocialMediaLinks/SocialMediaLinks';
import { ContactButton, FooterWrapper } from '@/components/Organisms/Footer/Footer.styles';

export const FooterMobile = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const { t } = useTranslations();

  const menuKeysFirstWrapper = ['casino', 'promo', 'support'];
  const menuKeysSecondWrapper = ['sports', 'contacts'];

  const menuItemsFirstWrapper = generateMenuItems(
    menuKeysFirstWrapper,
    t,
    isAuthenticated,
    footerMenuData
  );
  const menuItemsSecondWrapper = generateMenuItems(
    menuKeysSecondWrapper,
    t,
    isAuthenticated,
    footerMenuData
  );

  return (
    <>
      <FooterWrapper>
        {menuItemsFirstWrapper.map(({ key, title, links }) => (
          <FooterMenuItem key={key} title={title} links={links} />
        ))}
      </FooterWrapper>

      <FooterWrapper>
        {menuItemsSecondWrapper.map(({ key, title, links }) => (
          <FooterMenuItem key={key} title={title} links={key === 'contacts' ? links : links} />
        ))}
        <SocialMediaLinks />
      </FooterWrapper>

      <Link href="/contact-us" passHref>
        <ContactButton size="p1" type="Paragraph">
          {t('contactUs')}
        </ContactButton>
      </Link>
    </>
  );
};
