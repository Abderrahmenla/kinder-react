import Button from '@mui/material/Button';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'inherit';
  disabled?: boolean;
}

export const ButtonComponent = ({
  variant = 'contained',
  color = 'primary',
  style,
  children,
  disabled,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <Button variant={variant} color={color} style={style} {...rest} disabled={disabled}>
      {children}
    </Button>
  );
};
