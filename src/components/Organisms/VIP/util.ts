export const formatRakebackBalance = (balance: number, currency: string) => {
  const formattedBalance = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'NZD'
  }).format(balance || 0);

  return formattedBalance;
};

export const calculatePercentage = (loyaltyDetails: {
  vipPointsInPeriod: number;
  pointsNeededForNextVIPLevel: number;
}) => {
  if (!loyaltyDetails) return null;

  const { vipPointsInPeriod, pointsNeededForNextVIPLevel } = loyaltyDetails;

  if (!pointsNeededForNextVIPLevel) return null;

  return (((vipPointsInPeriod || 0) * 100) / pointsNeededForNextVIPLevel).toFixed(2);
};
