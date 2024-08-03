import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table/Table';

describe('Table Compoennt', () => {
  it('should render a table tag', () => {
    render(
      <Table>
        <Table.Parent>
          <Table.Body></Table.Body>
        </Table.Parent>
      </Table>
    );

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
  it('should render a tbody(table body) tag', () => {
    render(
      <Table>
        <Table.Parent>
          <Table.Body></Table.Body>
        </Table.Parent>
      </Table>
    );

    const tableElement = screen.getByRole('rowgroup', {});
    expect(tableElement).toBeInTheDocument();
  });
  it('should render 2 tr(table row) tag', () => {
    render(
      <Table>
        <Table.Parent>
          <Table.Body>
            <Table.Row></Table.Row>
            <Table.Row></Table.Row>
          </Table.Body>
        </Table.Parent>
      </Table>
    );

    const tableElement = screen.getAllByRole('row');
    expect(tableElement.length).toBe(2);
  });
  it('should render a th(table header) tag with "Header 1" text', () => {
    render(
      <Table>
        <Table.Parent>
          <Table.Body>
            <Table.Row>
              <Table.Header>Header 1</Table.Header>
            </Table.Row>
          </Table.Body>
        </Table.Parent>
      </Table>
    );

    const tableElement = screen.getByRole('columnheader', { name: 'Header 1' });
    expect(tableElement).toBeInTheDocument();
  });

  it('should render a td(table data) tag with "Data 1" text', () => {
    render(
      <Table>
        <Table.Parent>
          <Table.Body>
            <Table.Row>
              <Table.Data>Data 1</Table.Data>
            </Table.Row>
          </Table.Body>
        </Table.Parent>
      </Table>
    );

    const tableElement = screen.getByRole('cell', { name: 'Data 1' });

    expect(tableElement).toBeInTheDocument();
  });
  it('should render 2 table header and 2 table data', () => {
    render(
      <Table>
        <Table.Parent>
          <Table.Body>
            <Table.Row>
              <Table.Header>Header 1</Table.Header>
              <Table.Header>Header 2</Table.Header>
            </Table.Row>
            <Table.Row>
              <Table.Data>Data 1</Table.Data>
              <Table.Data>Data 2</Table.Data>
            </Table.Row>
          </Table.Body>
        </Table.Parent>
      </Table>
    );
    const thElement = screen.getAllByRole('columnheader');
    const tdElement = screen.getAllByRole('cell');

    expect(thElement.length).toBe(2);
    expect(tdElement.length).toBe(2);
  });
});
