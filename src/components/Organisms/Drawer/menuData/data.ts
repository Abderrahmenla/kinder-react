import { assets } from '@/config/assets';

export enum Level {
  STARTER = 'Starter'
}
export enum Stars {
  BRONZE = 'Bronze 1',
  DIAMOND = 'Diamond'
}

export const loggedInProfileDropdownData = [
  { title: 'profile' },
  {
    icon: `${assets}/images/loggedIn-profile-images/vip.svg`,
    title: 'VIP',
    key: 'vip',
    url: '#'
  },
  {
    icon: `${assets}/images/loggedIn-profile-images/rewards.svg`,
    title: 'Rewards',
    key: 'rewards',
    url: '#'
  },

  {
    icon: `${assets}/images/loggedIn-profile-images/referral.svg`,
    title: 'Referral',
    key: 'referral',
    url: '/referral/overview'
  },
  {
    icon: `${assets}/images/loggedIn-profile-images/betslips.svg`,
    title: 'Bet Slips',
    key: 'betSlips',
    url: '/sports/my-bets'
  },
  {
    icon: `${assets}/images/loggedIn-profile-images/betHistory.svg`,
    title: 'Bet History',
    key: 'betHistory',
    url: '/settings/bet-history'
  },
  {
    icon: `${assets}/images/loggedIn-profile-images/transactions.svg`,
    title: 'Transactions',
    key: 'transactions',
    url: '/settings/transactions'
  },
  {
    icon: `${assets}/images/loggedIn-profile-images/settings.svg`,
    title: 'Settings',
    key: 'settings',
    url: '/settings/profile'
  },
  {
    title: 'Log out',
    key: 'logout',
    url: '#'
  }
];
