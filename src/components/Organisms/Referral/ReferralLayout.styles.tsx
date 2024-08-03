import styled from '@emotion/styled';
import { assets } from '@/config/assets';

export const ClaimContainer = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const ClaimSuccessContainer = styled.div`
  position: relative;
  & button {
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
`;

export const ClaimSuccess = styled.div`
  color: var(--white);
  display: flex;
  position: absolute;
  top: 50px;
  width: max-content;
  right: 0;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 6px 0 6px 6px;
  background: var(--very-dark-violet-5);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.33);
  font-size: 12px;
  font-weight: 500;
  @media (max-width: 576px) {
    right: 50%;
    transform: translateX(50%);
  }
`;

export const ReferralContainer = styled.div`
  display: flex;
  gap: 13px;
  background: url(${assets}/images/referral-banner.svg) no-repeat right center / cover
    var(--very-dark-violet-3);
  padding: 16px;
  margin-bottom: 13px;
  @media (max-width: 991px) {
    flex-direction: column;
    background-image: none;
    padding: 0;
    margin-bottom: 13px;
  }
`;

export const ReferralWrapper = styled.div`
  background-color: var(--very-dark-violet-300);
  @media (max-width: 991px) {
    background-color: var(--very-dark-violet-3);
  }
`;

export const ReferralInnerWrapper = styled.div`
  background-color: var(--very-dark-violet-300);
  padding: 0 16px 9px 16px;
  @media (max-width: 991px) {
    background-color: var(--very-dark-violet-3);
    padding: 16px;
  }
`;

export const ReferralTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 16px 13px 16px;
  @media (max-width: 991px) {
    padding: 12px 13px;
    border-bottom: 2px solid var(--very-dark-violet);
  }
`;

export const ReferralCode = styled.div`
  display: flex;
  width: 40%;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const ReferralCopyCode = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--dark-violet);
  background: var(--very-dark-violet-200);
  max-height: 44px;
  &:hover {
    background: var(--very-dark-violet-300);
  }
  span {
    color: var(--tealish-green);
  }
`;

export const ReferralCopyCodeTitle = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  & span {
    font-size: 12px;
    color: var(--soft-blue-100);
    font-weight: 500;
  }
`;

export const CopyIcon = styled.div`
  display: flex;
  cursor: pointer;
`;

export const ClaimAvailable = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--very-dark-violet-5);
  background: var(--very-dark-violet-5);
  max-height: 44px;
  & button {
    max-height: 35px;
    max-width: 135px;
    font-size: 12px;
    font-weight: 500;
    font-family: Inter;
  }
  p {
    font-weight: 500;
  }
`;

export const ReferralDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const ReferredUsersTableContainer = styled.div`
  position: relative;
  padding: 16px 16px 16px 30px;
  @media (max-width: 991px) {
    background: var(--very-dark-violet-300);
    padding: 12px;
    border-top: 2px solid var(--very-dark-violet);
  }
`;

export const NoReferralUsers = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 118px;
  border-bottom: 2px solid var(--very-dark-violet);
  align-items: center;
  padding: 3px 20px 12px 20px;
  text-align: center;
  @media (max-width: 991px) {
    height: 98px;
    border-top: 2px solid var(--very-dark-violet);
  }
`;

export const ReferralProgramDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  & p {
    font-size: var(--font-size-14);
    font-weight: 400;
    color: var(--soft-blue-100);
  }
  & strong {
    font-weight: 600;
    color: var(--white);
    line-height: 30px;
  }
  & a {
    color: var(--pure-blue);
  }
  @media (max-width: 991px) {
    border-top: 2px solid var(--very-dark-violet);
  }
`;
