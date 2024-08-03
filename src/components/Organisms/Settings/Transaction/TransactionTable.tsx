import { useLoader } from '@/hooks/useLoader';
import { FormattedTransactionRecord, getTransactions } from '@/utils/getTransactions';
import React, { useCallback, useEffect, useState } from 'react';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import DesktopTransactionTable from './DesktopTransactionTable';
import { useTranslations } from '@/hooks/useTranslations';
import MobileTransactionTable from './MobileTransactionTable';
import Table from '@/components/Atoms/Table/Table';
import { NoDataContainer, NoDataText, TransactionPagination } from './Transaction.style';
import TransactionHeaderContianer from './TransactionHeaderContianer';
import { desktopMaxRowPerTable, mobileMaxRowPerTable } from './Transaction.constants';
import { InitialFilteredTransactionData } from './Transaction.type';

const getSlicedData = (
  transactionData: FormattedTransactionRecord[],
  maxRowPerTable: number,
  minCount: number
) => {
  return transactionData.slice(minCount, minCount + maxRowPerTable);
};

const Transaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { loadingWrapper } = useLoader('coin');
  const [depositData, setDepositData] = useState<FormattedTransactionRecord[]>([]);
  const [withdrawalData, setWithdrawalData] = useState<FormattedTransactionRecord[]>([]);
  const [transactionData, setTransactionData] = useState<FormattedTransactionRecord[]>([]);
  const [minCount, setMinCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(768);

  const toggleTabState = useCallback(
    (state: string) => {
      setTransactionData(state === 'deposits' ? depositData : withdrawalData);
      setMinCount(0);
      setPageCount(1);
    },
    [depositData, withdrawalData]
  );

  const handlePagination = useCallback(
    (pageNumber: number) => {
      const maxRowPerTable = isMobile ? mobileMaxRowPerTable : desktopMaxRowPerTable;
      const number = maxRowPerTable * pageNumber - maxRowPerTable;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMinCount(number);
    },
    [isMobile]
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const { formattedTransactions } = await getTransactions();

        if (formattedTransactions.length > 0) {
          const { deposits, withdrawals } = formattedTransactions.reduce(
            (acc: InitialFilteredTransactionData, record) => {
              if (record.type === 'Deposit') acc?.deposits.push(record);
              else if (record.type === 'Withdrawal') acc?.withdrawals.push(record);
              return acc;
            },
            { deposits: [], withdrawals: [] }
          );

          setDepositData(deposits);
          setWithdrawalData(withdrawals);

          //Set initial transaction data
          setTransactionData(deposits);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const maxRowPerTable = isMobile ? mobileMaxRowPerTable : desktopMaxRowPerTable;
    let count = transactionData.length / maxRowPerTable;
    if (count % 1) {
      count = Math.trunc(count) + 1;
    }
    setPageCount(count);
  }, [transactionData.length, isMobile]);

  if (isLoading) {
    return loadingWrapper;
  }

  return (
    <>
      {!isMobile ? (
        <Table mediaQueryPadding="0px" showPadding={false}>
          <TransactionHeaderContianer toggleTabState={toggleTabState} t={t} isMobile={isMobile} />
          <DesktopTransactionTable
            t={t}
            transactionData={getSlicedData(transactionData, desktopMaxRowPerTable, minCount)}
          />
          {transactionData.length <= 0 && (
            <NoDataContainer>
              <NoDataText size="b2">{t('noDataText')}</NoDataText>
            </NoDataContainer>
          )}
          {pageCount > 1 && (
            <TransactionPagination
              pages={pageCount}
              onClick={(pageNumber: number) => handlePagination(pageNumber)}
            />
          )}
        </Table>
      ) : (
        <>
          <TransactionHeaderContianer toggleTabState={toggleTabState} t={t} isMobile={isMobile} />
          {transactionData.length ? (
            <MobileTransactionTable
              t={t}
              transactionData={getSlicedData(transactionData, mobileMaxRowPerTable, minCount)}
            />
          ) : (
            <NoDataContainer>
              <NoDataText size="b2">{t('noDataText')}</NoDataText>
            </NoDataContainer>
          )}
          {pageCount > 1 && (
            <TransactionPagination
              pages={pageCount}
              onClick={(pageNumber: number) => handlePagination(pageNumber)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Transaction;
