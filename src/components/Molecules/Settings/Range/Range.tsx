import Typography from '@/components/Atoms/Typography/Typography';
import { RangeContainer } from './Range.style';

interface RangeProps {
  name: string;
  onClick: () => void;
  isActive: boolean;
  customDefaultBg?: string;
}

const Range = ({ name, onClick, isActive, customDefaultBg }: RangeProps) => (
  <RangeContainer onClick={onClick} isActive={isActive} customDefaultBg={customDefaultBg}>
    <Typography className="typo" size="b2" color="var(--darker-white)">
      {name}
    </Typography>
  </RangeContainer>
);

export default Range;
