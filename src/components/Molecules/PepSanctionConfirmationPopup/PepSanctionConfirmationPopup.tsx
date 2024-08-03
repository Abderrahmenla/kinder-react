import ConfirmationPopup, {
  ConfirmationPopupButtonProps
} from '@/components/Atoms/ConfirmationPopup/ConfirmationPopup';
import { useTranslations } from '@/hooks/useTranslations';
import { useVerifyPlayer } from '@/hooks/useVerifyPlayer';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';
import { cancelButtonStyle } from './PepSanctionConfirmationPopup.style';

const PepSanctionConfirmationPopup: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated
}) => {
  const { t } = useTranslations();
  const router = useRouter();
  const {
    verifyPlayer,
    isSanctionedHandler,
    sanctionedPopupCaption,
    showPepSanctionedPopup,
    pepSanctionedStatus,
    setShowPepSanctionedPopup
  } = useVerifyPlayer();

  useEffect(() => {
    if (!pepSanctionedStatus && isAuthenticated) {
      verifyPlayer();
    }
  }, [pepSanctionedStatus, isAuthenticated, verifyPlayer]);

  useEffect(() => {
    if (
      pepSanctionedStatus &&
      (router.pathname.includes('/sports') || router.pathname.includes('/casino')) &&
      isAuthenticated
    ) {
      isSanctionedHandler('game');
    }
  }, [router.pathname, isSanctionedHandler, isAuthenticated, pepSanctionedStatus]);

  const uploadDocumentCallback = useCallback(() => {
    router.push('/settings/verification');
    setShowPepSanctionedPopup(false);
  }, [router, setShowPepSanctionedPopup]);

  const cancelButtonCallback = useCallback(() => {
    const isCasinoGamePage = router.pathname.includes('/casino/game');
    setShowPepSanctionedPopup(false);
    if (isCasinoGamePage) {
      router.push('/casino');
    }
  }, [router, setShowPepSanctionedPopup]);

  const confirmationButtons: ConfirmationPopupButtonProps[] = useMemo(() => {
    return [
      {
        label: t('cancel'),
        callback: cancelButtonCallback,
        buttonStyle: cancelButtonStyle,
        buttonVariant: 'Secondary'
      },
      {
        label: t('uploadDocument'),
        callback: uploadDocumentCallback,
        buttonVariant: 'Primary'
      }
    ];
  }, [t, uploadDocumentCallback, cancelButtonCallback]);

  return (
    <>
      {showPepSanctionedPopup && (
        <ConfirmationPopup
          type="warning"
          subtitle={
            sanctionedPopupCaption === 'game'
              ? t('documentsUploadRequiredForPlay')
              : t('documentUploadRequiredForDeposit')
          }
          buttons={confirmationButtons}
        />
      )}
    </>
  );
};

export default PepSanctionConfirmationPopup;
