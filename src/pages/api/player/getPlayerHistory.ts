import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ErrorResponse } from '../types';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from '../../../services/serverAxios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);

  const { PageNumber = 1, PageSize = 10, Descending = false } = req.query;

  try {
    const response: AxiosResponse<ApiResponse> = await client.get('/player/login/history', {
      params: {
        PageNumber,
        PageSize,
        Descending
      }
    });

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
