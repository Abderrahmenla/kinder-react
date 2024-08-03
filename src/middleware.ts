import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LOCALES } from './constants';

const PUBLIC_FILE = /\.(.*)$/;

const DEFAULT_LOCALE = 'en';

const BOT_USER_AGENTS = ['googlebot', 'bingbot'];

const isBot = (userAgent: string | null): boolean => {
  if (!userAgent) return false;
  const lowerCaseUserAgent = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((botAgent) => lowerCaseUserAgent.includes(botAgent));
};

function getPreferredLocale(req: NextRequest) {
  const localeFromCookie = req.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguageHeader = req.headers.get('accept-language');
  if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie.toLocaleLowerCase())) {
    return localeFromCookie.toLocaleLowerCase();
  } else if (acceptLanguageHeader) {
    const locales = acceptLanguageHeader.split(',').map((lang) => lang.split(';')[0].toLowerCase());
    for (const locale of locales) {
      if (SUPPORTED_LOCALES.includes(locale)) {
        return locale;
      }
    }
  }

  return DEFAULT_LOCALE;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocalePrefix = SUPPORTED_LOCALES.some((locale) => {
    return pathname.startsWith(`/${locale}/`);
  });

  const userAgent = req.headers.get('user-agent');

  if (isBot(userAgent)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('/404/') ||
    pathname.includes('/monitoring/') ||
    PUBLIC_FILE.test(pathname) ||
    hasLocalePrefix
  ) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(req);
  if (req.nextUrl.locale !== locale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url));
  }

  return NextResponse.next();
}
