import { styled } from '@mui/material/styles';
export const RewardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'var(--very-dark-violet-200)',
  padding: '11px 0 5px 11px',
  color: 'white',
  width: 'auto',
  height: '100%',
  maxWidth: 328,
  gap: 11,
  borderRadius: '96px 12px 12px 96px',
  '@media screen and (max-width:1100px)': {
    maxWidth: '100%',
    gap: 42
  },
  '@media screen and (max-width:479px)': {
    padding: '5px 18px 5px 5px',
    gap: 24
  }
});

export const CircularProgressContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  flex: 1,
  '@media screen and (max-width:479px)': {
    flex: '0 0 33%',
    lineHeight: 1
  }
});

export const CurrentRewardContainer = styled('div')({
  position: 'relative'
});

export const ProgressContainer = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingRight: '10px'
});

export const LevelTitle = styled('div')({
  fontWeight: 600,
  '&.leftSide': {
    display: 'flex',
    gap: '8px'
  }
});

export const CurrentReward = styled('h4')({
  fontSize: 'var(--font-size-14)',
  fontWeight: 'normal',
  lineHeight: 'normal',
  '& small': {
    fontSize: 'var(--font-size-12)'
  }
});

export const WageredAmount = styled('span')(({ color }) => ({
  color: color,
  '& strong': {
    fontWeight: '600'
  }
}));
