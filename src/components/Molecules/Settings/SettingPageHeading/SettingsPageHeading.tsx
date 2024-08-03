import Image from 'next/image';
import { PageHeading } from './SettingsPageHeadingStyle';
const SettingsPageHeading = ({
  src,
  alt,
  title,
  width,
  height
}: {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}) => {
  return (
    <PageHeading>
      <h1>
        <span>
          <Image width={width} height={height} src={src} alt={alt} />
        </span>
        <span>{title}</span>
      </h1>
    </PageHeading>
  );
};
export default SettingsPageHeading;
