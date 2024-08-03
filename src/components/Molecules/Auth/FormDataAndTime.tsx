import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { FC, useState, useEffect } from 'react';

export const Label = styled('label')({
  paddingLeft: '14px'
});

export const FormGroupContainer = styled('div')({
  fontWeight: 400,
  marginBottom: '20px',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  color: 'var(--soft-violet)'
});

export const FormRow = styled('div')({
  position: 'relative',
  marginTop: '8px'
});

type InputProps = {
  errMsg?: string;
};

export const Input = styled('input')<InputProps>(({ errMsg }) => ({
  background: 'var(--very-dark-violet-300)',
  borderRadius: '15px',
  border: '1px solid',
  borderColor: errMsg ? 'var(--vivid-red)' : 'var(--very-dark-des-violet)',
  padding: '0 14px',
  height: '42px',
  letterSpacing: '0.03em',
  appearance: 'none',
  fontSize: 'var(--font-size-12)',
  color: 'var(--white)',
  fontWeight: '400',
  outline: 'none',
  width: '100%'
}));

export const Sup = styled('sup')({
  color: 'var(--vivid-red)',
  marginLeft: '4px',
  fontSize: 'var(--font-size-12)',
  position: 'relative',
  top: '4px'
});

export const FormErr = styled('div')({
  '& span': {
    marginTop: '5px',
    color: 'var(--vivid-red)',
    fontSize: 'var(--font-size-10)',
    lineheight: 'var(--l-height-13)',
    fontWeight: 400,
    paddingLeft: '14px'
  }
});

export const FormRowWrap = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

export const FormDateLeftCol = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

export const FormDateRightCol = styled('div')({
  width: '62px',
  marginLeft: '15px',
  flexShrink: 0,
  position: 'relative'
});

export const FormCalendarContainer = styled('div')({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  position: 'absolute',
  background: 'var(--mod-blue-100)',
  borderRadius: '15px',
  display: 'flex',
  top: 0,
  left: 0
});

export const CalendarIcon = styled('div')({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex'
});

export const FormDateCell = styled('div')<InputProps>(({ errMsg }) => ({
  width: 'calc(100% / 3)',
  marginRight: '8px',
  '& input': {
    background: 'var(--very-dark-violet-300)',
    border: '1px solid',
    borderColor: errMsg ? 'var(--vivid-red)' : 'var(--very-dark-des-violet)',
    borderRadius: '15px',
    padding: '0 14px',
    height: '42px',
    letterSpacing: '0.03em',
    appearance: 'none',
    fontSize: 'var(--font-size-12)',
    color: 'var(--white)',
    fontWeight: 400,
    outline: 'none',
    width: '100%',
    textAlign: 'center'
  },
  '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
    {
      webkitAppearance: 'none',
      appearance: 'none',
      margin: 0
    }
}));

interface FormDateAndTimeProps {
  label?: string;
  important?: boolean;
  errorMsg?: string;
  name: string;
  value?: string;
  id?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}
const FormDateAndTime: FC<FormDateAndTimeProps> = ({
  label,
  important,
  errorMsg,
  name,
  value,
  onChange,
  onBlur
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

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDay(value);
    updateHiddenInputDate(value, month, year);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMonth(value);
    updateHiddenInputDate(day, value, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setYear(value);
    updateHiddenInputDate(day, month, value);
  };

  const updateHiddenInputDate = (day: string, month: string, year: string) => {
    const newDateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    onChange?.(newDateOfBirth);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <FormGroupContainer>
      <Label htmlFor={label}>
        {label}
        {important && <Sup>*</Sup>}
      </Label>
      <FormRow>
        <FormRowWrap>
          <FormDateLeftCol>
            <FormDateCell errMsg={errorMsg}>
              <input
                type="number"
                autoComplete="off"
                onChange={handleDayChange}
                onBlur={onBlur}
                step="1"
                name="day"
                placeholder="DD"
                value={day}
              />
            </FormDateCell>
            <FormDateCell errMsg={errorMsg}>
              <input
                type="number"
                autoComplete="off"
                step="1"
                onChange={handleMonthChange}
                onBlur={onBlur}
                name="month"
                placeholder="MM"
                value={month}
              />
            </FormDateCell>
            <FormDateCell errMsg={errorMsg}>
              <input
                type="number"
                autoComplete="off"
                step="1"
                name="year"
                onChange={handleYearChange}
                onBlur={onBlur}
                placeholder="YYYY"
                value={year}
              />
            </FormDateCell>
          </FormDateLeftCol>
          <FormDateRightCol>
            <FormCalendarContainer
              onClick={() => {
                (document.getElementById('date-input') as HTMLInputElement)?.showPicker();
              }}
            >
              <CalendarIcon>
                <Image
                  src={`${assets}/images/calender.svg`}
                  width={22}
                  height={22}
                  alt="calender icon"
                />
              </CalendarIcon>
              <input
                type="date"
                name={name}
                data-type="date"
                id="date-input"
                onChange={handleDateChange}
                onBlur={onBlur}
                data-testid="dateInput"
                value={value || ''}
                style={{
                  padding: 0,
                  border: 'none',
                  width: '100%',
                  height: '100%',
                  fontSize: 0,
                  lineHeight: 'unset',
                  background: 'transparent',
                  outline: 'none',
                  color: 'transparent',
                  cursor: 'pointer',
                  opacity: 0,
                  position: 'absolute',
                  right: '50%'
                }}
              />
            </FormCalendarContainer>
          </FormDateRightCol>
        </FormRowWrap>
      </FormRow>
      {errorMsg && (
        <FormErr>
          <span role="alert">{errorMsg}</span>
        </FormErr>
      )}
    </FormGroupContainer>
  );
};

export default FormDateAndTime;
