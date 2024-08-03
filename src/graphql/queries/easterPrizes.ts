import { gql } from '@apollo/client';

export const GET_EASTER_PRIZES = gql(`
query getEasterPrizes {
  easter {
    data {
      attributes {
        Rules
        GameCategoryDesktop
        GameCategoryMobile
        VIPLevelPrizes {
          VIPLevelName
          id
          Prize {
            id
            Name
            Link
            Image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`);
