import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavBarMenuContainer } from './NavBarStyles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccountBalance } from '@/hooks/useGetBalance';
import { apiClient } from 'src/services/clientAxios';
import { useMediaQuery } from '@mui/material';
import { rakebackState } from '@/components/state/rakeback';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import useCustomToast from '@/hooks/useCustomToast';
import { useGetLoyaltyDetails } from '@/hooks/useGetLoyalty';
import { openSearchModalState } from '@/components/state/openSearchModalState';
import { useGameStatusContext } from 'src/providers/GameStatusProvider';
import { useGetFirstTimeBonuses } from '@/hooks/useGetFirstTimeBonuses';
import { declineFirstTimeBonusOfferState } from '@/components/state/declineFIrstTimeBonusOffer';
import { showFirstTimeBonusModal } from '@/components/state/showFirstTimeBonusModal';
import { firstTimeBonusCountState } from '@/components/state/firstTimeBonusCountState';
import { formVerificationCompletedState } from '@/components/state/verificationCompleted';
import { openPaymentPageState } from '@/components/state/openPaymentPageState';
import { getTransactions } from '@/utils/getTransactions';
import { useGetPlayer } from '@/hooks/useGetPlayer';
import { useRouter } from 'next/router';
import { openToggleAuthState } from '@/components/state/openToggleAuthState';
import { openAuthPageState } from '@/components/state/openAuthPageState';
import { LeftSideMenuItem } from './LeftSideMenu/LeftSideMenuItem';
import { AccountInfo } from './AccountInfo/AccountInfo';
import { RightSideMenuItem } from './RightSideMenu/RightSideMenuItem';
import { authState } from '@/components/state/isAuthenticated';
import { firstTimeDepState } from '@/components/state/isFirstTimeDeposit';

import FirstTimeBonus from '../Rewards/FistTimeBonus';
import { openProfileState } from '@/components/state/openProfileState';
import FirstTimeDeposit from '@/components/Molecules/Payment/FirstTimeDeposit/FirstTimeDeposit';
import { rakebackToggleState } from '@/components/state/rakebackToggleState';
import { loyaltyState } from '@/components/state/loyaltyState';
import {
  formattedTransactionsState,
  transactionsState
} from '@/components/state/transactionsState';
import { easterIsFirstTimeDeposit } from '@/components/state/easterIsFirstTimeDeposit';
import { Account } from '@/pages/api/player/getBalanceTypes';
import { balanceState } from '@/components/state/balanceState';
import { useVerifyPlayer } from '@/hooks/useVerifyPlayer';

interface TransactionBalance {
  date: string;
  points: number;
  pointType: number;
  pointTypeName: string;
  rate: number;
  amount: number;
}

export const NavbarMenu: React.FC = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const setOpenPayment = useSetRecoilState(openPaymentPageState);
  const [loading, setLoading] = useState(false);
  const setToggleRakeBack = useSetRecoilState(rakebackToggleState);
  const [showWelcomeDeposit, setShowWelcomeDeposit] = useRecoilState(showFirstTimeBonusModal);
  const hasDeclineBonus = useRecoilValue(declineFirstTimeBonusOfferState);
  const { refresh: fetchAccountBalance } = useAccountBalance();
  const [filteredData, setFilteredData] = useState<Account[]>([]);
  const setRakebackBalance = useSetRecoilState(rakebackState);
  const openPayment = useRecoilValue(openPaymentPageState);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const { player } = useGetPlayer();
  const router = useRouter();
  const { refetch: refetchLoyalty } = useGetLoyaltyDetails();
  const loyaltyDetails = useRecoilValue(loyaltyState);
  const balanceData = useRecoilValue(balanceState);
  const { displayToast, toastProps } = useCustomToast();
  const { isPlaying } = useGameStatusContext();
  const setSearchOpenModal = useSetRecoilState(openSearchModalState);
  const setToggleAuthState = useSetRecoilState(openToggleAuthState);
  const setOpenAuthState = useSetRecoilState(openAuthPageState);
  const setIsFirstTimeDeposit = useSetRecoilState(firstTimeDepState);
  const { promotions, refetchPromotions, loading: loadingPromo } = useGetFirstTimeBonuses();
  const promotionsCount = useRecoilValue(firstTimeBonusCountState);
  const [isExtended, setIsExtended] = useRecoilState(openProfileState);
  const [isFormFullyFilled, setIsFormFilledFully] = useRecoilState(formVerificationCompletedState);
  const setTransactionState = useSetRecoilState(transactionsState);
  const setFormattedTransactionState = useSetRecoilState(formattedTransactionsState);
  const setIsEasterFirstDeposit = useSetRecoilState(easterIsFirstTimeDeposit);
  const { isSanctionedHandler, updatedPlayerVerificationStatus, pepSanctionedStatus } =
    useVerifyPlayer();

  const handleOpenRegister = useCallback(() => {
    setToggleAuthState({ toggle: 'register' });
    setOpenAuthState({ open: true });
  }, [setToggleAuthState, setOpenAuthState]);

  const handleOpenSignIn = useCallback(() => {
    setToggleAuthState({ toggle: 'signin' });
    setOpenAuthState({ open: true });
  }, [setToggleAuthState, setOpenAuthState]);

  const handleLogoClick = useCallback(() => {
    const currentLocation = router.pathname;
    if (currentLocation.startsWith('/casino')) {
      router.push('/casino');
    } else if (currentLocation.startsWith('/sports')) {
      router.push('/sports');
    } else {
      router.push('/');
    }
  }, [router]);

  const handleOpenSearchModal = useCallback(() => {
    setSearchOpenModal({ open: true });
  }, [setSearchOpenModal]);

  const claimRewards = useCallback(async () => {
    setLoading(true);
    try {
      await apiClient.post('/api/loyalty/claim', {
        numberOfPoints: loyaltyDetails?.pointsBalance
      });
      await Promise.all([fetchAccountBalance(), refetchLoyalty()]);
      await setToggleRakeBack(false);
      displayToast({
        message: 'You successfully claimed your bonus!',
        duration: 3000,
        type: 'success'
      });
    } catch (error) {
      displayToast({
        message: 'Error claiming bonus. Please try again.',
        duration: 3000,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [fetchAccountBalance, refetchLoyalty, displayToast]);

  useEffect(() => {
    if (balanceData && balanceData.length > 0) {
      const filteredBalanceData = balanceData.filter(
        (item) => item.accountType === 'Money' || item.accountType === 'BonusMoney'
      );
      setFilteredData(filteredBalanceData);
    }
  }, [balanceData]);

  const fetchBalance = useCallback(async () => {
    try {
      const res = await apiClient.get(`/api/loyalty/points`);
      const totalPoints = res.data?.loyaltyTransactions?.reduce(
        (sum: number, transaction: TransactionBalance) => sum + transaction.points,
        0
      );
      setRakebackBalance({
        balance: totalPoints,
        currency: loyaltyDetails?.currencyCode || ''
      });
    } catch (error) {
      console.error({ error });
    }
  }, [loyaltyDetails?.currencyCode, setRakebackBalance]);

  const fetchFormattedTransactions = useMemo(() => {
    return async () => {
      try {
        const { transactionsState, formattedTransactions, filteredTransactions } =
          await getTransactions();
        setTransactionState(transactionsState);
        setFormattedTransactionState(formattedTransactions);
        setFilteredTransactions(filteredTransactions as any);
        if (filteredTransactions.length === 0) {
          setIsEasterFirstDeposit(true);
        } else {
          setIsEasterFirstDeposit(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  }, [setTransactionState, setFormattedTransactionState, setFilteredTransactions]);
  const handleWalletButtonClick = useCallback(() => {
    if (pepSanctionedStatus && !pepSanctionedStatus.verified && isFormFullyFilled) {
      updatedPlayerVerificationStatus('deposit');
    }
    const isSanctionedPlayer = isSanctionedHandler('deposit');
    if (isSanctionedPlayer) return;
    if (loadingPromo) return;
    const hasNoTransactions = filteredTransactions?.length === 0 && !isFormFullyFilled;
    if (
      hasNoTransactions ||
      (filteredTransactions?.length === 0 &&
        promotionsCount !== 0 &&
        !hasDeclineBonus &&
        !openPayment.open)
    ) {
      hasNoTransactions ? setIsFirstTimeDeposit(true) : setShowWelcomeDeposit(true);
    } else {
      setOpenPayment({ open: true });
    }
  }, [
    filteredTransactions,
    isFormFullyFilled,
    promotionsCount,
    hasDeclineBonus,
    openPayment.open,
    loadingPromo,
    setIsFirstTimeDeposit,
    setShowWelcomeDeposit,
    setOpenPayment,
    isSanctionedHandler,
    pepSanctionedStatus,
    updatedPlayerVerificationStatus
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBalance();
      fetchFormattedTransactions();
    }
  }, [isAuthenticated, fetchFormattedTransactions, fetchBalance]);

  const toggleExtended = useCallback(() => {
    setIsExtended((prev) => !prev);
  }, []);

  useEffect(() => {
    const isFormComplete =
      player?.firstName &&
      player?.firstName.toLowerCase() !== 'john' &&
      player?.lastName &&
      player?.lastName.toLowerCase() !== 'doe' &&
      player?.stateProvince &&
      player?.postalCode &&
      player?.city &&
      player?.street &&
      player?.mobilePhone;

    setIsFormFilledFully(!!isFormComplete);
  }, [player]);

  const isMobile = useMediaQuery('(max-width:571px)');
  const isMobile991 = useMediaQuery('(max-width:991px)');
  const pathname = usePathname();
  const isCasinoLink = pathname?.includes('/casino') ? '/casino' : '/';
  return (
    <>
      <NavBarMenuContainer>
        <LeftSideMenuItem
          isAuthenticated={isAuthenticated}
          handleLogoClick={handleLogoClick}
          isCasinoLink={isCasinoLink}
          claimButtonLoading={loading}
          isMobile={isMobile}
          claimRewards={claimRewards}
        />
        {isAuthenticated && filteredTransactions.length === 0 && !isFormFullyFilled && (
          <FirstTimeDeposit
            verifySuccessFn={() => {
              if (filteredTransactions?.length === 0 && promotionsCount !== 0 && !hasDeclineBonus) {
                setShowWelcomeDeposit(true);
              } else {
                setOpenPayment({ open: true });
              }
            }}
          />
        )}
        {!(isPlaying && isMobile991) && (
          <AccountInfo
            isPlaying={isPlaying}
            isAuthenticated={isAuthenticated}
            handleWalletButtonClick={handleWalletButtonClick}
            filteredTransactions={filteredTransactions}
            filteredData={filteredData}
            isExtended={isExtended}
            toggleExtended={toggleExtended}
            hasDeclineBonus={hasDeclineBonus}
          />
        )}
        <RightSideMenuItem
          handleWalletButtonClick={handleWalletButtonClick}
          isAuthenticated={isAuthenticated}
          handleOpenSignIn={handleOpenSignIn}
          handleOpenRegister={handleOpenRegister}
          handleOpenSearchModal={handleOpenSearchModal}
        />
      </NavBarMenuContainer>
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
      {promotions.length >= 1 &&
        filteredTransactions?.length === 0 &&
        showWelcomeDeposit &&
        !hasDeclineBonus &&
        !openPayment.open && (
          <FirstTimeBonus
            promotions={promotions}
            isModalOpen={showWelcomeDeposit}
            onModalClose={() => setShowWelcomeDeposit(false)}
            refetchPromotions={refetchPromotions}
          />
        )}
    </>
  );
};
