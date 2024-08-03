import { gql } from '@apollo/client';

export const GET_ALL_VIP_PROGRAMS = gql(`
query GetVIPProgram($locale: I18NLocaleCode) {
    vipProgram(locale: $locale) {
      data {
        id
        attributes {
          Steps {
            Text
            Title
            Image {
              data {
                attributes {
                  url
                  alternativeText
                  mime
                }
              }
            }
          }
          Level {
            MilestoneBanner{
              id
              Level
              Prize
              Milestone
              Reward
              RewardAmount
              BannerImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              PrizeLabel
              PrizeLabelIcon {
                data {
                  attributes {
                    url
                  }
                }
              }
              Badge{
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            Level
            SubLevels {
              Icon {
                data {
                  attributes {
                    url
                    alternativeText
                    mime
                  }
                }
              }
              Level
              WagerAmount
              CashReward
              BackgroundImage {
                data {
                  attributes {
                    url
                    alternativeText
                    mime
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
