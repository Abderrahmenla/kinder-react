import Cookies from 'js-cookie';
import { CURRENCY_CODE as CurrencyCode } from 'src/constants/index';
import formatCurrency from '@/utils/formatUtils/formatCurrency';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn()
  }
}));

describe('formatCurrency function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should format result with default currency (USD)', () => {
    const result = formatCurrency(100);
    expect(result).toBe('$ 100.00');
  });

  it('should format result with the specified currency (CAD)', () => {
    (Cookies.get as jest.Mock).mockReturnValue(CurrencyCode.CAD);
    const result = formatCurrency(100);
    expect(result).toBe('CA$ 100.00');
  });

  it('should format result without sign when displaySign is false', () => {
    const result = formatCurrency(100, { displaySign: false });
    expect(result).toBe('$ 100.00');
  });

  it('should format result with sign when displaySign is true', () => {
    const result = formatCurrency(100, { displaySign: true });
    expect(result).toBe('$ +100.00');
  });

  it('should show negative result when displaySign and isNegative are true', () => {
    const result = formatCurrency(100, { displaySign: true, isNegative: true });
    expect(result).toBe('$ -100.00');
  });

  it('should show positive result when displaySign is true and isNegative is false', () => {
    const result = formatCurrency(100, { displaySign: true, isNegative: false });
    expect(result).toBe('$ +100.00');
  });

  test.each([
    [CurrencyCode.NZD, 'NZ$ 123,456.78'],
    [CurrencyCode.CAD, 'CA$ 123,456.78'],
    [CurrencyCode.EUR, '€ 123.456,78'],
    [CurrencyCode.USD, '$ 123,456.78'],
    [CurrencyCode.BRL, 'R$ 123.456,78']
    // [CurrencyCode.MXN, 'MX$ 123,456.78']
  ])(
    'should apply correct thousands and decimals separators %s',
    (currencyCode, expectedResponse) => {
      (Cookies.get as jest.Mock).mockReturnValue(currencyCode);
      const formattedCurrency = formatCurrency(123456.78);

      expect(formattedCurrency).toBe(expectedResponse);
    }
  );
});
