// useServerTime.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const useServerTime = () => {
  const [serverTime, setServerTime] = useState<Date>();

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const API_KEY = 'IMD8T8BOWVAB';

        const timeResponse = await axios.get(
          `https://vip.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=ip`
        );

        const data = await timeResponse?.data?.formatted;
        const formattedDate = dayjs(data).format('MM/DD/YYYY HH:mm:ss');
        setServerTime(new Date(formattedDate));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTime();
  }, []);

  return serverTime;
};

export default useServerTime;
