export const headers = ['dateTime', 'id', 'status', 'amount', 'method'];

export const tabOptions = [
  {
    label: 'Deposits',
    isActive: true,
    name: 'deposits'
  },
  {
    label: 'Withdrawals',
    isActive: false,
    name: 'withdrawals'
  }
];

export const statusColors = {
  Pending: 'var(--yellow-4)',
  Unapproved: 'var(--yellow-4)',
  Approved: 'var(--tealish-green)',
  Declined: 'var(--pure-red)'
};

export const desktopMaxRowPerTable = 25;
export const mobileMaxRowPerTable = 3;
