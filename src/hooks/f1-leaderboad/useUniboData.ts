import { useState, useEffect } from 'react';
import { extractPlayerData } from '@/components/Molecules/F1-Leaderboard/utils';
import { authenticate, fetchLeaderboard } from '@/services/f1-leaderboard-service';
import { getToken, isCookieValid } from '@/utils/cookie-validity';
import { IPlayerData } from '@/components/Molecules/F1-Leaderboard/types';
import { CAMPAIGN_ID } from '@/constants/index';

const useUniboData = () => {
  const [data, setData] = useState<IPlayerData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);

    let token = getToken();
    if (!isCookieValid()) {
      try {
        await authenticate();
        token = getToken();
      } catch (authError: any) {
        setError(authError);
        setLoading(false);
        return;
      }
    }

    if (token) {
      try {
        const leaderboardData = await fetchLeaderboard(token);
        const processedData = extractPlayerData(leaderboardData, CAMPAIGN_ID);
        setData(processedData);
      } catch (fetchError: any) {
        console.error('Fetch Error:', fetchError);
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    } else {
      setError(new Error('Token is not available'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useUniboData;
