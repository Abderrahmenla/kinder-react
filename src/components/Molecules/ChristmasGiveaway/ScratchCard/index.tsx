import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import ScratchCard, { CUSTOM_BRUSH_PRESET } from 'react-scratchcard-v2';
import { Overlay, ModalWrap, ModalContainer, WrapContainer } from '../../../Atoms';
import {
  ScratchCardHeader,
  ScratchCardHeaderContainer,
  ScratchCardBodyContainer,
  ScratchContainer,
  CloseIconContainer
} from './ScratchCardStyle';
import { ScratchRevealButton } from './ScratchRevealButton';
import { assets } from '@/config/assets';
import Image from 'next/image';
import { useLoader } from '@/hooks/useLoader';
import { revealTextState } from '@/components/state/christmasGiveaway/revealText';
import { ScratchCardConfirmation } from '../Alert/ChristmasGiveawayAlert';
import {
  ChristmasGiveawayType,
  PrizeType,
  BonusSectionType
} from 'src/graphql/types/christmasGiveawayTypes';
import { ScratchDisplayImage } from './ScratchDisplayImage';
import { apiClient } from '../../../../services/clientAxios';
import { useGetLoyaltyDetails } from '@/hooks/useGetLoyalty';
import { PlayerData } from '@/hooks/types';
import useCustomToast from '@/hooks/useCustomToast';
import { SuccessAlert } from '../Alert/SuccessGiveawayAlert';
import { BonusInvalidCode } from '@/components/Organisms/Rewards/alerts/InvalidCode';
import { AxiosError } from 'axios';
import { loyaltyState } from '@/components/state/loyaltyState';

interface PrizeData {
  day: string;
  isRevealed: boolean;
  prizeType: string;
}
interface ScratchCardComponentProps {
  handleClose: () => void;
  handleOnConfirmCancel: () => void;
  handleCloseCancelDialog: () => void;
  dayData: ChristmasGiveawayType | undefined;
  isPastDay: boolean;
  isModalOpen: boolean;
  showCancelDialog: boolean;
  player?: PlayerData | null;
  currentDate?: string;
  currentDayData?: PrizeData;
  fetchGiveawayData: () => Promise<void>;
}
interface ScratchCardHandle {
  ctx: CanvasRenderingContext2D | null;
}

type VIPLevelMappings = {
  [key: string]: string[];
};
const postChristmas = async (body: {
  userId: string | undefined;
  day: string | undefined;
  prizeType: string | undefined;
  isRevealed: boolean | undefined;
}) => apiClient.post('/api/christmas-giveaway/save', body);

const postBonus = async (body: { optInCode: string }) =>
  apiClient.post('/api/rewards/opt-in-bonus', body);

const findBonusForPlayer = (
  playerVipLevel: string,
  bonusSection: BonusSectionType[]
): BonusSectionType | undefined => {
  const extractBaseVipLevel = (vipLevel: string): string => {
    const vipLevelMapping: VIPLevelMappings = {
      Diamond: [
        'Diamond',
        'Blue Diamond',
        'Pink Diamond',
        'Double Diamond',
        'Black Diamond Club',
        'Onyx'
      ],
      Silver: ['Silver'],
      Bronze: ['Bronze'],
      Gold: ['Gold'],
      Starter: ['Starter'],
      Platinum: ['Platinum']
    };

    for (const baseLevel in vipLevelMapping) {
      if (vipLevelMapping[baseLevel].some((level) => vipLevel.includes(level))) {
        return baseLevel;
      }
    }
    return vipLevel;
  };

  const baseVipLevel = extractBaseVipLevel(playerVipLevel);

  return bonusSection.find((bonus) => bonus.VIPLevel === baseVipLevel);
};

export const ScratchCardComponent = ({
  handleClose,
  handleOnConfirmCancel,
  dayData,
  player,
  currentDate,
  currentDayData,
  isPastDay,
  isModalOpen,
  showCancelDialog,
  handleCloseCancelDialog,
  fetchGiveawayData
}: ScratchCardComponentProps) => {
  const ref = useRef<ScratchCardHandle & ScratchCard>(null);
  const router = useRouter();
  const { displayToast, toastProps } = useCustomToast();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isCursorChange, setIsCursorChange] = useState<boolean>(false);
  const [revealText, setRevealText] = useRecoilState(revealTextState);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [disableRevealButton, setDisableRevealButton] = useState(false);
  const { refetch: fetchLoyaltyDetails } = useGetLoyaltyDetails();
  const [loyaltyDetails] = useRecoilState(loyaltyState);
  const { isLoading, toggleLoader } = useLoader('coin');
  const [showInvalidCodeAlert, setShowInvalidCodeAlert] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentDayData && currentDayData.isRevealed) {
      setIsRevealed(true);
      setDisableRevealButton(true);
      setIsCursorChange(true);
      setRevealText(currentDayData.prizeType === 'Bonus' ? 'Activated' : 'Revealed');
    } else {
      setRevealText('Reveal');
      setIsRevealed(false);
      setDisableRevealButton(false);
    }
  }, [currentDayData, setIsRevealed, setDisableRevealButton, setRevealText]);

  const bonus = useMemo(
    () =>
      findBonusForPlayer(loyaltyDetails?.vipLevel || '', dayData?.attributes?.BonusSection || []),
    [loyaltyDetails, dayData]
  );

  const imageUrl =
    dayData?.attributes.PrizeType === PrizeType.Bonus
      ? bonus?.Image?.data?.attributes?.url
      : dayData?.attributes?.PrizeBanner?.data?.attributes?.url;

  const handleOnConfirm = useCallback(async () => {
    try {
      toggleLoader(true);

      const christmasDayPayload = {
        userId: player?.id.toString(),
        day: currentDate,
        prizeType: dayData?.attributes.PrizeType,
        isRevealed: true
      };
      const bonusPayload = { optInCode: bonus?.OptInCode || '' };

      const bonusResponse = await postBonus(bonusPayload);

      if (bonusResponse.status === 200 || bonusResponse.status === 201) {
        await postChristmas(christmasDayPayload);
        await fetchGiveawayData();
        await fetchLoyaltyDetails();
        toggleLoader(false);
        setShowConfirmationDialog(false);
        setRevealText('Activated');
        setDisableRevealButton(true);
        displayToast({ duration: 3000, message: 'Successfully Activated' });
      } else {
        console.error('Bonus activation failed');
        setShowInvalidCodeAlert(true);

        toggleLoader(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toggleLoader(false);
        setShowConfirmationDialog(false);
        setShowInvalidCodeAlert(true);
        setError(error.response?.data.errorMessage);
        displayToast({ duration: 3000, message: '' });
        return;
      }
    }
  }, [
    toggleLoader,
    player?.id,
    currentDate,
    dayData?.attributes.PrizeType,
    setShowConfirmationDialog,
    setRevealText,
    setDisableRevealButton,
    displayToast,
    postChristmas,
    fetchGiveawayData,
    postBonus,
    bonus?.OptInCode
  ]);
  const handleOnCloseConfirmation = () => {
    setShowConfirmationDialog(false);
  };

  const onRevealClick = useCallback(async () => {
    setIsCursorChange(true);
    if (revealText === 'Reveal') {
      setIsRevealed(true);
      const context = ref.current?.ctx;
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      }
      if (dayData?.attributes.PrizeType !== 'Bonus') {
        try {
          toggleLoader(true);
          const payload = {
            userId: player?.id.toString(),
            day: currentDate,
            prizeType: dayData?.attributes.PrizeType,
            isRevealed: true
          };
          await postChristmas(payload);
          await fetchGiveawayData();
          toggleLoader(false);
          setRevealText('Revealed');
          setDisableRevealButton(true);
        } catch {
          console.error('Error fetching API');
          toggleLoader(false);
        }
      } else {
        setRevealText('Activate');
      }
    } else {
      setShowConfirmationDialog(true);
    }
  }, [
    revealText,
    setIsRevealed,
    dayData?.attributes.PrizeType,
    toggleLoader,
    player?.id,
    currentDate,
    postChristmas,
    setRevealText,
    setDisableRevealButton,
    displayToast,
    fetchGiveawayData,
    setShowConfirmationDialog
  ]);

  const handleImageClick = () => {
    if (dayData?.attributes.BannerLink) {
      router.push(dayData?.attributes.BannerLink);
    }
  };

  const onManualScratchReveal = useCallback(async () => {
    setIsCursorChange(true);
    if (revealText === 'Reveal') {
      setIsRevealed(true);
      if (dayData?.attributes.PrizeType !== 'Bonus') {
        try {
          toggleLoader(true);
          const payload = {
            userId: player?.id.toString(),
            day: currentDate,
            prizeType: dayData?.attributes.PrizeType,
            isRevealed: true
          };
          await postChristmas(payload);
          await fetchGiveawayData();
          toggleLoader(false);
          setDisableRevealButton(true);
          setRevealText('Revealed');
        } catch (e) {
          toggleLoader(false);
          console.error(e);
        }
      } else {
        setRevealText('Activate');
      }
    }
  }, [
    revealText,
    setIsRevealed,
    dayData?.attributes.PrizeType,
    toggleLoader,
    player?.id,
    currentDate,
    postChristmas,
    fetchGiveawayData,
    setDisableRevealButton,
    setRevealText
  ]);

  return (
    <>
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer open={isModalOpen} style={{ zIndex: showConfirmationDialog ? 0 : 1 }}>
            <ModalWrap open={isModalOpen}>
              <div style={{ height: '500px', position: 'relative' }}>
                <WrapContainer>
                  <ScratchContainer>
                    <ScratchCardHeaderContainer>
                      <CloseIconContainer onClick={handleClose}>
                        <Image
                          src={`${assets}/images/christmas-giveaway/closeIcon.svg`}
                          alt="close"
                          width={24}
                          height={24}
                          loading="lazy"
                        />
                      </CloseIconContainer>
                      <ScratchCardHeader>
                        <Image
                          src={`${assets}/images/christmas-giveaway/scratchHeaderIcon.svg`}
                          alt="scratch"
                          width={24}
                          height={24}
                          loading="lazy"
                        />
                        <span>SCRATCH THE TICKET</span>
                      </ScratchCardHeader>
                    </ScratchCardHeaderContainer>
                    <ScratchCardBodyContainer
                      isCursorChange={
                        dayData?.attributes.PrizeType === 'Bonus' ? false : isCursorChange
                      }
                    >
                      {isPastDay || isRevealed ? (
                        <ScratchDisplayImage
                          onClick={handleImageClick}
                          imageHeight={186}
                          imageUrl={imageUrl}
                          imageWidth={320}
                        />
                      ) : (
                        <ScratchCard
                          ref={ref}
                          width={320}
                          height={186}
                          image={`${assets}/images/christmas-giveaway/scratchCardIcon.svg`}
                          finishPercent={70}
                          onComplete={() => onManualScratchReveal()}
                          customBrush={CUSTOM_BRUSH_PRESET}
                        >
                          <ScratchDisplayImage
                            onClick={handleImageClick}
                            imageHeight={186}
                            imageUrl={imageUrl}
                            imageWidth={320}
                          />
                        </ScratchCard>
                      )}
                    </ScratchCardBodyContainer>
                  </ScratchContainer>
                </WrapContainer>
                <ScratchRevealButton
                  isPastDay={isPastDay}
                  disableRevealButton={disableRevealButton}
                  onRevealClick={onRevealClick}
                  dayData={dayData}
                  isLoading={isLoading}
                  revealText={revealText}
                />
              </div>
            </ModalWrap>
          </ModalContainer>
        </>
      )}
      {showConfirmationDialog && (
        <ScratchCardConfirmation
          title={bonus?.PrizeName || ''}
          caption={bonus?.PrizeActivationInfo || ''}
          key={Math.random()}
          onConfirm={handleOnConfirm}
          isLoading={isLoading}
          loaderType="coin"
          IconComponent={
            <Image
              width={48}
              height={48}
              src={`${assets}/images/christmas-giveaway/gift.svg`}
              alt="info"
              loading="lazy"
            />
          }
          onClose={handleOnCloseConfirmation}
        />
      )}
      {showCancelDialog && (
        <ScratchCardConfirmation
          title={`Are you sure?`}
          caption={`You have not activated today's prize. Cancel to go back and activate it`}
          key={Math.random()}
          onConfirm={handleOnConfirmCancel}
          IconComponent={
            <Image
              width={48}
              height={48}
              src={`${assets}/images/christmas-giveaway/confirm_Question_logo.svg`}
              alt="info"
              loading="lazy"
            />
          }
          onClose={handleCloseCancelDialog}
        />
      )}
      {toastProps && (
        <SuccessAlert {...toastProps} key={Math.random()} duration={toastProps.duration} />
      )}
      {toastProps && showInvalidCodeAlert && (
        <BonusInvalidCode message={error} key={Math.random()} duration={toastProps.duration} />
      )}
    </>
  );
};
