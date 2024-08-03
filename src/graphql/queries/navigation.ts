import { gql } from '@apollo/client';

export const GET_SIDEBAR_NAV = gql(`
query getSidebarNav($locale: I18NLocaleCode) {
    sidebar( locale: $locale) {
      data {
        attributes {
          Casino {
            Icon {
              data {
                attributes {
                  url
                }
              }
            }
            Name
            CategoryIdMobile
            CategoryIdDesktop
            Slug
            IsLoggedIn
          }
          Sports(pagination: { limit: 100 }) {
            Icon {
              data {
                attributes {
                  url
                }
              }
            }
            Name
            CategoryId
            sportsID
            championshipsID
            Slug
            Section
            IsLoggedIn
          }
          Common {
            Icon {
              data {
                attributes {
                  url
                }
              }
            }
            Name
            CustomAction
            Slug
            IsLoggedIn
          }
          Languages {
            Flag {
              data {
                attributes {
                  url
                }
              }
            }
            LanguageCode
            LanguageName
          }
        }
      }
    }
  }
`);

export const GET_SPORTS_PATH = gql(`
query getSportsPath($locale: I18NLocaleCode) {
    sidebar( locale: $locale) {
      data {
        attributes {
          Sports(pagination: { limit: 100 }) {
            Slug
          }
        }
      }
    }
  }
`);
