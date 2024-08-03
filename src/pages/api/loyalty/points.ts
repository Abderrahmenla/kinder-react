import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ErrorResponse } from '../types';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from '../../../services/serverAxios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method === 'GET') {
    try {
      const response: AxiosResponse<ApiResponse> = await client.get(
        '/loyalty/points?PageNumber=1&PageSize=10'
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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
