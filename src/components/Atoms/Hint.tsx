import { styled } from '@mui/material/styles';

export const HintIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 11.5V16.5M12 7.51L12.01 7.499M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
        stroke="#A391E2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Hint = styled('div')<{ centered?: boolean; topOffset?: boolean }>`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.03em;
  color: #a391e2;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
  margin-top: ${(props) => (props.topOffset ? '8px' : '0')};
`;
