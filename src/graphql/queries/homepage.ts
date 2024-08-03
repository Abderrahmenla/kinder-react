import { gql } from '@apollo/client';

export const GET_HOMEPAGE_CONTENT = gql(`
query GetHomepageContent($locale : I18NLocaleCode){
  homepage(locale: $locale){
    data {
      attributes {
        bannersv2s {
          data {
            attributes {
              PromotionLabel
              Title
              Subtitle
              CTAType
              CTALink
              CTAName
              BackgroundImage {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        Verticals {
          Text
          Link
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
        PaymentLogos {
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
        GamesCategoryDesktopID
        GamesCategoryMobileID
      }
    }
  }
}
`);

export const GET_HOMEPAGE_BANNER = gql(`
query GetBanners($locale : I18NLocaleCode) {
    bannersV2S(filters: { PageType: { contains: "Homepage" } }, locale:$locale) {
      data {
        id
        attributes {
          Title
          Subtitle
          PageType
          CTAName
          CTALink
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
  }`);
