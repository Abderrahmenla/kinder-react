import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import PaymentBackButton from '@/components/Molecules/Payment/PaymentBackButton/PaymentBackButton';
import {
  LocalePiqTransactionMethod,
  LocalePiqTransactionStatus,
  PiqTransactionStatus
} from '@/hooks/constants/payments/piqTransactions';
import { PiqTransaction } from '@/hooks/types/payments/piqTransactions';
import { useLoader } from '@/hooks/useLoader';
import useCustomToast from '@/hooks/useCustomToast';
import { useGetPendingWithdrawals } from '@/hooks/payments/useGetPendingWithdrawals';
import { showPendingWithdrawalsNotifState } from '@/state/payment/pendingWithdrawals/showPendingWithdrawalsNotifState';
import {
  Card,
  CardsWrapper,
  PendingWithdrawalsScrollbar,
  StyledButton,
  StyledButtonText
} from './PendingWithdrawals.style';
import { PendingWithdrawalProps, PendingWithdrawalState } from './PendingWithdrawals.types';
import { filterWithdrawalsById, getToastMessage } from './PendingWithdrawals.utils';

const CardData = dynamic(
  () => import('@/components/Organisms/Payment/PendingWithdrawals/PendingWithdrawalsCardData')
);

const CustomToast = dynamic(() =>
  import('@/components/Atoms/CustomToast/CustomToast').then((mod) => mod.CustomToast)
);

const DeleteConfirmationDialog = dynamic(
  () =>
    import(
      '@/components/Molecules/Payment/PendingWithdrawals/DeleteConfirmationDialog/DeleteConfirmationDialog'
    )
);

export const DEFAULT_WITHDRAWAL_STATE = {
  showDialog: false,
  transactionId: null
};

const PendingWithdrawals: React.FC<PendingWithdrawalProps> = ({ t, onClickBack }) => {
  const {
    toggleLoader: toggleDeletionLoader,
    isLoading: isProcessingDeletion,
    loadingWrapper
  } = useLoader('coin');
  const {
    arePendingWithdrawalsLoading,
    pendingWithdrawals,
    setPendingWithdrawals,
    fetchPendingWithdrawals
  } = useGetPendingWithdrawals();
  const setShowPendingWithdrawalsNotif = useSetRecoilState(showPendingWithdrawalsNotifState);
  const [{ showDialog, transactionId }, setLocalState] =
    useState<PendingWithdrawalState>(DEFAULT_WITHDRAWAL_STATE);
  const { toastProps, displayToast } = useCustomToast();

  const handleClickCancelButton = useCallback(
    (id: string) => setLocalState({ showDialog: true, transactionId: id }),
    [setLocalState, transactionId]
  );

  const handleCloseDialog = useCallback(
    () => setLocalState(DEFAULT_WITHDRAWAL_STATE),
    [setLocalState]
  );

  const updateLocalWithdrawals = useCallback(() => {
    if (transactionId) {
      const filteredWithdrawals = filterWithdrawalsById(pendingWithdrawals, transactionId);
      setPendingWithdrawals(filteredWithdrawals);

      if (filteredWithdrawals.length === 0) {
        setShowPendingWithdrawalsNotif(false);
        setTimeout(() => onClickBack(), 1500);
      }
    }
  }, [
    transactionId,
    pendingWithdrawals,
    setPendingWithdrawals,
    setShowPendingWithdrawalsNotif,
    onClickBack
  ]);

  const handleDeleteResult = useCallback(
    (success: boolean) => {
      const { message, type } = getToastMessage(success);
      updateLocalWithdrawals();
      toggleDeletionLoader(false);
      displayToast({
        message: t(message),
        type,
        duration: 1500
      });
    },
    [updateLocalWithdrawals, displayToast]
  );

  useEffect(() => {
    fetchPendingWithdrawals();
  }, []);

  return (
    <>
      <PaymentBackButton label={t('pendingWithdrawals')} onClick={onClickBack} />
      <PendingWithdrawalsScrollbar>
        {arePendingWithdrawalsLoading || isProcessingDeletion ? (
          loadingWrapper
        ) : (
          <CardsWrapper>
            {pendingWithdrawals?.map(
              ({ created, transactionId: id, amount, txType }: PiqTransaction) => (
                <Card key={`transactionId-${id}`}>
                  <CardData label={t('dateAndTime')} value={created} />
                  <CardData label={t('id')} value={id} alignRight />
                  <CardData
                    label={t('status')}
                    value={LocalePiqTransactionStatus.get(PiqTransactionStatus.waitingApproval)}
                    color="var(--yellow-4)"
                  />
                  <CardData label={t('amount')} value={amount} alignRight />
                  <CardData
                    label={t('method')}
                    value={LocalePiqTransactionMethod.get(txType) ?? txType}
                    fullWidth
                    lastItem
                  />
                  <StyledButton
                    type="button"
                    size="Large"
                    variant="Secondary"
                    handleClick={() => handleClickCancelButton(id)}
                  >
                    <StyledButtonText size="b2" type="Heading" color="var(--soft-blue-100)">
                      {t('cancel')}
                    </StyledButtonText>
                  </StyledButton>
                </Card>
              )
            )}
          </CardsWrapper>
        )}
      </PendingWithdrawalsScrollbar>

      {!isProcessingDeletion && showDialog && (
        <DeleteConfirmationDialog
          key={Math.random()}
          t={t}
          toggleLoader={toggleDeletionLoader}
          transactionId={transactionId}
          closeDialog={handleCloseDialog}
          handleDeleteResult={handleDeleteResult}
        />
      )}
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </>
  );
};

export default PendingWithdrawals;
