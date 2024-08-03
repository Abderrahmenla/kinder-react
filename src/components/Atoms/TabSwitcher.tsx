import { styled } from '@mui/material/styles';

export interface TabSwitcherProps {
  toggle: boolean;
  noMargin?: boolean;
}

export const TabSwitcher = styled('div')<TabSwitcherProps>(({ toggle, noMargin }) => ({
  background: 'var(--very-dark-violet-300)',
  borderRadius: '36px',
  marginTop: noMargin ? '0' : '30px',
  marginBottom: noMargin ? '0' : '24px',
  position: 'relative',
  display: 'flex',
  width: '100%',
  backgroundColor: 'var(--very-dark-violet-5)',
  '&::before': {
    content: '""',
    background: 'linear-gradient(270deg, #0092FF 0%, #9746FF 100%)',
    borderRadius: '58px',
    width: '50%',
    height: 'calc(100% - 8px)',
    left: toggle ? '50%' : '0',
    top: '4px',
    position: 'absolute',
    zIndex: 0,
    transition: 'left 0.6s ease'
  }
}));
