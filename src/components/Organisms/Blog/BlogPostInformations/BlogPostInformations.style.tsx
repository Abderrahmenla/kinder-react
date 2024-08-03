import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const BlogPostDetailWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexWrap: 'wrap',
  borderRadius: '15px',
  marginTop: '15px',
  transition: 'box-shadow .4s'
});
export const InformationImageWrapper = styled('div')({
  marginBottom: '46px',
  '@media screen and (max-width:1024px)': {
    marginBottom: '56px'
  },
  '@media screen and (max-width:970px)': {
    marginBottom: '20px'
  },
  '@media screen and (max-width:900px)': {
    marginBottom: '30px'
  },
  '@media screen and (max-width:870px)': {
    marginBottom: '20px'
  }
});
export const InformationWrapper = styled('div')({
  '& h1': {
    color: '#fff',
    fontSize: '21px',
    lineHeight: '25px',
    '@media screen and (max-width:1023px)': {
      fontSize: '18px',
      lineHeight: '26px'
    }
  }
});

export const InformationText = styled('div')({
  marginTop: '12px',
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: 400,
  color: 'var(--soft-blue-100)',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  '& p': {
    marginBottom: '20px'
  },
  '& h1, h2, h3, h4, h5, h6': {
    color: 'var(--white)',
    marginTop: '10px',
    marginBottom: '20px',
    fontSize: '24px',
    lineHeight: '30px'
  },
  '& ul': {
    marginLeft: '30px'
  },
  '& li': {
    marginBottom: '10px'
  },
  '& a': {
    textDecoration: 'none',
    color: 'var(--pure-blue)'
  }
});

export const InformationImage = styled(Image)({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '18.7px'
});

export const LinkBlogButton = styled('button')({
  background: 'linear-gradient(90deg, #FFDE09 0%, #FFBD14 99.48%)',
  minWidth: '177px',
  border: 'none',
  outline: 'none',
  fontSize: '14px',
  lineHeight: '13px',
  padding: '18px 20px 16px 20px',
  borderRadius: '58px',
  fontWeight: '700',
  textAlign: 'center',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  color: 'var(--very-dark-violet-400)',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0px 0px 10px rgba(255, 222, 9, 0.7)'
  }
});
export const InformationSocialGroup = styled('div')({
  display: 'flex'
});
export const InformationSocialWrapper = styled('a')({
  width: '36px',
  height: '36px',
  background: 'var(--dark-violet)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  marginLeft: '20px',
  '@media screen and (max-width:479px)': {
    margin: '15px 10px 0 0'
  }
});
export const InformationTopicWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  '@media screen and (max-width:479px)': {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});
