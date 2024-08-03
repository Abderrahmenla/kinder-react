import dynamic from 'next/dynamic';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Switcher from '@/components/Atoms/Switcher/Switcher';
import { ActiveWallet, activeWalletState } from '@/components/state/payment/activeWalletState';
import { useGetPendingWithdrawals } from '@/hooks/payments/useGetPendingWithdrawals';
import { showPendingWithdrawalsNotifState } from '@/state/payment/pendingWithdrawals/showPendingWithdrawalsNotifState';
import { SWITCHER_HEIGHT } from '@/components/Templates/Payment/Payment.constants';
import { SwitcherWrapper, WalletContainer } from './Wallet.styles';

const DepositMethods = dynamic(
  () => import('@/components/Organisms/Payment/Deposit/DepositMethods')
);
const Crypto = dynamic(() => import('@/components/Organisms/Payment/Deposit/Crypto/index'));
const Fiat = dynamic(() => import('@/components/Organisms/Payment/Fiat/Fiat'));
const Withdraw = dynamic(() => import('@/components/Organisms/Payment/Withdraw/Withdraw'));
const PendingWithdrawals = dynamic(
  () => import('@/components/Organisms/Payment/PendingWithdrawals/PendingWithdrawals')
);
const PendingWithdrawalsInfo = dynamic(
  () =>
    import(
      '@/components/Molecules/Payment/PendingWithdrawals/PendingWithdrawalsInfo/PendingWitdrawalsInfo'
    )
);
const PendingWithdrawalsTextButton = dynamic(
  () =>
    import(
      '@/components/Molecules/Payment/PendingWithdrawals/PendingWithdrawalsTextButton/PendingWithdrawalsTextButton'
    )
);

const Wallet = ({ t }: { t: (key: string) => string }) => {
  const [activeWallet, setActiveWallet] = useRecoilState(activeWalletState);
  const showPendingNotifs = useRecoilValue(showPendingWithdrawalsNotifState);
  const { pendingWithdrawals, fetchPendingWithdrawals } = useGetPendingWithdrawals();

  const handleSetActiveWallet = useCallback((selectedWallet: ActiveWallet) => {
    setActiveWallet((state) => ({ previous: state.current, current: selectedWallet }));
  }, []);

  const handleSwitchTab = useCallback(
    (index: number) => {
      handleSetActiveWallet(index ? ActiveWallet.withdraw : ActiveWallet.deposit);
      if (pendingWithdrawals?.length === 0 && !showPendingNotifs) {
        fetchPendingWithdrawals();
      }
    },
    [pendingWithdrawals, showPendingNotifs]
  );

  const handleViewPending = useCallback(() => handleSetActiveWallet(ActiveWallet.pending), []);

  const handleClickBack = useCallback(
    () => handleSetActiveWallet(activeWallet.previous),
    [activeWallet]
  );

  const hasNotifs = useMemo(
    () =>
      showPendingNotifs &&
      [ActiveWallet.deposit, ActiveWallet.withdraw].includes(activeWallet.current),
    [showPendingNotifs, activeWallet.current]
  );

  const selectedWallet = useMemo(() => {
    switch (activeWallet.current) {
      case ActiveWallet.deposit:
        return <DepositMethods onClick={handleSetActiveWallet} />;
      case ActiveWallet.fiat:
        return <Fiat onClickBack={handleClickBack} />;
      case ActiveWallet.crypto:
        return <Crypto onClickBack={handleClickBack} />;
      default:
        return <Withdraw hasPending={showPendingNotifs} />;
    }
  }, [activeWallet]);

  return activeWallet.current === ActiveWallet.pending ? (
    <PendingWithdrawals t={t} onClickBack={handleClickBack} />
  ) : (
    <WalletContainer>
      <SwitcherWrapper>
        <Switcher
          handleToggle={handleSwitchTab}
          options={[{ title: t('deposit') }, { title: t('withdraw') }]}
          tabSwitcherStyles={{ height: SWITCHER_HEIGHT, overflow: 'hidden' }}
          initialActiveButton={Number(activeWallet.current === ActiveWallet.withdraw)}
        />
      </SwitcherWrapper>
      {hasNotifs && <PendingWithdrawalsInfo onClick={handleViewPending} t={t} />}
      {selectedWallet}
      {hasNotifs && <PendingWithdrawalsTextButton onClick={handleViewPending} t={t} />}
    </WalletContainer>
  );
};

export default Wallet;
