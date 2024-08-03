import React, { useCallback, useEffect } from 'react';
import { Overlay, ModalWrap, CloseIcon, CloseIconContainerHeader } from '../../Atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openAuthPageState } from '@/components/state/openAuthPageState';
import { openToggleAuthState } from '@/components/state/openToggleAuthState';
import { openPasswordModalState } from '@/components/state/openPasswordModalState';
import {
  AuthenticationFormContainer,
  AuthenticationFormContent,
  AuthenticationImageComponent,
  AuthenticationMediaModalContent,
  AuthenticationModalActions,
  AuthenticationModalContainer,
  AuthenticationModalContent,
  AuthenticationModalContentParent,
  AuthenticationModalFormSection,
  AuthenticationModalMediaSection,
  AuthenticationModalWrapContainer,
  LockImage,
  LockImageContainer,
  LogoWithText,
  LogoWithTextContainer,
  SpinImage,
  SpinImageContainer
} from './AuthenticationPage.style';
import Switcher from '@/components/Atoms/Switcher/Switcher';
import client from 'src/graphql/client';
import { localeState } from '@/components/state/localeState';
import { GET_AUTHENTICATION_BANNERS } from 'src/graphql/queries/banners';
import { authenticationImages } from '@/components/state/authenticationImages';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { assets as assetPath } from '@/config/assets';
import { useRouter } from 'next/router';
import { REGISTRATION_URL } from '@/constants/index';
import dynamic from 'next/dynamic';

const ResetPassword = dynamic(() => import('@/components/Organisms/Auth/ResetPassword'));
const Signin = dynamic(() => import('@/components/Organisms/Auth/SignIn'));
const Register = dynamic(() => import('@/components/Organisms/Auth/Register'));
const ForgetPassword = dynamic(() => import('../../Organisms/Auth/ForgetPassword'));

interface AuthenticationPageProps {
  handleCloseAuth: () => void;
}

interface ImageAsset {
  title: string;
  imageURL: string;
}

const switcherOptions = [{ title: 'Sign in' }, { title: 'Register' }];

const AuthenticationPage: React.FC<AuthenticationPageProps> = ({ handleCloseAuth }) => {
  const [toggleState, setToggle] = useRecoilState(openToggleAuthState);
  const [isResetPasswordModalOpen] = useRecoilState(openPasswordModalState);
  const { open } = useRecoilValue(openAuthPageState);
  const [locale] = useRecoilState(localeState);
  const [assets, setAssets] = useRecoilState(authenticationImages);
  const isMobile = UseMediaQuery(768);

  const router = useRouter();

  useEffect(() => {
    if (router.query[REGISTRATION_URL] !== undefined) {
      setToggle({ toggle: 'register' });
    }

    if (isResetPasswordModalOpen.open) {
      setToggle({ toggle: 'reset-password' });
    }
  }, [open, router.query, setToggle, isResetPasswordModalOpen]);

  const getImages = useCallback(async () => {
    try {
      const { data: response } = await client.query({
        query: GET_AUTHENTICATION_BANNERS,
        variables: { locale: locale }
      });
      const assets = response.banners.data?.map((item: any) => {
        return {
          title: item.attributes.Title,
          imageURL: item.attributes.BackgroundImage.data.attributes.url
        };
      });
      setAssets({
        isFetched: true,
        images: assets
      });
    } catch (error) {
      console.error(error);
    }
  }, [locale, setAssets]);

  useEffect(() => {
    if (!assets.isFetched) getImages();
  }, [open, assets.isFetched, getImages]);

  const handleToggle = (index: number) => {
    setToggle({ toggle: switcherOptions[index].title.replace(/\s/g, '').toLowerCase() });
  };

  const handleForgetPassword = () => {
    setToggle({ toggle: 'forgotpassword' });
  };

  return (
    <AuthenticationModalContainer open={open} data-testid="dialog">
      <Overlay onClick={handleCloseAuth} />
      <ModalWrap open={open}>
        <AuthenticationModalWrapContainer>
          <AuthenticationModalContentParent noDivider notPadded inline>
            {!isMobile && (
              <AuthenticationModalMediaSection>
                <AuthenticationMediaModalContent>
                  {assets.images.map((media: ImageAsset, index) => {
                    return (
                      <AuthenticationImageComponent
                        key={`media-${index}`}
                        width={360}
                        height={600}
                        alt={`${media.title}-image`}
                        src={media?.imageURL}
                        isMediaVisible={toggleState.toggle === media.title}
                        loading="lazy"
                      />
                    );
                  })}
                </AuthenticationMediaModalContent>
              </AuthenticationModalMediaSection>
            )}
            <AuthenticationModalFormSection>
              <AuthenticationModalContent>
                <AuthenticationModalActions>
                  <Switcher
                    options={switcherOptions}
                    handleToggle={handleToggle}
                    noSwitcherSelected={
                      toggleState.toggle === 'forgotpassword' ||
                      toggleState.toggle === 'reset-password'
                    }
                    initialActiveButton={toggleState.toggle === 'register' ? 1 : 0}
                    tabSwitcherStyles={{ height: '44px', overflow: 'hidden' }}
                  />

                  <CloseIconContainerHeader
                    onClick={handleCloseAuth}
                    sx={{
                      justifyContent: 'flex-end'
                    }}
                  >
                    <CloseIcon />
                  </CloseIconContainerHeader>
                </AuthenticationModalActions>
                <AuthenticationFormContent isRegister={toggleState.toggle === 'register'}>
                  {isMobile && (
                    <>
                      <LogoWithTextContainer showImage={toggleState.toggle === 'signin'}>
                        <LogoWithText
                          width={100}
                          height={100}
                          alt="logo"
                          src={`${assetPath}/images/spinbet-logo-with-text.svg`}
                          loading="lazy"
                        />
                      </LogoWithTextContainer>

                      <LockImageContainer
                        showImage={
                          toggleState.toggle === 'forgotpassword' ||
                          toggleState.toggle === 'reset-password'
                        }
                      >
                        <LockImage
                          width={100}
                          height={100}
                          alt="logo"
                          src={`${assetPath}/images/lock-img.svg`}
                        />
                      </LockImageContainer>
                    </>
                  )}

                  {toggleState.toggle === 'reset-password' && <ResetPassword />}
                  {toggleState.toggle !== 'reset-password' && (
                    <AuthenticationFormContainer toggleState={toggleState.toggle}>
                      {toggleState.toggle === 'register' ? (
                        <Register handleCloseAuth={handleCloseAuth} />
                      ) : toggleState.toggle === 'signin' ? (
                        <Signin
                          handleCloseAuth={handleCloseAuth}
                          handleForgetPassword={handleForgetPassword}
                        />
                      ) : (
                        <ForgetPassword />
                      )}
                    </AuthenticationFormContainer>
                  )}
                </AuthenticationFormContent>
              </AuthenticationModalContent>
              {isMobile && toggleState.toggle !== 'register' && (
                <SpinImageContainer>
                  <SpinImage
                    width={100}
                    height={100}
                    alt="logo"
                    src={`${assetPath}/images/spin-authentication.svg`}
                    loading="lazy"
                  />
                </SpinImageContainer>
              )}
            </AuthenticationModalFormSection>
          </AuthenticationModalContentParent>
        </AuthenticationModalWrapContainer>
      </ModalWrap>
    </AuthenticationModalContainer>
  );
};

export default AuthenticationPage;
