import React, { ReactNode } from 'react';

export interface DialogProps {
  open: boolean;
  notCentered?: boolean;
  isMobile?: boolean;
  isGameModal?: boolean;
}

export interface DialogHeaderProps {
  children?: ReactNode;
  onClose?: () => void;
  dialogHeaderStyle?: React.CSSProperties;
  dialogBodyStyle?: React.CSSProperties;
  headerDivider?: boolean;
}

export interface DialogWrapperProps {
  children?: ReactNode;
  open: boolean;
  maxWidth?: number | string;
}

export interface DialogPropsBase extends DialogHeaderProps, DialogWrapperProps {
  headerContent?: () => React.JSX.Element;
  bodyContent: () => React.JSX.Element;
  footerContent?: () => React.JSX.Element;
  disableHeader?: boolean;
}
