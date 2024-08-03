import { addDays, format } from 'date-fns';
import formatDate from '@/utils/formatUtils/formatDate';

export const getDayRangeName = ({
  duration,
  t
}: {
  duration: number;
  t: (key: string) => string;
}) => {
  const dayLabel = duration === 1 ? 'day' : 'days';
  const translatedDayLabel = t(dayLabel).toLowerCase();
  return `${duration} ${translatedDayLabel}`;
};

export const getUTCFormattedDateTimeString = (selectedDuration: number | null): string | null => {
  if (!selectedDuration) return null;

  const currentDate = new Date();
  const exclusionDate = addDays(currentDate, selectedDuration);

  // Format the exclusion date and time in ISO 8601 format (UTC)
  const formattedDateTime = format(exclusionDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  return formattedDateTime;
};

export const convertUTCtoLocalAndFormat = (excludedUntil: string | null): string => {
  if (!excludedUntil) return 'Not available';

  const localDateTime = new Date(excludedUntil);
  const timeZoneOffsetInMins = localDateTime.getTimezoneOffset();
  const adjustedDateTime = localDateTime.getTime() + timeZoneOffsetInMins * 60000;
  localDateTime.setTime(adjustedDateTime);

  const formattedDate = formatDate(localDateTime.toISOString(), { hasTime: true });

  return formattedDate;
};
