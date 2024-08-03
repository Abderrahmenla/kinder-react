import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { assets } from '@/config/assets';

export const Divider = styled('div')({
  height: '1px',
  left: '16px',
  objectFit: 'cover',
  backgroundImage: `url(${assets}/images/divider.svg)`,
  width: '270px',
  marginBottom: '16.14px'
});

export const drawerWidth = 100;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: '270px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: 500
  }),
  overflowX: 'hidden',
  backgroundColor: '#150E25',
  borderRight: '1px solid #3C2A63',
  display: 'flex',
  alignItems: 'center',
  paddingTop: '98px',
  '& .divider': {
    width: '270px',
    marginTop: '8px',
    marginBottom: '8px'
  }
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: 500
  }),
  overflowX: 'hidden',
  width: 0,
  display: 'flex',
  alignItems: 'center',
  paddingTop: '98px',
  [theme.breakpoints.up('sm')]: {
    width: 89
  },
  backgroundColor: '#150E25',
  borderRight: '1px solid #3C2A63',
  '& .divider': {
    width: '57px',
    marginTop: '8px',
    marginBottom: '8px'
  },
  '& .spin-animation': {
    animation: 'spin 1s linear'
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '50%': {
      transform: 'rotate(360deg)'
    },
    '100%': {
      transform: 'rotate(720deg)'
    }
  }
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    zIndex: 1203,
    border: 'none !important',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      width: '70px',
      marginRight: '200px !important'
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      width: '0 !important',
      marginRight: '90px !important'
    })
  })
);
