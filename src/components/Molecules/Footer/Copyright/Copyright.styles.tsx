import styled from '@emotion/styled';
import Typography from '@/components/Atoms/Typography/Typography';

export const CopyrightText = styled(Typography)({
  color: 'var(--soft-violet)',
  margin: 0,
  lineHeight: 0,
  '.BodyText-b2': {
    fontWeight: 300,
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-14)'
  }
});

export const CopyrightTextContainer = styled('div')({
  maxWidth: '645px',
  width: '100%',
  marginLeft: '24px',
  display: 'flex',
  alignItems: 'center',
  '@media(max-width:768px)': {
    margin: '0'
  }
});
