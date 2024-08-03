import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import createAxiosInstance from '@/services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';
import { ErrorResponse, ValidationErrorResponse } from '../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const excludedUntil = req.body;
  try {
    await client.put('/player/time-out', excludedUntil);
    res.status(200).json({ message: 'Player time-out has been successfully set.' });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    const axiosError = error as AxiosError<ErrorResponse | ValidationErrorResponse>;

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
