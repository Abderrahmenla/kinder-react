import { ChangeEvent, FC } from 'react';
import {
  FormGroupContainer,
  FormRow,
  Label,
  LabelLeft,
  LabelText
} from './FormGroupTermAndCondStyle';
import Image from 'next/image';
import { assets } from '@/config/assets';

interface FormGroupProps {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  errorMsg?: string;
}

const FormGroupTermsAndCondition: FC<FormGroupProps> = ({
  checked,
  onChange,
  onBlur,
  errorMsg
}) => {
  return (
    <FormGroupContainer>
      <FormRow>
        <Label>
          <LabelLeft hasError={!!errorMsg}>
            <input
              type="checkbox"
              name="termsAndConditions"
              checked={checked}
              onChange={onChange}
              onBlur={onBlur}
            />
            {checked && (
              <Image
                data-testid="checkmark"
                alt="checkmark"
                src={`${assets}/images/mark.svg`}
                width={10}
                height={10}
                style={{
                  width: '10px',
                  height: 'auto',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '-1px',
                  bottom: 0,
                  margin: 'auto',
                  transition: 'all .4s'
                }}
              />
            )}
          </LabelLeft>
          <LabelText>I agree and understand the Terms & Conditions*</LabelText>
        </Label>
      </FormRow>
    </FormGroupContainer>
  );
};

export default FormGroupTermsAndCondition;
