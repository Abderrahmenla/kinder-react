import { gql } from '@apollo/client';

export const GET_DEFAULT_SEO = gql(`
query GetDefaultSeo($locale : I18NLocaleCode)  {
  defaultSeo(locale : $locale) {
    data {
      id
      attributes {
        Seo {
          metaTitle
          metaDescription
          metaImage {
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
`);
