import styled from '@emotion/styled';
import Button from '@/components/Atoms/Button/Button';
import { DropDown } from '@/components/Atoms/DropDown';
import Input from '@/components/Atoms/Input';
import Typography from '@/components/Atoms/Typography/Typography';
import Image from 'next/image';
import { css } from '@emotion/react';

export const Form = styled('form')<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  transition: padding 0.3s linear;

  ${({ isModal }) => {
    return (
      !isModal &&
      css`
        margin-top: 12px;
        @media (min-width: 768px) {
          flex-direction: row;
          gap: 16px;
          flex-wrap: wrap;
        }
      `
    );
  }}
`;

export const FormButton = styled(Button)<{ isLoading: boolean; isModal: boolean }>`
  width: 100%;
  ${({ isModal }) => {
    return (
      !isModal &&
      css`
        @media (min-width: 768px) {
          width: fit-content;
        }
      `
    );
  }}
`;

export const FormGroup = styled('div')<{ hasError: boolean; isModal: boolean }>`
  margin-bottom: ${({ hasError }) => (!hasError ? '16px' : '')};
  display: flex;

  ${({ isModal, hasError }) => {
    return (
      !isModal &&
      css`
        margin-bottom: ${!hasError ? '12px' : ''};
        width: 100%;

        @media (min-width: 821px) {
          max-width: 228px;
        }

        @media (width: 1024px) {
          max-width: 160px;
        }

        @media (min-width: 912px) and (max-width: 1023px) {
          max-width: 135px;
        }

        @media (min-width: 768px) and (max-width: 820px) {
          max-width: 169px;
        }
      `
    );
  }}
`;

export const LocationFormGroup = styled(FormGroup)`
  gap: 8px;
  align-items: baseline;

  ${({ isModal }) => {
    return (
      !isModal &&
      css`
        flex-direction: column;
        gap: unset;
        @media (min-width: 768px) {
          width: 74%;
          gap: 16px;
          max-width: unset;
          flex-direction: row;
        }
      `
    );
  }}
`;

export const CountryDropDownContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;

  > p {
    font-size: 12px;
  }
`;

export const DropDownLabel = styled('label')`
  width: 100%;
  color: var(--soft-blue-100);
  font-size: 12px;
  margin-bottom: 8px;
`;

export const countryDropDownStyle = {
  width: '100%'
};

export const countryStyleDropdown = {
  borderRadius: '6px',
  padding: '0px 14px',
  height: '40px',
  gap: 'unset'
};

export const countryDropDownListStyle: React.CSSProperties = {
  color: 'var(--white)',
  position: 'relative',
  width: '257px',
  zIndex: '2',
  backgroundColor: 'var(--very-dark-violet-200)',
  maxHeight: '200px',
  overflowY: 'scroll',
  fontSize: '12px'
};

export const CountryDropDown = styled(DropDown)`
  display: flex;
  justify-content: flex-start;
  background: var(--very-dark-des-violet);

  > div {
    flex: 1;
  }
`;

export const DropdownFormGroup = styled(FormGroup)<{ isLoading: boolean }>`
  max-height: 66px;
  align-items: ${({ isLoading }) => (isLoading ? 'center' : 'unset')};

  @media screen and (max-width: 280px) {
    flex-direction: column;
    gap: 55px;
    max-height: unset;
  }
`;

export const StyledInput = styled(Input)<{ isModal?: boolean; hasError?: boolean }>`
  width: 100%;
  label {
    line-height: normal;
  }

  .error-message {
    line-height: normal;
    margin-top: 1px;
    margin-bottom: 2px;
    font-size: var(--font-size-10);
  }

  ${({ isModal, hasError }) => {
    return (
      typeof isModal !== 'undefined' &&
      !isModal &&
      css`
        margin-bottom: ${!hasError ? '12px' : 'unset'};
        @media (min-width: 768px) {
          margin-bottom: unset;
        }
      `
    );
  }}
`;

export const CoinLoader = styled('div')``;

export const ActionContainer = styled('div')<{ isModal: boolean }>`
  width: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;

  ${({ isModal }) => {
    return (
      !isModal &&
      css`
        align-items: center;
        @media (min-width: 768px) {
          flex-direction: row;
          justify-content: space-between;
        }
      `
    );
  }}
`;

export const FootNote = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
`;

export const CountryDropdownLabel = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FlagName = styled(Typography)`
  color: var(--white);
  font-weight: 500;
`;

export const PreSelectedCountry = styled('div')`
  display: flex;
  gap: 8px;
  background: var(--very-dark-des-violet);
  padding: 8px 10px;
  align-items: center;
  border-radius: 6px;
`;

export const PreSelectedFlag = styled(Image)``;

export const PreselectedCountryName = styled(Typography)`
  color: var(--white);
  font-weight: 500;
  h5 {
    margin: unset;
  }
`;
