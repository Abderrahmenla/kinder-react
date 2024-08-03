import styled from '@emotion/styled';
import Typography from '@/components/Atoms/Typography/Typography';
import { NAVIGATION_HEIGHT } from '@/components/Templates/Payment/Payment.constants';

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  height: ${NAVIGATION_HEIGHT}px;
`;

export const ArrowLabel = styled(Typography)({
  display: 'flex',
  letterSpacing: 'normal',
  fontWeight: 600,
  lineHeight: 'var(--l-height-17)',

  '@media screen and (max-width: 768px)': {
    '& span': {
      fontSize: 'var(--l-height-12) !important',
      lineHeight: 'var(--l-height-14) !important'
    }
  },

  '@media screen and (max-width: 480px)': {
    '& span': {
      fontSize: 'var(--l-height-10) !important',
      lineHeight: 'var(--l-height-12) !important'
    }
  }
});

export const ArrowLogoContainer = styled.div`
  display: flex;
  padding: 4px;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--purple-purple-1, var(--very-dark-des-violet));

  @media screen and (max-width: 768px) {
    gap: 8px;
    padding: 3px;
  }

  @media screen and (max-width: 480px) {
    gap: 6px;
    padding: 2px;
  }

  @media screen and (max-width: 300px) {
    gap: 4px;
    padding: 1px;
  }
`;
