import React from 'react';
import Image from 'next/image';

interface ButtonIconProps {
  src: string;
  width: number;
  height: number;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({ src }) => {
  return <Image src={src} alt={''} width={15} height={15} data-testid={'button-icon'} />;
};
