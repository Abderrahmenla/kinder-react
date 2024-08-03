import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ContactPreferences,
  ValidationErrorResponse,
  ErrorResponse
} from './getContactPreferencesTypes';
import createAxiosInstance from 'src/services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';
import { AxiosResponse, AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactPreferences | ValidationErrorResponse | ErrorResponse>
) {
  const client = createAxiosInstance(req, res);
  if (req.method !== 'GET') {
    res.status(405).json({ errorMessage: 'Method not allowed' });
    return;
  }

  try {
    const response: AxiosResponse<ContactPreferences> = await client.get(
      '/player/contact-preferences'
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ errorMessage: error.message });
      return;
    }
    const axiosError = error as AxiosError<ErrorResponse | ValidationErrorResponse>;
    if (axiosError.response) {
      const status = axiosError.response.status;
      const isClientError = status >= 400 && status < 500;

      res.status(isClientError ? status : 500).json(axiosError.response.data);
      return;
    }

    res.status(500).json({ errorMessage: 'Server error' });
  }
}
