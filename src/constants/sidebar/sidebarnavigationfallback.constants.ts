import { MenuItem } from '@/components/Organisms/Drawer/Drawer.type';
import { assets as assetPath } from '@/config/assets';
import { CountryLocaleInfo } from '@/components/Organisms/Drawer/CountryLocaleDropdown/CountryLocaleDropdown.type';

export const countriesLocale: CountryLocaleInfo[] = [
  {
    icon: `${assetPath}/images/locale/global-int.svg`,
    title: 'English (International)',
    locale: 'en'
  },
  {
    icon: `${assetPath}/images/locale/flag_NZ.svg`,
    title: 'English (NZ)',
    locale: 'en-NZ'
  },
  {
    icon: `${assetPath}/images/locale/flag-canada.svg`,
    title: 'English (CA)',
    locale: 'en-CA'
  },
  {
    icon: `${assetPath}/images/locale/canada-fr.svg`,
    title: 'French (FR-CA)',
    locale: 'fr-CA'
  }
];

export const menuItems: MenuItem[] = [
  {
    icon: `${assetPath}/images/menuSeven.svg`,
    title: 'Promotions',
    url: '/promotions',
    subItems: [
      {
        icon: `${assetPath}/images/sports-sub-menu/home.svg`,
        title: 'viewAll',
        url: '/promotions',
        isLoggedIn: false,
        isSubmenu: false,
        isTranslation: true
      },
      {
        icon: `${assetPath}/images/f1-leaderboard/trophy.png`,
        title: 'tournamentLeaderboard',
        url: '/leaderboard',
        isLoggedIn: false,
        isSubmenu: false,
        isTranslation: true
      }
    ],
    categories: []
  },
  {
    icon: `${assetPath}/images/menuOne.svg`,
    title: 'Casino',
    url: '/casino',
    subItems: [
      {
        icon: `${assetPath}/images/sports-sub-menu/home.svg`,
        title: 'Home',
        url: '/casino',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/favourites.svg`,
        title: 'Favourites',
        url: '/casino/favorites',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/tournament.svg`,
        title: 'Tournament',
        url: '/casino/tournament',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/slots.svg`,
        title: 'Slots',
        url: '/casino/slots',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/live-casino.svg`,
        title: 'Live Casino',
        url: '/casino/live-casino',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/new-releases.svg`,
        title: 'New Releases',
        url: '/casino/new-games',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/table-games.svg`,
        title: 'Table Games',
        url: '/casino/table-games',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/game-shows.svg`,
        title: 'Game Shows',
        url: '/casino/game-shows',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/blackjack.svg`,
        title: 'Blackjack',
        url: '/casino/blackjack',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      },
      {
        icon: `${assetPath}/images/casino-navigation/roulette.svg`,
        title: 'Roulette',
        url: '/casino/roulette',
        isSubmenu: true,
        isLoggedIn: false,
        isTranslation: false
      }
    ],
    categories: []
  },

  {
    icon: `${assetPath}/images/menuTwo.svg`,
    title: 'Sports',
    url: '/sports',
    categories: [
      {
        name: 'Default',
        isTranslation: false,
        subItems: [
          {
            icon: `${assetPath}/images/sports-sub-menu/home.svg`,
            title: 'Home',
            url: '/sports',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/my-bets.svg`,
            title: 'My Bets',
            url: '/sports/my-bets',
            isSubmenu: true,
            isLoggedIn: true,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/live-events.svg`,
            title: 'Live Events',
            url: '/sports/live',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/starting-soon.svg`,
            title: 'Starting Soon',
            url: '/sports/upcoming',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/favourite-sports.svg`,
            title: 'Favourite Sports',
            url: '/sports/top-sports',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          }
        ]
      },
      {
        name: 'Popular',
        isTranslation: false,
        subItems: [
          {
            icon: `${assetPath}/images/sports-sub-menu/nrl.svg`,
            title: 'NRL',
            url: '/sports/nrl',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/ufc.svg`,
            title: 'UFC',
            url: '/sports/ufc',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/nba.svg`,
            title: 'NBA',
            url: '/sports/nba',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/nhl.svg`,
            title: 'NHL',
            url: '/sports/nhl',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/epl.svg`,
            title: 'EPL',
            url: '/sports/epl',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          }
        ]
      },
      {
        name: 'Top Sports',

        isTranslation: false,
        subItems: [
          {
            icon: `${assetPath}/images/sports-sub-menu/rugby.svg`,
            title: 'Rugby',
            url: '/sports/rugby',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/basketball.svg`,
            title: 'Basketball',
            url: '/sports/basketball',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/mma.svg`,
            title: 'MMA',
            url: '/sports/mma',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/soccer.svg`,
            title: 'Soccer',
            url: '/sports/soccer',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/horse-racing.svg`,
            title: 'Horse Racing',
            url: '/sports/horse-racing',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          }
        ]
      },
      {
        name: 'All Sports',
        isTranslation: false,
        subItems: [
          {
            icon: `${assetPath}/images/sports-sub-menu/soccer.svg`,
            title: 'Soccer',
            url: '/sports/soccer',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/basketball.svg`,
            title: 'Basketball',
            url: '/sports/basketball',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/tennis.svg`,
            title: 'Tennis',
            url: '/sports/tennis',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/ice-hockey.svg`,
            title: 'Ice Hockey',
            url: '/sports/ice-hockey',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/volleyball.svg`,
            title: 'Volleyball',
            url: '/sports/volleyball',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/table-tennis.svg`,
            title: 'Table Tennis',
            url: '/sports/table-tennis',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/e-sports-plus-outlined.svg`,
            title: 'E-sports +',
            url: '/sports/e-sports-plus',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/motorsport.svg`,
            title: 'Motorsport',
            url: '/sports/motorsport',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/cycling.svg`,
            title: 'Cycling',
            url: '/sports/cycling',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/mma.svg`,
            title: 'MMA',
            url: '/sports/mma',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/afl-outlined.svg`,
            title: 'American Football',
            url: '/sports/american-football',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/aussie-rules.svg`,
            title: 'Aussie Rules',
            url: '/sports/aussie-rules',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/badminton.svg`,
            title: 'Badminton',
            url: '/sports/badminton',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/baseball.svg`,
            title: 'Baseball',
            url: '/sports/baseball',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/bandy.svg`,
            title: 'Bandy',
            url: '/sports/bandy',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/boxing.svg`,
            title: 'Boxing',
            url: '/sports/boxing',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/cricket.svg`,
            title: 'Cricket',
            url: '/sports/cricket',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/darts.svg`,
            title: 'Darts',
            url: '/sports/darts',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/golf.svg`,
            title: 'Golf',
            url: '/sports/golf',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/handball.svg`,
            title: 'Handball',
            url: '/sports/handball',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/rugby-outlined.svg`,
            title: 'Rugby League',
            url: '/sports/rugby-league',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/rugby-filled.svg`,
            title: 'Rugby',
            url: '/sports/rugby',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/snooker.svg`,
            title: 'Snooker',
            url: '${assets}/sports/snooker',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/gaelic-football.svg`,
            title: 'Gaelic Football',
            url: '/sports/gaelic-football',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          },
          {
            icon: `${assetPath}/images/sports-sub-menu/gaelic-hurling.svg`,
            title: 'Gaelic Hurling',
            url: '/sports/gaelic-hurling',
            isSubmenu: true,
            isLoggedIn: false,
            isTranslation: false
          }
        ]
      }
    ],
    subItems: []
  },
  { divider: true, isSubmenu: false, categories: [], subItems: [] },
  {
    icon: `${assetPath}/images/menuThree.svg`,
    title: 'VIP Program',
    url: '/vip-program',
    isSubmenu: false,
    categories: [],
    subItems: []
  },
  {
    icon: `${assetPath}/images/sponsorShipIcon.svg`,
    title: 'Sponsorship',
    url: '/sponsorship',
    isSubmenu: false,
    categories: [],
    subItems: []
  },

  {
    icon: `${assetPath}/images/menuSix.svg`,
    title: 'Blog',
    url: '/blog',
    isSubmenu: false,
    categories: [],
    subItems: []
  },
  {
    icon: `${assetPath}/images/drawer/support-icon.svg`,
    customAction: 'intercom',
    title: 'Live Support',
    isSubmenu: false,
    categories: [],
    subItems: []
  }
];
