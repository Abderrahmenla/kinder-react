import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const BlogContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: '30px',
  paddingRight: '30px',
  margin: '0px',

  [theme.breakpoints.down('md')]: {
    paddingLeft: '25px',
    paddingRight: '25px',
    margin: '0px'
  }
}));
export const BlogPageHeading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& h1': {
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '43px',
    color: 'var(--white)',
    margin: 0,
    '@media screen and (max-width:1100px)': {
      fontSize: '28px',
      lineHeight: '34px'
    }
  }
});
export const FeaturedBlogPostWrapper = styled('div')({
  display: 'flex',
  marginBottom: '40px'
});
export const BlogPostsList = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  borderRadius: '15px',
  '@media screen and (max-width:650px)': {
    flexDirection: 'column'
  }
});
export const BlogPostsItem = styled('div')(({ theme }) => ({
  width: '31%',
  display: 'flex',
  borderRadius: '15px',
  marginBottom: '40px',
  '&:hover': {
    boxShadow: '0px 0px 30px var(--very-dark-violet-200)'
  },
  '&:hover span > img': {
    transform: 'scale(1.1)'
  },
  [theme.breakpoints.down('xl')]: {
    width: '48%'
  },
  '@media screen and (max-width:650px)': {
    width: '100%'
  }
}));
