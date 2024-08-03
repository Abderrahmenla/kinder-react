import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { SettingsContentProps } from '../Profile/Profile.type';
import Image from 'next/image';
import { assets as assetPath } from '@/config/assets';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import {
  VerificationBackbutton,
  VerificationCardPageContianer,
  VerificationContainer,
  VerificationDefaultTitle,
  VerificationHeader,
  VerificationMainContainer,
  VerificationSubTitle
} from './Verification.style';
import { verificationPages } from './Verification.constants';
import VerificationCardComponent from '../../../Molecules/Settings/Verification/VerificationCardComponent/VerificationCardComponent';
import dynamic from 'next/dynamic';

const VerificationProofComponent = dynamic(() => import('./VerificationProofComponent'));
const VerificationModalForm = dynamic(
  () => import('@/components/Molecules/VerificationModalForm/VerificationModalForm')
);
const VerificationList = dynamic(
  () => import('@/components/Molecules/Settings/Verification/VerificationList/VerificationList')
);

const Verification: React.FC<SettingsContentProps> = ({ isPageOpen, setIsPageOpen }) => {
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(820);

  return (
    <VerificationMainContainer>
      <VerificationHeader>
        {!isMobile && isPageOpen !== 'verification' && (
          <VerificationBackbutton onMouseDown={() => setIsPageOpen('verification')}>
            <Image
              src={`${assetPath}/images/chevron-left-icon.svg`}
              alt="back-button"
              width={8}
              height={8}
            />
          </VerificationBackbutton>
        )}
        <VerificationDefaultTitle size="h5">
          {isPageOpen === 'verification' ? t('verification') : t(isPageOpen)}
        </VerificationDefaultTitle>
      </VerificationHeader>
      <VerificationContainer isVerificationForm={isPageOpen === 'verificationDetails'}>
        {isPageOpen === 'verification' ? (
          <>
            <VerificationSubTitle size="b2">{t('verificationRequirements')}</VerificationSubTitle>
            <VerificationCardPageContianer>
              {verificationPages.map((page) => {
                return (
                  <VerificationCardComponent
                    key={`card-${page}`}
                    page={page}
                    setIsPageOpen={setIsPageOpen}
                  />
                );
              })}
            </VerificationCardPageContianer>
            <VerificationList />
          </>
        ) : (
          <>
            {isPageOpen === 'verificationDetails' ? (
              <VerificationModalForm isModal={false} />
            ) : (
              <>
                <VerificationProofComponent proofComponentName={isPageOpen} />
              </>
            )}
          </>
        )}
      </VerificationContainer>
    </VerificationMainContainer>
  );
};

export default Verification;
