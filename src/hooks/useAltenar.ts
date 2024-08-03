import { isAltenarScriptInitialized } from '@/components/state/isAltenarScriptInitialized';
import { authState } from '@/components/state/isAuthenticated';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { initAltenarConfig, setAltenarConfig } from '@/utils/alternarUtils';
import { ALTENAR_CULTURE } from '../constants';
import { AlternarCultureTypes } from '@/graphql/types/sportsbookTypes';

function useAltenar() {
  const [isAltenarInitialized, setIsAltenarInitialized] = useRecoilState(
    isAltenarScriptInitialized
  );
  const { token } = useRecoilValue(authState);

  useEffect(() => {
    const init = () => {
      const pathSegments = window.location.pathname.split('/');
      const urlLocale = pathSegments[1] || '';
      const alternarCulture = ALTENAR_CULTURE[urlLocale as keyof AlternarCultureTypes];
      if (window['altenarWSDK']) {
        initAltenarConfig({
          integration: 'spinbet',
          culture: alternarCulture ?? ALTENAR_CULTURE.en
        });
        setIsAltenarInitialized(true);
      } else {
        setTimeout(() => {
          init();
        }, 1500);
      }
    };

    if (!isAltenarInitialized) {
      init();
    }
  }, [isAltenarInitialized, setIsAltenarInitialized]);

  useEffect(() => {
    if (isAltenarInitialized) {
      setAltenarConfig({ token: token ? token : '' });
    }
  }, [token, isAltenarInitialized]);

  return { isInitialized: isAltenarInitialized };
}

export default useAltenar;
