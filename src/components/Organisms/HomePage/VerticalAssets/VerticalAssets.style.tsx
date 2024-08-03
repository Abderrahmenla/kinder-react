import styled from '@emotion/styled';

export const VerticalAssetsContainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 767px) {
    flex-direction: row;
    padding: unset;
    gap: 24px;
  }
`;
