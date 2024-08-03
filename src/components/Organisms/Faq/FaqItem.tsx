import React, { useRef } from 'react';
import Grid from '@mui/material/Grid';
import ReactHtmlParser from 'react-html-parser';
import {
  AnswerContainer,
  FaqItemContainer,
  QuestionContainer,
  QuestionText
} from './FaqItem.style';

interface Faq {
  Title: string;
  Text: string;
}

interface FaqItemProps {
  toggleDropdown: () => void;
  faq: Faq;
  isVisible: boolean;
}

const FaqItem: React.FC<FaqItemProps> = ({ toggleDropdown, faq, isVisible }) => {
  const faqRef = useRef<HTMLDivElement>(null);

  const handleToggleAndScroll = () => {
    toggleDropdown();

    setTimeout(() => {
      const element = faqRef.current;
      if (element) {
        const offset = 150;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <Grid item style={{ padding: 0 }} xs={12} sm={6}>
      <FaqItemContainer ref={faqRef}>
        <QuestionContainer onClick={handleToggleAndScroll} isVisible={isVisible}>
          <QuestionText>{faq.Title}</QuestionText>
        </QuestionContainer>
        <AnswerContainer isVisible={isVisible}>
          <>{ReactHtmlParser(faq.Text)}</>
        </AnswerContainer>
      </FaqItemContainer>
    </Grid>
  );
};

export default FaqItem;
