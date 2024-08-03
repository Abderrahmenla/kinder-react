import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DocumentItem, documentsState } from '@/components/state/documentsState';
import { apiClient } from 'src/services/clientAxios';
import { useLoader } from './useLoader';

export const useGetPlayerDocuments = () => {
  const [documents, setDocuments] = useRecoilState(documentsState);
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');

  const fetchPlayerDocuments = async () => {
    toggleLoader(true);
    try {
      const response = await apiClient.get<DocumentItem[]>('/api/player/getDocuments');
      setDocuments(response.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      toggleLoader(false);
    }
  };

  useEffect(() => {
    fetchPlayerDocuments();
  }, []);

  return { documents, fetchPlayerDocuments, isLoading, loadingWrapper };
};
