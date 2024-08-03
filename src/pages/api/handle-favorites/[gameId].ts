import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/pages/api/types';
import createAxiosInstance from '../../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method === 'DELETE') {
    const { gameId } = req.query;
    try {
      await client.delete(`/prod-game/favorite/${gameId}`);
      res.status(200).json({ message: 'Game removed from favorites successfully' });
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
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
