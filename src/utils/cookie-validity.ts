import Cookies from 'js-cookie';

export const isCookieValid = (): boolean => {
  return !!Cookies.get('unibo_token_leaderboard');
};

export const getToken = (): string | undefined => {
  return Cookies.get('unibo_token_leaderboard');
};
