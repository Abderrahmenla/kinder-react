import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { ErrorResponse, ValidationErrorResponse } from '../types';
import createAxiosInstance from '../../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

interface RequestBody {
  withManualTransactions: boolean;
  retrieveChildTransactions: boolean;
  fromDate: string;
  toDate: string;
  pageSize: number;
  pageNumber: number;
}
const defaultTransactionData: RequestBody = {
  withManualTransactions: true,
  retrieveChildTransactions: true,
  fromDate: '2022-07-17T20:12:18.5750875+00:00',
  toDate: '2023-07-18T20:12:18.5751238+00:00',
  pageSize: 11,
  pageNumber: 1
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const transactionData: RequestBody = {
    ...defaultTransactionData,
    ...req.body
  };
  try {
    const response = await client.post('/balance/transactions', transactionData);
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
