import { styled } from '@mui/material/styles';

export const PageContainer = styled('main')({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  paddingBottom: '80px',
  paddingRight: '30px',
  paddingLeft: '30px',
  '@media screen and (max-width: 1100px)': {
    paddingBottom: '50px',
    paddingTop: '15px',
    paddingRight: '25px',
    paddingLeft: '25px'
  },
  '@media screen and (max-width: 900px)': {
    paddingRight: '20px',
    paddingLeft: '20px'
  },
  '@media screen and (max-width: 768px)': {
    paddingRight: '25px',
    paddingLeft: '25px'
  },
  '@media screen and (max-width: 479px)': {
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingBottom: '35px'
  }
});
