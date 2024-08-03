import { useCallback, useEffect } from 'react';
import { IPiqCashierApiMethods } from 'paymentiq-cashier-bootstrapper';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useTrackingContext } from 'src/providers/TrackingProvider';
import { authState } from '@/state/isAuthenticated';
import { firstTimeDepState } from '@/state/isFirstTimeDeposit';
import { paymentIQLoadingState } from '@/state/paymentIQLoadingState';
import { showPendingWithdrawalsNotifState } from '@/state/payment/pendingWithdrawals/showPendingWithdrawalsNotifState';
import { CashierProps, PiqCashierSuccessData, CashierMethod } from './Cashier.types';
import { generateLocalConfig } from './Cashier.utils';
import { localeState } from '@/components/state/localeState';
import { useAccountBalance } from '@/hooks/useGetBalance';

const Cashier: React.FC<CashierProps> = ({ method }) => {
  const setLoading = useSetRecoilState(paymentIQLoadingState);
  const firstTimeDeposit = useRecoilValue(firstTimeDepState);
  const { refresh: fetchAccountBalance } = useAccountBalance();
  const { handleTrackUserDeposit, handleTrackFirstUserDeposit } = useTrackingContext();
  const { playerId, token } = useRecoilValue(authState);
  const [showPendingWithdrawalNotifs, setShowPendingWithdrawalsNotif] = useRecoilState(
    showPendingWithdrawalsNotifState
  );
  const locale = useRecoilValue(localeState);

  const handleSuccess = useCallback(
    (data: PiqCashierSuccessData) => {
      const { method: dataMethod, txAmount, txAmountCy } = data.data.payload;

      if (dataMethod === CashierMethod.deposit) {
        const trackFunction = firstTimeDeposit
          ? handleTrackFirstUserDeposit
          : handleTrackUserDeposit;
        trackFunction({ currency: txAmountCy, value: txAmount });
      } else if (dataMethod === CashierMethod.withdrawal && !showPendingWithdrawalNotifs) {
        setShowPendingWithdrawalsNotif(true);
      }
      fetchAccountBalance();
    },
    [
      firstTimeDeposit,
      handleTrackFirstUserDeposit,
      handleTrackUserDeposit,
      showPendingWithdrawalNotifs
    ]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = generateLocalConfig({
        userId: playerId as string,
        sessionId: token as string,
        method,
        locale: locale.replace('-', '_')
      });

      new window._PaymentIQCashier('#cashier', config, (api: IPiqCashierApiMethods) => {
        api.on({
          success: handleSuccess,
          validationFailed: (data: any) => console.error(data),
          doneLoading: () => setLoading(false),
          failure: (data: any) => console.error(data)
        });
        api.css(`
          .floating-btn-container {
            display: none !important;
          }

          .footer {
            height: unset !important;
          }

          .list-payment-methods .flex-container {
            margin-top: 0px !important;
            gap: 8px !important;
            justify-content: space-between !important;
          }

          .card.flex-item {
            margin: 0 !important;
            width: calc(49vw - 2px) !important;
            border-radius: 6px !important;
          }
        `);
      });

      return () => {
        if (window._PaymentIQCashier) window._PaymentIQCashierReset();
      };
    }
  }, [playerId, token, method, locale, handleSuccess, setLoading]);

  return <div id="cashier" style={{ width: '100%', height: '100%' }} />;
};

export default Cashier;
