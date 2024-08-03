import { ButtonBase as MuiButtonBase } from '@mui/material';
import BaseButtonIcon from '../BaseButtonIcon/BaseButtonIcon';
import styled from '@emotion/styled';
import { ButtonProps } from './Button';

export const StyledIcon = styled(BaseButtonIcon)`
  &.Primary {
    fill: black;
  }
  &.Secondary {
    fill: #a391e2;
    .buttonSecondary:hover & {
      fill: white;
    }
  }
`;

export const ButtonBase = styled(MuiButtonBase)<ButtonProps>`
  display: flex;
  font-family: Inter;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 6px;
  color: #150e25;
  width: 100%;
  font-weight: 600;
  padding: ${(props) => {
    switch (props.size) {
      case 'Large':
        return '12px 18px';
      case 'Medium':
        return '10px 18px';
      case 'Small':
        return '8px 16px';
      default:
        return '12px 18px';
    }
  }};

  &.buttonPrimary {
    font-family: Inter;
    background-color: var(--yellow, #ffde09);
    background-image: var(
      --gradient-gradient-2,
      linear-gradient(90deg, #ffde09 0%, #ffbd14 99.48%)
    );
    transition: background-size 0.3s, background-color 0.3s;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &:hover {
      background-color: var(--yellow-4, #ffd70c) !important;
      background-size: 200% 100%;
    }
    &:active {
      border-radius: 6px;
      background-color: var(--yellow-7, #fadf56);
      background-size: 200% 100%;
    }
    &:disabled {
      opacity: 0.4;
      background-color: var(--yellow-7, #fadf56);
      background-size: 200% 100%;
      pointer-events: none;
    }
  }

  &.buttonSecondary {
    transition: background 0.3s ease-out;
    background: none;
    border: 1px solid var(--soft-blue-100, #a391e2);
    color: var(--soft-blue-100, #a391e2);
    &:hover {
      background: var(--soft-blue-100, #a391e2);
      .text.Secondary {
        color: var(--white, white) !important;
      }
    }
    &:active {
      background: var(--light-blue, #8e6cff);
      color: var(--white, white) !important;
    }
    &:disabled {
      opacity: 0.4;
      background: var(--light-blue, 8e6cff);
      color: var(--white, white) !important;
      pointer-events: none;
    }
  }

  &.buttonText {
    background: none;
    border-radius: 36px;
    border: none;
    color: var(--pure-blue, #0092ff);
    text-decoration: underline;
    &:hover {
      color: #8563e4 !important;
    }
    &:active {
      color: #8e6cff !important;
    }
    &:disabled {
      opacity: 0.4;
      color: #0092ff !important;
      pointer-events: none;
    }
  }

  &.buttonTernary {
    background-color: var(--very-dark-des-violet, #3c2a63);
    color: var(--white, white);
    &:hover {
      background-color: var(--yellow-4, #ffd70c);
      .text.Ternary {
        color: var(--black, black) !important;
      }
    }
  }
`;
