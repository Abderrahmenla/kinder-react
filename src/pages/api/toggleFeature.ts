import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { feature, status } = req.query;

  if (typeof feature !== 'string' || !feature) {
    return res.status(400).json({ error: 'Feature name is required.' });
  }

  // Set or update the feature status in a cookie
  const cookieValue = status === 'on' ? 'true' : 'false';

  // Calculate max age for 3 months in seconds
  const maxAge = 3 * 30 * 24 * 60 * 60;

  // Setting the cookie. For simplicity, the cookie name is the feature name.
  res.setHeader('Set-Cookie', `${feature}=${cookieValue}; Path=/; SameSite=Lax; Max-Age=${maxAge}`);

  res.status(200).json({ success: true, feature: { [feature]: cookieValue === 'true' } });
};
