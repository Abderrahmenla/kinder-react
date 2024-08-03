import Cookies from 'js-cookie';
import { areUniboCookiesSet } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe('areUniboCookiesSet function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when all required cookies are set', () => {
    (Cookies.get as jest.Mock).mockImplementation((cookieName: string) => {
      switch (cookieName) {
        case 'unibo_gameId':
          return '456';
        case 'unibo_language':
          return 'en';
        case 'unibo_registrationDate':
          return '2023-01-08T18:30:00+00:00';
        case 'unibo_userId':
          return '123';
        default:
          return undefined;
      }
    });

    const result = areUniboCookiesSet();

    expect(result).toBe(true);
  });

  it('should return false if any required cookie is not set', () => {
    (Cookies.get as jest.Mock).mockImplementation((cookieName: string) => {
      switch (cookieName) {
        //unibo_gameId is undefined
        case 'unibo_language':
          return 'en';
        case 'unibo_registrationDate':
          return '2023-01-08T18:30:00+00:00';
        case 'unibo_userId':
          return '123';
        default:
          return undefined;
      }
    });

    const result = areUniboCookiesSet();

    expect(result).toBe(false);
  });

  it('should return false if none of the unibo cookies are set', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);

    const result = areUniboCookiesSet();

    expect(result).toBe(false);
  });
});
