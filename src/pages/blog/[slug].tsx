import { useEffect, useState } from 'react';
import BlogPicker from '@/components/Organisms/Blog/BlogPicker/BlogPicker';
import BlogInformation from '@/components/Templates/Blog/BlogInformation/BlogInformation';
import { styled } from '@mui/material/styles';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import client from 'src/graphql/client';
import { GET_ALL_BLOGS } from 'src/graphql/queries/blog';
import { GET_DEFAULT_SEO } from 'src/graphql/queries/defaultSeo';
import { GET_PAGES_SEO } from 'src/graphql/queries/pagesSeo';
import { BlogProps } from 'src/graphql/types/blogTypes';
import { useLoader } from '@/hooks/useLoader';
import { formatLocale } from '@/utils/formatLocale';
import { SUPPORTED_LOCALES } from '@/constants/index';
import { getSidebarNav } from '@/utils/navigationUtils';

export const MainContainerSlug = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '764px',
  maxWidth: '1200px',
  margin: '0 auto',
  height: '100%',
  padding: '0 0 80px',
  ' @media screen and (max-width:1200px)': {
    paddingLeft: '25px',
    paddingRight: '25px',
    margin: '0 auto',
    width: '100%'
  },
  ' @media screen and (max-width:1100px)': {
    paddingBottom: '50px'
  },
  '@media screen and (max-width:900px)': {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  '@media screen and (max-width:768px)': {
    paddingLeft: '25px',
    paddingRight: '25px'
  }
});

const Blog = ({ blogs }: { blogs: BlogProps[] }): JSX.Element | null => {
  const { loadingWrapper } = useLoader('coin');
  const router = useRouter();
  const currentURL = router.asPath;
  const [hasClientMounted, setHasClientMounted] = useState(false);

  useEffect(() => {
    setHasClientMounted(true);
  }, []);

  const selectedBlog =
    blogs && blogs.find(({ attributes }) => currentURL.includes(attributes.Slug));

  if (!selectedBlog) {
    router.push('/blog');
  }

  return (
    <MainContainerSlug>
      {!selectedBlog && loadingWrapper}
      {hasClientMounted && selectedBlog && (
        <>
          <BlogInformation selectedBlog={selectedBlog} />
          <BlogPicker blogs={blogs} selectedBlog={selectedBlog} />
        </>
      )}
    </MainContainerSlug>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  for (const locale of SUPPORTED_LOCALES) {
    const formattedLocale = formatLocale(locale || 'en');
    const { data } = await client.query({
      query: GET_ALL_BLOGS,
      variables: { locale: formattedLocale }
    });
    const blogs = data?.blogs?.data;

    paths.push(
      ...blogs.map((blog: BlogProps) => ({
        params: { slug: blog?.attributes?.Slug },
        locale: locale.toLocaleLowerCase()
      }))
    );
  }

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const formattedLocale = formatLocale(locale || 'en');
  const { data } = await client.query({
    query: GET_ALL_BLOGS,
    variables: {
      locale: formattedLocale
    }
  });
  const blogs = data?.blogs?.data;

  const { data: seoData } = await client.query({
    query: GET_DEFAULT_SEO,
    variables: {
      locale: formattedLocale
    }
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
