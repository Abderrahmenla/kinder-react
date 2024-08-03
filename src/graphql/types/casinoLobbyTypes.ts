export interface CasinoLobbyType {
  Providers: any;
  GameCategories: any;
  data: {
    casinoLobby: {
      data: {
        attributes: {
          Providers: Provider[];
          GameCategories: GameCategory[];
        };
      };
    };
  };
}

export interface HorizontalMenuType {
  HorizontalMenu: [];
  data: {
    casinoLobby: {
      data: {
        attributes: {
          HorizontalMenu: GameCategory[];
        };
      };
    };
  };
}

export interface GameCategory {
  Name: string;
  CategoryIdDesktop: string;
  CategoryIdMobile: string;
  id: string;
  Icon: {
    data: {
      attributes: {
        name: string;
        url: string;
      };
    };
  };
}

export interface Provider {
  Name: string;
}
