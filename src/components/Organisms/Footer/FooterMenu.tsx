import React from 'react';
import {
  AgePlusCurrency,
  CasinoAnalyzerImage,
  ContactCopyrightContainer,
  CopyrightContent,
  CustomContainer,
  FtMenuList,
  FtRow
} from './Footer.styles';
import { FooterMenuProps } from './FooterTypes';
import FooterCurrency from '@/components/Molecules/Footer/FooterCurrencies/FooterCurrency';
import Image from 'next/image';
import { VerificationSeal } from '@/components/Molecules/Footer/VerificationSeal';
import { assets } from '@/config/assets';
import Copyright from '@/components/Molecules/Footer/Copyright/Copyright';
import { localeState } from '@/components/state/localeState';
import { useRecoilValue } from 'recoil';

export const FooterMenu: React.FC<FooterMenuProps> = ({ children }) => {
  const locale = useRecoilValue(localeState);
  return (
    <FtRow>
      <CustomContainer>
        <FtMenuList>
          {children}
          <ContactCopyrightContainer>
            <AgePlusCurrency>
              <Image
                width={41}
                height={41}
                src={`${assets}/images/18-logo-greyscale.svg`}
                alt="18+ icon"
                style={{ width: '41px', height: 'auto' }}
              />
              <FooterCurrency />
            </AgePlusCurrency>

            {['en-NZ', 'fr-CA', 'en-CA'].includes(locale) && (
              <CasinoAnalyzerImage>
                <Image
                  width={197}
                  height={82}
                  src={`${assets}/images/casino-analyzer-logo.svg`}
                  alt="casino-analyzer logo"
                />
              </CasinoAnalyzerImage>
            )}

            <CopyrightContent>
              <VerificationSeal />
              <Copyright />
            </CopyrightContent>
          </ContactCopyrightContainer>
        </FtMenuList>
      </CustomContainer>
    </FtRow>
  );
};
