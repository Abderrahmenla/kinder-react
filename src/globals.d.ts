/* eslint-disable @typescript-eslint/ban-types */

declare global {
  interface AltenarWSDKHorseParams {
    horseRaceId?: number;
    horseRaceName?: string;
  }
  interface AltenarWSDKInitParams {
    integration?: string;
    culture?: string;
    token?: string;
  }

  interface AltenarWSDKSportsBookEventParams {
    id: number;
    liveTime?: string;
    sportId: number;
    catId: number;
    champId: number;
  }

  export interface AltenarWSDKAddSportsBookParamsPropsObj {
    categoryIds?: Array<number>;
    eventId?: number;
    betId?: number;
    sportId?: number;
    page?: string;
    eventId?: number;
    horseRaceId?: number;
    championshipIds?: Array<number>;
    onSignInButtonClick?: VoidFunction;
    onBetPlacement?: VoidFunction;
    onRouterLoad?: VoidFunction;
    onEventSelect?: (event: AltenarWSDKSportsBookEventParams) => void;
    onTopSportClick?(sport: { id: number; typeId: number }): void;
    onHorseRaceSelect?: (horse: AltenarWSDKHorseParams) => void;
  }

  export interface AltenarWSDKAddSportsBookParams {
    container: HTMLElement | null;
    props: AltenarWSDKAddSportsBookParamsPropsObj;
  }

  export interface AltenarWSDK {
    init: (params: AltenarWSDKInitParams) => void;
    set: (params: AltenarWSDKInitParams | AltenarWSDKAddSportsBookParamsPropsObj) => void;
    addSportsBook: (params: AltenarWSDKAddSportsBookParams) => void;
    addWidget: (params: AltenarWSDKAddWidgetParams) => void;
    remove: () => void;
  }

  interface AltenarWSDKAddWidgetParams {
    widget:
      | 'WBetSlip'
      | 'WSportOverview'
      | 'WTopSports'
      | 'WUpcoming'
      | 'WBetHistory'
      | 'WHorseRacingOverview'
      | 'WHorseRacingDetails';
    container: HTMLElement | null;
    props: {
      showBets?: boolean;
      horseRaceId?: number;
      onHorseRaceSelect?: (horse: AltenarWSDKHorseParams) => void;
      betTypes?: Array<number>;
      enableExpansion?: boolean;
      expand?: boolean;
      sportId?: number;
      onTopSportClick?(sport: { id: number; typeId: number }): void;
      onEventSelect?: (event: AltenarWSDKSportsBookEventParams) => void;
      eventCount?: number;
      showEventDetails?: boolean;
      onOddSelect?: VoidFunction;
      onSignInButtonClick?: VoidFunction;
      onBetPlacement?: VoidFunction;
    };
    tokens?: {};
  }

  type TrackingDataLayer = Array<{
    event: 'user_register' | 'login' | 'deposit' | 'first_deposit';
    userId?: string;
    value?: string;
    currency?: string;
    game_category?: string;
    game_name?: string;
  }>;

  interface Window {
    altenarWSDK?: AltenarWSDK;
    dataLayer?: TrackingDataLayer;
    _PaymentIQCashier: typeof _PaymentIQCashier;
    _PaymentIQCashierReset: () => void;
    UniboOverlay?: typeof UniboOverlay;
  }
}
export interface AltenarInstance {
  remove: () => void;
}
