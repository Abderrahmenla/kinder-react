import { LoggedInMenuContainer, MenuGroup, Menudivider, WalletButton } from '../NavBarStyles';
import { useMediaQuery } from '@mui/material';
import { ProfileDropdown } from './ProfileDropdown/ProfileDropdown';
import { AuthButtons } from './AuthButtons';
import { ProfileMenu } from './ProfileMenu';
import { RewardsMenu } from './RewardsMenu';
import { SearchMenu } from './SearchMenu';
import { useGameStatusContext } from 'src/providers/GameStatusProvider';
import { useVipProgram } from '@/hooks/useVipProgram';
import { useLoyaltySublevelIcon } from '@/hooks/useLoyaltySublevelIcon';
// import { EasterNavBarIcon } from '@/components/Molecules/Easter/EasterNavBarIcon/EasterNavBarIcon';
import { useRecoilState } from 'recoil';
import { profileDropDownState } from '@/components/state/profileDropDownState';

type RightSideMenuItemType = {
  isAuthenticated: boolean;
  handleOpenSignIn: VoidFunction;
  handleOpenRegister: VoidFunction;
  handleOpenSearchModal: () => void;
  handleWalletButtonClick: () => void;
};

export const RightSideMenuItem = ({
  isAuthenticated,
  handleOpenRegister,
  handleOpenSignIn,
  handleOpenSearchModal,
  handleWalletButtonClick
}: RightSideMenuItemType) => {
  const is768Maxmidth = useMediaQuery('(max-width:768px)');
  const is991Maxmidth = useMediaQuery('(max-width:991px)');
  const { vipProgramLevel } = useVipProgram();
  const [isExtendedRecoil, setIsExtendedRecoil] = useRecoilState(profileDropDownState);
  const { isPlaying } = useGameStatusContext();
  const vipProgramLevelIcon = useLoyaltySublevelIcon(vipProgramLevel);
  return (
    <div>
      <AuthButtons
        isAuthenticated={isAuthenticated}
        handleOpenSignIn={handleOpenSignIn}
        handleOpenRegister={handleOpenRegister}
      />
      <LoggedInMenuContainer isAuthenticated={isAuthenticated}>
        {isPlaying && is991Maxmidth ? (
          <div style={{ width: '75px' }}>
            <WalletButton handleClick={handleWalletButtonClick}>Wallet</WalletButton>
          </div>
        ) : (
          <MenuGroup>
            {!is768Maxmidth && <RewardsMenu isAuthenticated={isAuthenticated} />}
            <ProfileMenu
              isAuthenticated={isAuthenticated}
              setIsExtended={setIsExtendedRecoil}
              vipProgramLevelIcon={vipProgramLevelIcon}
            />
          </MenuGroup>
        )}

        {(isPlaying && is991Maxmidth) ||
          (!is768Maxmidth && (
            <>
              <Menudivider />
              <SearchMenu
                isAuthenticated={isAuthenticated}
                handleOpenSearchModal={handleOpenSearchModal}
              />
            </>
          ))}
      </LoggedInMenuContainer>
      <ProfileDropdown
        isExtended={isExtendedRecoil}
        setIsExtended={setIsExtendedRecoil}
        vipProgramLevelIcon={vipProgramLevelIcon}
      />
    </div>
  );
};
