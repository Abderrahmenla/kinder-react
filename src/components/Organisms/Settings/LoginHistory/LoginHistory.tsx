import { useCallback, useMemo, useState } from 'react';
import ResponsiveTable from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable';
import { Spacer } from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable.styles';
import { HistoryRecord, useLoginHistory } from '@/hooks/useLoginHistory';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import formatDate from '@/utils/formatUtils/formatDate';
import { Title, rowStyles } from '../BetHistory/BetHistory.styles';
import { Container, headerStyles } from './LoginHistory.styles';
import { LOGIN_HEADER, LOGIN_HEADERS } from './LoginHistory.constants';

const LoginHistory = () => {
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(768);
  const [currentPage, setCurrentPage] = useState(1);
  const { history, paginatedHistory, isLoading, loadingWrapper } = useLoginHistory({
    currentPage,
    isMobile
  });

  const rows = useMemo(() => {
    return paginatedHistory.map(
      ({ logonTime, logoutTime, clientIp, countryCode }: HistoryRecord) => ({
        rowStyles,
        rowData: [
          { label: LOGIN_HEADER.loginTime, value: formatDate(logonTime, { hasTime: true }) },
          { label: LOGIN_HEADER.logoutTime, value: formatDate(logoutTime, { hasTime: true }) },
          { label: LOGIN_HEADER.ip, value: clientIp },
          { label: LOGIN_HEADER.location, value: countryCode }
        ]
      })
    );
  }, [paginatedHistory, t]);

  const handleSetCurrentPage = useCallback(
    (page: number) => setCurrentPage(page),
    [setCurrentPage]
  );

  return (
    <Container isMobile={isMobile}>
      {!isMobile && (
        <>
          <Title size="h5" type="Heading">
            {t('loginHistory')}
          </Title>
          <Spacer />
        </>
      )}
      <ResponsiveTable
        isMobile={isMobile}
        isLoading={isLoading}
        loadingWrapper={loadingWrapper}
        count={history.length}
        setCurrentPage={handleSetCurrentPage}
        headers={LOGIN_HEADERS}
        headerStyles={headerStyles}
        rows={rows}
      />
    </Container>
  );
};

export default LoginHistory;
