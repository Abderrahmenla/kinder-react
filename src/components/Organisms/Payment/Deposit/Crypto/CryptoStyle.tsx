import styled from '@emotion/styled';

export const CryptoImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  @media screen and (max-width: 900px) {
    width: 28px;
    height: 28px;
  }
`;

export const CryptoListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 12px;
`;
