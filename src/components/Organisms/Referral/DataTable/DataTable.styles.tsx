import styled from '@emotion/styled';
import Table from '@/components/Atoms/Table/Table';

export const TableHeader = styled(Table.Header)`
  font-size: var(--font-size-14);
  padding: 11px 38px 12px 25px;
  font-weight: 600;

  &:last-child {
    text-align: right;
  }
  @media (max-width: 768px) {
    padding: 11px 12px 12px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 50px;
  }
`;

export const TableData = styled(Table.Data)`
  font-weight: 600;
  padding: 16px 28px;
  border-spacing: 0;
  &:last-child {
    text-align: right;
  }
  @media (max-width: 768px) {
    padding: 16px 12px;
  }
  @media (max-width: 350px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

export const StyledTable = styled(Table)`
  @media (max-width: 1290px) {
    padding: 0;
  }
  & table {
    border-spacing: 0;
    & tr {
      background: var(--very-dark-violet-300);
      &:nth-child(even) {
        background: var(--very-dark-violet-200);
        td:last-child {
          border: 1px solid transparent;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        td:first-child {
          border: 1px solid transparent;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
      }
    }
  }
`;
