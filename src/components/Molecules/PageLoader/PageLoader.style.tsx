import { styled } from '@mui/material/styles';

export const SpinnerWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '500px',
  '& .data-loader': {
    maxWidth: '500px'
  }
});

export const LoadingWrapper = styled('div')({
  '& .logo-loader svg': {
    width: '300px !important',
    height: '300px !important',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) !important',
    '@media(max-width: 768px)': {
      width: '200px !important',
      height: '200px !important'
    }
  }
});
