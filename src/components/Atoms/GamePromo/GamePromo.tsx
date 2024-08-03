import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GamePromoWrapper } from '@/components/Atoms/GamePromo/GamePromo.style';

interface GamePromoProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  href: string;
  fill: boolean;
}

export const GamePromo: React.FC<GamePromoProps> = ({ href, src, alt, height, width, fill }) => {
  return (
    <GamePromoWrapper>
      <Link href={href || ''}>
        <Image src={src} alt={alt} height={height} width={width} fill={fill} loading="eager" />
      </Link>
    </GamePromoWrapper>
  );
};
