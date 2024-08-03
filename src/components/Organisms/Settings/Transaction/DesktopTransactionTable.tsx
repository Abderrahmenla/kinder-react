import React from 'react';
import {
  TableHeaderLabel,
  TransactionDataStatus,
  TransactionDataText,
  transactionDataRowStyle,
  transactionHeaderRowStyle
} from './Transaction.style';
import Table from '@/components/Atoms/Table/Table';
import { css } from '@emotion/react';
import { TransactionTableProps } from './Transaction.type';
import { headers } from './Transaction.constants';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import formatDate from '@/utils/formatUtils/formatDate';

const DesktopTransactionTable: React.FC<TransactionTableProps> = ({ t, transactionData }) => {
  return (
    <Table.Parent cellSpacing={0}>
      <Table.Body>
        <Table.Row dataStyles={transactionHeaderRowStyle}>
          {headers.map((header, index) => {
            return (
              <Table.Header
                key={`header-${index}`}
                headerStyles={
                  header === 'method'
                    ? css`
                        text-align: right;
                      `
                    : undefined
                }
              >
                <TableHeaderLabel size="b2">{t(header)}</TableHeaderLabel>
              </Table.Header>
            );
          })}
        </Table.Row>
        {transactionData.length > 0 &&
          transactionData.map((data, index) => {
            return (
              <Table.Row key={`data_${index}`} dataStyles={transactionDataRowStyle}>
                <Table.Data
                  dataStyles={css`
                    width: 15%;
                  `}
                >
                  <TransactionDataText size="b2">{formatDate(data.createTime)}</TransactionDataText>
                </Table.Data>
                <Table.Data
                  dataStyles={css`
                    width: 30%;
                  `}
                >
                  <TransactionDataText size="b2">
                    {`${data.id.slice(0, 23)}...`}
                  </TransactionDataText>
                </Table.Data>
                <TransactionDataStatus
                  status={data.status}
                  dataStyles={css`
                    width: 15%;
                  `}
                >
                  <TransactionDataText size="b2">{data.status}</TransactionDataText>
                </TransactionDataStatus>
                <Table.Data
                  dataStyles={css`
                    width: 20%;
                  `}
                >
                  <TransactionDataText size="b2">{formatCurrency(data.amount)}</TransactionDataText>
                </Table.Data>
                <Table.Data
                  dataStyles={css`
                    width: 20%;
                    text-align: right;
                  `}
                >
                  <TransactionDataText size="b2">{data.paymentInstrumentName}</TransactionDataText>
                </Table.Data>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table.Parent>
  );
};

export default DesktopTransactionTable;
