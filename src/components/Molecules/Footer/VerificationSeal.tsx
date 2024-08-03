import React, { useEffect } from 'react';

export const VerificationSeal = () => {
  const loadScript = () => {
    const scriptElement = document.getElementById('antille-phone');
    if (scriptElement) scriptElement.remove();
    const newScript = document.createElement('script');
    newScript.src =
      'https://497577c7-1aa0-4463-9ce8-344db5be12f2.snippet.antillephone.com/apg-seal.js';
    newScript.id = 'antille-phone';
    newScript.async = true;
    newScript.defer = true;
    document.head.appendChild(newScript);
  };

  useEffect(() => {
    loadScript();
    const handleResize = loadScript;
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="apg-497577c7-1aa0-4463-9ce8-344db5be12f2"
      data-testid="apg-497577c7-1aa0-4463-9ce8-344db5be12f2"
      data-apg-seal-id="497577c7-1aa0-4463-9ce8-344db5be12f2"
      data-apg-image-size="90"
      data-apg-image-type="basic-light-large"
    ></div>
  );
};
