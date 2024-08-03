import { styled } from '@mui/material/styles';

export const StatusWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '14px 8px',
  margin: 'auto',
  marginTop: 14,
  gap: 11,
  width: '100%',
  maxWidth: 780,
  '@media screen and (max-width:479px)': {
    flexDirection: 'column',
    borderRadius: 6
  }
});

export const StatusItem = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  color: 'var(--white)',
  lineHeight: 'normal',
  fontSize: 'var(--font-size-14)',
  gap: 5,
  '&:nth-of-type(2)': {
    '@media screen and (min-width:480px)': {
      order: 3
    }
  },
  '@media screen and (max-width:479px)': {
    gap: 0,
    justifyContent: 'space-between'
  }
});

export const StatusLabel = styled('span')({
  fontWeight: 600
});

export const StatusValue = styled('span')({
  fontWeight: 400
});
