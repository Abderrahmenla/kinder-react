export interface DeleteConfirmationProps {
  t: (key: string) => string;
  toggleLoader: (loading: boolean) => void;
  transactionId: string | null;
  closeDialog: () => void;
  handleDeleteResult: (success: boolean) => void;
}
