import { PromotionInfoControlLeft } from '@/components/Molecules/Promotion/PromotionCaption/PromotionCaption.style';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import Image from 'next/image';
import {
  PromotionPostDetailWrapper,
  InformationImage,
  InformationImageWrapper,
  InformationText,
  InformationWrapper,
  ButtonBackWrapper,
  BackText,
  CountdownTimerPromotions,
  MobileCountdownTimerContainer,
  PromotionExpiryDateContainer
} from './PromotionPostInformations.style';
import formatDate from '@/utils/formatUtils/formatDate';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import CountDownTimer from '@/components/Atoms/CountdownTimer/CountDownTimer';
import { calculateTimeLeftCountdown } from '@/utils/calculateTimeLeftCountdown';
import GameCategorySwiper from '@/components/Organisms/GameCategorySwiper/GameCategorySwiper';
import { PromotionPostDetailProps } from './PromotionPostInformation.types';

const PromotionPostInformations: React.FC<PromotionPostDetailProps> = ({
  body,
  expirydate,
  banner,
  countdownTitle,
  promoGameCategoryIds,
  countdownDate
}) => {
  const { t } = useTranslations();
  const timeLeft = calculateTimeLeftCountdown(countdownDate);

  // Check if the countdown has reached zero
  const isCountdownComplete =
    timeLeft.days === '00' &&
    timeLeft.hours === '00' &&
    timeLeft.minutes === '00' &&
    timeLeft.seconds === '00';
  return (
    <>
      <PromotionPostDetailWrapper>
        <ButtonBackWrapper>
          <Link href={`/promotions/`}>
            <Image
              src={`${assets}/images/backButton.svg`}
              alt="arrow back"
              width={10}
              height={10}
            />
          </Link>
          <BackText size={'b2'} type="Body">
            {t('backPromos')}
          </BackText>
        </ButtonBackWrapper>

        <InformationImageWrapper>
          <InformationImage src={banner.data.attributes.url} alt="alt" width={255} height={255} />
          {!isCountdownComplete && (
            <CountdownTimerPromotions isCountdownTimer={Boolean(countdownDate)}>
              <CountDownTimer title={countdownTitle} endDate={countdownDate} />
            </CountdownTimerPromotions>
          )}
        </InformationImageWrapper>
        {!isCountdownComplete && (
          <MobileCountdownTimerContainer isCountdownTimer={Boolean(countdownDate)}>
            <CountDownTimer title={countdownTitle} endDate={countdownDate} />
          </MobileCountdownTimerContainer>
        )}

        <InformationWrapper>
          <PromotionInfoControlLeft>
            <PromotionExpiryDateContainer>
              <p>
                {expirydate &&
                  (new Date(expirydate) < new Date() ? (
                    <span className="expired">{t('expired')}</span>
                  ) : (
                    `${t('endsAt')} ${formatDate(expirydate, { hasTime: true })}`
                  ))}
              </p>
            </PromotionExpiryDateContainer>
          </PromotionInfoControlLeft>
          <InformationText>{ReactHtmlParser(body)}</InformationText>
        </InformationWrapper>
      </PromotionPostDetailWrapper>
      {!!countdownDate && promoGameCategoryIds.desktopId && promoGameCategoryIds.mobileId && (
        <GameCategorySwiper gameCategoryIds={promoGameCategoryIds} />
      )}
    </>
  );
};

export default PromotionPostInformations;
