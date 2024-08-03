import { useCallback, useState } from 'react';
import { EUROPEAN_COUNTRY_CODES, PreselectCurrencyResult } from './types';

export const useCurrencyPreselection = (): PreselectCurrencyResult => {
  const [preselectedCurrency, setPreselectedCurrency] = useState<string | null>(null);

  const handleCurrencyPreselection = useCallback(
    (countryCode?: string) => {
      if (!countryCode) {
        setPreselectedCurrency(null);
        return;
      }
      switch (countryCode) {
        case 'NZ':
          setPreselectedCurrency('NZD');
          break;
        case 'CA':
          setPreselectedCurrency('CAD');
          break;
        // case 'MX':
        //   setPreselectedCurrency('MXN');
        //   break;
        default:
          if (EUROPEAN_COUNTRY_CODES.includes(countryCode)) {
            setPreselectedCurrency(countryCode === 'NO' ? 'NOK' : 'EUR');
          } else {
            setPreselectedCurrency('USD');
          }
          break;
      }
    },
    [setPreselectedCurrency]
  );

  return { preselectedCurrency, handleCurrencyPreselection };
};
