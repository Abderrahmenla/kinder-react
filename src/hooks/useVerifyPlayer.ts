import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiClient } from 'src/services/clientAxios';
import { pepSanctionedState } from '@/components/state/pepSanctionedState';
import { showPepSanctionedPopupState } from '@/components/state/showPepSanctionedPopup';
import { sanctionedPopupCaptionState } from '@/components/state/sanctionedPopupCaptionState';
import { playerState } from '@/components/state/playerState';

const verifyPlayerFetcher = async () => {
  try {
    const response = await apiClient.get('/api/player/verifyPlayer');
    return { sucessful: true, data: response.data };
  } catch (error) {
    console.error(error);
    return { sucessful: false, data: {} };
  }
};

export const useVerifyPlayer = () => {
  const [pepSanctionedStatus, setPepSanctioned] = useRecoilState(pepSanctionedState);
  const [showPepSanctionedPopup, setShowPepSanctionedPopup] = useRecoilState(
    showPepSanctionedPopupState
  );
  const [sanctionedPopupCaption, setSanctionedPopupCaption] = useRecoilState(
    sanctionedPopupCaptionState
  );
  const player = useRecoilValue(playerState);

  const verifyPlayer = useCallback(async () => {
    if (player) {
      const { PEP, SANC } = player.customParameters;
      if (PEP.trim().length > 0 || SANC.trim().length > 0) {
        setPepSanctioned({
          verified: true,
          isPEP: PEP == 'True',
          isSanctioned: SANC == 'True'
        });
      } else {
        const verifyResponse = await verifyPlayerFetcher();
        if (verifyResponse.sucessful) {
          setPepSanctioned(verifyResponse.data);
        } else {
          console.error('Something went wrong verifying player status.');
        }
      }
    }
  }, [setPepSanctioned, player]);

  const updatedPlayerVerificationStatus = useCallback(
    async (caption: string) => {
      try {
        const response = await apiClient.put('/api/player/updatePlayer', {
          player: player
        });
        if (response) {
          //IF verification status returns false
          const verifyResponse = await verifyPlayerFetcher();
          if (verifyResponse.sucessful) {
            setPepSanctioned(verifyResponse.data);
            if (verifyResponse.data && verifyResponse.data?.isSanctioned) {
              setShowPepSanctionedPopup(true);
              setSanctionedPopupCaption(caption);
            }
          } else {
            console.error('Something went wrong verifying player status.');
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [player, setShowPepSanctionedPopup, setSanctionedPopupCaption, setPepSanctioned]
  );

  const isSanctionedHandler = useCallback(
    (caption: string) => {
      if (pepSanctionedStatus?.isSanctioned) {
        setShowPepSanctionedPopup(true);
        setSanctionedPopupCaption(caption);
        return true;
      } else {
        return false;
      }
    },
    [pepSanctionedStatus, setShowPepSanctionedPopup, setSanctionedPopupCaption]
  );

  return {
    verifyPlayer,
    isSanctionedHandler,
    sanctionedPopupCaption,
    pepSanctionedStatus,
    showPepSanctionedPopup,
    setShowPepSanctionedPopup,
    updatedPlayerVerificationStatus
  };
};
