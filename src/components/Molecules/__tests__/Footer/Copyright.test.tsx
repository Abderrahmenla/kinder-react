import React from 'react';
import { render, screen } from '@testing-library/react';
import Copyright from '@/components/Molecules/Footer/Copyright/Copyright';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';

import { useTranslations } from '@/hooks/useTranslations';

jest.mock('@/hooks/useTranslations');

describe('Copyright', () => {
  interface MockTranslations {
    copyright: string;
  }

  const mockTranslations: MockTranslations = {
    copyright:
      'Copyright © 2023 www.spinbet.com is owned and operated by Pretense Flip N.V., registration number: 160797. Registered address: Groot Kwartierweg 10, Willemstad, Curacao. Scrummy Limited, registration number: HE 439236. Registered address: Stavrodromiou, 69 Flat/Office 201, 6045, Larnaca, Cyprus is acting as a payment Agent on behalf of the license-holding entity Pretense Flip N.V.. License no. 8048/JAZ2022-088'
  };

  const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
  mockUseTranslations.mockReturnValue({
    t: (key) => mockTranslations[key as keyof MockTranslations],
    loading: false,
    error: false
  });

  it('should render the copyright text exactly', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <Copyright />
        </MockRouter>
      </RecoilRoot>
    );

    const copyrightText = mockTranslations.copyright;
    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });
});
