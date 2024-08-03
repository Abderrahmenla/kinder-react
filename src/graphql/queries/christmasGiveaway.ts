import { gql } from '@apollo/client';

export const GET_ALL_CHRISMAS_GIVEAWAY = gql`
  query getChrismas {
    christmasGiveaway2023S(pagination: { pageSize: 31 }, sort: ["Day"]) {
      data {
        attributes {
          Day
          PrizeType
          BannerLink
          PrizeBanner {
            data {
              id
              attributes {
                name
                url
                previewUrl
                createdAt
                width
                height
                caption
              }
            }
          }
          BonusSection {
            id
            OptInCode
            PrizeName
            BonusType
            Image {
              data {
                id
                attributes {
                  width
                  height
                  url
                }
              }
            }
            VIPLevel
            PrizeActivationInfo
          }
          locale
          updatedAt
        }
      }
    }
  }
`;
