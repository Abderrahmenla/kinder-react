import { FC } from 'react';
import { CheckboxProps } from '../Checkbox/types/CheckboxTypes';
import {
  CheckboxContainer,
  Label,
  LabelLeft,
  LabelText
} from '@/components/Atoms/Checkbox/Checkbox.styles';
import Image from 'next/image';
import { assets } from '@/config/assets';

const Checkbox: FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  onBlur,
  errorMsg,
  label,
  className,
  onFocus
}) => {
  return (
    <CheckboxContainer className={className}>
      <Label>
        <LabelLeft checked={checked} hasError={!!errorMsg}>
          <input
            type="checkbox"
            checked={checked}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {checked && (
            <Image src={`${assets}/images/checked.svg`} alt="checked" width={16} height={16} />
          )}
        </LabelLeft>
        <LabelText>{label}</LabelText>
      </Label>
    </CheckboxContainer>
  );
};

export default Checkbox;
