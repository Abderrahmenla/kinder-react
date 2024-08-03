import { styled } from '@mui/material/styles';

export const GhostButton = styled('span')({
  background: 'var(--dark-blue)',
  fontWeight: 700,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-16)',
  color: 'var(--white)',
  textTransform: 'uppercase',
  textDecoration: 'none',
  minWidth: '190px',
  padding: '15px 33px',
  borderRadius: '23px',
  cursor: 'pointer',
  display: 'inline-block',
  verticalAlign: 'top',
  textAlign: 'center'
});
