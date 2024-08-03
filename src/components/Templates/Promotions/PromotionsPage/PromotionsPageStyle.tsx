import Typography from '@/components/Atoms/Typography/Typography';
import { assets } from '@/config/assets';
import styled from '@emotion/styled';

export const PromotionContainer = styled('div')({
  width: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
  margin: '0'
});
export const PromotionPageBanner = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  position: 'relative',
  borderRadius: '12px',
  marginBottom: '25px',
  backgroundImage: `url(${assets}/images/promotions-bg.png)`,
  backgroundColor: 'var(--very-dark-violet-200)',
  overflow: 'hidden',
  '@media screen and (max-width:650px)': {
    display: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '110px',
    height: '100%',
    top: '0',
    right: '30px',
    backgroundImage: `url(${assets}/images/present-img.png)`,
    backgroundRepeat: 'no-repeat',
    '@media screen and (max-width:650px)': {
      top: '20px',
      right: '10px',
      width: '90px',
      backgroundSize: 'contain'
    }
  }
});
export const Heading = styled(Typography)({
  fontWeight: 700,
  lineHeight: '43px',
  color: 'var(--white)',
  'h1.Heading-h1': {
    fontSize: '18px'
  }
});
export const PromotionPostsList = styled('div')({
  display: 'flex',
  justifyContent: 'left',
  flexWrap: 'wrap',
  borderRadius: '15px',
  gap: '20px',
  '@media screen and (max-width:650px)': {
    flexDirection: 'column'
  }
});
export const PromotionPostsItem = styled('div')({
  width: '270px',
  display: 'flex',
  borderRadius: '15px',
  marginBottom: '40px',
  '> div': {
    width: '100%'
  },
  '&:hover': {
    boxShadow: '0px 0px 30px var(--very-dark-violet-200)'
  },
  '&:hover span > img': {
    transform: 'scale(1.1)'
  },
  '@media screen and (max-width:650px)': {
    width: '100%',
    marginBottom: '0'
  }
});
