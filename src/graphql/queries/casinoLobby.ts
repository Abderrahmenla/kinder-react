import { gql } from '@apollo/client';

export const GET_CASINO_CATEGORIES = gql(`
query {
  casinoLobby {
    data {
      attributes {
        Providers(pagination: { limit: 50 }) {
          Name
        }
        HorizontalMenu {
          id
          CategoryIdMobile
          CategoryIdDesktop
          Icon {
            data {
              attributes {
                name
                url
              }
            }
          }
          Slug
        }
        GameCategories {
          CategoryIdDesktop
          CategoryIdMobile
          Name
          id
          Icon {
            data {
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
}
`);
