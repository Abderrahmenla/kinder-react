import { CardDataContainer, Label, Value } from './PendingWithdrawals.style';
import { PendingWithdrawalsCardDataProps } from './PendingWithdrawals.types';

const PendingWithdrawalsCardData: React.FC<PendingWithdrawalsCardDataProps> = ({
  label,
  value,
  alignRight,
  fullWidth,
  lastItem,
  color
}) => (
  <CardDataContainer alignRight={alignRight} fullWidth={fullWidth} lastItem={lastItem}>
    <Label size="b3" type="Body" color="var(--soft-blue-100)">
      {label}
    </Label>
    <Value size="b2" type="Body" color={color ?? 'var(--darker-white)'}>
      {value}
    </Value>
  </CardDataContainer>
);

export default PendingWithdrawalsCardData;
