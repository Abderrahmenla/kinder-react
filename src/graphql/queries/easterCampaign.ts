import { gql } from '@apollo/client';

export const GET_ALL_EASTER_CAMPAIGN = gql`
  query easterGiveaways {
    easterGiveaways {
      data {
        id
        attributes {
          Date
          locale
          EggPosition
          IsBonus
          Bonus {
            id
            BonusType
            OptInCode
            PrizeName
            PrizeActivationInfo
            VIPLevel
            Image {
              data {
                id
                attributes {
                  size
                  url
                  previewUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;
