import Image from 'next/image';
import React from 'react';
import { assets as assetPath } from '@/config/assets';
import {
  UploadFileCardContainer,
  UploadFileCardLabel,
  UploadFileCardName,
  UploadFileCardRemove,
  UploadFileCardStatus
} from './UploadFileCard.style';
import { useTranslations } from '@/hooks/useTranslations';

const UploadFileCard: React.FC<{
  data: File;
  setFile: (value: React.SetStateAction<File | null>) => void;
}> = ({ data, setFile }) => {
  const { t } = useTranslations();

  return (
    <UploadFileCardContainer>
      <Image src={`${assetPath}/images/file-icon.svg`} alt="file-icon" width={20} height={20} />
      <UploadFileCardLabel>
        <UploadFileCardName size="b2">{data.name}</UploadFileCardName>
        <UploadFileCardStatus size="b2">{`(${t('pending')})`}</UploadFileCardStatus>
      </UploadFileCardLabel>

      <UploadFileCardRemove onMouseDown={() => setFile(null)}>
        <Image
          src={`${assetPath}/images/bin-remove-icon.svg`}
          alt="bin-remove-icon"
          width={12}
          height={15}
        />
      </UploadFileCardRemove>
    </UploadFileCardContainer>
  );
};

export default UploadFileCard;
