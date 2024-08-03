import { Box } from '@mui/material';
// import FormGroupButton from '@/components/Molecules/Auth/FormButton';
import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { useState } from 'react';
import { AxiosError } from 'axios';
import useCustomToast from '@/hooks/useCustomToast';
import { BonusConfirmation } from '@/components/Organisms/Rewards/alerts/BonusConfirmation';
import { BonusInvalidCode } from '@/components/Organisms/Rewards/alerts/InvalidCode';
import { BonusAlreadyActive } from '@/components/Organisms/Rewards/alerts/BonusAlreadyActive';
import { BonusActivated } from '@/components/Organisms/Rewards/alerts/BonusActivated';
import { apiClient } from 'src/services/clientAxios';
import { useMutation } from '@/hooks/useMutation';
import { useTranslations } from '@/hooks/useTranslations';
import { openPaymentPageState } from '@/components/state/openPaymentPageState';
import { useSetRecoilState } from 'recoil';
import { Button } from '../..';

const fetcher = async (body: { couponCode: string }) =>
  apiClient.post('/api/rewards/opt-in-bonus', body);

export const ActiveRewardButton = ({
  promotion,
  refetch,
  title,
  bottom,
  right,
  onViewConfirmation,
  onExitConfirmation,
  position
}: {
  promotion?: PlayerBonusesResponse;
  refetch: () => void;
  title?: string;
  width?: string;
  height?: string;
  onViewConfirmation?: () => void;
  onExitConfirmation?: () => void;
  bottom?: string;
  right?: string;
  position?: string;
}) => {
  const { t } = useTranslations();
  const { displayToast, toastProps } = useCustomToast();
  const { mutateAsync, isLoading } = useMutation({ fetcher });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showInvalidCodeAlert, setShowInvalidCodeAlert] = useState(false);
  const [showAlreadyActiveCodeAlert] = useState(false);
  const [showCodeActivated, setShowCodeActivated] = useState(false);
  const [error, setError] = useState('');
  const openPayment = useSetRecoilState(openPaymentPageState);

  const handleOpenConfirmationAlert = async () => {
    if (onViewConfirmation) onViewConfirmation();
    setShowConfirmationDialog(true);
  };

  const handleSubmit = async () => {
    if (!promotion) {
      setShowInvalidCodeAlert(true);
      displayToast({ duration: 3000, message: '' });
      return;
    }
    try {
      setShowConfirmationDialog(false);
      await mutateAsync({
        optInCode: promotion.optInCode
      });
      setShowCodeActivated(true);
      displayToast({ duration: 3000, message: '' });
      setTimeout(() => {
        refetch();
        openPayment({
          open: true
        });
      }, 3000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setShowInvalidCodeAlert(true);
        setError(error.response?.data?.errorMessage);
        displayToast({ duration: 3000, message: error.response?.data?.errorMessage });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          position: position || 'absolute',
          right: right || '0',
          bottom: bottom || '0'
        }}
      >
        <Button
          showIcon={false}
          handleClick={() => handleOpenConfirmationAlert()}
          variant="Secondary"
          style={{
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {isLoading ? `${t('activating')}...` : title || t('activate')}
        </Button>
      </Box>
      {showConfirmationDialog && (
        <BonusConfirmation
          key={Math.random()}
          onConfirm={handleSubmit}
          onClose={() => {
            setShowConfirmationDialog(false);
            if (onExitConfirmation) onExitConfirmation();
          }}
          caption={t('activeRewardConfirmationCaption')}
        />
      )}
      {toastProps && showInvalidCodeAlert && (
        <BonusInvalidCode key={Math.random()} duration={toastProps.duration} message={error} />
      )}

      {toastProps && showAlreadyActiveCodeAlert && (
        <BonusAlreadyActive key={Math.random()} duration={toastProps.duration} />
      )}

      {toastProps && showCodeActivated && (
        <BonusActivated key={Math.random()} duration={toastProps.duration} />
      )}
    </>
  );
};
