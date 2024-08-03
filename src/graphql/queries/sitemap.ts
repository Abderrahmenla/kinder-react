import { gql } from '@apollo/client';

export const GET_SITEMAP_URLS = gql(`
query GetSitemap($locale : I18NLocaleCode)  {
  sitemaps(locale: $locale) {
    data {
      id
      attributes {
        URL
      }
    }
  }
}
`);
