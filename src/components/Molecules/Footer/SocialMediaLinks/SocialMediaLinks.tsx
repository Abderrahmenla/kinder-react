import React from 'react';
import { assets } from '@/config/assets';
import { SOCIAL_LINKS } from '@/constants/index';
import {
  SocialIcon,
  SocialLink,
  SocialLinksContainer,
  SocialLinksWrapper
} from './SocialMediaLinks.styles';
import { FtMenuTitle } from '@/components/Organisms/Footer/Footer.styles';
import { useTranslations } from '@/hooks/useTranslations';

const socialLinks = [
  {
    href: SOCIAL_LINKS.facebook,
    imgSrc: `${assets}/images/facebook-icon.svg`,
    alt: 'facebookIcon'
  },
  {
    href: SOCIAL_LINKS.instagram,
    imgSrc: `${assets}/images/instagram-icon.svg`,
    alt: 'instagramIcon'
  },
  {
    href: SOCIAL_LINKS.telegram,
    imgSrc: `${assets}/images/telegram-icon.svg`,
    alt: 'telegramIcon'
  },
  {
    href: SOCIAL_LINKS.twitter,
    imgSrc: `${assets}/images/twitter-icon.svg`,
    alt: 'twitterIcon'
  }
];

const SocialMediaLinks = () => {
  const { t } = useTranslations();

  return (
    <SocialLinksContainer>
      <FtMenuTitle size="b1" type="Body">
        {t('followUs')}
      </FtMenuTitle>
      <SocialLinksWrapper>
        {socialLinks.map(({ href, imgSrc, alt }) => (
          <SocialLink key={href} href={href} target="_blank" rel="noopener noreferrer">
            <SocialIcon data-testid="social-media-icon" src={imgSrc} alt={alt} />
          </SocialLink>
        ))}
      </SocialLinksWrapper>
    </SocialLinksContainer>
  );
};

export default SocialMediaLinks;
