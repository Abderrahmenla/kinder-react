import { gql } from '@apollo/client';

export const GET_ALL_TRANSLATIONS = gql`
  query Translation($locale: I18NLocaleCode) {
    translations(pagination: { limit: 1000 }, locale: $locale) {
      data {
        id
        attributes {
          translationValue
          key
        }
      }
    }
  }
`;
