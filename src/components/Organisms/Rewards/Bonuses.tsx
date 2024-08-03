/* eslint-disable no-console */
import { RewardsEmptyState } from '@/components/Molecules/Rewards/EmptyState';
import { Box } from '@mui/material';
import { Card } from './BonusCard';
import { PlayerBonusHistory, PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { PlayerData } from '@/hooks/types';
import { useTranslations } from '@/hooks/useTranslations';

interface Props {
  data?: Array<PlayerBonusHistory>;
  player?: PlayerData;
  promotions?: Array<PlayerBonusesResponse>;
  refetch: () => void;
}

const RewardsBonusesComponent = ({ data, player, promotions, refetch }: Props) => {
  const { t } = useTranslations();
  const filteredData = data?.filter(
    (dt) =>
      dt.status === 'Active' ||
      dt.status === 'Pending' ||
      dt.status === 'RedeemWaiting' ||
      dt.status === 'AwardedExternal' ||
      dt.status === 'Waiting'
  );
  return (
    <>
      {filteredData ? (
        filteredData.length && player ? (
          <>
            {filteredData.map((bonus) => (
              <Box mt={2} key={bonus.promotionId}>
                <Card refetch={refetch} promotions={promotions} data={bonus} player={player} />
              </Box>
            ))}
          </>
        ) : (
          <RewardsEmptyState description={t('noActiveBonuses')} />
        )
      ) : (
        <RewardsEmptyState description={t('errorOccured')} />
      )}
    </>
  );
};

export default RewardsBonusesComponent;
