import React from 'react';

interface GameFrameProps {
  src: string;
  id: string;
}

export const GameFrame: React.FC<GameFrameProps> = ({ id, src }) => (
  <>
    <iframe data-testid={'iframe'} id={id} src={src} allowFullScreen></iframe>
  </>
);
