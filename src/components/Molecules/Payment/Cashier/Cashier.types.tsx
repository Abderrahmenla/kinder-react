export interface PiqCashierSuccessData {
  data: {
    status: string;
    payload: {
      txRefId: string;
      method: CashierMethod;
      amount: string;
      txAmount: string;
      txAmountCy: string;
      fee: string;
      pspReferenceId: string;
      psp: string;
      accountId: string;
      pspAccount: string;
      success: boolean;
      pspStatusCode: string;
      merchantTxId: string;
      bonusCode: null | string;
    };
  };
}

export enum CashierMethod {
  deposit = 'deposit',
  withdrawal = 'withdrawal'
}

export type CashierProps = {
  method: CashierMethod;
};

export type GenerateCashierConfigProps = {
  userId: string;
  sessionId: string;
  method: CashierMethod;
  locale: string;
};
