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
  width: '395px',
  borderRadius: '15px',
  zIndex: 2,
  color: '#fff',
  fontSize: '1.5em',
  backgroundColor: '#392372',
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
  paddingTop: '34px',
  paddingBottom: '34px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const BonusActivatedIconContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '47px',
  width: '47px',
  borderRadius: '25px',
  backgroundColor: 'var(--lime-green)'
});

export const BonusConfirmationButton = styled('button')({
  width: '100px',
  transition: 'box-shadow .4s',
  background: 'linear-gradient(90deg, #FFDE09 0%, #FFBD14 99.48%)',
  borderRadius: '24px',
  padding: '5px',
  color: 'var(--very-dark-violet)',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-13)',
  letterSpacing: 'var(--lt-spacing)',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  border: 'none',
  textAlign: 'center'
});
