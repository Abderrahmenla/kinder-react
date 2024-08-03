import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BlogProps } from 'src/graphql/types/blogTypes';
import BlogPost from '../../../Organisms/Blog/BlogPost/BlogPost';
import FeaturedBlogPost from '../../../Organisms/Blog/FeaturedBlogPost/FeaturedBlogPost';
import {
  BlogContainer,
  BlogPageHeading,
  BlogPostsItem,
  BlogPostsList,
  FeaturedBlogPostWrapper
} from './BlogPageStyle';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

const BlogPage = ({ blogs }: { blogs: BlogProps[] }) => {
  const { t } = useTranslations();
  const [sortedBlogs, setSortedBlogs] = useState<BlogProps[]>([]);
  const isFeatured = sortedBlogs && sortedBlogs.length > 0 ? sortedBlogs[0] : null;
  const isXsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const featuredImageUrl =
    isFeatured &&
    isFeatured.attributes &&
    isFeatured.attributes.Image &&
    isFeatured.attributes.Image.data &&
    isFeatured.attributes.Image.data.attributes &&
    isFeatured.attributes.Image.data.attributes.url
      ? isFeatured.attributes.Image.data.attributes.url
      : `${assets}/images/blog.svg`;

  const BlogsWithoutFeatured = sortedBlogs.filter((blog) => blog !== isFeatured);

  useEffect(() => {
    const sorted = [...blogs].sort((a, b) => {
      const dateA = new Date(a.attributes.publishedAt);
      const dateB = new Date(b.attributes.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
    setSortedBlogs(sorted);
  }, [blogs]);

  return (
    <>
      <BlogContainer container spacing={2}>
        <Grid xs={12}>
          <BlogPageHeading>
            <h1> {t('spinBlog')} </h1>
          </BlogPageHeading>
        </Grid>
        {!isXsDown && isFeatured && (
          <FeaturedBlogPostWrapper>
            <FeaturedBlogPost
              image={featuredImageUrl}
              title={isFeatured.attributes.Title}
              text={isFeatured.attributes.Text}
              publishedAt={isFeatured.attributes.publishedAt}
              Slug={isFeatured.attributes.Slug}
            />
          </FeaturedBlogPostWrapper>
        )}

        <Grid xs={12}>
          <BlogPostsList>
            {BlogsWithoutFeatured &&
              BlogsWithoutFeatured.map(({ id, attributes }) => {
                const { Title, Text, publishedAt, Slug, Image } = attributes;
                const imageUrl =
                  Image && Image.data && Image.data.attributes && Image.data.attributes.url
                    ? Image.data.attributes.url
                    : `${assets}/images/blog.svg`;

                return (
                  <BlogPostsItem key={id}>
                    <BlogPost
                      image={imageUrl}
                      title={Title}
                      text={Text}
                      publishedAt={publishedAt}
                      Slug={Slug}
                    />
                  </BlogPostsItem>
                );
              })}
          </BlogPostsList>
        </Grid>
      </BlogContainer>
    </>
  );
};

export default BlogPage;
