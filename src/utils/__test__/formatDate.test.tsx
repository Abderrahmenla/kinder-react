import Cookies from 'js-cookie';
import { LOCALE as Locale } from 'src/constants/index';
import formatDate from '@/utils/formatUtils/formatDate';

const SAMPLE_DATE = '2024-02-19T13:23:10.705+00:00';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn()
  }
}));

describe('formatDate function', () => {
  beforeEach(() => {
    // Simulate a specific date and timezone for consistent testing
    jest.useFakeTimers().setSystemTime(new Date(SAMPLE_DATE));
  });

  afterEach(() => {
    // Reset mocks and restore real timers after each test
    jest.resetAllMocks().useRealTimers();
  });

  test('should return error when dateString is not valid', () => {
    const formattedDateTime = formatDate('NOT VALID');

    expect(formattedDateTime).toBe('Invalid date');
  });

  test('should return "Not available" when dateString is null', () => {
    const formattedDateTime = formatDate(null);

    expect(formattedDateTime).toBe('Not available');
  });

  test('should NOT include time by default', () => {
    (Cookies.get as jest.Mock).mockReturnValue(Locale.EN);
    const formattedDateTime = formatDate(SAMPLE_DATE);

    expect(formattedDateTime).not.toContain(':');
  });

  test.each([
    [Locale.EN_NZ, '19/02/2024', '01:23 PM'],
    [Locale.EN_CA, '2024-02-19', '13:23'],
    [Locale.FR_CA, '2024-02-19', '13:23'],
    // [Locale.PT_BR, '19/02/2024', '13:23'],
    [Locale.ES_MX, '19/02/2024', '13:23'],
    [Locale.ES_LA, '19/02/2024', '13:23'],
    [Locale.IS, '19/02/2024', '13:23'],
    [Locale.EN, '19.02.2024', '13:23']
  ])(
    'should correctly format date and time for %s locale',
    (locale, expectedDate, expectedTime) => {
      (Cookies.get as jest.Mock).mockReturnValue(locale);
      const formattedDateTime = formatDate(SAMPLE_DATE, { hasTime: true });

      expect(formattedDateTime).toBe(`${expectedDate}, ${expectedTime}`);
      expect(formattedDateTime).toContain(':');
    }
  );
});
