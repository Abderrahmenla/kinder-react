import { gql } from '@apollo/client';

export const GET_ALL_POLICIES = gql(`
query GetPolicies($locale : I18NLocaleCode)  {
  policies(locale: $locale) {
    data {
      id
      attributes {
        Name
        Text
        updatedAt
        createdAt
        Slug
      }
    }
  }
}
`);
