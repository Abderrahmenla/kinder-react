import styled from '@emotion/styled';
import { TableDataProps, TableHeaderProps, TableRowProps } from './Table.type';
import { css } from '@emotion/react';

export const TableContainer = styled('div')<{ showPadding?: boolean; mediaQueryPadding?: string }>`
  background: var(--very-dark-violet-300);
  padding: ${(props) => (props.showPadding ? '16px' : '0px')};
  color: white;
  @media (max-width: 1290px) {
    padding-left: ${(props) => props.mediaQueryPadding || 'inherit'};
    padding-right: ${(props) => props.mediaQueryPadding || 'inherit'};
  }
`;

export const TableRow = styled('tr')<TableRowProps>`
  margin-bottom: 2px;
  background: ${(props) =>
    props.invertedBackground ? 'var(--very-dark-violet-300)' : 'var(--very-dark-violet-3)'};
  ${(props) => props.dataStyles};
`;
export const TableHeader = styled('th')<TableHeaderProps>`
  text-align: left;
  color: var(--soft-blue-100);
  padding: 16px;
  ${(props) => (props.headerStyles ? props.headerStyles : '')}
`;
export const TableData = styled('td')<TableDataProps>`
  color: var(--darker-white);
  text-align: left;
  padding: 16px;

  ${(props) =>
    props.onClick
      ? css`
          color: var(--pure-blue);
          text-decoration: underline;
          cursor: pointer;
        `
      : ''};

  ${(props) => (props.dataStyles ? props.dataStyles : '')}
`;

export const TableBody = styled('tbody')``;

export const TableElement = styled('table')`
  border-spacing: 0px 2px;
  width: 100%;
`;
