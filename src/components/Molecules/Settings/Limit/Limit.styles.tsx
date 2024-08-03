import styled from '@emotion/styled';
import Input from '@/components/Atoms/Input';
import Typography from '@/components/Atoms/Typography/Typography';

export const LimitSectionContainer = styled('div')({
  boxSizing: 'border-box',
  height: 'fit-content',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: 'var(--very-dark-violet-200)',
  borderRadius: '6px',
  padding: '16px',
  gap: '16px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    width: '514px'
  }
});

export const LimitSectionHeader = styled('div')({
  width: '100%',
  height: '34px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});

export const LimitRanges = styled('div')({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '36px',
  gap: '8px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    gap: '12px'
  }
});

export const LimitInput = styled('div')({
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid var(--dark-violet)',
  borderRadius: '6px',
  paddingRight: '14px',
  background: 'var(--very-dark-violet-200) !important'
});

export const LimitInputField = styled(Input)({
  height: '44px',
  width: '100%',

  '& input': {
    height: '100%',
    width: '100%',
    border: 'none !important',
    background: 'transparent !important',
    fontSize: 'var(--font-size-14)',
    color: 'var(--darker-white)',
    fontWeight: '500'
  }
});

export const LimitInputCurrency = styled(Typography)({
  '& span': {
    fontWeight: '500'
  }
});
