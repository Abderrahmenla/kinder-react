import Cookies from 'js-cookie';
import { CURRENCY_CODE as CurrencyCode } from 'src/constants/index';

const applySeparators = (currencyCode: CurrencyCode, amount: string): string => {
  if (![CurrencyCode.EUR, CurrencyCode.BRL].includes(currencyCode)) {
    return amount;
  }

  const [integerPart, decimalPart] = amount.split('.');
  const integerPartWithPeriods = integerPart.replace(/,/g, '.');
  return decimalPart ? `${integerPartWithPeriods},${decimalPart}` : integerPartWithPeriods;
};

export const applyDisplaySign = (formattedCurrency: string, displaySign: boolean): string => {
  if (!displaySign) {
    // Add a space before the first digit
    return formattedCurrency.replace(/(\d)/, ' $1');
  }

  // Get the sign
  const sign = formattedCurrency[0];

  // Mark where the + or - sign should appear with an 'x'
  // Add a space before the marker
  const markedCurrency = formattedCurrency.replace(/(\d)/, ' x$1');

  // Remove the sign from its original position
  const currencyWithoutSign = markedCurrency.slice(1);

  // Replace the 'x' marker with the sign
  return currencyWithoutSign.replace(/(\x)/, sign);
};

const formatCurrency = (
  amount: number | undefined,
  {
    isNegative = false,
    displaySign = false
  }: {
    isNegative?: boolean;
    displaySign?: boolean;
  } = {}
) => {
  const currencyCode: CurrencyCode =
    (Cookies.get('playerCurrencyCode') as CurrencyCode) || CurrencyCode.USD;

  const value = isNegative ? -Math.abs(amount || 0) : amount || 0;

  const intlFormat = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currencyCode,
    signDisplay: displaySign ? 'always' : 'auto'
  }).format(value);

  const currencyWithSeparators = applySeparators(currencyCode, intlFormat);
  const currencyWithSign = applyDisplaySign(currencyWithSeparators, displaySign);

  return currencyWithSign;
};

export default formatCurrency;
