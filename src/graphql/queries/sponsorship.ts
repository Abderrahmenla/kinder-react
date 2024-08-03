import { gql } from '@apollo/client';

export const GET_SPONSORSHIP_CONTENT = gql(`
query GetSponsorshipContent{
    sponsorshipPage {
        data {
            id
            attributes {
              banners{
                data {
                  attributes {
                    Title
                    SubTitle
                    BackgroundImage {
                      data {
                        attributes {
                          alternativeText
                          url
                        }
                      }
                    }
                  }
                }
              }
              Row {
                Title
                Text
                VideoURL
                Image {
                  data {
                    id
                    attributes {
                      alternativeText
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
