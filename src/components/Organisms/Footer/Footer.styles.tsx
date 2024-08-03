import { Container } from '@/components/Atoms';
import styled from '@emotion/styled';
import { FooterMenuCopyright } from './FooterMenuCopyright';
import Typography from '@/components/Atoms/Typography/Typography';

export const ContactButton = styled(Typography)({
  background: 'var(--soft-blue-100)',
  fontWeight: 500,
  lineHeight: 'var(--l-height-14)',
  color: 'var(--white)',
  padding: '15px 18px',
  cursor: 'pointer',
  borderRadius: '36px',
  display: 'inline-block'
});

export const ContactCopyrightContainer = styled(FooterMenuCopyright)({
  '@media (min-width: 768px)': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  }
});

export const CustomContainer = styled(Container)({
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%'
});

export const AgePlusCurrency = styled('div')({
  display: 'flex',
  '@media (min-width: 768px)': {
    order: '3'
  }
});

export const FooterContainer = styled('footer')({
  '@media(min-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    gap: '48px'
  }
});

export const FooterWrapper = styled('div')({
  width: '50%'
});

export const FtMenuList = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  flexWrap: 'wrap',
  '@media(max-width: 1300px)': {
    height: '100%',
    gap: '2rem',
    alignItems: 'baseline',
    justifyContent: 'flex-start'
  },
  '@media(max-width: 768px)': {
    gap: '0',
    justifyContent: 'center'
  }
});

export const FtMenuListCopyright = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  marginTop: '32px',
  gap: '24px',

  '@media(max-width: 768px)': {
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'unset'
  }
});

export const FtMenuTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-16)',
  color: 'var(--white)'
});

export const FtRow = styled('div')({
  padding: '30px 0 0',
  width: '100%',
  '@media(max-width: 1300px)': {
    padding: '30px 30px 30px 110px'
  },
  '@media screen and (max-width:768px)': {
    padding: '20px'
  }
});

export const FtRowCopyright = styled('div')({
  width: '100%',
  margin: '0 0 40px',
  '@media(max-width: 1300px)': {
    paddingLeft: 'unset',
    margin: '0 auto'
  },
  '@media screen and (max-width:768px)': {
    margin: '40px 0 80px',
    paddingLeft: '0'
  }
});

export const FtSubmenu = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '6px',
  gap: '4px',
  '@media screen and (max-width:768px)': {
    marginBottom: '20px'
  },
  '& a,p': {
    fontWeight: 400,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-20)',
    color: 'var(--soft-blue-100)',
    textDecoration: 'none'
  },
  '& a:hover,p:hover': {
    color: 'var(--yellow-4)',
    transition: '300ms'
  }
});

export const FtSubmenuItems = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '&:empty': {
    display: 'none'
  }
});

export const FtSubmenuDiv = styled('div')({
  cursor: 'pointer',
  fontWeight: 400,
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-20)',
  color: 'var(--soft-violet)',
  '&:hover': {
    color: 'var(--yellow-4)'
  }
});

export const CopyrightContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    order: 1;
  }
`;

export const CasinoAnalyzerImage = styled('div')`
  @media (min-width: 768px) {
    order: 2;
  }
`;
