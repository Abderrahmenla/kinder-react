import { styled } from '@mui/material/styles';

export const ItemWrapper = styled('span')({
  listStyle: 'none',
  color: 'var(--light-grayish-blue)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
  width: '90px',
  gap: '6px',
  '&.active': {
    borderTop: '1px solid var(--yellow)',
    background:
      'linear-gradient(180deg, rgba(255, 222, 9, 0.30) -86.67%, rgba(255, 222, 9, 0.00) 100%)',
    backdropFilter: 'blur(6px)',
    '& path': {
      fill: 'var(--yellow-4)'
    }
  }
});

export const ItemText = styled('p')({
  fontSize: '10px',
  lineHeight: '14px',
  fontWeight: '500',
  padding: '0'
});
