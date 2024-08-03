import { BlogProps } from 'src/graphql/types/blogTypes';
import BlogPost from '../BlogPost/BlogPost';
import { BlogPickerDiv, BlogPickerWrapper } from './BlogPicker.styles';
import { assets } from '@/config/assets';

const BlogPicker = ({ blogs, selectedBlog }: { blogs: BlogProps[]; selectedBlog: BlogProps }) => {
  const nextBlogs = blogs && blogs.filter((blog) => blog !== selectedBlog).slice(0, 2);

  return (
    <BlogPickerWrapper>
      {nextBlogs &&
        nextBlogs.map(({ id, attributes }) => {
          const { Title, publishedAt, Slug, Image } = attributes;
          const imageUrl = Image?.data?.attributes?.url || `${assets}/images/blog.svg`; // Added safety check here

          return (
            <BlogPickerDiv key={id}>
              <BlogPost image={imageUrl} title={Title} publishedAt={publishedAt} Slug={Slug} />
            </BlogPickerDiv>
          );
        })}
    </BlogPickerWrapper>
  );
};

export default BlogPicker;
