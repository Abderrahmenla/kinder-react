import Image from 'next/image';
import { PromotionFilterButton, PromotionsFilterWrapper, Label } from './PromotionsFilter.styles';
import { useTranslations } from '@/hooks/useTranslations';

const PromotionButton = ({
  buttonText,
  isActive,
  onClick,
  imageUrls
}: {
  buttonText: string;
  isActive: boolean;
  onClick: () => void;
  imageUrls: any;
}) => {
  const imageUrl = imageUrls[buttonText] || {};

  return (
    <PromotionFilterButton onClick={() => onClick()} className={isActive ? 'active' : ''}>
      <Image
        src={isActive ? imageUrl.active : imageUrl.notActive}
        alt={buttonText}
        width={20}
        height={20}
        style={{ marginRight: '8px' }}
      />
      <Label size={'b1'} type={'Body'}>
        {buttonText}
      </Label>
    </PromotionFilterButton>
  );
};

const PromotionFilter = ({
  promotionTypeFilter,
  handlePromotionTypeChange,
  imageUrls
}: {
  promotionTypeFilter: string;
  handlePromotionTypeChange: (type: string) => void;
  imageUrls: any;
}) => {
  const { t } = useTranslations();

  const renderPromotionButton = (type: string) => (
    <PromotionButton
      key={type}
      buttonText={t(type)}
      isActive={promotionTypeFilter === t(type)}
      onClick={() => handlePromotionTypeChange(t(type))}
      imageUrls={imageUrls}
    />
  );

  const promotionTypes = ['all', 'casino', 'sports'];

  return (
    <PromotionsFilterWrapper>{promotionTypes.map(renderPromotionButton)}</PromotionsFilterWrapper>
  );
};

export default PromotionFilter;
