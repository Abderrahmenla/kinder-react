import { useCallback, useEffect, useRef } from 'react';
import {
  UNIBO_SCRIPT_ID,
  UNIBO_SETTINGS
} from '@/components/Atoms/UniboOverlay/UniboOverlay.constants';
import { UniboOverlayProps } from '@/components/Atoms/UniboOverlay/UniboOverlay.types';
import {
  areUniboCookiesSet,
  handleCleanUpUnibo,
  createUniboScript,
  setUniboCookies
} from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';

const UniboOverlay: React.FC<UniboOverlayProps> = ({ children, externalId }) => {
  const timeoutId = useRef<NodeJS.Timeout | undefined>();

  const handleUniboInitialization = useCallback((uniboOverlayInstance: any) => {
    const areCookiesReady = areUniboCookiesSet();
    const isScriptLoaded = document.getElementById(UNIBO_SCRIPT_ID) !== null;

    if (isScriptLoaded && areCookiesReady && uniboOverlayInstance) {
      try {
        uniboOverlayInstance.init();
        /* eslint-disable no-console */
        console.info('Unibo is initialized');
      } catch (error) {
        console.error('Error during Unibo initialization:', error);
      }
    } else {
      /* eslint-disable no-console */
      console.info(
        'Unibo not initialized',
        'loaded:',
        isScriptLoaded,
        'cookies:',
        areCookiesReady,
        'instance:',
        !!uniboOverlayInstance
      );
    }
  }, []);

  const handleCreateUniboInstance = useCallback(() => {
    try {
      const UniboOverlay = window.UniboOverlay;
      const overlayInstance = new UniboOverlay(UNIBO_SETTINGS);
      /* eslint-disable no-console */
      console.info('Unibo instance created');
      return overlayInstance;
    } catch (error) {
      console.error('Error creating Unibo instance:', error);
      return null;
    }
  }, [handleUniboInitialization]);

  const checkAndRetryUniboOverlay = useCallback(() => {
    if (window.UniboOverlay !== undefined) {
      const overlayInstance = handleCreateUniboInstance();
      handleUniboInitialization(overlayInstance);
      clearTimeout(timeoutId.current);
    } else {
      createUniboScript();
      setUniboCookies(externalId);
      timeoutId.current = setTimeout(checkAndRetryUniboOverlay, 1000);
    }
  }, [timeoutId, handleCreateUniboInstance, externalId]);

  useEffect(() => {
    checkAndRetryUniboOverlay();

    return () => {
      handleCleanUpUnibo(['unibo_gameId']);
      if (timeoutId.current !== undefined) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return <div id="unibo-overlay">{children}</div>;
};

export default UniboOverlay;
