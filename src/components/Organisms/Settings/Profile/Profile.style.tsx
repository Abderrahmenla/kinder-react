import Button from '@/components/Atoms/Button/Button';
import Input from '@/components/Atoms/Input';
import Typography from '@/components/Atoms/Typography/Typography';
import { styled } from '@mui/material/styles';

export const AddNewPhoneInputContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AddNewPhoneInput = styled(Input)`
  flex: 1;
  input {
    background: none !important;
    border: none !important;
    font-size: var(--font-size-12) !important;
    margin-top: 4px;
    color: var(--darker-white) !important;
  }
`;
export const AddNewPhoneSaveLink = styled(Button)`
  padding: unset;
  width: fit-content;
`;
export const AddNewPhoneDialCode = styled(Typography)`
  color: var(--darker-white);
  margin-left: 12px;
`;
export const AddNewPhoneInputField = styled('div')`
  display: flex;
  align-items: center;
  background: var(--very-dark-violet-5);
  border-radius: 6px;
  padding: 8px 16px;
  max-height: 48px;
`;
export const AddNewPhoneLabel = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
`;

export const CustomerSupportStyledText = styled(Typography)<{ isMobile: boolean }>`
  text-align: center;
  line-height: 1;
  margin-top: 10px;

  span {
    color: var(--darker-white);
  }
  a {
    color: var(--light-blue);
    text-decoration: none;
  }
  @media screen and (min-width: 768px) {
    position: absolute;
    right: 16px;
    bottom: 20px;
    border-radius: 12px 12px 0px 12px;
    background: var(--very-dark-des-violet);
    padding: 8px 12px;
    text-wrap: nowrap;
    width: fit-content;
    margin-top: unset;
    text-wrap: nowrap;
    white-space: nowrap;
  }
`;

export const ProfilePageWrapper = styled('div')`
  padding: 16px;
  background: var(--very-dark-violet-300);
`;

export const ProfilePageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;

  @media screen and (min-width: 768px) {
    padding-bottom: 16px;
  }
`;
export const ProfilePageHeader = styled(Typography)`
  margin-bottom: 12px;

  span {
    color: var(--darker-white);
    font-weight: 600;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 16px;
  }
`;
export const ProfilePageInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ProfilePageCard = styled('div')<{ hasError: boolean }>`
  background: var(--very-dark-violet-3);
  display: flex;
  flex-direction: column;
  padding: 12px;

  @media screen and (min-width: 768px) {
    width: 100%;
    border-radius: 12px;
    padding: 16px;
    padding-bottom: ${({ hasError }) => (hasError ? '0px' : '16px')};
  }
`;

export const IconContainer = styled('div')`
  align-self: center;
  background: var(--very-dark-violet-300);
  border-radius: 90px;
  width: 90px;
  min-height: 90px;
  display: flex;
  img {
    margin: auto;
  }
`;

export const StyledValue = styled(Typography)`
  background: var(--very-dark-violet-5);
  border: unset;
  padding: 8px 16px;
  width: 100%;
  border-radius: 6px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  align-items: center;
  span {
    color: var(--darker-white);
    font-weight: 500;
    line-height: normal;
  }
`;

export const StyledLabel = styled(Typography)`
  margin-bottom: 8px;
  line-height: 1;

  span {
    font-weight: 500;
    color: var(--soft-blue-100);
  }
`;

export const ChangePasswordContianer = styled(ProfilePageContainer)`
  padding-bottom: unset;

  @media screen and (min-width: 768px) {
    border-top: 2px solid var(--very-dark-violet);
    padding-top: 12px;
    padding-bottom: unset;
  }
`;

export const ChangePassowrdButton = styled(Button)`
  justify-content: flex-start;
  background: var(--very-dark-violet-200) !important;
  border: none !important;
`;

export const ChangePasswordButtonText = styled(Typography)`
  line-height: 1;
  color: var(--darker-white);
  font-weight: 400;
`;

export const InfoContainer = styled(`div`)`
  line-height: 1;
  align-self: end;
  position: absolute;
  z-index: 1;
`;

export const CustomerSupportTextContainer = styled('div')`
  width: fit-content;
  height: fit-content;
`;

export const MouseOverContainer = styled('div')`
  width: 25px;
  height: 22px;
  position: absolute;
  bottom: 385px;
  align-self: end;
`;

export const InfoIcon = styled('div')`
  img {
    filter: brightness(2.5);
  }
`;

export const AddNewPhone = styled(Button)`
  border-radius: 36px;
  min-height: 44px;

  &:hover {
    span {
      color: var(--darker-white);
    }
  }

  @media screen and (min-width: 768px) {
    margin-top: 26px;
  }
`;

export const AddNewPhoneText = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
  &:hover {
    color: var(--purple-4);
  }
  span {
    font-weight: 500;
  }
`;

export const AddnewPhoneSaveLinkText = styled(Typography)`
  color: var(--pure-blue);
  line-height: 1;
  span {
    font-weight: 500;
  }
`;

export const ReceivePromoContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 21px 16px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: 2px;
  background-color: var(--very-dark-violet-3);
  border-radius: 0px 0px 12px 12px;
  @media screen and (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const AddNewPhoneError = styled(Typography)`
  max-height: 16px;
  color: var(--vivid-red);
  line-height: 1;
`;
