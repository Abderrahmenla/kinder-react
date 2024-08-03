import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ContentInnerWrapper,
  DropDownLabel,
  ImageContainer,
  InfoFrameWrapper,
  LeftColumn,
  RightColumn,
  SettingsContainer,
  SettingsDropdown,
  SettingsDropdownLabel,
  SettingsHeaderTitle,
  SettingsMobileHeader,
  settingsDropDownStyle,
  settingsItemDropdownStyle
} from './Settings.style';
import { useTranslations } from '@/hooks/useTranslations';
import { MenuItem, SettingsProps } from './Settings.type';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { assets as assetPath } from '@/config/assets';

const SettingSidebar = dynamic(() => import('../../Organisms/Settings/SettingsSidebar'));
const ProfileIcon = dynamic(() => import('../../Atoms/Icons/ProfileIcon'));
const VerifiedIcon = dynamic(() => import('../../Atoms/Icons/VerifiedIcon'));
const TransactionIcon = dynamic(() => import('../../Atoms/Icons/TransactionIcon'));
const BetHistoryIcon = dynamic(() => import('../../Atoms/Icons/BetHistoryIcon'));
const LoginHistoryIcon = dynamic(() => import('../../Atoms/Icons/LoginHistoryIcon'));
const NoteIcon = dynamic(() => import('../../Atoms/Icons/NoteIcon'));

const GeneralSettings = dynamic(() => import('../../Organisms/Settings/Profile/Profile'));
const Transaction = dynamic(() => import('../../Organisms/Settings/Transaction/TransactionTable'));
const BetHistory = dynamic(() => import('../../Organisms/Settings/BetHistory/BetHistory'));
const LoginHistory = dynamic(() => import('../../Organisms/Settings/LoginHistory/LoginHistory'));
const Verification = dynamic(() => import('../../Organisms/Settings/Verification'));
const ResponsibleGambling = dynamic(
  () => import('../../Organisms/Settings/ResponsibleGambling/ResponsibleGambling')
);

const Settings: React.FC<SettingsProps> = ({ activeSlug }) => {
  const [activeItem, setActiveItem] = useState('');
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(820);
  const [isPageOpen, setIsPageOpen] = useState(activeSlug !== '' ? activeSlug : 'lobby');
  const router = useRouter();

  const renderRightColumnContent = useCallback(
    (activeItem: string) => {
      switch (activeItem) {
        case 'profile':
          return <GeneralSettings isPageOpen={isPageOpen} setIsPageOpen={setIsPageOpen} />;
        case 'transactions':
          return <Transaction />;
        case 'bet-history':
          return <BetHistory />;
        case 'login-history':
          return <LoginHistory />;
        case 'verification':
          return <Verification isPageOpen={isPageOpen} setIsPageOpen={setIsPageOpen} />;
        case 'responsible-gambling':
          return <ResponsibleGambling />;
        default:
          return null;
      }
    },
    [isPageOpen]
  );

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        label: `${t('profile')}`,
        slug: 'profile',
        imageComponent: ({ width, height, fill }) => (
          <ProfileIcon width={width} height={height} fill={fill} />
        )
      },
      {
        label: `${t('verification')}`,
        slug: 'verification',
        imageComponent: ({ width, height, fill }) => (
          <VerifiedIcon width={width} height={height} fill={fill} />
        )
      },
      {
        label: `${t('transactions')}`,
        slug: 'transactions',
        imageComponent: ({ width, height, fill }) => (
          <TransactionIcon width={width} height={height} fill={fill} />
        )
      },
      {
        label: `${t('bet-history')}`,
        slug: 'bet-history',
        imageComponent: ({ width, height, fill }) => (
          <BetHistoryIcon width={width} height={height} fill={fill} />
        )
      },
      {
        label: `${t('login-history')}`,
        slug: 'login-history',
        imageComponent: ({ width, height, fill }) => (
          <LoginHistoryIcon width={width} height={height} fill={fill} />
        )
      },
      {
        label: `${t('responsible-gambling')}`,
        slug: 'responsible-gambling',
        imageComponent: ({ width, height, fill }) => (
          <NoteIcon width={width} height={height} fill={fill} />
        )
      }
    ],
    [t]
  );

  useEffect(() => {
    setActiveItem(activeSlug);
  }, [activeSlug]);

  const handleMenuClick = useCallback((item: string) => {
    setIsPageOpen(item);
    setActiveItem(item);
  }, []);

  const getDropdownItems = useCallback((item: MenuItem) => {
    return (
      <SettingsDropdownLabel>
        {item.imageComponent && item.imageComponent({ width: '15', height: '15', fill: '#A391E2' })}
        <DropDownLabel size="b2">{item.label}</DropDownLabel>
      </SettingsDropdownLabel>
    );
  }, []);

  const handleSettingsChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: any) => {
      router.push(
        {
          pathname: `/settings/${item.slug}`
        },
        undefined,
        { shallow: true }
      );
      handleMenuClick(item.slug);
    },
    [router, handleMenuClick]
  );

  const handleBackButtonClick = useCallback(() => {
    if (isPageOpen === activeSlug) {
      setIsPageOpen('lobby');
    } else if (isPageOpen !== activeSlug && isPageOpen !== 'lobby') {
      setIsPageOpen(activeSlug);
    }

    //TODO: profile and verification button
  }, [isPageOpen, activeSlug]);

  return (
    <ContentInnerWrapper>
      {isMobile ? (
        <>
          <SettingsMobileHeader isPageOpen={isPageOpen !== 'lobby'}>
            {isPageOpen !== 'lobby' ? (
              <>
                <ImageContainer onClick={handleBackButtonClick}>
                  <Image
                    src={`${assetPath}/images/chevron-left-icon.svg`}
                    width={14}
                    height={12}
                    alt="back-button"
                  />
                </ImageContainer>
                <SettingsDropdown
                  dropdownItems={menuItems}
                  leftPositionIcon
                  styleDropdownList={settingsItemDropdownStyle}
                  styleDropdown={settingsDropDownStyle}
                  icon={`${assetPath}/images/${activeItem}-page-icon.svg`}
                  label={t(activeItem)}
                  renderContent={(item: any) => getDropdownItems(item)}
                  handleItemClick={handleSettingsChange}
                  closeDropdownListAfterItemClick
                />
              </>
            ) : (
              <>
                <Image
                  src={`${assetPath}/images/settings-page-icon.svg`}
                  width={16}
                  height={16}
                  alt="settings-icon"
                />
                <SettingsHeaderTitle size="b2">{t('settings')}</SettingsHeaderTitle>
              </>
            )}
          </SettingsMobileHeader>
          <SettingsContainer
            isMobile={isMobile}
            isResponsibleGambling={activeItem === 'responsible-gambling'}
          >
            {isPageOpen !== 'lobby' ? (
              renderRightColumnContent(activeItem)
            ) : (
              <SettingSidebar
                menuItems={menuItems}
                activeItem={activeItem}
                setActiveItem={handleMenuClick}
              />
            )}
          </SettingsContainer>
        </>
      ) : (
        <InfoFrameWrapper>
          <LeftColumn>
            <SettingSidebar
              menuItems={menuItems}
              activeItem={activeItem}
              setActiveItem={handleMenuClick}
            />
          </LeftColumn>
          <RightColumn isMobile={isMobile} isProfile={activeItem === 'profile'}>
            {renderRightColumnContent(activeItem)}
          </RightColumn>
        </InfoFrameWrapper>
      )}
    </ContentInnerWrapper>
  );
};
export default Settings;
