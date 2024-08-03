import { styled } from '@mui/material/styles';

export const ButtonContainer = styled('div')({
  '& a': {
    padding: '8px 0',
    width: '100%',
    maxWidth: '168px',
    color: 'var(--white)',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background 0.4s, color .4s',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media screen and (max-width: 768px)': {
      fontSize: '12px',
      lineHeight: '14px'
    },

    '@media screen and (max-width: 480px)': {
      width: '100%',
      padding: '8px 2px',
      fontSize: '10px',
      lineHeight: '12px'
    }
  }
});
