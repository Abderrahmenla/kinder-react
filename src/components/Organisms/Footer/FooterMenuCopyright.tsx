import React from 'react';
import { FooterMenuProps } from './FooterTypes';
import { CustomContainer, FtMenuListCopyright, FtRowCopyright } from './Footer.styles';

export const FooterMenuCopyright: React.FC<FooterMenuProps> = ({ children }) => (
  <FtRowCopyright>
    <CustomContainer>
      <FtMenuListCopyright>{children}</FtMenuListCopyright>
    </CustomContainer>
  </FtRowCopyright>
);
