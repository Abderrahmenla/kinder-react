import { styled } from '@mui/material/styles';

export const Container = styled('div')({
  paddingTop: '40px'
});
export const AccountDetails = styled('div')({
  display: 'flex',
  marginBottom: '100px',
  flexDirection: 'column',
  '& h2': {
    fontWeight: 600,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-20)',
    color: 'var(--white)',
    margin: '0 0 0 62px',
    '@media screen and (max-width: 1300px)': {
      marginLeft: '40px',
      width: 'auto'
    },
    '@media screen and (max-width: 900px)': {
      fontSize: 'var(--font-size-16)',
      lineHeight: 'var(--l-height-22)'
    },
    '@media screen and (max-width: 768px)': {
      marginLeft: '20px'
    }
  },
  '@media screen and (max-width: 1100px)': {
    marginBottom: '30px'
  }
});

export const AccountFormWrapper = styled('div')({
  padding: '0 62px',
  margin: '30px 0 0 0',
  '@media screen and (max-width: 1300px)': {
    padding: '0 40px'
  },
  '@media screen and (max-width: 768px)': {
    padding: '0 20px',
    marginTop: '20px'
  }
});
