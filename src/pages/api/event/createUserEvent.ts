import { randomUUID } from 'crypto';
import Cookies from 'js-cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { EventGroup, EventLog } from '@/pages/api/event/eventTypes';
import createAxiosInstance from '@/services/serverAxios';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const client = createAxiosInstance(req, res);

    const { eventType, username, playerId, logonTime } = req.body;

    const event: EventLog = {
      MessageId: randomUUID(),
      EventGroup: EventGroup.User,
      EventType: eventType,
      Event: {
        Username: username ?? Cookies.get('username'),
        UserId: playerId ?? Cookies.get('playerId'),
        Timestamp: logonTime ?? Cookies.get('logonTime')
      }
    };

    try {
      await client.post('https://events-api.spinbet.com/store-user', event);
    } catch (error) {
      console.error('Error:', error);
    }

    // Immediately send a successful response with status 204 (No Content)
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
