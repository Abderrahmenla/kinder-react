const LIMIT_TYPES = {
  totalLost: 'TotalLost',
  deposit: 'Deposit',
  totalWager: 'TotalWager'
};

const LIMIT_HEADERS = {
  limitType: 'limitType',
  time: 'time',
  value: 'value',
  dateCreated: 'dateCreated',
  dateActivated: 'dateActivated',
  limitStatus: 'limitStatus',
  action: 'action'
};

const TIME_RANGE: { [key: string]: string } = {
  day: 'Day',
  week: 'Week',
  month: 'Month'
};

export const TIME_RANGE_LOCAL: { [key: string]: string } = {
  daily: 'Daily',
  monthly: 'Monthly',
  weekly: 'Weekly'
};

export const LOCAL_LIMIT_TYPES = new Map([
  [LIMIT_TYPES.totalLost, 'Total Lost'],
  [LIMIT_TYPES.deposit, 'Deposit'],
  [LIMIT_TYPES.totalWager, 'Total Wager']
]);

export const DELETE_LIMIT_CONFIRMATION = new Map([
  [LIMIT_TYPES.deposit, 'bySelectingConfirmDeleteDepositLimit'],
  [LIMIT_TYPES.totalWager, 'bySelectingConfirmDeleteWagerLimit'],
  [LIMIT_TYPES.totalLost, 'bySelectingConfirmDeleteLossLimit']
]);

export const LIMIT_TEXT_MAPPING = new Map([
  [
    LIMIT_TYPES.deposit,
    {
      heading: 'depositLimit',
      description: 'depositLimitCaption',
      confirmation: 'bySelectingConfirmDepositLimit'
    }
  ],
  [
    LIMIT_TYPES.totalWager,
    {
      heading: 'wagerLimit',
      description: 'wagerLimitCaption',
      confirmation: 'bySelectingConfirmLimitedWager'
    }
  ],
  [
    LIMIT_TYPES.totalLost,
    {
      heading: 'lossLimit',
      description: 'chooseToSetALossLimit',
      confirmation: 'bySelectingConfirmLossLimit'
    }
  ]
]);

export const DESKTOP_LIMITS_HEADERS = [
  LIMIT_HEADERS.limitType,
  LIMIT_HEADERS.time,
  LIMIT_HEADERS.value,
  LIMIT_HEADERS.dateCreated,
  LIMIT_HEADERS.dateActivated,
  LIMIT_HEADERS.limitStatus,
  LIMIT_HEADERS.action
];

export const MOBILE_LIMITS_HEADERS = [
  LIMIT_HEADERS.action,
  LIMIT_HEADERS.limitStatus,
  LIMIT_HEADERS.value,
  LIMIT_HEADERS.limitType,
  LIMIT_HEADERS.time,
  LIMIT_HEADERS.dateCreated,
  LIMIT_HEADERS.dateActivated
];

export const TIME_RANGE_TO_LOCAL = new Map([
  [TIME_RANGE.day, TIME_RANGE_LOCAL.daily],
  [TIME_RANGE.month, TIME_RANGE_LOCAL.monthly],
  [TIME_RANGE.week, TIME_RANGE_LOCAL.weekly]
]);

export const LOCAL_TO_TIME_RANGE = new Map([
  [TIME_RANGE_LOCAL.daily, TIME_RANGE.day],
  [TIME_RANGE_LOCAL.monthly, TIME_RANGE.month],
  [TIME_RANGE_LOCAL.weekly, TIME_RANGE.week]
]);

export const DURATION = 3000;
