import React, { MouseEventHandler } from 'react';
import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';
import Image from 'next/image';

const ArrowButtonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  width: '32px',
  height: '32px',
  flexShrink: 0,
  background: 'var(--dark-violet)',
  borderRadius: '10px',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  transition: 'box-shadow .4s',
  '&:hover': {
    boxShadow: '0px 0px 10px rgb(91 79 153)',
    transition: 'box-shadow .4s'
  }
});

interface ArrowButtonProps {
  direction: 'prev' | 'next';
  onClick?: MouseEventHandler;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => (
  <ArrowButtonContainer className={`nav-${direction}`} onClick={onClick}>
    <Image
      width={11}
      height={7}
      alt={direction === 'prev' ? 'Left' : 'Right'}
      src={`${assets}/images/arrow${direction === 'prev' ? 'Left' : 'Right'}.svg`}
    />
  </ArrowButtonContainer>
);

export default ArrowButton;
