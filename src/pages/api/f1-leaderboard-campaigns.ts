import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const authToken = req.headers.authorization;
      const response = await axios.get(
        `${process.env.UNIBO_API_URL}/api/v1/campaigns/details?language=en&tenant_name=${process.env.UNIBO_API_TENANT}`,
        {
          headers: { Authorization: authToken }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch campaign data' });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
