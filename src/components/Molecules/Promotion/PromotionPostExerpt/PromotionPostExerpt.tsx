import React, { CSSProperties } from 'react';
import { PromotionPostExerptContainer } from './PromotionPostExerpt.style';
import ReactHtmlParser from 'react-html-parser';
interface PromotionPostExerptProps {
  body?: string;
  style?: CSSProperties | undefined;
}

const PromotionPostExerpt: React.FC<PromotionPostExerptProps> = ({ body, style }) => {
  const firstChild = body && ReactHtmlParser(body);
  return (
    <PromotionPostExerptContainer style={style}>
      <>{firstChild}</>
    </PromotionPostExerptContainer>
  );
};

export default PromotionPostExerpt;
