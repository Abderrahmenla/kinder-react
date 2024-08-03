import { useRecoilValue } from 'recoil';
import { DocumentItem, documentsState } from '@/components/state/documentsState';
import {
  UploadedDocumentLists,
  VerificationListContainer,
  VerificationListPagination
} from './VerificationList.style';
import { useGetPlayerDocuments } from '@/hooks/useGetDocuments';
import { useCallback, useEffect, useState } from 'react';
import {
  desktopMaxRowPerTable,
  mobileMaxRowPerTable
} from '@/components/Organisms/Settings/Transaction/Transaction.constants';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import VerificationListItem from './VerificationListItem';

const getSlicedData = (documents: DocumentItem[], maxRowPerTable: number, minCount: number) => {
  return documents.slice(minCount, minCount + maxRowPerTable);
};

const VerificationList = () => {
  const documents = useRecoilValue(documentsState);
  const [paginatedDocuments, setPaginatedDocuments] = useState<DocumentItem[]>();
  const { isLoading, loadingWrapper } = useGetPlayerDocuments();
  const [pageCount, setPageCount] = useState<number>(1);
  const isMobile = UseMediaQuery(768);
  const [minCount, setMinCount] = useState<number>(0);

  const handlePagination = useCallback(
    (pageNumber: number) => {
      const maxRowPerTable = isMobile ? mobileMaxRowPerTable : desktopMaxRowPerTable;
      const number = maxRowPerTable * pageNumber - maxRowPerTable;
      if (!isMobile) window.scrollTo({ top: 0, behavior: 'smooth' });
      setMinCount(number);
    },
    [isMobile]
  );

  useEffect(() => {
    const maxRowPerTable = isMobile ? mobileMaxRowPerTable : desktopMaxRowPerTable;
    let count = documents.length / maxRowPerTable;
    if (count % 1) {
      count = Math.trunc(count) + 1;
    }
    setPageCount(count);
  }, [documents.length, isMobile]);

  useEffect(() => {
    const maxRowPerTable = isMobile ? mobileMaxRowPerTable : desktopMaxRowPerTable;

    setPaginatedDocuments(getSlicedData(documents, maxRowPerTable, minCount));
  }, [documents, isMobile, minCount]);

  return (
    <VerificationListContainer>
      {isLoading ? (
        loadingWrapper
      ) : (
        <>
          <UploadedDocumentLists>
            {paginatedDocuments?.map((data, index) => {
              return <VerificationListItem data={data} key={`data-${index}`} />;
            })}
          </UploadedDocumentLists>
          {pageCount > 1 && (
            <VerificationListPagination
              pages={pageCount}
              onClick={(pageNumber: number) => handlePagination(pageNumber)}
            />
          )}
        </>
      )}
    </VerificationListContainer>
  );
};

export default VerificationList;
