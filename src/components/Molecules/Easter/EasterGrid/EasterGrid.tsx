import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  EasterGridContainer,
  EasterRandomize,
  HoverText,
  ImageWrapper,
  SingleEaster
} from '@/components/Molecules/Easter/Easter.styles';
import Image from 'next/image';
import { EasterTypes, Egg } from '@/components/Molecules/Easter/Easter.types';
import { getEggImageSrc } from '@/utils/easterUtils';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import Typography from '@/components/Atoms/Typography/Typography';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/index';
import { assets } from '@/config/assets';
import DepositRequiredModal from '../EasterModals/DepositRequiredModal';
import EggCracker from '../../easter-campaign/EggCracker';
import { useLoader } from '@/hooks/useLoader';
import EasterActiveEggDialogCard from '../EasterModals/EasterActiveEggDialogCard';
import { EasterCampaignType } from '@/graphql/types/easterCampaignTypes';
import { useGetPlayer } from '@/hooks/useGetPlayer';
import { useGetEasterGiveaway } from '@/hooks/useGetEasterGiveaway';
import { useGetServerTimeInterval } from '@/hooks/useGetServerTimeInterval';
import { CrackedIcon } from '@/components/Molecules/Easter/EasterGrid/CrackedIcon';
import { useRecoilValue } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { rakebackToggleState } from '@/components/state/rakebackToggleState';
import { profileDropDownState } from '@/components/state/profileDropDownState';
import { showFirstTimeBonusModal } from '@/state/showFirstTimeBonusModal';

const EasterGrid: React.FC<EasterTypes> = ({
  mockedEggs,
  depositQualified,
  easterCampaignData,
  formattedDate
}) => {
  const { loadingWrapper } = useLoader('coin');
  const { player } = useGetPlayer();
  const playerId = player?.id?.toString() ?? '';
  const { giveawayData } = useGetEasterGiveaway({ playerId });
  const [eggs, setEggs] = useState<Egg[]>(mockedEggs);
  const [easterData, setEasterData] = useState<EasterCampaignType>();
  const [allCrackedEggs, setAllCrackedEggs] = useState<boolean | undefined>();
  const { t } = useTranslations();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [hoveredEggId, setHoveredEggId] = useState<number | null>();
  const drawerOpen = useRecoilValue(drawerState);
  const rakeBackToggle = useRecoilValue(rakebackToggleState);
  const profileDropDown = useRecoilValue(profileDropDownState);
  const isFirstTimeBonusDepModal = useRecoilValue(showFirstTimeBonusModal);

  const isMobile = UseMediaQuery(576);
  const swiperRef = useRef<SwiperRef>(null);

  const getAllCrackedEggs = () => {
    if (giveawayData.length > 0) {
      crackAllEggs();
      setAllCrackedEggs(true);
    }
  };

  const { serverDateTime } = useGetServerTimeInterval('Europe/Berlin');

  useEffect(() => {
    if (serverDateTime) {
      const serverDate = new Date(serverDateTime).toISOString().slice(0, 10);
      const lastVisitDate = localStorage.getItem('lastVisitDate');

      if (lastVisitDate !== serverDate) {
        localStorage.removeItem('easterEggs');
        localStorage.setItem('lastVisitDate', serverDate);
      }
    }
  }, [serverDateTime]);

  useEffect(() => {
    getAllCrackedEggs();
    const singleCampaign = easterCampaignData?.find(
      (item) => dayjs(item.attributes.Date).format('DD/MM/YYYY') === formattedDate
    );
    const activeEgg = {
      eggId: singleCampaign?.id || '',
      isBonus: singleCampaign?.attributes.IsBonus || false,
      isClicked: false
    };
    const indexToRemove = singleCampaign?.attributes?.EggPosition ?? -1;
    const filteredEggs = [
      ...mockedEggs.slice(0, indexToRemove - 1),
      activeEgg,
      ...mockedEggs.slice(indexToRemove)
    ];

    setEasterData(singleCampaign);
    setEggs(filteredEggs);

    const savedData = localStorage.getItem('easterEggs');
    const savedEggsData = savedData ? JSON.parse(savedData) : null;

    if (savedEggsData) {
      setEggs(savedEggsData.eggs);
    }
  }, [giveawayData, easterCampaignData, mockedEggs]);

  const onClickEgg = (eggId: string | number) => {
    const egg = eggs.find((egg) => egg.eggId === eggId);
    if (egg && egg.isBonus) {
      crackAllEggs();
      setAllCrackedEggs(true);
      setisModalOpen(true);
    } else {
      const updatedEggs = eggs.map((egg) => {
        if (egg.eggId === eggId) {
          return { ...egg, isClicked: true };
        }
        return egg;
      });

      setEggs(updatedEggs);
      localStorage.setItem(
        'easterEggs',
        JSON.stringify({ date: new Date().toLocaleDateString(), eggs: updatedEggs })
      );
    }
  };

  const crackRandomEgg = () => {
    const uncrackedEggs = eggs.filter((egg) => !egg.isClicked);
    if (uncrackedEggs.length > 0) {
      const randomIndex = Math.floor(Math.random() * uncrackedEggs.length);
      const randomEgg = uncrackedEggs[randomIndex];
      onClickEgg(randomEgg?.eggId);
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(randomIndex);
      }
    }
  };

  const crackAllEggs = () => {
    const allCrackedEggs = eggs.map((egg) => ({ ...egg, isClicked: true }));
    setEggs(allCrackedEggs);
    setAllCrackedEggs(true);
    setisModalOpen(false);
    localStorage.setItem(
      'easterEggs',
      JSON.stringify({ date: new Date().toLocaleDateString(), eggs: allCrackedEggs })
    );
  };

  if (depositQualified === undefined) {
    return <div>{loadingWrapper}</div>;
  }
  return (
    <EasterGridContainer>
      {depositQualified &&
        !isFirstTimeBonusDepModal &&
        (!isMobile || (!drawerOpen && !rakeBackToggle && !profileDropDown)) && (
          <DepositRequiredModal />
        )}
      <Swiper
        ref={swiperRef}
        slidesPerView={6}
        grid={{
          rows: 4,
          fill: 'row'
        }}
        modules={[Grid]}
        breakpoints={{
          250: {
            slidesPerView: 2.2,
            centeredSlides: true,
            grid: {
              rows: 1
            }
          },
          991: {
            slidesPerView: 3,
            centeredSlides: true,
            grid: {
              rows: 1
            }
          },
          992: {
            slidesPerView: 6,
            grid: {
              rows: 4
            }
          }
        }}
      >
        {eggs.map((item, index) => (
          <SwiperSlide key={item.eggId}>
            <SingleEaster>
              {!item.isClicked && (
                <Typography type="Heading" size="h5" color="var(--white)">
                  {t('crackIt')}
                </Typography>
              )}

              {!depositQualified ? (
                <ImageWrapper className="image-wrapper" onClick={() => onClickEgg(item.eggId)}>
                  {!item.isBonus || !item.isClicked ? (
                    <div
                      onMouseEnter={() => setHoveredEggId(item.eggId as number)}
                      onMouseLeave={() => setHoveredEggId(null)}
                    >
                      <HoverText
                        style={{
                          marginBottom: '1px'
                        }}
                        isVisible={hoveredEggId === item.eggId && !item.isClicked}
                        isTop
                      >
                        Crack It
                      </HoverText>
                      <EggCracker
                        wholeEggImg={getEggImageSrc(index, false)}
                        crackedEggImg={getEggImageSrc(index, true)}
                        isClicked={item.isClicked}
                      />
                      {hoveredEggId === item.eggId && !item.isClicked && (
                        <HoverText
                          style={{
                            marginTop: '0.5px'
                          }}
                          isVisible={hoveredEggId === item.eggId && !item.isClicked}
                          isTop
                        >
                          Now
                        </HoverText>
                      )}
                    </div>
                  ) : (
                    <Image
                      src={`${assets}/images/easter-egg-found.svg`}
                      width={83}
                      height={83}
                      alt="blank egg"
                    />
                  )}
                </ImageWrapper>
              ) : (
                <Image
                  src={`${assets}/images/gray-egg.svg`}
                  width={83}
                  height={83}
                  alt="blank egg"
                  style={{
                    opacity: 0.3
                  }}
                />
              )}
              {!item.isClicked && (
                <Typography type="Heading" size="h5" color="var(--white)">
                  {t('now')}
                </Typography>
              )}
            </SingleEaster>
          </SwiperSlide>
        ))}
      </Swiper>
      <EasterRandomize>
        <Typography type="Heading" size="h5" color="var(--white)">
          {t('randomizeEasterText')}
        </Typography>
        <Button
          icon={<CrackedIcon />}
          disabled={depositQualified || allCrackedEggs}
          variant="Primary"
          handleClick={crackRandomEgg}
        >
          {t('pickRandom')}
        </Button>
      </EasterRandomize>

      <EasterActiveEggDialogCard
        open={isModalOpen}
        eggs={eggs}
        easterData={easterData}
        playerId={playerId}
        crackAllEggs={crackAllEggs}
        setisModalOpen={setisModalOpen}
      />
    </EasterGridContainer>
  );
};

export default EasterGrid;
