import { styled } from '@mui/material/styles';

export const ButtonContainer = styled('div')({
  flex: 1,
  '& a': {
    padding: '12px 0',
    color: 'var(--white)',
    fontSize: 'var(--font-size-14)',
    lineheight: 'var(--l-height-15)',
    letterSpacing: 'var(--lt-spacing)',
    fontWeight: 400,
    textDecoration: 'none',
    transition: 'background 0.4s, color .4s',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
