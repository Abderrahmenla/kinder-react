import styled from '@emotion/styled';

export const ReferralCardItem = styled.div`
  display: flex;
  padding: 17px 94px 17px 24px;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  border-radius: 12px;
  background: var(--very-dark-violet-5);
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const ReferralCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
