import { gql } from '@apollo/client';

export const GET_HOMEPAGE_BANNERS = gql(`
query GetBanners($locale : I18NLocaleCode) {
  banners(filters: { PageType: { contains: "Homepage" } }, locale:$locale, sort: ["id"]) {
    data {
      id
      attributes {
        Title
        SubTitle
        PageType
        CTAName
        CTAValue
        CTAType
        BackgroundImage {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);

export const GET_CASINO_BANNERS = gql(`
query GetBanners($locale : I18NLocaleCode) {
  banners(filters: { PageType: { contains: "Casino" } }, locale:$locale, sort: ["id"]) {
    data {
      id
      attributes {
        PageType
        CTAValue
        BackgroundImage {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);

export const GET_SPORTSBOOK_BANNERS = gql(`
query GetBanners($locale : I18NLocaleCode) {
  bannersV2S(filters: { PageType: { contains: "SportsBook" } }, locale:$locale, sort: ["id"]) {
    data {
      id
      attributes {
        Title
        Subtitle
        CTAType
        CTALink
        CTAName
        PromotionLabel
        BackgroundImage {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);

export const GET_AUTHENTICATION_BANNERS = gql(`
query GetBanners($locale : I18NLocaleCode) {
  banners(filters: { PageType: { contains: "ResetPassword" } }, locale:$locale) {
    data {
      id
      attributes {
        Title
        BackgroundImage {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);

export const GET_VERIFICATION_BANNER = gql(`
query GetBanners($locale : I18NLocaleCode) {
  bannersV2S(filters: { PageType: { contains: "Verification" } }, locale: $locale, sort: ["id"]) {
    data {
      id
      attributes {
        Title
        BackgroundImage {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);
