import { styled } from '@mui/material/styles';

export const BlogInformationWrapper = styled('div')({
  width: '784px',
  flexWrap: 'nowrap',
  gap: '40px',
  margin: '0 auto',
  '@media screen and (max-width:1023px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0 auto',
    width: '92%'
  },
  '@media screen and (max-width:900px)': {
    width: '100%'
  }
});
