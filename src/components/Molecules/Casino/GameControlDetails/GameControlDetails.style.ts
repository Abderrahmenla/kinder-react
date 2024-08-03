import { styled } from '@mui/material';
import Typography from '@/components/Atoms/Typography/Typography';

interface GameControlDetailsWrapperProps {
  isFullScreen?: boolean;
}

export const GameControlDetailsWrapper = styled('div')<GameControlDetailsWrapperProps>(
  ({ isFullScreen }) => ({
    display: 'flex',
    '& svg path': {
      transition: 'fill .4s',
      cursor: 'pointer'
    },
    gap: '12px',
    lineHeight: '1',
    alignItems: 'center',
    '& svg path:hover': {
      fill: 'var(--darker-white)'
    },
    '@media(max-width: 900px)': {
      justifyContent: isFullScreen ? 'unset' : 'space-between',
      width: isFullScreen ? 'initial' : '100%',
      '& svg': {
        order: 1
      }
    }
  })
);

export const GameName = styled(Typography)({
  fontWeight: 700
});
