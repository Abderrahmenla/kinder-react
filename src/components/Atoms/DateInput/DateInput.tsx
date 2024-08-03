import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { DateInputProps } from '@/components/Atoms/DateInput/types/DateInputTypes';
import {
  DateInputContainer,
  Sup,
  InputRow,
  FormErr,
  InputRowWrap,
  InputDateCell,
  InputDateLeftCol,
  CalendarContainer,
  LabelContainer,
  CalendarIconContainer
} from '@/components/Atoms/DateInput/DateInput.styles';

import Image from 'next/image';
import { assets } from '@/config/assets';

const DateInput: FC<DateInputProps> = ({
  label,
  important,
  errorMsg,
  name,
  value,
  onChange,
  onBlur,
  className,
  onInputFocus
}) => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setDay(String(date.getDate()).padStart(2, '0'));
      setMonth(String(date.getMonth() + 1).padStart(2, '0'));
      setYear(String(date.getFullYear()));
    }
  }, []);

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDay(value);
    updateHiddenInputDate(value, month, year);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMonth(value);
    updateHiddenInputDate(day, value, year);
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setYear(value);
    updateHiddenInputDate(day, month, value);
  };

  const updateHiddenInputDate = (day: string, month: string, year: string) => {
    const newDateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    onChange?.(newDateOfBirth);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setDay(String(date.getDate()).padStart(2, '0'));
    setMonth(String(date.getMonth() + 1).padStart(2, '0'));
    setYear(String(date.getFullYear()));
  };

  useEffect(() => {
    if (day && month && year) {
      const newDateOfBirth = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      onChange?.(newDateOfBirth);
    }
  }, [day, month, year]);

  return (
    <DateInputContainer className={className}>
      <LabelContainer>
        <label htmlFor={label}>
          {label}
          {important && <Sup>*</Sup>}
        </label>
        <CalendarContainer
          onClick={() => {
            (document.getElementById('date-input') as HTMLInputElement)?.showPicker();
          }}
        >
          <CalendarIconContainer>
            <Image
              src={`${assets}/images/calendar-icon.svg`}
              width={16}
              height={16}
              alt="calendar-icon"
            />
          </CalendarIconContainer>
          <input
            type="date"
            name={name}
            data-type="date"
            id="date-input"
            onChange={handleDateChange}
            onBlur={onBlur}
            data-testid="dateInput"
            value={value || ''}
            onFocus={onInputFocus}
          />
        </CalendarContainer>
      </LabelContainer>
      <InputRow>
        <InputRowWrap>
          <InputDateLeftCol>
            <InputDateCell errMsg={errorMsg}>
              <input
                type="number"
                autoComplete="off"
                onChange={handleDayChange}
                onBlur={onBlur}
                step="1"
                name="day"
                placeholder="DD"
                value={day}
                onFocus={onInputFocus}
              />
            </InputDateCell>
            <InputDateCell errMsg={errorMsg}>
              <input
                type="number"
                autoComplete="off"
                step="1"
                onChange={handleMonthChange}
                onBlur={onBlur}
                name="month"
                placeholder="MM"
                value={month}
                onFocus={onInputFocus}
              />
            </InputDateCell>
            <InputDateCell errMsg={errorMsg}>
              <input
                type="number"
                autoComplete="off"
                step="1"
                name="year"
                onChange={handleYearChange}
                onBlur={onBlur}
                placeholder="YYYY"
                value={year}
                onFocus={onInputFocus}
              />
            </InputDateCell>
          </InputDateLeftCol>
        </InputRowWrap>
      </InputRow>
      {errorMsg && (
        <FormErr>
          <span role="alert">{errorMsg}</span>
        </FormErr>
      )}
    </DateInputContainer>
  );
};

export default DateInput;
