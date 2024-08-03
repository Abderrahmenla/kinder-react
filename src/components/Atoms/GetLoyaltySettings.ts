import { countriesAndCurrencies } from '../../utils/countriesAndCurrencies';

export const getCurrency = (currencyCode: string) => {
  const selectedCurrency = countriesAndCurrencies.find(
    (currency) => currency.code === currencyCode
  );
  return selectedCurrency?.symbol || '$';
};

const VipLevelColors = [
  { name: 'Starter', color: 'var(--pale-violet-100)' },
  { name: 'Bronze', color: 'var(--golden)' },
  { name: 'Silver', color: 'var(--light-silver)' },
  { name: 'Gold', color: 'var(--yellow-7)' },
  { name: 'Platinum', color: 'var(--light-silver)' },
  { name: 'Diamond', color: 'var(--diamond-l)' },
  { name: 'Double Diamond', color: 'var(--pure-blue-100)' },
  { name: 'Blue Diamond', color: 'var(--pure-blue)' },
  { name: 'Onyx', color: 'var(--pure-blue)' },
  { name: 'Pink Diamond', color: 'var(--vivid-pink)' },
  { name: 'Black Diamond Club', color: 'var(--pure-blue)' }
];

export const getLevelColor = (VipLevel?: string) => {
  if (VipLevel) {
    const selectedLevel = VipLevelColors.find((level) => VipLevel.includes(level.name));
    return selectedLevel?.color || 'var(--pale-violet-100)';
  }
};
