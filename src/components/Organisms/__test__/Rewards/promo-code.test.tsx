import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { PromoCode } from '../../Rewards/PromoCode';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
const promoCode = faker.string.alpha();

jest.mock('@/hooks/useTranslations', () => ({
  useTranslations: jest.fn(() => ({
    t: jest.fn((key) => {
      // Simulate translations
      const translations: any = {
        'haveAPromoCode?': 'Have a Promocode?'
      };
      return translations[key] || key;
    })
  }))
}));

describe('Rewards Promo Code Section', () => {
  it('renders', async () => {
    render(
      <RecoilRoot>
        <PromoCode />
      </RecoilRoot>
    );
    const input = screen.getByRole('textbox');

    expect(input).toBeVisible();

    await userEvent.type(input, promoCode);

    expect(input).toHaveValue(promoCode);
  });
});
