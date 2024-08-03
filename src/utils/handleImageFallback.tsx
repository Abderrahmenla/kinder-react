import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc: string;
  placeholderSrc?: string;
  href?: string;
  onClick?: () => void;
  loading?: 'lazy' | 'eager' | undefined;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  placeholderSrc,
  alt,
  loading,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackImageError, setFallbackImageError] = useState(false);

  const handleImageError = () => {
    setImgSrc(fallbackSrc);
    setFallbackImageError(true);
  };

  return (
    <div>
      {!fallbackImageError && (
        <Image
          src={imgSrc}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
          loading={loading}
          alt={alt}
          {...props}
        />
      )}
      {fallbackImageError && placeholderSrc && (
        <Image src={placeholderSrc} alt="img-game" {...props} width={158} height={220} />
      )}
    </div>
  );
};

export default ImageWithFallback;
