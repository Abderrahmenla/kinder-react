import { Box, Typography } from '@mui/material';
import { AlertContainer, AlertContentContainer } from './Alert.styles';
import { useEffect, useState } from 'react';
import { Dialog } from './Dialog/Dialog';

export interface AlertProps {
  duration: number;
  message: string;
  icon: JSX.Element;
}

const Alert = ({ duration, message, icon }: AlertProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timeoutId = setTimeout(() => setShow(false), duration);

    return () => clearTimeout(timeoutId);
  }, [duration]);

  const DialogAlertBody = (
    <AlertContainer>
      <Box display="flex" justifyContent="flex-end" width={'100%'}>
        <svg
          style={{ height: 16, width: 16, color: 'var(--soft-violet)', cursor: 'pointer' }}
          onClick={() => setShow(false)}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-label="Close Icon"
        >
          <path
            d="M1 14L7.5 7.5M14 1L7.49876 7.5M7.49876 7.5L1 1M7.5 7.5L14 14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
      <AlertContentContainer>
        {icon}
        <Box marginTop={1.5}>
          <Typography fontSize={14} color="var(--white)" fontWeight={'bold'}>
            {message}
          </Typography>
        </Box>
      </AlertContentContainer>
    </AlertContainer>
  );
  return (
    <>
      <Dialog disableHeader open={show} maxWidth="336px" bodyContent={() => DialogAlertBody} />
    </>
  );
};

export default Alert;
