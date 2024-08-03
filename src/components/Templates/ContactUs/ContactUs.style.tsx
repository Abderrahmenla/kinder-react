import { Grid, styled } from '@mui/material';
import { assets } from '@/config/assets';
import Typography from '@/components/Atoms/Typography/Typography';

export const ContactUsContainerMobile = styled('div')({
  backgroundColor: 'var(--very-dark-violet-3)',
  padding: '13px 78px 14px 12px'
});

export const HeadingMobile = styled(Typography)({
  fontWeight: 400,
  lineHeight: 'normal',
  color: 'var(--white)',
  'span.BodyText-b2': {
    fontSize: 'var(--font-size-14)'
  }
});

export const ContactUsWrapper = styled('div')({
  '@media screen and (max-width:1023px)': {
    padding: '0 16px'
  }
});

export const ContactUsContainer = styled(Grid)({
  overflow: 'hidden',
  backgroundColor: 'var(--very-dark-violet-300)',
  padding: '24px 12px 39px 12px',
  borderRadius: 12,
  textAlign: 'center',
  marginTop: 16,
  width: '100%',
  marginLeft: 0,

  '@media screen and (min-width:1024px)': {
    background: `url(${assets}/images/contact-us-bg.png)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '40px 48px 40px 70px',
    margin: 0,
    marginTop: 80
  },
  '@media screen and (min-width: 1024px) and (max-width: 1199px)': {
    backgroundSize: 'cover'
  }
});

export const LinkContainer = styled('div')({
  marginBottom: 0,
  display: 'block',
  fontWeight: 300,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'normal',
  color: 'var(--white)',
  '& > p': {
    marginBottom: 24,
    '&:last-child': {
      marginBottom: 0,
      '@media screen and (max-width:1023px)': {
        display: 'flex',
        flexDirection: 'column',
        gap: 15
      }
    }
  }
});

export const LinksWrapper = styled('p')({
  '@media screen and (min-width:1024px)': {
    margin: 0
  },
  '&:first-of-type': {
    width: '100%',
    marginBottom: 24,
    '@media screen and (min-width:1024px)': {
      marginBottom: 15
    }
  },
  '& a': {
    textDecoration: 'none',
    color: 'var(--white)',
    fontSize: 'var(--font-size-14)',
    fontWeight: 600,
    lineHeight: 'normal',
    marginRight: 15
  }
});

export const Heading = styled('h1')({
  fontWeight: 600,
  fontSize: 'var(--font-size-16)',
  lineHeight: 'normal',
  color: 'var(--white)',
  margin: 0,
  paddingBottom: 12
});

export const Paragraph = styled('p')({
  fontSize: 'var(--font-size-14)',
  fontWeight: 300,
  lineHeight: 'normal',
  color: 'var(--white)',
  margin: '0 auto',
  maxWidth: '565px'
});

export const LiveChatContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 272,
  cursor: 'pointer',
  margin: '24px auto',
  justifyContent: 'center'
});

export const LiveChatButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  background: 'linear-gradient(90deg, var(--grayish-orange) 0%, var(--yellow-6) 99.48%)',
  borderRadius: 6,
  padding: '12px 18px',
  color: 'var(--very-dark-violet-400)',
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-20)',
  fontWeight: 500,
  textTransform: 'capitalize',
  textDecoration: 'none',
  minWidth: 272,
  justifyContent: 'center',
  outline: 'none',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    background: 'var(--yellow-4)'
  },
  '&:active': {
    background: 'var(--yellow-7)'
  }
});

export const LiveChatIcon = styled('img')({
  marginRight: 8,
  width: 16,
  height: 16
});
