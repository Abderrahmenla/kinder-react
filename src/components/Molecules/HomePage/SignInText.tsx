import { SignInTextStyled } from './SignInTextStyles';
interface SignInTextProps {
  handleOpenAuth: () => void;
}

export const SignInText: React.FC<SignInTextProps> = ({ handleOpenAuth }) => {
  return <SignInTextStyled text={'Login'} onClick={handleOpenAuth} data-testid="sign-in-text" />;
};
