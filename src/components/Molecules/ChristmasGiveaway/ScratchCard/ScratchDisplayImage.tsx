import Image from 'next/image';

type ScratchDisplayImageType = {
  imageUrl: string | undefined;
  imageWidth: number | undefined;
  imageHeight: number | undefined;
  onClick: () => void;
};
export const ScratchDisplayImage = ({
  imageUrl,
  imageWidth,
  imageHeight,
  onClick
}: ScratchDisplayImageType) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {imageUrl && imageWidth && imageHeight && (
      <Image
        src={imageUrl}
        width={imageWidth}
        height={imageHeight}
        alt="Prize image"
        style={{ borderRadius: '10px' }}
        loading="lazy"
      />
    )}
  </div>
);
