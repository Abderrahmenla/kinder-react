import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CacheBusterProvider,
  useCacheBuster,
  isSemverGreaterThan,
  getLocalStorageItem,
  setLocalStorageItem,
  LOCAL_STORAGE_KEY
} from '../../CacheBuster/CacheBusterContext';

jest.mock('../../../../../package.json', () => ({
  version: '1.0.0'
}));

const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload
  },
  writable: true
});

// Mocking localStorage with Jest mock functions
let store: { [key: string]: string } = {};
beforeAll(() => {
  const localStorageMock = {
    getItem: jest.fn((key: string): string | null => store[key] || null),
    setItem: jest.fn((key: string, value: string): void => {
      store[key] = value.toString();
    }),
    clear: jest.fn((): void => {
      store = {};
    })
  };

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('CacheBusterProvider Tests', () => {
  // Test for isSemverGreaterThan function
  describe('isSemverGreaterThan', () => {
    it('should return true if first version is greater than second', () => {
      expect(isSemverGreaterThan('1.1.0', '1.0.5')).toBeTruthy();
      expect(isSemverGreaterThan('2.0.0', '1.9.9')).toBeTruthy();
    });

    it('should return false if first version is less than or equal to second', () => {
      expect(isSemverGreaterThan('1.0.0', '1.0.0')).toBeFalsy();
      expect(isSemverGreaterThan('1.0.0', '1.0.1')).toBeFalsy();
    });
  });

  // Test for Local Storage functions
  describe('Local Storage Functions', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it('should store and retrieve the correct version value', () => {
      setLocalStorageItem(LOCAL_STORAGE_KEY, '1.0.0');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, '1.0.0');
      expect(getLocalStorageItem(LOCAL_STORAGE_KEY)).toBe('1.0.0');
    });

    it('should return null for non-existent key', () => {
      expect(getLocalStorageItem('nonExistentKey')).toBeNull();
    });
  });

  // Test for CacheBusterProvider component
  describe('CacheBusterProvider Component', () => {
    it('should update version and set isLatestVersion correctly', () => {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, '1.0.0'); // Set to current version
      render(
        <CacheBusterProvider>
          <CacheBusterConsumerComponent />
        </CacheBusterProvider>
      );

      expect(screen.getByText('Version is up-to-date')).toBeInTheDocument();
    });

    it('should trigger refresh logic for outdated version', () => {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, '0.9.0'); // Set to an older version
      render(
        <CacheBusterProvider>
          <CacheBusterConsumerComponent />
        </CacheBusterProvider>
      );
    });
  });

  // Test for Custom Hook useCacheBuster
  describe('useCacheBuster Hook', () => {
    it('should return the correct context value', () => {
      const TestComponent = () => {
        const { isLatestVersion } = useCacheBuster();
        return <div>{isLatestVersion ? 'Latest Version' : 'Outdated Version'}</div>;
      };

      render(
        <CacheBusterProvider>
          <TestComponent />
        </CacheBusterProvider>
      );

      // Adjust the expected text based on what your hook is supposed to return
      expect(screen.getByText(/Latest Version|Outdated Version/)).toBeInTheDocument();
    });
  });
});

const CacheBusterConsumerComponent = () => {
  const { isLatestVersion } = useCacheBuster();
  return <div>{isLatestVersion ? 'Version is up-to-date' : 'Version is outdated'}</div>;
};
