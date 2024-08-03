import React from 'react';
import { EasterRulesContainer } from '@/components/Molecules/Easter/Easter.styles';
import ReactHtmlParser from 'react-html-parser';
import { EasterRulesProps } from '@/components/Molecules/Easter/Easter.types';

const EasterRules: React.FC<EasterRulesProps> = ({ easterRules }) => {
  return (
    <EasterRulesContainer>
      {ReactHtmlParser(easterRules as string) as React.ReactNode}
    </EasterRulesContainer>
  );
};

export default EasterRules;
