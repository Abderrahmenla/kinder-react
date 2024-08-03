import { useState } from 'react';
import { STATUSES, StatusValues } from '../constants';

export function useMutation<T>({ fetcher }: { fetcher: any }) {
  const [loadingStatus, setLoadingStatus] = useState<StatusValues>(STATUSES.IDLE);
  const [error, setError] = useState<unknown>(); // @TODO: WIP. We don't know how the error is structured yet.
  const [data, setData] = useState<T>();

  async function mutateAsync(data: any) {
    try {
      setLoadingStatus(STATUSES.PENDING);
      const response = await fetcher(data);
      setLoadingStatus(STATUSES.RESOLVED);
      setData(response);
      return response;
    } catch (error) {
      setError(error);
      setLoadingStatus(STATUSES.FAILED);
      throw error;
    }
  }

  return {
    loadingStatus,
    mutateAsync,
    isLoading: loadingStatus === STATUSES.PENDING,
    isError: Boolean(error),
    error,
    data
  };
}
