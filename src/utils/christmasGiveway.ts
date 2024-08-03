export const isColumnSpanDay = (day: number): boolean => {
  const rowSpanDays = [2, 14, 16];
  return rowSpanDays.includes(day);
};

export const isRowSpanDay = (day: number): boolean => {
  const columnSpanDays = [4, 11];
  return columnSpanDays.includes(day);
};

export const isDayMissed = (
  day: number,
  month: number,
  year: number,
  giveawayData: Array<{ day: string; isRevealed: boolean; prizeType: string }>,
  serverTime: Date
): boolean => {
  const serverDateUTC = new Date(
    Date.UTC(serverTime?.getFullYear(), serverTime?.getMonth(), serverTime?.getDate())
  );

  const giveawayDayDateUTC = new Date(Date.UTC(year, month, day));

  if (giveawayDayDateUTC >= serverDateUTC) {
    return false;
  }

  const dayData = giveawayData.find(() => {
    const dayDateUTC = new Date(
      Date.UTC(serverTime?.getFullYear(), serverTime?.getMonth(), serverTime?.getDate())
    );

    return dayDateUTC.getDate() === giveawayDayDateUTC.getDate();
  });

  return !dayData || !dayData.isRevealed;
};
export const isDayOpened = (
  day: number,
  month: number,
  year: number,
  giveawayData: Array<{ day: string; isRevealed: boolean; prizeType: string }>
): boolean => {
  const giveawayDayDateUTC = new Date(Date.UTC(year, month, day));

  const dayData = giveawayData.find((d) => {
    const formattedDate = d.day.replace(/-/g, '/');
    const dayDateLocal = new Date(formattedDate);
    const dayDateUTC = new Date(
      Date.UTC(dayDateLocal.getFullYear(), dayDateLocal.getMonth(), dayDateLocal.getDate())
    );
    return dayDateUTC.getDate() === giveawayDayDateUTC.getDate();
  });

  return dayData ? dayData.isRevealed : false;
};
