import React from 'react';
import Table from '@/components/Atoms/Table/Table';
import styled from '@emotion/styled';
import Pagination from '@/components/Atoms/Pagination/Pagination';

export default {
  title: 'Table',
  component: Table
};

const mockData = [
  {
    browser: 'Safari',
    location: 'Somewhere, US',
    ipAddress: '23.01,222.678',
    last_update: '20 min ago'
  },
  {
    browser: 'Safari',
    location: 'Somewhere, US',
    ipAddress: '23.01,222.678',
    last_update: '20 min ago'
  },
  {
    browser: 'Safari',
    location: 'Somewhere, US',
    ipAddress: '23.01,222.678',
    last_update: '20 min ago'
  }
];

const Title = styled('p')`
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
`;

const TableDataM2 = styled(Table.Data)`
  padding: unset;
  text-align: right;
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

const PaginationComponent = styled(Pagination)`
  justify-content: end;
`;

export const TableModel3 = () => (
  <>
    <div style={{ color: 'var(--white)', marginBottom: '12px' }}>
      <h2>Desktop</h2>
    </div>
    <div style={{ width: '80%', background: 'var(--very-dark-violet-300)' }}>
      <Table>
        <HeaderContainer>
          <Title>Log History</Title>
        </HeaderContainer>
        <Table.Parent cellSpacing={0}>
          <Table.Body>
            <Table.Row>
              <Table.Header>Browser</Table.Header>
              <Table.Header>Location</Table.Header>
              <Table.Header>IP</Table.Header>
              <Table.Header>Last Update</Table.Header>
            </Table.Row>
            {mockData.map((data, index) => {
              return (
                <Table.Row key={`data_m3_${index}`}>
                  <Table.Data>{data.browser}</Table.Data>
                  <Table.Data>{data.location}</Table.Data>
                  <Table.Data>{data.ipAddress}</Table.Data>
                  <Table.Data>{data.last_update}</Table.Data>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Parent>
        <PaginationComponent pages={5} onClick={() => null} />
      </Table>
    </div>

    <div style={{ color: 'var(--white)', margin: '24px 0px 12px 0px' }}>
      <h2>Mobile</h2>
    </div>
    <div style={{ width: '450px' }}>
      <MobileTable>
        {mockData.map((data, index) => {
          return (
            <TableMobileParent cellSpacing={0} key={`data_m3_mobile_${index}`}>
              <Table.Body>
                <Table.Row>
                  <TableHeader>Browser</TableHeader>
                  <TableDataM2>{data.browser}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Location</TableHeader>
                  <TableDataM2>{data.location}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>IP</TableHeader>
                  <TableDataM2>{data.ipAddress}</TableDataM2>
                </Table.Row>
                <Table.Row>
                  <TableHeader>Last Used</TableHeader>
                  <TableDataM2>{data.last_update}</TableDataM2>
                </Table.Row>
              </Table.Body>
            </TableMobileParent>
          );
        })}
        <PaginationComponent pages={5} onClick={() => null} />
      </MobileTable>
    </div>
  </>
);
