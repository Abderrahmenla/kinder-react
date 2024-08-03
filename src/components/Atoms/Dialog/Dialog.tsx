import React from 'react';
import { DialogPropsBase } from '@/components/Atoms/Dialog/types/DialogTypes';
import { DialogHeader } from '@/components/Atoms/Dialog/DialogHeader';
import { Overlay } from '@/components/Atoms';
import {
  DialogBody,
  DialogContainer,
  DialogFooter,
  DialogWrapper
} from '@/components/Atoms/Dialog/Dialog.styles';
import { SerializedStyles } from '@emotion/react';

export const Dialog: React.FC<
  DialogPropsBase & {
    bodyBackground?: string;
    disableHeader?: boolean;
    bodyStyles?: SerializedStyles;
    containerStyles?: SerializedStyles;
  }
> = ({
  headerContent,
  bodyContent,
  footerContent,
  headerDivider,
  onClose,
  open,
  maxWidth,
  dialogHeaderStyle,
  dialogBodyStyle,
  disableHeader
}) => {
  return (
    <DialogContainer open={open}>
      <Overlay onClick={onClose} />
      <DialogWrapper maxWidth={maxWidth} className="dialog-wrapper">
        {!disableHeader && (
          <DialogHeader
            onClose={onClose}
            dialogHeaderStyle={dialogHeaderStyle}
            headerDivider={headerDivider}
          >
            {headerContent && headerContent()}
          </DialogHeader>
        )}
        <DialogBody style={dialogBodyStyle}>{bodyContent()}</DialogBody>
        {footerContent && <DialogFooter>{footerContent()}</DialogFooter>}
      </DialogWrapper>
    </DialogContainer>
  );
};
export * from './Dialog.styles';
