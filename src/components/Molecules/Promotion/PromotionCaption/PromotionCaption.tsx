import { CSSProperties, FC } from 'react';
import {
  PromotionInfoControl,
  PromotionInfoControlLeft,
  PromotionInfoControlLeftCaptions
} from './PromotionCaption.style';
import { useTranslations } from '@/hooks/useTranslations';
import formatDate from '@/utils/formatUtils/formatDate';

interface PromotionCaptionProps {
  expirydate: string;
  style?: CSSProperties | undefined;
}
const PromotionCaption: FC<PromotionCaptionProps> = ({ expirydate, style }) => {
  const { t } = useTranslations();
  return (
    <PromotionInfoControl style={style}>
      <PromotionInfoControlLeft>
        <PromotionInfoControlLeftCaptions>
          <div className="promotionpost-time-date">
            <span>
              {expirydate &&
                (new Date(expirydate) < new Date() ? (
                  <span className="expired">{t('expired')}</span>
                ) : (
                  `${t('endsAt')} ${formatDate(expirydate, { hasTime: true })}`
                ))}
            </span>
          </div>
        </PromotionInfoControlLeftCaptions>
      </PromotionInfoControlLeft>
    </PromotionInfoControl>
  );
};

export default PromotionCaption;
