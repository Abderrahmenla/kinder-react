import Link from 'next/link';
import BlogCaption from '../BlogCaption/BlogCaption';
import BlogPostExerpt from '../BlogPostExerpt/BlogPostExerpt';
import { BlogPostDetailContainer } from './BlogPostDetail.style';

interface BlogPostDetailProps {
  title: string;
  text?: string;
  publishedAt: string;
  Slug: string;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ title, text, publishedAt, Slug }) => {
  return (
    <BlogPostDetailContainer>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/blog/${Slug}`}>
        <h2>{title}</h2>
      </Link>
      <BlogPostExerpt text={text} />
      <BlogCaption publishedAt={publishedAt} Slug={Slug} />
    </BlogPostDetailContainer>
  );
};

export default BlogPostDetail;
