import { BannersProps } from '@/graphql/types/bannersTypes';
import { CasinoLobbyType } from '@/graphql/types/casinoLobbyTypes';

export interface HomeProps extends BannersProps {
  casinoCategories: CasinoLobbyType;
}
