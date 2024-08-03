import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  utcDateTime?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const API_KEY = 'IMD8T8BOWVAB';

  if (req.method === 'GET') {
    try {
      const ipResponse = await axios.get('https://whois.spinbet.com');
      const ipAddress = ipResponse?.data?.countryCode;

      const timeResponse = await fetch(
        `https://vip.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=country&country=${ipAddress}`
      );
      const data = await timeResponse.json();

      res.status(200).json({ utcDateTime: data?.formatted });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to fetch the time' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
