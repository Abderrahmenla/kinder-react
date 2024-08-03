import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

const Label = styled('p')({
  marginLeft: '6px',
  color: 'var(--soft-violet)',
  whiteSpace: 'nowrap',
  transition: 'color .4s'
});

type ButtonTextProps = {
  children: ReactNode;
};

export const ButtonText = ({ children }: ButtonTextProps) => {
  return <Label>{children}</Label>;
};
