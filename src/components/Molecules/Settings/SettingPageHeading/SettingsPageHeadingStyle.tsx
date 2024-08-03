import { styled } from '@mui/material/styles';

export const PageHeading = styled('div')({
  paddingLeft: '36px',
  '@media screen and (max-width: 768px)': {
    paddingLeft: '0px'
  },
  '& h1': {
    fontWeight: 600,
    fontSize: 'var(--font-size-16)',
    lineHeight: 'var(--l-height-22)',
    color: 'var(--soft-blue-100)',
    margin: 0,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        width: '18px',
        height: 'auto'
      }
    },
    '& span:last-child': {
      marginLeft: '10px'
    }
  }
});
