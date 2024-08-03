import {
  DataText,
  HeaderText
} from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable.styles';
import {
  DataProps,
  MobileCardsProps,
  RowData
} from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable.types';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContentWrapper, CardRow } from './LimitsTable.styles';

const LimitsCard: React.FC<MobileCardsProps> = ({ rows }) => {
  const { t } = useTranslations();
  return rows.map(({ rowStyles, rowData }: RowData, index) => (
    <Card key={`card-${index}`} className="card">
      <CardContentWrapper rowStyles={rowStyles}>
        {rowData.map(({ label, value, dataStyles, actionButton }: DataProps, innerIndex) => (
          <CardRow
            key={`card-row-${label}-${index}-${innerIndex}`}
            className={`card-row${label ? ` card-row-${label}` : ''}`}
          >
            {label && (
              <HeaderText className="card-label" size="b3">
                {t(label)}
              </HeaderText>
            )}
            {value && (
              <DataText className="card-value" size="b2" dataStyles={dataStyles}>
                {value}
              </DataText>
            )}
            {actionButton}
          </CardRow>
        ))}
      </CardContentWrapper>
    </Card>
  ));
};

export default LimitsCard;
