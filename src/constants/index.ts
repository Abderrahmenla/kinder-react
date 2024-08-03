import { assets } from '@/config/assets';
import { ScreenIds, getEnvScreenIds } from '@/utils/getEnvScreenIds';

export const INTEGRATION = process.env.NEXT_PUBLIC_ALTENAR_INTEGRATION ?? '';
export const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY ?? '';
export const CAPTCHA_VERIFICATION_URL = process.env.NEXT_PUBLIC_CAPTCHA_URL ?? '';
export const ALTENAR_SCRIPT = process.env.NEXT_PUBLIC_ALTENAR_SCRIPT ?? '';
export const CULTURE = '';
export const HELP_CENTER_URL = 'https://help.spinbet.com/en/';
export const HORSE_RACING_CACHE = '@spinbet-horse-racing';
export const EVENT_CACHE = '@spinbet-sports-events';
export const GAME_IMAGE_BASE_URL = 'https://images.spinbet.com/storage/games';
export const DEFAULT_PAGE_SIZE = '1000';
export const ORGANIC_AFFILIATE_ID = '463';
export const ORGANIC_CAMPAIGN_ID = '4';
export const ORGANIC_TOKEN = '_ynRwoQZj00uyfWNiIcAwmNd7ZgqdRLk';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/spinbetofficial',
  instagram: 'https://www.instagram.com/spinbet.casino/',
  telegram: 'https://t.me/+TkLaKkPAd5NjN2Fk',
  twitter: 'https://twitter.com/spinbet_casino'
};

export enum LOCALE {
  EN_NZ = 'en-NZ',
  EN_CA = 'en-CA',
  FR_CA = 'fr-CA',
  // PT_BR = 'pt-BR', // Portuguese (Brazil)
  ES_MX = 'es-MX',
  ES_LA = 'es-419', // Latin America
  IS = 'is', // Icelandic
  EN = 'en'
}

export enum CURRENCY_CODE {
  NZD = 'NZD',
  CAD = 'CAD',
  EUR = 'EUR',
  USD = 'USD',
  BRL = 'BRL'
  // MXN = 'MXN'
}

export const SUPPORTED_LOCALES = ['en', 'en-nz', 'en-ca', 'fr-ca'];
export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0];
export enum CATEGORY_NAMES {
  UFC = 'ufc'
}

export const CATEGORIES = {
  ufc: 674
};

export const ENV_SCREEN_CATEGORY_IDS = new Map<string, ScreenIds | null>([
  [
    'All Games',
    getEnvScreenIds({
      dev: { mobileId: 2, desktopId: 1 },
      stage: { mobileId: 2, desktopId: 1 },
      prod: { mobileId: 2, desktopId: 1 }
    })
  ],
  [
    'Recommended Games',
    getEnvScreenIds({
      //!NOTE: Recommended Games category is Featured in prod
      dev: { mobileId: 16, desktopId: 15 },
      stage: { mobileId: 1000002, desktopId: 1000001 },
      prod: { mobileId: 16, desktopId: 15 }
    })
  ],
  [
    'Christmas Games',
    getEnvScreenIds({
      //!NOTE: Christmas Games category IDs do not exist in stage
      dev: { mobileId: 1000440, desktopId: 13 },
      prod: { mobileId: 1000006, desktopId: 1000005 }
    })
  ],
  [
    'Tournament',
    getEnvScreenIds({
      //!NOTE: Tournament category IDs do not exist in dev and stage
      prod: { mobileId: 1000008, desktopId: 1000007 }
    })
  ],
  [
    'New Games',
    getEnvScreenIds({
      dev: { mobileId: 6, desktopId: 5 },
      stage: { mobileId: 6, desktopId: 5 },
      prod: { mobileId: 6, desktopId: 5 }
    })
  ],
  [
    'Table Games',
    getEnvScreenIds({
      dev: { mobileId: 10, desktopId: 9 },
      stage: { mobileId: 10, desktopId: 9 },
      prod: { mobileId: 10, desktopId: 9 }
    })
  ],
  [
    'Game Show',
    getEnvScreenIds({
      dev: { mobileId: 12, desktopId: 11 },
      stage: { mobileId: 12, desktopId: 11 },
      prod: { mobileId: 12, desktopId: 11 }
    })
  ]
]);

export const STATUSES = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  FAILED: 'failed'
} as const;

// This contants is reserved for scripts that should only be loaded in a specific page.
export const DYNAMIC_SCRIPTS = [
  {
    name: 'alternar_script',
    src: ALTENAR_SCRIPT,
    defer: true,
    async: false,
    page: 'sports',
    type: 'text/javascript'
  }
];

export const FEATURE_FLAG = {
  christmasGiveaway: {
    value: false
  }
};

export const ALTENAR_CULTURE = {
  en: 'en-GB',
  'en-nz': 'en-AU',
  'en-ca': 'en-CA',
  'fr-ca': 'fr-FR',
  es: 'es-ES',
  'es-419': 'es-LA',
  'es-mx': 'es-MX'
  // 'pt-br': 'pt-BR'
};

export const PRECONNECT_URLS = [
  {
    rel: 'preconnect',
    url: 'https://cms.spinbet.com'
  },
  {
    rel: 'preconnect',
    url: 'https://sd-images.spinbet.com'
  },
  {
    rel: 'preconnect',
    url: 'https://api.coingecko.com'
  },
  {
    rel: 'preconnect',
    url: 'https://spinbet-strapi.s3.ap-southeast-2.amazonaws.com'
  },
  {
    rel: 'preconnect',
    url: 'https://secure.adnxs.com'
  },
  {
    rel: 'dns-prefetch',
    url: 'https://497577c7-1aa0-4463-9ce8-344b5be12f2.snippet.antillephone.com'
  },
  {
    rel: 'dns-prefetch',
    url: 'https://widget.intercom.io'
  },
  {
    rel: 'dns-prefetch',
    url: 'https://stats.g.doubleclick.net'
  },
  {
    rel: 'dns-prefetch',
    url: 'https://analytics.google.com'
  }
];

export const SUPPORTED_CRYPTOS = ['ETH', 'LTC', 'USDT', 'BTC', 'TRX', 'BNB', 'XRP', 'SOL'];

export const CASHIER_URL = 'wallet';
export const VIP_URL = 'vip';
export const REWARDS_URL = 'rewards';
export const LOGIN_URL = 'login';
export const REGISTRATION_URL = 'signup';

export const CAMPAIGN_ID = 51;

export type StatusKeys = keyof typeof STATUSES;
export type StatusValues = (typeof STATUSES)[StatusKeys];

export const DEFAULT_FLAG = `${assets}/images/locale/global-int.svg`;
