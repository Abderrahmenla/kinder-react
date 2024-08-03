import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ErrorResponse } from '../../types';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from '../../../../services/serverAxios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = createAxiosInstance(req, res);
  if (req.method !== 'GET') {
    res.status(405).json({ errorMessage: 'Method not allowed' });
    return;
  }

  try {
    const response: AxiosResponse<ApiResponse> = await client.get('/bvnk/crypto-currencies');
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
}
