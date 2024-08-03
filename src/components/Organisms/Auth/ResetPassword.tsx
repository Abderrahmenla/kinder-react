import { openAuthPageState } from '@/components/state/openAuthPageState';
import { openPasswordModalState } from '@/components/state/openPasswordModalState';
import useCustomToast from '@/hooks/useCustomToast';
import { useLoader } from '@/hooks/useLoader';
import { ErrorResponse } from '@/pages/api/types';
import { isValidPassword } from '@/utils/validateFormValues';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import {
  Form,
  FormButton,
  FormGroup,
  Header,
  NewPassword,
  ResetPasswordForm
} from './ResetPassword.styles';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import { useTranslations } from '@/hooks/useTranslations';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const { t } = useTranslations();
  const { isLoading, toggleLoader } = useLoader('coin');
  const [formValue, setFormValue] = useState<FormValues>({
    password: '',
    confirmPassword: ''
  });
  const { displayToast, toastProps } = useCustomToast();
  const [errors, setErrors] = useState<FormValues>({
    password: '',
    confirmPassword: ''
  });
  const [secureKey, setSecureKey] = useState<string>('');
  const [, setIsResetPasswordModalOpen] = useRecoilState(openPasswordModalState);
  const setOpenAuth = useSetRecoilState(openAuthPageState);
  const router = useRouter();

  useEffect(() => {
    const getSecureKeyFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('token') || '';
    };
    const key = getSecureKeyFromURL();
    setSecureKey(key);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => ({
      ...prevValues,
      [name as keyof FormValues]: value
    }));
  };

  const handleBlur = (name: keyof FormValues) => {
    let error = '';
    switch (name) {
      case 'password':
        error = isValidPassword(formValue.password)
          ? ''
          : 'Password should be at least 6 characters.';
        break;
      case 'confirmPassword':
        error = formValue.confirmPassword !== formValue.password ? 'Passwords do not match.' : '';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const validateResetPassword = (values: FormValues) => {
    const errors: FormValues = {
      password: '',
      confirmPassword: ''
    };

    if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formErrors = validateResetPassword(formValue);
    setErrors(formErrors);
    const noErrors = Object.values(formErrors).every((error) => error === '');
    if (noErrors) {
      toggleLoader(true);
      try {
        const newPassword = formValue.password;
        const resp = {
          secureKey,
          newPassword
        };
        await apiClient.post('/api/player/reset', resp);
        displayToast({ message: 'Password reset successful!', duration: 3000 });
        toggleLoader(false);
      } catch (error) {
        displayToast({ message: 'error', duration: 3000 });
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          displayToast({ message: 'error', duration: 3000 });
          const serverError = axiosError.response.data;
          if (serverError && serverError.errorMessage) {
            setErrors((prevErrors) => ({ ...prevErrors, formValue: serverError.errorMessage }));
          }
        }
      } finally {
        toggleLoader(false);
        setIsResetPasswordModalOpen({ open: false });
        setOpenAuth({ open: false });
        router.push('/');
      }
    }
  };

  return (
    <ResetPasswordForm>
      <Header size="b2" type="Body">
        {t('Reset Password')}
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup hasError={errors.password !== ''}>
          <NewPassword
            placeholder="Min 6 characters"
            label="New password*"
            type="password"
            name="password"
            size="md"
            value={formValue.password}
            onBlur={() => handleBlur('password')}
            onChange={handleChange}
            errorMsg={errors.password}
          />
        </FormGroup>
        <FormGroup hasError={errors.confirmPassword !== ''}>
          <NewPassword
            placeholder="Min 6 characters"
            label="Enter new password again*"
            type="password"
            name="confirmPassword"
            size="md"
            value={formValue.confirmPassword}
            onBlur={() => handleBlur('password')}
            onChange={handleChange}
            errorMsg={errors.confirmPassword}
          />
        </FormGroup>

        <FormButton type="submit" variant="Primary" showIcon={false} disabled={isLoading}>
          {isLoading ? t('processing') : t('Submit')}
        </FormButton>
        {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
      </Form>
    </ResetPasswordForm>
  );
};

export default ResetPassword;
