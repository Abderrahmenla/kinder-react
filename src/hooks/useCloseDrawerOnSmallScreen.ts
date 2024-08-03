import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import { useRecoilState } from 'recoil';
import { drawerState } from '@/components/state/drawerState';

export const useCloseDrawerOnSmallScreen = (): Dispatch<SetStateAction<boolean>> => {
  const [isMenuItemClicked, setIsMenuItemClicked] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState);
  const router = useRouter();
  const isWindowSmall = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (isMenuItemClicked && isWindowSmall && drawerOpen) {
      setDrawerOpen(false);
      setIsMenuItemClicked(false);
    }
  }, [router.pathname, drawerOpen, setDrawerOpen, isWindowSmall, isMenuItemClicked]);

  return setIsMenuItemClicked;
};
