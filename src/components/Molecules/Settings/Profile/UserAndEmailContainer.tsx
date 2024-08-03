import { StyledLabel, StyledValue } from '@/components/Organisms/Settings/Profile/Profile.style';
import { UserAndEmailProps } from '@/components/Organisms/Settings/Profile/Profile.type';

const UserAndEmailContainer: React.FC<UserAndEmailProps> = ({ label, value }) => {
  return (
    <>
      <StyledLabel size="b2">{label}</StyledLabel>
      <StyledValue size="b2">{value}</StyledValue>
    </>
  );
};

export default UserAndEmailContainer;
