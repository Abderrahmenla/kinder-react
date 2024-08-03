import { styled } from '@mui/material';

interface FullScreenButtonProps {
  isFullScreen?: boolean;
}

export const FullScreenIcon = styled('a')<FullScreenButtonProps>(({ isFullScreen }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px',
  cursor: 'pointer',
  textDecoration: 'none',
  width: '34px',
  height: '34px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '5px',
    left: '-13px',
    width: '1px',
    height: '24px',
    background: 'var(--very-dark-des-violet)'
  },
  '& svg path': {
    transition: 'fill .4s',
    cursor: 'pointer'
  },
  '&:hover svg path': {
    fill: 'var(--darker-white)'
  },
  '@media(max-width: 900px)': {
    marginRight: '0',
    order: 1,
    position: isFullScreen ? 'initial' : 'absolute',
    bottom: isFullScreen ? 'unset' : '-60px',
    top: isFullScreen ? '-65px' : 'unset',
    right: '10px',
    width: isFullScreen ? '40px' : '50px',
    height: isFullScreen ? '40px' : '50px'
  }
}));
