import { Country, Currency } from '@/pages/api/types';

export const VALID_CURRENCIES = ['NZD', 'CAD', 'EUR', 'USD', 'NOK'];
export const DEFAULT_CURRENCY = VALID_CURRENCIES[0];
export const DEFAULT_COUNTRY = {
  name: 'New Zealand',
  code: 'NZ'
};

export const EUROPEAN_COUNTRY_CODES = [
  'AL',
  'AD',
  'AT',
  'BY',
  'BE',
  'BA',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'XK',
  'LV',
  'LI',
  'LT',
  'LU',
  'MT',
  'MD',
  'MC',
  'ME',
  'NL',
  'MK',
  'NO',
  'PL',
  'PT',
  'RO',
  'RU',
  'SM',
  'RS',
  'SK',
  'SI',
  'ES',
  'SE',
  'CH',
  'UA',
  'GB',
  'VA',
  'AD',
  'AM',
  'AT',
  'AZ',
  'BE',
  'BY',
  'BA',
  'BG',
  'CH',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FO',
  'FR',
  'GB',
  'GE',
  'GG',
  'GI',
  'GR',
  'HR',
  'HU',
  'IE',
  'IS',
  'IT',
  'JE',
  'LI',
  'LT',
  'LU',
  'LV',
  'MC',
  'MD',
  'ME',
  'MK',
  'MT',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'RS',
  'RU',
  'SE',
  'SI',
  'SJ',
  'SK',
  'SM',
  'UA',
  'UK',
  'VA'
];

export const EXCLUDED_COUNTRIES = [
  'AU', // Australia
  'BE', // Belgium
  'GR', // Greece
  'US', // United States of America
  'GB', // United Kingdom
  'ES', // Spain
  'FR', // France and its overseas territories (Guadeloupe, Martinique, French Guiana, Réunion, Mayotte, St. Martin, French Polynesia, Wallis and Futuna, New Caledonia)
  'SE', // Sweden
  'NL', // Netherlands
  'IL', // Israel
  'LT', // Lithuania
  'GI', // Gibraltar
  'JE', // Jersey
  'CW', // Curacao
  'AO', // Angola
  'MT', // Malta
  'AL', // Albania
  'IQ', // Iraq
  'JM', // Jamaica
  'UG', // Uganda
  'PK', // Pakistan
  'IR', // Islamic Republic of Iran
  'PA', // Panama
  'LB', // Lebanon
  'ZW', // Zimbabwe
  'MU', // Mauritius
  'CO', // Colombia
  'NI', // Nicaragua
  'YE', // Yemen
  'CF', // Central African Republic
  'CI', // Côte d'Ivoire
  'SD', // Sudan
  'LR', // Liberia
  'SY', // Syrian Arab Republic
  'KY', // Cayman Islands
  'SO', // Somalia
  'CD', // Congo
  'KP', // Korea
  'ER', // Eritrea
  'HT', // Haiti
  'SL', // Sierra Leone
  'ET', // Ethiopia
  'MM', // Myanmar
  'SS', // South Sudan
  'BF', // Burkina Faso
  'LY', // Libya
  'ML', // Mali
  'BB', // Barbados
  'RW', // Rwanda
  'RS', // Serbia
  'CZ', // Czech Republic
  'PL', // Poland
  'SY', // Syria
  'KP', // North Korea
  'IR', // Iran
  'CU', // Cuba
  'Unknown'
];

export type CountryAndCurrencyDataResult = {
  countries: Country[];
  currencies: Currency[];
  isCountryLoading: boolean;
  isCurrencyLoading: boolean;
};

export type CountryAndCurrencyArgs = {
  fetchCountries?: boolean;
  fetchCurrencies?: boolean;
};

export type PreselectCurrencyResult = {
  preselectedCurrency: string | null;
  handleCurrencyPreselection: (countryCode?: string) => void;
};

export type CountryLocationResult = {
  countryLocation?: Country;
  isCountryLocationLoading: boolean;
  handleSetCountryLocation: () => void;
};
