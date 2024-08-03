import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { ErrorResponse, ValidationErrorResponse } from '../types';
import createAxiosInstance from '../../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

interface QueryParams {
  FromDate: string;
  ToDate: string;
  PageSize: number;
  PageNumber: number;
}

const defaultParams: QueryParams = {
  FromDate: '7/17/2002 8:12:19 PM +00:00',
  ToDate: '7/18/2023 8:12:19 PM +00:00',
  PageSize: 10,
  PageNumber: 1
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const queryParams: QueryParams = {
    ...defaultParams,
    ...req.query
  };

  try {
    const response = await client.get('/sportsbook/bets', {
      params: queryParams
    });
    res.status(200).json(response.data);
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
