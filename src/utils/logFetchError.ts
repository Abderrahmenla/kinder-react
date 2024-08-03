import { ErrorResponse } from '@/hooks/useAuthenticationForm';
import { AxiosError } from 'axios';

export const logFetchError = (error: AxiosError<ErrorResponse>) => {
  if (error.response) {
    console.error('Response Error:', error.response);
  } else if (error.request) {
    console.error('Request Error:', error.request);
  } else {
    console.error('Error:', error.message);
  }
};
