import { ReactNode } from 'react';
import { FormGroupContainer, Label, Sup, FormErr, FormRow, Input } from './FormGroupStyle';

interface FormGroupProps {
  label?: string;
  important?: boolean;
  errorMsg?: string;
  type: string;
  name: string;
  value?: string;
  suffix?: string | ReactNode;
  onChange?: (value: any) => void;
  onFocus?: (value: any) => void;
  onBlur?: (value: any) => void;
  placeholder: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  important,
  errorMsg,
  suffix,
  style,
  className,
  disabled,
  ...props
}) => {
  return (
    <FormGroupContainer className={className} style={style}>
      <Label htmlFor={label}>
        {label}
        {important && <Sup>*</Sup>}
      </Label>
      <FormRow>
        <div style={{ position: 'relative' }}>
          <Input {...props} errMsg={errorMsg} disabled={disabled} />
          {suffix && (
            <span
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                margin: 'auto',
                cursor: 'pointer',
                zIndex: 2,
                padding: typeof suffix === 'string' ? '0 17px' : '0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {suffix}
            </span>
          )}
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

export default FormGroup;
