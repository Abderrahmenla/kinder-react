import { Box } from '@mui/material'; // Import Box for layout
import StatusIndicator from './StatusIndicator';
import { PlayerData } from '@/hooks/types';
import { PlayerBonusHistory } from '@/pages/api/rewards/types';
import { CardTypographyDescription, CardTypographyHeader } from './Card.style';

interface IBonusDetails {
  bonusName?: string;
  expirationDate?: string | undefined | null;
  statusColor: string;
  description?: string;
  bonusAmount?: number;
  player?: PlayerData;
  data?: PlayerBonusHistory;
}

const BonusDetails: React.FC<IBonusDetails> = ({
  bonusName,
  statusColor,
  description,
  bonusAmount,
  player,
  data
}) => (
  <Box display="flex" flexDirection="column" mx={2} my={1}>
    <StatusIndicator player={player} color={statusColor} bonusValue={bonusAmount} data={data} />
    <div style={{ maxWidth: '220px', display: 'flex', flexDirection: 'column' }}>
      <CardTypographyHeader>{bonusName}</CardTypographyHeader>
      <CardTypographyDescription>{description}</CardTypographyDescription>
    </div>
  </Box>
);

export default BonusDetails;
