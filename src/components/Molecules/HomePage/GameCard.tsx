import { styled } from '@mui/material/styles';
import { assets as assetPath } from '@/config/assets';
import { InfoLeft } from './InfoLeft';
import { useState } from 'react';

const GameCardContainer = styled('div')`
  border-radius: 6px;
  background: url(${assetPath}/images/vertical-asset-background.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  display: flex;
  height: 100%;
  min-height: 1px;
  max-height: 170px;
  overflow: hidden;
  align-items: baseline;
  padding: 16px;
  line-height: 1;

  @media (min-width: 1025px) {
    max-height: 248px;
  }

  @media (max-width: 375px) {
    max-height: 141px;
  }

  @media (max-width: 280px) {
    max-height: 105px;
  }
`;

const ZoomImageContainer = styled('div')<{ imageSrc: string }>`
  width: 100%;
  background-image: url(${({ imageSrc }) => (imageSrc ? imageSrc : '')});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 15px;
  min-height: 1px;
  max-height: 170px;
  height: 100%;
  transform: scale(1);

  &:hover {
    transform: scale(1.1);
  }

  transition: transform 0.2s ease-in-out;

  @media (min-width: 1025px) {
    max-height: 248px;
  }

  @media (max-width: 375px) {
    max-height: 141px;
  }

  @media (max-width: 280px) {
    max-height: 105px;
  }
`;

type GameCardType = {
  imageSrc: string;
  text: string;
  iconSrc: string;
};

export const GameCard = ({ imageSrc, text, iconSrc }: GameCardType) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <GameCardContainer onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <ZoomImageContainer data-testid="zoom-image-container" imageSrc={imageSrc} />
      <InfoLeft iconSrc={iconSrc} text={text} containerHover={hover} />
    </GameCardContainer>
  );
};
