import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const BlogFeaturedPostContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  borderRadius: '15px',
  marginTop: '50px',
  background: 'var(--very-dark-violet-200)',
  transition: 'box-shadow .4s',
  [theme.breakpoints.down('lg')]: {
    marginBottom: '30px',
    marginTop: '50px'
  },
  [theme.breakpoints.down('xs')]: {
    marginTop: '50px'
  },
  '&:hover': {
    boxShadow: '0px 0px 30px var(--very-dark-violet-200)'
  },
  '&:hover span > img': {
    transform: 'scale(1.1)'
  }
}));

export const BlogFeaturedPostImage = styled(Image)({
  display: 'block',
  borderRadius: '15px  0 0 15px',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform .3s'
});

export const BlogFeaturedDetailsContainer = styled('div')(({ theme }) => ({
  padding: '60px 56px',
  [theme.breakpoints.down('lg')]: {
    padding: '25px'
  },
  [theme.breakpoints.down('md')]: {
    padding: '20px'
  },

  '& h2': {
    fontSize: '24px',
    lineHeight: '29px',
    fontWeight: 700,
    color: 'var(--white)',
    margin: 0,
    '@media screen and (max-width:1100px)': {
      fontSize: '21px',
      lineHeight: '25px'
    },
    '@media screen and (max-width:1024px)': {
      fontSize: '18px',
      lineHeight: '26px'
    },
    [theme.breakpoints.down('md')]: {
      lineHeight: '24px'
    }
  }
}));
export const BlogFeaturedDetailsText = styled('div')(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  // marginTop: '12px',
  margin: '12px 0 59px 0',
  fontWeight: 400,
  color: 'var(--soft-blue-100)',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '4',
  '@media screen and (max-width:1100px)': {
    fontSize: '13px',
    lineHeight: '18px'
  },
  '@media screen and (max-width:1200px)': {
    marginBottom: '30px'
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: '20px'
  },
  '* ': { display: 'inline' }
}));
