import { useTranslations } from '@/hooks/useTranslations';
import { NoDataContainer, NoDataText } from './ResponsiveTable.styles';

const NoDataFound = () => {
  const { t } = useTranslations();

  return (
    <NoDataContainer>
      <NoDataText size="b2">{t('noDataText')}</NoDataText>
    </NoDataContainer>
  );
};

export default NoDataFound;
