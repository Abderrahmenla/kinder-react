import React, { CSSProperties } from 'react';

interface UpBottomCaretProps {
  fill?: string;
  width?: number;
  height?: number;
  isUp?: boolean;
  style?: CSSProperties;
}
const UpBottomCaret: React.FC<UpBottomCaretProps> = ({ fill, width, height, isUp, style }) => {
  return (
    <div style={style}>
      {isUp ? (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill}>
          <path
            fill={fill}
            d="M3.134.5a1 1 0 0 1 1.732 0L7.464 5a1 1 0 0 1-.866 1.5H1.402A1 1 0 0 1 .536 5L3.134.5Z"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill}>
          <path
            fill={fill}
            d="M4.866 6.5a1 1 0 0 1-1.732 0L.536 2A1 1 0 0 1 1.402.5h5.196A1 1 0 0 1 7.464 2L4.866 6.5Z"
          />
        </svg>
      )}
    </div>
  );
};
export default UpBottomCaret;
