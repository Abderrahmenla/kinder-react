import Image from 'next/image';
import { assets } from '@/config/assets';
import { IconContainer } from '@/components/Organisms/Settings/Profile/Profile.style';

export const IconComponent: React.FC<{ label: string; width: number; height: number }> = ({
  label,
  width,
  height
}) => {
  return (
    <IconContainer>
      <Image
        src={`${assets}/images/profile-${label}-icon.svg`}
        width={width}
        height={height}
        alt={`${label}-icon`}
      />
    </IconContainer>
  );
};

export default IconComponent;
