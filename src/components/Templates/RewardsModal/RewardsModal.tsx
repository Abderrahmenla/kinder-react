import { useCallback, useEffect, useState } from 'react';
import {
  ModalContainer,
  ModalSection,
  ModalWrap,
  ModalWrapContainer,
  Overlay,
  SwitcherContainer
} from '../../Atoms';
import { RewardsHeader } from '../../Organisms/Rewards/Header';
import RewardsBonusesComponent from '../../Organisms/Rewards/Bonuses';
import RewardsComponent from '../../Organisms/Rewards/Rewards';
import { apiClient } from '../../../services/clientAxios';
import { useQuery } from '@/hooks/useQuery';
import { PlayerBonusHistory, PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { Box } from '@mui/material';
import { RewardsEmptyState } from '../../Molecules/Rewards/EmptyState';
import { useLoader } from '@/hooks/useLoader';

import { useRecoilState, useRecoilValue } from 'recoil';
import { registrationSuccessState } from '@/components/state/registrationSuccessState';
import { PromoCode } from '../../Organisms/Rewards/PromoCode';
import { RewardsModalProps } from '@/components/Templates/RewardsModal/types/RewardsModalTypes';
import { playerState } from '@/components/state/playerState';
import { openRewardsModalState } from '@/components/state/openRewardsModalState';
import Footer from '@/components/Molecules/Rewards/Footer';
import Switcher from '@/components/Atoms/Switcher/Switcher';
import { useTranslations } from '@/hooks/useTranslations';
import { StyledModalContent, StyledBox } from './RewardModalStyle';

const fetcher = async () => apiClient.get('/api/rewards/player');
const playerPromotionsFetcher = async () => apiClient.get('/api/rewards/player/promotions');

const RewardsModal = ({ open, setOpen }: RewardsModalProps) => {
  const { t } = useTranslations();
  const [toggle, setToggle] = useState(false);
  const [, setRegistrationSuccessState] = useRecoilState(registrationSuccessState);
  const player = useRecoilValue(playerState);
  const [rewardsModalState, setRewardsModalState] = useRecoilState(openRewardsModalState);

  const {
    data,
    isLoading,
    refetch: refetchPlayerData
  } = useQuery<{ playerBonusHistory: Array<PlayerBonusHistory> }>({
    fetcher
  });
  const {
    data: promotions,
    isLoading: isLoadingPromotions,
    refetch
  } = useQuery<Array<PlayerBonusesResponse>>({
    fetcher: (open || rewardsModalState.open) && playerPromotionsFetcher
  });

  const { toggleLoader, loadingWrapper } = useLoader('coin');

  useEffect(() => {
    if (open || rewardsModalState.open) refetch();
  }, [open, refetch]);

  useEffect(() => {
    toggleLoader(isLoading || isLoadingPromotions);
  }, [isLoading, isLoadingPromotions, toggleLoader]);

  const handleToggle = useCallback(
    (index: number) => {
      setToggle(index !== 0);
    },
    [setToggle]
  );

  const handleClickToClose = () => {
    setOpen(false);
    setRegistrationSuccessState(false);
    setRewardsModalState({ open: false });
    setToggle(false);
  };
  const filteredBonuses = data?.playerBonusHistory?.filter(
    (bonus) =>
      bonus.status === 'AwardedExternal' ||
      bonus.status === 'Active' ||
      bonus.status === 'Pending' ||
      bonus.status === 'RedeemWaiting' ||
      bonus.status === 'Waiting'
  );

  return (
    <ModalContainer open={open || rewardsModalState.open} aria-label="Rewards Modal">
      <Overlay onClick={handleClickToClose} />
      <ModalWrap open={open || rewardsModalState.open}>
        <ModalWrapContainer width="360px">
          <ModalSection notPadded>
            <StyledModalContent>
              <RewardsHeader onClose={handleClickToClose} />
              <SwitcherContainer>
                <Switcher
                  handleToggle={handleToggle}
                  tabSwitcherStyles={{
                    height: 44,
                    overflow: 'hidden',
                    marginTop: '8px'
                  }}
                  options={[
                    {
                      title: t('rewards')
                    },
                    {
                      title: t('active')
                    }
                  ]}
                />
              </SwitcherContainer>
              {isLoading || isLoadingPromotions ? (
                loadingWrapper
              ) : (
                <>
                  {data && player && promotions ? (
                    data ? (
                      <StyledBox>
                        {toggle ? (
                          <>
                            <RewardsBonusesComponent
                              promotions={promotions}
                              data={filteredBonuses}
                              player={player}
                              refetch={refetchPlayerData}
                            />
                            <Footer closeModal={handleClickToClose} />
                          </>
                        ) : (
                          <>
                            <Box mx={1}>
                              <RewardsComponent
                                refetch={refetch}
                                data={data?.playerBonusHistory}
                                promotions={promotions.filter(
                                  (promo) => promo.iCoreAggregatedBonusStatus !== 'Active'
                                )}
                              />
                            </Box>
                            <Box mt={2}>
                              <Box mx={1}>
                                <PromoCode showBorder={false} />
                              </Box>
                              <Footer closeModal={handleClickToClose} />
                            </Box>
                          </>
                        )}
                      </StyledBox>
                    ) : (
                      <>
                        <RewardsEmptyState description="NO BONUSES" />
                        <Box mt={-20} mr={2} ml={2} mb={2}>
                          <PromoCode showBorder={false} />
                        </Box>
                      </>
                    )
                  ) : null}
                </>
              )}
            </StyledModalContent>
          </ModalSection>
        </ModalWrapContainer>
      </ModalWrap>
    </ModalContainer>
  );
};

export default RewardsModal;
