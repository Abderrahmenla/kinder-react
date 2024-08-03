import Typography from '@mui/material/Typography';
import FormGroupButton from '../Auth/FormButton';
import { AlertDialogsContainer } from './AlertDialogsStyle';
import { FC } from 'react';

const WarningIcon = () => {
  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="warning-icon"
    >
      <circle cx="23.5" cy="23.5" r="23.5" fill="#F5CE00" />
      <path
        d="M27.4641 11C25.9245 8.33334 22.0755 8.33333 20.5359 11L11.0096 27.5C9.47002 30.1667 11.3945 33.5 14.4737 33.5H33.5263C36.6055 33.5 38.53 30.1667 36.9904 27.5L27.4641 11Z"
        stroke="white"
        strokeWidth="2"
      />
      <path d="M24 17L24 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="28" r="1" fill="white" />
    </svg>
  );
};

const SuccessIcon = () => {
  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="success-icon"
    >
      <circle cx="23.5" cy="23.5" r="23.5" fill="#00F566" />
      <path
        d="M36.3327 22.3723C37.1709 29.2248 32.2954 35.4594 25.4429 36.2975C18.5904 37.1357 12.3559 32.2602 11.5177 25.4077C10.6795 18.5552 15.555 12.3207 22.4075 11.4825C25.4862 11.1059 28.4402 11.8827 30.8361 13.4739"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 21.5002L23.5 28.0002L33.5 17.0002"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ErrorIcon = () => {
  return (
    <svg
      width="82"
      height="82"
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="error-icon"
    >
      <circle cx="41" cy="41" r="41" fill="#F53B00" />
      <circle
        cx="41"
        cy="41"
        r="22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M49 32.75L33.0005 48.7495"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.001 32.75L49.0004 48.7495"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type AlertDialogsProps = {
  type: 'success' | 'warning' | 'error';
  title: string;
  buttonLabel?: string;
};

const AlertDialogs: FC<AlertDialogsProps> = ({ type, title, buttonLabel }) => {
  return (
    <AlertDialogsContainer data-testid="alert-dialog">
      {type === 'success' && (
        <>
          <SuccessIcon />
          <Typography variant="subtitle2" color="white" fontWeight="700" marginTop="22px">
            {title}
          </Typography>
        </>
      )}
      {type === 'warning' && (
        <>
          <WarningIcon />
          <Typography variant="subtitle2" color="white" fontWeight="700" marginTop="22px">
            {title}
          </Typography>
          {buttonLabel && <FormGroupButton name={buttonLabel} />}
        </>
      )}
      {type === 'error' && (
        <>
          <ErrorIcon />
          <Typography variant="subtitle2" color="white" fontWeight="700" marginTop="22px">
            {title}
          </Typography>
        </>
      )}
    </AlertDialogsContainer>
  );
};

export { AlertDialogs };
