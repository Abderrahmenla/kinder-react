import { styled } from '@mui/material/styles';
import { useState, ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import { apiClient } from 'src/services/clientAxios';
import { useTranslations } from '@/hooks/useTranslations';
import { Container, AccountDetails, AccountFormWrapper } from './SecuritySettingsStyle';
import FormGroupPass from '@/components/Molecules/Auth/FormGroupPass';
import { AddButton } from '@/components/Molecules/Settings/AddButton/AddButton';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import useCustomToast from '@/hooks/useCustomToast';

const ChangePasswordFormWrap = styled('div')({
  maxWidth: '500px'
});

interface ErrorResponse {
  errorMessage: string;
}
const validateFormValues = (values: FormValues, fieldName?: keyof FormValues): FormValues => {
  const newErrors: FormValues = {
    oldPassword: '',
    newPassword: ''
  };

  const keys = fieldName ? [fieldName] : Object.keys(values);

  keys.forEach((key) => {
    const value = values[key as keyof FormValues];
    let errorMsg = '';
    if (!value) {
      errorMsg = 'This field is required';
    } else if (value.length < 6) {
      errorMsg = 'Password must be at least 6 characters long';
    } else if (key === 'newPassword' && value === values.oldPassword) {
      errorMsg = 'New password must be different from the old one';
    }
    newErrors[key as keyof FormValues] = errorMsg;
  });

  return newErrors;
};

interface FormValues {
  oldPassword: string;
  newPassword: string;
}
const SecuritySettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslations();
  const { displayToast, toastProps } = useCustomToast();
  const [formValues, setFormValues] = useState<FormValues>({
    oldPassword: '',
    newPassword: ''
  });

  const [errors, setErrors] = useState<FormValues>({
    oldPassword: '',
    newPassword: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name as keyof FormValues]: value
    }));
  };

  const handleBlur = (name: keyof FormValues) => {
    const newErrors = validateFormValues(formValues, name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors
    }));
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const formErrors = validateFormValues(formValues);
    setErrors(formErrors);

    const noErrors = Object.values(formErrors).every((error) => error === '');

    if (noErrors) {
      setIsLoading(true);
      try {
        const { oldPassword, newPassword } = formValues;
        const passwordData = {
          oldPassword: oldPassword,
          newPassword: newPassword
        };
        await apiClient.post('/api/player/changePassword', passwordData);
        // handle successful password change (e.g., navigate to another page, show a success message, etc.)
        displayToast({ message: 'Password change successful!', duration: 3000 });
        setFormValues({ oldPassword: '', newPassword: '' });
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          const newErrors = { ...errors, oldPassword: axiosError.response.data.errorMessage };
          setErrors(newErrors);
          // TODO: use the error.response.data to show validation errors in the UI.
        }
        // handle errors
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <AccountDetails>
        <h2>{t('changePassword')}</h2>
        <AccountFormWrapper>
          <ChangePasswordFormWrap>
            <form>
              <FormGroupPass
                label={t('oldPassword')}
                important={true}
                placeholder={t('passworPlaceholder')}
                type="password"
                name="oldPassword"
                value={formValues.oldPassword}
                onBlur={() => handleBlur('oldPassword')}
                onChange={handleChange}
                errorMsg={errors.oldPassword}
              />
              <FormGroupPass
                label={t('newPassword')}
                important={true}
                placeholder={t('passworPlaceholder')}
                type="password"
                name="newPassword"
                value={formValues.newPassword}
                onBlur={() => handleBlur('newPassword')}
                onChange={handleChange}
                errorMsg={errors.newPassword}
              />
              <AddButton
                isloading={isLoading}
                text={isLoading ? t('processing') : t('save')}
                onClick={handleSubmit}
              />
            </form>
          </ChangePasswordFormWrap>
        </AccountFormWrapper>
      </AccountDetails>
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </Container>
  );
};

export default SecuritySettings;
