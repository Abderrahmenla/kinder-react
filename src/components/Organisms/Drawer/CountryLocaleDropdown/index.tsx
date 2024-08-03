import Cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { localeState } from '@/components/state/localeState';
import { DropDown, IconContainer, IconLabel, Icon } from '@/components/Atoms/DropDown';
import { assets } from '@/config/assets';
import {
  CountryLocaleDropdownContainer,
  countryLocaleDropdown,
  countryLocaleDropdownList,
  countryLocaleDropdownListItem
} from './CountryLocaleDropdownStyle';
import { setAltenarConfig } from '@/utils/alternarUtils';
import { isAltenarScriptInitialized } from '@/components/state/isAltenarScriptInitialized';
import { ALTENAR_CULTURE } from '@/constants/index';
import { AlternarCultureTypes } from '@/graphql/types/sportsbookTypes';
import { CountryLocaleInfo } from './CountryLocaleDropdown.type';
import { transformUploadUrls } from '@/utils/transformAssetsUtil';

const formatLocale = (locale: string): string => {
  return locale
    .split('-')
    .map((part, index) => (index === 0 ? part.toLowerCase() : part.toUpperCase()))
    .join('-');
};

const renderMenuItem = (
  item: { icon?: string; title?: string },
  open?: boolean,
  dropdown?: boolean
) => (
  <IconContainer dropdown={dropdown}>
    {item.icon && <Icon src={transformUploadUrls(item.icon)} />}
    <IconLabel>{open ? item.title : ''}</IconLabel>
  </IconContainer>
);

const CountryLocaleDropdown: React.FC<{
  open: boolean;
  isMobile: boolean;
  countriesLocale: CountryLocaleInfo[];
}> = ({ open, isMobile, countriesLocale }) => {
  const router = useRouter();
  const setCurrentLocale = useSetRecoilState(localeState);
  const [title, setTitle] = useState<string>('English (International)');
  const [icon, setIcon] = useState<string>(`${assets}/images/locale/global-int.svg`);
  const isAltenarInitialized = useRecoilValue(isAltenarScriptInitialized);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const urlLocale = (pathSegments[1] || '').toLowerCase();
      const activeLocale = urlLocale.length ? urlLocale : 'en';
      const currentLocaleInfo = countriesLocale?.find(
        (item) => item.locale.toLowerCase() === activeLocale
      );
      if (currentLocaleInfo) {
        setTitle(currentLocaleInfo.title);
        setIcon(currentLocaleInfo.icon);
      }
    }
  }, [router.pathname, countriesLocale]);

  const handleOptionClick = (text: string, image: string, locale: string) => {
    setTitle(text);
    setIcon(image);
    const path = router.asPath;
    Cookie.set('NEXT_LOCALE', formatLocale(locale), { expires: 365 * 10, path: '/' });
    setCurrentLocale(formatLocale(locale));
    if (isAltenarInitialized) {
      const currentLocal = locale.toLocaleLowerCase();
      const alternarCulture = ALTENAR_CULTURE[currentLocal as keyof AlternarCultureTypes];
      const config = {
        integration: 'spinbet',
        culture: alternarCulture ?? ALTENAR_CULTURE.en
      };
      setAltenarConfig(config);
    }
    return router.push(path, path, { locale: locale.toLowerCase() });
  };
  return (
    <CountryLocaleDropdownContainer open={open}>
      <DropDown
        dropdownItems={countriesLocale}
        label={open ? title : ''}
        isDropdownListLogo={true}
        icon={transformUploadUrls(icon)}
        caret={open}
        closeDropdownListAfterItemClick
        polygonLogoLeft="10px"
        activeDropdownItem={true}
        style={{ height: '300px' }}
        styleDropdownList={countryLocaleDropdownList(open)}
        styleDropdownListItemStyle={(item) =>
          countryLocaleDropdownListItem(open, countriesLocale.length === item.key)
        }
        styleDropdown={countryLocaleDropdown(open, isMobile)}
        handleItemClick={(_, { icon, title, locale }) => handleOptionClick(title, icon, locale)}
        renderContent={(item) => renderMenuItem({ ...item }, open, true)}
        size="L"
      />
    </CountryLocaleDropdownContainer>
  );
};

export default CountryLocaleDropdown;
