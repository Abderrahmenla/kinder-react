import { UseCustomToastProps } from '@/hooks/useCustomToast';
import { useTranslations } from '@/hooks/useTranslations';
import { AxiosError } from 'axios';
import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  ButtonLabel,
  ChangeButton,
  ChangePasswordInput,
  FormContainer
} from './ChangePasswordForm.style';
import { ChangePasswordFormValues } from './ChangePassword.type';
import { ErrorResponse } from '@/pages/api/types';
import { initialFormValues } from '../Profile.constants';
import useAccountSettings from '@/hooks/useAccountSettings';
import { validateChangePasswordFormValues, validateInput } from '@/utils/validateFormValues';

const ChangePasswordForm: React.FC<{ displayToast: (props: UseCustomToastProps) => void }> = ({
  displayToast
}) => {
  const { isLoading, handleUpdatePassword } = useAccountSettings();
  const { t } = useTranslations();
  const [formValues, setFormValues] = useState<ChangePasswordFormValues>(initialFormValues);
  const [errors, setErrors] = useState<ChangePasswordFormValues>(initialFormValues);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name as keyof ChangePasswordFormValues]: value
    }));
  }, []);

  const handleBlur = useCallback(
    (name: keyof ChangePasswordFormValues) => {
      const newError = validateInput(name, formValues[name as keyof ChangePasswordFormValues]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: newError
      }));
    },
    [formValues]
  );

  const validateAll = useCallback(() => {
    const newErrors = validateChangePasswordFormValues(formValues, t);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors
    }));
    return Object.keys(newErrors).length > 0;
  }, [formValues, t]);

  const successCallback = useCallback(() => {
    displayToast({ message: t('passwordChangeSuccess'), duration: 3000 });
    setFormValues(initialFormValues);
  }, [displayToast, t]);

  const errorCallback = useCallback(
    (error: AxiosError<ErrorResponse>) => {
      const axiosError = error;
      if (axiosError.response) {
        const errorMsg =
          axiosError.response.data.errorMessage === 'InvalidOldCred'
            ? t('InvalidOldCred')
            : axiosError.response.data.errorMessage;

        setErrors((prevErrors) => ({
          ...prevErrors,
          ['oldPassword']: errorMsg
        }));
        // TODO: use the error.response.data to show validation errors in the UI.
      }
    },
    [t]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const hasError = validateAll();
      if (!hasError) {
        handleUpdatePassword(formValues, successCallback, errorCallback);
      }
    },
    [formValues, validateAll, successCallback, errorCallback, handleUpdatePassword]
  );

  return (
    <FormContainer
      onSubmit={handleSubmit}
      hasError={
        errors.oldPassword !== '' || errors.newPassword !== '' || errors.confirmedPassword !== ''
      }
    >
      <ChangePasswordInput
        label={`${t('currentPassword')}*`}
        placeholder={t('currentPassword')}
        name="oldPassword"
        type="password"
        value={formValues.oldPassword}
        onChange={handleChange}
        onBlur={() => handleBlur('oldPassword')}
        errorMsg={errors.oldPassword}
        size="md"
      />
      <ChangePasswordInput
        label={`${t('newPassword')}*`}
        placeholder={t('newPassword')}
        name="newPassword"
        type="password"
        value={formValues.newPassword}
        onChange={handleChange}
        onBlur={() => handleBlur('newPassword')}
        errorMsg={errors.newPassword}
        size="md"
      />
      <ChangePasswordInput
        label={`${t('confirmPassword')}*`}
        placeholder={t('confirmPassword')}
        name="confirmedPassword"
        type="password"
        value={formValues.confirmedPassword}
        onChange={handleChange}
        onBlur={() => handleBlur('confirmedPassword')}
        errorMsg={errors.confirmedPassword}
        size="md"
      />
      <ChangeButton size={'Large'} showIcon={false} type="submit" disabled={isLoading}>
        <ButtonLabel size="b2">
          {isLoading ? `${t('Processing')}...` : `${t('change')}`}
        </ButtonLabel>
      </ChangeButton>
    </FormContainer>
  );
};

export default ChangePasswordForm;
