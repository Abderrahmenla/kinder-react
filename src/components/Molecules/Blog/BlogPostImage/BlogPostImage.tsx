import { BlogPostImageStyle } from './BlogPostImage.style';

interface BlogPostImageProps {
  src: string;
  alt: string;
}

const BlogPostImage: React.FC<BlogPostImageProps> = ({ src, alt }) => (
  <span style={{ overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
    <BlogPostImageStyle
      src={src}
      alt={alt}
      data-testid="blog-caption-img"
      width={200}
      height={200}
    />
  </span>
);

export default BlogPostImage;
