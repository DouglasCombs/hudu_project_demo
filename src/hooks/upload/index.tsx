import React, {useRef, useCallback} from 'react';
import {useMutation} from '@tanstack/react-query';
import {uploadFile} from '~/services/fileUploader';

export const useUploadFile = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation(
    async (param: any) => {
      abortControllerRef.current = new AbortController();
      return uploadFile(param);
    },
    {
      onSuccess: () => {},
    },
  );

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    mutation.reset();
  }, [mutation.reset]);

  return {
    ...mutation,
    abortControllerRef,
    reset,
  };
};
