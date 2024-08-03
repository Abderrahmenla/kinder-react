import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useCustomToast from '@/hooks/useCustomToast';
import { useGetPlayerLimits } from '@/hooks/useGetPlayerLimits';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import ResponsiveTable from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable';
import {
  DataProps,
  RowData
} from '@/components/Molecules/Settings/ResponsiveTable/ResponsiveTable.types';
import { PlayerLimit } from '@/components/state/limitState';
import { DURATION as duration } from '../ResponsibleGambling.constants';
import { deleteLimit } from '../ResponsibleGambling.utils';
import { DESKTOP_LIMITS_HEADERS, MOBILE_LIMITS_HEADERS } from '../ResponsibleGambling.constants';
import { LimitsTableWrapper, headerStyles, rowStyles } from './LimitsTable.styles';
import { LimitStatus, SelectedLimit } from './LimitsTable.types';
import { createFormattedLimit, getFormattedData } from './LimitsTable.utils';

const CustomToast = dynamic(() =>
  import('@/components/Atoms/CustomToast/CustomToast').then((mod) => mod.CustomToast)
);

const LimitsCard = dynamic(
  () => import('@/components/Organisms/Settings/ResponsibleGambling/LimitsTable/LimitsCard')
);

const SettingsConfirmation = dynamic(
  () => import('@/components/Organisms/Settings/Alert/SettingsConfirmation')
);

const LimitsTable = () => {
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(1023);
  const { displayToast, toastProps } = useCustomToast();

  const selectedHeaders = isMobile ? MOBILE_LIMITS_HEADERS : DESKTOP_LIMITS_HEADERS;
  const { limits, fetchPlayerLimits, isLoading, loadingWrapper } = useGetPlayerLimits({ isMobile });
  // const { mutateAsync } = useMutation({ fetcher: updateLimit });

  const [selectedLimit, setSelectedLimit] = useState<SelectedLimit | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    fetchPlayerLimits();
  }, []);

  const handleOnClickDelete = useCallback(
    (limit: SelectedLimit) => {
      setShowConfirmationDialog(true);
      const formattedLimit = createFormattedLimit(limit);
      setSelectedLimit(formattedLimit);
    },
    [setShowConfirmationDialog, selectedLimit]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedLimit?.data.id) return;

    try {
      setShowConfirmationDialog(false);

      const { id, limitStatus } = selectedLimit.data;
      if (limitStatus === LimitStatus.pending) {
        await deleteLimit(id);
      } else {
        // const limitData = createZeroAmountLimitData(selectedLimit);
        // await mutateAsync(limitData);
      }

      await fetchPlayerLimits();
    } catch (error) {
      console.error(error);
      displayToast({ message: t('errorDeleteLimit'), duration });
    } finally {
      setSelectedLimit(null);
    }
  }, [selectedLimit, setShowConfirmationDialog, displayToast, fetchPlayerLimits]);

  const rows: RowData[] = useMemo(() => {
    const rowData: RowData[] = limits.map((playerLimit: PlayerLimit) => {
      const baseRowData: DataProps[] = selectedHeaders.map((header) =>
        getFormattedData({
          header,
          playerLimit,
          isMobile,
          handleOnClickDelete
        })
      );
      return {
        rowStyles: isMobile ? undefined : rowStyles,
        rowData: baseRowData
      };
    });

    return rowData;
  }, [limits, selectedHeaders, getFormattedData, isMobile]);

  if (limits.length === 0) return null;

  const { confirmation, formattedAmount, formattedTime } = selectedLimit ?? {
    confirmation: '',
    formattedAmount: '',
    formattedTime: ''
  };

  return (
    <>
      <LimitsTableWrapper>
        <ResponsiveTable
          isMobile={isMobile}
          isLoading={isLoading}
          loadingWrapper={loadingWrapper}
          count={limits.length}
          headers={selectedHeaders}
          rows={rows}
          headerStyles={headerStyles}
          customCard={<LimitsCard rows={rows} />}
        />
      </LimitsTableWrapper>
      {showConfirmationDialog && (
        <SettingsConfirmation
          caption={`${t(confirmation ?? '')} ${formattedAmount} ${formattedTime}.`}
          key={Math.random()}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowConfirmationDialog(false)}
        />
      )}
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </>
  );
};

export default LimitsTable;
