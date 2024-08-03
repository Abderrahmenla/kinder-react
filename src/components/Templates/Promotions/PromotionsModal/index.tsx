import dynamic from 'next/dynamic';
import { ModalContainer, ModalWrap, Overlay } from '@/components/Atoms';
import {
  WrapContainer,
  CloseIconContainer,
  BannerWrapper,
  PromotionsDetails,
  ExpiryDateWrapper,
  ShortDesc,
  ButtonLink
} from './PromotionsModalStyles';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PromotionsModalProps } from './types/PromotionsModalTypes';
import { openPromotionsState } from '@/components/state/openPromotionsState';
import Image from 'next/image';
import { useFilteredPromotions } from '@/hooks/useFilteredPromotions';
import { useTranslations } from '@/hooks/useTranslations';
import formatDate from '@/utils/formatUtils/formatDate';

const Typography = dynamic(() => import('@/components/Atoms/Typography/Typography'));
const CloseModalIcon = dynamic(() => import('@/components/Atoms/Icons/CloseModalIcon'));

const useFetchPromotionData = (id: number) => {
  const [promotion, setPromotion] = useState<any>(null);

  useEffect(() => {
    const fetchPromotionData = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const fetchedPromotion = await useFilteredPromotions(id);
        setPromotion(fetchedPromotion);
      } catch (error) {
        console.error('Error fetching promotion:', error);
      }
    };

    if (id) {
      fetchPromotionData();
    }
  }, [id]);

  return promotion;
};

const PromotionsModal = ({ open, setOpenPromotions }: PromotionsModalProps) => {
  const { t } = useTranslations();
  const [promotionModalState] = useRecoilState(openPromotionsState);
  const openPromotion = useRecoilValue(openPromotionsState);

  const promotionsId = openPromotion.promotionId;
  const promotion = useFetchPromotionData(promotionsId || 0);

  const handleClickToClose = () => {
    setOpenPromotions({ open: false });
  };

  const { PromotionName, ExpiryDate, ShortDescription, Slug, Banner } = promotion?.attributes || {};

  return (
    promotionsId && (
      <ModalContainer aria-label="Promotion Modal" open={open || promotionModalState.open}>
        <Overlay onClick={handleClickToClose} />
        <ModalWrap open={open || promotionModalState.open}>
          <WrapContainer>
            <CloseIconContainer className="close-button" data-testid="close-button">
              {PromotionName && (
                <Typography size="b2" color="var(--white)" type="Body">
                  {PromotionName}
                </Typography>
              )}
              <CloseModalIcon
                width="24"
                height="24"
                fill="var(--soft-blue-100)"
                onClick={handleClickToClose}
              />
            </CloseIconContainer>
            {Banner && (
              <BannerWrapper>
                <Image
                  src={Banner.data.attributes.url}
                  alt={PromotionName}
                  width={312}
                  height={177}
                  loading="lazy"
                />
              </BannerWrapper>
            )}
            <PromotionsDetails>
              {ExpiryDate && (
                <ExpiryDateWrapper>
                  <span>
                    {new Date(ExpiryDate) < new Date() ? (
                      <span className="expired">{t('expired')}</span>
                    ) : (
                      `${t('endsAt')} ${formatDate(ExpiryDate, { hasTime: true })}`
                    )}
                  </span>
                </ExpiryDateWrapper>
              )}
              {ShortDescription && <ShortDesc>{ShortDescription}</ShortDesc>}
              <ButtonLink href={`/promotions/${Slug}`} onClick={handleClickToClose}>
                {t('viewMore')}
              </ButtonLink>
            </PromotionsDetails>
          </WrapContainer>
        </ModalWrap>
      </ModalContainer>
    )
  );
};

export default PromotionsModal;
