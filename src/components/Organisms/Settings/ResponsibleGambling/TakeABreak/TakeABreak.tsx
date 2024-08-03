import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import {
  SectionButton,
  SectionHeader,
  SectionButtonText
} from '@/components/Organisms/Settings/ResponsibleGambling/ResponsibleGambling.styles';
import useCustomToast from '@/hooks/useCustomToast';
import useLogout from '@/hooks/useLogout';
import { useMutation } from '@/hooks/useMutation';
import { useTranslations } from '@/hooks/useTranslations';
import { isMobileViewport } from '@/utils/gameUtils';
import { DURATION as duration } from '../ResponsibleGambling.constants';
import { updatePlayerTimeOut } from '../ResponsibleGambling.utils';
import {
  DayRanges,
  TakeABreakContainer,
  TakeABreakHeader,
  TakeABreakSectionDescription,
  Warning,
  WarningDescription,
  WarningHeader
} from './TakeABreak.styles';
import {
  convertUTCtoLocalAndFormat,
  getDayRangeName,
  getUTCFormattedDateTimeString
} from './TakeABreak.utils';

const CustomToast = dynamic(() =>
  import('@/components/Atoms/CustomToast/CustomToast').then((mod) => mod.CustomToast)
);
const DayRange = dynamic(() => import('@/components/Molecules/Settings/Range/Range'));
const SettingsConfirmation = dynamic(
  () => import('@/components/Organisms/Settings/Alert/SettingsConfirmation')
);

const TakeABreak = () => {
  const { t } = useTranslations();
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const { mutateAsync, isLoading } = useMutation({ fetcher: updatePlayerTimeOut });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { displayToast, toastProps } = useCustomToast();
  const { logout } = useLogout();

  const timeOutDurationInDays = [1, 3, 7];
  const isMobile = isMobileViewport();
  const excludedUntil = getUTCFormattedDateTimeString(selectedDuration);
  const localExclusionDate = convertUTCtoLocalAndFormat(excludedUntil);

  const handleOnConfirm = useCallback(async () => {
    if (!selectedDuration) {
      displayToast({ message: t('noDateSelected'), duration });
      return;
    }

    try {
      setShowConfirmationDialog(false);
      await mutateAsync({ excludedUntil });
      const message = `${t('playerTimeOutSuccess')} ${localExclusionDate}. ${t(
        'youWillBeLoggedOut'
      )}`;
      displayToast({ message, duration });
      setTimeout(() => logout(), duration);
    } catch (error) {
      displayToast({ message: t('playerTimeOutError'), duration });
    } finally {
      setSelectedDuration(null);
    }
  }, [
    selectedDuration,
    displayToast,
    t,
    setShowConfirmationDialog,
    mutateAsync,
    setSelectedDuration,
    logout
  ]);

  return (
    <>
      <TakeABreakContainer>
        <TakeABreakHeader>
          <SectionHeader size="b2" color="var(--darker-white)">
            {t('takeABreak')}
          </SectionHeader>

          <TakeABreakSectionDescription size={isMobile ? 'b3' : 'b2'} color="var(--soft-blue-100)">
            {t('takeABreakCaption')}
          </TakeABreakSectionDescription>
        </TakeABreakHeader>

        <DayRanges>
          {timeOutDurationInDays.map((duration) => (
            <DayRange
              customDefaultBg="var(--very-dark-des-violet)"
              key={`day-${duration}`}
              name={getDayRangeName({ duration, t })}
              onClick={() => setSelectedDuration(duration)}
              isActive={selectedDuration === duration}
            />
          ))}
        </DayRanges>

        <Warning>
          <WarningHeader size="b2" color="var(--darker-white)">
            {t('warning')}
          </WarningHeader>
          <WarningDescription size="b2" color="var(--darker-white)">
            {t('takeABreakWarning')}
          </WarningDescription>
        </Warning>

        <SectionButton
          disabled={!selectedDuration}
          handleClick={() => setShowConfirmationDialog(true)}
        >
          <SectionButtonText size="b2" color="var(--very-dark-violet)">
            {isLoading ? t('processing') : t('set')}
          </SectionButtonText>
        </SectionButton>
      </TakeABreakContainer>

      {showConfirmationDialog && (
        <SettingsConfirmation
          caption={`${t('confirmPlayerTimeOut')} ${localExclusionDate}. ${t('thisWillTakeEffect')}`}
          key={Math.random()}
          onConfirm={handleOnConfirm}
          onClose={() => setShowConfirmationDialog(false)}
        />
      )}

      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </>
  );
};

export default TakeABreak;
