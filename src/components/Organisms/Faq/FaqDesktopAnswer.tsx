import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { motion } from 'framer-motion';
import { AnswerItem } from './FaqDesktopAnswer.style';

interface FaqItemProps {
  text: string;
  isVisible: boolean;
}

const FaqDesktopAnswer: React.FC<FaqItemProps> = ({ text, isVisible }) => {
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 15 }
  };

  return (
    <motion.div
      key={isVisible ? 'visible' : 'hidden'}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
    >
      <AnswerItem isVisible={isVisible}>{ReactHtmlParser(text)}</AnswerItem>
    </motion.div>
  );
};

export default FaqDesktopAnswer;
