import { apiClient } from 'src/services/clientAxios';
import {
  CountryAndCurrencyArgs,
  CountryAndCurrencyDataResult,
  EXCLUDED_COUNTRIES,
  VALID_CURRENCIES
} from './types';
import { useQuery } from '../useQuery';
import { Country, Currency } from '@/pages/api/types';
import { useMemo } from 'react';

const countriesFetcher = async () => apiClient.get('/api/countries');
const currencyFetcher = async () => apiClient.get('/api/currencies');

export const useCountryCurrencyData = ({
  fetchCountries = true,
  fetchCurrencies = true
}: CountryAndCurrencyArgs): CountryAndCurrencyDataResult => {
  const { data: countriesData, isLoading: isCountriesLoading } = useQuery<Country[]>({
    fetcher: fetchCountries ? countriesFetcher : null
  });

  const { data: currencyData, isLoading: isCurrencyLoading } = useQuery<Currency[]>({
    fetcher: fetchCurrencies ? currencyFetcher : null
  });

  const supportedCountries = useMemo(() => {
    return countriesData?.filter((item) => !EXCLUDED_COUNTRIES.includes(item.code));
  }, [countriesData]);

  const supportedCurrencies = useMemo(() => {
    return currencyData?.filter((item) => VALID_CURRENCIES.includes(item.code));
  }, [currencyData]);

  return {
    countries: supportedCountries ?? [],
    currencies: supportedCurrencies ?? [],
    isCountryLoading: isCountriesLoading,
    isCurrencyLoading: isCurrencyLoading
  };
};
