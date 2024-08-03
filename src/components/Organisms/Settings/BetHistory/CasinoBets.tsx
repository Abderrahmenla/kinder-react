import { useMemo } from 'react';
import ResponsiveTable from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable';
import { useGetGames } from '@/hooks/useGetGames';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import formatDate from '@/utils/formatUtils/formatDate';
import { BetHistoryTable, CasinoBet } from './BetHistory.types';
import {
  BET_STATUS,
  DEFAULT_STATUS_STYLES,
  LOCAL_BET_STATUS,
  STATUS_STYLES
} from './BetHistory.constants';
import { combineStyles, getBetResult } from './BetHistory.utils';
import { actionButtonStyles, headerStyles, rowStyles } from './BetHistory.styles';

export default function CasinoBets({
  isMobile = false,
  headers,
  currentPage,
  setCurrentPage,
  copiedText,
  getCopyToClipboardButton
}: BetHistoryTable) {
  const { games, paginatedGames, isLoading, loadingWrapper } = useGetGames({
    currentPage,
    isMobile
  });

  //Game Bet Statuses: Active, Finished, Voided
  const rows = useMemo(() => {
    const rowData = paginatedGames.map(({ id, name, stop, status, won: win, stake }: CasinoBet) => {
      const isFinished = status === BET_STATUS.finished;
      const isWon = isFinished && win > 0;

      const localStatus = isWon ? LOCAL_BET_STATUS.win : LOCAL_BET_STATUS.lose;

      const { border, color } = STATUS_STYLES.get(localStatus) || DEFAULT_STATUS_STYLES;

      const formattedStake = formatCurrency(stake);

      const betResult = getBetResult({ status: localStatus, win, stake });
      const formattedResult = !isFinished
        ? ''
        : formatCurrency(betResult, {
            isNegative: !isWon,
            displaySign: true
          });

      const formattedId = id.slice(-4);
      const isCopied = copiedText === id;
      const actionButton = getCopyToClipboardButton(id, { isCopied });

      return {
        rowStyles: isMobile ? combineStyles(border, rowStyles) : rowStyles,
        rowData: [
          {
            label: headers[0],
            value: name,
            dataStyles: isMobile ? undefined : border
          },
          { label: headers[1], value: formatDate(stop, { hasTime: true }) },
          { label: headers[2], value: formattedStake },
          { label: headers[3], value: formattedResult, dataStyles: color },
          { label: headers[4], value: formattedId, actionButton, dataStyles: actionButtonStyles }
        ]
      };
    });

    return rowData;
  }, [paginatedGames, copiedText, isMobile, headers, getCopyToClipboardButton]);

  return (
    <ResponsiveTable
      isMobile={isMobile}
      isLoading={isLoading}
      loadingWrapper={loadingWrapper}
      count={games.length}
      setCurrentPage={setCurrentPage}
      headers={headers}
      rows={rows}
      headerStyles={headerStyles}
    />
  );
}
