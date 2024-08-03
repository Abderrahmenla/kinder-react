import { DropDownList } from '@/components/Atoms/DropDown';
import { MenuDropdownContainer, WalletDropdownContainer } from '../NavBarStyles';
import { assets } from '@/config/assets';
import React from 'react';
import { useMediaQuery } from '@mui/material';
import formatCurrency from '@/utils/formatUtils/formatCurrency';
import { useTranslations } from '@/hooks/useTranslations';
import { Account } from '@/pages/api/player/getBalanceTypes';
import Typography from '@/components/Atoms/Typography/Typography';

type AccountInfoDropdownPropTypes = {
  isExtended: boolean;
  filteredData: Account[];
};

const renderContent = (item: any) => (
  <WalletDropdownContainer>
    <Typography size="b2" color="var(--darker-white)">
      {formatCurrency(item.balance)}
    </Typography>
    <Typography size="b3" color="var(--darker-white)">
      {item.type}
    </Typography>
  </WalletDropdownContainer>
);

export const AccountInfoDropdown = ({ isExtended, filteredData }: AccountInfoDropdownPropTypes) => {
  const { t } = useTranslations();
  const is360MaxWidth = useMediaQuery('(max-width:360px)');

  const translatedData = filteredData.map((item: any) => {
    const type = item.accountType === 'Money' ? 'realBalance' : 'bonusBalance';
    return { ...item, type: t(type) };
  });

  return (
    <MenuDropdownContainer>
      <DropDownList
        size="L"
        isVisible={isExtended}
        hasDropDownAnimation
        activeIndex={-1}
        polygonLogoLeft={is360MaxWidth ? '80px' : '108px'}
        polygonLogoUrl={`${assets}/images/polygonIconNavbar.svg`}
        styleDropdownList={{ borderRadius: '6px', background: 'var(--very-dark-violet-5)' }}
        dropdownItems={translatedData}
        isDropdownListLogo
        renderContent={renderContent}
      />
    </MenuDropdownContainer>
  );
};

export default AccountInfoDropdown;
