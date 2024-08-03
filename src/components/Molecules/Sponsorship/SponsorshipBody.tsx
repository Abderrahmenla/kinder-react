import { SponsorRowProps } from '@/pages/sponsorship';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  SponsorBodyContainer,
  SponsorBodyMedia,
  SponsorBodySubTitle,
  SponsorBodyTextContainer,
  SponsorBodyTitle,
  Video,
  VideoIframe
} from './SponsorshipBody.styles';

interface SponsorshipBodyProps {
  asset: SponsorRowProps;
  index: number;
}

const SponsorshipBody: React.FC<SponsorshipBodyProps> = ({ asset, index }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [isEven, setIsEven] = useState(false);

  useEffect(() => {
    const assetExtension = asset.Image.data.attributes.url?.split('.').pop()?.toLowerCase();
    if (['mp4', 'avi', 'mov'].includes(assetExtension ? assetExtension : '')) {
      setIsVideo(true);
    }
    setIsEven((index + 1) % 2 === 0);
  }, [asset.Image.data.attributes.url, index]);
  return (
    <SponsorBodyContainer $isEven={isEven}>
      <SponsorBodyMedia $isEven={isEven}>
        {asset.VideoURL ? (
          <VideoIframe src={asset.VideoURL} data-testid={`sponsorship-media-${index}-video`} />
        ) : isVideo ? (
          <Video
            controls
            autoPlay
            muted
            playsInline
            preload="auto"
            data-testid={`sponsorship-media-${index}-video`}
          >
            <source src={asset.Image.data.attributes.url} type="video/mp4" />
          </Video>
        ) : (
          <Image
            src={asset.Image.data.attributes.url}
            alt={asset.Image.data.attributes.alternativeText}
            width={654}
            height={356}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            data-testid={`sponsorship-media-${index}-image`}
          />
        )}
      </SponsorBodyMedia>
      <SponsorBodyTextContainer>
        <SponsorBodyTitle
          type="Heading"
          size="h3"
          dataTestId={`sponsorship-rowcontent-${index}-title`}
        >
          {asset.Title}
        </SponsorBodyTitle>
        <SponsorBodySubTitle
          type="Body"
          size="b2"
          dataTestId={`sponsorship-rowcontent-${index}-subtitle`}
        >
          {asset.Text}
        </SponsorBodySubTitle>
      </SponsorBodyTextContainer>
    </SponsorBodyContainer>
  );
};

export default SponsorshipBody;
