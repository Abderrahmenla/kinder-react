import { useState, useEffect } from 'react';
import { CustomToastProps } from '@/components/Atoms/CustomToast/CustomToast';

export interface UseCustomToastProps extends Omit<CustomToastProps, 'duration'> {
  duration?: number;
}

interface UseCustomToastResult {
  displayToast: (props: UseCustomToastProps) => void;
  toastProps: CustomToastProps | null;
}

const useCustomToast = (): UseCustomToastResult => {
  const [toastProps, setToastProps] = useState<CustomToastProps | null>(null);

  const displayToast = (props: UseCustomToastProps) => {
    setToastProps({
      ...props,
      duration: props.duration || 5000 // Default duration is 5000ms
    });
  };

  useEffect(() => {
    if (toastProps?.duration) {
      const timeoutId = setTimeout(() => {
        setToastProps(null);
      }, toastProps.duration);
      return () => clearTimeout(timeoutId); // Clean up on unmount or props change.
    }
  }, [toastProps]);

  return { displayToast, toastProps };
};

export default useCustomToast;
