import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import MockRouter from '@/mocks/MockRouter';
import { VerificationSeal } from '@/components/Molecules/Footer/VerificationSeal';

describe('VerificationSeal', () => {
  it('should render the copyright verification seal with correct src', () => {
    render(
      <RecoilRoot>
        <MockRouter>
          <VerificationSeal />
        </MockRouter>
      </RecoilRoot>
    );
    const divElement = screen.getByTestId('apg-497577c7-1aa0-4463-9ce8-344db5be12f2');
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveAttribute('data-apg-seal-id', '497577c7-1aa0-4463-9ce8-344db5be12f2');
    expect(divElement).toHaveAttribute('data-apg-image-size', '90');
    expect(divElement).toHaveAttribute('data-apg-image-type', 'basic-light-large');
  });
});
