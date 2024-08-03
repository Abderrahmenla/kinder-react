import { IconHeaderContainer } from '@/components/Organisms/Navbar/NavBarStyles';
import { assets } from '@/config/assets';
import Image from 'next/image';
import { useRouter } from 'next/router';
type EasterNavBarProps = {
  isAuthenticated: boolean;
};

export const EasterNavBarIcon: React.FC<EasterNavBarProps> = ({ isAuthenticated }) => {
  const router = useRouter();
  return (
    <IconHeaderContainer
      onClick={() => router.push('/easter-hunt')}
      isAuthenticated={isAuthenticated}
    >
      <Image
        src={`${assets}/images/easter-icon3.png`}
        height={25}
        width={38}
        alt="Easter egg icon"
      />
    </IconHeaderContainer>
  );
};
