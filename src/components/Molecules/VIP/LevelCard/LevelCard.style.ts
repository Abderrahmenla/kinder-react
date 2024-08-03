import { styled } from '@mui/material/styles';
import { getLevelColor } from '@/components/Atoms/GetLoyaltySettings';
import { LevelCardBannerProps } from '@/graphql/types/vipProgramsTypes';
import { assets } from '@/config/assets';

interface BGProps {
  bg?: string;
}

interface LevelIconProps {
  width?: number;
  height?: number;
  alt?: string;
}

interface CurrentLevelProps {
  level?: string;
}

interface LevelGroupTitleProps {
  hasTitle: boolean;
  isDiamondOrOnyx?: boolean;
}

const isSpecialLevel = (level: string): boolean => {
  const specialLevels = ['Double Diamond', 'Pink Diamond', 'Blue Diamond', 'Onyx', 'Black Diamond'];
  return specialLevels.includes(level);
};

export const LevelCardContainer = styled('div')({
  position: 'relative',
  '& .swiper-slide': {
    '@media screen and (max-width:479px)': {
      width: '216px!important'
    }
  }
});

export const LevelGroupContainer = styled('div')({
  display: 'block',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  paddingTop: '56px',

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

export const LevelGroupDiamondContainer = styled('div')<BGProps>(({ bg }) => ({
  borderRadius: 12,
  position: 'relative',
  height: 283,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  marginTop: 56,

  '&::after': {
    content: '""',
    backgroundImage: bg ? `url(${bg})` : 'none',
    borderRadius: 12,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    zIndex: '-1',
    transform: 'scale(1.5) translateX(8%)',
    transformOrigin: '95% 50%',
    transition: 'all .4s ease',
    backgroundPosition: '95%',
    '@media only screen and (max-width:1024px)': {
      transformOrigin: '105% 50%'
    },
    '@media screen and (max-width:768px)': {
      backgroundColor: 'var(--very-dark-violet-3)'
    }
  },
  '&:hover': {
    '&::after': {
      transform: 'scale(1) translateX(0%)',
      '@media only screen and (max-width:1024px)': {
        transform: 'scale(1.5) translateX(0%)'
      }
    },
    '& img': {
      width: '106.8px',
      height: '118.8px'
    }
  }
}));

export const LevelCardDiamond = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  borderRadius: '0px 12px 12px 0px'
});

export const LevelCardDiamondItem = styled('div')({
  borderRadius: '10px',
  padding: '24px',
  color: 'var(--soft-blue-100)',
  textAlign: 'left'
});

export const LevelCard = styled('div')<CurrentLevelProps>(({ level }) => {
  // Define the background based on the level
  let background;
  switch (level) {
    case 'Double Diamond':
      background =
        'linear-gradient(344deg, rgba(0, 146, 255, 0.24) -3.5%, rgba(0, 146, 255, 0.00) 68.47%), var(--very-dark-violet-300)';
      break;
    case 'Pink Diamond':
      background =
        'linear-gradient(347deg, rgba(255, 0, 242, 0.19) -2.64%, rgba(255, 0, 242, 0.00) 51.77%), var(--very-dark-violet-300)';
      break;
    case 'Blue Diamond':
    case 'Onyx':
    case 'Black Diamond':
      background =
        'linear-gradient(344deg, rgba(0, 146, 255, 0.24) -3.5%, rgba(0, 146, 255, 0.00) 68.47%), var(--very-dark-violet-300)';
      break;
    default:
      background = 'var(--very-dark-violet-3)';
  }

  return {
    background: background,
    borderRadius: '10px',
    padding: '12px',
    color: 'var(--soft-blue-100)',
    textAlign: 'center',
    flex: 1,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    minHeight: 265,
    minWidth: 250,
    borderBottom: '2px solid var(--very-dark-violet-3)',
    transition: 'all .4s ease',
    '@media screen and (max-width: 479px)': {
      minWidth: '0',
      ...(!isSpecialLevel(level || '')
        ? { padding: '10px 27px 24px 27px', minHeight: 204, maxHeight: 100 }
        : { padding: '25px 15px', minHeight: 344, maxHeight: 344, marginTop: '82px' })
    },
    '&:hover': {
      transition: 'all .4s ease',
      ...(!isSpecialLevel(level || '')
        ? {
            borderBottom: `2px solid ${getLevelColor(level)}`,
            background: 'var(--very-dark-violet-5)'
          }
        : {}),
      '& img': {
        transition: 'all .4s ease',
        overflow: 'hidden',
        ...(!isSpecialLevel(level || '')
          ? { width: 49.2, height: 49.2 }
          : { width: 120, height: 120 })
      },
      '& > div': {
        marginTop: '-5px',
        transition: 'all .4s ease'
      }
    },
    ...(isSpecialLevel(level || '')
      ? {
          '@media screen and (max-width:1000px)': {
            width: '100%',
            flex: '0 0 calc(100% - 12px)'
          }
        }
      : {})
  };
});

export const LevelIcon = styled('img')<LevelIconProps>(({ width = 79, height = 93, alt }) => ({
  width,
  height,
  transition: 'all .4s ease',
  objectFit: 'contain',
  marginBottom: 18,
  minHeight: 80,
  '@media screen and (max-width:479px)': {
    width: 80,
    height: 80,
    marginBottom: 8,
    ...(isSpecialLevel(alt || '') ? { width: 160, height: 160, marginBottom: 0 } : {})
  }
}));

export const LevelIconDiamond = styled('img')<LevelIconProps>(({ width = 100, height = 100 }) => ({
  width,
  height,
  transition: 'all .4s ease',
  objectFit: 'contain',
  minHeight: 100,
  '@media screen and (max-width:479px)': {
    width: 160,
    height: 160,
    marginBottom: 19
  }
}));

export const LevelGroupTitle = styled('h2')<LevelGroupTitleProps>(
  ({ hasTitle, isDiamondOrOnyx }) => ({
    fontSize: 'var(--font-size-16)',
    color: 'var(--white)',
    padding: hasTitle ? '16px 0' : '10px 0',
    position: 'absolute',
    top: isDiamondOrOnyx ? '-56px' : '20px',
    '@media screen and (max-width:479px)': {
      padding: '5px 0'
    }
  })
);

export const LevelTitle = styled('div')({
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  marginBottom: '6px',
  color: 'var(--white)'
});

export const LevelDiamondTitle = styled('div')({
  fontSize: 'var(--font-size-24)',
  fontWeight: '600',
  marginBottom: 6,
  color: 'var(--white)'
});

export const WagerRequirement = styled('div')({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: 'normal',
  transition: 'all .4s ease',
  '& + div span': {
    fontWeight: 600,
    fontSize: 'var(--font-size-16)'
  }
});

export const WagerDiamondRequirement = styled('div')({
  '& > div': {
    fontSize: 'var(--font-size-14)',
    fontWeight: 400,
    lineHeight: 'normal',
    marginBottom: 29
  },
  '& span': {
    fontWeight: 600,
    fontSize: 'var(--font-size-16)'
  }
});

export const CashRewardContainer = styled('div')({
  marginTop: 26,
  '@media screen and (max-width:479px)': {
    marginTop: 16
  }
});

export const CashRewardText = styled('small')({
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  lineHeight: 'normal',
  marginBottom: 10,
  color: 'var(--soft-blue-100)',
  display: 'block',
  '@media screen and (max-width:479px)': {
    marginBottom: 4
  }
});

export const CashRewardPrice = styled('small')({
  fontSize: 'var(--font-size-16)',
  fontWeight: '600',
  lineHeight: 'normal',
  // marginBottom: 10,
  color: 'var(--white)',
  display: 'block'
});

export const LevelDiamondGroupContainer = styled('div')({
  borderRadius: 12,
  marginTop: 20,
  boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  background: 'var(--bg-violet)'
});

export const LevelCardBanner = styled('div')<LevelCardBannerProps>(({ backgroundImage }) => ({
  overflow: 'hidden',
  marginTop: '17px',
  color: 'var(--white)',
  borderRadius: '12px',
  background: `url(${backgroundImage}) center / cover no-repeat`,
  padding: '27px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 15,
  alignItems: 'center',
  position: 'relative',
  zIndex: '1',
  flexDirection: 'row'
}));

export const LevelCardBannerLeft = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

export const LevelBannerTitle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 0 6px 0'
});

export const LevelBannerReward = styled('div')({
  marginTop: '7px',
  flexDirection: 'column',
  gap: '3px'
});

export const LevelBannerLabel = styled('div')({
  position: 'absolute',
  right: '14px',
  top: '8px',
  borderRadius: '6px',
  background: 'var(--very-dark-violet-5)',
  display: 'flex',
  padding: '12px 14px 12px 12px',
  alignItems: 'center',
  gap: '10px',
  zIndex: '1',
  '@media(max-width: 390px)': {
    top: '5px',
    padding: '3px 10px',
    gap: '5px',
    '& img': {
      width: '20px'
    }
  }
});
