import { countriesAndTelCode } from '@/utils/countriesAndTelCode';
import {
  phoneInputErrorStyle,
  phoneInputHoverStyle,
  phoneInputStyle,
  phoneInputValidatedStyle
} from '@/components/Organisms/Auth/Register.styles';

const getDialCode = (countryCode: string | undefined) => {
  const dialCode = countriesAndTelCode.filter(({ code }) => code === countryCode);
  return dialCode.length !== 0 ? dialCode[0].dial_code.replace('+', '').trim() : '';
};

export const validateMobileNumber = (
  mobileNumber: string,
  countryCode: string | undefined
): string => {
  if (mobileNumber.length === 0) return 'mobileNumberIsRequired';

  const dialCode = getDialCode(countryCode);
  const sanitizedNumber = mobileNumber.replace(dialCode, '').trim();

  if (sanitizedNumber.length === 0) return 'mobileNumberIsRequired';

  return '';
};

export const getMobileNumberInputStyle = ({
  isFocused,
  hasError,
  isValid
}: {
  isFocused: boolean;
  hasError: boolean;
  isValid: boolean;
}) => {
  return isFocused
    ? phoneInputHoverStyle
    : hasError
    ? phoneInputErrorStyle
    : isValid
    ? phoneInputValidatedStyle
    : phoneInputStyle;
};
