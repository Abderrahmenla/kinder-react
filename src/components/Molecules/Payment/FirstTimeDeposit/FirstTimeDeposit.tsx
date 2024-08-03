import { CloseIcon, ModalContainer, Overlay } from '@/components/Atoms';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { firstTimeDepState } from '@/components/state/isFirstTimeDeposit';
import {
  FirstDepositModalContent,
  FirstDepositModalContainer,
  FirstDepositMediaContent,
  FirstDepositModalAction,
  FirstDepositModalHeader,
  FirstDepositImage,
  CloseDiv
} from './FirstTimeDeposit.style';
import VerificationModalForm from '../../VerificationModalForm/VerificationModalForm';
import { localeState } from '@/components/state/localeState';
import { verificationImage } from '@/components/state/verificationImage';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import { GET_VERIFICATION_BANNER } from 'src/graphql/queries/banners';
import client from 'src/graphql/client';

interface ImageAsset {
  title: string;
  imageURL: string;
}

const FirstTimeDeposit: React.FC<{ verifySuccessFn: () => void }> = ({ verifySuccessFn }) => {
  const [isFirstTimeDeposit, setIsFirstTimeDeposit] = useRecoilState(firstTimeDepState);
  const closeModal = useCallback(() => {
    setIsFirstTimeDeposit(false);
  }, [setIsFirstTimeDeposit]);
  const isMobile = UseMediaQuery(768);
  const [locale] = useRecoilState(localeState);
  const [asset, setAsset] = useRecoilState(verificationImage);
  const { t } = useTranslations();

  const getImages = useCallback(async () => {
    try {
      const { data: response } = await client.query({
        query: GET_VERIFICATION_BANNER,
        variables: { locale }
      });

      const assets = response.bannersV2S.data?.map((item: any) => {
        return {
          title: item.attributes.Title,
          imageURL: item.attributes.BackgroundImage.data.attributes.url
        };
      });
      setAsset({
        isFetched: true,
        images: assets
      });
    } catch (error) {
      console.error(error);
    }
  }, [locale, setAsset]);

  useEffect(() => {
    if (!asset.isFetched) getImages();
  }, [asset.isFetched, getImages]);

  return (
    <ModalContainer isMobile={isMobile} open={isFirstTimeDeposit}>
      <Overlay
        data-testid="overlay"
        style={{
          position: 'absolute'
        }}
        onClick={closeModal}
      />
      <FirstDepositModalContainer>
        {!isMobile && (
          <FirstDepositMediaContent>
            {asset.images.map((media: ImageAsset, index) => (
              <FirstDepositImage
                key={`media${index}`}
                src={media.imageURL}
                alt="verification"
                width={360}
                height={630}
              />
            ))}
          </FirstDepositMediaContent>
        )}
        <FirstDepositModalContent>
          <FirstDepositModalAction>
            <FirstDepositModalHeader size="h5" type="Heading">
              {t('verification')}
            </FirstDepositModalHeader>
            <CloseDiv onClick={closeModal}>
              <CloseIcon />
            </CloseDiv>
          </FirstDepositModalAction>
          <VerificationModalForm verifySuccessFn={verifySuccessFn} isModal />
        </FirstDepositModalContent>
      </FirstDepositModalContainer>
    </ModalContainer>
  );
};

export default FirstTimeDeposit;
