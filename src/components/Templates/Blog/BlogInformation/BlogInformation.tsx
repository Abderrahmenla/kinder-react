import { BlogProps } from 'src/graphql/types/blogTypes';
import BlogPostInformations from '../../../Organisms/Blog/BlogPostInformations/BlogPostInformations';
import { BlogInformationWrapper } from './BlogInformation.style';
interface BlogInformationProps {
  selectedBlog: BlogProps;
}
const BlogInformation: React.FC<BlogInformationProps> = ({ selectedBlog }) => {
  const { attributes } = selectedBlog;
  const { Title, Slug, Text, publishedAt, Image } = attributes;
  return (
    <BlogInformationWrapper>
      <BlogPostInformations
        image={Image}
        title={Title}
        text={Text}
        publishedAt={publishedAt}
        Slug={Slug}
      />
    </BlogInformationWrapper>
  );
};
export default BlogInformation;
