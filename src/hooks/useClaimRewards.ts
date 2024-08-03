import { useCallback, useState } from 'react';
import { apiClient } from 'src/services/clientAxios';
import useCustomToast from '@/hooks/useCustomToast';
import { loyaltyData } from './types/loyaltyData';

const useClaimRewards = (
  loyaltyDetails: loyaltyData | undefined,
  refresh: () => void,
  refetchLoyalty: () => Promise<void>
) => {
  const [loading, setLoading] = useState(false);
  const { displayToast } = useCustomToast();

  const claimRewards = useCallback(async () => {
    setLoading(true);
    try {
      await apiClient.post('/api/loyalty/claim', {
        numberOfPoints: loyaltyDetails?.pointsBalance
      });
      refresh();
      await refetchLoyalty();
      setLoading(false);
      displayToast({
        message: 'You successfully claimed your bonus!',
        duration: 3000,
        type: 'success'
      });
    } catch (error) {
      setLoading(false);
      displayToast({
        message: 'Error claiming bonus. Please try again.',
        duration: 3000,
        type: 'error'
      });
    }
  }, [loyaltyDetails, refresh, refetchLoyalty, displayToast]);

  return { claimRewards, loading };
};

export default useClaimRewards;
