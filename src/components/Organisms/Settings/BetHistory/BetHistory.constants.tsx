import { greenBorder, greenText, yellowBorder, yellowText } from './BetHistory.styles';
import { StatusStyles } from './BetHistory.types';

export const TAB = {
  casino: 'casino',
  sport: 'sport'
};

export const BET_STATUS = {
  won: 'Won',
  running: 'Running',
  lost: 'Lost',
  finished: 'Finished'
};

export const LOCAL_BET_STATUS = {
  win: 'win',
  pending: 'pending',
  lose: 'lose'
};

export const CASINO_HEADER = {
  game: 'game',
  dateAndTime: 'dateAndTime',
  amount: 'amount',
  result: 'result',
  id: 'id'
};

export const SPORTS_HEADER = {
  placedTime: 'placedTime',
  status: 'status',
  result: 'result',
  id: 'id'
};

export const TAB_OPTIONS = [
  {
    label: TAB.casino,
    name: TAB.casino,
    isActive: true
  },
  {
    label: TAB.sport,
    name: TAB.sport,
    isActive: false
  }
];

export const LOCAL_BET_STATUSES = new Map([
  [BET_STATUS.won, LOCAL_BET_STATUS.win],
  [BET_STATUS.running, LOCAL_BET_STATUS.pending],
  [BET_STATUS.lost, LOCAL_BET_STATUS.lose]
]);

export const STATUS_STYLES: Map<string, StatusStyles> = new Map([
  [LOCAL_BET_STATUS.win, { border: greenBorder, color: greenText }],
  [LOCAL_BET_STATUS.pending, { border: yellowBorder, color: yellowText }]
]);

export const DEFAULT_STATUS_STYLES: StatusStyles = {
  border: undefined,
  color: undefined
};
