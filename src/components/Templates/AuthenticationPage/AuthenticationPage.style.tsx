import { ModalContainer, ModalContent, ModalSection, ModalWrapContainer } from '@/components/Atoms';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

export const AuthenticationModalContent = styled(ModalContent)`
  padding: 12px;
  position: relative;
  max-height: 720px;
  height: 100%;
  overflow: hidden;
  min-height: 420px;

  @media screen and (max-height: 667px) {
    max-height: 640px;
  }
`;

export const AuthenticationModalMediaSection = styled('div')`
  width: 360px;
  max-height: 720px;

  @media screen and (max-width: 280px) {
    width: 100%;
  }
`;

export const AuthenticationModalFormSection = styled(AuthenticationModalMediaSection)`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 0px;
  }

  scrollbar-width: none;
`;

export const AuthenticationModalWrapContainer = styled(ModalWrapContainer)`
  width: auto;
  max-height: unset;
  overflow: auto;
  height: 100%;

  @media screen and (min-height: 720px) {
    max-height: 720px;
    overflow: hidden;
  }
  @media screen and (min-width: 768px) {
    max-height: 720px;
    height: 90%;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  scrollbar-width: none;
`;

export const AuthenticationModalActions = styled('div')`
  display: flex;
  gap: 64px;
  margin-bottom: 16px;
`;

export const AuthenticationImageComponent = styled(Image)<{ isMediaVisible: boolean }>`
  width: 360px;
  height: 720px;
  visibility: visible;
  opacity: 1;

  ${({ isMediaVisible }) =>
    !isMediaVisible
      ? css`
          visibility: hidden;
          opacity: 0;
          width: 0px;
        `
      : ''}
`;

export const AuthenticationMediaModalContent = styled(ModalContent)`
  position: relative;
  display: flex;
  justifycontent: center;
  alignitems: center;
  width: 100%;
`;

export const AuthenticationFormContainer = styled('div')<{ toggleState: string }>`
  padding: 0px;

  ${({ toggleState }) => {
    if (toggleState === 'signin') {
      return css`
        @media screen and (min-width: 769px) {
          padding: 156px 0px;
        }
      `;
    } else if (toggleState === 'forgotpassword') {
      return css`
        @media screen and (min-width: 769px) {
          padding: 200px 0px;
        }
      `;
    } else {
      return '';
    }
  }}
`;

export const SpinImage = styled(Image)`
  width: 100%;
  height: 95%;
  opacity: 0.1;
`;

export const SpinImageContainer = styled('div')`
  height: 164px;
`;

export const LogoWithText = styled(Image)`
  width: 70%;
  height: 70%;
`;

export const LogoWithTextContainer = styled('div')<{ showImage: boolean }>`
  display: flex;
  justify-content: center;
  transform: scale(1);
  height: 0px;

  ${({ showImage }) =>
    showImage
      ? css`
          height: 121px;
          padding: 32px 0px;
        `
      : ''}
`;

export const LockImage = styled(Image)`
  width: 85%;
  height: 85%;
`;

export const LockImageContainer = styled('div')<{ showImage: boolean }>`
  display: flex;
  justify-content: center;
  transform: scale(1);
  height: 0px;

  ${({ showImage }) =>
    showImage
      ? css`
          height: 220px;
        `
      : ''}
`;

export const AuthenticationFormContent = styled('div')<{ isRegister: boolean }>`
  ${({ isRegister }) =>
    isRegister
      ? css`
          height: 93%;
          overflow-y: scroll;

          ::-webkit-scrollbar {
            width: 0px;
          }

          scrollbar-width: none;
        `
      : ''}
`;

export const AuthenticationModalContainer = styled(ModalContainer)`
  z-index: 999999;
`;

export const AuthenticationModalContentParent = styled(ModalSection)`
  height: 100%;
`;
