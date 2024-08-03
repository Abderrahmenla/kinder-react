import BlogPage from '@/components/Templates/Blog/BlogPage/BlogPage';
import { styled } from '@mui/material/styles';
import { GetStaticProps } from 'next';
import client from 'src/graphql/client';
import { GET_ALL_BLOGS } from 'src/graphql/queries/blog';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { BlogProps } from 'src/graphql/types/blogTypes';
import { SeoContent } from '@/components/Templates/SeoContent';
import React from 'react';
import { SeoPagesProps } from 'src/graphql/types/seo';
import { formatLocale } from '@/utils/formatLocale';
import { getSidebarNav } from '@/utils/navigationUtils';

export const MainContainerBlog = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '1260px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 40px'
});

const Blog = ({ blogs, seo }: { blogs: BlogProps[]; seo: SeoPagesProps }): JSX.Element => {
  return (
    <MainContainerBlog>
      <BlogPage blogs={blogs} />
      {seo?.SeoText && <SeoContent seo={seo} />}
    </MainContainerBlog>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_ALL_BLOGS,
    variables: { locale: formattedLocale }
  });
  let blogs = data?.blogs?.data;
  if (!blogs || blogs.length === 0) {
    const fallbackLocale = 'en-nz';
    const { data: fallbackData } = await client.query({
      query: GET_ALL_BLOGS,
      variables: {
        locale: fallbackLocale
      }
    });
    blogs = fallbackData?.blogs?.data;
    if (!blogs) {
      console.error(`No blogs found for fallback locale ${fallbackLocale}.`);
      return {
        notFound: true
      };
    }
  }
  const { data: seoData } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: { locale: formattedLocale }
  });
  const defaultSeo = seoData.defaultSeo.data;

  const { data: blogSeo } = await client.query({
    query: GET_PAGES_SEO,
    variables: { slug: 'blog', locale: formattedLocale }
  });
  const seo = blogSeo.pages.data;

  const sidebar = await getSidebarNav(formattedLocale);

  return {
    props: {
      defaultSeo,
      seo,
      blogs,
      sidebar
    }
  };
};

export default Blog;
