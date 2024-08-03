import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { CopyrightText, CopyrightTextContainer } from './Copyright.styles';

const Copyright = () => {
  const { t } = useTranslations();

  return (
    <CopyrightTextContainer>
      <CopyrightText size="b2" type="Body">
        {t('copyright')}
      </CopyrightText>
    </CopyrightTextContainer>
  );
};

export default Copyright;
