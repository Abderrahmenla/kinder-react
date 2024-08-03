import { useMemo } from 'react';
import ResponsiveTable from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import formatDate from '@/utils/formatUtils/formatDate';
import { useGetBets } from '@/hooks/useGetBets';
import { BetHistoryTable, SportsBet } from './BetHistory.types';
import {
  DEFAULT_STATUS_STYLES,
  LOCAL_BET_STATUS,
  LOCAL_BET_STATUSES,
  STATUS_STYLES
} from './BetHistory.constants';
import { combineStyles, getBetResult } from './BetHistory.utils';
import { actionButtonStyles, headerStyles, rowStyles } from './BetHistory.styles';

export default function SportsBets({
  isMobile = false,
  headers,
  currentPage,
  setCurrentPage,
  copiedText,
  getCopyToClipboardButton,
  getTranslation
}: BetHistoryTable) {
  const { bets, paginatedBets, isLoading, loadingWrapper } = useGetBets({ currentPage, isMobile });

  {
    /* Sports Bet Statuses: None, Placed, Running, CashOut, PartialCashOut, Won, Lost, HalfWon, HalfLost, Tie, Void, Cancelled, Declined, Refund */
  }
  const rows = useMemo(() => {
    const rowData = paginatedBets.map(
      ({ betSlipId, placedTime, status, winAmount: win, generalStake: stake }: SportsBet) => {
        const localStatus = LOCAL_BET_STATUSES.get(status) || status;

        const { border, color } = STATUS_STYLES.get(localStatus) || DEFAULT_STATUS_STYLES;

        const betResult = getBetResult({ status: localStatus, win, stake });
        const formattedResult =
          localStatus === LOCAL_BET_STATUS.pending
            ? ''
            : formatCurrency(betResult, {
                isNegative: localStatus === LOCAL_BET_STATUS.lose,
                displaySign: true
              });

        const id = String(betSlipId);
        const isCopied = copiedText === id;
        const actionButton = getCopyToClipboardButton(id, { isCopied });

        return {
          rowStyles: isMobile ? combineStyles(border, rowStyles) : rowStyles,
          rowData: [
            {
              label: headers[0],
              value: formatDate(placedTime, { hasTime: true }),
              dataStyles: isMobile ? undefined : border
            },
            {
              label: headers[1],
              value: getTranslation(localStatus),
              dataStyles: color
            },
            {
              label: headers[2],
              value: formattedResult
            },
            {
              label: headers[3],
              value: id,
              actionButton,
              dataStyles: actionButtonStyles
            }
          ]
        };
      }
    );

    return rowData;
  }, [paginatedBets, copiedText, isMobile, getTranslation, headers, getCopyToClipboardButton]);

  return (
    <ResponsiveTable
      isMobile={isMobile}
      isLoading={isLoading}
      loadingWrapper={loadingWrapper}
      count={bets.length}
      setCurrentPage={setCurrentPage}
      headers={headers}
      rows={rows}
      headerStyles={headerStyles}
    />
  );
}
