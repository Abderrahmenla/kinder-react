export interface InputProps {
  value: any;
  onClick?: () => void;
  onBlur?: () => void;
  onChange: (value: any) => void;
  type?: string;
  label?: string;
  icon?: any;
  errorMsg?: string;
  validated?: boolean;
  onTogglePassword?: () => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
  size: string;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  autofocus?: boolean;
  minLength?: number;
  autoFocus?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  accept?: string;
  min?: number;
}
