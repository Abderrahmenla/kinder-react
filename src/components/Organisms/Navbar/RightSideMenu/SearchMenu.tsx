import { assets } from '@/config/assets';
import { IconHeaderContainer } from '../NavBarStyles';
import Image from 'next/image';
type SearchIconProps = {
  handleOpenSearchModal: () => void;
  isAuthenticated: boolean;
};

export const SearchMenu: React.FC<SearchIconProps> = ({
  handleOpenSearchModal,
  isAuthenticated
}) => {
  return (
    <IconHeaderContainer onClick={handleOpenSearchModal} isAuthenticated={isAuthenticated}>
      <Image src={`${assets}/images/search.svg`} width={24} height={24} alt="Search Icon" />
    </IconHeaderContainer>
  );
};
