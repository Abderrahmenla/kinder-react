import React from 'react';
import Table from '@/components/Atoms/Table/Table';
import { DataTableProps } from '@/components/Organisms/Referral/ReferredUsersTable.types';
import {
  StyledTable,
  TableData,
  TableHeader
} from '@/components/Organisms/Referral/DataTable/DataTable.styles';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import formatDate from '@/utils/formatUtils/formatDate';

const columns = ['Username', 'Created Date', 'Total Wager Amount'];

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <StyledTable>
      <Table.Parent cellSpacing={0}>
        <Table.Body>
          <Table.Row>
            {columns.map((column) => (
              <TableHeader key={column}>{column}</TableHeader>
            ))}
          </Table.Row>
          {data.map((item, index) => (
            <Table.Row key={index}>
              <TableData>{item.username}</TableData>
              <TableData>{formatDate(item.createdDate)}</TableData>
              <TableData>
                {formatCurrency(item.totalWagerAmountSB + item.totalWagerAmountCasino)}
              </TableData>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Parent>
    </StyledTable>
  );
};
