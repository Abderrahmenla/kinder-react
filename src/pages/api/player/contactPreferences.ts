import { NextApiRequest, NextApiResponse } from 'next';
import { ContactPreferences, ErrorResponse } from './getContactPreferencesTypes';
import createAxiosInstance from 'src/services/serverAxios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactPreferences | ErrorResponse>
) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  try {
    const client = createAxiosInstance(req, res);
    const response = await client.put<ContactPreferences>('/player/contact-preferences', req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: 'Server error' });
  }
}
