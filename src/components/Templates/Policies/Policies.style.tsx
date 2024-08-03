import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';
export const PoliciesContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  padding: '0px 50px',
  '@media screen and (max-width:650px)': {
    padding: '0px 16px'
  }
});
export const PoliciesHeading = styled('h1')({
  '@media screen and (max-width:650px)': {
    marginBottom: '23px',
    fontSize: 'var(--font-size-28)',
    lineHeight: 'var(--l-height-34)'
  },
  fontWeight: 700,
  fontSize: 'var(--font-size-36)',
  lineHeight: 'var(--l-height-43)',
  color: 'var(--white)',
  margin: '0px',
  marginBottom: '40px'
});

export const PoliciesContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  '@media screen and (max-width:900px)': {
    flexDirection: 'column'
  }
});

export const ContentDiv = styled('div')({
  '& p': {
    fontWeight: 400,
    margin: '0 0 20px 0',
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-20)',
    color: 'var(--soft-blue-100)',
    '& a': {
      textDecoration: 'none',
      color: 'var(--pure-blue)',
      borderBottom: '1px solid var(--pure-blue)'
    }
  },
  '& h2, & h3, & h4, & h5, & h6': {
    fontWeight: 700,
    fontSize: 'var(--font-size-20)',
    lineHeight: 'var(--l-height-28)',
    color: 'var(--very-soft-violet)',
    margin: '0 0 12px 0',
    textTransform: 'uppercase'
  },
  '& ul': {
    margin: '0 0 20px 0',
    padding: 0,
    fontWeight: 400,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-20)',
    color: 'var(--soft-blue-100)',
    listStyle: 'none',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',

      '&::before': {
        content: '""',
        width: '7px',
        height: '8px',
        background: `url(${assets}/images/arrow-bullet.svg) no-repeat`,
        backgroundSize: 'contain',
        marginRight: '8px',
        flexShrink: 0
      }
    },
    '& a': {
      textDecoration: 'none',
      color: 'var(--pure-blue)',
      borderBottom: '1px solid var(--pure-blue)'
    }
  }
});

export const TimestampContainerWrapper = styled('div')({
  '@media screen and (max-width:650px)': {
    marginBottom: '22px'
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '35px'
});
export const TimestampContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  '& span': {
    '@media screen and (max-width:650px)': {
      fontSize: 'var(--font-size-12)',
      lineHeight: 'var(--l-height-18)'
    },
    fontWeight: 500,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-20)',
    color: 'var(--dark-md-blue)'
  }
});

export const PoliciesContentSidebar = styled('ul')({
  margin: 0,
  padding: 0,
  flexShrink: 0,
  fontSize: 0,
  marginRight: '8%',
  listStyle: 'none',
  '@media screen and (max-width:900px)': {
    marginBottom: '22px'
  },
  '& li': {
    marginBottom: '20px',
    span: {
      fontWeight: 500,
      fontSize: 'var(--font-size-18)',
      lineHeight: 'var(--l-height-22)',
      color: 'var(--soft-blue-100)',
      textDecoration: 'none',
      outline: 'none',
      border: 'none',
      cursor: 'pointer'
    }
  },
  '& li.active': {
    span: {
      fontWeight: 700,
      color: 'var(--white)'
    }
  }
});

export const PoliciesSelectedContent = styled('div')({});
