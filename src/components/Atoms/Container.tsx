import React, { ReactNode, HTMLAttributes, MouseEvent } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  open?: boolean;
  isMobile?: boolean;
}

export const Container = ({ children, className, ...rest }: ContainerProps): JSX.Element => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};
