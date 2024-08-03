interface CountryAndCurrency {
  code: string;
  name: string;
  countryCode: string;
  symbol: string;
}

export const countriesAndCurrencies: CountryAndCurrency[] = [
  {
    code: 'EUR',
    name: 'Euro',
    countryCode: 'EU',
    symbol: '€'
  },
  {
    code: 'USD',
    name: 'US Dollar',
    countryCode: 'US',
    symbol: '$'
  },
  {
    code: 'BRL',
    name: 'Brazil Real',
    countryCode: 'BR',
    symbol: 'R$'
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    countryCode: 'CA',
    symbol: 'C$'
  },
  {
    code: 'CZK',
    name: 'Chech Koruna',
    countryCode: 'CZ',
    symbol: 'Kč'
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    countryCode: 'IN',
    symbol: '₹'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    countryCode: 'JP',
    symbol: '¥'
  },
  {
    code: 'KZT',
    name: 'Kazakhstani Tenge',
    countryCode: 'KZ',
    symbol: '₸'
  },
  {
    code: 'NOK',
    name: 'Norwegian Krone',
    countryCode: 'NO',
    symbol: 'kr'
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    countryCode: 'NZ',
    symbol: '$'
  },
  {
    code: 'PLN',
    name: 'Polish Zloty',
    countryCode: 'PL',
    symbol: 'zł'
  },
  {
    code: 'RUB',
    name: 'Russian Ruble',
    countryCode: 'RU',
    symbol: '₽'
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    countryCode: 'ZA',
    symbol: 'R'
  }
];
