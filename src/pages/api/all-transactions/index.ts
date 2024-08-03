import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'prod'
    ? process.env.PAYMENTIQ_TEST_URL
    : process.env.PAYMENTIQ_PROD_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} is not allowed.` });
  }

  const { playerId, sessionToken } = cookie.parse(req.headers.cookie || '');

  if (!playerId || typeof playerId !== 'string' || !sessionToken) {
    return res.status(400).json({ error: 'User is not authenticated.' });
  }

  const baseUrl = getBaseUrl();

  try {
    const response = await axios.get(
      `${baseUrl}/${process.env.NEXT_PUBLIC_MERCHANT_ID}/${playerId}?sessionId=${sessionToken}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transactions. Please try again later.' });
  }
}
