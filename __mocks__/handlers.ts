import { rest } from 'msw';
import { seedDb } from './seed';

seedDb();

export const DOMAIN = 'http://localhost/api';

// Define request handlers and response resolvers here.
export const handlers = [
  rest.get(`${DOMAIN}/whois`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          countryCode: 'GH'
        }
      })
    );
  })
];
