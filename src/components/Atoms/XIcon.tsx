import React from 'react';
import { CloseIconContainer } from '../Organisms/Rewards/Card.style';

interface IXIconProps {
  onClick: VoidFunction;
}

const XIcon: React.FC<IXIconProps> = ({ onClick }) => {
  return (
    <CloseIconContainer onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="14"
        fill="none"
        viewBox="0 0 15 14"
      >
        <path
          stroke="#9D81EA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 13l6.327-6m6.327-6L7.326 7m0 0L1 1m6.327 6l6.327 6"
        ></path>
      </svg>
    </CloseIconContainer>
  );
};

export default XIcon;
