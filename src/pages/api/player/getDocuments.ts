import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from 'axios';
import { ErrorResponse, ValidationErrorResponse } from '../types';
import createAxiosInstance from '../../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';
interface Document {
  id: number;
  name: string;
  approvalStatus: 'Partial' | 'Approved' | 'Unapproved' | 'Declined';
  creationTime: string;
  expirationTime: string | null;
}

interface DocumentsResponse {
  documents: Document[];
  recordCount: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  try {
    const response = await client.get<DocumentsResponse>('/player/documents');
    const documentsData = response.data.documents;
    res.status(200).json(documentsData);
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
