export interface loyaltyData {
  bonusPoints: number;
  currencyCode: string;
  currentVIPLevelQualificationDate: Date | null;
  currentVIPLevelSustainmentDate: Date | null;
  localizedVIPLevel: string;
  manuallySetVIPLevel: string | null;
  nextLevelQualificationDate: Date | null;
  nextVIPLevelStatus: number;
  nextVIPlevel: string;
  pointsBalance: number;
  pointsExpireOn: Date | null;
  pointsNeededForCurrentVIPLevel: number;
  pointsNeededForNextVIPLevel: number;
  pointsRedemptionBlocked: boolean;
  redemptionRate: number;
  totalVIPPoints: number;
  vipLevel: string;
  vipPointsInPeriod: number;
}
