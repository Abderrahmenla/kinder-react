export interface ContactInfo {
  subTypeId: number;
  typeId: number;
  preferred: boolean;
  value: string;
  verified: boolean;
  name: string;
}

export interface SecretQuestionsAndAnswers {
  secretQuestionId: number;
  secretAnswer: string;
}

export interface LoginResponse {
  messages: string | null;
  logonSession: {
    username: string;
    sessionToken: string;
    playerId: number;
    logonTime: string;
  } | null;
  failedLoginCount: number | null;
  lastLoginTime: string;
  lastLoginIp: string | null;
  renewalToken: string;
  changeUsernameToken: string | null;
  renewalTokenExpirySeconds: number;
  jwt: string;
}

export interface GetPlayerResponse {
  player: {
    registrationDate: string;
  };
}

export interface PlayerData {
  player: {
    userName: string;
    password: string;
    eMail: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    gender?: string;
    street?: string;
    houseNumber?: number;
    city?: string;
    postalCode?: string;
    stateProvince?: string;
    countryCode: string;
    portalId: number;
    currencyCode: string;
    locale: string;
    title: number;
    phoneNumber?: string;
    mobilePhone?: string;
    secretQuestionId?: number;
    secretAnswer?: string;
    couponCode?: string;
    receiveNews?: boolean;
    nickname?: string;
    productTypeId?: number;
    ignoreInternalAccountsWhiteListSetting?: boolean;
    instantMessenger?: string;
    instantMessengerType?: string;
    customParameters?: any;
    useMFA?: boolean;
    receiveSMSFromOperator?: boolean;
    receiveEmailFromOperator?: boolean;
    tcVersion?: number;
  };
  portalId: number;
}

export interface Credentials {
  userName: string;
  password: string;
  portalId: number;
  includeNotifications: boolean;
  mobileClient: boolean;
  loginType: string;
  isPersistent: boolean;
}
export interface ErrorResponse {
  errorMessage: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  validationErrors: Record<string, string[]>;
}
export interface RefreshTokenRequest {
  renewalToken: string;
  portalId: number;
}

export interface ApiResponse<T = any> {
  status: string;
  data: T;
  token?: string;
}

interface Action {
  id: number;
  name: string;
  actionType: number;
}

interface Message {
  id: number;
  actions: Action[];
  title: string;
  createdDate: string;
  contents: string;
  messageType: string;
  messageSubtype: string;
  messageGroup: string;
  state: string;
}

interface LogonSession {
  sessionToken: string;
  playerId: number;
  logonTime: string;
  username: string;
}

export interface RefreshTokenResponse {
  messages: Message;
  logonSession: LogonSession;
  failedLoginCount: number;
  lastLoginTime: string;
  lastLoginIp: string;
  renewalToken: string;
  renewalTokenExpirySeconds: number;
  jwt: string;
}
interface Translation {
  fieldName: string;
  fieldTranslation: string;
}

interface GameMain {
  id: number;
  externalId: string;
  productSupplierId: number;
  productId: number;
  productName: string;
  name: string;
  demoPlayRestricted: boolean;
  realPlayRestricted: boolean;
  maintenanceModeEnabled: boolean;
  progressiveJackpots: string[];
  translations: Translation[];
}

export type Game = {
  gameExternalId: string;
  playerId: number;
  marketDate: string;
  gameName: string;
  gameType: string;
  product: string;
};

export interface Category {
  id: number;
  parentId: number;
  name: string;
  subLevel: string[];
  gameMains: GameMain[];
  levelType: string; // Consider making this a union type if there are limited possible values
}

export type Country = {
  name: string;
  code: string;
};

export type Currency = {
  name: string;
  code: string;
};

export type LocationInfo = {
  countryCode: string;
  xForwardedIp: string;
  ipAddress: string;
};
