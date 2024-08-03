import formatDate from '@/utils/formatUtils/formatDate';
import { toCapitalizedFirstLetter } from '@/utils/formatUtils/formatString';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { assets as assetPath } from '@/config/assets';
import {
  VerificationListItemCategory,
  VerificationListItemCategoryDate,
  VerificationListItemContainer,
  VerificationListItemDate,
  VerificationListItemLabel,
  VerificationListItemName,
  VerificationListItemStatus
} from './VerificationList.style';
import { DocumentItem } from '@/components/state/documentsState';
import { useTranslations } from '@/hooks/useTranslations';
import { documentCategories } from '@/components/Organisms/Settings/Verification/Verification.constants';

const VerificationListItem: React.FC<{
  data: DocumentItem;
}> = ({ data }) => {
  const { t } = useTranslations();
  const status = useMemo(() => {
    switch (data.approvalStatus) {
      case 'Approved':
        return 'approved';
      case 'Unapproved':
        return 'pending';
      case 'Partial':
        return 'partial';
      case 'Declined':
        return 'declined';
      default:
        return 'pending';
    }
  }, [data.approvalStatus]);

  return (
    <VerificationListItemContainer>
      <Image src={`${assetPath}/images/file-icon.svg`} alt="file-icon" width={20} height={20} />
      <VerificationListItemLabel>
        <VerificationListItemName size="b2">{data.name}</VerificationListItemName>
        <VerificationListItemStatus size="b2" status={toCapitalizedFirstLetter(status)}>{`(${t(
          status
        )})`}</VerificationListItemStatus>
      </VerificationListItemLabel>
      <VerificationListItemCategoryDate>
        <VerificationListItemCategory size="b2">
          {t(documentCategories[data.documentCategory - 1])}
        </VerificationListItemCategory>
        <VerificationListItemDate size="b2">
          {formatDate(data.creationTime, { hasTime: true })}
        </VerificationListItemDate>
      </VerificationListItemCategoryDate>
    </VerificationListItemContainer>
  );
};

export default VerificationListItem;
