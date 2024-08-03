import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ConfirmationAlert } from '@/components/Atoms/ConfirmationAlert';
import ConfirmationIcon from '@/components/Atoms/ConfirmationIcon';
import { PlayerBonusesResponse } from '@/pages/api/rewards/types';
import { useTranslations } from '@/hooks/useTranslations';
import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import { css } from '@emotion/react';
import DialogBodyContentFirstTimeBonus from './DialogBodyContentFirstTimeBonus';
import { declineFirstTimeBonusOfferState } from '@/components/state/declineFIrstTimeBonusOffer';

interface IFirstTimeBonuses {
  promotions: PlayerBonusesResponse[];
  isModalOpen?: boolean;
  onModalClose?: () => void;
  refetchPromotions: () => void;
}

const FirstTimeBonus = ({
  promotions,
  onModalClose,
  isModalOpen = false,
  refetchPromotions
}: IFirstTimeBonuses) => {
  const { t } = useTranslations();
  const [open, setOpen] = useState(isModalOpen);
  const [confirmDecline, setConfirmDecline] = useState(false);
  const setHasDeclineBonus = useSetRecoilState(declineFirstTimeBonusOfferState);

  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen]);

  const declineBonus = () => {
    setHasDeclineBonus(true);
  };

  const handleClose = () => {
    setOpen(false);
    onModalClose?.();
  };

  return (
    <div>
      {confirmDecline && (
        <ConfirmationAlert
          onConfirm={declineBonus}
          onClose={() => {
            setOpen(true);
            setConfirmDecline(false);
          }}
          title="areYouSure?"
          caption={t('cancelBonusConfirmationCaption')}
          IconComponent={<ConfirmationIcon />}
          isLoading={false}
          loaderType="coin"
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableHeader
        bodyStyles={css({
          background:
            'radial-gradient(240.88% 32.8% at 50.1% 98.55%, rgba(118, 54, 183, 0.20) 0%, rgba(118, 54, 183, 0.00) 100%), radial-gradient(124.47% 48.87% at 47.23% -18.52%, rgba(118, 54, 183, 0.50) 0%, rgba(118, 54, 183, 0.00) 100%), #211442'
        })}
        bodyContent={() => (
          <DialogBodyContentFirstTimeBonus
            promotions={promotions}
            refetchPromotions={refetchPromotions}
            setConfirmDecline={setConfirmDecline}
            setOpen={setOpen}
          />
        )}
      />
    </div>
  );
};

export default FirstTimeBonus;
