import { styled } from '@mui/material/styles';

export const Overlay = styled('div')({
  background: 'rgba(21,14,37,.95)',
  width: '100%',
  height: '100%',
  position: 'fixed',
  opacity: 1,
  top: 0,
  left: 0,
  transition: 'all .4s ease'
});
