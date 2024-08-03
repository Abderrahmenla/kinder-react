import { CircularProgress } from '@mui/material';
import { IconHeaderContainer } from '../NavBarStyles';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type ProfileMenuType = {
  isAuthenticated: boolean;
  setIsExtended: Dispatch<SetStateAction<boolean>>;
  vipProgramLevelIcon: string;
};
export const ProfileMenu: React.FC<ProfileMenuType> = ({
  isAuthenticated,
  setIsExtended,
  vipProgramLevelIcon
}) => {
  return (
    <IconHeaderContainer
      isAuthenticated={isAuthenticated}
      onClick={() => setIsExtended((isExt) => !isExt)}
    >
      {vipProgramLevelIcon ? (
        <Image src={vipProgramLevelIcon} width={24} height={24} alt="" />
      ) : (
        <CircularProgress size={11} />
      )}
    </IconHeaderContainer>
  );
};
