import { styled } from '@mui/material/styles';

export const GamePromoWrapper = styled('div')({
  display: 'flex',
  maxWidth: '390px',
  '& a': {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    '@media(max-width: 768px)': {
      maxWidth: 'initial',
      overflow: 'hidden'
    }
  },
  '& img': {
    borderRadius: '15px',
    position: 'initial !important',
    '@media(max-width: 768px)': {
      height: 'auto !important',
      objectFit: 'cover',
      objectPosition: 'top'
    }
  }
});
