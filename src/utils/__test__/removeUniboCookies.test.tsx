import Cookies from 'js-cookie';
import { removeUniboCookies } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';

jest.mock('js-cookie');

describe('removeUniboCookies function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove all Unibo cookies when no cookie name is provided', () => {
    const removeSpy = jest.spyOn(Cookies, 'remove');

    removeUniboCookies();
    expect(removeSpy).toHaveBeenCalledWith('unibo_gameId');
    expect(removeSpy).toHaveBeenCalledWith('unibo_language');
    expect(removeSpy).toHaveBeenCalledWith('unibo_registrationDate');
    expect(removeSpy).toHaveBeenCalledWith('unibo_userId');
    expect(removeSpy).toHaveBeenCalledTimes(4);
  });

  it('should remove specified Unibo cookies when cookie names are provided', () => {
    const cookieNames = ['custom_cookie1', 'custom_cookie2'];
    removeUniboCookies(cookieNames);

    expect(Cookies.remove).toHaveBeenCalledWith('custom_cookie1');
    expect(Cookies.remove).toHaveBeenCalledWith('custom_cookie2');
    expect(Cookies.remove).toHaveBeenCalledTimes(2);
  });
});
