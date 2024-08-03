import { useState, ChangeEvent, useCallback } from 'react';

import { ActionContainer, Form, FormButton, FormGroup, UserName } from './ForgetPassword.styles';
import { validateInput } from '@/utils/validateFormValues';
import { useTranslations } from '@/hooks/useTranslations';
import { AxiosError } from 'axios';
import useAuthenticationForm, { ErrorResponse } from '@/hooks/useAuthenticationForm';
import { ForgetPasswordToastMessage } from './ForgetPasswordToastMessage';
interface FormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const { t } = useTranslations();
  const [formValue, setFormValue] = useState<FormValues>({ email: '' });
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<FormValues>({
    email: ''
  });

  const { isLoading, handleForgotPassword } = useAuthenticationForm();

  const handleBlur = (name: keyof FormValues) => {
    const error = validateInput(name, formValue[name]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => ({
      ...prevValues,
      [name as keyof FormValues]: value
    }));
  };

  const errorCallback = useCallback(
    (error: AxiosError<ErrorResponse>) => {
      const axiosError = error;

      if (axiosError.response) {
        const serverError = axiosError.response.data;
        if (serverError && serverError.errorMessage) {
          let errorMessage = t('genericErrorMessage');
          if (serverError.errorMessage) {
            errorMessage = serverError.errorMessage;
          }
          setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
        }
      }
    },
    [t]
  );

  const successCallback = useCallback(() => {
    setShowToast(true);
  }, []);

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const formInputs = {
        email: {
          value: formValue.email,
          error: errors.email
        }
      };

      let hasError = false;
      const error = validateInput('email', formValue.email);
      if (error.trim().length) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['email']: error
        }));
        hasError = true;
      }

      if (!hasError) {
        handleForgotPassword(formInputs, successCallback, errorCallback);
      }
    },
    [successCallback, errorCallback, handleForgotPassword, errors, formValue]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup hasError={errors.email !== ''}>
        <UserName
          label={`${t('email')}*`}
          size="md"
          id="email"
          data-testid="user-input"
          placeholder="Your@email.address"
          type="email"
          name="email"
          value={formValue.email}
          onBlur={() => handleBlur('email')}
          onChange={handleChange}
          errorMsg={errors.email}
        ></UserName>
      </FormGroup>
      <ActionContainer>
        <FormButton
          type="submit"
          variant="Primary"
          showIcon={false}
          disabled={isLoading}
          dataTestId="forgotpassword-submit"
        >
          {isLoading ? t('processing') : t('send')}
        </FormButton>
      </ActionContainer>
      {showToast && <ForgetPasswordToastMessage onClose={handleCloseToast} />}
    </Form>
  );
};

export default ForgetPassword;
