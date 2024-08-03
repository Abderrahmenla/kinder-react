import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import { loyaltyState } from '@/components/state/loyaltyState';
import { authState } from '@/components/state/isAuthenticated';

export const useGetLoyaltyDetails = () => {
  const [loading, setLoading] = useState(false);
  const [loyaltyDetails, setLoyaltyDetails] = useRecoilState(loyaltyState);
  const { isAuthenticated } = useRecoilValue(authState);

  const fetchLoyaltyDetails = useCallback(async () => {
    try {
      setLoading(true);
      const detailsRes = await apiClient.get(`/api/loyalty/details`);
      setLoyaltyDetails(detailsRes.data?.loyalty);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  }, [setLoyaltyDetails]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLoyaltyDetails();
    }
  }, [fetchLoyaltyDetails, isAuthenticated, setLoyaltyDetails]);

  return { loyaltyDetails, loading, refetch: fetchLoyaltyDetails };
};
