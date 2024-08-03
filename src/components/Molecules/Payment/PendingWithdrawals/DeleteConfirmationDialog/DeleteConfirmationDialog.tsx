import React, { useCallback } from 'react';
import WarningIcon from '@/components/Atoms/Icons/WarningIcon';
import { ConfirmationAlert } from '@/components/Atoms/ConfirmationAlert';
import { deleteTransaction } from './DeleteConfirmationDialog.utils';
import { DeleteConfirmationProps } from './DeleteConfirmationDialog.types';

const DeleteConfirmationDialog: React.FC<DeleteConfirmationProps> = ({
  t,
  toggleLoader,
  transactionId,
  closeDialog,
  handleDeleteResult
}) => {
  const handleDeleteTransaction = useCallback(async () => {
    toggleLoader(true);
    const result: boolean = await deleteTransaction(transactionId);
    closeDialog();
    handleDeleteResult(result);
  }, [transactionId, handleDeleteResult]);

  return (
    <ConfirmationAlert
      key={Math.random()}
      title={t('areYouSure')}
      caption={t('deleteWithdrawalConfirmation')}
      isLoading={false}
      loaderType="coin"
      onClose={closeDialog}
      onConfirm={handleDeleteTransaction}
      IconComponent={<WarningIcon />}
    />
  );
};

export default DeleteConfirmationDialog;
