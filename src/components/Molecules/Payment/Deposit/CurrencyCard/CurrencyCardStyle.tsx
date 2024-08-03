import styled from '@emotion/styled';

export const CardContainer = styled.div`
  width: calc(50% - 6px);
  padding: 6px;
  height: 150px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  flex-direction: column;
  border-radius: 6px;
  background: var(--very-dark-violet-5);
  box-sizing: border-box;
  @media screen and (max-width: 900px) {
    & svg {
      width: 28px;
      height: 28px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 30px 40px;
  }

  @media screen and (max-width: 480px) {
    padding: 20px 30px;
  }

  @media screen and (max-width: 300px) {
    width: 100%;
    padding: 15px 20px;
    flex-direction: column;
  }
`;

export const CardsMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: min-content;
  margin-top: 12px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LogoLabel = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  color: #fff;
  text-align: center;

  
  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    line-height: 12px;
  },
`;
