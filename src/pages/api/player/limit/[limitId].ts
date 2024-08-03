import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '@/pages/api/types';
import createAxiosInstance from '@/services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const client = createAxiosInstance(req, res);
  const { limitId } = req.query;

  try {
    await client.delete(`/player/limit/${limitId}`);
    return res.status(200).json({ message: 'Successfully removed account limit' });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const status = axiosError.response.status;
      const isClientError = status >= 400 && status < 500;

      return res.status(isClientError ? status : 500).json(axiosError.response.data);
    }

    return res.status(500).json({ error: 'Server error' });
  }
};
