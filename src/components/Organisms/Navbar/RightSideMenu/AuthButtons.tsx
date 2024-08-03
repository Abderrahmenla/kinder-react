import { SignInText } from '@/components/Molecules/HomePage';
import { AuthButtonContainer, ButtonComponent } from '../NavBarStyles';

type AuthButtonsProps = {
  isAuthenticated: boolean;
  handleOpenSignIn: () => void;
  handleOpenRegister: () => void;
};
export const AuthButtons: React.FC<AuthButtonsProps> = ({
  isAuthenticated,
  handleOpenSignIn,
  handleOpenRegister
}) => {
  return (
    <AuthButtonContainer isAuthenticated={isAuthenticated}>
      {!isAuthenticated && (
        <>
          <SignInText handleOpenAuth={handleOpenSignIn} />
          <ButtonComponent showIcon={false} handleClick={handleOpenRegister}>
            Sign up
          </ButtonComponent>
        </>
      )}
    </AuthButtonContainer>
  );
};
