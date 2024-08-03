import styled from '@emotion/styled';
import { SponsorRowProps, SponsorshipBannerProps } from '@/pages/sponsorship';
import React, { useMemo } from 'react';
import SponsorshipBanner from '../Molecules/Sponsorship/SponsorshipBanner';
import SponsorshipBody from '../Molecules/Sponsorship/SponsorshipBody';

const SponsorshipContainer = styled('div')`
  color: var(--white);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;

  @media (min-width: 769px) {
    padding: unset;
    margin-top: 48px;
  }
`;

interface Props {
  banner: SponsorshipBannerProps;
  contentAssets: SponsorRowProps[];
}

const Sponsorship: React.FC<Props> = ({ banner, contentAssets }) => {
  const sponsorBanner = useMemo(() => {
    const { BackgroundImage: bannerMediaData } = banner;
    return {
      imageUrl: bannerMediaData.data.attributes.url,
      altText: bannerMediaData.data.attributes.alternativeText,
      subtitle: banner.SubTitle,
      title: banner.Title
    };
  }, [banner]);

  return (
    <SponsorshipContainer>
      {sponsorBanner && <SponsorshipBanner banner={sponsorBanner} />}
      {contentAssets.map((rowAsset, index) => {
        return <SponsorshipBody key={`sponsor_row_${index}`} asset={rowAsset} index={index} />;
      })}
    </SponsorshipContainer>
  );
};

export default Sponsorship;
