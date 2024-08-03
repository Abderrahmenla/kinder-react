import { styled } from '@mui/material/styles';
import { CSSProperties } from 'react';

export const CountryLocaleDropdownContainer = styled('div')<{ open?: boolean }>`
  margin-bottom: 16px;
  margin-top: 20px;
  position: relative;
  width: 100%;
  display: ${({ open }) => (open ? 'block' : 'flex')};
  align-items: center;
  justify-content: center;
`;

export const countryLocaleDropdownList = (open: boolean): CSSProperties => ({
  position: 'absolute',
  borderRadius: '6px',
  cursor: 'pointer',
  maxHeight: '200px',
  width: open ? '100%' : '36px',
  backgroundColor: '#3c2a63'
});

export const countryLocaleDropdown = (open: boolean, isMobile: boolean) => ({
  width: open ? '100%' : '36px',
  height: isMobile ? '44px' : '36px',
  marginBottom: '5px',
  borderRadius: open ? '6px' : '36px',
  paddingLeft: '10px'
});

export const countryLocaleDropdownListItem = (open: boolean, isLastIndex: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  marginBottom: isLastIndex ? 0 : '6px',
  width: open ? '100%' : '36px',
  borderRadius: open ? '6px' : '36px'
});
