import { styled } from '@mui/material/styles';

export const FilterContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  overflow: 'hidden',

  '@media(max-width: 991px)': {
    marginBottom: '12px',
    width: '100%',
    maxWidth: 'initial'
  }
}));

export const FilterInnerContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflowY: 'hidden',
  maxHeight: '58px',
  gap: '8px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));
