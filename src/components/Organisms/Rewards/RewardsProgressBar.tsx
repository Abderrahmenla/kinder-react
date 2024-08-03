import { Box } from '@mui/material';
import {
  Awards,
  ProgressInfo,
  AwardWrapper,
  MoneyInAccount,
  MoneyForNextStep,
  ProgressBarBackground,
  ProgressBarContainer,
  ProgressBar,
  WagerSubText
} from './Card.style';
import { PlayerData } from '@/hooks/types';
import Typography from '@/components/Atoms/Typography/Typography';
import { useTranslations } from '@/hooks/useTranslations';

interface IRewardProgressBar {
  wagerLeft: number;
  wagerRequired?: number;
  percentage: number;
  player: PlayerData;
  bonusAwarded?: number;
}

const RewardProgressBar: React.FC<IRewardProgressBar> = ({
  wagerLeft,
  wagerRequired,
  percentage,
  player,
  bonusAwarded
}) => {
  const { t } = useTranslations();

  const formattedWagerLeft = wagerLeft.toFixed(2);
  const formattedWagerRequired = (wagerRequired ?? 100).toFixed(2);

  return (
    <Box
      minHeight="127px"
      bgcolor="#27174F"
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingX={2}
      width="347px"
      marginLeft="-8px"
      marginTop={1}
    >
      <ProgressInfo>
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={1}>
          <Typography type="Heading" size="h3" color="white">
            {player?.currencyCode.endsWith('D')
              ? player?.currencyCode.replace('D', '$')
              : player?.currencyCode}
            {bonusAwarded}{' '}
          </Typography>
        </Box>
        <ProgressBarContainer>
          <ProgressBarBackground style={{ width: '100%' }}>
            <ProgressBar percentage={percentage} />
          </ProgressBarBackground>
        </ProgressBarContainer>
        <Awards>
          <AwardWrapper>
            <WagerSubText>
              {formattedWagerLeft} / {formattedWagerRequired} {player?.currencyCode}
            </WagerSubText>
            <MoneyInAccount>{t('wagered')}</MoneyInAccount>
          </AwardWrapper>
          <AwardWrapper>
            <WagerSubText>{t('wager')}</WagerSubText>
            <MoneyForNextStep>
              <MoneyInAccount>{(wagerRequired || 1) / (bonusAwarded || 1)}x</MoneyInAccount>
            </MoneyForNextStep>
          </AwardWrapper>
        </Awards>
      </ProgressInfo>
    </Box>
  );
};

export default RewardProgressBar;
