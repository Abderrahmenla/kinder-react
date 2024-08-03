import { ComponentType, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { BetHistoryTable } from './BetHistory.types';
import { CASINO_HEADER, SPORTS_HEADER } from './BetHistory.constants';

const CasinoBets = dynamic(() => import('@/components/Organisms/Settings/BetHistory/CasinoBets'));

const SportsBets = dynamic(() => import('@/components/Organisms/Settings/BetHistory/SportsBets'));

const CopyToCliboardButton = dynamic(
  () => import('@/components/Organisms/Settings/BetHistory/CopyClipboard')
);

export const withBetHistoryHOC = (
  Component: ComponentType<BetHistoryTable>,
  { headers }: { headers: string[] }
) => {
  const WithBetHistoryComponent = ({
    isMobile = false,
    getTranslation
  }: {
    isMobile: boolean;
    getTranslation: (key: string) => string;
  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [copiedText, copy] = useCopyToClipboard();

    const handleSetCurrentPage = useCallback(
      (page: number) => setCurrentPage(page),
      [setCurrentPage]
    );

    const getCopyToClipboardButton = useCallback(
      (textToCopy: string, { isCopied }: { isCopied: boolean }) => {
        return <CopyToCliboardButton onClick={() => copy(textToCopy)} isCopied={isCopied} />;
      },
      [copiedText, copy]
    );

    return (
      <Component
        isMobile={isMobile}
        headers={headers}
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
        copiedText={copiedText}
        getCopyToClipboardButton={getCopyToClipboardButton}
        getTranslation={getTranslation}
      />
    );
  };

  const displayName = Component.displayName || Component.name || 'Component';
  WithBetHistoryComponent.displayName = `WithBetHistoryComponent(${displayName})`;

  return WithBetHistoryComponent;
};

const CasinoBetsWithHOC = withBetHistoryHOC(CasinoBets, {
  headers: Object.keys(CASINO_HEADER)
});

const SportsBetsWithHOC = withBetHistoryHOC(SportsBets, {
  headers: Object.keys(SPORTS_HEADER)
});

export { CasinoBetsWithHOC, SportsBetsWithHOC };
