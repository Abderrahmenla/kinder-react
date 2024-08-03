import { DropDownList, Icon, IconLabel, IconContainer } from '@/components/Atoms/DropDown';
import {
  ProfileCloseIconContainer,
  ProfileDropdownMobileContainer,
  ProfileDropdownMobileHeader,
  profiledropdownList,
  profiledropdownListItemStyles
} from '../../NavBarStyles';
import { loggedInProfileDropdownData } from '@/components/Organisms/Drawer/menuData/data';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { playerState } from '@/components/state/playerState';
import { ProfileDisplayData } from './ProfileDisplayData';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

type ProfileDropdownMobileType = {
  setIsExtended: (isExtented: boolean) => void;
  isExtended: boolean;
  handleItemClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: any) => void;
  vipProgramLevelIcon: string;
};

const RenderIconLabel = (item: any) => {
  const { t } = useTranslations();
  return (
    <IconContainer style={{ gap: '12px' }}>
      {item.icon && <Icon src={item.icon} style={{ height: '17.5px', width: '17.5px' }} />}
      <IconLabel
        style={
          item.key === 'logout'
            ? { fontSize: '12px', fontWeight: '400' }
            : { fontSize: '14px', fontWeight: '400' }
        }
      >
        {t(item.key)}
      </IconLabel>
    </IconContainer>
  );
};

export const ProfileDropdownMobile = ({
  setIsExtended,
  isExtended,
  handleItemClick,
  vipProgramLevelIcon
}: ProfileDropdownMobileType) => {
  const player = useRecoilValue(playerState);
  return (
    <ProfileDropdownMobileContainer isExtended={isExtended}>
      <ProfileDropdownMobileHeader>
        <ProfileDisplayData
          isDesktop={false}
          imgProfile={vipProgramLevelIcon}
          userId={player?.id}
          userName={player?.userName}
        />

        <ProfileCloseIconContainer onClick={() => setIsExtended(false)}>
          <Image
            src={`${assets}/images/close_modal_icon.svg`}
            width={20}
            height={20}
            style={{ color: 'var(--darker-white)' }}
            alt={'close-icon'}
          />
        </ProfileCloseIconContainer>
      </ProfileDropdownMobileHeader>
      <DropDownList
        size="L"
        isVisible={true}
        activeDropdownItem={true}
        polygonLogoLeft="12px"
        handleItemClick={(e, item) => {
          handleItemClick(e, item);
          setIsExtended(false);
        }}
        styleDropdownListItemStyle={profiledropdownListItemStyles}
        styleDropdownList={profiledropdownList}
        dropdownItems={[...loggedInProfileDropdownData.filter((item) => item.title !== 'profile')]}
        isDropdownListLogo={false}
        renderContent={(item) => RenderIconLabel(item)}
      />
    </ProfileDropdownMobileContainer>
  );
};
