import React from 'react';
import { ButtonBase, StyledIcon } from './Button.styles';
export interface ButtonProps {
  children: React.ReactNode;
  handleClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: 'Large' | 'Medium' | 'Small';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'Primary' | 'Secondary' | 'Text' | 'Ternary';
  icon?: React.ReactNode;
  showIcon?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  dataTestId?: string;
  imageOnly?: boolean;
  isSvgPath?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  handleClick,
  size = 'Large',
  type = 'button',
  variant = 'Primary',
  icon,
  showIcon = true,
  disabled = false,
  className,
  dataTestId,
  isSvgPath = true,
  imageOnly = false
}) => {
  const renderedIcon =
    showIcon && icon ? (
      isSvgPath ? (
        <StyledIcon color={variant} className={`icon ${variant}`} size={size}>
          {icon}
        </StyledIcon>
      ) : (
        icon
      )
    ) : null;
  const buttonContent = imageOnly ? (
    <div style={{ textAlign: 'center' }}>{renderedIcon}</div>
  ) : (
    <>
      {renderedIcon}
      {children && (
        <span
          className={`text ${variant}`}
          style={{ marginLeft: renderedIcon ? '8px' : '0' }}
          data-testid={dataTestId}
        >
          {children}
        </span>
      )}
    </>
  );
  return (
    <ButtonBase
      className={`button${variant} ${className ? className : ''}`}
      onClick={handleClick}
      disabled={disabled}
      disableRipple
      type={type}
    >
      {buttonContent}
    </ButtonBase>
  );
};
export default Button;
