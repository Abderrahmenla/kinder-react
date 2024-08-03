import React from 'react';
import Table from '@/components/Atoms/Table/Table';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tabs from '@/components/Atoms/Tabs/Tabs';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import { themes } from '@storybook/theming';

export default {
  title: 'Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Table Documentation',
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Description>
            Table component is the component for rendering a customizable table.
          </Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>
            The structure of this component resembles that of a typical HTML table, but it utilizes
            compound components to represent tr, td, th, and tbody. As a result, the component lacks
            any storybook controls and solely relies on a children prop to display the table.
          </Description>
          <Subtitle>Compound Components and Arguments</Subtitle>
          <ol>
            <li>
              <b>Table.Parent</b>
              <ul>
                <li>Arguments - children(ReactNode), cellSpacing(number) className(string)</li>
              </ul>
            </li>
            <li>
              <b>Table.Body</b>
              <ul>
                <li>Arguments - children(ReactNode)</li>
              </ul>
            </li>
            <li>
              <b>Table.Row</b>
              <ul>
                <li>Arguments - children(ReactNode), invertedBackground(boolean)</li>
              </ul>
            </li>
            <li>
              <b>Table.Header</b>
              <ul>
                <li>
                  Arguments - children(ReactNode), headerStyles(SerializedStyles), className(string)
                </li>
              </ul>
            </li>
            <li>
              <b>Table.Data</b>
              <ul>
                <li>
                  Arguments - children(ReactNode), dataStyles(SerializedStyles), rowspan(number),
                  colspan(number), className(string), onClick(callback function)
                </li>
              </ul>
            </li>
          </ol>
          <Canvas />
        </>
      )
    }
  }
};

const mockData = [
  {
    date: '21 Oct 2022, 19:50',
    currency: 'Euro',
    amount: '€ 500',
    method: 'VISA/Mastercard'
  },
  {
    date: '21 Oct 2022, 19:50',
    currency: 'Euro',
    amount: '€ 500',
    method: 'VISA/Mastercard'
  },
  {
    date: '21 Oct 2022, 18:50',
    currency: 'Euro',
    amount: '€ 500',
    method: 'VISA/Mastercard'
  }
];

const tabOptions = [
  {
    label: 'Deposit',
    isActive: true,
    name: 'deposit'
  },
  {
    label: 'Withdrawals',
    isActive: false,
    name: 'withdrawals'
  }
];

const alignRight = css`
  text-align: right;
`;

const TableTitle = styled('p')`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: var(--white);
  padding-bottom: 16px;
`;

const MobileTable = styled(Table)`
  background: none;
`;

const TableHeader = styled(Table.Header)`
  padding: unset;
  padding-top: 6px;
`;

const TableData = styled(Table.Data)`
  padding: unset;
`;

const HeaderContainer = styled('div')`
  padding: 16px 0px;
`;

const MobileTableParent = styled(Table.Parent)`
  border-spacing: unset;
  border-radius: 10px;
  padding: 12px;
  background: var(--very-dark-violet-3);
  margin-bottom: 24px;
`;

const buttonStyle = css`
  background: none;
`;

export const TableModel1 = () => {
  return (
    <>
      <div style={{ color: 'var(--white)', marginBottom: '12px' }}>
        <h2>Desktop</h2>
      </div>
      <div style={{ width: '80%', background: 'var(--very-dark-violet)' }}>
        <Table>
          <HeaderContainer>
            <TableTitle>Transactions</TableTitle>
            <Tabs
              tabOptions={tabOptions}
              tabOnclickHandler={(filterName: string) => alert(filterName)}
            />
          </HeaderContainer>

          <Table.Parent cellSpacing={0}>
            <Table.Body>
              <Table.Row>
                <Table.Header>Data & Time</Table.Header>
                <Table.Header>Currency</Table.Header>
                <Table.Header>Amount</Table.Header>
                <Table.Header headerStyles={alignRight}>Method</Table.Header>
              </Table.Row>
              {mockData.map((data, index) => {
                return (
                  <Table.Row key={`data_${index}`}>
                    <Table.Data>{data.date}</Table.Data>
                    <Table.Data>{data.currency}</Table.Data>
                    <Table.Data>{data.amount}</Table.Data>
                    <Table.Data dataStyles={alignRight}>{data.method}</Table.Data>
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
      <div style={{ width: '450px', background: 'var(--very-dark-violet)' }}>
        <MobileTable>
          <HeaderContainer>
            <Tabs
              tabOptions={tabOptions}
              tabOnclickHandler={(filterName: string) => alert(filterName)}
              buttonStyle={buttonStyle}
            />
          </HeaderContainer>
          {mockData.map((data, index) => {
            return (
              <MobileTableParent cellSpacing={0} key={`data_mobile_${index}`}>
                <Table.Body>
                  <Table.Row>
                    <TableHeader>Data & Time</TableHeader>
                    <TableHeader headerStyles={alignRight}>Currency</TableHeader>
                  </Table.Row>
                  <Table.Row>
                    <TableData>{data.date}</TableData>
                    <TableData dataStyles={alignRight}>{data.currency}</TableData>
                  </Table.Row>
                  <Table.Row>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader headerStyles={alignRight}>Method</TableHeader>
                  </Table.Row>
                  <Table.Row>
                    <TableData>{data.amount}</TableData>
                    <TableData dataStyles={alignRight}>{data.method}</TableData>
                  </Table.Row>
                </Table.Body>
              </MobileTableParent>
            );
          })}
        </MobileTable>
      </div>
    </>
  );
};
