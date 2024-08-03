import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import 'swiper/css';
import SwiperCore from 'swiper';
import { Controller, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import {
  CalendarDay,
  CalendarGrid,
  SwiperSlideMobile,
  SwiperSlideNavigation,
  StyledTimeRemaining,
  SwiperSlideLabel,
  DayLabel,
  GiftBoxImage
} from '@/components/Molecules/ChristmasGiveaway/ChristmasGiveaway.styles';
import { isColumnSpanDay, isDayMissed, isDayOpened, isRowSpanDay } from '@/utils/christmasGiveway';
import { assets } from '@/config/assets';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import 'swiper/css/controller';
import { revealTextState } from '@/components/state/christmasGiveaway/revealText';
import { ScratchCardComponent } from '../ScratchCard';
import { ChristmasGiveawayType } from 'src/graphql/types/christmasGiveawayTypes';
import useServerTime from '@/hooks/useServerTime';
import { useGetChristmasGiveaway } from '@/hooks/useGetChristmasGiveaway';
import { playerState } from '@/components/state/playerState';

SwiperCore.use([Controller]);

export const CalendarSwiper = ({
  christmasGiveaway
}: {
  christmasGiveaway: ChristmasGiveawayType[];
}) => {
  const theme = useTheme();
  const [todayIndex, setTodayIndex] = useState<number>();
  const [isPastDay, setIsPastDay] = useState<boolean>(false);
  const revealText = useRecoilValue(revealTextState);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [selectedDayData, setSelectedDayData] = useState<ChristmasGiveawayType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isMobileSwiper = useMediaQuery(theme.breakpoints.down('md'));
  const serverDayTime = useServerTime();
  const [player] = useRecoilState(playerState);
  const playerId = player?.id?.toString() ?? '';
  const { giveawayData, fetchGiveawayData, isLoading, loadingWrapper } = useGetChristmasGiveaway({
    playerId
  });

  const currentDate =
    serverDayTime &&
    `${serverDayTime?.getFullYear()}-${serverDayTime?.getMonth()}-${serverDayTime?.getDate()}`;

  useEffect(() => {
    if (serverDayTime && christmasGiveaway.length) {
      const newIndex = christmasGiveaway.findIndex(
        (day) => day.attributes.Day === serverDayTime?.getDate() && serverDayTime?.getMonth() === 11
      );
      setTodayIndex(newIndex);
      if (swiperInstance && newIndex !== null && !swiperInstance.destroyed) {
        swiperInstance?.slideTo(newIndex);
      }
    }
  }, [serverDayTime, christmasGiveaway, swiperInstance]);

  useEffect(() => {
    const currentDayOfMonth = serverDayTime?.getDate();
    currentDayOfMonth &&
      setIsPastDay((selectedDayData?.attributes.Day ?? currentDayOfMonth + 1) < currentDayOfMonth);
  }, [selectedDayData]);

  const getTimeRemaining = (endDateTime: string | Date, serverTime: Date) => {
    const endDateStr = endDateTime instanceof Date ? endDateTime.toISOString() : endDateTime;
    const total = Date.parse(endDateStr) - Date.parse(serverTime.toISOString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const handleDayClick = (dayData: ChristmasGiveawayType) => {
    if (serverDayTime && (serverDayTime.getMonth() < 11 || serverDayTime.getDate() < 1)) {
      return;
    }
    const isFutureDate =
      serverDayTime &&
      serverDayTime.getDate() < dayData.attributes.Day &&
      serverDayTime.getMonth() === 11;
    const isOpened = isDayOpened(dayData.attributes.Day, 11, 2023, giveawayData);
    const isMissed = isDayMissed(
      dayData.attributes.Day,
      11,
      2023,
      giveawayData,
      serverDayTime as Date
    );

    if (!isFutureDate && (isOpened || !isMissed)) {
      setSelectedDayData(dayData);
      setIsModalOpen(true);
    }
  };
  const handleClose = () => {
    if (
      selectedDayData?.attributes.PrizeType === 'Bonus' &&
      !isPastDay &&
      revealText === 'Activate'
    ) {
      setShowCancelDialog(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleOnConfirmCancel = () => {
    setIsModalOpen(false);
    setShowCancelDialog(false);
  };
  const handleCloseCancelDialog = () => {
    setShowCancelDialog(false);
  };

  const renderDay = (dayData: ChristmasGiveawayType) => {
    const isMissed = isDayMissed(
      dayData.attributes.Day,
      11,
      2023,
      giveawayData,
      serverDayTime as Date
    );
    const isOpened = isDayOpened(dayData.attributes.Day, 11, 2023, giveawayData);

    const rowSpan = isRowSpanDay(dayData.attributes.Day);
    const columnSpan = isColumnSpanDay(dayData.attributes.Day);
    const isToday =
      serverDayTime?.getDate() === dayData.attributes.Day && serverDayTime?.getMonth() === 11;
    const isFuture =
      serverDayTime &&
      serverDayTime.getDate() < dayData.attributes.Day &&
      serverDayTime.getMonth() === 11;

    let timeRemaining = null;
    if (isFuture) {
      const giveawayDate = new Date(
        serverDayTime?.getFullYear(),
        serverDayTime.getMonth(),
        dayData.attributes.Day
      );
      timeRemaining = getTimeRemaining(giveawayDate, serverDayTime);
    }

    if (!dayData) {
      return null;
    }

    const isDay25 = dayData.attributes.Day === 25;
    let imageSrc = `${assets}/images/christmas-giveaway/gift.svg`;

    if (isDay25 && isOpened) {
      imageSrc = `${assets}/images/christmas-giveaway/opened-gift.png`;
    } else if (isDay25) {
      imageSrc = `${assets}/images/christmas-giveaway/final-gift.png`;
    } else if (isOpened) {
      imageSrc = `${assets}/images/christmas-giveaway/opened-gift.png`;
    } else if (isMissed) {
      imageSrc = `${assets}/images/christmas-giveaway/missed-gift.svg`;
    }

    return (
      <>
        <CalendarDay
          key={dayData.attributes.Day}
          isMissed={isMissed}
          isToday={isToday}
          rowSpan={rowSpan}
          columnSpan={columnSpan}
          onClick={() => handleDayClick(dayData)}
          isFuture={isFuture as boolean}
        >
          {!isMobileSwiper && <h3>{`Day ${dayData.attributes.Day}`}</h3>}
          <GiftBoxImage
            src={imageSrc}
            alt={`Prize for day ${dayData.attributes.Day}`}
            width={isMobileSwiper ? 145 : 80}
            height={isMobileSwiper ? 145 : 80}
          />
          {isFuture && (
            <StyledTimeRemaining className="time-remaining">
              {timeRemaining
                ? `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`
                : ''}
            </StyledTimeRemaining>
          )}
          {!isMobileSwiper && !isFuture && !isToday && serverDayTime?.getMonth() === 11 && (
            <DayLabel>{isOpened ? 'Opened' : 'Missed'}</DayLabel>
          )}
        </CalendarDay>
        {isMobileSwiper && (
          <SwiperSlideLabel>
            {isOpened
              ? 'Opened'
              : isMissed && serverDayTime?.getMonth() === 11
              ? 'Missed'
              : `Day ${dayData.attributes.Day}`}
          </SwiperSlideLabel>
        )}
      </>
    );
  };

  return isLoading ? (
    loadingWrapper
  ) : (
    <>
      {isMobileSwiper ? (
        <>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3.5}
            centeredSlides={true}
            freeMode={true}
            initialSlide={todayIndex}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {christmasGiveaway.map((data) => (
              <SwiperSlide key={data.attributes.Day}>
                <SwiperSlideNavigation>{`Day ${data.attributes.Day}`}</SwiperSlideNavigation>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setSwiperInstance}
            spaceBetween={7}
            slidesPerView={1.5}
            centeredSlides={true}
            initialSlide={todayIndex}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs]}
          >
            {christmasGiveaway.map((data) => (
              <>
                <SwiperSlide key={data.attributes.Day}>
                  <SwiperSlideMobile>{renderDay(data)}</SwiperSlideMobile>
                </SwiperSlide>
              </>
            ))}
          </Swiper>
        </>
      ) : (
        <CalendarGrid>{christmasGiveaway.map((prize) => renderDay(prize))}</CalendarGrid>
      )}

      <ScratchCardComponent
        dayData={selectedDayData}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        showCancelDialog={showCancelDialog}
        isPastDay={isPastDay}
        currentDayData={giveawayData.find((item) => item.day === currentDate)}
        handleCloseCancelDialog={handleCloseCancelDialog}
        handleOnConfirmCancel={handleOnConfirmCancel}
        player={player}
        fetchGiveawayData={fetchGiveawayData}
        currentDate={currentDate}
      />
    </>
  );
};
