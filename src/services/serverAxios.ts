import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

export default function createAxiosInstance(
  req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: NextApiResponse
): AxiosInstance {
  const client: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY }
  });

  client.interceptors.request.use(
    (config) => {
      if (config.url && config.url.includes('https://christmas-api.spinbet.com')) {
        config.headers['X-API-Key'] = 'DFD3AF6B849EA7E3';
      } else if (config.url && config.url.includes('https://easter-api.spinbet.com')) {
        config.headers['X-API-Key'] = 'DSD3A9EB849FA7C8';
      }
      const cookies = parseCookies({ req });
      const token: string | undefined = cookies['jwt'];
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
}
