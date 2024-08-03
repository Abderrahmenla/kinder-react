import CustomerSupportText from '@/components/Molecules/Settings/Profile/CustomerSupportText';
import {
  CustomerSupportTextContainer,
  InfoContainer,
  InfoIcon,
  MouseOverContainer
} from '../../../Organisms/Settings/Profile/Profile.style';
import Image from 'next/image';
import { useState } from 'react';
import { assets } from '@/config/assets';

const InfoComponent: React.FC<{ t: (key: string) => string }> = ({ t }) => {
  const [isOpenToolTip, setIsOpenToolTip] = useState(false);

  return (
    <>
      <InfoContainer
        onMouseOver={() => setIsOpenToolTip(true)}
        onMouseOut={() => setIsOpenToolTip(false)}
      >
        <InfoIcon>
          <Image
            src={`${assets}/images/information_icon.svg`}
            width={16}
            height={16}
            alt="info-icon"
            loading="lazy"
          />
        </InfoIcon>
        {isOpenToolTip && (
          <CustomerSupportTextContainer
            onMouseOver={() => setIsOpenToolTip(true)}
            onMouseOut={() => setIsOpenToolTip(false)}
          >
            {' '}
            <CustomerSupportText t={t} isMobile={false} />
          </CustomerSupportTextContainer>
        )}
      </InfoContainer>
      <MouseOverContainer
        onMouseOver={() => setIsOpenToolTip(true)}
        onMouseOut={() => setIsOpenToolTip(false)}
      />
    </>
  );
};

export default InfoComponent;
