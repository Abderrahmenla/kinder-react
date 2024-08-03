import { PromotionState } from '@/components/state/openPromotionsState';

export type Route = () => void;

export interface SubItems {
  icon: string;
  title: string;
  url: string;
  isLoggedIn: boolean;
  isSubmenu?: boolean;
  isTranslation: boolean;
}

export interface CategoryItems {
  name: string;
  isTranslation: boolean;
  subItems: SubItems[];
}

export interface DefaultItemProps {
  title?: string;
  icon?: string;
  url?: string;
  customAction?: string;
}

export interface MenuItem extends DefaultItemProps {
  divider?: boolean;
  isSubmenu?: boolean;
  categories: CategoryItems[];
  subItems: SubItems[];
}

export interface DrawerDropdownProps {
  open: boolean;
  isMobile: boolean;
  item: MenuItem;
  isVisible: boolean;
  isAuthenticated: boolean;
  handleToggleDropdown: () => void;
  handleCloseDropdown?: () => void;
  setOpenPromotions: React.Dispatch<React.SetStateAction<PromotionState>>;
}

export interface MenuItemProps {
  item: DefaultItemProps;
  open: boolean;
  dropdown: boolean;
  favoriteGamesNumber?: number;
  isMobile: boolean;
  onMenuItemClick?: () => void;
}

export interface FeaturedPromotions {
  id: string;
  attributes: {
    PromotionName: string;
    Featured: boolean;
    Slug: string;
    ShortDescription: string;
    Icon: { data: { attributes: { url: string } } };
    Banner: { data: { attributes: { url: string } } };
  };
}
