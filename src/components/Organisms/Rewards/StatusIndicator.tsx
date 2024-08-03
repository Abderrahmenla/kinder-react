import { PlayerData } from '@/hooks/types';
import { useTranslations } from '@/hooks/useTranslations';
import { PlayerBonusHistory } from '@/pages/api/rewards/types';
import { Box, Typography, Tooltip } from '@mui/material';

interface IStatusIndicator {
  color: string;
  bonusValue?: number;
  player?: PlayerData;
  data?: PlayerBonusHistory;
}

interface StatusDescription {
  status: string;
  color: string;
}

const getStatusDescription = (status: any): StatusDescription | null => {
  switch (status) {
    case 'Active':
    case 'AwardedExternal':
      return {
        status: 'Active',
        color: 'var(--fixed-colors-green, #49B265)'
      };
    case 'Waiting':
    case 'RedeemWaiting':
      return {
        status: 'Waiting for player',
        color: 'var(--accent-color-accent-yellow, #FFD70C)'
      };
    case 'Pending':
      return {
        status: 'Bonus Queue',
        color: 'var(--accent-color-accent-blue, #0092FF)'
      };
    default:
      return null;
  }
};

const StatusIndicator: React.FC<IStatusIndicator> = ({ color, bonusValue, player, data }) => {
  const { t } = useTranslations();
  const status = getStatusDescription(data?.status) || { status: '', color: color };

  return (
    <Box
      width="215px"
      display="flex"
      flexDirection="row"
      alignItems="center"
      mb={0.5}
      mt={0.5}
      justifyContent="space-between"
    >
      <Tooltip
        title={
          `${t('thisContentIsAbout')} ${
            data?.status === 'AwardedExternal'
              ? 'Active'
              : data?.status === 'RedeemWaiting'
              ? 'Waiting'
              : data?.status
          } ${t('status')}` || ''
        }
        placement="top-start"
        arrow
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              color: 'white',
              backgroundColor: 'var(--very-dark-violet-50)',
              left: -15,
              borderRadius: 2,
              height: 43,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 12,
              paddingLeft: 2,
              paddingRight: 2,
              fontFamily: 'Inter'
            },
            '& .MuiTooltip-arrow': {
              '&::before': {
                backgroundColor: 'var(--very-dark-violet-50)'
              }
            }
          }
        }}
      >
        <Typography color={status.color} fontSize={12} fontWeight={500}>
          {status.status}
        </Typography>
      </Tooltip>
      <Typography
        display="flex"
        justifyContent="space-between"
        gap={0.5}
        color="white"
        fontSize={12}
        fontWeight={500}
        ml={0.5}
      >
        {t('bonus')}
        <Typography fontSize={12} fontWeight={500} color="#FFD70C">
          {player?.currencyCode.endsWith('D')
            ? player?.currencyCode.replace('D', '$')
            : player?.currencyCode}
          {Number(bonusValue).toFixed(2)}
        </Typography>
      </Typography>
    </Box>
  );
};

export default StatusIndicator;
