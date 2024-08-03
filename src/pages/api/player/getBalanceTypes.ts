export interface Account {
  name?: string;
  balance: number;
  lockedAmount: number;
  currency?: string;
  accountType:
    | 'FakeMoney'
    | 'Money'
    | 'BonusMoney'
    | 'LoyaltyPoints'
    | 'RingfencedBalance'
    | 'PendingWinnings'
    | 'ExternalBonus'
    | 'NonWithdrawableBalance'
    | 'WithdrawableBalance';
  productType?: string;
  wageringRequirement?: number;
  wagered?: number;
  wagerType: 'PreWager' | 'AfterWager';
  bonusType?: string;
  initiallyLockedAmount: number;
  bonusCategoryId:
    | 'FirstDeposit'
    | 'Reload'
    | 'Rebate'
    | 'Cashback'
    | 'FreeSpins'
    | 'AwardGames'
    | 'Freebet';
  playerBonusId?: number;
  wageringContributionMode: 'Wagering';
  numWageredRequirement?: number;
  totalNumWagered?: number;
}

export interface GetBalanceResponse {
  accounts: Account[];
  recordCount: number;
}

export interface ValidationErrorResponse {
  validationErrors: Record<string, string[]>;
}

export interface ErrorResponse {
  errorMessage: string;
}
