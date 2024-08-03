import React, { useRef } from 'react';

import { QuestionContainer, QuestionText } from './FaqDesktopQuestion.style';

interface FaqItemProps {
  toggleDropdown: () => void;
  title: string;
  isVisible: boolean;
}

const FaqDesktopQuestion: React.FC<FaqItemProps> = ({ toggleDropdown, title, isVisible }) => {
  const faqItemRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={faqItemRef}>
      <QuestionContainer onClick={toggleDropdown} isVisible={isVisible}>
        <QuestionText>{title}</QuestionText>
      </QuestionContainer>
    </div>
  );
};

export default FaqDesktopQuestion;
