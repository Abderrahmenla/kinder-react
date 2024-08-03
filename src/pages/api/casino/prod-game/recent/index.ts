import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from 'src/services/serverAxios';
import { ApiResponse, ErrorResponse } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  const { portalId, count } = req.query;
  try {
    const response: AxiosResponse<ApiResponse> = await client.get(
      `/prod-game/recent?Count=${count}&PortalId=${portalId}`
    );
    console.log('this is the result ', response.data);
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=30'); // set caching header
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
