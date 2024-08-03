import React from 'react';

interface BetSlipProps {
  hover: boolean;
}

const BetSlip: React.FC<BetSlipProps> = ({ hover }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={20} fill="none">
      <style>
        {`
                .path-color1 {
                    transition: fill 0.3s ease;
                    transition-delay: 0.2s;
                }

                .path-color2 {
                    transition: fill 0.3s ease;
                    transition-delay: 0.1s;
                }
            `}
      </style>
      <path
        fill={hover ? 'white' : '#9D81EA'}
        stroke={hover ? 'white' : '#9D81EA'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M15 3.341v15.86l-3.5-1.4-3.5 1.4-3.5-1.4-3.5 1.4V3.341c0-1.034.752-1.92 1.78-2.039a45.272 45.272 0 0 1 10.44 0c1.027.12 1.78 1.005 1.78 2.04Z"
      />
      <path
        stroke={hover ? 'white' : '#31205B'}
        strokeLinecap="round"
        strokeWidth={0.933}
        d="M4.734 6.133h6.533M4.734 8.467h6.533"
      />
      <path
        fill={hover ? 'white' : '#31205B'}
        d="M4.267 10.8c0-.258.209-.466.466-.466h4.2a.467.467 0 1 1 0 .933h-4.2a.467.467 0 0 1-.466-.467Z"
      />
    </svg>
  );
};

export default BetSlip;
