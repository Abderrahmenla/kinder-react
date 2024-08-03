import { EasterCampaignType } from '@/graphql/types/easterCampaignTypes';

interface Egg {
  eggId: string | number;
  isBonus: boolean;
  isClicked: boolean;
}
export interface IEasterActiveEggDialogCard {
  easterData?: EasterCampaignType | undefined;
  eggs: Egg[];
  setisModalOpen: (isOpen: boolean) => void;
  open: boolean;
  playerId: string;
  crackAllEggs: () => void;
}
