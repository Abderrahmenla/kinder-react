import { SerializedStyles } from '@emotion/react';

export interface DateInputProps {
  label?: string;
  important?: boolean;
  errorMsg?: string;
  name: string;
  value?: string;
  id?: string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  className?: string;
  inputStyle?: SerializedStyles;
  onInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
