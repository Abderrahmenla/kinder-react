import styled from '@emotion/styled';
import Typography from '@/components/Atoms/Typography/Typography';

export const TakeABreakContainer = styled('div')({
  boxSizing: 'border-box',
  height: 'fit-content',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: 'var(--very-dark-violet-3)',
  borderRadius: '6px',
  padding: '16px',
  gap: '16px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    width: '514px'
  }
});

export const TakeABreakHeader = styled('div')({
  boxSizing: 'border-box',
  height: 'fit-content',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    gap: '16px'
  }
});

export const TakeABreakSectionDescription = styled(Typography)({
  width: '100%',
  height: '90px',
  lineHeight: 'var(--l-height-15)',
  letterSpacing: 'initial',
  '& span': {
    display: 'block'
  },

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    height: 'fit-content',
    lineHeight: 'var(--l-height-17)'
  }
});

export const DayRanges = styled('div')({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '44px',
  gap: '12px'
});

export const Warning = styled('div')({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  padding: '16px 13px',
  background: 'var(--very-dark-violet-300)',
  gap: '10px',
  borderRadius: '6px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    gap: '8px',
    padding: '16px'
  }
});

export const WarningHeader = styled(Typography)({
  width: '100%',
  fontWeight: '600',
  lineHeight: 'var(--l-height-17)',
  letterSpacing: 'initial'
});

export const WarningDescription = styled(Typography)({
  width: '100%', // width is 248px on the mockup
  lineHeight: 'var(--l-height-17)',
  letterSpacing: 'initial',
  opacity: 0.6
});
