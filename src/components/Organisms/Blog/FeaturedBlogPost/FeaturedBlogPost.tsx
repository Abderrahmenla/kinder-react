import BlogCaption from '@/components/Molecules/Blog/BlogCaption/BlogCaption';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

import {
  BlogFeaturedDetailsContainer,
  BlogFeaturedDetailsText,
  BlogFeaturedPostContainer,
  BlogFeaturedPostImage
} from './FeaturedBlogPost.style';

interface FeaturedBlogPostProps {
  image: string;
  title: string;
  text: string;
  publishedAt: string;
  Slug: string;
}

const FeaturedBlogPost: React.FC<FeaturedBlogPostProps> = ({
  image,
  title,
  text,
  publishedAt,
  Slug
}) => (
  <BlogFeaturedPostContainer data-testid="featured-blog-post">
    <Grid
      item
      md={6}
      style={{
        overflow: 'hidden',
        borderRadius: '15px 0 0 15px'
      }}
    >
      <span>
        <BlogFeaturedPostImage
          src={image}
          data-testid="featured-image"
          alt="featured-blog-image"
          width={600}
          height={370}
        />
      </span>
    </Grid>
    <Grid item md={6}>
      <BlogFeaturedDetailsContainer>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/blog/${Slug}`}>
          <h2>{title}</h2>
        </Link>
        <BlogFeaturedDetailsText>
          <>{ReactHtmlParser(text)}</>
        </BlogFeaturedDetailsText>
        <BlogCaption publishedAt={publishedAt} Slug={Slug} />
      </BlogFeaturedDetailsContainer>
    </Grid>
  </BlogFeaturedPostContainer>
);

export default FeaturedBlogPost;
