export interface BlogProps {
  id: string;
  seo: any;
  attributes: {
    Image: BlogImageProps;
    Title: string;
    Slug: string;
    Text: string;
    publishedAt: string;
  };
}

export interface BlogsProps {
  blogs: {
    data: BlogProps[];
  };
}

export interface BlogImageProps {
  data: {
    id: string;
    attributes: {
      width: string;
      height: string;
      url: string;
    };
  };
}
