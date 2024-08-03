import { calculateTimeLeftCountdown } from './calculateTimeLeftCountdown';

describe('calculateTimeLeftCountdown', () => {
  it('should return all zeros for a date in the past', () => {
    const pastDate = new Date().toISOString();
    const result = calculateTimeLeftCountdown(pastDate);
    expect(result).toEqual({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  });

  it('should return correct time for a date in the future', () => {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + 1000 * 60 * 60 * 25 + 1000 * 60 * 5 + 1000 * 6
    );
    const result = calculateTimeLeftCountdown(futureDate.toISOString());
    expect(result).toEqual({ days: '01', hours: '01', minutes: '05', seconds: '06' });
  });
  it(' should handle exact one hour, one minute, and one second difference correctly', () => {
    const currentDate = new Date();
    const futureTime = new Date(currentDate.getTime() + 1000 * 60 * 61 + 1000); // 1 hour, 1 minute, and 1 second in the future
    const result = calculateTimeLeftCountdown(futureTime.toISOString());
    expect(result).toEqual({ days: '00', hours: '01', minutes: '01', seconds: '01' });
  });
  it('should handle exact one day difference correctly', () => {
    const currentDate = new Date();
    const oneDayLater = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    const result = calculateTimeLeftCountdown(oneDayLater.toISOString());
    expect(result).toEqual({ days: '01', hours: '00', minutes: '00', seconds: '00' });
  });
});
