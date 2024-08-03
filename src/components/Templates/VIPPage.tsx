import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import CashbackTab from '../Organisms/VIP/CashbackTab';
import RakebackTab from '../Organisms/VIP/RakebackTab';
import TiersTab from '../Organisms/VIP/TiersTab';
import StatusTab from '../Organisms/VIP/StatusTab';
import { openVIPPageState } from '../state/openVIPPageState';
import { VIPBodyStyle, ModalTabContent, VIPModalSection, VIPMoreLinkRow } from './VIPPageStyle';
import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import { useTranslations } from '@/hooks/useTranslations';
import Switcher from '../Atoms/Switcher/Switcher';
import Typography from '../Atoms/Typography/Typography';

const VIPIcon = () => {
  return (
    <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.42568 15.839L5.77639 12.9751C5.81293 12.8932 5.8724 12.8237 5.94761 12.7749C6.02282 12.7261 6.11055 12.7001 6.2002 12.7001C6.28985 12.7001 6.37758 12.7261 6.45278 12.7749C6.52799 12.8237 6.58746 12.8932 6.624 12.9751L7.97602 15.839L10.996 16.3018C11.3834 16.3603 11.5368 16.8595 11.256 17.1455L9.07193 19.3725L9.58674 22.5198C9.65304 22.9241 9.24873 23.2322 8.90163 23.0411L6.2002 21.5552L3.49876 23.0411C3.15166 23.2322 2.74736 22.9241 2.81366 22.5211L3.32846 19.3725L1.14444 17.1455C0.862334 16.8595 1.01704 16.3603 1.40444 16.3005L4.42568 15.839ZM20.0259 15.839L21.3766 12.9751C21.4131 12.8932 21.4726 12.8237 21.5478 12.7749C21.623 12.7261 21.7107 12.7001 21.8004 12.7001C21.89 12.7001 21.9778 12.7261 22.053 12.7749C22.1282 12.8237 22.1876 12.8932 22.2242 12.9751L23.5762 15.839L26.5961 16.3018C26.9835 16.3603 27.1369 16.8595 26.8561 17.1455L24.6721 19.3725L25.1869 22.5198C25.2532 22.9241 24.8489 23.2322 24.5018 23.0411L21.8004 21.5552L19.0989 23.0411C18.7518 23.2322 18.3475 22.9241 18.4138 22.5211L18.9286 19.3725L16.7446 17.1455C16.4638 16.8595 16.6172 16.3603 17.0046 16.3005L20.0259 15.839ZM12.2258 4.13887L13.5765 1.27494C13.613 1.19308 13.6725 1.12355 13.7477 1.07476C13.8229 1.02596 13.9106 1 14.0003 1C14.0899 1 14.1777 1.02596 14.2529 1.07476C14.3281 1.12355 14.3876 1.19308 14.4241 1.27494L15.7761 4.13887L18.796 4.60168C19.1834 4.66018 19.3368 5.15939 19.056 5.44539L16.872 7.67232L17.3868 10.8197C17.4531 11.224 17.0488 11.5321 16.7017 11.341L14.0003 9.85504L11.2989 11.341C10.9518 11.5321 10.5474 11.224 10.6137 10.821L11.1286 7.67232L8.94453 5.44539C8.66242 5.15939 8.81713 4.66018 9.20453 4.60038L12.2258 4.13887Z"
        stroke="#9D81EA"
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3388 4.13887L13.6895 1.27494C13.726 1.19308 13.7855 1.12355 13.8607 1.07476C13.9359 1.02596 14.0236 1 14.1133 1C14.2029 1 14.2907 1.02596 14.3659 1.07476C14.4411 1.12355 14.5005 1.19308 14.5371 1.27494L15.8891 4.13887L18.909 4.60168C19.2964 4.66018 19.4498 5.15939 19.169 5.44539L16.985 7.67232L17.4998 10.8197C17.5661 11.224 17.1618 11.5321 16.8147 11.341L14.1133 9.85504L11.4119 11.341C11.0647 11.5321 10.6604 11.224 10.7267 10.821L11.2415 7.67232L9.05752 5.44539C8.77542 5.15939 8.93012 4.66018 9.31753 4.60038L12.3388 4.13887Z"
        fill="#9D81EA"
        stroke="#9D81EA"
        strokeWidth="1.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface VIPPageProps {
  handleClose?: () => void;
}

const VIPPage: React.FC<VIPPageProps> = ({ handleClose }) => {
  const { t } = useTranslations();
  const [activeAwards, setActiveAward] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const { open } = useRecoilValue(openVIPPageState);
  const handleToggle = (index: number) => {
    setActiveTab(index);
  };

  const renderHeaderContent = () => {
    return (
      <>
        <VIPIcon /> <span>{t('vip')}</span>
      </>
    );
  };

  const renderBodyContent = () => {
    return (
      <>
        <VIPModalSection>
          <Switcher
            handleToggle={handleToggle}
            options={[
              {
                title: t('status')
              },
              {
                title: t('tiers')
              },
              {
                title: t('rakeback')
              },
              {
                title: t('cashback')
              }
            ]}
            tabSwitcherStyles={{
              height: '44px'
            }}
          />
        </VIPModalSection>
        <ModalTabContent>
          {activeTab === 0 && <StatusTab />}
          {activeTab === 1 && <TiersTab activeAwards={activeAwards} setAward={setAward} />}
          {activeTab === 2 && <RakebackTab />}
          {activeTab === 3 && <CashbackTab />}
        </ModalTabContent>
        <VIPMoreLinkRow>
          <Link href="/vip-program" onClick={handleClose}>
            <Typography size={'b2'} type={'Body'}>
              {t('learnMore')}
            </Typography>
          </Link>
        </VIPMoreLinkRow>
      </>
    );
  };

  const setAward = (award: string) => () => {
    const awards = [...activeAwards];
    const idx = awards.indexOf(award);
    if (idx !== -1) {
      awards.splice(idx, 1);
      setActiveAward(awards);
    } else setActiveAward([...activeAwards, award]);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      headerContent={renderHeaderContent}
      bodyContent={renderBodyContent}
      headerDivider
      dialogBodyStyle={VIPBodyStyle}
    />
  );
};

export default VIPPage;
