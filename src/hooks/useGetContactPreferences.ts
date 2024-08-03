import { ContactPreferences } from './../pages/api/player/getContactPreferencesTypes';
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { useRecoilValue } from 'recoil';
import { authState } from '@/components/state/isAuthenticated';

export const useContactPreferences = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const [contactPreferences, setContactPreferences] = useState<ContactPreferences | null>(null);

  const fetchContactPreferences = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const response = await apiClient.get<ContactPreferences>('/api/player/getContactPreferences');
      setContactPreferences(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchContactPreferences();
  }, [fetchContactPreferences, isAuthenticated]);

  return { contactPreferences };
};
