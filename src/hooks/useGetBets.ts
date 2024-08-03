import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import { DEFAULT_PAGE_SIZE } from '@/constants/index';
import { sportsbookBetsState } from '@/components/state/sportsbookBetsState';
import { useLoader } from './useLoader';
import { format, subMonths } from 'date-fns';
import { DESKTOP_ITEMS_PER_PAGE, MOBILE_ITEMS_PER_PAGE } from './usePagination';

interface BetRecord {
  betSlipId: number;
  externalBetSlipId: string;
  playerId: number;
  betSlipDescription: string;
  insertDate: string;
  placedTime: string;
  generalStake: number;
  winAmount: number;
  status: string;
  statusId: string;
  settleTime: string;
}

interface BetRecordsResponse {
  historyList: BetRecord[];
  recordCount: number;
}

export const useGetBets = ({
  isMobile = true,
  currentPage = 1,
  fromDate = format(subMonths(new Date(), 6), 'M/d/yyyy h:mm:ss a xxx'),
  toDate = format(new Date(), 'M/d/yyyy h:mm:ss a xxx')
}) => {
  const [bets, setBets] = useRecoilState<BetRecord[]>(sportsbookBetsState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');

  useEffect(() => {
    const fetchBetsData = async () => {
      toggleLoader(true);
      try {
        const response = await apiClient.get<BetRecordsResponse>(
          `/api/sportsbook/bets?FromDate=${encodeURIComponent(
            fromDate
          )}&ToDate=${encodeURIComponent(toDate)}&PageSize=${DEFAULT_PAGE_SIZE}`
        );

        setBets([...response.data.historyList]);
      } catch (error: any) {
        console.error(error);
      } finally {
        toggleLoader(false);
      }
    };

    fetchBetsData();
  }, []);

  const itemsPerPage = useMemo(
    () => (isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE),
    [isMobile]
  );

  const paginatedBets = useMemo(
    () => (bets ? bets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : []),
    [bets, currentPage, itemsPerPage]
  );

  return { bets, paginatedBets, isLoading, loadingWrapper };
};
