import {
  ProfileInfoContainer,
  ProfileRankImageContainer,
  ProfileSection,
  ProfileSectionContainer
} from '../../NavBarStyles';
import Image from 'next/image';

export const ProfileDisplayData = ({
  userName,
  imgProfile,
  userId,
  isDesktop = true
}: {
  userName?: string;
  imgProfile?: string;
  userId?: string | number;
  isDesktop?: boolean;
}) => {
  return (
    <ProfileSection>
      <ProfileSectionContainer>
        {isDesktop ? (
          imgProfile && <Image src={imgProfile || ''} width={28} height={28} alt="" />
        ) : (
          <ProfileRankImageContainer>
            {imgProfile && <Image src={imgProfile || ''} width={28} height={28} alt="" />}
          </ProfileRankImageContainer>
        )}

        <ProfileInfoContainer>
          <span>{userName}</span>
          <span style={{ fontSize: '10px', color: 'var(--grey-lower)', fontWeight: '500px' }}>
            {userId}
          </span>
        </ProfileInfoContainer>
      </ProfileSectionContainer>
    </ProfileSection>
  );
};
