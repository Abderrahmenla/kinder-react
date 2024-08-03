import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ErrorResponse } from './types';
import createAxiosInstance from '../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  try {
    const response: AxiosResponse<ApiResponse> = await client.get('/globalization/currencies/1');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=30'); // set caching header
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

export default handler;
