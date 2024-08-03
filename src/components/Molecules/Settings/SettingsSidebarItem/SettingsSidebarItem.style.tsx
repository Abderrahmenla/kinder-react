import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';
import Link from 'next/link';

export const SidebarText = styled(Typography)`
  color: var(--darker-white);
`;

export const SidebarLink = styled(Link)<{ isActive: boolean; isHover: boolean }>`
  text-decoration: none;
  outline: none;
  border-radius: ${({ isActive, isHover }) => (isActive || isHover ? '6px' : 'unset')};
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  text-wrap: nowrap;
  align-items: center;
  max-height: 44px;
  background: ${({ isActive, isHover }) =>
    isHover ? 'var(--very-dark-des-violet)' : isActive ? 'var(--very-dark-violet-200)' : 'unset'};
`;
