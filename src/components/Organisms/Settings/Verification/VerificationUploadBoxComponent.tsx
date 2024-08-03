import React, { DragEvent, MutableRefObject, useCallback, useRef, useState } from 'react';
import {
  ErrorMessage,
  ErrorMessageContainer,
  FileRequirementLine,
  UploadFileFormContainer,
  UploadFileRequirement,
  UploadProgressBar,
  UploadProgressContainer,
  UploadingCancelButton,
  UploadingFilePercentage,
  VerificationUploadBox,
  VerificationUploadBoxButton,
  VerificationUploadBoxButtonText,
  VerificationUploadBoxSubtitle,
  VerificationUploadBoxTitle,
  VerificationUploadInput,
  VerifictionUploadBoxTexts
} from './Verification.style';
import Image from 'next/image';
import { assets as assetPath } from '@/config/assets';
import useUploadFile from '@/hooks/useUploadFile';
import { VerificatioUploadBoxProps } from './Verification.type';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from '@/hooks/useTranslations';
import { AxiosProgressEvent } from 'axios';
import { validFileTypes } from './Verification.constants';

let uploadController = new AbortController();

const VerificationUploadBoxComponent: React.FC<VerificatioUploadBoxProps> = ({
  proofComponentName,
  setFile,
  error,
  setError
}) => {
  const uploadProgressBarRef = useRef(null) as MutableRefObject<HTMLProgressElement | null>;
  const { uploadFile, isUploading } = useUploadFile();
  const [uploadPercent, setUploadPercent] = useState(0);
  const isMobile = UseMediaQuery(767);
  const { t } = useTranslations();

  const successHandler = useCallback(
    (file: File) => {
      setFile(file);
      if (uploadProgressBarRef.current) {
        uploadProgressBarRef.current.value = 0;
      }
    },
    [setFile]
  );

  const errorHandler = useCallback(() => {
    setError(t('genericErrorMessage'));
  }, [setError, t]);

  const abortHandler = useCallback(() => {
    uploadController = new AbortController();
  }, []);

  const progressHandler = useCallback((e: AxiosProgressEvent) => {
    if (e && e.total) {
      const percent = (e.loaded / e.total) * 100;
      if (uploadProgressBarRef.current) {
        uploadProgressBarRef.current.value = Math.round(percent);
        setUploadPercent(Math.round(percent));
      }
    }
  }, []);

  const onAbortClickHandler = useCallback(async () => {
    if (uploadProgressBarRef.current) {
      uploadProgressBarRef.current.value = 0;
    }
    uploadController?.abort();
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onDragStart = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleUploadFile = useCallback(
    (file: File) => {
      const fileType = file.type;

      if (!validFileTypes.includes(fileType)) {
        setError(t('invalidFileType'));
      } else {
        uploadFile(
          file,
          successHandler,
          errorHandler,
          progressHandler,
          abortHandler,
          uploadController
        );
      }
    },
    [successHandler, errorHandler, progressHandler, abortHandler, uploadFile, setError, t]
  );

  const handleOnDropFileUpload = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const { dataTransfer } = e;
      if (dataTransfer.files && dataTransfer.files.length > 0) {
        handleUploadFile(dataTransfer.files[0]);
      }
      e.preventDefault();
      e.stopPropagation();
    },
    [handleUploadFile]
  );

  const handleOnChangeFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files.length > 0) {
        handleUploadFile(e.target.files[0]);
      }
    },
    [handleUploadFile]
  );
  return (
    <VerificationUploadBox
      onDragOver={onDragOver}
      onDrop={handleOnDropFileUpload}
      onDragStart={onDragStart}
      hasError={error !== ''}
    >
      {error !== '' ? (
        <ErrorMessageContainer>
          <ErrorMessage size="b2">{error}</ErrorMessage>
        </ErrorMessageContainer>
      ) : isUploading ? (
        <UploadProgressContainer>
          <UploadingFilePercentage size="b2">{`${uploadPercent}%`}</UploadingFilePercentage>
          <UploadProgressBar ref={uploadProgressBarRef} value="50" max="100" />
          <UploadingCancelButton handleClick={onAbortClickHandler}>
            <VerificationUploadBoxButtonText size="b2">
              {t('cancel')}
            </VerificationUploadBoxButtonText>
          </UploadingCancelButton>
        </UploadProgressContainer>
      ) : (
        <UploadFileFormContainer>
          <Image
            src={`${assetPath}/images/verification-upload-image.svg`}
            alt="verification-upload-image"
            width={isMobile ? 41 : 73}
            height={isMobile ? 31 : 54}
          />
          <VerifictionUploadBoxTexts>
            <VerificationUploadBoxTitle size="b1">
              {t(proofComponentName)}
            </VerificationUploadBoxTitle>
            {!isMobile && (
              <VerificationUploadBoxSubtitle size="b1">
                {t('uploadOrDrag')}
              </VerificationUploadBoxSubtitle>
            )}
          </VerifictionUploadBoxTexts>
          {!isMobile && (
            <UploadFileRequirement>
              <FileRequirementLine size="b1">{t('acceptedFileText')}</FileRequirementLine>
              <FileRequirementLine size="b2">{t('acceptedFileType')}</FileRequirementLine>
            </UploadFileRequirement>
          )}
          <VerificationUploadBoxButton htmlFor="files">
            <VerificationUploadBoxButtonText size="b2">
              {t('upload')}
            </VerificationUploadBoxButtonText>
          </VerificationUploadBoxButton>
          <VerificationUploadInput
            id="files"
            type="file"
            value={''}
            onChange={handleOnChangeFileUpload}
            size="md"
            accept=".png, .jpeg, .jpg, .pdf, .doc, .heic"
          />
        </UploadFileFormContainer>
      )}
    </VerificationUploadBox>
  );
};

export default VerificationUploadBoxComponent;
