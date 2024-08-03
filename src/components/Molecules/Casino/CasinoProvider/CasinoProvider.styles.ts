import { styled } from '@mui/material';
import { assets } from '@/config/assets';

export const CasinoProviderWrapper = styled('div')({
  display: 'block',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  '& .swiper': {
    overflow: 'initial',
    marginTop: '20px',
    '@media(max-width: 1200px)': {
      marginBottom: '20px'
    },
    '@media(max-width: 576px)': {
      marginBottom: '0',
      marginTop: '15px'
    }
  },
  '& .swiper-slide': {
    overflow: 'hidden',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-out 0s;',
    '&:hover': {
      transform: 'translateY(-10px)'
    }
  },
  '& .swiper-button-prev, & .swiper-button-next': {
    width: '12px',
    height: '12px',
    position: 'absolute',
    top: '-11px',
    transition: 'box-shadow .4s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 10px rgb(91 79 153)',
      pointerEvents: 'unset',
      '&::after': {
        background: 'var(--dark-violet)'
      }
    },
    '@media(max-width: 1200px)': {
      top: '-12px'
    },
    '@media(max-width: 576px)': {
      top: '-8px'
    }
  },
  '& .swiper-button-disabled': {
    opacity: '0.5 !important',
    cursor: 'not-allowed'
  },
  '& .swiper-button-lock': {
    display: 'flex'
  },
  '& .swiper-button-prev': {
    right: '53px',
    left: 'auto',
    zIndex: '999'
  },
  '& .swiper-button-next': {
    right: '16px',
    zIndex: '999'
  },
  '& .swiper-button-prev::after, & .swiper-button-next::after': {
    display: 'flex',
    alignItems: 'center',
    content: '"<"',
    background: 'var(--very-dark-violet-5)',
    color: 'var(--soft-violet)',
    borderRadius: '6px',
    fontSize: '18px',
    lineHeight: '0',
    padding: '0.5rem 0.469rem'
  },
  '& .swiper-button-next::after': {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    content: `url(${assets}/images/white-right-arrow.svg)`
  },
  '& .swiper-button-prev::after': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    content: `url(${assets}/images/white-left-arrow.svg)`
  }
});

export const SingleProvider = styled('div')({
  minHeight: '68px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--very-dark-violet-3)',
  '& a': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  '@media(max-width: 768px)': {
    '& img': {
      maxWidth: '80%'
    },
    minHeight: '80px'
  }
});

export const CasinoProviderLobby = styled('div')({
  display: 'block',
  width: '100%'
});
