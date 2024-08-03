import { styled } from '@mui/material/styles';
import { SelectedGame } from '@/pages/api/casino/casinoTypes';
import { assets } from '@/config/assets';

interface GameListWrapperProps {
  hasGame?: boolean;
  isFullScreen?: boolean;
  isMobile?: boolean;
}

interface SelectedGameProps {
  selectedGame: SelectedGame;
}

export const MainContainer = styled('main')(() => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 80px',
  color: 'var(--pale-violet-200)',
  '@media(max-width: 1200px)': {
    padding: '0 50px 80px'
  },
  '@media(max-width: 768px)': {
    paddingInline: 0
  }
}));

export const SearchContainerWrapper = styled('div')<{
  standalone?: boolean;
  isMediumExact?: boolean;
}>(({ theme, standalone, isMediumExact }) => ({
  display: 'flex',
  justifyContent: standalone ? 'center' : 'space-between',
  alignItems: 'center',
  position: 'relative',
  gap: '6px',
  '& .modal-overlay': {
    display: 'block'
  },
  '& .modal-overlay-hidden': {
    display: 'none'
  },
  [theme.breakpoints.down('lg')]: {
    flexWrap: 'wrap'
  },
  ...(standalone
    ? {
        width: isMediumExact ? '100%' : '1200px',
        marginTop: '120px'
      }
    : {}),
  '@media(max-width: 991px)': {
    width: '100%'
  }
}));

export const GameListWrapper = styled('div')<GameListWrapperProps>(({ hasGame }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 0,
  '@media(max-width: 1300px)': {
    margin: hasGame ? '0' : '0 20px',
    flexWrap: 'wrap'
  }
}));

export const GameTile = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  padding: '12px 19px',
  position: 'absolute',
  maxWidth: 'fit-content',
  borderRadius: '6px',
  opacity: 0,
  visibility: 'hidden',
  background: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  alignContent: 'space-between',
  height: 'calc(100% - 24px)'
});

export const GameTileContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
});

export const GameMobileImage = styled('div')({
  margin: '15px 0',
  '& img': {
    borderRadius: '12px'
  }
});

export const GameTileButtons = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '30px'
});

export const GameTileName = styled('h3')({
  width: '100%',
  color: 'var(--white)',
  fontSize: '16px',
  fontWeight: 600,
  textAlign: 'center',
  lineHeight: 1.3
});

export const GameTileInfo = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px'
});

export const GameTilePlay = styled('div')({
  width: '100%',
  display: 'flex',
  background: 'linear-gradient(90deg, #ffde09 0%, #ffbd14 99.48%)',
  padding: '8px 16px',
  borderRadius: '6px',
  justifyContent: 'center',
  color: 'var(--black)',
  fontSize: '14px',
  cursor: 'pointer'
});

export const GameTileDemo = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid var(--soft-blue-100)',
  color: 'var(--soft-blue-100)',
  fontSize: '14px',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    background: 'var(--soft-blue-100)',
    color: 'var(--white)'
  },
  cursor: 'pointer'
});

export const SelectedGameWrapper = styled('div')<SelectedGameProps>(({ selectedGame }) => ({
  background: `linear-gradient(to bottom, rgba(0,0,0, .85), rgba(0,0,0, .85)), url('${selectedGame?.imageUrl}') center center / cover no-repeat`,
  position: 'absolute',
  borderRadius: 15,
  overflow: 'auto',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const GameTileProvider = styled('h3')({
  width: '100%',
  color: 'var(--white)',
  fontSize: '14px',
  fontWeight: 400,
  textAlign: 'center',
  lineHeight: 1.3
});

export const SwiperContainerFavorites = styled('div')({
  display: 'block',
  position: 'relative',
  width: '100%',
  '& .swiper-wrapper': {
    width: 'max-content'
  }
});

export const SwiperContainer = styled('div')(() => ({
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
      marginBottom: 0,
      marginTop: '15px'
    }
  },
  '& .swiper-slide': {
    overflow: 'hidden',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-out 0s;',
    '&:hover .game-tile': {
      visibility: 'visible',
      opacity: 1
    },
    '@media(max-width: 991px)': {
      '& .game-tile': {
        display: 'none'
      }
    },
    '@media(max-width: 768px)': {
      '&:hover': {
        transform: 'none'
      }
    },
    '& img': {
      objectFit: 'cover',
      display: 'block',
      width: '100%',
      height: '100%'
    }
  },
  '& .swiper-button-prev, & .swiper-button-next': {
    width: '12px',
    height: '12px',
    position: 'absolute',
    top: '-13px',
    transition: 'box-shadow .4s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 10px rgb(91 79 153)',
      pointerEvents: 'unset'
    },
    '@media(max-width: 1200px)': {
      top: '-14px'
    },
    '@media(max-width: 576px)': {
      top: '-8px'
    }
  },
  '& .swiper-button-disabled': {
    opacity: '0.5!important',
    cursor: 'not-allowed'
  },
  '& .swiper-button-lock': {
    display: 'flex'
  },
  '& .swiper-button-prev': {
    right: '52px',
    left: 'auto',
    zIndex: '999'
  },
  '& .swiper-button-next': {
    right: '14px',
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
    padding: '0.5rem 0.47rem'
  },
  '& .swiper-button-next::after': {
    content: `url(${assets}/images/white-right-arrow.svg)`,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  '& .swiper-button-prev::after': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    content: `url(${assets}/images/white-left-arrow.svg)`
  },
  '> div:first-of-type': {
    marginTop: '12px'
  }
}));

export const CategoryContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'self-end',
  paddingTop: '24px',
  '& a': {
    position: 'absolute',
    right: '0',
    fontWeight: '400',
    fontSize: '12px',
    color: 'var(--pure-blue)',
    marginRight: '95px',
    textDecoration: 'none',
    borderBottom: '1px solid var(--pure-blue)'
  },
  '@media(max-width: 768px)': {
    paddingTop: '20px'
  }
});

export const CategoryInfoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

export const FilterWrapperContainer = styled('div')({
  marginTop: '0',
  display: 'flex',
  paddingBottom: '9px',
  justifyContent: 'space-between',
  '@media(max-width: 767px)': {
    marginTop: '12px'
  },
  '@media(max-width: 991px)': {
    flexWrap: 'wrap'
  },
  '@media(max-width: 1300px)': {
    padding: '0 20px'
  }
});

export const GameContainer = styled('div')<GameListWrapperProps>(({ isFullScreen, isMobile }) => ({
  position: isFullScreen ? 'absolute' : 'relative',
  top: isFullScreen ? 'var(--l-height-70)' : '0',
  left: 0,
  height: isMobile && !isFullScreen ? '100%' : 'auto',
  minHeight: isMobile && !isFullScreen ? 'unset' : '625px',
  width: '100%',
  background: 'linear-gradient(0deg, #341F63, #341F63)',
  '@media(max-width: 900px)': {
    order: '1'
  },
  '& #unibo-overlay': {
    height: '100%'
  }
}));

export const GameFrameWrapper = styled('div')<GameListWrapperProps>(({ isFullScreen }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexWrap: 'wrap',
  background: 'var(--very-dark-violet-200)',
  '@media(max-width: 900px)': {
    padding: isFullScreen ? '0' : '20px'
  },
  '& iframe': {
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: '100%',
    border: 0
  }
}));

export const GameControls = styled('div')<GameListWrapperProps>(({ isMobile }) => ({
  position: 'relative',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: isMobile ? 'none' : 'flex',
  '& img': {
    position: 'absolute',
    right: '50%',
    bottom: '50%',
    transform: 'translate(50%, 50%)',
    display: 'flex'
  }
}));

export const FlexWrapper = styled('div')<GameListWrapperProps>(({ isMobile }) => ({
  position: 'relative',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '24px',
  display: isMobile ? 'none' : 'flex'
}));

export const GameControlsWrapper = styled('div')<GameListWrapperProps>(({ isFullScreen }) => ({
  position: isFullScreen ? 'absolute' : 'unset',
  bottom: isFullScreen ? '0' : 'unset',
  left: isFullScreen ? '-50%' : 'unset',
  transform: isFullScreen ? 'translateX(50%)' : 'unset',
  background: 'var(--very-dark-violet-300)',
  padding: isFullScreen ? '17px 30px' : '5px',
  width: '100%',
  '@media(max-width: 900px)': {
    background: isFullScreen ? 'var(--very-dark-violet-300)' : 'none',
    borderRadius: 0,
    padding: isFullScreen ? '0 10px' : '0'
  },
  '@media(max-width: 768px)': {
    display: 'none'
  }
}));

export const SingleMainContainer = styled('main')(() => ({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 80px',
  color: 'var(--pale-violet-200)',
  '@media(max-width: 1200px)': {
    padding: '0 50px 80px'
  },
  '@media(max-width: 768px)': {
    padding: '25px'
  }
}));

export const GamePageWrapper = styled('div')(() => ({
  display: 'block',
  paddingTop: '30px',
  '@media(max-width: 1300px)': {
    padding: '0 30px',
    paddingTop: '30px'
  },
  '@media(max-width: 991px)': {
    padding: 0,
    paddingTop: '30px'
  },
  '& #navbar-portal>div': {
    maxWidth: '100%',
    height: '70px'
  }
}));

export const RealGameInfo = styled('div')({
  width: '100%',
  height: '100%',
  '& p, h3': {
    width: '100%',
    fontSize: '14px',
    color: 'var(--white)',
    '@media(max-width: 991px)': {
      fontSize: '12px'
    }
  },
  '& h3': {
    fontSize: '20px'
  },
  '@media(max-width: 991px)': {
    fontSize: '17px'
  }
});

export const GameDetail = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexWrap: 'wrap',
  position: 'absolute',
  top: '40%',
  '& img': {
    marginBottom: '10px'
  }
});

export const FilterButtonContainer = styled('a')(({ isActive }: { isActive?: boolean }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '10px',
  transition: 'background .4s',
  textDecoration: 'none',
  borderRadius: '6px',
  color: 'var(--white)',
  '& span': {
    color: 'var(--yellow-4)'
  },
  '&:hover': {
    background: 'var(--very-dark-des-violet)',
    img: {
      transition: 'filter .2s',
      filter: 'brightness(0) invert(1)'
    }
  },
  '& img': {
    filter: isActive ? 'brightness(0) invert(1)' : 'unset'
  },
  '& p': {
    color: 'var(--white)'
  },
  ...(isActive && {
    background: `linear-gradient(270deg, #0092FF 0%, #9746FF 100%)`
  })
}));

export const LazyLoadWrapper = styled('div')<{ isVisible: boolean }>`
  width: 100%;
  min-height: 100px;
  ${({ isVisible }) =>
    isVisible &&
    `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    animation: fadeIn 0.5s ease forwards;
  `}
`;
