import { styled } from '@mui/material/styles';

export const ShowMore = styled('div')({
  backgroundColor: 'var(--very-dark-violet-5)',
  color: 'var(--white)',
  borderRadius: '36px',
  fontWeight: '500',
  fontSize: '14px',
  padding: '16px 8px',
  minWidth: '187px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all .4s, color .4s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  '&:hover': {
    background: 'var(--very-dark-des-violet)'
  }
});
