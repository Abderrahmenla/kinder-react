import { convertLocaleToISO6391 } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';

describe('convertLocaleToISO6391 function', () => {
  it('should return "en" for an unsupported locale', () => {
    const unsupportedLocale = 'es-ES';
    const result = convertLocaleToISO6391(unsupportedLocale);

    expect(result).toEqual('en');
  });

  it('should return the first two characters of a supported locale', () => {
    const supportedLocale = 'fr-CA';
    const result = convertLocaleToISO6391(supportedLocale);

    expect(result).toEqual('fr');
  });

  it('should handle case when the provided locale is already in ISO 639-1 format', () => {
    const iso6391Locale = 'en';
    const result = convertLocaleToISO6391(iso6391Locale);

    expect(result).toEqual('en');
  });
});
