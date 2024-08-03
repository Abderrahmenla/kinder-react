import { BlogInfoControlLeft } from '@/components/Molecules/Blog/BlogCaption/BlogCaption.style';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { BlogImageProps } from 'src/graphql/types/blogTypes';
import {
  BlogPostDetailWrapper,
  InformationImage,
  InformationImageWrapper,
  InformationSocialGroup,
  InformationSocialWrapper,
  InformationText,
  InformationTopicWrapper,
  InformationWrapper,
  LinkBlogButton
} from './BlogPostInformations.style';
import formatDate from '@/utils/formatUtils/formatDate';
import { assets } from '@/config/assets';
import { SOCIAL_LINKS } from '@/constants/index';

interface BlogPostDetailProps {
  image: BlogImageProps;
  title: string;
  text: string;
  publishedAt: string;
  Slug: string;
}

const BlogPostInformations: React.FC<BlogPostDetailProps> = ({
  title,
  text,
  publishedAt,
  image
}) => {
  const imageUrl =
    image && image.data && image.data.attributes && image.data.attributes.url
      ? image.data.attributes.url
      : `${assets}/images/blog.svg`;
  return (
    <BlogPostDetailWrapper>
      <InformationImageWrapper>
        <InformationImage src={imageUrl} alt="alt" width={16} height={16} />
      </InformationImageWrapper>
      <InformationWrapper>
        <InformationTopicWrapper>
          <h1>{title}</h1>
          <InformationSocialGroup>
            <InformationSocialWrapper
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`${assets}/images/telegram.svg`}
                alt={'telegram'}
                width={15}
                height={13}
              />
            </InformationSocialWrapper>
            <InformationSocialWrapper
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={`${assets}/images/twitter.svg`} alt={'twitter'} width={15} height={15} />
            </InformationSocialWrapper>
          </InformationSocialGroup>
        </InformationTopicWrapper>
        <BlogInfoControlLeft style={{ marginBottom: '30px' }}>
          <Image
            src={`${assets}/images/spinbet-logo-single.svg`}
            alt="logo"
            width={41}
            height={41}
            style={{ marginRight: '8px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h6>SpinTeam</h6>
            <p>{publishedAt && formatDate(publishedAt)}</p>
          </div>
        </BlogInfoControlLeft>
        <InformationText>
          <>{ReactHtmlParser(text)}</>
        </InformationText>
        <Link href={`/blog/`}>
          <LinkBlogButton>Go Back</LinkBlogButton>
        </Link>
      </InformationWrapper>
    </BlogPostDetailWrapper>
  );
};

export default BlogPostInformations;
