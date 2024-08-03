import { Box } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { assets } from '@/config/assets';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterProps {
  closeModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ closeModal }) => {
  const { t } = useTranslations();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={0.5}
      borderTop="1px solid var(--very-dark-violet)"
      marginTop={1.5}
      marginLeft={-0.5}
      width="100%"
      sx={{
        paddingY: '10px'
      }}
    >
      <Image width={20} height={20} alt="Info" src={`${assets}/images/info_white.svg`} />
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: '10px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '14px'
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'var(--soft-blue-100)'
          }}
          href="/policies/bonus-terms"
          onClick={closeModal}
        >
          {t('showMoreInformationAboutOurBonusProgram')}
        </Link>
      </span>
    </Box>
  );
};

export default Footer;
