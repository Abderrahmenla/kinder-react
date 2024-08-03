import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import https from 'https';
import { ApiResponse, ErrorResponse } from '../types';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from '../../../services/serverAxios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);

  const { userId } = req.query;
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    const response: AxiosResponse<ApiResponse> = await client.get(
      `https://easter-api.spinbet.com?userId=${userId}`,
      {
        httpsAgent: agent
      }
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
