import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseGetServerTimeIntervalReturn {
  serverDateTime: string;
  error: Error | null;
}

export const useGetServerTimeInterval = (
  timeZone = 'Europe/Berlin'
): UseGetServerTimeIntervalReturn => {
  const [serverDateTime, setServerDateTime] = useState('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const API_KEY = 'IMD8T8BOWVAB';
        const response = await axios.get(
          `https://vip.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=${timeZone}`
        );
        setServerDateTime(response.data.formatted);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching server time:', error);
          setError(error);
        }
      }
    };

    fetchServerTime();

    const intervalId = setInterval(fetchServerTime, 7200000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeZone]);

  return { serverDateTime, error };
};
