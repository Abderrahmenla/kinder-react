import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { CustomError } from '@/utils/ErrorClass';
import { ApiResponse, ErrorResponse } from './types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const getFirstIp = (forwarded: string | string[]): string => {
    if (Array.isArray(forwarded)) {
      return forwarded[0];
    } else {
      return forwarded.split(/, /)[0];
    }
  };

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
      const forwarded = req.headers['x-forwarded-for'];
      const clientIp = forwarded ? getFirstIp(forwarded) : req.socket.remoteAddress;
      res.json({ clientIp });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export default handler;
