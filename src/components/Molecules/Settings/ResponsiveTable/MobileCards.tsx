import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardRow, CardValue, DataText, HeaderText } from './ResponsiveTable.styles';
import { DataProps, MobileCardsProps, RowData } from './ResponsiveTable.types';

const MobileCards: React.FC<MobileCardsProps> = ({ rows }) => {
  const { t } = useTranslations();
  return rows.map(({ rowStyles, rowData }: RowData, index) => (
    <Card key={`card-${index}`} className="card" rowStyles={rowStyles}>
      {rowData.map(({ label, value, dataStyles, actionButton }: DataProps, innerIndex) => (
        <CardRow
          key={`card-row-${label}-${index}-${innerIndex}`}
          className={`card-row card-row-${label}`}
        >
          {label && (
            <HeaderText className="card-label" size="b3">
              {t(label)}
            </HeaderText>
          )}
          <CardValue dataStyles={dataStyles}>
            {value && (
              <DataText className="card-value" size="b2">
                {value}
              </DataText>
            )}
            {actionButton}
          </CardValue>
        </CardRow>
      ))}
    </Card>
  ));
};

export default MobileCards;
