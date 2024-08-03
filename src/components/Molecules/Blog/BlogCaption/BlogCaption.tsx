import { CSSProperties, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BlogInfoControl,
  BlogInfoControlLeft,
  BlogInfoControlLeftCaptions,
  BlogInfoControlRight
} from './BlogCaption.style';
import formatDate from '@/utils/formatUtils/formatDate';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

interface BlogCaptionProps {
  publishedAt: string;
  Slug: string;
  style?: CSSProperties | undefined;
}
const BlogCaption: FC<BlogCaptionProps> = ({ publishedAt, Slug, style }) => {
  const { t } = useTranslations();
  return (
    <BlogInfoControl style={style}>
      <BlogInfoControlLeft>
        <Image
          src={`${assets}/images/spinbet-logo-single.svg`}
          alt="logo"
          width={41}
          height={41}
          data-testid="blog-caption-left-img"
        />
        <BlogInfoControlLeftCaptions>
          <h6>{t('blogAuthor')}</h6>
          <div className="blogpost-time-date">
            <span> {publishedAt && formatDate(publishedAt)}</span>
          </div>
        </BlogInfoControlLeftCaptions>
      </BlogInfoControlLeft>
      <Link href={`/blog/${Slug}`}>
        <BlogInfoControlRight>
          <Image
            src={`${assets}/images/blog-arrow-right.svg`}
            alt="blog-arrow-right"
            width={7.3}
            height={12.5}
            data-testid="blog-caption-right-img"
          />
        </BlogInfoControlRight>
      </Link>
    </BlogInfoControl>
  );
};

export default BlogCaption;
