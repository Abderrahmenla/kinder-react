import BlogPostImage from '@/components/Molecules/Blog/BlogPostImage/BlogPostImage';
import BlogPostDetail from '@/components/Molecules/Blog/BlogPostDetail/BlogPostDetail';
import { BlogPostContainer } from './BlogPost.style';

interface BlogPostProps {
  image: string;
  title: string;
  text?: string;
  publishedAt: string;
  Slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ image, title, text, publishedAt, Slug }) => {
  return (
    <BlogPostContainer data-testid="blog-post-container">
      <BlogPostImage src={image} alt="alt" />
      <BlogPostDetail
        Slug={Slug}
        title={title}
        text={text}
        publishedAt={publishedAt}
        data-testid="text-test"
      />
    </BlogPostContainer>
  );
};

export default BlogPost;
