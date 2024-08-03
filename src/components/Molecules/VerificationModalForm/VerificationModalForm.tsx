import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AxiosError } from 'axios';
import { apiClient } from 'src/services/clientAxios';
import {
  ActionContainer,
  CoinLoader,
  CountryDropDown,
  CountryDropDownContainer,
  CountryDropdownLabel,
  DropDownLabel,
  DropdownFormGroup,
  FootNote,
  Form,
  FormButton,
  FormGroup,
  LocationFormGroup,
  PreSelectedCountry,
  PreSelectedFlag,
  PreselectedCountryName,
  StyledInput,
  countryDropDownListStyle,
  countryDropDownStyle,
  countryStyleDropdown
} from './VerificationModalForm.styles';
import useCustomToast from '@/hooks/useCustomToast';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formVerificationCompletedState } from '@/components/state/verificationCompleted';
import { useCountryCurrencyData } from '@/hooks/useCountryCurrencyData';

import { useTranslations } from '@/hooks/useTranslations';
import { playerState } from '@/components/state/playerState';
import { useLoader } from '@/hooks/useLoader';
import { countriesAndTelCode } from '@/utils/countriesAndTelCode';
import { DEFAULT_FLAG } from '@/constants/index';
import useVerification from '@/hooks/useVerification';
import { ErrorResponse, VerificationFormState } from './VerificationModalForm.types';
import { DropdownItem } from '@/components/Atoms/DropDown';
import Image from 'next/image';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { pepSanctionedState } from '@/components/state/pepSanctionedState';
import { useVerifyPlayer } from '@/hooks/useVerifyPlayer';
import { PlayerData } from '@/hooks/types';

const initialFormState = {
  firstName: '',
  lastName: '',
  country: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  countryCode: ''
};

const VerificationModalForm: React.FC<{
  verifySuccessFn?: () => void;
  isModal: boolean;
}> = ({ verifySuccessFn, isModal = true }) => {
  const [player, setPlayer] = useRecoilState(playerState);
  const { loadingWrapper } = useLoader('coin');
  const [countries] = useState(countriesAndTelCode);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState(DEFAULT_FLAG);
  const { t } = useTranslations();
  const { isCountryLoading } = useCountryCurrencyData({
    fetchCountries: true,
    fetchCurrencies: false
  });
  const { displayToast, toastProps } = useCustomToast();
  const [formState, setFormState] = useState<VerificationFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<VerificationFormState>(initialFormState);
  const [validation, setValidation] = useState<VerificationFormState>(initialFormState);
  const setIsFormFilledFully = useSetRecoilState(formVerificationCompletedState);
  const { sanitizePlayer } = useVerification();
  const isMobile = UseMediaQuery(768);
  const pepSanctionedStatus = useRecoilValue(pepSanctionedState);
  const { verifyPlayer } = useVerifyPlayer();

  const isGenericName = useCallback(
    (firstname: string, lastName: string) => {
      let isGeneric = false;

      if (firstname.toLowerCase() === 'john' && lastName.toLowerCase() === 'doe') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: t('pleaseEnterANonGenericFirstName'),
          lastName: t('pleaseEnterANonGenericLastName')
        }));
        setValidation((prevValidation) => ({
          ...prevValidation,
          firstName: '',
          lastName: ''
        }));
        isGeneric = true;
      }
      return isGeneric;
    },
    [t]
  );

  const validateVerificationInput = useCallback(
    (field: string, value: any) => {
      const hasNumberInFirstName = /\d/.test(formState.firstName);
      const hasNumberInLastName = /\d/.test(formState.lastName);
      let error = '';

      if (value.trim() === '') {
        error = `${t(field)} cannot be empty`;
      } else if (field === 'firstName') {
        if (hasNumberInFirstName) {
          error = t('numbersAreNotAllowedInFirstNames');
        }
      } else if (field === 'lastName') {
        if (hasNumberInLastName) {
          error = t('numbersAreNotAllowedInLastNames');
        }
      }
      return error;
    },
    [formState.firstName, formState.lastName, formState.countryCode, t]
  );

  const validateForm = useCallback(() => {
    let hasError = false;
    for (const input in formState) {
      const errorMessage = validateVerificationInput(
        input,
        formState[input as keyof VerificationFormState]
      );
      if (errorMessage) {
        hasError = true;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input]: errorMessage
        }));
      }
    }
    return hasError;
  }, [formState, validateVerificationInput, isModal]);

  const handleBlur = useCallback(
    (name: string) => {
      // Validate that the field isn't empty
      isGenericName(formState.firstName, formState.lastName);
      const errorMessage = validateVerificationInput(
        name,
        formState[name as keyof VerificationFormState]
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage
      }));
      if (errorMessage) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          [name]: ''
        }));
      } else {
        setValidation((prevValidation) => ({
          ...prevValidation,
          [name]: 'valid'
        }));
      }
    },
    [formState, validateVerificationInput, isGenericName]
  );

  const handleFocus = useCallback((name: string) => {
    // Validate that the field isn't empty
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: ''
    }));
  }, []);

  useEffect(() => {
    sanitizePlayer(player, setFormState, countries);
  }, [player, countries, sanitizePlayer]);

  useEffect(() => {
    const selectedCountry = countries.find((country) => country.name === formState.country);
    setSelectedCountryFlag(selectedCountry?.flag_4x3 || DEFAULT_FLAG);
  }, [formState.country, countries]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleCountryChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: DropdownItem) => {
      const { label } = item;
      const country = countries.find((c) => c.name === label);
      setFormState((prevValues) => ({
        ...prevValues,
        country: label,
        countryCode: country?.code
      }));
    },
    [countries]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      // Check if there are any errors
      const hasError = validateForm() || isGenericName(formState.firstName, formState.lastName);
      if (!hasError) {
        const updatedPlayer = {
          ...player,
          firstName: formState.firstName,
          lastName: formState.lastName,
          street: formState.address,
          countryCode: formState.countryCode ?? '',
          city: formState.city,
          stateProvince: formState.state,
          postalCode: formState.postalCode
        };
        try {
          const response = await apiClient.put('/api/player/updatePlayer', {
            player: updatedPlayer
          });
          if (response) {
            setPlayer(updatedPlayer as PlayerData);
            setIsFormFilledFully(true);
            verifySuccessFn && verifySuccessFn();
            verifyPlayer();
            displayToast({ message: 'Player details updated!', duration: 3000 }); // Show toast on success
          }
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          if (axiosError.response) {
            const newErrors = {
              ...errors,
              firstName: axiosError.response.data.errorMessage
            };
            setErrors(newErrors);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    },
    [
      formState,
      displayToast,
      errors,
      player,
      verifySuccessFn,
      setIsFormFilledFully,
      validateForm,
      isGenericName,
      isModal,
      verifyPlayer,
      pepSanctionedStatus
    ]
  );

  const getCountryLabel = useCallback((item: DropdownItem) => {
    return (
      <CountryDropdownLabel>
        <Image
          src={item.image ? item.image : '/'}
          alt={item.label ? item.label : ''}
          width={25}
          height={25}
        />
        {item.label}
      </CountryDropdownLabel>
    );
  }, []);

  const isDisabledInputs = useMemo(() => {
    return !!pepSanctionedStatus && pepSanctionedStatus.verified;
  }, [pepSanctionedStatus]);

  return (
    <Form onSubmit={handleSubmit} isModal={isModal}>
      <FormGroup hasError={errors.firstName !== ''} isModal={isModal}>
        <StyledInput
          label={`${t('firstName')}*`}
          value={formState.firstName}
          name="firstName"
          size="md"
          placeholder="e.g. John Doe"
          id="firstname-input"
          data-testid="firstname-input"
          type="text"
          onBlur={() => handleBlur('firstName')}
          onChange={handleChange}
          onFocus={() => handleFocus('firstName')}
          errorMsg={errors.firstName}
          validated={validation.firstName === 'valid'}
          maxLength={14}
          disabled={isDisabledInputs}
        />
      </FormGroup>

      <FormGroup hasError={errors.lastName !== ''} isModal={isModal}>
        <StyledInput
          label={`${t('lastName')}*`}
          value={formState.lastName}
          size="md"
          placeholder="e.g. Doe"
          id="lastname-input"
          data-testid="lastname-input"
          type="text"
          name="lastName"
          onBlur={() => handleBlur('lastName')}
          onFocus={() => handleFocus('lastName')}
          onChange={handleChange}
          validated={validation.lastName === 'valid'}
          errorMsg={errors.lastName}
          disabled={isDisabledInputs}
        />
      </FormGroup>

      <DropdownFormGroup isLoading={isCountryLoading} hasError={false} isModal={isModal}>
        {isCountryLoading ? (
          <CoinLoader>{loadingWrapper}</CoinLoader>
        ) : (
          <CountryDropDownContainer>
            <DropDownLabel>{`${t('country')}*`}</DropDownLabel>
            {player?.countryCode ? (
              <PreSelectedCountry>
                <PreSelectedFlag
                  src={selectedCountryFlag}
                  alt="preselected_flag"
                  width={20}
                  height={20}
                />
                <PreselectedCountryName size="h5" type="Heading">
                  {formState.country}
                </PreselectedCountryName>
              </PreSelectedCountry>
            ) : (
              <CountryDropDown
                label={formState.country ? formState.country : t('country')}
                dropdownItems={countries.map((country) => ({
                  label: country.name,
                  flagImage: country.flag_4x3
                }))}
                renderContent={(item: DropdownItem) => getCountryLabel(item)}
                style={countryDropDownStyle}
                styleDropdown={countryStyleDropdown}
                styleDropdownList={countryDropDownListStyle}
                handleItemClick={handleCountryChange}
                icon={selectedCountryFlag}
              />
            )}
          </CountryDropDownContainer>
        )}
      </DropdownFormGroup>

      {!isModal && !isMobile && <div></div>}

      <FormGroup hasError={errors.address !== ''} isModal={isModal}>
        <StyledInput
          label={`${t('address')}*`}
          value={formState.address}
          size="md"
          type="text"
          placeholder="Address St."
          id="address-input"
          data-testid="address-input"
          name="address"
          onBlur={() => handleBlur('address')}
          onFocus={() => handleFocus('address')}
          validated={validation.address === 'valid'}
          onChange={handleChange}
          errorMsg={errors.address}
          disabled={isDisabledInputs}
        />
      </FormGroup>

      <LocationFormGroup
        hasError={errors.city !== '' || errors.state !== '' || errors.postalCode !== ''}
        isModal={isModal}
      >
        <StyledInput
          label={`${t('city')}*`}
          value={formState.city}
          size="md"
          type="text"
          placeholder="e.g. New York"
          id="city-input"
          data-testid="city-input"
          name="city"
          onBlur={() => handleBlur('city')}
          onFocus={() => handleFocus('city')}
          validated={validation.city === 'valid'}
          onChange={handleChange}
          errorMsg={errors.city}
          hasError={errors.city !== ''}
          isModal={isModal}
          disabled={isDisabledInputs}
        />

        <StyledInput
          label={`${t('stateRegion')}*`}
          value={formState.state}
          size="md"
          type="text"
          placeholder="e.g. New York"
          id="state-input"
          data-testid="state-input"
          name="state"
          onBlur={() => handleBlur('state')}
          onFocus={() => handleFocus('state')}
          validated={validation.state === 'valid'}
          onChange={handleChange}
          errorMsg={errors.state}
          hasError={errors.state !== ''}
          isModal={isModal}
          disabled={isDisabledInputs}
        />

        <StyledInput
          label={`${t('postalCode')}*`}
          value={formState.postalCode}
          size="md"
          type="text"
          placeholder="e.g. 10001"
          id="postalcode-input"
          data-testid="postalcode-input"
          name="postalCode"
          onBlur={() => handleBlur('postalCode')}
          onFocus={() => handleFocus('postalCode')}
          validated={validation.postalCode === 'valid'}
          onChange={handleChange}
          errorMsg={errors.postalCode}
          hasError={errors.postalCode !== ''}
          isModal={isModal}
          maxLength={10}
          disabled={isDisabledInputs}
        />
      </LocationFormGroup>

      <ActionContainer isModal={isModal}>
        <FootNote size="b2" type="Body">
          {t('playerDetailsFooterText')}
        </FootNote>
        <FormButton
          type="submit"
          variant="Primary"
          showIcon={false}
          isLoading={isLoading}
          disabled={isLoading || isDisabledInputs}
          isModal={isModal}
        >
          {isLoading ? t('processing') : t('submit')}
        </FormButton>
      </ActionContainer>
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </Form>
  );
};

export default VerificationModalForm;
