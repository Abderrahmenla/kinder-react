import React from 'react';
import {
  BannerBodyText,
  BannerContiner,
  BannerFooterText,
  BannerHeader,
  BannerSponsorName,
  BannerTextContainer
} from './SponsorshipBanner.styles';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';

interface Props {
  banner: {
    imageUrl: string;
    altText: string;
    subtitle: string;
    title: string;
  };
}

const SponsorshipBanner: React.FC<Props> = (props) => {
  const isMobile = UseMediaQuery(768); // Mobile Breakpoint

  return (
    <BannerContiner imageUrl={props.banner.imageUrl}>
      {isMobile && (
        <Image
          src={props.banner.imageUrl}
          alt={props.banner.altText}
          width={654}
          height={356}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '111%',
            background: '#430d57',
            borderRadius: '8px'
          }}
        />
      )}
      <BannerTextContainer>
        <BannerHeader size="h3" type="Heading" dataTestId="banner-title">
          Sponsorship
        </BannerHeader>
        <BannerBodyText size="b2" type="Body" dataTestId="banner-body-text">
          {props.banner.subtitle
            ? props.banner.subtitle
            : 'The Journey of MMA Fighter Dan Hooker with Spin Bet Sponsorship'}
        </BannerBodyText>
        <BannerFooterText size="b2" type="Body" dataTestId="banner-footer-text">
          SpinBet Official Sponsor of{' '}
          <BannerSponsorName size="h4" type="Heading">
            {props.banner.title ? props.banner.title : 'Dan The Hangman&quot Hooker'}
          </BannerSponsorName>
        </BannerFooterText>
      </BannerTextContainer>
    </BannerContiner>
  );
};

export default SponsorshipBanner;
