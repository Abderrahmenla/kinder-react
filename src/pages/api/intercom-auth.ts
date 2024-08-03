import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import cookie from 'cookie';

const intercomAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const userId = cookies['playerId'];
  const token = cookies['sessionToken'];
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'User is not Authenticated.' });
  }

  const intercomSecretKey = process.env.INTERCOM_SECRET_KEY;

  if (!intercomSecretKey) {
    return res.status(500).json({ error: 'Internal Server Error.' });
  }

  const userHash = crypto.createHmac('sha256', intercomSecretKey).update(userId).digest('hex');

  return res.status(200).json({ userHash, token, userId });
};

export default intercomAuth;
