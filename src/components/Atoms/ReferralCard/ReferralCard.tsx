import { FC } from 'react';
import { ReferralCardProps } from '@/components/Atoms/ReferralCard/ReferralCard.type';
import {
  ReferralCardContainer,
  ReferralCardItem
} from '@/components/Atoms/ReferralCard/ReferralCard.styles';
import Image from 'next/image';
import Typography from '@/components/Atoms/Typography/Typography';

const ReferralCard: FC<ReferralCardProps> = ({ name, value, icon }) => {
  return (
    <ReferralCardItem>
      <Image src={icon} alt="referral-icon" width={24} height={24} />
      <ReferralCardContainer>
        <Typography type="Heading" size="h5" color="var(--soft-blue-100)">
          {name}
        </Typography>
        <Typography type="Heading" size="h5" color="var(--white)">
          {value}
        </Typography>
      </ReferralCardContainer>
    </ReferralCardItem>
  );
};

export default ReferralCard;
