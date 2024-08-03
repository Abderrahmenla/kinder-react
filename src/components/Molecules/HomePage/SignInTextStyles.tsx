import { TextComponent } from '@/components/Atoms';
import styled from '@emotion/styled';

export const SignInTextStyled = styled(TextComponent)`
  color: #fafaff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding-right: 24px;
  @media screen and (max-width: 300px) {
    padding-right: 10px;
  }
`;
