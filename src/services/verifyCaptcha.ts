import { CAPTCHA_SITE_KEY, CAPTCHA_VERIFICATION_URL } from '../constants';

type ReturnResult = {
  success: boolean;
  challenge_ts: Date;
  hostname: string;
  credit: boolean;
  'error-codes': string[];
};

export default async function verifyCaptcha(token: string): Promise<boolean> {
  const data = new URLSearchParams();
  data.append('response', token);
  data.append('secret', CAPTCHA_SITE_KEY);

  try {
    const response = await fetch(CAPTCHA_VERIFICATION_URL, {
      method: 'POST',
      body: data
    });

    const result: ReturnResult = await response.json();
    return result?.success;
  } catch (error) {
    return false;
  }
}
