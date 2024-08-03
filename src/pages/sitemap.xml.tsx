import * as fs from 'fs';
import path, { parse } from 'path';
import { parseCookies } from 'nookies';
import client from 'src/graphql/client';
import { GET_ALL_BLOGS } from 'src/graphql/queries/blog';
import { GET_ALL_POLICIES } from 'src/graphql/queries/policies';
import { BlogProps } from 'src/graphql/types/blogTypes';
import { PolicyProps } from 'src/graphql/types/policiesTypes';
import { apiClient } from 'src/services/clientAxios';
import { Category } from './api/casino/casinoTypes';
import { GET_SITEMAP_URLS } from '@/graphql/queries/sitemap';
import { SitemapProps } from '@/graphql/types/sitemapTypes';
import { getSportsPath } from '@/utils/navigationUtils';

const Sitemap = () => {
  return null;
};

const formatNameToSlug = (name: string | undefined) => {
  if (name) {
    return name
      .toLowerCase()
      .replace(/[\s+]/g, '-')
      .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
  }
};

const createUrl = (baseUrl: string, locale: string, path: string, localeCookie: string): string =>
  `${baseUrl}/${locale === 'default' ? localeCookie : locale}${path}`;

export const getServerSideProps = async ({ req, res, locale }: any) => {
  try {
    const BASE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}`;
    const cookies = parseCookies({ req });
    const localeCookie = cookies['NEXT_LOCALE'] || 'en-nz';
    const pagesDirectory = path.join(process.cwd(), 'src', 'pages');
    const staticPaths = fs
      .readdirSync(pagesDirectory)
      .filter((staticPage) => {
        return ![
          'api',
          '_app.tsx',
          '_document.tsx',
          '404.tsx',
          'sitemap.xml.tsx',
          'settings'
        ].includes(staticPage);
      })
      .map((staticPagePath) => {
        const { name } = parse(staticPagePath);
        const pageName = name === 'index' ? '' : `/${name}`;
        return createUrl(BASE_URL, locale, pageName, localeCookie);
      });

    const policies = async () => {
      const { data } = await client.query({ query: GET_ALL_POLICIES });
      const policiesData: PolicyProps[] = data.policies.data;
      const dynamicPolicies = policiesData.map(({ attributes }) => {
        const { Slug } = attributes;
        return createUrl(BASE_URL, locale, `/policies/${Slug}`, localeCookie);
      });
      return dynamicPolicies;
    };
    const dynamicPolicies = await policies();

    const fetchSitemapFromCMS = async () => {
      const { data } = await client.query({ query: GET_SITEMAP_URLS });
      const sitemapData: SitemapProps[] = data?.sitemaps?.data;
      const dynamicSitemap = sitemapData.map(({ attributes }) => {
        const { URL } = attributes;
        return createUrl(BASE_URL, locale, URL, localeCookie);
      });
      return dynamicSitemap;
    };

    const sitemapUrls = await fetchSitemapFromCMS();

    const blog = async () => {
      const { data } = await client.query({ query: GET_ALL_BLOGS });
      const blogsData: BlogProps[] = data.blogs.data;
      const dynamicBlog = blogsData.map(({ attributes }) => {
        const { Slug } = attributes;
        return createUrl(BASE_URL, locale, `/blog/${Slug}`, localeCookie);
      });
      return dynamicBlog;
    };
    const dynamicBlog = await blog();

    const { sportsPath: sports } = await getSportsPath(localeCookie);
    const dynamicSports = sports.map(({ params: { sportsContent } }) =>
      createUrl(BASE_URL, locale, sportsContent, localeCookie)
    );

    const fetchCategory = async () => {
      try {
        const res = await apiClient.get(`/api/casino/game-categories`);
        const dynamicCategory: Category[] = res?.data?.gameCategoryList;
        return dynamicCategory.map(({ name }) =>
          createUrl(BASE_URL, locale, `/casino/${formatNameToSlug(name)}`, localeCookie)
        );
      } catch (error) {
        console.error(error);
        const defaultCategoryPaths = [
          createUrl(BASE_URL, locale, `/casino/new-games`, localeCookie),
          createUrl(BASE_URL, locale, `/casino/table-games`, localeCookie),
          createUrl(BASE_URL, locale, `/casino/game-shows`, localeCookie),
          createUrl(BASE_URL, locale, `/casino/live-casino`, localeCookie)
        ];
        return defaultCategoryPaths;
      }
    };
    const dynamicCategory = await fetchCategory();

    const allPaths = [
      ...new Set([
        ...staticPaths,
        ...dynamicBlog,
        ...dynamicPolicies,
        ...dynamicSports,
        ...dynamicCategory,
        ...sitemapUrls
      ])
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {}
    };
  } catch (ex) {
    console.error(ex);
    return {
      props: {}
    };
  }
};

export default Sitemap;
