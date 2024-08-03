export interface ContactPreferences {
  receiveEmailFromOperator: boolean;
  receiveSMSFromOperator: boolean;
  receiveExclusiveOffersAndBonuses: boolean;
  receiveEmailFromThirdParty: boolean;
  receiveSMSFromThirdParty: boolean;
  blockAll: boolean;
  doNotCall: boolean;
  optinProfiling: boolean;
  receiveLandBasedRetailInfo: boolean;
  receiveLoginNotification: boolean;
  contactPrefChannels: {
    email: boolean;
    sms: boolean;
    post: boolean;
    telephone: boolean;
    im: boolean;
    popupInbox: boolean;
  };
  productTypes: {
    productTypeId: number;
    receivePromoEmail: boolean;
    productTypeName: string;
  }[];
}

export interface ValidationErrorResponse {
  validationErrors: Record<string, string[]>;
}

export interface ErrorResponse {
  errorMessage: string;
}
