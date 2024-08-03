import { styled } from '@mui/material/styles';
import Typography from '@/components/Atoms/Typography/Typography';

export const Banner = styled('div')({
  color: 'var(--white)',
  borderRadius: '12px',
  background: 'var(--bg-violet)',
  paddingLeft: 30,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 15,
  alignItems: 'center',
  position: 'relative',
  zIndex: '1',
  flexDirection: 'row',
  '@media screen and (max-width:1100px)': {
    flexDirection: 'column-reverse',
    paddingLeft: 0
  },
  '@media screen and (max-width:600px)': {
    padding: '8px',
    background:
      'linear-gradient(90deg, #180C35 -37.98%, rgba(24, 12, 53, 0.77) 220.29%, rgba(24, 12, 53, 0.00) 220.31%)'
  }
});

export const LeftBannerSide = styled('div')({
  width: 'auto',
  display: 'flex',
  flex: '1',
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
export const CenterBannerSide = styled('div')({
  width: '100%',
  textAlign: 'center',
  flex: '1',
  '@media screen and (max-width:479px)': {
    flex: 'auto'
  }
});

export const WelcomeInfo = styled('div')({
  width: '100%',
  lineHeight: '1'
});

export const WelcomeTopic = styled('h3')({
  fontWeight: '700',
  fontSize: 'var(--font-size-24)',
  color: 'var(--white)',
  textTransform: 'none',
  lineHeight: 'var(--line-height-40)!important',

  '@media screen and (max-width:1300px)': {
    lineHeight: 'var(--line-height-38)!important'
  },
  '@media screen and (max-width:900px)': {
    fontSize: 'var(--font-size-18)',
    lineHeight: 'var(--line-height-26)!important'
  },
  '@media screen and (max-width:600px)': {
    lineHeight: 'var(--line-height-24)!important',
    paddingBottom: 4
  }
});
export const WelcomeText = styled('h4')({
  fontWeight: '400',
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-28)',
  '@media screen and (max-width:1300px)': {
    lineHeight: 'var(--line-height-18)'
  },
  '@media screen and (max-width:600px)': {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--line-height-15)'
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
  flex: '1',
  textAlign: 'center',
  position: 'relative',
  '@media screen and (max-width:1100px)': {
    width: '34%'
  }
});

export const LogutBanner = styled('div')({
  color: 'var(--white)',
  borderRadius: '12px',
  background: 'var(--bg-violet)',
  padding: '46px 0px',
  display: 'flex',
  flexWrap: 'wrap',
  textAlign: 'center',
  justifyContent: 'center',
  gap: 19,
  alignItems: 'center',
  position: 'relative',
  zIndex: '1',
  flexDirection: 'column',
  '@media screen and (max-width:600px)': {
    padding: 16,
    gap: 8,
    background:
      'linear-gradient(263deg, rgba(0, 146, 255, 0.24) -2.8%, rgba(0, 146, 255, 0.00) 95.44%), linear-gradient(90deg, #180C35 -37.98%, rgba(24, 12, 53, 0.77) 60.18%, rgba(24, 12, 53, 0.00) 220.31%)'
  }
});

export const LogoutTitle = styled(Typography)({
  '& h3': {
    color: 'var(--white)',
    '@media screen and (max-width:600px)': {
      fontSize: 'var(--font-size-16)!important'
    }
  }
});

export const LogoutSubtitle = styled('small')({
  color: 'var(--white)',
  maxWidth: '47rem',
  textAlign: 'center',
  fontSize: 'var(--font-size-14)',
  lineHeight: 'normal',
  textOverflow: 'ellipsis',
  '@media screen and (max-width:600px)': {
    fontSize: 'var(--font-size-14)',
    maxWidth: 312
  }
});

export const LogoutButton = styled('button')({
  display: 'flex',
  width: 180,
  height: 40,
  padding: '10px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 7,
  flexShrink: 0,
  borderRadius: 6,
  background: 'linear-gradient(90deg, var(--grayish-orange) 0%, var(--yellow-6) 99.48%)',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none',
  '& span': {
    color: 'var(--very-dark-violet)',
    fontWeight: 600
  },
  '&:hover': {
    background: 'var(--yellow-4)'
  },
  '&:active': {
    background: 'var(--yellow-7)'
  },
  '@media screen and (max-width:600px)': {
    width: '100%'
  }
});
