import Input from '@/components/Atoms/Input';
import { styled } from '@mui/material/styles';
import { Button } from '../..';
import Typography from '@/components/Atoms/Typography/Typography';

export const ResetPasswordForm = styled('div')`
  padding: 0px;
  @media screen and (min-width: 769px) {
    padding: 140px 0px;
  }
`;

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
`;

export const Header = styled(Typography)`
  color: var(--white);
  font-size: var(--font-size-12);
  line-height: var(--l-height-18);
  font-weight: 600;
  text-align: left;
  margin-bottom: 16px;
  @media screen and (min-width: 769px) {
    margin: 0px 4px 16px;
  }
`;

export const FormGroup = styled('div')<{ hasError: boolean }>`
  margin-bottom: ${({ hasError }) => (hasError ? 'unset' : '16px')};
  display: flex;
`;

export const NewPassword = styled(Input)`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 328px;
    margin: auto;
  }

  input::placeholder {
    color: var(--white-2);
    opacity: 1;
  }

  input::-ms-input-placeholder {
    color: var(--white-2);
  }
`;

export const FormButton = styled(Button)`
  width: 100%;
  height: 40px;
  margin: auto;

  @media screen and (min-width: 768px) {
    width: 328px;
    height: 40px;
    margin: auto;
  }
`;
