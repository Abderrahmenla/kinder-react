import styled from '@emotion/styled';

export const HomeBanner = styled('div')`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0px 12px;
  @media screen and (min-width: 768px) {
    gap: 24px;
    padding-top: 24px;
    align-items: center;
  }
`;
