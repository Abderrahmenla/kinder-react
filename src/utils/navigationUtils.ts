import {
  CasinoCategories,
  NavCasinoCategory,
  NavCommonCategory,
  NavLanguageDropdown,
  NavSportsCategory,
  SidebarNav,
  SportsPath
} from '@/graphql/types/navigation';
import { assets } from '@/config/assets';
import { GET_ALL_PROMOTIONS } from '@/graphql/queries/promotions';
import client from '@/graphql/client';
import {
  CategoryItems,
  FeaturedPromotions,
  MenuItem,
  SubItems
} from '@/components/Organisms/Drawer/Drawer.type';
import { CountryLocaleInfo } from '@/components/Organisms/Drawer/CountryLocaleDropdown/CountryLocaleDropdown.type';
import { SportsIdProps } from '@/components/Templates/Sports/Sports.type';
import { GET_SIDEBAR_NAV, GET_SPORTS_PATH } from '@/graphql/queries/navigation';
import { SPORTS_IDS, SPORTS_PATH } from '@/constants/sidebar/sportsfallback';
import {
  countriesLocale,
  menuItems
} from '@/constants/sidebar/sidebarnavigationfallback.constants';

const getParentNav = (data: NavCommonCategory[]) => {
  let parentNavItems: MenuItem[] = [];
  if (data) {
    parentNavItems = data.map((item) => {
      const itemNav: MenuItem =
        item.Name !== 'Divider'
          ? {
              icon: item.Icon.data.attributes.url,
              title: item.Name,
              url: item.Slug,
              customAction: item.CustomAction,
              subItems: [],
              categories: []
            }
          : { divider: true, subItems: [], categories: [] };

      return itemNav;
    });
  }
  return parentNavItems;
};

const getCasinoNavigation = (data: NavCasinoCategory[]) => {
  let casinoItems: SubItems[] = [];
  if (data) {
    casinoItems = data.map((item) => ({
      icon: item.Icon.data.attributes.url,
      title: item.Name,
      url: item.Slug,
      isLoggedIn: item.IsLoggedIn,
      isSubmenu: true,
      isTranslation: false
    }));
  }
  return casinoItems;
};

const getSportsNavigation = (navs: NavSportsCategory[]) => {
  const sportsItems: CategoryItems[] = [];

  if (navs) {
    navs.forEach((nav) => {
      const sectionIndex = sportsItems.findIndex((item) => item.name === nav.Section);

      if (sectionIndex >= 0) {
        sportsItems[sectionIndex].subItems.push({
          icon: nav.Icon.data.attributes.url,
          title: nav.Name,
          url: nav.Slug,
          isLoggedIn: nav.IsLoggedIn,
          isSubmenu: true,
          isTranslation: false
        });
      } else {
        sportsItems.push({
          name: nav.Section,
          isTranslation: true,
          subItems: [
            {
              icon: nav.Icon.data.attributes.url,
              title: nav.Name,
              url: nav.Slug,
              isLoggedIn: nav.IsLoggedIn,
              isSubmenu: true,
              isTranslation: false
            }
          ]
        });
      }
    });
  }
  return sportsItems;
};

export const getLocaleDropdownItems = (languages: NavLanguageDropdown[]) => {
  let languagesItems: CountryLocaleInfo[] = [];
  if (languages) {
    languagesItems = languages.map((item) => {
      return {
        icon: item.Flag.data.attributes.url,
        title: item.LanguageName,
        locale: item.LanguageCode
      };
    });
  }
  return languagesItems;
};

export const getSideBarNavigation = (sidebar: SidebarNav, featuredPromotions: SubItems[]) => {
  const navigations = getParentNav(sidebar.Common);

  navigations.forEach((nav) => {
    if (nav.title === 'Casino') {
      nav.subItems = getCasinoNavigation(sidebar.Casino);
    } else if (nav.title === 'Sports') {
      nav.categories = getSportsNavigation(sidebar.Sports);
    } else if (nav.title === 'Promotions') {
      nav.subItems = featuredPromotions;
    }
  });

  return navigations;
};

export const getFeaturedPromotions = async (locale: string) => {
  try {
    const { data } = await client.query({
      query: GET_ALL_PROMOTIONS,
      variables: { locale }
    });
    let subItems: SubItems[] = [
      {
        icon: `${assets}/images/sports-sub-menu/home.svg`,
        title: 'viewAll',
        url: '/promotions',
        isLoggedIn: false,
        isSubmenu: false,
        isTranslation: true
      }
    ];

    const activeFeaturedPromotions: SubItems[] =
      data?.promotions?.data.map((promotion: FeaturedPromotions) => {
        if (promotion.attributes.Featured) {
          return {
            title: promotion.attributes.PromotionName,
            icon:
              promotion.attributes.Icon?.data?.attributes?.url ||
              `${assets}/images/sports-sub-menu/home.svg`,
            url: `/promotions/${promotion.attributes.Slug}`,
            isLoggedIn: false,
            isSubmenu: true,
            isTranslation: false
          };
        } else {
          return {
            title: '',
            icon: '',
            url: '',
            isLoggedIn: false,
            isSubmenu: true,
            isTranslation: false
          };
        }
      }) || [];

    const filteredPromotions: SubItems[] = activeFeaturedPromotions.filter(
      (item) => item.url !== '' && item.icon !== '' && item.title !== ''
    );

    if (filteredPromotions.length) subItems = [...subItems, ...filteredPromotions];

    return subItems;
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return [];
  }
};

export const getDropdownItems = (item: MenuItem) => [
  ...(item.subItems || []),
  ...(item.categories?.flatMap((category) => {
    return [
      { isCategoryHeader: true, title: category.name, isTranslation: category.isTranslation },
      ...category.subItems
    ];
  }) || [])
];

export const getSportsId = (sports: NavSportsCategory[]) => {
  let sportsId: SportsIdProps[] = [];

  if (sports) {
    sportsId = sports.map((sport) => ({
      slug: sport.Slug,
      categoryId: Number(sport.CategoryId),
      sportsId: Number(sport.sportsID),
      championshipId: Number(sport.championshipsID)
    }));
  }

  return sportsId;
};

export const getSportsIdBySlug = (slug: string, sports: SportsIdProps[]) => {
  const sportIdIndex = sports.findIndex((sport) => sport.slug === slug);
  return sportIdIndex >= 0 ? sports[sportIdIndex].categoryId : 0;
};

export const getCasinoCategories = (casino: NavCasinoCategory[]) => {
  let casinoCategories: CasinoCategories[] = [];

  if (casino) {
    casinoCategories = casino.map((item) => ({
      name: item.Name,
      slug: item.Slug,
      mobileCategoryID: item.CategoryIdMobile,
      desktopCategoryID: item.CategoryIdDesktop
    }));
  }

  return casinoCategories;
};

export const getSidebarNav = async (formattedLocale: string) => {
  try {
    const { data } = await client.query({
      query: GET_SIDEBAR_NAV,
      variables: { locale: formattedLocale }
    });
    const featuredPromotions: SubItems[] = await getFeaturedPromotions(formattedLocale);

    let navigation: MenuItem[] = menuItems;
    let locales: CountryLocaleInfo[] = countriesLocale;
    let sportsID: SportsIdProps[] = SPORTS_IDS;
    let casinoCategories: CasinoCategories[] = [];

    if (data && data.sidebar?.data?.attributes) {
      const sidebar = data.sidebar.data.attributes;
      if (
        sidebar.Casino.length &&
        sidebar.Sports.length &&
        sidebar.Common.length &&
        sidebar.Languages.length
      ) {
        navigation = getSideBarNavigation(sidebar, featuredPromotions);
        locales = getLocaleDropdownItems(sidebar.Languages);
        sportsID = getSportsId(sidebar.Sports);
        casinoCategories = getCasinoCategories(sidebar.Casino);
      } else {
        console.warn('Navigation: Sidebar is empty. Returning fallback values');
      }
    }

    return { navigation, locales, sportsID, casinoCategories };
  } catch (error) {
    console.error(error);
    console.warn('Navigation: Error on fetching sidebar. Returning fallback values');
    return {
      navigation: menuItems,
      locales: countriesLocale,
      sportsID: SPORTS_IDS,
      casinoCategories: []
    };
  }
};

export const triggerCustomAction = (customAction: string) => {
  if (customAction === 'intercom' && window) {
    window.Intercom('show');
  }
};

export const firstCharTolowercase = (text: string) => {
  return text.charAt(0).toLocaleLowerCase() + text.slice(1);
};

const getSportsSlug = (data: NavSportsCategory[]) => {
  let paths: SportsPath[] = [];
  if (data) {
    paths = [
      ...new Map(
        data.map((item) => [JSON.stringify(item), { params: { sportsContent: item.Slug } }])
      ).values()
    ];
  }

  return paths;
};

export const getSportsPath = async (formattedLocale: string) => {
  try {
    const { data } = await client.query({
      query: GET_SPORTS_PATH,
      variables: { locale: formattedLocale }
    });
    let sportsPath: SportsPath[] = SPORTS_PATH;

    if (data && data.sidebar?.data?.attributes) {
      const sidebar = data.sidebar.data.attributes;
      if (sidebar.Sports.length) {
        const { Sports: sportsPathData } = sidebar;
        sportsPath = getSportsSlug(sportsPathData);
      } else {
        console.warn('Navigation: Sports Sidebar is empty. Returning fallback values');
      }
    }
    return { sportsPath };
  } catch (error) {
    console.error(error);
    console.warn('Navigation: Error on fetching sports sidebar. Returning fallback values');
    return { sportsPath: SPORTS_PATH };
  }
};

export const getDefaultCasinoCategoryIds = (
  casinoData: CasinoCategories[],
  categoryName: string
) => {
  const casinoCategory = casinoData.find(
    (category) => category.slug === `/casino/${categoryName.toLowerCase()}`
  );

  return casinoCategory ? casinoCategory : null;
};
