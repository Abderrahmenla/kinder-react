import styled from '@emotion/styled';
import Input from '@/components/Atoms/Input/Input';
import Typography from '@/components/Atoms/Typography/Typography';

export const DialogSearchHeaderContainer = styled(Typography)`
  color: var(--white);
  font-family: Inter;
  font-size: var(--font-size-16);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const DialogSearchContentResultContainer = styled.div`
  margin-top: 39.5px;
`;

export const SearchResultText = styled.span`
  color: var(--darker-white);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  display: inline-block;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const CustomizeSearchInput = styled(Input)`
  width: 100%;
  padding-left: 0;
  input {
    border: none !important;
    font-family: Inter !important;
    font-weight: 500 !important;
    background-color: var(--very-dark-violet-200) !important;
    padding-left: 40px !important;
    &:focus {
      border: none !important;
      outline: none;
      background-color: var(--very-dark-violet-200) !important;
    }
    &:hover {
      border: none !important;
      background-color: var(--very-dark-violet-300) !important;
    }
  }
`;

export const SearchInputContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isFocused }) =>
    isFocused ? '1px solid var(--light-blue)' : '1px solid var(--dark-violet)'};
  background-color: var(--very-dark-violet-200);
  border-radius: 6px;
  &:hover {
    background-color: var(--very-dark-violet-300);
  }
`;
