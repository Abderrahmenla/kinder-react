import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function timeLeftUntil(targetDate: string): string {
  const now = dayjs();
  const expiration = dayjs(targetDate);
  const diff = expiration.diff(now);

  if (diff <= 0) {
    return 'Expired';
  }

  const durationObj = dayjs.duration(diff);

  const months = durationObj.months();
  const days = durationObj.days();
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();
  const seconds = durationObj.seconds();

  return `${months ? `${months}mo ` : ''}${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${
    minutes ? `${minutes}m ` : ''
  }${seconds}s left`;
}
