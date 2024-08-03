import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { FullScreenIcon } from './FullScreenButton.style';
import { useTranslations } from '@/hooks/useTranslations';

type FullScreenButtonProps = {
  openFullScreen: () => void;
  isFullScreen?: boolean;
};

const FullScreenButton: React.FC<FullScreenButtonProps> = ({ openFullScreen, isFullScreen }) => {
  const { t } = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    openFullScreen();
  };

  return (
    <FullScreenIcon
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      isFullScreen={isFullScreen}
    >
      <Image
        src={`${assets}/images/${
          isHovered ? 'fullscreen-outline-icon-white' : 'fullscreen-outline-icon'
        }.svg`}
        width={20}
        height={20}
        alt={t('fullscreen')}
      />
    </FullScreenIcon>
  );
};

export default FullScreenButton;
