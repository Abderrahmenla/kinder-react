import React, { useState } from 'react';
import {
  VerificationPageCard,
  VerificationPageCardImage,
  VerificationPageName
} from '../../../../Organisms/Settings/Verification/Verification.style';
import Image from 'next/image';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { assets as assetPath } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import { VerificationCardProps } from '../../../../Organisms/Settings/Verification/Verification.type';

const VerificationCardComponent: React.FC<VerificationCardProps> = ({ page, setIsPageOpen }) => {
  const [isCardHover, setIsCardHover] = useState('');
  const isMobile = UseMediaQuery(768);
  const { t } = useTranslations();

  return (
    <VerificationPageCard
      key={`page-${page}`}
      onMouseEnter={() => setIsCardHover(page)}
      onMouseLeave={() => setIsCardHover('')}
      onMouseDown={() => setIsPageOpen(page)}
    >
      <VerificationPageCardImage isHover={!isMobile && isCardHover === page}>
        <Image
          src={`${assetPath}/images/verification-${page}-card-image.svg`}
          alt={`verification-${page}`}
          width={isMobile ? 48 : 68}
          height={isMobile ? 48 : 68}
        />
      </VerificationPageCardImage>
      <VerificationPageName size="b2">{t(page)}</VerificationPageName>
    </VerificationPageCard>
  );
};

export default VerificationCardComponent;
