import { UseCustomToastProps } from '@/hooks/useCustomToast';
import { Dispatch, SetStateAction } from 'react';

export interface CountryType {
  name: string;
  dial_code: string;
  code: string;
  flag_1x1?: string;
  flag_4x3?: string;
}

export interface PhoneContainerProps {
  t: (key: string) => string;
  countryCode: string | null;
  mobilePhone: string | null;
  isMobile: boolean;
  displayToast: (props: UseCustomToastProps) => void;
  setPhoneHasError: Dispatch<SetStateAction<boolean>>;
}

export interface SettingsContentProps {
  setIsPageOpen: Dispatch<SetStateAction<string>>;
  isPageOpen: string;
}

export interface UserAndEmailProps {
  label: string;
  value: string;
}

export interface PhoneFormProps {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string | undefined>>;
  selectedCountry: CountryType;
  t: (key: string) => string;
  displayToast: (props: UseCustomToastProps) => void;
  setPhoneHasError: Dispatch<SetStateAction<boolean>>;
  setIsAddedPhone: Dispatch<SetStateAction<boolean>>;
}
