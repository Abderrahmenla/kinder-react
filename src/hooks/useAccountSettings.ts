import { playerState } from '@/components/state/playerState';
import { apiClient } from 'src/services/clientAxios';
import { formatPhoneNumber } from '@/utils/formatUtils/formatPhoneNumber';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ChangePasswordFormValues } from '@/components/Organisms/Settings/Profile/ChangePasswordForm/ChangePassword.type';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/pages/api/types';

function useAccountSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [player] = useRecoilState(playerState);

  const handleUpdatePhone = useCallback(
    async (phoneNumber: string, dialCode: string, sucessCallback: () => void) => {
      setIsLoading(true);

      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      const playerData = {
        player: {
          ...player,
          mobilePhone: dialCode + formattedPhoneNumber
        }
      };

      try {
        await apiClient.put('/api/player/updatePlayer', playerData);
        sucessCallback();
      } catch (error) {
        // handle error appropriately here
      }
    },
    [player]
  );

  const handleUpdatePassword = useCallback(
    async (
      formValues: ChangePasswordFormValues,
      sucessCallback: () => void,
      errorCallback: (error: AxiosError<ErrorResponse>) => void
    ) => {
      setIsLoading(true);
      try {
        const { oldPassword, newPassword } = formValues;
        const passwordData = {
          oldPassword: oldPassword,
          newPassword: newPassword
        };
        await apiClient.post('/api/player/changePassword', passwordData);
        // handle successful password change (e.g., navigate to another page, show a success message, etc.)
        sucessCallback();
      } catch (error) {
        // handle errors
        errorCallback(error as AxiosError<ErrorResponse>);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    handleUpdatePassword,
    handleUpdatePhone
  };
}

export default useAccountSettings;
