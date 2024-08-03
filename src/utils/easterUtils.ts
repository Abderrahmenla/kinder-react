import { EasterCampaignType } from './../graphql/types/easterCampaignTypes';
import { assets } from '@/config/assets';
import dayjs from 'dayjs';

export const mockedEggs = [
  {
    eggId: 'bonusEgg789',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg790',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg791',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg792',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg793',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg794',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg795',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg796',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg797',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg798',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg799',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg800',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg801',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg802',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg803',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg804',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg805',
    isBonus: false,
    isClicked: false
  },
  {
    eggId: 'bonusEgg806',
    isBonus: false,
    isClicked: false
  }
];

export const getEggImageSrc = (index: number, isClicked: boolean) => {
  const eggNumber = (index % 3) + 1;
  const eggState = isClicked ? '-cracked' : '';
  return `${assets}/images/easter-egg${eggNumber}${eggState}.svg`;
};

export const closestDate = (dates: EasterCampaignType[]) => {
  const currentDate = dayjs();
  let closestDateString = null;
  let closestDate = null;

  for (const dateStr of dates) {
    const date = dayjs(dateStr?.attributes?.Date);
    if (date.isAfter(currentDate) && (closestDate === null || date.isBefore(closestDate))) {
      closestDate = date;
      closestDateString = dateStr?.attributes?.Date;
    }
  }

  if (closestDateString) {
    return closestDateString;
  }
};

export const futureTargetDates = (dates: EasterCampaignType[]) => {
  const currentDate = dayjs();
  return dates.filter((dateStr) => dayjs(dateStr?.attributes?.Date).isAfter(currentDate));
};
