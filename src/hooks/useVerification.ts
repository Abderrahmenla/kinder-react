import { formVerificationCompletedState } from '@/components/state/verificationCompleted';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { Countries, PlayerData } from './types';
import { VerificationFormState } from '@/components/Molecules/VerificationModalForm/VerificationModalForm.types';

const useVerification = () => {
  const setIsFormFilledFully = useSetRecoilState(formVerificationCompletedState);

  const sanitizePlayer = useCallback(
    (
      player: PlayerData | null,
      setFormState: (formState: VerificationFormState) => void,
      countries: Countries[]
    ) => {
      if (!player) return;

      const { firstName, lastName } = player;
      const sanitizedFirstName =
        player?.firstName.toLowerCase() === 'john' && lastName.toLowerCase() === 'doe'
          ? ''
          : player?.firstName;
      const sanitizedLastName =
        player?.lastName.toLowerCase() === 'doe' && firstName.toLowerCase() === 'john'
          ? ''
          : player?.lastName;
      const country = countries.find((c) => c.code === player?.countryCode);
      setFormState({
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        country: country?.name ? country.name : '',
        countryCode: player?.countryCode ? player?.countryCode : '',
        address: player?.street || '',
        city: player?.city || '',
        state: player?.stateProvince || '',
        postalCode: player?.postalCode || ''
      });
      if (
        player?.firstName &&
        player?.firstName.toLowerCase() !== 'john' &&
        player?.lastName &&
        player?.lastName.toLowerCase() !== 'doe' &&
        country?.name !== '' &&
        player?.stateProvince &&
        player?.postalCode &&
        player?.city &&
        player?.street
      ) {
        setIsFormFilledFully(true);
      }
    },
    [setIsFormFilledFully]
  );

  return {
    sanitizePlayer
  };
};

export default useVerification;
