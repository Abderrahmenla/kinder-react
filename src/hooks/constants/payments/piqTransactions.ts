export const PiqTransactionStatus = {
  waitingApproval: 'WAITING_APPROVAL',
  cancelled: 'CANCELLED'
};

export const LocalePiqTransactionStatus = new Map([
  [PiqTransactionStatus.waitingApproval, 'Pending'],
  [PiqTransactionStatus.cancelled, 'Cancelled']
]);

export const PiqTransactionMethod = {
  creditCardWithdrawal: 'CreditcardWithdrawal',
  bankLocalWithdrawal: 'BankLocalWithdrawal',
  cryptoCurrencyWithdrawal: 'CryptoCurrencyWithdrawal'
};

export const LocalePiqTransactionMethod = new Map([
  [PiqTransactionMethod.creditCardWithdrawal, 'Credit Card'],
  [PiqTransactionMethod.bankLocalWithdrawal, 'Local Bank'],
  [PiqTransactionMethod.cryptoCurrencyWithdrawal, 'Cryptocurrency']
]);
