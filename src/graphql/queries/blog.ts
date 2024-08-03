import { gql } from '@apollo/client';

export const GET_ALL_BLOGS = gql`
  query GetBlogs($locale: I18NLocaleCode) {
    blogs(pagination: { limit: 100 }, locale: $locale) {
      data {
        id
        attributes {
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
          Title
          Slug
          Text
          publishedAt
        }
      }
    }
  }
`;
