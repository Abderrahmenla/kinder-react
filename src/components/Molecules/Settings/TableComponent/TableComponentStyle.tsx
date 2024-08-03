import { styled } from '@mui/material/styles';

export const Container = styled('div')({});
export const HistoryDetails = styled('div')({
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

interface HistoryWrapperProps {
  limitComponent?: boolean;
}

export const HistoryWrapper = styled('div')<HistoryWrapperProps>(({ limitComponent }) => ({
  padding: limitComponent ? '0 62px 0 0' : '0 62px',
  margin: '30px 0 0 0',
  '@media screen and (max-width: 1300px)': {
    padding: limitComponent ? '0 40px 0 0' : '0 40px'
  },
  '@media screen and (max-width: 768px)': {
    padding: limitComponent ? '0 20px 0 0' : '0 20px',
    marginTop: '20px'
  }
}));

export const AccountDTWrapper = styled('div')({
  padding: '0 62px',
  margin: '30px 0 0 0',
  width: '100%',
  '@media screen and (max-width: 1300px)': {
    padding: '0 40px'
  },
  '@media screen and (max-width: 768px)': {
    padding: '0 20px',
    marginTop: '20px'
  }
});

export const AccountNoLogWrapper = styled('div')({
  width: '180px',
  margin: 'auto',
  padding: '220px 0',
  '& p': {
    fontSize: '14px',
    lineHeight: '18px',
    color: 'var(--very-dark-des-violet)',
    margin: '32px 0 0 0',
    textAlign: 'center',
    '@media screen and (max-width: 1100px)': {
      fontSize: '13px',
      marginTop: '15px'
    },
    '@media screen and (max-width: 768px)': {
      fontSize: '12px',
      marginTop: '10px'
    }
  },
  '@media screen and (max-width: 1100px)': {
    padding: '30px 0 70px 0'
  },
  '@media screen and (max-width: 768px)': {
    padding: '15px 0 30px 0'
  }
});

export const AccountNoLogLogo = styled('div')({
  textAlign: 'center',
  '& img': {
    width: '98px',
    height: 'auto',
    '@media screen and (max-width: 1100px)': {
      width: '75px'
    },
    '@media screen and (max-width: 768px)': {
      width: '60px'
    }
  }
});

export const ShowMoreButton = styled('a')({
  border: '1px solid var(--soft-violet)',
  borderRadius: '58px',
  fontWeight: '500',
  fontSize: '12px',
  color: 'var(--white)',
  padding: '10px 15px',
  textTransform: 'uppercase',
  minWidth: '187px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all .4s, color .4s',
  '&:hover': {
    background: 'var(--soft-violet)',
    color: 'var(--white)'
  }
});
