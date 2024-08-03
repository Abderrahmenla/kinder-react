import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import { DEFAULT_PAGE_SIZE } from '@/constants/index';
import { useLoader } from './useLoader';
import { format, subMonths } from 'date-fns';
import { gameBetsState } from '@/components/state/gameBetsState';
import { DESKTOP_ITEMS_PER_PAGE, MOBILE_ITEMS_PER_PAGE } from './usePagination';

interface GameRecord {
  id: string;
  name: string;
  start: string;
  stop: string;
  stake: number;
  won: number;
  summary: string | null;
  status: string;
  productType: string;
  externalGameId: string;
  productId: number;
  productName: string;
  productSupplier: string;
}

interface GameRecordsResponse {
  historyList: GameRecord[];
  recordCount: number;
}

export const useGetGames = ({
  isMobile = true,
  currentPage = 1,
  fromDate = format(subMonths(new Date(), 6), 'M/d/yyyy h:mm:ss a xxx'),
  toDate = format(new Date(), 'M/d/yyyy h:mm:ss a xxx')
}) => {
  const [games, setGames] = useRecoilState<GameRecord[]>(gameBetsState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');

  useEffect(() => {
    const fetchGamesBets = async () => {
      toggleLoader(true);
      try {
        const response = await apiClient.get<GameRecordsResponse>(
          `/api/games-history/games?FromDate=${encodeURIComponent(
            fromDate
          )}&ToDate=${encodeURIComponent(toDate)}&PageSize=${DEFAULT_PAGE_SIZE}`
        );

        setGames([...response.data.historyList]);
      } catch (error: any) {
        console.error(error);
      } finally {
        toggleLoader(false);
      }
    };

    fetchGamesBets();
  }, []);

  const itemsPerPage = useMemo(
    () => (isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE),
    [isMobile]
  );

  const paginatedGames = useMemo(
    () => (games ? games.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : []),
    [games, currentPage, itemsPerPage]
  );

  return { games, paginatedGames, isLoading, loadingWrapper };
};
