import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = qs.stringify({
        username: process.env.UNIBO_API_USERNAME,
        password: process.env.UNIBO_API_PASSWORD
      });

      const config = {
        method: 'post',
        url: `${process.env.UNIBO_API_URL}/api/v1/auth/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      };

      const response = await axios.request(config);
      const token = response.data.access_token;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('unibo_token_leaderboard', String(token), {
          maxAge: 60 * 30,
          sameSite: 'lax',
          path: '/'
        })
      );

      res.status(200).json({ success: true });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        res.status(500).json({ error: error.response.data });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed' });
      }
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
