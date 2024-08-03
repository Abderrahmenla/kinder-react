export interface SeoProps {
  id: string;
  attributes: SeoPagesProps;
}

export interface MetaDataProps {
  metaTitle: string;
  metaDescription: string;
  metaImage: MetaImageProps;
  metaGameTitle: string;
}

export interface MetaImageProps {
  data: {
    attributes?: {
      url?: string;
      alternativeText?: string;
      mime?: string;
    };
  };
}

export interface SeoPagesProps {
  Slug?: string;
  SeoText?: string;
  Seo?: MetaDataProps;
}

export interface SeoLayoutProps {
  seo: SeoPagesProps;
  SeoText?: string;
}

export interface DefaultSeoProps {
  defaultSeo: {
    data: SeoProps;
  };
}
