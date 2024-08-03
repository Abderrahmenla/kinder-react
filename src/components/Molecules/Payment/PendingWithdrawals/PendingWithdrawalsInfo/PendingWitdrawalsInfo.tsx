import Image from 'next/image';
import { assets } from '@/config/assets';
import {
  Container,
  StyledText,
  StyledTextLink,
  TextWrapper
} from './PendingWithdrawalsInfo.styles';
import { PendingWithdrawalsInfoProps } from './PendingWithdrawalsInfo.types';

const PendingWithdrawalsInfo: React.FC<PendingWithdrawalsInfoProps> = ({ onClick, t }) => (
  <Container>
    <Image
      width={20}
      height={20}
      alt="info icon"
      src={`${assets}/images/information_icon.svg`}
      loading="lazy"
    />
    <TextWrapper>
      <StyledText size="b2" type="Paragraph" color="var(--soft-blue-100)">
        {t('youHavePendingWithdrawals')}
      </StyledText>
      <StyledText size="b2" type="Paragraph" color="var(--soft-blue-100)">
        {t('youCanCancel')} <StyledTextLink onClick={onClick}>{t('here')}</StyledTextLink>
      </StyledText>
    </TextWrapper>
  </Container>
);

export default PendingWithdrawalsInfo;
