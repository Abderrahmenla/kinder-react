import { useState } from 'react';
import dynamic from 'next/dynamic';
import Limit from '@/components/Molecules/Settings/Limit/Limit';
import useCustomToast from '@/hooks/useCustomToast';
import { useGetPlayerLimits } from '@/hooks/useGetPlayerLimits';
import { useMutation } from '@/hooks/useMutation';
import { useTranslations } from '@/hooks/useTranslations';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import { LimitType } from '../LimitsTable/LimitsTable.types';
import { DURATION as duration } from '../ResponsibleGambling.constants';
import { setLimit } from '../ResponsibleGambling.utils';
import {
  LIMIT_TEXT_MAPPING,
  LOCAL_TO_TIME_RANGE,
  TIME_RANGE_LOCAL
} from '../ResponsibleGambling.constants';

const CustomToast = dynamic(() =>
  import('@/components/Atoms/CustomToast/CustomToast').then((mod) => mod.CustomToast)
);
const SettingsConfirmation = dynamic(
  () => import('@/components/Organisms/Settings/Alert/SettingsConfirmation')
);

const DepositLimit = ({ limitType }: LimitType) => {
  const { t } = useTranslations();
  const [activeRange, setActiveRange] = useState(TIME_RANGE_LOCAL.daily);
  const { mutateAsync, isLoading } = useMutation({ fetcher: setLimit });
  const { displayToast, toastProps } = useCustomToast();
  const { fetchPlayerLimits } = useGetPlayerLimits();

  const [value, setValue] = useState<number | undefined>();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const {
    heading = '',
    description = '',
    confirmation = ''
  } = LIMIT_TEXT_MAPPING.get(limitType) ?? {};
  const caption = `${t(confirmation)} ${formatCurrency(value)} ${activeRange.toLowerCase()}.`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(event.target.value);
    setValue(num);
  };

  const handleOnSave = async () => {
    const limitData = {
      limit: {
        limitType,
        time: LOCAL_TO_TIME_RANGE.get(activeRange),
        amountValue: value,
        reason: 'From portal'
      }
    };

    try {
      setShowConfirmationDialog(false);
      await mutateAsync(limitData);
      displayToast({ message: t('limitSetSuccessfully'), duration });
      setValue(undefined);
      setActiveRange(TIME_RANGE_LOCAL.daily);
      await fetchPlayerLimits();
    } catch (error) {
      displayToast({ message: t('errorSettingLimit'), duration });
    }
  };

  return (
    <>
      <Limit
        heading={t(heading)}
        value={value}
        description={t(description)}
        handleChange={handleChange}
        activeRange={activeRange}
        setActiveRange={setActiveRange}
        handleOnSave={() => Number(value) && setShowConfirmationDialog(true)}
        isLoading={isLoading}
        limitType={limitType}
      />
      {showConfirmationDialog && (
        <SettingsConfirmation
          caption={caption}
          key={Math.random()}
          onConfirm={handleOnSave}
          onClose={() => setShowConfirmationDialog(false)}
        />
      )}
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </>
  );
};

export default DepositLimit;
