import Image from 'next/image';
import { assets } from '@/config/assets';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DrawerContainer, DrawerContent } from '@/components/Molecules/Easter/Easter.styles';
import Typography from '@/components/Atoms/Typography/Typography';
import { useTranslations } from '@/hooks/useTranslations';
export const EasterDrawerNav = ({ open }: { open?: boolean }) => {
  const router = useRouter();
  const { t } = useTranslations();
  const setDrawerState = useSetRecoilState(drawerState);
  const isMobile = useMediaQuery('(min-width:769px)');

  const handleNavigation = () => {
    router.push('/easter-hunt');
    if (!isMobile) setDrawerState(false);
  };

  return (
    <DrawerContainer open={open} onClick={handleNavigation}>
      {open ? (
        <DrawerContent>
          <Image
            src={`${assets}/images/easter-icon3.png`}
            height={25}
            width={38}
            alt="Easter egg icon"
          />
          <Typography size="b2" type="Body" color="var(--white)">
            {t('easterBonusHunt')}
          </Typography>
        </DrawerContent>
      ) : (
        <div onClick={handleNavigation}>
          <Image
            src={`${assets}/images/easter-icon3.png`}
            height={24}
            width={38}
            alt="Easter egg icon"
          />
        </div>
      )}
    </DrawerContainer>
  );
};
