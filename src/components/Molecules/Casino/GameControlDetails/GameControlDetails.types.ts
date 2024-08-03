import { Game } from '@/pages/api/casino/casinoTypes';

export interface GameControlDetailsProps {
  isFullScreen?: boolean;
  game: Game | undefined;
}
