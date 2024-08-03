import Input from '@/components/Atoms/Input';
import styled from '@emotion/styled';
import { Button } from '../..';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
`;
export const UserName = styled(Input)`
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

export const PasswordInput = styled(Input)`
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

export const FormGroup = styled('div')<{ hasError: boolean }>`
  margin-bottom: ${({ hasError }) => (hasError ? 'unset' : '16px')};
  display: flex;
`;

export const ActionContainer = styled('div')`
  width: 100%;
  padding: 0px 6px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
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

export const ForgotPasswordLink = styled('button')`
  color: var(--accent-color-accent-blue, #0092ff);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  width: 100%;
  padding-top: 6px;
  background: none;
  border: none;
  cursor: pointer;
`;
