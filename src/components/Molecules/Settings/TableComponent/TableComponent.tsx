import { ReactNode } from 'react';
import {
  AccountNoLogLogo,
  AccountNoLogWrapper,
  Container,
  HistoryDetails,
  HistoryWrapper,
  ShowMoreButton,
  AccountDTWrapper
} from './TableComponentStyle';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { assets } from '@/config/assets';

interface TableComponentProps {
  children: ReactNode;
  isEnd?: boolean;
  isLoading?: boolean;
  title?: string;
  loadMore?: () => void;
  isShowButton: boolean;
  isData?: boolean;
  isLimitComponent?: boolean;
}

const TableComponent = ({
  children,
  isEnd,
  isLoading,
  title,
  isData = true,
  loadMore,
  isShowButton,
  isLimitComponent
}: TableComponentProps) => {
  const { t } = useTranslations();
  return (
    <Container>
      <HistoryDetails>
        <h2>{title} </h2>
        {isData ? (
          <HistoryWrapper limitComponent={isLimitComponent}>
            {children}
            {isShowButton && (
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {loadMore && !isEnd && isShowButton && (
                  <ShowMoreButton onClick={loadMore}>
                    {isLoading ? `${t('fetching')}..` : t('seeMore')}
                  </ShowMoreButton>
                )}
              </div>
            )}
          </HistoryWrapper>
        ) : (
          <AccountDTWrapper>
            <AccountNoLogWrapper>
              <AccountNoLogLogo>
                <Image
                  width={126}
                  height={126}
                  alt="nolog"
                  src={`${assets}/images/noLogIcon.svg`}
                  loading="lazy"
                />
              </AccountNoLogLogo>
              <p>{t('noResultsToShow')}</p>
            </AccountNoLogWrapper>
          </AccountDTWrapper>
        )}
      </HistoryDetails>
    </Container>
  );
};

export default TableComponent;
