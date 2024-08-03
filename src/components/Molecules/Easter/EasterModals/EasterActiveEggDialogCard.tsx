import Button from '@/components/Atoms/Button/Button';
import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import Typography from '@/components/Atoms/Typography/Typography';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { IEasterActiveEggDialogCard } from '@/components/Molecules/Easter/EasterModals/EasterModal.types';
import {
  WinDialogActions,
  WinDialogContainer
} from '@/components/Molecules/Easter/EasterModals/EasterModal.styles';
import { useLoader } from '@/hooks/useLoader';
import useCustomToast from '@/hooks/useCustomToast';
import { EasterActiveEggConfirmation } from '../Alert/EasterGiveawayAlert';
import { SuccessAlert } from '../Alert/SuccessGiveawayAlert';
import { BonusInvalidCode } from '@/components/Organisms/Rewards/alerts/InvalidCode';
import { assets } from '@/config/assets';
import { apiClient } from '@/services/clientAxios';
import { useGetEasterGiveaway } from '@/hooks/useGetEasterGiveaway';
import { BonusSectionType } from '@/graphql/types/christmasGiveawayTypes';
import { useGetLoyaltyDetails } from '@/hooks/useGetLoyalty';
import { AxiosError } from 'axios';

type VIPLevelMappings = {
  [key: string]: string[];
};
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

const postEaster = async (body: {
  userId: string | undefined;
  eggId: string | number | undefined;
  isBonus: boolean | undefined;
}) => apiClient.post('/api/easter-giveaway/save', body);

const postBonus = async (body: { optInCode: string }) =>
  apiClient.post('/api/rewards/opt-in-bonus', body);

export const transformImageUrl = (url: any) => {
  if (url && url.startsWith('/uploads')) {
    return `https://cms.spinbet.com${url}`;
  }
  return url;
};

const EasterActiveEggDialogCard: React.FC<IEasterActiveEggDialogCard> = ({
  open,
  easterData,
  eggs,
  playerId,
  crackAllEggs,
  setisModalOpen
}) => {
  const { t } = useTranslations();
  const { giveawayData } = useGetEasterGiveaway({ playerId });
  const { loyaltyDetails, refetch } = useGetLoyaltyDetails();

  const bonus = useMemo(() => {
    const foundBonus = findBonusForPlayer(
      loyaltyDetails?.vipLevel || '',
      easterData?.attributes?.Bonus || []
    );
    if (foundBonus?.Image?.data?.attributes?.url) {
      foundBonus.Image.data.attributes.url = transformImageUrl(
        foundBonus.Image.data.attributes.url
      );
    }
    return foundBonus;
  }, [loyaltyDetails, eggs]);

  const { displayToast, toastProps } = useCustomToast();
  const { isLoading, toggleLoader } = useLoader('coin');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const handleOnConfirm = async () => {
    try {
      toggleLoader(true);

      const easterDayPayload = {
        userId: playerId,
        eggId: easterData?.id,
        isBonus: easterData?.attributes.IsBonus
      };

      const bonusPayload = { optInCode: bonus?.OptInCode || '' };

      const bonusResponse = await postBonus(bonusPayload);

      if (bonusResponse.status === 200 || bonusResponse.status === 201) {
        await postEaster(easterDayPayload);
        await refetch();
        toggleLoader(false);
        setShowConfirmationDialog(false);
        displayToast({ duration: 3000, message: t('successfullyActivated') });
        setShowSuccess(true);
        crackAllEggs();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toggleLoader(false);
        setShowConfirmationDialog(false);
        setError(error.response?.data.errorMessage);
        displayToast({ duration: 3000, message: '' });
        setisModalOpen(false);
        setShowSuccess(false);
        crackAllEggs();
      }
    }
  };
  const handleClickActivate = () => {
    setShowConfirmationDialog(true);
    setisModalOpen(false);
    setShowCancelDialog(false);
  };

  const handleOnCloseConfirmation = () => {
    if (giveawayData.length > 0) {
      setisModalOpen(false);
    } else {
      setShowCancelDialog(true);
      setisModalOpen(false);
    }
  };

  const description = (
    <>
      <span style={{ color: '#FFD70C' }}>Congratulations!&nbsp;</span>
      {bonus?.PrizeActivationInfo}
    </>
  );
  const bodyContent = () => (
    <WinDialogContainer>
      <Typography type="Heading" size="h4" color="var(--white)">
        {bonus?.PrizeName}
      </Typography>
      <Image
        src={bonus?.Image.data.attributes.url || ''}
        width={122}
        height={140}
        alt="Jackpot coin"
      />
      <Typography size="p1" type="Paragraph" color="var(--white)">
        {description}
      </Typography>
      <WinDialogActions>
        <Button variant="Secondary" handleClick={handleOnCloseConfirmation}>
          {t('close')}
        </Button>
        <Button disabled={giveawayData.length > 0} handleClick={handleClickActivate}>
          {t('activate')}
        </Button>
      </WinDialogActions>
    </WinDialogContainer>
  );

  return (
    <>
      {open && <Dialog disableHeader open={open} maxWidth="336px" bodyContent={bodyContent} />}
      {showConfirmationDialog && (
        <EasterActiveEggConfirmation
          title={t('areYouSure')}
          caption={t('activatingTodaysPrice')}
          key={Math.random()}
          onConfirm={handleOnConfirm}
          isLoading={isLoading}
          loaderType="coin"
          IconComponent={
            <Image
              width={48}
              height={48}
              src={`${assets}/images/christmas-giveaway/coinLogo.png`}
              alt="info"
              loading="lazy"
            />
          }
          onClose={() => {
            setisModalOpen(true);
            setShowConfirmationDialog(false);
          }}
        />
      )}
      {showCancelDialog && (
        <EasterActiveEggConfirmation
          title={t('areYouSure')}
          caption={t('notActivatingTodaysPrice')}
          key={Math.random()}
          onConfirm={() => {
            setShowCancelDialog(false);
            setisModalOpen(false);
            setShowConfirmationDialog(false);
          }}
          IconComponent={
            <Image
              width={48}
              height={48}
              src={`${assets}/images/christmas-giveaway/confirm_Question_logo.svg`}
              alt="info"
              loading="lazy"
            />
          }
          onClose={() => {
            setisModalOpen(true);
            setShowCancelDialog(false);
          }}
        />
      )}
      {toastProps && showSuccess && (
        <SuccessAlert {...toastProps} key={Math.random()} duration={toastProps.duration} />
      )}
      {toastProps && !showSuccess && (
        <BonusInvalidCode message={error} key={Math.random()} duration={toastProps.duration} />
      )}
    </>
  );
};

export default EasterActiveEggDialogCard;
