import React, { useCallback, useState } from 'react';
import {
  AddNewPhoneDialCode,
  AddNewPhoneInput,
  AddNewPhoneInputContainer,
  AddNewPhoneInputField,
  AddNewPhoneLabel,
  AddNewPhoneSaveLink,
  AddnewPhoneSaveLinkText,
  AddNewPhoneError
} from '../Profile.style';
import Image from 'next/image';
import { PhoneFormProps } from '../Profile.type';
import useAccountSettings from '@/hooks/useAccountSettings';
import { validateInput } from '@/utils/validateFormValues';

const PhoneContainerForm: React.FC<PhoneFormProps> = ({
  phoneNumber,
  setPhoneNumber,
  selectedCountry,
  t,
  displayToast,
  setPhoneHasError,
  setIsAddedPhone
}) => {
  const { isLoading, handleUpdatePhone } = useAccountSettings();
  const [errorMessage, setErrorMessage] = useState('');

  const successCallback = useCallback(() => {
    displayToast({ message: t('phoneUpdatedSucess'), duration: 3000 });
    setIsAddedPhone(true);
  }, [displayToast, t, setIsAddedPhone]);

  const handleNewPhoneSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      setPhoneHasError(false);
      setErrorMessage(t(''));
      const errorMessage = validateInput('phoneNumber', phoneNumber);

      if (errorMessage.length > 0) {
        setPhoneHasError(true);
        setErrorMessage(t(errorMessage));
      } else {
        handleUpdatePhone(phoneNumber, selectedCountry.dial_code, successCallback);
      }
    },
    [
      phoneNumber,
      handleUpdatePhone,
      selectedCountry.dial_code,
      successCallback,
      t,
      setPhoneHasError
    ]
  );

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneWithoutCountryCode = e.target.value.replace(selectedCountry.dial_code, '');
    setPhoneNumber(phoneWithoutCountryCode);
  };
  return (
    <>
      <AddNewPhoneInputContainer onSubmit={handleNewPhoneSubmit}>
        <AddNewPhoneLabel size="b2">{`${t('phoneNumber')}*`}</AddNewPhoneLabel>
        <AddNewPhoneInputField>
          <Image src={`${selectedCountry?.flag_4x3}`} alt="flag" width={16} height={12} />
          <AddNewPhoneDialCode size="b2">{`(${selectedCountry?.dial_code})`}</AddNewPhoneDialCode>
          <AddNewPhoneInput
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            size="md"
            autofocus
            type="text"
          />
          <AddNewPhoneSaveLink variant="Text" showIcon={false} type="submit" disabled={isLoading}>
            <AddnewPhoneSaveLinkText size="b2">
              {isLoading ? `${t('processing')}...` : t('save')}
            </AddnewPhoneSaveLinkText>
          </AddNewPhoneSaveLink>
        </AddNewPhoneInputField>
      </AddNewPhoneInputContainer>
      {errorMessage.trim().length > 0 && (
        <AddNewPhoneError size="b3">{errorMessage}</AddNewPhoneError>
      )}
    </>
  );
};

export default PhoneContainerForm;
