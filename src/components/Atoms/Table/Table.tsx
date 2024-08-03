import React from 'react';
import {
  TableBodyProps,
  TableDataProps,
  TableHeaderProps,
  TableParentProps,
  TableProps,
  TableRowProps
} from './Table.type';
import {
  TableBody,
  TableContainer,
  TableData,
  TableElement,
  TableHeader,
  TableRow
} from './Table.style';

const Row = (props: TableRowProps) => {
  return (
    <TableRow dataStyles={props.dataStyles} invertedBackground={props.invertedBackground}>
      {props.children}
    </TableRow>
  );
};

const Header = (props: TableHeaderProps) => {
  return (
    <TableHeader className={props.className} headerStyles={props.headerStyles}>
      {props.children}
    </TableHeader>
  );
};

const Data = (props: TableDataProps) => (
  <TableData
    dataStyles={props.dataStyles}
    onClick={props.onClick}
    rowSpan={props.rowspan}
    colSpan={props.colspan}
    className={props.className}
  >
    {props.children}
  </TableData>
);

const Body = (props: TableBodyProps) => {
  return <TableBody className={props.className}>{props.children}</TableBody>;
};

const Parent = (props: TableParentProps) => {
  return (
    <TableElement cellSpacing={props.cellSpacing} className={props.className}>
      {props.children}
    </TableElement>
  );
};

const Table = (props: TableProps) => {
  return (
    <TableContainer
      mediaQueryPadding={props.mediaQueryPadding}
      showPadding={props.showPadding}
      className={props.className}
    >
      {props.children}
    </TableContainer>
  );
};

Table.Parent = Parent;
Table.Header = Header;
Table.Row = Row;
Table.Data = Data;
Table.Body = Body;

export default Table;
