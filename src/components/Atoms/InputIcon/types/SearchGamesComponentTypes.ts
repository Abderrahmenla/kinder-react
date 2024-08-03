import { HTMLAttributes } from 'react';

export interface SearchGamesComponentProps {
  value: any;
  onClick?: () => void;
  onBlur?: () => void;
  onChange: (value: any) => void;
  type?: string;
  label?: string;
  icon?: any;
  errorMsg?: string;
  validated?: boolean;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
  size: string;
  isOpen?: string | boolean;
  setSearchQuery?: (value: any) => void;
}

export interface InputIconStyledProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: string | boolean;
  size?: string;
}
