import React, { CSSProperties } from 'react';
import { BlogPostExerptContainer } from './BlogPostExerpt.style';
import ReactHtmlParser from 'react-html-parser';
interface BlogPostExerptProps {
  text?: string;
  style?: CSSProperties | undefined;
}

const BlogPostExerpt: React.FC<BlogPostExerptProps> = ({ text, style }) => {
  const firstChild = text && ReactHtmlParser(text);
  return (
    <BlogPostExerptContainer style={style}>
      <>{firstChild}</>
    </BlogPostExerptContainer>
  );
};

export default BlogPostExerpt;
