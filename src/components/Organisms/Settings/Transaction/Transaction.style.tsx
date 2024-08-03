import Pagination from '@/components/Atoms/Pagination/Pagination';
import Table from '@/components/Atoms/Table/Table';
import Tabs from '@/components/Atoms/Tabs/Tabs';
import Typography from '@/components/Atoms/Typography/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { statusColors } from './Transaction.constants';
import { StatusColors } from './Transaction.type';

export const HeaderContainer = styled('div')`
  margin-bottom: 16px;
`;

export const TableTitle = styled(Typography)`
  margin-bottom: 16px;
  h5 {
    font-weight: 600;
    text-align: left;
    line-height: 16px;
    color: var(--darker-white);
    margin: unset;
  }
`;

export const TransactionDataStatus = styled(Table.Data)<{ status: string }>`
  span {
    color: ${({ status }) => statusColors[status as keyof StatusColors] || 'var(--darker-white)'};
  }
`;

export const TransactionTabs = styled(Tabs)`
  gap: 6px;
  span {
    font-weight: 500;
    line-height: 20px;
  }
`;

export const TableHeaderLabel = styled(Typography)`
  span {
    font-weight: 400;
    line-height: 16px;
    color: var(--soft-blue-100);
  }
`;

export const TransactionDataText = styled(Typography)`
  span {
    font-weight: 400;
    color: var(--darker-white);
  }
`;
export const transactionDataRowStyle = css`
  line-height: 16px;
`;
export const transactionHeaderRowStyle = css`
  line-height: 13px;
`;

export const TransactionPagination = styled(Pagination)`
  justify-content: end;
`;

export const MobileTransactionTableParent = styled(Table.Parent)`
  border-spacing: unset;
  background: var(--very-dark-violet-3);
  padding: 12px;
  border-radius: 12px;
  line-height: 17px;
`;

export const MobileTransactionTableContainer = styled(Table)`
  margin-bottom: 21px;
  padding: unset;
`;

export const firstColumnStyle = css`
  width: 30%;
  padding: unset;
`;

export const secondColumnStyle = css`
  text-align: right;
  padding: unset;
`;

export const MobileTransactionTableBody = styled(Table.Body)`
  ::after {
    content: '';
    display: block;
    height: 12px;
  }
`;

export const NoDataContainer = styled('div')`
  width: 100%;
  padding: 16px 0px;
  background: var(--very-dark-violet-3);
  margin: 50% 0;
  @media screen and (min-width: 768px) {
    margin-top: 14px;
    margin-bottom: 0px;
  }
`;

export const NoDataText = styled(Typography)`
  text-align: center;
  span {
    color: var(--soft-blue-100);
  }
`;
