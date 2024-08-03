import DateInput from '@/components/Atoms/DateInput';
import { DropDown } from '@/components/Atoms/DropDown';
import Input from '@/components/Atoms/Input';
import styled from '@emotion/styled';
import { Button } from '../..';
import Checkbox from '@/components/Atoms/Checkbox';
import Typography from '@/components/Atoms/Typography/Typography';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  label {
    line-height: 1;
  }
  input::placeholder {
    color: var(--white-2);
    opacity: 1;
  }

  input::-ms-input-placeholder {
    color: var(--white-2);
  }
`;

export const FormGroup = styled('div')<{ hasError: boolean }>`
  margin-bottom: ${({ hasError }) => (hasError ? 'unset' : '16px')};
  display: flex;

  @media screen and (min-width: 768px) {
    width: 328px;
    margin: auto;
    margin-bottom: ${({ hasError }) => (hasError ? 'unset' : '16px')};
  }
  .error-message {
    margin-top: unset;
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

export const countryDropDownStyle = {
  width: '100%'
};

export const countryStyleDropdown = {
  borderRadius: '6px',
  padding: '0px 8px',
  height: '40px',
  gap: 'unset'
};

export const countryDropDownListStyle: React.CSSProperties = {
  color: 'white',
  position: 'relative',
  width: '240px',
  zIndex: '2',
  backgroundColor: 'rgb(33, 20, 66)',
  maxHeight: '200px',
  overflowY: 'scroll',
  fontSize: '12px'
};

export const CountryDropDown = styled(DropDown)`
  display: flex;
  justify-content: flex-start;
  background: var(--very-dark-des-violet, #3c2a63);

  > div {
    flex: 1;
  }
`;

export const CurrencyDropDownContainer = styled('div')`
  width: 74px;
  position: relative;
  margin-right: 18px;
  display: flex;
  flex-direction: column;
`;

export const CountryDropDownContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  max-height: 24px;
  min-width: 240px;

  > p {
    font-size: 12px;
  }
`;

export const DropDownLabel = styled('label')`
  width: 100%;
  color: var(--soft-blue-100);
  font-size: 12px;
  margin-bottom: 8px;
  line-height: 1;
`;
export const currencyStyleDropdown: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '6px',
  width: '100%',
  height: '40px'
};

export const currencyDropDownListStyle: React.CSSProperties = {
  color: 'white',
  position: 'absolute',
  width: '74px',
  zIndex: '1',
  backgroundColor: 'var(--very-dark-violet-200)',
  left: '0px',
  maxHeight: '145px',
  overflowY: 'scroll',
  fontSize: '12px'
};

export const CurrencyDropdown = styled(DropDown)`
  background: var(--very-dark-des-violet, #3c2a63);
`;

export const RegisterDateInput = styled(DateInput)`
  margin-bottom: unset;
  color: var(--soft-blue-100);
  font-size: 12px;
  input::placeholder {
    color: var(--white-2);
    opacity: 1;
  }

  input::-ms-input-placeholder {
    color: var(--white-2);
  }
`;

export const ActionContainer = styled('div')`
  width: 100%;
  padding: 0px 6px;
  margin-bottom: 16px;
`;

export const FormButton = styled(Button)<{ isLoading: boolean }>`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 328px;
    height: 40px;
    margin: auto;
  }
`;

export const TermsAndConditionsLink = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& a': {
    fontWeight: 400,
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-16)',
    color: 'var(--pure-blue)',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  '& p': {
    fontWeight: 400,
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-17)',
    color: 'var(--soft-violet)',
    textAlign: 'center',
    '& a': {
      fontWeight: 400,
      fontSize: 'var(--font-size-12)',
      lineHeight: 'var(--l-height-16)',
      color: 'var(--soft-violet)',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      transition: 'all .4s',
      cursor: 'pointer'
    }
  }
});

export const TermsCheckBox = styled(Checkbox)`
  margin-bottom: 16px;
`;

export const MarketingOptCheckBox = styled(Checkbox)`
  margin-bottom: 16px;
`;

export const CoinLoader = styled('div')``;

export const CountryDropdownLabel = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PhoneField = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PhoneLabel = styled(Typography)`
  color: var(--soft-blue-100);
  margin-bottom: 8px;
  line-height: normal;
`;

export const PhoneCountry = styled('div')`
  display: flex;
  gap: 8px;
  background: var(--very-dark-des-violet);
  padding: 8px 10px;
  align-items: center;
  border-radius: 6px;
`;

export const PhoneCountryName = styled(Typography)`
  font-weight: 500;
  h5 {
    margin: unset;
  }
`;

export const Phone = styled('div')<{ hasError: boolean }>`
  margin-bottom: ${({ hasError }) => (!hasError ? '16px' : '')};
  display: flex;
  gap: 8px;
`;

export const PhoneValidatedImage = styled('div')`
  display: flex;
  position: absolute;
  top: 40px;
  right: 15px;
`;

export const phoneInputStyle = {
  borderRadius: '6px',
  height: '40px',
  flex: '1',
  width: '100%',
  borderColor: 'var(--very-dark-des-violet)'
};

export const phoneInputErrorStyle = {
  ...phoneInputStyle,
  border: '1px solid var(--vivid-red)'
};

export const phoneInputHoverStyle = {
  ...phoneInputStyle,
  border: '1px solid var(--yellow-4)'
};

export const phoneInputValidatedStyle = {
  ...phoneInputStyle,
  border: '1px solid var(--lime-green-400)'
};

export const phoneInputContainerStyle = { display: 'flex', height: '40px' };
