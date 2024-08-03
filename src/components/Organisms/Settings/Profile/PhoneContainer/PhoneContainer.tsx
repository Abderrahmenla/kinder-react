import React, { useEffect, useState } from 'react';
import {
  AddNewPhone,
  AddNewPhoneDialCode,
  AddNewPhoneInputContainer,
  AddNewPhoneInputField,
  AddNewPhoneText,
  StyledLabel,
  StyledValue
} from '../Profile.style';
import Image from 'next/image';
import { countriesAndTelCode } from '@/utils/countriesAndTelCode';
import { useCountryCurrencyData } from '@/hooks/useCountryCurrencyData';
import { CountryType, PhoneContainerProps } from '../Profile.type';
import PhoneContainerForm from './PhoneContainerForm';
import CustomerSupportText from '@/components/Molecules/Settings/Profile/CustomerSupportText';
import InfoComponent from '../../../../Molecules/Settings/Profile/InfoComponent';
import IconComponent from '@/components/Molecules/Settings/Profile/IconComponent';
import { getNumberWithoutDialCode } from '@/utils/formatUtils/formatPhoneNumber';

const PhoneContainer: React.FC<PhoneContainerProps> = ({
  countryCode,
  mobilePhone,
  isMobile,
  displayToast,
  setPhoneHasError,
  t
}) => {
  const [isAddPhoneOpen, setIsAddPhoneOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(countriesAndTelCode[0]);
  const [isAddedPhone, setIsAddedPhone] = useState(false);

  const { countries } = useCountryCurrencyData({
    fetchCountries: true,
    fetchCurrencies: false
  });

  useEffect(() => {
    const setPlayerCountry = () => {
      const matchingCountry = countriesAndTelCode.find((c) => c.code === countryCode);
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
      }
    };

    const setPlayerPhone = () => {
      const phoneWithoutCountryCode = getNumberWithoutDialCode(
        selectedCountry.dial_code,
        mobilePhone ? mobilePhone : ''
      );
      setPhoneNumber(phoneWithoutCountryCode);
    };
    if (mobilePhone && selectedCountry.dial_code) setPlayerPhone();
    if (countryCode) setPlayerCountry();
  }, [countryCode, mobilePhone, countries, selectedCountry.dial_code]);

  return (
    <>
      {!isMobile && <IconComponent label="phone" width={31} height={56} />}
      {mobilePhone || isAddedPhone ? (
        <>
          <StyledLabel size="b2">{`${t('phoneNumber')}*`}</StyledLabel>
          <AddNewPhoneInputContainer>
            <AddNewPhoneInputField>
              <Image src={`${selectedCountry?.flag_4x3}`} alt="flag" width={16} height={12} />
              <AddNewPhoneDialCode size="b2">{`(${selectedCountry?.dial_code})`}</AddNewPhoneDialCode>
              <StyledValue size="b2">{phoneNumber}</StyledValue>
            </AddNewPhoneInputField>
          </AddNewPhoneInputContainer>
          {isMobile ? <CustomerSupportText t={t} isMobile={true} /> : <InfoComponent t={t} />}
        </>
      ) : (
        <>
          {!isAddPhoneOpen ? (
            <AddNewPhone
              variant="Secondary"
              showIcon={false}
              handleClick={() => setIsAddPhoneOpen(true)}
            >
              <AddNewPhoneText size="b2">{t('addNewPhone')}</AddNewPhoneText>
            </AddNewPhone>
          ) : (
            <PhoneContainerForm
              phoneNumber={phoneNumber ? phoneNumber : ''}
              setPhoneNumber={setPhoneNumber}
              selectedCountry={selectedCountry}
              t={t}
              displayToast={displayToast}
              setPhoneHasError={setPhoneHasError}
              setIsAddedPhone={setIsAddedPhone}
            />
          )}
        </>
      )}
    </>
  );
};

export default PhoneContainer;
