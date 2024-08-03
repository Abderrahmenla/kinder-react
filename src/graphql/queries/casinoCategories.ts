import { gql } from '@apollo/client';

export const GET_HORIZONTAL_CASINO_CATEGORIES = gql(`
query {
  casinoLobby {
    data {
      attributes {
        HorizontalMenu {
          id
          Name
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
      }
    }
  }
}
`);
