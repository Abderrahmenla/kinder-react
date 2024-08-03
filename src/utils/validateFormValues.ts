import { ChangePasswordFormValues } from '@/components/Organisms/Settings/Profile/ChangePasswordForm/ChangePassword.type';
import { DEFAULT_CURRENCY } from '@/hooks/useCountryCurrencyData/types';

export interface IFormValues {
  username: string;
  usernameOrEmail: string;
  email: string;
  password: string;
  promoCode?: string;
  currency?: string;
  termsAndConditions?: boolean;
  marketingOpt?: boolean;
  dateOfBirth?: string;
  countryCode?: string;
  country?: string;
  mobilePhone: string;
}
export interface IFormErrors {
  username?: string;
  usernameOrEmail?: string;
  email?: string;
  password?: string;
  promoCode?: string;
  currency?: string;
  countryCode?: string;
  country?: string;
  termsAndConditions?: string;
  marketingOpt?: string;
  dateOfBirth?: string;
  mobilePhone: string;
}

export interface FormObj {
  value: string | undefined;
  error: string | undefined;
}

export interface SigninFormInput {
  usernameOrEmail: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: FormObj;
}

export interface RegisterFormInput {
  username: FormObj;
  email: FormObj;
  password: FormObj;
  promoCode?: FormObj;
  currency?: FormObj;
  termsAndConditions?: FormObj;
  marketingOpt?: FormObj;
  dateOfBirth?: FormObj;
  countryCode?: FormObj;
  country?: FormObj;
}

export const initialFormValues = {
  username: '',
  email: '',
  password: '',
  usernameOrEmail: '',
  promoCode: '',
  currency: DEFAULT_CURRENCY,
  termsAndConditions: false,
  marketingOpt: true,
  dateOfBirth: '',
  country: '',
  countryCode: '',
  mobilePhone: ''
};

export const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  usernameOrEmail: '',
  promoCode: '',
  currency: '',
  termsAndConditions: '',
  marketingOpt: '',
  dateOfBirth: '',
  country: '',
  countryCode: '',
  mobilePhone: ''
};

export const isValidUsername = (username: string) => username.length >= 6 && username.length <= 15;

export const isValidEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
export const isValidPassword = (password: string) => password.length >= 6;
export const isOver18 = (dateOfBirth?: string) => {
  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      return false;
    }
  }
  return true;
};

export const isDateOfBirthValid = (dateOfBirth?: string): string | null => {
  if (!dateOfBirth) {
    return 'Date of birth is required.';
  }
  const dobParts = dateOfBirth.split('-');

  if (dobParts.length !== 3) {
    return "Invalid format. Please use 'YYYY-MM-DD' format.";
  }

  const year = parseInt(dobParts[0]);
  const month = parseInt(dobParts[1]);
  const day = parseInt(dobParts[2]);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return 'Invalid numeric values for year, month, or day.';
  }
  // Check for valid day range based on the month
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the last day of the month
  if (day < 1 || day > daysInMonth) {
    return `Invalid day. Day should be between 1 and ${daysInMonth}.`;
  }

  // Check for leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (month === 2 && day === 29 && !isLeapYear) {
    return 'February 29 is only valid in a leap year.';
  }

  if (month < 1 || month > 12) {
    return 'Invalid month. Month should be between 1 and 12.';
  }

  if (year < 1900) {
    return 'Invalid year. Year should be 1900 or later.';
  }

  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day);

  if (inputDate > currentDate) {
    return 'Date of birth cannot be in the future.';
  }

  return null; // No errors, date of birth is valid
};

export const validateInput = (name: string, value: any) => {
  let error = '';
  switch (name) {
    case 'usernameOrEmail':
      if (!value) {
        error = 'Username or Email is required.';
      } else if (value.includes('@') && !isValidEmail(value)) {
        error = 'Email format is incorrect.';
      }
      break;
    case 'password':
    case 'oldPassword':
    case 'newPassword':
    case 'confirmedPassword':
      if (!value) {
        error = 'Password is required.';
      } else if (!isValidPassword(value)) {
        error = 'Password should be at least 6 characters.';
      }
      break;
    case 'username':
      if (!value) {
        error = 'Username is required.';
      } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
        error = 'Username can only contain alphanumeric characters without spaces.';
      } else if (value.length < 6) {
        error = 'Your username must be at least 6 characters long.';
      } else if (value.length > 15) {
        error = 'Username must be less than 15 characters.';
      }
      break;
    case 'email':
      if (!value) {
        error = 'Email is required.';
      } else {
        error = isValidEmail(value) ? '' : 'Email format is incorrect.';
      }
      break;

    case 'country':
      error = value ? '' : 'Country is required.';
      break;
    case 'currency':
      error = value ? '' : 'Currency is required.';
      break;
    case 'dateOfBirth':
      {
        const isInValid = isDateOfBirthValid(value);
        if (isInValid) {
          error = isInValid;
        } else if (!isOver18(value)) {
          error = 'You must be at least 18 years old.';
        }
      }
      break;
    case 'termsAndConditions':
      {
        if (!value) error = 'You must agree to the terms and conditions.';
      }
      break;
    default:
      break;
  }
  return error;
};

export const validateChangePasswordFormValues = (
  formValues: ChangePasswordFormValues,
  t: (key: string) => string
) => {
  let errors = {};

  for (const key in formValues) {
    const value = formValues[key as keyof ChangePasswordFormValues];
    if (!value) {
      errors = { ...errors, [key]: t('requiredFieldError') };
    } else if (value.length < 6) {
      errors = { ...errors, [key]: t('passwordLengthError') };
    } else if (key === 'newPassword' && value === formValues.oldPassword) {
      errors = { ...errors, [key]: t('newPasswordMustBeDifferentError') };
    } else if (key === 'confirmedPassword' && value !== formValues.newPassword) {
      errors = { ...errors, [key]: t('passwordDontMatchError') };
    }
  }

  return errors;
};

interface FormState {
  firstName: string;
  lastName: string;
  address: string;
  countryCode?: string;
  city: string;
  state: string;
  postalCode: string;
  mobilePhone: string;
}

// Check if a field is empty
const isEmpty = (value?: string) => value?.trim() === '';

export const validatePlayerDetails = (formState: FormState): FormState => {
  // For simplicity, this function just checks if fields are empty.
  // You should add more comprehensive checks based on your requirements.
  const errors: FormState = {
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    city: '',
    state: '',
    postalCode: '',
    mobilePhone: ''
  };

  for (const field in formState) {
    if (isEmpty(formState[field as keyof FormState])) {
      errors[field as keyof FormState] = `${field} cannot be empty`;
    }
  }

  return errors;
};
