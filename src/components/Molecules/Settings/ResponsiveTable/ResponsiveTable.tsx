import dynamic from 'next/dynamic';
import { ResponsiveTableProps } from './ResponsiveTable.types';

const NoDataFound = dynamic(
  () => import('@/components/Molecules/Settings/ResponsiveTable/NoDataFound')
);

const MobileCards = dynamic(
  () => import('@/components/Molecules/Settings/ResponsiveTable/MobileCards')
);

const DesktopTable = dynamic(
  () => import('@/components/Molecules/Settings/ResponsiveTable/DesktopTable')
);

const CustomPagination = dynamic(
  () => import('@/components/Molecules/Settings/ResponsiveTable/CustomPagination')
);

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  isMobile,
  isLoading,
  loadingWrapper,
  count,
  setCurrentPage,
  headers,
  rows,
  headerStyles,
  customCard
}) => {
  if (isLoading) {
    return loadingWrapper;
  }

  return (
    <>
      {isMobile ? (
        customCard || <MobileCards rows={rows} />
      ) : (
        <DesktopTable headers={headers} headerStyles={headerStyles} rows={rows} />
      )}
      {count === 0 && <NoDataFound />}
      {setCurrentPage && (
        <CustomPagination isMobile={isMobile} count={count} setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};

export default ResponsiveTable;
