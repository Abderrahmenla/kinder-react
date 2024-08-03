import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import client from 'src/graphql/client';
import { GET_ALL_TRANSLATIONS } from 'src/graphql/queries/translations';
import { localeState } from '@/components/state/localeState';
import { useRouter } from 'next/router';

type TranslationItem = {
  id: string;
  attributes: {
    key: string;
    translationValue: string;
  };
};
type TranslationsInput = {
  translations: {
    data: TranslationItem[];
  };
};

type TranslationsOutput = {
  [key: string]: string;
};

const convertTranslationsFormat = (input: TranslationsInput): TranslationsOutput => {
  const translationsData = input.translations.data;

  return translationsData.reduce((acc: TranslationsOutput, item) => {
    acc[item.attributes.key] = item.attributes.translationValue;
    return acc;
  }, {});
};

const titleToCamelCase = (title: string): string => {
  const words = title.split(' ');
  if (words.length === 1) {
    return words[0].toLowerCase();
  }
  return [
    words[0].toLowerCase(),
    ...words.slice(1).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  ].join('');
};

const isCamelCase = (str: string) => {
  const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/;
  return camelCasePattern.test(str);
};
const formatLocale = (locale: string): string => {
  if (locale.includes('-')) {
    return locale
      .split('-')
      .map((part, index) => (index === 0 ? part.toLowerCase() : part.toUpperCase()))
      .join('-');
  }
  return locale;
};

export const useTranslations = () => {
  const router = useRouter();
  const [locale, setLocale] = useRecoilState(localeState);
  const [translations, setTranslations] = useState<TranslationsOutput>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const currentLocale = formatLocale(router.locale || 'en');
    if (currentLocale !== locale) {
      setLocale(currentLocale);
    }
  }, [router.locale, locale]);

  useEffect(() => {
    setLoading(true);
    // Define an inner async function
    const fetchTranslations = async () => {
      try {
        const result = await client.query({
          query: GET_ALL_TRANSLATIONS,
          variables: { locale }
        });

        if (result.data && result.data.translations) {
          const transformedData = convertTranslationsFormat(result.data);
          setTranslations(transformedData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    // Call the inner async function
    fetchTranslations();
  }, [locale]);

  const t = (key: string) => {
    if (loading || error) {
      return key;
    }
    if (isCamelCase(key)) {
      return translations[key] || key;
    }
    return translations[titleToCamelCase(key)] || key;
  };

  return {
    t,
    loading,
    error
  };
};
