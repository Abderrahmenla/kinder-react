import styled from '@emotion/styled';

export const PaymentLogosContainer = styled('div')`
  display: flex;
  gap: 12px;
  overflow: auto;
  margin: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  @media (min-width: 768px) {
    padding-top: unset;
    gap: 16px;
  }
`;
