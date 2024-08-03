import React from 'react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { assets } from '@/config/assets';
const Button = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: 'var(--mod-blue-200)',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  right: '0',
  height: '46px',
  width: '46px',
  background: 'linear-gradient(256.72deg, #0092FF -3.46%, #9746FF 106.35%)'
});

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Image src={`${assets}/images/search.svg`} alt="search" width={20} height={20} />
    </Button>
  );
};
