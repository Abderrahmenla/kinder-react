import { Container, StyledButton, StyledButtonText } from './PendingWithdrawalsTextButton.styles';
import { PendingWithdrawalsTextButtonProps } from './PendingWithdrawalsTextButton.types';

const PendingWithdrawalsTextButton: React.FC<PendingWithdrawalsTextButtonProps> = ({
  onClick,
  t
}) => (
  <Container>
    <StyledButton variant="Text" handleClick={onClick}>
      <StyledButtonText size="b2" type="Button" color="var(--pure-blue)">
        {t('pendingWithdrawals')}
      </StyledButtonText>
    </StyledButton>
  </Container>
);

export default PendingWithdrawalsTextButton;
