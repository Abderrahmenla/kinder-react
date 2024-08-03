import { useMutation } from '@/hooks/useMutation';
import { Box, CircularProgress, Typography, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { BonusInvalidCode } from './alerts/InvalidCode';
import useCustomToast from '@/hooks/useCustomToast';
import { useTranslations } from '@/hooks/useTranslations';
import { BonusConfirmation } from './alerts/BonusConfirmation';
import { AxiosError } from 'axios';
import { BonusActivated } from './alerts/BonusActivated';

const Input = styled('input')<{ isError?: boolean }>(({ isError }) => ({
  backgroundColor: 'var(--very-dark-violet-70)',
  border: isError ? '1px solid var(--pure-red)' : '1px solid var(--very-dark-violet-6)',
  outline: 'var(--very-dark-violet-6)',
  padding: '10px 20px',
  borderTopLeftRadius: '6px',
  borderBottomLeftRadius: '6px',
  width: '100%',
  height: '48px',
  fontSize: '14px',
  color: '#fff',
  '::placeholder': {
    color: 'var(--mod-blue-200)',
    fontWeight: 500
  }
}));

const Button = styled('button')({
  backgroundColor: 'var(--very-dark-violet-6)',
  border: '1px solid var(--very-dark-violet-7)',
  outline: 'var(--very-dark-violet-6)',
  height: '40px',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  marginTop: '4px',
  padding: '10px 10px',
  cursor: 'pointer',
  color: '#fff',
  ':hover': {
    backgroundColor: 'var(--very-dark-violet-7)'
  }
});
const fetcher = async (body: { OptInCode: string }) =>
  apiClient.post('/api/rewards/opt-in-bonus', body);

export const PromoCode = ({ showBorder = true }: { showBorder?: boolean }) => {
  const { t } = useTranslations();
  const { displayToast, toastProps } = useCustomToast();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoCodeInputErroredOut, setIsPromoCodeInputErroredOut] = useState(false);
  const { mutateAsync, isLoading } = useMutation({ fetcher });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showInvalidCodeAlert, setShowInvalidCodeAlert] = useState(false);
  const [showCodeActivated, setShowCodeActivated] = useState(false);
  const [error, setError] = useState('');
  const handleOpenConfirmationAlert = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promoCode.trim().length === 0) {
      setIsPromoCodeInputErroredOut(true);
      return;
    }
    setIsPromoCodeInputErroredOut(false);
    setShowConfirmationDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setShowConfirmationDialog(false);
      await mutateAsync({ OptInCode: promoCode });
      setPromoCode('');
      setShowCodeActivated(true);
      displayToast({ duration: 3000, message: '' });
    } catch (error) {
      if (error instanceof AxiosError) {
        setShowInvalidCodeAlert(true);
        setError(error.response?.data.errorMessage);
        displayToast({ duration: 3000, message: '' });
        return;
      }
    }
  };

  return (
    <>
      <Box
        border={showBorder ? 1 : 0}
        borderColor={showBorder ? 'var(--very-dark-violet-7)' : 'transparent'}
        borderRadius={4}
      >
        <Typography fontWeight={600} color="white" fontSize={14}>
          {t('haveAPromoCode')}?
        </Typography>
        <form onSubmit={handleOpenConfirmationAlert}>
          <Box
            display="flex"
            sx={{
              marginTop: '10px',
              marginLeft: '-2px',
              position: 'relative'
            }}
          >
            <Input
              isError={isPromoCodeInputErroredOut}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              type="text"
              onFocus={() => setIsPromoCodeInputErroredOut(false)}
              onBlur={() => setIsPromoCodeInputErroredOut(promoCode.trim().length === 0)}
              placeholder={t('typeItHere')}
              style={{
                border: '1px solid var(--dark-violet)',
                borderRadius: '6px'
              }}
            />

            <Button
              style={{
                position: 'absolute',
                borderRadius: '6px',
                right: 4,
                width: '64px',
                fontSize: '14px',
                fontFamily: 'Inter'
              }}
              type="submit"
              disabled={isLoading || isPromoCodeInputErroredOut}
            >
              {isLoading ? <CircularProgress size="15px" /> : <>{t('send')}</>}
            </Button>
          </Box>
        </form>
      </Box>
      {showConfirmationDialog && (
        <BonusConfirmation
          key={Math.random()}
          onConfirm={handleSubmit}
          onClose={() => setShowConfirmationDialog(false)}
          caption={t('promoCodeConfirmationCaption')}
        />
      )}
      {toastProps && showInvalidCodeAlert && (
        <BonusInvalidCode message={error} key={Math.random()} duration={toastProps.duration} />
      )}

      {toastProps && showCodeActivated && (
        <BonusActivated key={Math.random()} duration={toastProps.duration} />
      )}
    </>
  );
};
