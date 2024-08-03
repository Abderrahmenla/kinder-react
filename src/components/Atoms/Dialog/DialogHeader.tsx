import React from 'react';
import { DialogHeaderProps } from '@/components/Atoms/Dialog/types/DialogTypes';
import {
  CloseIconContainerHeader,
  DialogHeaderContainer,
  DialogHeaderLabel
} from '@/components/Atoms/Dialog/Dialog.styles';
import Image from 'next/image';
import { assets } from '@/config/assets';

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  onClose,
  dialogHeaderStyle,
  headerDivider
}) => {
  return (
    <DialogHeaderContainer style={dialogHeaderStyle} headerDivider={headerDivider}>
      <DialogHeaderLabel>{children}</DialogHeaderLabel>
      <CloseIconContainerHeader onClick={onClose}>
        <Image
          src={`${assets}/images/close_modal_icon.svg`}
          width={24}
          height={24}
          alt={'close-icon'}
        />
      </CloseIconContainerHeader>
    </DialogHeaderContainer>
  );
};
