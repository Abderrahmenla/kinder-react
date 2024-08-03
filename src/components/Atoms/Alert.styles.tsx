import { styled } from '@mui/material';

export const AlertContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '336px',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '1.5em',
  backgroundColor: '#3C2A63',
  padding: '20px',
  '@media screen and (max-width: 768px)': {
    width: '300px'
  },
  '@media screen and (max-width: 479px)': {
    width: '250px'
  }
});

export const Overlay = styled('div')({
  background: 'rgba(21,14,37,.95)',
  width: '100%',
  height: '100%',
  position: 'fixed',
  opacity: 1,
  top: 0,
  left: 0,
  transition: 'all .4s ease',
  zIndex: 1
});

export const AlertContentContainer = styled('div')({
  paddingTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const ConfirmationButton = styled('button')<{ isCancel?: boolean }>(({ isCancel }) => ({
  width: '146px',
  transition: 'box-shadow .4s, background-color .3s, background-size .3s',
  borderRadius: '6px',
  backgroundColor: isCancel ? 'var(--dark-violet)' : 'var(--yellow)',
  backgroundImage: isCancel
    ? 'transparent'
    : 'var(--gradient-gradient-2, linear-gradient(90deg, #FFDE09 0%, #FFBD14 99.48%))',
  padding: '5px',
  color: isCancel ? 'var(--soft-blue-100)' : 'var(--very-dark-violet)',
  letterSpacing: 'var(--lt-spacing)',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '20px',
  textTransform: 'uppercase',
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  height: '44px',
  border: 'none',
  backgroundSize: '100% 100%',
  '&:hover': {
    backgroundColor: isCancel ? 'var(--light-blue)' : 'var(--yellow-4)',
    color: isCancel ? 'var(--darker-white)' : 'var(--very-dark-violet)',
    backgroundSize: '200% 100%'
  },
  '@media screen and (max-width: 768px)': {
    width: '120px'
  },
  '@media screen and (max-width: 479px)': {
    width: '100px'
  }
}));

export const ConfirmationText = styled('div')({
  color: 'var(--darker-white)',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  textAlign: 'center',
  maxWidth: '88%',
  margin: '0 auto'
});
