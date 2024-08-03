import styled from '@emotion/styled';
import Button from '@/components/Atoms/Button/Button';
import Typography from '@/components/Atoms/Typography/Typography';
import { PENDING_BUTTON_HEIGHT } from '@/components/Templates/Payment/Payment.constants';

export const Container = styled('div')({
  height: PENDING_BUTTON_HEIGHT,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 18px'
});

export const StyledButton = styled(Button)({
  textDecoration: 'none !important',
  '& span.text': {
    borderBottom: '1px solid var(--pure-blue)',
    height: 'var(--l-height-19)'
  }
});

export const StyledButtonText = styled(Typography)({
  lineHeight: 'var(--l-height-20)',
  fontWeight: 500
});
