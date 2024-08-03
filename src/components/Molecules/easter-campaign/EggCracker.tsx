import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { EggCrackerProps } from '@/components/Molecules/Easter/Easter.types';
import { EggCrackerContainer } from '@/components/Molecules/Easter/Easter.styles';

const EggCracker: React.FC<EggCrackerProps> = ({ wholeEggImg, crackedEggImg, isClicked }) => {
  const [isCracked, setIsCracked] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isClicked && !isCracked) {
      setAnimate(true);
      setTimeout(() => {
        setIsCracked(true);
        setAnimate(false);
      }, 500);
    }
  }, [isClicked, isCracked]);

  const handleClick = () => {
    if (!isCracked) {
      setAnimate(true);
      setTimeout(() => {
        setIsCracked(true);
        setAnimate(false);
      }, 500);
    }
  };

  return (
    <EggCrackerContainer onClick={handleClick}>
      <Image
        src={wholeEggImg}
        alt="Egg"
        width={83}
        height={83}
        style={{ width: '100%', transition: 'opacity 0.5s', opacity: isCracked ? 0 : 1 }}
        className={animate ? 'egg-animation' : ''}
      />
      <Image
        src={crackedEggImg}
        alt="Cracked Egg"
        width={83}
        height={83}
        className={animate ? 'egg-animation' : ''}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isCracked ? 1 : 0,
          transition: 'opacity 0.5s'
        }}
      />
    </EggCrackerContainer>
  );
};

export default EggCracker;
