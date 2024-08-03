import Button from '@/components/Atoms/Button/Button';
import Input from '@/components/Atoms/Input';
import Typography from '@/components/Atoms/Typography/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const VerificationContainer = styled('div')<{ isVerificationForm: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ isVerificationForm }) => {
    return (
      isVerificationForm &&
      css`
        @media (max-width: 767px) {
          border-radius: 16px;
          background: var(--very-dark-violet-3);
          padding: 12px;
        }
      `
    );
  }}
`;

export const VerificationDefaultTitle = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
  h5 {
    margin: unset;
  }
`;

export const VerificationSubTitle = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
  margin-bottom: 23px;
  max-width: 595px;
`;

export const VerificationCardPageContianer = styled(`div`)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    gap: 16px;
  }
`;

export const VerificationPageCard = styled('div')`
  display: flex;
  width: 47.5%;
  flex-direction: column;
  background: var(--very-dark-violet-3);
  justify-content: center;
  align-items: center;
  padding: 15px 0px 18px;
  gap: 28px;
  border-radius: 12px;
  cursor: pointer;
  max-height: 174px;

  &:hover {
    border: var(--very-dark-des-violet);
  }

  @media (min-width: 768px) {
    min-height: 253px;
    width: 100%;
    max-width: 229px;
  }

  @media (max-width: 280px) {
    width: 46.5%;
    gap: 12px;
  }
`;

export const VerificationPageCardImage = styled('div')<{ isHover: boolean }>`
  background: var(--very-dark-violet-300);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transition: all ease 0.4s;
  width: 96px;
  height: 96px;
  border-radius: 96px;

  @media (min-width: 768px) {
    width: 136px;
    height: 136px;
    border-radius: 136px;
  }

  @media (max-width: 280px) {
    width: 70px;
    height: 70px;
    border-radius: 70px;

    img {
      width: 35px;
      height: 35px;
    }
  }
  ${({ isHover }) => {
    if (isHover) {
      return css`
        transform: scale(0.8);
        img {
          filter: brightness(0) saturate(100%) invert(51%) sepia(33%) saturate(7240%)
            hue-rotate(229deg) brightness(102%) contrast(102%);
        }
      `;
    }
  }};
`;

export const VerificationPageName = styled(Typography)`
  color: var(--darker-white);

  @media (max-width: 280px) {
    text-align: center;
    width: 80px;
  }
`;

export const VerificationHeader = styled('div')`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const VerificationBackbutton = styled('div')`
  padding: 4px;
  border-radius: 6px;
  background: var(--very-dark-violet-200);
  cursor: pointer;
  line-height: 1;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--very-dark-des-violet);
  }
`;

export const VerificationProofContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  gap: 12px;
  @media (min-width: 768px) {
    gap: 14px;
  }
`;
export const VerificationUploadBox = styled('div')<{ hasError: boolean }>`
  display: flex;
  border-radius: 12px;
  background-color: var(--very-dark-violet-3);
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='${({
    hasError
  }) =>
    hasError
      ? '%23EC2A00'
      : '%234F397DFF'}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='13' stroke-linecap='square'/%3e%3c/svg%3e");
  justify-content: center;
  align-items: center;
`;
export const VerifictionUploadBoxTexts = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: unset;
  }
`;
export const VerificationUploadBoxTitle = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
  font-weight: 600;
`;

export const VerificationUploadBoxSubtitle = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
`;

export const VerificationUploadBoxButton = styled(`label`)`
  min-height: 36px;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: var(--pure-blue);
  color: var(--darker-white);
  margin-top: 19px;

  &:hover {
    background: var(--gradient-gradient-2, linear-gradient(90deg, #ffde09 0%, #ffbd14 99.48%));
  }

  @media (min-width: 768px) {
    margin-top: unset;
  }
`;
export const VerificationUploadInput = styled(Input)`
  height: 0px;
  visibility: hidden;
  width: 0px;
  span {
    visibility: hidden;
  }
`;

export const VerificationUploadBoxButtonText = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
`;

export const VerificationProofAction = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  order: 3;
  gap: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: unset;
    margin-top: unset;
    order: unset;
  }
`;

export const VerificationProofSafeText = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
  flex: 1;
`;

export const VerificationProofSubmitButton = styled(Button)`
  width: 100%;

  @media (min-width: 768px) {
    width: fit-content;
    margin-top: unset;
  }
`;

export const VerificationProofSubmitButtonText = styled(Typography)`
  color: var(--very-dark-violet);
  line-height: 1;
  font-weight: 500;
`;

export const UploadProgressBar = styled('progress')`
  color: var(--very-dark-violet);
  width: 70%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;

  &::-moz-progress-bar {
    background: var(--very-dark-violet); !important;
  }

  &::-webkit-progress-value {
    background: var(--yellow-4) !important;
  }

  &::-webkit-progress-bar {
    background: var(--very-dark-violet); !important;
  }

  --clr-progress-default-color: var(--clr-color-action-600);
  --clr-progress-alt-color-1: var(--clr-color-success-400); // green
  --clr-progress-alt-color-2: var(--clr-color-danger-800); // red
  --clr-progress-alt-color-3: var(--clr-progress-alt-color-2); // red
  --clr-progress-bg-color: var(--clr-color-neutral-200);
`;

export const UploadingFilePercentage = styled(Typography)`
  color: var(--darker-white);
`;

export const UploadingCancelButton = styled(Button)`
  min-height: 36px;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: var(--pure-blue) !important;
  color: var(--darker-white);
  width: fit-content;

  &:hover {
    background: var(--gradient-gradient-2, linear-gradient(90deg, #ffde09 0%, #ffbd14 99.48%));
  }
`;

export const VerificationProofWarning = styled('div')`
  display: flex;
  background: var(--very-dark-violet-200);
  border-radius: 6px;
  border-left: 1px solid var(--yellow-4);
  padding: 16px;
  gap: 8px;
  flex-direction: column;
  flex-position: 2;
  order: 2;

  @media (min-width: 768px) {
    gap: 16px;
    padding: 9px 13px 9px 20px;
    flex-direction: row;
    flex-position: 1;
    align-items: center;
    order: unset;
    margin-top: unset;
  }
`;

export const VerificationProofWarningText = styled(Typography)`
  color: var(--white-2);
  line-height: 1;
  @media (min-width: 768px) {
    text-align: justify;
  }
`;

export const UploadFileRequirement = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const FileRequirementLine = styled(Typography)`
  color: var(--white-2);
  line-height: 1;
`;

export const UploadProgressContainer = styled('div')`
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 158px;

  @media (min-width: 768px) {
    gap: 16px;
    min-height: 298px;
  }
`;

export const UploadFileFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 158px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 20px;
    min-height: 298px;
    justify-content: center;
  }
`;

export const ErrorMessageContainer = styled('div')`
  display: flex;
  min-height: 158px;
  align-items: center;
  max-width: 251px;

  @media (min-width: 768px) {
    min-height: 298px;
    max-width: unset;
  }
`;

export const ErrorMessage = styled(Typography)`
  text-align: center;
  color: var(--pure-red);
  line-height: 1;
  span {
    font-weight: 600;
  }
`;

export const VerificationMainContainer = styled('div')`
  @media screen and (min-width: 1280px) {
    min-width: 972px;
  }
`;
