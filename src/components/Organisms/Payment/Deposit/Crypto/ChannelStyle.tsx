import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { DropDown } from '@/components/Atoms/DropDown';
import Typography from '@/components/Atoms/Typography/Typography';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Toast = styled(Typography)<{ leaving?: boolean }>`
  background: var(--tealish-green);
  color: var(--white);
  line-height: 1;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  margin-top: 30px;
  right: 20px;
  position: absolute;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const ChannelDropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  @media (max-width: 300px) {
    flex-direction: column;
  }
`;
export const ChannelDropdownSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const ChannelLabel = styled(Typography)`
  color: var(--soft-blue-100);
  font-weight: 500;
  line-height: 1;
`;

export const ChannelDropdownStyle = styled(DropDown)`
  &.active {
    background: var(--dark-violet);
  }

  &:not(.active) {
    background: var(--very-dark-des-violet);
  }

  &:hover {
    background: var(--dark-violet);
  }
`;

export const ChannelContainer = styled.div`
  display: flex;
  padding: 0;
  width: 100%;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow-y: auto;

  .dropdown-polygon {
    left: 45px;
  }
`;

export const ChannelFieldContainer = styled.div`
  display: flex;
  height: 2.75rem;
  padding: 0.5rem 0.75rem;
  flex-direction: row;
  margin-top: 0.2rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.375rem;
  background: var(--very-dark-des-violet);

  @media screen and (max-width: 768px) {
    padding: 0.45rem 0.7rem;
    height: 2.5rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.375rem 0.5rem;
    height: 2.25rem;
  }
`;

export const ChannelField = styled(Typography)`
  color: var(--darker-white);
  font-weight: 500;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 5px;
  }
  white-space: nowrap;
`;

export const ChannelFieldWrapper = styled.div`
  margin-top: 16px;
`;

export const ChannelQRCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 18px;
`;
export const ChannelQRCode = styled.div`
  display: flex;
  width: 122px;
  align-items: center;
  justify-content: center;
  height: 122px;
  border-radius: 8px;
  background-color: var(--white);
`;

export const ChannelQRCodeLabel = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
  text-align: center;
  margin-top: 14px;
`;

export const ChannelCurrencyExchangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  @media screen and (max-width: 368px) {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

export const ChannelCurrencyExchangeSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
`;

export const ExchangeLogoContainer = styled.div`
  margin-top: 27px;
  @media screen and (max-width: 368px) {
    margin-top: 0;
  }
`;

export const ChannelCurrencyExchange = styled.div`
  display: flex;
  height: 40px;
  padding: 8px 77px 8px 10px;
  max-width: 146px;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  border-radius: 6px;
  background: var(--very-dark-des-violet);
`;
