import {
  CircularButton,
  Divider,
  ReferAFriendButton,
  ReferAFriendContainer,
  ReferAFriendWrapper
} from './Drawer.style';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ReferAFriend = ({ open }: { open?: boolean }) => {
  const router = useRouter();
  const setDrawerState = useSetRecoilState(drawerState);
  const isMobile = useMediaQuery('(min-width:769px)');

  const handleNavigation = () => {
    router.push('/referral/overview');
    if (!isMobile) setDrawerState(false);
  };

  return (
    <>
      <ReferAFriendContainer>
        <ReferAFriendWrapper onClick={handleNavigation}>
          {open ? (
            <ReferAFriendButton showIcon={false}>Refer a Friend</ReferAFriendButton>
          ) : (
            <CircularButton>
              <Image
                src={`${assets}/images/drawer/referAFriendPersonIcon.svg`}
                height={16}
                width={16}
                alt="refer a friend"
              />
            </CircularButton>
          )}
        </ReferAFriendWrapper>
      </ReferAFriendContainer>
      <Divider />
    </>
  );
};
