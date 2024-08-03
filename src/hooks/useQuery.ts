import { useCallback, useEffect, useState } from 'react';
import { STATUSES, StatusValues } from '../constants';
import { AxiosError } from 'axios';

export function useQuery<T>({ fetcher }: { fetcher: any }) {
  const [loadingStatus, setLoadingStatus] = useState<StatusValues>(STATUSES.IDLE);
  const [error, setError] = useState<unknown>(); // @TODO: WIP. We don't know how the error is structured yet.
  const [data, setData] = useState<T>();

  const fetch = useCallback(async () => {
    try {
      setLoadingStatus(STATUSES.PENDING);
      const response = await fetcher();
      setLoadingStatus(STATUSES.RESOLVED);
      setData(response?.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      } else {
        setError(error);
      }
      setLoadingStatus(STATUSES.FAILED);
    }
  }, [fetcher]);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    refetch: fetch,
    loadingStatus,
    isLoading: loadingStatus === STATUSES.PENDING,
    error,
    isError: Boolean(error),
    data
  };
}
