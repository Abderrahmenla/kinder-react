import { useState, useEffect, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import {
  IFormErrors,
  IFormValues,
  SigninFormInput,
  initialFormErrors,
  initialFormValues,
  validateInput
} from '@/utils/validateFormValues';
import useCustomToast from '@/hooks/useCustomToast';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import { authState } from '@/components/state/isAuthenticated';
import { useSetRecoilState } from 'recoil';
import { useTrackingContext } from 'src/providers/TrackingProvider';
import { useTranslations } from '@/hooks/useTranslations';
import useAuthenticationForm from '@/hooks/useAuthenticationForm';
import {
  ActionContainer,
  ForgotPasswordLink,
  Form,
  FormButton,
  FormGroup,
  PasswordInput,
  UserName
} from './SignIn.style';

interface SigninProps {
  handleCloseAuth: () => void;
  handleForgetPassword: () => void;
}

interface ErrorResponse {
  error?: string;
  errorMessage?: string;
}

const Signin: React.FC<SigninProps> = ({ handleCloseAuth, handleForgetPassword }) => {
  const { t } = useTranslations();
  const [formValues, setFormValues] = useState<IFormValues>(initialFormValues);
  const [errors, setErrors] = useState<IFormErrors>(initialFormErrors);
  const { isLoading, handleSignIn } = useAuthenticationForm();
  const { displayToast, toastProps } = useCustomToast();
  const { handleTrackUserLogin } = useTrackingContext();
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    setFormValues(initialFormValues);
    setErrors(initialFormErrors);
  }, []);

  const handleBlur = (name: keyof IFormValues) => {
    const error = validateInput(name, formValues[name]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const successCallback = useCallback(
    (data: AxiosResponse) => {
      handleTrackUserLogin(data?.data?.logonSession?.playerId);
      setAuth({
        isAuthenticated: !!data.data.logonSession.sessionToken,
        username: data.data.logonSession.username,
        token: data.data.logonSession.sessionToken,
        playerId: data.data.logonSession.playerId
      });
      displayToast({ message: t('loginSuccessfulMessage'), duration: 3000 });
      setFormValues(initialFormValues);

      setTimeout(() => {
        handleCloseAuth();
      }, 3000);
    },
    [displayToast, setAuth, setFormValues, handleTrackUserLogin, handleCloseAuth, t]
  );

  const errorCallback = useCallback(
    (error: AxiosError<ErrorResponse>) => {
      const axiosError = error;
      if (axiosError.response) {
        const { data: errorResponse } = axiosError.response;
        let errorMessage = t('genericErrorMessage');

        if (errorResponse.error) {
          errorMessage = errorResponse.error;
        } else if (errorResponse.errorMessage) {
          switch (errorResponse.errorMessage) {
            case 'InvalidCredentials':
              errorMessage = t('invalidCredentials');
              break;
            case 'PlayerAccountError':
              errorMessage = t('playerAccountError');
              break;
            case 'PlayerTimedOut':
              errorMessage = t('playerTimedOut');
              break;
            default:
              errorMessage = errorResponse.errorMessage;
              break;
          }
        }

        setErrors((prevErrors) => ({
          ...prevErrors,
          usernameOrEmail: errorMessage
        }));
      }
    },
    [t, setErrors]
  );

  const validatedInput = useCallback(
    (formInput: SigninFormInput) => {
      let hasError = false;
      for (const key in formInput) {
        const error = validateInput(key, formInput[key as keyof SigninFormInput]);
        if (error.trim().length) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: error
          }));
          hasError = true;
        } else if (
          errors[key as keyof SigninFormInput] &&
          errors[key as keyof SigninFormInput] !== t('invalidCredentials')
        ) {
          hasError = true;
        }
      }
      return hasError;
    },
    [errors, t]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const formInput = {
        usernameOrEmail: formValues.usernameOrEmail,
        password: formValues.password
      };
      const hasError = validatedInput(formInput);

      if (!hasError) {
        handleSignIn(formInput, successCallback, errorCallback);
      }
    },
    [formValues, handleSignIn, successCallback, errorCallback, validatedInput]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup hasError={errors.usernameOrEmail !== ''}>
        <UserName
          label={`${t('username')} or ${t('email')}*`}
          value={formValues.usernameOrEmail}
          name={'usernameOrEmail'}
          size="md"
          placeholder="e.g. John Doe"
          id="Username"
          data-testid="user-input"
          type="text"
          onBlur={() => handleBlur('usernameOrEmail')}
          onChange={handleChange}
          errorMsg={errors.usernameOrEmail}
        ></UserName>
      </FormGroup>

      <FormGroup hasError={errors.password !== ''}>
        <PasswordInput
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
        ></PasswordInput>
      </FormGroup>

      <ActionContainer>
        <FormButton type="submit" variant="Primary" showIcon={false} disabled={isLoading}>
          {isLoading ? t('processing') : t('signIn')}
        </FormButton>
        <ForgotPasswordLink onClick={handleForgetPassword}>
          {t('forgotPassword')}?
        </ForgotPasswordLink>
      </ActionContainer>
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </Form>
  );
};

export default Signin;
