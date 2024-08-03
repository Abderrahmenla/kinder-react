import Button from '@/components/Atoms/Button/Button';
import Input from '@/components/Atoms/Input';
import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';

export const FormContainer = styled('form')<{ hasError: boolean }>`
  display: flex;
  gap: 16px;
  width: 100%;
  flex-direction: column;
  padding: 12px;
  background: var(--very-dark-violet-3);
  border-radius: 16px;
  margin-bottom: 108px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: unset;
    background: none;
    border-radius: unset;
    margin-bottom: ${({ hasError }) => (hasError ? '2px' : 'unset')};
    align-items: baseline;
  }
`;

export const ChangePasswordInput = styled(Input)`
  width: 100%;
  line-height: 1;

  label {
    font-weight: 500;
  }

  input::placeholder {
    font-weight: 500;
    font-family: Inter;
  }

  input::-ms-input-placeholder {
    font-weight: 500;
    font-family: Inter;
  }

  @media screen and (min-width: 768px) {
    max-width: 264px;
    .error-message {
      position: absolute;
      bottom: 0px;
      top: 100%;
      font-size: var(--font-size-10);
    }
  }
`;

export const ButtonLabel = styled(Typography)`
  span {
    color: var(--very-dark-violet);
    font-weight: 500;
    line-height: 1;
  }
`;

export const ChangeButton = styled(Button)`
  height: fit-content;
  align-self: end;
  padding: 12px 35px;
  width: 100%;
  @media screen and (min-width: 768px) {
    max-width: 126px;
    align-self: end;
  }
`;
