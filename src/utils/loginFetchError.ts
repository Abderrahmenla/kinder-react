import { AxiosError } from 'axios';
import { ErrorResponse } from '@/pages/api/types';

export const logFetchError = (error: AxiosError<ErrorResponse>) => {
  if (error.response) {
    console.error('Response Error:', error.response);
  } else if (error.request) {
    console.error('Request Error:', error.request);
  } else {
    console.error('Error:', error.message);
  }
};
