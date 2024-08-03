import { alternarInstanceState } from '@/components/state/altenarInstanceState';
import { openAuthPageState } from '@/components/state/openAuthPageState';
import { useAccountBalance } from '@/hooks/useGetBalance';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export interface SportsTemplateProps {
  containerId: string;
  sportsBookProps: AltenarWSDKAddSportsBookParamsPropsObj;
}
const SportsTemplate: React.FC<SportsTemplateProps> = (template) => {
  const setOpenAuth = useSetRecoilState(openAuthPageState);
  const { refresh: fetchAccountBalance } = useAccountBalance(); // Will refresh every 15 seconds
  const setAltenarInstance = useSetRecoilState(alternarInstanceState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sportsBookContainer = document.getElementById('sportsbook-page');

      const inst = window['altenarWSDK']?.addSportsBook({
        container: sportsBookContainer,
        props: {
          ...template.sportsBookProps,
          onSignInButtonClick: () => setOpenAuth({ open: true }),
          onBetPlacement: () => {
            fetchAccountBalance();
          }
        }
      });
      setAltenarInstance(inst);
    }
  }, [template, fetchAccountBalance, setOpenAuth, setAltenarInstance]);

  return <div id="sportsbook-page" aria-label={template.containerId} />;
};

export default SportsTemplate;
