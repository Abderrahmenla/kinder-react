import React from 'react';
import Table from '@/components/Atoms/Table/Table';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export default {
  title: 'Table',
  component: Table
};

const mockData = [
  {
    game: 'Football',
    date: '21 Oct 2022, 19:50',
    bet: '500',
    result: {
      label: 'lose',
      amount: '-500'
    },
    betID: '1ww-843cz7-leu-rtx.hack1ww-843cz7-leu'
  },
  {
    game: 'Football',
    date: '21 Oct 2022, 19:50',
    bet: '500',
    result: {
      label: 'won',
      amount: '+500'
    },
    betID: '1ww-843cz7-leu-rtx.hack1ww-843cz7-leu'
  },
  {
    game: 'Football',
    date: '21 Oct 2022, 19:50',
    bet: '500',
    result: {
      label: 'lose',
      amount: '-500'
    },
    betID: '1ww-843cz7-leu-rtx.hack1ww-843cz7-leu'
  },
  {
    game: 'Football',
    date: '21 Oct 2022, 19:50',
    bet: '500',
    result: {
      label: 'lose',
      amount: '-500'
    },
    betID: '1ww-843cz7-leu-rtx.hack1ww-843cz7-leu'
  },
  {
    game: 'Football',
    date: '21 Oct 2022, 19:50',
    bet: '500',
    result: {
      label: 'won',
      amount: '+500'
    },
    betID: '1ww-843cz7-leu-rtx.hack1ww-843cz7-leu'
  }
];

const redBorderStyle = css`
  border-left: 1px solid red;
`;
const greenBorderStyle = css`
  border-left: 1px solid green;
`;
const alignRight = css`
  text-align: right;
`;

const MobileTable = styled(Table)`
  background: none;
`;

const TableHeader = styled(Table.Header)`
  padding: unset;
  padding-top: 6px;
`;

const TableDataM2 = styled(Table.Data)`
  padding: unset;
  text-align: right;
`;

const TableMobileParent = styled(Table.Parent)<{ $isWon: boolean }>`
  border-spacing: unset;
  border-radius: 10px;
  padding: 12px;
  background: var(--very-dark-violet-3);
  margin-bottom: 24px;
  border-left: 1px solid ${(props) => (props.$isWon ? 'var(--tealish-green)' : 'var(--pure-red)')};
`;

const redText = css`
  color: var(--pure-red);
`;

const greenText = css`
  color: var(--tealish-green);
`;

const HeaderContainer = styled('div')`
  padding: 16px 0px;
`;

const Title = styled('p')`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: var(--white);
  padding-bottom: 16px;
`;

export const TableModel4 = () => (
  <>
    <div style={{ color: 'var(--white)', marginBottom: '12px' }}>
      <h2>Desktop</h2>
    </div>
    <Table>
      <HeaderContainer>
        <Title>Bets History</Title>
      </HeaderContainer>
      <Table.Parent>
        <Table.Body>
          <Table.Row>
            <Table.Header>Game</Table.Header>
            <Table.Header>Date & Time</Table.Header>
            <Table.Header>Amount</Table.Header>
            <Table.Header>Result</Table.Header>
            <Table.Header headerStyles={alignRight}>ID</Table.Header>
          </Table.Row>
          {mockData.map((data, index) => {
            return (
              <Table.Row key={`data_m4_${index}`}>
                <Table.Data
                  dataStyles={data.result.label === 'won' ? greenBorderStyle : redBorderStyle}
                >
                  {data.game}
                </Table.Data>
                <Table.Data>{data.date}</Table.Data>
                <Table.Data>€ {data.bet}</Table.Data>
                <Table.Data dataStyles={data.result.label === 'won' ? greenText : redText}>
                  € {data.result.amount}
                </Table.Data>
                <Table.Data dataStyles={alignRight}>{data.betID}</Table.Data>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Parent>
    </Table>

    <div style={{ color: 'var(--white)', margin: '24px 0px 12px 0px' }}>
      <h2>Mobile</h2>
    </div>
    <div style={{ width: '450px' }}>
      <MobileTable>
        {mockData.map((data, index) => {
          return (
            <TableMobileParent
              cellSpacing={0}
              $isWon={data.result.label === 'won' ? true : false}
              key={`data_m4_mobile${index}`}
            >
              <Table.Body>
                <Table.Row>
                  <TableHeader>Game</TableHeader>
                  <TableDataM2>{data.game}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Data & Time</TableHeader>
                  <TableDataM2>{data.date}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Amount</TableHeader>
                  <TableDataM2>€ {data.bet}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Result</TableHeader>
                  <TableDataM2 dataStyles={data.result.label === 'won' ? greenText : redText}>
                    € {data.result.amount}
                  </TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>ID</TableHeader>
                  <TableDataM2>{data.betID}</TableDataM2>
                </Table.Row>
              </Table.Body>
            </TableMobileParent>
          );
        })}
      </MobileTable>
    </div>
  </>
);
