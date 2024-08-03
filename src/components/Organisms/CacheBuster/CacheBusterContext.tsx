import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from 'react';
import packageJson from '../../../../package.json';
export const LOCAL_STORAGE_KEY = 'appVersion';

interface CacheBusterContextValue {
  isLatestVersion: boolean;
  refreshCacheAndReload: () => void;
}

interface CacheBusterProviderProps {
  children: ReactNode;
}
export const CacheBusterContext = createContext<CacheBusterContextValue>({
  isLatestVersion: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshCacheAndReload: () => {}
});

export const useCacheBuster = () => useContext(CacheBusterContext);

export const isSemverGreaterThan = (versionA: string, versionB: string): boolean => {
  const versionsA = versionA.split(/\./g).map(Number);
  const versionsB = versionB.split(/\./g).map(Number);

  for (let i = 0; i < Math.max(versionsA.length, versionsB.length); i++) {
    const a = versionsA[i] || 0;
    const b = versionsB[i] || 0;

    if (a !== b) {
      return a > b;
    }
  }

  return false;
};

export const getLocalStorageItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing localStorage', error);
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error accessing localStorage', error);
  }
};

const refreshCacheAndReload = () => {
  if (typeof window !== 'undefined' && 'caches' in window) {
    window.caches.keys().then((names) => {
      Promise.all(names.map((name) => window.caches.delete(name))).then(() => {
        window.location.reload();
      });
    });
  }
};

export const CacheBusterProvider: FC<CacheBusterProviderProps> = ({ children }) => {
  const [isLatestVersion, setIsLatestVersion] = useState(false);

  useEffect(() => {
    const currentVersion = packageJson.version;
    const localVersion = getLocalStorageItem(LOCAL_STORAGE_KEY);

    const shouldForceRefresh = isSemverGreaterThan(currentVersion, localVersion || '');

    if (shouldForceRefresh) {
      setLocalStorageItem(LOCAL_STORAGE_KEY, currentVersion);
      refreshCacheAndReload();
    } else {
      setLocalStorageItem(LOCAL_STORAGE_KEY, currentVersion);
      setIsLatestVersion(true);
    }
  }, []);

  return (
    <CacheBusterContext.Provider value={{ isLatestVersion, refreshCacheAndReload }}>
      {children}
    </CacheBusterContext.Provider>
  );
};
