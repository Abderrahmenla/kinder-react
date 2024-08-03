import styled from '@emotion/styled';
import Link from 'next/link';

export const PopperProps = {
  sx: {
    '& .MuiTooltip-tooltip': {
      color: 'white',
      backgroundColor: 'var(--very-dark-des-violet)',
      height: 35,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 500,
      left: 8
    },
    '& .MuiTooltip-arrow': {
      '&::before': {
        backgroundColor: 'var(--very-dark-des-violet)'
      }
    }
  }
};

export const MenuItemLink = styled(Link)<{ isOpen: boolean }>`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: ${({ isOpen }) => (!isOpen ? 'flex' : 'block')};
  align-items: center;
  justify-content: center;
`;
