import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';
import Image from 'next/image';

const ErrorPageSection = styled('section')({
  background: `url(${assets}/images/404Image.svg) no-repeat`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  width: '100%',
  minHeight: '155px'
});

const ErrorGraphicRow = styled('div')({
  zIndex: '-1',
  position: 'relative'
});

const ErrorGraphicImage = styled(Image)({
  width: '100%',
  height: 'auto',
  verticalAlign: 'top'
});

const ErrorContent = styled('div')({
  width: '528px',
  margin: 'auto',
  paddingBottom: '60px',
  marginTop: '-3.5vw'
});

const ErrorTitle = styled('h1')({
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: 'var(--white)',
  margin: 0,
  textAlign: 'center'
});

const ErrorButtonRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '29px'
});

const BackToHomepageButton = styled('a')({
  background: 'linear-gradient(90deg, #FFDE09 0%, #FFBD14 99.48%)',
  borderRadius: '58px',
  padding: '18px 20px 16px 20px',
  minWidth: '245px',
  color: 'var(--very-dark-violet)',
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-13)',
  letterSpacing: 'var(--lt-spacing)',
  fontWeight: 700,
  textTransform: 'uppercase',
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  border: 'none',
  display: 'block',
  textAlign: 'center'
});

export {
  ErrorButtonRow,
  ErrorContent,
  ErrorGraphicImage,
  ErrorGraphicRow,
  ErrorPageSection,
  ErrorTitle,
  BackToHomepageButton
};
