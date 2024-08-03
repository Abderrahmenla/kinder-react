import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';

export const HomeBanner = styled('div')({
  color: 'white',
  background: 'var(--very-dark-violet-200)',
  borderRadius: '15px',
  padding: '24px 100px 24px 60px',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  zIndex: '1',
  '&:before': {
    background: `url(${assets}/images/banner-bg-player.avif) no-repeat`,
    content: '""',
    position: 'absolute',
    width: '100%',
    minHeight: '1px',
    height: '100%',
    backgroundSize: 'cover',
    top: '0',
    left: '0',
    zIndex: '-1',
    borderRadius: '15px'
  },
  '@media screen and (max-width:1200px)': {
    padding: '24px 70px 24px 60px'
  },
  '@media screen and (max-width:1100px)': {
    padding: '24px 40px'
  },
  '@media screen and (max-width:600px)': {
    padding: '15px 20px'
  },
  '@media screen and (max-width:479px)': {
    padding: '30px 25px'
  }
});

export const LeftBannerSide = styled('div')({
  width: '460px',
  display: 'flex',
  flexDirection: 'column',
  padding: '26px 0px',
  justifyContent: 'space-between',
  '@media screen and (max-width:1100px)': {
    width: '60%'
  },
  '@media screen and (max-width:768px)': {
    padding: '10px 0px'
  },
  '@media screen and (max-width:600px)': {
    padding: '5px 0px',
    width: '54%'
  },
  '@media screen and (max-width:479px)': {
    width: '100%',
    padding: '0'
  }
});
export const WelcomeInfo = styled('div')({
  width: '100%'
});

export const WelcomeTopic = styled('h3')({
  fontWeight: '700',
  fontSize: 'var(--font-size-36)',
  color: 'var(--white)',
  textTransform: 'none',
  lineHeight: 'var(--line-height-40)!important',
  '@media screen and (max-width:1300px)': {
    fontSize: 'var(--font-size-32)',
    lineHeight: 'var(--line-height-38)!important'
  },
  '@media screen and (max-width:900px)': {
    fontSize: 'var(--font-size-24)',
    lineHeight: 'var(--line-height-26)!important'
  },
  '@media screen and (max-width:600px)': {
    fontSize: 'var(--font-size-18)',
    lineHeight: 'var(--line-height-24)!important'
  }
});
export const WelcomeText = styled('h4')({
  fontWeight: '400',
  fontSize: 'var(--font-size-18)',
  lineHeight: 'var(--l-height-28)',
  color: 'var(--yellow)',
  marginTop: '10px',
  '@media screen and (max-width:1300px)': {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--line-height-18)'
  },
  '@media screen and (max-width:600px)': {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--line-height-15)',
    marginTop: '6px'
  }
});
export const ProgressInfo = styled('div')({
  width: '340px',
  margin: '20px 0 0 0',
  '@media screen and (max-width:900px)': {
    width: '88%'
  },
  '@media screen and (max-width:600px)': {
    width: '100%'
  }
});
export const ProgressTopic = styled('h5')({
  fontWeight: '400',
  fontSize: 'var(--font-size-16)',
  lineHeight: 'var(--l-height-19)',
  color: 'var(--soft-blue)',
  letterSpacing: 'var(--lt-spacing-m)',
  margin: ' 0 0 8px 0',
  '@media screen and (max-width:1100px)': {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-18)'
  },
  '@media screen and (max-width:768px)': {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-16)'
  }
});
export const ProgressPercent = styled('span')({
  fontWeight: '700',
  fontSize: 'var(--font-size-16)',
  lineHeight: 'var(--l-height-19)',
  color: 'var(--white)',
  margin: ' 0 0 8px 0',
  display: 'block',
  '@media screen and (max-width:1100px)': {
    fontSize: 'var(--font-size-13)',
    lineHeight: 'var(--l-height-14)'
  },
  '@media screen and (max-width:768px)': {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-12)'
  }
});
export const AwardWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});
export const Awards = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});
export const ReceivedAward = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  justifyContent: 'flex-start'
});
export const NextAward = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  justifyContent: 'flex-end'
});
export const ReceivedText = styled('div')(({ color }) => ({
  fontWeight: '600',
  color: color,
  fontSize: 'var(--font-size-12)',
  '@media screen and (max-width:768px)': {
    fontSize: 'var(--font-size-10)'
  }
}));
export const MoneyInAccount = styled('span')({
  fontWeight: '500',
  fontSize: 'var(--font-size-10)',
  lineHeight: 'var(--l-height-15)',
  color: 'rgba(163, 145, 226, 0.79)',
  display: 'block'
});
export const MoneyForNextStep = styled('span')({
  fontWeight: '500',
  fontSize: 'var(--font-size-10)',
  lineHeight: 'var(--l-height-15)',
  color: 'rgba(163, 145, 226, 0.79)',
  display: 'block',
  textAlign: 'end'
});
export const RightBannerSide = styled('div')({
  width: '328px',
  position: 'relative',
  '@media screen and (max-width:1100px)': {
    width: '34%'
  }
});
