import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { ErrorResponse, Category } from './types';
import createAxiosInstance from '../../services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

type ApiResponse = Category[];

// Function to clean up the product name
const cleanProductName = (name: string) => {
  const trimmedName = name.trim();
  return trimmedName
    .replace(/^ALEA\b|\bALEA$/gi, '')
    .replace(/^CASINO\b|\bCASINO$/gi, '')
    .trim();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  try {
    const response: AxiosResponse<ApiResponse> = await client.get('prod-game/lobby', {
      params: req.query
    });

    const cleanedData = response.data.map((category) => ({
      ...category,
      gameMains: category.gameMains.map((gameMain) => ({
        ...gameMain,
        productName: cleanProductName(gameMain.productName)
      }))
    }));
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=30'); // set caching header
    res.status(200).json(cleanedData);
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
