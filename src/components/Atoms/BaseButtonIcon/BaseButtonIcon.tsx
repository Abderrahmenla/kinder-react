import React from 'react';
import ButtonImagePlaceholder from '../ButtonImagePlaceholder';

export interface BaseButtonIconProps {
  size?: 'Large' | 'Medium' | 'Small';
  children?: React.ReactNode;
  color: 'Primary' | 'Secondary' | 'Text' | 'Ternary';
  className?: string;
}

const BaseButtonIcon: React.FC<BaseButtonIconProps> = ({ size, children, color, className }) => {
  let dimensions = { width: '24', height: '24' };

  switch (size) {
    case 'Medium':
      dimensions = { width: '20', height: '20' };
      break;
    case 'Small':
      dimensions = { width: '16', height: '16' };
      break;
    default:
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      fill={color === 'Primary' ? 'black' : '#A391E2'}
      viewBox="0 0 24 24"
    >
      {children ? children : <ButtonImagePlaceholder />}
    </svg>
  );
};

export default BaseButtonIcon;
