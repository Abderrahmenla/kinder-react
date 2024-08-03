import { AxiosError, AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import createAxiosInstance from 'src/services/serverAxios';
import { ApiResponse } from '../types';
import { CustomError } from '@/utils/ErrorClass';
import { ErrorResponse } from './getBalanceTypes';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);

  try {
    const response: AxiosResponse<ApiResponse> = await client.post(
      '/player/password/forgot',
      req.body
    );

    res.status(200).json(response.data);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const status = axiosError.response.status;
      const isClientError = status >= 400 && status < 500;

      res.status(isClientError ? status : 500).json(axiosError.response.data);
      return;
    }

    res.status(500).json({ error: 'Server error' });
  }
};
