import { gql } from '@apollo/client';

export const GET_ALL_PROMOTIONS = gql`
  query GetPromotions($locale: I18NLocaleCode) {
    promotions(locale: $locale) {
      data {
        id
        attributes {
          Banner {
            data {
              id
              attributes {
                width
                height
                url
              }
            }
          }
          Featured
          ShortDescription
          Icon {
            data {
              id
              attributes {
                width
                height
                url
              }
            }
          }
          PromotionName
          PromotionType
          Slug
          Body
          ExpiryDate
          CountdownDate
          CountdownTitle
          GamesCategoryMobileID
          GamesCategoryDesktopID
        }
      }
    }
  }
`;
