import React from 'react';
import Table from '@/components/Atoms/Table/Table';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tabs from '@/components/Atoms/Tabs/Tabs';

export default {
  title: 'Table',
  component: Table
};

const mockData = [
  {
    date: '21 Oct 2022, 19:50',
    balance: '5,00',
    provider: 'EGT',
    status: 'Pending',
    action: 'Cancel',
    amount: '€ 500'
  },
  {
    date: '21 Oct 2022, 19:50',
    balance: '5,00',
    provider: 'EGT',
    status: 'Pending',
    action: 'Cancel',
    amount: '€ 500'
  },
  {
    date: '21 Oct 2022, 19:50',
    balance: '5,00',
    provider: 'EGT',
    status: 'Pending',
    action: 'Cancel',
    amount: '€ 500'
  }
];

const tabsOptions = [
  {
    label: 'Deposit',
    isActive: false,
    name: 'deposit'
  },
  {
    label: 'Withdrawals',
    isActive: true,
    name: 'withdrawals'
  }
];

const Title = styled('p')`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: var(--white);
  padding-bottom: 16px;
`;

const TableHeader = styled(Table.Header)`
  padding: unset;
`;

const TableDataM2 = styled(Table.Data)`
  padding: unset;
  text-align: right;
`;

const pendingStyle = css`
  color: var(--yellow-4);
`;

const linkCellM2 = css`
  text-align: center;
  padding: unset;
`;

const MobileTable = styled(Table)`
  background: none;
`;

const TableMobileParent = styled(Table.Parent)`
  border-spacing: unset;
  border-radius: 10px;
  padding: 12px;
  background: var(--very-dark-violet-3);
  margin-bottom: 24px;
`;

const HeaderContainer = styled('div')`
  padding: 16px 0px;
`;

const buttonStyle = css`
  background: none;
`;

export const TableModel2 = () => (
  <>
    <div style={{ color: 'var(--white)', marginBottom: '12px' }}>
      <h2>Desktop</h2>
    </div>
    <div style={{ width: '80%', background: 'var(--very-dark-violet-300)' }}>
      <Table>
        <HeaderContainer>
          <Title>Transactions</Title>
          <Tabs tabOptions={tabsOptions} tabOnclickHandler={(tabName: string) => alert(tabName)} />
        </HeaderContainer>
        <Table.Parent cellSpacing={0}>
          <Table.Body>
            <Table.Row>
              <Table.Header>Data & Time</Table.Header>
              <Table.Header>Amount</Table.Header>
              <Table.Header>Balance</Table.Header>
              <Table.Header>Provider Name</Table.Header>
              <Table.Header>Status</Table.Header>
              <Table.Header>Action</Table.Header>
            </Table.Row>
            {mockData.map((data, index) => {
              return (
                <Table.Row key={`data_m2_${index}`}>
                  <Table.Data>{data.date}</Table.Data>
                  <Table.Data>{data.amount}</Table.Data>
                  <Table.Data>{data.balance}</Table.Data>
                  <Table.Data>{data.provider}</Table.Data>
                  <Table.Data dataStyles={pendingStyle}>{data.status}</Table.Data>
                  <Table.Data onClick={() => alert('Cancel Action')}>{data.action}</Table.Data>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Parent>
      </Table>
    </div>

    <div style={{ color: 'var(--white)', margin: '24px 0px 12px 0px' }}>
      <h2>Mobile</h2>
    </div>
    <div style={{ width: '450px' }}>
      <MobileTable>
        <HeaderContainer>
          <Tabs
            tabOptions={tabsOptions}
            tabOnclickHandler={(tabName: string) => alert(tabName)}
            buttonStyle={buttonStyle}
          />
        </HeaderContainer>
        {mockData.map((data, index) => {
          return (
            <TableMobileParent cellSpacing={0} key={`data_m2_mobile_${index}`}>
              <Table.Body>
                <Table.Row>
                  <TableHeader>Data & Time</TableHeader>
                  <TableDataM2>{data.date}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Amount</TableHeader>
                  <TableDataM2>{data.amount}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Status</TableHeader>
                  <TableDataM2 dataStyles={pendingStyle}>{data.status}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <Table.Data
                    dataStyles={linkCellM2}
                    colspan={2}
                    onClick={() => alert('Cancel Mobile Action')}
                  >
                    {data.action}
                  </Table.Data>
                </Table.Row>
              </Table.Body>
            </TableMobileParent>
          );
        })}
      </MobileTable>
    </div>
  </>
);
