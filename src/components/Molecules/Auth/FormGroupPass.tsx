import { useState } from 'react';
import { FormErr, FormGroupContainer, FormRow, Label, Sup, Input } from './FormGroupPassStyle';
import Image from 'next/image';
import { assets } from '@/config/assets';
interface FormGroupProps {
  label: string;
  important: boolean;
  errorMsg?: string;
  type: string;
  id?: string;
  name: string;
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  onFocus?: (value: any) => void;
  onBlur?: (value: any) => void;
}

const FormGroupPass: React.FC<FormGroupProps> = ({
  label,
  important,
  errorMsg,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormGroupContainer>
      <Label htmlFor={label}>
        {label}
        {important && <Sup>*</Sup>}
      </Label>
      <FormRow>
        <div style={{ position: 'relative' }}>
          <Input
            type={type === 'password' && showPassword ? 'text' : type}
            {...props}
            errMsg={errorMsg}
          />
          <span
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              margin: 'auto',
              cursor: 'pointer',
              zIndex: 1,
              padding: '0 17px',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleShowPassword}
          >
            <Image
              alt="Show password"
              width={17}
              height={11}
              src={
                showPassword ? `${assets}/images/passwordShow.svg` : `${assets}/images/password.svg`
              }
            />
          </span>
        </div>
        {errorMsg && (
          <FormErr>
            <span role="alert">{errorMsg}</span>
          </FormErr>
        )}
      </FormRow>
    </FormGroupContainer>
  );
};

export default FormGroupPass;
