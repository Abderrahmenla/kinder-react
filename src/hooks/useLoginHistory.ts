import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import { DEFAULT_PAGE_SIZE } from '@/constants/index';
import { authState } from '@/components/state/isAuthenticated';
import { loginHistoryState } from '@/components/state/loginHistoryState';
import { useLoader } from './useLoader';
import { DESKTOP_ITEMS_PER_PAGE, MOBILE_ITEMS_PER_PAGE } from './usePagination';

export interface HistoryRecord {
  logonTime: string;
  logoutTime: string | null;
  clientIp: string;
  realClientIp: string | null;
  countryCode: string;
  status: string;
}

export const useLoginHistory = ({ isMobile = true, currentPage = 1 }) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [history, setHistory] = useRecoilState<HistoryRecord[]>(loginHistoryState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');

  useEffect(() => {
    const fetchLoginHistoryData = async () => {
      toggleLoader(true);
      try {
        const response = await apiClient.get<HistoryRecord[]>(
          `/api/player/getPlayerHistory?PageNumber=${currentPage}&PageSize=${DEFAULT_PAGE_SIZE}&Descending=false`
        );

        setHistory([...response.data]);
      } catch (error: any) {
        console.error(error);
      } finally {
        toggleLoader(false);
      }
    };

    if (isAuthenticated && history.length === 0) {
      fetchLoginHistoryData();
    }
  }, [isAuthenticated, history.length]);

  const itemsPerPage = useMemo(
    () => (isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE),
    [isMobile]
  );

  const paginatedHistory: HistoryRecord[] = useMemo(
    () => history?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) ?? [],
    [history, currentPage, itemsPerPage]
  );

  return { history, paginatedHistory, isLoading, loadingWrapper };
};
