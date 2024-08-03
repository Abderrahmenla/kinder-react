import { DEFAULT_COUNTRY, EXCLUDED_COUNTRIES, CountryLocationResult } from './types';
import { useQuery } from '../useQuery';
import { Country, LocationInfo } from '@/pages/api/types';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { countriesAndTelCode } from '@/utils/countriesAndTelCode';

const ip_check_api = process.env.NEXT_PUBLIC_IP_CHECK_ADDRESS || 'https://whois.spinbet.com';

const locationFetcher = async () => axios.get(ip_check_api);

export const useCountryLocation = (): CountryLocationResult => {
  const { data, isLoading } = useQuery<LocationInfo>({
    fetcher: locationFetcher
  });
  const [preselectedCountry, setPreselectedCountry] = useState<Country>();

  const handlePreselectCountry = useCallback(() => {
    if (!data?.countryCode) {
      return setPreselectedCountry?.({
        name: DEFAULT_COUNTRY?.name,
        code: DEFAULT_COUNTRY?.code
      });
    }
    const isCountrySupported = !EXCLUDED_COUNTRIES.includes(data?.countryCode);
    if (isCountrySupported) {
      const country =
        countriesAndTelCode?.find((c) => c.code === data?.countryCode) ?? DEFAULT_COUNTRY;
      const isFromBrazil = country.code === 'BR';

      return setPreselectedCountry?.({
        name: isFromBrazil ? 'Argentina' : country?.name,
        code: isFromBrazil ? 'AR' : country?.code
      });
    } else {
      return setPreselectedCountry?.({
        name: DEFAULT_COUNTRY?.name,
        code: DEFAULT_COUNTRY?.code
      });
    }
  }, [data?.countryCode]);

  return {
    countryLocation: preselectedCountry,
    isCountryLocationLoading: isLoading,
    handleSetCountryLocation: handlePreselectCountry
  };
};
