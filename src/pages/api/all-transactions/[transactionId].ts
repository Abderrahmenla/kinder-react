import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'prod'
    ? process.env.PAYMENTIQ_TEST_URL
    : process.env.PAYMENTIQ_PROD_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: `Method ${req.method} is not allowed.` });
  }

  const { playerId, sessionToken } = cookie.parse(req.headers.cookie || '');

  if (!playerId || typeof playerId !== 'string' || !sessionToken) {
    return res.status(400).json({ error: 'User is not authenticated or missing session token.' });
  }

  const { transactionId } = req.query;

  if (!transactionId) {
    return res.status(400).json({ error: 'Missing transactionId in the request.' });
  }

  const baseUrl = getBaseUrl();

  try {
    await axios.delete(
      `${baseUrl}/${process.env.NEXT_PUBLIC_MERCHANT_ID}/${playerId}/${transactionId}?sessionId=${sessionToken}`
    );
    res.status(200).json({ message: 'Transaction canceled successfully.' });
  } catch (error: any) {
    console.error(error);
    res
      .status(error.response?.status || 500)
      .json({ error: 'Failed to cancel transaction. Please try again later.' });
  }
}
