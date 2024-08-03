import { styled } from '@mui/material/styles';

export const ToggleSwitchContainer = styled('div')({
  width: '41px',
  height: '24px',
  flexShrink: 0,
  position: 'relative',
  cursor: 'pointer'
});

export const ToggleSwitchBackground = styled('svg')({
  width: '100%',
  height: '100%'
});

export const BackgroundRect = styled('rect')(
  {
    transition: 'fill 0.3s ease-in-out'
  },
  ({ isActive }: { isActive: boolean | undefined }) => ({
    fill: isActive ? 'var(--pure-blue)' : 'var(--very-dark-des-violet)'
  })
);

export const ToggleCircle = styled('circle')(
  {
    transition: 'transform 0.3s ease-in-out'
  },
  ({ isActive }: { isActive: boolean | undefined }) => ({
    fill: 'var(--white)',
    transform: isActive ? 'translateX(17px)' : 'translateX(0)'
  })
);
