import Pagination from '@/components/Atoms/Pagination/Pagination';
import Typography from '@/components/Atoms/Typography/Typography';
import { statusColors } from '@/components/Organisms/Settings/Transaction/Transaction.constants';
import { StatusColors } from '@/components/Organisms/Settings/Transaction/Transaction.type';
import styled from '@emotion/styled';

export const VerificationListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

export const UploadedDocumentLists = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const VerificationListPagination = styled(Pagination)`
  justify-content: end;
`;

export const VerificationListItemName = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (min-width: 768px) {
    max-width: 150px;
  }
`;
export const VerificationListItemStatus = styled(Typography)<{ status: string }>`
  color: ${({ status }) => statusColors[status as keyof StatusColors] || 'var(--darker-white)'};
  line-height: 1;
`;
export const VerificationListItemCategory = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
  flex: 1;
`;

export const VerificationListItemContainer = styled('div')`
  display: flex;
  gap: 12px;
  border-radius: 8px;
  background: var(--very-dark-violet-200);
  padding: 15px 16px;
  width: auto;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const VerificationListItemLabel = styled('div')`
  min-width: 200px;
  display: flex;
  text-wrap: nowrap;
  gap: 4px;
  @media (max-width: 280px) {
    min-width: 100px;
  }
`;

export const VerificationListItemDate = styled(Typography)`
  color: var(--soft-blue-100);
  line-height: 1;
`;

export const VerificationListItemCategoryDate = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
