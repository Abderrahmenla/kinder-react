import { useRecoilValue } from 'recoil';
import {
  RakebackInfoCol,
  RakebackInfoRow,
  RakebackInfoWrap,
  RbkText,
  RkbAmount
} from './RakebackTabStyle';
import { rakebackState } from '@/components/state/rakeback';
import { formatRakebackBalance } from '@/components/Organisms/VIP/util';
import { useTranslations } from '@/hooks/useTranslations';
import Typography from '@/components/Atoms/Typography/Typography';

const RakebackTab = () => {
  const { t } = useTranslations();
  const rakebackBalance = useRecoilValue(rakebackState);
  const formattedBalance = formatRakebackBalance(
    rakebackBalance.balance,
    rakebackBalance?.currency
  );

  return (
    <RakebackInfoRow>
      <RakebackInfoWrap>
        <RakebackInfoCol data-testid="claim-amount-card">
          <RkbAmount>
            <Typography size="h3" type="Heading" color="var(--white)">
              {formattedBalance}
            </Typography>
          </RkbAmount>
          <RbkText>
            <Typography size="b2" type="Body" color="var(--soft-blue-100)">
              {t('amountClaimText')}
            </Typography>
          </RbkText>
        </RakebackInfoCol>
      </RakebackInfoWrap>
    </RakebackInfoRow>
  );
};

export default RakebackTab;
