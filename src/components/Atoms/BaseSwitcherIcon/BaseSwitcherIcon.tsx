import React from 'react';

export interface BaseSwitcherIconProps {
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

const BaseSwitcherIcon: React.FC<BaseSwitcherIconProps> = ({
  children,
  width = 24,
  height = 24
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      {children}
    </svg>
  );
};

export default BaseSwitcherIcon;
