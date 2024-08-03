interface CustomParameters {
  CPF: string;
  CPFStatus: string;
  PEP: string;
  SANC: string;
}

export interface PlayerData {
  id: number;
  portalId: number | null;
  activePlayer: boolean;
  secretQuestionId: number | null;
  securityQuestion: string | null;
  secretAnswer: string | null;
  securityAnswer: string | null;
  firstName: string;
  lastName: string;
  middleName: string | null;
  dateOfBirth: string;
  currencyCode: string;
  countryCode: string;
  gender: string;
  city: string | null;
  postalCode: string | null;
  street: string | null;
  houseNumber: string | null;
  eMail: string;
  locale: string;
  userName: string;
  password: string | null;
  signupIp: string | null;
  title: number;
  stateProvince: string | null;
  hearAboutUs: string | null;
  couponCode: string | null;
  receiveNews?: boolean;
  geoLocCountryCode: string | null;
  mobileClient: boolean;
  nickname: string | null;
  productTypeId: number | null;
  affiliateExternalId: string | null;
  registrationDate: string;
  ignoreInternalAccountsWhiteListSetting: boolean;
  instantMessengerType: number;
  instantMessenger: string | null;
  mobilePhone: string | null;
  contactInfo: string | null;
  customParameters: CustomParameters;
  secretQuestionsAndAnswers: string | null;
  useMFA: boolean | null;
  internalAccount: boolean;
  registrationPortalId: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  playerId: string | null;
}

export interface LoaderHook {
  isLoading: boolean;
  toggleLoader: (loading: boolean) => void;
  loadingWrapper: JSX.Element;
}

export interface Countries {
  name: string;
  dial_code: string;
  code: string;
  flag_1x1: string;
  flag_4x3: string;
}
