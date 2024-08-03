import { IPiqCashierConfig, Environment } from 'paymentiq-cashier-bootstrapper';
import { GenerateCashierConfigProps } from './Cashier.types';

export const generateLocalConfig = ({
  userId,
  sessionId,
  method,
  locale
}: GenerateCashierConfigProps): IPiqCashierConfig => ({
  merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID as string,
  userId,
  sessionId,
  environment: process.env.NEXT_PUBLIC_PAYMENTIQ_ENVIRONMENT as Environment,
  defaultLoader: 'true',
  tabs: false,
  pendingTxHeader: false,
  showAccounts: 'inline',
  fetchConfig: 'true',
  containerHeight: '100%',
  containerWidth: '100%',
  method,
  globalSubmit: false,
  receiptBackBtn: true,
  locale,
  allowMobilePopup: true
});
