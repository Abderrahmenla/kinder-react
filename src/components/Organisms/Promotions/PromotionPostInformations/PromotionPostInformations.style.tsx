import { styled } from '@mui/material/styles';
import Typography from '@/components/Atoms/Typography/Typography';
import Image from 'next/image';

export const PromotionPostDetailWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '764px',
  margin: '0 auto',
  flexWrap: 'wrap',
  borderRadius: '15px',
  marginTop: '15px',
  transition: 'box-shadow .4s',
  position: 'relative',
  '@media screen and (max-width:970px)': {
    width: '100%'
  },
  '@media screen and (max-width:650px)': {
    marginTop: '50px',
    width: '100%'
  }
});
export const ButtonBackWrapper = styled('div')({
  position: 'absolute',
  left: '-50px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '@media screen and (max-width:650px)': {
    left: '0',
    top: '-50px'
  },
  '> a': {
    background: 'var(--very-dark-violet-5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px',
    width: '36px',
    height: '36px',
    transition: 'background .3s',
    ':hover': {
      background: 'var(--dark-violet)'
    }
  }
});
export const BackText = styled(Typography)({
  color: 'var(--white)',
  '@media screen and (min-width:650px)': {
    display: 'none'
  }
});
export const InformationImageWrapper = styled('div')({
  marginBottom: '23px',
  position: 'relative'
});
export const InformationWrapper = styled('div')({
  '& h2': {
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
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 400,
  color: '#fff',
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
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '12px',
  '@media screen and (max-width:650px)': {
    height: '132px'
  }
});

export const CountdownTimerPromotions = styled('div')<{ isCountdownTimer: boolean }>(
  ({ isCountdownTimer }) => ({
    position: 'absolute',
    top: '13px',
    right: '14px',
    borderRadius: '12px',
    width: '267px',
    background: 'rgba(21, 14, 37, 0.5)',
    backdropFilter: 'blur(5px)',
    display: isCountdownTimer ? 'flex' : 'none',
    '@media (max-width: 430px)': {
      display: 'none'
    }
  })
);

export const MobileCountdownTimerContainer = styled('div')<{ isCountdownTimer: boolean }>(
  ({ isCountdownTimer }) => ({
    display: 'none',
    '@media (max-width: 430px)': {
      display: isCountdownTimer ? 'block' : 'none',
      padding: '0px 10px'
    }
  })
);

export const PromotionExpiryDateContainer = styled('div')`
  display: flex;
  align-items: center;
`;
