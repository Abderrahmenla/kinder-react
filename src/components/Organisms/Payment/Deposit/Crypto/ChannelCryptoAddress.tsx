import React, { useState } from 'react';
import {
  ChannelLabel,
  ChannelQRCodeContainer,
  ChannelQRCode,
  ChannelQRCodeLabel,
  Toast,
  ChannelFieldWrapper,
  ChannelFieldContainer,
  ChannelField
} from './ChannelStyle';
import QRCode from 'react-qr-code';
import { Crypto, Channel } from '@/components/state/payment/cryptoState';
import { useTranslations } from '@/hooks/useTranslations';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Image from 'next/image';
import { assets as assetPath } from '@/config/assets';

type ChannelCryptoAddressProps = {
  selectedCrypto: Crypto;
  selectedChannel: Channel | null;
};

export const ChannelCryptoAddress: React.FC<ChannelCryptoAddressProps> = ({
  selectedCrypto,
  selectedChannel
}) => {
  const { t } = useTranslations();
  const [showAddressToast, setShowAddressToast] = useState(false);
  const [showTagToast, setShowTagToast] = useState(false);

  const [, copy] = useCopyToClipboard();

  const copyToClipboard = (field: string) => {
    if (selectedChannel && selectedChannel.address && field === 'address') {
      copy(selectedChannel.address);
      setShowAddressToast(true);
      setTimeout(() => {
        setShowAddressToast(false);
      }, 3000);
    } else if (selectedChannel && selectedChannel.tag) {
      copy(selectedChannel.tag);
      setShowTagToast(true);
      setTimeout(() => {
        setShowTagToast(false);
      }, 3000);
    }
  };

  return (
    <>
      <ChannelFieldWrapper>
        {showAddressToast && <Toast size="b3">{t('addressCopied')}</Toast>}{' '}
        <ChannelLabel size="b3">{`${selectedCrypto.name} deposit address`}</ChannelLabel>
        <ChannelFieldContainer>
          <ChannelField size="b3">
            {selectedChannel && selectedChannel.address ? selectedChannel.address : ''}
          </ChannelField>
          <div onClick={() => copyToClipboard('address')} style={{ cursor: 'pointer' }}>
            <Image src={`${assetPath}/images/copy.svg`} alt="copy-icon" width={16} height={16} />
          </div>
        </ChannelFieldContainer>
      </ChannelFieldWrapper>

      {selectedChannel?.protocol === 'XRP' && (
        <ChannelFieldWrapper>
          {showTagToast && <Toast size="b3">{t('tagCopied')}</Toast>}
          <ChannelLabel size="b3">{t('destinationTag')}</ChannelLabel>
          <ChannelFieldContainer>
            <ChannelField size="b3">
              {selectedChannel && selectedChannel.tag ? selectedChannel.tag : ''}
            </ChannelField>
            <div onClick={() => copyToClipboard('tag')} style={{ cursor: 'pointer' }}>
              <Image src={`${assetPath}/images/copy.svg`} alt="copy-icon" width={16} height={16} />
            </div>
          </ChannelFieldContainer>
        </ChannelFieldWrapper>
      )}

      <ChannelQRCodeContainer>
        <ChannelQRCode>
          <QRCode
            value={selectedChannel?.address || ''}
            size={256}
            style={{ width: '105px', height: '105px', maxWidth: '100%' }}
          />
        </ChannelQRCode>
        <ChannelQRCodeLabel size="p1">
          {`Only send ${selectedCrypto.code} to this address via ${selectedChannel?.protocol} network`}
        </ChannelQRCodeLabel>
      </ChannelQRCodeContainer>
    </>
  );
};

export default ChannelCryptoAddress;
