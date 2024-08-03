import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../types';
import createAxiosInstance from '../../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

interface DataItem {
  id: number;
  limitType: string;
  limitStatus: string;
  time: string;
  amountValue: number;
  amountLeft: number;
  locked: boolean;
  reason: string;
  dateCreated: string;
  dateActivated: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  try {
    const response = await client.get<DataItem[]>('/player/limits');
    let limitData = response.data; // Use the data from the response

    // Check for query parameters
    const limitType = req.query.limitType as string | undefined;

    if (limitType) {
      // Filter the limitData based on limitType
      limitData = limitData.filter((data) => data.limitType === limitType);
    }

    res.status(200).json(limitData);
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
