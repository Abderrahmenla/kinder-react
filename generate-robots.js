/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');

const query = `
{
  robots {
    data {
      attributes {
        Content
      }
    }
  }
}`;

async function generateRobotsTxt() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_ADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch, status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    const robotsContent = jsonResponse.data.robots.data[0].attributes.Content;

    fs.writeFileSync('public/robots.txt', robotsContent);
  } catch (error) {
    console.error('Failed to generate robots.txt:', error);
  }
}

generateRobotsTxt();
