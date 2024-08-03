import { styled } from '@mui/material/styles';

export const BlogPostDetailContainer = styled('div')({
  padding: '16px 16px 37px 16px',
  '& h2': {
    fontSize: '21px',
    lineHeight: '25px',
    fontWeight: 700,
    color: 'var(--white)',
    margin: 0,
    '@media screen and (max-width:1024px)': {
      fontSize: '18px',
      lineHeight: '26px'
    },
    '@media screen and (max-width:768px)': {
      lineHeight: '24px'
    }
  },
  '@media screen and (max-width:768px)': {
    padding: '20px'
  }
});
