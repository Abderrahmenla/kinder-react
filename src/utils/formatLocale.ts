export const formatLocale = (locale: string): string => {
  if (!locale) return 'en'; // default value

  const parts = locale.split('-');

  if (parts.length !== 2) {
    // console.warn(`Unexpected locale format received: ${locale}`);
    return 'en'; // default value or you can throw an error
  }

  const [language, region] = parts;
  return `${language}-${region.toUpperCase()}`;
};
