import React from 'react';
import { TransactionTableProps } from './Transaction.type';
import {
  MobileTransactionTableBody,
  MobileTransactionTableContainer,
  MobileTransactionTableParent,
  TableHeaderLabel,
  TransactionDataStatus,
  TransactionDataText,
  firstColumnStyle,
  secondColumnStyle
} from './Transaction.style';
import Table from '@/components/Atoms/Table/Table';
import { SerializedStyles } from '@emotion/react';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import formatDate from '@/utils/formatUtils/formatDate';

interface CellProps {
  label: string;
  styling: SerializedStyles;
}

const TransactionTableHeader: React.FC<CellProps> = ({ label, styling }) => {
  return (
    <Table.Header headerStyles={styling}>
      <TableHeaderLabel size="b2">{label}</TableHeaderLabel>
    </Table.Header>
  );
};

const TransactionTableData: React.FC<CellProps> = ({ label, styling }) => {
  return (
    <Table.Data dataStyles={styling}>
      <TransactionDataText size="b2">{label}</TransactionDataText>
    </Table.Data>
  );
};

const MobileTransactionTable: React.FC<TransactionTableProps> = ({ t, transactionData }) => {
  return (
    <>
      {transactionData.map((data, index) => {
        return (
          <MobileTransactionTableContainer
            key={`card-${index}`}
            mediaQueryPadding="0px"
            showPadding
          >
            <MobileTransactionTableParent cellSpacing={0}>
              <MobileTransactionTableBody>
                <Table.Row>
                  <TransactionTableHeader label={t('dateTime')} styling={firstColumnStyle} />
                  <TransactionTableHeader label={t('id')} styling={secondColumnStyle} />
                </Table.Row>
                <Table.Row>
                  <TransactionTableData
                    label={formatDate(data.createTime)}
                    styling={firstColumnStyle}
                  />
                  <TransactionTableData
                    label={`${data.id.slice(0, 18)}...`}
                    styling={secondColumnStyle}
                  />
                </Table.Row>
              </MobileTransactionTableBody>

              <MobileTransactionTableBody>
                <TransactionTableHeader label={t('status')} styling={firstColumnStyle} />
                <TransactionTableHeader label={t('amount')} styling={secondColumnStyle} />
                <Table.Row>
                  <TransactionDataStatus status={data.status} dataStyles={firstColumnStyle}>
                    <TransactionDataText size="b2">{data.status}</TransactionDataText>
                  </TransactionDataStatus>
                  <TransactionTableData
                    label={formatCurrency(data.amount)}
                    styling={secondColumnStyle}
                  />
                </Table.Row>
              </MobileTransactionTableBody>

              <Table.Body>
                <Table.Row>
                  <TransactionTableHeader label={t('method')} styling={firstColumnStyle} />
                </Table.Row>
                <Table.Row>
                  <TransactionTableData
                    label={data.paymentInstrumentName}
                    styling={firstColumnStyle}
                  />
                </Table.Row>
              </Table.Body>
            </MobileTransactionTableParent>
          </MobileTransactionTableContainer>
        );
      })}
    </>
  );
};

export default MobileTransactionTable;
