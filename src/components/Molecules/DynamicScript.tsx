import { DYNAMIC_SCRIPTS } from '@/constants/index';
import Script from 'next/script';
import React from 'react';

const DynamicScript: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <>
      {DYNAMIC_SCRIPTS.map((script) => {
        if (script.page.trim().length && pathname.includes(script.page.trim())) {
          return (
            <Script
              type={script.type}
              key={script.name}
              src={script.src}
              defer={script.defer}
              async={script.async}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default DynamicScript;
