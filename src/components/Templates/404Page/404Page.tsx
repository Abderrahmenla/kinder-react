import React from 'react';
import {
  ErrorButtonRow,
  ErrorContent,
  ErrorGraphicImage,
  ErrorGraphicRow,
  ErrorPageSection,
  ErrorTitle,
  BackToHomepageButton
} from './404PageStyle';
import { assets } from '@/config/assets';

const NotFoundPageTemp: React.FC = () => {
  return (
    <ErrorPageSection>
      <ErrorGraphicRow>
        <ErrorGraphicImage
          src={`${assets}/images/404ImageTwo.svg`}
          alt="error-page-graphic"
          width={50}
          height={50}
        />
      </ErrorGraphicRow>
      <ErrorContent>
        <ErrorTitle>{`Sorry, the page you're looking for doesn't exist!`}</ErrorTitle>
        <ErrorButtonRow>
          <BackToHomepageButton href="/">{`Back to homepage`}</BackToHomepageButton>
        </ErrorButtonRow>
      </ErrorContent>
    </ErrorPageSection>
  );
};

export default NotFoundPageTemp;
