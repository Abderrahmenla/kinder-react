import { getBetResult } from '@/components/Organisms/Settings/BetHistory/BetHistory.utils';

describe('getBetResult function', () => {
  it('should return win amount when status is "win"', () => {
    const stake = 30;
    const win = 20;
    const result = getBetResult({ status: 'win', stake, win });
    expect(result).toBe(win);
  });

  it('should return difference between stake and win when status is "lose"', () => {
    const stake = 30;
    const win = 20;
    const result = getBetResult({ status: 'lose', stake, win });
    expect(result).toBe(stake - win);
  });

  it('should return 0 when status is neither "win" nor "lose"', () => {
    const stake = 30;
    const win = 20;
    const result = getBetResult({ status: 'anyOtherStatus', stake, win });
    expect(result).toBe(0);
  });
});
