import { removeAllDecimalsFromDate } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';

describe('removeAllDecimalsFromDate function', () => {
  it('should remove decimals from registrationDate', () => {
    const registrationDateWithDecimals = '2023-12-07T10:29:18.246+00:00';
    const expectedDateWithoutDecimals = '2023-12-07T10:29:18+00:00';

    const result = removeAllDecimalsFromDate(registrationDateWithDecimals);

    expect(result).toEqual(expectedDateWithoutDecimals);
  });
});
