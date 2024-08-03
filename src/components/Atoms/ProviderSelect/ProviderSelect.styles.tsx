import styled from '@emotion/styled';

export const ProviderSelectContainer = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 1;
  min-width: 128px;
  align-items: center;
  color: var(--white);
  &:hover {
    background: var(--very-dark-des-violet);
  }
  background: var(--very-dark-violet-3);
  font-size: 14px;
  border-radius: 6px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
export const ProviderHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
`;
export const ProviderHeader = styled.div`
  cursor: pointer;
`;

export const ProviderSelectIcon = styled.div`
  display: flex;
  pointer-events: none;
  padding-left: 10px;
`;

export const ProviderListContainerWrapper = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 4px;
    right: 50%;
    border-bottom: 9px solid var(--very-dark-violet-200);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    width: 0;
    height: 0;
    transform: translateX(50%);
  }
`;
export const ProviderListContainer = styled.div`
  min-width: 180px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 12px);
  width: 100%;
  background: var(--very-dark-violet-3);
  color: var(--white);
  max-height: 365px;
  overflow-y: auto;
  z-index: 1;
  font-size: 14px;
  border-radius: 6px;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
  & img {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;
export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: none;
  box-sizing: border-box;
  background: var(--very-dark-violet-200);
  color: rgba(255, 255, 255, 0.6);
  &:focus {
    outline: none;
    border: none;
  }
`;

export const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--very-dark-des-violet);
  }
`;
