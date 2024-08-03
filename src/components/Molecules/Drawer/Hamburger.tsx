import React from 'react';
import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';
import { Container } from '../../Atoms/Container';
import Image from 'next/image';

const HamburgerContainer = styled(Container)(({ open, isMobile }) => ({
  borderRadius: '0px 6px 6px 0px',
  background: isMobile ? 'none' : 'var(--very-dark-violet-5)',
  height: isMobile ? '36px' : '40px',
  position: 'fixed',
  top: 0,
  width: 40,
  display: isMobile ? 'none' : 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1301,
  transition: 'left 300ms',
  left: open ? '260px' : '60px',
  '&:hover': {
    backgroundColor: 'var(--dark-violet)'
  }
}));

const HamburgerImage = styled(Image)({
  height: '24px',
  width: '24px',
  cursor: 'pointer'
});

interface HamburgerProps {
  onClick: () => void;
  open: boolean;
  isMobile?: boolean;
}

const Hamburger: React.FC<HamburgerProps> = ({ onClick, open, isMobile }) => {
  return (
    <HamburgerContainer
      isMobile={isMobile}
      open={open}
      onClick={onClick}
      data-testid="hamburger-container"
      className={'hamburger-container'}
    >
      <HamburgerImage
        width={24}
        height={24}
        alt={'Hamburger icon'}
        src={`${assets}/images/drawer/hamburger${open ? 'Close' : 'Open'}.svg`}
      />
    </HamburgerContainer>
  );
};

export default Hamburger;
