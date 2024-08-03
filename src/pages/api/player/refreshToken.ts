import { AxiosResponse, AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { ErrorResponse, RefreshTokenRequest, RefreshTokenResponse } from '@/pages/api/types';
import createAxiosInstance from '@/services/serverAxios';
import { CustomError } from '@/utils/ErrorClass';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createAxiosInstance(req, res);
  if (req.method === 'POST') {
    const refreshTokenRequest: RefreshTokenRequest = {
      renewalToken: req.body.renewalToken,
      portalId: req.body.portalId
    };
    try {
      const response: AxiosResponse<RefreshTokenResponse> = await client.post(
        '/player/renew-session',
        refreshTokenRequest
      );
      const setCookieHeader = response.headers['set-cookie'];
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

      if (response.data.logonSession?.sessionToken) {
        setCookie({ res }, 'username', response.data.logonSession.username, {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'sessionToken', response.data.logonSession.sessionToken, {
          path: '/',
          httpOnly: false,
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'playerId', String(response.data.logonSession.playerId), {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
        setCookie({ res }, 'logonTime', response.data.logonSession.logonTime, {
          path: '/',
          expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
        });
      }

      res.status(200).json({ ...response.data, jwt: accessToken });
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
