export interface UploadFileEntityResponse {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface NavCasinoCategory {
  Icon: UploadFileEntityResponse;
  Name: string;
  CategoryIdMobile: number;
  CategoryIdDesktop: number;
  Slug: string;
  IsLoggedIn: boolean;
}

export interface NavSportsCategory {
  Icon: UploadFileEntityResponse;
  Name: string;
  CategoryId: number;
  sportsID: number;
  championshipsID: number;
  Slug: string;
  Section: string;
  IsLoggedIn: boolean;
}

export interface NavCommonCategory {
  Icon: UploadFileEntityResponse;
  Name: string;
  CustomAction: string;
  Slug: string;
  IsLoggedIn: boolean;
}

export interface NavLanguageDropdown {
  Flag: UploadFileEntityResponse;
  LanguageCode: string;
  LanguageName: string;
}

export interface SidebarNav {
  Casino: NavCasinoCategory[];
  Sports: NavSportsCategory[];
  Common: NavCommonCategory[];
  Languages: NavLanguageDropdown[];
}

export interface SportsPath {
  params: {
    sportsContent: string;
  };
}

export interface CasinoCategories {
  name: string;
  mobileCategoryID: number;
  desktopCategoryID: number;
  slug: string;
}
