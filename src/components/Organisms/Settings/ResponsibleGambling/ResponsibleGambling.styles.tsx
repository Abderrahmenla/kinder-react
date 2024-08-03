import styled from '@emotion/styled';
import Button from '@/components/Atoms/Button/Button';
import Typography from '@/components/Atoms/Typography/Typography';

export const ResponsibleGamblingContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    display: 'block'
  }
});

export const ResponsibleGamblingSections = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 16px 32px',
  background: 'var(--very-dark-violet-300)',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    gap: '16px',
    padding: '32px 16px'
  }
});

export const SectionHeader = styled(Typography)({
  width: '100%',
  fontWeight: '600',
  lineHeight: 'var(--l-height-17)',
  letterSpacing: 'initial'
});

export const SectionDescription = styled(Typography)({
  width: '100%',
  lineHeight: 'var(--l-height-17)',
  letterSpacing: 'initial'
});

export const SectionButton = styled(Button)({
  width: '100%',
  height: '44px',
  margin: 'unset',
  borderRadius: '6px',
  minWidth: 'unset',

  '& .icon': {
    marginTop: '7px',
    marginRight: '-7px'
  }
});

export const SectionButtonText = styled(Typography)({
  margin: '-1px 0 0 -1px',
  '& span': {
    fontWeight: '500',
    letterSpacing: 'initial',
    lineHeight: 'var(--l-height-20)'
  }
});
