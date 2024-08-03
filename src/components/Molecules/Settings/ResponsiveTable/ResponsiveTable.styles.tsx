import styled from '@emotion/styled';
import Pagination from '@/components/Atoms/Pagination/Pagination';
import Table from '@/components/Atoms/Table/Table';
import Typography from '@/components/Atoms/Typography/Typography';
import { SerializedStyles } from '@emotion/react';
import { DataTextProps } from './ResponsiveTable.types';

export const HeaderText = styled(Typography)({
  span: {
    fontWeight: '400',
    lineHeight: 'var(--l-height-16)',
    color: 'var(--soft-blue-100)'
  }
});

export const DataText = styled(Typography)<DataTextProps>(({ dataStyles }) => ({
  '& span': {
    fontWeight: '400',
    color: 'var(--darker-white)'
  },
  ...dataStyles
}));

export const StyledTable = styled(Table.Parent)({
  'thead th': {
    padding: '0px',
    height: '48px',

    '&:first-of-type': {
      padding: '0 16px'
    },
    '&:last-child': {
      textAlign: 'right',
      paddingRight: '16px',
      width: '-webkit-fill-available'
    }
  },

  'tbody tr td': {
    padding: '0px',
    height: '48px',

    '&:first-of-type': {
      paddingLeft: '16px'
    },
    '&:last-child': {
      textAlign: 'right',
      paddingRight: '16px',
      width: '-webkit-fill-available'
    }
  }
});

export const Card = styled('div')<{
  rowStyles: SerializedStyles | undefined;
}>`
  ${({ rowStyles }) => rowStyles}
  margin-bottom: 12px;
  border-radius: 12px;
  padding: 9px 12px;
  background: var(--very-dark-violet-5);
  height: fit-content;
`;

export const CardRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  height: '23px'
});

export const CardValue = styled('div')<{ dataStyles?: SerializedStyles }>`
  ${({ dataStyles }) => dataStyles};
`;

export const NoDataContainer = styled('div')({
  width: '100%',
  padding: '16px 0px',
  background: 'var(--very-dark-violet-3)',
  margin: '50% 0',
  '@media screen and (min-width: 769px)': {
    margin: '14px 0px 0px'
  }
});

export const NoDataText = styled(Typography)({
  textAlign: 'center',
  span: {
    color: 'var(--soft-blue-100)'
  }
});

export const Spacer = styled('div')<{ isMobile?: boolean }>`
  margin-bottom: ${({ isMobile }) => (isMobile ? 'unset' : '12px')};
`;

export const StyledPagination = styled(Pagination)<{ isMobile?: boolean }>`
  display: flex;
  justify-content: end;
  margin: 0 6px 0 0;
  height: 36px;
  background: ${({ isMobile }) => (isMobile ? 'var(--very-dark-violet-300)' : '')};
  gap: 10px;

  .pagination-previous-button {
    padding: 8px 5px;
  }

  .pagination-pages-container {
    display: flex;
    gap: 8px;
  }

  .pagination-page-button {
    font-size: var(--font-size-14);
    font-weight: 500;
    color: var(--darker-white);
    border-radius: 6px;
    padding: 8px 15px;
    height: 36px;
    width: 37px;
  }
`;
