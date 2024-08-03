import { ChristmasGiveawayType } from 'src/graphql/types/christmasGiveawayTypes';
import { ScratchRevealButtonContainer } from './ScratchCardStyle';
import Button from '@/components/Atoms/Button/Button';
import { ScratchButtonIcon } from '../ScratchCard/svg/ScratchButtonIcon';

type ScratchButtonType = {
  isPastDay: boolean;
  disableRevealButton: boolean;
  onRevealClick: () => void;
  dayData: ChristmasGiveawayType | undefined;
  revealText: string;
  isLoading?: boolean;
};
export const ScratchRevealButton = ({
  isPastDay,
  disableRevealButton,
  onRevealClick,
  dayData,
  isLoading,
  revealText
}: ScratchButtonType) => {
  return (
    <ScratchRevealButtonContainer>
      <Button
        disabled={isPastDay ? isPastDay : disableRevealButton || isLoading}
        variant="Primary"
        icon={<ScratchButtonIcon />}
        handleClick={() => onRevealClick()}
      >
        {isPastDay
          ? dayData?.attributes.PrizeType === 'Bonus'
            ? 'Activated'
            : 'Revealed'
          : isLoading
          ? `${revealText}...`
          : revealText}
      </Button>
    </ScratchRevealButtonContainer>
  );
};
