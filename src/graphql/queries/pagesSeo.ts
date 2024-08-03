import { gql } from '@apollo/client';

export const GET_PAGES_SEO = gql(`
query GetPagesSeo ($slug: String, $locale : I18NLocaleCode)  {
  pages(filters: { Slug: { eq: $slug }}, locale: $locale) {
    data {
      id
      attributes {
        Slug
        SeoText
        Seo {
          metaTitle
          metaDescription
          metaGameTitle
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
