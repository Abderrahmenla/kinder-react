import { useState, useRef, useCallback, useEffect, memo } from 'react';
import Link from 'next/link';
import { AxiosError, AxiosResponse } from 'axios';
import useCustomToast from '@/hooks/useCustomToast';
import {
  IFormErrors,
  IFormValues,
  initialFormValues,
  initialFormErrors,
  validateInput
} from '@/utils/validateFormValues';
import { authState } from '@/components/state/isAuthenticated';
import { useRecoilState } from 'recoil';
import { CAPTCHA_SITE_KEY, DEFAULT_FLAG } from '@/constants/index';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useCountryCurrencyData, useCurrencyPreselection } from '@/hooks/useCountryCurrencyData';
import { useCountryLocation } from '@/hooks/useCountryCurrencyData/useCountryLocation';
import { useTrackingContext } from 'src/providers/TrackingProvider';
import { registrationSuccessState } from '@/components/state/registrationSuccessState';
import { useTranslations } from '@/hooks/useTranslations';
import useAuthenticationForm from '@/hooks/useAuthenticationForm';
import { useLoader } from '@/hooks/useLoader';
import {
  ActionContainer,
  CoinLoader,
  CountryDropDown,
  CountryDropDownContainer,
  CountryDropdownLabel,
  CurrencyDropDownContainer,
  CurrencyDropdown,
  DropDownLabel,
  DropdownFormGroup,
  Form,
  FormButton,
  FormGroup,
  RegisterDateInput,
  StyledInput,
  TermsAndConditionsLink,
  TermsCheckBox,
  MarketingOptCheckBox,
  countryDropDownListStyle,
  countryDropDownStyle,
  countryStyleDropdown,
  currencyDropDownListStyle,
  currencyStyleDropdown,
  PhoneField,
  PhoneLabel,
  Phone,
  PhoneCountry,
  PhoneCountryName,
  phoneInputContainerStyle,
  PhoneValidatedImage
} from './Register.styles';
import { DropdownItem } from '@/components/Atoms/DropDown';
import { getMobileNumberInputStyle, validateMobileNumber } from '@/utils/mobileInputUtils';
import PhoneInput from 'react-phone-input-2';
import Typography from '@/components/Atoms/Typography/Typography';
import ReactHtmlParser from 'react-html-parser';
import { countriesAndTelCode } from '@/utils/countriesAndTelCode';
import { assets } from '@/config/assets';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const CustomToast = dynamic(
  () => import('@/components/Atoms/CustomToast/CustomToast').then((mod) => mod.CustomToast),
  { ssr: false }
);

interface ValidationError {
  [field: string]: string[];
}

interface ErrorResponse {
  errorMessage?: string;
  error?: string;
  validationErrors?: ValidationError;
}

const Register = ({ handleCloseAuth }: { handleCloseAuth: () => void }) => {
  const { t } = useTranslations();
  const [formValues, setFormValues] = useState<IFormValues>(initialFormValues);
  const [errors, setErrors] = useState<IFormErrors>(initialFormErrors);
  const [, setAuth] = useRecoilState(authState);
  const [, setRegistrationSuccessState] = useRecoilState(registrationSuccessState);
  const { isLoading, handleRegister } = useAuthenticationForm();
  const { displayToast, toastProps } = useCustomToast();
  const { currencies, isCountryLoading, isCurrencyLoading } = useCountryCurrencyData({});
  const [countries] = useState(countriesAndTelCode.filter((country) => !country.restricted));
  const [selectedCountryFlag, setSelectedCountryFlag] = useState(DEFAULT_FLAG);
  const { preselectedCurrency, handleCurrencyPreselection } = useCurrencyPreselection();
  const {
    countryLocation,
    isCountryLocationLoading,
    handleSetCountryLocation: handlePreselectCountry
  } = useCountryLocation();
  const { handleTrackUserRegister, handleTrackUserLogin } = useTrackingContext();
  const { loadingWrapper } = useLoader('coin');
  const captchaRef = useRef<HCaptcha | null>(null);
  const [countryIsVisible, setCountryIsVisible] = useState(false);
  const [currencyIsVisible, setCurrencyIsVisible] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const phoneHasError = errors.mobilePhone !== '';
  const phoneIsValid = formValues.mobilePhone?.length > 0 && !phoneHasError;

  useEffect(() => {
    if (countries?.length && !isCountryLoading) {
      handlePreselectCountry();
    }
  }, [countries, isCountryLoading, handlePreselectCountry]);

  useEffect(() => {
    if (countryLocation?.code) {
      setFormValues((prevValues) => ({
        ...prevValues,
        countryCode: countryLocation?.code,
        country: countryLocation?.name
      }));
      handleCurrencyPreselection(countryLocation?.code);
    }
  }, [countryLocation, handleCurrencyPreselection]);
  useEffect(() => {
    if (preselectedCurrency != null) {
      setFormValues((prevValues) => ({
        ...prevValues,
        currency: preselectedCurrency
      }));
    }
  }, [preselectedCurrency]);

  useEffect(() => {
    if (preselectedCurrency != null) {
      setFormValues((prevValues) => ({
        ...prevValues,
        currency: preselectedCurrency
      }));
    }
  }, [preselectedCurrency]);
  useEffect(() => {
    const selectedCountry = countries.find((country) => country.name === formValues.country);
    setSelectedCountryFlag(selectedCountry?.flag_4x3 || DEFAULT_FLAG);
  }, [formValues.country, countries]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleBlur = (name: keyof IFormValues) => {
    const error = validateInput(name, formValues[name]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleDateChange = (value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      dateOfBirth: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      termsAndConditions: checked
    }));

    let error = '';
    error = checked ? '' : t('You must agree to the terms and conditions.');
    setErrors((prevErrors) => ({
      ...prevErrors,
      termsAndConditions: error
    }));
  };

  const handleMarketingOptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      marketingOpt: checked
    }));

    const error = '';

    setErrors((prevErrors) => ({
      ...prevErrors,
      marketingOpt: error
    }));
  };

  const handleCountryChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: DropdownItem) => {
      const { label } = item;
      const country = countries.find((c) => c.name === label);
      handleCurrencyPreselection(country?.code);
      setFormValues((prevValues) => ({
        ...prevValues,
        country: label,
        countryCode: country?.code
      }));
    },
    [setFormValues, handleCurrencyPreselection, countries]
  );

  const handleCurrencyChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: DropdownItem) => {
      const { label } = item;
      handleCurrencyPreselection(undefined);
      setFormValues((prevValues) => ({
        ...prevValues,
        currency: label
      }));
    },
    [setFormValues, handleCurrencyPreselection]
  );

  const successCallback = useCallback(
    (data: AxiosResponse) => {
      handleTrackUserRegister();
      setAuth({
        isAuthenticated: !!data.data.logonSession.sessionToken,
        username: data.data.logonSession.username,
        token: data.data.logonSession.sessionToken,
        playerId: data.data.logonSession.playerId
      });
      handleTrackUserLogin(data?.data?.logonSession?.playerId); // tracking login as well since user is automatically logged in
      setRegistrationSuccessState(true);
      displayToast({ message: t('registrationSuccessMessage'), duration: 3000 });
      setFormValues(initialFormValues);
      setErrors(initialFormErrors);
      setTimeout(() => {
        handleCloseAuth();
      }, 3000);
    },
    [
      displayToast,
      setAuth,
      setFormValues,
      handleTrackUserLogin,
      handleTrackUserRegister,
      setRegistrationSuccessState,
      handleCloseAuth,
      t
    ]
  );

  const errorCallback = useCallback(
    (error: AxiosError<ErrorResponse>) => {
      const axiosError = error;
      /* eslint-disable no-console */
      if (axiosError.response) {
        const serverError = axiosError.response.data;
        if (serverError) {
          if (serverError.error) {
            setErrors((prevErrors) => ({ ...prevErrors, username: serverError.error }));
          }
          if (serverError.errorMessage) {
            if (serverError.errorMessage === 'PrincipalExist') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                username: t('usernameExist')
              }));
            }
            if (serverError.errorMessage === 'EmailExist') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: t('emailExist')
              }));
            }
          }

          if (serverError.validationErrors) {
            const errorFields: { [key: string]: string } = {};
            Object.keys(serverError.validationErrors).forEach((field) => {
              // Here we ensure that serverError.validationErrors is not undefined before accessing its properties
              if (serverError.validationErrors) {
                const fieldName = field.split('.')[1].toLowerCase();
                errorFields[fieldName] = serverError.validationErrors[field][0];
              }
            });
            setErrors((prevErrors) => ({ ...prevErrors, ...errorFields }));
          }
        }
      }
    },
    [t]
  );

  const handleRegisteration = useCallback(async () => {
    handleRegister(formValues, successCallback, errorCallback);
  }, [formValues, errorCallback, successCallback, handleRegister]);

  const validatedInput = useCallback(
    (formInput: IFormValues) => {
      let hasError = false;
      for (const key in formInput) {
        if (['usernameOrEmail', 'mobilePhone'].includes(key)) continue;
        const error = validateInput(key, formInput[key as keyof IFormValues]);
        if (error.trim().length) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: error
          }));
          hasError = true;
        } else if (errors[key as keyof IFormErrors]) {
          hasError = true;
        }
      }

      const mobilePhoneError = validateMobileNumber(
        formInput.mobilePhone as string,
        formInput.countryCode
      );
      hasError = mobilePhoneError.length > 0;
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobilePhone: mobilePhoneError
      }));

      return hasError;
    },
    [errors]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const hasError = validatedInput(formValues);

      if (!hasError && captchaRef?.current) {
        captchaRef.current.execute?.();
      }
    },
    [formValues, validatedInput]
  );

  const getCountryLabel = (item: any) => {
    return (
      <CountryDropdownLabel>
        <Image src={item.flagImage} alt={item.label} width={25} height={25} loading="lazy" />
        {item.label}
      </CountryDropdownLabel>
    );
  };

  const onCountryVisibilityChange = useCallback(() => {
    setCountryIsVisible(!countryIsVisible);
  }, [countryIsVisible]);

  const onCurrencyVisibilityChange = useCallback(() => {
    setCurrencyIsVisible(!currencyIsVisible);
  }, [currencyIsVisible]);

  const onFocusHandler = useCallback(() => {
    setCountryIsVisible(false);
    setCurrencyIsVisible(false);
  }, []);

  const handlePhoneOnChange = (mobilePhone: string) => {
    setFormValues((current) => ({
      ...current,
      mobilePhone
    }));
  };

  const handlePhoneOnFocus = () => {
    setPhoneIsFocused(true);
    onFocusHandler();
  };

  const handlePhoneOnBlur = useCallback(() => {
    const { mobilePhone, countryCode } = formValues;
    const mobilePhoneError = validateMobileNumber(mobilePhone, countryCode);
    setErrors((current) => ({ ...current, mobilePhone: mobilePhoneError }));
    setPhoneIsFocused(false);
  }, [formValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup hasError={errors.username !== ''}>
        <StyledInput
          label={`${t('username')}*`}
          value={formValues.username}
          name={'username'}
          size="md"
          placeholder="e.g. John Doe"
          id="Username"
          data-testid="user-input"
          type="text"
          onBlur={() => handleBlur('username')}
          onChange={handleChange}
          errorMsg={errors.username}
          maxLength={14}
          onFocus={onFocusHandler}
        />
      </FormGroup>

      <FormGroup hasError={errors.email !== ''}>
        <StyledInput
          label={`${t('email')}*`}
          value={formValues.email}
          size="md"
          placeholder="Your@email.address"
          id="Your Email"
          data-testid="email-input"
          type="email"
          name="email"
          onBlur={() => handleBlur('email')}
          onChange={handleChange}
          errorMsg={errors.email}
          onFocus={onFocusHandler}
        />
      </FormGroup>

      <DropdownFormGroup
        isLoading={isCurrencyLoading || isCountryLocationLoading || isCountryLoading}
        hasError={false}
      >
        {isCurrencyLoading || isCountryLocationLoading || isCountryLoading ? (
          <CoinLoader>{loadingWrapper}</CoinLoader>
        ) : (
          <>
            <CountryDropDownContainer>
              <DropDownLabel>{`${t('country')}*`}</DropDownLabel>
              <CountryDropDown
                label={formValues.country ? formValues.country : t('country')}
                dropdownItems={countries.map((country) => ({
                  label: country.name,
                  flagImage: country.flag_4x3
                }))}
                renderContent={(item: any) => getCountryLabel(item)}
                style={countryDropDownStyle}
                styleDropdown={countryStyleDropdown}
                styleDropdownList={countryDropDownListStyle}
                handleItemClick={handleCountryChange}
                icon={selectedCountryFlag}
                hasDropDownAnimation={false}
                closeDropdownListAfterItemClick
                activeDropdownItem={true}
                activeIndex={countries.findIndex((c) => c.name === formValues.country)}
                isVisible={countryIsVisible}
                onVisibilityChange={onCountryVisibilityChange}
              />
            </CountryDropDownContainer>
            <CurrencyDropDownContainer>
              <DropDownLabel>{`${t('currency')}*`}</DropDownLabel>
              <CurrencyDropdown
                label={preselectedCurrency ?? formValues.currency ?? t('USD')}
                dropdownItems={currencies?.map((c) => ({ label: c.code }))}
                renderContent={(item: any) => <span>{item.label}</span>}
                styleDropdown={currencyStyleDropdown}
                styleDropdownList={currencyDropDownListStyle}
                handleItemClick={handleCurrencyChange}
                hasDropDownAnimation={false}
                closeDropdownListAfterItemClick
                activeDropdownItem={true}
                activeIndex={currencies?.findIndex(
                  (c) => c.code === (preselectedCurrency || formValues.currency || t('USD'))
                )}
                isVisible={currencyIsVisible}
                onVisibilityChange={onCurrencyVisibilityChange}
              />
            </CurrencyDropDownContainer>
          </>
        )}
      </DropdownFormGroup>

      <FormGroup hasError={errors.password !== ''}>
        <StyledInput
          label={`${t('password')}*`}
          value={formValues.password}
          size="md"
          type="password"
          placeholder="Min 6 characters"
          id="Password"
          data-testid="user-input"
          name="password"
          onBlur={() => handleBlur('password')}
          onChange={handleChange}
          errorMsg={errors.password}
          onFocus={onFocusHandler}
        />
      </FormGroup>

      <FormGroup hasError={errors.dateOfBirth !== ''}>
        <RegisterDateInput
          label={`${t('dateOfBirth')}*`}
          name="dateOfBirth"
          id="Date of Birth"
          value={formValues.dateOfBirth ?? ''}
          onBlur={() => handleBlur('dateOfBirth')}
          onChange={handleDateChange}
          errorMsg={errors.dateOfBirth}
          onInputFocus={onFocusHandler}
        />
      </FormGroup>

      <PhoneField>
        <PhoneLabel size="b3" type="Body">
          {t('mobilePhone')}*
        </PhoneLabel>
        <Phone hasError={phoneHasError}>
          <PhoneCountry>
            <Image
              src={selectedCountryFlag}
              alt="country flag"
              width={16}
              height={12}
              loading="lazy"
            />
            <PhoneCountryName size="h5" type="Heading" color="var(--white)">
              {formValues.countryCode}
            </PhoneCountryName>
          </PhoneCountry>
          <PhoneInput
            onBlur={handlePhoneOnBlur}
            onFocus={handlePhoneOnFocus}
            onChange={handlePhoneOnChange}
            value={formValues.mobilePhone}
            country={formValues?.countryCode?.toLowerCase()}
            inputProps={{ 'data-testid': 'mobilePhone', name: 'mobilePhone', required: true }}
            buttonStyle={{ display: 'none' }}
            inputStyle={getMobileNumberInputStyle({
              isFocused: phoneIsFocused,
              hasError: phoneHasError,
              isValid: phoneIsValid
            })}
            containerStyle={phoneInputContainerStyle}
            countryCodeEditable={false}
            disableDropdown
          />
        </Phone>
        {phoneIsValid && (
          <PhoneValidatedImage>
            <Image
              src={`${assets}/images/checkmark-icon.svg`}
              width={16}
              height={16}
              data-testid="checkmark-icon"
              alt="checkmark icon"
              style={{ marginLeft: '5px' }}
              loading="lazy"
            />
          </PhoneValidatedImage>
        )}
        {errors.mobilePhone && (
          <Typography size="b3" color="var(--vivid-red)">
            {t(errors.mobilePhone)}
          </Typography>
        )}
      </PhoneField>

      <FormGroup hasError={false}>
        <StyledInput
          label={t('promoCodeOptional')}
          size="md"
          placeholder="b66678885888858585885"
          type="text"
          name="promoCode"
          value={formValues.promoCode}
          onChange={handleChange}
          onFocus={onFocusHandler}
        />
      </FormGroup>

      <ActionContainer>
        <MarketingOptCheckBox
          label={t('marketingOpt')}
          checked={formValues.marketingOpt}
          onChange={handleMarketingOptChange}
          errorMsg={errors.marketingOpt}
          onFocus={onFocusHandler}
        />
        <TermsCheckBox
          label={`${t('checkboxTermsAndCondition')}*`}
          checked={formValues.termsAndConditions}
          onChange={handleCheckboxChange}
          errorMsg={errors.termsAndConditions}
          onFocus={onFocusHandler}
        />
        <FormButton
          type="submit"
          variant="Primary"
          showIcon={false}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? t('processing') : t('register')}
        </FormButton>
      </ActionContainer>

      <HCaptcha
        size="invisible"
        sitekey={CAPTCHA_SITE_KEY}
        onVerify={(captchaToken) => {
          // @TODO: verify token on hCaptcha api
          if (captchaToken) {
            handleRegisteration();
          }
        }}
        ref={captchaRef}
      />

      <TermsAndConditionsLink>
        <Link target="_blank" href="/policies/terms">
          {t('Terms & Conditions')}
        </Link>
        {ReactHtmlParser(t('termsAndPolicy'))}
      </TermsAndConditionsLink>
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </Form>
  );
};

export default memo(Register);
