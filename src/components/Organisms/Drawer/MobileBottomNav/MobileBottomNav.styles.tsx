import { styled } from '@mui/material/styles';

export const MobileMenuWrapper = styled('div')<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  '@media screen and (min-width:525px)': {
    padding: '0px 10px'
  },
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundColor: 'var(--very-dark-violet-3)',
  width: '100%',
  height: '60px',
  display: isMobile ? 'block' : 'none',
  position: 'fixed',
  bottom: '-1px',
  zIndex: '1210',
  padding: '0px 14px',
  transition: theme.transitions.create(['left', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: 500
  })
}));

interface MobileDrawerProps {
  open?: boolean;
}

export const MobileBottomNavStyles = styled('div')<MobileDrawerProps>(({ open = false }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 30,
  transform: `translateX(${open ? '0' : '-100%'})`,
  transition: 'transform 0.3s ease-in-out'
}));

export const MobileMenuList = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});
