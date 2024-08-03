import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { PromoCode } from './PromoCode';
import InfoIcon from '@/components/InfoIcon';
import {
  ActionSection,
  CelebrationIcon,
  CelebrationSection,
  CelebrationText,
  InfoLink,
  InfoSection,
  StyledButton
} from './Card.style';
import { assets } from '@/config/assets';
import FirstTimeBonusCard from './FIrstTimeBonusCard';

interface DialogBodyContentFirstTimeBonusProps {
  promotions: PlayerBonusesResponse[];
  refetchPromotions: () => void;
  setConfirmDecline: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const getMainTitle = (bonusType: string, t: (key: string) => string) => {
  switch (bonusType.toLowerCase()) {
    case 'casino':
    case 'external':
      return t('casinoBonus');
    default:
      return t('sportsbookBonus');
  }
};

const getImage = (promotion: PlayerBonusesResponse) =>
  `${assets}/images/${
    promotion.bonusType.toLowerCase() === 'casino' ? 'casino' : 'sportsbook'
  }.png`;

const DialogBodyContentFirstTimeBonus: React.FC<DialogBodyContentFirstTimeBonusProps> = ({
  promotions,
  refetchPromotions,
  setConfirmDecline,
  setOpen
}) => {
  const { t } = useTranslations();

  const promoCards = React.useMemo(
    () =>
      promotions
        .filter(
          (promotion) =>
            !promotion.customContentList?.some(
              (content) => content.type === 'showOnPopup' && content.content === 'No'
            )
        )
        .map((bonus, idx) => (
          <FirstTimeBonusCard
            key={idx}
            mainTitle={getMainTitle(bonus.bonusType, t)}
            subTitle={bonus.promotionFriendlyName || ''}
            desc={bonus.description}
            image={getImage(bonus)}
            refetchPromotions={refetchPromotions}
            promotion={bonus}
          />
        )),
    [promotions, t, refetchPromotions]
  );

  return (
    <>
      <CelebrationSection>
        <CelebrationIcon aria-hidden="true">🎉</CelebrationIcon>
        <CelebrationText>{t('depositBonus').toUpperCase()}</CelebrationText>
      </CelebrationSection>

      <Typography
        id="modal-modal-description"
        color="#A391E2"
        textAlign="center"
        fontSize={12}
        marginBottom="30px"
      >
        {t('depositBonusSubTitle')}
      </Typography>

      {promoCards}

      <ActionSection>
        <PromoCode showBorder={false} />
        <StyledButton
          onClick={() => {
            setConfirmDecline(true);
            setOpen(false);
          }}
        >
          {t('noThanks')}
        </StyledButton>
      </ActionSection>

      <InfoSection>
        <InfoIcon bgColor="#A391E2" />
        <Link href="/policies/bonus-terms" passHref>
          <Box component="div" display="flex" alignItems="center" sx={{ textDecoration: 'none' }}>
            <InfoLink>{t('infoBonusProgram')}</InfoLink>
          </Box>
        </Link>
      </InfoSection>
    </>
  );
};

export default React.memo(DialogBodyContentFirstTimeBonus);
