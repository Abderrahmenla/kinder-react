import { ReactNode } from 'react';

export interface FooterMenuProps {
  children: ReactNode;
}

export interface FooterMenuItemPropsWithAuth extends FooterMenuItemProps {
  isAuthenticated?: boolean;
}

export interface FooterMenuItemProps {
  title: string;
  links: { href: string; text: string; img?: string; disabled?: boolean; target?: string }[];
  children?: ReactNode;
}

export interface MenuItem {
  href: string;
  text: string;
  disabled?: boolean;
}

export interface FooterMenuData {
  order: {
    footer: string[];
  };
  items: {
    [key: string]: {
      title: string;
      links: { href: string; text: string; disabled?: boolean; target?: string }[];
    };
  };
}
