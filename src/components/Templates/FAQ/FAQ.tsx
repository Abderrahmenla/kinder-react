import Grid from '@mui/material/Grid';
import { useState } from 'react';
import FaqItem from '../../Organisms/Faq/FaqItem';
import FaqDesktopQuestion from '../../Organisms/Faq/FaqDesktopQuestion';
import FaqDesktopAnswer from '@/components/Organisms/Faq/FaqDesktopAnswer';
import { FaqProps } from 'src/graphql/types/faqTypes';
import {
  FAQContainerMobile,
  FAQWrapper,
  HeadingMobile,
  PageHeading,
  PageHeadingContainer,
  QuestionWrapper,
  AnswerWrapper
} from './FAQ.style';
import { useTranslations } from '@/hooks/useTranslations';
import { useMediaQuery } from '@mui/material';

const FaqTem = ({ faqs }: { faqs: FaqProps[] }) => {
  const { t } = useTranslations();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  const isMobile = useMediaQuery('(max-width:1023px)');

  return (
    <Grid container spacing={2} style={{ margin: 0 }}>
      <Grid item xs={12} style={{ padding: 0 }}>
        {isMobile ? (
          <FAQContainerMobile>
            <HeadingMobile size="b2" type="Body">
              {t('faq')}
            </HeadingMobile>
          </FAQContainerMobile>
        ) : (
          <PageHeadingContainer>
            <PageHeading>{t('faq')}</PageHeading>
          </PageHeadingContainer>
        )}
      </Grid>
      <FAQWrapper>
        {isMobile &&
          faqs.map(({ id, attributes }) => (
            <FaqItem
              key={id}
              toggleDropdown={() => toggleDropdown(id)}
              faq={attributes}
              isVisible={openDropdown === id}
            />
          ))}
        {!isMobile && (
          <>
            <QuestionWrapper>
              {faqs.map(({ id, attributes }) => (
                <FaqDesktopQuestion
                  key={id}
                  toggleDropdown={() => toggleDropdown(id)}
                  title={attributes.Title}
                  isVisible={openDropdown === id}
                />
              ))}
            </QuestionWrapper>
            <AnswerWrapper>
              {faqs.map(({ id, attributes }) => (
                <FaqDesktopAnswer key={id} text={attributes.Text} isVisible={openDropdown === id} />
              ))}
            </AnswerWrapper>
          </>
        )}
      </FAQWrapper>
    </Grid>
  );
};

export default FaqTem;
