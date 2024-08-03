import { styled } from '@mui/material/styles';

export const PromotionInformationWrapper = styled('div')({
  width: '100%',
  flexWrap: 'nowrap',
  gap: '40px',
  margin: '0 auto',
  '@media screen and (max-width:1023px)': {
    paddingLeft: '10px',
    paddingRight: '10px',
    margin: '0 auto',
    width: '92%'
  },
  '@media screen and (max-width:650px)': {
    paddingLeft: '0',
    paddingRight: '0'
  }
});
