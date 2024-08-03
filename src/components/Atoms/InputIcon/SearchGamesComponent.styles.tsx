import styled from '@emotion/styled';
import { InputIconStyledProps } from '@/components/Atoms/InputIcon/types/SearchGamesComponentTypes';

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  & label {
    width: 100%;
    color: var(--soft-blue-100);
    font-size: 12px;
    margin-bottom: 8px;
  }
  @media (max-width: 1021px) {
    display: none;
  }
`;

export const SearchComponentWrapper = styled.div<InputIconStyledProps>`
  display: flex;
  position: relative;
  justify-content: flex-end;
  width: ${(props) => (props.isOpen ? '200px' : 'auto')};
  background: var(--very-dark-violet-5);
  border-radius: 6px;
  @media (max-width: 1120px) {
    width: ${(props) => (props.isOpen ? '100px' : 'auto')};
  }
`;

export const SearchComponent = styled.div<InputIconStyledProps>`
  position: relative;
  display: flex;
  flex: none;
  max-width: 100%;
  border-radius: 6px;
  transition: all 0.4s;
  background: ${(props) => (!props.isOpen ? 'var(--very-dark-violet-5)' : 'transparent')};
  margin-right: ${(props) => (!props.isOpen ? '20px' : '0')};
  height: ${(props) =>
    props.size === 'sm'
      ? '36px'
      : props.size === 'md'
      ? '40px'
      : props.size === 'lg'
      ? '44px'
      : '48px'};

  & input {
    width: ${(props) => (!props.isOpen ? '0px' : '200px')};
    flex: 1;
    font-size: 14px;
    transition: all 0.4s;
    padding: ${(props) =>
      props.size === 'sm'
        ? '8px'
        : props.size === 'md'
        ? '8px 10px'
        : props.size === 'lg'
        ? '8px 12px'
        : '8px 14px'};
    border-radius: 6px;
    padding-left: ${(props) => props.isOpen && '40px'};
    border: ${(props) =>
      props.isOpen ? '1px solid var(--very-dark-violet-5)' : 'none !important'};
    background: var(--very-dark-violet-5);
    color: rgba(255, 255, 255, 0.6);
    &:focus {
      border: ${(props) => props.isOpen && '1px solid var(--yellow-4)'};
      outline: none;
      background: ${(props) => props.isOpen && 'var(--very-dark-violet-5)'};
    }
    @media (max-width: 1120px) {
      width: ${(props) => (!props.isOpen ? '0px' : '100px')};
    }
  }

  & .input-error {
    border: ${(props) => props.isOpen && '1px solid var(--vivid-red)'};
  }

  & .input-validated {
    border: ${(props) => props.isOpen && '1px solid var(--lime-green-400)'};
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

export const SearchIconContainer = styled.div<InputIconStyledProps>`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${(props) => (!props.isOpen ? 'var(--very-dark-violet-5)' : 'transparent')};
  border-radius: ${(props) => !props.isOpen && '6px'};
  left: 2px;
  padding: 10px;
`;
