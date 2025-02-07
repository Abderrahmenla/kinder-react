import React from 'react';

interface InfoIconProps {
  bgColor?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ bgColor = '#9D81EA' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
      <g fill={bgColor} clipPath="url(#clip0_1_937)">
        <path d="M9.375 0h1.25c.05.011.1.028.15.032 1.489.113 2.888.526 4.175 1.284 2.686 1.584 4.328 3.909 4.9 6.98.067.356.1.719.15 1.078v1.25c-.03.238-.054.477-.087.714-.338 2.353-1.35 4.37-3.105 5.97-2.538 2.317-5.526 3.14-8.89 2.462-2.446-.492-4.421-1.79-5.917-3.78C.446 13.92-.195 11.57.053 8.996c.2-2.093 1.004-3.946 2.386-5.533C4 1.673 5.953.56 8.296.15c.358-.062.72-.1 1.08-.15zM1.432 9.997c-.003 4.731 3.823 8.56 8.562 8.569 4.73.008 8.555-3.808 8.575-8.556.019-4.728-3.832-8.582-8.572-8.577a8.56 8.56 0 00-8.565 8.564z"></path>
        <path d="M11.125 13.546c.44 0 .85-.004 1.258.001.502.006.813.415.695.901-.079.323-.33.516-.69.517-.814.003-1.628.001-2.442 0-.533 0-1.067.008-1.601-.003a.682.682 0 01-.657-.609c-.043-.362.161-.685.505-.779.099-.027.206-.026.31-.028.376-.004.754-.004 1.132-.006.011 0 .023-.01.046-.02V8.794c-.302 0-.605.005-.908 0a.7.7 0 01-.705-.628c-.053-.388.245-.775.637-.785a35.773 35.773 0 011.778 0c.374.01.64.333.642.749.004.69.001 1.38.001 2.07v3.346zM10.208 4.29a1.006 1.006 0 011.012 1.014c.001.57-.461 1.029-1.03 1.022a1.017 1.017 0 01.017-2.036z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1_937">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;
