import Table from '@/components/Atoms/Table/Table';
import { TableRow } from '@/components/Atoms/Table/Table.style';
import { useTranslations } from '@/hooks/useTranslations';
import { DesktopTableProps, RowData } from './ResponsiveTable.types';
import { HeaderText, DataText, StyledTable } from './ResponsiveTable.styles';

const DesktopTable: React.FC<DesktopTableProps> = ({ headers, headerStyles, rows }) => {
  const { t } = useTranslations();
  return (
    <StyledTable cellSpacing={0}>
      <thead>
        <TableRow dataStyles={headerStyles}>
          {headers.map((header) => (
            <Table.Header key={`table-header-${header}`} className={`table-header-${header}`}>
              <HeaderText size="b3">{t(header)}</HeaderText>
            </Table.Header>
          ))}
        </TableRow>
      </thead>
      <Table.Body>
        {rows.map(({ rowStyles, rowData }: RowData, index) => (
          <Table.Row key={`table-row-${index}`} dataStyles={rowStyles}>
            {rowData.map(({ dataStyles, value, actionButton }, innerIndex) => {
              return (
                <Table.Data
                  key={`table-data-${headers[innerIndex]}-${index}-${innerIndex}`}
                  className={`table-data table-data-${headers[innerIndex]}`}
                  dataStyles={dataStyles}
                >
                  <DataText size="b2">{value || ''}</DataText>
                  {actionButton}
                </Table.Data>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </StyledTable>
  );
};

export default DesktopTable;
