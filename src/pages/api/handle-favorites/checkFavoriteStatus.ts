import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { ErrorResponse, Game } from '@/pages/api/types';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from 'src/services/serverAxios';

type ApiResponse = {
  games: Game[];
  recordCount: number;
};

const cleanProductName = (name: string) => {
  const trimmedName = name.trim();
  return trimmedName
    .replace(/^ALEA\b|\bALEA$/gi, '')
    .replace(/^CASINO\b|\bCASINO$/gi, '')
    .trim();
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  try {
    const response: AxiosResponse<ApiResponse> = await client.get('/prod-game/favorites/1');

    const cleanedGames = response?.data?.games.map((game) => ({
      ...game,
      product: cleanProductName(game.product)
    }));

    response.data.games = cleanedGames;

    res.status(200).json(cleanedGames);
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
