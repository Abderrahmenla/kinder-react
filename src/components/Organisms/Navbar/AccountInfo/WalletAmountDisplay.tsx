import { CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import formatCurrency from '@/utils/formatUtils/formatCurrency';

export const WalletAmountDisplay = ({
  isPlaying,
  filteredData
}: {
  isPlaying: boolean;
  filteredData: any;
}) => {
  const displayValue = useMemo(() => {
    if (!filteredData.length) return <CircularProgress size={11} />;

    const totalBalance = filteredData.reduce((acc: any, item: any) => acc + item.balance, 0);
    return formatCurrency(totalBalance);
  }, [filteredData, isPlaying]);

  return <span>{isPlaying ? 'Playing...' : displayValue}</span>;
};
