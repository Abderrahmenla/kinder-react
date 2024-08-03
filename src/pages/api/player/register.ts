import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosResponse, AxiosError } from 'axios';
import { CustomError } from '@/utils/ErrorClass';
import { PlayerData, ErrorResponse } from '../types';
import createAxiosInstance from '../../../services/serverAxios';
import { setCookie } from 'nookies';
import { LoginResponse, Credentials } from '../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method === 'POST') {
    const playerData: PlayerData = req.body;

    try {
      await client.post('/player', playerData);
      // Automatically login after successful registration
      const credentials: Credentials = {
        userName: playerData.player.eMail,
        password: playerData.player.password,
        portalId: playerData.portalId,
        includeNotifications: true,
        mobileClient: true,
        loginType: 'Email',
        isPersistent: true
      };
      const loginResponse: AxiosResponse<LoginResponse> = await client.post(
        '/player/login',
        credentials
      );
      const setCookieHeader = loginResponse.headers['set-cookie'];
      let accessToken: string | undefined;

      if (setCookieHeader) {
        const xAccessToken = setCookieHeader.find((cookie) => cookie.startsWith('X-Access-Token'));
        if (xAccessToken) {
          const [, token] = xAccessToken.split('=');
          accessToken = token.split(';')[0];

          // Set the extracted 'X-Access-Token' as a cookie named 'jwt'
          setCookie({ res }, 'jwt', accessToken, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
          });
        }
      }
      if (loginResponse.data.logonSession?.sessionToken && loginResponse.data.renewalToken) {
        setCookie({ res }, 'username', loginResponse.data.logonSession.username, {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'sessionToken', loginResponse.data.logonSession.sessionToken, {
          path: '/',
          httpOnly: false,
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'renewalToken', loginResponse.data.renewalToken, {
          path: '/',
          httpOnly: false,
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'playerId', String(loginResponse.data.logonSession.playerId), {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'logonTime', loginResponse.data.logonSession.logonTime, {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
      }

      res.status(200).json(loginResponse.data);
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
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
