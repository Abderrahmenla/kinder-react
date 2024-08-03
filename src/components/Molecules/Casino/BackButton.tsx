import React from 'react';
import { BackContainer } from '@/components/Molecules/Casino/BackButton.styles';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

interface BackButtonProps {
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const { t } = useTranslations();

  return (
    <BackContainer id="back-btn">
      <Link href={href}>
        <Image
          src={`${assets}/images/chevron-left-icon.svg`}
          alt={t('returnToPreviousPage')}
          width={15}
          height={15}
        />
      </Link>
    </BackContainer>
  );
};
