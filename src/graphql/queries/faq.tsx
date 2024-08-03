import { gql } from '@apollo/client';

export const GET_ALL_FAQS = gql(`
query GetFAQ ($locale : I18NLocaleCode) {
  faqs(pagination:{limit:100}, locale: $locale) {
    data {
      id
      attributes {
      Title
      Text
    }
    
  }
 }
}
`);
