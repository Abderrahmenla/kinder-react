import React from 'react';
export interface MobileMenuItemProps {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive: boolean;
}

export interface MobileDrawerProps {
  icon?: string;
  isAuthenticated: boolean;
}
