import styled from '@emotion/styled';
import Button from '@/components/Atoms/Button/Button';
import Typography from '@/components/Atoms/Typography/Typography';
import { NAVIGATION_HEIGHT } from '@/components/Templates/Payment/Payment.constants';

export const PendingWithdrawalsScrollbar = styled.div`
  height: ${`calc(100% - ${NAVIGATION_HEIGHT}px)`};
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CardsWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const Card = styled.div`
  background: var(--very-dark-violet-5);
  padding: 6px 12px 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
`;

export const CardDataContainer = styled.div<{
  fullWidth?: boolean;
  alignRight?: boolean;
  lastItem?: boolean;
}>`
  width: ${({ fullWidth = false }) => (fullWidth ? '100%' : '50%')};
  text-align: ${({ alignRight = false }) => (alignRight ? 'right' : 'unset')};
  margin-bottom: ${({ lastItem = false }) => (lastItem ? '8px' : '5px')};
`;

export const Label = styled(Typography)({
  '& span': {
    lineHeight: 'var(--l-height-15)',
    fontWeight: '400'
  }
});

export const Value = styled(Typography)({
  marginTop: '-5px',

  '& span': {
    lineHeight: 'var(--l-height-17)',
    fontWeight: '400',
    height: '17px'
  }
});

export const StyledButton = styled(Button)({
  height: '44px',
  border: '1px solid var(--soft-blue-100)',
  background: 'none !important',

  '&:hover': {
    background: 'var(--very-dark-violet-2) !important'
  }
});

export const StyledButtonText = styled(Typography)({
  '& span': {
    lineHeight: 'var(--l-height-17)',
    fontWeight: '500'
  }
});
