import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { openAuthPageState } from '@/components/state/openAuthPageState';
import { openPaymentPageState } from '@/components/state/openPaymentPageState';
import { openVIPPageState } from '@/components/state/openVIPPageState';
import { openRewardsModalState } from '@/components/state/openRewardsModalState';
import { CASHIER_URL, VIP_URL, REWARDS_URL, LOGIN_URL, REGISTRATION_URL } from '@/constants/index';
import { authState } from '@/components/state/isAuthenticated';

const DeepLinkingProvider: FC = () => {
  const router = useRouter();
  const setOpenAuthState = useSetRecoilState(openAuthPageState);
  const setOpenPaymentState = useSetRecoilState(openPaymentPageState);
  const setOpenVIPState = useSetRecoilState(openVIPPageState);
  const setOpenRewardsState = useSetRecoilState(openRewardsModalState);

  const { isAuthenticated } = useRecoilValue(authState);

  useEffect(() => {
    const handleDeepLink = () => {
      const queryParam = Object.keys(router.query)[0];
      const queryActions: Record<string, () => void> = {
        [CASHIER_URL]: () => {
          if (!isAuthenticated) {
            setOpenAuthState({ open: true });
          } else {
            setOpenPaymentState({ open: true });
          }
        },
        [VIP_URL]: () => {
          if (!isAuthenticated) {
            setOpenAuthState({ open: true });
          } else {
            setOpenVIPState({ open: true });
          }
        },
        [REWARDS_URL]: () => {
          if (!isAuthenticated) {
            setOpenAuthState({ open: true });
          } else {
            setOpenRewardsState({ open: true });
          }
        },
        [LOGIN_URL]: () => {
          if (!isAuthenticated) {
            setOpenAuthState({ open: true });
          }
        },
        [REGISTRATION_URL]: () => {
          if (!isAuthenticated) {
            setOpenAuthState({ open: true });
          }
        }
      };

      if (queryActions[queryParam]) {
        queryActions[queryParam]();
      }
    };

    const delayProviderDuration = 2000;
    const timer = setTimeout(handleDeepLink, delayProviderDuration);

    return () => clearTimeout(timer);
  }, [
    router.query,
    isAuthenticated,
    setOpenAuthState,
    setOpenPaymentState,
    setOpenVIPState,
    setOpenRewardsState
  ]);

  return null;
};

export default DeepLinkingProvider;
