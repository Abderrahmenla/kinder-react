import { useEffect, useState } from 'react';
import { PromotionProps } from 'src/graphql/types/promotionTypes';
import PromotionPost from '../../../Organisms/Promotions/PromotionPost/PromotionPost';
import {
  Heading,
  PromotionContainer,
  PromotionPageBanner,
  PromotionPostsItem,
  PromotionPostsList
} from './PromotionsPageStyle';
import PromotionsFilter from '../../../Organisms/Promotions/PromotionFilter/PromotionFilter';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';
import dayjs from 'dayjs';

const PromotionsPage = ({ promotions }: { promotions: PromotionProps[] }) => {
  const { t } = useTranslations();
  const [sortedPromotions, setSortedPromotions] = useState<PromotionProps[]>([]);
  const [promotionTypeFilter, setPromotionTypeFilter] = useState<string>('All');

  const imageUrls = {
    All: {
      active: `${assets}/images/presentIconWhite.svg`,
      notActive: `${assets}/images/presentIcon.svg`
    },
    Casino: {
      active: `${assets}/images/casinoIconWhite.svg`,
      notActive: `${assets}/images/casinoIcon.svg`
    },
    Sports: {
      active: `${assets}/images/sportsIconWhite.svg`,
      notActive: `${assets}/images/sportsIcon.svg`
    }
  };

  useEffect(() => {
    const currentDate = dayjs();
    const sevenDaysAgo = currentDate.subtract(7, 'days');

    const relevantPromotions = promotions
      .filter((promotion) => {
        const expiryDate = dayjs(promotion.attributes.ExpiryDate);

        return expiryDate.isAfter(sevenDaysAgo) || expiryDate.isSame(sevenDaysAgo, 'day');
      })
      .filter((promotion) => {
        if (promotionTypeFilter === 'All') {
          return true;
        } else {
          return promotion.attributes.PromotionType === promotionTypeFilter;
        }
      });

    setSortedPromotions(relevantPromotions);
  }, [promotions, promotionTypeFilter]);

  const handlePromotionTypeChange = (type: string) => {
    setPromotionTypeFilter(type);
  };

  return (
    <PromotionContainer>
      <PromotionPageBanner>
        <Heading size={'h1'} type={'Heading'}>
          {t('promotions')}
        </Heading>
      </PromotionPageBanner>
      <PromotionsFilter
        promotionTypeFilter={promotionTypeFilter}
        handlePromotionTypeChange={handlePromotionTypeChange}
        imageUrls={imageUrls}
      />
      <PromotionPostsList>
        {sortedPromotions.map(({ id, attributes }) => {
          const { PromotionName, ExpiryDate, Slug, Banner } = attributes;
          return (
            <PromotionPostsItem key={id}>
              <PromotionPost
                banner={Banner.data.attributes.url}
                PromotionName={PromotionName}
                expirydate={ExpiryDate}
                slug={Slug}
              />
            </PromotionPostsItem>
          );
        })}
      </PromotionPostsList>
    </PromotionContainer>
  );
};

export default PromotionsPage;
