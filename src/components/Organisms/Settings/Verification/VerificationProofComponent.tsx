import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { assets as assetPath } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import useUploadFile from '@/hooks/useUploadFile';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/pages/api/types';
import useCustomToast from '@/hooks/useCustomToast';
import { CustomToast } from '@/components/Atoms/CustomToast/CustomToast';
import {
  VerificationProofAction,
  VerificationProofContainer,
  VerificationProofSafeText,
  VerificationProofSubmitButton,
  VerificationProofSubmitButtonText,
  VerificationProofWarning,
  VerificationProofWarningText
} from './Verification.style';
import VerificationUploadBoxComponent from './VerificationUploadBoxComponent';
import { documentCategory } from './Verification.constants';
import { DocumentProofCategory } from './Verification.type';
import UploadFileCard from '../../../Molecules/Settings/Verification/UploadFileCard.tsx/UploadedFileCard';

const VerificationProofComponent: React.FC<{ proofComponentName: string }> = ({
  proofComponentName
}) => {
  const { t } = useTranslations();
  const isMobile = UseMediaQuery(767);
  const [file, setFile] = useState<File | null>(null);
  const { submitFile, isLoading } = useUploadFile();
  const [error, setError] = useState<string>('');
  const { displayToast, toastProps } = useCustomToast();

  const submitSuccessful = useCallback(
    (response: AxiosResponse<any, any>) => {
      displayToast({ message: response.data.message, duration: 3000 });
      setFile(null);
      setError('');
    },
    [displayToast]
  );

  const submitError = useCallback(
    (error: AxiosError<ErrorResponse>) => {
      const axiosError = error;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.errorMessage
      ) {
        setError(axiosError.response.data.errorMessage);
      } else {
        setError(t('errorUploadingGeneric'));
      }
    },
    [t]
  );

  const handleSubmitFile = useCallback(() => {
    if (file) {
      submitFile(
        file,
        documentCategory[proofComponentName as keyof DocumentProofCategory].category,
        submitSuccessful,
        submitError
      );
    } else {
      setError(t('noFileUploaded'));
    }
  }, [file, submitError, submitSuccessful, submitFile, proofComponentName, t]);

  const warningText = useMemo(() => {
    return documentCategory[proofComponentName as keyof DocumentProofCategory]?.warningText;
  }, [proofComponentName]);

  useEffect(() => {
    if (error !== '')
      setTimeout(() => {
        setError('');
      }, 3500);
  }, [error]);

  return (
    <VerificationProofContainer>
      <VerificationProofWarning>
        <Image
          src={`${assetPath}/images/warning-icon-2.svg`}
          alt="warning-icon"
          width={24}
          height={24}
        />
        <VerificationProofWarningText size="b2">{t(warningText)}</VerificationProofWarningText>
      </VerificationProofWarning>

      <VerificationUploadBoxComponent
        proofComponentName={proofComponentName}
        setFile={setFile}
        error={error}
        setError={setError}
      />
      {isMobile && file && <UploadFileCard data={file} setFile={setFile} />}
      <VerificationProofAction>
        {file && !isMobile ? (
          <UploadFileCard data={file} setFile={setFile} />
        ) : (
          !file && (
            <VerificationProofSafeText size="b2">
              {t('playerDetailsFooterText')}
            </VerificationProofSafeText>
          )
        )}
        <VerificationProofSubmitButton
          showIcon={false}
          handleClick={handleSubmitFile}
          disabled={isLoading}
        >
          <VerificationProofSubmitButtonText size="b2">
            {isLoading ? t('processing') : t('submit')}
          </VerificationProofSubmitButtonText>
        </VerificationProofSubmitButton>
      </VerificationProofAction>

      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </VerificationProofContainer>
  );
};

export default VerificationProofComponent;
