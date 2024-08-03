import Input from '@/components/Atoms/Input';
import styled from '@emotion/styled';
import { Button } from '../..';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
`;
export const UserName = styled(Input)`
  width: 100%;
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
`;

export const FormButton = styled(Button)`
  width: 100%;
`;
