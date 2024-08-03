import React from 'react';
import { EasterPrizesContainer, SinglePrize } from '@/components/Molecules/Easter/Easter.styles';
import { EasterPrizesProps } from '@/components/Molecules/Easter/Easter.types';
import Typography from '@/components/Atoms/Typography/Typography';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { useTranslations } from '@/hooks/useTranslations';
import { useRecoilValue } from 'recoil';
import { loyaltyState } from '@/components/state/loyaltyState';
import { transformImageUrl } from '@/components/Molecules/Easter/EasterModals/EasterActiveEggDialogCard';

const EasterPrizes: React.FC<EasterPrizesProps> = ({ prizes, depositQualified }) => {
  const { t } = useTranslations();

  const loyaltyDetails = useRecoilValue(loyaltyState);

  const filteredPrizesByVipLevel = prizes
    .filter((prize) => prize.VIPLevelName === loyaltyDetails?.vipLevel)
    .map((prize) => ({
      ...prize,
      Prize: prize.Prize.map((item) => ({
        ...item,
        Image: item.Image
          ? {
              ...item.Image,
              data: item.Image.data
                ? {
                    ...item.Image.data,
                    attributes: {
                      ...item.Image.data.attributes,
                      url: transformImageUrl(item?.Image?.data?.attributes?.url)
                    }
                  }
                : undefined
            }
          : undefined
      }))
    }));

  return (
    <>
      {!depositQualified && (
        <EasterPrizesContainer>
          <Typography type="Heading" size="h4" color="var(--white)">
            {t('prizes')}
          </Typography>
          <Swiper
            slidesPerView={4}
            spaceBetween={16}
            breakpoints={{
              220: {
                slidesPerView: 2.2,
                centeredSlides: true,
                spaceBetween: 16
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 16
              }
            }}
          >
            {filteredPrizesByVipLevel &&
              filteredPrizesByVipLevel[0]?.Prize &&
              filteredPrizesByVipLevel[0]?.Prize.map((item) => {
                const { Name: name = '' } = item || {};
                const imageUrl = item.Image?.data?.attributes?.url || '';
                return (
                  <SwiperSlide key={item.id}>
                    <SinglePrize>
                      <Image
                        src={imageUrl}
                        width={83}
                        height={83}
                        alt="blank egg"
                        style={{
                          opacity: 0.3
                        }}
                      />
                      <Typography type="Heading" size="h4" color="var(--white)">
                        {name}
                      </Typography>
                    </SinglePrize>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </EasterPrizesContainer>
      )}
    </>
  );
};

export default EasterPrizes;
