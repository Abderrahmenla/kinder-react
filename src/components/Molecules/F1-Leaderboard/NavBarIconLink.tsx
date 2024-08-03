import { IconHeaderContainer } from '@/components/Organisms/Navbar/NavBarStyles';
import { assets } from '@/config/assets';
import Image from 'next/image';
import { useRouter } from 'next/router';
type NavBarIconLink = {
  isAuthenticated: boolean;
  url: string;
  icon: string;
};

export const NavBarIcon: React.FC<NavBarIconLink> = ({ isAuthenticated, url, icon }) => {
  const router = useRouter();
  return (
    <IconHeaderContainer onClick={() => router.push(`/${url}`)} isAuthenticated={isAuthenticated}>
      <Image
        src={`${assets}/images/f1-leaderboard/${icon}.png`}
        height={25}
        width={38}
        alt="Tournament Leaderboard"
      />
    </IconHeaderContainer>
  );
};
