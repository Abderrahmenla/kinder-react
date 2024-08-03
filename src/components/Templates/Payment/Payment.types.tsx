export interface PaymentModalProps {
  handleClosePayment?: () => void;
  open: boolean;
}

export interface PaymentHeader {
  t: (key: string) => string;
}
