import { styled } from '@mui/material/styles';

export const PromotionPostDetailContainer = styled('div')({
  padding: '14px',
  '& span': {
    fontSize: '14px',
    lineHeight: '25px',
    fontWeight: 500,
    color: 'var(--white)',
    margin: 0,
    '@media screen and (max-width:768px)': {
      lineHeight: '24px'
    }
  }
});
