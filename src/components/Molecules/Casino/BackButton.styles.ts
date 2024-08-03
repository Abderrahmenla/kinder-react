import { styled } from '@mui/material';

export const BackContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '30px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '4px',
    right: '-8px',
    width: '1px',
    height: '24px',
    background: 'var(--very-dark-des-violet)'
  },
  '& a': {
    display: 'flex',
    gap: '10px',
    textDecoration: 'none',
    alignItems: 'center',
    width: '100%',
    height: '30px',
    '& img': {
      width: '9px'
    }
  },
  '& p': {
    color: 'var(--soft-violet)'
  }
});
