import { ReactNode, useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DrawerComponent } from '@/components/Organisms/Drawer';
import { Container } from '@/components/Atoms/Container';
import { NavBar } from '@/components/Organisms/Navbar';
import { Footer } from '../Footer';
import { SeoPagesProps } from 'src/graphql/types/seo';
import Authenticationpage from '@/components/Templates/AuthenticationPage';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { drawerState } from '@/components/state/drawerState';
import MobileBottomNav from '@/components/Organisms/Drawer/MobileBottomNav/MobileBottomNav';
import VIPPage from '@/components/Templates/VIPPage';
import { openAuthPageState } from '@/components/state/openAuthPageState';
import { openVIPPageState } from '@/components/state/openVIPPageState';
import { openPaymentPageState } from '@/components/state/openPaymentPageState';
import { openPromotionsState } from '@/components/state/openPromotionsState';
import CookieBanner from '@/components/Atoms/CookieBanner';
import dynamic from 'next/dynamic';
import ErrorBanner from '@/components/Molecules/ErrorBanner/ErrorBanner';
import { errorMessageState } from '@/components/state/errorState';
import { openPasswordModalState } from '@/components/state/openPasswordModalState';
import { registrationSuccessState } from '@/components/state/registrationSuccessState';
import { FooterMobile } from '../Footer/FooterMobile';
import { authState } from '@/components/state/isAuthenticated';
import Cookies from 'js-cookie';
import { GlobalSearch } from '../GlobalSearch';
import { MenuItem } from '../Drawer/Drawer.type';
import { CountryLocaleInfo } from '../Drawer/CountryLocaleDropdown/CountryLocaleDropdown.type';
import { SportsIdProps } from '@/components/Templates/Sports/Sports.type';
import { sportsIdState } from '@/components/state/sportsIdState';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { CasinoCategories } from '@/graphql/types/navigation';
import { FooterContainer } from '../Footer/Footer.styles';
import { FooterMenu } from '../Footer/FooterMenu';

const PaymentModal = dynamic(() => import('@/components/Templates/Payment'));
const PromotionsModal = dynamic(() => import('@/components/Templates/Promotions/PromotionsModal'));
const RewardsModal = dynamic(() => import('@/components/Templates/RewardsModal/RewardsModal'));
const PepSanctionConfirmationPopup = dynamic(
  () => import('@/components/Molecules/PepSanctionConfirmationPopup/PepSanctionConfirmationPopup'),
  { ssr: false }
);
interface OverlayProps {
  isDrawerOpen: boolean;
}

const Overlay = styled('div')<OverlayProps>(({ theme, isDrawerOpen }) => {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (viewportWidth < 1300) {
      if (isDrawerOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [viewportWidth, isDrawerOpen]);

  return {
    display: 'none',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(21, 14, 37, 0.7)',
    zIndex: 10,
    [theme.breakpoints.down(1300)]: {
      display: isDrawerOpen ? 'block' : 'none'
    }
  };
});

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '80px',
  position: 'relative'
}));

const ContentWrapper = styled('div')(({ open }: { open: boolean }) => ({
  width: '100%',
  transition: 'width 300ms',
  '@media screen and (min-width:1300px)': {
    width: !open ? 'calc(100% - 60px)' : 'calc(100% - 343px)',
    marginLeft: !open ? 'auto' : '260px'
  },
  '@media screen and (max-width:1299px) and (min-width: 1201px)': {
    width: !open ? 'calc(100% - 60px)' : '100%',
    marginLeft: !open ? '60px' : 'auto'
  },

  '@media screen and (max-width:1200px) and (min-width: 769px)': {
    width: !open ? 'calc(100% - 60px)' : '100%',
    marginLeft: !open ? '60px' : 'auto'
  }
}));

const FooterWrapper = styled('div')(({ open }: { open: boolean }) => ({
  '@media screen and (min-width:1300px)': {
    width: !open ? 'calc(100% - 89px)' : 'calc(100% - 180px)',
    marginLeft: 'auto',
    position: 'relative'
  }
}));

interface LayoutProps {
  children: ReactNode;
  seo?: SeoPagesProps | any;
  sidebar: {
    navigation: MenuItem[];
    locales: CountryLocaleInfo[];
    sportsID: SportsIdProps[];
    casinoCategories: CasinoCategories[];
  };
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const isBelow768 = UseMediaQuery(768);
  const isBelow1301 = useMediaQuery('(max-width:1300px)');

  const [isDrawerOpen, setisDrawerOpen] = useRecoilState(drawerState);
  const showOverlay = (isBelow1301 && isDrawerOpen) || (isBelow768 && isDrawerOpen);
  const setOpenAuth = useSetRecoilState(openAuthPageState);
  const setOpenVIP = useSetRecoilState(openVIPPageState);
  const [{ open: openPayment }, setOpenPayment] = useRecoilState(openPaymentPageState);
  const handleCloseAuth = () => {
    setIsResetPasswordModalOpen({ open: false });
    setOpenAuth({ open: false });
  };
  const handleCloseVIP = () => setOpenVIP({ open: false });
  const handleClosePayment = useCallback(() => setOpenPayment({ open: false }), []);
  const [openRewards, setOpenRewards] = useState(false);
  const errorMessage = useRecoilValue(errorMessageState);
  const [open] = useRecoilState(drawerState);
  const [, setIsResetPasswordModalOpen] = useRecoilState(openPasswordModalState);
  const registrationSuccess = useRecoilValue(registrationSuccessState);
  const [, setFeatureEnabled] = useState<string>('false');
  const [userAuthState, setUserAuthState] = useRecoilState(authState);
  const setOpenPromotionsState = useSetRecoilState(openPromotionsState);
  const openPromotion = useRecoilValue(openPromotionsState);
  const setSportsId = useSetRecoilState(sportsIdState);

  useEffect(() => {
    const featureStatus = Cookies.get('payment');
    setFeatureEnabled(featureStatus || 'false');
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('reset-password')) {
      setIsResetPasswordModalOpen({ open: true });
      setOpenAuth({ open: true });
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get('sessionToken');

    if (token && !userAuthState.isAuthenticated) {
      const username = Cookies.get('username');
      const playerId = Cookies.get('playerId');

      setUserAuthState({
        isAuthenticated: true,
        token: token,
        username: username || null,
        playerId: playerId || null
      });
    }
  }, [userAuthState.isAuthenticated, setUserAuthState]);

  useEffect(() => {
    setSportsId(sidebar.sportsID);
  }, [setSportsId, sidebar.sportsID]);

  return (
    <>
      <Overlay isDrawerOpen={showOverlay} onClick={() => setisDrawerOpen(false)} />
      <Container className="layout-container">
        {errorMessage && <ErrorBanner message={'An error has occurred, please try again later!'} />}
        <MainWrapper className={'main-wrapper'}>
          <DrawerComponent
            isMobile={isBelow768}
            navigation={sidebar.navigation}
            locales={sidebar.locales}
          />
          <MobileBottomNav isAuthenticated={isAuthenticated} />

          <NavBar />
          <ContentWrapper open={isDrawerOpen}>{children}</ContentWrapper>
        </MainWrapper>
        <FooterWrapper open={open}>
          <FooterContainer>
            <FooterMenu>{isBelow768 ? <FooterMobile /> : <Footer />}</FooterMenu>
          </FooterContainer>
        </FooterWrapper>
        <CookieBanner />
        {isAuthenticated && <PepSanctionConfirmationPopup isAuthenticated={isAuthenticated} />}
      </Container>
      <Authenticationpage handleCloseAuth={handleCloseAuth} />
      {openPayment && <PaymentModal open={openPayment} handleClosePayment={handleClosePayment} />}
      {registrationSuccess && (
        <>
          <RewardsModal open={openRewards} setOpen={setOpenRewards} />
        </>
      )}
      {isAuthenticated ? (
        <>
          <RewardsModal open={openRewards} setOpen={setOpenRewards} />
          <VIPPage handleClose={handleCloseVIP} />
        </>
      ) : null}
      <PromotionsModal open={openPromotion.open} setOpenPromotions={setOpenPromotionsState} />
      <GlobalSearch isMobile={isBelow768} standalone={true} />
    </>
  );
};

export default Layout;
