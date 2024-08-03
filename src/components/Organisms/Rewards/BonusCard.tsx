import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { PlayerData } from '@/hooks/types';
import BonusImage from './BonusImage';
import BonusDetails from './BonusDetails';
import RewardProgressBar from './RewardsProgressBar';
import { PlayerBonusHistory, PlayerBonusesResponse } from '@/pages/api/rewards/types';
import Link from 'next/link';
import { BonusConfirmation } from './alerts/BonusConfirmation';
import { apiClient } from 'src/services/clientAxios';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import { assets } from '@/config/assets';
import Button from '@/components/Atoms/Button/Button';
import dayjs from 'dayjs';
import { useTranslations } from '@/hooks/useTranslations';
import { BonusTypographyAvailable } from './Card.style';

interface Props {
  data?: PlayerBonusHistory;
  player: PlayerData;
  promotions?: Array<PlayerBonusesResponse>;
  refetch: () => void;
}

const getStatusColor = (status: string | undefined) => {
  const defaultColor = 'var(--lime-green)';
  const statusColors: Record<string, string> = {
    Pending: 'var(--lime-green)',
    Waiting: '#71baf0',
    Declined: 'var(--pure-red)',
    Expired: 'var(--pure-red)'
  };
  return status ? statusColors[status] || defaultColor : defaultColor;
};

const getBonusImage = (productTypeName: string | undefined) => {
  if (!productTypeName) return `${assets}/images/reward-placeholder.jpg`;
  return productTypeName.toLowerCase() === 'casino'
    ? `${assets}/images/casino.png`
    : `${assets}/images/sportsbook.png`;
};

const getGameNameFromPromotion = (promotion: PlayerBonusesResponse | undefined) => {
  if (!promotion) return '';
  const gameNameContent = promotion.customContentList?.find((item) => item.type === 'GameName');
  return gameNameContent?.content ?? '';
};

export const Card = ({ data, player, promotions, refetch }: Props) => {
  const { t } = useTranslations();
  const [cancelBonusDialog, setCancelBonusDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const statusColor = useMemo(() => getStatusColor(data?.status), [data?.status]);
  const bonusImage = useMemo(() => getBonusImage(data?.productTypeName), [data?.productTypeName]);
  const wagerLeft = (data?.wageringRequirement || 0) - (data?.wageringRequirementLeft || 0);
  const percentage = useMemo(() => {
    const fraction = wagerLeft / (data?.wageringRequirement || 1);
    return isNaN(fraction) ? 0 : fraction * 100;
  }, [data?.wageringRequirement, wagerLeft]);

  const promotion = useMemo(() => {
    if (promotions) {
      return promotions.find((promo) => promo.bonusName === data?.bonusName);
    }
  }, [data?.bonusName, promotions]);
  const isSportsbookBonus = (productTypeName: string | undefined): boolean => {
    return productTypeName?.toLowerCase() === 'sportsbook';
  };
  const sportsbookBonus = useMemo(
    () => isSportsbookBonus(data?.productTypeName),
    [data?.productTypeName]
  );
  const gameName = useMemo(() => getGameNameFromPromotion(promotion), [promotion]);

  const cancelBonus = () => {
    setCancelBonusDialog(!cancelBonusDialog);
  };

  const handleConfirm = async () => {
    setError('');
    setLoading(true);
    try {
      await apiClient
        .post('/api/rewards/bonus-cancel', {
          playerBonusContextId: data?.playerBonusId
        })
        .then(() => {
          setSuccess(true);
          setCancelBonusDialog(!cancelBonusDialog);
          setTimeout(() => {
            refetch();
          }, 3000);
        });
      setLoading(false);
    } catch (e) {
      setError('Bonus cancellation failed');
      setLoading(false);
    }
  };

  const BonusImageComponent = () => (
    <Box>
      {promotion?.customContentList?.find((item) => item.type === 'ExtGameId')?.content ? (
        <>
          <BonusImage
            src={`https://images.spinbet.com/storage/games/${promotion?.customContentList
              ?.find((item) => item.type === 'ExtGameId')
              ?.content?.toLowerCase()}.jpg/format=png?width=75`}
          />
          {promotion.description.toLowerCase().includes('free spins') && gameName && (
            <Box display="flex" gap={1}>
              <Button
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  fontFamily: 'Inter'
                }}
                handleClick={cancelBonus}
                showIcon={false}
                variant="Secondary"
              >
                {t('cancel')}
              </Button>
              <Button
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  fontFamily: 'Inter'
                }}
                showIcon={false}
              >
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontFamily: 'Inter'
                  }}
                  href={`/casino/game/${
                    data?.externalBonusProductSupplier &&
                    (data.externalBonusProductSupplier as string)
                      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
                      .toLowerCase()
                      .replace(/^-/, '')
                  }/${gameName.toLowerCase().replace(/ /g, '-')}`}
                >
                  {t('play')}
                </Link>
              </Button>
            </Box>
          )}
        </>
      ) : (
        <BonusImage src={bonusImage} />
      )}
    </Box>
  );

  return (
    <Box
      position="relative"
      bgcolor="var(--dark-dark-1, #180C35)"
      borderRadius={2}
      mx={1}
      overflow="hidden"
    >
      {success && <CustomToast message="Bonus Cancelled!" duration={3000} type="success" />}
      {error && <CustomToast message={error} duration={3000} type="error" />}
      {cancelBonusDialog && (
        <BonusConfirmation
          isLoading={loading}
          loaderType="logo"
          onClose={() => setCancelBonusDialog(!cancelBonus)}
          onConfirm={handleConfirm}
        />
      )}
      <Box p={1}>
        <Box display="flex">
          <BonusImageComponent />
          <BonusDetails
            bonusName={data?.bonusFriendlyName || ''}
            expirationDate={data?.expirationDate && data?.expirationDate.toString()}
            statusColor={statusColor}
            description={data?.bonusFriendlyDescription || ''}
            bonusAmount={data?.bonusAmount || 0}
            player={player}
            data={data}
          />
        </Box>
        <Box>
          <Box display="flex" justifyContent="end" marginTop={1}>
            <Button
              style={{
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: 'Inter'
              }}
              handleClick={cancelBonus}
              showIcon={false}
              variant="Secondary"
            >
              {t('cancel')}
            </Button>
          </Box>
          <Box display="flex" justifyContent="end" marginTop={1}>
            <BonusTypographyAvailable size="p2" type="Paragraph">
              {t('availableUntil')}{' '}
              {dayjs(data?.expirationDate && data?.expirationDate.toString()).format('DD/MMM/YYYY')}
            </BonusTypographyAvailable>
          </Box>
        </Box>
        {!sportsbookBonus && data && data.bonusAmount > 0 && (
          <RewardProgressBar
            wagerLeft={wagerLeft}
            wagerRequired={data?.wageringRequirement ?? undefined}
            percentage={percentage}
            player={player}
            bonusAwarded={data?.bonusAwarded}
          />
        )}
      </Box>
    </Box>
  );
};
