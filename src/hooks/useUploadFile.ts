import { ErrorResponse } from '@/pages/api/types';
import { apiClient } from '@/services/clientAxios';
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

function useUploadFile() {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const uploadFile = (
    file: File,
    succeddHandler: (file: File) => void,
    errorHandler: () => void,
    progressHandler: (e: AxiosProgressEvent) => void,
    abortHandler: () => void,
    uploadAbortController: AbortController | undefined
  ) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        'X-File-Name': file.name.replace(/\s/g, '_'),
        'X-File-Size': file.size.toString(),
        'X-File-Type': file.type,
        'X-File': file.name.replace(/\s/g, '_')
      },
      signal: uploadAbortController?.signal,
      onUploadProgress: progressHandler
    };

    axios
      .post('uploadFile', formData, config)
      .then(() => {
        succeddHandler(file);
      })
      .catch((error) => {
        if (error) {
          error.code === 'ERR_CANCELED' ? abortHandler() : errorHandler();
        }
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const submitFile = useCallback(
    async (
      file: File | null,
      category: string,
      submitSuccess: (response: AxiosResponse<any, any>) => void,
      submitError: (error: AxiosError<ErrorResponse>) => void
    ) => {
      if (file) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('DocumentCategory', category);

        try {
          const response = await apiClient.post('/api/player/uploadDocument', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          submitSuccess(response);
        } catch (error) {
          submitError(error as AxiosError<ErrorResponse>);
        } finally {
          setIsLoading(false);
        }
      }
    },
    []
  );

  return {
    uploadFile,
    submitFile,
    isUploading,
    isLoading
  };
}

export default useUploadFile;
