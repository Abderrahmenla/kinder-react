import { useEffect, useState } from 'react';
import {
  FormCurrencyListOption,
  FormCurrencySelectionLeft,
  FormCurrencyList,
  FormCurrencySelection,
  FormCurrencySelectionRight,
  FormErr,
  FormGroupContainer,
  FormRow,
  Label,
  Sup
} from './FormDropDownStyle';
import { useLoader } from '@/hooks/useLoader';
import { Box } from '@mui/material';
import Image from 'next/image';
import { assets } from '@/config/assets';

interface FormGroupProps {
  label?: string;
  important: boolean;
  errorMsg?: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (value: any) => void;
  data: string[];
  id?: string;
  isCurrency?: boolean;
  onBlur?: () => void;
  isDisabled?: boolean;
  isDataLoading?: boolean;
}

const FormDropDown: React.FC<FormGroupProps> = ({
  label,
  important,
  errorMsg,
  value,
  data,
  isCurrency,
  onBlur,
  isDisabled = false,
  isDataLoading = false,
  ...props
}) => {
  const [isListVisible, setListVisibility] = useState(false);
  const [activeItem, setActiveItem] = useState<string>();
  const { toggleLoader, loadingWrapper } = useLoader('coin');

  useEffect(() => {
    toggleLoader(isDataLoading);
  }, [isDataLoading, toggleLoader]);

  useEffect(() => {
    if (value) {
      setActiveItem(value);
    }
  }, [value]);

  const toggleListVisibility = () => {
    if (isDisabled) {
      return;
    }
    setListVisibility(!isListVisible);
  };

  const handleOptionClick = (value: string) => {
    setActiveItem(value);
    if (props.onChange) {
      props.onChange({ target: { value, name: props.name } });
      setListVisibility(false);
    }
  };
  return (
    <FormGroupContainer>
      {label ? (
        <Label htmlFor={label}>
          {label}
          {important && <Sup>*</Sup>}
        </Label>
      ) : null}
      <FormRow>
        <FormCurrencySelection
          errMsg={errorMsg}
          isDisabled={isDisabled || isDataLoading}
          isListVisible={isListVisible}
          onClick={toggleListVisibility}
        >
          {!isCurrency && isDataLoading ? (
            <Box>{loadingWrapper}</Box>
          ) : (
            <>
              <FormCurrencySelectionLeft>
                <span>{value}</span>
              </FormCurrencySelectionLeft>
              <FormCurrencySelectionRight isDisabled={isDisabled}>
                <Image
                  width={12}
                  height={7}
                  src={`${assets}/images/arrowDown.svg`}
                  alt="Arrow down icon"
                />
              </FormCurrencySelectionRight>
            </>
          )}
        </FormCurrencySelection>
        <FormCurrencyList isCurrency={isCurrency} isVisible={isListVisible}>
          {isDataLoading ? (
            <Box marginTop={-10}>{loadingWrapper}</Box>
          ) : (
            <>
              {data && (
                <>
                  {data.map((curr, index) => (
                    <FormCurrencyListOption key={index}>
                      <a
                        onBlur={onBlur}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOptionClick(curr);
                        }}
                        className={curr === activeItem ? 'active' : ''}
                      >
                        {curr}
                      </a>
                    </FormCurrencyListOption>
                  ))}
                </>
              )}
            </>
          )}
        </FormCurrencyList>
      </FormRow>
      {errorMsg && (
        <FormErr>
          <span role="alert">{errorMsg}</span>
        </FormErr>
      )}
    </FormGroupContainer>
  );
};

export default FormDropDown;
