import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';
import Typography from '@/components/Atoms/Typography/Typography';

export const FAQContainerMobile = styled('div')({
  backgroundColor: 'var(--very-dark-violet-3)',
  padding: '13px 78px 14px 12px'
});

export const HeadingMobile = styled(Typography)({
  fontWeight: 600,
  lineHeight: 'normal',
  color: 'var(--white)',
  'span.BodyText-b2': {
    fontSize: 'var(--font-size-16)'
  }
});

export const FAQWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  background: 'var(--very-dark-violet-3)',
  '@media screen and (max-width:1023px)': {
    padding: '12px',
    marginTop: 16,
    gap: 8,
    marginLeft: 12,
    marginRight: 12
  }
});

export const PageHeadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 90,
  background: `url(${assets}/images/faq_banner.png) no-repeat`,
  borderRadius: 8,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  padding: 0,
  marginTop: 33,
  marginBottom: 18,
  '@media screen and (max-width:479px)': {
    marginTop: 0
  }
});
export const PageHeading = styled('h1')({
  fontWeight: 600,
  fontSize: 'var(--font-size-16)',
  lineHeight: 'normal',
  color: 'var(--white)',
  margin: 0
});

export const QuestionWrapper = styled('div')({
  flex: 1,
  position: 'relative',
  background: 'var(--very-dark-violet-3)',
  padding: 12,
  maxHeight: 640,
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  gap: 8
});

export const AnswerWrapper = styled('div')({
  position: 'relative',
  flex: 1,
  marginLeft: 12,
  marginRight: 12
});
