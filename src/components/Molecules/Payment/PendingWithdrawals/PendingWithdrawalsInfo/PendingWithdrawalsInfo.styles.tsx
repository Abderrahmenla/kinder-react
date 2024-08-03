import styled from '@emotion/styled';
import Typography from '@/components/Atoms/Typography/Typography';
import { PENDING_INFO_HEIGHT } from '@/components/Templates/Payment/Payment.constants';

export const Container = styled('div')({
  minHeight: PENDING_INFO_HEIGHT,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '12px',
  padding: '12px',
  borderRadius: '6px',
  background: 'var(--very-dark-violet-5)',
  marginTop: '12px'
});

export const TextWrapper = styled('div')({
  height: '100%',
  width: '290px'
});

export const StyledText = styled(Typography)({
  lineHeight: 'var(--l-height-17)',
  fontWeight: 400
});

export const StyledTextLink = styled('span')({
  cursor: 'pointer',
  color: 'var(--pure-blue)',
  borderBottom: '1px solid var(--pure-blue)'
});
