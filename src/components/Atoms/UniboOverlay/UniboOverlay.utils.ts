import Cookies from 'js-cookie';
import {
  UNIBO_DEFAULT_ISO6391,
  UNIBO_SCRIPT_ID,
  UNIBO_SCRIPT_URL,
  UNIBO_SUPPORTED_LOCALES
} from '@/components/Atoms/UniboOverlay/UniboOverlay.constants';

export const createUniboScript = () => {
  const uniboScript = document.getElementById(UNIBO_SCRIPT_ID);
  if (uniboScript === null) {
    const script = document.createElement('script');
    script.src = UNIBO_SCRIPT_URL;
    script.id = UNIBO_SCRIPT_ID;
    script.async = false;
    script.defer = false;
    document.body.appendChild(script);

    /* eslint-disable no-console */
    console.info('Unibo script is loaded');
  }
};

export const removeUniboScript = () => {
  const uniboScript = document.getElementById(UNIBO_SCRIPT_ID);
  if (uniboScript !== null) {
    uniboScript.remove();
  }
};

export const areUniboCookiesSet = (): boolean => {
  const uniboGameId = Cookies.get('unibo_gameId');
  const uniboLanguage = Cookies.get('unibo_language');
  const uniboRegistrationDate = Cookies.get('unibo_registrationDate');
  const uniboUserId = Cookies.get('unibo_userId');

  return !!uniboGameId && !!uniboLanguage && !!uniboRegistrationDate && !!uniboUserId;
};

export const setUniboCookies = (externalId: string | undefined) => {
  const options = { expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000) };

  const language = Cookies.get('NEXT_LOCALE') || 'en-NZ';
  const registrationDate = Cookies.get('registrationDate');
  const userId = Cookies.get('playerId');

  if (externalId && Cookies.get('unibo_gameId') !== externalId) {
    Cookies.set('unibo_gameId', externalId, options);
  }

  if (!!language && Cookies.get('unibo_language') === undefined) {
    Cookies.set('unibo_language', convertLocaleToISO6391(language), options);
  }

  if (!!registrationDate && Cookies.get('unibo_registrationDate') === undefined) {
    Cookies.set('unibo_registrationDate', removeAllDecimalsFromDate(registrationDate), options);
  }

  if (!!userId && Cookies.get('unibo_userId') === undefined) {
    Cookies.set('unibo_userId', userId, options);
  }

  /* eslint-disable no-console */
  console.info('Unibo cookies are set');
};

export const removeUniboCookies = (cookieNames?: string[]) => {
  if (!Array.isArray(cookieNames) || cookieNames.length === 0) {
    Cookies.remove('unibo_gameId');
    Cookies.remove('unibo_language');
    Cookies.remove('unibo_registrationDate');
    Cookies.remove('unibo_userId');
  } else {
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  }
};

function resetUniboOverlay() {
  if (window.UniboOverlay) {
    window.UniboOverlay = undefined;
  }
}

export const handleCleanUpUnibo = (cookiesToClear?: string[]) => {
  removeUniboCookies(cookiesToClear);
  removeUniboScript();
  resetUniboOverlay();

  /* eslint-disable no-console */
  console.info(
    `Removed Unibo ${cookiesToClear ? cookiesToClear.join(', ') : 'cookies'}, script, and instance`
  );
};

export const convertLocaleToISO6391 = (language: string) => {
  const isSupported = UNIBO_SUPPORTED_LOCALES.includes(language);

  if (!isSupported) {
    console.error(
      `Error: Unsupported locale: ${language}. Defaulting to '${UNIBO_DEFAULT_ISO6391}'.`
    );
    return UNIBO_DEFAULT_ISO6391;
  }

  return language.slice(0, 2).toLowerCase();
};

export const removeAllDecimalsFromDate = (registrationDate: string) => {
  const dateWithoutDecimals = registrationDate.replace(/\.\d+/g, '');
  return dateWithoutDecimals;
};
