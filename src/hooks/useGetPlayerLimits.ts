import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { limitState } from '@/components/state/limitState';
import { apiClient } from 'src/services/clientAxios';
import { useLoader } from './useLoader';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { DESKTOP_ITEMS_PER_PAGE, MOBILE_ITEMS_PER_PAGE } from './usePagination';

interface UseGetPlayerLimitsProps {
  limitType?: string;
  isMobile?: boolean;
  currentPage?: number;
}

export const useGetPlayerLimits = ({
  limitType,
  isMobile,
  currentPage = 1
}: UseGetPlayerLimitsProps = {}) => {
  const [limits, setLimits] = useRecoilState(limitState);
  const { isLoading, loadingWrapper, toggleLoader } = useLoader('coin');

  const fetchPlayerLimits = useCallback(async () => {
    try {
      toggleLoader(true);
      let url = `/api/player/getPlayerLimits?PageSize=${DEFAULT_PAGE_SIZE}`;

      if (limitType) {
        url += `&limitType=${limitType}`;
      }

      const response = await apiClient.get(url);
      setLimits(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      toggleLoader(false);
    }
  }, [toggleLoader, limitType, setLimits]);

  const itemsPerPage = useMemo(
    () => (isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE),
    [isMobile]
  );

  const paginatedLimits = useMemo(
    () =>
      limits ? limits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [],
    [limits, currentPage, itemsPerPage]
  );

  return { limits, paginatedLimits, fetchPlayerLimits, isLoading, loadingWrapper };
};
