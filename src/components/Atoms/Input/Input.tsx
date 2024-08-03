import React, { useState, FunctionComponent } from 'react';
import {
  InputComponent,
  InputContainer,
  InputError,
  InputIcon,
  InputIconContainer
} from '@/components/Atoms/Input/Input.style';
import { InputProps } from '@/components/Atoms/Input/types/InputTypes';
import Image from 'next/image';
import { assets } from '@/config/assets';

const Input: FunctionComponent<InputProps> = ({
  value,
  onClick,
  onBlur,
  type = 'text',
  label,
  icon,
  errorMsg,
  validated,
  required,
  placeholder,
  name,
  id,
  onChange,
  size = 'md',
  className,
  maxLength,
  disabled = false,
  autofocus = false,
  minLength,
  onFocus,
  accept,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const renderIcon = () => {
    if (type === 'password') {
      return showPassword ? (
        <InputIcon onClick={handleTogglePassword}>
          <Image
            src={`${assets}/images/show-password.svg`}
            width={16}
            height={16}
            alt="show-password"
          />
        </InputIcon>
      ) : (
        <InputIcon onClick={handleTogglePassword}>
          <Image
            src={`${assets}/images/hide-password.svg`}
            width={16}
            height={16}
            alt="show-password"
          />
        </InputIcon>
      );
    }
    return (
      <InputIcon onClick={onClick}>
        <Image src={icon} width={16} height={16} alt="show-password" />
      </InputIcon>
    );
  };

  return (
    <InputContainer className={className}>
      {label && (
        <label>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <InputComponent size={size}>
        <input
          placeholder={placeholder}
          required={required}
          type={showPassword ? 'text' : type}
          value={value}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`${errorMsg ? 'input-error' : ''} ${validated ? 'input-validated' : ''}`}
          name={name}
          id={id}
          maxLength={maxLength}
          disabled={disabled}
          autoFocus={autofocus}
          minLength={minLength}
          accept={accept}
          {...props}
        />
        <InputIconContainer>
          {(icon || type === 'password') && renderIcon()}
          {validated && (
            <Image
              src={`${assets}/images/checkmark-icon.svg`}
              width={16}
              height={16}
              data-testid="checkmark-icon"
              alt="checkmark-icon"
              style={{ marginLeft: '5px' }}
            />
          )}
        </InputIconContainer>
      </InputComponent>
      {errorMsg && <InputError className="error-message">{errorMsg}</InputError>}
    </InputContainer>
  );
};

export default Input;
