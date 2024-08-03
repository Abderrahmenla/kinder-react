import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { CustomError } from '@/utils/ErrorClass';
import { ApiResponse, ErrorResponse } from './types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get('https://whois.spinbet.com');
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
