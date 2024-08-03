import { format, parseISO } from 'date-fns';
import Cookies from 'js-cookie';
import { LOCALE as Locale } from 'src/constants/index';

enum DateFormat {
  DD_MM_YYYY = 'dd/MM/yyyy',
  YYYY_MM_DD = 'yyyy-MM-dd',
  DEFAULT = 'dd.MM.yyyy'
}

const applyDateFormat = (date: Date, locale: Locale): string => {
  const localeFormats: Record<Locale, DateFormat> = {
    [Locale.EN_NZ]: DateFormat.DD_MM_YYYY,
    // [Locale.PT_BR]: DateFormat.DD_MM_YYYY,
    [Locale.ES_MX]: DateFormat.DD_MM_YYYY,
    [Locale.ES_LA]: DateFormat.DD_MM_YYYY,
    [Locale.IS]: DateFormat.DD_MM_YYYY,
    [Locale.EN_CA]: DateFormat.YYYY_MM_DD,
    [Locale.FR_CA]: DateFormat.YYYY_MM_DD,
    [Locale.EN]: DateFormat.DEFAULT
  };

  const dateFormat = localeFormats[locale] || DateFormat.DEFAULT;

  return format(date, dateFormat);
};

const applyTimeFormat = (date: Date, locale: Locale): string => {
  const timeFormat = locale === Locale.EN_NZ ? 'hh:mm a' : 'HH:mm';
  return format(date, timeFormat);
};

const formatDate = (
  dateString: string | null,
  { hasTime = false }: { hasTime?: boolean } = {}
): string => {
  if (!dateString) {
    return 'Not available';
  }

  try {
    const locale: Locale = (Cookies.get('NEXT_LOCALE') as Locale) || Locale.EN;
    const parsedDate = parseISO(dateString);
    const formattedDate = applyDateFormat(parsedDate, locale);
    const formattedTime = hasTime ? applyTimeFormat(parsedDate, locale) : '';

    return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export default formatDate;
