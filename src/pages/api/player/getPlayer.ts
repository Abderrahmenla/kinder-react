import { AxiosResponse, AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, parseCookies } from 'nookies';
import { ErrorResponse, GetPlayerResponse } from '../types';
import { CustomError } from '@/utils/ErrorClass';
import createAxiosInstance from '../../../services/serverAxios';

const getPlayerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  try {
    const response: AxiosResponse<GetPlayerResponse> = await client.get('/player');

    if (response.data?.player && response.data?.player?.registrationDate) {
      const cookies = parseCookies(res);

      if (!Object.hasOwn(cookies, 'registrationDate')) {
        setCookie({ res }, 'registrationDate', response.data.player.registrationDate, {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
      }
    }

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

export default getPlayerHandler;
