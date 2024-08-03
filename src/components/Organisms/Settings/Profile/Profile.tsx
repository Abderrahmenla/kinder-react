import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { useRecoilState } from 'recoil';
import { playerState } from '@/components/state/playerState';
import { UseMediaQuery } from '@/hooks/useMediaQuery';
import LockIcon from '@/components/Atoms/Icons/LockIcon';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import {
  ChangePassowrdButton,
  ChangePasswordButtonText,
  ChangePasswordContianer,
  ProfilePageCard,
  ProfilePageContainer,
  ProfilePageHeader,
  ProfilePageWrapper,
  ProfilePageInfoContainer,
  ReceivePromoContainer
} from './Profile.style';
import PhoneContainer from './PhoneContainer/PhoneContainer';
import { SettingsContentProps, UserAndEmailProps } from './Profile.type';
import { initialUserAndEmailValue } from './Profile.constants';
import useCustomToast from '@/hooks/useCustomToast';
import dynamic from 'next/dynamic';
import IconComponent from '@/components/Molecules/Settings/Profile/IconComponent';
import UserAndEmailContainer from '@/components/Molecules/Settings/Profile/UserAndEmailContainer';
import { useLoader } from '@/hooks/useLoader';
import Typography from '@/components/Atoms/Typography/Typography';
import ToggleCheckbox from '@/components/Atoms/ToggleCheckbox/ToggleCheckbox';
import { apiClient } from '@/services/clientAxios';
import { useContactPreferences } from '@/hooks/useGetContactPreferences';
const CustomToast = dynamic(() =>
  import('@/components/Atoms/CustomToast/CustomToast').then((mod) => mod.CustomToast)
);

const GeneralSettings: React.FC<SettingsContentProps> = ({ isPageOpen, setIsPageOpen }) => {
  const { t } = useTranslations();
  const [player] = useRecoilState(playerState);
  const [isPlayerLoading, setIsPlayerLoading] = useState(true);
  const { loadingWrapper } = useLoader('coin');
  const isMobile = UseMediaQuery(768);
  const { displayToast, toastProps } = useCustomToast();
  const [usernameAndEmail, setUsernameAndEmail] =
    useState<UserAndEmailProps[]>(initialUserAndEmailValue);
  const [phoneHasError, setPhoneHasError] = useState(false);
  const { contactPreferences } = useContactPreferences();
  const blockAll = contactPreferences?.blockAll;

  const [isActivePromotion, setIsActivePromotion] = useState<boolean | undefined>(blockAll);

  // Toggle isActivePromotion state
  const toggleActivePromotion = async () => {
    setIsActivePromotion(!isActivePromotion);

    try {
      const updatedContactPreferences = {
        ...contactPreferences,
        blockAll: !isActivePromotion
      };

      await apiClient.put('/api/player/contactPreferences', updatedContactPreferences);
    } catch (error) {
      console.error('Error updating contact preferences:', error);
    }
  };

  const handleChangePassword = useCallback(() => {
    setIsPageOpen('changePassword');
  }, [setIsPageOpen]);

  useEffect(() => {
    if (player && contactPreferences) {
      setUsernameAndEmail([
        {
          label: 'username',
          value: player.userName
        },
        {
          label: 'email',
          value: player.eMail
        }
      ]);
      setIsPlayerLoading(false);
      setIsActivePromotion(blockAll);
    }
  }, [player, contactPreferences]);

  useEffect(() => {
    if (!isMobile && isPageOpen === 'changePassword') {
      setIsPageOpen('profile');
    }
  }, [isMobile, isPageOpen, setIsPageOpen]);

  if (isPlayerLoading) {
    return loadingWrapper;
  }

  return (
    <>
      {isPageOpen !== 'changePassword' ? (
        <>
          <ProfilePageWrapper>
            <ProfilePageContainer>
              <ProfilePageHeader size="b2">{t('accountDetails')}</ProfilePageHeader>
              <ProfilePageInfoContainer>
                {player &&
                  usernameAndEmail.map((data) => {
                    if (data.label === '') return null;
                    const size =
                      data.label === 'username'
                        ? { width: 90, height: 90 }
                        : { width: 52, height: 32 };
                    return (
                      <ProfilePageCard
                        key={`card-${data.label}`}
                        data-testid={`card-${data.label}`}
                        hasError={false}
                      >
                        {!isMobile && <IconComponent label={data.label} {...size} />}
                        <UserAndEmailContainer label={`${t(data.label)}*`} value={data.value} />
                      </ProfilePageCard>
                    );
                  })}
                <ProfilePageCard hasError={!player?.mobilePhone && phoneHasError}>
                  <PhoneContainer
                    t={t}
                    mobilePhone={player ? player?.mobilePhone : null}
                    countryCode={player ? player.countryCode : null}
                    isMobile={isMobile}
                    displayToast={displayToast}
                    setPhoneHasError={setPhoneHasError}
                  />
                </ProfilePageCard>
              </ProfilePageInfoContainer>
            </ProfilePageContainer>
            <ChangePasswordContianer>
              <ProfilePageHeader size="b2">{t('changePassword')}</ProfilePageHeader>
              {!isMobile ? (
                <ChangePasswordForm displayToast={displayToast} />
              ) : (
                <ChangePassowrdButton
                  icon={<LockIcon width="20" height="20" fill="var(--soft-blue-100)" />}
                  variant="Secondary"
                  handleClick={handleChangePassword}
                >
                  <ChangePasswordButtonText size="b2">
                    {t('changePassword')}
                  </ChangePasswordButtonText>
                </ChangePassowrdButton>
              )}
            </ChangePasswordContianer>
          </ProfilePageWrapper>
          <ReceivePromoContainer>
            <Typography size="h5" color="var(--white)">
              {t('marketingOptAcctSettings')}
            </Typography>
            <ToggleCheckbox isActive={!isActivePromotion} onClick={toggleActivePromotion} />
          </ReceivePromoContainer>
        </>
      ) : (
        <ChangePasswordForm displayToast={displayToast} />
      )}
      {toastProps && <CustomToast key={Math.random()} {...toastProps} />}
    </>
  );
};
export default GeneralSettings;
