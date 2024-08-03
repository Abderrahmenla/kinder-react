import Cookies from 'js-cookie';
import { setUniboCookies } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn()
  }
}));

describe('setUniboCookies function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set all Unibo cookies', () => {
    (Cookies.get as jest.Mock).mockImplementation((cookieName: string) => {
      switch (cookieName) {
        case 'NEXT_LOCALE':
          return 'en-CA';
        case 'registrationDate':
          return '2023-01-08T18:30:00.007+00:00';
        case 'playerId':
          return '123';
        default:
          return undefined;
      }
    });

    const externalId = 'ALE-456';
    setUniboCookies(externalId);

    expect(Cookies.set).toHaveBeenCalledTimes(4);

    expect(Cookies.set).toHaveBeenCalledWith('unibo_gameId', externalId, expect.any(Object));
    expect(Cookies.set).toHaveBeenCalledWith('unibo_language', 'en', expect.any(Object));
    expect(Cookies.set).toHaveBeenCalledWith(
      'unibo_registrationDate',
      '2023-01-08T18:30:00+00:00',
      expect.any(Object)
    );
    expect(Cookies.set).toHaveBeenCalledWith('unibo_userId', '123', expect.any(Object));
  });
});
