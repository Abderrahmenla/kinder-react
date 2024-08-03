import styled from '@emotion/styled';
import Link from 'next/link';

interface ContainerProps {
  isDrawerOpen?: boolean;
  isHovered?: boolean;
  centered?: boolean;
  centeredHover?: boolean;
  isActive?: boolean;
}

export const Container = styled.div<ContainerProps>`
  text-align: left;
  font-size: var(--font-size-14);
  line-height: var(--l-height-17);
  letter-spacing: var(--lt-spacing-m);
  font-weight: 500;
  cursor: pointer;
  background-color: rgba(48, 25, 87, 0.3);
  border-radius: 15px;
  justify-content: ${(props) => (props.centered ? 'center' : 'space-between')};
  width: ${(props) => (props.isDrawerOpen ? '235px' : '54px')};
  // min-height: ${(props) => (props.isDrawerOpen ? '54px' : '54px')};
  flex-direction: column;
  color: ${(props) => (props.isHovered || props.isActive ? 'white' : '#D4BFFF')};
  &:hover {
    color: white;
  }
  box-shadow: ${(props) => (props.centeredHover ? '0px 0px 10px rgba(255, 222, 9, 0.7)' : '')};
  border: ${(props) => (props.centeredHover ? '1px solid #FFDE09' : '')};
  margin-bottom: 7.4px;
  transition: color 0.5s ease;
`;

interface IconTextGroupProps {
  centered?: boolean;
}

export const IconTextGroup = styled.div<IconTextGroupProps>`
  display: flex;
  justify-content: ${(props) => (props.centered ? 'center' : 'space-between')};
  align-items: center;
  margin: 9px;
  margin-left: ${(props) => (props.centered ? '0px' : '14px')};
`;

interface IconProps {
  effectsEnabled?: boolean;
  isHovered?: boolean;
}
export const Icon = styled.div<IconProps>`
  transition: ${(props) => (props.effectsEnabled ? 'transform 0.5s' : '')};
  transform: ${(props) => (props.isHovered ? 'scaleX(-1)' : '')};
`;

export const SubMenu = styled.div<{ isDrawerOpen: boolean }>`
  font-size: 14px;
  padding: ${(props) => (props.isDrawerOpen ? '16px 46px' : '15px')};
`;

export const SubMenuContainer = styled(Link)({
  textDecoration: 'none'
});

export const SubMenuItem = styled.li<{ isActive?: boolean }>`
  list-style: none;
  color: ${({ isActive }) => (isActive ? 'white' : '#d4bfff')};
  cursor: pointer;
  &:hover {
    color: white;
  }
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const CategoryTitle = styled('div')({
  color: '#4f397d',
  fontSize: 11,
  fontWeight: 500,
  lineHeight: '13px',
  letterSpacing: '0.5376px',
  paddingTop: 20,
  paddingBottom: 20
});

export const F1LeaderboardLiveButton = styled.span<{ isOnOrAfter12thFeb2024: boolean }>`
  margin-left: 20px;
  background: ${({ isOnOrAfter12thFeb2024 }) => (isOnOrAfter12thFeb2024 ? '#d40000' : '#FFBD14')};
  color: ${({ isOnOrAfter12thFeb2024 }) => (isOnOrAfter12thFeb2024 ? 'white' : 'black')};
  padding: 2px;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
`;
